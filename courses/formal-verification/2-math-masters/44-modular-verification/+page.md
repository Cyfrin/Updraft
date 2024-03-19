---
title: Modular Verification
---

---

**Demystifying Modular Verification: The Art of Simplifying Complex Coding Problems**

Have you ever found yourself stuck in the labyrinth of a complex coding problem, feeling like you're piecing together an intricate puzzle with no end in sight? We've all been there. But guess what? There's a clever way to tackle this that doesn't just involve banging your head against the keyboard hoping for a breakthrough. It's called modular verification, and it's a game-changer in dissecting and solving those coding behemoths.

First off, let's give a shout-out to the Certora docs – a treasure trove of knowledge on mitigation strategies and nifty flags. But today, we're focusing on one particular jewel in their crown: modular verification. Imagine taking that overwhelming code conundrum and breaking it down into manageable, bite-sized chunks. This "divide and conquer" approach – or modularization – is the secret sauce to our problem-solving recipe.

### Inspired Innovations: Following in the Footsteps of a Bug Hunter

Our journey to modular verification was sparked by none other than Zach Obront – a maestro who orchestrated a brilliant bug hunt using formal verification. He sliced and diced the problem with such finesse that we can't help but mimic his moves to verify a similar codebase. So, let's roll up our sleeves and see how Zach turned complexity into clarity.

### Square Root Functions: A Tale of Two Codes

Imagine we have a square root function staring us in the face, daunting and enigmatic. How do we verify it? For that, we have two contenders in the ring: the "uniswap square root" and its partner in crime, the "soulmate square root". While the latter hasn't hogged the limelight much, a closer inspection reveals a plot twist.

At first glance, they seem to be different beasts. The first halves are like two distinct species evolved from the same ancestor. But the latter parts? Identical twins! They both shimmy through similar right shifts, additions, and divisions.

### The Division Strategy: A Step-by-Step Breakdown

This cloning act in the second half paves the way for our strategy. If the soulmate square root function is the golden standard, we dissect our math master's square root function into two segments. The first half should, in theory, dance to the same tune as its soulmate counterpart since they share identical endings.

The spotlight now falls on the top halves, the harbingers of potential disparity comparing two similar yet separate entities in the realms of code.

### Experimentation in Action: Fuzz Testing Over Formalities

An epiphany strikes – if we're already severing the functions into halves, why not throw them into the gladiator arena of fuzz testing? It's like feeding them into a machine that thrives on randomness, looking for any divergence that could signal a flaw.

![](https://cdn.videotap.com/618/screenshots/UwL2RXNxVBSpQlsSncyY-392.82.png)

We set the gears in motion, coding away and brewing a test concoction of assertions to pit these two halves against each other.

### Verifying with Finesse: The Modular Approach

Now, with the battleground set, we transport our scene to the realm of the square root specification. Armed with the compact codebase, our newly separated functions stand ready for inspection.

![](https://cdn.videotap.com/618/screenshots/OwCQS9Fjt4EINqxtmikq-462.14.png)

Our guiding principle remains simple – if one half falters, the entire function may be compromised. GitHub Copilot, our digital companion, assists us in this intricate dance of logic and assertions.

### Reality Check: Uncovering the Truth

But the moment of truth arrives, and an error message greets us, whispering of a failed assertion. It's time to don the detective hat and uncover the discrepancies that our proofing conundrum reveals.

A test case emerges, an edge case proves our modular separation works – the top halves do indeed differ. But to clinch a definitive victory, we need more. We need to intensify our scrutiny and impose more stringent conditions, crafting a gauntlet of edge cases Sirtora dutifully provides.

### The Final Verdict: A Problem Partially Solved

Our adventure concludes with a mixed revelation. The top halves indeed show divergence, a hint that the square root function in question may harbor a flaw. Yet, the bottom half remains an unconquered mystery.

The test fails, confirming that Sirtora's discerning eyes didn't mislead us – at least when it comes to the top half. So, what's the takeaway from this modular expedition? A big round of applause! You've not only engaged in a formidable form of verification but also managed to simplify a complex problem into a digestible puzzle.

### The Takeaway: Modular Verification as a Debugging Technique

While we didn't pin down the function's wrongdoing in its entirety, we took a giant leap by laying bare potential issues, all thanks to the power of modular verification. This approach isn't just an impressive feat; it's also a practical technique to deploy in your coding arsenal – equally potent for veterans and budding coders alike.

Remember, splitting daunting tasks into smaller, more manageable sub-issues isn't just smart – it's strategic. It transforms grueling, Herculean feats into doable quests, taking you from coding chaos to composed code mastery.

Who knows? Next time, with the modular approach, you might just uncover that needle in the haystack on your first try. And all it takes is seeing the bigger picture not as a monolith but as a mosaic, waiting for your skilled hands to piece together a clearer, more coherent whole. So the next time you're faced with a Goliath of a coding challenge, split it down the middle, and watch it fall, piece by piece.
