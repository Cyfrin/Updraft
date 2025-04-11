## Account Abstraction Lesson 3: Ethereum Setup

Welcome to the third lesson in our Account Abstraction course! In this lesson, we will be:

1. creating our foundry project.
2. setting up our environment to work with Ethereum.
3. looking at the EIP for ERC-4337.
4. diving into the essential code setup of our contract.

To get started, make sure you have foundry installed and up-to-date. To do this, run the following command in your terminal.

```js
foundryup
```

Once this process is complete, you'll need to initialize your project.

```js
forge init
```

This will create our basic project.

Next, we will go into three folders - `script`, `src`, and `test`. There you will see the following files.

- `Counter.s.sol`
- `Counter.sol`
- `Counter.t.sol`

Delete all three of these, as we will be making our own files.

In the `src` folder, create two new folders

- **ethereum**
- **zksync**

Now head over to your `README.md` and type the following:

```
# About

1. Create minimal Account Abstraction on Ethereum
2. Create minimal Account Abstraction on ZKsync
3. Deploy and send a userOp/transaction through them
    1. Not going to send an AA to Ethereum
    2. But we will send an AA tx to zksync
```

> ❗ **NOTE**tx = transaction

Now that we are all set up, we can create our Ethereum contract. We will do this in `src/ethereum` and name it `MinimalAccount.sol`.

As always, we will set up or code with the license, pragma, and contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract MinimalAccount {

}
```

Next, we need to know what to put in our contract. Well, we know that we are working with **ERC-4337**.

---

**Quick Recall!**

<summary>Think back to lesson 1. Think about the Ethereum entry point.</summary> 
<summary>How would we complete this sentence?</summary> 
<summary>We know we're supposed to be sending transactions to the _____.</summary>
<summary>Then it will be sent to the _____. From there it will go to ____.</summary>

---

<details>

**<summary>Click for Answers</summary>**

     alt-mempool nodes
     EVM/EntryPoint.sol
     your contract

</details>


From this information, we know that we will need some specific functions to make this happen. [Let's head over to the EIP](https://eips.ethereum.org/EIPS/eip-4337) and see what we need.

> ❗ **NOTE**EIP = Ethereum Improvement Proposal

---

::image{src='/foundry-account-abstraction/3-eth-setup/eip-4337.png' style='width: 100%; height: auto;'}
---

Here we will find the `UserOperation` containing all of the data that needs to go to the alt-mempools. When passed to on-chain contracts, a packed version of this called **EntryPoint definition** is used. You can have a [look at the contract on Etherscan here](https://etherscan.io/address/0x0000000071727de22e5e9d8baf0edac6f37da032).

Furthermore, we can [view the contract code directly in our browser here.](https://etherscan.deth.net/address/0x0000000071727de22e5e9d8baf0edac6f37da032) Go ahead and get there now. Once inside, it will look very similar to your code editor.

---

::image{src='/foundry-account-abstraction/3-eth-setup/etherscan-deth.png' style='width: 100%; height: auto;'}
---

Click on the magnifying glass icon in the top left of the screen. Type **function handleops** in the search box. You will see that it takes a `PackedUserOperation` and an `address payable`. When we send our information to the alt-mempool nodes, we need to send it so that the nodes can then send the `PackedUserOperation`, which is essentially a struct and is a standalone contract - `PackedUserOperation.sol`.

```solidity
struct PackedUserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    bytes32 accountGasLimits;
    uint256 preVerificationGas;
    bytes32 gasFees;
    bytes paymasterAndData;
    bytes signature;
}
```

We will get deeper into all of this soon enough. But for now, let's head back to the EIP.

Scroll down until you see the **Account Contract Interface**.

---

::image{src='/foundry-account-abstraction/3-eth-setup/account-interface.png' style='width: 100%; height: auto;'}
---

The function takes a userOp, userOpHas, and missingAccountFunds to determine whether or not the user operation is valid. If not valid, it will revert and the alt-mempool nodes won't be able to send the transaction.

We are going to import this interface from [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction/tree/develop).

> ❗ **IMPORTANT**Be sure to check the version. We are using v0.7 for this lesson.

Head back to your terminal and run the following to install it.

```bash
forge install eth-infinitism/account-abstraction@v0.7.0 --no-commit
```

Since eth-infinitism already has **IAccount Interface** we can simply import it into our contract.

```solidity
import { IAccount } from "lib/account-abstraction/contracts/interfaces/IAccount.sol";
```

Next, we need to inherit it. Simply add `is IAccount` to our contract.

```solidity
contract MinimalAccount is IAccount {
    // entrypoint will eventually call this contract

}
```

Next, click on `IAccount` to go to the contract. Scroll down until you see the `validateUserOp` function. Let's add the function to our code.

```solidity
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {}
```

Now we need to import the `PackedUserOperation`.

```solidity
import { PackedUserOperation } from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
```

You can now click on the `PackedUserOperation` contract and see the struct.

We have now set up the foundation for our contract. If you want, you could take a moment to read the comments on both of the two contracts that we have just imported. This will give you an understanding of what they do.

---

## Let's Review

<summary>1. What does 'tx' mean?</summary> 
<summary>2. What does 'EIP' stand for?</summary> 
<summary>3. What is the purpose of the `validateUserOp` function?</summary>
<summary>4. The `UserOperation` contains all the data needed to be sent to the _____.</summary>
<summary>5. The core interface required for an account to have is ____.</summary>

---

<details>

**<summary>Click for Answers</summary>**

     1. transaction
     2. Ethereum Improvement Proposal
     3. to determine whether or not the user operation is valid
     4. alt-mempool nodes
     5. interface IAccount

</details>
