## Testing Deploy Scripts 

We're going to continue testing smart contracts. We'll focus on a common issue that arises: testing a deploy script.

Currently, our tests only verify the starting values. However, we haven't included tests for the changes our deploy script makes. 

Let's fix this by adding tests for the changes our deploy script makes. 

We are going to make use of the import system in Python, which can be done by importing modules, which are essentially folders or files that contain code we can access. 

The script folder in our project contains an `__init__.py` file, which informs Python that the folder is a module and allows us to import functions from it. 

We'll modify the import statement in our test file: 

```python
from script.deploy import deploy_favorites
```

We can then use our function in our tests to get the contract:

```python
def test_starting_values():
    favorites_contract = deploy_favorites()
    assert favorites_contract.retrieve() == 77
```

Now, our tests will verify the starting values of our contracts. 

Let's also add a test to verify that our deploy script can change values.

```python
def test_can_change_values():
    favorites_contract = deploy_favorites()
    favorites_contract.store(42)
    assert favorites_contract.retrieve() == 42
```

By using the import system and explicitly referencing our deploy script, we can effectively test the changes made to our contracts during deployment. 

Now, we'll run our tests:

```bash
mox test
```

We can see that our tests pass. 
