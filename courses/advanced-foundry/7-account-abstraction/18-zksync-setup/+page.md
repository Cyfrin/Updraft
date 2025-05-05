## Account Abstraction Lesson 18: ZKsync Setup

Welcome to the beginning of our journey with **account abstraction** on **ZKsync**. One of the main differences that you'll immediately notice is that we won't need to worry about alt-mempools, as ZKsync has native account abstraction. Additionally, there isn't an EntryPoint.sol. Transactions go directly to your contract. Here is a description:

---

**ZKsync Account Flow**

::image{src='/foundry-account-abstraction/18-zksync-setup/zksync-account-flow.png' style='width: 100%; height: auto;'}
---

### Overview of ZK System Contracts

To get started, we are going to install Cyfrin Foundry Era Contracts. This is a mirror of the zksync system contracts. We will be using them for the beginning of our learning journey.

> ❗ **IMPORTANT** Once the era-contracts GitHub repo releases a library edition, we will recommend people to use that instead.

```js
forge install Cyfrin/foundry-era-contracts@v0.0.3 --no-commit
```

Go ahead and open `IAccount.sol` and `DefaultAccount.sol`. Be sure that you are in **_foundry-era-contracts_** and not **_account-abstraction_**.

---

### Default Accounts

In Ethereum, we have two types of wallets.

- **EOA** like Metamask
- **Smart Contract** like our account contract that we built

On the other hand, in ZKsync EOAs are smart contracts. Thus, all smart contract accounts in zk are setup as default accounts. Let's take a look.

1. Grab your wallet address from Metamask etc...
2. [Click here to go to ZKsync Era Block Explorer.](https://sepolia.explorer.zksync.io/)
3. Paste your address into the search bar
4. Follow along with the video from 4:00

**Should look something like this.**

---

::image{src='/foundry-account-abstraction/18-zksync-setup/zk-era-explorer.png' style='width: 100%; height: auto;'}
---

### IAccount Interface

In IAccount we can see the interface that all wallets/EOAs follow.

- `validateTransaction`
- `executeTransaction`
- `executeTransactionFromOutside`
- `prepareForPaymaster`

Take a moment to look over the contract to become more familiar with what it does. Don't worry if you don't completely understand everything, as we will be learning it together.

---

### ZK Minimal Account

Go into zksync folder in your src. Create a new file and call it `ZkMinimalAccount.sol`. First, we need to:

- import `IAccount.sol`
- import `Transaction` from `MemoryTransactionHelper.sol`
- set up our contract to inherit `IAccount`
- Copy and paste functions from `IAccount` into our contract

---

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IAccount} from "lib/foundry-era-contracts/src/system-contracts/contracts/interfaces/IAccount.sol";
import {Transaction} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";

contract ZkMinimalAccount is IAccount {
    function validateTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction calldata _transaction)
        external
        payable
        returns (bytes4 magic)
    {}

    function executeTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction calldata _transaction)
        external
        payable
    {}

    function executeTransactionFromOutside(Transaction calldata _transaction) external payable;

    function payForTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction calldata _transaction)
        external
        payable
    {}

    function prepareForPaymaster(bytes32 _txHash, bytes32 _possibleSignedHash, Transaction calldata _transaction)
        external
        payable
    {}
}
```

---

Now we have our **ZK Minimal Account** set up. Things are starting to get exciting! Let's take a moment to review. When you are ready, move on to the next lesson.

---

### Questions for Review

<summary>1. What is the main difference between ZKsync and Ethereum regarding account abstraction?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    ZKsync has native account abstraction, which means there is no need for alt-mempools or an EntryPoint.sol. Transactions go directly to your contract.

</details>


<summary>2. How are EOAs different in ZKsync compared to Ethereum?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

In ZKsync, EOAs are smart contracts.

</details>


<summary>3. What are the 4 functions of the IAccount interface?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

- validateTransaction
- executeTransaction
- executeTransactionFromOutside
- prepareForPaymaster

</details>

