## Writing Your First Rebase Token in Solidity

Welcome to this lesson where we'll dive into the practical aspects of creating a `RebaseToken` using Solidity. This type of token is designed with an ERC20 foundation but includes a rebase mechanism, allowing a user's balance to increase over time based on a set interest rate. We'll cover setting up the basic ERC20 structure, introducing global and user-specific interest rates, dynamically calculating balances to reflect accrued interest, and minting this interest when users interact with the contract.

## Initial Project Setup and Contract Definition

Let's begin by setting up our Solidity file and defining the basic contract structure.

First, create a new Solidity file named `RebaseToken.sol` within your project's `src` directory.

Every Solidity file should start with an SPDX license identifier and a pragma directive specifying the compiler version. For this project, we'll use the MIT license and Solidity version `0.8.24` or compatible patch versions.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```
The `SPDX-License-Identifier` is standard practice for open-source contracts, clearly stating how others can use your code. The `pragma solidity ^0.8.24;` line instructs the compiler on which Solidity version the code is written for, ensuring compatibility and access to specific language features. The caret (`^`) allows for compiler versions from `0.8.24` up to, but not including, `0.9.0`.

Now, let's define the basic shell for our contract:

```solidity
contract RebaseToken {

}
```

## Integrating OpenZeppelin's ERC20 Standard

To avoid reinventing the wheel and to leverage well-audited, secure code, we'll build our `RebaseToken` on top of OpenZeppelin's standard ERC20 implementation. This is a common best practice in smart contract development.

We'll use Foundry to manage our dependencies. To install OpenZeppelin Contracts, navigate to their GitHub repository (e.g., `https://github.com/OpenZeppelin/openzeppelin-contracts`) to find the latest stable version. For this lesson, we'll use version `v5.1.0`. It's crucial to pin dependency versions to ensure reproducible builds.

Run the following Foundry command in your terminal:

```bash
forge install openzeppelin/openzeppelin-contracts@v5.1.0 --no-commit
```
The `forge install` command adds the OpenZeppelin library as a submodule to your project. The `@v5.1.0` part pins it to that specific version. The `--no-commit` flag is used here to prevent Foundry from automatically committing the submodule changes, which is useful if you have uncommitted changes in your local repository.

Next, import the `ERC20` contract into your `RebaseToken.sol` file. We'll use a named import, which is preferred as it only brings the necessary components into your contract's scope:

```solidity
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

To enable the Solidity compiler to resolve the `@openzeppelin/` import path, you need to add a remapping to your `foundry.toml` file. This makes your import paths cleaner and more portable.

```toml
remappings = [
    "@openzeppelin/=lib/openzeppelin-contracts/"
]
```
After adding the remapping, you can run `forge build` to confirm that the setup is correct and the compiler can find the OpenZeppelin contracts.

## Structuring the Basic RebaseToken

With OpenZeppelin integrated, we can now define the `RebaseToken` contract to inherit from `ERC20`.

Modify your contract definition as follows:

```solidity
contract RebaseToken is ERC20 {
    // ...
}
```

Next, we'll add a constructor. The constructor for `RebaseToken` must call the parent `ERC20` constructor, providing the token's name and symbol.

```solidity
constructor() ERC20("Rebase Token", "RBT") {
    // We will handle initial minting later, so this remains empty for now.
}
```

## Documenting with NatSpec Comments

Clear documentation is vital for smart contract development. Solidity supports the Ethereum Natural Language Specification Format (NatSpec) for this purpose. Good NatSpec comments make your contract easier to understand, integrate with, and can also help AI code assistants provide better suggestions.

Let's add NatSpec comments to our `RebaseToken` contract:

```solidity
/**
 * @title RebaseToken
 * @author Your Name/Alias
 * @notice This is a cross-chain rebase token that incentivises users to deposit into a vault and gain interest in rewards.
 * @notice The interest rate in the smart contract can only decrease.
 * @notice Each user will have their own interest rate that is the global interest rate at the time of deposit.
 */
