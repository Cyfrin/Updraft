---
title: depositCollateral
---

_Follow along the course with this video._

---

### depositCollateral

I think the easiest place to start with filling out the contract is going to be depositCollateral. This makes sense to me since it'll surely be one of the first places a user interacts with our protocol.

To deposit collateral, users are going to need the address for the type of collateral they're depositing (wETH or wBTC), and the amount they want to deposit. Easy enough.

> ❗ **NOTE**
> Don't forget the NATSPEC!

```solidity
///////////////////
//   Functions   //
///////////////////

///////////////////////////
//   External Functions  //
///////////////////////////

/*
 * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
 * @param amountCollateral: The amount of collateral you're depositing
 */
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external {

}
```

Now, the first thing I consider when I see a function passing values like this is sanitization. There are always going to be considerations for the parameters being passed to public functions that we should account for. For example, it's often inappropriate for address(0) to be passed, or negative numbers etc.

It's likely that many functions in a protocol will require this kind of sanitation and rather than rewriting conditionals a dozen times, we should leverage modifiers.

Our function layout reference says modifiers should come before our functions, so let's adhere to that. We'll need a new error is well.

```solidity

contract DSCEngine {

    ///////////////////
    //     Errors    //
    ///////////////////

    error DSCEngine__NeedsMoreThanZero();

    ///////////////////
    //   Modifiers   //
    ///////////////////

    modifier moreThanZero(uint256 amount){
        if(amount <=0){
            revert DSCEngine__NeedsMoreThanZero();
        }
        _;
    }

...

}
```

This looks great! This should assure that the amount of collateral passed to our depositCollateral function is greater than zero. The other parameter of this function is the tokenCollateralAddress. Since we're only meaning to support wETH and wBTC, we should make a second modifier to assure only these allowed tokens are deposited as collateral.

```solidity
modifier isAllowedToken(address token){

}
```

Currently, we don't have any reference to use in our conditional for this modifier. We'll need to create a mapping as a state variable to track the tokens which are compatible with our protocol.

We know we're going to be using chainlink pricefeeds, so what we can do is have this mapping be a token address, to it's associated pricefeed. In our modifier, if a pricefeed isn't found for the passed token address, it'll revert!

```solidity
/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
```

We'll probably want to initialize this mapping in our contract's constructor. To do this, we'll have our constructor take a list of token addresses and a list of priceFeed addresses, each index of one list will be mapped to the respective index of the other on deployment. We also know that the DSCEngine is going to need to know about the DecentralizeStablecoin contract. With all this in mind, let's set up our constructor.

```solidity
///////////////////
//   Functions   //
///////////////////
constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){}
```

Here's where we should definitely perform a sanity check, since a contract is only constructed once. If the indexes of our lists are meant to be mapped to each other, we should assure the lengths of the lists match, and if they don't we can revert with another custom error.

```solidity
///////////////////
//     Errors    //
///////////////////

error DSCEngine__NeedsMoreThanZero();
error DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength();

...

///////////////////
//   Functions   //
///////////////////
constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
    if(tokenAddresses.length != priceFeedAddresses.length){
        revert DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength();
    }
}
```

Now we can add our for loop which will map our two lists of addresses to each other.

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
    }
}
```

We're going to be doing lots with our `dscEngine`. We should declare this as an immutable variable and then assign it in our constructor.

> ❗ **NOTE**
> Don't forget to import `DecentralizedStableCoin.sol`!


```solidity
import {DecentralizedStableCoin} from "./DecentralizedStableCoin.sol";

...

/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
DecentralizedStableCoin private immutable i_dsc;

...

///////////////////
//   Functions   //
///////////////////
constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
    if(tokenAddresses.length != priceFeedAddresses.length){
        revert DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength();
    }

    for(uint256 i=0; i < tokenAddresses.length; i++){
        s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
    }
    i_dsc = DecentralizedStableCoin(dscAddress);
}
```

Remember, we were doing all this because we need a new modifier that checks our token addresses! Now that things are established in our constructor, we can write this modifier.

```solidity

contract DSCEngine {

    ///////////////////
    //     Errors    //
    ///////////////////

    error DSCEngine__NeedsMoreThanZero();
    error DSCEngine__TokenNotAllowed(address token);

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

...

}
```

Great! Now, coming all the way back to our functions (told you we'd be moving fast!), we can add these newly created modifiers to `depositCollateral`.

```solidity
///////////////////////////
//   External Functions  //
///////////////////////////

