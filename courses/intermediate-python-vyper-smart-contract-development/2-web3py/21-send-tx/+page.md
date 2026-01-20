## Send a Transaction

We are still in the process of learning how to build, sign, and deploy our first Solidity smart contract! In this lesson, we'll learn how to send our signed transaction, and then we'll tackle the subject of how to encrypt our private key, so that we never have to write it out like this again. 

Let's go ahead and finish up sending this transaction. We have our signed transaction, now we want to go ahead and send it. To send it, we could say, uh, we would do:

```python
w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
```

And this is going to send that signed transaction to our RPC URL that we've added right here.

```python
RPC_URL = os.getenv("RPC_URL")
```

And we're going to get a response with a transaction hash. And we can say:

```python
tx_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
print(f"My TX hash is {tx_hash.hex()}")
```

And then, this is just when we send the transaction, we actually have we actually have to wait for the transaction to complete to be included in a block. So, we would say:

```python
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Done! Contract deployed to {tx_receipt.contractAddress}")
```

And boom! So, let's go ahead, let's pull up our terminal. Make sure our virtual environment is up. Make sure anvil is up and running. And we can run:

```bash
python deploy_favorites_unsafe.py
```

We will now get this kind of crazy output. So, we get the signed transaction. Yeah, we've seen that. Now, we'll see the transaction hash is This is the byte code of the transaction hash. We could convert it from bytes to like a regular transaction hash that we're familiar with, but whatever. And then, we see Done! Contract deployed to here. And we have successfully deployed our contract. 

Now that it's actually deployed, we could then go ahead and interact with it and learn how to build transactions to interact with it. But, those are going to be pretty much very similar to what we just did here. So, you should be incredibly proud of yourself for deploying your first contract. But, don't log off yet, because I need to teach you how to never, ever, ever do this again.
