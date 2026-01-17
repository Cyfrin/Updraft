## Crafting a Manually Created Transaction (tx)

Transactions are often just noted with "tx". To get started creating our own transaction, we'll create an object called `transaction`. We'll make it blank for now. We'll also do a print line saying "Building the transaction...".

```python
transaction = {}
print("Building the transaction...")
```

What are some of the things that we need in this transaction? Looking back here, we're probably going to need a `from` for the account that will deploy the contract. We'll skip this for now, you'll see why in a second. We also need a `to` which is the address that we're sending this to. Again, we'll come back to that as well.  We'll also need `gas`. Since we have our `favorites_contract` setup in this `web3.eth.contract`, we can cheat a little bit. We can say `transaction = favorites_contract.constructor().build_transaction()`. This will help automatically populate a lot of those fields.

```python
transaction = favorites_contract.constructor().build_transaction()
```

Let's do a little breakpoint here and run `python deploy_favorites.py`.

```bash
python deploy_favorites.py
```

We ran into this issue:

```bash
TypeError: 'NoneType' object is not iterable
```

Candidates equal ABI for ABI in contract type, if ABI equals constructor. We forgot to give our contract object the ABI, remember that Application Binary Interface. We can get that pretty easily by going back to our compilation details and just doing `compilation_details = compile_code(favorites_code, output_formats=['bytecode', 'abi'])`.

```python
compilation_details = compile_code(favorites_code, output_formats=['bytecode', 'abi'])
```

Let's clear the terminal and rerun the command.

```bash
python deploy_favorites.py
```

We now have this printing out, we have the ABI. We don't have any errors.

```python
print(transaction)
```

We have `value` of zero because we don't send any value with this. We have `gas`, so it's estimating how expensive it is to send this transaction. How much gas is it going to cost to deploy our `favorites_contract`? It has `maxPriorityFeeGas`, `maxFeePerGas` which is more gas stuff. It has the `chainId` which it actually got from our anvil instance. 

So, if you look at anvil, you might even see this `eth_chainId`. If you see any lines or any word under that "Listening on 127.0.0.1:8545...", it means that somebody started making calls or interacting with this blockchain or interacting with our locally running anvil node. 

So, our Python code actually said, hey anvil, what is your chainId? Can I get that please?  Oh, oh it's 31337.  

This data field that we have here, this is exactly the bytecode that we gave to our `favorites_contract` object. And then our `to` field is kind of confusing. 

If this breakpoint thing is confusing to you, by the way, you can just quit out and just type `print(transaction)` instead. 

```python
print(transaction)
```

Clear the terminal, and then rerun. You know just get an output like this, if that's if that's simpler for you than using the breakpoint here. 
