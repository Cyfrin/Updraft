---
title: Lottery restart - Resetting an Array
---

_Follow along with this video:_

---

### Resetting the Player Array

Continuing from where we left in the last lesson. We've picked the winner, we've opened the lottery and ... what do we do with the players already in the array? They've had their chance to win and they didn't.

We add the following line inside the `fulfillRandomWords` function:

```solidity
s_players = new address payable[](0);
```

This initializes a new empty array over the existing array, which is another way of saying **we wipe out the existing array**.

Additionally, given that we are starting up a fresh raffle, we also need to bring the `s_lastTimeStamp` to the present time.

```solidity
s_lastTimeStamp = block.timestamp;
```

The last thing we need to do is to emit an event that logs the fact that we picked a winner.

Put this in your events section: `event PickedWinner(address winner);`.

And emit it as the last line of the `fulfillRandomWords` function: `emit PickedWinner(winner);`.

Run a `forge build` to make sure everything compiles.

Great job!
