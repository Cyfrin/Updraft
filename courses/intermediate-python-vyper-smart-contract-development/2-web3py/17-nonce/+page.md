## Setting the Transaction Nonce

We'll start by customizing our transaction by adding a nonce. The nonce is a unique identifier associated with the transaction, and it is important to set it to ensure the transaction goes through successfully.

We can add the nonce to our transaction by saying:

```python
nonce = w3.eth.get_transaction_count(w3.eth.accounts[0])
```

However, this line of code assumes we are using the first account in the list of accounts. To make this more specific, we can create a variable called `MY_ADDRESS` and store the address of the account we want to use. We can get this address from Anvil.

```python
MY_ADDRESS = "0xf96e51aa8fd985ff46ce4a88827279cfffb92266"
```

Now, we can use this variable to get the nonce for our transaction.

```python
nonce = w3.eth.get_transaction_count(MY_ADDRESS)
```

We can then add this nonce to our transaction dictionary.

```python
transaction = favorites_contract.constructor().build_transaction(
    {
        "nonce": nonce,
        "from": MY_ADDRESS,
    }
)
```

We can also add the nonce directly to our transaction dictionary:

```python
transaction = favorites_contract.constructor().build_transaction(
    {
        "nonce": w3.eth.get_transaction_count(MY_ADDRESS),
        "from": MY_ADDRESS,
    }
)
```

We can also manually set a gas price, if we want. We can do this by setting the `gasPrice` key in our transaction dictionary.

```python
transaction = favorites_contract.constructor().build_transaction(
    {
        "nonce": nonce,
        "from": MY_ADDRESS,
        "gasPrice": w3.eth.gas_price
    }
)
```

We can also manually set the chain ID. To do this, we can add a `chainId` key to our transaction dictionary. However, this will cause our transaction to fail if it is different from the chain ID of the network we are connected to.

We can create our transaction object manually as well, but it is easier to use the `build_transaction` method.  We can see that this method generates a lot of the data we need for our transaction, such as the `nonce`, `from`, `gasPrice`, and `data`. The `data` field represents the compiled bytecode of our Vyper contract.

Finally, we can print out our transaction object to see the data that has been generated.

```bash
python deploy_favorites.py
```