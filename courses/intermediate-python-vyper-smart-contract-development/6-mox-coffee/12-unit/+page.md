## Unit Tests

We'll start with the simplest kind of test, unit tests. We'll test a function and see if it works. We can create a new folder called **unit** to hold these tests.

We'll need to create a file called **conftest.py** (make sure this is in your **tests** folder, not in your **unit** folder) to hold our fixtures.

```python
import pytest

@pytest.fixture
def coffee():
    return deploy_coffee()
```

Here, we import the `pytest` library and create a function called `coffee` that returns the result of calling our deploy script.

Next, we need to create a file called **test_unit_coffee.py** in our **unit** folder to write our actual tests.

```python
from eth_utils import to_wei

def test_price_feed_is_correct(coffee, eth_usd):
    assert coffee.PRICE_FEED() == eth_usd.address

def test_starting_values(coffee, account):
    assert coffee.MINIMUM_USD() == to_wei(5, "ether")
    assert coffee.OWNER() == account.address
```

Here, we import the `to_wei` function from `eth_utils`, then we create two tests. The first checks if the price feed address is correct. The second tests the starting values of the coffee contract.

We'll run our tests using the command:

```bash
mox test
```

We'll need to make sure to import the `get_active_network` function in **conftest.py**, as well as create a fixture for our account.

```python
from moccasin.config import get_active_network

@pytest.fixture(scope="session")
def account():
    return get_active_network().get_default_account()
```

Now, we've created a `get_active_network` fixture that will always return the same default account for each test, ensuring consistency.

We've also added a `to_wei` function to test the minimum USD value in Wei.

If we run our tests again using the command:

```bash
mox test
```

We'll see that our tests are all passing.

##  TAG: add a code block to show the deployment script

We've covered how to write unit tests for our coffee contract, ensuring the price feed and starting values are correct.  Now, let's test the owner of the contract. 

Let's create a new test:

```python
def test_owner_is_account(coffee, account):
    assert coffee.OWNER() == account.address 
```

We use the `account` fixture we created in our **conftest.py** to make sure the owner of the contract is the same as the account that deployed it.
