## Rules (Actions) Update Price

We will start by adding a rule to our fuzzer that updates the price. This rule will be called `update_collateral_price`.

```python
@rule
def update_collateral_price(self, collateral_seed, percentage_new_price):
  collateral = self.get_collateral_from_seed(collateral_seed)
  price_feed = MockV3Aggregator.at(
      self.dsc.token_to_price_feed(collateral.address)
  )
  current_price = price_feed.latestAnswer()
  new_price = int(current_price * percentage_new_price)
  price_feed.updateAnswer(new_price)

```

We also need to add a new rule to our fuzzer, called `mint_and_update`, which will allow us to mint the stablecoin and then immediately update the price.

```python
@rule
def mint_and_update(self, collateral_seed, user_seed, amount):
  self.mint_and_deposit(collateral_seed, user_seed, amount)
  self.update_collateral_price(collateral_seed, 0.3)

```

To ensure that our fuzzer is actually testing these price updates, we can adjust our fuzzer settings.  Specifically, we'll change the `max_examples` and `stateful_step_count` to 64.

```python
stablecoin_fuzzer = StablecoinFuzzer.TestCase
stablecoin_fuzzer.settings = settings(max_examples=64, stateful_step_count=64)

```

We should also add a `MockV3Aggregator` to our imports section and make sure we're importing settings from our `src.mocks` directory.

```python
from src.mocks import MockV3Aggregator, settings

```

Running our fuzzer now should produce an error. Our fuzzer will find a state where the collateral value is less than the total supply of our stablecoin, which will break our protocol. 

The code below shows an example of how we can update our `mint_and_deposit` function to double the collateral.

```python
def mint_and_deposit(self, collateral_seed, user_seed, amount):
  user = self.users[user_seed]
  with boa.env.prank(user):
    try:
      self.dsc.mint_dsc(amount)
    except BoaError as e:
      if "DSCEngine: Health factor broken" in str(e.stack_trace(0).vm_error):
        collateral = self.get_collateral_from_seed(collateral_seed)
        collateral_amount = self.dsc.get_token_amount_from_usd(
            collateral.address, amount
        )
        self.mint_and_deposit(
            collateral_seed, user_seed, collateral_amount * 2
        )
        self.dsc.mint_dsc(amount)

```

We'll run our fuzz test again and it should produce an error. We've now tested that the collateralization ratio of our stablecoin is correct. 
