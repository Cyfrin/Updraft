## Enabling Cross-Chain Rebasing Tokens with Custom CCIP Pools

This lesson guides you through creating a custom Chainlink Cross-Chain Interoperability Protocol (CCIP) Token Pool smart contract using the Foundry development framework. The goal is to enable a custom rebasing token to function cross-chain, specifically addressing the challenge of preserving user-specific data, like interest rates, during the transfer process. We will focus on the Burn and Mint mechanism provided by CCIP.

### Understanding the Core Concepts

Before diving into the code, let's clarify the key components involved:

1.  **Chainlink CCIP (Cross-Chain Interoperability Protocol):** The underlying infrastructure that securely facilitates the transfer of tokens and arbitrary messages between different blockchains. Our custom pool will leverage CCIP for its cross-chain capabilities.
2.  **Cross-Chain Token (CCT) Standard:** A Chainlink standard defining how tokens can be made interoperable across different chains using CCIP. This typically involves deploying the token contract and associated token pool contracts on each supported chain.
3.  **Token Pool Contract:** A smart contract deployed on a specific chain, associated with a particular token. It manages the logic for handling cross-chain transfers initiated via CCIP. For tokens leaving the chain, it locks or burns them. For tokens arriving, it releases or mints them.
4.  **Burn and Mint Mechanism:** A specific CCT pattern where tokens sent from a source chain are destroyed (burned) by the source pool, and an equivalent amount is created (minted) by the destination pool. This ensures the token's total supply remains consistent across all integrated chains. This lesson focuses on implementing this mechanism.
5.  **Custom Token Pool:** While Chainlink provides standard pool implementations, they don't support passing arbitrary data alongside token transfers. For tokens with unique logic, like our rebasing token requiring interest rate data, a *custom* pool is necessary. This allows us to tailor the lock/burn and release/mint logic.
6.  **Pool Data (`destPoolData` / `sourcePoolData`):** Specific fields within the CCIP message structures designed to carry arbitrary `bytes` data between pools during a cross-chain transfer. We will use these fields to transmit the user's interest rate.
7.  **Foundry:** A popular and fast toolkit for Ethereum application development, used here for compiling, testing, and managing dependencies like the CCIP contracts.
8.  **`TokenPool.sol`:** The abstract base contract provided within the Chainlink CCIP smart contract library. Custom token pools must inherit from this contract and implement its required abstract functions.
9.  **`IPoolV1` Interface:** Defines the external functions (`lockOrBurn`, `releaseOrMint`) that all token pool contracts must implement to be compatible with the CCIP Router.
10. **CCIP Structs (`Pool.sol` library):** Predefined data structures (e.g., `LockOrBurnInV1`, `ReleaseOrMintInV1`) used by CCIP to pass information between the user, the Router, and the Token Pool during cross-chain operations.
11. **ABI Encoding/Decoding:** Standard methods for converting structured data (like addresses or numbers) into a `bytes` format suitable for transmission (encoding) and converting `bytes` back into structured data (decoding). Essential for using the `poolData` fields.
12. **Risk Management Network (RMN):** A crucial security component of CCIP, acting as an independent network that validates cross-chain transactions, preventing issues like replay attacks or malicious activity. The pool needs the address of the RMN proxy.
13. **Router Contract:** The primary CCIP contract on each chain that users interact with to initiate transfers and that calls the appropriate Token Pool contract functions. The pool needs the Router's address.
14. **Rebasing Token:** A token whose balance automatically adjusts over time based on a predefined mechanism (like an interest rate), without requiring explicit transfer transactions. This characteristic necessitates the custom pool logic to handle the interest rate correctly during cross-chain transfers.

### Implementing the Custom Rebasing Token Pool

We will now build the `RebaseTokenPool.sol` contract.

**1. Project Setup and Dependencies**

First, ensure you have Foundry installed. Then, install the necessary Chainlink CCIP contracts using the specific version tag recommended for compatibility (as versions can introduce changes):

```bash
# Ensure you are using the correct version as per CCIP documentation/tutorials
forge install smartcontractkit/ccip@v2.17.0-ccip1.5.12 --no-commit
```

