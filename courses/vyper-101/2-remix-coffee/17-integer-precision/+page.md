## Integer Precision

We're going to work on integer precision. We'll be getting the price of Ethereum using a Chainlink price feed, which returns a price with eight decimals.

Here we're creating a function called `get_eth_to_usd_rate` which returns the price.

```python
def get_eth_to_usd_rate():
  price: int256 = staticcall(self.price_feed.latestAnswer(), [])
```

We'll use the `decimals` function to get the number of decimal places in the price.

```python
  # 8 decimals
```

This function returns a price in USD, which is 3,021.

```python
  # $3,021
```

We need to calculate the ETH amount in USD.

```python
  eth_amount_in_usd
```

The price that we're going to get from Chainlink is going to be a number like this:

```python
  price: int256 = staticcall(self.price_feed.latestAnswer(), []) # 33655100000
```

We need to convert this to the ETH amount in USD.

```python
  eth_amount_in_usd
```

The function that we'll use is called `get_eth_to_usd_rate`, and we'll pass in the ETH amount.

```python
def get_eth_to_usd_rate(eth_amount: uint256):
```

Let's say Chris sent us 0.01 ETH to buy a coffee.

```python
  Chris sent us 0.01 ETH for us to buy a coffee.
```

Is that more or less than $5?

```python
  Chris sent us 0.01 ETH for us to buy a coffee.
  Is that more or less than $5?
```

Our minimum USD is $5.

```python
minimum_usd: uint256
```

So how do we convert this 0.01 to its dollar amount?

```python
  price: int256 = staticcall(self.price_feed.latestAnswer(), []) # 33655100000
```

We get the price, which will be something like this.

```python
  price: int256 = staticcall(self.price_feed.latestAnswer(), []) # 33655100000
```

Now, our ETH amount is going to have how many decimal places?

```python
  price: int256 = staticcall(self.price_feed.latestAnswer(), []) # 33655100000
```

This is where the math in the blockchain gets a little bit tricky.

Remember before, in Ethereum, there's ether, there's Gwei, and there's Wei. One ether has this many Wei.

So it's got 18 zeros, or 18 decimal places. However, we found from looking at this, and then actually there's also a decimals function, which has eight here. This answer only has eight decimal places. It has eight additional zeros, although some of the zeros are actual numbers. So it has eight decimal places.

So we first going to need to update this price from having eight decimals to 18. That's actually really easy. All we have to do is say ETH price,

```python
  eth_price: uint256 =
```

of type uint256 equals price times 10 raised to the 10th.

```python
  eth_price: uint256 = price * 10**10
```

This is how we add those decimal places.

```python
  eth_price: uint256 = price * 10**10
```
