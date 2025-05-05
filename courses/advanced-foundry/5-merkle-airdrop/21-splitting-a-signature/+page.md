---
title: Splitting a Signature
---

_Follow along with the video_

---

In this lesson we are going to split the signature into its _v,r,s_, component starting by saving this byte signature as a variable:

```solidity
bytes private SIGNATURE = hex"fbda..c11c";
```

In this `SIGNATURE` variable, the _r,s,v_ values are concatenated together in this exact order:

1. `r` is the first 32 bytes of the signature
2. `s` is the next 32 bytes of the signature
3. `v` is the final byte of the signature

To isolate each component, we'll create a function called `splitSignature` . This function will verify that the signature is 65 bytes long. If it is, we can proceed to split it into its components, otherwise we will revert with a custom error.

```solidity
  function splitSignature(bytes memory sig) public pure returns (uint8 v, bytes32 r, bytes32 s) {
        if (sig.length != 65) {
            revert __ClaimAirdropScript__InvalidSignatureLength();
        }
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
```

> 🗒️ **NOTE**:br
> When working with functions from libraries like OpenZeppelin or other APIs, the signature format typically follows the order _v,r,s_ instead of the _r,s,v_ we used in this lesson.
