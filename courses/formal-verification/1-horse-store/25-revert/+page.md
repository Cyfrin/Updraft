---
title: Revert
---

---

# Smart Contract Execution: The Importance of a Revert Operation

Hey there! Welcome to another deep dive into the nuts and bolts of smart contract coding - specifically, what happens when our code doesn't "jump" to execute a function. Let's break down this often overlooked, but incredibly crucial aspect of smart contracts on the Ethereum Virtual Machine (EVM).

## What Happens When We Don't "Jump"?

Imagine this: your code is running smoothly, processing commands one after the other. Then it encounters a situation where it's supposed to "jump" to a function, but what if there's no valid jump destination? Well, the code doesn't just throw its hands in the air and give up; it continues to the next instruction.

In EVM bytecode, what comes next are operations known as opcodes. The one we'll focus on here are the opcodes for "jump tests". Keep in mind that every operation costs gas - and we all know that saving gas is saving money!

## Why We Need a "Revert" Statement

It's good practice to conclude your function dispatch logic with a safety net. In our scenario, if we don't find that valid jump destination, we don't want some random code executing willy-nilly, potentially creating chaos in our contract.

So, what's the lifesaver? A `revert` statement.

A revert operation effectively says, "Hold up, something's not right. Let’s undo everything that just happened and make sure we don't end up in uncharted territory".

When our code sees this, it knows to halt and revert any changes if the condition isn't met. Safety first, right?

## The "Revert Opcode" Explained

Let's talk technical for a second. When we say 'revert', we're not just talking about saying 'nope' and ending the story there. We're talking about the `revert` opcode.

If you drop by [evm codes](https://www.evmcodes.com), a fantastic resource, by the way, and search for 'revert', you'll find it's an opcode that expects two things:

![evmcodes revert opcode](https://cdn.videotap.com/618/screenshots/MXkYmblgylPTMe3fKdUk-89.44.png)

1. **Offset**: The byte's offset in memory, where the error message (if any) begins.
2. **Size**: The size in bytes of the error message.

Picture these two sitting on what's called a "stack" - a special place where temporary data hangs out.

```js
// Using the revert opcode0x00
// Offset in memory (start at 0)0x00
// Size of the error message (0 if no error message)REVERT
// The opcode to revert the transaction
```

Now, what if you wanted your smart contract to scream 'error' with more...flair? You can store a custom error message in memory and point to it with the revert opcode. That's how you'd provide an error message upon reverting a transaction.

But for our purposes here simplicity is king. We're using the plain 0 and 0 to say, "Just stop and rollback, no need for melodrama."

## Putting Theory into Practice

Let's throw our code into the EVM and test it out with some dummy data.

If we run our smart contract with invalid function selector data - say, just random numbers:

```js
// Call with invalid function selectorCALL 0x01, 0x01
// This should trigger the revert condition
```

Our well-placed `revert` should step up before the contract can even think about performing any jumps to functions.

> "Success isn't just about correctly executing code; it's about knowing where and how to halt execution with just as much precision."

In a tidy little sandbox environment, we can watch as our code wisely avoids the jump commands and, following our orders, stops cold at the `revert`. Perfect, just what we wanted!

If we step through the execution process, we see a lovely 'revert' in the log, confirming our contract didn't do anything it wasn't supposed to after our check failed.

The jump destinations we laid down in anticipation? Untouched. A flawless display of control in the face of a would-be jump gone astray.

## Conclusion

Handling error states in smart contracts is not just a minor detail – it's a fundamental aspect of writing secure and efficient code. The `revert` statement acts as a critical checkpoint, ensuring that we only move forward with the operation when conditions are right.

So there you have it! Understanding the ins and outs of the `revert` opcode and its place in an Ethereum smart contract can save you not just from execution nightmares but also from unnecessary gas costs. Sound coding practices like these differentiate great developers from good ones.

Got any smart contract horror stories where a missing `revert` could have saved the day? Do share! And if you’re enjoying these deep dives, stick around – there’s more code-wisdom where that came from. Happy coding!
