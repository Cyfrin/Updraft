---
title: Implementing Signatures
---

_Follow along with the video_

---

### Introduction

In this lesson, we will implement signature verification in our [`MerkleAirdrop::claim`](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/main/src/MerkleAirdrop.sol) function. We'll begin by adding a check at the start of the function to ensure the signature's validity. Next, we'll implement the `_isValidSignature` function, which requires a hashed message as input. This message contains the _account_ and the _amount_ to be claimed.

### Setup

Before verifying the signature, we need to check if the claim has already been made to avoid redundant verification. If the claim is new, we proceed to validate the signature by calling the internal `_isValidSignature` function. If the signature is invalid, the function will revert with a custom error `MerkleAirdrop__InvalidSignature()`.

```solidity
function claim(
    address account,
    uint256 amount,
    bytes32[] calldata merkleProof,
    uint8 v,
    bytes32 r,
    bytes32 s
) external {
    if (s_hasClaimed[account]) {
        revert MerkleAirdrop__AlreadyClaimed();
    }

    // Verify the signature
    if (!_isValidSignature(account, message, v, r, s)) {
        revert MerkleAirdrop__InvalidSignature();
    }
    //...
}
```

### Signature Verification

To verify the signature, we'll implement `_isValidSignature`. This function requires the **account**, **message digest**, and the **v**, **r**, and **s** components of the signature. It will revert if the signature is invalid.

The **message digest** is created using the `getMessage` function, which takes the account and the claimed amount as parameters and returns a specific hash type from OpenZeppelin's EIP 712 contract.

```solidity
function getMessage(address account, uint256 amount) public view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
        MESSAGE_TYPEHASH,
        account,
        amount
    )));
}
```

To use this function correctly, our contract must inherit from the EIP712 contract by adding the `is` keyword to the contract declaration and updating the constructor:

```solidity
import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract MerkleAirdrop is EIP712 {
    constructor() EIP712("Airdrop", "1") {}
}
```

### Message Type Struct

Next, define a struct for the message type and use it in the `MESSAGE_TYPEHASH` variable declaration and the `getMessage` function:

```solidity
struct AirdropClaim {
    address account;
    uint256 amount;
}

bytes32 private constant MESSAGE_TYPEHASH = keccak256("AirdropClaim(address account,uint256 amount)");

function getMessage(address account, uint256 amount) public view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
        MESSAGE_TYPEHASH,
        AirdropClaim({account: account, amount: amount})
    )));
}
```

With this setup, we can correctly encode and hash the `MESSAGE_TYPEHASH`, account, and amount to be claimed.

### Signature Validation

Finally, implement the `_isValidSignature` function:

```solidity
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

function _isValidSignature(
    address account,
    bytes32 digest,
    uint8 v,
    bytes32 r,
    bytes32 s
) internal pure returns (bool) {
    (address actualSigner,,) = ECDSA.tryRecover(digest, v, r, s);
    return (actualSigner == account);
}
```

This function uses `ECDSA::tryRecover` to recover the signer's address from the signature and compare it to the provided account. It also protects against signature malleability and reverts on zero addresses according to OpenZeppelin's ECDSA implementation.
