---
title: Liquidation Refactor
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/UhcyoZyIF5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Creating a Robust DeFi Protocol

Hello everyone and welcome back! In this section, we will discuss the importance of thorough testing and regular refactoring to build a robust and reliable decentralized finance (DeFi) protocol, we will also illustrate how code modifications can improve protocol functionality.

## Refining a DeFi protocol

Let's talk about the `redeemCollateral()` function in our DeFi protocol. Currently, it's a public function and takes token collateral address and amount collateral as inputs. It's hardcoded to the message sender, which works perfectly if the token collateral, address, and amount collateral belong to the person calling the function. However, it fails when we need to redeem someone else's collateral, as in the case of a third-party user with bad debt.

<img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor1.PNG" style="width: 100%; height: auto;">

With our DeFi protocol, we need to enhance this feature by augmenting our code. Thankfully, code modification can resolve this.

### Internal redeem collateral function

<img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor2.PNG" style="width: 100%; height: auto;">

Refactoring the code lets us create an internal `_redeemCollateral()` function to redeem collateral from anyone. Creating an internal function makes it accessible only by other functions within the contract, therefore enhancing the protocol's security by preventing unauthorized usage.

```js
function _redeemCollateral (address tokenCollateralAddress, uint256 amountCollateral, address from, address to) private {...}
```

We can include `address from` and `address to` in our input parameters in our internal function to enhance functionality. So, when someone undergoes liquidation, an address can be given from which to redeem and another one to receive the rewards.

We then move the original code in the public redeem collateral function to our newly created private function. We revise `msg.sender` to `from` and update our `CollateralRedeemed` event info accordingly.

```js
...
contract DSCEngine is ReentrancyGuard {
    ...
    event CollateralRedeemed(address indexed redeemFrom, address indexed redeemTo, address token, uint256 amount); // if redeemFrom != redeemedTo, then it was liquidated
    ...
    function _redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral, address from, address to)
        private
    {
        s_collateralDeposited[from][tokenCollateralAddress] -= amountCollateral;
        emit CollateralRedeemed(from, to, tokenCollateralAddress, amountCollateral);
        bool success = IERC20(tokenCollateralAddress).transfer(to, amountCollateral);
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
    }
    ...
}
```

This provides internal function usage in our public redeem collateral function. We then replace the original code with a call to our `_redeemCollateral` function, passing appropriate addresses for liquidation or redemption.

```js
    function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral)
        external
        moreThanZero(amountCollateral)
        nonReentrant
    {
        _redeemCollateral(tokenCollateralAddress, amountCollateral, msg.sender, msg.sender);
        revertIfHealthFactorIsBroken(msg.sender);
    }
```

Finally, in the liquidation process, we use `_redeemCollateral` to pull collateral from the user undergoing liquidation and transfer the amount to whoever called the `liquidate` function.

```js
    function liquidate(address collateral, address user, uint256 debtToCover)
        external
        moreThanZero(debtToCover)
        nonReentrant
    {
        uint256 startingUserHealthFactor = _healthFactor(user);
        if (startingUserHealthFactor >= MIN_HEALTH_FACTOR) {
            revert DSCEngine__HealthFactorOk();
        }
        // If covering 100 DSC, we need to $100 of collateral
        uint256 tokenAmountFromDebtCovered = getTokenAmountFromUsd(collateral, debtToCover);
        // And give them a 10% bonus
        // So we are giving the liquidator $110 of WETH for 100 DSC
        // We should implement a feature to liquidate in the event the protocol is insolvent
        // And sweep extra amounts into a treasury
        uint256 bonusCollateral = (tokenAmountFromDebtCovered * LIQUIDATION_BONUS) / 100;
        // Burn DSC equal to debtToCover
        // Figure out how much collateral to recover based on how much burnt
        _redeemCollateral(collateral, tokenAmountFromDebtCovered + bonusCollateral, user, msg.sender);
        ...
    }
```

## Iterative Refactoring

Iterative refactoring is indispensable for boosting protocol performance. In our case, besides revising the `redeemCollateral()` function, the `burnDSC()` function required a similar treatment. Just as in the redeem function, we created an internal `_burnDSC()` function to allow burning from any address.

The principal code changes entailed revising `msg.sender` to `onBehalfOf` and `dscFrom` within the burning event. Ensuring proper comments inside our code, specify that this internal function should only be called if the health factor checks are in place.

```js
    ...
    function burnDsc(uint256 amount) external moreThanZero(amount) {
        _burnDsc(amount, msg.sender, msg.sender);
        revertIfHealthFactorIsBroken(msg.sender); // I don't think this would ever hit...
    }
    ...
    function _burnDsc(uint256 amountDscToBurn, address onBehalfOf, address dscFrom) private {
        s_DSCMinted[onBehalfOf] -= amountDscToBurn;

        bool success = i_dsc.transferFrom(dscFrom, address(this), amountDscToBurn);
        // This conditional is hypothetically unreachable
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
        i_dsc.burn(amountDscToBurn);
    }
    ...
```

Applying these changes to the public `burnDSC()` function allows us to incorporate the burn DSC feature into the liquidation process. Here, the liquidator pays down the debt, thus reducing the minted DSC.

```js
    ...
    function liquidate(address collateral, address user, uint256 debtToCover)
        external
        moreThanZero(debtToCover)
        nonReentrant
    {
        ...
        _redeemCollateral(collateral, tokenAmountFromDebtCovered + bonusCollateral, user, msg.sender);
        _burnDsc(debtToCover, user, msg.sender);

        uint256 endingUserHealthFactor = _healthFactor(user);
        // This conditional should never hit, but just in case
        if (endingUserHealthFactor <= startingUserHealthFactor) {
            revert DSCEngine__HealthFactorNotImproved();
        }
        revertIfHealthFactorIsBroken(msg.sender);
    }
    ...
```

Note that we've also created Health Factor checks to ensure the integrity of the accounts of both the liquidator and the liquidatee is safe throughout this process.

<img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor3.PNG" style="width: 100%; height: auto;">

After such modifications, we should thoroughly validate protocol operation.

## Running tests and fine-tuning

Proper unit testing is crucial for creating a solid DeFi protocol. It ensures the code correctly handles various scenarios and edge cases. With modifications in place, we must fix any syntax errors and ensure our code compiles successfully. Regression testing can then assure us that the changes haven't caused any unforeseeable issues that cause existing features to break.

It is also crucial to keep a clear and coherent code structure with neat comments and clear variable names. This practice not only helps in debugging, but also aids security auditors and other developers in understanding the code smoothly.

<img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor4.PNG" style="width: 100%; height: auto;">

Takeaways:

- Good readable code along with comprehensive unit tests builds a strong DeFi protocol.
- Regular refactoring helps us improve protocol functionality, decrease chances of bugs and increases code maintainability.
- Adherence to CHECKS-EFFECTS-INTERACTIONS pattern ensures contract's state doesn't change unexpectedly during a transaction.

In the next few sections, we'll dive deep into testing methodologies and bug management. But for now, take that much-deserved break. So stretch those legs, fuel up, and meet us back here soon. Happy Coding!
