Merkle Proofs are a way to prove that you are part of a Merkle Tree without having to share the entire tree. They are often used in airdrops and other blockchain applications.

We will use the following code in our lesson:

```python
from typing import Dict, List, Tuple
from eth_abi import encode_abi
from eth_utils import keccak

DEFAULT_AMOUNT = int(25e18) # 25 # tokens
DEFAULT_INPUT = {
    "values": {
        "0": {
            "0": "0x537C8f3d3E18dEF5517a58B3f8D9143697996682",
            "1": DEFAULT_AMOUNT,
        },
        "1": {
            "0": "0xf39fDg6e51aad88fF4ce6a6B8827279cfff92266",
            "1": DEFAULT_AMOUNT,
        },
        "2": {
            "0": "0x2ea397BE8d2d5d30bE21b0F4ADa731D35964F7dd",
            "1": DEFAULT_AMOUNT,
        },
        "3": {
            "0": "0xf6d6ba2c01a48C14f9c2657b977f8f7f4c640091D",
            "1": DEFAULT_AMOUNT,
        },
    }
}

def generate_merkle_tree(input_data: Dict = None) -> Tuple[List[Dict], bytes]:
    """Generate complete Merkle tree data structure from input data."""
    if input_data is None:
        input_data = DEFAULT_INPUT

    # Extract and sort leaves
    leaves = []
    inputs = []
    for i in range(len(input_data["values"])):
        address = input_data["values"][str(i)]["0"]
        amount = input_data["values"][str(i)]["1"]
        leaf = generate_leaf(address, amount)
        leaves.append(leaf)
        inputs.append((address, amount))

    # Calculate root
    root = get_merkle_root(leaves)
    root_hex = "0x" + root.hex()

    # Generate output for each leaf
    output = []
    for i in range(len(leaves)):
        entry = {
            "inputs": inputs[i],
            "proof": get_proof(leaves.copy(), i),
            "root": root_hex,
            "leaf": "0x" + leaves[i].hex(),
        }
        output.append(entry)

    return output, root

def get_merkle_root(leaves: List[bytes]) -> bytes:
    """Calculate Merkle root."""
    next_layer = []
    for i in range(0, len(leaves), 2):
        next_layer.append(hash_pair(leaves[i], leaves[i + 1]))
    layer = next_layer
    while len(layer) > 1:
        next_layer = []
        for i in range(0, len(layer), 2):
            next_layer.append(hash_pair(layer[i], layer[i + 1]))
        layer = next_layer
    return layer[0]

def get_proof(leaves: List[bytes], index: int) -> List[str]:
    """Generate Merkle proof for leaf at given index."""
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
            if i == target_idx - target_idx % 2:
                # Add sibling to proof
                proof.append("0x" + layer[i + 1 - (target_idx % 2)].hex())
            next_layer.append(hash_pair(layer[i], layer[i + 1]))
        layer = next_layer
        target_idx = target_idx // 2
    return proof

def hash_pair(left: bytes, right: bytes) -> bytes:
    """Hash a pair of values."""
    return keccak(encode_abi(["bytes", "bytes"], [left, right]))

output, root = generate_merkle_tree()
print(output)
print(root)
```

We can run the following code to generate a Merkle Tree and its associated Merkle Proofs:

```bash
mox-signatures-cu %  mox run make_merkle
```

This will output the Merkle Tree data to a JSON file called `merkle_output.json`.
