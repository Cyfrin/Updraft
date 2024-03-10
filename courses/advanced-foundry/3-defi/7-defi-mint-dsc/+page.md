---
title: Mint DSC
---

_Follow along the course with this video._



# Building a Mechanism for Minting Decentralized StableCoin

In our exciting journey to developing a decentralized finance system, we have reached the point where we are now able to deposit collateral into our system. Now that we have successfully done this, the next logical step is for us to develop a function for minting our Decentralized StableCoin (DSC).

The minting function, by its nature, is substantially more complex than the deposit feature. It involves, among other things, checking if the collateral value is greater than the amount of DSC to be minted. This function must also take into consideration price feeds and other essential checks. Therefore, its implementation will be our primary focus in this lesson.

## Creating the Mint DSC Function

We start by creating the `mintDsc` function, which accepts as its parameter a unsigned integer256, `amountDscToMint`. The parameter allows users to specify the amount of DSC they want to mint.

Let's look at an illustrative scenario: A user deposits $200 worth of ETH as collateral. They may however only want to mint $20 worth of DSC. In this case, they can specify so using the `amountDSCtoMint` parameter.

```javascript
function mintDsc(unint256 amountDscToMint){}
```

Now we add checks to validate the functionality. It becomes mandatory to ensure that the users mint an amount greater than zero. Also, the function should be non-reentrant to ensure security and maintain control of function calls against the recursion, although in this case, non-reentrancy might not be strictly necessary as it's our DSC token. Don't forget NatSpec!

```javascript
    /*
     * @param amountDscToMint: The amount of DSC you want to mint
     * You can only mint DSC if you hav enough collateral
     */
    function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {}
```

## Keeping Track of the Minted DSC

The minting process corresponds to creating debt within our system. Therefore, we will require to keep track of each user's minted DSC.

A suitable way of achieving this is by creating a state variable to map an `address user` to the `uint256 amountDSCMinted`. This can be achieved as follows:

```javascript
mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
```

Our newly created mapping, `s_DSCMinted`, will ensure we keep track of all the minted DSC. If, for instance, a user tries to mint more DSC than their deposited collateral can cover, our function should instantly revert. We will ensure this via a separate internal function named `revertIfHealthFactorIsBroken` that takes user as the input parameter.

## Addressing the Health Factor &amp; Account Information

This is where it gets a bit windy. The health factor is a term borrowed from the Aave documentation, which calculates how close to liquidation a user is. We can determine the ratio of collateral to DSC minted using a function called `getAccountInformation`.

```javascript
    function _getAccountInformation(address user)
        private
        view
        returns (uint256 totalDscMinted, uint256 collateralValueInUsd)
    {
        totalDscMinted = s_DSCMinted[user];
        collateralValueInUsd = getAccountCollateralValue(user);
    }
```

To check the health factor, we need to ensure the user's collateral value is greater than the DSC minted in USD. Consequently, we need yet another function, `getAccountCollateralValue`, to evaluate the collateral's total value.

```javascript
    function getAccountCollateralValue(address user) public view returns (uint256 totalCollateralValueInUsd) {
        for (uint256 index = 0; index < s_collateralTokens.length; index++) {
            address token = s_collateralTokens[index];
            uint256 amount = s_collateralDeposited[user][token];
            totalCollateralValueInUsd += _getUsdValue(token, amount);
        }
        return totalCollateralValueInUsd;
    }
```

The `getAccountInformation` and `getAccountCollateralValue` functions are quite straightforward, but the real challenge is evaluating the USD value.

## Evaluating the USD Value

To get the USD value, we loop through each collateral token, fetch the corresponding deposited amount, and map it to its price in USD. Simple enough, right? This is accomplished by this `for loop`:

```javascript
    for (uint256 index = 0; index < s_collateralTokens.length; index++) {
                address token = s_collateralTokens[index];
                uint256 amount = s_collateralDeposited[user][token];
                totalCollateralValueInUsd += _getUsdValue(token, amount);
            }
```

Finally, we need a way to get each token's value in USD to be added to the account's total collateral. How do we do that? You guessed it, another function `_getUsdValue`. We'll be leveraging Chainlink price feeds for our purposes.

```javascript
    function _getUsdValue(address token, uint256 amount) private view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        // 1 ETH = 1000 USD
        // The returned value from Chainlink will be 1000 * 1e8
        // Most USD pairs have 8 decimals, so we will just pretend they all do
        // We want to have everything in terms of WEI, so we add 10 zeros at the end
        return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
    }
```

## Wrapping Up

Wow, we've learnt a lot! This section was dense and complex, so don't hesitate to go back over what we've done here and really commit to understanding the workflow. In the next part we'll be learning about an account's `Health Factor` and how we use it grade a user's account health and available collateral.

<img src="/foundry-defi/7-defi-mint-dsc/defi-mint-dsc1.PNG" style="width: 100%; height: auto;">
