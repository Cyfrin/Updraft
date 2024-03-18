---
title: Scoping
---

---

Welcome back to our journey through the fascinating realm of code audits, where we unravel the intricacies of codebases. This time, we've set our sights on the Math Master Audit codebase, a treasure chest of arithmetic operations that we're diving into headfirst. Here's the inside scoop:

### Inspiration and Acknowledgments

What's this codebase all about, you ask? Besides the cool name, it pulls its mojo from some heavy hitters like Solady, Oberon, ETH, and Soulmate codebases. A virtual hat tip is due to Karma, who's been the Yoda of formal verification on this project with Hamos. Shoutouts are also in line for the Runtime Verification team and the Certora posse. These folks know their stuff, and even for a seasoned code wrangler like me, wrapping my head around Obront on ETH was no small feat.

### Setting Up Shop

Enough with the pleasantries—let's get to brass tacks. You'll need `git` and `foundry` at your fingertips (but let's hold off on `haml`, we'll cross that bridge together). If the setup was a game, we'd be leveling up, folks.

### Quickstart Quirks and Safety Checks

Glancing over the quickstart, I notice a tweak I need to make (note to self: change that '1' to a '2'). The `foundry.toml` file seems free of `ffi`, which, let's face it, is a relief for any security-conscious dev. Off we go to the makefile, toggling word wrap to make life a bit easier (you're welcome). Everything looks copacetic, so I'm pulling the trigger on `make` to bless this machine with all the dependencies it'll need. Hmmm, no tests? Clever—keeps us on our toes.

### Testing the Waters

Following the readme like a map, we reach our X marks the spot: `forge test`. Seven tests greet us back, all green across the board. Yet, when the `forge coverage` door swings open, it's face-palm time. Yikes. Let's not despair; instead, let's run a Darren scan and see what hidden nuggets of info it unearths.

A standard report pops up, pointing out that certain code practices are a bit too loosey-goosey for the multi-chain universe. However, our target is Ethereum, so we brush off concerns about `push zero` and non-specific `pragma` declarations—they're non-issues here.

### Library Intent and Documentation

As we peel back the layers, we're struck by a lightbulb moment—the purpose of this Math Master namespace is to shine as a math library, flexible yet with a solid type floor under its feet. Lack of thorough docs earns a raised eyebrow and a mental note to nudge the protocol creators for more guidance.

### Codebase Content - Unveiled

Our exploration leads us to a singular file, `mathmasters.sol`, which holds the concentrated knowledge of fixed-point arithmetic. In there lies a triad of superpower functions: `mod` with a mysterious `wad` suffix, `mood up`, and the kingpin, `square root`. It's a brief lexicon, but potent.

### Dive into the Test Suite

When it comes to tests, we're not left wanting. We've got everything from basic unit tests to fuzz tests that throw a playful punch at the square root function, comparing it to its counterparts from Uniswap and Soulmate. It's a battle of algorithms, a quest to affirm the truth of these square root sorcerers.

### Scrutinizing Slither's Wisdom

Not to be left out, Slither—a snake-like sharp static analysis tool—slithers across our code, hissing insights. It frowns upon the assembly language's presence and notes a lone, unused `mole` function. Taking a step back, it hits us—libraries are meant to provide, not to self-consume. With that, Slither's findings are chalked up to stylistic choices rather than defects.

### Wrapping up with a Historical Twist

Having charted the code's twists and turns, we're almost ready to don our forensic gloves and go line by line. But not before we tip our hats to the genesis of `Wad`, `Ray`, and `Rad`—financially flavoured terms birthed in the depths of Ethereum-based finance protocols.

---

As we traverse the lines of the Math Master Audit codebase, remember, it's not about treading a pre-laid path. It's about drinking in the nuances, embracing the surprises, and unearthing the wisdom within these digital walls. This isn't about regal formality; we're fellow travellers sharing tales by the digital campfire, decoding the saga of solidity together.

So lay back, pour yourself a code-infused brew, and let the tale of the Math Master Audit unfold. Whether you're a master of the craft or a padawan coder, there's a seat at the table for you. Stay tuned, because sometimes the true treasure lies not in the zeroes and ones, but in the journey they take you on.
