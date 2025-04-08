## Reverts in Vyper

Reverts are an incredibly important part of the Vyper language. They allow us to undo any actions that have been done and send the remaining gas back. Let's explore how they work!

We can see a revert in action with this code:

```python
# pragma version 0.4.1
# @license MIT
# @author You!

my_num: public uint256

@external
@payable
def fund():
    """
    Allows users to send $ to this contract.
    Have a minimum $ amount send
    1. How do we send ETH to this contract?
    """
    self.my_num = self.my_num + 2
    assert msg.value == as_wei_value(1, "ether"), "You must spend more ETH!"
```

Let's set our state variable to `2` and then call our `fund` function. We'll deploy the contract and then call `my_num`. We'll see that our `my_num` has been set to `2` as expected. This is because the `assert` condition was met.

Now, let's change the `value` to `0` and then call `fund`. Our terminal output will show us that the transaction failed and has been reverted. When we call `my_num` again, we'll see that it is still set to `2` and the value has not changed.

This is because the `assert` condition was not met. The transaction was reversed and the state was rolled back to how it was before.

Reverts are a great way to ensure that transactions are only executed when certain conditions are met. They are particularly useful when working with real networks, where transactions can be expensive.

We will also want to check that our transaction did not revert.

If the transaction reverted, the terminal output will tell us why. This can be useful for debugging and understanding why our transaction is failing.

In the blockchain world, if you send a transaction and it reverts, you've updated nothing. You will have spent money but the transaction will not have updated the state. We want to do everything in our power to not send transactions that are going to revert.

Metamask will also give us a popup saying that the transaction will likely revert. If this happens, we should confirm that we want to send the transaction.
