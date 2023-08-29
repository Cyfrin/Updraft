---
title: Liquidation Setup
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/VbU0udZufO8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Understanding and Implementing De-Fi Liquidation Function

In the world of crypto and blockchain, understanding and executing key concepts such as depositing collateral, minting stablecoins, redeeming collateral, and liquidation is essential. A user can mint our stablecoin by depositing collateral, redeem their collateral for the minted stablecoin, or burn their stablecoin to improve their health factor.

## Implementing the Liquidation Function

An integral part of the system is the `liquidate()` function. This comes into play when we approach the phase of under-collateralization - we must start liquidating positions to prevent the system from crashing. Here's an example: suppose you have $100 worth of ETH backing $50 worth of DSC, and the price of ETH drops to $20. Now, we have $20 worth of ETH backing $50 worth of DSC, which makes the DSC worth less than a dollar. Hence, to prevent this scenario, positions need to be liquidated and removed from the system if the price of the collateral tanks.

The base of our `liquidate` function, with NatSpec should look like this:

```js
    /*
    * @param collateral: The ERC20 token address of the collateral you're using to make the protocol solvent again.
    * This is collateral that you're going to take from the user who is insolvent.
    * In return, you have to burn your DSC to pay off their debt, but you don't pay off your own.
    * @param user: The user who is insolvent. They have to have a _healthFactor below MIN_HEALTH_FACTOR
    * @param debtToCover: The amount of DSC you want to burn to cover the user's debt.
    *
    * @notice: You can partially liquidate a user.
    * @notice: You will get a 10% LIQUIDATION_BONUS for taking the users funds.
    * @notice: This function working assumes that the protocol will be roughly 150% overcollateralized in order for this to work.
    * @notice: A known bug would be if the protocol was only 100% collateralized, we wouldn't be able to liquidate anyone.
    * For example, if the price of the collateral plummeted before anyone could be liquidated.
    */
    function liquidate(address collateral, address user, uint256 debtToCover) external moreThanZero nonReentrant {...}
```

In cases of nearing under-collateralization, the protocol pays someone to liquidate the positions. This gamified incentive system provides an opportunity for users to earn "free money" by removing other people's positions in the protocol.

## Bonus for Liquidators

To incentivize the liquidation process, the protocol offers a bonus for the liquidators. For example, upon liquidating $75, the liquidator can claim the whole amount by paying back $50 of DSC, effectively gaining a bonus of $25.

Note that this system works only when the protocol is always over-collateralized. If the price of the collateral plummets before anyone can liquidate, the bonuses would no longer be available to the liquidators.

## Checking the User's Health Factor

The first thing we have to be sure of when calling the `liquidate` function is, can this user be liquidated? We're going to implement a check which will revert if the user's health factor is OK. Fortunately we already have a function we can use to check (`healthFactor()`)!

```js
...
error DSCEngine__HealthFactorOk();
...
    function liquidate(address collateral, address user, uint256 debtToCover)
        external
        moreThanZero(debtToCover)
        nonReentrant {
        uint256 startingUserHealthFactor = _healthFactor(user);
        if (startingUserHealthFactor >= MIN_HEALTH_FACTOR) {
            revert DSCEngine__HealthFactorOk();
        }
        uint256 tokenAmountFromDebtCovered = getTokenAmountFromUsd(collateral, debtToCover);
        ...
    }
```

```js
    function getTokenAmountFromUsd(address token, uint256 usdAmountInWei) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        // $100e18 USD Debt
        // 1 ETH = 2000 USD
        // The returned value from Chainlink will be 2000 * 1e8
        // Most USD pairs have 8 decimals, so we will just pretend they all do
        return ((usdAmountInWei * PRECISION) / (uint256(price) * ADDITIONAL_FEED_PRECISION));
    }
```

For a precise liquidation process, you need to know exactly how much of a token (say ETH) is equivalent to a particular amount of USD. The above function takes care of this conversion.

## Liquidating and Multifying the Collateral

In order to incentivize liquidators and ensure the protocol remains over collateralized, the liquidator receives a bonus -- In our model, we've given a 10% bonus.

```js
...
contract DSCEngine is ReentrancyGuard {
    ...
    uint256 private constant LIQUIDATION_BONUS = 10; // This means you get assets at a 10% discount when liquidating
    ...
    function liquidate(address collateral, address user, uint256 debtToCover)
        external
        moreThanZero(debtToCover)
        nonReentrant
    {
        ...
        uint256 bonusCollateral = (tokenAmountFromDebtCovered * LIQUIDATION_BONUS) / 100;
        uint256 totalCollateralToRedeem = tokenAmountFromDebtCovered + bonusCollateral;
        ...
    }
    ...
}
```

The liquidator gets a bonus and the total collateral to redeem becomes a sum of the token amount from debt covered and the bonus collateral.

## Wrapping Up

In conclusion, implementing a liquidation function in a cryptocurrency protocol guarantees its survival and stability in times of under-collateralization. Remember, in a decentralized ecosystem, the health of the system has to be maintained over and above all.

If any part of this post doesn't make sense, don't hesitate to ask in the discussions forum, or Google it. Use the resources that you have to your advantage! In the next part we'll be refactoring and finishing up the `liquidate()` function.
