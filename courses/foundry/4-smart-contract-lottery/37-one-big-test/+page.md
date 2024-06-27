---
title: One Big Test
---

_Follow along with this lesson and watch the video below:_



---

Today, we delve into the function-testing sphere of smart contract development by focusing on our Raffle contract functionality.

This guide will explore the construction and execution of extensive functionality tests through writing a big, novel function in a smart contract.

## Constructing the Test Function

Let's start off by creating a function titled `testFulfillRandomWordsPicksAWinnerResetsAndSendsMoney`.

This function will simulate a complete raffle lifecycle in a public setting. We'll adhere to our contract rules; enter the lottery several times, speed up the time, and operate routine maintenance. We also include a call to the Chainlink node to procure a random number.

Here is what the function set-up looks like:

```js
 function testFulfillRandomWordsPicksAWinnerResetsAndSendsMoney()
        public
        raffleEntered
        skipFork
    {}
```

## Mocking the Chainlink VRF

Within this function, an important call to the `fulfillRandomWords` function occurs. However, the intricacies of running on a local fake chain require us to impersonate the Chainlink VRF to call `fulfillRandomWords`.

<img src="/foundry-lottery/30-big-test/test1.png" style="width: 100%; height: auto;">

Consequently, we work within our local test environment and set up a pretend Chainlink node to call `fulfillRandomWords`.

## Adding Multiple Lottery Entries

Once this is set up, we add multiple entries to the lottery. We start with five additional entrants and a starting index of one because index zero does not apply here.

```js
  // Arrange
    uint256 additionalEntrances = 3;
    uint256 startingIndex = 1;

```

To make our raffle interesting, we create random entrants and generate unique addresses for each. We proceed to give each of them 1 ether using the Hoax cheat code and let them join the raffle.

In code, this looks like:

```js
 for (
            uint256 i = startingIndex;
            i < startingIndex + additionalEntrances;
            i++
        ) {
            address player = address(uint160(i));
            hoax(player, 1 ether); // deal 1 eth to the player
            raffle.enterRaffle{value: raffleEntranceFee}();
        }
```

## Engaging the Chainlink VRF

Now that we have a raffle filled with players, it's time to call in Chainlink VRF to generate a random number which we then use to pick a winner. We then assert various conditions to ensure all elements of the raffle have been reset and the winner is given the prize money.

## Debugging Failing Tests

During the initial test run, we faced an assertion violation. When writing code, it's inevitable that you'll encounter debugging issues. In our case, the issue originated from a balance comparison discrepancy due to not considering the entry fee paid by the player.

When revising our test, we accounted for the entrance fee and once we implemented those changes, our test yielded a pass result.

Our final test function may look a bit daunting at first, but each step within it serves important functionality and ensures our contract behaves as expected. And there you have it, a full testing function for entering, drawing, and resetting a raffle!

But we're not quite done yet; testing the coverage of our contract revealed a percentage coverage, with room for improvement. However, it was significantly better than the initial coverage. Despite this, our journey towards perfect function coverage continues...

This is how the final test looks like:

```js
function testFulfillRandomWordsPicksAWinnerResetsAndSendsMoney()
        public
        raffleEntered
        skipFork
    {
        address expectedWinner = address(1);

        // Arrange
        uint256 additionalEntrances = 3;
        uint256 startingIndex = 1; // We have starting index be 1 so we can start with address(1) and not address(0)

        for (
            uint256 i = startingIndex;
            i < startingIndex + additionalEntrances;
            i++
        ) {
            address player = address(uint160(i));
            hoax(player, 1 ether); // deal 1 eth to the player
            raffle.enterRaffle{value: raffleEntranceFee}();
        }

        uint256 startingTimeStamp = raffle.getLastTimeStamp();
        uint256 startingBalance = expectedWinner.balance;

        // Act
        vm.recordLogs();
        raffle.performUpkeep(""); // emits requestId
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 requestId = entries[1].topics[1]; // get the requestId from the logs

        VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
            uint256(requestId),
            address(raffle)
        );

        // Assert
        address recentWinner = raffle.getRecentWinner();
        Raffle.RaffleState raffleState = raffle.getRaffleState();
        uint256 winnerBalance = recentWinner.balance;
        uint256 endingTimeStamp = raffle.getLastTimeStamp();
        uint256 prize = raffleEntranceFee * (additionalEntrances + 1);

        assert(recentWinner == expectedWinner);
        assert(uint256(raffleState) == 0);
        assert(winnerBalance == startingBalance + prize);
        assert(endingTimeStamp > startingTimeStamp);
    }

```

In conclusion, writing a successful test suite is an iterative process, whether it's adjusting code or debugging errors, achieving a fully functional contract with a high coverage is definitely a satisfying feat!

Great job for sticking with it thus far, and happy coding!
