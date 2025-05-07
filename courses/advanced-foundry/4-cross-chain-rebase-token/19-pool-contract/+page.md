## Enabling Cross-Chain Rebase Tokens with Chainlink CCIP: A Custom Token Pool Guide

This lesson guides you through creating a custom token pool contract using Foundry. This specialized pool will enable your rebase token to leverage Chainlink's Cross-Chain Interoperability Protocol (CCIP) for seamless transfers between different blockchains, specifically utilizing the "Burn & Mint" mechanism. Our primary objective is to allow users to send your custom rebase token from a source chain to a destination chain, ensuring its unique properties, like user-specific interest rates, are preserved.

## Understanding Chainlink CCIP and the Cross-Chain Token (CCT) Standard

Chainlink CCIP is a powerful protocol designed to facilitate the secure and reliable transfer of both tokens and arbitrary messages across various blockchain networks. To make a token compatible with CCIP, it generally needs to adhere to the Cross-Chain Token (CCT) standard. For comprehensive details, the official Chainlink documentation at `docs.chain.link/ccip` is an invaluable resource.

This lesson focuses on the "Burn & Mint" mechanism, a common pattern within the CCT standard. Here's how it works:
*   **Sending Tokens:** When tokens are transferred from a source chain, they are "burned" (destroyed) on that chain.
*   **Receiving Tokens:** An equivalent amount of tokens is then "minted" (created) on the destination chain.
*   **Returning Tokens:** The process reverses if the tokens are bridged back to the original chain – they are burned on the current chain and minted on the original chain.

To follow along with a practical implementation, the Chainlink documentation provides a relevant tutorial. Navigate to the "CCIP Guides" section, then to "Cross-Chain Token (CCT) Tutorials." We'll be drawing concepts from the "Enable your tokens in CCIP (Burn & Mint): Register from an EOA using Foundry" tutorial.

## Why a Custom Token Pool is Necessary for Rebase Tokens

