---
title: Opcode EQ
---

---

# Demystifying EVM Opcodes: A Deep Dive into Function Selectors

Hey everyone! In this post, we're going to take a break from the usual stack images and dive into something a little more technical but super exciting - working with function selectors in smart contracts. And for those visual learners out there, don't worry, I'll throw in a stack image when it's just too good to pass up.

## Understanding Function Selectors

First things first, let's talk about function selectors. These little guys are key when we're dealing with smart contracts. For example, let's consider two functions: `updateHorseNumber` and `readNumberOfHorses`. How do we tell our smart contract which function we want to run? That's right, through function selectors!

Now, we could do this the hard way, but why bother? I love making things easy, so let's get our hands dirty with a tool called `cast`. Cast is a command-line tool used in Ethereum smart contract development that can do all sorts of magic, including computing our morse code-like function selectors.

```shell
cast sig "updateHorseNumber(uint256)"
```

Running this command gives us the unique identifier for the `updateHorseNumber` function, which allows us to interact with our contract. And just like that, this equals the `update`, and we move on.

Next up, the `readNumberOfHorses`. Let's hit it with that `cast` command:

```shell
cast sig "readNumberOfHorses()"
```

Oops, don't forget those quotes! And voilà, there we have it - the selector for our read function. This one equals `read`.

Alright, now that we have these keys to our smart contract kingdom, what's next? We check to make sure they're the right keys, of course!

## Opcode Magic: The `EQ` Instruction

In the land of Ethereum Virtual Machine (EVM) opcodes, we've got this handy opcode called `EQ`, which is short for equals. Think of it as the decision-maker that lets us know if we're knocking on the right function door. It looks at two integers, compares them, and if they're a match made in heaven, it returns a one, signaling all is good. If they're not, it returns a big fat zero.

So, let's say we already have our function selector on the stack, we then push our new `updateHorseNumber` selector right on top of it, like a cherry on a sundae. And now the moment of truth:

If the magic happens and our selectors match, `EQ` will make sure we know it by returning true. In other words, we've authenticated our secret knock and can access the treasures the function holds.

![Stack Diagram](https://cdn.videotap.com/618/screenshots/kxLUYamjvQAlWtnO7C8V-106.98.png)

But how does that actually look on the stack, you ask? Well, if we could peer inside, you'd see the two inputs sitting snugly, waiting for `EQ` to work its judgement. If they're twinsies, then congratulations, you've got a match, and your function selector has done its job.

## Summary of Key Concepts

Let's quickly recap some of the main ideas we covered:

- **Function selectors** - Unique identifiers for functions in a smart contract that allow you to specify which one you want to call. They look like gibberish but are computed from the function signature.
- **cast** - A handy command-line tool for generating function selectors from function signatures, as well as doing other Ethereum development tasks.
- **EQ opcode** - Compares two values on the EVM execution stack and returns 1 if they are equal, 0 if not. Useful for checking if a provided function selector matches what you expect.
- **Authentication** - By checking if the correct function selector was provided, you can authenticate that the caller knows the "secret knock" to access particular functions.

## When Function Selectors Go Bad

Of course, things don't always go smoothly when dealing with function selectors. Here are some common issues you may run into:

**Typos** - If there's a typo in the function signature used to generate the selector, it won't match when checked by `EQ`. Remember, these codes are super finicky!

**Name collisions** - It's possible for two different function signatures to hash to the same selector. Unlikely with well-named functions, but something to be aware of.

**Selector sniffing** - A vulnerability where attackers try to guess function selectors in your contract. They can then call those functions without knowing the names!

**Failed authentication** - Even with proper selectors, attackers can exploit authorization and access control lapses to call functions they shouldn't be able to.

The point is, function selectors are powerful but also introduce some risks you need to mitigate through thoughtful design.

## Closing Thoughts

And just like that, folks, we've covered the basics of function selectors and opcodes without even breaking a sweat. Remember, smart contract development is all about understanding these building blocks. Once you do, you'll be crafting up contracts with the best of them.

Stay tuned for more coding gems, and as always, happy coding!

Let me know if you have any questions or if there's another topic you're curious about. And don't forget to push that stack image back into view, it's always good to visualize what we're talking about!
