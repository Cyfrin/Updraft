---
title: Handler - Redeem Collateral
---

_Follow along the course with this video._

---

### Redeem Collateral

Now that we've the means to depositCollateral in our tests, let's write the function to do the opposite, redeemCollateral. We're going to set this up similarly to our depositCollateral function within `Handler.t.sol`.

```js
function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
}
```

Just like we bound the amountCollateral in our depositCollateral function, we'll need to do so here as well, but this time, the amount needs to be bound to the amount of collateral a user actually has! I added another getter function we can use for this.

```js
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

<img src="/foundry-defi/21-defi-handler-redeem-collateral/defi-handler-redeem-collateral1.png" width="100%" height="auto">

Uh oh, it looks like we're running into an issue when the maxCollateralToRedeem is 0. We can fix this with a small adjustment to our function.

We'll set the lower bounds of our `bound` function to `0`, additionally we'll add a conditional which will return if the `maxCollateralToRedeem == 0`.

```js
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

<img src="/foundry-defi/21-defi-handler-redeem-collateral/defi-handler-redeem-collateral2.png" width="100%" height="auto">

Woo, nailed it again! Our handler now allows us to test both the depositCollateral and redeemCollateral functionality of our protocol. Through the use of our handler, we've ensured that all the calls to deposit and redeem are going to be valid as well, avoiding reverts and wasted fuzz runs.

Something to keep in mind at this point is that `fail_on_revert` flag, however. While writing this test, you can see we've restricted the functionality such that a user is only going to attempt to redeem the collateral that they have. Were there a bug, which allowed users to redeem _more_ than they had, our test wouldn't catch the vulnerability!

### Wrap Up

We're crushing these stateful fuzz tests! We've written Handler functions for both our deposit and redeem functionalities within DecentralizedStableCoin.sol. In our testing, we've learnt the pros and cons of the `fail_on_revert` flag and how to be conscious of the false sense of security some of our test configurations may give us.

In the next lesson we're hittin the mintDsc function, can't wait!

In our previous parts, we discussed the concepts of fuzz testing our `depositCollateral()` and `redeemCollateral()` functions. Today, we'll be walking you through one of the key functions we need to test, the `mintDsc()` function.

## A Walk Through the Mint Function Test

Our `mintDsc()` function within `DSCEngine.sol` takes a `uint256 amount`. So our handler test will do the same, we also have to restrict our handler function to avoid reverts! Our `mintDsc()` function currently requires that `amount` not be equal to zero, and that the amount minted, does not break the user's `Health Factor`. Let's look at how this handler function is built:

```js
...
contract Handler is Test {
    ...
    function mintDsc(uint256 amountDsc) public {
        vm.prank(dsc.owner());
        dsc.mint(msg.sender, amountDsc);
    }
    ...
```

The above handler function ensures we're minting a random amount of DSC. But, there's a catch, we can't just let "amount" be an undefined value. It can't be zero, and the user should ideally have a stable health factor.

```js
amount = bound(amountDsc, 1, MAX_DEPOSIT_SIZE);
```

This adjustment makes sure the "amount" sits in between 1 and the maximum deposit size. Now let's make sure we aren't breaking the user's `Health Factor` with this call. We can do this by calling the `getAccountInformation()` function and checking what's returned with what the user is trying to mint:

```js
...
contract Handler is Test {
    ...
    function mintDsc(uint256 amount) public {
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(msg.sender);

        int256 maxDscToMint = (int256(collateralValueInUsd)/2) - int256(totalDscMinted);
        if(maxDscToMint < 0){
            return;
        }
        amount = bound(amount, 0, uint256(maxDscToMint));
        if (amount == 0){
            return;
        }

        vm.startPrank(msg.sender);
        dsce.mintDsc(amount);
        vm.stopPrank();
    }
}
```

In the above function, we are constraining the amount minted to be greater than zero before minting any DSC. In addition to this, we're checking the user's `totalDscMinted` vs their `collateralValueInUsd` to ensure their account's `health factor` is not at risk and they don't risk liquidation.

## Victory Looks Like This!

Lo and behold, let's run the functional mint DSC and observe the result.

::image{src='/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc1.PNG' style='width: 100%; height: auto;'}

You should notice that we've performed multiple calls without any reverts, and that's exactly what success looks like! Your mint function is now up and running and ready to increase the supply of DSC.

Stay tuned for our next adventure! We hope you are now more comfortable with testing the mechanism used for injecting tokens into the DSC ecosystem.

::image{src='/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc2.PNG' style='width: 100%; height: auto;'}
