---
title: Recon - Reading Docs Continued
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/eLecAxF3NzU" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unravelling Solidity 0.7.6: Custom Reverts, Entrance Fees, and Subtle Bugs

In this deep dive, we're going to get our hands dirty with the old-but-gold version of Solidity—0.7.6. We'll explore a few nifty tricks, highlight some potential pitfalls, and wrap things up by identifying a rare bug hidden in the code.

![](https://cdn.videotap.com/iyVJ7Q1TioFr0xBkwxjL-5.17.png)## Understanding Reverts in Solidity 0.7.6

You may be familiar with the newer versions of Solidity that come with custom reverts—a feature that wasn't evidently available when Solidity 0.7.6 was launched. A common question that arises is:

> Were custom reverts available in Solidity 0.7.6?

Let's take a look at some of the code.

```js
require(message.value == entranceFee * newPlayers.length);
```

## Entrance Fee Calculation

The code above shows the `require()` function ensuring the `message.value` is equal to the `entranceFee` multiplied by the number of `newPlayers`. This essentially means that the entrance fee gets scaled according to the number of players. If there are no players (`newPlayers.length == 0`), then the total cost is also zero. A possible query at this point could be:

> What if `newPlayers.length == 0`? What can possibly happen then?

Now, if 10 players are added, the total cost will be whatever the `entranceFee` is, times ten. It's noteworthy that the `entranceFee` is set to be `immutable` and its value is assigned in the constructor.

## Handling Player Arrays

As the code continues, it performs some functions on an array of players.

```js
for (uint i = 0; i < newPlayers.length; i++) {players.push(newPlayers[i]);}
```

The code loops through the `newPlayers` array and pushes each player onto another array—`players`. This `players` array is a main storage variable where the raffle stores information about all participating players.

## Identifying Duplicate Players

Now, let's turn our attention to how the code handles duplication.

```js
for (uint i = 0; i < players.length; i++) {for (uint j = i + 1; j < players.length; j++) {if (players[i] == players[j]) {emit DuplicatePlayer(players[i]);}}}
```

To check for any duplicate players, the code loops through the `players` array...twice! It's essentially checking every player against each other for duplication. Once a duplication is found, an event is emitted to notify of the duplicate entry.

## The Hidden Bug

As experienced coders navigating through numerous code bases, one develops an innate ability to "smell" bugs or potential issues. In this case, if your senses are tingling, they're onto something!

```js
for (uint i = 0; i < players.length; i++) {for (uint j = i + 1; j < players.length; j++) {/*code here*/}}
```

The suspicious concern here is the double looping mechanism this block of code is following. Double loops in Solidity can be incredibly gas-expensive, and that's indeed a red flag. Seeing this practice should usually serve as an indication of a potential bug.

Wait a moment...there _is_ a bug in the code!

But what could that be? A double loop isn't exclusively a coding faux pas. However, if it's harboring and obfuscating a bug inside, that's when things get sinister. Can you figure out what exactly that bug is?
