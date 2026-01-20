---
title: Recon Continued
---

_Follow along with this video:_

---

Let's continue with our manual review of PuppyRaffle. So far we've gone through

- enterRaffle - where we uncovered a DoS vulnerability
- refund - we discovered is vulnerable to reentrancy
- getActivePlayerIndex - we found an edge case where players at index 0 aren't sure if they've entered the raffle!

Walking through the code, we're moving onto the `selectWinner` function. This is a big one, we'll have a lot to go over.

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

The function's NatSpec makes it's purpose quite clear.

```js
/// @notice this function will select a winner and mint a puppy
/// @notice there must be at least 4 players, and the duration has occurred
/// @notice the previous winner is stored in the previousWinner variable
/// @dev we use a hash of on-chain data to generate the random numbers
/// @dev we reset the active players array after the winner is selected
/// @dev we send 80% of the funds to the winner, the other 20% goes to the feeAddress
```

We can see the first thing this function is doing is performing some checks. Given what we recently learnt a reasonable question to ask might be _Is this following CEI?_

Well, in this instance the only thing happening after our external call is `_safeMint`. We're not really sure what this is yet, so we may come back to it.

```js
  (bool success,) = winner.call{value: prizePool}("");
  require(success, "PuppyRaffle: Failed to send prize pool to winner");
  _safeMint(winner, tokenId);
```

One of our checks requires the `raffleDuration` to have passed, verifying this variable is set properly would be another thing we would want to check. In this case the `raffleDuration` is set in our constructor, the `raffleStartTime` is set during the instant of deployment. Looks good.

```js
require(block.timestamp >=
  raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not over");
```

I encourage you to write these thoughts down in your `notes.md` file and actually write in-line notes to keep them organized. Being able to reference these thoughts during our write ups and later in the review is incredibly valuable to the process.

```js
// @Audit: Does this follow CEI?
// @Audit: Are the duration and time being set correctly?
// @Audit: What is _safeMint doing after our external call?
```

It's important to note the `selectWinner` function is external, so anyone can call it. The checks in this function will be really important, but they do look good.

Moving on, the next this thing function is doing is defining a `winnerIndex`.

```js
uint256 winnerIndex = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
address winner = players[winnerIndex];
```

It seems our function is using a pseudo-random number, modded by the player's array to choose our winning index. It then assigns the player at that index in the array to our `winner` variable.

This winner variable is used further in the function to distribute the `prizePool` as well as mint the winning NFT.

```js
(bool success,) = winner.call{value: prizePool}("");
require(success, "PuppyRaffle: Failed to send prize pool to winner");
_safeMint(winner, tokenId);
```

It's important that this selection is fair and truly random or this could be exploited by malicious actors fairly easily. My alarm bells are going off and I'm seeing a lot of red flags.

### Wrap Up

Having gone through the `selectWinner` function, we now have a better understanding of this process and how it's controlled.

The function can't be called until the `raffleDuration` has passed and there are at least 4 people entered. Once `selectWinner` is called and passes checks, it uses a pseudo-random method to determine a winner of the raffle and then transfers the `prizePool` and mints them an NFT.

The question becomes:

```js
// @Audit: Is this selection process fair/truly random?
```

Let's look more closely in the next lesson!

> **Challenge:** There is a **massive** bug with refund + selectWinner that we _don't_ go over here. I challenge you to find it!
