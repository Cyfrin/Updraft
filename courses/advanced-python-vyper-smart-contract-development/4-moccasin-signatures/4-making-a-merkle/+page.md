## Making Merkle Proofs in Solidity

We're now going to learn how to make Merkle proofs in Solidity. We'll go over a simplified example, but this concept is very powerful, and you'll see it used in many other places. 

We can do an at deploy def under init. We'll say under merkle root will be a bytes 32.

```javascript
at deploy def init:
  under_merkle_root bytes32
```

And, what we can do, is we can set this merkle root equals under merkle root and somehow, just by us adding this single bytes 32, we will somehow kind of have a full list of people who can claim the token. That that seems insane, but let's keep going for now, just assuming is the case. 

Next, we're also going to need the airdrop token, which will be an address.

```javascript
  airdrop_token public immutable address
```

So, how does this claim thing work? What does this actually look like here? Well, what the user is going to have to pass, and again if this doesn't make total sense right away, that's okay. They're going to have to pass in the account, which is going to be an address, who is going to be doing the claiming. How much they're going to be claiming for. The merkle proof, which is going to be a DynArray of bytes 32. 

```javascript
  function claim(address account, uint256 amount, bytes32[] calldata merkleProof) public
```

We can even ask cloud or something.  What is the max size of a uint8? 255. Okay, there you go. Perfect.

So, merkle proof will be a bytes 32, max size of 255. And, then finally something that is vaguely familiar, the v, the r, the bytes 32 and the s, which is a bytes 32. And, you may recognize these as the values of a signature. 

```javascript
    bytes32 v
    bytes32 r
    bytes32 s
```

So, in order for somebody to call claim here, they have to pass their address, the amount, some weird merkle proof thing that we're not really sure what this is quite yet, and then a signature for this as well. 

We're going to go to the repo, mock-signatures-cu draft, go to script, go to make merkle.py, and we're going to just copy everything. Just copy this whole thing. 

```bash
mox-signatures-cu/script/make_merkle.py
```

Yes, I know. It's a lot of code, and this is why I'm not having you do it. But, we're going to do make merkle.py and paste this in here.

I'm not going to have you write this all out, because there's a lot of code here, and there's a lot to explain. And, if you really want to get in your bones, the process of making this, you can absolutely try to do so yourself, but I'm going to walk you through this and tell you what's going on here, so that we can understand how we're going to use this merkle root to claim the tokens on this contract here.

So, we have this make merkle.py, and what this contract is going to do, is it's going to make our Merkle tree, aka, it's going to make our merkle root. And, Kira just briefly went over this, but essentially this top merkle root is going to be created by hashing everything together. So, we're going to So, we're going to hash the leaf nodes or the you know, the bottom of the tree together. And, then we're going to hash the result of those hashes together, and then we're going to finally end up with this merkle root. So, you can almost think of it as like just hashing yourself many times until you only have one hash left. 

So, for example what we're going to do is we're going to have these be our different leaves right? So, this first value here, is an address and a default amount. And, you can kind of think of this zero, this you know, this address and this default amount, as this first leaf node, that we're going to hash.

```javascript
def hash_pair(a: bytes32, b: bytes32) -> bytes32:
    """Hash two bytes32 values in order."""
    if a < b:
        return keccak256(abi.encodePacked(a, b))
    else:
        return keccak256(abi.encodePacked(b, a))
```

So, you can almost think of it is like we're going to hash this whole thing, and that's going to be this bottom one. Then, we're going to hash this whole thing, that's going to be this hash 2. Then, we're going to hash this whole thing, and it's going to be hash 3. Then, we're going to hash this whole thing, and it's going to be hash 4. And, what you can see here obviously, is it's just a list of addresses and amounts. 

```javascript
DEFAULT_AMOUNT = int(25e18) # 25 tokens
DEFAULT_INPUT = {
    "0": {
        "address": "0x537Cbf73d5E16df8517A588B914909135697c96802",
        "amount": DEFAULT_AMOUNT,
    },
    "1": {
        "address": "0xf39f90e8d8f88888f448cce727d3d92e0a4c9f66",
        "amount": DEFAULT_AMOUNT,
    },
    "2": {
        "address": "0x2ea3970e8d852d8314F82E180A4D7d35564f7d4d",
        "amount": DEFAULT_AMOUNT,
    },
    "3": {
        "address": "0xf6db6a2c1Af48C1b5292E537f7674C6a4c0091D",
        "amount": DEFAULT_AMOUNT,
    },
}
```

