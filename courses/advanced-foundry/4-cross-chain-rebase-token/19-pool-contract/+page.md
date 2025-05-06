## Implementing a Custom CCIP Burn and Mint Token Pool

This lesson guides you through creating a custom Chainlink Cross-Chain Interoperability Protocol (CCIP) token pool contract. Specifically, we'll focus on implementing the "Burn and Mint" mechanism for a custom token (like a rebasing token) that requires transferring additional data, such as a user-specific interest rate, across chains.

**Understanding the Core Concepts**

Before diving into the code, let's clarify the key components involved:

1.  **Chainlink CCIP:** The underlying protocol enabling secure communication and token transfers between different blockchains.
2.  **Cross-Chain Token (CCT) Standard:** A set of interfaces and contracts provided by Chainlink to standardize the creation of cross-chain tokens. We will adhere to this standard.
3.  **Burn and Mint Mechanism:** A specific token transfer strategy within the CCT standard. When tokens move from Chain A to Chain B, they are burned (destroyed) on Chain A by its token pool and subsequently minted (created) on Chain B by its respective token pool. The process reverses for transfers from B to A.
4.  **Token Pool Contract:** A mandatory contract deployed on each participating chain for a specific token. It manages the logic for locking/burning tokens on the source chain and releasing/minting them on the destination chain.
5.  **Custom Token Pool Necessity:** While Chainlink provides standard token pool implementations for basic ERC20 transfers, they don't support sending extra data alongside the tokens. For tokens with unique logic, like a rebasing token needing to preserve user interest rates across chains, a *custom* token pool is essential. This custom pool allows us to embed and extract additional data within the CCIP message.

**Inheritance Strategy: Why `TokenPool`?**

Chainlink offers base contracts like `TokenPool` and more specialized ones like `BurnMintTokenPoolAbstract`. `BurnMintTokenPoolAbstract` simplifies implementation by requiring you mainly to override the `_burn` function.

However, our specific use case requires custom logic not only when *sending* tokens (burning and packaging the interest rate) but also when *receiving* them (minting with the correct interest rate). Therefore, we need to customize both the `lockOrBurn` and `releaseOrMint` functions. The most direct way to achieve this is by inheriting directly from the fundamental `TokenPool` contract and overriding its relevant virtual functions.

**Implementation: `RebaseTokenPool.sol`**

Let's build the `RebaseTokenPool` contract using Foundry.

**1. Dependencies and Setup**

First, install the necessary Chainlink CCIP contracts. It's crucial to use the specific version tag mentioned, as interfaces can change:

```bash
forge install smartcontractkit/ccip@v2.17.0-ccip1.5.12 --no-commit
```

Next, add the remapping to your `foundry.toml` and `remappings.txt`:

```
@ccip/=lib/ccip/
```

**2. Imports**

Import the required contracts and interfaces. Note the importance of using the `IERC20` interface vendored within the CCIP library to avoid potential dependency conflicts:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TokenPool} from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
import {Pool} from "@ccip/contracts/src/v0.8/ccip/libraries/Pool.sol"; // For CCIP message structs
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol"; // Use CCIP's vendored version
import {IRebaseToken} from "./interfaces/IRebaseToken.sol"; // Assuming local interface definition
```

*(Note: Ensure `IRebaseToken.sol` interface is defined, containing at least `burn(address from, uint256 amount)`, `mint(address to, uint256 amount, uint256 userInterestRate)`, and `getUserInterestRate(address user)`).*

**3. Contract Definition and Constructor**

Define the contract inheriting from `TokenPool` and implement the constructor to initialize the base contract:

```solidity
contract RebaseTokenPool is TokenPool {

    constructor(
        IERC20 _token,
        address[] memory _allowlist, // Typically empty: new address[](0) to allow anyone
        address _rmnProxy,          // Risk Management Network proxy address
        address _router             // CCIP Router address
    )
        TokenPool(
            _token,                // The custom token this pool manages
            18,                    // Local token decimals (hardcoded assuming 18)
            _allowlist,            // Addresses allowed to use the pool (empty means permissionless)
            _rmnProxy,
            _router
        )
    {}

    // ... overridden functions below ...
}
```

**4. Overriding `lockOrBurn`**

This function is executed by the CCIP Router on the *source chain* when initiating a cross-chain transfer. We override it to burn the tokens and package the user's interest rate into the CCIP message.

```solidity
    /**
     * @notice Called by the CCIP Router on the source chain to lock or burn tokens.
     * Overridden to handle burning and sending the user's interest rate.
     * @param lockOrBurnIn Input parameters from the CCIP Router.
     * @return lockOrBurnOut Output parameters including encoded pool data.
     */
    function lockOrBurn(
        Pool.LockOrBurnInV1 calldata lockOrBurnIn
    )
        external
        override
        returns (Pool.LockOrBurnOutV1 memory lockOrBurnOut)
    {
        // --- 1. Validation (Mandatory) ---
        // Performs essential security checks, including RMN interaction.
        _validateLockOrBurn(lockOrBurnIn);

        // --- 2. Decode Sender ---
        // Get the address of the user who initiated the transfer on this chain.
        address originalSender = abi.decode(lockOrBurnIn.originalSender, (address));

        // --- 3. Get Custom Data (Interest Rate) ---
        // Fetch the user's interest rate from the rebase token contract.
        uint256 userInterestRate = IRebaseToken(address(i_token)).getUserInterestRate(originalSender);

        // --- 4. Burn Tokens ---
        // Burn the specified amount from *this* pool contract.
        // CCIP transfers tokens from the user to the pool *before* calling this function.
        IRebaseToken(address(i_token)).burn(address(this), lockOrBurnIn.amount);

        // --- 5. Prepare Output ---
        // a. Get the address of the token contract on the destination chain.
        lockOrBurnOut.destTokenAddress = getRemoteToken(lockOrBurnIn.remoteChainSelector);

        // b. ABI-encode the interest rate to be sent in the CCIP message.
        // This data will be available in `releaseOrMintIn.sourcePoolData` on the destination chain.
        lockOrBurnOut.destPoolData = abi.encode(userInterestRate);

        // Implicit return because `lockOrBurnOut` is a named return variable.
    }
