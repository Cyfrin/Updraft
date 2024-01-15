---
title: Handler - Stateful Fuzz Test Debugging
---

_Follow along the course with this video._



# Debugging Your Code Using Ghost Variables

Recently, I was stuck in frustrating debugging mode, continually getting a 'total supply of zero' message, even though there was plenty of WETH and wrapped bitcoin about. The questions plaguing my attempts were: are we ever calling this function? Why are we getting a total supply of zero all the time? Eventually, I managed to crack the nut and here's how I did it, featuring a mysterious ghost variable, and other coding challenges to wrap your brain around.

## What are Ghost Variables?

If you have ever wondered if your function is not being called, then it's time to introduce a `ghost variable`. Although it sounds incredibly spooky, they are a practical way to track if a function is even being called. Here's how to use one. We want to create a variable named `timesMintIsCalled` which we use in our `Handler.t.sol` to track whether or not our `_mintDsc()` function is being called.

```js
...
contract Handler is Test {
    ...
    uint256 public timesMintIsCalled;
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
        timesMintIsCalled++;
    }
}
```

Then, when you run your test once again, you might see that `mintDsc()` is never called. Baffling indeed, but it might be because of a hit return that is stopping the call prematurely.

It's crucial to debug this situation, and there are various methods you could employ to achieve that. Personally, I found the most successful way through moving the `timesMintIsCalled++;` further upwards in the code until I found the line it was breaking on. Then, by console logging all the values of the variables around, I unearthed some very interesting insights, which brings us onto the second part:

## The Importance of the Message Sender

<img src="/foundry-defi/22-defi-handler-fuzz-debugging/defi-handler-fuzz-debugging1.PNG" style="width: 100%; height: auto;">

And, how does one keep a track of users who have deposited collateral? One way is, we can create an array of addresses in `Handler.t.sol` and push to this array `msg.sender` each time collateral is deposited. We'll then use this array in our `mintDsc()` function as a seed.

```js
...
contract Handler is Test {
    ...
    uint96 public constant MAX_DEPOSIT_SIZE = type(uint96).max;
    uint256 public timesMintIsCalled;
    address[] public usersWithCollateralDeposited;
    ...
    function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
        amountCollateral = bound(amountCollateral, 1, MAX_DEPOSIT_SIZE);
        dsce.depositCollateral(address(collateral), amountCollateral);

        vm.startPrank(msg.sender);
        collateral.mint(msg.sender, amountCollateral);
        collateral.approve(address(dsce), amountCollateral);
        dsce.depositCollateral(address(collateral), amountCollateral);
        vm.stopPrank();
        usersWithCollateralDeposited.push(msg.sender);
    }
}
```

Note that this can cause duplicate users by pushing the same address multiple times, but hey, let's keep it simple for now.

Now, back in Mint DSC, you can do something similar to what you did with collateral. Here's a small code snippet to help:

```js
...
contract Handler is Test {
    ...
    function mintDsc(uint256 amount, uint256 addressSeed) public {
        address sender = usersWithDepositedCollateral[addressSeed % usersWithDepositedCollateral.length];
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(sender);

        int256 maxDscToMint = (int256(collateralValueInUsd)/2) - int256(totalDscMinted);
        if(maxDscToMint < 0){
            return;
        }
        amount = bound(amount, 0, uint256(maxDscToMint));
        if (amount == 0){
            return;
        }

        vm.startPrank(sender);
        dsce.mintDsc(amount);
        vm.stopPrank();
    }
}
```

When you run the above test, you may get an error...

## Avoid Errors With Some Conditions

It's also crucial to handle any errors. The error we're seeing is due to our modulo `%` resulting in zero when `usersWithCollateralDeposited.length` is zero. In this case, before the code runs, you can add a condition to return if users with collateral length equals zero. This helps you skip calls where collateral is not deposited.

```js
...
function mintDsc(uint256 amount, uint256 addressSeed) public {
    if(usersWithDepositedCollateral.length == 0) {
        return;
    }
    ...
}
```

After these corrections, I found that the total times Mint was called was now 31 and we were getting a total supply. This signaled that the `mintDsc()` function in our handler was now actually working, and we were successfully calling `mintDsc()`!

## Always Check Your Getters

Finally, be sure to always check your getters. It's wise to always include an invariant function `invariant_gettersShouldNotRevert()`. Getters can be inserted here and if any of them revert, that would mean the function broke an invariant.

```js
function invariant_gettersShouldNotRevert() public view {
    ...
    dsce.getLiquidationBonus();
    dsce.getPrecision();
    ...
}
```

And to make sure you're including everything, you can use something like `forge inspect <Contract> methods`. This will reveal all methods that this contract has along with its function selectors. Look for all the view functions, and that can be used as a checklist of functions to call on a contract in your tests.

That's all for today! I hope you found this helpful for debugging your code and understanding better how to navigate the inevitable coding obstacles. Most importantly, remember to enjoy the journey - because that's where the real learning happens.
