## Converting Types in Vyper

We will learn about type conversions in Vyper. We'll start with an example of a scenario where we might need to perform a type conversion:

```python
@external
def get_eth_to_usd_rate(eth_amount: uint256):
    # Chris sent us 0.01 ETH for us to buy a coffee.
    # Is that more or less than $5?
    price: int256 = staticcall(self.price_feed, "latestAnswer()", [336551000000])
    # 8 decimals
    # $3,021
    eth_amount_in_usd = price * (10 ** 10)
```

This code shows an error:

```bash
TypeError: TypeMismatchGiven reference has type int256, expected uint256
```

This error indicates that the variable `eth_amount` has a type `int256`, but the variable `price` is expecting `uint256`.

We can address this by performing a type conversion on the `price` variable. Vyper provides a built-in function called `convert`, which we can use to convert a variable or literal from one type to another. 

```python
eth_amount_in_usd = convert(price, uint256) * (10 ** 10)
```

This line converts the `price` variable, which is `int256`, to `uint256`, and then multiplies by `10**10`. We can compile this code and it should execute as expected. 
