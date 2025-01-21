## Integer Division in Vyper

We're going to make a smart contract to buy us a coffee. Our price is going to be a uint256.

```python
price: int256 = staticcall self.price_feed.latestAnswer()
```

Let's say the price is $3.021.

```python
# 8 decimals
# $3,021
```

We can then multiply this price times 10 ^ 10 to get it into units of ETH.

```python
eth_price: uint256 = convert(price, uint256) * (10 ** 10)
```

Now we've multiplied this price by 10 ^ 10, so we need to add zeros.

```python
# ETH : 110000000000000000000
```

We can then get a USD value of ETH.

```python
eth_amount_in_usd: uint256 = (eth_amount * eth_price) // 1 * (10 ** 18)
```

Let's break down this equation to understand what's going on. First, we have the eth_amount, which is the amount of ETH. This is multiplied by eth_price, which is in dollars per ETH. We are going to add zeros to this.

```python
# $ / ETH : 336551000000000000000
```

To do this, we divide by 10 ^ 18.

```python
// 1 * (10 ** 18)
```

We're going to create a new function called divide_me which will take a uint256 number as input and return a uint256.

```python
def divide_me(number: uint256) -> uint256:
```

We'll return this value.

```python
return number // 3
```

We can see that this works by trying a few examples.

```python
# 4 / 2 = 2
# 6 / 3 = 2
# 7 / 3
```

Let's compile this and deploy it.

```bash
Compile buy_me_a_coffee.vy
```

We'll grab any address, like our price feed address. We'll scroll down and put in one for divide_me. What do you think we'll get if we do 1 / 3?

```bash
Deploy
```

We get 0. What about 2? Still 0. How about 3? We get 1. Four? One. Five? One. Six? Two. So, integer division is basically cutting off any decimal places. Let's try 7 / 3.

```bash
Transact
```

It's still 2. What if we do 7 / 3 on our calculator? It's 2.33333333. This is because we can't have decimals in our smart contracts. We need to be very precise when working with smart contracts. That's a crucial piece of knowledge to keep in mind when designing mathematically complex applications. We're also going to comment out the math examples we used, but we'll leave them in the Git repo associated with this course. We also have a function called get_eth_to_usd_rate.

```python
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
```

We can now go back up and convert msg.value, the amount of ETH that they sent, to its dollar equivalent.

```python
usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
```

So, instead of saying that msg.value must be greater than 1 ether, which would mean coffee cost $3,000, we'll say that the USD value of ETH must be greater than or equal to self.minimum_usd.

```python
assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
```
