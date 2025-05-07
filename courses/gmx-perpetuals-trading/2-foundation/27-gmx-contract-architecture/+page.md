## GMX V2 Smart Contract Architecture Overview

GMX V2 utilizes a sophisticated and modular smart contract architecture designed for efficiency, security, and extensibility. This lesson provides a high-level overview of the key components and interactions within the GMX V2 system, focusing on the core mechanics essential for understanding its operation. A fundamental concept is the asynchronous execution model: user actions typically create orders that are executed later by off-chain Keepers, using price data obtained closer to the execution time.

## Core Architectural Principles

Two core principles underpin the GMX V2 design:

1.  **Modular Design:** Functionality is segregated into distinct contract types, including Routers, Handlers, Utils, Vaults, Data Storage, and Tokens. This separation of concerns enhances maintainability and auditability.
2.  **Asynchronous Execution:** Most user-initiated actions (e.g., opening positions, adding/removing liquidity) do not execute immediately. Instead, they generate an order request stored within the system. Off-chain actors, known as Keepers, monitor these pending orders and trigger their execution when predefined conditions are met, supplying necessary price data at that time.

## Key Components and Contract Types

The GMX V2 architecture comprises several distinct categories of smart contracts, each serving a specific purpose:

### Routers: User Entry Points

Routers serve as the primary interface for users interacting with the GMX V2 protocol. They receive user requests and initiate the order creation process.

*   **`ExchangeRouter`**: The main entry point for interacting with individual GM liquidity pools (Market Tokens). Key functions include:
    *   `sendWnt`: Sends Wrapped Native Tokens (e.g., WETH) to a designated Vault, typically for deposits or execution fees.
    *   `sendTokens`: Sends specified ERC20 tokens to a Vault.
    *   `createDeposit`: Creates an order to add liquidity to a specific GM pool.
    *   `createWithdrawal`: Creates an order to remove liquidity from a GM pool.
    *   `createShift`: Creates an order to move liquidity between different GM pools.
    *   `createOrder`: Creates an order to open, close, increase, or decrease perpetual swap positions, or execute spot swaps.
    *   `claimFundingFees`: Allows users to claim accrued funding fees on their open positions.
    *   **Important Note:** Calls to `createDeposit`, `createWithdrawal`, `createShift`, and `createOrder` **do not** execute the action. They create an order stored in the `DataStore` for later execution by Keepers.

*   **`GlvRouter`**: A specialized router for managing liquidity in the GLV (GMX Liquidity Vault) pools, which represent baskets of underlying GM pool tokens.
    *   `createGlvDeposit`: Creates an order to add liquidity to the GLV pool.
    *   `createGlvWithdrawal`: Creates an order to remove liquidity from the GLV pool.
    *   **Prerequisite:** Users must first deposit the required tokens and execution fee into the `GlvVault` using `sendWnt` or `sendTokens` via the `GlvRouter` before calling these creation functions.

### Handlers: Bridging Users, Keepers, and Logic

Handlers act as intermediaries and access control layers. They have a dual role:

1.  **Order Creation:** Called by Routers to validate inputs and initiate the process of creating and storing an order via the appropriate Utils contract.
2.  **Order Execution:** Called by Keepers to trigger the execution of a pending order. They route the execution call to the relevant Utils contract.

Examples include `DepositHandler`, `WithdrawalHandler`, `ShiftHandler`, `OrderHandler`, `LiquidationHandler`, and `GlvHandler`.

### Utils: The Core Logic Engine

Utils contracts contain the core business logic of the GMX V2 protocol. They are responsible for calculations, state updates, and interactions with other components like Vaults, Tokens, and the DataStore. They can be broadly categorized:

*   **Storage Utils:** Primarily responsible for creating and storing order data in the `DataStore`. Examples: `DepositUtils`, `WithdrawalUtils`, `ShiftUtils`, `OrderUtils`, `GlvDepositUtils`, `GlvWithdrawalUtils`.
*   **Execution Utils:** Contain the logic to execute a specific action when invoked by a Keeper via a Handler. They interact with Vaults, Tokens, DataStore, and other Utils. Examples: `ExecuteDepositUtils`, `ExecuteWithdrawalUtils`, `ExecuteOrderUtils`.
*   **Position/Swap Execution Utils:** `ExecuteOrderUtils` delegates specific tasks to specialized Utils:
    *   `IncreasePositionUtils`: Manages the logic for opening or increasing positions.
    *   `DecreasePositionUtils`: Manages the logic for closing or decreasing positions.
    *   `SwapUtils`: Handles token transfers and logic for swaps.
