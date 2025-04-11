---
title: Fuzz Test Debugging
---

_Follow along the course with this video._

---

### Fuzz Test Debugging

In the last lesson, we left off with a small issue in our tests. For some reason our totalSupply was never increasing, which implies that our new mintDsc function is never being called.

Let's start by debugging this issue. One way we attempt to figure out what's happening is through the use of [**Ghost Variables**](https://book.getfoundry.sh/forge/invariant-testing?highlight=ghost%20v#handler-ghost-variables).

Ghost variables are declared in our handler and essentially function like state variables for our tests. Something we can do then, is declare `timesMintIsCalled` and have this increment within our mintDsc function.

```solidity
contract Handler is Test {
    ...
    uint256 public timesMintIsCalled;
    ...
    function mintDsc(uint256 amount) public {
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = engine.getAccountInformation(msg.sender);

        uint256 maxDscToMint = (collateralValueInUsd / 2) - totalDscMinted;
        if (maxDscToMint < 0) {
            return;
        }

        amount = bound(amount, 0, maxDscToMint);
        if (amount <= 0) {
            return;
        }

        vm.startPrank(msg.sender);
        engine.mintDsc(amount);
        vm.stopPrank();

        timesMintIsCalled++;
    }
}
```

With our ghost variable in place, we can now access this in our invariant test and console it out to glean some insight.

```solidity
function invariant_ProtocolTotalSupplyLessThanCollateralValue() external view returns (bool) {
    uint256 totalSupply = dsc.totalSupply();
    uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsce));
    uint256 totalWbtcDeposited = IERC20(wbtc).balanceOf(address(dsce));

    uint256 wethValue = dsce.getUsdValue(weth, totalWethDeposited);
    uint256 wbtcValue = dsce.getUsdValue(wbtc, totalWbtcDeposited);

    console.log("totalSupply: ", totalSupply);
    console.log("wethValue: ", wethValue);
    console.log("wbtcValue: ", wbtcValue);
    console.log("Times Mint Called: ", handler.timesMintIsCalled());

    assert(totalSupply <= wethValue + wbtcValue);
}
```

Run it!

::image{src='/foundry-defi/23-defi-fuzz-debugging/defi-fuzz-debugging1.png' style='width: 100%; height: auto;'}

Well, at least we've confirmed that mintDsc isn't being called. It's _likely_ because one of our conditionals in our function are catching. What I would suggest is moving our Ghost Variable up this function to determine why things revert.

Before moving on, I challenge you to determine what the bug here is. Work through the mintDsc function and challenge yourself!

<details>
<summary>The Bug</summary>

PSYCHE! Don't cheat. Try to find the bug!

<details>
<summary> The Bug For Real</summary>

Alright, my approach to finding this bug was by using the ghost variable described above, when I determined which line the mintDsc function was reverting on, I console logged the associated variables in that area of the function.

One of the variables I ended up checking was `msg.sender`.

When our fuzzer is running, it's going to make random function calls, but it also calls those function with random addresses. What's happening in our test is that the address that was minting DSC was always different from the addresses which had deposited collateral!

In order to mitigate this issue, we'll need to track the address which deposit collateral, and then have the address calling mintDsc derived from those tracked addresses. Let's declare an address array to which addresses that have deposited collateral can be added.

```solidity
contract Handler is Test {
    ...
    uint256 public timesMintIsCalled;
    address[] usersWithCollateralDeposited;
    ...
    function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        amountCollateral = bound(amountCollateral, 1, MAX_DEPOSIT_SIZE);
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);

        vm.startPrank(msg.sender);
        collateral.mint(msg.sender, amountCollateral);
        collateral.approve(address(dsce), amountCollateral);
        dsce.depositCollateral(address(collateral), amountCollateral);
        vm.stopPrank();

        usersWithCollateralDeposited.push(msg.sender);
    }
}
```

This new array of addresses with collateral can now be used as a seed within our mintDsc function, much like the collateralSeed in depositCollateral.

```solidity
function mintDsc(uint256 amount, uint256 addressSeed) public {
    address sender = usersWithCollateralDeposited[addressSeed % usersWithCollateralDeposited.length]
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = engine.getAccountInformation(sender);

    uint256 maxDscToMint = (collateralValueInUsd / 2) - totalDscMinted;
    if (maxDscToMint < 0) {
        return;
    }

    amount = bound(amount, 0, maxDscToMint);
    if (amount <= 0) {
        return;
    }

    vm.startPrank(sender);
    engine.mintDsc(amount);
    vm.stopPrank();

    timesMintIsCalled++;
}
```

Let's give our tests a shot now.

```bash
forge test --mt invariant_ProtocolTotalSupplyLessThanCollateralValue -vvvv
```

::image{src='/foundry-defi/23-defi-fuzz-debugging/defi-fuzz-debugging2.png' style='width: 100%; height: auto;'}

A new error! New errors mean progress. It seems as though our mintDsc function is causing a `division or modulo by 0`. Ah, this is because our new array of usersWithCollateralDeposited may be empty. Let's account for this with a conditional.

```solidity
function mintDsc(uint256 amount, uint256 addressSeed) public {

    if(usersWithCollateralDeposited.length == 0){
        return;
    }

    address sender = usersWithCollateralDeposited[addressSeed % usersWithCollateralDeposited.length]
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = engine.getAccountInformation(sender);

    uint256 maxDscToMint = (collateralValueInUsd / 2) - totalDscMinted;
    if (maxDscToMint < 0) {
        return;
    }

    amount = bound(amount, 0, maxDscToMint);
    if (amount <= 0) {
        return;
    }

    vm.startPrank(sender);
    engine.mintDsc(amount);
    vm.stopPrank();

    timesMintIsCalled++;
}
```

Once more with feeling.

::image{src='/foundry-defi/23-defi-fuzz-debugging/defi-fuzz-debugging3.png' style='width: 100%; height: auto;'}

</details>

</details>


### Wrap Up

This is amazing! Our test is passing, we have totalSupply being reported _and_ we can see that our mintDsc function is now being called. Our handler is getting closer and closer to containing all of the functions we would want to test.

Another challenge I pose to you is to write your own invariant test within `Invariants.t.sol` to check our `getter functions`. This test should be an easy one, simply call all the `getter functions` and ensure things don't revert!

In the next lesson, we'll investigate how the handler can be used to manage the behaviour of some of our other dependencies, not just DSCEngine.sol!

See you soon!
