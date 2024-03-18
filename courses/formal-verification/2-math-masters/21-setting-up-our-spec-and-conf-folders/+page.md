---
title: Setting up our spec and conf folders
---

---

## Tone &amp; Vocabulary Breakdown

Before rolling up our sleeves and diving into the meaty part, let's set some groundwork. Based on the provided transcript, we notice a casual tone that feels accessible and friendly. It is not overly formal, making the material approachable, especially when dealing with the intricacies of coding and formal verification.

The vocabulary level leans toward the complex side, but don't fret! This complexity stems from the specificity needed when discussing programming and formal verification topics. Even so, we'll aim to keep things as simple and digestible as possible.

Our target audience comprises developers and those with an interest in blockchain technology, specifically users looking to leverage Certora's verification tools. If terms like "API key," "CVL language," and "proofs" get your gears turning, you're in the right place!

## Let's Begin Our Formal Verification Adventure

Alright, let's get our hands dirty with some Certora coding. We're setting our sights on a fundamental example — a 'hello world' of sorts within the realm of formal verification. Our purpose? To ensure that a function, affectionately termed 'hellfunk,' behaves as intended without any unexpected reverts.

Once we've grasped the Certora prover basics, we'll revisit the 'mathmasters' arena, wielding our newfound skills to identify and expose bugs lurking in square root functions.

### Setting Up Our Environment

To march forward with Certora, we'll replicate a setup seen among the big-hitter protocols. Imagine protocols like Aave; they typically house a 'certora' folder at the root of their project. Within, you'll find at least a 'specs' folder and possibly other directories tailored to their specific needs.

Here's what you need to do:

1. **Create a new folder:** Name it 'Certora' — this is your command center.
2. **Specs Folder:** This is where your invariants and rules reside — the brain of the operation.

Remember, we're building our fortress one step at a time; let's not rush the process. Detailed tutorials and documentation are a click away in the Certora documentation if you need extra guidance.

### Writing Our First Spec

Time to craft your first spec! In a file named `Fvcatches.spec`, begin outlining the rules or invariants for your contract. If you prefer a polished workspace (who doesn't?), consider utilizing VS Code with the Certora Verification Language extension for snazzy syntax highlighting.

A handy tip for visual learners:

```markdown
// Define your rule or invariant above your code block for clarity// Rule: Health funk must never revertrule healthFunkInvariant() {// Your Certora proof will go here}
```

Think of rules as sequences commanding how your code should sustain specific scenarios. Invariants, on the other hand, embody properties your contract must maintain consistently.

### The Guts of the Operation — config Files

Config files act as the schematics of our operation. They dictate files and parameters for the formal verification process. Create a file aptly named `fvcatches.conf` to house these details.

```json
{
  "files": ["Src/invariantBreak/hellfunk.sol"],
  "verify": {
    "contract": "FormalVerificationCatches.sol",
    "spec": "Fvcatches.spec"
  }
}
```

Add this simple JSON snippet to your conf file as a starting point. This provides Certora with the necessary information on what files to consider and what specifications to apply for the verification process.

Remember, we're translating our transcript into a full-fledged blog post. So, keep your eyes peeled for more elaborate config parameters as we delve deeper into our example.

### Embarking on the Verification Pathway

After setting the foundation, it's time to commence the proving. Execute the Certora prover with the `certoraRun` command alongside your configurations.

### Blog Post Specification and Flavor

As we convert this transcript into a blog post masterpiece, we must bear in mind several pivotal factors:

- Our tone remains casual and insightful, mirroring the original transcript.
- Clarity over complexity — we choose plain speak over jargon to keep our diverse audience hooked.
- Brevity is not our friend today — we aim for a hearty 2,000 words, ensuring depth and detail.

We are working within these constraints to ensure our blog post faithfully represents the transcript's essence while being informative and enjoyable to read.

## Bridging Theorems and Code: The Heart of Formal Verification

Formal verification is where the deterministic nature of math meets the abstract creativity of code. It's about ensuring that our smart contracts are not just good but mathematically proven to be secure and robust against all adversities.

In the blockchain space, this isn't just beneficial; it's essential.

### The Invariant Dance — Rules vs. Invariants

Let’s delve into the nuance between rules and invariants in the Certora narrative. Imagine rules as a series of gestures in a dance, dictating movements to land on a precise beat. This beat represents the conditions under which your contract should validate.

Invariants, on the other hand, are that confident posture you must maintain throughout the dance. They personify the unchanging truths that your contract should uphold, regardless of the steps taken.

### Crafting Rules with Human Touch

Here's a rule for you: Humanize your proofs. Yes, even in the stark landscape of code, there's room for personality. Our proofs are not a mere call to logic but a story we tell — one where each function's fate hangs in balance, and it's our job to ensure a happy ending.

### Invariants — The Eternal Checkpoints

Invariants are more than just conditions; they are eternal checkpoints that your contract must clear at every stage of its lifecycle. They're like the lifeguards of your code, ensuring no line of Solidity goes off the deep end.

### Putting It All Together

Once we've pieced together our rule, our invariant, and our config file, it’s time to let the Certora prover take the wheel. Like a meticulous examiner, it combs through our code with a fine-toothed comb, verifying that each line of code adheres to the promises we've made.

This is the moment of truth, where we find out if our preparations stand firm or if we need to go back to the drafting table.

## Sailing Through Spec Files and Config Seas

As our journey nears the end, let's reflect on the key points:

- Specs files are your lighthouse, guiding the prover through the verification storm.
- Config files are your map, charting the course for a successful verification journey.

## Final Voyage Thoughts

Today, we've barely scratched the surface of what Certora and formal verification have to offer. What we've covered here is just the beacon, illuminating your path to becoming a formal verification maestro.

So, keep practicing, keep learning, and in the wise words of a blockchain philosopher:

> "In the realm of code, let formal verification be your armor, Certora your sword."

With these tools at your disposal, you're well on your way to proving that not only can code be functional, beautiful, and efficient — but also, unequivocally correct.
