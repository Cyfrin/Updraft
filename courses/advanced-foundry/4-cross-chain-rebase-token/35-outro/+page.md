## Understanding the RebaseToken Contract

This lesson recaps the creation of a custom `RebaseToken`, an ERC20-compliant token featuring a linear interest accrual mechanism.

**Foundation and Access Control:**

The `RebaseToken.sol` contract inherits core functionalities from OpenZeppelin's `ERC20`, `Ownable`, and `AccessControl` contracts.

```solidity
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract RebaseToken is ERC20, Ownable, AccessControl {
    // ... state variables, functions ...
}
```

A specific role, `MINT_AND_BURN_ROLE`, is defined to control which addresses (typically other contracts like a Vault or a CCIP Token Pool) are permitted to mint new tokens or burn existing ones. The contract owner can grant this role using the `grantMintAndBurnRole` function.

```solidity
bytes32 public constant MINT_AND_BURN_ROLE = keccak256("MINT_AND_BURN_ROLE");

function grantMintAndBurnRole(address _account) external onlyOwner {
    _grantRole(MINT_AND_BURN_ROLE, _account);
}
```

**Interest Rate Mechanism:**

A global interest rate (`s_interestRate`) governs the base rate for the token. The owner can adjust this rate via `setInterestRate`. Crucially, this function enforces that the rate can only ever be decreased, preventing manipulation to artificially inflate token balances.

```solidity
// Example state variable
uint256 private s_interestRate;

// Function to set the rate (with decreasing rate check)
function setInterestRate(uint256 _newInterestRate) external onlyOwner {
    if (_newInterestRate >= s_interestRate) { // Or a custom error check
        revert RebaseToken__InterestRateCanOnlyDecrease(s_interestRate, _newInterestRate);
    }
    s_interestRate = _newInterestRate;
    emit InterestRateSet(_newInterestRate);
}
```

In addition to the global rate, each user possesses their own interest rate (`s_userInterestRate`). This rate is set to the *current global rate* at the moment they first acquire tokens (either through minting or receiving a transfer). This user-specific rate is used for calculating their individual accrued interest.

**Core Token Operations:**

*   **`principalBalanceOf`:** Returns the underlying token amount held by a user, excluding any dynamically accrued interest. It accesses the standard ERC20 balance mapping.
    ```solidity
    function principalBalanceOf(address _user) external view returns (uint256) {
        return super.balanceOf(_user); // Or internal _balances mapping access
    }
    ```
*   **`mint`:** Accessible only by addresses with the `MINT_AND_BURN_ROLE`. Before minting the requested principal amount (`_amount`) to the recipient (`_to`), it first calls the internal `_mintAccruedInterest` function to update the recipient's balance with any interest earned since their last interaction. It also sets the recipient's specific interest rate (`s_userInterestRate[_to]`) based on the provided rate (or current global rate).
    ```solidity
    function mint(address _to, uint256 _amount, uint256 _userInterestRate) external onlyRole(MINT_AND_BURN_ROLE) {
        _mintAccruedInterest(_to);
        s_userInterestRate[_to] = _userInterestRate; // Sets user's rate
        _mint(_to, _amount); // Mints the principal
    }
    ```
*   **`burn`:** Also restricted to the `MINT_AND_BURN_ROLE`. Similar to `mint`, it first calls `_mintAccruedInterest` for the target address (`_from`) to realize any accrued interest before burning the specified `_amount`.
    ```solidity
    function burn(address _from, uint256 _amount) external onlyRole(MINT_AND_BURN_ROLE) {
        _mintAccruedInterest(_from);
        _burn(_from, _amount);
    }
    ```

**Interest Calculation and Balance:**

*   **`balanceOf` (Override):** The standard ERC20 `balanceOf` function is overridden. It calculates the user's *effective* balance by taking their stored principal (`super.balanceOf(_user)`) and adding the dynamically calculated interest accrued since their last balance update, using the `_calculateUserAccumulatedInterestSinceLastUpdate` helper. The calculation often involves applying an interest factor derived from the user's rate and elapsed time.
    ```solidity
    // Conceptual logic
    function balanceOf(address _user) public view override returns (uint256) {
        uint256 principal = super.balanceOf(_user);
        // The actual calculation might involve a multiplier based on interest
        uint256 accumulatedInterestFactor = _calculateUserAccumulatedInterestSinceLastUpdate(_user);
        // Example: return principal * accumulatedInterestFactor / PRECISION_FACTOR;
        return /* Calculated balance including interest */;
    }
    ```
