---
title: Recap
---

## Recap

We learned a lot of useful blockchain and Python fundamentals in this section. Let's take a look at what we covered.

### Python

We learned that when we call a Python file, we're secretly setting `__name__` to `__main__`. This is a common practice in more professional Python setups.

```python
if __name__ == "__main__":
  main()
```

We learned how to compile our Vyper contract from the command line.

```bash
vyper favorites.vy
```

We can also use the Vyper package within our Python code.

```python
from vyper import compile_code
```

We learned how to create a function called `compile_code`, which opens a Vyper file, reads its contents, compiles the code, and returns both the bytecode and the ABI.

```python
def compile_code(favorites_code, output_format='["bytecode", "abi"]'):
  compilation_details = compile_code(favorites_code, output_format='["bytecode", "abi"]')
  print(compilation_details)
```

We also learned how to connect to an RPC URL.

```python
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
```

### Blockchain

We learned to use the `load_dotenv` function to load environment variables from our `.env` file.

```python
from dotenv import load_dotenv

load_dotenv()
```

We then learned to use `os.getenv` to grab our RPC URL from our `.env` file.

```python
RPC_URL = os.getenv("RPC_URL")
```

We also used `os.getenv` to grab our address from our `.env` file.

```python
MY_ADDRESS = os.getenv("MY_ADDRESS")
```

We learned how to build our transactions using the `build_transaction` function.

```python
transaction = favorites_contract.constructor().build_transaction({
  "nonce": nonce,
  "from": MY_ADDRESS,
  "gasPrice": w3.eth.gas_price
})
```

Our transaction includes a nonce, a `from` address, and a gas price. We can also customize transactions with additional parameters.

We learned to decrypt our private key using the `decrypt_key` function.

```python
def decrypt_key(KEYSTORE_PATH):
  encrypted_account = fp.read()
  password = getpass.getpass("Enter your password: ")
  key = Account.decrypt(encrypted_account, password)
  print("Decrypted key!")
  return key
```

We then used `w3.eth.account.sign_transaction` to sign our transaction using our private key.

```python
signed_transaction = w3.eth.account.sign_transaction(transaction, private_key=private_key)
print(signed_transaction)
```

We then sent the signed transaction to our blockchain node using the `send_raw_transaction` function.

```python
tx_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
print(f"My TX hash is {tx_hash}")
```

Finally, we waited for our transaction to finish and learned that our transaction hash can be used to track the transaction.

```python
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Done! Contract deployed to {tx_receipt.contractAddress}")
```

### The `uv` Tool

We learned how to use the `uv` tool to add Python packages to our `pyproject.toml` file.

```bash
uv add python-dotenv
```

We also learned how to use the `uv` tool to install Vyper into its own isolated virtual environment.

```bash
uv tool install vyper
```

We learned how to use the `uv` tool to sync all dependencies to our virtual environment.

```bash
uv sync
```

We learned how to activate our virtual environment using the `source` command.

```bash
source .venv/bin/activate
```

We also learned how to choose the Python interpreter in VS Code by clicking the button on the status bar.

Congratulations on finishing this section! You should be proud of yourself for getting this far. Now is a great time to go for a walk, grab some ice cream, maybe grab a coffee, but if it's too late, don't grab a coffee, and you should be incredibly proud of yourself for getting this far. I'll see you in the next one!
