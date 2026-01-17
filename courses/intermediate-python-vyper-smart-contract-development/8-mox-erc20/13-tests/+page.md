---
title: Tests
---

## Tests

We've deployed our contract, and now we're ready to write some tests. We're not going to go in-depth with writing tests in this video, but we'll show a simple test case to get you started. 

In our project, we've created a `tests` folder. We can create a new file here called `test_token.py` and start to write our test.

First, we'll import the `deploy` function from our `deploy.py` file:

```python
from script.deploy import deploy, INITIAL_SUPPLY
```

Next, we'll create a test function:

```python
def test_token_supply():
    snek_token = deploy()
    assert snek_token.total_supply() == INITIAL_SUPPLY
```

The `test_token_supply` function will test the total supply of our token. We first deploy our token using the `deploy` function and store the contract in the `snek_token` variable.  Then, we assert that the total supply is equal to `INITIAL_SUPPLY`, which we also imported from our `deploy.py` file.

To run our test, we can open a terminal and run the following command:

```bash
mox test
```

The test will run and pass, since we've deployed our token with an initial supply of 1000.  We can write many more tests to test different functionality of our token.  We can also create separate tests for our other functions like `mint`, `transfer`, and `burn`.

The most important takeaway from this video is that we should be writing tests for our smart contracts to ensure that they function correctly. 
