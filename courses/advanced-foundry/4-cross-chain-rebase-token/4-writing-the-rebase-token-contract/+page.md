## Building a Rebase Token: Initial Implementation in Solidity

This lesson guides you through the initial steps of creating a `RebaseToken.sol` smart contract using the Foundry framework and OpenZeppelin libraries. Our goal is to build a cross-chain ERC20 token where a user's balance automatically increases over time based on an accrued interest mechanism, without requiring explicit claiming transactions. We'll achieve this by inheriting from the standard OpenZeppelin `ERC20` contract and overriding key functions, notably `balanceOf`, to implement the dynamic rebasing logic.

### Core Concepts of the Rebase Token

Before diving into the code, let's understand the fundamental concepts:

1.  **Rebase Token:** Unlike standard ERC20 tokens where `balanceOf` simply returns a stored value, a rebase token calculates the balance dynamically. It considers the user's initial principal amount (tokens originally minted or received) and adds the interest accrued since their last interaction with the contract. The balance effectively grows linearly over time.
2.  **Interest Rate Mechanism:**
    *   **Global Interest Rate (`s_interestRate`):** A single rate, defined per second, applicable to the entire contract. This rate is designed to only increase or stay the same, rewarding early participants.
    *   **Personal Interest Rate (`s_userInterestRate`):** When a user first interacts (e.g., receives minted tokens), the *current* global interest rate is captured and stored as their personal rate. This rate is used for calculating their specific accrued interest going forward.
    *   **Last Update Timestamp (`s_userLastUpdatedAtTimestamp`):** To calculate interest accurately, the contract tracks the block timestamp of the last time each user's balance effectively changed or their interest was accounted for.
3.  **Solidity Precision:** Solidity lacks native support for floating-point numbers. We handle calculations involving rates and balances using fixed-point arithmetic. This involves scaling numbers up by a large factor (typically `1e18` for 18 decimal places, matching the ERC20 standard) before performing calculations. We'll use a constant `PRECISION_FACTOR` (`1e18`) to represent the scaled value of `1`. Multiplication is performed before division to maintain precision.
4.  **NatSpec Comments:** We will use Solidity Natural Language Specification (NatSpec) comments (`/** ... */`) extensively. These comments (`@title`, `@author`, `@notice`, `@dev`, `@param`, `@return`) improve code readability, enable automatic documentation generation, and can assist developer tools.

### Project Setup and Dependencies

We'll use the Foundry framework for development and testing.

1.  **Create Contract File:** Create a new file named `RebaseToken.sol` within your Foundry project's `src` directory.
2.  **Boilerplate:** Add the SPDX license identifier and the Solidity version pragma at the top of the file:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;
    ```
3.  **Install OpenZeppelin:** We need the battle-tested `ERC20` implementation from OpenZeppelin. Find the latest version tag (e.g., `v5.1.0`) on the OpenZeppelin Contracts GitHub repository. Install it using Foundry:
    ```bash
    forge install openzeppelin/openzeppelin-contracts@v5.1.0 --no-commit
    ```
    *Note: We use a specific version tag for stability and `--no-commit` if you have uncommitted changes in your repository.*
4.  **Configure Remappings:** Tell the Solidity compiler where to find the OpenZeppelin library by adding a remapping to your `foundry.toml` file:
    ```toml
    [profile.default]
    # ... other settings
    remappings = [
        "@openzeppelin/=lib/openzeppelin-contracts/"
    ]
    # ... other settings
    ```
5.  **Import ERC20:** Import the necessary contract into `RebaseToken.sol`:
    ```solidity
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    ```
6.  **Verify Setup:** Run `forge build` in your terminal to ensure the import works and the project compiles.

### Contract Definition and State Variables

Now, let's define the contract structure, inherit from `ERC20`, and declare the necessary state variables.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Rebase Token
 * @author [Your Name/Organization]
 * @notice Implements a cross-chain ERC20 token where balances increase automatically over time.
 * @dev This contract uses a rebasing mechanism based on a per-second interest rate.
 * The global interest rate can only increase or stay the same. Each user gets assigned
 * the prevailing global interest rate upon their first interaction involving balance updates.
 * Balances are calculated dynamically in the `balanceOf` function.
 */
contract RebaseToken is ERC20 {
    // Represents 1 with 18 decimal places for fixed-point math
    uint256 private constant PRECISION_FACTOR = 1e18;

    // Global interest rate per second (scaled by PRECISION_FACTOR)
    // Example: 5e10 represents 0.00000005 or 0.000005% per second
    uint256 private s_interestRate = 5e10;

    // Maps users to their specific interest rate (set at interaction time)
    mapping(address => uint256) private s_userInterestRate;

    // Maps users to the block timestamp of their last balance update/interest accrual
    mapping(address => uint256) private s_userLastUpdatedAtTimestamp;

    // Constructor, Events, Errors, and Functions will follow...
}
```

