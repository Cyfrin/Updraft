## ZKsync Testing

We have learned about using a mock network to test our code. This is useful because it allows us to test our code without having to deploy it to a live network.

We can also test our code against ZKsync if we have the ZKsync prerequisites installed.

First, we need to check the version of the ZKsync node and zkVyper:

```bash
era test node --version
```

```bash
zkVyper --version
```

Once we have those installed, we can run the following command to test our code against the ZKsync network:

```bash
mox test --network eravm
```

This will spin up a fake ZKsync network, allowing us to test our code against ZKsync without deploying it to a live network.

To further test our code, we also need to ensure we are correctly handling the `not enough balance` error. We can fix this by adding some code to our tests. For example, in the `conftest.py` file, we can add a line of code to set the balance of an account to 10 times the `SEND_VALUE`:

```python
boa.env.set_balance(account.address, SEND_VALUE * 10)
```

Then, in the `test_unit_coffee.py` file, we can add a line of code to set the balance of an account to 3 times the `SEND_VALUE`:

```python
boa.env.set_balance(account.address, SEND_VALUE * 3)
```

Running our tests again, we can see that all our tests pass. We have now tested our code against the ZKsync network and ensured that it handles the `not enough balance` error correctly.

We can also see that our tests run on ZKsync as they now display the expected information in the terminal.

We are now confident that our code is working correctly on ZKsync!
