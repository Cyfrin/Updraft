## How to Settle Debts in PoolManager: The Sync and Settle Workflow

When interacting with smart contracts that manage multiple assets, a common task is repaying, or "settling," a debt of a specific token. In the `PoolManager` contract, this process is handled by a pair of functions, `sync` and `settle`, which must be used together in a specific pattern. This lesson breaks down the "sync before settle" workflow, revealing how the system uses transient storage (EIP-1153) to efficiently and securely calculate the amount of tokens paid within a single transaction.

### The Core Logic: Calculating Payment in the `_settle` Function

The heart of the repayment mechanism is the internal `_settle` function. Its primary job is to determine how much of a given currency was paid by a user and update their balance accordingly.

For ERC20 tokens, the function calculates the `paid` amount by comparing the contract's token balance at two different points in time: a balance snapshotted *before* the user sent tokens, and the balance *after* the tokens were received. The difference between these two values is the amount paid.

Let's examine the code:

```solidity
// file: PoolManager.sol

function _settle(address recipient) internal returns (uint256 paid) {
    Currency currency = CurrencyReserves.getSyncedCurrency();

    // if not previously synced, or the syncedCurrency slot has been reset
    if (currency.isAddressZero()) {
        paid = msg.value; // Logic for native currency (ETH)
    } else {
        if (msg.value > 0) NonzeroNativeValue.selector.revertWith();
        // Reserves are guaranteed to be set because currency and reserves are set together
        uint256 reservesBefore = CurrencyReserves.getSyncedReserves();
        uint256 reservesNow = currency.balanceOfSelf();
        paid = reservesNow - reservesBefore;
        CurrencyReserves.resetCurrency();
    }

    _accountDelta(currency, paid.toInt128(), recipient);
}
```

The key logic for ERC20 tokens resides in the `else` block:
1.  `reservesBefore` is retrieved by calling `CurrencyReserves.getSyncedReserves()`.
2.  `reservesNow` is the contract's current token balance.
3.  `paid` is calculated as `reservesNow - reservesBefore`.

This raises a critical question: How does the function get the `reservesBefore` value? This value must have been stored somewhere earlier in the transaction. To find the answer, we must look for where `CurrencyReserves` is written to, which leads us to the `sync` function.

### Setting the Stage: The `sync` Function

The `sync` function is the necessary prerequisite to settling an ERC20 debt. Its purpose is to take a snapshot of the `PoolManager`'s current balance for a specific token and store it temporarily for the `settle` function to use later.

```solidity
// file: PoolManager.sol

function sync(Currency currency) external {
    // address(0) is used for the native currency
    if (currency.isAddressZero()) {
        // The reserves balance is not used for native settling
        CurrencyReserves.resetCurrency();
    } else {
        uint256 balance = currency.balanceOfSelf();
        CurrencyReserves.syncCurrencyAndReserves(currency, balance);
    }
}
```

When `sync` is called with an ERC20 token address, it fetches the contract's current balance of that token and passes both the currency and its balance to `CurrencyReserves.syncCurrencyAndReserves()`. This is the exact moment the `reservesBefore` snapshot is created.

### The Bridge Between Functions: `CurrencyReserves` and Transient Storage

The `CurrencyReserves` library is the crucial link that enables communication between the `sync` and `settle` function calls within the same transaction. It achieves this by using **transient storage**, a feature introduced in EIP-1153.

Transient storage is a form of data storage that persists only for the duration of a single transaction. It is significantly cheaper than regular contract storage (`SSTORE`) because the data is automatically discarded when the transaction completes. It is accessed via low-level EVM opcodes, `TSTORE` (to store) and `TLOAD` (to load), which are used within assembly blocks.

The `CurrencyReserves.sol` library is a simple wrapper around these opcodes.

```solidity
// file: libraries/CurrencyReserves.sol

library CurrencyReserves {
    // ... slot constants defined ...

    function syncCurrencyAndReserves(Currency currency, uint256 value) internal {
        assembly ("memory-safe") {
            // stores currency address in a transient slot
            tstore(CURRENCY_SLOT, and(currency, 0xffffff...)) 
            // stores the balance in another transient slot
            tstore(RESERVES_OF_SLOT, value) 
        }
    }

    function getSyncedReserves() internal view returns (uint256 value) {
        assembly ("memory-safe") {
            value := tload(RESERVES_OF_SLOT)
        }
    }

    // Also contains getSyncedCurrency(), which uses tload(CURRENCY_SLOT)
}
```
- **`syncCurrencyAndReserves`**: Uses `tstore` to save the currency address and its balance (`reservesBefore`) into transient storage slots.
- **`getSyncedReserves`**: Uses `tload` to retrieve the balance from the transient storage slot where it was previously saved.

This lightweight mechanism allows `sync` to "pass a message" to `settle` without incurring the high gas cost of writing to permanent state.

### The Complete "Sync Before Settle" Workflow

To correctly settle an ERC20 token debt with the `PoolManager`, an integrator must follow these steps in order within a single transaction:

1.  **Call `sync(currency)`:** First, call `sync` with the address of the ERC20 token you intend to repay. This action records the token's identity and its current balance (`reservesBefore`) in transient storage.

2.  **Transfer Tokens:** Immediately after the `sync` call, transfer the ERC20 tokens to the `PoolManager` contract address. This action increases the contract's balance of that token, establishing the `reservesNow` value.

3.  **Call `settle()`:** Finally, call `settle`. The `settle` function will now execute its logic:
    *   It retrieves the currency and the `reservesBefore` value from transient storage.
    *   It reads the contract's new, higher token balance (`reservesNow`).
    *   It calculates the `paid` amount by subtracting `reservesBefore` from `reservesNow`.
    *   It updates the user's debt and cleans up the transient storage slots for the next transaction.

This "sync before settle" pattern is mandatory. Without first calling `sync`, the `settle` function would have no record of which currency is being paid or what its balance was before the transfer, making a correct calculation impossible.