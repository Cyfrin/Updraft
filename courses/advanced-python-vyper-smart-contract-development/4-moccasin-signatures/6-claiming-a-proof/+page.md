## Claiming using a Merkle Proof

Merkle Trees are a data structure which provide a mechanism to efficiently verify data, in our case, if someone is eligible to claim tokens in a given airdrop. 

We start with a Merkle Tree which is a tree structure where the leaves are data items or hashes of data items, and the nodes higher up in the tree are hashes of the nodes below them.  The root of the tree is the hash of all the data items. 

Let's say someone is claiming tokens in an airdrop, and they provide their address, the amount of tokens they are entitled to, and a Merkle Proof. The Merkle Proof is a list of hashes from the tree, which are used to prove that the leaf node containing the address and amount is indeed in the Merkle Tree.

Let's get started with creating a contract that can process a Merkle Proof and claim tokens! 

We need to define a few variables for our contract:

```javascript
# Immutables
MERKLE_ROOT: public(immutable(bytes32))
AIRDROP_TOKEN: public(immutable(address))
```

We also want to establish a max length for the Merkle Proof:

```javascript
# Constants
PROOF_MAX_LENGTH: constant(uint8) = max_value(uint8) # 255
```

Now we can write an `init` function which is used to initialize our contract:

```javascript
@deploy
def init(_merkle_root: bytes32, _airdrop_token: address):
    MERKLE_ROOT = _merkle_root
    AIRDROP_TOKEN = _airdrop_token
```

Let's create a function called `claim` which will be responsible for processing the Merkle Proof:

```javascript
@external
def claim(
    account: address,
    amount: uint256,
    merkle_proof: DynArray[bytes32, PROOF_MAX_LENGTH], # list of other hashes from the tree
    v: uint8,
    r: bytes32,
    s: bytes32
):
    """Allows users to claim the airdropped tokens."""
    assert not self.has_claimed[account], "merkle_airdrop: Account has already claimed"
    leaf: bytes32 = keccak256(abi.encode(keccak256(abi.encode(account, amount))))
    assert merkle_proof_verification.verify_proof(MERKLE_ROOT, leaf, merkle_proof), "merkle_airdrop: Invalid Proof"
    self.has_claimed[account] = True
    log.Claimed(account, amount)
    success: bool = extcall(AIRDROP_TOKEN.transfer(account, amount, v, r, s))
    assert success, "Transfer Failed"
```

We want to import the `ERC20` library from `ethereum` so that we can use it to transfer the tokens.

```javascript
from ethereum.erc2s import IERC20
```

Now, we can define our `AIRDROP_TOKEN` variable as a public immutable `IERC20`:

```javascript
AIRDROP_TOKEN: public(immutable(IERC20))
```

Let's add an event that will be emitted when an account claims their tokens:

```javascript
event Claimed(
    account: indexed(address),
    amount: indexed(uint256)
)
```

And finally, we need to make sure we wrap the `AIRDROP_TOKEN` within our `init` function:

```javascript
AIRDROP_TOKEN = IERC20(_airdrop_token)
```

Now, if we deploy this contract, people can use it to claim their tokens using a Merkle Proof. This is a powerful and secure mechanism for airdrops.

We've introduced the core concepts and functions of a contract that handles a Merkle Proof for claiming tokens. This sets the foundation for exploring more intricate scenarios and advanced concepts surrounding Merkle Trees in airdrops. 
