---
title: Perform Upkeep
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/EIYRoNCkUz0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Today we'll be specifically digging into `PerformUpkeep` tests. Writing and testing functions within your code are vital to a healthy codebase. This post will walk you through the process, step-by-step, using JavaScript, making sure to cover every detail the original transcript provides.

## Function Test: `Perform Upkeep` can only run if `check upkeep` is true

Our journey starts with the function test `Perform Upkeep can only run if check upkeep is true`. Here's how you should go about it:

```javascript
function testPerformUpkeepCanOnlyRunIfCheckUpkeepIsTrue() public {
        // Arrange
        vm.prank(PLAYER);
        raffle.enterRaffle{value: raffleEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act / Assert
        // It doesnt revert
        raffle.performUpkeep("");
    }
```

To validate this function, you simply need to run it since, in Foundry, there's no `expect not revert`. Thus, if the transaction doesn't revert, the test is considered to be passed. Here's how:

```shell
forge test -m testPerformUpkeepCanOnlyRunIfCheckUpkeepIsTrue
```

If everything is set correctly, your test will pass. If for example, some parameters were commented out, it would inevitably fail because the `Perform upkeep` would fail. This prompts an error message stating 'Raffle upkeep not needed'.

<img src="/foundry-lottery/27-upkeep/upkeep1.png" style="width: 100%; height: auto;">

The completion of these steps has yielded a well-rounded test that allows you to screen for potential errors. To run this final version, you need to open your terminal and run the following command:

```shell
forge test -m [paste your function here]
```

Our programming journey, although complex, is also exciting. Stride forward with confidence, knowing that every error is a stepping stone to more robust code.
