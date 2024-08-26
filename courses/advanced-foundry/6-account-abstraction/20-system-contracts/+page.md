## Account Abstraction Lesson 20: System Contracts

We are rolling along our journey into zkSync account abstraction quite nicely. In this lesson, we are going to:

- learn the phases of sending an account abstraction transaction
- become more familiar with system contracts and their importance

Let's get it!

---
### Sending Transactions

There are essentially two phases to send an account abstraction transaction.

**Phase 1: Validation**
  1. The user sends the transaction to the "zkSync API client" (sort of a "light node").
  2. The zkSync API client checks to see that the nonce is unique by querying the `NonceHolder` system contract.
  3. The zkSync API client calls `validateTransaction`, which MUST update the nonce.
  4. The zkSync API client checks the nonce is updated.
  5. The zkSync API client calls `payForTransaction`, or `prepareForPaymaster` & `validateAndPayForPaymasterTransaction`.
  6. The zkSync API client verifies that the bootloader gets paid.
 
**Phase 2: Execution**
  1. The zkSync API client passes the validated transaction to the main node / sequencer (as of today, they are the same).
  2. The main node calls `executeTransaction`.
  3. If a paymaster was used, the `postTransaction` is called.

---
### `ContractDeployer` System Contract

A system contract contains smart contracts that are deployed on zkSync by default. Let's take a look at one of the most important ones - `ContractDeployer`.

- Go back to [zkSync Era Block Explorer](https://sepolia.explorer.zksync.io/)

- Copy this address into the search bar. 

```js
0x0000000000000000000000000000000000008006
```

- You should see **ContractDeployer**. 

---
<img
    src="/static/foundry-account-abstraction/20-system-contracts/contract-deployer1.png"
    width="100%"
    height="auto"
/>
---

Scroll down a bit and click on the contract tab. You should then be able to see `ContractDeployer.sol` along with many other zkSync contracts. Essentially, the ContractDeployer governs other contracts. It is a system contract that is responsible: 

- for deploying other smart contracts on zkSync.
- for generating the address of the deployed smart contract.
- incrementing the deployment nonce.
- making sure that the constructor is never called twice in a contract.

On Ethereum, we simply need to send a transaction containing the compiled code of a smart contract. However, things are much different on zkSync. Here, a sender will actually have to call a function on  ContractDeployer. Then the function will create a smart contract. As a result, we'll have to do things a bit differently in our terminal.  

For example: on Ethereum we can simply run `forge create` in our terminal. In zkSync we'll need to do this:

---
```js
forge create --zksync --legacy
```

If you'd like to [learn more about these system contracts, click here.](https://docs.zksync.io/build/developer-reference/era-contracts/system-contracts) 

As always, Let's do some review. Move on to the next lesson when you are ready.

---
### Questions for Review

---
<summary>1. What are the two phases of sending an account abstraction transaction in zkSync?</summary> 

---
<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

    Validation & Execution
 
</details>

---

<summary>2.  What is the role of the ContractDeployer system contract in zkSync?</summary> 

---
<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

  - Deploying other smart contracts on zkSync.
  - Generating the address of the deployed smart contract.
  - Incrementing the deployment nonce.
  - Ensuring that the constructor is never called twice in a contract. 
 
</details>

---

<summary>3. How does deploying a smart contract on zkSync differ from deploying on Ethereum?</summary> 

---
<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

    On Ethereum, deploying a smart contract involves sending a transaction containing the compiled code of the smart contract. In zkSync a sender must call a function on a system contract, ContractDeployer, to create a smart contract. zkSync may also require different commands in the terminal, such as using forge create --zksync --legacy instead of just forge create.
 
</details>

---
  





