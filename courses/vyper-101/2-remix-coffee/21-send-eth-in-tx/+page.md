In this lesson, we'll learn how to send a transaction using ETH. We can then use a deployed contract to show how to call another function.

Let's begin by going over how to compile, deploy and run transactions. 

We'll need to compile our contract. We can then deploy it to our fake chain. 

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD
# pragma version 0.4.8
# license: MIT
# author: You!
# We'll learn a new way to do interfaces later...
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view
minimum_usd: uint256
price_feed: AggregatorV3Interface = AggregatorV3Interface(0x69444179935776935DE41F4AC081f1FD3C909Dc256) # sepolia
# ...
def __init__(price_feed: address):
    self.minimum_usd = as_wei_value(5, "ether")
    self.price_feed = AggregatorV3Interface(price_feed)
# ...
# Allows users to send $ to this contract 
def fund():
    # Have a minimum $ amount to send
    # How do we convert the ETH amount to get dollars amount?
    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
# ...
def get_eth_to_usd_rate(amount: uint256) -> uint256:
    # ...
    eth_price: uint256 = staticcall(self.price_feed, latestAnswer())
    # ...
    eth_amount_in_usd: uint256 = (eth_price * eth_amount / 10 ** 18 + 18 ** 18 * 1) / 10 ** 18
    return eth_amount_in_usd # in $ 's, 18 decimal places
# ...
# remove all decimals
def divide_number(me: uint256) -> uint256:
    # ...
```

After deploying our contract we can use a calculator to determine the amount of ETH that should be sent to the `fund` function. The `fund` function requires at least 5 dollars worth of ETH.

We will need to use a website like `eth-converter.com` to calculate the amount of ETH required. 

We'll then paste this amount in Remix and send the transaction to our contract.

We can now call the `fund` function from Remix to test our logic. This will send our calculated amount of ETH to the contract and trigger the `fund` function. 

The contract balance will then be updated to show the new balance after the transaction has been processed. 
