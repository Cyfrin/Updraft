## Building a Cross-Chain Rebase Token with CCIP

This lesson recaps the development process for creating a custom Rebase Token, integrating it with Chainlink CCIP for cross-chain functionality, testing it rigorously with Foundry, and deploying it across testnets. We'll cover the core smart contracts, the testing strategies, and the deployment scripts involved.

## Understanding the RebaseToken Contract (`RebaseToken.sol`)

The foundation of this project is the `RebaseToken` smart contract. Let's break down its key features and logic:

*   **Core Structure & Permissions:** The contract inherits from OpenZeppelin's standard implementations: `ERC20` for token functionality, `Ownable` for ownership management, and `AccessControl` for role-based permissions. A specific role, `MINT_AND_BURN_ROLE`, is defined to control which addresses (like our Vault and Token Pool contracts) are allowed to mint new tokens or burn existing ones. The contract owner has the exclusive right to grant this role via the `grantMintAndBurnRole` function.
*   **Interest Rate Mechanism:**
    *   **Global Rate:** A global interest rate (`s_interestRate`) is managed by the contract owner through the `setInterestRate` function. A crucial constraint is that this rate can only ever be decreased, never increased.
    *   **User-Specific Rate:** When a user first receives tokens (through minting), the *current* global interest rate at that moment is captured and stored as their specific rate (`s_userInterestRate[user]`). This individual rate is used for all future interest calculations for that user, ensuring fairness even if the global rate decreases later.
*   **Principal Balance Tracking:** To distinguish between originally minted tokens and accrued interest, a `principleBalanceOf` function is implemented. It simply returns the underlying ERC20 `balanceOf` value, representing the tokens directly minted to or received by the user, excluding interest.
*   **Minting Logic (`mint`):** The `mint` function, restricted by the `MINT_AND_BURN_ROLE`, allows creating new tokens for a user. This occurs when users deposit ETH into the Vault or when tokens arrive from another chain via the Token Pool. Before minting the new amount, it crucially calls an internal function, `_mintAccruedInterest`, to calculate and mint any interest the user has earned since their last interaction. It also sets the user's specific interest rate if they are receiving tokens for the first time.
*   **Burning Logic (`burn`):** Similarly restricted by the `MINT_AND_BURN_ROLE`, the `burn` function removes tokens from a user's balance. This happens during Vault redemptions or when sending tokens cross-chain. Like `mint`, it first calls `_mintAccruedInterest` to update the user's balance with earned interest *before* burning the specified amount.
*   **Overridden ERC20 Functions:**
    *   **`balanceOf`:** The standard `balanceOf` function is overridden to provide the *dynamic* balance. It calculates the current balance by taking the user's `principleBalanceOf` and applying the interest accumulated since their last update, using the result from `_calculateUserAccumulatedInterestSinceLastUpdate`.
    *   **`transfer` & `transferFrom`:** These standard transfer functions are also overridden. Before executing the core ERC20 transfer logic, they call `_mintAccruedInterest` for both the sender and the receiver. This ensures both parties' balances accurately reflect accrued interest *before* the transfer takes place.
*   **Interest Calculation Internals:**
    *   **`_calculateUserAccumulatedInterestSinceLastUpdate`:** This internal view function calculates the simple (linear) interest earned by a user. It uses the user's specific interest rate (`s_userInterestRate`), the time elapsed since their last balance update (`s_userLastUpdatedTimestamp`), and the current block timestamp (`block.timestamp`). It effectively calculates an interest factor to be applied to the principal balance.
    *   **`_mintAccruedInterest`:** This internal function is the key to realizing earned interest. Called before major balance-altering operations (mint, burn, transfer), it calculates the user's theoretical current balance (using the overridden `balanceOf`), determines the difference compared to their stored principal balance (`super.balanceOf`), mints this difference to the user, and updates their `s_userLastUpdatedTimestamp`. This converts theoretical interest into actual token balance.
*   **Helper Functions:** Additional getter functions like `getInterestRate` and `getUserInterestRate` were added for easier access to state variables.

## The Vault Contract (`Vault.sol`)

The `Vault` contract serves as a simple on-ramp and off-ramp between the native chain currency (ETH) and our `RebaseToken`:

*   **`deposit()`:** Users send ETH to this function. The contract calculates the equivalent amount of `RebaseToken` based on a predefined or dynamically fetched rate and calls the `mint` function on the `RebaseToken` contract to issue tokens to the depositor.
*   **`redeem()`:** Users call this function specifying the amount of `RebaseToken` they wish to redeem. The contract calls the `burn` function on the `RebaseToken` contract to remove the tokens from the user's balance and then sends the corresponding value of ETH back to the user using a low-level `.call`.
*   **`receive()`:** An external payable `receive` function allows the Vault contract itself to receive direct ETH transfers, potentially useful for funding rewards or operational purposes.

## Integrating with Chainlink CCIP via RebaseTokenPool (`RebaseTokenPool.sol`)

To enable cross-chain transfers of the `RebaseToken`, we utilize Chainlink CCIP and a specialized `RebaseTokenPool` contract:

*   **Inheritance:** This contract inherits functionality from Chainlink's `ccip/contracts/TokenPool.sol`.
*   **Core CCIP Functions:** It implements the necessary functions required by the CCIP protocol for token transfers:
    *   **`lockOrBurn()`:** When initiating a cross-chain transfer *from* the current chain, CCIP calls this function. For our Rebase Token, we implement the "burn" strategy: this function calls `i_rebaseToken.burn()` to remove the specified amount of tokens from the sender's balance on the source chain.
    *   **`releaseOrMint()`:** When receiving a cross-chain transfer *on* the current chain, CCIP calls this function. We implement the "mint" strategy: this function calls `i_rebaseToken.mint()` to create the corresponding amount of tokens for the recipient on the destination chain. Crucially, it extracts the user's original interest rate (sent within the CCIP message payload) and passes it to the `mint` function to maintain consistency across chains.

## Automating Deployment and Interaction with Foundry Scripts

Foundry scripts were essential for streamlining deployment, configuration, and interaction:

*   **Deployment (`Deployer.s.sol`):** Scripts automated the deployment of the `RebaseToken`, `RebaseTokenPool`, and `Vault` contracts.
*   **Setup & Permissions (`Deployer.s.sol` / others):** Post-deployment steps were scripted, including granting the `MINT_AND_BURN_ROLE` from the `RebaseToken` to the `Vault` and `RebaseTokenPool` contracts. Configuration of CCIP admin roles on relevant Chainlink contracts (like `TokenAdminRegistry`) was also handled via script.
*   **Pool Configuration (`ConfigurePools.s.sol`):** A dedicated script configured the deployed `RebaseTokenPool` contracts, enabling specific cross-chain lanes (e.g., connecting the Sepolia pool to the zkSync Sepolia pool) and setting operational parameters like rate limits.
*   **Bridging Tokens (`BridgeTokens.s.sol`):** This script automated the process of initiating a cross-chain transfer. It constructed the `Client.EVM2AnyMessage` struct (containing recipient, data payload including the interest rate, and token transfer details), calculated the required CCIP fees, approved the CCIP Router contract to spend the Rebase Tokens, and finally executed the transfer by calling `ccipSend` on the Router.
*   **Orchestration (`bridgeToZkSync.sh`):** A higher-level shell script coordinated the execution of the various Foundry scripts (deploy, configure, bridge) to perform the end-to-end process of deploying and sending tokens between Sepolia and zkSync Sepolia testnets.

## Rigorous Testing with Foundry

Thorough testing was performed using the Foundry framework:

*   **Unit & Fuzz Tests (`RebaseToken.t.sol`):** The `RebaseToken` contract underwent isolated testing, including unit tests for specific functions and fuzz tests to check behavior under a wide range of inputs, particularly focusing on the interest accrual, mint/burn logic, and overridden transfer functions.
*   **Cross-Chain Integration Tests (`CrossChain.t.sol`):**
    *   **Fork Testing:** Foundry's fork testing mode was heavily utilized. This allowed testing against the actual state of deployed contracts on live testnets (like Sepolia and Arbitrum Sepolia) by creating local copies (`vm.createSelectFork`, `vm.createFork`).
    *   **CCIP Local Simulation:** Tests integrated with `CCIPLocalSimulatorFork`, a tool that simulates the CCIP message routing and execution layer locally within the fork testing environment. This enabled end-to-end testing of the cross-chain `lockOrBurn` and `releaseOrMint` logic without relying on live CCIP relayers.

## Deployment and Live Cross-Chain Execution

The culmination of the development and testing phases was the deployment and execution on public testnets:

*   **Target Testnets:** The entire system (RebaseToken, Vault, RebaseTokenPool) was deployed to the Sepolia and zkSync Sepolia testnets.
*   **Live CCIP Configuration:** All necessary CCIP setup steps (registering tokens and pools with Chainlink contracts, setting admins, enabling the Sepolia <-> zkSync Sepolia lane) were performed on the actual testnets.
*   **Successful Transfer:** Using the previously developed Foundry scripts, a cross-chain transfer of the `RebaseToken` was successfully executed from the Sepolia testnet to the zkSync Sepolia testnet.
*   **Verification:** The success, status, and details of this live cross-chain transaction were confirmed using the official Chainlink **CCIP Explorer**.

## Key Concepts Recap

This project involved several important web3 concepts:

*   **Rebasing Tokens:** Tokens designed to have their circulating supply or user balances adjust automatically based on protocol rules (here, linear interest).
*   **Linear (Simple) Interest:** Interest calculated as Principal × Rate × Time.
*   **ERC20 Overrides:** Customizing standard token behaviors (`balanceOf`, `transfer`, `transferFrom`) to add unique features like automatic interest accrual.
*   **Access Control:** Implementing secure permissioning using `Ownable` and role-based systems like OpenZeppelin's `AccessControl`.
*   **Chainlink CCIP:** A secure protocol enabling cross-chain communication, including token transfers and arbitrary message passing.
*   **CCIP Token Pools:** Specialized contracts required by CCIP to manage the logic (lock/burn, release/mint) for specific tokens being bridged.
*   **Lock/Burn & Release/Mint:** Common patterns in token bridging where tokens are either locked or burned on the source chain and corresponding tokens are released or minted on the destination chain.
*   **Foundry Scripting:** Using Solidity scripts (`.s.sol`) within the Foundry framework to automate complex blockchain interactions like deployments and contract calls.
*   **Foundry Fork Testing:** A powerful testing technique that simulates transactions against a copy of a live blockchain state.
*   **CCIP Local Simulator:** A development tool for testing CCIP integrations locally without depending on live network components.
*   **CCIP Explorer:** A block explorer specifically for tracking and verifying Chainlink CCIP transactions.