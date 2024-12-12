## TitanoBoa with Anvil

In this lesson, we are going to learn how to connect to a real network using TitanoBoa. We're going to use Anvil as our local blockchain to interact with.

First, we will create a file called `deploy_favorites.py`. This file will contain our code to connect to a real network using TitanoBoa.

```python
if __name__ == "__main__":
    main()
def main():
    print("Hi from deploy favorites")
```

We will also create a new file called `.env` in the same directory as our `deploy_favorites.py` file. This file will store our RPC URL and our Anvil key.

```bash
touch .env
```

We need to install `python-dotenv` to automatically pull in our `.env` file.

```bash
pip install python-dotenv
```

Let's copy the `python-dotenv` package into our .env file.

```python
from dotenv import load_dotenv
```

We will also need to import TitanoBoa, along with the `NetworkEnv` and `EthereumRPC` objects.

```python
import boa
from boa.network import NetworkEnv, EthereumRPC
```

Next, let's add our RPC URL to our `.env` file.

```bash
RPC_URL="http://127.0.0.1:8545"
```

We'll then need to import the `os` library.

```python
import os
```

Now, let's pull in our .env file into our Python script.

```python
load_dotenv()
```

Now, in our main function, we need to set up our environment. We do this by creating a new `NetworkEnv` object and using the `EthereumRPC` object to wrap our RPC URL.

```python
def main():
    rpc = os.getenv("RPC_URL")
    env = NetworkEnv(EthereumRPC(rpc))
```

Next, we'll set up our environment.

```python
boa.set_env(env)
```

We'll then need to create a new account, and we'll store it in a variable named `my_account`. 

```python
from eth_account import Account
my_account = Account.from_key()
```

We will need to obtain our Anvil key from the terminal, and we'll copy it into the `.env` file.

```bash
ANVIL_KEY=
```

Once we have our Anvil key, we'll add it to our Python script.

```python
anvil_key = os.getenv("ANVIL_KEY")
```

We can now use our Anvil key to create our account.

```python
my_account = Account.from_key(anvil_key)
```

Now, we need to tell TitanoBoa to use our account. We do this by using the `boa.env.add_account` function. 

```python
boa.env.add_account(my_account, force_eoa=True)
```

Now that we have our environment and our account set up, we can deploy our contract. Let's copy our code from the previous lesson and add it to our `deploy_favorites.py` file.

```python
favorites_contract = boa.load("favorites.vy")
```

We can now run our script to deploy our contract. 

```bash
python deploy_favorites.py
```

TitanoBoa will automatically use our account to deploy our contract to the Anvil network.

If we go to Anvil, we should see that our contract has been deployed.

```bash
Contract deployed at
```

Our contract will be able to interact with the Anvil network. If you'd like to do some additional interactions with this contract, you can modify the code in the `deploy_favorites.py` file.

This is a basic introduction to connecting to a real network with TitanoBoa. In future lessons, we'll explore additional concepts and how we can improve our code.