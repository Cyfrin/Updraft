---
title: Leveling Up Testing
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/_uSoXLzttqE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# In-depth Guide to Testing for the Ethereum Smart Contract

Writing tests for Ethereum smart contracts can be challenging even for experienced developers. In this section, I will guide you through some practical techniques to improve your testing structure using Foundry, our robust solidity framework. Note that this is a hands-on guide, so please open up your terminal to follow along.

## Getting Started

Usually, getting started is the hardest part. Open up your terminal, let's dive in. Our aim is to increase our code coverage.

```bash
forge coverage
```

## Constructor and Price Feed Tests

Let's begin with some constructor tests. We will also want to set up some price feed tests. These will confirm whether things have been initialized correctly in our code. 'What are we testing?' you may ask. Your query should lead you to the constructor in your code. Check that you are correctly reverting when token lengths are not matching. For this test, you will need to create some address arrays — one for token addresses and another for price feed addresses.

Here's our first constructor test:

```js
    ///////////////////////
    // Constructor Tests //
    ///////////////////////
    address[] public tokenAddresses;
    address[] public feedAddresses;

    function testRevertsIfTokenLengthDoesntMatchPriceFeeds() public {
        tokenAddresses.push(weth);
        feedAddresses.push(ethUsdPriceFeed);
        feedAddresses.push(btcUsdPriceFeed);

        vm.expectRevert(DSCEngine.DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch.selector);
        new DSCEngine(tokenAddresses, feedAddresses, address(dsc));
    }
```

Your code should revert and pass the test. If it does, bravo! If it doesn't, you'll have to review your logic and keep debugging until it works.

We also want to test our `getTokenAmountFromUsd()` functon:

```js
     //////////////////
    // Price Tests  //
    //////////////////

    function testGetTokenAmountFromUsd() public {
        // If we want $100 of WETH @ $2000/WETH, that would be 0.05 WETH
        uint256 expectedWeth = 0.05 ether;
        uint256 amountWeth = dsce.getTokenAmountFromUsd(weth, 100 ether);
        assertEq(amountWeth, expectedWeth);
    }
```

## The Holy Grail of Tests: Is the Deposit Collateral Reverting?

Let's now proceed to test more of our `depositCollateral()` function, specifically checking the it reverts with unapproved tokens. Dive into the `depositCollateral()` function in your code, our test is going to look something like this:

```js
    function testRevertsWithUnapprovedCollateral() public {
        ERC20Mock randToken = new ERC20Mock("RAN", "RAN", user, 100e18);
        vm.startPrank(user);
        vm.expectRevert(abi.encodeWithSelector(DSCEngine.DSCEngine__TokenNotAllowed.selector, address(randToken)));
        dsce.depositCollateral(address(randToken), amountCollateral);
        vm.stopPrank();
    }
```

The result of this test should show a revert.

## Testing Getter Functions

When you write your getter functions, also write tests for them. We've written a public verson of the `_getAccountInformation()` function.

```js
...
contract DSCEngine is ReentrancyGuard {
    ...
    function getAccountInformation(address user)
        external
        view
        returns (uint256 totalDscMinted, uint256 collateralValueInUsd)
    {
        return _getAccountInformation(user);
    }
    ...
}
```

Ensure that the return values of this function are correct by asserting the output in our test. Note: we've created a modifier here to make it easier to test already deposited collateral.

```js
...
contract DSCEngineTest is StdCheats, Test {
    ...
    modifier depositedCollateral() {
        vm.startPrank(user);
        ERC20Mock(weth).approve(address(dsce), amountCollateral);
        dsce.depositCollateral(weth, amountCollateral);
        vm.stopPrank();
        _;
    }
    ...
    function testCanDepositedCollateralAndGetAccountInfo() public depositedCollateral {
        (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(user);
        uint256 expectedDepositedAmount = dsce.getTokenAmountFromUsd(weth, collateralValueInUsd);
        assertEq(totalDscMinted, 0);
        assertEq(expectedDepositedAmount, amountCollateral);
    }
    ...
}
```

After this, we can run `forge coverage` again to see what our test coverage is like. I'm not going to walk you through writing all these tests (you can find more examples on the repo), but I encourage you to challenge yourself to write more tests for `DSCEngine.sol`.

At this point, it's important to note that you don't have to attain 100% code coverage. Sometimes, 85%-90% coverage is great, but your test architecture should be set up to spot glaring bugs.

## In Conclusion

Remember that writing tests is the critical way to validate that your code works as expected. Let AI bots like OpenAI's ChatGPT help you write tests, especially for those hard scenarios that need advanced logic. Bear in mind that sometimes your code is correct, but the test may be wrong. Keep debugging until your tests pass and cover as much of your code as possible. Lastly, be ready to refactor your code to make it testable, readable, and maintainable.

With this guide, you should be able to run adequate tests for your Ethereum smart contracts. Happy coding!
