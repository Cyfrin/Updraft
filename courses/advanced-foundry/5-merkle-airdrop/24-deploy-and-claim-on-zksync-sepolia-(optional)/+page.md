---
title: Deploy and Claim on ZKsync Sepolia
---

_Follow along with the video_

---

### Introduction

In this lesson, we will be **manually deploying on ZKsync Sepolia**. Although scripts are highly recommended in order to avoid mistakes and save funds, we will proceed with typing command directly in the terminal since scripts do not work well on ZKsync at the moment of recording.

As usual, we will deploy the contracts `BagelToken` and `MerkleAirdrop`, generate the message hash, sign it, and split our long signature into its _v, r, s_ components. We'll then mint and transfer tokens to the `MerkleAirdrop` contract, claim the tokens from a third party address and finally verify this claim.

> 🗒️ **NOTE**:br
> In MetaMask, you can create a wallet, for example, "updraft," using keystores where accounts are pre-saved, preventing the need to use the private key directly. For this demonstration, _updraft_ will deploy the contracts while _updraft 2_ will handle token claims.

### Deploying Contracts

To deploy both contracts, specify the contract path and the necessary environment variables, then save the contract address as an environment variable:

```bash
export ZKSYNC_SEPOLIA_RPC_URL=https://sepolia.era.zksync.dev
forge create source/BagelToken --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} --account updraft --legacy --zksync
export TOKEN_ADDRESS=0x7B66C3E36d026232408a655cF7cFdEeFA099D6d0
```

Next, deploy the `MerkleAirdrop` contract and save its address:

```bash
forge create source/MerkleAirdrop --constructor-args ${TOKEN_ADDRESS} ${ROOT_HASH} --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} --account updraft --legacy --zksync
export AIRDROP_ADDRESS=<deployed_airdrop_address>
```

### Message and Signature

To claim tokens, get the message hash and then sign it using the second wallet:

```bash
cast call ${AIRDROP_ADDRESS} "getMessageHash(address,uint256)" 0x2ea3970Ed82D5b30be821FAAD4a731D35964F7dd 25000000000000000000 --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL}
cast wallet sign --no-hash 0xb37630ae79f68b63ba0240a965dc09dbc188bc082fd2425d70c1885933fd66a1 --account updraft2
```

After saving the signed message into a `signature.txt` file and removing its `0x` prefix, split it into its _v, r, s_ components with the `SplitSignature` script. Save the three environment variables `V`, `R`, and `S` for later use.

```bash
forge script script/SplitSignature.s.sol:SplitSignature
```

### Minting and Transferring Tokens

Before claiming tokens, mint and transfer tokens to the airdrop contract:

```bash
cast send ${TOKEN_ADDRESS} "mint(address,uint256)" 0x52d64ED1fd0877797e2030fc914259e052F2bD67 25000000000000000000 --account updraft --rpc-url  ${ZKSYNC_SEPOLIA_RPC_URL}
cast send ${TOKEN_ADDRESS} "transfer(address,uint256)" ${AIRDROP_ADDRESS} 25000000000000000000 --account updraft --rpc-url  ${ZKSYNC_SEPOLIA_RPC_URL}
```

### Claiming Tokens

With everything set, perform the claim operation:

```bash
cast send ${AIRDROP_ADDRESS} "claim(address,uint256,bytes32[],uint8,bytes32,bytes32)" 0x2ea3970Ed82D5b30be821FAAD4a731D35964F7dd 25000000000000000000 <proof> ${V} ${R} ${S} "[0x4fd31fee0e75780cd67704fbc43caee70fddcaa43631e2e1bc9fb233fada2394,0x81f0e530b56872b6fc3e10f8873804230663f8407e21cef901b8aeb06a25e5e2]" --account updraft --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL}
```

### Verifying the Claim

To verify the claim, check the balance of the second account. If the balance reflects the claimed amount (25000000000000000000), the process is successful.

```bash
cast call ${TOKEN_ADDRESS} "balanceOf(address)" 0x2ea3970Ed82D5b30be821FAAD4a731D35964F7dd --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL}
cast --to-dec 0x0000000000000000000000000015af1d78b58c40000
```
