## How to Deploy a Contract to the EVM

In this lesson, we'll cover how to deploy a contract to the EVM. You'll see how to create a transaction object and build a contract.

### The 'To' Field

We are going to go over why the 'To' field in our transaction object is blank. When you deploy a contract to the EVM, you make the 'To' section of your transaction object blank. 

For example, if we were to take this transaction object and update the 'To' field, we could type:
```python
transaction["to"] = 
```
This will make the transaction no longer a contract deployment. Instead, it will send random data to the wallet address provided.

For now, we will delete the 'To' field from the transaction object. We'll clear the terminal and rerun the code.

### Building a Transaction Object
```python
def main():
    favorites_contract = w3.eth.contract(bytecode=compilation_details["bytecode"],
                                     abi=compilation_details["abi"])
    # To deploy this, we must build a transaction
    print("Building the transaction...")
    transaction = favorites_contract.constructor().build_transaction()
    print(transaction)
```

### Explanation

We are building a transaction object that contains all the information we need to deploy a contract. The 'data' field inside the transaction object is where we will store the contract's bytecode. The 'To' field is left blank for deployment.

The code shown above does not include the 'To' field. If we ran it in our terminal, the object would have a blank 'To' field as it is intended for a contract deployment.

### Summary

When deploying a contract to the EVM, you need to build a transaction object with a blank 'To' field. The data field will contain the bytecode of the contract, allowing you to successfully deploy it to the EVM.
