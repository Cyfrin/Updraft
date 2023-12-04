---
title: Arbitrage walkthrough
---



---

# Spotting Opportunities with Flash Loans in DeFi: A Beginner's Guide

In this blog post, we'll walk you through a simple yet effective use case of flash loans in the ever-growing DeFi sphere. These instantaneous and uncollateralized crypto borrowings have the potential to level the playing field for those just beginning their journey with decentralized finance.

![](https://cdn.videotap.com/pU3EHWsVTfLRc7Io0d4p-11.31.png)## The Scenario: Decentralized Exchanges and A Flash Loan Protocol

Flash loans can be used to take advantage of discrepancies between different decentralized exchanges. In our use case, for illustrative purposes, let's imagine two decentralized exchanges, **DEX A** that values 1 ETH at $5 and **DEX B**, valuing 1 ETH at $6. Let's introduce our player, **Little Fox**, who initially has $5 and aspires to leverage these discrepancies for gains, much like big players or “whales“.

Ordinarily, he could repeatedly buy ETH from DEX A and sell on DEX B to benefit from the price disparity while it lasts. However, performing this arbitrage manually would entail considerable gas fees and risk attracting copycats, eroding the arbitrage opportunity over time. This approach, therefore, isn't practical nor efficient.

Enter **flash loans**, an innovative DeFi tool that can significantly change the landscape.

![](https://cdn.videotap.com/nb798NifZCWAlRyaN0W8-39.57.png)

## The Flash Loan Mechanism: How Does It Work?

Below, we're going to break down how our Little Fox can employ the power of flash loans and achieve the same level of profit as a whale.

In our example, there's a flash loan protocol that enables individuals to borrow substantial sums of capital. The protocol begins empty, awaiting deposits from prospective lenders.

Let’s say a whale deposits $5,000 into the protocol, creating 5,000 flash loan tokens (FLTs). Owning 100% of the FLTs, the whale essentially owns all the money in the protocol. They can use their FLTs to retrieve their full deposit at any time they wish.

## Step 1: Requesting the flash loan

The first step for Little Fox is to call the flash loan function on the smart contract to borrow the $5,000 from the protocol.

### Step 2: Executing the arbitrage strategy

Remember that all actions using the borrowed funds must occur within one blockchain transaction to prevent loan default. Therefore, we represent the following steps with a single 'transaction call'

### Step 3: Repaying the flash loan

Finally, Little Fox repays the $5,000 flash loan to the protocol and keeps the $1,000 profit.

![](https://cdn.videotap.com/ZCzIKYmtOmiYCUylbef8-237.43.png)

In effect, by initially borrowing $5,000, buying 1,000 ETH, re-selling the ETH for $6,000 and returning the initial $5,000 (plus a tiny fee), Little Fox made the same $1,000 gain that the whale would’ve without the initial capital.

> "Despite starting with just $5 and incurring a tiny fee, our Little Fox was able to end up with a juicy profit of almost $1,000, thanks to flash loans."

To provide some perspective, let's keep in mind that real-world arbitrage opportunities won't always be as substantial, and gas costs can influence the profitability. However, the example underlines the power of flash loans to amplify potential profits in DeFi by enabling smaller players to punch above their weight.

Flash loans epitomize the democratization of finance that lies at the heart of the DeFi movement. They demonstrate just how the playing field can be leveled by the power of smart contracts, providing opportunity and access to all participants, not just the 'whales'.
