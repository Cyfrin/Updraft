## As Wei Value

In this lesson, we're going to look at the `as_wei_value()` function within solidity.

Let's say we have a smart contract that requires a minimum USD value to be sent to it. In this case, that minimum amount is 5 USD.

```python
self.minimum_usd = 5
```

However, this can be an issue because we're working in Ethereum, and the units of value are in Ether.

```python
usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
```

Remember, ETH has 18 decimal places. So, a value of 5 USD will not be represented as 5 in this context. Instead, we'll need to convert the value of 5 USD into Ether (WEI).

```python
self.minimum_usd = 5 * (10 ** 18)
```

We can also do this:

```python
self.minimum_usd = 5000000000000000000
```

However, this is not a readable way to present the code. Instead, we can use the function `as_wei_value()` to make the code much more legible.

```python
self.minimum_usd = as_wei_value(5, "ether")
```

We can now use this new minimum USD value (in WEI) for our assertions:

```python
assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
```

This `as_wei_value()` function is a great shortcut for adding those 18 decimal places.
courses\vyper-101\2-remix-coffee\20-as-wei-value\+page.md
