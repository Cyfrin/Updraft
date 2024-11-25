## Interacting with a Previously Deployed Contract

We've deployed a contract, but what if we want to interact with it? We'll need to use TitanoBoa to connect to the anvil chain, and then we can use its `at` function.

To start, we'll grab our contract address, and create a new Python file called `interact.py`. We'll set a variable to hold the address, and then we'll need to import TitanoBoa, and import `Account` from `eth_account`:

```python
MY_CONTRACT = "0xC77E03AcC45A467e9e704c703eED087f6347B0FC9"

```

```python
from boa.network import EthereumRPC, NetworkEnv
import boa
from eth_account import Account

```

Next, we'll connect to the anvil chain. We'll use the same code as we did to deploy the contract. This includes importing the `os` module, setting up the RPC, ENV, and adding the private key to Boa:

```python
import os
load_dotenv()

def main():
    rpc = os.getenv("RPC_URL")
    env = NetworkEnv(EthereumRPC(rpc))
    boa.set_env(env)
    anvil_key = os.getenv("ANVIL_KEY")
    my_account = Account.from_key(anvil_key)
    boa.env.add_account(my_account, force_eoa=True)

```

We can then use `boa.load_partial` to interact with our deployed contract. We'll use the address we stored in `MY_CONTRACT`, and use the `at` function from TitanoBoa to get a contract object:

```python
favorite_deployer = boa.load_partial("favorites.vy")
favorites_contract = favorite_deployer.at(MY_CONTRACT)

```

Now we can use our contract object to retrieve the current favorite number:

```python
favorite_number = favorites_contract.retrieve()
print(f"Favorite number is {favorite_number}")

```

If we want to update the favorite number, we can use the `store` function:

```python
favorites_contract.store(22)
favorite_number_updated = favorites_contract.retrieve()
print(f"Favorite number is now {favorite_number_updated}")

```

In the example above, we've changed the favorite number from 5 to 22. If we were to kill the anvil chain, and then try to run this code again, we'd receive an error. This is because anvil doesn't know about our locally running chain. We'd need to restart anvil and redeploy the contract in order to interact with it.
