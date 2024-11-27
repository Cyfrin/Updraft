## TitanoBoa Favorite's List

In this section, we're going to learn how to use **TitanoBoa**, a tool that streamlines the process of deploying and interacting with smart contracts. It's similar to what we did in the previous section using web3.py, but with TitanoBoa, the code becomes much more concise.

We'll start by navigating to the **`boa-favorites-cu`** repository on GitHub. This repository contains the finalized code for this project.

Here's how the code looks:

```python
from dotenv import load_dotenv
import boa
from boa.network import NetworkEnv, EthereumRPC
from eth_account import Account

load_dotenv()

ANVIL_URL = "http://127.0.0.1:8545"
# Never do this with a real key...
ANVIL_KEY = "0xac0974bec39a17e36bba46bda4d238ff944bacb478ced5efcae784d7bf4f72ff80"

def main():
    print("Let's read in the Vyper code and deploy it to the blockchain!")
    my_account = Account.from_key(ANVIL_KEY)
    env = NetworkEnv(EthereumRPC(ANVIL_URL))
    boa.set_env(env)
    boa.env.add_account(my_account, force_eoa=True)

    # Deploy the contract to a 'pyevm' network!
    favorites_contract = boa.load("favorites.vy")
    print(favorites_contract)

    print("Storing a number...")
    favorites_contract.store(5)
    print(f"Favorite Number: {favorites_contract.retrieve()}\n")

    print("Storing a person...")
    favorites_contract.add_person("Alice", 25)
    print(f"New Person: {favorites_contract.list_of_people(0)}\n")

    if __name__ == "__main__":
        main()
```

We can see that **TitanoBoa** simplifies the deployment process using just a single line of code:

```python
favorites_contract = boa.load("favorites.vy")
```

This line reads in our Vyper code and deploys the contract to our PyEVM network.

The rest of the main function in this code shows us how to interact with the contract. We can store a number, retrieve it, and add a person to the contract.

To run this code, we need to open our terminal, activate our virtual environment using these commands:

```bash
uv venv
```

```bash
uv sync
```

```bash
source .venv/bin/activate
```

Then, we can run the main Python file using this command:

```bash
python deploy_favorites.py
```

This will compile the contract, run our interactions, and print the results to the terminal.

We won't be running Anvil in this section because TitanoBoa manages the deployment process for us. However, we will show you how to run Anvil in a separate section.

Remember, AI tools like GitHub Copilot can be incredibly helpful for understanding code. If you're ever confused about a specific line of code, copy it, paste it into Copilot, and ask it to explain what it does.

This section provides a solid foundation for working with TitanoBoa, and we'll continue to build on these skills in the next sections.
