Okay, here is a very thorough and detailed summary of the provided video on GMX V2 contract architecture:

**Video Summary: GMX V2 Contract Architecture Overview**

The video provides a high-level overview of the GMX V2 smart contract architecture using a flowchart diagram. It emphasizes that the diagram shows *some*, not all, of the contracts and interactions, focusing on those essential for understanding the core mechanics of how GMX V2 works.

**Core Concepts and Components:**

1.  **Modular Design:** GMX V2 employs a modular architecture, separating concerns into different types of contracts (Routers, Handlers, Utils, Vaults, Data Storage, Tokens).
2.  **Asynchronous Execution:** User actions (like opening a position or adding liquidity) typically *create an order*. These orders are stored and then executed later by off-chain entities called Keepers, who submit the execution transaction using price data obtained closer to the execution time.
3.  **Keepers:** Off-chain bots responsible for monitoring pending orders and executing them when conditions are met. They are crucial for the system's operation and interact primarily with Handler contracts, providing necessary price data during execution.
4.  **Oracles:** Used to get and temporarily store token prices during the execution phase initiated by Keepers. The Keeper provides the prices, which are set in the Oracle contract, used by Utils contracts for calculations, and then cleared.
5.  **GM Pools (Market Tokens):** Represent the liquidity pools for specific markets (e.g., ETH/USD, BTC/USD). Users deposit collateral into these pools to provide liquidity or to back perpetual swap positions.
6.  **GLV Tokens:** Represent a basket or index of multiple GM Pool (Market Token) liquidity positions. Users can deposit into GLV to get diversified exposure to the underlying market tokens.
7.  **Vaults:** Temporary holding contracts for user funds (tokens and execution fees) before an order is created and executed. This separation helps manage token transfers and fee payments.

**Contract Architecture Breakdown (Based on Video Groupings):**

1.  **User Entry Points (Routers - Far Left & `router` folder):**
    *   **Purpose:** These are the primary contracts users interact with to initiate actions.
    *   `ExchangeRouter`: Handles interactions with the main GM pools.
        *   **Functions Discussed:**
            *   `sendWnt`: Sends Wrapped Native Token (e.g., WETH on Arbitrum) to a vault, usually for execution fees or deposits.
            *   `sendTokens`: Sends specified ERC20 tokens to a vault.
            *   `createDeposit`: Creates an order to add liquidity to a GM pool.
            *   `createWithdrawal`: Creates an order to remove liquidity from a GM pool.
            *   `createShift`: Creates an order to move liquidity between different GM pools.
            *   `createOrder`: Creates an order for opening/closing positions or executing swaps.
            *   `claimFundingFees`: Allows users to claim accrued funding fees on their positions.
        *   **Key Point:** Calls to `createDeposit`, `createWithdrawal`, `createShift`, `createOrder` *do not* execute the action immediately. They create an order request that is stored for later Keeper execution.
    *   `GlvRouter`: Handles interactions specifically for adding/removing liquidity to the GLV pools.
        *   **Functions Discussed:**
            *   `createGlvDeposit`: Creates an order to add liquidity to the GLV pool.
            *   `createGlvWithdrawal`: Creates an order to remove liquidity from the GLV pool.
        *   **Prerequisite:** Users must first use `sendWnt` or `sendTokens` via this router to deposit the required tokens and execution fee into the `GlvVault` before calling these create functions.

2.  **Handlers (Middle-Left Group):**
    *   **Purpose:** Act as intermediary contracts. They are called by Routers to *create* orders and by Keepers to *execute* orders. They validate inputs and route calls to the appropriate Utils contracts.
    *   **Naming Convention:** Contracts typically end with `Handler`.
    *   **Examples:** `DepositHandler`, `WithdrawalHandler`, `ShiftHandler`, `OrderHandler`, `LiquidationHandler`, `GlvHandler`.
    *   **Flow (Order Creation):** Router -> Handler -> Utils (stores order in DataStore).
    *   **Flow (Order Execution):** Keeper -> Handler -> Utils (executes logic).

3.  **Utils (Logic Core - Middle & Middle-Right Groups):**
    *   **Purpose:** Contain the core business logic for processing actions and executing orders.
    *   **Naming Convention:** Contracts typically end with `Utils`.
    *   **Storage Utils:**
        *   `DepositUtils`, `WithdrawalUtils`, `ShiftUtils`, `OrderUtils`, `GlvDepositUtils`, `GlvWithdrawalUtils`: Primarily responsible for creating and storing the specific order types in the `DataStore`.
    *   **Execution Utils:**
        *   `ExecuteDepositUtils`, `ExecuteWithdrawalUtils`, `ExecuteOrderUtils`, etc.: Contain the logic to actually perform the action (e.g., mint/burn market tokens, update positions, transfer tokens) when called by a Keeper via a Handler.
    *   **Position/Swap Execution Utils:**
        *   `ExecuteOrderUtils` calls into more specific Utils:
            *   `IncreasePositionUtils`: Handles logic for opening or increasing the size of positions.
            *   `DecreasePositionUtils`: Handles logic for closing or decreasing the size of positions.
            *   `SwapUtils`: Handles the logic and token transfers for swaps.

