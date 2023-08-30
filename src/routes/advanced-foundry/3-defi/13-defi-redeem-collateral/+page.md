---
title: Redeem Collateral
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/gGkl7D9Lqv0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Deconstructing the 'Redeem Collateral' Function

In this section we're going to be diving deep into our `redeemCollateral` function with a focus on safe and efficient transactions for our users.

## Creating the 'redeemCollateral' Function

First things first, in order for users to redeem the collateral, they need to have a health factor above one even after their collateral is pulled out. Ensuring this is the operating protocol will maintain the platform's integrity and ensure safe transactions.

```javascript
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){...}
```

In our redeem collateral function, we start by allowing the user to select the type of collateral they would like to redeem. The function then checks the balance to ensure that the requested amount is available for withdrawal. It is crucial that there are no zero-amount transactions, as these often signify errors.

To streamline the process, we ensure this function is 'non-reentrant', meaning it can't be recursively called by an external contract, preventing potential attacks and ensuring greater safety. If necessary, these protective measures will be relayed later during a gas audit.

## Ensuring Consistency

In computing science there's a concept called "DRY: Don't Repeat Yourself". If you find that you are writing the same code repeatedly, it's usually a sign that you need to refactor your code. Thus, while this function may currently be written in a particular style, it could be subject to change in the future to ensure that our code remains efficient and clean.

## Updating Our Internal Accounting

In order to keep track of the collateral that each individual user has in their account, we use internal accounting. This eliminates the possibility of users withdrawing more collateral than they have in their accounts.

```javascript
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){
    s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
}
```

Digging in, the first part of our function updates our internal accounting, deducting the amount withdrawn from the account. If a user tries to withdraw more than they have, the Solidity compiler will throw an error, which is highly useful for preventing any unnecessary headaches.

## Issuing Event Updates

Upon updating the state, we will emit an event to reflect the redeeming of collateral, showing the message sender, the amount of collateral, and the token collateral address.

```javascript
...
event CollateralRedeemed(address indexed user, address indexed token, uint256 indexed amount);
...
function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){
    s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;

    emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral)
}
```

## Refactoring the Function

For now, we've written our `redeemCollateral` function to represent a single instance of someone redeeming their collateral. However, in future iterations of this code, we will likely refactor this function to make it more modular and easily applicable in different scenarios.

## Implementing the CEI Pattern

The Checks-Effects-Interactions (CEI) pattern is key in ensuring a super-safe contract. First, we perform some checks on the state variables; then, we effectuate changes; finally, we interact with other contracts. We adhere to this practice tightly unless we need to check something after a token transfer has taken place. In some of these instances, we might bypass the CEI pattern but always ensure that transactions are reverted if health-factor conditions are not met.

## Health Factor Maintenance

The health factor (more commonly known as the collateralization ratio) is key to evaluating the risk of a particular loan, so it's vital to ensure that the health factor doesn't break when the collateral is pulled. We've made a function to check this:

```javascript
    function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral)
    external
    nonReentrant
    moreThanZero(amountCollateral){
    s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;

    emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral)

    bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, amountCollateral);
    if (!success){
        revert DSCEngine__TransferFailed();
    }
    _revertIfHealthFactorIsBroken(msg.sender);
    }

```

Our `redeemCollateral` function comes with a built-in safeguard to prevent the health factor from falling below acceptable levels.

## The Burn Function

The burning of DSC reflects removing debt from the system and will likely not affect the health factor since the action lowers debt rather than increasing it. Despite this, we ensure to leave room for checks to protect the integrity of the process. The `_burnDsc` function should look something similar to this:

```js
    function _burnDsc(uint256 amountDscToBurn, address onBehalfOf, address dscFrom) private {
        s_DSCMinted[onBehalfOf] -= amountDscToBurn;

        bool success = i_dsc.transferFrom(dscFrom, address(this), amountDscToBurn);
        // This conditional is hypothetically unreachable
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
        i_dsc.burn(amountDscToBurn);
        // revertIfHealthFactorIsBroken(msg.sender); - we don't think this is ever going to hit.
    }
```

## Combining Redemption and Burning of DSC

In the current process, a user first has to burn their DSC and then redeem their collateral, causing a two-transaction process. However, for convenience's sake, let's combine these two transactions into one – making the process much more fluid and efficient. We'll do this in our `redeemCollateralForDsc` function:

```js
    /*
     * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
     * @param amountCollateral: The amount of collateral you're depositing
     * @param amountDscToBurn: The amount of DSC you want to burn
     * @notice This function will withdraw your collateral and burn DSC in one transaction
     */
    function redeemCollateralForDsc(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDscToBurn)
        external
        moreThanZero(amountCollateral)
    {
        _burnDsc(amountDscToBurn, msg.sender, msg.sender);
        _redeemCollateral(tokenCollateralAddress, amountCollateral, msg.sender, msg.sender);
        //redeem collateral already checks health factor
    }
```

Don't forget NatSpec!

## Conclusion

The `redeemCollateral` function, while seemingly complex, is necessary to ensure safe, secure transactions on the blockchain. By walking through each step of the function – from creating it to refactoring it – we offer a comprehensive view of how such a function operates.

While the structure of these functions described here may change slightly in the future, it's crucial to understand the basics: enforce checks, maintain health factors, and avoid redundant code. Happy coding!
