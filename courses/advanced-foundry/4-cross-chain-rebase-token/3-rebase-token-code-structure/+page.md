## Introduction to Building a Rebase Token

This lesson guides you through the initial planning and setup for creating a rebase token. Our ultimate objective is to develop a *cross-chain* rebase token utilizing Chainlink CCIP. However, to manage complexity and ensure clarity, we will begin by building a simpler, single-chain version. This foundational stage focuses on establishing the project environment and defining the core design principles that will govern our token's behavior.

## Setting Up Your Development Environment

Before writing any code, we need to set up our project structure using Foundry, a popular Solidity development toolkit, and Visual Studio Code as our editor.

1.  **Create Project Directory:** Open your terminal and create a new directory for the project. You can name it descriptively; for this example, we'll use `ccip-rebase-token`.
    ```bash
    mkdir ccip-rebase-token
    ```

2.  **Navigate into Directory:** Change your current directory to the newly created one.
    ```bash
    cd ccip-rebase-token
    ```

3.  **Initialize Foundry Project:** Use the Foundry command `forge init` to set up the basic project structure and install necessary dependencies like `forge-std`.
    ```bash
    forge init
    ```

4.  **Open in VS Code:** Open the project folder in your code editor.
    ```bash
    code .
    ```

5.  **Clean Up Default Files:** Foundry initializes the project with default example files (`Counter.sol`, `Counter.s.sol`, `Counter.t.sol`) in the `src`, `script`, and `test` directories respectively. We don't need these for our rebase token project, so delete them. Additionally, clear the contents of the default `README.md` file; we will populate it with our specific design notes.

## Core Rebase Token Design Principles

We'll define the fundamental requirements for our rebase token. These principles will guide the smart contract implementation.

1.  **Protocol Deposit Mechanism:**
    *   **Requirement:** "A protocol that allows user to deposit into a vault and in return, receive rebase tokens that represent their underlying balance".
    *   **Implementation:** Users will interact with a `Vault` smart contract to deposit a base asset (e.g., ETH or an ERC20 stablecoin). In exchange for their deposit, the Vault will facilitate the minting of an equivalent amount of our `Rebase Token` to the user. These tokens signify the user's proportional claim on the assets held within the Vault, including any interest earned over time.

2.  **Rebase Token Dynamic Balances:**
    *   **Requirement:** "Rebase token -> `balanceOf` function is dynamic to show the changing balance with time."
    *   **Clarification:** A user's token balance should appear to increase linearly based on the applicable interest rate.
    *   **Interest Realization Mechanism:** This is a crucial design aspect. The standard `balanceOf` function in ERC20-like tokens is a `view` function, meaning it *cannot* modify the blockchain's state (like minting new tokens). Directly minting tokens every time someone checks their balance would require transactions and be prohibitively expensive and impractical.
    *   **Solution:** We differentiate between *conceptual interest accrual* and *actual token minting*.
        *   Interest *accrues* mathematically over time based on the user's rate.
        *   The `balanceOf` function will *calculate* and return the user's current theoretical balance (initial principal + accrued interest), providing an up-to-date view without changing state.
        *   The *actual minting* of the accrued interest tokens to update the user's internal balance recorded on the blockchain only occurs when the user triggers a state-changing action. These actions include depositing more funds (minting), withdrawing funds (burning), transferring tokens, or, in the future cross-chain version, bridging tokens. The internal balance update happens *just before* the primary action (deposit, transfer, etc.) is processed.

## Understanding the Interest Rate Mechanism

A unique interest rate system is central to this rebase token's design, aimed at rewarding early participants.

*   **Requirement:** "Interest rate".
*   **Mechanism Details:**
    *   "Individually set an interest rate for each user based on some global interest rate of the protocol at the time the user deposits into the vault."
    *   "This global interest rate can only decrease to incentivize/reward early adopters."
*   **Implementation:**
    *   A `globalInterestRate` exists for the entire protocol, controlled by an authorized role (e.g., owner).
    *   Crucially, the owner can *only decrease* this `globalInterestRate` over time; it can never be increased.
    *   When a user makes their *first* deposit into the Vault, the protocol reads the *current* `globalInterestRate`.
    *   This rate is then stored as the user's personal `userInterestRate`.
    *   This `userInterestRate` remains fixed for the user from that point forward, associated with their deposited principal.
    *   **Example:**
        1.  The `globalInterestRate` is initially set to 5% (0.05).
        2.  User A deposits funds. Their `userInterestRate` is locked in at 5%.
        3.  The protocol owner later decides to decrease the `globalInterestRate` to 4% (0.04) to moderate token emission or reflect changing market conditions.
        4.  User B deposits funds *after* the rate change. Their `userInterestRate` is locked in at the current global rate of 4%.
        5.  User A continues to accrue interest at their original 5% rate, while User B accrues at 4%. If the owner lowers the rate again to 2%, both User A (5%) and User B (4%) retain their higher, previously locked rates.
    *   This design inherently rewards users who join and deposit earlier, as they secure potentially higher interest rates for the lifetime of their deposit compared to later participants.
    *   **Note on Yield Source:** While real-world rebase tokens often generate yield from underlying DeFi strategies (like staking, lending, or liquidity provision), the source of yield is abstracted in this initial implementation. Our primary focus here is on the tokenomics and mechanics of the rebase and interest rate system itself to encourage token adoption.

## Important Considerations

Keep these key points in mind as we move towards implementation:

*   **Incremental Development:** Starting with a single-chain version simplifies the initial development and testing process before introducing the complexities of cross-chain communication (CCIP).
*   **Complexity:** Rebase tokens are significantly more complex than standard ERC20 tokens due to their dynamic supply and balance calculations. Pay close attention to the implementation details.
*   **Interest Realization:** Clearly understanding the distinction between the calculated balance shown by `balanceOf` (conceptual accrual) and the actual updating of internal balances via minting during state-changing operations is critical.
*   **Early Adopter Incentive:** The decreasing global interest rate coupled with fixed user rates at the time of deposit is a deliberate design choice to incentivize early participation in the protocol.

## Next Steps

With the project environment set up and the core design principles defined, the next logical step is to begin writing the Solidity smart contract code for the `Rebase Token`, implementing the mechanisms discussed in this lesson.