## How to Find GMX Staking, Unstaking, and Claiming Functions

This lesson focuses on the practical steps required to identify the specific smart contract functions and parameters used for staking GMX, unstaking GMX, and claiming the associated rewards within the GMX protocol, specifically on the Arbitrum network.

While the interactions themselves involve relatively simple function calls, we will not explicitly detail which functions to call or what parameters they require. Instead, this guide will equip you with the methodology to discover this information independently. This skill is crucial for understanding how protocols work under the hood and for building custom interactions.

The core task is for you to determine:

1.  Which specific functions are called for staking GMX tokens.
2.  Which specific functions are called for unstaking GMX tokens.
3.  Which specific functions are called for claiming GMX staking rewards.
4.  Which specific smart contract addresses host these functions.

To achieve this, you will analyze relevant blockchain transactions using common web3 tools.

### Methodology: Analyzing Transactions to Uncover Functions

The primary method involves obtaining transaction hashes corresponding to the actions you want to understand (staking, unstaking, claiming) and then dissecting these transactions using specialized tools.

1.  **Obtain Relevant Transaction Hashes:** We will provide a set of transaction hashes in the associated GitHub repository for this course. These hashes represent actual GMX staking, unstaking, and reward claiming operations on Arbitrum. Alternatively, you could find your own transaction hashes if you have previously interacted with the GMX protocol.
2.  **Use a Blockchain Explorer:** Start by examining a transaction hash using a block explorer compatible with Arbitrum, such as Arbiscan (arbiscan.io). The explorer provides high-level details like the transaction status, timestamp, the initiating wallet address (`From`), and the primary contract interacted with. For example, looking up a staking transaction like `0x0ed2a66323713c2e78dd53750612f3e9bcc97f2f8c02633a433a413889142067` on Arbiscan might show a high-level action described as `Call Stake Gmx Function`. This gives you a starting point but doesn't reveal the internal specifics.
3.  **Use a Transaction Debugger:** The key to uncovering the exact functions and parameters lies in using a transaction debugger tool, such as Tenderly (tenderly.co).
    *   Copy the relevant transaction hash.
    *   Paste the hash into the debugger tool.
    *   Analyze the detailed execution trace provided by the debugger. This trace breaks down the transaction into its elemental steps, including internal function calls between contracts, the precise data (parameters) passed during these calls, state changes, and emitted events.

### Tools for the Job

*   **Blockchain Explorer (e.g., Arbiscan):** Used for viewing basic transaction details and identifying the initial contract interaction.
*   **Transaction Debugger (e.g., Tenderly):** Essential for dissecting the transaction's execution flow, revealing internal function calls, parameters, involved contracts, and events. Provides tabs like "Debugger," "Full Trace," "Contracts," "Events," and "State."
*   **GitHub Repository:** The designated location (provided alongside this course material) where you can find the sample transaction hashes needed for your analysis.

### Key Concepts Involved

*   **Smart Contract Interaction:** Executing actions on the blockchain by calling functions within smart contracts (e.g., a `stake` function on a GMX contract).
*   **Transaction Hash (TxHash):** A unique identifier for every transaction submitted to the blockchain, acting as a lookup key.
*   **Transaction Debugging:** The process of stepping through a transaction's execution path to understand its internal logic, function calls, data flow, and effects.
*   **DeFi Actions:** Standard operations in Decentralized Finance, such as staking tokens to earn yield, unstaking them to retrieve capital, and claiming accrued rewards.
*   **Function Calls & Parameters:** Smart contract functions often require specific input data (parameters) to execute correctly. Debugging reveals these requirements.

### Example: Debugging a GMX Staking Transaction

Let's illustrate the process using the example transaction hash `0x0ed...67` mentioned earlier:

1.  **Arbiscan:** Viewing this hash on Arbiscan confirms it was successful and initiated by address `0xd24cBa...40f49E`, interacting primarily with contract `0x5E4766...94A1`, executing a high-level `Call Stake Gmx Function`.
2.  **Tenderly:** Pasting the same hash into Tenderly's debugger allows for deeper analysis. Within the "Debugger" or "Full Trace" view, you can observe the sequence of internal operations. You might see an internal call directed to a contract identified potentially as `RewardRouterV2`, calling a function like `_stakeGmx`. Crucially, the debugger will also show the parameters passed to this function, such as `_fundingAccount = 0xd24cba75f7af6081bff9e6122f4054f321...` (matching the `From` address). Associated events, like tokens being minted by a "RewardTracker" contract, provide further context.

By following this debugging process for the transaction hashes related to staking, unstaking, and claiming (found in the provided GitHub repository), you can systematically identify the target contracts, function names, and required parameters for each action within the GMX protocol. This hands-on analysis is a fundamental skill for any web3 developer or researcher.