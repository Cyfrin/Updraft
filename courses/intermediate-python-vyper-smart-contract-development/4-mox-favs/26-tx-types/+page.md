## Transaction Types

We are going to talk about transaction types. We won't do a deep dive explainer, but we will provide a link to an article in the GitHub repo associated with this course.

Let's dive into this. 

If we run the command:

```bash
mox run deploy --network eravm
```
we get a warning that keeps popping up:

```bash
No EIP-1559 transaction available, falling back to legacy
```
What's going on here?

Well, in the blockchain world, there are several different types of transactions. And I kind of glossed over it when we went over the transaction object. 

We said: "Okay, here's what a transaction looks like. It has its from, to, gas limit, fee, blah, blah, blah." 

But, there's also a typed transaction envelope. We can also pass a transaction type in that RLP encoding.

Now what makes it kind of confusing is that it's not actually in this little JSON blob here, right? It's actually outside of the JSON blob, but again, we're getting kind of a low-level; doesn't really matter where it is. All you need to know is that there are actually multiple different types of transactions. 

The Ethereum website does a decent job of kind of walking you through some of the different types of transactions, but we can also look at them in the Cyfrin Updraft.

So what's happening is when we get this warning: "Hey, uh no EIP 1559 or 1559 transaction available, falling back to legacy," is that ZK Sync works with a few different types of transactions, like legacy transactions, and they have a couple of their own custom transactions themselves. The main transactions or the new, normal type of transactions on Ethereum are known as these Type 2 or EIP-1559 transactions. Again, if this is going over your head a little bit, don't worry about it too much, but this type of transaction doesn't exist on ZK Sync, right? This is essentially like an advanced gas type of transaction, and ZK Sync has them in by default.

So, what happens here is that our tools try to send a Type 2 transaction. This super gas, this EIP 1559 transaction onto ZK Sync, and ZK Sync says, "Hey, we don't have those. We're already like pretty darn gas efficient. So, Mocassin and Titania will always try to send an EIP 1559 transaction first, but then, it'll revert back to a legacy transaction for ZK Sync. 

Now, when we're sending on Ethereum, it will work with a Type 2 transaction. It will work with a Type 2 transaction. You can also send Type 0 transactions on Ethereum, but you shouldn't, because they're kind of worse for gas and like gas is money, so you don't want to spend more money. So, pretty much nowadays, everyone sends Type 2 transactions on Ethereum on ZK Sync, they send legacy transactions because the gas on ZK Sync is just better.

I'm kind of glossing over the details, and this is kind of it from a high level. That's why you're seeing this error here is because there's multiple different types of transactions.

One of the coolest types of transactions is this EIP 712 or an OX 71 or a 113 transaction, which is known as a native account abstraction transaction. We won't be learning about that in this curriculum. 

**[VIDEO TAG]** **show Solidity examples of transaction types in Cyfrin Updraft**
