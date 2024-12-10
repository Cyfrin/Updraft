## Fuzz Tests Setup 

Now that we have written a lot of unit tests, we are going to write some fuzz tests. 

Let's create a new folder called `fuzz`. We will create a test file called `test_fuzz.py`. 

```python
from hypothesis.stateful import RuleBasedStateMachine, initialize, rule 
from script.deploy_dsc_engine import deploy_dsc_engine
from moccasin.config import get_active_network
from eth_constants import ZERO_ADDRESS
from boa.util.abi import Address

USERS_SIZE = 10

class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.dsc = deploy_dsc()
        self.dsc = deploy_dsc_engine(self.dsc)
        self.active_network = get_active_network()
        self.weth = self.active_network.manifest(named="weth")
        self.wbtc = self.active_network.manifest(named="wbtc")
        self.eth_usd = self.active_network.manifest(named="eth_usd_price_feed")
        self.btc_usd = self.active_network.manifest(named="btc_usd_price_feed")
        self.users = [Address("0x" + ZERO_ADDRESS.hex())]
        while Address("0x" + ZERO_ADDRESS.hex()) in self.users:
            self.users = [Address("0x" + ZERO_ADDRESS.hex()) for _ in range(USERS_SIZE)]

stablecoin_fuzzer = StablecoinFuzzer.TestCase

```

We are going to import the `rule` from the `hypothesis.stateful` module. We will initialize our test suite here using the `initialize` function, and we need to import the `deploy_dsc_engine` from the `deploy_dsc_engine` module. We will set up all of our contracts.

```python
from hypothesis.stateful import RuleBasedStateMachine, initialize, rule 
from script.deploy_dsc_engine import deploy_dsc_engine
from moccasin.config import get_active_network
from eth_constants import ZERO_ADDRESS
from boa.util.abi import Address

USERS_SIZE = 10

class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.dsc = deploy_dsc()
        self.dsc = deploy_dsc_engine(self.dsc)
        self.active_network = get_active_network()
        self.weth = self.active_network.manifest(named="weth")
        self.wbtc = self.active_network.manifest(named="wbtc")
        self.eth_usd = self.active_network.manifest(named="eth_usd_price_feed")
        self.btc_usd = self.active_network.manifest(named="btc_usd_price_feed")
        self.users = [Address("0x" + ZERO_ADDRESS.hex())]
        while Address("0x" + ZERO_ADDRESS.hex()) in self.users:
            self.users = [Address("0x" + ZERO_ADDRESS.hex()) for _ in range(USERS_SIZE)]

stablecoin_fuzzer = StablecoinFuzzer.TestCase

```

We are going to create an array of users as well.  We will create an array of ten different users, and we can even print the array.

```python
from hypothesis.stateful import RuleBasedStateMachine, initialize, rule 
from script.deploy_dsc_engine import deploy_dsc_engine
from moccasin.config import get_active_network
from eth_constants import ZERO_ADDRESS
from boa.util.abi import Address

USERS_SIZE = 10

class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.dsc = deploy_dsc()
        self.dsc = deploy_dsc_engine(self.dsc)
        self.active_network = get_active_network()
        self.weth = self.active_network.manifest(named="weth")
        self.wbtc = self.active_network.manifest(named="wbtc")
        self.eth_usd = self.active_network.manifest(named="eth_usd_price_feed")
        self.btc_usd = self.active_network.manifest(named="btc_usd_price_feed")
        self.users = [Address("0x" + ZERO_ADDRESS.hex())]
        while Address("0x" + ZERO_ADDRESS.hex()) in self.users:
            self.users = [Address("0x" + ZERO_ADDRESS.hex()) for _ in range(USERS_SIZE)]

stablecoin_fuzzer = StablecoinFuzzer.TestCase

```

We will import the Boa module and  create a rule for our protocol. 

```python
from hypothesis.stateful import RuleBasedStateMachine, initialize, rule 
from script.deploy_dsc_engine import deploy_dsc_engine
from moccasin.config import get_active_network
from eth_constants import ZERO_ADDRESS
from boa.util.abi import Address

USERS_SIZE = 10

class StablecoinFuzzer(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.dsc = deploy_dsc()
        self.dsc = deploy_dsc_engine(self.dsc)
        self.active_network = get_active_network()
        self.weth = self.active_network.manifest(named="weth")
        self.wbtc = self.active_network.manifest(named="wbtc")
        self.eth_usd = self.active_network.manifest(named="eth_usd_price_feed")
        self.btc_usd = self.active_network.manifest(named="btc_usd_price_feed")
        self.users = [Address("0x" + ZERO_ADDRESS.hex())]
        while Address("0x" + ZERO_ADDRESS.hex()) in self.users:
            self.users = [Address("0x" + ZERO_ADDRESS.hex()) for _ in range(USERS_SIZE)]

stablecoin_fuzzer = StablecoinFuzzer.TestCase

@rule
def pass_me():
    pass

```

Now, we can initialize our test suite and see it print out ten different addresses. 

```bash
mox test -s -k stablecoin_fuzzer
```