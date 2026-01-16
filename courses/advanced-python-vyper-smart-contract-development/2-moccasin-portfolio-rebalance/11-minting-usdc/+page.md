## Minting Fake USDC

USDC is a little more complicated than most tokens. We're going to learn how to mint fake USDC using a Python script.

USDC's contract is very centralized. Circle controls the contract and has a lot of governance utilities. We can take advantage of this centralization to "mock" ourselves some USDC using the `boa` library.

**Setting up our script**
We can use the `boa.env.prank` function to pretend to be the owner of the USDC contract.

```python
with boa.env.prank(usdc.owner()):
```

We can now call the `updateMasterMinter` function with our address. We'll also set a starting USDC balance.

```python
    with boa.env.prank(usdc.owner()):
        usdc.updateMasterMinter(boa.env.eoa)
        usdc.configureMinter(boa.env.eoa, STARTING_USDC_BALANCE)
        usdc.mint(boa.env.eoa, STARTING_USDC_BALANCE)
```

We also need to include the USDC ABI. We'll use `mox explorer` to get the USDC ABI.

```bash
mox explorer get 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --save --name usdc
```

**Let's run the script**

First, we'll need to make sure that our environment is set up to run our script. 

```bash
mox run setup_script --network eth-forked
```

We can see in the terminal that our script is running and that we have our starting USDC balance.

```bash
USDC balance before: 0
USDC balance after: 1000000000
```

We've now successfully minted ourselves some fake USDC!

**Depositing our USDC**
Next, we'll learn how to deposit our fake USDC into Aave. But, first we'll need to create a script called `deposit.py`.

```python
from boa.contracts.abi.contract import ABIContract
from typing import Tuple
from moccasin.config import get_active_network
import boa

STARTING_ETH_BALANCE = int(1000e18)
STARTING_WETH_BALANCE = int(1e18)
STARTING_USDC_BALANCE = int(100e6)

def add_eth_balance():
    boa.env.set_balance(boa.env.eoa, STARTING_ETH_BALANCE)

def add_token_balance(usdc: ABIContract, weth: ABIContract, active_network: Any):
    weth.deposit(value=STARTING_WETH_BALANCE)
    with boa.env.prank(usdc.owner()):
        usdc.updateMasterMinter(boa.env.eoa)
        usdc.configureMinter(boa.env.eoa, STARTING_USDC_BALANCE)
        usdc.mint(boa.env.eoa, STARTING_USDC_BALANCE)
    print(f"USDC balance before: {usdc.balanceOf(boa.env.eoa)}")
    print(f"USDC balance after: {usdc.balanceOf(boa.env.eoa)}")

def setup_script() -> Tuple[ABIContract, ABIContract, ABIContract, ABIContract]:
    print("Starting setup script...")
    # 1. Give ourselves some ETH
    # 2. Give ourselves some USDC and WETH
    active_network = get_active_network()
    usdc = active_network.manifest(named='usdc')
    weth = active_network.manifest(named='weth')
    if active_network.is_local or active_network.is_forked:
        add_eth_balance()
        add_token_balance(usdc, weth, active_network)

def moccasin_main():
    setup_script()

if __name__ == "__main__":
    mocassin_main()
```

Let's go ahead and run this.
```bash
mox run deposit.py --network eth-forked 
```

And, you should see in the terminal that we have a successful deposit. 

We've now learned how to mock our own USDC and deposit it into Aave. 