/*
 * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
 * @param amountCollateral: The amount of collateral you're depositing
 */
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant{}
```

I've additionally included the nonReentrant modifier, which we'll need to import from OpenZeppelin. When interacting with external contracts it's often good to consider the implications of reentrancy. Reentrancy is one of the most common and damaging attacks in all of Web3, and sometimes I'll throw this modifier on as a **_better safe than sorry_** methodology. It may not explicitly be required, but we'll find out when this code goes to audit! The trade off to include it is an expense of gas required to perform these extra checks.

Let's add the import to our contract.

> ❗ **NOTE**
> In version 5 of OpenZeppelin's contracts library, `ReentrancyGuard.sol` is
> in a different location. Edit the filepath from `/security/` to `/utils/` will
> work.

```solidity
pragma solidity ^0.8.18;

import {DecentralizedStableCoin} from "DecentralizedStableCoin.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

...

contract DSCEngine is ReentrancyGuard {
    ...
}
```

Whew, all this and we haven't even started the function body yet! Let's start working with the deposited collateral. We'll need a way to keep track of the collateral deposited by each user. This sounds like a mapping to me.

```solidity
/////////////////////////
//   State Variables   //
/////////////////////////

mapping(address token => address priceFeed) private s_priceFeeds;
DecentralizedStableCoin private immutable i_dsc;
mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
```

Now we can finally add the deposited collateral to our user's balance within our depositCollateral function.

```solidity
///////////////////////////
//   External Functions  //
///////////////////////////

/*
 * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
 * @param amountCollateral: The amount of collateral you're depositing
 */
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant{
    s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
}
```

When we're changing the balance of our user's deposited collateral, what are we doing? We're updating our contract state! Any time state is changed, we should absolutely emit an event. Our contract layout tells us that events should be declared beneath our state variables. So, let's go ahead and declare this event and emit it in our depositCollateral function.

```solidity
////////////////
//   Events   //
////////////////

event CollateralDeposited(address indexed user, address indexed token, uint256 indexed amount);

...

///////////////////////////
//   External Functions  //
///////////////////////////

/*
 * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
 * @param amountCollateral: The amount of collateral you're depositing
 */
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant{
    s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
    emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
}
```

Our function so far is doing a great job adhering to CEI (Checks, Effects, Interactions). The checks we're performing are being executed by our modifiers, our effects are any changes to do with internal accounting or state changes, and effects will be our external interacts (transferring the tokens). Following this design pattern is the best way to protect yourself from reentrancy.

Let's add our interactions to the function now, we'll need to call transferFrom on wBTC or wETH. These are ERC20s remember, so let's import an interface to use.

```solidity
pragma solidity ^0.8.18;

import {DecentralizedStableCoin} from "DecentralizedStableCoin.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

...

///////////////////////////
//   External Functions  //
///////////////////////////

/*
 * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
 * @param amountCollateral: The amount of collateral you're depositing
 */
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant{
    s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
    emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);

    IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
}
```

One last thing to note in this function - our transferFrom call actually returns a boolean. We want to assure this transfer is successful, otherwise revert this function call. One last conditional to add...

```solidity
bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);

if(!success){
    revert DSCEngine__TransferFailed();
}
```

...and one last custom error:

```solidity

contract DSCEngine {

    ///////////////////
    //     Errors    //
    ///////////////////

    error DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
    error DSCEngine__NeedsMoreThanZero();
    error DSCEngine__TokenNotAllowed(address token);
    error DSCEngine__TransferFailed();

    ...

}
```

### Wrap Up

This function is looking pretty dang great! We've finished writing depositCollateral which allows users to .. deposit collateral .. but it does so much more! We've written modifier to sanitize our function inputs as well as employed best practice design patterns like CEI and events to keep things secure.

This may be a good place to start writing some tests to make sure everything written so far is performing as expected, but let's write a few more functions before getting into that.

I've left our DSCEngine.sol (up to this point in the lesson) below for reference. Over the next few lessons, I'll continue to include this contract in it's entirety for reference.

See you in the next lesson!

DSCEngine.sol

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

    function depositCollateralAndMintDsc() external {}

    function redeemCollateralForDsc() external {}

    function redeemCollateral() external {}

    function mintDsc() external {}

    function burnDsc() external {}

    function liquidate() external {}

    function getHealthFactor() external view {}
}
```
