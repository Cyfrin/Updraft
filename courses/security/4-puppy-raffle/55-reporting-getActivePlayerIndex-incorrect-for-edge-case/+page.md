---
title: Reporting - getActivePlayerIndex Incorrect For Edge Case
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/ZMk0q50dCyA" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Error: Index Zero

Let's kick things off with `getActivePlayerIndex`. For some context: **if a player is at index zero, 'puppy raffle' returns zero too**. You might ask, so what? Well, here's a thing: playing with indexes can often get dicey and bring unexpected results.

> "If the player is at index zero, it'll return zero and a player might think they are not active."

Interesting, right? And now to discuss **how impactful this finding is**. To get a full picture, let's try and see some potential outcomes.

## Gauging The Impact

Does this issue cause any funds to be lost? Well, not so much. It does, however, impact the protocol rather severely. When players see that they are not active, they may try to enter the lottery again, which can be wasteful.

![](https://cdn.videotap.com/niK93K7C7GGxiHEpocIL-74.4.png)

Considering the possible outcomes, we shall term **the potential impact of this as low to medium**. The tricky thing here is to assess the likelihood of this happening, given its unexpected nature.

## Assessing the Severity

The severity can be considered low or even medium. But since no funds are at stake and the user can check storage where they are in the array, it's more like a good-to-have fix rather than a downright severe issue.

The subjective nature of this assessment comes into play here and different perspectives might find different solutions to be fit. However, let's move on to the course of action we would recommend.

## Reporting and Fixing The Problem

> "I would argue that this is a low. I think it would be understandable if somebody said it was a medium."

Having reported the issue, we now set out to explain it like we would to a five-year-old.

> `L1 puppy raffle getActivePlayerIndex returns zero for nonexistent players and for players at index zero, causing a player at index zero to incorrectly think they have not entered the raffle.`

Explicit and enlightening, to say the least!

## Show the Proof

How about we create a small proof of concept? The player enters the raffle, their index returns zero and they think they haven't entered correctly due to the function documentation. They may waste gas trying to reenter the raffle.

## Navigating the Fixes

Now the million dollar question: How do we fix this? We have a few possibilities at our disposal:

- Revert if the player is not in the array, instead of returning zero.
- Reserve the zero position for any void.
- Return an int -1 if the player is not detected in the activity.

All these solutions would work well depending on the specific conditions of the protocol, and can ensure an enhanced user experience and optimized protocol efficiency.

## Wrapping Up…

By addressing this single issue on the 'puppy raffle', we've only scratched the surface of smart contract auditing's complex and fascinating world. However, we hope that this post has illuminated some critical aspects of the process and demystified how auditors assess and address potential issues. Stick around for more insights!
