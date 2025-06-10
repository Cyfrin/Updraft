## Deployment Parameterization

We're back to our code base.  We now have this `get_price` function which we are actually going to comment out. Again, I'm using command forward slash as a keyboard shortcut for this because we are not actually going to use this. 

But what we are going to do is we're going to create this `get_eth_to_usd_rate` function. 

We just learned how to get the price from a chain price feed. This is really exciting.  We're only going to use this one price feed in this entire contract. 

We are going to make the price feed a state variable, up at the top.

Since our structs are the same as in the last lesson, the `AggregatorV3Interface` is a new type.  We can create a variable, a state variable, or a storage variable, called `price_feed` of type `AggregatorV3Interface`. 

In our deploy function, we can say `self.price_feed = AggregatorV3Interface()` at address.  We are hardcoding this address into the contract.

We can add a comment saying that we are using the Sepolia testnet: 

```python
# Sepolia
```

We should instead add the address as a parameter. We can do this with the following code:

```python
@external
def deploy(price_feed_address: address):
    self.minimum_usd = 5
    self.price_feed = AggregatorV3Interface(price_feed_address)
```

The deploy function now has an input for the price feed address. 

Now that we have our `price_feed` object, we can scroll down to our `get_eth_to_usd_rate` function.  We will make the price variable equal to `staticcall self.price_feed.latestAnswer()`.

```python
@internal
def get_eth_to_usd_rate():
    price: int256 = staticcall(self.price_feed.latestAnswer())
```

This way, right when we deploy our contract, we can parameterize the address that we want to use.  This is a much cleverer way than hard coding it in. 
