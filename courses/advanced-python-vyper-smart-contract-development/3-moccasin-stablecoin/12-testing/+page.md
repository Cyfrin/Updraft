## Testing

We've built out our stablecoin engine. Now, the next step is to make sure it works correctly by adding tests.

First, we'll set up a conftest.py file to help us with our testing. We'll add a few session-scoped fixtures to help us quickly grab the information we need.

```python
from moccasin.config import get_active_network
import pytest

@pytest.fixture(scope="session")
def active_network():
  return get_active_network()

@pytest.fixture(scope="session")
def weth(active_network):
  return active_network.manifest_named("weth")

@pytest.fixture(scope="session")
def wbtc(active_network):
  return active_network.manifest_named("wbtc")

@pytest.fixture(scope="session")
def eth_usdc(active_network):
  return active_network.manifest_named("eth_usd_price_feed")

@pytest.fixture(scope="session")
def btc_usd(active_network):
  return active_network.manifest_named("btc_usd_price_feed")
```

Next, we'll create a fixture for our decentralized stablecoin engine.

```python
@pytest.fixture
def dsc(active_network):
  return active_network.manifest_named("dsc")

@pytest.fixture
def dsce(active_network):
  return active_network.manifest_named("dsce")
```

We also need a fixture to create a user with a starting balance of 10 ETH.

```python
from eth.account import Account
import boa
from eth.utils import to_wei

BALANCE = to_wei(10, "ether")

@pytest.fixture
def some_user(weth, wbtc):
  entropy = 13
  account = Account.create(entropy)
  boa.env.set_balance(account.address, BALANCE)
  with boa.env.prank(account.address):
    weth.mock_mint(BALANCE)
    wbtc.mock_mint(1)
  return account.address
```

Now we're ready to write some tests.

We'll create a tests/unit/tests*dsc_engine.py file and write some tests for the \_init* method of the decentralized stablecoin engine.

```python
from src import dsc_engine
import pytest
from eth_codex.abi.exceptions import EncodeError
from tests.conftest import COLLATERAL_AMOUNT

def test_reverts_if_token_lengths_are_different(dsc, eth_usd, btc_usd, weth, wbtc):
  with pytest.raises(EncodeError):
    dsc_engine.deploy(wbtc, weth, weth, eth_usd, btc_usd, dsc.address)

def test_reverts_if_collateral_zero(some_user, weth, dsce):
  with boa.env.prank(some_user):
    weth.approve(dsce, COLLATERAL_AMOUNT)
    dsce.deposit_collateral(weth, 0)
```

We'll use the pytest.raises() context manager to test that the code raises an EncodeError when it is passed an invalid set of token addresses. We also test that the deposit_collateral() method reverts when passed a collateral amount of 0.

Now, let's run our tests.

```bash
mox test
```

If we run this command, we'll see all of our tests pass.

We'll soon get to the workshop, where you'll write more tests to ensure our code works as expected.
