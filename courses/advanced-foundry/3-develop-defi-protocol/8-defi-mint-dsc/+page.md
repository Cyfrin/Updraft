---
title: mintDsc
---

_Follow along the course with this video._

---

### mintDsc

Now that we've a way to deposit collateral, the next logical step would be to mint DSC.

The `mintDsc` function is likely going to be surprisingly complex. There are a number of things we'll need to accomplish when minting our stablecoin. Primarily we'll need to check if the account's collateral value supports the amount of `DSC` being minted. To do this we'll need to engage `Chainlink` price feeds, do value conversions and more. Let's get started.

```solidity
///////////////////////////
//   External Functions  //
///////////////////////////

...

/*
    * @param amountDscToMint: The amount of DSC you want to mint
    * You can only mint DSC if you hav enough collateral
    */
function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {}
```

We've added our modifiers to protect against reentrancy and constrain the `amountDscToMint` to being above zero. Much like we track the collateral a user has deposited, we'll also have to track the `DSC` which has been minted. Sounds like another mapping!

```solidity
/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
DecentralizedStableCoin private immutable i_dsc;
mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
```

And now, in following `CEI (Checks, Effects, Interactions)`, we'll want to update the user's mapped balance to reflect the amount being minted in our function.

```solidity
/*
    * @param amountDscToMint: The amount of DSC you want to mint
    * You can only mint DSC if you hav enough collateral
    */
function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {
    s_DSCMinted[msg.sender] += amountDscToMint;
}
```

Our next step is something that will warrant it's own function, this is going to be something we check in a few placed in our protocol. We'll name the function `_revertIfHealthFactorIsBroken`. The purpose of this will be to assure that changes in a user's DSC or collateral balances don't result in the user's position being `under-collateralized`.

We'll need a new section for this function, according to our contract layout guideline, so let's jump to it.

```solidity
///////////////////////////////////////////
//   Private & Internal View Functions   //
///////////////////////////////////////////

function _revertIfHealthFactorIsBroken(address user){}
```

`Health Factor` is a concept borrowed from Aave.

![defi-mint-dsc1](/foundry-defi/7-defi-mint-dsc/defi-mint-dsc1.PNG)

In addition to the above, we'll need a function which checks an account's `Health Factor`. Let's write that now.

```solidity
///////////////////////////////////////////
//   Private & Internal View Functions   //
///////////////////////////////////////////

function _revertIfHealthFactorIsBroken(address user) internal view {}

/*
 * Returns how close to liquidation a user is
 * If a user goes below 1, then they can be liquidated.
*/
function _healthFactor(address user) private view returns(uint256){}
```

So, how are we going to determine an account's `Health Factor`? What will we need?

1. Total DSC minted
2. Total Collateral **_value_**

In order to do this, we're actually going to create _another_ function, stick with me here. Our next function will return some basic details of the user's account including their `DSC` minted and the collateral value.

```solidity
/*
 * Returns how close to liquidation a user is
 * If a user goes below 1, then they can be liquidated.
*/
function _healthFactor(address user) private view returns(uint256){
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = _getAccountInformation(user);
}

function _getAccountInformation(address user) private view returns(uint256 totalDscMinted,uint256 collateralValueInUsd){
    totalDscMinted = s_DSCMinted[user];
    collateralValueInUsd = getAccountCollateralValue(user);
}
```

A user's total minted `DSC` is easy enough to acquire by referencing our protocol's mapping of this, but a user's collateral value is going to take some math and a price feed. This logic will be held by a new function, `getAccountCollateralValue`. This function we'll make public, so anyone can call it. Private and view functions are the very last thing in our contract layout, so we'll add our new function to the bottom!

```solidity
//////////////////////////////////////////
//   Public & External View Functions   //
//////////////////////////////////////////

function getAccountCollateralValue(address user) public pure {}
```

So, how do we determine the total USD value of a user's collateral? Since the user may have multiple types of collateral (wETH and wBTC in our case), we'll need a way to loop through the collateral a user has, acquire the amount of each collateral token and map those amounts to USD values of those amounts.

Since we're only using wETH and wBTC in our protocol, we _could_ hardcode these tokens into the contract, but let's make the protocol a little more agnostic. This will allow someone to deploy their own fork, which accepts their own types of collateral. We'll accomplish this by declaring a new state variable:

```solidity
/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
DecentralizedStableCoin private immutable i_dsc;
mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
address[] private s_collateralTokens;
```

We'll assign an array of compatible token addresses in our constructor:

