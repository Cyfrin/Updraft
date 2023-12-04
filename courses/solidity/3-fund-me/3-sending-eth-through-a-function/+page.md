---
title: Sending ETH trough a function
---

*Follow along this chapter with the video bellow*




In this chapter, we'll explore how to establish a mechanism that enables users to send Ethereum (ETH) to a smart contract. Specifically, we'll create a function that requires a minimum amount of ETH.

## How Does the Transaction Work?

When a transaction on the blockchain occurs, a value field is always populated. This field represents the quantity of native blockchain cryptocurrency sent in each transaction. For instance, when the value field in a transaction between our accounts was populated through MetaMask, it indicated the amount of ETH being transferred.


## Enabling Our Function to Accept Cryptocurrency

For our function to be able to receive the native blockchain currency, we need to make the function 「payable」. In Solidity, this is accomplished using the keyword `payable`. This keyword turns the function red in the Remix UI, signifying that it can accept cryptocurrency.

```js
function fund() public payable{...}
```

## Holding Funds in Contract

Just as wallets hold funds, contracts can serve a similar role. Following deployment, a contract behaves almost identically to a wallet address. It can receive funds, interact with them, and as seen in our demo, the contract can amass a balance akin to a wallet.

<img src="/solidity/remix/lesson-4/transact/transact1.png" style="width: 100%; height: auto;">


## Transaction Value - The Message Value

The value amount of a transaction can be accessed using the `message value` global in Solidity.

```javascript
msg.value
```

This represents the number of 'wei' sent with the message. Here, 'wei' is the smallest denomination of ETH.

## Implementing Requirements for Transactions

To enforce a minimum threshold of one ether sent via our function, we can utilize the `require` keyword.

```javascript
require(msg.value > 1 ether);
```

This essentially ensures that the transaction only proceeds if at least one ether is contained within the value field. If the requirement isn’t met, the transaction reverts.

Should we wish to offer more context to the user, we can supplement the require statement with a custom error message.

```javascript
require(msg.value > 1 ether, "Didn't send enough ETH");
```

An online tool like [Ethconverter](https://eth-converter.com/) can be useful for converting between ether, wei, and Gwei (another denomination of ether).

## Reverting Transactions

If a user attempts to send less than the required amount, the transaction will fail and a message will be displayed. For instance, if a user attempts to send 1000 wei, which is significantly less than one ether `(1 x 10^18 wei)`, the transaction will not proceed.

To demonstrate this, see the example below where the user is attempting to send `3000000` wei:

<img src="/solidity/remix/lesson-4/transact/transact2.png" style="width: 100%; height: auto;">

As you can see, the require statement has the power to control the behavior of the transaction. If the condition set is not satisfied, it reverts the transaction with the provided error message. This guarantees our contract gets the minimum amount of ETH required.

By understanding how to enforce payment requirements, you gain more control over the behavior and security of your contracts. Continue exploring Solidity's capabilities to build amazing Smart Contract, let's continue with the next lesson.