*   We inherit from `ERC20` using the `is` keyword.
*   Contract-level NatSpec comments explain the purpose and high-level mechanics.
*   `PRECISION_FACTOR` is defined for our fixed-point calculations.
*   `s_interestRate` stores the global rate, initialized to a sample value.
*   Mappings `s_userInterestRate` and `s_userLastUpdatedAtTimestamp` store user-specific data.
*   The `s_` prefix denotes storage variables, and `private` visibility is used initially; we can add specific getters if needed later.

### Events and Custom Errors

Define events to log important state changes and custom errors for clear revert reasons.

```solidity
    // Inside the RebaseToken contract

    /**
     * @notice Emitted when the global interest rate is updated.
     * @param newInterestRate The new global interest rate per second (scaled).
     */
    event InterestRateSet(uint256 newInterestRate);

    /**
     * @notice Error reverted when attempting to set an interest rate lower than the current one.
     * @param currentInterestRate The current global interest rate (scaled).
     * @param proposedInterestRate The proposed new interest rate that was rejected (scaled).
     */
    error RebaseToken__InterestRateCanOnlyIncrease(uint256 currentInterestRate, uint256 proposedInterestRate);

    // Constructor, Functions will follow...
```

*   `InterestRateSet`: Signals a change in the global `s_interestRate`.
*   `RebaseToken__InterestRateCanOnlyIncrease`: Provides specific context if the interest rate update rule is violated. *Note: The summary mentioned a naming inconsistency (`CanOnlyDecrease`) which we've corrected here to reflect the logic (`CanOnlyIncrease`).*

### Constructor

The constructor initializes the underlying `ERC20` token with its name and symbol.

```solidity
    // Inside the RebaseToken contract

    /**
     * @notice Initializes the Rebase Token with a name and symbol.
     */
    constructor() ERC20("Rebase Token", "RBT") {}

    // Functions will follow...
```

### Core Functionality: Setting Rates, Minting, and Calculating Balances

Now, let's implement the core functions that define the rebase behavior.

**1. Setting the Global Interest Rate**

This function allows updating the global rate, enforcing the rule that it can only increase or stay the same.

```solidity
    /**
     * @notice Sets the global interest rate for the token contract.
     * @dev Reverts if the proposed rate is lower than the current rate.
     * Emits an {InterestRateSet} event on success.
     * @param _newInterestRate The desired new global interest rate per second (scaled by PRECISION_FACTOR).
     */
    function setInterestRate(uint256 _newInterestRate) external {
        // Ensure the interest rate never decreases
        if (_newInterestRate < s_interestRate) {
            revert RebaseToken__InterestRateCanOnlyIncrease(s_interestRate, _newInterestRate);
        }
        s_interestRate = _newInterestRate;
        emit InterestRateSet(_newInterestRate);
    }
```

**2. Calculating Accumulated Interest Multiplier**

This internal helper function calculates the multiplier representing the interest growth since the user's last update.

```solidity
    /**
     * @notice Calculates the interest multiplier for a user since their last update.
     * @dev The multiplier represents (1 + (user_rate * time_elapsed)).
     * The result is scaled by PRECISION_FACTOR.
     * @param _user The address of the user.
     * @return linearInterest The calculated interest multiplier (scaled).
     */
    function _calculateUserAccumulatedInterestSinceLastUpdate(address _user) internal view returns (uint256 linearInterest) {
        uint256 lastUpdateTimestamp = s_userLastUpdatedAtTimestamp[_user];
        // If never updated, assume current time to avoid huge elapsed time
        if (lastUpdateTimestamp == 0) {
            // Or alternatively, could set it during mint/transfer in initial setup
            lastUpdateTimestamp = block.timestamp;
        }

        uint256 timeElapsed = block.timestamp - lastUpdateTimestamp;

        // Calculate interest part: user_rate * time_elapsed (already scaled by 1e18 * seconds)
        uint256 interestPart = s_userInterestRate[_user] * timeElapsed;

        // Calculate multiplier: 1 + interest part
        // PRECISION_FACTOR represents 1 (scaled)
        linearInterest = PRECISION_FACTOR + interestPart;
        // Example: If rate is 10% per second (scaled) and 2 seconds pass:
        // interestPart = (0.1 * 1e18) * 2 = 0.2 * 1e18
        // linearInterest = 1e18 + 0.2 * 1e18 = 1.2 * 1e18 (representing a 1.2x multiplier)
    }
```

*   This function calculates `1 + (Rate * Time)` scaled by `PRECISION_FACTOR`.
*   It uses the user's specific rate (`s_userInterestRate`) and the time elapsed since `s_userLastUpdatedAtTimestamp`.
*   A check for `lastUpdateTimestamp == 0` handles the initial state before any updates.

**3. Overriding `balanceOf`**

This is the core of the rebase mechanism. We override the standard `balanceOf` to return the dynamic balance.