*   **Core Calculation / State Utils:** Provide essential calculations (pricing, PnL, fees) and access shared state required during execution. Examples: `MarketUtils`, `PositionUtils`, `SwapPricingUtils`, `PositionPricingUtils`. These are frequently called by Execution Utils.

### Vaults: Temporary Fund Holding

Vaults are simple contracts designed to temporarily hold user funds (collateral, deposit amounts, execution fees) between the initial deposit transaction (via `sendWnt`/`sendTokens`) and the final execution of the order by a Keeper. This separation isolates fund management during the asynchronous execution process. Examples include `OrderVault`, `DepositVault`, `WithdrawalVault`, and `GlvVault`. When an order is executed, the relevant `Execute...Utils` contract retrieves the necessary funds from the corresponding Vault.

### DataStore: Persistent State Management

The `DataStore` contract serves as the central repository for persistent GMX V2 state. Its primary responsibilities include storing pending orders created by users and maintaining the state of active positions. Various Utils contracts read from and write to the `DataStore` during both order creation and execution phases.

### Tokens: Representing Liquidity and Assets

GMX V2 utilizes specific token contracts:

*   **`MarketToken`**: Represents liquidity in a specific market pool (e.g., ETH/USD). These ERC20 tokens are minted to liquidity providers when they deposit collateral (long and short tokens, e.g., WETH and USDC) and burned upon withdrawal. Perpetual positions also interact directly with the balances and configurations of these Market Tokens.
*   **`GlvToken`**: An ERC20 token representing shares in the GLV pool, which itself holds a basket of different `MarketToken`s. Users deposit assets, receive `GlvToken`s, and the GLV system manages the underlying `MarketToken` positions.
*   **Underlying Tokens**: The actual ERC20 assets (e.g., `WETH`, `WBTC`, `USDC`) held within the `MarketToken` contracts as collateral or used for swaps.

### Keepers and Oracles: Off-Chain Interaction

*   **Keepers:** Off-chain bots essential for the protocol's operation. They monitor the `DataStore` for pending orders. When conditions are met (e.g., time elapsed, price triggers), Keepers gather necessary price data from external sources and submit an execution transaction, calling the appropriate Handler function.
*   **Oracles:** Contracts used *during* the execution phase initiated by Keepers. The Keeper provides the fetched prices, which are temporarily set in the Oracle contract. Utils contracts then read these prices from the Oracle for calculations (e.g., PnL, swap amounts). The prices are typically cleared after the execution transaction completes.

### Fee Handling: GasUtils

The `GasUtils` contract manages the payment of execution fees to Keepers. When a Keeper successfully executes an order, the corresponding `Execute...Utils` contract calls `GasUtils`. `GasUtils` retrieves the execution fee (pre-paid by the user and held in a Vault), transfers it to the Keeper's address, and refunds any remaining portion of the pre-paid fee back to the user who created the order.

## Key Workflow Examples

Understanding the flow of interactions for common use cases clarifies the architecture:

### Workflow: Adding Liquidity to a GM Pool

