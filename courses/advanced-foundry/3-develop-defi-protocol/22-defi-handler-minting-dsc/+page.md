---
title: Handler - Mint DSC
---

_Follow along the course with this video._

---

### Handler - mintDsc

In the last lesson our stateful fuzz tests were looking great, _but_ the validity of our tests was a little questionable because we haven't configured a way to mint any DSC during our tests. Because our totalSupply was always zero, changes to our collateral value were never going to violate our invariant.

Let's change that now by writing a mintDsc function for our Handler.

```solidity
function mintDsc(uint256 amount) public {}
```

To constrain our tests, there are a couple things to consider. Namely, we know the `amount` argument needs to be greater than zero or this function will revert with `DSCEngine__NeedsMoreThanZero`. So let's account for that by binding this value.

```solidity
function mintDsc(uint256 amount) public {
    amount = bound(amount, 1, MAX_DEPOSIT_SIZE);
    vm.startPrank(msg.sender);
    dcse.mintDsc(amount);
    vm.stopPrank();
}
```

Another consideration for this function is that it will revert if the Health Factor of the user is broken. We _could_ account for this in our function by assuring that's never the case, but this is an example of a situation you may want to avoid over-narrowing your test focus. We _want_ this function to revert if the Health Factor is broken, so in this case we'd likely just set `fail_on_revert` to `false`.

Situations like this will often lead developers to split their test suite into scenarios where `fail_on_revert` is appropriately false, and scenarios where `fail_on_revert` should be true. This allows them to cover all their bases.

Let's run our function and see how things look.

```bash
forge test --mt invariant_ProtocolTotalSupplyLessThanCollateralValue
```

![defi-handler-mint-dsc1](/foundry-defi/22-defi-handler-mint-dsc/defi-handler-mint-dsc1.png)

> ❗ **NOTE**
> The `totalSupply = 0` here because of a mistake we made, we'll fix it soon!

Ok, so things work when we have `fail_on_revert` set to `false`. We want our tests to be quite focused, so moving forward we'll leave `fail_on_revert` to `true`. What happens when we run it now?

![defi-handler-mint-dsc2](/foundry-defi/22-defi-handler-mint-dsc/defi-handler-mint-dsc2.png)

As expected, our user's Health Factor is breaking. This is because we haven't considered _who_ is minting our DSC with respect to who has deposited collateral. We can account for this in our test by ensuring that the user doesn't attempt to mint more than the collateral they have deposited, otherwise we'll return out of the function. We'll determine the user's amount to mint by calling our `getAccountInformation` function.

```solidity
function mintDsc(uint256 amount) public {
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(msg.sender);

    uint256 maxDscToMint = (collateralValueInUsd / 2) - totalDscMinted;
    if(maxDscToMint < 0){
        return;
    }

    amount = bound(amount, 0, maxDscToMint);
    if(amount < 0){
        return;
    }

    vm.startPrank(msg.sender);
    dsce.mintDsc(amount);
    vm.stopPrank();
}
```

Let's try it!

![defi-handler-mint-dsc3](/foundry-defi/22-defi-handler-mint-dsc/defi-handler-mint-dsc3.png)

### Wrap Up

Bam, no reverts at all! Beautiful! You may notice (and I left a note above), our totalSupply seems stuck at 0.

Sometimes passing tests can be deceptive...

We'll look more closely as what's going on and how we can fix it at the start of our next lesson!
