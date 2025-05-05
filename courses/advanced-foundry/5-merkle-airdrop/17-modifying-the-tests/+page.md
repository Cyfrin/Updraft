---
title: Modifying the Tests
---

_Follow along with the video_

---

### Lesson Overview

In this lesson, we'll explore how to empower a third party address, the `gasPayer`, to make claims on a user's behalf. The user will then sign a message to authorize this address to execute the `MerkleAirdrop::claim` function on his behalf.

### Setup

First, in the `setup()` function, we'll create a new address, `gasPayer`, which will have permission to call the claim function:

```solidity
gasPayer = makeAddr("gasPayer");
```

Next, the `user` address will sign a message with their private key, authorizing the `gasPayer` address to perform the claim:

```solidity
vm.startPrank(user);
(uint8 v, bytes32 r, bytes32 s) = signMessage(userPrivKey, user);
vm.stopPrank();
```

### Signing the Message

The `signMessage` function will calculate the **message digest**, which will be signed using the user's private key. The `vm.sign` cheatcode will generate the v, r, and s values necessary for the signature:

```solidity
function signMessage(uint256 privKey, address account) public view returns (uint8 v, bytes32 r, bytes32 s) {
        bytes32 hashedMessage = airdrop.getMessageHash(account, AMOUNT_TO_CLAIM);
    (v, r, s) = vm.sign(privKey, hashedMessage);
}
```

### Completing the Tests

Finally, the `gasPayer` address can call the `MerkleAirdrop::claim` function on behalf of the `user`, passing the user's signature (v, r, s) into the function:

```solidity
vm.prank(gasPayer);
airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF, v, r, s);
```

Afterward, we can verify that the test passes: the user's balance increases as expected, indicating that the `gasPayer` successfully claimed the tokens on the `user`'s behalf.
