## Staging Tests

We're going to be working with staging tests.  Fork tests are technically a type of staging test. But we're going to be working with a type of test where we can actually deploy the smart contracts to a testnet or even to a mainnet.

A set of tests you may want to run on an actual network is to make sure that the network does what you want it to do. 

We can also signify staging tests to run on real networks. To learn more about this, we can scroll down to staging markers in the Moccasin documentation.

A lot of developers should run some sanity checks on a live network. For example, if you're working with oracles or any setup tricks. But, a lot of people don't.

In order to run a test on an actual testnet, we have to mark it with a staging `pytest` marker. 

We can tell Moccasin that it can run the test, deploy the code, and send transactions. If we don't have a staging test, the tests should skip it.

By default, all tests are marked as `local`. We can make a test that's both a staging and a local test by using the following:

```python
@pytest.mark.staging
@pytest.mark.local
```

Let's write a staging test. We will create a new file called `test_staging_coffee.py`.

```python
def test_can_fund_and_withdraw_live():
    active_network = get_active_network()
    price_feed = active_network.manifest_named("price_feed")
    coffee = deploy_coffee(price_feed)
    coffee.fund(value=SEND_VALUE)
    amount_funded = coffee.address_to_amount_funded(boa.env.eoa)
    assert amount_funded == SEND_VALUE
    coffee.withdraw()
    assert boa.env.get_balance(coffee.address) == 0
```

We will then run the test in our terminal using the following command: 

```bash
mox test --network sepolia
```

This will take a lot longer because we're sending real transactions. We can modify our `deploy` file to only run verification in the main function.

**Tag:** We can add a code block here for the updated deploy file.

This test might take a long time to run, and we can expect our tests to fail because we don't have any ETH on our testnet.

We can also see that the tests are trying to verify the contract.

This is how we write a staging test and run it on a live network.

