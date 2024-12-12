## Deploying a Merkle Airdrop Contract

We've built our Merkle airdrop contract, and now we're going to deploy it to a test network so we can interact with it and experiment with the functionality.  

We will be writing some deployment scripts and tests to ensure that the deployment process works as expected.

### Deploying the Merkle Airdrop Contract

Let's create a new file called `deploy_merkle.py`.

```python
from src import snek_token
from eth_utils import to_wei
from script.make_merkle import generate_merkle_tree

INITIAL_SUPPLY = to_wei(100, "ether")

def deploy_merkle():
    token = snek_token.deploy(INITIAL_SUPPLY)
    _root = generate_merkle_tree()
    airdrop_contract = merkle_airdrop.deploy(root, token.address)
    token.transfer(airdrop_contract.address, INITIAL_SUPPLY)
    print(f"Deployed airdrop contract at {airdrop_contract.address}")
    return airdrop_contract


def moccasin_main():
    return deploy_merkle()
```

This script will first deploy the token contract with an initial supply of 100 Ether. Then, it will generate the Merkle tree and deploy the Merkle airdrop contract, providing the root of the tree and the token contract address to the deployment function. Lastly, the script will transfer the initial token supply to the airdrop contract's address.

### Testing the Deployment

We can now test the deployment script by running the following command in our terminal:

```bash
mox run deploy_merkle
```

This will execute the `deploy_merkle` function and display the address of the deployed airdrop contract. 

This testing process allows us to ensure the functionality of the deployment script and verify that all the necessary steps are completed correctly.
