## Recap

We learned a lot of things in this section.  First, we learned how to deploy a smart contract using `Titanobo Boa`, and then how to interact with existing contracts.

### Deploying with Titano Boa

We can deploy a contract with a single line of code: 

```python
favorites_contract = boa.load("favorites.vy")
```

This will compile, deploy, and send a transaction to a fake PyEVM chain, which is a local chain that `Titano Boa` spins up. We will not be using local chains after this section. 

### Interacting with Existing Contracts

To interact with an existing contract, we need the contract address and ABI.

```python
MY_CONTRACT = "0xc7fE13acC3a54d7e9e704c793E8DB9F7634f80FC59" 
# Address

# ABI

favorite_deployer = boa.load_partial("favorites.vy")
favorites_contract = favorite_deployer.at(MY_CONTRACT)
```

The `load_partial` method will return a deployer object, which has the ABI and `at` method. We pass the contract address to `at` to create a contract object.

### Working with Environment Variables

We also learned how to store environment variables in a `.env` file.

```bash
cat .env
RPC_URL=http://127.0.0.1:8545
ANVIL_KEY=0xacd974bec3917e35ba4d46f2384d7f944bac47b8ded5efcae784a07f1472f2ff
```

We used the `dotenv` library to load these variables into our script.

### Code Snippets

We also used some code snippets in the `deploy_favorites.py` file to set up the `RPC` and account.

```python
import boa 
from dotenv import load_dotenv
from boa.network import NetworkEnv, EthereumRPC
import os
from eth_account import Account

load_dotenv()
def main():
  rpc = os.getenv("RPC_URL")
  env = NetworkEnv(EthereumRPC(rpc))
  boa.set_env(env)
  anvil_key = os.getenv("ANVIL_KEY")
  my_account = Account.from_key(anvil_key)
  boa.env.add_account(my_account, force_eoa=True)
  favorites_contract = boa.load("favorites.vy")
  print("Storing a person...")
  favorites_contract.add_person("Alice", 25)
  person_data = favorites_contract.list_of_people(0)
  print(f"Person: {person_data}")
  if __name__ == "__main__":
    main()
```

### Moccasin

This is the last section of the `Titano Boa` series, in the next section we'll move on to the `Moccasin` series. 
