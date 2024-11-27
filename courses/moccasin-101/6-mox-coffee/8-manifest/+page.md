## Manifest Named

This lesson expands on our understanding of deploying contracts to real networks. We will use a feature called "Named Contracts" from the Mocassin framework.

This feature will allow us to streamline the process of deploying our price feed contract to different networks.

In the previous lesson, we were able to deploy our price feed contract to the PyVM. However, this was not very helpful for deploying to real networks.

Let's explore the example from the Mocassin documentation:

```
[project]
src = "contracts"

[networks.mainnet-fork]
url = "https://ethereum-rpc.publicnode.com"
chain_id = 1
fork = true

# Look here! We have a named contract named "usdc"
[networks.mainnet-fork.contracts]
usdc = { address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"}

```

This code introduces a new section called "contracts" within each network. This section defines a named contract, "usdc" in this case, and provides a specific address associated with that contract on the mainnet fork.

Mocassin's named contracts allow us to define a variety of parameters. We saw the following:

* **address:** The address of the contract on the network.
* **abi:** The ABI source of the contract. This can be a JSON file, a Vyper contract file, a Vyper interface file, or a raw ABI string.
* **abi_from_explorer:** This flag is set to true if you want to get the ABI from a public source. You may need to set an `explorer_api_key` in your `mocassin.toml` file or environment variable.
* **deployment_script:** This is the path to the deployment script for the contract.
* **force_deploy:** Set this to true if you want to force deploy the contract even when a contract exists at that address.

In the previous lesson, we deployed our price feed contract to the PyVM using the `deploy_mocks.py` script.

Let's revisit this script and incorporate named contracts:

```
from src.mocks import mock_v3_aggregator_v2
from moccasin.boa_tools import VyperContract

STARTING_DECIMALS = 8
STARTING_PRICE = int(200e8)

def deploy_feed() -> VyperContract:
    return mock_v3_aggregator_v2.deploy(STARTING_DECIMALS, STARTING_PRICE)

def moccasin_main() -> VyperContract:
    return deploy_feed()
```

Now, we can update the `deploy.py` script to use named contracts:

```
from moccasin.config import get_active_network
from script.deploy_mocks import deploy_feed
from moccasin.boa_tools import VyperContract
from src import buy_me_a_coffee

def moccasin_main():
    active_network = get_active_network()
    price_feed = active_network.manifest_named("price_feed")
    print(f"On network {active_network.name}, using price feed at {price_feed.address}")
```

Let's now open our `mocassin.toml` file to configure our deployment.

First, we'll add a section for the Sepolia network:

```
[networks.sepolia]
url = "$SEPOLIA_RPC_URL"
save_to_db = false
default_account_name = "default"
explorer_uri = "https://eth-sepolia.blockscout.com/"
explorer_type = "blockscout"
```

We will create an `.env` file and set the `SEPOLIA_RPC_URL` environment variable to the Sepolia RPC URL from our Alchemy dashboard.

We'll also add the price feed address and deploy script for Sepolia:

```
[networks.sepolia.contracts.price_feed]
address = "0x6944A41769357215DE4FAC081bf1f309aDC325306"
deployer_script = "script/deploy_mocks.py"
```

We're ready to test our deployment by running the command:

```bash
mox run deploy --network sepolia
```

Mocassin will now be smart enough to know that there isn't a price feed contract on the PyVM.  Therefore, it will use the address and deploy script we defined in our `mocassin.toml` file. This will ensure our deployment is efficient across various networks. 
