## Wei, Gwei, and ETH in Vyper

We're going to learn about how to convert between Wei and ETH.

Here's a code snippet:

```python
# pragma version 0.4.1
# @license MIT
# @author You!

@external
@payable
def fund():
    """Allows users to send $ to this contract.
    Have a minimum $ amount send

    1. How do we send ETH to this contract?
    """
    assert msg.value == 1000000000000000000
```

This is a pretty confusing concept, but it will make more sense as we explore it. 

First, if you go to the site eth-converter.com, you can see there are some different units for Ethereum. 

If you type in one ETH, you'll see how much one ETH is in Wei. Wei is the smallest divisible unit of account in the Ethereum ecosystem. So, one ETH, as of recording, is worth approximately $3241.63, and has 18 zeros in its Wei equivalent.

Let's look at how we can make our code more readable. 

Instead of typing in that long Wei number every time, we can use a built-in Vyper function called as_wei_value. Here's an example:

```python
assert msg.value == as_wei_value(1, "ether")
```

We're saying, hey, let's get the wei value of one ETH and return it as Wei.

Another way to see this is with a calculation:

```python
assert msg.value == (1 * 10 ** 18) 
```

This double times, or power of 18, is the same as the Wei value of one ETH.

We can add a message in our code in case someone doesn't send enough ETH, like this:

```python
assert msg.value == as_wei_value(1, "ether"), "You must spend more ETH!"
```

This helpful message will let users know if they don't send enough ETH. Without this message, if someone sends less than one ETH, the transaction will break. 

Let's talk about the different ways we can use the 'equals' sign in Vyper. The `==` symbol is what we use to check if two things are equivalent. 

Here's an example:

```python
my_num: uint256 = 7
```

This is setting the value of `my_num` to 7. It's not checking if the value of `my_num` is equal to 7. So, this line is not equivalent to:

```python
assert msg.value == as_wei_value(1, "ether"), "You must spend more ETH!"
```

This is a subtle but important distinction for new Vyper developers. Don't worry too much about this right now, as you practice more it'll start to make more sense. 
