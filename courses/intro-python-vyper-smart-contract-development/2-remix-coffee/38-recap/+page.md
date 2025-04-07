## Recap

In this lesson we will continue working with our _buy-me-a-coffee_ smart contract. We will introduce a few more key fundamentals to help us understand the basics of smart contract development in Vyper. We'll then move on to more complex aspects later in the course.

Here is the code we are working with so far:

```python
# pragma version 0.4.1
"""
@license MIT 
@title Buy Me A Coffee!
@author You!
@notice This contract is for creating a sample funding contract
"""

# We'll learn a new way to do interfaces later...
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view

# Constants & Immutables
MINIMUM_USD: public(constant(uint256)) = as_wei_value(5, "ether")
PRICE_FEED: public(immutable(AggregatorV3Interface)) # 0x694AA1769357215DE4FAC081bf1f309aDC325306 sepolia
OWNER: public(immutable(address))
PRECISION: constant(uint256) = 1 * (10 ** 18)

# Storage
funders: public(DynArray[address, 1000])
funder_to_amount_funded: public(HashMap[address, uint256])

# With constants: 262,853
@deploy
def __init__(price_feed: address):
    PRICE_FEED = AggregatorV3Interface(price_feed)
    OWNER = msg.sender

@external
@payable
def fund():
    self._fund()

@internal
@payable
def _fund():
    """Allows users to send $ to this contract
    Have a minimum $ amount to send

    How do we convert the ETH amount to dollars amount?
    """
    usd_value_of_eth: uint256 = self._get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] += msg.value


@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.

    How do we make sure only we can pull the money out?
    """
    assert msg.sender == OWNER, "Not the contract owner!"
    raw_call(OWNER, b"", value = self.balance)
    # send(OWNER, self.balance)
    # resetting
    for funder: address in self.funders:
        self.funder_to_amount_funded[funder] = 0
    self.funders = []

@internal
@view
def _get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """
    price: int256 = staticcall PRICE_FEED.latestAnswer() 
    eth_price: uint256 = (convert(price, uint256)) * (10**10)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # 18 0's, 18 decimal places

@external 
@view 
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    return self._get_eth_to_usd_rate(eth_amount)

@external 
@payable 
def __default__():
    self._fund()
```

In this code, we have:

- A _decimals_ function which returns a uint8 value.
- A _description_ function which returns a String value.
- A _version_ function which returns a uint256 value.
- A _latestAnswer_ function which returns an int256 value.
- We have declared the constants _MINIMUM_USD_, _PRICE_FEED_, _OWNER_, and _PRECISION_.
- We have declared the storage variables _funders_ and _funder_to_amount_funded_.
- We have declared the initializer function **_init_**.
- We have declared the _fund_ function which is payable and allows users to send ETH to the contract.

The topics we've covered so far are:

- Interfaces
- Constants
- Immutables
- Storage
- Initializers
- Payable Decorators
- Function Documentation

We have also seen how to use `msg.sender`, `msg.value`, and `self` in our code.

We will cover more advanced topics later in the course.
