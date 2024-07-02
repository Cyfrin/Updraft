---
title: Unit Tests
---

_Follow along the course with this video._

---

### Open Fuzz Tests

Alright, back at it. It's time to start putting the DecentralizedStableCoin protocol to the test (literally). If you run `forge coverage` you'll see.. we have some work to do.

<img src="/foundry-defi/17-defi-unit-tests/defi-open-fuzz-tests1.png" width="100%" height="auto">

Let's jump right in with some constructor tests. What's our constructor doing?

```js
constructor(address[] memory tokenAddresses, address[] memory priceFeedAddress, address dscAddress) {
    if (tokenAddresses.length != priceFeedAddress.length) {
        revert DSCEngine__TokenAndPriceFeedLengthMismatch();
    }

    for (uint256 i = 0; i < tokenAddresses.length; i++) {
        s_priceFeeds[tokenAddresses[i]] = priceFeedAddress[i];
        s_collateralTokens.push(tokenAddresses[i]);
    }
    s_dsc = DecentralizedStableCoin(dscAddress);
}
```

Our constructor is first checking if our priceFeedAddress and tokenAddress arrays are of the same length. This is pretty important as each index needs to be mapped to it's respective index in the other array. Our first test will verify this reverts appropriately.

```js
///////////////////////
// Constructor Tests //
///////////////////////

address[] public tokenAddresses;
address[] public priceFeedAddresses;

function testRevertsIfTokenLengthDoesntMatchPriceFeedLength() public {
    tokenAddresses.push(weth);
    priceFeedAddresses.push(ethUsdPriceFeed);
    priceFeedAddresses.push(btcUsdPriceFeed);

    vm.expectRevert(DSCEngine.DSCEngine__TokenAddressesAndPriceFeedAddressesMustBeSameLength.selector);
    new DSCEngine(tokenAddresses, priceFeedAddresses, address(dsc));
}
```

This should revert, we're pushing more addresses to the priceFeedAddresses array than the tokenAddresses array.

Run the test with:

```bash
forge test --mt testRevertsIfTokenLengthDoesntMatchPriceFeedLength
```

<img src="/foundry-defi/17-defi-unit-tests/defi-open-fuzz-tests2.png" width="100%" height="auto">

Great! Things seem to revert as we'd expect.

We'll next expand on our price feed tests by verifying our `getTokenAmountFromUsd` function.

```js
function testGetTokenAmountFromUsd() public {
    uint256 usdAmount = 100 ether;
    uint256 expectedWeth = 0.05 ether;
    uint256 actualWeth = dsce.getTokenAmountFromUsd(weth, usdAmount);

    assertEq(expectedWeth, actualWeth);
}
```

We know that the mocked price of ETH for our tests is set to $2000, so with $100 worth of USD, we would expect the token amount returned to be 0.05 ether. If 0.05 ether is our expected amount, the actual will be returned by the function. We can assert these two values to be equal.

Run the test! `forge test --mt testGetTokenAmountFromUsd`

<img src="/foundry-defi/17-defi-unit-tests/defi-open-fuzz-tests3.png" width="100%" height="auto">

Nailed it!

Let's keep going! Our suite currently includes a test the successfully checks that depositCollateral reverts when 0 collateral is passed. There's lots more to check with the depositCollateral function.

We'll next assure the depositCollateral reverts if an unapproved token is deposited. To do this, we'll just have to spin up a random ERC20Mock to pass our function call.

```js
function testRevertsWithUnapprovedCollateral() public {
    ERC20Mock ranToken = new ERC20Mock("Ran", "RAN", USER, AMOUNT_COLLATERAL);
    vm.startPrank(USER);
    vm.expectRevert(DSCEngine.DSCEngine__TokenNotSupported.selector);
    dsce.depositCollateral(address(ranToken), AMOUNT_COLLATERAL);
    vm.stopPrank();
}
```

So, as mentioned, we deploy a new ERC20Mock which is not approved with DSCEngine, assure the users has a balance of this token, then use the Foundry cheatcode vm.expectRevert to assert that the next function call will revert with the provided custom error. Run the test! `forge test --mt testRevertsWithUnapprovedCollateral`

<img src="/foundry-defi/17-defi-unit-tests/defi-open-fuzz-tests4.png" width="100%" height="auto">

There's more to test within depositCollateral, so we shouldn't move on yet. Specifically, let's test that the user's balances are updated when a deposit _does_ go through. In addition to this we'll check that our getAccountInformation function is working.

Firstly - I noticed that currently we only have \_getAccountInformation as a private function. Much like before, we'll need to create a public version that can be called by anyone.

```js
function getAccountInformation(address user)
    external
    view
    returns (uint256 totalDscMinted, uint256 collateralValueInUsd)
{
    (tokenDscMinted, collateralValueInUsd) = _getAccountInformation(user);
}
```

With this function added to DSCEngine.sol, we can continue with our new test function.

```js
function testCanDepositCollateralAndGetAccountInformation() public {}
```

Before entering the logic here, we know that depositing collateral is going to be a common step in all of our tests. Because of this, let's create a quick modifier to add to appropriate functions.

> [!TIP]
> Remember DRY: Don't repeat yourself!

```js
modifier depositedCollateral() {
    vm.startPrank(user);
    ERC20Mock(weth).approve(address(dsce), amountCollateral);
    dsce.depositCollateral(weth, amountCollateral);
    vm.stopPrank();
    _;
}
```

Now we can apply this modifier to our test. We then simply call `getTokenAmountFromUsd` after the modifier logic has finished and then compare our expected and actual amounts.

```js
function testCanDepositedCollateralAndGetAccountInfo() public depositedCollateral {
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(user);

    uint256 expectedDepositedAmount = dsce.getTokenAmountFromUsd(weth, collateralValueInUsd);

    assertEq(totalDscMinted, 0);
    assertEq(expectedDepositedAmount, amountCollateral);
}
```

Run it! Assuming it passes for you, let's check our coverage.

<img src="/foundry-defi/17-defi-unit-tests/defi-open-fuzz-tests5.png" width="100%" height="auto">

Oof. A little better, but we've a long way to go.

### Wrap Up

I should say _you've_ a long way to go! Rather than walking you through all of these tests, I'm going to challenge you to write a bunch yourself.

You know how to write these tests, you know how to improve the coverage of a code base. Your goal is to get your `forge coverage` to be as close to 100% as possible.

> [!TIP]
> You can use `forge coverage --report debug` to receive a line-by-line readout of what's covered/not covered by our tests.

Don't worry if you can't hit 100%, do your best to go through this exercise, this is the practice that will make you an expert. I'll tell you now, there's at least 1 major issue in the implementation of our code so far.

Try to find it! Experiment! Tinker and learn!

When you've finished, take a break. You've earned it

See you soon!
