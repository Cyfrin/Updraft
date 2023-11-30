---
title: Introduction to Enconding Function Calls Directly
---

_Follow along with the video_

<iframe width="560" height="315" src="https://www.youtube.com/embed/vDf9qFIODrE?si=twyv7qewB_ZJtI-f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding the Ethereum Protocol: Understanding ABI Encoding

In the realm of Ethereum and its compatible chains, a quirky little thing called "ABI encoding" holds great significance. Don't be led astray by its esoteric name; it essentially just converts high-level code into a format the Ethereum Virtual Machine (EVM) can decipher - binary or bytecode.

Understanding the ins and outs of ABI encoding, and its counterpart decoding, helps one grasp how Ethereum transactions are processed, and most importantly, grants the power to participate actively in the EVM's communication process.

## ABI Encoding and Transactions

When an Ethereum transaction is initiated, it is essentially reduced to binary code. This transformation pertains not just to a contract deployment but also a function call. In both cases - transaction and function call - the data field holds the key.

In a contract deployment, the data field contains the contract's binary code. But for a function call, the data field holds the instructions about what data to send and which function to address.

Let's dive into an example. If we inspect a transaction on Ethereum using Etherscan, you'll notice a field labeled 'Input data.' Within this field, you'll discover a jumble of hexadecimals - this is the encoded function call.

```js
**Input Data Example**
Function: enter Raffle(...)
Method ID: 0xa4593e
```

This encoded function call in the data field is how EVM, or any EVM compatible chain, deciphers which function should be executed.

## Direct Function Calls

<img src="/security-section-1/11-encoding-function/encoding-function1.png" style="width: 100%; height: auto;" alt="block fee">

With our understanding of ABI encoding, the possibilities expand. We're now able to populate the data field of our transactions directly with the binary or hex code corresponding to the desired function call. Remember, when you initially compile your transaction, `data` was a field that existed? This is where that comes into play.

You may wonder why this ability is any better than directly using the interface or the Application Binary Interface (ABI). However, there could be scenarios when you might only possess the function name or the parameters. You might even want your code to make arbitrary calls, dangling at the edge of advanced programming. This is when knowing how to populate the data field directly becomes pivotal.

## Sending the Transactions

So, how do we transform this understanding into action - how do we populate the data field and then send these custom, data-encoded transactions?

In solidity, we rely on some low-level keywords - static call and call - to perform this function. `Static call` and `call` are used for view or pure functions and functions that change the blockchains' state, respectively.

In these functions, the code that specifies a particular function to execute goes into the parentheses (data field). For instance, in a previous function utilized for our lottery contract,

```js
recentWinner.call{value: prizeAmount}("");
```

the `{'{'}value: prizeAmount{'}'}` segment updates the transaction's value field while the empty parentheses imply there's no function to call; the transaction merely sends money.

However, if a function needs to be executed or data should be sent, it can be specified in the parentheses, e.g.,

```js
address.call{value: 0}(data);
```

To wrap it up, remember that although the realm of Ethereum and EVM might seem overwhelming at first, understanding their machinations, such as ABI encoding, one concept at a time allows you to become an active participant in the blockchain network, enhancing your ability to interact effectively and perform more advanced operations.

> "The function of good programming is to do the thinking for you, to the extent possible, so that when you're using it, your mind is free to think." - Joshua Bloch
