## Forked Network Setup

We'll start by creating a new network called `networks.eth-forked`.  This will be a forked network of Ethereum Mainnet, meaning that it will be a copy of the Ethereum Mainnet blockchain but will allow us to make changes to it.

```toml
[networks.eth-forked]
forked = true
url = "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```

We can access this network by setting up a `.env` file in the root directory of the project.

```bash
touch .env
```

Then, we'll add the following line to the file:

```
MAINNET_RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/your-api-key"
```

We'll also need to make sure that the `.env` file is added to our `.gitignore` file.

```bash
cat .gitignore
```

We'll use a tool called `boa` to interact with the blockchain.

```python
from boa.contracts.abi.contract import ABIContract
from typing import Tuple

def setup_script() -> Tuple[ABIContract, ABIContract, ABIContract, ABIContract]:
    print("Starting setup script...")
    # 1. Give ourselves some ETH
    # 2. Give ourselves some USDC and WETH
    active_network = get_active_network()
    usdc = active_network.manifest_named("usdc")
    weth = active_network.manifest_named("weth")
    
    if active_network.is_local_or_forked_network():
        _add_eth_balance()
        _add_token_balance(usdc, weth, active_network)

def _add_eth_balance():
    boa.env.set_balance(boa.env.eoa, STARTING_ETH_BALANCE)

def _add_token_balance(usdc: ABIContract, weth: ABIContract, active_network: Network):
    my_address = boa.env.eoa
    with boa.env.pranked(my_address):
        usdc.configureMasterMinter(my_address)
        usdc.updateDelegateminter(my_address, STARTING_USDC_BALANCE)
        usdc.mint(my_address, STARTING_USDC_BALANCE)
        weth.deposit(value=STARTING_WETH_BALANCE)
```

We need to import the `boa` library to work with the blockchain.

```python
import boa
```

We also need to import the `get_active_network` function from the `mocassin.config` module. This function will tell us what network we're currently connected to.

```python
from mocassin.config import get_active_network
```

We will create two functions: `_add_eth_balance` and `_add_token_balance`.  The `_add_eth_balance` function will add a starting ETH balance of 1,000 ETH to our account.

```python
STARTING_ETH_BALANCE = int(1000e18)
```

The `_add_token_balance` function will mint fake USDC and WETH tokens to our account. We will need to pass the USDC and WETH contracts and the active network as arguments to the function. We will use the `manifest_named` function to get the addresses of the USDC and WETH contracts.

```python
def _add_token_balance(usdc: ABIContract, weth: ABIContract, active_network: Network):
```

We'll use the `set_balance` function to add the ETH balance.

```python
boa.env.set_balance(boa.env.eoa, STARTING_ETH_BALANCE)
```

We'll use the `configureMasterMinter` and `updateDelegateminter` functions to give our account the ability to mint USDC.

```python
usdc.configureMasterMinter(my_address)
usdc.updateDelegateminter(my_address, STARTING_USDC_BALANCE)
```

Then, we'll use the `mint` function to mint USDC to our account.

```python
usdc.mint(my_address, STARTING_USDC_BALANCE)
```

We'll use the `deposit` function to mint WETH to our account.

```python
weth.deposit(value=STARTING_WETH_BALANCE)
```

We can test the script by running the following command in the terminal:

```bash
python setup_script.py
```

This will print the following output to the console:

```
Starting setup script...
```

This means that the script has successfully run and we've added fake ETH, USDC, and WETH tokens to our account. We can now use these tokens to test our other scripts.
