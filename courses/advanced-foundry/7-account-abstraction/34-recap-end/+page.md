## Account Abstraction Lesson 34: Recap End

### On Ethereum

- We learned that account abstraction can allow us to have anything sign a contract.
- On Ethereum, the there are alt-mempools that take the signed data and send it to an `EntryPoint`.
- The `EntryPoint` can have two optional contracts.
  - signature aggregator
  - paymaster
- EntryPoint will then send your transaction to your account contract.
- Then it can be sent to the other dapps on the blockchain.
- We built our own `MinimalAccount.sol`.
- The most important function here we validateUserOp.
  - This took a `PackedUserOperation` struct, `userOpHash`, and `missingAccountFunds`.
- We added an `execute` function to execute commands.
- We also made some great scripts and tests.

### On ZKsync

- Account Abstraction is natively built in. 
- There aren't any alt-mempools.
- ZKsync has specific transaction types, ours is 113.
- There are two phases for transactions
  - validation and execution
- A lot is handled by their system contracts.
- The system contracts are governed by a bootloader.
- Also used a struct like on Ethereum, called Transaction.
- Wrote some nice tests.
- Wrote helper functions instead of scripts.

### 🎉 IT'S TIME TO CELEBRATE AND TAKE A BREAK! 🎉

🥳 See you in the next one. 🥳