contract RebaseToken is ERC20 {
    // ... constructor and other code ...
}
```

## Implementing Interest Rate Logic

Now, let's introduce the core mechanics for handling interest rates.

**State Variables for Interest Calculation:**

We need several state variables to manage interest:

1.  `PRECISION_FACTOR`: A constant to handle decimal precision. Solidity doesn't have native floating-point numbers, so we use integers and scale them. `1e18` (1 followed by 18 zeros) is commonly used to represent 1 or 100% with 18 decimal places of precision.

    ```solidity
    uint256 private constant PRECISION_FACTOR = 1e18;
    ```

2.  `s_interestRate`: This will store the global interest rate per second for the contract. The `s_` prefix is a common convention for storage variables. Let's initialize it to `5e10`. If `1e18` represents 100%, then `5e10` represents a rate of `(5e10 / 1e18) = 0.00000005` or `0.000005%` per second.

    ```solidity
    uint256 private s_interestRate = 5e10;
    ```

3.  `s_userInterestRate`: A mapping to store the specific interest rate "locked in" for each user when they first interact (e.g., mint tokens).

    ```solidity
    mapping(address => uint256) private s_userInterestRate;
    ```

4.  `s_userLastUpdatedTimestamp`: A mapping to store the timestamp of the last time each user's balance effectively accrued interest or was updated.

    ```solidity
    mapping(address => uint256) private s_userLastUpdatedTimestamp;
    ```

**Custom Error and Event for Interest Rate Changes:**

To provide better error handling and enable off-chain monitoring, we'll define a custom error and an event related to interest rate changes.

```solidity
error RebaseToken__InterestRateCanOnlyDecrease(uint256 oldInterestRate, uint256 newInterestRate);
event InterestRateSet(uint256 newInterestRate);
```

**`setInterestRate` Function:**

This function will allow an authorized party (e.g., the contract owner) to set the global `s_interestRate`. A key requirement is that this rate can only ever decrease, rewarding early adopters.

```solidity
/**
 * @notice Set the global interest rate for the contract.
 * @param _newInterestRate The new interest rate to set (scaled by PRECISION_FACTOR basis points per second).
 * @dev The interest rate can only decrease. Access control (e.g., onlyOwner) should be added.
 */
function setInterestRate(uint256 _newInterestRate) external { // TODO: Add access control
    if (_newInterestRate > s_interestRate) {
        revert RebaseToken__InterestRateCanOnlyDecrease(s_interestRate, _newInterestRate);
    }
    s_interestRate = _newInterestRate;
    emit InterestRateSet(_newInterestRate);
}
```
*Note:* The condition `_newInterestRate > s_interestRate` ensures that the function reverts if an attempt is made to set a new rate higher than the current one, enforcing the "can only decrease" rule.

**`getUserInterestRate` Getter Function:**

We'll provide a public view function to allow anyone to query a user's locked-in interest rate.

```solidity
/**
 * @notice Gets the locked-in interest rate for a specific user.
 * @param _user The address of the user.
 * @return The user's specific interest rate.
 */
function getUserInterestRate(address _user) external view returns (uint256) {
    return s_userInterestRate[_user];
}
```

## Minting Tokens and Accruing Interest

The `mint` function is a critical part of our rebase token. It will be called when a user performs an action that results in new tokens being created for them (e.g., depositing assets into an associated vault).

**`mint` Function Logic:**

When `mint` is called for a user:
1.  Any interest that has accrued for this user since their last interaction must be calculated and minted to them. This is handled by an internal function `_mintAccruedInterest`.
2.  The user's specific interest rate (`s_userInterestRate[_to]`) is set to the current global `s_interestRate`. This "locks in" the prevailing rate for their newly minted tokens.
3.  The actual principal amount of tokens is minted using the standard ERC20 `_mint` function.

```solidity
/**
 * @notice Mints tokens to a user, typically upon deposit.
 * @dev Also mints accrued interest and locks in the current global rate for the user.
 * @param _to The address to mint tokens to.
 * @param _amount The principal amount of tokens to mint.
 */
function mint(address _to, uint256 _amount) external { // TODO: Add access control (e.g., onlyVault)
    _mintAccruedInterest(_to);
    s_userInterestRate[_to] = s_interestRate;
    _mint(_to, _amount);
}
```

**`_mintAccruedInterest` Internal Function (Partial Implementation):**

This internal function is responsible for calculating and minting the interest owed to a user. For now, we'll focus on one crucial part: updating the user's last updated timestamp. The full interest calculation and minting logic will be fleshed out later.

```solidity
/**
 * @dev Internal function to calculate and mint accrued interest for a user.
 * @dev Updates the user's last updated timestamp.
 * @param _user The address of the user.
 */
