## Pranking and Impersonating in Solidity Tests

Sometimes when we're writing tests, we want to pretend to be somebody else, or we want to prank. Our account, the default account, is going to be who deployed this address. But we should probably check that the non-owner cannot withdraw.

We will need to get some other random user. We can assign a value to `RANDOM_USER`:

```python
RANDOM_USER = boa.env.generate_address('non-owner')
```

Now we can write a test called `test_non_owner_cannot_withdraw`:

```python
def test_non_owner_cannot_withdraw(coffee, account):
    # Arrange
    boa.env.set_balance(account.address, SEND_VALUE)
    coffee.fund(value=SEND_VALUE)
    # Act
    with boa.prank(RANDOM_USER):
        boa.reverts('You are not the owner!',
                   coffee.withdraw())
```

We are arranging by funding the account. Then, we are pranking a random user, and we are reverting. Let's test it out with a terminal command:

```bash
mox test
```

This is how you pretend to be some other user. This is how you set the current user to somebody else random. And this is how you revert. Let's keep going. 

We will check to see if it doesn't work. Let's also check to see how it does work. We can do a test called `test_owner_can_withdraw`.

```python
def test_owner_can_withdraw(coffee, account):
    # Arrange
    boa.env.set_balance(account.address, SEND_VALUE)
    coffee.fund(value=SEND_VALUE)
    # Act
    with boa.env.prank(coffee.OWNER):
        coffee.withdraw()
    # Assert
    assert coffee.funders() == boa.env.get_balance(coffee.OWNER) == 0
```

Usually, just to make sure, I like to also prank that I am actually the owner here. So, I might do something like `boa.env.set_balance` and then `coffee.OWNER`. 

We then do `coffee.fund(value=SEND_VALUE)`. Finally, we assert that `boa.env.get_balance(coffee.address)` is equal to zero. 

Let's test this out. 

```bash
mox test
```

We ran into an error "unsupported type". Let's scroll up and see what line it's mad at me about. It looks like it's on the `assert` line about getting the balance of `coffee.address`. 

Let's change the `assert` line, to instead be:
```python
assert coffee.funders() == 0
```

Let's run `mox test` again and see if it passes. 
