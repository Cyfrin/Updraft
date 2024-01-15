---
title: depositCollateralAndMintDSC
---

_Follow along the course with this video._



# Adding Functionality to Our Smart Contract: One-Stop for Depositing Collateral and Minting DSC

Welcome back! As we continue down the road on our smart contract journey, we've now arrived at an important crossroads. To refresh your memory, we've successfully developed a method for depositing collateral and a separate procedure for minting our native token, the DSC.

Our tests here have been exploratory in nature and although we're assuming these functions are operationally sound, we have yet to put them under the microscope of an extensive unit test suite. However, now we're making substantial progress!

## Where We Are

By now, we've not only created a way to deposit collateral and mint our DSC token, but also we've allowed for substantial access to critical information concerning our financial ecosystem. This is great! Yet, our journey is far from over. Our next step is to merge the deposit and mint mechanisms into a function we anticipate many of our protocol participants will frequently utilize — `depositCollateralAndMintDsc()`.

### Why this Function?

This function is strategically important for our protocol, primarily because its purpose directly aligns with the key flow of our system: users deposit collateral and mint DSC. It combines both operations in a swift, efficient, and convenient manner. Swift and efficient because it accomplishes both operations in one transaction. Convenient because users are spared the requirement of separately interacting with two operations: `mint` and `depositCollateral`.

Without further ado, let's dive into the implementation of this function.

### Merging `mint` and `depositCollateral` Functions

```javascript
    function depositCollateralAndMintDsc(
        address tokenCollateralAddress,
        uint256 amountCollateral,
        uint256 amountDscToMint)
        external {

        depositCollateral(tokenCollateralAddress, amountCollateral);
        mintDSC(amountDscToMint);
    }
```

Note that we've shifted `depositCollateral()` and `mintDSC()` from being external to public functions, enabling them to be called within our smart contract.

```javascript
    function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) public {
        //implementation
    }
    function mintDSC(uint256 amountDscToMint) public {
        //implementation
    }
```

### Adding NatSpec

As usual, we'll garnish our function with NatSpec comments to bring more clarity to our code. As we annotate `depositCollateralAndMintDsc()`, GitHub Copilot, the AI code-completion tool, proves to be a great companion.

```javascript
    /*
     * @param tokenCollateralAddress: The address of the token to be deposited as collateral
     * @param amountCollateral: The amount of collateral to deposit
     * @param amountDscToMint The amount of DecentralizedStableCoin to mint
     * @notice This function will deposit your collateral and mint DSC in one transaction
     */
    function depositCollateralAndMintDSC(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDSCToMint) public {...}
```

To paraphrase poet Oliver Holmes, we're staking out the distance between the goal and where we are now. A large chunk of our protocol now focuses on the simultaneous depositing of collateral and minting of our native stablecoin, DSC, all within one user-friendly function. We're making a major stride into simplifying and optimizing the protocol user experience.

<img src="/foundry-defi/12-defi-deposit-and-mint/defi-deposit-and-mint1.PNG" style="width: 100%; height: auto;">
