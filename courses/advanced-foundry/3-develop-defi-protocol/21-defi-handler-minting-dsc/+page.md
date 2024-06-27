---
title: Handler - Minting DSC
---

_Follow along the course with this video._



# Decoding DSC: A Journey into testing the "Mint Function"

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

<img src="/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc1.PNG" style="width: 100%; height: auto;">

You should notice that we've performed multiple calls without any reverts, and that's exactly what success looks like! Your mint function is now up and running and ready to increase the supply of DSC.

Stay tuned for our next adventure! We hope you are now more comfortable with testing the mechanism used for injecting tokens into the DSC ecosystem.

<img src="/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc2.PNG" style="width: 100%; height: auto;">
