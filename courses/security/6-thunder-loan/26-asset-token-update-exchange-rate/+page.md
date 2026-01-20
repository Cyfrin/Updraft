---
title: AssetToken.sol - updateExchangeRate
---

### AssetToken.sol - updateExchangeRate

Next we have the `updateExchangeRate` function!

```js
function updateExchangeRate(uint256 fee) external onlyThunderLoan {
    // 1. Get the current exchange rate
    // 2. How big the fee is should be divided by the total supply
    // 3. So if the fee is 1e18, and the total supply is 2e18, the exchange rate be multiplied by 1.5
    // if the fee is 0.5 ETH, and the total supply is 4, the exchange rate should be multiplied by 1.125
    // s_exchangeRate should always go up, never down
    // newExchangeRate = oldExchangeRate * (totalSupply + fee) / totalSupply
    // newExchangeRate = 1 (4 + 0.5) / 4
    // newExchangeRate = 1.125
    uint256 newExchangeRate = s_exchangeRate * (totalSupply() + fee) / totalSupply();

    if (newExchangeRate <= s_exchangeRate) {
        revert AssetToken__ExchangeRateCanOnlyIncrease(s_exchangeRate, newExchangeRate);
    }
    s_exchangeRate = newExchangeRate;
    emit ExchangeRateUpdated(s_exchangeRate);
}
```

We can infer that `updateExchangeRate` is updating the rate of exchange between `AssetToken` and the `underlying`. This comes into play when liquidity providers deposit or withdraw from the protocol and governs how many `AssetTokens` are exchanged for underlying collateral and vice versa.

This a great example of a function that will make more sense when we have more context of Thunder Loan.

**_s_exchangeRate should always go up, never down._**

This is an invariant! Absolutely make a note of this. At this point in our review we might wonder _why?_, we don't really understand the impact, but let's keep going and we'll figure it out.

```js
// @Audit-Question: What if totalSupply is 0? Is that possible?
uint256 newExchangeRate = s_exchangeRate * (totalSupply() + fee) / totalSupply();
```

The next bit of code is actually pretty clever.

```js
if (newExchangeRate <= s_exchangeRate) {
    revert AssetToken__ExchangeRateCanOnlyIncrease(s_exchangeRate, newExchangeRate);
}
```

This is explicitly checking for the invariant mentioned in the function comments. If the newExchangeRate is less than or equal to the old exchange rate, we revert with a custom error `AssetToken__ExchangeRateCanOnlyIncrease`.

Then we're updating the exchange rate and emitting an event.

```js
s_exchangeRate = newExchangeRate;
emit ExchangeRateUpdated(s_exchangeRate);
```

At first glance this function seems pretty tight. I don't really see an issue here, maybe that'll change with future testing, but for now, let's keep going.

Even though we didn't find a bug in updateExchangeRate, we've gained a lot of context.

There are only two small functions remaining in `AssetToken.sol`, let's review them now!

### getExchangeRate & getUnderlying

getExchangeRate and getUnderlying seem to be two basic getter functions which return s_exchangeRate and i_underlying respectively.

```js
function getExchangeRate() external view returns (uint256) {
    return s_exchangeRate;
}

function getUnderlying() external view returns (IERC20) {
    return i_underlying;
}
```

Both of the returned variables here are declared as private, so these functions look great.

> **Protip:** `s_exchangeRate` brought to mind an optimization in the previous function. `updateExchangeRate` loads `s_exchangeRate` from storage _a lot_. Storing this in memory is a better use of gas!

### Wrap Up

We didn't find too many issues with AssetToken.sol, but we got a much better understanding of the role it plays within Thunder Loan. We can check this one off our list!

![asset-token-update-exchange-rate1](/security-section-6/25-asset-token-update-exchange-rate/asset-token-update-exchange-rate1.png)

We'll finally approach ThunderLoan.sol itself in the next lesson. While technically a little bigger, we expect a lot of overlap between ThunderLoan.sol and ThunderLoanUpgraded.sol as well as valuable context regarding what's being changed between the two versions.

With all the information we've gained from the smaller code bases so far, let's dive into the main contract next!
