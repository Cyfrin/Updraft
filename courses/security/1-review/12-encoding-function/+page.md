---
title: Introduction to Encoding Function Calls Directly
---

_Follow along with the video_

---

## Understanding ABI Encoding

With the previous lesson's foundation laid, lets look at what encoding is like within the context of sending transactions.

We know the EVM is looking for this encoded information, this binary _stuff_. And since transactions sent to the blockchain are ultimately compiled down to this binary, what this allows us to do is populate the `Data` property of a transaction with this binary ourselves.


![block fee](/security-section-1/11-encoding-function/encoding-function2.png)

### ABI Encoding and Transactions

When an Ethereum transaction is initiated, it is essentially reduced to binary code. This transformation pertains not just to a contract deployment but also a function call. In both cases - transactions and function calls - the data field holds the key.

In a contract deployment, the data field contains the contract's binary code. But for a function call, the data field holds the instructions about what data to send and which function to address.

Let's dive into an example. If we inspect a transaction on Ethereum using Etherscan, you'll notice a field labeled 'Input data.' Within this field, you'll discover a jumble of hexadecimals - this is the encoded function call.

**Example Input Data**

```js
Function: enterRaffle(...)
Method ID: 0x2cfcc539
```

This `Method ID`, sometimes referred to as a `function signature`, is an encoding of that particular function, including it's name and argument types.

This encoded function call in the data field is how the EVM, or any EVM compatible chain, deciphers which function should be executed.

### Direct Function Calls

![block fee](/security-section-1/11-encoding-function/encoding-function1.png)

With our understanding of ABI encoding, the possibilities expand. We're now able to populate the data field of our transactions directly with the binary or hex code corresponding to the desired function call. Remember, when you initially compile your transaction, `data` was a field that existed? This is where that comes into play.

You may wonder why this ability is any better than directly using the interface or the Application Binary Interface (ABI). However, there could be scenarios when you might only possess the function name or the parameters. You might even want your code to make arbitrary calls, dangling at the edge of advanced programming. This is when knowing how to populate the data field directly becomes pivotal.

### Sending the Transactions

So, how do we transform this understanding into action - how do we populate the data field and then send these custom, data-encoded transactions?

In solidity, we rely on some low-level keywords - `staticcall` and `call` - to perform this function. `staticcall` and `call` are used for view or pure functions and functions that change the blockchains' state, respectively.

In these functions, the code that specifies a particular function to execute goes into the parentheses (data field). For instance, in a previous function utilized for our lottery contract,

```js
function withdraw(address recentWinner) public {
    (bool success, ) = recentWinner.call{value: address.(this).balance}("");
    require(success, "Transfer Failed");
}
```

the `{value: address.(this).balance}` segment updates the transaction's value field while the empty parentheses imply there's no function to call; the transaction merely sends money.

However, if a function needs to be executed or data should be sent, it can be specified in the parentheses, let's combine this with our previous `Method ID` we got from etherscan.

```js
function enterRaffle(uint256 entryFee) public payable {
    PuppyRaffle puppyRaffle = new PuppyRaffle;
    puppyRaffle.call{value: entryFee}("0x2cfcc539");
}
```

In the above example, you can see that we're passing the `entryFee` as an argument to the `value` property of the transaction and in the `data` field we are populating the `function signature`. This will tell the EVM, what to call, where and how much to send.

### Wrap Up

To wrap it up, remember that although the realm of Ethereum and EVM might seem overwhelming at first, understanding their machinations, such as ABI encoding, one concept at a time allows you to become an active participant in the blockchain network, enhancing your ability to interact effectively and perform more advanced operations.

> "The function of good programming is to do the thinking for you, to the extent possible, so that when you're using it, your mind is free to think." - Joshua Bloch
