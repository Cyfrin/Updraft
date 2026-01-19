## Understanding `_accountDelta`: How PoolManager Tracks Token Balances

Within the `PoolManager.sol` smart contract, the internal `_accountDelta` function plays a crucial role in tracking token balance changes for users within a single, atomic transaction. Its primary job is to record whether a user owes tokens to the contract or is owed tokens by it. A common point of confusion is understanding when the `delta` parameter should be a positive or negative number.

This lesson clarifies the convention by examining how `_accountDelta` is used in functions that handle token inflows and outflows. The key principle is that the sign of the delta is always relative to the `PoolManager` contract's balance:

*   A **negative delta** means the user has a debt to the contract (e.g., they have taken tokens out).
*   A **positive delta** means the user has a credit with the contract (e.g., they have sent tokens in).

### The `_accountDelta` Function Explained

First, let's look at the function's definition. It's a simple but powerful tool for managing temporary balances during complex operations like swaps.

```solidity
/// @notice Adds a balance delta in a currency for a target address
function _accountDelta(Currency currency, int128 delta, address target) internal {
    if (delta == 0) return;
    
    // ... further implementation ...
}
```

The function accepts three parameters:
*   `Currency currency`: The currency (e.g., USDC, WETH) for which the balance is being adjusted.
*   `int128 delta`: The amount by which to change the balance. As a signed integer, this can be positive or negative.
*   `address target`: The user's address whose balance is being updated.

For example, if a user named Alice owes 100 USDC to the PoolManager, the call would record this debt by setting `delta` to `-100`.

### Use Case 1: Negative Deltas and Taking Tokens

To understand when a negative delta is used, we can analyze the `take` function. This function allows a user to withdraw tokens from the `PoolManager` contract.

```solidity
// in PoolManager.sol

function take(Currency currency, address to, uint256 amount) external onlyWhenUnlocked {
    unchecked {
        // negation must be safe as amount is not negative
        _accountDelta(currency, -(amount.toInt128()), msg.sender);
        currency.transfer(to, amount);
    }
}
```

The logic here is straightforward. A user calls `take` to receive `amount` of a specific `currency`. Before the contract executes the `currency.transfer` to send the tokens out, it first calls `_accountDelta`.

Notice the `delta` argument: `-(amount.toInt128())`. The contract applies the **negative** of the amount being withdrawn to the user's balance. This action effectively says, "This user has just taken `amount` tokens, so they now owe that amount back to the pool."

This mechanism is fundamental to the contract's `unlock` functionality. All actions within a `PoolManager` transaction happen within an `unlock` call, which requires that all currency deltas are settled by the end of its execution. If a user creates a negative delta by calling `take`, they must perform a corresponding action to create a positive delta (like sending in another token) to balance their account to zero before the transaction can successfully conclude.

### Use Case 2: Positive Deltas and Sending Tokens

Conversely, a positive delta is used when a user sends tokens **into** the `PoolManager`. This is handled by the internal `_settle` function.

```solidity
// in PoolManager.sol

function _settle(address recipient) internal returns (uint256 paid) {
    Currency currency = CurrencyReserves.getSyncedCurrency();
    
    if (currency.isAddressZero()) {
        // Handling native currency (ETH)
        paid = msg.value;
    } else {
        // Handling ERC20 tokens
        uint256 reservesBefore = CurrencyReserves.getSyncedReserve(currency);
        uint256 reservesNow = currency.balanceOfSelf();
        paid = reservesNow - reservesBefore;
    }

    // ...
    _accountDelta(currency, paid.toInt128(), recipient);
}
```

The `_settle` function calculates how many tokens the contract has received from the user (the `paid` amount). Whether it's `msg.value` for ETH or the difference in the contract's ERC20 balance, this value is always positive.

It then calls `_accountDelta` using the positive `paid` amount as the `delta`. This action establishes a credit for the user, effectively saying, "This user has just paid `amount` tokens into the pool, so they can now claim this value." This positive balance is what enables the user to subsequently call `take` to withdraw a different token in a swap.

### Summary of the Delta Convention

The convention for the `delta` parameter in the `_accountDelta` function can be summarized as follows:

| Action | Delta Sign | Meaning |
| :--- | :--- | :--- |
| User sends tokens **in** to the PoolManager. | **Positive (+)** | The user has a credit with the contract and can claim this amount. |
| User takes tokens **out** of the PoolManager. | **Negative (-)** | The user has a debt to the contract that must be settled with other tokens. |