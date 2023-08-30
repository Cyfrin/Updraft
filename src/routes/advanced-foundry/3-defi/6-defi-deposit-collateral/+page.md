---
title: Deposit Collateral
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/JEN9PAgwTOo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# The Easiest Way to Learn Blockchain: Start with Depositing

In this section, I'm going to dive into the one place it's easiest to start when creating a blockchain protocol: Depositing collateral. After all, that's likely the first thing users will do with this protocol.

## Depositing Collateral

To start, we'll need code that allows users to deposit their collateral. Something like:

```js
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external {...}
```

From here, we have a good starting point for explaining what's likely to happen in this function.

Let's add a Natspec (Natural Specification) comment to help clarify what’s happening in the code.

```js
/*
 * @param tokenCollateralAddress: The address of the token to be deposited as collateral.
 * @param amountCollateral: The amount of collateral to deposit.
 */
```

## Code Sanitization

We'll want a way to ensure amountCollateral is more than zero, in order to prevent potential issues down the line with zero-valued transactions.

To do this, we can create a **modifier** called `moreThanZero`. Remember to reference our contract layout if you forget where things should go:

```js
// Layout of Contract:
// Version
// Imports
// Errors
// Interfaces, Libraries, Contracts
// Type Declarations
// State Variables
// Events
// Modifiers
// Functions
```

Our modifier should look something like this:

```js
modifier moreThanZero(uint256 amount) {
    if (amount == 0) {
        revert DSCEngine__NeedsMoreThanZero();
    }
    _;
}
```

_Modifiers_ are used to change the behavior of functions in a declarative way. In this case, using a modifier for `moreThanZero` will allow its reuse throughout the functions.

```js
function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) {...}
```

If the amount deposited is zero, the function will revert and cancel the transaction, saving potential errors or wasted transactions.

## Allow and Deny Tokens

Another thing we'll need is a restriction on what tokens can be used as collateral. So let's create a new modifier called `isAllowedToken`.

```js
modifier isAllowedToken(address token) {
    if (tokenNotallowed){...};
}
```

Currently we have no 'token allow list', so we're going to handle this with a state mapping of addresses to addresses, which we provide in our contract's constructor. We know as well that our 'DSCEngine is going to need the `burn` and `mint` functions of our DSC contract, so we'll provide that address here as well:

```js
contract DSCEngine {
    error DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
    ...
    DecentralizedStableCoin private i_dsc;
    mapping(address collateralToken => address priceFeed) private s_priceFeeds;
    ...
    constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
        if (tokenAddresses.length != priceFeedAddresses.length) {
            revert DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
        }
        // These feeds will be the USD pairs
        // For example ETH / USD or MKR / USD
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
            s_collateralTokens.push(tokenAddresses[i]);
        }
        i_dsc = DecentralizedStableCoin(dscAddress);
    }
}
```

Finally, after all this prep, we can return to our modifier to complete it:

```js
modifier isAllowedToken(address token){
    if (s_priceFeeds[token] == address(0)){
        revert DSCEngine__NotAllowedToken();
    }
    _;
}
```

Here, function calls with this modifier will only be valid if the inputted token address is on an allowed list.

## Saving User Collateral Deposits

Finally, we get to the heart of the deposit collateral function.

We need a way to save the user's deposited collateral. This is where we come to ‘_state variables_’:

```js
mapping(address user => mapping(address collateralToken => uint256 amount)) private s_collateralDeposited;;
```

This is a mapping within a mapping. It connects the user's balance to a mapping of tokens, which maps to the amount of each token they have.

With this, we have developed a good foundation for our deposit collateral function.

## Safety Precautions

Even though we've added quite a bit already, there's still more that can be done to ensure this function is as safe as possible. One way is by adding the `nonReentrant` modifier, which guards against the most common attacks in all of Web3.

```js
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
...
    function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant {
        s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
        emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
        bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
}
```

## Wrapping It Up

In conclusion, through this section, we have built an efficient deposit collateral function.

All the checks, such as ensuring the deposit is more than zero and the token is allowed, are done effectively. The state updates with the deposited collateral. Any interactions externally are safe from reentrancy attacks, ensuring a secure environment for our deposit function.

As seen above, to end the function, the function will emit a `CollateralDeposited` event.

```js
emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
```

This will give us more information about when and where the deposit function is called, which aids in debugging and development of the blockchain.

Remember, learning about the functioning of blockchain can be a bit intimidating. But by breaking down the different steps and understanding each process, you'll begin to see it's not as complicated as it may first seem. Happy coding!

<img src="/foundry-defi/6-defi-deposit-collateral/defi-deposit-collateral1.PNG" style="width: 100%; height: auto;">
