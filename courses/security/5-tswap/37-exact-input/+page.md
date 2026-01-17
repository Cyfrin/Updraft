---
title: Manual Review - TSwapPool.sol - swapExactInput
---

---

### Manual Review - TSwapPool.sol - swapExactInput

As mentioned in closing of the previous lesson, it's unfortunate to see such an important function as `swapExactInput` not having any natspec. We should be able to use the natspec from `swapExactOutput` to help us a little.

```js
/*
 * @notice figures out how much you need to input based on how much
 * output you want to receive.
 *
 * Example: You say "I want 10 output WETH, and my input is DAI"
 * The function will figure out how much DAI you need to input to get 10 WETH
 * And then execute the swap
 * @param inputToken ERC20 token to pull from caller
 * @param outputToken ERC20 token to send to caller
 * @param outputAmount The exact amount of tokens to send to caller
 */
```

In an audit we would absolutely talk to the protocol and get them to explain what `swapExactInput` is meant to do. For now we can assume it's the opposite of `swapExactInput`.

<details>
<summary>swapExactInput Function</summary>

```js
function swapExactInput(
    IERC20 inputToken,
    uint256 inputAmount,
    IERC20 outputToken,
    uint256 minOutputAmount,
    uint64 deadline
)
    public
    revertIfZero(inputAmount)
    revertIfDeadlinePassed(deadline)
    returns (uint256 output)
{
    uint256 inputReserves = inputToken.balanceOf(address(this));
    uint256 outputReserves = outputToken.balanceOf(address(this));

    uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);

    if (outputAmount < minOutputAmount) {
        revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
    }

    _swap(inputToken, inputAmount, outputToken, outputAmount);
}
```

</details>


Let's better understand the parameters required by `swapExactInput`.

- **inputToken** - input token to sell
- **inputAmount** - amount of input token to sell
- **outputToken** - output token to buy
- **minOutputAmount** - minimum output amount expected to receive
- **deadline** - when the transaction should expire

The `swapExactInput` function has modifiers which will revert if the inputAmount is 0 or if the deadline has already passed. Great, looks good.

```js
revertIfZero(inputAmount);
revertIfDeadlinePassed(deadline);
```

Firstly our function is assigning values to `inputReserves` and `outputReserves` by acquiring balances from the TSwapPool contract. We're then calling a function we saw in the last lesson `getOutputAmountBasedOnInput`, so this should already be assessed.

```js
uint256 inputReserves = inputToken.balanceOf(address(this));
uint256 outputReserves = outputToken.balanceOf(address(this));

uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);
```

Next we're performing a check to assure the `outputAmount` calculated is more than our `minOutputAmount`, reverting with a custom error `TSwapPool__OutputTooLow` if this isn't the case. Of course as always, verify the ordering and content of custom error parameters. These look good!

```js
if (outputAmount < minOutputAmount) {
    revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
}
```

Finally we perform our swap with `_swap`. `_swap` is a critical function in TSwap and we already found through our invariant test suite that there is an invariant breaking bug within.

<details>
<summary>_swap Function</summary>

```js
function _swap(IERC20 inputToken, uint256 inputAmount, IERC20 outputToken, uint256 outputAmount) private {
    if (_isUnknown(inputToken) || _isUnknown(outputToken) || inputToken == outputToken) {
        revert TSwapPool__InvalidToken();
    }

    // @Audit-High - Breaks protocol invariant
    swap_count++;
    if (swap_count >= SWAP_COUNT_MAX) {
        swap_count = 0;
        outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
    }
    emit Swap(msg.sender, inputToken, inputAmount, outputToken, outputAmount);

    inputToken.safeTransferFrom(msg.sender, address(this), inputAmount);
    outputToken.safeTransfer(msg.sender, outputAmount);
}
```

</details>

What else is this function doing exactly though?

We see a conditional executed right away with a function we've not seen before `isUnknown`. Upon closer inspection, the `isUnknown` function seems to return false if the passed tokens aren't `weth` or the `poolToken` causing a revert. This seems like a great restriction to the function call. \_swap will also revert with `TSwapPool__InvalidToken` if `inputToken == outputToken`. This makes intuitive sense, why would we waste gas swapping a token with itself?

```js
if (_isUnknown(inputToken) || _isUnknown(outputToken) || inputToken == outputToken) {
    revert TSwapPool__InvalidToken();
}
```

We then emit a Swap event and finally perform the token transfers.

```js
emit Swap(msg.sender, inputToken, inputAmount, outputToken, outputAmount);

inputToken.safeTransferFrom(msg.sender, address(this), inputAmount);
outputToken.safeTransfer(msg.sender, outputAmount);
```

Things look great, aside from the fee on transfer issue which breaks the protocol invariant 😄

> **Note:** Some teams may even hard code their invariant into their code base, something akin to `require(x * y = k)` as an extra layer of assurance that invariants won't break.

`swapExactOutput` is next, let's go!
