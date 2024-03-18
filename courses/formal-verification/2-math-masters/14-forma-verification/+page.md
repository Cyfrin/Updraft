---
title: Video Excerpt Formal Verification
---

---

**Unlocking Code Correctness with Formal Verification**

Hey folks! Today, I'm thrilled to unravel the complexities of a concept that's reshaping the world of software correctness – formal verification. If you've been scratching your head about whether your code is up to snuff, this might just be your golden ticket.

**First Things First: What's Formal Verification?**

In simple terms, formal verification is your best friend when it comes to confirming the validity of your system's functionality. Think of it as a mathematical detective that scrutinizes your code to unequivocally prove, or disprove, its properties. Now, for the uninitiated, this may sound a tad daunting, but trust me, it's a game-changer.

To demystify this process, we're going to take a deep dive into something known as symbolic execution – a cornerstone technique in the realm of formal verification. But before we leap into the finer details, a quick reminder: It's okay if some concepts don't immediately click. Exploring these tools will accelerate your understanding and offer you a clear window into their workings.

![](https://cdn.videotap.com/618/screenshots/1SffQKE1TTL0hfJKWeXq-191.92.png)

**Fuzzers vs. Formal Verification: The Showdown**

You might be familiar with fuzzers – those random-number-generating daredevils that test your code's resilience. Formal verification, though, takes a more calculated approach. It doesn't leave things up to chance; instead, it employs rigorous mathematical proofs to either confirm or refute specific behaviors within your system.

Let's use a square root function as our guinea pig. Where a fuzzer would haphazardly toss inputs to see what sticks, formal verification painstakingly examines the mathematical bones of the function to ensure it does what it's destined to do. How does it accomplish this? Through symbolic execution.

**Decoding Symbolic Execution**

Imagine your code as a labyrinth of pathways, each representing a potential sequence of operations. Symbolic execution is like mapping this labyrinth, but instead of drawing walls and corridors, it translates your code into a lexicon of mathematical expressions for each path. In a nutshell, it's turning your code into a complex math problem that can be solved to verify its integrity.

Getting a bit froggy here, but stay with me! I had the delight of chatting with some trailblazers in the field - Jocelyn, the head of engineering at Trailabit, and Troy, a security engineer par excellence. Our conversation delved into the nitty-gritty of fuzzing and, you guessed it, formal verification. You can catch the full scoop in the interviews linked below.

![](https://cdn.videotap.com/618/screenshots/6b9O0ev2khZTh3GAZ6wB-295.25.png)

**Back to Basics: Moving Up the Testing Ladder**

But hang on, before we march forward, let's wind the clock back a tad. If you're new to the Web3 security scene – and even if you're not – you might want to hit pause and check out my previous piece on "invariant testing." It's a crucial precursor to understanding what we're tackling today.

Ready? Great. Now, let's talk about the various rungs of the testing ladder that fortify our programming prowess.

**Layer 1: The Trusty Unit Test**

Unit tests are the bread and butter of software testing – the absolute minimum. These tests zoom in on specific functions, ensuring they act precisely as intended. If something's amiss, they'll flag it pronto. When a tool like Foundry serves up an error message, rest assured, your unit test has just saved your bacon.

**Layer 2: The Robust Fuzz Test**

When vanilla unit testing isn't enough, fuzz testing steps into the arena. This second layer involves catapulting random data into the heart of your code to sniff out any vulnerabilities or edge cases lurking in the shadows. It's like throwing spaghetti at the wall to see what sticks – but more systematic and with a purpose.

**Layer 3: The Observer, Static Analysis**

While layers one and two involve actively engaging your code, static analysis prefers a more passive approach. It's the Sherlock Holmes of the testing world, closely examining your code for any sign of foul play, like the infamous reentrancy vulnerabilities. Tools like Slither and even your good ol' Solidity compiler come in handy here. They spot trouble without breaking a sweat.

**Layer 4: Enter Formal Verification**

Now, we finally arrive at the lodestar of our journey – layer four, where formal verification takes center stage. The goal is crystal clear: prove or disprove a specific property of your system through a mathematical blueprint. Whether it's ensuring a withdrawal function never hits a snag or another critical operation chugs along flawlessly, formal verification has got your back.

![](https://cdn.videotap.com/618/screenshots/cwAxqRhIT068hM40FEgc-472.41.png)

> "In the quest for code certainty, fuzz testing throws caution to the wind, while formal verification builds a fortress of mathematical proof."

**Journey Through Symbolic Execution**

Let's circle back to where we began – symbolic execution, which plays a pivotal role in formal verification. Here's a snapshot: symbolic execution meticulously crafts a mathematical formula for each potential path your code could take. It's not about stumbling upon errors by chance; it's about predicting every possible misstep before they happen.

Imagine feeding these mathematical concoctions into a solver – the code equivalent of a master puzzle-solver. It'll chew on the complex equations and spit out the truth about your invariants. Will they hold up under scrutiny, or will they crumble like a house of cards? This is the litmus test that separates solid code from shaky constructs.

**The Solver's Tale: SAT and SMT**

Solvers like SAT or SMT lie at the heart of the symbolic execution process. They are the brains processing these mathematical recipes, deducing if our assumptions about the code's behavior are rock-solid or if they possess a fault line waiting to be found.

Take, for instance, a unit 256 operation that risks an overflow error. A solver can mathematically deduce that adding one to its maximum value is a predictable path to failure, proving that our invariant of "never revert" can indeed be violated under certain conditions.

**The Nuts and Bolts of Execution Tools**

Creating an SMTLib list manually can be a beast of a task. Thankfully, execution tools like Manticore and Hevm are riding to the rescue with their built-in solvers, smoothing over the complex steps of transformation for us. Even the Solidity compiler lends a hand by conducting symbolic execution backstage to suss out any hitches.

Still with me? Let's recap:

1. We craft our Solidity code, bearing our invariants in mind.
2. Tools like Solc or Manticore send in their symbolic execution squads to convert our code into Boolean expressions – fancy talk for the mathematical model representing our code's potential paths.
3. Z3 or another such solver steps in, perusing these expressions to see whether our property can withstand the test.

And sometimes, even these brainy solvers might hit a snag if they butt heads with something exceptionally convoluted. In those cases, a timeout serves as a reality check, sparing us from waiting on an impossible solution.

![](https://cdn.videotap.com/618/screenshots/34W97vYBY6bhIYdNlvmI-767.66.png)

**The Path Explosion Problem and Final Thoughts**

Before you don your wizard hat and declare yourself a master of formal verification, remember this: Path explosion is a beast. It's when you've got too many paths to count and not enough time in the universe to check them all. Plus, using these techniques demands a fair bit of effort, both to understand the labyrinth of paths and to keep your tools sharp.

Don't fret, though! There's a trove of resources and communities eager to help. Websites like securetrack.com can be your guide through the thicket, offering tutorials on defining invariants and honing your property-thinking skills.

Ultimately, while formal verification and its cohorts like symbolic execution and abstract interpretation are not cure-alls, they're incredibly powerful allies in our never-ending battle against bugs. And as AI continues to leapfrog forward, who knows? Maybe these processes will become as easy as pie. For now, though – embrace the stateful fuzzing wizard within you.
