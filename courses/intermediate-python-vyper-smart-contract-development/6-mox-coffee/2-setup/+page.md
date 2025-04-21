## Project Setup

We're back in our `mox-cu` folder. Let's do a little `ls` to see what we've built so far:

```bash
ls
```

We're building up a nice little folder here filled with demo projects that we're using to level up our career. Let's go ahead and make the next folder. We'll do `mkdir` and name this new folder `mox-buy-me-a-coffee-cu`.

```bash
mkdir mox-buy-me-a-coffee-cu
```

Then, we'll `cd` into that folder.

```bash
cd mox-buy-me-a-coffee-cu
```

Now, we can open this folder in our code editor. We'll do `code .`.

```bash
code .
```

We already know that we have `mox --help` and `mox` installed. We're going to initialize our new project using `mox init`. We want to use VS Code, so we'll pass in the flag `--vscode`, and we'll use a `pyproject` file, so we'll pass in the `--pyproject` flag as well:

```bash
mox init --vscode --pyproject
```

Now, we'll delete the files that were created in this directory so we can start from a blank project. We can just right-click, then click "delete" and "move to trash".

To get our starting code for this project, we'll use the code from the "Buy Me A Coffee" section in the Remix Fundamentals video. We'll go over to our GitHub repository, open `remix-buy-me-a-coffee-cu` and then open the `buy-me-a-coffee.vy` file. We're going to bring this code into our `mox-buy-me-a-coffee-cu` directory. We can copy it and paste it into a new file. We can right-click, select "New File", and name it `buy-me-a-coffee.vy`:

```python
# pragma version ^0.4.1
"""
@license MIT
@title Buy Me A Coffee!
@author You!
@notice This contract is for creating a sample funding contract

We'll learn a new way to do interfaces later...
"""
interface AggregatorV3Interface:
    def decimals() -> uint256: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view

# Constants & Immutables
MINIMUM_USD: public(constant(uint256)) = wei_value(5, "ether")
PRICE_FEED: public(immutable(AggregatorV3Interface)) = # 0x694AA1769357215DE4FAC081bf1f309c33Dc4536 sepolia
OWNER: public(immutable(address)) =
PRECISION: constant(uint256) = 1 * (10 ** 18)

# Storage
funders: public(DynArray[address, 1000])
funder_to_amount_funded: public(HashMap[address, uint256])

with constants: 262, 853

@deploy
def init(price_feed: address):
    PRICE_FEED = AggregatorV3Interface(price_feed)
    OWNER = msg.sender

@external
@payable
def fund():
    """Allows users to send $ to this contract
    Have a minimum amount to send
    How do we convert the ETH amount to dollars amount?
    """
    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
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
    """Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """
    price: int256 = staticcall(PRICE_FEED.latestAnswer())
    eth_price: uint256 = convert(price, price * eth_amount) * (10 ** 10)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # 18 '0's, 18 decimal places

@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    return self._get_eth_to_usd_rate(eth_amount)

@external
@payable
def default():
    self.fund()

```

Now, we'll compile the code. We'll use `mox compile` to do that.

```bash
mox compile
```

We have successfully compiled the contract.
