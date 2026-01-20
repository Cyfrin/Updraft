---
title: Integer Overflow - Mitigation
---

_Follow along with this video:_

---

### Mitigation

Integer over/underflow is actually fairly straightforward to mitigate against.

```js
function selectWinner() external {
    require(block.timestamp >= raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not over");
    require(players.length >= 4, "PuppyRaffle: Need at least 4 players");
    uint256 winnerIndex =
        uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
    address winner = players[winnerIndex];
    uint256 totalAmountCollected = players.length * entranceFee;
    uint256 prizePool = (totalAmountCollected * 80) / 100;
    uint256 fee = (totalAmountCollected * 20) / 100;
    // @Audit: Newer version of Solidity, Bigger Uints
    totalFees = totalFees + uint64(fee);
```

In our `Puppy Raffle` protocol we would likely suggest a newer Solidity version. The use of a `uint64` is also just silly.

Foundry allows us to verify the max sizes of the numbers really conveniently through a `chisel` command. Typing `chisel` will start `chisel`, the command `type(uint64).max` will give an output like this:

```bash
Welcome to Chisel! Type `!help` to show available commands.
➜ type(uint64).max
Type: uint
├ Hex: 0x000000000000000000000000000000000000000000000000ffffffffffffffff
└ Decimal: 18446744073709551615
➜
```

_18 ETH due to having 18 decimal places_

If `Puppy Raffle` receives more than 18 ETH in fees, we're going to see overflow issues!

Experiment with `chisel` and try different `uint/int` types to get a sense for how big/small some of these common numbers are!
