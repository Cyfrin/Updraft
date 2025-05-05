# Claim Funding Fees Exercises

In this exercise, you'll learn how to interact with GMX's funding fee system. This exercise focuses on:

1. Checking how much funding fees are claimable for a specific market and token pair
2. Implementing the functionality to claim those funding fees

The exercise starter code is provided in `ClaimFundingFees.sol`.

You won't be able to claim funding fee unless you had a position opened that received funding fees.

However for this exercise, funding fees are manually allocated using Foundry's cheat code.

## Task 1: Get claimable funding fee amount

```solidity
// Task 1 - Get claimable funding fee
function getClaimableAmount(address market, address token)
    external
    view
    returns (uint256)
{}
```

Implement the `getClaimableAmount` function that returns how much funding fees are available to claim for a specific market and token combination:

This function should use the GMX `dataStore` to look up the claimable funding amount for:

- The specified market (e.g., ETH-USDC GM token)
- The specified token (e.g., WETH or USDC)
- The current contract address as the recipient

> Hint - Call `dataStore.getUint` and use `Keys.claimableFundingAmountKey` for the key to read from `dataStore`

## Task 2: Claim funding fees

```solidity
// Task 2 - Claim funding fees
function claimFundingFees() external {}
```

Implement the `claimFundingFees` function that claims all available funding fees for the contract:

This function should:

1. Set up arrays of market addresses and token addresses for which you want to claim fees
2. Call `exchangeRouter.claimFundingFees` function with the appropriate parameters

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/ClaimFundingFees.test.sol -vvv
```
