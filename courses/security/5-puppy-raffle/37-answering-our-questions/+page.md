---
title: Answering Our Questions
---

_Follow along with this video:_

---

### Answering Our Questions

This lesson will be a little unconventional. I'm going to list some of the questions that were raised as we performed our recon on Puppy Raffle. I want you to challenge yourself to answer these questions, then compare to my answers below!

Questions:

```js
// Q1: What resets the players array?

// Q2: What if enterRaffle is called with an empty array?

// Q3: In the case of getActivePlayerIndex - what if the player is at Index 0?

// Q4: Does the selectWinner function follow CEI?

// Q5: Are raffleDuration and raffleStartTime being set correctly?

// Q6: Why not use address(this).balance for the totalAmountCollected in the selectWinner function?

// Q7: Is the 80% calculation for winners rewards correct?

// Q8: Where do we increment the totalSupply/tokenId?

// Q9: Can a user simply force the selectWinner function to revert if they don't like the results?

// Q10: What happens if the winner is a contract with broken or missing receive/fallback functions?

// Q11: What happens if the feeAddress is a contract with broken or missing receive/fallback functions?
```

---

<details>
<summary>Answers!</summary>

```js
// A1: The players array is reset in the selectWinner function.

...
delete players;
raffleStartTime = block.timestamp;
previousWinner = winner;
(bool success,) = winner.call{value: prizePool}("");
...

// A2: If an empty array is submitted, an event is still emitted by the function. This will likely go in our report.

...
function enterRaffle(address[] memory newPlayers) public payable {
    require(msg.value == entranceFee * newPlayers.length, "PuppyRaffle: Must send enough to enter raffle");
    ...
    emit RaffleEnter(newPlayers);
}
...

// A3: A player at index zero, may believe they are not active in a raffle, as this function returns zero if a player is not found. This will also go in our report for sure.

...
function getActivePlayerIndex(address player) external view returns (uint256) {
    for (uint256 i = 0; i < players.length; i++) {
        if (players[i] == player) {
            return i;
        }
    }
    return 0;
}
...

// A4: No, the selectWinner function doesn't follow CEI and we would recommend to the protocol that it does. However, I happen to know this isn't an issue in this function, so we might flag this as informational.

// A5: They are being set in the constructor and seem to be configured properly.

...
constructor(uint256 _entranceFee, address _feeAddress, uint256 _raffleDuration) ERC721("Puppy Raffle", "PR") {
        entranceFee = _entranceFee;
        feeAddress = _feeAddress;
        raffleDuration = _raffleDuration;
        raffleStartTime = block.timestamp;
...

// A6: This may be a design choice, but without clear rationale or a protocol to ask, we may flag this as informational for now.

// A7: Yes, as per the documentation, 80% should be sent to the winner with 20% being retained in fees.

// A8: This is handled by the OpenZeppelin ERC721.sol contract. Ultimately being set by this declaration when a winner is selected:

...
uint256 tokenId = totalSupply();
...

// A9: Yes! This will probably be an issue we'll want to add to our report.

// A10: The winner wouldn't be able to receive their reward! This is definitely something we should report as a vulnerability.

// A11: Sending funds to the feeAddress with the withdrawFees function will probably fail, but this is very low impact as the owner can simply change the feeAddress.
```

</details>
