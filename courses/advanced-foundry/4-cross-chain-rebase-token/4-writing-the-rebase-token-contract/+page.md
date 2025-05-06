## Writing the Rebase Token Smart Contract

This lesson guides you through writing the Solidity smart contract code for our Cross-chain Rebase Token. We'll translate the conceptual design discussed previously into functional code using the Foundry framework and OpenZeppelin Contracts library.

## Initial Contract Setup

First, we need to create the basic file structure and define the contract shell.

1.  **Create the File:** In your project's `src` directory, create a new file named `RebaseToken.sol`.
2.  **Add License and Pragma:** At the top of the file, add the standard SPDX license identifier and specify the Solidity compiler version. We'll use version `^0.8.24`, allowing compatibility with versions 0.8.24 up to (but not including) 0.9.0.

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;
    ```

3.  **Define the Contract:** Define an empty contract named `RebaseToken`.

    ```solidity
    contract RebaseToken {

    }
    ```

## Integrating OpenZeppelin ERC20

To avoid reinventing the wheel for standard token functionalities, we'll leverage the battle-tested OpenZeppelin Contracts library, specifically its ERC20 implementation.

1.  **Install Dependency:** Use Foundry's package manager, `forge`, to install the library. Open your terminal in the project root and run:

    ```bash
    forge install openzeppelin/openzeppelin-contracts@v5.1.0 --no-commit
    ```

    *   **Version Pinning:** We explicitly pin the version to `v5.1.0`. Always check the [OpenZeppelin Contracts GitHub repository](https://github.com/OpenZeppelin/openzeppelin-contracts) for the latest recommended stable release for new projects. Pinning ensures your code uses a specific, tested library version, preventing breakage from unexpected updates.
    *   **`--no-commit` Flag:** This flag is crucial if your Git repository has uncommitted changes. It tells Forge not to attempt an automatic commit after installation, which would fail in a "dirty" repository.

2.  **Configure Remappings:** Foundry needs to know where to find the installed library files when you use import paths like `@openzeppelin/...`. Add the following remapping to your `foundry.toml` configuration file:

    ```toml
    # foundry.toml
    remappings = [
        "@openzeppelin/=lib/openzeppelin-contracts/"
        # Add other remappings here if needed
    ]
    ```
    This tells Foundry that any import starting with `@openzeppelin/` should look inside the `lib/openzeppelin-contracts/` directory.

3.  **Import ERC20:** Now, import the necessary `ERC20` contract into `RebaseToken.sol`. Using named imports is recommended for clarity.

    ```solidity
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract RebaseToken { // Add 'is ERC20' later

    }
    ```

4.  **Build Verification:** Run `forge build` in your terminal. This command compiles your contract and verifies that the import path and remapping are correctly configured. It should compile successfully.

## Establishing Core Contract Structure

With the dependency set up, we can structure our `RebaseToken` contract.

1.  **Inheritance:** Modify the contract definition to inherit from OpenZeppelin's `ERC20`.

    ```solidity
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract RebaseToken is ERC20 {

    }
    ```

2.  **Constructor:** Add a constructor. Because `RebaseToken` inherits from `ERC20`, its constructor *must* call the parent `ERC20` constructor, passing the desired token name and symbol.

    ```solidity
    contract RebaseToken is ERC20 {
        constructor() ERC20("Rebase Token", "RBT") {
            // Minting logic will be added later
        }
    }
    ```
    We've set the name to "Rebase Token" and the symbol to "RBT". The constructor body is currently empty.

## Documenting with NatSpec

Effective documentation is crucial for maintainability and collaboration. Solidity uses a format called NatSpec (Natural Language Specification). Adding NatSpec comments from the beginning helps others (and AI tools like GitHub Copilot) understand your code's intent.

Add the following NatSpec block above the contract definition:

```solidity
/**
 * @title RebaseToken
 * @author Your Name / Organization // Update with actual author
 * @notice This is a cross-chain rebase token that incentivises users to deposit into a vault and gain interest in rewards.
 * @notice The global interest rate in the smart contract cannot decrease once set.
 * @notice Each user will have their own interest rate locked in, based on the global interest rate at the time of their first deposit/mint.
 */
