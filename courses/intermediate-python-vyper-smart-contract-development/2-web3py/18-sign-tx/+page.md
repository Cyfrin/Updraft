## Signing a Transaction Object

We've created our transaction object which is going to include the code for our Vyper contract. We're going to send it to the zero address because on the EVM world, that's how you deploy smart contracts.

We're ready to go! Well, almost. What do we need to do? We need to sign it. Remember, that's how this whole blockchain thing works, you sign your transactions with your private key. So, we're going to use the web3 tooling to automatically sign this. We'll do:

```python
w3.eth.account.sign_transaction(transaction, private_key='0x' * 64)
```

Now, as of right now, we don't have a private key, but I'm going to do something horrible that we're going to do just for now, and then I want you to never ever ever ever ever do this again. It's okay that we're doing it for now because we're using an Anvil private key, and these are very well known private keys.

We're going to copy this private key and write it in our code. We're going to do:

```python
PRIVATE_KEY = '0xac0974bec39a17e53ba78d40d28d4404b44facb478cbecde78ca4f704f7d74f7f2f80'
```

Then, down here, to sign our transaction, we're going to say:

```python
signed_transaction = w3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)
```

Now, what we just did was something that, if you continue to do this, you will get destroyed in Web3. Just for stop. I don't make the rules. That is just what will happen, guaranteed, which was first off code our private key right into one of our scripts, and then number two, leave it in plain text. It's okay for right now because this is an Anvil private key, and these are well known publicly known private keys, so it's fine for now. But, we should never do this again, and I'll explain why in a minute.

But, let's keep going. Let's do:

```python
print(signed_transaction)
```

Let's even more cool about this is we just have a signed transaction, but we haven't actually sent it yet. We haven't sent it to the blockchain. It's literally just like sitting in our terminal here. Like, anybody could literally take this transaction, now that it's signed, and go execute it.

So, additionally, you don't really want to have signed transactions lying around, so try not to do that, as well.
