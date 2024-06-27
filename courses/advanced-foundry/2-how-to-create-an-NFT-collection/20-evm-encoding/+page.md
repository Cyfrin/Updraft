---
title: Advanced EVM - Encoding functions directly
---

_Follow along the course with this video._



---

### Introduction

Today, we're going to take a deep dive into a concept that's integral to interacting with Ethereum and any EVM-compatible chain - ABI encoding and decoding. With the basics of this concept under our belt, we'll see how it aligns itself to the bytecode the Ethereum Virtual Machine (EVM) uses. At its core, this process involves converting different variables into binary or other such low-level byte representation for use in transaction data fields.

<img src="/foundry-nfts/20-function/function1.png" style="width: 100%; height: auto;">

Let’s break down some vital elements before we delve into the intricacies of ABI encoding and decoding.

### Understanding Bytecode and Binary

Bytecode and binary are low-level programming languages that computers or the Ethereum network use for their transactions. This strange series of characters, which seem utterly incoherent to us, are but different codes that execute various functions in the Ethereum Blockchain.

### Contract Deployment and Function Calls

With a better grasp of binary and bytecode, let's investigate what happens when we deploy a contract or make a function call. Think of the `data` field in the contract deployment as the keeper of all the binary code of the contract. In a function call, the `data` field contains the function to call at the given address.

If we examine _Etherscan_, a popular Ethereum Blockchain explorer, we can look at the input data of a transaction. This seemingly indecipherable, convoluted bit of 'hex' or binary is the `data` field of the transaction. Essentially, this is what the EVM uses as a guide to know which function to execute.

### Populating the 'Data' Piece

This knowledge equips us with a seemingly bizarre ability. Whenever we send a transaction, we can fill in the `data` field ourselves with the binary code we want to execute. If we glance back at one of the previous sections where we discussed Ethers, we can use our understanding of function calls and binary to populate this `data` field with a function that we want to call, in binary format.

At first glance, this might sound unappealing. After all, why would someone desire to manually feed in binary code into the `data` field when we have the ABI and other interfaces designed to make our lives easier? The answer lies in the flexibility this presents. Perhaps all you have is the function name, or maybe, you only have the parameters you want to send. If you'd like your code to make arbitrary function calls or perform intricate tasks, then manually defining your `data` field becomes an invaluable asset in your development arsenal.

### Low-Level Keywords: 'Call' and 'Static Call'

With this newfound knowledge, how do we go about challenging the norms and making these custom `data` calls? Thankfully, Solidity extends some low-level keywords just for us: `call` and `static call`.

The `call` keyword lends us the ability to call functions and change the state of the blockchain. On the other hand, `static call` allows us to call 'view' or 'pure' functions, which don't alter the state of the blockchain and just return a value.

If we modify the data in our `call` function using these parameters, we'll find that we can influence the value of our transactions directly. Moreover, the `gasLimit` and `gasPrice`, which are integral to the financial aspect of transactions, can also be changed.

### Using Parentheses to Add Data

If we pinpoint the location of the parentheses in a typical `call`, we come across a region where we can add our `data`. When specified, instead of merely sending money to a function, we can use this space to `call` different functions we desire.

<img src="/foundry-nfts/20-function/function2.png" style="width: 100%; height: auto;">

In conclusion, ABI encoding and decoding enable us to have more control over our transactions and function calls. Therefore, understanding the low-level process enables not only a broader understanding of how Ethereum works but also opens the door to more complex and custom transaction handling in the blockchain.