contract RebaseToken is ERC20 {
    // ... rest of the contract
}
```
*Note: The NatSpec above reflects the implemented logic where the interest rate cannot decrease.*

## Defining State Variables

We need state variables to store data essential for the rebase mechanism and interest calculations.

```solidity
contract RebaseToken is ERC20 {

    // --- State Variables ---

    // @notice Factor for high-precision decimal calculations (1e18 represents 1.0)
    uint256 private constant PRECISION_FACTOR = 1e18;

    // @notice The current global interest rate per second, scaled by PRECISION_FACTOR.
    // Example: 5e10 represents 0.00000005 or 0.000000005% per second.
    uint256 private s_interestRate = 5e10; // s_ prefix denotes storage variables

    // @notice Stores the interest rate locked for each user upon their first interaction.
    mapping(address => uint256) private s_userInterestRate;

    // @notice Tracks the timestamp of the last action affecting a user's balance (mint, burn, transfer).
    // Crucial for calculating accrued interest over time.
    mapping(address => uint256) private s_userLastUpdatedTimestamp;

    // --- Constructor ---
    constructor() ERC20("Rebase Token", "RBT") {
        // ...
    }

    // ... rest of the contract
}
```

*   **`PRECISION_FACTOR`**: A constant representing `1 * 10^18`. This is standard for handling 18 decimal places in Solidity, allowing us to work with fractional interest rates accurately.
*   **`s_interestRate`**: Stores the global interest rate, scaled by `PRECISION_FACTOR`. It's marked `private` to ensure modifications only happen through dedicated functions. The initial value `5e10` represents a small rate per second.
*   **`s_userInterestRate`**: Maps each user address to the specific interest rate they received when they first interacted (e.g., deposited).
*   **`s_userLastUpdatedTimestamp`**: Maps each user address to the block timestamp of their last balance-affecting action. This is needed to calculate the time duration for interest accrual.

## Events and Custom Errors

Events provide off-chain logging, while custom errors offer more informative and gas-efficient reversion reasons compared to simple `require` statements.

```solidity
contract RebaseToken is ERC20 {

    // --- Events ---
    event InterestRateSet(uint256 newInterestRate);

    // --- Errors ---
    // @notice Error thrown if an attempt is made to set an interest rate lower than the current rate.
    error RebaseToken__InterestRateCannotDecrease(uint256 currentInterestRate, uint256 attemptedInterestRate);

    // --- State Variables ---
    // ... (as defined above) ...

    // --- Constructor ---
    // ... (as defined above) ...

    // ... rest of the contract
}
```

*   **`InterestRateSet` Event**: Emitted whenever the global interest rate is successfully updated.
*   **`RebaseToken__InterestRateCannotDecrease` Error**: Used in the `setInterestRate` function to revert if the new rate is lower than the existing one.

## Implementing Core Functions

Now, let's implement the functions governing the interest rate and minting process.

### Setting the Global Interest Rate

We need a function to set the global interest rate. Access control (e.g., `onlyOwner`) should be added later, but for now, we focus on the core logic.

```solidity
    /**
     * @notice Sets the global interest rate for the protocol.
     * @dev Can only be called by the owner (Access control not yet implemented).
     * @dev The new rate cannot be lower than the current rate.
     * @param _newInterestRate The new interest rate per second, scaled by PRECISION_FACTOR.
     */
    function setInterestRate(uint256 _newInterestRate) external {
        // Check ensures the interest rate cannot decrease
        if (_newInterestRate < s_interestRate) {
            revert RebaseToken__InterestRateCannotDecrease(s_interestRate, _newInterestRate);
        }
        s_interestRate = _newInterestRate;
        emit InterestRateSet(_newInterestRate);
    }
