We will be learning about removing liquidity from Curve's AMM. There are two methods for removing liquidity. We will cover both of them in this lesson. 

First, we will learn how to remove all of the liquidity from a Curve pool. We will start by calling the `remove_liquidity()` function from the `IStableSwap3Pool` interface. 

```javascript
remove_liquidity(uint256 lp, uint256[3] calldata min_coins)
```
We will then check the balance of the LP tokens locked in this contract. To do this, we will examine the `setUp()` function, as we added liquidity to the Curve pool in this function. The LP token we will be looking at is called `lp`. 

We will store the LP balance in a variable called `lpBal`:

```javascript
uint256 lpBal = lp.balanceOf(address(this));
```
We need to prepare an array of minimum coins that we expect to get back when we remove liquidity. We will call this array `minCoins`:

```javascript
uint256[3] memory minCoins = [uint256(1), uint256(1), uint256(1)];
```
Now, we will call the `remove_liquidity()` function, passing in the `lpBal` variable and the `minCoins` array:

```javascript
pool.remove_liquidity(lpBal, minCoins);
```
This completes the first exercise for removing liquidity from Curve's AMM. To execute this test, we will run the following terminal command:
```bash
forge test --fork-url $FORK_URL --match-test "test_remove_liquidity" -vvv
```
Our test will pass and we will get back all three tokens:

* DAI: Approximately 3,687,000
* USDC: Approximately 3,733,000
* USDT: Approximately 2,577,000

Now, let's move on to the second method of removing liquidity, which is to remove liquidity for a single stablecoin. We will call this function `test_remove_liquidity_one_coin()`:

```javascript
function test_remove_liquidity_one_coin() public {
// Write your code here
}
```
