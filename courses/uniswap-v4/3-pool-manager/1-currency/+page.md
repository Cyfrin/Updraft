## Unifying ETH and ERC-20s: A Deep Dive into Uniswap v4's `Currency` Type

In blockchain development, a common source of complexity is the fundamental difference between a chain's native token (like Ether on Ethereum) and its token standards, like ERC-20. Transferring value, checking balances, and interacting with them require different functions and logical paths. Uniswap v4 introduces an elegant abstraction to solve this problem: the `Currency` user-defined value type. This lesson explores how this simple yet powerful type unifies token interactions, reduces code duplication, and makes the entire protocol cleaner and more robust.

### What is the `Currency` Type?

At its core, the `Currency` type is a custom alias for Solidity's built-in `address` type. It is defined in `types/Currency.sol` using a feature that enhances type safety and readability.

```solidity
// File: types/Currency.sol

pragma solidity ^0.8.0;

import {IERC20Minimal} from "../interfaces/external/IERC20Minimal.sol";
import {CustomRevert} from "../libraries/CustomRevert.sol";

type Currency is address;
```

By creating a distinct type, the Uniswap v4 codebase makes it explicit when an `address` variable is intended to represent a tradable asset, whether it's the native token or an ERC-20 token.

### The Core Convention: Differentiating Native and ERC-20 Tokens

The true power of the `Currency` type comes from a simple but effective convention used throughout the protocol:

*   **Native Token (e.g., ETH):** If a `Currency` variable holds the **zero address** (`address(0)`), it is treated as the native token of the blockchain.
*   **ERC-20 Token:** If the `Currency` variable holds any **non-zero address**, it is treated as the contract address of an ERC-20 token.

This convention allows a single variable to represent either token type, enabling developers to write unified logic that handles both cases within a single function.

### Unifying Logic: Balance Checks and Transfers in Practice

The primary motivation for the `Currency` type is to avoid repetitive conditional logic. Let's examine how it streamlines two of the most common token operations: checking a balance and transferring tokens.

#### Example 1: Unified Balance Checks

Without an abstraction, checking a contract's token balance would require an `if/else` statement every time: one branch for `address(this).balance` (for ETH) and another for calling `token.balanceOf(address(this))` (for an ERC-20). The `Currency` type allows this logic to be encapsulated in a single helper function.

Consider this `balanceOfSelf` function, which demonstrates the pattern:

```solidity
function balanceOfSelf(Currency currency) internal view returns (uint256) {
    if (currency.isAddressZero()) {
        // If the currency is the zero address, it's the native token.
        // Return the contract's own ETH balance.
        return address(this).balance;
    } else {
        // Otherwise, it's an ERC-20 token.
        // Cast the currency to the IERC20Minimal interface and call balanceOf.
        return IERC20Minimal(Currency.unwrap(currency)).balanceOf(address(this));
    }
}
```

This function neatly contains the conditional logic. Any other part of the Uniswap v4 protocol can now simply call `balanceOfSelf(myCurrency)` without needing to know or care whether `myCurrency` represents ETH or an ERC-20 token.

#### Example 2: Unified Token Transfers

Transferring tokens presents a similar challenge. Sending native ETH is typically done with a low-level `call`, while sending an ERC-20 token requires an external function call to its `transfer` method. The `Currency` type allows us to create a unified `transfer` function.

The logic below, inspired by a library function, illustrates how this is achieved. Note the use of low-level assembly for gas optimization, a common practice in high-stakes protocols like Uniswap.

```solidity
function transfer(Currency currency, address to, uint256 amount) {
    bool success;
    if (currency.isAddressZero()) {
        // For native ETH, use a low-level `call` to send value.
        assembly ("memory-safe") {
            success := call(gas(), to, amount, 0, 0, 0)
        }
        // Revert logic on failure would follow here...
    } else {
        // For ERC-20s, perform an external call to the `transfer` function.
        // This assembly block is a gas-optimized way to call:
        // `IERC20(currency).transfer(to, amount)`
        assembly ("memory-safe") {
            // Get free memory pointer
            let fmp := mload(0x40)

            // Write function selector and arguments to memory
            mstore(fmp, 0xa9059cbb00000000000000000000000000000000000000000000000000000000) // transfer(address,uint256)
            mstore(add(fmp, 4), to)
            mstore(add(fmp, 36), amount)
            
            // Call the ERC-20 contract
            success := call(gas(), Currency.unwrap(currency), 0, fmp, 68, 0, 32)
        }
        // Revert logic on failure would follow here...
    }
}
```

By branching on `currency.isAddressZero()`, this function routes the operation to the correct execution path—a native value transfer or an ERC-20 contract call—all while presenting a single, clean interface to the rest of the system.

### Core Use Case: The `PoolKey` Struct

So, where is this abstraction put to use? One of its most critical applications is in the `PoolKey` struct, which serves as the unique identifier for every liquidity pool in Uniswap v4.

```solidity
struct PoolKey {
    // @notice The lower currency of the pool, sorted numerically
    Currency currency0;
    // @notice The higher currency of the pool, sorted numerically
    Currency currency1;
    // @notice The pool LP fee
    uint24 fee;
    // @notice The tick spacing for the pool
    int24 tickSpacing;
    // @notice The hooks contract for the pool
    IHooks hooks;
}
```

A liquidity pool is fundamentally defined by the pair of assets it trades. By using `Currency currency0` and `Currency currency1`, the `PoolKey` can define any type of pair seamlessly:
*   An ERC-20 / ERC-20 pair (e.g., USDC/DAI).
*   A native token / ERC-20 pair (e.g., WETH/USDC).

This flexibility is a direct result of the `Currency` abstraction. It allows the core logic of the protocol to handle all pools uniformly, dramatically simplifying the architecture and making the system more extensible for future token types.
