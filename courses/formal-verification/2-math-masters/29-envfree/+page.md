---
title: envfree & environment function input
---

---

## A Tale of `hellfunk` and Environs

So there's this function, let's nickname it `hellfunk`. We run it, and it does what the legends say – it reverts precisely when we need it to. The magic number 99 appears, we find ourselves standing right at the line that ought to throw us back. Perfect, right? But, what happens if `hellfunk` wasn't dipped in the mystical broth of `Env free`? Let's imagine such a world for a moment.

`hellfunk`, devoid of its `Env free` robe, now demands an offering – an environment parameter, to be exact. Without this sacred keyword, invoking `hellfunk` bears no fruit, but instead throws a tantrum, an error crying out for the missing ingredient. The environment!

Enter `env`, the chalice of context in the world of CVL – Certified Verification Language. This isn't just any type: it's the essence of the transactional ether itself, encapsulating everything from message senders to block numbers – all things that make the blockchain tick.

Invoking a function without its `Env free` badge? Prepare to provide `env`. A necessary sacrifice for functions that socialize with the external world – they want to know who's calling, with what value, at which point in time.

## A Dash of `require` in Your Smart Contract Stew

Here's a little chef's secret: suppose `hellfunk` needs a specific state of being, for example, a zero message value.

This line is a clever incantation to ensure `hellfunk` only heeds the call when our pockets are empty. If you neglect this and toss a few tokens `e.messageValue`'s way, `hellfunk` will reject you outright, pointing you to the door labeled "Transaction Reverted."

![](https://cdn.videotap.com/618/screenshots/nCPEfIiMlESNaXnSHABc-228.49.png)

However, our shenanigans with environment variables aren't for Certora's entertainment; they're steps to prevent it from getting too creative in its quest to shatter our rules.

You see, Certora has this knack for finding loopholes, stretching variables to their limits, looking for that one erratic behavior that says your contract has failed. That's its job, after all – to poke, prod, and provoke until your invariants and rules stand tall or crumble.

## The Trouble with Non-`env free` Functions

You might wonder, "could `hellfunk` betray us again?" Fear not, as long as your require statements stand as vigilant guards, ensuring that peculiar cases like a non-zero message value don’t slip through unnoticed.

And yes, waiting for Certora's verdict may seem an eternity at times, especially when you're tinkering with its very mechanics.

But once your tests run clean, with Certora unable to ruffle your contract's feathers, that's when you know you've crafted a piece of art. It's that moment when the variables align, the require statement sings its tune, and your edge case reveals itself – not a moment sooner, not a pixel out of place.

```solidity
// Eureka! Our environment is tamed, and the message value is exactly what it should be:assert(e.messageValue == 0 && number == 99);
```

With env freedom comes great responsibility. It's a declaration that your function dwells in a realm beyond the blockchain's earthly parameters. And yet, sometimes, it's a dance with `env`, with `messageValue` and `messageSender`, where you acknowledge the environment's presence but choose the variables you play with.

## The Symphony of Solidity Smart Contracts

At the end of the day, whether your functions wear the cloak of `env free` or don the armor of required parameters, it's about harmony. Like a conductor leading an orchestra, you're shaping the symphony of your smart contracts. Each line of code, every `env` used or dismissed, builds towards an intricate masterpiece that will operate seamlessly within the blockchain universe.

And there you have it, folks – a journey into the essence of `env free` and its counterpart. It's a narrative that stretches from the simplistic notion of a function that keeps to itself to the complex interplay of parameters and rules that govern the blockchain's kingdom.

So, as you continue typing away, crafting functions that will someday live and breathe in the ever-expanding cosmos that is the blockchain, remember: every keyword has its place, just as every note has its pitch. May your smart contracts stand the test of time and may your `env`'s be ever in your favor!

Happy coding, and until next time, keep an eye out for those sneaky require statements!
