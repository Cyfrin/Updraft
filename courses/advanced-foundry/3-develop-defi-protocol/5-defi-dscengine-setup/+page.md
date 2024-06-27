---
title: DSCEngine.sol Setup
---

_Follow along the course with this video._



# Building a Decentralized Stablecoin Engine

Building a stablecoin engine is not for the faint-hearted. But with the right tools and a dash of code fluency, you too can do it. If you're at this stage and feel a sense of achievement, clap yourself on the back! Alternatively, pause this and try your hand at crafting your own tests and deploy scripts. But don't get too comfortable just yet; we're only getting started.

We'll approach this project a bit differently from the ones people are used to. We won't shy away from doing some tests along the way to ensure we're on the right course. Let's get right into it and create an engine for our decentralized stablecoin (DSC) system.

### Creating the DSC Engine

Start by creating a new file `DSCEngine.sol`. This will serve as our centralized stablecoin engine. Now, launch right into building the engine.

Next, copy and paste this beginning part into the engine to lay the groundwork for our contract. We have our SPDX statement, layout of contracts, pragma solidity etc:

```javascript
// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract DSCEngine{
    //engine body
}
```

Let's not forget to include a lot of Nat spec to our contract body. More detailed information in our code makes it easier for people to understand - think of it as making notations in a book that hundreds of people will read.

```javascript
/*
 * @title DSCEngine
 * @author Patrick Collins
 *
 * The system is designed to be as minimal as possible, and have the tokens maintain a 1 token == $1 peg at all times.
 * This is a stablecoin with the properties:
 * - Exogenously Collateralized
 * - Dollar Pegged
 * - Algorithmically Stable
 *
 * It is similar to DAI if DAI had no governance, no fees, and was backed by only WETH and WBTC.
 *
 * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
 * for minting and redeeming DSC, as well as depositing and withdrawing collateral.
 * @notice This contract is based on the MakerDAO DSS system
 */
```

<img src="/foundry-defi/5-defi-dscengine-setup/defi-dscengine-setup1.PNG" style="width: 100%; height: auto;">

The DSC system's role is to retain tokens at a one token-equals-$1 peg. It bears similar features to DAI in terms of being a stablecoin. Still, it operates without governance, fees, and runs only on wrapped ETH and wrapped Bitcoin.

### Core Functions of the DSC Engine

With our contract body in place, it's time to think about the core functions of our project. What actions should our system facilitate?

Firstly, our system should be able to deposit collateral and mint DSC tokens. This action allows users to deposit either their DAI or Bitcoin to generate our stablecoin.

Secondly, the system should also facilitate the redemption of collateral or DSC. Once users have finished using our stablecoin, they should be able to exchange it back for the collateral they used initially.

Another critical function is the ability to burn DSC. This functionality matters when a user fears having too much stablecoin and very little collateral. It provides a quick way to get more collateral than DSC, thus maintaining the balance within the system. Accordingly, our DSC system should always have more collateral than DSC.

We also need a liquidation function. Its importance comes into play when the price of a user's collateral falls too much. For example, if a user deposits collateral worth $100 and uses it to mint $50 worth of DSC, if the ETH price drops to $40, the collateral is less than DSC - a scenario we mustn't let happen. In such a case, the user should be liquidated and knocked off the system.

The fifth core function is the `healthFactor`. This external view function, `getHealthFactor`, allows us to see how healthy a particular user's portfolio is.

Lastly, we will need functions for `depositCollateral`, `redeemCollateral`, and `mintDSC`.

```javascript
    // Functions we'll need
    function depositCollateralAndMintDSC() external {};
    function depositCollateral() external {};
    function redeemCollateralForDSC() external {};
    function redeemCollateral() external {};
    function mintDSC() external {};
    function burnDSC() external {};
    function liquidate() external {};
    function getHealthFactor() external view {};
```

### Testing as You Build

Testing as we go on ensures that we're on the right track. Consider writing tests describing what each function should do to the system.

In conclusion, we've successfully begun constructing the engine for the Decentralized Stablecoin (DSC) system. It might feel overwhelming, but with diligence, testing, and code readability, we're off to a good start.

We'll be looking at tests and a deploy script next as well as additionial functions to improve our DSC System.

<img src="/foundry-defi/5-defi-dscengine-setup/defi-dscengine-setup2.PNG" style="width: 100%; height: auto;">

Happy coding!
