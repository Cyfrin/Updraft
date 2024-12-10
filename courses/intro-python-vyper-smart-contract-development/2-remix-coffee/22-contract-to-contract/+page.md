## Making a function call another function

In this lesson, we'll learn about making a function call another function in Vyper.

We'll use an example of a function that takes an amount of ETH in Wei and converts it to USD.

First, we create a function to do the calculation.

```python
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee:
    Is that more or less than $5?
    """
    eth_price: uint256 = staticcall(self.price_feed, latestAnswer()) * (10 ** 10)
    price_in_usd: uint256 = (convert(uint256, price) * eth_amount) // (1 * 10 ** 18)
    eth_amount_in_usd_uint256: uint256 = price_in_usd * eth_amount // (1 * 10 ** 18)
    return eth_amount_in_usd_uint256 # 18 0's, 18 decimal places
```

We can create an external function that runs our internal function.

```python
@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    return self._get_eth_to_usd_rate(eth_amount)
```

We'll say ETH amount uint256 returns a uint256. All we got to do is say return self.\_get_eth_to_usd_rate(eth_amount).

This creates an external function `get_eth_to_usd_rate` that calls the internal function `_get_eth_to_usd_rate` passing the `eth_amount` as an argument.

This is a useful technique when you need to expose an internal function. It allows you to keep internal functions private while still providing an external interface to access their functionality.
