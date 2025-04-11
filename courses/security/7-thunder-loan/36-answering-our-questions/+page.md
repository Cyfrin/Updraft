---
title: Answering Our Questions
---

_Follow along with the video lesson:_

---

### Answering Our Questions

In this lesson we're going to go through some of the questions and thoughts we left ourselves along the way as we performed our manual review first pass.

Some of these questions may seem obvious now that we have a much deeper understanding of how Thunder Loan works, but let's rapid fire some of these questions, diving deep for more context when appropriate.

```js
// IPoolFactory.sol:
// @Audit-Question: Why are we using TSwap?
```

We know this one!

**Answer:** TSwap is being used to get the value of a token to calculate flash loan fees!

```js
// ITSwapPool.sol
// @Audit-Question: Why are we using the price of a pool token in weth?
```

We know that this is being used in getCalculatedFee, but it's certainly unusual that this is the only instance in the protocol that there's a conversion to WETH for some reason. Let's look more closely into how this is used.

Our `fee` is being used both in updateExchangeRate as well as our checks to assure the flash loan as been repaid.

```js
if (endingBalance < startingBalance + fee) {
    revert ThunderLoan__NotPaidBack(startingBalance + fee, endingBalance);
}
```

Something's wrong here. Can you see what it is?

Our `endingBalance` and `startingBalance` variables are token balances for our `underlying token`, these aren't converted to `WETH` at any time, it doesn't make sense to add a fee in `WETH` to these numbers! Our price is going to be all wrong!

We found something! Let's consider the severity.

**Impact:** Prices are wrong -> Med/High

**Likelihood:** Any time the function is called -> High

```js
// @Audit-High: If the Fee is calculated in tokens, the value should reflect that.
uint256 valueOfBorrowedToken = (amount * getPriceInWeth(address(token))) / s_feePrecision;
```

I'll say here, transparently - I didn't intend to put this bug in here 😅. We won't be going over a thorough write up or PoC for this one, but I encourage you to challenge yourself to write one!

Practice makes perfect!

```js
// AssetToken.sol
// @Audit-Question: What does this Exchange Rate do?
uint256 public constant EXCHANGE_RATE_PRECISION = 1e18;
uint256 private constant STARTING_EXCHANGE_RATE = 1e18;
```

**Answer:** This is the rate between an underlying token and it's associated asset token

```js
// AssetToken.sol
// @Audit-Question: Where are the underlying tokens stored?
```

**Answer:** Tokens are stored in the AssetToken contract

```js
// AssetToken.sol
// @Audit-Question: What happens if USDC denylists Thunder Loan?
```

This one warrants a little further discussion. The short answer is that the `Thunder Loan` protocol would be frozen, it's likely at least a `medium severity` bug. In a private audit, this is absolutely something you'd want to call out - but in a competitive audit, this kind of thing is often considered invalid. The knowledge of this is so commonly held that if a protocol is using a token like USDC, it's understood that they are accepting this risk.

When in doubt, submit the finding.

**Answer:** The protocol would be frozen, likely medium severity - despite this, likely invalid in competitive audits.

```js
// @Audit-Question: Why is this a storage variable?
uint256 private s_feePrecision;
```

**Answer:** It shouldn't be! This value isn't changed anywhere so can safely be declared as constant.

```js
// @Audit-Informational: Unchanged storage variables should be marked as constant or immutable
```

Great! And our final question is:

```js
// OracleUpgradeable.sol
// @Audit-Question: What if the token has 6 decimals? Is the price wrong?
function getPriceInWeth(address token) public view returns (uint256) {
        address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
        return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
    }
```

And... I'm actually not going to walk you through this. I'll tell you that _something_ weird happens with the deposit function as a product of USDC using 6 decimals, but for the purposes of this course, it won't be our focus.

I challenge you to uncover what's going on here and write a PoC for your own portfolios!
