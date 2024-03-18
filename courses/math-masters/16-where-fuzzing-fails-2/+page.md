---
title: Where fuzzing fails - Or at least, needs more runs
---

---

### The False Comfort of a Bug-Free Fuzz Report

Remember that one time in math class when you thought you aced the test, only to realize you had missed some critical questions? Well, fuzz testing can sometimes give you that false sense of perfection. We had a situation like this in what I like to call the "math masters" incident. The fuzzer initially gave us a thumbs up, saying, "Hey, your code is good to go!" Oh, how we basked in that fleeting moment of triumph.

But here comes the twist. When we cranked up the number of test runs, our fuzzer stumbled across a counterexample. Talk about a reality check! So, what if I told you that we might have just gotten lucky that the fuzzer found it within the runs we allotted? The fact is, sometimes even a million runs just won't cut it. That's right; we're dealing with such sneaky bugs that they'd give Houdini a run for his money.

### Into the Abyss: The Horrifying Monstrosity Called SRC

Ready for a horror story? In our `SRC`, we stumbled upon the `formal_verification_catches.Sol`, a piece of code I've used before, which can only be described as a horrifying monstrosity that would send shivers down any coder's spine. We did something so wacky that it will either make you laugh or question my sanity: we turned the world of programming math upside down.

- Every time you see the word `add`, you're actually looking at a subtraction.
- Seeing `div`? You guessed it, that means addition!
- `mole` throws the rulebook out the window and becomes division.
- And `sub`? You're looking at multiplication.

If that sounds like nonsense to you, congratulations, your brain is still functioning correctly. But the twist doesn't end there. Not only are these functions performing the opposite operations, but they're also inherently flawed. For example, our rebellious `add` command wraps an integer in a cozy blanket and then – surprise – it divides! Absolutely none of this makes a lick of sense, mathematically speaking, of course. This is code that seems to be laughing maniacally, reveling in its cursed existence.

### A Wild Ride Through Bizarre Code

You might be saying, "Patrick, no sane codebase would have such ridiculous conventions." And I'd laugh and ask if you've ever glanced at the infamous MakerDAO codebase. That was a subtle dig, my friends, at their entertaining naming conventions.

![](https://cdn.videotap.com/618/screenshots/1G3fHzUQvN5b7pDo025h-139.5.png)And then we have the crown jewel, the pièce de résistance: a storage-crammed, horribly named wonder of functions, culminating in the pièce de résistance, `hellfunk`. This function comes with one simple rule: This function must never revert. And yet, it performs a series of tasks so bizarre and nonsensical that they could make a seasoned auditor weep.

Now, I hear what you're saying. "Sure, Patrick, with this limited number of variables, even I could do some manual auditing." However, let's be real – this function is the perfect stand-in for those beastly pieces of code we sometimes have to face, where manual auditing is akin to finding a needle in a haystack. Impossible? No. Ridiculously hard? Absolutely.

### When the Fuzzer Fails

Now, let's get to the core of why we're all here: the failure of fuzzing in this glorious mess of code. For our case, we didn't need to employ state-of-the-art, state-changing, complex fuzzing techniques. We had a single function to test, and therefore, a stateless fuzzer would suffice. The name of the game? Make sure it never reverts.

So, we set up our test, invoked `hellfunk`, and waited with bated breath. And the verdict was: it passed. Yep, that simple. A pat on the back for `hellfunk`.

But remember our previous adventure with the math masters? What if we built upon that number of test runs to a colossal figure, one that eclipses any reasonable amount of processing time? Would we eventually find that elusive failing case? Maybe, but for the sake of illustration, let's pretend we tested `hellfunk` 10 million bazillion times, and our fuzzer still clapped its hands and said, "Well done."

### Conclusion: The Art of the Fuzz and Beyond

This little escapade through bizarre landscapes of inverted mathematical operations and perplexing functions serves to remind us of one thing: fuzzing has its limitations. It's a fantastic tool, don't get me wrong, but every once in a while, you encounter a beast that needs a different approach. Like hunters seeking the rarest prey, we need to evolve our strategies.

If there's anything to take away from our journey, it's that we should never take a first glance as gospel. Sometimes, even if you break your fuzzer from overuse, some code requires a deeper analysis, perhaps leaning more on formal verification or manual review.

So there you have it, my coding compatriots. A trip down the rabbit hole where the rules of arithmetic are thrown out the window, and the fuzzers sometimes just can't cut it. Keep this tale in mind the next time your fuzzer chirps a happy tune of 'no bugs here!'

Because, in the world of coding, the only true constant is the unexpected. And who knows, maybe your next fuzzing session will be the stuff of legends or... just another weird day at the office.

Until our next code-adventure, keep your functions clean, and your variables clearer!
