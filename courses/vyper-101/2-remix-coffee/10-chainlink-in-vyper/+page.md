We are going to create a simple smart contract to teach you how to use Chainlink price feeds.

We are going to use Remix to create this smart contract, with the following code. We will explain this code in detail later.

```python
# @license: MIT
# @author: You!

minimum_usd: uint256

@deploy
def __init__():
    self.minimum_usd = 5

@external
@payable
def fund():
    """Allows users to send $ to this contract.
    Have a minimum $ amount send
    """
    # How do we convert the ETH amount to dollars amount?
    assert msg.value >= self.minimum_usd, "You must spend more ETH!"

@external
def withdraw():
    pass
```

We want users to send us the minimum USD value. In this example, we have set this value to 5. So how do we convert this ETH amount to dollars?

First, let's create a new function for this conversion.

```python
@internal
def get_eth_to_usd_rate():
    # Address: 0x9aA77716935D5E4AC08b1f17f309aC232d236858
    # ABI
    pass
```

We will need to obtain the price of ETH in dollars.

Chainlink provides price feeds, which we can use for this conversion. We will need to get the Chainlink price feed address for the network we are working with. We can find this information in the Chainlink documentation. We are going to be working with the Sepolia testnet, and we can find the address for the ETH / USD price feed there.

We have the address for the Chainlink price feed. Now, we need the ABI or the Application Binary Interface. This interface defines the functions of the Chainlink price feed contract.

The ABI is also available in the Chainlink documentation.

```python
@internal
def get_eth_to_usd_rate():
    # Address: 0x9aA77716935D5E4AC08b1f17f309aC232d236858
    # ABI
    eth_usd_price_feed = Contract("0x9aA77716935D5E4AC08b1f17f309aC232d236858",
                                    get_eth_to_usd_rate_abi)
    # Now, we can call the latestRoundData function
    # of the price feed and store it as a tuple.
    # latestRoundData is a function that returns the latest round data for the price feed.
    # It returns a tuple of four values:
    # - current round
    # - latest answer
    # - latest timestamp
    # - latest updated timestamp
    # The second element of this tuple,
    # latest answer, is the latest price
    # of ETH in dollars.
    (
        # current round
        ,
        # latest answer
        latest_answer
        # latest timestamp
        ,
        # latest updated timestamp
        ,
    ) = eth_usd_price_feed.latestRoundData()
    return latest_answer
```