```solidity
///////////////////
//   Functions   //
///////////////////
constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
    if(tokenAddresses.length != priceFeedAddresses.length){
        revert DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength();
    }

    for(uint256 i=0; i < tokenAddresses.length; i++){
        s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
        s_collateralTokens.push(tokenAddresses[i]);
    }
    i_dsc = DecentralizedStableCoin(dscAddress);
}
```

With this array set up, we can now loop through this in our `getAccountCollateral` function to calculate it's total value in USD.

```solidity
//////////////////////////////////////////
//   Public & External View Functions   //
//////////////////////////////////////////

function getAccountCollateralValue(address user) public view returns (uint256 totalCollateralValueInUsd) {
    for(uint256 i = 0; i < s_collateralTokens.length; i++){
        address token = s_collateralTokens[i];
        uint256 amount = s_collateralDeposited[user][token];
        totalCollateralValueInUsd += ...
    }
    return totalCollateralValueInUsd;
}
```

Hmm... We've hit the point where we need to know the USD value of our collateral tokens in order to calculate our totals. This is probably _another_ function we're going to want.

```solidity
function getUsdValue(address token, uint256 amount) public view returns(uint256){}
```

This is where our `Chainlink` price feeds come into play. We're going to need to import the `AggregatorV3Interface`, like we did in previous sections.

```solidity
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { DecentralizedStableCoin } from "./DecentralizedStableCoin.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
```

> ❗ **NOTE**
> The import path of `AggregatorV3Interface` has changed since the Video's filming, the above should be updated as of `06/10/2024`. If you run into issues, double check the version you're installing.

If you haven't installed the `Chainlink` contract kit yet, let's do that now.

```bash
forge install smartcontractkit/chainlink-brownie-contracts@0.6.1
```

And of course, we'll append this to our remappings within `foundry.toml`.

```toml
remappings = [
  "@chainlink/contracts/=lib/chainlink-brownie-contracts/contracts",
  "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts",
]
```

Alright, back to our `getUsdValue` function.

```solidity
function getUsdValue(address token, uint256 amount) public view returns(uint256){
    AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
    (,int256 price,,,) = priceFeed.latestRoundData();
}
```

This should return the latest price of our token, to 8 decimal places. We can verify the decimals returned by any given price feed by referencing the [**Chainlink Price Feed Contract Addresses**](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1) page.

Now, we're unable to simply take this returned price and multiply it by our amount, the precision of both these values is going to be different, the amount passed to this function is expected to have 18 decimal places where as our price has only 8. To resolve this we'll need to multiple our price by `1e10`. Once our precision matches, we can multiple this by our amount, then divide by `1e18` to return a reasonably formatted number for USD units.

```solidity
function getUsdValue(address token, uint256 amount) public view returns(uint256){
    AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
    (,int256 price,,,) = priceFeed.latestRoundData();

    return ((uint256(price * 1e10) * amount) / 1e18);
}
```

This looks good.. but I hate magic numbers. Let's declare constants for `1e10` and `1e18` and replace these in our function.

```solidity
/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
DecentralizedStableCoin private immutable i_dsc;
mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
address[] private s_collateralTokens;

uint256 private constant ADDITIONAL_FEED_PRECISION = 1e10;
uint256 private constant PRECISION = 1e18;

...

function getUsdValue(address token, uint256 amount) public view returns(uint256){
    AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
    (,int256 price,,,) = priceFeed.latestRoundData();

    return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
}
```

Much better.

The last thing we need to return to, to finish up, is our `getAccountCollateralValue` function. We can now call `getUsdValue` in our loop to calculate a user's `totalCollateralValue`.

```solidity
//////////////////////////////////////////
//   Public & External View Functions   //
//////////////////////////////////////////

function getAccountCollateralValue(address user) public view returns (uint256 totalCollateralValueInUsd) {
    for(uint256 i = 0; i < s_collateralTokens.length; i++){
        address token = s_collateralTokens[i];
        uint256 amount = s_collateralDeposited[user][token];
        totalCollateralValueInUsd += getUsdValue(token, amount);
    }
    return totalCollateralValueInUsd;
}
```

### Wrap Up

Whew, this long chain of functions all started with...

```solidity
function _getAccountInformation(address user) private view returns(uint256 totalDscMinted,uint256 collateralValueInUsd){
    totalDscMinted = s_DSCMinted[user];
    collateralValueInUsd = getAccountCollateralValue(user);
}
```

But, we now have a way to calculate the collateral value users hold, in USD.