```
This function checks if the proposed `_newInterestRate` is less than the current `s_interestRate`. If it is, the transaction reverts using our custom error. Otherwise, it updates the state variable and emits the `InterestRateSet` event.

### Getting a User's Interest Rate

A view function allows anyone to query the specific interest rate locked for a user.

```solidity
    /**
     * @notice Gets the interest rate locked for a specific user.
     * @param _user The address of the user.
     * @return The interest rate per second (scaled by PRECISION_FACTOR) for the user.
     */
    function getUserInterestRate(address _user) external view returns (uint256) {
        return s_userInterestRate[_user];
    }
```

### Minting Tokens

The `mint` function is typically called by an associated vault or pool contract when a user deposits underlying assets. It needs to handle both minting the principal amount and updating the user's interest-related state.

```solidity
    /**
     * @notice Mints tokens to a user, typically upon deposit into an associated vault.
     * @dev Calculates and mints any previously accrued interest before minting the new amount.
     * @dev Sets or updates the user's locked interest rate to the current global rate.
     * @dev Access control (e.g., only Vault) should be added.
     * @param _to The address receiving the tokens.
     * @param _amount The principal amount of tokens to mint (excluding interest).
     */
    function mint(address _to, uint256 _amount) external {
        // 1. Mint any interest accrued since the user's last interaction.
        _mintAccruedInterest(_to);

        // 2. Lock in the current global interest rate for the user.
        //    If the user already had a rate, this updates it (consider if this is desired behavior).
        //    If only the rate at the *very first* deposit should count, add a check:
        //    if (s_userInterestRate[_to] == 0) { s_userInterestRate[_to] = s_interestRate; }
        s_userInterestRate[_to] = s_interestRate;

        // 3. Mint the principal amount requested.
        _mint(_to, _amount); // Calls the internal _mint from inherited ERC20
    }
```
Crucially, this function first calls `_mintAccruedInterest` (which we'll define next) to update the user's balance with earned interest *before* processing the new deposit. It then records the *current* global interest rate for the user and finally calls the standard `_mint` function inherited from `ERC20.sol` to issue the new tokens.

## Implementing the Rebase Logic

The core of the rebase mechanism lies in calculating and applying accrued interest.

### Minting Accrued Interest (Internal)

This internal function is responsible for calculating the interest a user has earned since their last balance update and minting those tokens to them. It also updates their last updated timestamp. This function will be called before `mint`, `burn`, and `transfer` operations.

```solidity
    /**
     * @notice Internal function to calculate and mint accrued interest for a user.
     * @dev Updates the user's last updated timestamp.
     * @dev Called before mint, burn, or transfer operations that affect the user's balance.
     * @param _user The address for which to mint accrued interest.
     */
    function _mintAccruedInterest(address _user) internal {
        // Logic Outline (Detailed implementation follows from balanceOf and _calculate...):
        // 1. Get the user's current principal balance (tokens physically minted so far).
        //    uint256 principalBalance = super.balanceOf(_user);

        // 2. Calculate the user's total balance *including* interest accrued since the last update.
        //    This uses the overridden balanceOf function we will define below.
        //    uint256 totalBalanceWithInterest = balanceOf(_user);

        // 3. Determine the amount of interest to mint.
        //    uint256 interestToMint = totalBalanceWithInterest - principalBalance;

        // 4. Mint the calculated interest amount to the user.
        //    if (interestToMint > 0) {
        //        _mint(_user, interestToMint);
        //    }

        // 5. Update the user's last updated timestamp to now.
        //    This MUST happen after calculations involving the old timestamp.
        //    s_userLastUpdatedTimestamp[_user] = block.timestamp;

        // --- Actual implementation (simplified for now, relying on balanceOf calculation) ---
        // The core logic is implicitly handled by how balanceOf calculates the dynamic balance.
        // The main task here is to update the timestamp *after* any operation that reads the old balance state.
        // For mint/transfer/burn hooks, the timestamp update is critical.

        // For now, we focus on updating the timestamp. The actual minting of interest
        // happens implicitly when the principal balance changes and the new total balance is calculated.
        // However, an explicit mint might be necessary depending on exact transfer/burn logic implementation later.
        // Let's assume for now that operations trigger a balance reconciliation.
        // A key part is updating the timestamp *after* balance calculations that depend on it.
        // We will place the timestamp update correctly within the overridden transfer/burn functions later.
        // For the 'mint' function, we update the timestamp here, *after* potential interest calculation.
        // Consider: If `balanceOf` is called *before* this, interest is calculated.
        // Then `_mint` increases principal. Timestamp must be updated.

        // For this specific flow within `mint`, let's update the timestamp:
        s_userLastUpdatedTimestamp[_user] = block.timestamp;

        // Note: A more robust implementation might explicitly calculate and mint here,
        // ensuring the `super.balanceOf` reflects the interest before the new principal is added.
        // We will refine this when implementing transfer/burn overrides.
    }
