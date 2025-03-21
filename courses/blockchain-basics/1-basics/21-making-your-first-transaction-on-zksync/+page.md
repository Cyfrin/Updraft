---
title: First transaction to ZKsync
---

_Follow along with the video_

---

### Introduction

In this lesson, we will execute a transaction on the **ZKsync testnet**, also known as _zkSync Sepolia_ or _zkSync Era_ testnet. We will start by adding ZKsync Sepolia to MetaMask, followed by bridging funds to this network, and finally verifying the transaction details.

### Adding ZKsync Sepolia to MetaMask

1. **Add the Network**: search for "ZKsync Sepolia Testnet" on [Chainlist](https://chainlist.org/), connect it to your wallet, and add the network by following the confirmation dialogs. Ensure testnets are included in your search.
2. **Check Balance**: you can view your Sepolia balance on MetaMask or on [ZKsync Era Sepolia Block Explorer](https://sepolia.explorer.ZKsync.io/). To view your account summary you can copy your MetaMask address and paste it into the Block Explorer.

### Bridging Funds

Our first transaction involves receiving funds. There are two ways to receive funds on ZKsync:

1. **Using a Faucet**: This method requires the use of APIs or GitHub sign-in.
2. **Bridging**: Our recommended method, that involves transferring funds from one chain (Sepolia) to another (ZKsync Sepolia). There are two types of bridging mechanisms:

   - **Locking and Unlocking**: Tokens are locked on the source chain and unlocked on the destination chain.

     ::image{src='/blockchain-basics/18-making-your-first-transaction-on-ZKsync/lock-unlock.png' style='width: 100%; height: auto;'}

   - **Minting and Burning**: Tokens are burned on the source chain and minted on the destination chain. The bridge protocol must control the token supply to manage this process. An example is [CCTV](https://www.circle.com/en/cross-chain-transfer-protocol) by the Circle team, where USDC is burned and minted to facilitate bridging.

     ::image{src='/blockchain-basics/18-making-your-first-transaction-on-ZKsync/burn-mint.png' style='width: 100%; height: auto;'}

3. **Get Sepolia ETH**: Use the [recommended faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) to obtain Sepolia ETH. With 0.05 Sepolia ETH, you're ready to transfer to ZKsync Sepolia.

   - Note: If you encounter a message requiring 0.001 ETH on the mainnet, wait 10-20 minutes before trying again.

4. **Use the ZKsync Bridge**: Visit the [ZKsync bridge](https://portal.ZKsync.io/bridge) and ensure you are on the testnet. Connect MetaMask to the bridge and confirm a transaction (e.g., 0.025 Sepolia ETH).
5. **Verify the Transaction**: Check the transaction on the ZKsync Sepolia block explorer by pasting your wallet address into the search bar to see the transaction details and status.
   - **Transaction Status**: Once processed, you can view the transaction information, including its _status_.
   - **Finality**: As per the [ZKsync documentation on finality](https://docs.ZKsync.io/zk-stack/concepts/finality), this term refers to the time from sending the transaction to when it is considered settled. On Ethereum, this takes about 13 minutes, but on ZKsync it can take approximately 24 hours.
     During this period, transactions are displayed **instantly** in the UI and can be further transferred, but full finality should be awaited to ensure they are fully received and validated using ZK proofs.

### Conclusion

In this lesson, we explored how to make a transaction to transfer funds on the ZKsync testnet. We began by adding ZKsync Sepolia to MetaMask, we bridged funds to ZKsync Sepolia and we discussed two methods for receiving funds: using a faucet and bridging. For bridging, we covered the mechanisms of locking and unlocking, as well as minting and burning tokens. We obtained Sepolia ETH from a recommended faucet and used the official ZKsync bridge to transfer the funds.
