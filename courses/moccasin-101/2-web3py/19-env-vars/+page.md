## Loading Environment Variables

Let's learn about loading environment variables in a Python project.

We'll use a file called `.env` to store sensitive information like our private key and address for the project.

**1. Create a `.env` file**

Create a `.env` file in your project directory, and we'll add our sensitive data here.

```
MY_ADDRESS="0xf39f0d6e51aad88f6f4c6eba88827279cfffb92266"
PRIVATE_KEY="0xac0974bec39a17e36ba4a6bd4d238ff1944bacb478cbded5efcae784d7f4f2ff80"
RPC_URL="http://127.0.0.1:8545"
```

**2. Install the `python-dotenv` package**

We can use the `python-dotenv` package to load our environment variables. We'll use the terminal to install this package.

```bash
uv add python-dotenv
```

**3. Import the necessary libraries and functions**

We'll import the `load_dotenv` function from `python-dotenv`, and the `os` module.

```python
from dotenv import load_dotenv
import os
```

**4. Load the environment variables**

We can load the environment variables using the `load_dotenv` function.

```python
load_dotenv()
```

**5. Access environment variables**

Once the environment variables are loaded, we can access them using the `os.getenv()` function.

```python
RPC_URL = os.getenv("RPC_URL")
MY_ADDRESS = os.getenv("MY_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
```

**6. Add the `.env` file to your `.gitignore` file**

It's very important to include the `.env` file in your `.gitignore` file. This will ensure that the file is not committed to your version control system, preventing accidental exposure of your sensitive information.

**7. Rename your project file**

Rename your project file to reflect that you're working with sensitive information, we'll add _unsafe_ to our file name. 

```python
# original file
deploy_favorites.py
# new file
deploy_favorites_unsafe.py
```

**8. Never use a private key associated with real funds in a `.env` file**

Using a private key associated with real funds in a `.env` file is a major security risk and should never be done! Instead, use a separate file or configuration that is not part of your project's source control.

 **9. What to do instead of `.env`**

Instead of using a `.env` file, a better approach is to utilize a separate configuration file or a dedicated environment variable management system that is designed for security. This is especially crucial when handling sensitive data like private keys.

**10. Example Code**

```python
from web3 import Web3
from vyper import compile_code
from dotenv import load_dotenv
import os

load_dotenv()

RPC_URL = os.getenv("RPC_URL")
MY_ADDRESS = os.getenv("MY_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

def main():
    print("Let's read in the Vyper code and deploy it!")
    with open("favorites.vy", "r") as favorites_file:
        favorites_code = favorites_file.read()
    compilation_details = compile_code(favorites_code, output_formats=["bytecode", "abi"])
    print(compilation_details)

    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    favorites_contract = w3.eth.contract(bytecode=compilation_details["bytecode"], abi=compilation_details["abi"])

    # To deploy, we must build a transaction
    print("Building the transaction...")
    nonce = w3.eth.get_transaction_count(MY_ADDRESS)
    transaction = favorites_contract.constructor().build_transaction({
        "nonce": nonce,
        "from": MY_ADDRESS,
        "gasPrice": w3.eth.gas_price
    })
    
    signed_transaction = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)

    # We use the Web3 sendRawTransaction function to send the signed transaction to the blockchain
    w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

    print("Deployed! Transaction Hash:", signed_transaction.hash)
```
