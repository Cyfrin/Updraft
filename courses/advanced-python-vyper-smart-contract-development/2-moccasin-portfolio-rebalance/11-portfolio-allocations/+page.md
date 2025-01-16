## Calculating Portfolio Allocations

In this lesson, we'll continue working with the Aave protocol and focus on calculating portfolio allocations.  

We'll be focusing on two main concepts:

* Getting our asset balances after depositing into Aave
* Calculating the percentage allocation of each asset to our total portfolio value

We'll use the code we have written before to interact with the Aave protocol, and then we'll add new code to calculate our allocations.  Let's get started!

### Getting Our Balances in Aave

First, we'll get our balances of our Aave assets (`a_usdc` and `a_weth`) in Aave.

We've already deposited our USDC and ETH into our Aave account, and now we need to get the current balances for those assets.

```python
a_tokens = aave_protocol_data_provider.getAlATokens()
print(a_tokens)
```

We can then use these `a_tokens` and loop through them to get the balances for our Aave assets:

```python
for token in a_tokens:
    if "WETH" in token[0]:
        a_weth = active_network.manifest_named("usdc", address=token[1])
    if "USDC" in token[0]:
        a_usdc = active_network.manifest_named("usdc", address=token[1])
```

Now, we need to actually get the balances for those Aave assets. We'll use the `balanceOf` function for each:

```python
a_usdc_balance = a_usdc.balanceOf(boa.env.eoa)
a_weth_balance = a_weth.balanceOf(boa.env.eoa)
```

It's important to remember the number of decimals for each asset. `a_usdc` has 6 decimals, and `a_weth` has 18 decimals.

We need to normalize the balances to use them for calculation. We can do this by dividing the balance by the corresponding number of decimals.

```python
a_usdc_balance_normalized = a_usdc_balance / 1_000_000
a_weth_balance_normalized = a_weth_balance / 1_000_000_000_000_000
```

Let's print out the normalized balances to see them:

```python
print(a_usdc_balance_normalized)
print(a_weth_balance_normalized)
```

### Getting The Prices

Now, we'll get the prices for USDC and ETH.

We can do this by using the Chainlink price feeds.  These feeds allow us to query the price for an asset on the blockchain, which will be slightly out of sync with real-time market data.

First, we need to get the address for the Chainlink price feed. We can do this by searching for the price feed on the Chainlink documentation.

After getting the address for the USDC/USD price feed, we can now use it to get the price of USDC.  We'll create a function called `get_price` that takes a string representing the feed name and returns the price.

```python
def get_price(feed_name: str) -> float:
    active_network = get_active_network()
    price_feed = active_network.manifest_named(feed_name)
    price = price_feed.latestAnswer()
    decimals = price_feed.decimals()
    decimals_normalized = 10 ** decimals
    return price / decimals_normalized
```

This function gets the price for the provided feed and normalizes the price to 18 decimals.

Now, we can call this function to get the price of USDC and ETH.  We'll then print the prices:

```python
usdc_price = get_price("usdc_usd")
weth_price = get_price("eth_usd")
print(usdc_price)
print(weth_price)
```

### Calculating Portfolio Allocations

Now, we can use the normalized balances and prices to calculate the percentage allocation of each asset to our total portfolio value.

We'll first calculate the value of USDC and ETH, and then sum them to get the total value of our portfolio.

```python
usdc_value = a_usdc_balance_normalized * usdc_price
weth_value = a_weth_balance_normalized * weth_price
total_value = usdc_value + weth_value
```

Next, we'll calculate the target allocation for USDC and ETH, which we previously defined as 30% for USDC and 70% for ETH.

```python
target_usdc_value = 0.3
target_weth_value = 0.7
```

We'll then calculate the current percentage allocation for USDC and ETH.

```python
usdc_percent_allocation = usdc_value / total_value
weth_percent_allocation = weth_value / total_value
```

We can also add a small buffer to account for the potential discrepancies between our desired allocation and the actual allocation.

```python
BUFFER = 0.1
```

Finally, we'll create a boolean variable called `needs_rebalancing` to indicate whether our portfolio needs to be rebalanced.

```python
needs_rebalancing = (abs(usdc_percent_allocation - target_usdc_value) > BUFFER or abs(weth_percent_allocation - target_weth_value) > BUFFER)
```

Let's print out our results:

```python
print(needs_rebalancing)
print(usdc_percent_allocation)
print(weth_percent_allocation)
```

### Conclusion

We have now successfully calculated our portfolio allocations. We have the normalized balances and prices, and can now use this information to determine if we need to rebalance our portfolio.

In the next lesson, we'll build on this and create a system to automatically rebalance our portfolio based on the current market prices and our target allocations.