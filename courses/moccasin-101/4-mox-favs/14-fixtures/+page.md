## Pytest Fixtures

We're going to cover the concept of pytest fixtures.

In our `test_favorites.py`, we have repeated a line of code in every test:

```python
favorites_contract = deploy_favorites()
```

This line deploys our favorites contract, which could take a long time if we had a thousand tests.  

To make our tests more efficient, we can use a concept called a **fixture**.

Let's start by importing pytest:

```python
import pytest
```

We can then create a fixture function like this:

```python
@pytest.fixture
def favorites_contract():
    return deploy_favorites()
```

We can now pass the fixture as a parameter to our test functions:

```python
def test_starting_values(favorites_contract):
    assert favorites_contract.retrieve() == 77
```

Note, we no longer need to call `deploy_favorites()` in the body of the test function.

Let's repeat this process for the other test functions:

```python
def test_can_change_values(favorites_contract):
    # Act
    favorites_contract.store(42)

    # Assert
    assert favorites_contract.retrieve() == 42

def test_can_add_people(favorites_contract):
    # Arrange
    new_person = "Becca"
    favorite_number = 16

    # Act
    favorites_contract.add_person(new_person, favorite_number)

    # Assert
    assert favorites_contract.list_of_people()[0] == (favorite_number, new_person)
```

Now, when we run `mox test`, our tests will run much faster because `deploy_favorites()` is only called once.

Pytest fixtures also have a `scope` parameter, which controls the number of times the fixture is executed. The default scope is `function`.

The `scope` parameter can be set to:

* `function` (default): The fixture is executed once per test function.
* `session`: The fixture is executed once per test session.

Let's set our fixture to a session scope:

```python
@pytest.fixture(scope="session")
def favorites_contract():
    favorites_contract = deploy_favorites()
    return favorites_contract
```

This will deploy the contract only once for the entire test session. 

If our `deploy_favorites()` function took an hour to run, we would have to wait an hour between every test. But, now that we have a session scope, our tests run much more efficiently.

We can also use a `time.sleep` function to slow down a test:
```python
import time

def deploy_favorites():
    favorites_contract = favorites.deploy()
    starting_number = favorites_contract.retrieve()
    print(f"Starting number is: {starting_number}")
    favorites_contract.store(77)
    ending_number = favorites_contract.retrieve()
    print(f"Ending number is: {ending_number}")
    time.sleep(5)
    return favorites_contract
```

If we run `mox test` now, we'll see that the tests are much slower:
```bash
mox test
```

We can see that it takes 15.05 seconds to run all three tests because we're waiting 5 seconds between each test.

Fixtures are a powerful way to make our tests more efficient and easier to write. 
