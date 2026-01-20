---
title: MEV - Puppy Raffle
---

_Follow along with this video:_

---

### Front Running in Puppy Raffle

Let's look at how Puppy Raffle was vulnerable to front running. Our Puppy Raffle's core function is `selectWinner`.

<details>
<summary>PuppyRaffle.sol::selectWinner</summary>

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
    totalFees = totalFees + uint64(fee);

    uint256 tokenId = totalSupply();

    // We use a different RNG calculate from the winnerIndex to determine rarity
    uint256 rarity = uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty))) % 100;
    if (rarity <= COMMON_RARITY) {
        tokenIdToRarity[tokenId] = COMMON_RARITY;
    } else if (rarity <= COMMON_RARITY + RARE_RARITY) {
        tokenIdToRarity[tokenId] = RARE_RARITY;
    } else {
        tokenIdToRarity[tokenId] = LEGENDARY_RARITY;
    }

    delete players;
    raffleStartTime = block.timestamp;
    previousWinner = winner;
    (bool success,) = winner.call{value: prizePool}("");
    require(success, "PuppyRaffle: Failed to send prize pool to winner");
    _safeMint(winner, tokenId);
}
```

</details>


Effectively, when the `selectWinner` function is called, the transaction is then sent to the MemPool. At this point anyone can see the results of the selectWinner function. If a user participating in the raffle identifies that they didn't win, the potential exists for them to refund their entry fee!

A user does this by recognizing that they lost, and then paying more gas to have their refund request processed before the `selectWinner` transaction.

This will lower the prize of the winner!

![mev-in-puppy-raffle1](/security-section-8/5-puppy-mev/mev-in-puppy-raffle1.png)

### Wrap Up

What a sore loser. Let's see how TSwap is affected next!
