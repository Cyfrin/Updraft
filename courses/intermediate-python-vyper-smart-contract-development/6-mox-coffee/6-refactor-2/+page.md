We now have a decent understanding of storage. We also understand why we don't need to initialize the `get_price_module`. All we want from this module is the `get_eth_to_usd_rate` function. We also get this `PRECISION` variable, but we get it by default because this is a constant variable and it's going to be embedded directly into the bytecode of this contract. We don't have to initialize storage at all.

So with that, that's pretty much all the refactoring we're going to do. Now, I'm going to show you later how we can do a little bit of gas profiling to see how much more expensive this would be if these were storage variables instead of constants and immutables. But for the most part, this is looking pretty good.

```python
from interfaces import AggregatorV3Interface
import get_price_module

PRECISION = constant(int256(1 * (10 ** 18)))

@internal
def get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """
    price: int256 = staticcall(price_feed.latestAnswer(), [])
    eth_price: uint256 = convert(price, int256) + (10**18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # $ 3 & 0's decimal places
```