So, this is our list, right? And, we could put this on chain into our contract, but again, that's going to be huge waste of gas, so what do we do instead? Well, if we run this How do you run Mox? Run make merkle. 

```bash
mox make_merkle
```

We're going to get get an output that looks like Merkle tree data written to merkle.out.json. And, we're given a merkle root.

So, what this actually does, is if we run this, it's going to do Mox and main. It's going to call CLI run, and it's going to run this generate merkle tree. So, this is kind of where the secret sauce is here, and essentially what we do is we loop through all of the entries in our input data, right, which is this, again this dictionary at the top here. We get the address. We get the amount, and we basically create this leaf node by combining the two. So, we have this function called generate leaf. If we click on this, we're basically going to generate a leaf node by encoding and hashing address and amount.

```javascript
def generate_leaf(address: str, amount: str) -> bytes:
    """Generate a leaf node by encoding and hashing address and amount."""
    address_int = int(address, 16)  # Convert hex address to int
    address_bytes32 = bytes32(int(address_int, 16).to_bytes(32, "big", signed=False))  # Convert hex address to int
    data.append(address_bytes32)

    amount_int = int(amount)
    amount_bytes32 = bytes32(int(amount_int).to_bytes(32, "big", signed=False))
    data.append(amount_bytes32)

    encoded = encode(["bytes32[2]", []], [data])
    first_hash = keccak256(encoded)
    return keccak256(abi.encodePacked(first_hash))
```

So, we we convert the address to an integer. Yes, I know that's very bizarre. We convert that to a byte, and then we add it to this array. We do the same thing with the amount, and then we encode it.

So, this is almost basically taking the raw address and amount data and encoding it into two hashes here.

```javascript
def get_merkle_root(leaves: List[bytes]) -> bytes:
    """Calculate Merkle root from list of leaves."""
    if not leaves:
        return keccak256(b"")

    layer = leaves
    while len(layer) > 1:
        next_layer = []
        for i in range(0, len(layer), 2):
            if i < len(layer) - 1:
                next_layer.append(hash_pair(layer[i], layer[i + 1]))
            else:
                next_layer.append(hash_pair(layer[i], layer[i - 1]))

        layer = next_layer

    return layer[0]
```

So, we generate these leaf hashes, if you will, and we append it to this array, called leaves, like so. And, then what we do is we call this generate merkle root with all the leaves.

```javascript
def generate_merkle_tree(input_data: Dict) -> Tuple[List[Dict], bytes]:
    """Generate a Merkle tree by encoding and hashing address and amount."""
    data = []
    inputs = []
    # Handle address
    for i in range(len(input_data["values"])):
        address = input_data["values"][i]["address"]
        address_int = int(address, 16)  # Convert hex address to int
        address_bytes32 = bytes32(int(address_int, 16).to_bytes(32, "big", signed=False))  # Convert hex address to int
        data.append(address_bytes32)
        amount = input_data["values"][i]["amount"]
        amount_int = int(amount)
        amount_bytes32 = bytes32(int(amount_int).to_bytes(32, "big", signed=False))
        data.append(amount_bytes32)

        encoded = encode(["bytes32[2]", []], [data])
        leaf = keccak256(encoded)
        leaves.append(leaf)
        inputs.append({"address": address, "amount": amount})

    root = get_merkle_root(leaves)
    root_hex = "0x" + root.hex()

    output = []
    for i in range(len(leaves)):
        entry = {
            "inputs": inputs[i],
            "proof": get_proof(leaves, copy(leaves), i, 1),
            "root": root_hex,
            "leaf": "0x" + leaves[i].hex(),
        }
        output.append(entry)

    return output, root
```

And, then what we do is we call this generate merkle root with all the leaves.

```javascript
def cli_run():
    output, root = generate_merkle_tree(DEFAULT_INPUT)

    print("Merkle tree data written to merkle.out.json")

    with open("merkle.out.json", "w") as f:
        json.dump(output, f, indent=4)

    print(f"Merkle Root: {root}")
```

