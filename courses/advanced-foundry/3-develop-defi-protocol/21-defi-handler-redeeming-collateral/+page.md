---
title: Handler - Redeem Collateral
---

_Follow along the course with this video._

---

### Redeem Collateral

Now that we've the means to depositCollateral in our tests, let's write the function to do the opposite, redeemCollateral. We're going to set this up similarly to our depositCollateral function within `Handler.t.sol`.

```solidity
function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
}
```

Just like we bound the amountCollateral in our depositCollateral function, we'll need to do so here as well, but this time, the amount needs to be bound to the amount of collateral a user actually has! I added another getter function we can use for this.

```solidity
function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
    uint256 maxCollateralToRedeem = dsce.getCollateralBalanceOfUser(address(collateral), msg.sender);

    amountCollateral = bound(amountCollateral, 1, maxCollateralToRedeem);

    dsce.redeemCollateral(address(collateral), amountCollateral);
}
```

Let's run it!

```bash
forge test --mt invariant_ProtocolTotalSupplyLessThanCollateralValue -vvvv
```

![defi-handler-redeem-collateral1](/foundry-defi/21-defi-handler-redeem-collateral/defi-handler-redeem-collateral1.png)

Uh oh, it looks like we're running into an issue when the maxCollateralToRedeem is 0. We can fix this with a small adjustment to our function.

We'll set the lower bounds of our `bound` function to `0`, additionally we'll add a conditional which will return if the `maxCollateralToRedeem == 0`.

```solidity
function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
    uint256 maxCollateralToRedeem = dsce.getCollateralBalanceOfUser(address(collateral), msg.sender);

    amountCollateral = bound(amountCollateral, 0, maxCollateralToRedeem);
    if(amountCollateral == 0){
        return;
    }

    dsce.redeemCollateral(address(collateral), amountCollateral);
}
```

![defi-handler-redeem-collateral2](/foundry-defi/21-defi-handler-redeem-collateral/defi-handler-redeem-collateral2.png)

Woo, nailed it again! Our handler now allows us to test both the depositCollateral and redeemCollateral functionality of our protocol. Through the use of our handler, we've ensured that all the calls to deposit and redeem are going to be valid as well, avoiding reverts and wasted fuzz runs.

Something to keep in mind at this point is that `fail_on_revert` flag, however. While writing this test, you can see we've restricted the functionality such that a user is only going to attempt to redeem the collateral that they have. Were there a bug, which allowed users to redeem _more_ than they had, our test wouldn't catch the vulnerability!

### Wrap Up

We're crushing these stateful fuzz tests! We've written Handler functions for both our deposit and redeem functionalities within DecentralizedStableCoin.sol. In our testing, we've learnt the pros and cons of the `fail_on_revert` flag and how to be conscious of the false sense of security some of our test configurations may give us.

In the next lesson we're hittin the mintDsc function, can't wait!
