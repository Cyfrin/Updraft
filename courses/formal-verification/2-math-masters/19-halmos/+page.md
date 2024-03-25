---
title: Halmos
---

---

**Unlocking the Power of Formal Verification with Halmos**

Hey there, coders and Solidity enthusiasts! Ever wondered how to bulletproof your smart contract code before it hits the unforgiving terrain of the blockchain? Today, I'm taking you on a dive into the world of _formal verification_ with a nifty tool named **Halmos**. Buckle up; this one's going to turbocharge your development toolkit!

Before we roll up our sleeves and splash into the code, let me drop a quick fly-by for the uninitiated: **Formal verification** is this superhero technique that mathematically checks whether your code will behave as intended. Think of it as a souped-up stress test eliminating any potential kryptonite in your smart contract.

**Setting the Stage**

First things first, boot up your fav IDE, and nestle into the `invariant break form of verification folder`. We're carving out a new file titled `Halmos_test_t.sol`. That's right, the ".sol" signals we're staying cozy within the Solidity realm (it's like JavaScript smacking a high-five with blockchain).

**Crafting the Test Environment**

The essence of our new file is—it's a test contract for Halmos.

So, why Halmos? Well, the charm of Halmos lies in how it neatly syncs with the Solidity code you're used to—no need to learn another alien language. Plus, it plays like a dream with Foundry. Foundry, for the sandbox dwellers, is a toolkit for smelting smart contracts with Solidity.

**Importing our Victim (The Contract to Verify)**

One critical step is to import the contract you aim to put under the microscope. After all, you can't dissect what you don't have on the table. For demo purposes, I'll spare you my naming shenanigans and simply say this: Import your contract.

**Ready, Set, Deploy**

Onto the setup function. It's as easy as saying `FVC = new YourContract();`, a classic case of deploying the beast before taming it. Thanks to autocompletion savants like GitHub Copilot, it often feels like we've got Tony Stark's JARVIS tossing us a hand.

Anyway, what we've done is straight-up Solidity—just dispatching the `YourContract` into the wild of our test environment.

**Writing a Halmos-Styled Test**

It's showtime! But, pause that hype track—we're not doing a Foundry-style fuzz test. In the land of Halmos, `assert` is the king; `require` is just... well, not even the court jester.

Halmos expects you to serve `assert` statements, verifying conditions that must always hold true. While `require` is handy for precondition checks, Halmos wouldn't even bat an eye at it. We're playing by different rules here.

In this example, we're investigating if `yourFunction` ever decides to throw a hissy fit and revert. By running this, Halmos turns into a philosopher, pondering over our code's truths and falsehoods.

**Spinning Up Halmos**

Ready to welcome Halmos into your dev squad? Brace for impact—this calls for a Python ceremony. If you've escaped Python's embrace so far, I'll leave you to the YouTube shamans. But trust me, with tools like Slither sliding around, Python's more of a worthy sidekick.

The usual tune is: `pip install halmos`. But dabbling devs take my bid, and let `pipx` lead the charge. It segregates packages like an overzealous librarian, avoiding messy clashes.

With Python and pip's blessings (`python3 --version` and `pip3 --version` are your friendly "are we okay?" checks), and the Halmos spell (`pipx install halmos`), you'll triumphantly type `halmos --version` and bask in the glow of success.

Venturing into the [Halmos documentation](https://github.com/a16z/halmos/blob/main/docs/getting-started.md) is akin to unearthing a treasure map—it marks the spots to riches of knowledge (and a working Halmos setup).

**The Alchemy of Testing with Halmos**

Behold the mighty Halmos command—casting it upon our test stirs the cauldron and sets the gears into motion.

What Foundry does with a blind taste test of random numbers, Halmos does with an elegant waltz of mathematical conversions. It's no longer shooting in the dark; it's proving with precision whether that `yourFunction` will ever throw a tantrum for a given input.

Await the verdict and, more often than not—a counterexample emerges from the mist. A single number to crack open that bug hiding in the lines of Solidity.

**Turning Counterexamples into Gold**

Halmos just whispered a secret to us—a number, a key to unlock the bug's lair. We take this arcane knowledge and craft a unit test. Let's say Halmos pointed its finger at the number 99 for a reversion—now we can target our unit test like an arrow and watch the truth unfold.

If our code is the fortress, and the test is the siege, a "panic: assertion failed" is the flag of victory—or defeat of the code, depending on your viewpoint. Head back to the parapets, trim away the bug, and let the test run free once more—a green light means the day is saved.

**Aftermath and Contemplation**

With the dust settled, bask in the prowess of Halmos but remember—while robust and swift, the tool is not almighty. There are nuances, limits, and dark corners that it might not illuminate.

Particularly handy, Halmos stands when testing the simpler invariants in your Solidity contracts. But as the plot thickens, tools with deeper toolchains will be your next chapter (looking at you, Sirtora).

In the meantime, tinker, experiment and challenge Halmos. It is, after all, through play that we master the craft. And, who knows? Your contract might just become the next fortress unassailable after a rendezvous with Halmos.

So dive deep. The Scribbler team always has your six for more adventures in smart contract development. Until next time, keep your tests assertive and your contracts non-revertible!
