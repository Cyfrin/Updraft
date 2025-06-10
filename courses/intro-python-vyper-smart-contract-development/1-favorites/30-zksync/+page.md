## Deploying ZKsync Contracts

We will be exploring deploying contracts with ZKsync to a test net.

First, we'll go to the plugin manager in Remix.

If we look up ZKsync, we'll see there's an inactive module. We can go ahead and activate that.

As of recording, the ZKsync plugin only works with Solidity. So, it doesn't work with Vyper at the moment.

We are not going to be deploying this to ZKsync through Remix.

However, when we switch over to Python, we will be deploying to ZKsync.

First, we'll install `zksync-python`:

```bash
pip install zksync-python
```

Now, we can open a Python script and import the relevant libraries:

```python
import zksync
from zksync import Account
from zksync.transaction import DeployTransaction
from zksync.signer import PrivateKeySigner
from zksync.utils import to_hex

from zksync.contracts import (
  zkSyncContract,
  zkSyncInterface
)
from zksync.provider import ZkSyncProvider
from zksync.wallet import Wallet
```

We'll then initialize an account, which we'll use to deploy the contract.

```python
PRIVATE_KEY = "0x..."
signer = PrivateKeySigner(PRIVATE_KEY)
wallet = Wallet(signer, ZkSyncProvider(url='https://zksync2-testnet.zksync.io/'))
address = wallet.get_address()
```

We'll define the address of the contract.

```python
contract_address = "0x..."
```

Now, we'll set the `bytecode` of the contract:

```python
bytecode = "0x..."
```

And, we'll specify the contract's constructor arguments.

```python
constructor_args = []
```

We'll instantiate a deploy transaction.

```python
deploy_tx = DeployTransaction(
  address=address,
  contract_address=contract_address,
  bytecode=bytecode,
  constructor_args=constructor_args
)
```

We'll then call the `sign_deploy_transaction` method to sign the deploy transaction.

```python
signed_deploy_tx = wallet.sign_deploy_transaction(deploy_tx)
```

Finally, we'll call the `send_deploy_transaction` method to send the transaction to the network.

```python
wallet.send_deploy_transaction(signed_deploy_tx)
```

Now, we can call the deployed contract's functions. We'll define the name of the function and its arguments.

```python
function_name = "add"
arguments = [10, 20]
```

Now, we can use the `zksyncInterface` class to call the `function_name` method.

```python
zkSyncInterface(wallet.get_address(), wallet.get_signer(), ZkSyncProvider(url='https://zksync2-testnet.zksync.io/'))
```

We'll then call the `call_function` method to call the contract's function.

```python
zksyncInterface.call_function(function_name, arguments)
```

We'll then call the `zksyncContract` class to call the `get_balance` method.

```python
zksyncContract(wallet.get_address(), wallet.get_signer(), ZkSyncProvider(url='https://zksync2-testnet.zksync.io/'))
```

We'll then call the `get_balance` method to get the contract's balance.

```python
zksyncContract.get_balance()
```

Now, we'll call the `get_code` method to get the contract's code.

```python
zksyncContract.get_code()
```

Finally, we'll call the `get_transactions` method to get the contract's transactions.

```python
zksyncContract.get_transactions()
```

We'll then print the results.

```python
print(zksyncContract.get_balance())
print(zksyncContract.get_code())
print(zksyncContract.get_transactions())
```

This will print the contract's balance, code, and transactions.

We've now deployed a ZKsync contract and called its functions.