Next, configure path remappings in your `foundry.toml` or `remappings.txt` file to simplify imports:

```
# foundry.toml or remappings.txt
@ccip/=lib/ccip/
```

**2. Contract Definition and Inheritance**

Create your `RebaseTokenPool.sol` file. Import the required contracts and define your custom pool inheriting from `TokenPool`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TokenPool} from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
import {Pool} from "@ccip/contracts/src/v0.8/ccip/libraries/Pool.sol";
import {IPoolV1} from "@ccip/contracts/src/v0.8/ccip/interfaces/IPoolV1.sol"; // Explicit import for clarity
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol"; // Use version compatible with CCIP contracts

// Assume an interface for your custom Rebasing Token exists
interface IRebaseToken is IERC20 {
    function burn(address _from, uint256 _amount) external;
    function mint(address _to, uint256 _amount, uint256 _interestRate) external;
    function getUserInterestRate(address _account) external view returns (uint256);
}

contract RebaseTokenPool is TokenPool {
    // Constructor and functions follow
}
```

**3. Constructor**

The constructor initializes the base `TokenPool` contract. It requires the address of the rebasing token (`_token`), an optional allowlist (can be empty), the RMN proxy address (`_rmnProxy`), and the CCIP Router address (`_router`). We hardcode the token decimals (assuming 18).

```solidity
    constructor(
        address _token, // Use address type for flexibility, cast later
        address[] memory _allowlist,
        address _rmnProxy,
        address _router
    )
        TokenPool(IERC20(_token), 18, _allowlist, _rmnProxy, _router)
    {
        // No additional custom initialization needed here for this example
    }
```

**4. Implementing `lockOrBurn`**

This function is called by the CCIP Router when tokens are being sent *from* the chain where this pool is deployed. It needs to burn the tokens and prepare data to be sent to the destination chain, including the user's interest rate.

```solidity
    /**
     * @notice Called by the CCIP Router when initiating a cross-chain transfer FROM this chain.
     * Burns tokens locally and prepares data (including interest rate) for the destination chain.
     */
    function lockOrBurn(Pool.LockOrBurnInV1 calldata lockOrBurnIn)
        external
        override // Explicitly mark as overriding the base function
        onlyRouter // Ensure only the CCIP Router can call this
        returns (Pool.LockOrBurnOutV1 memory lockOrBurnOut) // Named return variable
    {
        // 1. Perform essential security checks from the base contract
        _validateLockOrBurn(lockOrBurnIn);

        // 2. Decode the original sender's address
        // The original sender initiated the transfer on the source chain.
        address originalSender = abi.decode(lockOrBurnIn.originalSender, (address));

        // 3. Get the user's current interest rate from the Rebasing Token contract
        // We need to cast the stored IERC20 token address (i_token) to our custom interface
        // Requires intermediate cast to address
        IRebaseToken rebaseToken = IRebaseToken(address(i_token));
        uint256 userInterestRate = rebaseToken.getUserInterestRate(originalSender);

        // 4. Burn the specified amount of tokens FROM THE POOL'S BALANCE
        // IMPORTANT: CCIP transfers tokens *to* the pool *before* calling lockOrBurn.
        // The pool must burn tokens it now holds.
        rebaseToken.burn(address(this), lockOrBurnIn.amount);

        // 5. Prepare the output data for CCIP
        lockOrBurnOut = Pool.LockOrBurnOutV1({
            // Get the address of the corresponding token contract on the destination chain
            destTokenAddress: getRemoteToken(lockOrBurnIn.remoteChainSelector),
            // ABI encode the user's interest rate to send it cross-chain
            destPoolData: abi.encode(userInterestRate)
        });

        // Implicit return because `lockOrBurnOut` is assigned.
    }
