---
title: Recap
---

---

**Title: Mastering Solidity: A Detailed Recap of MathMasters Debugging Adventures**

Phenomenal job, everyone in MathMasters! You’ve truly outdone yourselves by finding some amazing bugs. Before we conclude, let's take a moment to reflect on the treasure trove of knowledge we've gathered. From the start, our mission was crystal clear: ensure the MathMasters Solidity (Sol) codebase was bulletproof. What an expedition it's been—beginning with the crucial realization that custom errors were MIA in Solidity version 0.8.3, making their grand entrance only in version 0.8.4. Ah, the world of compilers, always teaching us the importance of details when securing a codebase.

Our examination of the MathMasters Sol codebase revealed a trio of functions worthy of attention: `Molwad`, `MolwadUp`, and `SquareRoot`. We owe a nod of gratitude to the developers behind Soulady and Soulmate for lighting the way with their ingenious work. Shoutout to their codebases—everyone who craves a peek at some top-notch assembly should absolutely check them out.

**Understanding the Wad Unit and Diving into Assembly**

The wad unit, a superstar concept popularized by MakerDAO, was another gem we uncovered. Born from the world of DapHub and daptools, it provided a solid base from which to grasp the intricacies of how numbers interact in the blockchain domain. Then, we dove headfirst into assembly reading, unveiling a range of functions and going in-depth on a particularly important component—the free memory pointer. A word to the wise: tampering with the free memory pointer can lead you into perilous lands.

> "In the grand theater of coding, the slightest misstep in memory management can be your downfall." – An astute Solidity sage

**The Art of Reversion and Revelations in Debugging**

As any code warrior knows, when a contract encounters a hiccup and reverts, it’s all about that revert error code. Our journey brought to light an erroneous implantation of this very code—tucked away in the memory, where it had no business being. Thanks to the Foundry debugger, we visualized what memory looked like in the midst of this chaos, offering us a practical, hands-on course in solidity troubleshooting.

**The Finer Points of `MolWad` and `MolWadUp`**

Our expertise was then rallied to validate `MolWad`, ensuring its arithmetic—multiplying `x` by `y` and dividing by `wad`, with a flourish of rounding down—worked without a hitch. Moving forward with aplomb, we descended upon `MolWadUp`, `MolWad`'s twin but with a penchant for rounding up. Here our mettle was tested anew, melding manual review, testing, and the revered techniques of formal verification. Indeed, it was the latter that spotlighted the aberration—a superfluous piece of code, an enigma, that had no place in the equation.

**Honing Skills with Formal Verification and Halmos**

Embracing the power of Halmos for formal verification—a system crafted to synchronize with Foundry—we mastered the craft of probing our functions with surgical precision. Check out this nifty snippet illustrating just how to invoke the might of Halmos to scrutinize our beloved `tezUp`.

Eager to expand our horizons, we allied with Certora, scripting a Certora spec to dissect the `molwatup` function intricately. The dance involved setting the stage with preconditions, executing operations with finesse, and concluding with a resounding assert.

**Demystifying Rules and Invariants with Certora**

Certora revealed its secrets to us by teaching the essence of rules and invariants—the dual keystones in the realm of formal verification. Rules, akin to tests, serve as the launchpad for Certora’s scrutiny, while invariants chime in as succinct one-liners that echo the perpetual truths within our code. Here's how we fluidly translated rules into invariants and back again, guiding us in choosing the right lens for inspecting our code.

**Squaring Up to `SquareRoot` and Modular Verification**

And then, the formidable `SquareRoot` function emerged, casting us into a labyrinth of testing challenges. How to validate this enigmatic juggernaut? The answer lay in modular verification. By disassembling the function and fashioning a test harness to pit against our MathMasters counterpart, we were poised to conquer. Certora’s hawk-eyes caught the slip of an errant hexadecimal, veiled by a cloak of decimals—a testament to the invaluable aid these tools provide.

**Gratitude and Growth—A Journey's End**

![](https://cdn.videotap.com/618/screenshots/f1jDytCGHX7SOnW0it2c-320.83.png)

Fervent applause—wrapped in boundless gratitude—to Zach Obrint, the inspiration behind the solution, and kudos to the Soulady and Soulmate teams. A salute also to Karma for his assistance with Halmos and the Certora team for their unyielding support. In this odyssey of brainpower and debugging, the real treasures were the tools and insights we’ve gathered, fortifying us with the assurance that our codebases stand unblemished.

**Don't miss the next installment in our series as we unravel the secrets of the Bad Gas NFT marketplace codebase with the continued guidance of Certora. Gear up for another exhilarating ride through the world of high-quality code!**

Remember, the journey through code is a marathon, not a sprint. Refresh, recharge, and return with a keen eye—ready to tackle the Gasbed NFT marketplace. Stay tuned, stay sharp, and until next time, keep forging excellence in every line.
