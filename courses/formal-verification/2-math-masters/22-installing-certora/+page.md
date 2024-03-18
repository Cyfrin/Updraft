---
title: Installing Certora and solc-select
---

---

## **How to Write Your Very First Rule in Certora**

First things first, let's get our hands dirty with the magic keyword in the Certora realm - 'rule'. Imagine this: you have a function that you absolutely need to run smoother than a hot knife through butter - never hiccuping, never balking. In our example, we've christened this must-be-perfect function `healthFunk`.

Now, say it with me, "The healthFunk must never revert." That's the name of the game; it's our mantra - our invariant. We’re setting the stage, much like we would in a foundry test, defining our expectations with added gusto. And when we need input parameters to test the mettle of our `healthFunk`, we brace ourselves and, just like a master fuzzer, we concoct some cleverly crafted numbers: `uint256` or `uint128` nums, to be precise.

And there it is, our rule sprouting into existence. No matter what number we plug into it, `healthFunk` should steadfastly refuse to revert. Now, remember, we're not tossing dice and hoping for the best here; we're dealing with formal verification. This means we're not drowning in random numbers – instead, our friendly neighborhood Certora is converting these numbers into symbolic expressions. Yes, it's a bit mind-bending, converting code to math, but imagine your number being the star of its very own equation: `x` plus `y` equals `z`. What we're rallying behind is this: regardless of our chosen number, `healthFunk` must not retreat, not now, not ever.

**Asserting Our Way to Certainty**

So how do we catch a revert in action? Well, think of Certora’s `assert` command as your trusty guard. If we assert something is true – and I mean drop-dead simple stuff like `assert true;` – it should pass with flying colors because, well, true is always true. Admittedly, this is the easy street; the no-brainer street. But hang tight. We're flexing our assert muscles here, setting the groundwork for the real challenge ahead.

Let's go ahead and call this our "please-don't-laugh-at-how-baseline-this-is" rule, but it's important groundwork, you see. This humble `assert true;` is our starting line. Now, brace yourselves – we're about to set forth and see what an output looks like when we put our Certora skills to the test.

**Laying Down the Groundwork: Installing Certora CLI**

Drum roll, please, as we step into the spotlight with the Certora CLI. If you want to install this bad boy, you'll find the breadcrumbs leading to the treasure buried within our GitHub repo linked to this course. But let me whisper the secret chant to invoke the Certora Prover package: `pip install certora-cli`. Yes, it's a Python package – unsurprising for those of us familiar with Hammock (or Hamos, as the cool kids say).

And I'll let you in on a personal preference – I'm all about that `pipx` life. It's neat and tidy, keeping Certora CLI snug in its own virtual sandbox. Nonetheless, whether you're a `pipx` aficionado or a `pip3` purist, the choice is yours – pick your potion and conjure the Certora CLI into existence.

**Mastering the Command Line Incantations**

With the CLI dance complete, your shell now bows down to three nifty commands: `CertoraRun`, `CertoraCheck`, and – dare I mention – `CertoraMutate`. Feeling like a command line wizard yet? If not, just try a quick `CertoraRun help` or `CertoraRun version` for a glimpse into the CLI crystal ball.

Now, with your CLI installed, it's time to bestow upon your environment a key to the Certora kingdom. Drop the incantation `export CERTORA_KEY=your_key_here` into your shell's ear, and you'll unlock untold smart contract auditing power (just remember to do this in a Linux-like realm – think WSL, macOS, Linux, et cetera).

**A Seriously Cool Sidekick: Solc Select**

Last but not least, one should never forget their trusty sidekick – `SolcSelect`. This reliable companion allows you to switch between the many faces of the Solidity versions with the grace of a chameleon. Again, `pipx` is my chosen steed to ride into the `SolcSelect` sunset. A quick `SolcSelect help` spells out all you need to know, and you're ready to switch versions faster than a shapeshifter on the run.

And voilà – with `SolcSelect` by our side, our Certora CLI deftly flips between Solidity versions like a parkour master navigating the urban landscape.

With these tools in hand, we march confidently into the arena of formal verification. We set rules, we assert, and we wield the CLI with the finesse of a seasoned spell caster. Certora is not just a tool; it's our partner in creating smart contracts that stand tall and unshakeable in the face of challenge.

Now that you're all geared up, let's embark on this epic quest together – may our contracts emerge unscathed and victorious. Onward to auditable, solid contracts worthy of legend!
