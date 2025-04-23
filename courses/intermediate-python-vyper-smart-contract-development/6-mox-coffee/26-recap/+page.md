## Moccasin: A Smart Contract Development Course

This course will walk you through building a foundational understanding of smart contract development. We will be using Moccasin, a free and open source development framework, to learn how to write, test, and deploy smart contracts.

The course is designed to be interactive, with quizzes, code samples, and workshops to help you learn. We'll go through a real-world example: a "Buy Me a Coffee" smart contract, to help solidify the concepts learned.

**This section will be covering:**

* Formatting code
* Using Constants and Immutables
* Understanding storage vs constants vs immutables
* Writing unit tests
* Using mocks to test our contracts
* Using mox's manifest named
* Keeping track of deployments in a database
* Running fork tests

### Formatting Code

We will start by learning how to format our codebase in a more readable and maintainable way. We will split our codebase into separate files.

For our example, we'll have three files:

* buy_me_a_coffee.vy
* get_price_module.vy
* AggregatorV3Interface.vyi

#### buy_me_a_coffee.vy

```python
#pragma version 0.4.1

@license MIT
@title Buy Me A Coffee!
@author You!

#notice This contract is for creating a sample funding contract
#.......

from interfaces import AggregatorV3Interface
import get_price_module

# Constants & Immutables
MINIMUM_USD: public(constant(uint256)) = wei_value(5, "ether")
PRICE_FEED: public(immutable(AggregatorV3Interface)) = 0x694AA1769357215DE4FAC081b1f
OWNER: public(immutable(address)) =

# Storage
funders: public(DynArray(address, 1000))
funder_to_amount_funded: public(HashMap(address, uint256))

# With constants: 262,853
@deploy
def __init__(price_feed: AggregatorV3Interface, address: address):
    self.price_feed = price_feed
    self.address = address
```

#### get_price_module.vy

```python
from interfaces import AggregatorV3Interface

PRECISION: constant(uint256) = 1 * (10 ** 18)

@internal
@view
def get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    # Chris sent us 0.01 ETH for us to buy a coffee
    # Is that more or less than $5?

    price: int256 = staticcall(price_feed.latestAnswer())
    eth_price: uint256 = convert(price, uint256) * (10 ** 10) / (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // (10 ** 18)

    return eth_amount_in_usd # 18 '0's, decimal places
```

#### AggregatorV3Interface.vyi

```python
@external
@view
def decimals() -> uint8:
    #.......

@external
@view
def description() -> String[100]:
    #.......

@external
@view
def version() -> uint256:
    #.......

@external
@view
def latestAnswer() -> int256:
    #.......
```

### Understanding Constants and Immutables

We'll then go over the concepts of constants and immutables, key elements in smart contract development.

**Constants:**
* Values defined during contract deployment.
* Cannot be changed once deployed.
* Their values are inlined at compile time.

**Immutables:**
* Values defined during contract deployment, like constants.
* Their values are stored in a specific location in storage, not inlined.
* Can be read by anyone.

### Testing Smart Contracts

We will then learn how to test our smart contracts using the Python testing framework PyTest.

**Types of Tests:**

* Unit Tests: Test a single function or part of your code.
* Integration Tests: Test how different parts of your code work together.
* Fork Tests (Staging): Test your code in a production-like environment, but with a forked version of the blockchain.

We will be primarily writing unit tests in this section. To run our tests, we will use the following terminal command:

```bash
mox test
```

This will run all of our unit tests. We can also run a specific test file:

```bash
mox test tests/unit/test_unit_coffee.py
```

#### Writing Unit Tests

We will write unit tests to verify the following:

* The `PRICE_FEED` is correctly set.
* The initial values of `MINIMUM_USD` and `OWNER` are correct.
* The `fund` function fails if the sender doesn't provide enough ETH.
* The `fund` function correctly sets the `funders` array and `funder_to_amount_funded` mapping.
* The `withdraw` function can only be called by the `OWNER`.
* The `withdraw` function correctly updates the balance of the contract and the `OWNER`.

**test_unit_coffee.py**

```python
from eth_utils import to_wei
import boa
from tests.conftest import SEND_VALUE

RANDOM_USER = boa.env.generate_address("non-owner")

def test_price_feed_is_correct(coffee, eth_usd):
    assert coffee.PRICE_FEED() == eth_usd.address

def test_starting_values(coffee, account):
    assert coffee.MINIMUM_USD() == to_wei(5, "ether")
    assert coffee.OWNER() == account.address

def test_fund_fails_without_enough_eth(coffee):
    with boa.reverts("You must spend more ETH!"):
        coffee.fund()

def test_fund_with_money(coffee, account):
    # Arrange
    boa.env.set_balance(account.address, SEND_VALUE * 3)

    # Act
    coffee.fund(value=SEND_VALUE)

    # Asset
    funder = coffee.funders(8)
    assert funder == account.address
    assert coffee.funder_to_amount_funded(funder) == SEND_VALUE

def test_non_owner_cannot_withdraw(coffee_funded, account):
    with boa.env.prank(RANDOM_USER):
        with boa.reverts("Not the contract owner!"):
            coffee_funded.withdraw()

def test_owner_can_withdraw(coffee_funded):
    with boa.env.prank(coffee_funded.OWNER()):
        coffee_funded.withdraw()

    assert boa.env.get_balance(coffee_funded.address) == 0

def test_get_rate(coffee):
    assert coffee.get_eth_to_usd_rate(SEND_VALUE) > 0
```

### Fork Tests

Fork tests allow us to test our smart contracts in a production-like environment, but without sending any real money. This is useful for testing complex scenarios or for verifying that our contracts work as expected.

To run a fork test, we use the following terminal command:

```bash
mox test --network sepolia --fork
```

This will run our tests on a forked version of the Sepolia testnet.

### Working with the Database

Moccasin provides a database where we can store information about our deployments. This database is used to keep track of the addresses of our contracts, the RPCs used to deploy them, and the transactions that were sent.

### Wrapping Up

Congratulations on completing this section! You have learned how to format code, understand constants and immutables, write unit tests, and run fork tests. You've also learned how to use mox's manifest named and how to use a database to keep track of your deployments.

Now is a great time to take a break, go for a walk, or lift some iron at the gym! You have earned it! We've covered a lot in this section, so make sure to review the material and reach out if you have any questions.

Get ready for the next section, where we will learn about deploying our smart contracts to the Ethereum blockchain!
