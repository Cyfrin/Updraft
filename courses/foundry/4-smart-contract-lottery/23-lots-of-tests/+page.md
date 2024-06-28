---
title: Lots of Tests
---

_Follow along with this lesson and watch the video below:_



---

Let's shift our focus towards a programmatic approach to software development. One of the best ways to write robust, reliable code begins with writing some solid tests for it. At this point in your development journey, you may be thinking, "Where do I start?" Let's dive into creating tests with forge coverage.

Before starting, it's worth mentioning that coverage isn't the be-all and end-all of software testing, but the more you practice writing tests, the better your software will be. Along the way, you'll also pick up nifty tips and tricks that will help you write better code and better tests.

## Start with Simple Test: Validate `EnterRaffle` Function

As an initial step, we'll start with creating tests for the `EnterRaffle` function.

```javascript
function enterRaffle() public payable {...}
```

Here is how we create a basic test:

```javascript
   function testRaffleRevertsWHenYouDontPayEnought() public {
        // Arrange
        vm.prank(PLAYER);
        // Act / Assert
        vm.expectRevert(Raffle.Raffle__SendMoreToEnterRaffle.selector);
        raffle.enterRaffle();
    }
```

The name of the method here explains the test’s aim–to verify whether entering a raffle without sufficient payment results in an error. This test follows the Arrange-Act-Assert methodology.

## Arrange-Act-Assert: A Closer Look

Although it isn't necessary to type out 'Arrange-Act-Assert' every time you write a test, it cannot be overstated how crucial this concept is to write effective tests.

1. **Arrange**: This section sets up the necessary conditions for the test. In this case, it involves setting up a scenario where a user tries to enter the raffle without paying enough.
2. **Act**: We enact the circumstance we are testing– in this case, trying to access the raffle without the necessary funds.
3. **Assert**: The assert phase is where your tests confirm if the actual result meets the expected outcome.

<img src="/foundry-lottery/19-testing/testing1.png" style="width: 100%; height: auto;">

## Running the Test

To test this function, run the command `forge test -m "[Title of your test]"`. If written correctly, the test should pass.

<img src="/foundry-lottery/19-testing/testing2.png" style="width: 100%; height: auto;">

## Further Testing: Record Player Entrance

Another essential aspect to test is if our `players` array is being updated whenever a player enters the raffle successfully.

```javascript
 function testRaffleRecordsPlayerWhenTheyEnter() public {
        // Arrange
        vm.prank(PLAYER);
        // Act
        raffle.enterRaffle{value: raffleEntranceFee}();
        // Assert
        address playerRecorded = raffle.getPlayer(0);
        assert(playerRecorded == PLAYER);
    }
```

Similar to our first test, we create a scenario where a player enters the raffle and pays the required fee. The expected outcome would be that the `players` array records the player's address. However, since there is no way to access the `players` array as it is, we need to add an accessor function named `getPlayer`.

```javascript
    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
```

This function allows us by giving the index number of the player we want to get.

The final step would be to add the assertion which would verify if the `players` array recorded the player in the index we specified.

Remember to run the `forge test -m "[Title of your test]"` command to check if your test passes.

Using these foundational principles, we're well on our way to creating a battery of tests.

Stay tuned for our upcoming posts where we'll dive deeper into writing more sophisticated tests for different scenarios, learning about function selectors and more. Happy testing!
