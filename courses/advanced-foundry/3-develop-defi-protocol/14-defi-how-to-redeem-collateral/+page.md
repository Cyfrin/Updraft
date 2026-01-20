---
title: redeemCollateral
---

_Follow along the course with this video._

---

Our current DSCEngine.sol for reference:

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
    error DSCEngine__BreaksHealthFactor(uint256 healthFactor);
    error DSCEngine__MintFailed();

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
    uint256 private constant LIQUIDATION_THRESHOLD = 50;
    uint256 private constant LIQUIDATION_PRECISION = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;

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
    function mintDsc(uint256 amountDscToMint) external moreThanZero(amountDscToMint) nonReentrant {
        s_DSCMinted[msg.sender] += amountDscToMint;
        _revertIfHealthFactorIsBroken(msg.sender);
        bool minted = i_dsc.mint(msg.sender, amountDscToMint);

        if(!minted){
            revert DSCEngine__MintFailed();
        }
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

        uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / LIQUIDATION_PRECISION;

        return (collateralAdjustedForThreshold * PRECISION) / totalDscMinted;
    }

    function _getAccountInformation(address user) private view returns(uint256 totalDscMinted,uint256 collateralValueInUsd){
        totalDscMinted = s_DSCMinted[user];
        collateralValueInUsd = getAccountCollateralValue(user);
    }

    function _revertIfHealthFactorIsBroken(address user) internal view {
        uint256 userHealthFactor = _healthFactor(user);
        if(userHealthFactor < MIN_HEALTH_FACTOR){
            revert DSCEngine__BreaksHealthFactor(userHealthFactor);
        }
    }

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

    /*
    * @param tokenCollateralAddress: the address of the token to deposit as collateral
    * @param amountCollateral: The amount of collateral to deposit
    * @param amountDscToMint: The amount of DecentralizedStableCoin to mint
    * @notice: This function will deposit your collateral and mint DSC in one transaction
    */
    function depositCollateralAndMintDsc(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDscToMint){
        depositCollateral(tokenCollateralAddress, amountCollateral);
        mintDsc(amountDscToMint);
    }

    function redeemCollateralForDsc() external {}

    function redeemCollateral() external {}

    function burnDsc() external {}

    function liquidate() external {}

    function getHealthFactor() external view {}
}
```

</details>


### redeemCollateral

So far we've afforded our users a way to put money _into_ the protocol, they'll certainly need a way to get it out. Let's work through `redeemCollateral` next. This function is going to need to do a couple things:

1. Check that withdrawing the requested amount doesn't cause the account's `Health Factor` to break (fall below 1)
2. transfer the requested tokens from the protocol to the user

```solidity
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) public moreThanZero(amountCollateral) nonReentrant{}
```

> ❗ **PROTIP**
> DRY: Don't Repeat Yourself. We'll be employing this concept from computer science later when we return to this function to refactor things.

We append the `moreThanZero` and `nonReentrant` modifiers to our function to prevent zero value transactions and as a safeguard for reentrancy.

With checks in place, we'll want to update the internal accounting of the contract to reflect the withdrawal. This updates contract state, so of course we'll want to emit a new event.

```solidity
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) public moreThanZero(amountCollateral) nonReentrant{
    s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
    emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral);
}
```

> ❗ **NOTE**
> We're relying on the Solidity compiler to revert if a user attempts to redeem an amount greater than their balance. More recent versions of the Solidity compiler protect against unsafe math.

Don't forget to add your event to the top of your contract as well.

```solidity
////////////////
//   Events   //
////////////////

event CollateralDeposited(address indexed user, address indexed token, uint256 indexed amount);
event CollateralRedeemed(address indexed user, address indexed token, uint256 indexed amount);
```

At this point in our function, we'll want to transfer the redeemed tokens to the user, but we're caught in a trap of sorts. Part of our requirements for this function is that the user's `Health Factor` mustn't be broken after the transfer as occurred. In situations like these, you may see the `CEI (Checks, Effects, Interactions)` pattern broken sometimes. A protocol _could_ call a function prior to the transfer to calculate changes and determine if the `Health Factor` is broken, before a transfer occurs, but this is often quite gas intensive. For this reason protocols will often sacrifice `CEI` for efficiency.

```solidity
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) public moreThanZero(amountCollateral) nonReentrant{
    s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
    emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral);

    bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, amountCollateral);
    if(!success){
        revert DSCEngine__TransferFailed();
    }

    _revertIfHealthFactorIsBroken(msg.sender);
}
```

This looks great. What does a user do when they want to exit the protocol entirely though? Redeeming all of their collateral through this function will revert due to the user's `Health Factor` breaking. The user would first need to burn their `DSC` to release their collateral. This two step process would be cumbersome (much liked `depositCollateral` and `mintDsc` was), so let's write the `burnDsc` function, then combine the two.

### burnDsc

In order for a user to burn their `DSC`, the tokens will need to be transferred to `address(0)`, and their balance within our `s_DSCMinted` mapping will need to be updated. Rather than transferring to `address(0)` ourselves, our function will take the tokens from the user and then call the inherent burn function on the token. We'll apply the `moreThanZero` modifier for our usual reasons (non-zero transactions only!).

```solidity
function burnDsc(uint256 amount) external moreThanZero(amount){
    s_DSCMinted[msg.sender] -= amount;
    bool success = i_dsc.transferFrom(msg.sender, address(this), amount);
    if(!success){
        revert DSCEngine__TransferFailed();
    }
}
```

The conditional above, should technically never hit, since transferFrom will revert with its own error if it fails, but we've a backstop, just in case.

We'll need to call burn on our `DSC` now.

```solidity
function burnDsc(uint256 amount) public moreThanZero(amount){
    s_DSCMinted[msg.sender] -= amount;
    bool success = i_dsc.transferFrom(msg.sender, address(this), amount);
    if(!success){
        revert DSCEngine__TransferFailed();
    }
    i_dsc.burn(amount);
    _revertIfHealthFactorIsBroken(msg.sender);
}
```

> ❗ **NOTE**
> We've added `_revertIfHealthFactorIsBroken`, but realistically, it should never hit, the user is burning "debt" and this should only improve the `Health Factor` of the account. A gas audit may remove this line.

### redeemCollateralForDsc

With both `redeemCollateral` and `burnDsc` written, we can now combine the functionality into one transaction.

```solidity
/*
 * @param tokenCollateralAddress: the collateral address to redeem
 * @param amountCollateral: amount of collateral to redeem
 * @param amountDscToBurn: amount of DSC to burn
 * This function burns DSC and redeems underlying collateral in one transaction
 */
function redeemCollateralForDsc(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDscToBurn) external {
    burnDsc(amountDscToBurn);
    redeemCollateral(tokenCollateralAddress, amountCollateral);
}
```

### Wrap Up

Alright, the `DSCEngine` now has means for a user to both deposit and redeem collateral, as well as mint and burn `DSC`. We've also written functions which combine these calls to save steps in transactions.

As I mentioned briefly above, we're going to refactor these functions later on, but I wanted you to see the reasoning behind the refactor when we hit that point.

In the next lesson we approach liquidations! See you soon!
