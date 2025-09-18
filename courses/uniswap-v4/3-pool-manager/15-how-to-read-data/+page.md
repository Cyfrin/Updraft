## Reading Pool Data in Uniswap v4

Uniswap v4 introduces a powerful, singleton architecture centered around the `PoolManager` contract. While this design offers unprecedented flexibility and gas efficiency, it also changes how developers read on-chain pool data. This lesson explores the different methods available for querying state from the `PoolManager`, from low-level direct storage access to high-level, developer-friendly abstractions.

## Core Concepts: Permanent vs. Transient Storage

Before diving into the methods, it's crucial to understand the two types of storage in Uniswap v4:

1.  **Permanent Storage:** This is the standard smart contract storage that persists across transactions. It holds long-term state like the pool's current price, tick information, and liquidity positions. It is modified using the `sstore` opcode.
2.  **Transient Storage (EIP-1153):** This is a new type of storage that exists only for the duration of a single transaction. It's used to track temporary data, such as token balance changes (deltas), without incurring the high gas costs of permanent storage. It is accessed using the `tstore` and `tload` opcodes.

Uniswap v4 provides distinct pathways for reading from each of these storage types.

## The Low-Level Foundation: Direct Storage Access

At its core, the `PoolManager` contract inherits functionality that exposes its storage directly. This is achieved through two contracts: `Extsload` and `Exttload`. These provide a powerful but complex way to read any data from the contract if you know its precise storage slot.

A helpful mnemonic is to think of `extsload` as "**external sload**" for permanent storage and `exttload` as "**external tload**" for transient storage.

### Reading Permanent Storage with `extsload`

The `PoolManager` inherits from `Extsload.sol`, which contains a single function to read from any permanent storage slot.

```solidity
// In v4-core/src/Extsload.sol
abstract contract Extsload is IExtsload {
    function extsload(bytes32 slot) external view returns (bytes32) {
        assembly ("memory-safe") {
            mstore(0, sload(slot))
            return(0, 0x20)
        }
    }
}
```

This function takes a `bytes32 slot` and uses the `sload` EVM opcode to return the 32 bytes of data stored at that location.

### Reading Transient Storage with `exttload`

Similarly, the `PoolManager` inherits from `Exttload.sol` for reading from transient storage.

```solidity
// In v4-core/src/Exttload.sol
abstract contract Exttload is IExttload {
    function exttload(bytes32 slot) external view returns (bytes32) {
        assembly ("memory-safe") {
            mstore(0, tload(slot))
            return(0, 0x20)
        }
    }
}
```

This function is nearly identical but uses the `tload` opcode, which is designed specifically for accessing transient storage slots within a transaction.

While powerful, using these functions directly is not recommended for most developers. It requires a deep understanding of the EVM's storage layout to manually calculate the correct `slot` addresses, a process that is complex and error-prone.

## The High-Level Solution: Helper Libraries and View Contracts

To abstract away the complexity of calculating storage slots, Uniswap v4 provides a suite of helper libraries and view contracts. These are the recommended tools for most data-reading tasks.

### Reading Permanent State: `StateLibrary` and `StateView`

For querying persistent data like prices, ticks, and liquidity, Uniswap provides two key tools.

1.  **`StateLibrary.sol`:** Located in `v4-core/src/libraries/`, this is an internal library designed to be used by other contracts. It contains functions that encapsulate the logic for calculating the correct storage slots and then calling `poolManager.extsload(...)` to retrieve the data. It handles the low-level complexity so your contract doesn't have to.

2.  **`StateView.sol`:** This is the primary tool for most developers. Located in `v4-periphery/src/lens/`, `StateView` is a deployed, view-only contract that provides a simple and stable on-chain API for querying permanent pool state. It is built for both off-chain clients and other on-chain contracts.

The `StateView` contract uses the `StateLibrary` to expose easy-to-use functions. For example, its `getSlot0` function is a simple wrapper around the library's implementation.

```solidity
// In v4-periphery/src/lens/StateView.sol
contract StateView is ImmutableState, IStateView {
    using StateLibrary for IPoolManager;

    function getSlot0(PoolId poolId) external view
        returns (uint160 sqrtPriceX96, int24 tick, ...)
    {
        return poolManager.getSlot0(poolId);
    }
}
```

By using the statement `using StateLibrary for IPoolManager`, the `StateView` contract can call library functions like `getSlot0` directly on the `poolManager` instance.

### Reading Transient State: `TransientStateLibrary` and `DeltaResolver`

For reading temporary, transaction-specific data, you should use the `TransientStateLibrary`.

1.  **`TransientStateLibrary.sol`:** Located in `v4-core/src/libraries/`, this library provides getters for transient storage variables. Its primary use case is to read currency deltas—the net balance changes of tokens for a given address within the current transaction. Key functions include `currencyDelta` and `getSyncedReserves`.

2.  **`DeltaResolver.sol`:** A practical example of using `TransientStateLibrary` can be found in `v4-periphery/src/base/DeltaResolver.sol`. This base contract is designed to help other contracts resolve "magic delta" amounts. For instance, after a swap, a hook contract might need to know exactly how much of a token it received. It can do this by calling the `currencyDelta` function from the library.

The following snippet from `DeltaResolver` shows how it reads the transient balance change for a specific currency belonging to the contract itself.

```solidity
// In v4-periphery/src/base/DeltaResolver.sol
function _getFullCredit(Currency currency) internal view returns (uint256) {
    int256 _amount = poolManager.currencyDelta(address(this), currency);
    // ... additional logic to handle the amount
}
```

This call accesses transient storage to get the net amount of `currency` that `address(this)` has been credited with during the ongoing `lock` call.

## Best Practices for Reading Uniswap v4 Pool Data

To simplify your development process, follow these recommendations:

- **For Off-Chain or On-Chain Reading of Permanent State:** Always use the deployed **`StateView.sol`** contract. It provides a stable, simple, and reliable interface for fetching common data points like pool prices, tick information, and liquidity.

- **For On-Chain Reading of Transient State:** If your contract logic depends on balance changes that occurred within the current transaction (e.g., inside a hook), use the functions provided in **`TransientStateLibrary.sol`**. This is essential for understanding the immediate effects of a swap or liquidity provision.

- **Avoid Low-Level Access:** Refrain from using `extsload` and `exttload` directly unless you have a specific, advanced use case that requires reading from a storage slot not exposed by the helper libraries.
