---
title: Handler - Redeeming Collateral
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/6VMj3ufdmrw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Handling Collaterals in Blockchain Transactions

Today we will dive into blockchain transactions and the handling of collaterals within those transactions. Specifically the deposit and redemption process of the collateral will be our focus. We will decipher a function for depositing collateral and subsequently a validation function for redeeming it. Details of implementing these functions and some interesting test cases will also be discussed.

## Implementation : Collateral Deposit Function

This function ensures that the submitted collateral is a valid deposit.

```js
...
contract Handler is Test {
    ...
    function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
        dsce.depositCollateral(address(collateral), amountCollateral);
    }
    ...
}
```

In this function, the type of collateral to deposit and amount of collateral to deposit are two required inputs which are Blockchain's unsigned integer represented in form of function arguments.

## Implementation : Collateral Redemption Function

After defining the deposit function, let's talk about the collateral redemption function. It's the process of retrieving a specific type of collateral from the deposited pool. The `redeemCollateral()` function, similar to the deposit function, takes an argument that specifies the type of collateral to redeem.

The function below shows the implementation of this process:

```js
    function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
        dscEngine.redeemCollateral(address(collateral), amountCollateral);
    }
```

<img src="/foundry-defi/20-defi-handler-redeem-collateral/defi-handler-redeem-collateral1.PNG" style="width: 100%; height: auto;">

```js
...
    function getCollateralBalanceOfUser(address user, address token) external view returns(uint256){
        return s_collateralDeposited[user][token];
    }
...
```

## Implementing Validity Checks

The `redeemCollateral()` function must have an the above check for validity. This is to ensure that the redemption request is not more than what the user has deposited. We do this by bounding the redemption amount between one and the max collateral to redeem.

```js
    ...
    uint256 maxCollateral = dscEngine.getCollateralBalanceOfUser(msg.sender, address(collateral));

        amountCollateral = bound(amountCollateral, 1, maxCollateral);
        if (amountCollateral == 0) {
            return;
        }
    ...
```

The whole function should look like this:

```js
    ...
    function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
        uint256 maxCollateral = dscEngine.getCollateralBalanceOfUser(msg.sender, address(collateral));

        amountCollateral = bound(amountCollateral, 1, maxCollateral);
        if (amountCollateral == 0) {
            return;
        }
        dscEngine.redeemCollateral(address(collateral), amountCollateral);
    }
    ...
```

## Exploring Edge Cases and Fixing Code Breaks

Running the above function may result in throwing an edge case as an error. In our example, it exposed a mistake in the bounding process. If the max collateral to redeem is zero, the system breaks. A solution to this is to keep zero as a valid input.

Then, we need to check if the collateral amount after bounding is equal to zero. If yes, we can simply return, else we would call the redeem collateral function.

```js
amountCollateral = bound(amountCollateral, 0, maxCollateral);
if (amountCollateral == 0) {
  return;
}
```

## Enhancing Adequacy of Test Cases with Fail and Revert

So far, we have ensured that the transactions are operating as intended. However, to stream out all possible scenarios for handling Collaterals, failing criteria with blanket reverts should be avoided. Inclusion of test cases which do not fail on revert allows broader coverage of potential edge cases and glitches in transaction handling. Consideration of such trade-off prospects in the design of fail criteria lends to the overall system robustness.

In conclusion, handling collaterals effectively necessitates robust deposit and redemption functions, comprehensive edge testing and safeguards for potential system inadequacy through well-thought strategies. Happy coding!
