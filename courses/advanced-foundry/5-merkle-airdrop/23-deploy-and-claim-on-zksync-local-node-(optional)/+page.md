---
title: Deploy and Claim on zkSync Local Node
---

_Follow along with the video_

---

### Introduction

In this lesson, we are going to deploy and claim our tokens on a **local ZKsync node**. First, we need to terminate the Anvil node and then run `foundryup --zksync` to switch to the ZKsync foundry environment.

⚠️ At the time of this recording, foundry scripts cannot be used on ZKsync. Instead, we will use a bash script that runs the same commands as before. You can copy the [interactZk](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/main/interactZk.sh) script from the GitHub repository and follow along.

### Script Overview

The script is organized into the following sections:

1. It begins by declaring all the necessary variables. These include the default ZKsync and Anvil local accounts and key pairs, along with the Merkle Root and the two Merkle Proofs.

2. Using the ZKsync CLI, a local ZKsync node is started. The script then deploys the `BagelToken` and the `MerkleAirdrop` contracts.

3. It calls `MerkleAirdrop::getMessageHash` function using the default Anvil address and token amount to obtain the message hash. This message is then signed using `cast wallet sign` with the default Anvil key. The resulting signature is cleaned by removing the "0x" prefix and saved inside the file `signature.txt`.

4. This signature is then splitted into its _v, r, s_ components using the [`SplitSignature::SplitSignature`](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/b4c627c3bcce7ecb5bb3df1f5209dda94059626b/script/SplitSignature.s.sol#L9C14-L9C28) function. You can copy this function from the GitHub repository.

5. Tokens are minted and sent to the `MerkleAirdrop` contract. The script then calls `claim` on behalf of the default address using the proofs, signature, and claiming address.

6. Finally the Bagel token balance of the claiming address is checked and displayed in the terminal.

### Conclusion

To run the script, we make it _executable_ and run it with the following command:

```bash
chmod +x interactZk.sh && ./interactZk.sh
```

This will output the balance of the first Anvil account, which should be `25000000000000000000` or 25 Bagel tokens.
