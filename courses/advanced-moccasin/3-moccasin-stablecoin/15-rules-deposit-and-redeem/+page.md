## Deposit & Redeem Collateral 

In this video, we are going to learn how to test the deposit and redeem functionality of a decentralized stablecoin project. 

### Rules 

We can define rules that specify how the fuzzer should interact with the smart contracts. These rules will dictate what actions the fuzzer should take. For instance, we can create a rule called "Deposit and Mint" that will randomly mint collateral for users and deposit it into the protocol. 

We can also define rules that specify conditions that must be met during fuzzing. 

### Invariants 

An invariant is a property of the system that should always be true. We can define invariants that represent the conditions that should be met during the fuzzing process to ensure the protocol's integrity.  

For instance, we can set an invariant to ensure the total value of deposited collateral is always greater than the total supply of the stablecoin. This invariant can be enforced during fuzzing by using the "assume" command. 

### Example Rules

Here are some example rules that we can define:

**1. Deposit Collateral:**

```python
@rule
def deposit_collateral(self, collateral_seed, user_seed, amount):
    collateral = self.get_collateral_from_seed(collateral_seed)
    user = self.users[user_seed]
    with boa.env.prank(user):
        collateral.approve(self.dsc.address, amount)
        self.dsc.deposit_collateral(collateral, amount)
```

**2. Redeem Collateral:**

```python
@rule
def redeem_collateral(self, collateral_seed, user_seed, percentage):
    user = self.users[user_seed]
    collateral = self.get_collateral_from_seed(collateral_seed)
    max_redeemable = self.dsc.get_collateral_balance_of_user(user, collateral)
    to_redeem = (max_redeemable * percentage) // 100
    assume(to_redeem > 0)
    with boa.env.prank(user):
        self.dsc.redeem_collateral(collateral, to_redeem)
```

### Running the Fuzz Test

To run the fuzz test, we can use the following command:

```bash
mox test -s stablecoin_fuzzer
```

The fuzzer will execute the rules and invariants we defined. If any of the invariants are broken, the fuzzer will identify it as a bug.

### External View Functions

External view functions are functions that allow the fuzzer to interact with the smart contract's state. These functions do not modify the state, but they provide visibility into it.

For example, we can define an external view function to retrieve the USD value of a collateral.

```python
@external
@view
def get_usd_value(collateral_address: address, amount: uint256) -> uint256:
    return self.get_usd_value(collateral_address, amount)
```

### Code Walkthrough

Let's take a look at the code we wrote in this video.

First, we imported the necessary libraries and defined constants:

```python
from hypothesis.stateful import RuleBasedStateMachine, initialize, rule, invariant, assume
from script_deploy_dsc_engine import deploy_dsc_engine
from moccasin.config import get_active_network
from eth_constants import ZERO_ADDRESS
from boa.utils.abi import Address
import boa
from hypothesis import strategies as st
from eth_utils import to_wei

USERS_SIZE = 10
MAX_DEPOSIT_SIZE = to_wei(1000, "ether")
```

Next, we defined the "StablecoinFuzzer" class, which is a RuleBasedStateMachine. Inside the class, we defined the "setup" method to initialize the state machine.

```python
class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
    @initialize()
    def setup(self):
        self.dsc = deploy_dsc()
        self.dsce = deploy_dsc_engine(self.dsc)
        active_network = get_active_network()
        self.weth = active_network.manifest_named("weth")
        self.wbtc = active_network.manifest_named("wbtc")
        self.eth_usd = active_network.manifest_named("eth_usd_price_feed")
        self.btc_usd = active_network.manifest_named("btc_usd_price_feed")
        self.users = [Address("0x" + ZERO_ADDRESS.hex())] * 1
        while Address("0x" + ZERO_ADDRESS.hex()) in self.users:
            self.users = boa.env.generate_address(USERS_SIZE)
```

We then define the "deposit_and_mint" rule that randomly deposits collateral into the protocol. This is done with the following code:

```python
@rule
def deposit_and_mint(self, collateral_seed, user_seed, amount):
    collateral = self.get_collateral_from_seed(collateral_seed)
    user = self.users[user_seed]
    with boa.env.prank(user):
        collateral.mint(amount)
        collateral.approve(self.dsc.address, amount)
        self.dsc.deposit_collateral(collateral, amount)
```

Finally, we defined the "redeem_collateral" rule, which randomly redeems collateral from users:

```python
@rule
def redeem_collateral(self, collateral_seed, user_seed, percentage):
    user = self.users[user_seed]
    collateral = self.get_collateral_from_seed(collateral_seed)
    max_redeemable = self.dsc.get_collateral_balance_of_user(user, collateral)
    to_redeem = (max_redeemable * percentage) // 100
    assume(to_redeem > 0)
    with boa.env.prank(user):
        self.dsc.redeem_collateral(collateral, to_redeem)
```

### Conclusion

This video provides a brief introduction to fuzz testing and how we can apply it to decentralized stablecoin projects. The techniques we covered can be applied to other smart contracts to identify potential vulnerabilities and improve their security.
