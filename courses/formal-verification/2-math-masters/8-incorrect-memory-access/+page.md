---
title: Incorrect memory access Bug Recap
---

---

## Why We Care About Memory Manipulation

Before diving deeper, let's address why memory manipulation matters. When developing smart contracts, efficient memory use not only optimizes gas costs but also prevents critical errors. Overriding crucial pointers can wreak havoc, causing your smart contract to behave unpredictably or even fail entirely.

Now, let's unravel the memory snarl we've found ourselves in.

## The Wayward Memory Pointer

Here's the scenario: We've stored a value in memory intended for a specific operation. However, in a programming faux pas, we've overridden the free memory pointer. Anyone who has dabbled in smart contract development knows messing with this pointer is akin to a cardinal sin.

To add to our misery, when we execute a `revert` operation with this spoiled data, we're yanking information from the incorrect location. I can sense some of you shaking your heads in disbelief – yes, it's a facepalm moment.

"One of these pointers is definitely off its rocker," you might muse. And you'd most likely point an accusing finger at the override, suggesting, "This chap should point elsewhere!" And you'd be correct—overriding the free memory pointer is a definite no-no.

## Getting Memory Back on Track

To remedy our missteps, suppose we use the `mstore` at the zeroth position and insert our original value. What we expect is for the values to cuddle neatly into their intended spot. So, we're now thinking, "Alright, zeroth position, prepare yourself for some value!"

Following this corrective course, we sprinkle the memory with a dusting of zeros, padding our way down to ensure those four crucial bytes nestle cozily at the end. Here's how it would look:

```solidity
// Zero-padding at the zeroth position<Place Code Here>
```

![](https://cdn.videotap.com/618/screenshots/swuSsJCDri1WthjeKmRI-37.03.png)

When you trigger a `revert`, your aim is to declare, "Commence from `0X1C` and strut forth four bytes." By doing so, you're landing smack-dab on the function selector we intended to invoke – the `revert`.

_Blockquote: "That's precisely what we fancy to revert with. Kudos, this is the revert function selector!"_

However, what if amidst all this, the `revert` is mute, issuing a blank message instead of the expected reprimand? It’s like anticipating a burst of applause, but the audience never claps.

And for those auditors out there, I can hear you asking, "Why in the digital cosmos are you overstepping the free memory pointer, you absolute mad, insane person?" It’s a valid question, one that might inspire a mix of laughter and concern.

## A Step Further in Debugging

Having spotted the glitch, we must indeed question our sanity in the blockchain realm and contemplate if there's yet another twist to this tale. And there is!

"If only there was a way to ensure I'm not overriding critical pointers..." you might ponder, as the fear of gas wastage and security holes lingers ominously.

## Beyond the Basics: Evading Memory Mishaps

Now, let's talk best practices. Shall we?

First and foremost, always be mindful of the system pointers. These pointers, especially the free memory pointer, are the lifelines of your smart contract. Tread carefully and ensure you're not inadvertently altering them unless absolutely necessary.

Next, always double-check and test your memory allocations. Unit tests, my dear readers, could be your best friends here. They can catch these memory misallocations before they become headaches.

And for the visual learners, imagine this - a neatly organized memory stack, each byte sitting in its designated place, no overflow, no underflow, the perfect harmonious EVM symphony. That, dear reader, is the utopia we strive for. With rigorous testing and a thorough understanding of memory operations, you can achieve that level of serenity and confidence in your code.

![](https://cdn.videotap.com/618/screenshots/itdQwkAK48okWUMl1Ac9-67.11.png)

So let's all pledge to remain vigilant, lest we become that "absolute mad, insane person" who turns the free memory pointer into a playground of chaos.

## Wrapping Up the Memory Madness

In conclusion, our detour through the valley of incorrect memory access serves as a warning and a lesson. It may feel like a rollercoaster at times, but with attention to detail, a sprinkle of caution, and a dash of humor, we can avoid these pitfalls and write smart contracts that are robust, efficient, and most importantly—correct.

Stay curious, keep experimenting, but remember to respect the sanctity of the free memory pointer. May your blockchain ventures be free of memory mishaps and full of innovation.

Happy coding, everyone!
