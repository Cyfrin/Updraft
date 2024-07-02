---
title: One Big Test

_Follow along with this video:_

---

### The biggest test you ever wrote

You are a true hero for reaching this lesson! Let's finalize the testing with a big function.

Up until now, we've tested parts of the contract with a focus on checks that should revert in certain conditions. We never fully tested the happy case. We will do that now.

Open your `RafleTest.t.sol` and add the following function:

```javascript
    function testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney() public raffleEntredAndTimePassed {
        // Arrange

        uint256 additionalEntrants = 5;
        uint256 startingIndex = 1;

        for (uint256 i = startingIndex; i < startingIndex + additionalEntrants; i++) {
            address player = address(uint160(i));
            hoax(player, 1 ether);
            raffle.enterRaffle{value:entranceFee}();
        }
    }

```

This is not the whole function but we break it to not overwhelm you.

1. We define the function, make it public and apply the `raffleEnteredAndTimePassed` modifier;
2. We define two new variables `additionalEntrants` and `startingIndex`;
3. We assign `1` to `startingIndex` because we don't want to start with `index 0`, you will see why in a moment;
4. We use a for loop that creates 5 addresses. If we started from `index 0` then the first created address would have been `address(0)`. `address(0)` has a special status in the Ethereum ecosystem, you shouldn't use it in tests because different systems check against sending to it or against configuring it. Your tests would fail and not necessarily because your smart contract is broken;
5. Inside the loop, we use `hoax` which acts as `deal + prank` to call `raffle.enterRaffle` using each of the newly created addresses. Read more about `hoax` [here](https://book.getfoundry.sh/reference/forge-std/hoax?highlight=hoax#hoax).

Ok, now we need to pretend to be Chainlink VRF and call `fulfillRandomWords`. We will need the `requestId` and the `consumer`. The consumer is simple, it's the address of the `Raffle` contract. How do we get the `requestId`? We did this in the previous lesson!

```javascript
    function testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney() public raffleEntredAndTimePassed {
        // Arrange

        uint256 additionalEntrants = 5;
        uint256 startingIndex = 1;

        for (uint256 i = startingIndex; i < startingIndex + additionalEntrants; i++) {
            address player = address(uint160(i));
            hoax(player, 1 ether);
            raffle.enterRaffle{value:entranceFee}();
        }

        vm.recordLogs();
        raffle.performUpkeep(""); // emits requestId
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 requestId = entries[1].topics[1];

        // pretend to be Chainlink VRF
        VRFCoordinatorV2Mock(vrfCoordinator).fulfillRandomWords(
            uint256(requestId),
            address(raffle)
        );

    }

```
6. We copy what we did in the previous lesson to get the `requestId` emitted by the `performUpkeep`;
7. We then use the `VRFCoordinatorV2Mock` to call the `fulfillRandomWords` function. This is usually called by the Chainlink nodes but given that we are on our local Anvil chain we need to do that action.
8. `fulfillRandomWords` expects a uint256 `requestId`, so we use `uint256(requestId)` to cast it from `bytes32` to the expected type.

With this last call we've finished the `Arrange` stage of our test. Let's continue with the `Assert` stage.

Before that, we need a couple of view functions in `Raffle.sol`:

```javascript
    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }
```

We'll use this one in testing the recent winner.


```javascript
    function testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney() public raffleEntredAndTimePassed {
        // Arrange

        uint256 additionalEntrants = 5;
        uint256 startingIndex = 1;

        for (uint256 i = startingIndex; i < startingIndex + additionalEntrants; i++) {
            address player = address(uint160(i));
            hoax(player, STARTING_USER_BALANCE);
            raffle.enterRaffle{value:entranceFee}();
        }

        uint256 prize = entranceFee * (additionalEntrants + 1);

        vm.recordLogs();
        raffle.performUpkeep(""); // emits requestId
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 requestId = entries[1].topics[1];

        uint256 previousTimeStamp = raffle.getLastTimeStamp();

        // pretend to be Chainlink VRF
        VRFCoordinatorV2Mock(vrfCoordinator).fulfillRandomWords(
            uint256(requestId),
            address(raffle)
        );

        assert(uint256(raffle.getRaffleState()) == 0);
        assert(raffle.getRecentWinner() != address(0));
        assert(raffle.getNumberOfPlayers() == 0);
        assert(raffle.getLastTimeStamp() > previousTimeStamp);
        assert(raffle.getRecentWinner().balance == STARTING_USER_BALANCE + prize);
    }
```

9. We've made some changes. Whenever you test things make sure to be consistent and try to avoid using magic numbers. We hoaxed the newly created addresses with `1 ether` for no obvious reason. We should use the `STARTING_USER_BALANCE` for consistency.
10. We created a new variable `previousTimeStamp` to record the previous time stamp, the one before the actual winner picking happened.

Now we are ready to start our assertions.

11. We assert that the raffle state is `OPEN` because that's how our raffle should be after the winner is drawn and the prize is sent;
12. We assert that we have chosen a winner;
13. We assert that the `s_players` array has been properly reset, so players from the previous raffle don't get to participate in the next one without paying;
14. We assert that the `fullfillRandomWords` updates the `s_lastTimeStamp` variable;
15. We assert that the winner receives their ETH prize;
 
Amazing work, let's try it out with `forge test --mt testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney --vv`.

Aaaaand it failed:

```
Ran 1 test suite in 2.35s (11.16ms CPU time): 0 tests passed, 1 failed, 0 skipped (1 total tests)

Failing tests:
Encountered 1 failing test in test/unit/RaffleTest.t.sol:RaffleTest
[FAIL. Reason: panic: assertion failed (0x01)] testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney() (gas: 362400)
```

Failing is part of this game, whatever you do, at some point you will fail. The trick is not staying in that situation, let's see why this failure happened and turn it into success.

First of all, using `assert` is not necessarily the best thing to do in your test. Foundry comes with better assertions than the basic solidity `assert` that doesn't tell you much. Access this [link](https://book.getfoundry.sh/reference/ds-test#asserting) to check examples of all the possible assertions.

Replace the existing assertions with the following:

```javascript
        assertEq(uint256(raffle.getRaffleState()),0);
        assertTrue(raffle.getRecentWinner() != address(0));
        assertEq(raffle.getNumberOfPlayers(), 0);
        assertGt(raffle.getLastTimeStamp(), previousTimeStamp);
        assertEq(raffle.getRecentWinner().balance, STARTING_USER_BALANCE + prize);
```

Let's run the test again using `forge test --mt testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney -vvv`.

Let's look at the output of the failing test:

```
    ├─ [373] Raffle::getRaffleState() [staticcall]
    │   └─ ← [Return] 0
    ├─ [0] VM::assertEq(0, 0) [staticcall]
    │   └─ ← [Return] 
    ├─ [431] Raffle::getRecentWinner() [staticcall]
    │   └─ ← [Return] 0x0000000000000000000000000000000000000005
    ├─ [0] VM::assertTrue(true) [staticcall]
    │   └─ ← [Return] 
    ├─ [369] Raffle::getNumberOfPlayers() [staticcall]
    │   └─ ← [Return] 0
    ├─ [0] VM::assertEq(0, 0) [staticcall]
    │   └─ ← [Return] 
    ├─ [325] Raffle::getLastTimeStamp() [staticcall]
    │   └─ ← [Return] 32
    ├─ [0] VM::assertGt(32, 1) [staticcall]
    │   └─ ← [Return] 
    ├─ [431] Raffle::getRecentWinner() [staticcall]
    │   └─ ← [Return] 0x0000000000000000000000000000000000000005
    ├─ [0] VM::assertEq(10050000000000000000 [1.005e19], 10060000000000000000 [1.006e19]) [staticcall]
    │   └─ ← [Revert] assertion failed: 10050000000000000000 != 10060000000000000000
    └─ ← [Revert] assertion failed: 10050000000000000000 != 10060000000000000000

Suite result: FAILED. 0 passed; 1 failed; 0 skipped; finished in 3.93ms (284.70µs CPU time)
```

Starting from the beginning, we see the `getRaffleState` call, then the `assertEq(0, 0)` which passes, this was our first check. After that we see `getRecentWinner` and the `assertTrue` that passes, this was the second check. Following that comes the `getNumberOfPlayers` call and the `assertEq(0, 0)` that passes, this was the third check. The next is `getLastTimeStamp` which returns `32`, followed by `assertGt(32, 1)` which yields true, because 32 is greater than 1, this was the fourth check. The only check left is the balance of the winner being equal to `STARTING_USER_BALANCE + prize`.

We know from that execution tree that the winner is `address(5)` (0x0000000000000000000000000000000000000005). Let's go through all the things that changed the balance of `address(5)`:

1. `address(5)` was hoaxed with STARTING_USER_BALANCE;
2. `address(5)` paid the `entranceFee`;
3. `address(5)` won the `prize`, i.e. `entranceFee * (additionalEntrants + 1)`.

Did you spot it? If not please read the 3 balance changing actions and check it against our assertion.

The 3 steps above are not represented in this check `assertEq(raffle.getRecentWinner().balance, STARTING_USER_BALANCE + prize);` because we never subtract the paid `entranceFee`.

Change the last assertion to:

```javascript
        assertEq(raffle.getRecentWinner().balance, STARTING_USER_BALANCE - entranceFee + prize);
```

Run the test with `forge test --mt testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney`.

```
[⠢] Compiling...
No files changed, compilation skipped

Ran 1 test for test/unit/RaffleTest.t.sol:RaffleTest
[PASS] testFulfillRandomWordsPicksAWinnerRestesAndSendsMoney() (gas: 287531)
Suite result: ok. 1 passed; 0 failed; 0 skipped; finished in 2.93ms (250.30µs CPU time)
```

Amazing work! Let's try some forked tests in the next lesson.

