---
title: summary declaration examples
---

### Summary Declarations: The Arrow That Guides

![](https://cdn.videotap.com/618/screenshots/YSV8smivnph645uAF2xN-13.8.png)

In the coding world, sometimes a simple symbol, like the little arrow, can pack a punch. It's the beacon that marks a summary declaration in our functions. It's our code's way of saying, "Hey, I know what I'm generally supposed to do, but how about we switch things up?"

> "The little arrow... that’s our cue for something special in the world of functions."

Let's say you have a function, `total_supply` - all good functions have a job, right? But sometimes, we want to tell our function to take the day off and let a substitute handle things. That substitute? It's whatever summary declaration we plug in.

### Playing with View Summaries

Remember when we messed around with `always` in view summaries? Good times. But our options don't end there. From `constant per kali` to the intriguing `nondet` or nondeterministic option, we've got a rich palette to paint from.

Here's the deal with `nondet`: when you've got a function that's as complex as a Sunday crossword and you want to avoid the dreaded path explosion problem, you slap on the `nondet` label. Boom. Just like that, our `total_supply` function is spewing out results like it's reaching into a magician's hat.

### Havoc Summaries: Embracing the Chaos

Now, onto the wild child of summaries - the havoc ones. "Havoc all" is like the big, burly bouncer — it doesn't just guard the door; it guards the entire club. It tells our smart contract that `total_supply` can do literally _anything_. It's cautious, conservative, but boy, does it put a wrench in proving stuff since it's so, well, unruly.

> "The most conservative type... havoc everything, every time. But oh, so incredibly restrictive."

We love covering our bases, but being _too_ safe means we could tie our contract in knots tighter than a pretzel. "Havoc all" does that - sounds tough, but it can make proving things as hard as explaining why cats hate water.

### Havoc ECF: A Smidge More Order

There's middle ground, though. That's where havoc ecf steps in. It's like havoc all's more chill sibling. It still allows for chaos, but it's got one rule: no reentrancy. That's gold for non-reentrant functions - keeps things just tidy enough.

### Dispatch to the Rescue: Dispatcher Summaries

Enter the hero we didn't know we needed: dispatcher summaries. These are our knight in shining armor when dealing with the havoc dilemma. Simply put, `dispatcher true` or `dispatcher false` are your choices.

Think of `dispatcher true` as the control freak. It ensures `total_supply` will only do its thing according to someone else's playbook — probably another contract’s.

> "Dispatcher true, ensuring total_supply plays by the rules... defined by another."

If that explanation was as clear as mud, don't sweat it. Let's roll up our sleeves and dive into specifics.

## Deep Dive: Dispatcher Summaries

So, let's take a scenario. You're building out this fantastic dApp, and you've got all these little functions running around like kids in a playground. You need to make sure they play nice, especially when you're not looking. That's what dispatcher summaries are for.

Imagine a contract calling `total_supply`. Dispatcher summaries make sure that it does so in a manner that's already been outlined elsewhere. It's like having strict parents at a party - they've already told the babysitter what's what, and the kids can only do what's been pre-approved. By setting this strict boundary, our functions can't just go off-road; they have to stick to the plan.

## Why They Matter

Now, why go through all this? Simple. It's about proving. In the world of smart contracts, we're trying to prove properties about our code. We want to know, without a shred of doubt, that it does what it's meant to. Summary declarations are the cheat codes that help us simplify the arduous proofs, ensuring that our contract behaves as expected.

They give us flexibility without completely surrendering to chaos. Because having a function that can do anything is cool, but not when you need to ensure it only does the right thing.

## The Grand Finale: Solving the Havoc Issue

Remember our default havoc predicament? We mentioned the persistent keyword as a fix, but dispatcher summaries are the real MVPs here.

"Okay, I'll use the dispatcher to solve this issue that we're running into" - that's what you'll say once you embrace these unsung heroes. Set it to `dispatcher false`, and the function becomes a hermit, not influenced by outside contracts. Set it to `dispatcher true`, and it's a social butterfly, only visiting pre-approved parties.

To wrap it up, think of summary declarations like a Swiss Army knife. They're versatile, useful, and equipped to handle various situations. By incorporating them, you'll not only be writing smarter contracts but also saving yourself a heap of debugging time down the road.

So, whether you choose to let your functions go full "havoc" or keep them under a dispatcher's watchful eye, remember these tools are here to give you the control you need with the flexibility you desire.

Stay tuned for more deep dives and, until then, happy coding!