1.  **User:** Calls `sendWnt` or `sendTokens` on `ExchangeRouter`, specifying the target `DepositVault`. Funds are transferred to `DepositVault`.
2.  **User:** Calls `createDeposit` on `ExchangeRouter` with deposit parameters.
3.  **`ExchangeRouter`:** Calls the `DepositHandler`.
4.  **`DepositHandler`:** Calls `DepositUtils`.
5.  **`DepositUtils`:** Creates the deposit order object and stores it in the `DataStore`.
6.  **Keeper:** Monitors `DataStore`, detects the new deposit order.
7.  **Keeper:** Fetches current market prices and calls the execution function (e.g., `executeDeposit`) on `DepositHandler`, providing the price data.
8.  **`DepositHandler`:** Sets the provided prices in the `Oracle` contract and calls `ExecuteDepositUtils`.
9.  **`ExecuteDepositUtils`:**
    *   Reads order details from `DataStore`.
    *   Pulls required tokens and execution fee from `DepositVault`.
    *   Uses `MarketUtils`, `PositionPricingUtils`, etc., reading prices from `Oracle`, for calculations.
    *   Interacts with the target `MarketToken` contract to mint new market tokens.
    *   Calls `GasUtils` to pay the Keeper and refund any excess fee to the user.
    *   Removes the executed order from `DataStore`.
    *   Transfers the newly minted `MarketToken`s to the user.

### Workflow: Opening a Position or Swapping

The flow is very similar to adding liquidity but involves different Routers, Handlers, Utils, and Vaults:

1.  User sends funds (`sendWnt`/`sendTokens`) to the `OrderVault` via `ExchangeRouter`.
2.  User calls `createOrder` on `ExchangeRouter`.
3.  `ExchangeRouter` -> `OrderHandler` -> `OrderUtils` -> `DataStore` (order stored).
4.  Keeper monitors `DataStore`, sees the order.
5.  Keeper executes via `OrderHandler`, providing prices.
6.  `OrderHandler` sets Oracle prices, calls `ExecuteOrderUtils`.
7.  `ExecuteOrderUtils` pulls funds from `OrderVault`, uses calculation Utils (reading Oracle prices), and calls:
    *   `IncreasePositionUtils` (for opening/increasing positions) OR
    *   `DecreasePositionUtils` (for closing/decreasing positions) OR
    *   `SwapUtils` (for swaps).
8.  These Utils update position state in `DataStore` or handle token transfers via the `MarketToken`.
9.  `ExecuteOrderUtils` calls `GasUtils` for fee payment/refund and removes the order from `DataStore`.

### Workflow: Adding Liquidity to the GLV Pool

1.  **User:** Calls `sendWnt` or `sendTokens` on `GlvRouter`, specifying the `GlvVault`. Funds are transferred.
2.  **User:** Calls `createGlvDeposit` on `GlvRouter`.
3.  **`GlvRouter`:** Calls `GlvHandler`.
4.  **`GlvHandler`:** Calls `GlvDepositUtils` (Storage logic).
5.  **`GlvDepositUtils`:** Creates and stores the GLV deposit order in `DataStore`.
6.  **Keeper:** Monitors `DataStore`, detects the order.
7.  **Keeper:** Fetches relevant prices and calls the execution function on `GlvHandler`.
8.  **`GlvHandler`:** Sets Oracle prices and calls `GlvDepositUtils` (Execution logic).
9.  **`GlvDepositUtils`:**
    *   Pulls tokens/fees from `GlvVault`.
    *   Interacts with the underlying `MarketToken` contracts (potentially performing deposits into them, minting Market Tokens).
    *   Mints new `GlvToken`s representing the user's share.
    *   Calls `GasUtils` for fee payment/refund.
    *   Removes the order from `DataStore`.
    *   Transfers the newly minted `GlvToken`s to the user. The `GlvToken` contract now holds the underlying `MarketToken`s.

## Key Architectural Principles and Takeaways

*   **Asynchronicity is Key:** Understand that most user actions merely create requests (orders). Execution happens later, triggered by Keepers using fresh price data.
*   **Routers vs. Handlers:** Routers are user-facing entry points for *creating* orders. Handlers are Keeper-facing entry points for *executing* orders and act as intermediaries during creation.
*   **Utils are the Engine:** The core business logic resides within the various Utils contracts.
*   **Vaults are Buffers:** Vaults decouple fund handling from the asynchronous execution flow, holding assets temporarily.
*   **Keepers are Essential:** The system relies on off-chain Keepers to monitor orders, provide prices, and trigger execution.
*   **Modularity:** The separation into distinct contract types enhances system robustness and understanding.

This overview provides a foundational understanding of the GMX V2 smart contract architecture, highlighting the roles of its key components and the asynchronous nature of its core operations.