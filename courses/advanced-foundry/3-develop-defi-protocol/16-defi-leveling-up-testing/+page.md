## Leveling Up Your Testing Skills

Alright, let's dive into leveling up your testing skills.

To begin, let's get started with coverage. Use the command `forge coverage` in the terminal:
```bash
forge coverage
```
After running the command, you may find that we have some work to do regarding tests! No time like the present, let's get into it.

We have some price feed tests, but we should probably set up some constructor tests. It's important to make sure that everything is being initialized correctly. Let's copy the price feed tests, and name them to constructor tests:
```javascript
// Constructor Tests
```
To prevent the code from going crazy, we'll create a test function with:
```javascript
function test
```
From here, we can navigate to the constructor to see that:
```javascript
revert DSCEngine_TokenAddressesAndPriceFeedAddressesMustBeSameLength();
```
This means we should make sure we revert correctly when the lengths aren't the same with:
```javascript
function testRevertsIfTokenLengthDoesntMatchPriceFeeds() public {
```
Next, we create some address arrays, and push data to the arrays:
```javascript
address[] public tokenAddresses;
address[] public priceFeedAddresses;

tokenAddresses.push(weth);
feedAddresses.push(ethUsdPriceFeed);
feedAddresses.push(btcUsdPriceFeed);
```
With that done, we can add the expected revert with:
```javascript
vm.expectRevert(DSC Engine.
DSCEngine_TokenAddressesAndPriceFeedAddressesMustBeSameLength.selector);
```
And then call with:
```javascript
new DSCEngine(tokenAddresses, priceFeedAddresses, address(dsc));
```
Now to see if it all works, run:
```bash
forge test -m testRevertsIfTokenLengthDoesntMatchPriceFeeds
```
From here, we can test the Price Feeds using the command:
```javascript
function testGetUsdValue() public {
```
To test the getter TokenAmountFromUsd do the following:
```javascript
function testGetTokenAmountFromUsd() public {
uint256 usdAmount = 100 ether;
uint256 expectedWeth = 0.05 ether;
uint256 actualWeth = dsce.getTokenAmountFromUsd(weth, usdAmount);
assertEq(expectedWeth, actualWeth);
```
You can test this with:
```bash
forge test -m testGetTokenAmountFromUsd
```
Next we create a depositedCollateral modifier. A modifier allows us to centralize our testing:
```javascript
modifier depositedCollateral() {
vm.startPrank(USER);
ERC20Mock(weth).approve(address(dsce), AMOUNT_COLLATERAL);
dsce.depositCollateral(weth, AMOUNT_COLLATERAL);
vm.stopPrank();
_;
}
```
Apply it as:
```javascript
public depositedCollateral {
```
From here the best advice we can give you is to keep experimenting and learning on your own! Look at other sources. Also, there's a massive issue in the source code to be found. Try to find it and add tests! As a hint: add a new external view to this contract.