```solidity
    /**
     * @notice Gets the dynamic balance of an account, including accrued interest.
     * @dev Overrides the standard ERC20 balanceOf function.
     * Calculates balance as: Principal * (1 + (User Rate * Time Elapsed)).
     * Uses fixed-point math.
     * @param _user The address to query the balance for.
     * @return The calculated total balance (principal + accrued interest).
     */
    function balanceOf(address _user) public view override returns (uint256) {
        // Get the stored principal balance (this is what _mint/_burn directly affects)
        // super.balanceOf() calls the original ERC20 implementation.
        uint256 principalBalance = super.balanceOf(_user);

        // If principal is zero, calculated balance is also zero
        if (principalBalance == 0) {
            return 0;
        }

        // Get the interest multiplier (scaled by 1e18)
        uint256 interestMultiplier = _calculateUserAccumulatedInterestSinceLastUpdate(_user);

        // Calculate final balance: (Principal * Multiplier) / PrecisionFactor
        // Principal is already scaled (implicitly by 1e18 as it's an ERC20 balance)
        // Multiplier is scaled by 1e18
        // Result of multiplication is scaled by 1e36
        // Divide by PRECISION_FACTOR (1e18) to get the final balance scaled by 1e18
        return (principalBalance * interestMultiplier) / PRECISION_FACTOR;
    }
```

*   We use `super.balanceOf(_user)` to fetch the underlying stored balance, which represents the principal.
*   We call `_calculateUserAccumulatedInterestSinceLastUpdate` to get the growth multiplier.
*   The crucial calculation `(principalBalance * interestMultiplier) / PRECISION_FACTOR` performs the multiplication first to preserve precision before dividing by `PRECISION_FACTOR` to bring the result back to the correct scale (18 decimals).

**4. Accruing Interest (Internal Helper)**

Before any action that changes the principal balance (like minting or transferring), we need to effectively "cash in" the accrued interest by minting it. This function also updates the user's last update timestamp.

```solidity
    /**
     * @notice Calculates accrued interest, mints it, and updates the user's last timestamp.
     * @dev This should be called *before* operations that rely on an up-to-date principal balance
     * or that modify the principal (e.g., mint, transfer, burn).
     * @param _user The address for which to accrue interest.
     */
    function _mintAccruedInterest(address _user) internal {
        uint256 principalBalance = super.balanceOf(_user);

        // Avoid calculations if principal is zero
        if (principalBalance == 0) {
            // Still update timestamp if they have a rate assigned, might receive tokens later
            if(s_userInterestRate[_user] > 0) {
                 s_userLastUpdatedAtTimestamp[_user] = block.timestamp;
            }
            return;
        }

        uint256 totalBalanceWithInterest = balanceOf(_user); // Use our overridden balanceOf

        // Interest to mint is the difference between the calculated total and the stored principal
        uint256 interestToMint = totalBalanceWithInterest - principalBalance;

        // Mint the accrued interest amount if there is any
        if (interestToMint > 0) {
            // _mint is the internal function from the parent ERC20 contract
            _mint(_user, interestToMint);
        }

        // Crucially, update the timestamp AFTER calculating and minting interest
        s_userLastUpdatedAtTimestamp[_user] = block.timestamp;
    }
```

*   This internal function first gets the principal using `super.balanceOf`.
*   It then calculates the *total* balance (principal + interest) using our overridden `balanceOf`.
*   The difference is the interest that has accrued since the last update.
*   This interest amount is minted using the inherited `_mint` function.
*   Finally, and importantly, `s_userLastUpdatedAtTimestamp[_user]` is updated to `block.timestamp`.

**5. Minting New Tokens**

The public `mint` function allows creating new tokens. It must first account for any existing accrued interest before minting the new principal and setting the user's interest rate.

```solidity
    /**
     * @notice Mints new principal tokens to a user's account.
     * @dev Accrues existing interest first, then sets the user's interest rate
     * to the current global rate, and finally mints the new principal amount.
     * @param _to The recipient address.
     * @param _amount The amount of principal tokens to mint.
     */
    function mint(address _to, uint256 _amount) external {
        // 1. Calculate and mint any pending interest for the recipient FIRST
        _mintAccruedInterest(_to);

        // 2. Set (or update) the user's personal interest rate to the current global rate
        s_userInterestRate[_to] = s_interestRate;
        // Note: Timestamp is updated inside _mintAccruedInterest

        // 3. Mint the requested principal amount using the inherited internal function
        _mint(_to, _amount); // This updates the value returned by super.balanceOf()
    }
```

*   Calls `_mintAccruedInterest(_to)` to update the principal balance with accrued interest *before* adding more.
*   Assigns the current `s_interestRate` to `s_userInterestRate[_to]`.
*   Calls the standard internal `_mint` function to increase the principal balance.

**6. Getter for User Interest Rate**

A simple view function to allow external checking of a user's assigned rate.

```solidity
    /**
     * @notice Gets the specific interest rate assigned to a user.
     * @param _user The address of the user.
     * @return The user's assigned interest rate per second (scaled).
     */
    function getUserInterestRate(address _user) external view returns (uint256) {
        return s_userInterestRate[_user];
    }
} // End of RebaseToken contract
```

This completes the initial implementation of the `RebaseToken.sol` contract, covering state setup, rate management, and the core dynamic balance calculation via the overridden `balanceOf` function, along with the necessary logic in `mint` and `_mintAccruedInterest` to handle the rebasing correctly. Further development would involve implementing `transfer`, `transferFrom`, `burn`, and adding relevant tests.