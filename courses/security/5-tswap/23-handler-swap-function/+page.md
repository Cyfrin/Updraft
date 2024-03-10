---
title: Handler.t.sol - Deposit Function
---



---

# Testing Uniswap's Token Swap Function

In this post, we're going to thoroughly explore the function which swaps a pool token for `WETH` along with the underlying math involved. In Uniswap, `WETH` is short for Wrapped Ethereum, a token that represents Ether 1:1, enabling it to adhere to the ERC-20 standard.

## The Swap Function and Its Logic

Firstly, we bind `outputWETH` between 0 and `UNI_64_MAX` to provide a more realistic transaction range. We don't want all the money in the pool to be swapped out. This would be logically unfeasible and destructive for liquidity, hence we return if `outputWETH` exceeds the pool balance.

## Delving into the Math Underlying the Function

In order to ascertain the pool token amount that must be minted or burnt based on `outputWETH`, we employ the following mathematical derivation.

In the `TSWAP` pool, there is a function called `getInputAmountBasedOnOutput`, which yields the `delta_x`. Without going into the specifics of this formula, let's understand why it works with a bit of simple algebra.

> _"It's in understanding how to manually solve these equations that you understand the importance and workings of the smart contract functions we work with."_

We utilize this function on the `TSWAP` pool to get the `poolTokenAmount` which is our `delta_x`.

## Updating Starting Deltas

The reason for the `-1 * _outputWETH` is because the pool is losing `WETH`, hence making the `deltaY` negatively inclined. We comfortably say that it is the `expectedDeltaY`.

## Minting Pool Tokens for Swapping User

Here, we commence by creating a new person `address swapper`. This is the person performing the swap with the pool. If the swapper doesn't have enough pool tokens for this swap, we mint the difference along with one additional token just to be explicit.

## Actual Token Swap

This is where the actual token swap occurs. We begin a new transaction under the swapper's address. This transaction includes approval for the pool to manage their pool tokens, with no limit set (`UNI_256_MAX`), with the `swapExactOutput` function called to perform the swap.

## Finalizing Swap and Updating Ending Deltas

After completing the swap, we simply update our ending deltas and calculate the actual deltas. The actual deltas are simply the initial balances subtracted from the final balances.

## Conclusion

The entire handler function, `swapPoolTokenForWETH`, crafts a transaction, conducts a swap on the pool and calculates expected and actual balance changes to ensure the protocol behaves as expected.

The process can feel challenging when dealing with mathematical equations, but abstraction makes it easier. We've constructed our handler focussing on the process more than the math. This handler allows easier stateful fuzzing tests, ensuring the safety and security of anyone interacting with the pool.

This testing framework aids in understanding how these token swapping protocols are designed and behave, giving us more confidence in the robustness of Uniswap's smart contracts.
