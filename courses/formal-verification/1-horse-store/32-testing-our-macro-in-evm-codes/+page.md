---
title: Testing Our Macro in evm.codes
---

_Follow along with this video:_

---

Ok, this is exciting. By this point we should have a working macro, that allows us to set a value to our numberOfHorses variable and save it to storage! In future we'll go through how you can test these things in Foundry, but for now - let's head back to evm.codes and try out our function in the playground.

Remember how to get your contracts bytecode: `huffc src/HorseStoreV1/HorseStore.huff --bin-runtime`

Paste the output into the playground's provided workspace and assure you've entered calldata which contains our valid function selector in the field to the bottom left. By stepping through each line of execution we can clearly trace what's happening with our function call.

Here's an example of valid call data to set our number of horses to 7 and the call trace we can expect:

```
0xcdfead2e0000000000000000000000000000000000000000000000000000000000000007
```

![testing-macro-evm-codes-1](/formal-verification-1/32-testing-macro-evm-codes/testing-macro-evm-codes-1.png)


I want to draw you attention to the `stop` op code I've added near the end. This code is an imperative aspect of handling functions in Huff.

Code doesn't know when you want it to start and stop, it'll keep running until the application runs out of code. The `stop` op code affords a developer the power to explicitly tell the EVM 'We're done here, this execution is complete. This will prevent our code from continuing to run subsequent operations after completion our function call!

This is amazing! What you'll find when we decompile our Solidity version of Horse Store, is that what we've just built out in Huff is effectively what Solidity is doing for us under the hood. Great work! Let's look at how to add the logic of our `getNumberOfHorses` function.
