## msg.sender, owner and access control

We're building a smart contract where we want to make sure only we can pull the money out of the contract. We do this by using the msg.sender, which is the account that's sending the message. We can use this to make sure that only the owner of the contract can withdraw the money.

We first set the owner in the deploy function:

```python
owner: address
```

```python
def __init__(price_feed: address):
    self.minimum_usd = as_wei_value(5, "ether")
    self.price_feed = AggregatorV3Interface(price_feed)
    self.owner = msg.sender
```

We use the `msg.sender` built-in variable to set the owner of the contract to the account that's deploying it.

Then, in the withdraw function, we use the `assert` statement to make sure that the msg.sender is equal to the owner.

```python
@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.
    How do we make sure only we can pull the money out?
    """
    assert msg.sender == self.owner, "Not the contract owner!"
```

If the msg.sender is not the owner, the transaction will revert. This makes sure that only the owner of the contract can withdraw the money.

To make sure the owner is public we add `public` in front of the declaration.

```python
owner: public(address)
```

We can see this in action if we redeploy the contract and call the withdraw function.

If we call the withdraw function from the owner account, it will be successful. However, if we call the withdraw function from a different account, it will revert with the error message "Not the contract owner!".

This is an example of how we can use the msg.sender to control access to our smart contract functions. It's a simple but powerful technique that can be used to secure our code.
