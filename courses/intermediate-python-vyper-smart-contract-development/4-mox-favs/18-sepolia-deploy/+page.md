## Deploying to the Sepolia Test Network

We are going to be deploying a contract to the Sepolia test network. This is an optional step as testnet tokens can be hard to get.

Here's the code for the deploy script:
```python
from src import favorites
from moccasin.boa_tools import VyperContract

def deploy_favorites() -> VyperContract:
    favorites_contract: VyperContract = favorites.deploy()
    starting_number: int = favorites_contract.retrieve()
    print(f"Starting number is: {starting_number}")

    favorites_contract.store(77)
    ending_number: int = favorites_contract.retrieve()
    print(f"Ending number is: {ending_number}")
    return favorites_contract

def moccasin_main() -> VyperContract:
    return deploy_favorites()
```

For the Sepolia network, we need to update the configuration. Here's the modified code:
```python
[project]
src = "src"

[networks.anvil]
url = "http://127.0.0.1:8545"
save_to_db = false
prompt_live = false
default_account_name = "anvil"
unsafe_password_file = "~/.mocassin/unsafe-passwords/anvil"

[networks.sepolia]
url = "https://eth-sepolia.g.alchemy.com/v2/...."
save_to_db = false
default_account_name = "default"
explorer_uri = "https://eth-sepolia.blockscout.com/"
explorer_type = "blockscout"
```

We are using Alchemy to get an RPC URL.

```bash
mox wallet import default
```

We will save the private key to keystores. It's important to never store private keys in your dot env file.

In our deploy script, we will add a few lines of code to verify our smart contract:
```python
from moccasin.config import get_active_network

def deploy_favorites() -> VyperContract:
    favorites_contract: VyperContract = favorites.deploy()
    starting_number: int = favorites_contract.retrieve()
    print(f"Starting number is: {starting_number}")

    favorites_contract.store(77)
    ending_number: int = favorites_contract.retrieve()
    print(f"Ending number is: {ending_number}")

    active_network = get_active_network()
    if active_network.has_explorer():
        result = active_network.mocassin_verify(favorites_contract)
        result.wait_for_verification()

    return favorites_contract
```

We can then run the deploy script to verify our smart contract. 

```bash
mox run deploy --network sepolia
```

This will deploy and verify our smart contract, providing a link to the verified contract. 