*   **`_calculateUserAccumulatedInterestSinceLastUpdate`:** This internal view function calculates the interest earned linearly based on the user's specific rate (`s_userInterestRate[_user]`) and the time elapsed since their last interaction timestamp (`s_userLastUpdatedTimestamp[_user]`). The formula is conceptually `Interest = Principal * UserRate * TimeElapsed`, often implemented using a precision factor.
    ```solidity
    // Conceptual calculation
    // linearInterest = PRECISION_FACTOR + (s_userInterestRate[_user] * timeElapsed);
    function _calculateUserAccumulatedInterestSinceLastUpdate(address _user) internal view returns (uint256 linearInterestFactor) {
        uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[_user];
        // Calculation logic using user rate and time...
        linearInterestFactor = PRECISION_FACTOR + (s_userInterestRate[_user] * timeElapsed); // Based on video summary
        return linearInterestFactor;
    }
    ```
*   **`_mintAccruedInterest`:** This crucial internal function is called before any balance-altering operation (`mint`, `burn`, `transfer`, `transferFrom`). It performs the following steps:
    1.  Retrieves the user's current principal balance (`super.balanceOf(_user)`).
    2.  Calculates the user's total current balance *including* interest by calling the overridden `balanceOf`.
    3.  Determines the difference, which represents the interest accrued (`balanceIncrease`).
    4.  Updates the user's last interaction timestamp (`s_userLastUpdatedTimestamp`) to `block.timestamp`.
    5.  If `balanceIncrease` is greater than zero, it mints this amount to the user using the internal `_mint` function.
    ```solidity
     function _mintAccruedInterest(address _user) internal {
        uint256 previousPrincipleBalance = super.balanceOf(_user);
        uint256 currentBalance = balanceOf(_user); // Includes calculated interest
        if (currentBalance > previousPrincipleBalance) {
            uint256 balanceIncrease = currentBalance - previousPrincipleBalance;
            s_userLastUpdatedTimestamp[_user] = block.timestamp;
            _mint(_user, balanceIncrease); // Mint the accrued interest
        } else {
            // Update timestamp even if no interest accrued (or balance decreased externally)
            s_userLastUpdatedTimestamp[_user] = block.timestamp;
        }
    }
    ```

*   **`transfer` / `transferFrom` (Overrides):** These standard ERC20 functions are overridden to incorporate the interest mechanism. Before the core transfer logic executes, they call `_mintAccruedInterest` for both the sender and the receiver, ensuring their balances are up-to-date. Additionally, if the receiver initially has a zero balance, their `s_userInterestRate` is set to match the sender's rate upon receiving the tokens.

**Helper Functions:**

The contract includes getter functions to retrieve the current global interest rate and a specific user's interest rate.

## The Vault Contract: Depositing and Redeeming

The `Vault.sol` contract acts as a simple interface for users to exchange the native chain currency (like ETH) for `RebaseToken` and vice-versa.

*   **`deposit` Function:**
    *   This `external payable` function accepts native currency deposits (`msg.value`).
    *   It retrieves the current global interest rate from the `RebaseToken` contract.
    *   It calls the `RebaseToken` contract's `mint` function, providing the depositor (`msg.sender`), the deposited amount (`msg.value`) as the token amount, and the fetched interest rate. This issues the user the equivalent value in Rebase Tokens and sets their initial interest rate.
    ```solidity
    function deposit() external payable {
        uint256 interestRate = i_rebaseToken.getInterestRate(); // Get global rate
        // Note: Assumes 1:1 value conversion between ETH and Token principal
        i_rebaseToken.mint(msg.sender, msg.value, interestRate); // Mint tokens
        emit Deposit(msg.sender, msg.value);
    }
    ```

*   **`redeem` Function:**
    *   Allows users to burn their `RebaseToken` and receive the corresponding amount of native currency back from the vault.
    *   It checks if the requested `_amount` exceeds the user's current, interest-inclusive balance (`i_rebaseToken.balanceOf(msg.sender)`). It allows redeeming the maximum available balance if `_amount` is set to `type(uint256).max`.
    *   It calls the `RebaseToken` contract's `burn` function to remove the tokens from the user's balance.
    *   It sends the equivalent amount of native currency back to the user (`msg.sender`) using a low-level `.call`. It includes a check to ensure the native currency transfer was successful.
    ```solidity
    function redeem(uint256 _amount) external {
        uint256 userBalance = i_rebaseToken.balanceOf(msg.sender);
         if (_amount == type(uint256).max) {
            _amount = userBalance;
        }
        if (_amount > userBalance) {
             revert Vault__AmountExceedsBalance(userBalance, _amount);
        }
        if (_amount == 0) {
            revert Vault__AmountCannotBeZero();
        }

        // 1. Burn the tokens from the user
        i_rebaseToken.burn(msg.sender, _amount);

        // 2. Send the user ETH
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        if (!success) {
            revert Vault__RedeemFailed();
        }
        emit Redeem(msg.sender, _amount);
    }
    ```

