---
title: Health Factor
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/jQNNph-x-18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Upgrading the Health Factor Function of a DeFi Platform

In our previous discussions, we have looked at creating and integrating various parts needed for a _Decentralized Finance (DeFi)_ platform. Now, it's time to take a deeper dive into one of its critical components – the _Health Factor_.

So, let's get started!

![](https://cdn.videotap.com/7XaXzANzYumN0wCD3MU5-19.89.png)

## Working with The Health Factor

The health factor function presented a challenge as it was initially designed not to accomplish anything. However, we can now modify it as we have successfully integrated the Health Factor into our system. Here's what it should look like:

```
function updateHealthFactor() public {// function body}
```

Now that we have the _collateral value in USD_ and the _total USD minted_, our health factor can be retrieved by dividing the collateral value by the total amount minted. This would likely look something like this:

```javascript
return collateralValueInUSD / totalUSDMinted;
```

...if we didn't wan't to remain overcollateralized.

## Understanding Overcollateralization

It is important to understand that we need to always maintain an overcollateralized state. The reason being, if the collateral value falls below 100, then our system becomes compromised. To prevent this, we should set a threshold.

This leads us to introduce the _liquidation threshold_, which can be created at the top. We add:

```javascript
uint256 private constant LIQUIDATION_THRESHOLD = 50; //200% overcollateralized
```

This means for your collateral to be safe, it needs to maintain 200% overcollateralization.

<img src="/foundry-defi/8-defi-health-factor/defi-health-factor1.PNG" style="width: 100%; height: auto;">

To get our health factor, we will not directly divide the collateral value and the total amount minted. Solidity does not handle decimals, so dividing small amounts may return just 1, eliminating our desired precision.

## Handling Precision

To ensure precision in the calculations, we need to adjust the collateral given the threshold.

```javascript
uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
```

Here, the constant `liquidationThreshold` multiplies our collateral value, making our value bigger, hence the need to divide by 100 to ensure no floating numbers.

## The Math Explained

At this point, the math may seem a bit tricky. Let’s illustrate this with two examples:

1. If we have $1,000 worth of ETH and 100 DSC, the math would go as such:

```javascript
1000 (collateral in ETH) * 50 (liquidation threshold), divided by100 (liquidation precision) = 500 (collateralAdjustedForThreshold)
```

2. For $150 worth of ETH and $100 minted DSC:

```javascript
150 (collateral in ETH) * 50 (liquidation threshold), divided by100 (liquidation precision) = 75 (collateralAdjustedForThreshold)
```

To find the correct health factor, let's divide the `collateralAdjustedForThreshold` by the `totalDscMinted`.

```javascript
    function _healthFactor(address user) private view returns (uint256) {
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = _getAccountInformation(user);
        return _calculateHealthFactor(totalDscMinted, collateralValueInUsd);
    }

    function _calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
        internal
        pure
        returns (uint256)
    {
        if (totalDscMinted == 0) return type(uint256).max;
        uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
        return (collateralAdjustedForThreshold * 1e18) / totalDscMinted;
    }
```

## Rounding Up

Once we sector in the health factor, we can now successfully execute the function `revertIfHealthFactorIsBroken` in our `mintDsc` function.

```javascript
    function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {
        s_DSCMinted[msg.sender] += amountDscToMint;
        revertIfHealthFactorIsBroken(msg.sender);
        bool minted = i_dsc.mint(msg.sender, amountDscToMint);

        if (minted != true) {
            revert DSCEngine__MintFailed();
        }
    }
```

With `MIN_HEALTH_FACTOR` being defined as 1:

```javascript
    function revertIfHealthFactorIsBroken(address user) internal view {
        uint256 userHealthFactor = _healthFactor(user);
        if (userHealthFactor < MIN_HEALTH_FACTOR) {
            revert DSCEngine__BreaksHealthFactor(userHealthFactor);
        }
    }
```

If the User's health factor is less than the minimum health factor, the function will revert, preventing any issues with the health factor.

This is a lot of math, but hopefully, it gives you a glimpse into the complexity of designing a robust DeFi platform. If any part of this discussion was unclear, please do not hesitate to reach out in the comments or run it with your AI to ensure it makes sense.

## That's a wrap!

And there we go! We've successfully upgraded our health factor function, ensuring absolute clarity and precision in the numbers. Remember, success in DeFi comes down to robust code and a precise understanding of the algorithms backing it up. Happy coding!
