## Account Abstraction Lesson 22: ZKsync Accounts Recap

Even though we haven't done a lot coding yet, we have covered a lot in the way that accounts work in ZKsync. Here is a quick recap. 

- Account Abstraction is called Type 113
- No alt-mempool, transaction go directly to ZKsync nodes
- Transaction lifecycle is run by system contracts
- A system contract called `bootloader` becomes the owner/sender
- NonceHolder contains mapping off all nonces and addresses
- The two phases of the lifecycle are validation and execution
  - **Phase 1: Validation**
  1. The user sends the transaction to the "ZKsync API client" (sort of a "light node").
  2. The ZKsync API client checks to see that the nonce is unique by querying the `NonceHolder` system contract.
  3. The ZKsync API client calls `validateTransaction`, which MUST update the nonce.
  4. The ZKsync API client checks the nonce is updated.
  5. The ZKsync API client calls `payForTransaction`, or `prepareForPaymaster` & `validateAndPayForPaymasterTransaction`.
  6. The ZKsync API client verifies that the bootloader gets paid.
 
  - **Phase 2: Execution**
  1. The ZKsync API client passes the validated transaction to the main node / sequencer (as of today, they are the same).
  2. The main node calls `executeTransaction`.
  3. If a paymaster was used, the `postTransaction` is called.

- Additionally, we can have an outside sender who is not the `bootloader`. 
  - We will need to make it run through the same validation phase as the `bootloader` would have.

Now that we have our roadmap, it's time to start building. Take as much time as you need to review and reflect. Ask questions and join the discussion at the spaces below. 

---
[Discord](https://discord.com/invite/cyfrin)

---
[GitHub](https://github.com/Cyfrin/foundry-full-course-cu/discussions)

---

