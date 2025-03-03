---
title: Base Airdrop Contract
---

_Follow along with the video_

---

### Introduction

In this lesson, we are going to implement Merkle proofs and Merkle trees in our `MerkleAirdrop.sol` contract by setting up the _constructor_ and creating a _claim_ function.

### Constructor

The constructor should take an ERC-20 token and a Merkle root as parameters, to store them for later use:

```solidity
constructor(bytes32 merkleRoot, IERC20 airdropToken) {
    i_merkleRoot = merkleRoot;
    i_airdropToken = airdropToken;
}
```

A Merkle tree can be represented as the following data structure, made of address and amount pairs. These values are used to calculate the leaf hash and, along with the provided proofs, to compute a root hash. This computed root hash is then compared to the expected root hash provided in the constructor of the `MerkleAirdrop` contract.

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

### `claim` Function

To allow users on the allowed list to claim tokens, we can create a `claim` function which will take the claimer address, the claim amount, and an array of Merkle proofs. This function will double encode the data we want to check into the `leaf` variable.

To verify the proof, we utilize OpenZeppelin's `MerkleProof::verify` function, which processes the proof, the merkle root and the encoded data. If the function will not succeed, we will revert with the `MerkleAirdrop__InvalidProof` custom error.

```solidity
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
    if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
        revert MerkleAirdrop__InvalidProof();
    }
}
```

### Event and `safeTransfer`

After successful verification and prior to transferring tokens, it is recommended to emit an event:

```solidity
event Claim(address indexed account, uint256 indexed amount);
i_airdropToken.transfer(account, amount);
```

We can then use `safeTransfer` from the `SafeERC20` library to handle token transfers securely. Therefore, we need to change the import as well as the function call and we need to use `using SafeERC20 for IERC20;` as follows:

```solidity
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
...

contract MerkleAirdrop {
    using SafeERC20 for IERC20;
    ...

    function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
      ...
      i_airdropToken.safeTransfer(account, amount);
    }
}
```

> 👮‍♂️ **BEST PRACTICE**:br
> Using `safeTransfer` instead of `transfer` in ERC-20 token contracts provides an added level of security when performing token transfers. This library includes built-in checks to **automatically revert** the transaction if the transfer fails for any reason. If `transfer` fails, on the other hand, it can go unnoticed and create inconsistencies in the contract logic.

### Conclusion

This code effectively initializes the airdrop contract with the required ERC-20 token and Merkle root, verifies claims through Merkle proofs and securely transfers tokens to the claimer address.