4.  **Core Calculation / State Utils (Far Right Group):**
    *   **Purpose:** Provide essential calculations and access shared state needed by various Utils contracts during execution.
    *   **Examples:**
        *   `MarketUtils`: Logic related to market parameters.
        *   `PositionUtils`: Logic related to position state and calculations.
        *   `SwapPricingUtils`: Calculates pricing for swaps.
        *   `PositionPricingUtils`: Calculates pricing, PnL, and fees for positions.
    *   **Interaction:** These are frequently called by the execution Utils (`ExecuteDepositUtils`, `ExecuteOrderUtils`, etc.).

5.  **Data Storage (Far Right):**
    *   `DataStore`: A central contract for storing persistent state, notably pending orders and active positions. It's read from and written to by various Utils contracts.

6.  **Vaults (Bottom Left):**
    *   **Purpose:** Temporarily hold user funds (tokens + execution fees) between the user sending funds and the Keeper executing the corresponding order.
    *   **Examples:** `OrderVault`, `DepositVault`, `WithdrawalVault`, `GlvVault`.
    *   **Flow:** When a user calls `sendWnt` or `sendTokens`, the funds go to the appropriate vault. When the Keeper executes the order, the corresponding `Execute...Utils` contract pulls the necessary tokens/fees from the vault.

7.  **Tokens (Bottom Middle/Right):**
    *   `MarketToken`: Represents a specific GM liquidity pool (e.g., ETH/USD). It controls the underlying long and short tokens (e.g., WETH and USDC). It is minted to liquidity providers and burned upon withdrawal. Positions also interact with these tokens.
    *   Underlying Tokens (`WETH`, `WBTC`, `GMX`, `USDC`): The actual assets held within the Market Tokens.
    *   `GlvToken`: Represents shares in a basket of different `MarketToken`s. It holds the `MarketToken`s as its underlying assets. Minted/burned when users add/remove liquidity via `GlvRouter`.

8.  **Fee Handling (Bottom Middle):**
    *   `GasUtils`: Handles the payment of execution fees.
    *   **Flow:** When a Keeper executes an order, the `Execute...Utils` contract calls `GasUtils`. `GasUtils` retrieves the pre-paid execution fee from the corresponding Vault, pays the Keeper, and refunds any leftover amount to the user who created the order.

**Key Workflows / Use Cases Mentioned:**

1.  **Adding Liquidity (GM Pool):**
    *   User calls `sendWnt`/`sendTokens` on `ExchangeRouter` (funds go to `DepositVault`).
    *   User calls `createDeposit` on `ExchangeRouter`.
    *   `DepositHandler` is called, which calls `DepositUtils`.
    *   `DepositUtils` stores the deposit order in `DataStore`.
    *   Keeper monitors `DataStore`, sees the order.
    *   Keeper calls `executeDeposit` (or similar) on `DepositHandler`, providing current prices.
    *   `DepositHandler` sets prices in `Oracle` and calls `ExecuteDepositUtils`.
    *   `ExecuteDepositUtils` gets tokens/fees from `DepositVault`, interacts with `MarketToken` (mints market tokens), calls `MarketUtils`/`PositionPricingUtils` for calculations, removes order from `DataStore`, calls `GasUtils` to pay Keeper/refund user. Market tokens are sent to the user.
2.  **Opening a Position:**
    *   Similar flow to adding liquidity, but uses `createOrder`, `OrderHandler`, `OrderUtils`, `ExecuteOrderUtils`, `IncreasePositionUtils`. Tokens are taken from `OrderVault`. Position state is updated in `DataStore`.
3.  **Swap:**
    *   Similar flow, uses `createOrder`, `OrderHandler`, `OrderUtils`, `ExecuteOrderUtils`, `SwapUtils`. Tokens are taken from `OrderVault`, swapped within the `MarketToken`, output tokens transferred via `SwapUtils`.
4.  **Adding Liquidity (GLV Pool):**
    *   User calls `sendWnt`/`sendTokens` on `GlvRouter` (funds go to `GlvVault`).
    *   User calls `createGlvDeposit` on `GlvRouter`.
    *   `GlvHandler` is called, calls `GlvDepositUtils` to store order in `DataStore`.
    *   Keeper executes via `GlvHandler`, sets Oracle prices, calls `GlvDepositUtils` (execution logic).
    *   `GlvDepositUtils` gets tokens/fees from `GlvVault`, deposits them into the underlying `MarketToken`s (minting Market Tokens), mints `GlvToken` representing these Market Tokens, pays Keeper/refunds user via `GasUtils`. The `GlvToken` now holds the `MarketToken`s, and the user receives the `GlvToken`.

**Important Notes/Tips:**

*   The architecture is complex, and this diagram is a simplification.
*   Understand the difference between *creating* an order (user action via Router) and *executing* an order (Keeper action via Handler).
*   Vaults are crucial temporary holding places for funds before execution.
*   Handlers are the entry points for Keepers and link Routers to the core logic (Utils).
*   Utils contain the main business logic and interact with `DataStore`, `Oracle`, `MarketToken`, `Vaults`, and `GasUtils`.
*   Keepers provide the necessary off-chain price information at the time of execution.

This summary covers the key contracts, concepts, and flows presented in the video diagram and narration.