```

**5. Implementing `releaseOrMint`**

This function is called by the CCIP Router when tokens are arriving *to* the chain where this pool is deployed. It needs to decode the interest rate sent from the source chain and mint the appropriate amount of tokens to the receiver, incorporating the rate.

```solidity
    /**
     * @notice Called by the CCIP Router when finalizing a cross-chain transfer TO this chain.
     * Decodes interest rate from source chain data and mints tokens to the receiver.
     */
    function releaseOrMint(Pool.ReleaseOrMintInV1 calldata releaseOrMintIn)
        external
        override // Explicitly mark as overriding the base function
        onlyRouter // Ensure only the CCIP Router can call this
        returns (Pool.ReleaseOrMintOutV1 memory) // Return type specification
    {
        // 1. Perform essential security checks from the base contract
        _validateReleaseOrMint(releaseOrMintIn);

        // 2. Decode the user's interest rate from the incoming poolData
        // This data was encoded in `destPoolData` by the source chain's `lockOrBurn` function.
        uint256 userInterestRate = abi.decode(releaseOrMintIn.sourcePoolData, (uint256));

        // 3. Mint tokens to the final receiver using the custom mint function
        // Cast the token address to our custom interface to call the specific mint function.
        IRebaseToken rebaseToken = IRebaseToken(address(i_token));
        rebaseToken.mint(
            releaseOrMintIn.receiver,     // The final recipient address
            releaseOrMintIn.amount,       // The amount transferred
            userInterestRate              // The interest rate from the source chain
        );

        // 4. Return the amount that was successfully minted
        // In this simple case, it's the same as the input amount.
        return Pool.ReleaseOrMintOutV1({
            destinationAmount: releaseOrMintIn.amount
        });
    }

```

**6. Supporting Contract Modifications**

For this pool to work, your actual `RebaseToken.sol` contract and its interface (`IRebaseToken.sol`) must be updated:

*   **`IRebaseToken.sol`:** Needs the functions used by the pool:
    *   `function burn(address _from, uint256 _amount) external;`
    *   `function mint(address _to, uint256 _amount, uint256 _interestRate) external;`
    *   `function getUserInterestRate(address _account) external view returns (uint256);`
*   **`RebaseToken.sol`:** The implementation of the `mint` function must be modified to accept the `_interestRate` parameter and use it appropriately when calculating the user's balance or setting their rate upon receiving tokens cross-chain. The `burn` function must allow burning from an approved address (the pool). The `getUserInterestRate` function must correctly return the rate for a given account.

### Key Considerations and Best Practices

*   **Custom Data Transmission:** The core reason for a custom pool is to pass extra data (`userInterestRate` here) using the `destPoolData` (on send) and `sourcePoolData` (on receive) fields via ABI encoding/decoding.
*   **Burn Address:** In Burn & Mint pools, remember that the CCIP Router first transfers tokens *to* the pool. Therefore, the `lockOrBurn` function must burn tokens from `address(this)`.
*   **Interface Casting:** When calling functions specific to your custom token (`IRebaseToken`) using the stored `i_token` variable (which is `IERC20`), you must cast it via `address`: `IRebaseToken(address(i_token))`.
*   **CCIP Versioning:** Always use the CCIP contract version specified in official documentation or tutorials (`v2.17.0-ccip1.5.12` in the example source) to avoid compatibility issues.
*   **Foundry Remappings:** Proper remappings simplify imports and project structure.
*   **Struct Initialization:** Using named members (`{ memberName: value, ... }`) when creating structs like `LockOrBurnOutV1` enhances code readability.
*   **Validation Hooks:** Crucially, always call `_validateLockOrBurn` and `_validateReleaseOrMint` at the start of your respective function implementations. These inherited functions perform vital security checks.
*   **Data Flow:** Understand the data flow: `lockOrBurn` reads the *sender's* rate locally and encodes it. `releaseOrMint` decodes this rate received from the *source* chain and applies it during minting for the *receiver*.

### Conclusion

By implementing a custom `TokenPool` contract inheriting from Chainlink's base `TokenPool.sol`, you can extend CCIP's functionality to support tokens with unique cross-chain requirements. This example demonstrated how to handle a rebasing token by passing the user's interest rate within the CCIP message payload using `poolData` fields and ABI encoding. This ensures that when tokens arrive on a destination chain via the Burn and Mint mechanism, they are minted reflecting the user's state from the source chain, enabling seamless cross-chain operation for complex token types.