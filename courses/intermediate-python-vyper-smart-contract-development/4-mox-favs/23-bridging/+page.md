## Bridging to ZKsync

In this lesson, we are going to learn how to bridge funds from the Sepolia Testnet to the ZKsync Sepolia Testnet.

First, we need to connect our wallet. We will connect via Metamask.

Then, in Metamask, go to "Edit Networks" and ensure the following are selected:

- ZKsync Sepolia Testnet
- Sepolia

Then, hit the "Update" button, and then "Connect".

Now, we will see an error message. This is due to the fact that we are on the wrong chain in our wallet. If we open the "Menu" tab, we will see an option to change the network.

We will select "ZKsync Sepolia Testnet" from the menu.

Our interface now looks like a standard bridging app, and we will type in the amount we want to bridge.

Then, we will hit "Continue", and we are asked to confirm our transaction. After confirming, we will have to wait approximately 15 minutes for our funds to appear on the ZKsync network.

Let's look at our configuration file and see what we've added:

```toml
[networks.sepolia-ZKsync]
url = "$ZKSYNC_SEPOLIA_RPC_URL"
chain_id = 300
save_to_db = false
default_account_name = "default"
explorer_uri = "https://explorer.sepolia.era.ZKsync.dev"
explorer_type = "zkSyncExplorer"
is_zkSync = true
```

We've also added the explorer type, which is "zkSyncExplorer".

Next, we'll go to our deploy script, and make sure the following are correct:

```python
from src import favorites
from moccasin.boa.tools import VyperContract
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
        result = active_network.mocassin.verify(favorites_contract)
        result.wait_for_verification()
    return favorites_contract

def moccasin_main() -> VyperContract:
    return deploy_favorites()
```

Now, we are going to deploy our smart contract to the ZKsync Sepolia Testnet. We will run the following in the terminal:

```bash
python deploy.py
```

This will deploy our contract, and then verify it on the ZKsync Sepolia Testnet.

We will then see a new transaction in our Metamask wallet, and our funds will be available to us on ZKsync!
