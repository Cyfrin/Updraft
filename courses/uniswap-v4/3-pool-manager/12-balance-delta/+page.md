## Understanding the `BalanceDelta` Type in Uniswap v4

When interacting with Uniswap v4, particularly its core `swap` function, you will encounter a custom data type called `BalanceDelta`. This type is a crucial piece of the protocol's gas optimization strategy. This lesson will break down what `BalanceDelta` is, how it works, and how you can use the provided library to work with it in your own smart contracts.

### What is `BalanceDelta`?

`BalanceDelta` is a user-defined value type (UDVT) in Solidity that represents the change in the balance of the two tokens in a pool following a swap. It efficiently encapsulates both the amount of `token0` and `token1` changing hands into a single variable.

At its core, `BalanceDelta` is an alias for an `int256`. Its definition in the Uniswap v4 codebase is simple yet powerful:

```solidity
// File: BalanceDelta.sol

/// @dev Two `int128` values packed into a single `int256` where
/// the upper 128 bits represent the amount0
/// and the lower 128 bits represent the amount1.
type BalanceDelta is int256;
```

The key to its efficiency lies in a technique called **bit packing**. Instead of using two separate 256-bit storage slots to hold the two balance changes, Uniswap v4 packs two signed 128-bit integers (`int128`) into a single `int256` slot.

- **`amount0` delta**: Stored in the **upper 128 bits**.
- **`amount1` delta**: Stored in the **lower 128 bits**.

This design choice significantly reduces the gas cost associated with returning values from functions, as only one value needs to be handled on the stack.

### Context: The `swap` Function

To understand why `BalanceDelta` is important, let's look at its primary use case: the return value of the `swap` function in `PoolManager.sol`.

```solidity
// File: PoolManager.sol

function swap(PoolKey memory key, SwapParams memory params, bytes memory hookData)
    external
    onlyWhenUnlocked
    noDelegateCall
    returns (BalanceDelta swapDelta)
{
    // ... function logic
}
```

When you execute a swap, the function doesn't return two separate amounts. Instead, it returns a single `BalanceDelta` variable named `swapDelta`. This packed value contains the net change for both `token0` and `token1` in the pool. To make this data useful, you must unpack it.

### How to Unpack a `BalanceDelta` Value

To extract the individual `amount0` and `amount1` deltas from the packed `BalanceDelta` type, you must use the `BalanceDeltaLibrary`. This library provides two simple helper functions that use low-level assembly for maximum efficiency.

```solidity
// File: BalanceDelta.sol

/// @notice Library for getting the amount0 and amount1 deltas from a BalanceDelta
library BalanceDeltaLibrary {
    function amount0(BalanceDelta balanceDelta) internal pure returns (int128 _amount0) {
        assembly ("memory-safe") {
            _amount0 := sar(128, balanceDelta)
        }
    }

    function amount1(BalanceDelta balanceDelta) internal pure returns (int128 _amount1) {
        assembly ("memory-safe") {
            // signextend(15, balanceDelta) extracts the lower 128 bits as a signed integer
            _amount1 := signextend(15, balanceDelta)
        }
    }
}
```

Let's break down these functions:

1.  **`amount0(BalanceDelta balanceDelta)`**: This function isolates the `amount0` delta. It uses the `sar` (Arithmetic Shift Right) opcode, which shifts the bits of `balanceDelta` to the right by 128 positions. This action effectively discards the lower 128 bits (`amount1`) and moves the upper 128 bits (`amount0`) into the lower position, returning the correct signed value.

2.  **`amount1(BalanceDelta balanceDelta)`**: This function extracts the `amount1` delta. It uses the `signextend` opcode to interpret the lower 128 bits as a signed `int128`. This ensures that the sign (positive or negative) of the `amount1` delta is correctly preserved.

### Practical Application

When you build contracts that interact with Uniswap v4 pools, you will need to use this library. The workflow is straightforward:

1.  Call the `swap` function and store the returned `BalanceDelta` value in a variable.
2.  Use `BalanceDeltaLibrary.amount0()` on that variable to get the `int128` delta for `token0`.
3.  Use `BalanceDeltaLibrary.amount1()` on that variable to get the `int128` delta for `token1`.

By understanding and using the `BalanceDelta` type and its associated library, you can correctly interpret the results of a swap and build efficient, V4-compatible applications. For many development courses and boilerplate projects, the `BalanceDelta.sol` file containing both the type and the library will be provided for your convenience.
