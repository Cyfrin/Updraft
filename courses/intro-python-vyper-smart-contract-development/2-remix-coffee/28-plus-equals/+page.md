## Mappings to track funders

In this lesson, we'll learn how to keep track of who sent funds to our contract, and how much they sent.

We'll use a mapping. Mappings are a fundamental concept in smart contracts. Think of them as dictionaries in Python or JavaScript. They pair a key with a value. We can make mappings public to allow anyone to read them.

We'll create a new mapping to keep track of funders and how much they sent.

```python
# # Keep track of who sent us
# # How much they sent us
```

We'll call this new mapping `_funders_to_amount_funded`.

```python
# funder -> how much they funded
_funders_to_amount_funded: public(HashMap[address, uint256])
```

This mapping will store the address of the funder as a key and the amount they sent as a value.

In our `fund` function, we'll track the amount each person sent us.

```python
@payable
def fund():
    """
    Allows users to send $ to this contract
    Have a minimum $ amount to send
    """
    # ... previous code
    self._funders_to_amount_funded[msg.sender] += msg.value
    # ...
```

Here, we access the hash map with the `msg.sender` address as the key and add the amount sent by the `msg.sender` (`msg.value`) to the value associated with the `msg.sender` in the hash map. We can also use the `+=` operator as a shorthand for adding to a value in a mapping.

```python
self._funders_to_amount_funded[msg.sender] = self._funders_to_amount_funded[msg.sender] + msg.value
```

We can also use the `+=` operator as a shorthand for adding to a value in a mapping.

```python
self._funders_to_amount_funded[msg.sender] += msg.value
```

This is the same as writing the line above.
