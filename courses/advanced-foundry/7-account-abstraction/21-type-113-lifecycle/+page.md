## Account Abstraction Lesson 21: Type 113 Lifecycle

In the previous lesson we talked about the two phases of sending a transaction on ZKsync, aka **Type 113 Lifecycle**, validation and execution. We specifically honed in on the `ContractDeployer`. In this lesson, we are going to:

- review the remaining steps in the lifecycle.
- get a better understanding of the bootloader and it's role
- touch on how we will make this work in our code (but no actual coding in this lesson)

Let's go ahead and review this now.

### Lifecycle of a type 113 (0x71) transaction

**Phase 1: Validation**

1. The user sends the transaction to the "ZKsync API client" (sort of a "light node").
2. The ZKsync API client checks to see that the nonce is unique by querying the `NonceHolder` system contract.
3. The ZKsync API client calls `validateTransaction`, which MUST update the nonce.
4. The ZKsync API client checks the nonce is updated.
5. The ZKsync API client calls `payForTransaction`, or `prepareForPaymaster` & `validateAndPayForPaymasterTransaction`.
6. The ZKsync API client verifies that the bootloader gets paid.

**Phase 2: Execution**

1. The ZKsync API client passes the validated transaction to the main node / sequencer (as of today, they are the same).
2. The main node calls `executeTransaction`.
3. If a paymaster was used, the `postTransaction` is called.

---

### Phase 1 Step 2: Ensure Nonce is Unique

Let's take a closer look at step 2 in the validation phase. We can see that another system contract is mentioned - `NonceHolder.sol`.

- The ZKsync API client checks to see that the nonce is unique by querying the `NonceHolder` system contract.

If you go into the [`NonceHolder` contract](https://github.com/Cyfrin/foundry-era-contracts/blob/3f99de4a37b126c5cb0466067f37be0c932167b2/src/system-contracts/contracts/NonceHolder.sol) you will see that it contains a lot of mappings. Here we will be able to see the nonce of all the contracts in ZKsync.

---

### Phase 1 Step 3: Update the Nonce

In our `ZkMinimalAccount`, `validateTransaction` will be called. If successful, the nonce will be updated in `NonceHolder`.

---

```solidity
function validateTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
    returns (bytes4 magic)
{}
```

---

This raises a very important question. Who is the `msg.sender` when `validateTransaction` is called? The `msg.sender` will always be the bootloader system contract. The bootloader is essentially a super-admin of the system contracts. In a way, it is similar to EntryPoint on Ethereum. You can **[read more on that here.](https://docs.zksync.io/zk-stack/components/zksync-evm/bootloader)**

> ❗ **NOTE** We will eventually create two modifiers to require bootloader or owner to be the sender. This will be similar to what we did in our MinimalAccount in Ethereum.

---

### Phase 1 Steps 4-6: Check if the Nonce is Updated & Bootloader is Paid

Essentially, if `validateTransaction` does not update the nonce, the entire transaction will revert. If the nonce is updated, then it's time to pay for the transaction. ZKsync will call either `payForTransaction` or `prepareForPaymaster` and `validateAndPayForPaymasterTransaction`. Once this happens, ZKsync verifies that the bootloader gets paid. If all of these steps are successful, the validation phase of our TxType 113 lifecycle is complete.

---

### Phase 2 Execution

Once the validation phase is successful, it is sent to the main node and `executeTransaction` can be called in our `ZkMinimalAccount`. If a paymaster was used, the `postTransaction` is called.

```solidity
function executeTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
{}
```

---

This is essentially what will happen in our transaction lifecycle through the validation and execution phases. Let's take some time to review. Move on to the next lesson when you are ready.

---

### Questions for Review

---

<summary>1. What is the role of the NonceHolder system contract in ZKsync?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It is responsible for managing nonces in ZKsync. It ensures that each transaction has a unique nonce, which is crucial for transaction validation and preventing replay attacks.

</details>


<summary>2.  Who is the msg.sender when validateTransaction is called in ZKsync?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    The msg.sender when validateTransaction is called in ZKsync is always the bootloader system contract. The bootloader acts as a super-admin of the system contracts, similar to the EntryPoint on Ethereum.

</details>


<summary>3.  What happens if validateTransaction does not update the nonce?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    The entire transaction will revert.

</details>


<summary>4.  What is the role of the bootloader in ZKsync?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It is responsible for validating and executing transactions, ensuring that the nonce is updated, and verifying that the bootloader gets paid. It plays a crucial role in the transaction lifecycle.

</details>