```
*Self-correction note: The summary's description implies a separate calculation and mint here. However, the core mechanism relies on the dynamic `balanceOf`. The primary role here, especially when called *before* other operations, is often to update the timestamp. Explicitly minting interest *here* before the main `_mint` call in the `mint` function would correctly update the principal (`super.balanceOf`) before adding the new amount. Let's refine the comment to reflect this potential need.*

```solidity
    /**
     * @notice Internal function to calculate and mint accrued interest for a user.
     * @dev Calculates interest based on time since `s_userLastUpdatedTimestamp`.
     * @dev Mints the accrued interest, updating the principal balance (`super.balanceOf`).
     * @dev Updates the user's `s_userLastUpdatedTimestamp` to `block.timestamp`.
     * @dev Called before mint, burn, or transfer operations.
     * @param _user The address for which to mint accrued interest.
     */
    function _mintAccruedInterest(address _user) internal {
        // 1. Calculate total balance including accrued interest using the dynamic balanceOf logic
        uint256 totalBalanceWithInterest = balanceOf(_user);

        // 2. Get the current principal balance (before minting interest)
        uint256 principalBalance = super.balanceOf(_user); // Balance stored in ERC20

        // 3. Calculate interest earned since last update
        if (totalBalanceWithInterest > principalBalance) {
             uint256 interestToMint = totalBalanceWithInterest - principalBalance;
             // 4. Mint the calculated interest, increasing the principal balance
             _mint(_user, interestToMint);
        }
        // Else: No interest accrued or potential rounding resulted in no change.

        // 5. Update the timestamp AFTER calculations and minting are done.
        s_userLastUpdatedTimestamp[_user] = block.timestamp;
    }
```
This revised internal function explicitly calculates the interest difference based on the dynamic `balanceOf` and the stored principal `super.balanceOf`, mints that difference, and *then* updates the timestamp. This ensures the state reflects reality before subsequent operations.

## Overriding balanceOf for Dynamic Balances

The standard `ERC20` `balanceOf` function simply returns the stored balance. For our rebase token, we need to override it to return a dynamically calculated balance that includes accrued interest.

```solidity
    /**
     * @notice Overrides ERC20 balanceOf to calculate the dynamic balance including accrued interest.
     * @dev Calculates balance = principal * (1 + rate * time_elapsed).
     * @param _user The address for which to calculate the balance.
     * @return The user's current balance including linearly accrued interest since the last update.
     */
    function balanceOf(address _user) public view override returns (uint256) {
        // Get the principal balance stored in the parent ERC20 contract.
        uint256 principalBalance = super.balanceOf(_user);

        // If user has no principal or hasn't interacted yet, balance is 0.
        if (principalBalance == 0) {
            return 0;
        }

        // Calculate the interest multiplier factor (1 + rate * time), scaled by PRECISION_FACTOR.
        uint256 interestMultiplier = _calculateUserAccumulatedInterestSinceLastUpdate(_user);

        // Calculate the final balance: (principal * multiplier) / precision_factor
        // We divide by PRECISION_FACTOR because both principalBalance (implicitly, via ERC20 decimals)
        // and interestMultiplier are scaled by 1e18 (or PRECISION_FACTOR).
        // Multiplying them results in a number scaled by 1e36, so we divide to return to 1e18 scale.
        return principalBalance * interestMultiplier / PRECISION_FACTOR;
    }
