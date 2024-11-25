## More Fixtures

We can create a fixture to reduce the code duplication in our tests. 

We can use a `pytest.fixture` with a `scope="function"` to create a fixture that runs once per test function. Here's how we can write a new fixture called `coffee_funded`:

```python
@pytest.fixture(scope="function")
def coffee_funded(coffee, account):
    boa.env.set_balance(account.address, SEND_VALUE)
    coffee.fund(value=SEND_VALUE)
    return coffee
```

We can then use this fixture in our tests. For example, in the `test_non_owner_cannot_withdraw` test, instead of setting the balance of the account and funding the contract, we can now use the `coffee_funded` fixture:

```python
def test_non_owner_cannot_withdraw(coffee_funded, account):
    # Arrange
    with boa.env.prank(RANDOM_USER):
        with boa.reverts("Not the contract owner!"):
            coffee_funded.withdraw()
```

We can also update the `test_owner_can_withdraw` test:

```python
def test_owner_can_withdraw(coffee_funded, account):
    with boa.env.prank(coffee_funded.OWNER):
        coffee_funded.withdraw()
    assert boa.env.get_balance(coffee_funded.address) == 0
```

We'll also add a new test to make sure we can withdraw from the contract:

```python
def test_fund_with_money(coffee_funded, account):
    # Arrange
    boa.env.set_balance(account.address, SEND_VALUE)

    # Act
    coffee_funded.fund(value=SEND_VALUE)

    # Assert
    funder = coffee_funded.funders(0)
    assert funder == account.address
    assert coffee_funded.to_amount_funded(funder) == SEND_VALUE
```

And lastly, we can update the `test_fund_with_money` test as well:

```python
def test_fund_with_money(coffee_funded, account):
    # Arrange
    boa.env.set_balance(account.address, SEND_VALUE)

    # Act
    coffee_funded.fund(value=SEND_VALUE)

    # Assert
    funder = coffee_funded.funders(0)
    assert funder == account.address
    assert coffee_funded.to_amount_funded(funder) == SEND_VALUE
```

We'll make sure to import `boa` and `SEND_VALUE` in our test file.
```python
from eth_utils import to_wei
import boa
from tests.conftest import SEND_VALUE
```

Now we can run our tests:

```bash
mox test
```

We'll have to update our `conftest.py` file to add our new `SEND_VALUE` variable:

```python
SEND_VALUE = to_wei(1, "ether")
```

Running our tests again will pass.

Our tests now reuse code by using the `coffee_funded` fixture, which helps us avoid duplicating code in our tests and makes them more readable.
