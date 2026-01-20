## Blob Transactions: An Introduction

In this lesson, we'll explore the concept of blob transactions on the Ethereum blockchain. Blob transactions are a new type of transaction that allows us to store data on chain for a short period of time. This is an essential step in the process of scaling Ethereum using rollups.

Let's dive into the details.

### What is a Blob Transaction?

We'll start by comparing blob transactions to normal transactions. In a normal transaction, all of your transaction data is stored on chain forever. Blob transactions provide us with an alternative method of storing data on chain, that data is stored as a blob.

Blob transactions are known as type 03 transactions, whereas normal transactions are known as type 02 transactions. The difference between the two is that blob transactions allow us to store data in a "box" that will be eventually deleted. Once the blob transaction is included in a block, the data will be stored as usual, but will be deleted after a short delay of 20-90 days.

### Why do we use Blob Transactions?

Blob transactions were introduced in the Ethereum Dencun upgrade on March 13th, 2024. The reason we have blob transactions is that rollups love them! Blob transactions help rollups solve the "blockchain trilemma" problem.

Rollups help scale Ethereum by executing a bunch of transactions on their own chain. They then bundle up these transactions into a batch and submit it back to Ethereum. This process can provide us with substantially cheaper transactions than sending them on the Ethereum main chain.

### How do Rollups Use Blob Transactions?

But, before the Dencun upgrade, this compressed batch of transactions needed to be stored permanently on every Ethereum node in the world. 

This process is problematic because we only need this data for a short period of time, and every single node has to hold it for the entire time. 

Blob transactions eliminate this problem by allowing rollups to submit their compressed transactions as a blob, which doesn�t get stored permanently on every node on chain, but instead a hash of the blob is stored.

This was achieved by introducing a new opcode, `BLOBHASH`, to help Ethereum verify the compressed transaction batches. This new opcode works with a new precompile called `POINT_EVALUATION_PRECOMPILE`, and it�s through these two new tools that Ethereum is able to validate the data. 

### Example of a Blob Transaction

To illustrate the concept further, let's take a look at a blob transaction on Etherscan:

We can see that a transaction was sent by zkSync Era, and that the transaction was a �Commit EIP-4844 Blob�. By clicking on the �Blobs� section, we can then see the data itself, which is represented as a large sequence of binary numbers. 

Next, on Etherscan, we can see the �Blob As Calldata Gas� metric. This metric shows us how much more expensive it would have been if this data was sent as calldata, which is how data was previously sent to Ethereum.  

It is significantly cheaper to send this data as a blob because the data is not being stored permanently on chain.

### Blob Transactions in Practice

We will now try to create and send our own blob transaction. We will start by setting up a connection to the blockchain per usual.

```python
from eth_abi import abi_encode
from web3 import Web3, HTTPProvider

w3 = Web3(HTTPProvider('rpc_url'))
```

Now, we will encode our blob data.

```python
text = '("<.o.o>")'
encoded_text = abi_encode(['string'], [text])
```

The important thing to keep in mind is that blobs must be at least 4096 words long.  A word is 32 bytes, so we will append a series of zeros to our text to meet the minimum requirement.

```python
BLOB_DATA = (b'\x00' * 32 * (4096 - len(encoded_text) // 32) + encoded_text)
```

Next, we need to create our transaction object. Here, we will change the type to a type 03 transaction.

```python
tx = {
'type': 3,
'chainId': 31337,
'from': acct.address,
'to': '0x0000000000000000000000000000000000000000',
'value': 0,
'maxFeePerGas': '10**12',
'maxPriorityFeePerGas': '10**12',
'maxFeePerBlobGas': '10**12',
'nonce': w3.eth.get_transaction_count(acct.address),
}
```

Then, we need to estimate the gas cost.

```python
gas_estimate = w3.eth.estimate_gas(tx)
tx['gas'] = gas_estimate
```

After we have our transaction object created, we sign it and then add our blob data.

```python
signed = acct.sign_transaction(tx, blobs=[BLOB_DATA])
```

Finally, we send our transaction.

```bash
rye run send-blob
```

We can then see our transaction receipt, and the blob data we sent to the blockchain.

### Conclusion

Blob transactions are a key component of Ethereum's scalability roadmap.  They allow rollups to send data more cheaply, and hence achieve cheaper transactions for end users. 

Let us know what you think of blob transactions in the comments below. Thanks for getting froggy with us! 