```
This function uses the `super` keyword to fetch the underlying principal balance stored by the `ERC20` contract. It then calculates an interest multiplier using another internal function (`_calculateUserAccumulatedInterestSinceLastUpdate`) and applies it to the principal. The division by `PRECISION_FACTOR` is crucial to correct the scale after multiplying two numbers that are both effectively scaled by 18 decimals.

## Calculating Interest Accumulation (Internal)

This helper function calculates the interest multiplier used in the overridden `balanceOf`.

```solidity
    /**
     * @notice Calculates the linear interest accumulation factor since the user's last update.
     * @dev Returns (1 + rate * time_elapsed), scaled by PRECISION_FACTOR.
     * @param _user The user address.
     * @return The linear interest multiplier, scaled by PRECISION_FACTOR.
     */
    function _calculateUserAccumulatedInterestSinceLastUpdate(address _user) internal view returns (uint256 linearInterestMultiplier) {
        // Get the timestamp of the user's last balance update.
        uint256 lastUpdateTimestamp = s_userLastUpdatedTimestamp[_user];

        // If the timestamp is 0 (user hasn't interacted) or is in the future (should not happen),
        // return the base precision factor (representing a multiplier of 1.0).
        if (lastUpdateTimestamp == 0 || lastUpdateTimestamp >= block.timestamp) {
            return PRECISION_FACTOR;
        }

        // Calculate the time elapsed since the last update.
        uint256 timeElapsed = block.timestamp - lastUpdateTimestamp;

        // Get the user's locked interest rate.
        uint256 userRate = s_userInterestRate[_user];

        // Calculate the accumulated interest part: (rate * time_elapsed)
        // Note: userRate is already scaled by PRECISION_FACTOR.
        uint256 accumulatedInterestScaled = userRate * timeElapsed;

        // Calculate the multiplier: PRECISION_FACTOR + accumulatedInterestScaled
        // This represents (1 + rate * time), scaled by PRECISION_FACTOR.
        linearInterestMultiplier = PRECISION_FACTOR + accumulatedInterestScaled;

        // Sanity check: ensure multiplier doesn't overflow (extremely unlikely with uint256)
        // This check isn't strictly necessary given typical rates/times but shows defensive programming.
        // if (linearInterestMultiplier < PRECISION_FACTOR) { revert("Overflow"); } // Uncomment if needed

        return linearInterestMultiplier;
    }
```
This function calculates the time elapsed since the user's `s_userLastUpdatedTimestamp`, fetches their specific `s_userInterestRate`, and computes the interest multiplier based on the formula `1 + (rate * time)`. The result is scaled by `PRECISION_FACTOR` to maintain precision during calculations in `balanceOf`.

## Key Concepts Review

*   **Rebase Token:** The core idea is that a user's token balance (`balanceOf`) isn't static but changes over time due to an underlying mechanism (here, interest accrual).
*   **Linear Interest:** Interest is calculated as `principal * rate * time`. The total balance becomes `principal * (1 + rate * time)`. Our contract implements this dynamically.
*   **Precision Handling:** Solidity lacks native decimals. We use a `PRECISION_FACTOR` (`1e18`) to scale up rates and intermediate values, allowing us to perform calculations with fractional amounts. Careful multiplication and division are needed to manage the scale.
*   **`super` Keyword:** Essential for calling functions from parent contracts, particularly when overriding them (like `balanceOf`). It allows access to the parent's implementation and state.
*   **State Updates:** Interest accrues conceptually over time but is only calculated (`balanceOf`) or materialized (`_mintAccruedInterest` called by `mint`, `transfer`, `burn`) during specific state-changing interactions. Updating `s_userLastUpdatedTimestamp` is critical.
*   **NatSpec:** Crucial for code clarity, maintainability, and enabling better tooling support.

This completes the initial implementation of the `RebaseToken` contract's core logic. Further steps would involve implementing `burn`, overriding `_update` (or `_transfer`, `_mint`, `_burn` hooks in newer OpenZeppelin versions) to correctly call `_mintAccruedInterest` for relevant parties, adding robust access control, and thorough testing.