*   **`receive` Function:**
    *   A simple `external payable {}` function is included, allowing the Vault contract to receive direct native currency transfers, although this capability might not be actively used in the primary deposit/redeem flow.

## Integrating with CCIP: The RebaseTokenPool Contract

To enable cross-chain transfers of the `RebaseToken` using Chainlink's Cross-Chain Interoperability Protocol (CCIP), a specialized `RebaseTokenPool.sol` contract is required.

This contract inherits from Chainlink's base `TokenPool` contract (e.g., `@chainlink-local/contracts/src/v0.8/ccip/pools/TokenPool.sol`) and overrides key functions to handle the specific logic of the `RebaseToken`.

*   **`lockOrBurn` Function (Sending Tokens):**
    *   This function is executed by the CCIP system when tokens are being sent *from* the chain where this pool resides.
    *   It implements the "burn" part of the lock/burn pattern for this specific token.
    *   It validates the input parameters provided by CCIP.
    *   Crucially, it calls the `RebaseToken` contract's `burn` function to remove the tokens from the pool contract's balance (tokens are typically transferred to the pool before `lockOrBurn` is called).
    *   Optionally, it can retrieve metadata, like the sender's interest rate on the source chain, and encode it into the `destPoolData` field of the output. This data is sent along with the CCIP message to the destination chain.
    ```solidity
    // Simplified example structure
    function lockOrBurn(Pool.LockOrBurnInV1 calldata lockOrBurnIn)
        external
        returns (Pool.LockOrBurnOutV1 memory lockOrBurnOut)
    {
        _validateLockOrBurn(lockOrBurnIn);
        // Potentially get user interest rate if needed on destination
        // uint256 userInterestRate = IRebaseToken(address(i_token)).getUserInterestRate(lockOrBurnIn.sourceChainSender);

        // Burn the tokens held by the pool
        IRebaseToken(address(i_token)).burn(address(this), lockOrBurnIn.amount);

        // Construct the output, potentially including encoded data
        lockOrBurnOut = Pool.LockOrBurnOutV1({...});
        // lockOrBurnOut.destPoolData = abi.encode(userInterestRate);

        return lockOrBurnOut;
    }
    ```

*   **`releaseOrMint` Function (Receiving Tokens):**
    *   This function is executed by the CCIP system when tokens are arriving *on* this chain from another chain.
    *   It implements the "mint" part of the release/mint pattern.
    *   It validates the input parameters from the CCIP message.
    *   If metadata (like the original user interest rate) was encoded in `sourcePoolData` by the source chain's pool, it decodes this data.
    *   It calls the `RebaseToken` contract's `mint` function to create new tokens for the specified `receiver`, using the transferred `amount` and the decoded (or default) interest rate.
    ```solidity
     // Simplified example structure
    function releaseOrMint(Pool.ReleaseOrMintInV1 calldata releaseOrMintIn)
        external
        returns (Pool.ReleaseOrMintOutV1 memory releaseOrMintOut)
    {
        _validateReleaseOrMint(releaseOrMintIn);

        // Decode user interest rate from source pool data if sent
        uint256 userInterestRate;
        if (releaseOrMintIn.sourcePoolData.length > 0) {
             userInterestRate = abi.decode(releaseOrMintIn.sourcePoolData, (uint256));
        } else {
            // Default behaviour if no rate sent (e.g. use current global rate)
            userInterestRate = IRebaseToken(address(i_token)).getInterestRate();
        }

        // Mint tokens to the receiver
        IRebaseToken(address(i_token)).mint(releaseOrMintIn.receiver, releaseOrMintIn.amount, userInterestRate);

        // Construct the output
        releaseOrMintOut = Pool.ReleaseOrMintOutV1({...});
        return releaseOrMintOut;
    }
    ```

## Deploying and Configuring with Foundry Scripts

