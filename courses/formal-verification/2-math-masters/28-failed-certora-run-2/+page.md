---
title: Analyzing a failed Certora Run 2
---

---

## **Chasing Bugs with Certora: A Deep Dive into Ensuring Code Integrity**

Ever found yourself asking, "Will this code alias 'Hellfunk' pass the test?" And deep inside, you argue that it won't, but hey, you decide to give it a go anyway! That's the curiosity that drives us programmers. Isn't it thrilling? But the real magic begins when we least expect it—as we comb through our applications for those sneaky bugs that somehow always find a way to creep in. Today, we're diving deep into one such session, meticulously dissecting our code with the unparalleled precision of Certora.

## **The Pursuit of a Flawless Function**

_Does this sound familiar to you?_ You've configured your storage correctly, and yet something's amiss. You wonder, "Is there a way to ensure this function call is error-proof?" It's like seeking a mythical beast that refuses to show itself. But that's the beauty of Certora—it doesn't give up.

So, imagine we're setting this up, running our tests, and then—there it is—the EMV (Ethereum Virtual Machine) `funk` static check passes as expected. But that's not all we're after, right? We want perfection. The `Hellfunk` must not fail, must not revert...but, alas! It does.

## **Putting Our Detective Hats On**

Let's delve deeper into the code. What's the saboteur here? The clue lies in the patterns, the variables sitting cozily on the right side of your screen, notably, dear old `99`. But this familiar adversary has a tale to tell. It points to the reason for failure, which we can only decipher through the call trace's intricate maze.

_Imagine scrolling through these digital breadcrumbs_... There it is: Global state—check! Storage state—check! These numbers were thrown into a state of havoc, yet bound by the numbers we demanded they take—like wild horses tamed by an expert handler. We told them exactly what to be, and they complied. This, folks, is the starting global state we yearned for.

## **The Setup and the Snag**

The setup is like a maestro conducting an orchestra, ensuring every instruction is played to precision. We have our `requires`, our safety latches, all neatly lined up.

And just when you think it's smooth sailing, _bam_—the `Hellfunk` flinches with a `revert`. But it's not defeat; it's a call to action! We zoom into the crux of the matter, the line that whispers the secret—line 21. It's like finding x on a treasure map.

## **Unboxing the Multiply and Subtract Mystery**

Something's up with `multiply`, it made subtraction go haywire. The elusive 'a' was '0', and 'B', the bold number '1'. Before you know it, we're evaluating branch conditions. Fast forward to line '105', and there's our culprit.

_Voilà!_ Certora sharpens its magnifying glass and reveals the truth—`99` is indeed a counterexample, a speck of dust in our otherwise immaculate code.

## **Celebrate the Small Victories**

Every bug found is a victory, a testament to our vigilance. So let's raise our virtual hats to Certora, our digital Sherlock, for pinpointing the bug. It's another chapter closed, another spec crafted with grit, to showcase that indeed, `Hellfunk` has the potential to stumble.

---

## **Final Thoughts: The Code is Only as Strong as Its Weakest Link**

Testing, scrutinizing, perfecting—that's our journey. Remember, no matter how many bugs we chase down, the thrill lies in the chase itself. It sharpens us, molds us into better developers. So, embrace the fails, the `reverts`, the line 21s, the line 105s, and every 99 that falls under our microscope.

_Let's pause and ponder the power of thorough testing, the ability to unveil the hidden, and the joy of coding not just to function, but to excel._

This much we know, dear reader—code integrity is not just a checkmark. It's a pledge we take, a standard we uphold, and an odyssey of relentless pursuit towards the elusive perfection of our craft. In this digital realm, where every byte counts and every function holds the key to seamless operations, we're not just programmers; we're the silent guardians of a world knit by lines of code.

So the next time you fire up Certora, remember the tale of `Hellfunk`, the lessons it taught us, and the bugs we unraveled. Because in the grand tapestry of software development, each thread—no matter how minute—contributes to the enduring strength of the whole.

_To all code crafters out there: Keep debugging, keep refining, and let the bits and bytes fall into immaculate harmony!_
