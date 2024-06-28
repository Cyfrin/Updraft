---
title: VM.Roll adn VM.Warp
---

_Follow along with this lesson and watch the video below:_



---

After successfully entering the raffle, the next step involves kicking off a 'perform upkeep'. This function changes the state of the raffle to ‘calculating’. To do this, the 'checkUpkeep' function will have to return a value of true.

Enough time must pass for this state transition to occur. In the context of working on a forked or local blockchain chain, things become interesting, and slightly tricky. On these chains, it's possible to modify the block time and block number. This can be achieved using the cheat codes 'VM warp' and 'VM roll'.

**Adjusting the Block Time**

```shell
vm.warp(block.timestamp + automationUpdateInterval + 1);
```

**Modifying the Block Number**

```shell
vm.roll(block.number + 1);
```

In the above code, 'VM warp' sets the block timestamp, while 'VM roll' modifies the block number. By adding '1' to each of these instances, the bonus block in the test ensures that the required time exceeds the interval.

However, an important note: **Remember to always pass some empty data while calling 'performUpkeep'**.

```shell
raffle.performUpkeep("");
```

## Testing the Calculating State

At this stage, the raffle should now be in the calculating state, so attempts to enter the raffle should fail. This can be simulated through the 'expect revert' function which expects the new attempt to join the raffle to be rejected by the contract.

```shell
vm.expectRevert(Raffle.Raffle__RaffleNotOpen.selector);
```

To test this, we'll be pranking the player with the next real call to revert. This can be achieved by invoking 'VM Prank Player' with the next real call to the raffle's 'enter' function.

```shell
vm.prank(PLAYER);
```

## Takeaways

Testing your smart contracts allows you to uncover potential bugs or loopholes in your code. Leveraging local blockchains provides an advantage of tweaking parameters like block time and number. Remember to be patient and thorough in your process, as this improves the reliability of the contracts you write. Happy testing!
