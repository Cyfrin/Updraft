---
title: Creating a Signature
---

_Follow along with the video_

---

### Introduction

In this lesson, we'll create a signature for a default **Anvil** address, allowing a third-party account to claim tokens on its behalf.

Ensure you have a local Anvil node running, by executing the `anvil` command in your terminal and use the `foundryup` command to get the vanilla version of Foundry.

Copy the [Makefile content](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/main/Makefile) associated with this course. Then, run the `make deploy` command. This will execute a script that deploys both the `BagelToken` and `MerkleAirdrop` contracts.

### MessageHash

To obtain the data for signing, use the `getMessageHash` function on the `MerkleAirdrop` contract. This function requires an account address, a `uint256` amount, and the Anvil node URL (`http://localhost:8545`).

```bash
cast call 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 "getMessageHash(address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 25000000000000000000 --rpc-url http://localhost:8545
0x184e30c4b19f5e304a893524210d50346dad61c461e79155b910e73fd856dc72
```

### Signing

With the data ready for signing, use the `cast wallet sign` command. Include the `--no-hash` flag to prevent rehashing, as the message is already in bytes format. Also, use the `--private-key` flag with the first Anvil private key.

> 👮‍♂️ **Best Practice**:br
> When working on a testnet or using a real account, avoid using the private key directly. Instead, use the `--account` flag and your keystore account for signing.

```bash
cast wallet sign --no-hash 0x184e30c4b19f5e304a893524210d50346dad61c461e79155b910e73fd856dc72 --private-key 0xac093f74bec39a17e36ba4a6b4d238ff944bacb478cbeb5efcae784d7bf4f2ff80
0xfbd2270e6f23ff5e9248480c0f4be8a4e9bd77c3ad0b1333cc60b5debc611602a2a06c24085d8d7c038bad84edc1144dc11c
```

Well done! We just obtained a **single signature**, which we will break down into the v, r, and s components in the next lesson.
