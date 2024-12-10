## Testing for Reverts

We will learn how to test for reverts in our smart contracts.

When we test our smart contracts, we also want to test that they revert correctly.

For example, if somebody calls our fund function without enough money, we should expect this to actually revert. So, how do we test when a function reverts? 

We can use the `boa.reverts` method. We can add this code to our test file:

```python
def test_fund_fails_without_enough_eth(coffee):
  with boa.reverts():
    coffee.fund() 
```

This will test that the `fund` function reverts when called without enough ETH.

We can even check the exact revert message. We can add this code to our test file:

```python
def test_fund_fails_without_enough_eth(coffee):
  with boa.reverts("You must spend more ETH!"):
    coffee.fund()
```

This will test that the `fund` function reverts with the message "You must spend more ETH!".

To run a specific test, we can use the following command:

```bash
mox test -k test_fund_fails_without_enough_eth
```

This will only run the test called `test_fund_fails_without_enough_eth`.
