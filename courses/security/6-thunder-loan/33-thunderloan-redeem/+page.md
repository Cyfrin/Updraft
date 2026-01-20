---
title: ThunderLoan.sol - Redeem
---

### ThunderLoan.sol - Redeem

With the `deposit` function well scoped (and notes to return!), let's continue our first pass with the `redeem` function.

<details>
<summary>Redeem Function</summary>

```js
/// @notice Withdraws the underlying token from the asset token
/// @param token The token they want to withdraw from
/// @param amountOfAssetToken The amount of the underlying they want to withdraw
function redeem(
    IERC20 token,
    uint256 amountOfAssetToken
)
    external
    revertIfZero(amountOfAssetToken)
    revertIfNotAllowedToken(token)
{
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    if (amountOfAssetToken == type(uint256).max) {
        amountOfAssetToken = assetToken.balanceOf(msg.sender);
    }
    uint256 amountUnderlying = (amountOfAssetToken * exchangeRate) / assetToken.EXCHANGE_RATE_PRECISION();
    emit Redeemed(msg.sender, token, amountOfAssetToken, amountUnderlying);
    assetToken.burn(msg.sender, amountOfAssetToken);
    assetToken.transferUnderlyingTo(msg.sender, amountUnderlying);
}
```

</details>


We would expect this function to behave in opposite to the `deposit` function. Thankfully we have `NATSPEC` this time to verify the function's intent!

Two modifiers can be seen in `redeem`, `revertIfZero(amountOfAssetToken)` and `revertIfNotAllowedToken(token)`. This clarifies somewhat that the token parameter being passed to this function is intended to be the underlying `token`, not the `asset token`.

```js
revertIfZero(amountOfAssetToken);
revertIfNotAllowedToken(token);
```

The next code chunk is setting us up for some logic and accounting some UX.

```js
AssetToken assetToken = s_tokenToAssetToken[token];
uint256 exchangeRate = assetToken.getExchangeRate();
if (amountOfAssetToken == type(uint256).max) {
    amountOfAssetToken = assetToken.balanceOf(msg.sender);
}
```

Here, the function is getting values for the asset token mapped to the passed token parameter, and the exchange rate of that token.

The condition statement may be a bit confusion, but it's really just saying _If the amount to be redeemed is this huge number, just transfer the whole balance of msg.sender_

Our next line is **_mathy_**, but important. This is where the function calculates how many of the underlying tokens should be transferred for the redeemed `amountOfAssetToken`

```js
// redeem function math
uint256 amountUnderlying = (amountOfAssetToken * exchangeRate) / assetToken.EXCHANGE_RATE_PRECISION();
```

This _does_ look like the opposite of the calculation in our `deposit` function:

```js
// deposit function math
uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
```

If we test the redeem function math with a test case, we can see things calculate as we'd expect.

```js
// exchangeRate = 2e18
// call redeem(IUSDC, 50)
// uint256 mintAmount = (100 * 2e18) / 1e18;
// uint256 mintAmount = 100e18;
```

With an exchange rate of 2 USDC for 1 asset token, by redeeming 50 asset tokens, we would have returned 100 USDC.

Finally, the redeem function emits an event (check parameters!), burns the asset tokens being redeemed, and transfers the underlying token to msg.sender.

```js
emit Redeemed(msg.sender, token, amountOfAssetToken, amountUnderlying);
assetToken.burn(msg.sender, amountOfAssetToken);
assetToken.transferUnderlyingTo(msg.sender, amountUnderlying);
```

All-in-all this looks pretty good to me. nothing obvious sticks out. There are a few questions we may be asking ourselves though.

```js
// How do weird ERC20s behave?
```

There's an explicit allow list with `Thunder Loan`, but none the less, USDC is included and it's only got 6 decimal places! How would that affect a protocol like `Thunder Loan`?

As we perform our review we should constantly be looking for questions like this to answer, to challenge the state of the protocol.

We can use `chisel` to answer this question for us quite quickly. Try it out! We would expect to receive `2e6` USDC given an `exchangeRate` of `2`.

![thunderloan-redeem1](/security-section-6/32-thunderloan-redeem/thunderloan-redeem1.png)

And it does!

### Wrap Up

Wow, we're having a hard time finding any significant bugs here so far, but we mustn't give up! Deposit and redeem seem to be pretty solid, but we still have functions to review.

The audit isn't over yet! See you in the next lesson.
