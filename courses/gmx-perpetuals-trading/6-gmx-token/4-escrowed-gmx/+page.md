## Understanding Escrowed GMX (esGMX): Staking vs. Vesting

This lesson explores Escrowed GMX (esGMX) within the GMX ecosystem, building upon previous discussions about staking regular GMX tokens. We will examine what esGMX is, how it has historically been acquired, and the two primary actions you can take with it: staking for rewards or vesting it into regular GMX. You can find the relevant options on the GMX "Earn" page, specifically under the "Escrowed GMX" and "Vest" sections.

## What is Escrowed GMX (esGMX)?

Escrowed GMX, or esGMX, is a specific type of token utilized by the GMX platform. According to the official GMX documentation, esGMX has historically been distributed as an *incentive* to platform users.

Examples of activities that previously rewarded users with esGMX include:

*   Staking regular GMX tokens.
*   Holding or staking GLP (the platform's liquidity provider token).
*   Participating in referral programs.
*   Other potential platform incentive programs.

It's important to note that esGMX functions as an escrowed token, meaning it typically has limitations, such as being non-transferable initially. While these incentive programs were a source of esGMX, active programs for earning new esGMX may vary over time.

If you possess esGMX tokens, there are two main pathways available to utilize them.

## The Two Core Functions of esGMX

Based on the GMX documentation and platform functionality, holding esGMX presents two distinct options:

1.  **Stake esGMX:** You can stake your esGMX tokens to earn rewards, much like staking regular GMX.
2.  **Vest esGMX:** You can initiate a vesting process to convert your esGMX tokens into regular, transferable GMX tokens over a defined period (typically one year).

Let's delve into each of these options in more detail.

## Option 1: Staking esGMX for Rewards

The primary appeal of staking esGMX lies in its potential to generate rewards comparable to staking the main GMX token.

**Reward Equivalence:**

The GMX documentation explicitly states: "Each staked Escrowed GMX token will earn the *same amount* of GMX rewards as a regular GMX token." To understand how this is implemented, we can examine the relevant smart contracts.

**Smart Contract Verification:**

Interactions for staking both GMX and esGMX are primarily managed by the `RewardRouterV2.sol` contract, found within the `gmx-contracts` repository.

1.  **Staking Entry Points:** The contract contains distinct public functions for staking each token type:

    ```solidity
    // Function called when staking regular GMX
    function stakeGmx(uint256 _amount) external nonReentrant {
        _stakeGmx(msg.sender, msg.sender, gmx, _amount); // gmx is the GMX token address
    }

    // Function called when staking Escrowed GMX
    function stakeEsGmx(uint256 _amount) external nonReentrant {
        _stakeGmx(msg.sender, msg.sender, esGmx, _amount); // esGmx is the esGMX token address
    }
    ```
    Critically, both `stakeGmx` and `stakeEsGmx` call the *same internal function*, `_stakeGmx`, merely passing the respective token address (GMX or esGMX). This indicates a shared underlying staking logic.

2.  **Internal Staking Logic (`_stakeGmx`) and Reward Trackers:** The `_stakeGmx` function orchestrates the staking process through a series of `RewardTracker` contracts:

    ```solidity
    function _stakeGmx(address _fundingAccount, address _account, address _token, uint256 _amount) internal {
        // ... validation ...

        // Stake GMX or esGMX into stakedGmxTracker to earn esGMX rewards
        IRewardTracker(stakedGmxTracker).stakeForAccount(_fundingAccount, _account, _token, _amount);

        // Stake the receipt token from stakedGmxTracker into bonusGmxTracker to earn bnGMX rewards
        IRewardTracker(bonusGmxTracker).stakeForAccount(_account, _account, address(stakedGmxTracker), derivedAmount);

        // Stake the receipt token from bonusGmxTracker into extendedGmxTracker to earn GMX rewards
        IRewardTracker(extendedGmxTracker).stakeForAccount(_account, _account, address(bonusGmxTracker), derivedAmount);

        // Stake the receipt token from extendedGmxTracker into feeGmxTracker to earn WETH rewards
        IRewardTracker(feeGmxTracker).stakeForAccount(_account, _account, address(extendedGmxTracker), derivedAmount);

        // ... sync voting power, emit event ...
    }
    ```
    This code reveals a reward cascade:
    *   Your initial GMX or esGMX is staked in `stakedGmxTracker`, which distributes `esGMX` rewards. Examination of this contract (e.g., on Arbiscan) confirms its `rewardToken` is indeed esGMX.
    *   A tracker token representing your stake in `stakedGmxTracker` is then staked in `bonusGmxTracker`, distributing `bnGMX` (Bonus GMX).
    *   Its tracker token is staked in `extendedGmxTracker`, distributing regular `GMX`.
    *   Finally, its tracker token is staked in `feeGmxTracker`, distributing `WETH` (Wrapped Ether).

**Staking Conclusion:**

The smart contracts confirm that staking *either* regular GMX or esGMX initiates the exact same reward distribution mechanism via the chain of Reward Tracker contracts. Therefore, staked esGMX yields the same types and amounts of rewards (esGMX, bnGMX, GMX, WETH) as staked GMX, aligning perfectly with the documentation's claim. If you have esGMX and wish to earn the full spectrum of GMX staking rewards, staking it is the appropriate action.

## Option 2: Vesting esGMX to Obtain GMX

The second primary use for esGMX is vesting, which provides a direct path to convert your non-transferable esGMX into standard, transferable GMX tokens.

**Concept and Process:**

Vesting is designed for users who prefer to eventually hold regular GMX instead of staking esGMX for ongoing, multi-asset rewards. The process involves locking your esGMX for a predetermined period, specified in the documentation as one year, during which it gradually converts into GMX.

**Locating the Vesting Interface:**

The vesting functionality is not located within the main "Escrowed GMX" section on the GMX "Earn" page. Instead, you need to scroll further down the page to the "Vest" section, typically found below the GLP/GM pool information.

**Using the Vesting Vault:**

Within the "Vest" section, you will likely see entries for a "GMX Vault" and potentially a "GLP Vault." To vest esGMX, you focus on the "GMX Vault."

1.  Click the "Deposit" button associated with the GMX Vault.
2.  A modal window will appear, specifically for depositing into this vault.
3.  This modal requires you to select and deposit your `esGMX` tokens.
4.  Once deposited, your esGMX begins the one-year vesting schedule.
5.  Over the course of the year, you will be able to claim the corresponding amount of regular GMX tokens as they become vested.

**Vesting Conclusion:**

Vesting offers a clear alternative to staking. It foregoes the immediate, diverse rewards stream (esGMX, bnGMX, GMX, WETH) generated by staking in favor of a time-locked conversion solely into the main GMX token. This option suits users whose primary goal is to accumulate standard GMX from their earned esGMX incentives over the long term.

In summary, esGMX serves as an incentive token on the GMX platform. Holders can either stake it to earn rewards identical to staked GMX or vest it over one year to convert it directly into regular GMX tokens. The choice depends on whether the user prioritizes immediate, diverse rewards or long-term conversion into the platform's primary token.