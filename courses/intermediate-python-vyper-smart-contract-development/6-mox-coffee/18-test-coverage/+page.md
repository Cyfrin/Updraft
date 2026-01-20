## Test Coverage

We've been writing tests for our smart contracts.  You might be thinking, "Hey, I've done a pretty good job testing all of my contracts. I'm content with the amount I've tested." This is where the concept of **coverage** comes into play.

Moccasin comes with support for a tool called **pytest-cov**. It's a way to test how much of our code has actually been tested. We can install **pytest-cov** using this command:

```bash
pip install pytest-cov
```

Let's say we want to test how much of our current smart contract has been tested. We can run the following command:

```bash
mox test --coverage
```

This command will run all of our tests and compare it to how much of our contracts we've actually tested.

The output of the command will show us exactly which lines of code haven't been tested. For example, we might see that lines 64-69 of our smart contract have not been tested. 

To see the exact lines of code that we've missed, we can run this command:

```bash
mox test --coverage --cov-report term-missing
```

Now, we can go into the lines of code that haven't been tested and add some test cases for those. For example, if lines 64-69 are our `get_eth_to_usd_rate` function, we might add a test case for that like so:

```python
def test_get_rate(coffee):
    assert coffee.get_eth_to_usd_rate(SEND_VALUE) > 0
```

We should get a value that is greater than zero, because we are sending one whole ETH. Now if we run our test coverage command again, we should see that the lines 64-69 are now covered. 
