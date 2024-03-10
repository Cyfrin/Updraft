---
title: More Tests
---

_Follow along with this lesson and watch the video below:_



---

Alright, welcome back! Let's dive right into writing tests for our smart contracts with an emphasis on code coverage and efficiency. Hope you had a little break because, remember, breaks are essential for productivity and focus. Let's continue with our mission to enhance our test coverage.

Running `forge coverage` produces somewhat less-than-satisfactory results. So we need to push on and try to ramp up our coverage.

## Check Upkeep Tests

First up on our list is the `check upkeep` function from the raffle contract. This crucial method oversees the contract's health, and it's time that we provide solid tests for it. To start, do a bunch of slashes followed by `check upkeep` just to keep things tidy!

Remember, we have numerous scenarios to verify for the `check upkeep` function. For example, the method should return false if the contract lacks a balance, isn't open, or when enough time hasn't passed.

### Scenario I: Test Check Upkeep Returns False When Contract Has No Balance

```js
function testCheckUpkeepReturnsFalseIfItHasNoBalance() public {
        // Arrange
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act
        (bool upkeepNeeded, ) = raffle.checkUpkeep("");

        // Assert
        assert(!upkeepNeeded);
    }
```

In this particular test, we're mainly focused on the scenario where the contract doesn't have a balance. We're ensuring that all other conditions are met and verifying that lacking balance results in the function returning false.

We arrange our test by ensuring that sufficient time has passed by implementing `VM.warp` with the current `block.timestamp`, increased by the `interval`, then some and carry out `VM.roll` with `block.number + 1`.

The act section employs the `checkUpkeep` method and assigns the result to the `upkeep_needed` variable. Finally, we assert that not `upkeep_needed` equals true, confirming that the function returns false in this scenario.

### Scenario II: Test Check Upkeep Returns False When Raffle Isn't Open

```js
function testCheckUpkeepReturnsFalseIfRaffleIsntOpen() public {
        // Arrange
        vm.prank(PLAYER);
        raffle.enterRaffle{value: raffleEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        raffle.performUpkeep("");
        Raffle.RaffleState raffleState = raffle.getRaffleState();
        // Act
        (bool upkeepNeeded, ) = raffle.checkUpkeep("");
        // Assert
        assert(raffleState == Raffle.RaffleState.CALCULATING);
        assert(upkeepNeeded == false);
    }
```

The second scenario we're testing looks at the situation where the raffle isn't open. We arrange this by first entering the raffle with a stipulated entrance fee, after pretending to be the player with `VM.frank(player)`. We then kick off `performUpkeep` to initiate the calculating mode. Our function should return false at this point because the raffle is in the calculating state.

Once again, the `act` section involves running the `checkUpkeep` method, and we use `assert(upkeepNeeded == false);` or `assert not upkeep_needed` to confirm our expectation in the `assert` section.

### More Tests and Debug Mode

We still have more tests to write, and to get a clearer idea of the coverage required; consider running `forge coverage` in debug mode. This command will generate an output telling you exactly which lines haven't been covered.

```bash
forge coverage --report debug > coverage.txt


```

By outputting the report into a file called `coverage.txt`, we can then review the generated report. This output details the precise lines of code not covered for each section.

## Challenge

Now that you're well-versed in the dynamics of testing for contract health, I challenge you to write two more tests:

1. `function testCheckUpkeepReturnsFalseIfEnoughTimeHasntPassed`: This checks if enough time has passed before performing assertions.

Feel free to compare these tests with the ones available on the linked GitHub repository for this course. Happy testing!
