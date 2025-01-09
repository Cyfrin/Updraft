---
title: L2s
---

_Follow along with the video_

---

### Introduction

In previous lessons, we deployed to the Sepolia testnet and started working with the Layer 2 solution ZKsync. Deploying to Sepolia simulates deployment to the Ethereum mainnet, offering a comprehensive understanding of Layer 1 deployments. However, it's important to note that most projects today prefer deploying to Layer 2 solutions rather than directly to Ethereum due to the high costs associated with deployments.

### Gas Usage

When deploying to a ZKsync local node, a `/broadcast` folder is created, containing a lot of detailed deployment transaction information. For instance, in our `run-latest.json` file, we can see the `gasUsed` value and we can convert this hexadecimal number `0x5747A` to its decimal equivalent by typing `cast to base 0x5747A dec`. This conversion allows us to estimate the deployment cost on the Ethereum mainnet. By checking recent gas prices on Etherscan, we can calculate the total cost using the formula:

```
Total Cost = Gas Used * Gas Price
```

We can see this total cost in the deployment transaction on [Sepolia Etherscan](https://sepolia.etherscan.io/tx/0xc496b9d30df33aa9285ddd384c14ce2a58eef470898b5cda001d0f4a21b017f6), under the `Transaction Fee` section. In this case, `357,498` gas will costs `0.000279288255846978` ETH, which today is equivalent to $7.

Deploying even a minimal contract like `SimpleStorage` on Ethereum can be expensive. Larger contracts, with thousands of lines of code, can cost thousands of dollars. This is why many developers prefer deploying to Layer 2 solutions like ZKsync, which offer the same security as Ethereum but at a fraction of the cost.

### Deploying to ZKsync Sepolia

Deploying to ZKsync Sepolia is similar to deploying to a ZKsync local node. You can retrieve a ZKsync Sepolia RPC URL from [Alchemy](https://www.alchemy.com/) by creating a new app based on the ZKsepolia network. Then, you can proceed to add the `ZKSYNC_RPC_URL` to your `.env` configuration.

> 🗒️ **NOTE**:br
> To understand the cost benefits of Layer 2 solutions, visit [L2Fees.info](https://l2fees.info) and compare the significant cost differences between sending a transaction on Ethereum and ZKsync Era.
