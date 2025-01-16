---
title: Adding Signature Verification
---

_Follow along with the video_

---

### Introduction

In this lesson, we will explore the process of allowing a third party to claim tokens on behalf of another account. Our goal is to maintain security by ensuring that the account owner consents to any transactions initiated by the third party.

- A straightforward approach might involve **removing the account** from the equation entirely and relying solely on the caller of the function, the `msg.sender`. This would mean that each account would need to initiate the call themselves, covering their own gas fees. However, this method is limited and rigid, as restricts the ability of others to execute transactions on behalf of the account holder.

- A more flexible solution involves allowing individuals to execute and pay for these transactions **on behalf of the account holder**, given that permission has been granted beforehand. This method can be achieved using digital signatures.

### Signatures

At a high level, here is how signatures in our contract `MerkleAirdrop` would work:

1. **Granting Permission**: An account creates a message stating that a third party can claim the tokens for them. This message is signed using their **private key**, providing a _unique signature_ to grant permission.

2. **Signature Verification**: When the third party calls `claim`, the system verifies the signature against the intended account. It checks if the signature indeed originates from the account that the claim is being made for.

3. **Claim Validation**: If the signature is both valid and the account is listed in the Merkle Tree, the claim is processed, and the tokens are airdropped to the account holder.

### Conclusion

The use of digital signatures allows for a more flexible and secure method of executing airdrops. It enables account holders to authorize others to act on their behalf while ensuring that they only receive transactions they have explicitly approved.
