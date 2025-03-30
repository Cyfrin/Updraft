---
title: Reporting - Findings We'll Cover Later
---

_Follow along with this video:_

---

The next time you search your `@Audit` tag, you may come across a note I briefly mentioned on an MEV vulnerability in Puppy Raffle's `refund` function.

```js
function refund(uint256 playerIndex) public {
    // @Audit: MEV
    address playerAddress = players[playerIndex];
    require(playerAddress == msg.sender, "PuppyRaffle: Only the player can refund");
    require(playerAddress != address(0), "PuppyRaffle: Player already refunded, or is not active");
    // slither-disable-next-line reentrancy-no-eth,reentrancy-events
    payable(msg.sender).sendValue(entranceFee);

    players[playerIndex] = address(0);
    emit RaffleRefunded(playerAddress);
}
```

We're actually going to skip this one for now. MEV's are something we'll return to later in the course to gain a deeper understanding of how they work.

For now, just mark this note as skipped and we'll continue to the next vulnerability.
