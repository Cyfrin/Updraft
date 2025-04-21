## Sending a Transaction with ETH in Remix

We're going to compile and deploy a contract. We will then call a function on this contract which requires the transaction to pay ETH. We're going to do this using the Remix VM.

First, we'll compile our contract.

```python
# pragma version 0.4.1
# @license: MIT
# @author: You!

@external
@payable
def fund():
    """Allows users to send $ to this contract.
    Have a minimum $ amount send

    1. How do we send ETH to this contract?
    """
    assert msg.value == as_wei(1, "ether") "You must spend more ETH!"

@external
def withdraw():
    pass
```

Now, we'll deploy this contract.

```python
# pragma version 0.4.1
# @license: MIT
# @author: You!

@external
@payable
def fund():
    """Allows users to send $ to this contract.
    Have a minimum $ amount send

    1. How do we send ETH to this contract?
    """
    assert msg.value == as_wei(1, "ether") "You must spend more ETH!"

@external
def withdraw():
    pass
```

We'll see a red button and an orange button.

The orange button `withdraw` is not payable and doesn't do anything. But `fund` is red and is payable because it has the `@payable` keyword in the code.

We can send a transaction to `fund` and the Remix VM will know to include some ETH. The default account in Remix has 99.9999999999999999 ETH in it.

We can send a transaction to `fund` by placing a value in the `VALUE` section and calling the function.

If we call the function with a value of zero, the transaction will be reverted, because our contract requires a value of at least one ETH. We'll see a message: "You must spend more ETH!".

Transactions can be reverted because the contract has specific requirements that were not met, such as the requirement to send at least one ETH in this case.

If we call the function with a value of one ETH, the transaction will go through.

We can set the value to two ETH and try to call the function again, but the transaction will be reverted, showing the same error message: "You must spend more ETH!".

We'll go into reverts in more depth in a later lesson.
