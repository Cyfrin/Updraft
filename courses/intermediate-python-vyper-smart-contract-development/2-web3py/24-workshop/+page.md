## Deploying Smart Contracts to Testnets

In this lesson, we will cover how to deploy a smart contract to a testnet. We will deploy our `favorites.vy` contract to Anvil locally, and Tenderly. 

Before we begin, make sure you have the following setup:

* Anvil RPC URL
* Your private key
* Tenderly account

We will first deploy to Anvil. We have already covered how to compile our `favorites.vy` contract, so we will use that compiled bytecode for this deployment.

```python
from vyper import compile_code
from web3 import Web3
from dotenv import load_dotenv
import os
from getpass import getpass
from eth_account import Account

load_dotenv()

RPC_URL = os.getenv("RPC_URL")
MY_ADDRESS = os.getenv("MY_ADDRESS")

def main():
    print("Let's read in the Vyper code and deploy it!")
    with open("favorites.vy", "r") as favorites_file:
        favorites_code = favorites_file.read()
    compilation_details = compile_code(favorites_code, output_formats=["bytecode", "abi"])
    print(compilation_details)

    w3 = Web3(Web3.HTTPProvider("https://127.0.0.1:8545"))
    favorites_contract = w3.eth.contract(bytecode=compilation_details["bytecode"], abi=compilation_details["abi"])
    print("Building the transaction...")

    nonce = w3.eth.get_transaction_count(MY_ADDRESS)
    transaction = favorites_contract.constructor().build_transaction(
        {
            "nonce": nonce,
            "from": MY_ADDRESS,
            "gasPrice": w3.eth.gas_price
        }
    )
    print(transaction)

    private_key = decrypt_key()
    signed_transaction = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    print(signed_transaction)

    tx_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    print(f"My TX Hash is {tx_hash.hex()}")

    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"My TX Hash is {tx_receipt.transactionHash.hex()}")
    print(f"Done! Contract deployed to {tx_receipt.contractAddress}")

def decrypt_key() -> str:
    with open(KEYSTORE_PATH, "r") as fp:
        encrypted_account = fp.read()
    password = getpass("Enter your password: ")
    key = Account.decrypt(encrypted_account, password)
    print(f"Decrypted key! {key}")
    return key

if __name__ == "__main__":
    main()
```
We can run this code to deploy the `favorites.vy` contract to our locally running Anvil instance.

Now, we will deploy to Tenderly. 

To deploy to Tenderly, we will need to copy the RPC URL from the Tenderly dashboard and update the `w3` variable in the code.

```python
w3 = Web3(Web3.HTTPProvider("https://your-tenderly-rpc-url"))
```

The next step in our workshop is to figure out how to deploy our `favorites.vy` contract to Anvil locally, using a different wallet address and a new encrypted key.

We can modify the code to connect to our local Anvil RPC URL. We can then modify the `from` address in the `transaction` object to a different wallet address. Finally, we need to create a new encrypted key and decrypt it before signing and sending the transaction. 

This will give us some additional practice with these concepts and is a good example of how to deploy a smart contract to a testnet. 
