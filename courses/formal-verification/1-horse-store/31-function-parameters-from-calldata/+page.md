---
title: Accessing function Parameters from calldata & STOP
---

---

### **Understanding Call Data Structure**

Let's kick things off with a little refresher: when interacting with Ethereum smart contracts, the input data you send is known as _call data_. This includes a function selector followed by relevant parameter data.

For those who've played around with Remix, Ethereum's powerful tool for smart contract development, you've seen this data in action. I recall the excitement of seeing that chunk of data, a teaser of what was about to be sent on-chain.

Picture it like this:

```
[Function Selector][Parameter Data]
```

The first four bytes are the _function selector_, essentially the contract's way of knowing which function to call. After that, it's all about the parameter data—bytes that represent the information the contract function needs to act on.

Let's say we want to update a value to the number 7 in a contract. Here's the magic translated into hex code:

```
{Function Selector}{Encoded Hex of the Number Seven}
```

But how do we, mere mortals, handle such arcane knowledge?

### **Extracting Values with Solidity**

No need to summon an Ethereum wizard; we've got `callDataLoad`. This little gem of an opcode allows us to pluck bytes right out of the call data by specifying an offset.

### **Updating Storage with SSTORE**

Once the desired value is in our grasp, it's time to permanently etch it into the smart contract's storage with `SSTORE`. This opcode is the contract's quill, writing values into Ethereum's ledger.

```js
sstore(storageSlot, value);
```

At this stage, the storage slot is where we store our horse count (or whatever noble steed our contract might be dealing with), and the value is, of course, the mystical number 7.

### **The Importance of Stopping Gracefully**

As with any great tale, we need a fitting end. In the bytecode journey, this is enacted by the `STOP` opcode. It's essential for curtailing unnecessary computation and, more importantly, saving gas – the lifeblood of Ethereum transactions. Execute `STOP` and the contract halts, with no more gas expended than needed.

### **Diving Deeper into the Remix Demo**

![](https://cdn.videotap.com/618/screenshots/tdzc3Inc3RHqprkCNmAf-133.07.png)Imagine looking at the transaction input in Remix, scrolling down to that bottom box to unearth our hex-encoded number seven. Copying that value is akin to capturing lightning in a bottle – the raw energy of blockchain data in hand.

Let's revisit those vital steps:

1. Determine the byte offset to skip the function selector (four bytes).
2. Use `CALLDATALOAD` to capture our value at the offset.
3. Prepare our _storage slot_ and push it onto the stack.
4. Call `SSTORE` to write our value.
5. Gracefully exit with `STOP`.

Through this alchemy of byte manipulation and storage updates, we change the state of our Ethereum contract elegantly and efficiently.

Happy coding, and may your contracts run as smoothly as a galloping steed across the blockchain plains!