If you need to take some time to go through this a couple times, I don't blame you. We did some jumping around here, but compartmentalizing all of this logic into its own functions will be beneficial for us long term.

This is the point where I would absolutely be screaming to write some tests, we've got some entwined functions and some math going on, these things definitely need to be checked. We'll hold off for now, let's get through a few more functions first.

<details>
<summary>DSCEngine.sol</summary>

```solidity
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

// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { DecentralizedStableCoin } from "./DecentralizedStableCoin.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

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
 * Our DSC system should always be "overcollateralized". At no point, should the value of
 * all collateral < the $ backed value of all the DSC.
 *
 * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
 * for minting and redeeming DSC, as well as depositing and withdrawing collateral.
 * @notice This contract is based on the MakerDAO DSS system
 */
contract DSCEngine is ReentrancyGuard {

    ///////////////////
    //     Errors    //
    ///////////////////

    error DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
    error DSCEngine__NeedsMoreThanZero();
    error DSCEngine__TokenNotAllowed(address token);
    error DSCEngine__TransferFailed();

    /////////////////////////
    //   State Variables   //
    /////////////////////////

    mapping(address token => address priceFeed) private s_priceFeeds;
    DecentralizedStableCoin private immutable i_dsc;
    mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
    mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
    address[] private s_collateralTokens;

    uint256 private constant ADDITIONAL_FEED_PRECISION = 1e10;
    uint256 private constant PRECISION = 1e18;

    ////////////////
    //   Events   //
    ////////////////

    event CollateralDeposited(address indexed user, address indexed token, uint256 indexed amount);

    ///////////////////
    //   Modifiers   //
    ///////////////////

    modifier moreThanZero(uint256 amount){
        if(amount <=0){
            revert DSCEngine__NeedsMoreThanZero();
        }
        _;
    }

    modifier isAllowedToken(address token) {
        if (s_priceFeeds[token] == address(0)) {
            revert DSCEngine__TokenNotAllowed(token);
        }
        _;
    }

    ///////////////////
    //   Functions   //
    ///////////////////

    constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
        if(tokenAddresses.length != priceFeedAddresses.length){
            revert DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength();
        }

        for(uint256 i=0; i < tokenAddresses.length; i++){
            s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
            s_collateralTokens.push(tokenAddresses[i]);
        }
        i_dsc = DecentralizedStableCoin(dscAddress);
    }


    ///////////////////////////
    //   External Functions  //
    ///////////////////////////

    /*
     * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
     * @param amountCollateral: The amount of collateral you're depositing
     */
    function depositCollateral(
        address tokenCollateralAddress,
        uint256 amountCollateral
    )
        external
        moreThanZero(amountCollateral)
        nonReentrant
        isAllowedToken(tokenCollateralAddress)
    {
        s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
        emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
        bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
    }

    /*
    * @param amountDscToMint: The amount of DSC you want to mint
    * You can only mint DSC if you hav enough collateral
    */
    function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {
    s_DSCMinted[msg.sender] += amountDscToMint;
    }

    ///////////////////////////////////////////
    //   Private & Internal View Functions   //
    ///////////////////////////////////////////

    /*
    * Returns how close to liquidation a user is
    * If a user goes below 1, then they can be liquidated.
    */
    function _healthFactor(address user) private view returns(uint256){
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = _getAccountInformation(user);
    }

    function _getAccountInformation(address user) private view returns(uint256 totalDscMinted,uint256 collateralValueInUsd){
        totalDscMinted = s_DSCMinted[user];
        collateralValueInUsd = getAccountCollateralValue(user);
    }

    function revertIfHealthFactorIsBroken(address user){}

    //////////////////////////////////////////
    //   Public & External View Functions   //
    //////////////////////////////////////////

    function getAccountCollateralValue(address user) public view returns (uint256 totalCollateralValueInUsd) {
        for(uint256 i = 0; i < s_collateralTokens.length; i++){
            address token = s_collateralTokens[i];
            uint256 amount = s_collateralDeposited[user][token];
            totalCollateralValueInUsd += getUsdValue(token, amount);
        }
        return totalCollateralValueInUsd;
    }

    function getUsdValue(address token, uint256 amount) public view returns(uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
        (,int256 price,,,) = priceFeed.latestRoundData();

        return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
    }

    function depositCollateralAndMintDsc() external {}

    function redeemCollateralForDsc() external {}

    function redeemCollateral() external {}

    function burnDsc() external {}

    function liquidate() external {}

    function getHealthFactor() external view {}
}
```

</details>

