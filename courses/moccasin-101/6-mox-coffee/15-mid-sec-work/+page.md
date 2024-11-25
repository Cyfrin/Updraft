## Mid-Section Workshop

We've done a little bit of refactoring to make our code more efficient.  We're also starting to do some interesting things with our tests, and we want you to write one of the last tests we'll need before we move on to some more advanced topics.  

We're going to do Workshop 1.  We want you to write a test that:

* funds the contract with 10 different funders
* withdraws the funds using the owner 
* asserts that:
  * the ending balance of `buy_me_a_coffee` is 0
  * the ending balance of the owner is the addition of all the amounts the funders added

This might sound simple, but there are some tricky parts to it.  We've seen how to use `boa.env.generate_address()` to make a random address to use as a funder, so try making 10 of them.  For bonus points, see if you can write some code that makes it a bit easier to make a bunch of these addresses at once, rather than just copy-pasting the code 10 times.  

To withdraw the funds, we'll have to use the `prank` function to pretend we are the owner.  We've done this in earlier lessons, so this should be a review.  

Finally, we'll want to use the `boa.env.get_balance()` function to check the ending balance of both the contract and the owner.  We've also seen this function in earlier lessons, so this part should be familiar.

As always, spend at most 25 minutes on this workshop.  If you're stuck, take a break and ask for help or look at the solution on GitHub.

```python
RANDOM_USER = boa.env.generate_address("non-owner")
```

```python
def test_fund_with_money(coffee, account):
  # Arrange 
  boa.env.set_balance(account.address, SEND_VALUE)
  # Act 
  coffee.fund(value=SEND_VALUE)
  # Asset
  funder = coffee.funders(0)
  assert funder == account.address
  assert coffee.funder_to_amount(funder) == SEND_VALUE
```

```python
def test_owner_can_withdraw(coffee, funded):
  with boa.env.prank(coffee.OWNER()):
      coffee_funded.withdraw()
  assert boa.env.get_balance(coffee_funded.address) == 0
```