---
title: deploying FundMe to ZKsync
---

_Follow along with the video_

---

### Introduction

In this lesson, we'll walk through the steps to deploy the `FundMe` contract to the ZKsync testnet.

### Adjustments for ZKsync

First, we'll need the specific the correct **price feed address** for the ZKsync Sepolia chain, which you can find in the [Chainlink documentation](https://docs.chain.link/data-feeds/price-feeds/addresses?network=zksync&page=1). Each chain has its own unique addresses, and the ETH/USD address for the ZKsync Sepolia testnet will differ from the one on Sepolia.

Then, copy the ZKsync Sepolia testnet ETH/USD address and replace the existing address in the `FundMe::getVersion` and `PriceConverter::getPrice` functions:

```solidity
AggregatorV3Interface priceFeed = AggregatorV3Interface(0xfEefF7c3fB57d18C5C6Cdd71e45D2D0b4F9377bF); // Add ETH/USD ZKsync Sepolia address here
```

Since the ZKsync plugin may not handle libraries well yet, you can copy the library code directly into your contract instead of importing it.

It's recommended using the correct version of the Solidity compiler by updating it to version `0.8.24` for ZKsync compatibility.

### Deploying the Contract

In the Environment tab, you can connect your MetaMask wallet and then **deploy and verify** the `FundMe` contract. After deployment, you can interact with the contract by checking functions like `FundMe::MINIMUM_USD`,`FundMe::getVersion` to ensure they return the expected values.

### Conclusion

Deploying the `FundMe` contract to the ZKsync testnet involves a few key steps. First, adjust the price feed addresses and handle the library code correctly and make sure you're using the correct version of the Solidity compiler. Then you are ready to connect the MetaMask wallet to Remix ZKsync module and deploy the contract. Finally, you can verify that everything is working as expected by calling the contract functions in the [ZKsync block explorer](https://sepolia.explorer.zksync.io/).