```

**5. Overriding `releaseOrMint`**

This function is executed by the CCIP Router on the *destination chain* upon receiving a CCIP message. We override it to decode the interest rate from the message and mint tokens accordingly.

```solidity
    /**
     * @notice Called by the CCIP Router on the destination chain to release or mint tokens.
     * Overridden to handle minting with the user's interest rate received from the source chain.
     * @param releaseOrMintIn Input parameters from the CCIP Router, including source pool data.
     * @return ReleaseOrMintOutV1 Output parameters specifying the amount minted.
     */
    function releaseOrMint(
        Pool.ReleaseOrMintInV1 calldata releaseOrMintIn
    )
        external
        override
        returns (Pool.ReleaseOrMintOutV1 memory /* releaseOrMintOut */ ) // Explicit return needed here
    {
        // --- 1. Validation (Mandatory) ---
        // Performs essential security checks.
        _validateReleaseOrMint(releaseOrMintIn);

        // --- 2. Decode Custom Data (Interest Rate) ---
        // Decode the interest rate sent from the source chain's pool via `destPoolData`.
        uint256 userInterestRate = abi.decode(releaseOrMintIn.sourcePoolData, (uint256));

        // --- 3. Decode Receiver ---
        // Get the final recipient address on this destination chain.
        address receiver = abi.decode(releaseOrMintIn.receiver, (address));

        // --- 4. Mint Tokens ---
        // Mint the equivalent amount of tokens *to the receiver*, providing the
        // decoded interest rate required by our custom rebase token.
        IRebaseToken(address(i_token)).mint(receiver, releaseOrMintIn.amount, userInterestRate);

        // --- 5. Prepare and Return Output ---
        // Specify the amount of tokens successfully minted on the destination chain.
        return Pool.ReleaseOrMintOutV1({destinationAmount: releaseOrMintIn.amount});
    }
}
```

**Key Considerations and Best Practices**

*   **Dependency Versioning:** Always pin the exact `smartcontractkit/ccip` version used during development. CCIP is evolving, and breaking changes can occur between versions.
*   **`IERC20` Import:** Strictly use the `IERC20` interface provided within the `ccip/contracts/src/v0.8/vendor` directory to prevent compiler version or dependency conflicts with other libraries like a standalone OpenZeppelin installation.
*   **Burn Logic:** Remember that in the Burn & Mint pattern implemented via `TokenPool`, the `burn` call within `lockOrBurn` must target `address(this)`. The CCIP Router ensures the tokens are transferred from the user to the pool contract *before* `lockOrBurn` is invoked.
*   **Data Flow:** The custom data (interest rate) is fetched on the source chain (`lockOrBurn`), `abi.encode`d into `destPoolData`, transmitted via CCIP, and then `abi.decode`d from `sourcePoolData` on the destination chain (`releaseOrMint`).
*   **Validation is Crucial:** Never omit the `_validateLockOrBurn` and `_validateReleaseOrMint` calls at the beginning of your overridden functions. They perform vital security checks, including rate limiting and other measures enforced by the Risk Management Network (RMN).
*   **ABI Encoding/Decoding:** Use `abi.encode` for packaging data into `bytes` and `abi.decode` for unpacking `bytes` into specific types (like `address` or `uint256`). Ensure the types match during encoding and decoding.
*   **Testing:** Thoroughly test your custom pool. This includes unit tests for individual functions, integration tests with your custom token, and ideally, fork tests to simulate cross-chain interactions on testnets like Sepolia.

By following these steps, you can successfully implement a custom CCIP token pool that leverages the Burn and Mint mechanism while securely transferring additional token-specific data across blockchains.