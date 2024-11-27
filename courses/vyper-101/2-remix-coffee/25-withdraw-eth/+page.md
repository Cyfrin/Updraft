## Sending ETH From a Contract

In this lesson, we'll learn how to send ETH from a smart contract to a designated address,  using the `send` function. Later, we'll look at another built-in function called `raw_call` and how to implement that function. 

We'll start by creating a `withdraw` function that will send the ETH to the owner of the smart contract.

```python
@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.
    How do we make sure only we can pull the money out?
    """
    assert msg.sender == self.owner, "Not the contract owner!"

    send(self.owner, self.balance)
```

In our function, we can see that we are using the `send` function and giving it two arguments: the recipient's address (`self.owner`) and the value that we want to send (`self.balance`).

Our smart contract has a balance of ETH that we'll use to send to the owner. We'll start by funding our contract, using the `fund` function.

```python
@external
@payable
def fund():
    """Allows users to send $ to this contract 
    Have a minimum $ amount to send
    """
    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!" 
```

We can see that our `fund` function takes an amount in ETH and converts it to USD for comparison.

Now, we'll deploy the contract. We'll use the injected provider and set the value in wei. Then, we'll confirm the deployment.

```bash
vyper --version
vyper --optimize-for-size --optimize-for-speed --deploy
```

Now, we can call the `fund` function and provide a value in wei to fund our contract.

```bash
fund(1000000000000000)
```

We'll confirm the transaction. It will take a few seconds for the balance to update, but we'll confirm that it worked.

Now, let's go ahead and call the `withdraw` function. We'll confirm the transaction, and then we'll check our balance to make sure that the ETH was successfully transferred.

```bash
withdraw()
```

Now, we'll check that the balance has gone back to zero in our deployed contract.

We can see that our balance has gone back to zero. 

Now, if we want to fund with more than just wei, we can use the `ether` option in the value field and fund our contract with one ETH.

```bash
fund(1 ether)
```

We'll confirm the transaction, and we'll check that the balance has gone up to 998.

Let's go back to our contract and call the `withdraw` function. Confirm the transaction, and then check the balance in Metamask to make sure it went up to 998.

We can see that we successfully funded our contract with 1 ETH. 

That's how we can send ETH from a contract! In the next lesson, we'll learn how to use the `raw_call` function.