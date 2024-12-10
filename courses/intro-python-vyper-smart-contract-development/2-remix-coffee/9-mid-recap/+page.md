## Recap

We haven't written much code yet, but we've covered some important topics.

The `payable` decorator is used to mark a function that can receive Ethereum. We've seen this in the `fund()` function:

```python
@payable
def fund():
```

We've also looked at the `assert` keyword. This allows us to check conditions and if the condition is false, the transaction will revert. In our code, we've checked that the `msg.value` sent to the contract is at least 1 ether.

```python
assert msg.value >= wei_value(1, "ether"), "You must spend more ETH!"
```

If the transaction reverts, all changes made during the transaction are undone, and the user receives a refund of gas.

The next topic we'll discuss is how to get data from the real world into the blockchain. We learned that this is not as simple as making an API call, because we need to avoid relying on centralized entities. We'll explore decentralized oracle networks like Chainlink Price Feeds to address this challenge.
