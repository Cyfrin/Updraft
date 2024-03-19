---
title: Modular Verification Recap
---

---

## The Puzzle of Mathmasters' Sol

It all started with a head-scratcher of a question: Is Mathmasters' square root function doing its job correctly? For those of you who might be new to this, the function in question is written in assembly language—yep, the low-level stuff that talks almost directly to a computer's hardware. We tackled this by learning how to make sense of it, which as you can imagine, with all its complexities, is like trying to read ancient hieroglyphs without a Rosetta Stone.

![](https://cdn.videotap.com/618/screenshots/5glvFTHYEUB6qZgzU7qg-147.14.png)

One of the standout characteristics of the function is the use of the age-old Babylonian method for computing square roots. If that sounds Greek to you, don't worry, it was new to us too. Sure, we could've meticulously walked through every line of assembly code, but that's like looking for a needle in a haystack.

## An Unexpected Turn: Switching to Testing

Rather than following the traditional route, we turned a corner and embraced a more testing-focused strategy. It's all about being practical and letting our tools do some of the heavy lifting. And, when we talk about tools, we're referring to ones that hunt down bugs like they're going out of style.

So, with a dash of pragmatism, we rolled up our sleeves and decided to fuzz it!

### The Fuzzing Phenomenon

For the uninitiated, fuzzing is like throwing a bunch of random inputs at a program to see if it trips and falls somewhere. The end goal? Find the bugs that are hiding in the dark corners. We've played around with `soulmate` and `uniswap` square root functions before, both of which are pretty robust contenders.

Interestingly, the developers behind this protocol had the same idea. They set up their fuzzing duels, `test_square_root_fuzz_uni` and `test_square_root_fuzz_soulmate`, both came out swinging and passed with flying colors. But hold your horses! This didn't mean the battle was over; it was just getting started.

### Formally Verifying the Troublesome Function

Could there be an edge case, we pondered, hiding like a sly fox? Only one way to find out—formal verification, the Sherlock Holmes of bug detection.

We strutted into `certora`, our trusty tool, slapped on our detective hats, and set up a formal verification test using the same logic as our fuzz tests. And guess what? Turns out our case was too enigmatic for our solver—it faced the infamous path explosion problem. Simply put, it was too much of a labyrinth for our solver to tackle in any reasonable amount of time.

## A Revelation in Modular Verification

Back at square one, we had a eureka moment. By comparing the first halves of the `soulmate` and `mathmasters` Sol functions, we concluded if they matched, our puzzle would be closer to completion.

In our testing sandbox, we set up a modular verification for just the top halves. And eureka! We uncovered a bug in the `mathmasters` Sol, which led us to scrutinize a suspiciously random number filled with `FF`s. That was our smoking gun.

### Debugging with Hex Conversion

After decoding the hex, the oddity stood out like a sore thumb. With the issue corrected and another round of formal verification, `certora` gave us the all-clear—the two functions were now identical twins.

> "The moment when `certora` agrees that the `soulmate` is correct, you can bet your bottom dollar that our `mathmasters` square root function is just as accurate."

## Learning Beyond the Code

This journey was not just about squashing bugs; it was an enlightening path to mastering tools like `certora` and `halmos`. If technical terms and concepts made you feel cross-eyed, there's salvation in documentation. And for the open-source advocates, you can even contribute to making the docs better.

## Embarking on the Final Challenge

Now, rising stars of the dev world, pat yourselves on the back. Tackling the `mathmasters' sol` was equivalent to climbing a coding Everest. We navigated the treacherous terrains of `certora` and are now preparing to don our explorers' gear for one last odyssey—the advanced formal verification lesson with `gas bad NFT marketplace`.

### Advanced Verification: Into the Unknown

Dark mode aficionados, beware; the NFT marketplace visualization might not be the prettiest on the eyes. Nevertheless, it's ripe for our exploratory dives.

As we embark on this next foray, we're not just teaching you to verify contracts—we're handing you the keys to a kingdom of skills few have conquered. With less than a thousand samurai warriors wielding this power, you're in for an elite transformation.

## Afterword: The "Power Break" Suggestion

Now, before your brain combusts from an overload of knowledge, treat yourself. Whether it's a scoop of ice cream, lifting weights, or just a breath of fresh air—recharge, rejuvenate, and come back ready to conquer `gas bad`.

Remember, the power of modular verification is now at your fingertips, and with each step you take, the cryptic world of complex contracts becomes a little less baffling.