function _mintAccruedInterest(address _user) internal {
    // TODO: Implement full logic to calculate and mint actual interest tokens.
    // The amount of interest to mint would be:
    // current_dynamic_balance - current_stored_principal_balance
    // Then, _mint(_user, interest_amount_to_mint);

    s_userLastUpdatedTimestamp[_user] = block.timestamp;
}
```
Updating `s_userLastUpdatedTimestamp` is vital because it marks the new baseline from which future interest will accrue.

## Overriding `balanceOf` for Dynamic Balance Calculation

A core feature of this rebase token is that the user's balance reflects accrued interest without requiring constant state updates on the blockchain (which would be very gas-intensive). We achieve this by overriding the standard `balanceOf` function.

The overridden `balanceOf` will calculate the user's current balance dynamically, including any interest accrued since their `s_userLastUpdatedTimestamp`.

The formula for the new balance is essentially:
`Dynamic Balance = Stored Principal Balance * (1 + (User's Locked Interest Rate * Time Elapsed))`

Here's the implementation:

```solidity
/**
 * @notice Returns the current balance of an account, including accrued interest.
 * @param _user The address of the account.
 * @return The total balance including interest.
 */
function balanceOf(address _user) public view override returns (uint256) {
    // Get the user's stored principal balance (tokens actually minted to them).
    uint256 principalBalance = super.balanceOf(_user);

    // Calculate the growth factor based on accrued interest.
    uint256 growthFactor = _calculateUserAccumulatedInterestSinceLastUpdate(_user);

    // Apply the growth factor to the principal balance.
    // Remember PRECISION_FACTOR is used for scaling, so we divide by it here.
    return principalBalance * growthFactor / PRECISION_FACTOR;
}
```
In this function:
*   `super.balanceOf(_user)` calls the original `balanceOf` function from the parent `ERC20` contract, retrieving the underlying stored balance (the principal).
*   `_calculateUserAccumulatedInterestSinceLastUpdate(_user)` is an internal helper function we'll define next, which returns the growth factor `(1 + Rate * Time)` scaled by `PRECISION_FACTOR`.
*   The final division by `PRECISION_FACTOR` adjusts the result back to the correct token decimal precision, as both `principalBalance` (if it uses token decimals) and `growthFactor` are effectively scaled.

## Calculating the Interest Growth Factor

The `_calculateUserAccumulatedInterestSinceLastUpdate` internal function is responsible for calculating the growth factor used in our dynamic `balanceOf`.

This factor represents `1 + (UserInterestRate * TimeElapsed)`, scaled by `PRECISION_FACTOR`.

```solidity
/**
 * @dev Calculates the growth factor due to accumulated interest since the user's last update.
 * @param _user The address of the user.
 * @return The growth factor, scaled by PRECISION_FACTOR. (e.g., 1.05x growth is 1.05 * 1e18).
 */
function _calculateUserAccumulatedInterestSinceLastUpdate(address _user) internal view returns (uint256 linearInterestFactor) {
    // 1. Calculate the time elapsed since the user's balance was last effectively updated.
    uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[_user];

    // If no time has passed, or if the user has no locked rate (e.g., never interacted),
    // the growth factor is simply 1 (scaled by PRECISION_FACTOR).
    if (timeElapsed == 0 || s_userInterestRate[_user] == 0) {
        return PRECISION_FACTOR;
    }

    // 2. Calculate the total fractional interest accrued: UserInterestRate * TimeElapsed.
    // s_userInterestRate[_user] is the rate per second.
    // This product is already scaled appropriately if s_userInterestRate is stored scaled.
    uint256 fractionalInterest = s_userInterestRate[_user] * timeElapsed;

    // 3. The growth factor is (1 + fractional_interest_part).
    // Since '1' is represented as PRECISION_FACTOR, and fractionalInterest is already scaled, we add them.
    linearInterestFactor = PRECISION_FACTOR + fractionalInterest;
    return linearInterestFactor;
}
```
**A Note on Precision:** When performing arithmetic with scaled fixed-point numbers, it's generally best to perform multiplications before divisions to maintain maximum precision. However, always be mindful of potential overflows. In our `balanceOf` function, `principalBalance * growthFactor` is done first, then division by `PRECISION_FACTOR`. This is safe if `principalBalance` and `growthFactor` are within reasonable limits such that their product doesn't exceed `uint256`'s maximum value.

This lesson has laid the foundational code for our `RebaseToken`. We've set up the ERC20 base, implemented logic for global and user-specific interest rates, and most importantly, created a dynamic `balanceOf` function that reflects accrued interest without constant state updates. Future lessons would build upon this by fully implementing `_mintAccruedInterest`, adding `burn` and `transfer` functionalities (which also need to account for rebase mechanics), and incorporating robust access control.