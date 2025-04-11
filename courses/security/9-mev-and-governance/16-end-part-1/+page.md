---
title: End of Part 1
---

_Follow along with this video:_

---

### End of Part 1

What a journey it's been so far!

Getting through the first part of this majorly intense curriculum deserves a massive round of applause. We've covered a variety of crucial topics. We've learnt about:

- MEV
- Signature Replay
- Reentrancy Attacks
- The Audit Process
- Multiple Auditing Strategies
  - The Tincho
  - The Hans
- Testing Methods
  - stateless and stateful fuzzing
  - invariants
- Arbitrage
- DeFi
  - Borrowing/Lending
  - Flash Loans
  - Uniswap
  - Compound
- EVM Compatibility between chains
- Verifiable Randomness
- Centralization
- Denial of Service
- Failure to Initiate
- Access Control
- Oracle Manipulation

...and so much more.

In completing this course, and the last 5 section specifically, you've built up a portfolio to show case what you've learnt and what you're capable of as a security researcher. I've said it since the beginning, the way to get better is by continuing to practice this skill:

> ❗ **IMPORTANT**
> "Repetition is the mother of skill."

So, what's next?

Well, the one code base I've alluded to, but we didn't go through together is `Vault Guardians`. As I mentioned before, this is _the most_ challenging security review out of any we've done til now. `Vault Guardians` may be the largest code base and we learnt that often the bugs you find won't show themselves until the end of a review, this can tend to make reviewing longer code bases as being demoralizing and overwhelming.

This is normal. Take a deep breath. You've got this. You have 5 security reviews worth of experience and you have the tools and a game plan to approach harder things.

Remember the steps of our process:

1. Initial Review
   a. Scoping
   b. Reconnaissance
   c. Vulnerability identification
   d. Reporting

### The Game Plan

**1. Scoping**

Begin with scope identification. Determine what you're working with - the commit hash, the compatibilities, the chains, and the tokens.

**2. High-Level Analysis**

Next, aim to understand what the code is supposed to achieve. Read the documentation, discuss with the team, make diagrams, take notes. Dump all your thoughts down on paper.

**3. Code Comprehension**

Time to dive into the code. It’s okay if you don’t find anything at first – that's normal. Simply aim to interpret the code. Ask yourself: Is the code doing what the protocol intends it to do?

**4. Identifying Vulnerabilities**

Your final mission is the most challenging - finding vulnerabilities. Use your checklist for guidance, leverage the strategies we've used over and over like `The Tincho`. Assess the test suite, write stateful fuzzing test. Now's your chance to put your skills to work and break the thing.

### Testing Your Skills

The Vault Guardians code base offers greater complexity than any previous codebases. Embrace this new level of difficulty, and challenge yourself. It's how you improve.

> ❗ **PROTIP**
> Vault Guardians can be daunting, consider teaming up with a fellow student to tackle this challenge! Find someone on the [**Cyfrin Discord**](https://discord.gg/cyfrin).

### A Valuable Detour

> ❗ **IMPORTANT** > **DO NOT GO TO PART 2**

Now, it's time. You have 2 options.

\*_Option 1: Compete in a real competitive audit on platforms like Code Hawks. The excitement of the competition will keep you on edge and the real code base is sure to test all your abilities_.

\*_Option 2: Pair up and tackle the Vault Guardians codebase as a learning experience._

### Wrap Up

1. First of all, great job! By just getting this far, you outdo more than 70% of the current security landscape.
2. Do not move to part two yet. Either try your hand at a CodeHawks competitive audit or complete the Vault Guardians audit with a partner.

Remember your security journey is far from over. Part two is where we (will) dig even deeper into `Assembly`, `EVM`, `formal verification`, and `post deployment best practices`.

Good luck!!!

<details>
<summary>Super Secret Alpha</summary>

For real, go do Vault Guardians, or a real audit. See you soon. <3

</details>