The deployment and configuration of the `RebaseToken`, `Vault`, and `RebaseTokenPool` contracts, along with the necessary CCIP setup, were managed using Foundry scripts (`.s.sol` files).

*   **`Deployer.s.sol`:** This script handles the deployment of the core contracts (`RebaseToken`, `RebaseTokenPool`, `Vault`) to the target blockchain.
    *   **Permissions (`SetPermissions`):** Includes logic to call `grantMintAndBurnRole` on the deployed `RebaseToken`, granting the necessary permissions to the `Vault` and `RebaseTokenPool` contracts.
    *   **Admin Roles (`SetAdmin`):** Contains steps to interact with the CCIP Token Admin Registry contract, setting the required administrative roles for the deployed `RebaseTokenPool`.
*   **`ConfigurePools.s.sol`:** This script performs the CCIP-specific configuration after the pools are deployed on their respective chains. It involves:
    *   Registering the pools with the CCIP Router.
    *   Enabling the communication "lane" between the source and destination chain pools.
    *   Setting operational parameters like rate limits for the token pool.
*   **`BridgeTokens.s.sol`:** A utility script designed to initiate a cross-chain token transfer via CCIP. It automates the process of:
    *   Approving the CCIP Router contract to spend the user's `RebaseToken`.
    *   Calculating the required CCIP fee.
    *   Constructing the `Client.EVM2AnyMessage` struct containing transfer details (destination chain selector, receiver address, token address, amount, etc.).
    *   Calling the `ccipSend` function on the source chain's CCIP Router contract, passing the message and the fee.

## Comprehensive Testing with Foundry

Rigorous testing was performed using the Foundry framework to ensure the correctness of both the core token logic and the cross-chain integration.

*   **Fuzz Tests (`RebaseToken.t.sol`):**
    *   These tests focus on the `RebaseToken` and `Vault` contracts in isolation.
    *   They use Foundry's fuzzing engine to call functions like `deposit`, `redeem`, `transfer`, and `mint`/`burn` (indirectly) with a wide range of randomized inputs.
    *   Foundry's cheatcode `vm.warp(timestamp)` is used extensively to simulate the passage of time, allowing verification of the interest accrual logic over different durations.
    *   Due to potential minor precision differences in interest calculations over simulated time, assertions on balances often use `assertApproxEqAbs` instead of strict equality checks (`assertEq`).

*   **Fork Tests (`CrossChain.t.sol`):**
    *   These tests validate the end-to-end cross-chain transfer functionality.
    *   They leverage **CCIP Local**, a tool provided by Chainlink to simulate the entire CCIP network (Routers, On-Ramp, Off-Ramp, Commit Store) locally. The `ccipLocalSimulatorFork` helper contract simplifies interaction with CCIP Local within Foundry tests.
    *   Foundry's fork testing cheatcodes (`vm.createFork`, `vm.createSelectFork`) are used to create local copies (forks) of the target testnets (e.g., Sepolia and zkSync Sepolia).
    *   The deployment and configuration scripts (`Deployer.s.sol`, `ConfigurePools.s.sol`) are run on these local forks.
    *   CCIP Local is configured to route messages between these forks.
    *   A cross-chain transfer is initiated using logic similar to `BridgeTokens.s.sol`.
    *   The `ccipLocalSimulatorFork.switchChainAndRouteMessage()` function is called to simulate the CCIP relay process.
    *   Assertions verify that the sender's balance decreased correctly on the source chain fork and the receiver's balance increased correctly (including any interest rate handling) on the destination chain fork.

## Testnet Deployment and Cross-Chain Execution

Following successful local testing, the contracts and configuration were deployed to live testnets.

*   **Deployment:** The `RebaseToken` and `RebaseTokenPool` contracts were deployed to the Sepolia and zkSync Sepolia testnets. This process was likely automated using bash scripts that executed the Foundry deployment scripts (`Deployer.s.sol`).
*   **CCIP Configuration:** The necessary CCIP setup steps (setting admin roles via `SetAdmin`, configuring lanes and rate limits via `ConfigurePools.s.sol`) were executed on the testnets, connecting the deployed pools.
*   **Cross-Chain Transfer:** A real cross-chain transfer was initiated (e.g., from Sepolia to zkSync Sepolia) by running the `BridgeTokens.s.sol` Foundry script, targeting the deployed contracts and CCIP routers on the testnets.
*   **Verification:** The successful completion and details of the cross-chain transaction were confirmed by monitoring its progress and final status using the official **CCIP Explorer** web interface.