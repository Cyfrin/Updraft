---
title: Foundry Opcode Debugger
---

---

## The First Revelation - Storage Slot Zero

We kicked off our journey with a rather straightforward revelation. Our base test showed us that our smart contract variables at storage slot zero begin their lives as 0. It's quite a basic but essential piece of information, akin to saying "Every story has its beginning," and in our case, it starts with nada, zilch, zero!

```js
// Base test proving Storage Slot Zero starts at zero
assert(storageSlotZeroValue === 0);
```

Simple, right? But why settle for just the surface when there's much more waiting to be uncovered? So we roll up our sleeves and prepare to dig deeper.

## Debugging with Foundry: The Play-by-Play

With the zest of a coding artisan, we invoke the mighty Foundry. A couple of key taps later—`Mt debug`, to be exact—we paste the test name and BOOM, we're in the debugger. It’s like stepping into a new dimension, where we can traverse opcode by opcode—these are the byte-sized steps our computers understand and execute.

In this digital realm, we're looking for the heart of our smart contract's bytecode, watching each step unfold like chapters in an epic saga. We breeze past all the test setups—those are just backstage preparations, necessary but not the spotlight of our show.

![](https://cdn.videotap.com/618/screenshots/oBUkcPtfu0BONWXADXcO-163.04.png)

Through the lens of the debugger, we can peek right into the DNA of our contract calls. Now, I'll admit, the screens and text can be a tad bit small, so bring your magnifying glasses, or just trust me to narrate our adventure.

## Diving Into the Opcodes

As we jump in, the opcode sequence unfolds. It’s like a Morse code, telling us exactly what's happening within the smart contract.

```
// Example opcode sequence
PUSH4 0x12345678
PUSH2 0x90...
CALLDATALOAD
```

Let's enhance our experience—what about setting a number like `777` in our tests, for a more conspicuous view? It’s much easier to spot in the opcode summertime, don’t you think?

## Writing Values: The Test Continues

Moving on, we address the "How do we write values?" question with a test function named `test_write_value`. It’s like instructing our contract, "Update the number of horses to 777." Now, brace yourself for some code magic.

Once more, we summon our debugger and step through the opcodes, eyes peeled for our standout number `777`. We transform it to hexadecimal because that’s how code wizards communicate here—`777` becomes `0x309`.

![](https://cdn.videotap.com/618/screenshots/tJmN7nsaYCyFgOTnYKtS-326.07.png)

We sprint through the setup, looking for the moment our `777` takes the stage. There it is! After executing `SSTORE`, at the backdrop of the opcode theatre, our `777` is nestled comfortably at storage slot zero.

## An Opcode Odyssey

We’ve come to the end of our quick stroll through Foundry’s debugger. It was like dragon-spotting, but instead of dragons, we were after `777` in the expanse of opcodes.

Here's a takeaway—a nugget of wisdom if you may: immerse yourself in the debugger. Dance with the opcodes, mingle with the stacks and memories. It's not just about finding our `777`; it’s about becoming one with the machine.

> "Embrace the console and become the opcode wizard you’re destined to be."
