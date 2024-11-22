## Gas Comparison: Constants and Immutables vs Storage

We are going to explore how expensive it is to deploy a contract, and call a fund function with constants and immutables.

Let's make sure that our contract has compiled and is ready to be deployed.

Next, we will navigate to the deploy tab in Remix. We are going to be using our injected Metamask. However, we're going to go back to our fake chain.

Now, we're going to use this price feed address. We'll copy this, paste it in, and deploy our contract.

After a few moments, we'll see that our contract has deployed and is available to interact with.

Let's take a look at how much gas it cost to deploy our contract. In the transaction details, scroll down and you'll find the transaction cost. This is the entire cost of the whole transaction. Let's copy this number.

Now we'll return to our contract code, and above our deploy function, we'll add this line:

```python
# With constants: 262853
```

We'll add a second line:

```python
# With constants: 105332
```

Next, we'll make some changes to our contract code to remove the `constant` keyword. This will require us to change our deploy function to the following code:

```python
@deploy
def __init__(price_feed: address):
    self.minimum_usd = as_wei_value(5, "ether")
    PRICE_FEED = AggregatorV3Interface(price_feed)
    OWNER = msg.sender
```

We've also changed our fund function to the following:

```python
@external
@payable
def fund():
    """Allows users to send $ to this contract 
    Have a minimum $ amount to send
    How do we convert the ETH amount to dollars amount?"""

    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] += msg.value

```

We'll compile these changes and deploy our contract again.

Now, let's take a look at the gas costs and compare them. 

With constants, deploying our contract cost 262,853 gas. Let's put those numbers side by side to really see the difference.

Without constants, it cost 282,553 gas to deploy our contract. 

That's 20,000 gas difference, or in real world money, it's 7 cents cheaper.  

Let's do the same for the fund function. We'll copy 0.002, and call the fund function. 

After confirmation, let's take a look at the gas cost. 

With constants, the transaction cost was 105,332 gas.  We'll go back to our contract and put these costs side by side. 

Without constants, the transaction cost is 107,432 gas. 

Again, by making the minimum a constant we saved 2,000 gas.

So we've seen that making small changes to our code can lead to significantly lower gas usage, which will save money for anyone interacting with your contracts. 
