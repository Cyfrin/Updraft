---
title: Merkle Tree and Proofs Scripts
---

_Follow along with the video_

---

### `MerkleAirdropTest` setup

To access our private variables in the `MerkleAirdrop` contract, we need to add some getter functions like `getMerkleRoot` and `getAirdropToken`.

We can then create a test file named `/test/MerkleAirdropTest.sol` and add some remappings in `foundry.toml`:

```toml
remappings = [
    'murky/=lib/murky/',
    '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
    'foundry-devops/=lib/foundry-devops',
    'forge-std/=lib/forge-std/src/',
]
```

Inside this test contract we will verify that an address can correctly claim some tokens.

### Scripts

In order to do so, we first need to generate the Merkle Proofs for our accounts.

In the `/script` folder, we can create the files `GenerateInput.s.sol` and `MakeMerkle.s.sol` and copy their content from the official [Github repository](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/tree/main/script). Then we can create a `target/input.json` and `target/output.json` files. The scripts will fill the content for these two files:

1. `input.json` will contain our Merkle tree structure
2. `output.json` will contain the leaves, the Merkle Proofs and the Root Hash that will be submitted to the test contract

The input file will define the Merkle tree's data structure, and includes four addresses and their respective claim amounts:

```json
{
  "types": ["address", "uint"],
  "count": 4,
  "values": {
    "0": {
      "0": "0x6CA6d1e2D5347Bfab1d91e883F1915560e09129D",
      "1": "2500000000000000000"
    },
    "1": {
      "0": "0xf39Fd6e51aad88F6F4c6aB8827279cffFb92266",
      "1": "2500000000000000000"
    },
    "2": {
      "0": "0c8Ca207e27a1a8224D1b602bf856479b03319e7",
      "1": "2500000000000000000"
    },
    "3": {
      "0": "0xf6dBa02C01AF48Cf926579F77C9f874Ca640D91D",
      "1": "2500000000000000000"
    }
  }
}
```

To produce these files, we'll use the [`murky`](https://github.com/cyfrin/murky/tree/5feccd1253d7da820f7cccccdedf64471025455d) library which we can install it with the command: 
```bash
forge install dmfxyz/murky --no-commit
```

### Merkle tree

The `GenerateInput.s.sol` file will write the claim amounts, types, and addresses inside the `input.json` file. It will loop through the addresses, concatenate strings with the addresses and amounts, and write the input file using the `writeFile` cheat code. You can generate the file by typing the command

```
forge script script/GenerateInput.s.sol:GenerateInput
```

> 🗒️ **NOTE**:br
> To avoid the following error:

```
script failed: the path script/target/input.json is not allowed to be accessed for write operations
```

we need to update the `foundry.toml` file permissions

```toml
fs_permissions = [{ access = "read-write", path = "./" }]
```

### Merkle Proof

After generating the Merkle Tree, we can run the `MakeMerkle.s.sol` script to produce the `output.json` file with the command

```
forge script script/MakeMerkle.s.sol:MakeMerkle
```

This script first reads from the input file, defines arrays for _leaves_ and _inputs_, and uses helper functions to format data into JSON. It calculates proofs and roots and generates the output file.

### Conclusion

In the `GenerateInput.s.sol` file, we generated an `input.json` file containing addresses and claim amounts for the Merkle tree. The `MakeMerkle.s.sol` file instead reads from this input, calculates the Merkle proofs and root, and outputs these details into an `output.json` file. These scripts will enable us to correctly implement tests for our `MerkleAirdrop` smart contract.