Standard token pool implementations provided by CCIP are excellent for many ERC20 tokens. However, tokens with unique mechanics, such as rebase tokens, often require custom handling. Rebase tokens adjust their supply based on certain conditions, and often, user-specific data (like an individual's accrued interest rate) needs to be accurately propagated during a cross-chain transfer.

A **custom token pool** allows us to embed this specialized logic. For our rebase token, the critical piece of information to pass cross-chain is the user's current interest rate. This ensures that when tokens are minted on the destination chain, they reflect the user's correct rebase status. The "Concepts" section under "Cross-Chain Token (CCT) standard" in the Chainlink documentation further elaborates on "Custom Token Pools" and their use cases, including for rebasing tokens.

## Inheriting from `TokenPool` for Custom Logic

Chainlink CCIP provides base contracts for token pools. While the documentation might suggest `BurnMintTokenPoolAbstract` for a Burn & Mint scenario, we will opt to inherit directly from the more general `TokenPool` contract.

The reason for this choice is to gain finer-grained control and implement our custom `lockOrBurn` and `releaseOrMint` logic more directly. This approach is better suited for integrating the specific requirements of our rebase token. The `TokenPool.sol` contract, which serves as our base, can be found in the `smartcontractkit/ccip` GitHub repository (e.g., `https://github.com/smartcontractkit/ccip/blob/ccip-1.5.1/contracts/src/v0.8/ccip/pools/TokenPool.sol`).

## Setting Up Your `RebaseTokenPool.sol` Contract

Let's begin by setting up our Foundry project and creating the initial `RebaseTokenPool.sol` contract.

### Dependency Installation

First, we need to install the Chainlink CCIP contracts as a dependency in our Foundry project. Open your terminal and run:

```bash
forge install smartcontractkit/ccip@v2.17.0-ccip1.5.12 --no-commit
```
*Note: It's crucial to use the correct version tag. The tag `v2.17.0-ccip1.5.12` is confirmed to work for this implementation.*

### Configuring Remappings

To simplify import paths in our Solidity code, we'll add remappings to `foundry.toml` and `remappings.txt`.

In your `foundry.toml` file, add or update the `remappings` section:
```toml
// foundry.toml
remappings = [
    '@openzeppelin/=lib/openzeppelin-contracts/',
    '@ccip/=lib/ccip/'
]
```

Ensure your `remappings.txt` file (or create it if it doesn't exist) contains:
```
// remappings.txt
@openzeppelin/=lib/openzeppelin-contracts/
@ccip/=lib/ccip/
```

### Initial Contract Code (`RebaseTokenPool.sol`)

Now, create a new file named `RebaseTokenPool.sol` (e.g., in your `src` directory) and add the following initial code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {TokenPool} from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {IRebaseToken} from "../../interfaces/IRebaseToken.sol"; // Adjust path if your interface is elsewhere
import {Pool} from "@ccip/contracts/src/v0.8/ccip/libraries/Pool.sol"; // For CCIP structs

contract RebaseTokenPool is TokenPool {
    constructor(
        IERC20 _token,
        address[] memory _allowlist,
        address _rnmProxy,
        address _router
    ) TokenPool(_token, 18, _allowlist, _rnmProxy, _router) {
        // Constructor body (if any additional logic is needed)
    }

    // We will implement lockOrBurn and releaseOrMint functions next
}
```

Let's break down the constructor:
*   It inherits from `TokenPool`.
*   The `TokenPool` base constructor requires:
    *   `_token`: The address of the rebase token this pool will manage.
    *   `localTokenDecimals`: The decimals of the token. Here, it's hardcoded to `18`.
    *   `_allowlist`: An array of addresses permitted to send tokens through this pool.
    *   `_rnmProxy`: The address of the CCIP Risk Management Network (RMN) proxy.
    *   `_router`: The address of the CCIP router contract.
*   We import `IRebaseToken`, which is assumed to be a local interface defining functions specific to your rebase token (like `getUserInterestRate`, `burn`, and `mint` with interest rate).
*   The `Pool` library is imported to use CCIP-defined structs, such as `Pool.LockOrBurnInV1`.

## Implementing the `lockOrBurn` Function

The `lockOrBurn` function is invoked when tokens are being sent *from* the blockchain where this `RebaseTokenPool` contract is deployed. It handles the burning of tokens and prepares data to be sent to the destination chain.

Add the following `lockOrBurn` function to your `RebaseTokenPool.sol` contract:

```solidity
    function lockOrBurn(
        Pool.LockOrBurnInV1 calldata lockOrBurnIn
    ) external override returns (Pool.LockOrBurnOutV1 memory lockOrBurnOut) {
        _validateLockOrBurn(lockOrBurnIn);

        // Decode the original sender's address
        address originalSender = abi.decode(lockOrBurnIn.originalSender, (address));
        
        // Fetch the user's current interest rate from the rebase token
        uint256 userInterestRate = IRebaseToken(address(i_token)).getUserInterestRate(originalSender);

        // Burn the specified amount of tokens from this pool contract
        // CCIP transfers tokens to the pool before lockOrBurn is called
        IRebaseToken(address(i_token)).burn(address(this), lockOrBurnIn.amount);

        // Prepare the output data for CCIP
        lockOrBurnOut = Pool.LockOrBurnOutV1({
            destTokenAddress: getRemoteToken(lockOrBurnIn.remoteChainSelector),
            destPoolData: abi.encode(userInterestRate) // Encode the interest rate to send cross-chain
        });
        // No explicit return statement is needed due to the named return variable
    }
```

Key aspects of `lockOrBurn`:
1.  **Validation:** `_validateLockOrBurn(lockOrBurnIn)`: This is an internal function inherited from `TokenPool`. It performs crucial security and configuration checks (e.g., RMN validation, rate limits) before proceeding.
2.  **Get Original Sender & Interest Rate:**
    *   `lockOrBurnIn.originalSender` is provided as `bytes`. We `abi.decode` it to get the `address` of the user initiating the cross-chain transfer.
    *   We then call `getUserInterestRate(originalSender)` on our rebase token contract (accessed via `i_token`, a state variable from `TokenPool` holding the token's address, cast to `IRebaseToken`) to retrieve the sender's current interest rate.
3.  **Burn Tokens:** `IRebaseToken(address(i_token)).burn(address(this), lockOrBurnIn.amount)`: The specified `lockOrBurnIn.amount` of tokens is burned. Importantly, the tokens are burned from the pool contract's balance (`address(this)`). This is because the CCIP router first transfers the user's tokens *to* this pool contract before `lockOrBurn` is executed.
4.  **Return Data (`lockOrBurnOut`):**
    *   `destTokenAddress`: This is the address of the corresponding token contract on the destination chain. `getRemoteToken()` is a helper function from `TokenPool` that resolves this based on the `lockOrBurnIn.remoteChainSelector`.
    *   `destPoolData`: This is where our custom logic shines. We `abi.encode` the `userInterestRate` and include it in the cross-chain message. This data will be available to the `releaseOrMint` function on the destination chain's pool.

## Implementing the `releaseOrMint` Function

The `releaseOrMint` function is called when tokens are being received *on* the blockchain where this `RebaseTokenPool` contract is deployed (i.e., this pool is acting as the destination pool). It handles minting new tokens for the receiver, incorporating the custom data sent from the source chain.

Add the following `releaseOrMint` function to your `RebaseTokenPool.sol` contract:

```solidity
    function releaseOrMint(
        Pool.ReleaseOrMintInV1 calldata releaseOrMintIn
    ) external override returns (Pool.ReleaseOrMintOutV1 memory /* releaseOrMintOut */) { // Named return optional
        _validateReleaseOrMint(releaseOrMintIn);

        // Decode the user interest rate sent from the source pool
        uint256 userInterestRate = abi.decode(releaseOrMintIn.sourcePoolData, (uint256));
        
        // The receiver address is directly available
        address receiver = releaseOrMintIn.receiver;

        // Mint tokens to the receiver, applying the propagated interest rate
        IRebaseToken(address(i_token)).mint(
            receiver,
            releaseOrMintIn.amount,
            userInterestRate // Pass the interest rate to the rebase token's mint function
        );

        return Pool.ReleaseOrMintOutV1({
            destinationAmount: releaseOrMintIn.amount
        });
    }
```

Key aspects of `releaseOrMint`:
1.  **Validation:** `_validateReleaseOrMint(releaseOrMintIn)`: Similar to its counterpart in `lockOrBurn`, this internal function from `TokenPool` performs necessary security and configuration checks for incoming messages.
2.  **Get User Interest Rate:** `userInterestRate` is retrieved by `abi.decode`ing `releaseOrMintIn.sourcePoolData`. This `sourcePoolData` is the `destPoolData` that was encoded and sent by the `lockOrBurn` function on the source chain.
3.  **Get Receiver:** `releaseOrMintIn.receiver` directly provides the `address` of the intended recipient of the tokens on this destination chain.
4.  **Mint Tokens:** `IRebaseToken(address(i_token)).mint(receiver, releaseOrMintIn.amount, userInterestRate)`:
    *   New tokens are minted for the `receiver`.
    *   The `releaseOrMintIn.amount` dictates how many tokens are minted.
    *   Crucially, the `userInterestRate` received from the source chain is passed to the `mint` function of our `IRebaseToken`. This presumes your rebase token's `mint` function has been modified to accept this `_userInterestRate` parameter, allowing it to correctly initialize or update the user's rebase-specific state. This ensures the user's rebase benefits are maintained cross-chain.
5.  **Return Data:** The function returns a `Pool.ReleaseOrMintOutV1` struct, primarily indicating the `destinationAmount` (the amount of tokens minted).

## Key Considerations and Best Practices

*   **ABI Encoding/Decoding:** When passing structured data like addresses or `uint256` values within the `bytes` fields of CCIP structs (e.g., `originalSender`, `destPoolData`, `sourcePoolData`), `abi.encode` and `abi.decode` are essential for correct data packing and unpacking.
*   **`i_token` Variable:** Remember that `i_token` is a state variable inherited from the `TokenPool` base contract. It stores the `IERC20` address of the token this pool manages. You must cast it to your custom token interface (e.g., `IRebaseToken(address(i_token))`) to call specific functions like `getUserInterestRate`, `burn`, or your custom `mint`.
*   **Understanding Addresses:**
    *   In `lockOrBurn`: Tokens are burned from `address(this)` (the pool contract itself). The `originalSender` is the EOA or contract that initiated the CCIP transfer. The interest rate is fetched for this `originalSender`.
    *   In `releaseOrMint`: Tokens are minted directly to the `receiver` specified in the CCIP message.
*   **CCIP Security Features:** The `_validateLockOrBurn` and `_validateReleaseOrMint` functions from the base `TokenPool` contract are critical. They incorporate essential security checks, including RMN validation and adherence to configured rate limits, safeguarding the token transfer process.
*   **Thorough Testing:** While this lesson focuses on contract implementation, comprehensive testing is paramount. This includes unit tests for individual functions, integration tests to ensure all parts work together, and fork tests to simulate real cross-chain interactions on a local fork of the respective networks.

## Next Steps

With the `RebaseTokenPool.sol` contract implemented, the subsequent steps in making your rebase token fully CCIP-enabled involve:
1.  **Writing Deployment Scripts:** Creating scripts (e.g., using Foundry's scripting capabilities) to deploy your `RebaseToken` and the `RebaseTokenPool` contract on the source and destination chains.
2.  **Interaction Scripts:** Developing scripts to interact with these contracts, specifically to initiate cross-chain transfers.
3.  **Cross-Chain Fork Testing:** Performing thorough tests on local forks of the relevant blockchains to simulate and verify the end-to-end cross-chain transfer process, ensuring the rebase logic and interest rate propagation work as expected.

By following these steps, you can successfully extend the functionality of your rebase token to operate across multiple blockchain environments using the power and security of Chainlink CCIP.