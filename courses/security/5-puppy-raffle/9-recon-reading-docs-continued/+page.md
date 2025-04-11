---
title: Recon - Reading Docs Continued
---

_Follow along with this video:_

---

### Back to `enterRaffle`

```js
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

Back to our `main entry point` function, we see it's using a require statement. Now, this contract is using `pragma 0.7.6`, so custom reverts may not have existed then - but this is a great example of a note we'd want to take and something we should check later.

```js
function enterRaffle(address[] memory newPlayers) public payable {
    require(msg.value == entranceFee * newPlayers.length, "PuppyRaffle: Must send enough to enter raffle"); //@audit - Are custom reverts an option in 0.7.6?
    ...
}
```

A few additional details we notice as we traverse the function:

- Our require statement compares to `newPlayers.length` - _what happens if this is 0?_
- The `entranceFee` is an `immutable variable` - we can confirm this is initialized in the constructor.
- The raffle is keeping track of who has entered the raffle by pushing each index of `newPlayers[]` to `players[]`.

The last section of this function is finally our check for duplicates.

```js
// Check for duplicates
for (uint256 i = 0; i < players.length - 1; i++) {
    for (uint256 j = i + 1; j < players.length; j++) {
        require(players[i] != players[j], "PuppyRaffle: Duplicate player");
    }
}
```

With experience you'll be able to _smell_ bugs. You'll see messy blocks of code like the above and your intuition is going to kick in.

Can you spot the bug🐛?

### Wrap Up

We've learnt SO MUCH from this single entry point of this contract. I hope you've been taking notes of what we uncover as we go. These protocol's we're going through may be small in scope - but they won't always be. Building strong organizational habits now will benefit you later on.

Next, let's take a look at a repo in which we've compiled simplified examples of common exploits, maybe we'll find the bug mentioned above!
