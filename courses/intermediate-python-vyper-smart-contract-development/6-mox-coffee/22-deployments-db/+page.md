## Deployments Database

We are working with a Python project that interacts with smart contracts, including a `buy_me_a_coffee` contract.

We've set up a few test files, and if we run them, we can see that they all pass.

```bash
mox test
```

We can also see that we have a `mocassin.toml` file with the following code:

```python
[networks.tenderly-sepolia]
url = "$TENDERLY_RPC_URL"
save_to_db = false
default_account_name = "default"
```

This file is key to working with a database. The important feature to note here is the `save_to_db` option. We want to set this to `true`, which means Mocassin will save information about deployments to a database. 

Let's add a new network to the `mocassin.toml` file for interacting with the Anvil blockchain.

```python
[networks.anvil]
url = "http://127.0.0.1:8545"
default_account_name = "anvil1"
save_to_db = true
```

We also want to create a file to write our withdrawal function:

```python
from src import buy_me_a_coffee
from moccasin.config import get_active_network

def withdraw():
    active_network = get_active_network()
    coffee = active_network.manifest_named("buy_me_a_coffee")
    print(f"On network {active_network.name}, withdrawing from {coffee.address}")
    coffee.withdraw()

def moccasin_main():
    return withdraw()
```

If we run this, the function will use the `get_active_network` to get the latest deployment, and it'll print the network and address of the contract we're withdrawing from. We can also add more details to this script using the `get_latest_contract_checked` option.

```python
from src import buy_me_a_coffee
from moccasin.config import get_active_network

def withdraw():
    active_network = get_active_network()
    coffee = active_network.manifest_named("buy_me_a_coffee")
    coffee = active_network.get_latest_contract_unchecked("buy_me_a_coffee")
    print(f"On network {active_network.name}, withdrawing from {coffee.address}")
    coffee.withdraw()

def moccasin_main():
    return withdraw()
```

This allows us to specifically target a contract based on a name that we've given it.

We can also see that this is creating a database file called `deployments.db`. 

Let's go back to the terminal and run the Anvil blockchain locally:

```bash
anvil
```

Now we can deploy to the Anvil chain.

```bash
mox run deploy --network anvil
```

If we open our `deployments.db` file, we can see that the database is storing information about our deployments.  The database will store many different pieces of information such as:
- session ID
- contract address
- contract name
- RPC deployer 
- TX hash 
- TX broadcast
- receipt dict
- source code 
- ABI

If we scroll over the database, we can see the contract address that was just deployed for the contract named "buy_me_a_coffee".

Now that we have this, let's go back to our `withdraw.py` file and create a new function where we interact specifically with that address.

```python
from src import buy_me_a_coffee
from moccasin.config import get_active_network

def withdraw():
    active_network = get_active_network()
    coffee = active_network.manifest_named("buy_me_a_coffee")
    coffee = active_network.get_latest_contract_unchecked("buy_me_a_coffee")
    print(f"On network {active_network.name}, withdrawing from {coffee.address}")
    coffee.withdraw()

def moccasin_main():
    return withdraw()
```

It's best practice to use the `manifest_named` function when dealing with smart contracts because it ensures you are working with the specific contract you intended. 

Let's clear the terminal and run the `withdraw.py` file.

```bash
mox run withdraw --network anvil
```

We can now see the transaction being broadcasted and the withdrawal function being executed. This is how we can have even more powerful scripting and keep track of our deployments. Mocassin keeps track of all of that for us, which is incredibly exciting. 
