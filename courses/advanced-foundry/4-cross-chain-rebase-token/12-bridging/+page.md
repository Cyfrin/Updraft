## Cross-Chain Interoperability Explained

We can't move assets between blockchains directly, like two islands. We need a bridge! 

A bridge is a protocol that acts as a pathway between blockchains.

### Why We Need Bridges
We need bridges for several reasons:

* **Gas Fees:** We need to pay gas fees to process transactions on blockchains.
* **Currency Conversion:** The currency needs to be converted for the appropriate chain.

### Bridging Terminology
Here are some important terms related to bridging:

* **Bridging:** The transfer of assets, like tokens, cross-chain.
* **Cross-Chain Messaging:** The transfer of data cross-chain.

### How Bridges Work
We'll look at two methods bridges use:

* **Burn & Mint:** Tokens are burnt on the source chain, removed from circulation. The same number of tokens are then minted and given to the user on the destination chain.
* **Lock & Unlock:** Tokens on the source chain are locked in a vault. A new, wrapped version of the token is then minted on the destination chain, and given to the user.

### Types of Bridges

* **Native Bridges:** Built by the blockchain team. 
* **Third-Party Bridges:** Developed independently. These are often faster, but have higher fees.

### Security
We also need to be aware of security risks. Because we don't need to wait for finality with third-party bridges, there is a possibility of a roll-back or reorg that could reverse our transaction. 

### Auditing
To ensure that the bridges we use are secure, we need to get them audited:

* **Competitive Audit:** Placing the code on platforms like CodeHawks
* **Private Audit:** Reaching out to a company like Cipher directly

### Cross-Chain Applications
Vitalik Buterin, founder of Ethereum, stated the future is multi-chain, not cross-chain, due to security issues. He stated billions of dollars have been bridged across chains, but there is a need for applications to ensure security.

We should ensure we audit applications before interacting with them! 
