---
title: Recon Continued 2
---

_Follow along with this video:_

---

### Continuing Reconnaissance

We've already found **two** big bugs in this selectWinner function! This is great, let's continue down the code and see what else we uncover.

The next line in our code is `uint256 tokenId = totalSupply()`. It may be worth confirming where `totalSupply()` is coming from and making some in-line notes of questions to answer later.

```js
...
    //
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

We can see that `totalSupply()` is coming from our `ERC721 inheritance` and is returning `_tokenOwners.length`

```js
function totalSupply() public view virtual override returns (uint256) {
    // _tokenOwners are indexed by tokenIds, so .length() returns the number of tokenIds
    return _tokenOwners.length();
}
```

ERC721 is a very common token standard and tokenSupply is a well known function within it. You should absolutely familiarize yourself with these concepts. Ultimately things look good here, but we may want to make note:

```js
// @Audit: Where is tokenId/tokenSupply being incremented?
uint256 tokenId = totalSupply();
```

Continuing with our `selectWinner` function we next see that a token rarity is being determined. `Weak Randomness` is seen again! Something to note is - any time I see constants being used, I like to verify what they are. In this case the constants in this code are representing percentage changes of obtaining a giving rarity.

```js
// @Audit: Weak Randomness
uint256 rarity = uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty))) % 100;
//
if (rarity <= COMMON_RARITY) {
    tokenIdToRarity[tokenId] = COMMON_RARITY;
} else if (rarity <= COMMON_RARITY + RARE_RARITY) {
    tokenIdToRarity[tokenId] = RARE_RARITY;
} else {
    tokenIdToRarity[tokenId] = LEGENDARY_RARITY;
}
```

Following this, our function performs a number of state changes. Let's make note of what each of these is actually doing.

```js
delete players; // resetting the players array
raffleStartTime = block.timestamp; // resetting the raffle start time
previousWinner = winner; // vanity, doesn't impact much
```

Finally we see calls to send the `prizePool` and mint the NFT to the winner.

```js
(bool success,) = winner.call{value: prizePool}("");
require(success, "PuppyRaffle: Failed to send prize pool to winner");
_safeMint(winner, tokenId);
```

We may even suspect that `re-entrancy` is a risk here, given the order of these lines. So let's verify!

When a call is made externally, we should always ask ourselves what could happen in different scenarios.

- _What if the recipient is a smart contract?_

- _What if the contract doesn't have a receive/fallback function or forces a revert?_

- _What if the recipient calls another function through receive/fallback?_

The more experience you gain performing security reviews, the better your intuition will be about which questions to ask and what to watch out for.

In this particular circumstance, we see that the `selectWinner` function includes require statements that would prevent re-entrancy at this point in this code as we've already reset these state variables. Whew!

```js
require(block.timestamp >=
  raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not over");
require(players.length >= 4, "PuppyRaffle: Need at least 4 players");
```

However, if the winner had a broken `receive` function, `selectWinner` here would fail, it could actually be quite difficult to select a winner in that situation! We'll discuss impact and reporting of that a little later.

```js
// @Audit: Winner wouldn't be unable to receive rewards if fallback function was broken!
(bool success,) = winner.call{value: prizePool}("");
require(success, "PuppyRaffle: Failed to send prize pool to winner");
_safeMint(winner, tokenId);
```

Alright, we've completed a fairly thorough walkthrough of `selectWinner`, let's move onto the next function `withdrawFees`.

> As always there may be more bugs in these repos than we go over, keep a look out!

### Risks in withdrawFees

```js
function withdrawFees() external {
    require(address(this).balance == uint256(totalFees), "PuppyRaffle: There are currently players active!");
    uint256 feesToWithdraw = totalFees;
    totalFees = 0;
    (bool success,) = feeAddress.call{value: feesToWithdraw}("");
    require(success, "PuppyRaffle: Failed to withdraw fees");
}
```

So, let's break this function down to see what it's doing.

First we see a require statement and already a couple questions come to mind _Hint: there are issues with this line_

```js
// @Audit: If there are players, fees can't be withdrawn, does this make withdrawal difficult?
require(address(this).balance ==
  uint256(totalFees), "PuppyRaffle: There are currently players active!");
```

The next two lines are resetting our `totalFees`, seems fine.

```js
uint256 feesToWithdraw = totalFees;
totalFees = 0;
```

And finally we reach the external call which distributes the fees. It's worth noting that the address isn't the `owner`, fees are being sent to the `feeAddress` which our earlier `NatSpec` advises is controllable by the `owner`

```js
// @Audit: What if the feeAddress is a smart contract with a fallback/receive which reverts?
(bool success,) = feeAddress.call{value: feesToWithdraw}("");
require(success, "PuppyRaffle: Failed to withdraw fees");
```

### Wrap Up

We've covered two more functions in `Puppy Raffle` and I think we're on the trail of a couple more bugs. In the next lesson, lets answer some of the questions we asked here and look at better practices to employ in protocols such as these.
