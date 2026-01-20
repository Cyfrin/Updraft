## A Crucial Guide to Testnets: Public vs. Virtual

Deploying a smart contract or making a transaction on a testnet is often a final, satisfying step in the development process. It’s the moment your code comes to life on a blockchain, making your work feel tangible and real. However, the landscape of testnets has evolved, and choosing the right environment is critical for a smooth and productive learning experience. This lesson serves as an important advisory for navigating testnets within the Cyfrin Updraft curriculum.

### The Growing Challenge of Public Testnets

Public testnets, such as **Sepolia**, are designed to mimic the conditions of a mainnet blockchain. They are decentralized networks that require volunteers to run nodes, keeping the chain operational and secure. To perform any action on these networks, like deploying a contract, you need the network's native test currency, such as testnet ETH. This is traditionally acquired from a service called a **faucet**, which distributes small amounts of test currency for free.

Unfortunately, what was once a simple process has become a significant bottleneck for developers. Over the last couple of years, acquiring testnet ETH has become incredibly challenging for several reasons:

*   **Scarcity and High Barriers to Entry:** Faucets for major public testnets are no longer open to everyone. Many now require you to hold a minimum amount of real, mainnet ETH in your wallet to prove you are a legitimate developer. This creates a financial barrier that is impractical for those just starting their learning journey.
*   **Time-Consuming Process:** Even if you meet the requirements, the process of claiming from a faucet can be frustrating and time-consuming.
*   **Minimal Payouts:** After navigating these hurdles, the amount of testnet ETH you receive is often minuscule—sometimes as little as 0.05 ETH. This is often insufficient for the comprehensive testing and multiple deployments required when learning smart contract development.

For these reasons, relying on public testnets for your day-to-day development and coursework has become almost impossible.

### The Recommended Solution: Tenderly's Virtual Testnets

To ensure you can focus on learning without these frustrations, we strongly recommend using **Tenderly's virtual testnets** for all development and testing purposes throughout this course.

A virtual testnet is a private, simulated blockchain environment that gives you complete control. As you’ve seen in previous lessons, you can fund any account with any amount of test ETH instantly with the simple click of a "Fund" button.

Using a virtual testnet offers significant advantages:
*   **Ease of Use:** Eliminate the need to hunt for functional faucets or hold mainnet funds. Get the resources you need, when you need them.
*   **Efficiency:** Save valuable time and avoid the frustrating experience of being blocked by a lack of testnet funds.
*   **Educational Equivalence:** For the purpose of learning core development concepts, deploying contracts, and interacting with the blockchain, a virtual testnet is just as effective as a public one. The skills you build are directly transferable.

Therefore, whenever a lesson requires you to deploy to or interact with a testnet, your default choice should be the Tenderly virtual testnet.

### A Look Ahead: Demonstrating Public Tools

While you will be working in a virtual environment, understanding the tools used on public networks is still essential for your career as a web3 developer. In an upcoming lesson, we will demonstrate making a transaction on the **Sepolia** public testnet.

**Crucially, this demonstration is for observation only. You are not encouraged to follow along.** The goal is not for you to repeat the steps but to see how essential public-facing tools like block explorers work in a live environment. We will showcase popular block explorers like **Etherscan** and **Blockscout**, which are indispensable for debugging transactions and inspecting contracts on both testnets and mainnet.

By watching this demonstration, you will gain familiarity with the public blockchain ecosystem without having to face the real-world costs and complexities of acquiring funds. The core skills remain the same, whether you are inspecting a transaction on Tenderly, Sepolia, or the Ethereum mainnet.