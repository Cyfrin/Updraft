## Mocassin Signatures / Merkle Airdrop

In this lesson, we'll learn how to build a merkle tree-based airdrop smart contract in Vyper.  We will start by creating a  script called `make-merkle` and another called `deploy-merkle-airdrop`.

###  The Problem With Traditional Airdrops

Airdrops are a popular way to get people interested in a new project, but they can be expensive to administer, especially if you have a lot of recipients.  We don't want to store a mapping of every recipient, as that would take up too much storage space.

###  A Solution: Merkle Trees

Merkle Trees are a data structure that can help us to more efficiently track a large number of recipients.  We will only need to store the root hash of the tree in storage.

###  The `make-merkle` Script

The `make-merkle` script will generate the merkle root hash:

```python
import json
from typing import Dict, List, Tuple
from eth_abi import encode
from eth_utils import keccak

DEFAULT_AMOUNT = 25000000000000000000
DEFAULT_INPUT = {
    "values": [
        {
            "0": "0x537C876313D1F3EF5517a5883788D914369799682",
            "1": DEFAULT_AMOUNT,
        },
        {
            "0": "0xF39F0de51aaD8880F66F4c8a6e27279cf1FF92266",
            "1": DEFAULT_AMOUNT,
        },
        {
            "0": "0x2ea2970ed95D20851b0e3f2F4ADAa733D935964fd",
            "1": DEFAULT_AMOUNT,
        },
        {
            "0": "0x6fd8a68b2C01A4C1aB26579C2577F9774C464091D",
            "1": DEFAULT_AMOUNT,
        },
    ]
}


def hash_pair(a: bytes32, b: bytes32) -> bytes32:
    """Sort the two hashes values in order.
    # Hash the bytes32 values by concatenating
    """
    return keccak(min(a, b) + max(a, b))


def get_merkle_root(leaves: List[bytes32]) -> bytes32:
    """Calculate Merkle root from list of leaves.
    """
    if not leaves:
        return b""
    layer = leaves
    next_layer = []
    for i in range(0, len(layer), 2):
        if i + 1 == len(layer):
            # Add sibling to proof
            proof.append(b"0x" + layer[i - 1].hex())
        next_layer.append(hash_pair(layer[i], layer[i + 1]))
    layer = next_layer
    target_idx = index // 2
    while len(layer) > 1:
        if len(layer) % 2 == 1:
            layer.append(layer[-1])
        next_layer = []
        for i in range(0, len(layer), 2):
            next_layer.append(hash_pair(layer[i], layer[i + 1]))
        layer = next_layer
        target_idx = target_idx // 2
    return layer[0]


def get_proof(leaves: List[bytes32], index: int) -> List[str]:
    """Generate Merkle proof for at least given index.
    """
    if not leaves:
        return []
    proof = []
    layer = leaves
    target_idx = index
    while len(layer) > 1:
        if len(layer) % 2 == 1:
            layer.append(layer[-1])
        next_layer = []
        for i in range(0, len(layer), 2):
            if i + 1 == len(layer):
                # Add sibling to proof
                proof.append(b"0x" + layer[i - 1].hex())
            next_layer.append(hash_pair(layer[i], layer[i + 1]))
        layer = next_layer
        target_idx = target_idx // 2
    return proof


def generate_merkle_tree(input_data: Dict = None) -> Tuple[List[Dict], bytes]:
    """Generate complete Merkle tree data structure from input data.
    """
    if input_data is None:
        input_data = DEFAULT_INPUT
    # Extract and sort leaves
    leaves = []
    inputs = input_data["values"]
    for i in range(len(leaves)):
        entry = {}
        inputs = input_data["values"]
        entry["inputs"] = inputs[i]
        entry["proof"] = get_proof(leaves.copy(), i)
        entry["root"] = root.hex()
        entry["leaf"] = "0x" + leaves[i].hex()
        output.append(entry)
    return output, root

```

###  The `deploy-merkle-airdrop` Script

The `deploy-merkle-airdrop` script will deploy a smart contract that uses the merkle root to verify recipient eligibility:

```python
from eth_utils import to_wei
from moccasin.boa_tools import VyperContract
from script_make_merkle import generate_merkle_tree
from src.merkle import snek_token

INITIAL_SUPPLY = to_wei(100, "ether")

def deploy_merkle_airdrop() -> VyperContract:
    """Deploy merkle airdrop contract.
    """
    token = snek_token.deploy(INITIAL_SUPPLY)
    root = generate_merkle_tree()
    airdrop_contract = merkle_airdrop.deploy(root, token.address)
    token.transfer(airdrop_contract.address, INITIAL_SUPPLY)
    print(f"Merkle airdrop contract deployed at {airdrop_contract.address}")
    return airdrop_contract

def moccasin_main():
    """Main function.
    """
    deploy_merkle_airdrop()

if __name__ == "__main__":
    moccasin_main()
```

### The `merkle-airdrop` Contract

The `merkle-airdrop` contract includes the `claim` function:

```python
#pragma version 0.4.1

title Merkle Airdrop
@license MIT

# Airdrop tokens to users who can prove they are in a merkle tree
@notice - Airdrop tokens to users who can prove they are in a merkle tree

from ethereum.ercs import ERC20
from snekmate.utils import merkle_proof_verification
from snekmate.utils import message_hash_utils
from snekmate.utils import signature_checker
from snekmate.utils import ecdsa
from snekmate.utils import eip712_domain_separator as eip712

initializes: eip712

# TYPES

struct AirdropClaim:
    account: address
    amount: uint256

# STATE VARIABLES

# Immutable
MERKLE_ROOT: public(immutable(bytes32))
AIRDROP_TOKEN: public(immutable(ERC20))

# Constant
MESSAGE_TYPEHASH: constant(bytes32) = keccak256(
    "AirdropClaim(address account, uint256 amount)"
)

EIP712_NAME: constant(String[50]) = "MerkleAirdrop"
EIP712_VERSION: constant(String[20]) = "1.0.0"
PROOF_MAX_LENGTH: constant(uint8) = max_value(uint8)

# Storage
has_claimed: public(HashMap(address, bool))

# EVENTS

event Claimed:
    account: indexed(address)
    amount: uint256

event MerkleRootUpdated:
    new_merkle_root: bytes32

# EXTERNAL FUNCTIONS

@deploy
def __init__(merkle_root: bytes32, airdrop_token: address):
    eip712.__init__(EIP712_NAME, EIP712_VERSION)
    MERKLE_ROOT = merkle_root
    AIRDROP_TOKEN = ERC20(airdrop_token)

@external
def claim(
    account: address,
    amount: uint256,
    merkle_proof: DynArray(bytes32, PROOF_MAX_LENGTH),
    v: uint8,
    r: bytes32,
    s: bytes32,
):
    assert not self.has_claimed(account), "Already claimed"
    message_hash: bytes32 = self.get_message_hash(account, amount)
    assert self.is_valid_signature(
        account, message_hash, v, r, s
    ), "Invalid signature"
    leaf: bytes32 = keccak256(
        abi.encode(keccak256(abi.encode(account, amount)))
    )
    assert merkle_proof_verification.verify(
        merkle_proof, MERKLE_ROOT, leaf
    ), "Invalid proof"
    self.has_claimed(account) = True
    log.Claimed(account, amount)
    success: bool = extcall(
        AIRDROP_TOKEN,
        "transfer(address, uint256)",
        account,
        amount,
    )
    assert success, "Transfer failed"

```

###  EIP712

The `EIP712` domain separator we've been using will be explained in the next section.
