---
title: 24 Testing the JUMPDEST Opcode in evm.codes
---

_Follow along with this video:_

---

### Stepping Through the Execution

Alright! This is very exciting, let's start by grabbing the compiled runtime bytecode of our contract.

```
huffc src/horseStoreV1/HorseStore.huff --bin-runtime
5f3560e01c8063cdfead2e1461001a5763e026c0171461001b575b5b
```

Entering this bytecode into the evm.codes playground we should see our contract, broken down into it's individual opcodes. Make note of the two distinct `JUMPDEST` codes at the bottom of the call list.

![testing-jumpdest-1](/formal-verification-1/24-testing-jumpdest/testing-jumpdest-1.png)

If we assure that the calldata we're passing begins with the updateHorseNumber function selector, things should be business as usual, until reach our first `JUMPI` code.

![testing-jumpdest-2](/formal-verification-1/24-testing-jumpdest/testing-jumpdest-2.png)

We can see our first `JUMPI` code pertains to one of the JUMPDEST codes at the bottom of our list of operations. Because we're passing JUMPI this location, and a 1 (which represents a matching selector), we would expect our next step to jump our execution to this location further in the code-bypassing the second check entirely.

![testing-jumpdest-3](/formal-verification-1/24-testing-jumpdest/testing-jumpdest-3.png)

And that's exactly what happens! Great work! 🎉I encourage you to experiment further before moving forward, try placing different contracts into the evm.codes playground and investigating how their opcodes function and interact. The more experience you have with these concepts the better!
