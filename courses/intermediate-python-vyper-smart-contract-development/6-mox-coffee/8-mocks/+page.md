## Mock Contracts

To test our smart contracts, we are going to deploy mock versions of them to our own local PyEVM network.

First, we need to make a script to deploy our own fake price feed contract. To deploy our own fake price feed contract, we will need to grab the code from the Chainlink GitHub repo.

We can find the code in the `src/mocks/mock_v3_aggregator.vy` file.

We will copy and paste the code into our project, and will need to convert it from Solidity to Vyper.

We have a minimal Chainlink price feed contract here in Vyper. We are going to use this for mocking, not for actually deploying price feeds.

We have created a new script called `deploy_mocks.py`. This script will deploy our mock price feed contract.

```python
from src.mocks import mock_v3_aggregator
from moccasin.boa.tools import VyperContract

STARTING_DECIMALS = 8
STARTING_PRICE = int(2000e8)

def deploy_feed() -> VyperContract:
    return mock_v3_aggregator.deploy(STARTING_DECIMALS, STARTING_PRICE)

def moccasin_main():
    active_network = get_active_network()
    price_feed: VyperContract = deploy_feed()
    coffee = buy_me_a_coffee.deploy(price_feed.address)
    print(f"Coffee deployed at: {coffee.address}")
    print(coffee.get_eth_to_usd_rate(1000))

```

We also have a `deploy.py` script to run these contracts.

```python
from moccasin.config import get_active_network
from script.deploy_mocks import deploy_feed
from moccasin.boa.tools import VyperContract
from src import buy_me_a_coffee

def deploy_coffee(price_feed: str):
    buy_me_a_coffee.deploy(price_feed)

def moccasin_main():
    active_network = get_active_network()
    price_feed: VyperContract = deploy_feed()
    coffee = buy_me_a_coffee.deploy(price_feed.address)
    print(f"Coffee deployed at: {coffee.address}")
    coffee.get_eth_to_usd_rate(1000)

```

This method of mocking is common in testing. We might need to rewrite a contract to make it easier to work with.

**Code Block for `mock_v3_aggregator.vy`:**

```python
# pragma version 0.4.1
#license MIT

DECIMALS: immutable(uint8)

latestAnswer: public(int256)
latestTimestamp: public(uint256)
latestRound: public(uint256)

getAnswer: public(HashMap[uint256, int256])
getTimestamp: public(HashMap[uint256, uint256])
getStartedAt: public(HashMap[uint256, uint256])

supply: uint256
decimals: uint256
version: public(constant(uint256)) = 4

@deploy
def __init__(decimals: uint8, initialAnswer: int256):
    DECIMALS = decimals
    self.updateAnswer(initialAnswer)
    print(f"HELLO FROM MOCK AGGREGATOR")

@internal
def updateAnswer(answer: int256):
    self.latestAnswer = answer
    self.latestTimestamp = block.timestamp
    self.latestRound = self.latestRound + 1
    self.getAnswer[self.latestRound] = answer
    self.getTimestamp[self.latestRound] = block.timestamp
    self.getStartedAt[self.latestRound] = block.timestamp

@external
def updateRoundData(
    _roundId: uint256, answer: int256, timestamp: uint256, startedAt: uint256
):
    self.latestRound = _roundId
    self.latestAnswer = answer
    self.latestTimestamp = timestamp
    self.getAnswer[self.latestRound] = answer
    self.getTimestamp[self.latestRound] = timestamp
    self.getStartedAt[self.latestRound] = startedAt

@external
@view
def getRoundData(roundId: uint256) -> (uint256, int256, uint256, uint256, uint256):
    return (
        roundId,
        self.getAnswer[roundId],
        self.getStartedAt[roundId],
        self.getTimestamp[roundId],
        roundId,
    )

@external
@view
def latestRoundData() -> (uint256, int256, uint256, uint256, uint256):
    return (
        self.latestRound,
        self.getAnswer[self.latestRound],
        self.getStartedAt[self.latestRound],
        self.getTimestamp[self.latestRound],
        self.latestRound,
    )

```

**Terminal Command to run the script**

```bash
mox run deploy
```

**Code block for `buy_me_a_coffee.vy`**

```python
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
    """ Allows users to send $ to this contract
    Have a minimum $ amount to send
    How do we convert the ETH amount to dollars amount?
    ...
    """
    usd_value_of_eth: uint256 = get_price_module.get_eth_to_usd_rate(PRICE_FEED, msg.value)
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] += msg.value

@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.
    How do we make sure only we can pull the money out?
    ...
    """
    assert msg.sender == OWNER, "Not the contract owner!"
    raw_call(OWNER, b"", value=self.balance)

@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    return get_price_module.get_eth_to_usd_rate(PRICE_FEED, eth_amount)

@external
@payable
def default():
    self._fund()
```

**Code Block for `get_price_module.vy`:**

```python
from interfaces import AggregatorV3Interface

PRECISION: constant(uint256) = 1 * (10 ** 18)

@internal
@view
def _get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    """Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    ...
    """
    price: int256 = staticcall(price_feed.latestAnswer())
    eth_price_in_usd: uint256 = convert(price, uint256) * (10 ** 10) // (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # 18 '0's, 18 decimal places

```
