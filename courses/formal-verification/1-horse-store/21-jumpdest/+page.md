---
title: Jumpdest
---

---

## Getting Your Feet Wet with EVM Code Playground

Dabbling with the EVM doesn't have to be daunting. Take advantage of the EVM codes playground, a sandbox where your smart contract visions can materialize fearlessly.

To start, lean on the simplicity of the `huff compiler` to pluck out the runtime code via `bin runtime`:

```bash
huffc your_contract
huff --bin-runtime
```

![EVM screenshot](https://cdn.videotap.com/618/screenshots/EjkuL9455ergb1Ep3Jbb-67.82.png)

When you paste the resulting opcodes into the playground, you're essentially looking at your creation—your Huff code in its purest computational form ready for execution.

## From Code to Opcodes: A Visual Walkthrough

```
PUSH1 0x60 PUSH1 0x40 ...
```

Look at the elegance! Start by pushing call data onto the stack, then apply a shift to pinpoint the function selector—a crucial piece of the puzzle that governs which piece of the contract to execute.

Next up, you'll perform a comparison with the intended update function selector. The `EQ` opcode balances the scales, ascertaining identity. Follow it with a push of the program counter, and now it's time for the critical moment—a `JUMPI`, where the code leaps based on a condition.

```bash
JUMPIJUMPDEST
```

Now, here's a nugget of wisdom:

> "In the realm of jumps, only the oracle known as `JUMPDEST` will foretell a valid landing."

Omit a `JUMPDEST`, and your code will be wandering eternally in the bytecode wilderness.

We've sweetened the deal with Huff's syntactical sugar. Instead of a daunting manual `JUMP`, we simply mark the set number of horses as a valid jump spot. This is our "update jump" isa beacon of clarity in the sea of low-level code.

## Testing the Waters with Valid Call Data

Got your call data straight from the cauldron of hexadecimal stew? Great! Any which way you concatenate, as long as it commences with the sacred function selector. Ready, set, `RUN`!

As the opcodes execute step by step, feel that suspense build as the stack aligns `f` and `true`, and _voilà_, it soars to `JUMPDEST`. But should your function selector groove to the wrong beat, `false` will appear, revealing the conditional jump's ruse. Instead of vaulting onwards, it ambles to `JUMPDEST` because—fun code trivia—it's next in line anyway.

So, pat yourself on the back or give your neighbor a high-five, you've made it through the initial gauntlet:

> "The function dispatch for the update of the number of horses, executed with precision!"

## Conclusion

Writing Huff code throws you into the deep end of EVM's intricate ocean. Every opcode is a puzzle piece, and it's a game of intellect and foresight to assemble each seamlessly. Turning code into actions on Ethereum's blockchain requires a keen understanding of both high-level concepts and the granular details that make this technology so powerful.

With this exercise, we've merely skimmed the surface of what's possible in smart contract development. Remember, practice brings mastery, and every line of code hones your prowess in this digital alchemy. The EVM codes playground might be your sandbox today, but tomorrow, it could be the canvas for your magnum opus smart contract that reshapes blockchain history.

Until then, keep experimenting, keep learning, and most importantly, keep coding, brave souls of Ethereum.
