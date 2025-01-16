##  Set balance in MochaSin and TitanoBoa

We are going to discuss some cheat codes in MochaSin and TitanoBoa. These codes will allow us to set the balance of a user and also pretend or prank a user. This is important if we want to test how other users with different amounts of money interact with our contract.

We are going to call our `fund` function and actually send some money, but we need to make sure that whoever calls this `fund` function actually has money to do so. This is where we can start getting into the concept of cheat codes or functions that work with the PyEVM or local forked network in order to set up our tests better.

For example, if we want to call `fund`, we'll need some money to actually have money. So, we can add this test:

```python
def test_fund_with_money(coffee, account):
  account.transfer(coffee.address, to_wei(5, "ether"))
  assert coffee.balance() == to_wei(5, "ether")
  boa.env.set_balance(account.address, SEND_VALUE)
  coffee.fund(value=SEND_VALUE)
  # Assert
  amount_funded = coffee.funders(0)
  assert amount_funded == SEND_VALUE
```

We are going to call the `fund` function with money. In order to do this, we'll need to send some money to the account we want to interact with. Then, we can set the balance of the account with the `SEND_VALUE` amount. We can then go ahead and run this test:

```bash
mox test
```

Or, we can run a specific test with:

```bash
mox test -k test_fund_with_money
```

We are testing some basic functionality here, and I'm going to leave a lot of time for you to actually write a whole bunch of tests because you should get incredibly good at writing tests. AI's are very helpful at writing tests, and you should use AI's to help you write your tests. But, sometimes, AI's screw it up, and what's worse is if you write a test or AI writes a test, and it doesn't test what you want it to test, and it breaks. That will be very bad.

So, let's keep going, and I'll leave you some time to write tests afterwards. 
