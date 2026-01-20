## Intro to Fuzz Testing: A Workshop

We've set up a system where we want to maintain a specific invariant: we want to ensure that the protocol has more value in collateral than in its total supply.  

### Our invariant
Our goal is to write code that will demonstrate our invariant remains true even after we make a series of changes. To do that, we're going to set up a fuzz tester that will automatically run a series of tests and then check to see if the invariant is still met. 

### Our fuzz tester
Let's create a `StablecoinFuzzer` class that incorporates rules and invariants.

```python
class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.setup()
    
    def setup(self):
        active_network = get_active_network()
        self.weth = active_network.manifest(named="weth")
        self.wbtc = active_network.manifest(named="wbtc")
        self.eth_usd = active_network.manifest(named="eth_usd_price_feed")
        self.btc_usd = active_network.manifest(named="btc_usd_price_feed")
        self.users = []
        while len(self.users) < USERS_SIZE:
            user_address = Address(f"0x{ZERO_ADDRESS.hex()}")
            self.users.append(user_address)
```

We then set up a series of rules and invariants for our fuzz tester to work with. 

### Rules

```python
@rule
def collateral_seed(self, min_value=0, max_value=1):
    collateral_seed = st.integers(min_value=min_value, max_value=max_value)
    user_seed = st.integers(min_value=0, max_value=USERS_SIZE - 1)
    amount_strategy = st.integers(min_value=1, max_value=MAX_DEPOSIT_SIZE)
    return collateral_seed, user_seed, amount_strategy

@rule
def mint_and_deposit(self, collateral_seed, user_seed, amount):
    user = self.users[user_seed]
    collateral = self.get_collateral_from_seed(collateral_seed)
    self.mint_and_deposit(collateral_seed, user_seed, collateral)

@rule
def update_collateral_price(self, collateral_seed, percentage_new_price):
    collateral = self.get_collateral_from_seed(collateral_seed)
    price = collateral.price_feed.latestAnswer()
    new_price = int(current_price * percentage_new_price)
    price_feed.updateAnswer(new_price)
```

### Invariants

```python
@invariant()
def protocol_must_have_more_value_than_total_supply(self):
    total_supply = self.dsc.totalSupply()
    weth_deposited = self.weth.balanceOf(self.dsc.address)
    wbtc_deposited = self.wbtc.balanceOf(self.dsc.address)
    weth_value = self.dsc.get_usd_value(self.weth, weth_deposited)
    wbtc_value = self.dsc.get_usd_value(self.wbtc, wbtc_deposited)
    assert (weth_value + wbtc_value) >= total_supply
```

Finally, we want to create a `liquidate()` function for our fuzz tester that allows us to simulate market effects in our protocol. 

### Liquidate

```python
@invariant()
def liquidate(self):
    for user in self.users:
        health_factor = self.dsc.health_factor(user)
        if health_factor < int(1e18):
            print(f"Liquidating user: {user}")
            total_dsc_minted, total_value_usd = self.dsc.get_account_information(user)
            debt_to_cover = total_dsc_minted - total_value_usd
            token_amount = self.dsc.get_token_amount_from_usd(self.weth.address, debt_to_cover)
            with boa.env.prank(LIQUIDATOR):
                self.mint_and_deposit(token_amount, 0, user)
                self.dsc.liquidate(self.weth, user, debt_to_cover)
```

This is a good starting point for our fuzz tester. We can run this code using the following command:

```bash
python test_fuzz.py 
```

If the invariant doesn't hold, we'll need to adjust our code to make sure that the invariant remains true even after the rules are applied. 
