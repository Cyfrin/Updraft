---
title: ThunderLoan.sol (Continued)
---

### ThunderLoan.sol (Continued)

Ok! Now that we've gleaned a critical understanding of how token approvals are handled, let's continue our review of the `deposit` function.

<details>
<summary>Deposit Function</summary>

```js
function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
    emit Deposit(msg.sender, token, amount);
    assetToken.mint(msg.sender, mintAmount);
    uint256 calculatedFee = getCalculatedFee(token, amount);
    assetToken.updateExchangeRate(calculatedFee);
    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

</details>


The first thing the `deposit` function does is leverage the `s_tokenToAssetToken` mapping to acquire the `AssetToken` paired with the passed token parameter. Remember, these `asset tokens` ultimately represent how much of the pool the depositor owns as a result of their deposits.

The function then needs to know how many asset tokens to mint as a result of the amount of tokens being deposited. To accomplish this we're using the `getExchangeRate` function, which we know from earlier is returning the ratio between the asset tokens and their underlying. We then use the exchangeRate to do a bit of math.

```js
uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
```

> **Remember:** `EXCHANGE_RATE_PRECISION` and `STARTING_EXCHANGE_RATE` are both `1e18`!

Pretty simple, but let's look at an example. We know the `exchangeRate` should never be lower than `1e18` - as per the invariant we identified in `AssetToken`, but how would a 2:1 exchange rate look?

```js
// exchangeRate = 2e18
// call deposit(IUSDC, 100)
// uint256 mintAmount = (100 * 1e18) / 2e18;
// uint256 mintAmount = 50e18;
```

This makes intuitive sense, doesn't it? If we have an exchange rate of 2 deposited tokens for 1 asset token, we would receive half as many asset tokens as we deposit.

Next thing we deposit function is doing is emitting an event then minting the calculated number of `asset tokens`. Double check the parameters!

```js
emit Deposit(msg.sender, token, amount);
assetToken.mint(msg.sender, mintAmount);
```

Now, the last section of this function is interesting.

```js
uint256 calculatedFee = getCalculatedFee(token, amount);
assetToken.updateExchangeRate(calculatedFee);
token.safeTransferFrom(msg.sender, address(assetToken), amount);
```

This chunk of code is calculating the loan fee based on the amount deposited of the underlying token, then the exchange rate is updated based on this fee calculation. Finally, the underlying tokens are transferred from `msg.sender` to the `AssetToken` contract. This is worth noting. The funds deposited aren't actually sent to the `ThunderLoan` contract, they're being held by the newly created `AssetToken` contract.

Let's take a closer look at getCalculatedFee...

```js
function getCalculatedFee(IERC20 token, uint256 amount) public view returns (uint256 fee) {
    //slither-disable-next-line divide-before-multiply
    uint256 valueOfBorrowedToken = (amount * getPriceInWeth(address(token))) / s_feePrecision;
    //slither-disable-next-line divide-before-multiply
    fee = (valueOfBorrowedToken * s_flashLoanFee) / s_feePrecision;
}
```

...

```js
// @Audit-Informational: Function missing NATSPEC!
```

Without any explicit comments we're left to speculate, but something here seems wrong. If this function is calculating the flash loan fee, I'm left with a bunch of questions..

**_Why are we calculating this fee during deposit?_**

**_Why is the exchangeRate being updated?_**

We absolutely need to mark this as follow up and get more of an idea as to what's going on here and why.

```js
// @Audit: Follow-up
uint256 calculatedFee = getCalculatedFee(token, amount);
```

### Wrap Up

Most of our deposit function looks pretty good, but we're running into some unanswered questions near the end. This is just our recon phase still, so we'll leave a note to ourselves to come back and further investigate.

Something seems fishy.

Let's keep going!
