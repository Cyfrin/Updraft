## Transactions

So, we've been working with this `favorites_contract` thing which is on this contract object which is still a little hazy to us, but whatever. How do we actually deploy this thing? Well, if we think back to how we did it on the Remix VM, well, what do we do? We hit... well, we selected our contract, we went to the Vyper compiler, we hit "Compile", then we went to the "Deploy" tab, and we hit "Deploy" and it was that easy. When we were on injected provider with MetaMask, we would hit "Deploy", and MetaMask would pop up and say "Hey, do you want to send this transaction"?

And that, my friends, is the key to our next step. To deploy this contract, we must build a transaction. This is how we are going to learn exactly what a transaction even is, and how we can create one.

Now, this will be one of the few times we actually manually create the transaction ourselves. In the future, we will use tools that will essentially automatically create these transactions for us, but to really understand what's going on when we call a function or deploy a contract, we need to build our own custom, manually deployed, transaction. We have seen these transactions happen whenever we call a function or deploy a contract, but what are they, really?

If we go to the ethereum.org website, there's a lot more information about what transactions really are. You can see down here, a submitted transaction includes the following information. You can see there's a `from` address, a `to` address, a signature (which is something we learned way, way, way back in blockchain basics when we learned about public and private keys and hashing and all that stuff). It has a nonce (which again we learned way back in blockchain basics). This is going to be a sequentially incrementing counter which indicates the transaction number - AKA the ID of the transaction. It has a `value`, which is that message.dot value, the amount of money sent with the transaction. You have `input data` - which, oh, we've seen that before right? If I call `deploy`.... we get this crazy hex data down here, and this is the input data for the transaction. You have `gasLimit`, which we have `gasLimit` and `maxPriorityFeePerGas` and `maxFeePerGas`, which is related to all the gas stuff.

If you scroll down a little bit more, you'll see the transaction object will look something like this. And this is kind of a minimal example of a JSON or a JavaScript object in notation transaction. It has no real inputs or anything here. Having done this such a long time, I can very briefly tell you exactly what this is doing. All this is doing is sending this much Wei to this address from this address. That's pretty much it. This is an unsigned transaction here, there's no signatures, this is basically a regular transaction object that somebody would then need to sign. An Ethereum client, like `geth`, would usually handle the signing process or your MetaMask would handle the signing process or our Python would handle the signing process.

So, in `geth` you would call this `account_signTransaction`, which would go ahead and sign it, and result in this signed transaction. We aren't going to use `geth`, we're going to use Python to sign our transactions here. Let me zoom out just a hair. Oh my god, that's also terrible! We're going to use Python to sign our transactions, but it will result in this signed transaction.

You can see the transaction object has the following:

```json
{
"from": "0xEA674fd0e714f0979de3EdF0F56AA9716B889eC8",
"to": "0xac03bb73bca9e108536aaf14df5677c2b3d481e5a",
"gasLimit": "21000",
"maxFeePerGas": "300",
"maxPriorityFeePerGas": "10",
"nonce": "0",
"value": "1000000000000000"
}
```

You can see we have things like `gasLimit`, `maxPriorityFeePerGas`, `maxFeePerGas`, `nonce`, and `value`. The `input data` is a hex string, you can see, and the `from` and `to` addresses are all here.

We will then sign it, which you can see we will get the VR and S components in the signed transaction:

```json
{
"jsonrpc": "2.0",
"id": 2,
"result": {
"raw": "0xf8838001820339407a565b7ed7a678686a4c162885bedbb695fe08044401",
"tx": {
"nonce": "0x0",
"maxFeePerGas": "0x1234",
"maxPriorityFeePerGas": "0x1234",
"gas": "0x555555",
"to": "0x07a565b7ed7a678686a4c162885bedbb695fe0",
"value": "0x1234",
"input": "0xabcd",
"v": "0x26",
"r": "0x222a79bc7cc5531c99bea708218316e80bcfcfeb0bbc32e977cc5c7f71a1abb20",
"s": "0x2aadee6b344b5bb15bc42c99c09d64a75a67009008da977d4a8cc72d48977f497149166",
"hash": "0xeba2df8f09e7a612a0d4444ccfa5cc839624bddc000ddd29e3346df46d9f3870f8"
}
}
}
```

The VR and S things are what we use to verify that it was indeed signed by whoever is signing it. I know this is a little bit confusing. If this goes over your head a little bit right now, don't worry too much about it. And the `hash` is obviously the hash of the transaction, and then the `raw` section right here is the recursive length prefix, or the RLP encoded form, that you can learn more about here.

Now, this is kind of a lot of low-level signy stuff. There's kind of a lot here. Now there's a lot of kind of this low-level stuff here, and this VR and S thing can be a little bit overwhelming and confusing at first, but we are going to make it really simple.

Basically, for us to construct a transaction, we want to create this object with a `from`, `gas`, all these gas parameters, `input data`, `to`, and `value`. So, we want to set up and create a transaction with all of this stuff in here.

I hope you enjoyed this lesson. Be sure to watch the video for more information.
