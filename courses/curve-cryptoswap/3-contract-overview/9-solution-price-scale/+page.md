### Calculating Transformed Balances

Let's go over the solution for calculating transformed balances. The transformed balance is calculated by multiplying the balance of the token by the price scale. It's then multiplied by `precisions` and divided by the constant `PRECISIONS` so that all of the transformed balances will have 18 decimals. 

The first token in the pool has its price scale set to one. The logic to handle the transformed balance for the first token is a bit different. 

First we'll create a new variable and set it equal to the token balance:
```javascript
xp[0] = pool.balances(0) * precisions[0]
```
USDC has six decimals so, to have the transformed balance have 18 decimals, it'll be multiplied by precisions. This is done through the `precisions` of zero.

Next, we will handle the other two tokens; Wbtc and Weth. We'll start by creating a for loop:
```javascript
for (uint256 i = 1; i < 3; i++){
}
```
In this loop we will get the balance of the token:
```javascript
uint256 bal = pool.balances(i);
```
Then we'll get the price scale:
```javascript
uint256 p = pool.price_scale(i - 1);
```
The price scale is offset by one. Therefore, to get the price scale of token one we'll say `1-1` and `2-1` for the price scale of token 2.

Next, we'll store the transformed balance in our `xp` array:
```javascript
xp[i] = bal * p * precisions[i] / PRECISIONS;
```
Since the price scale has 18 decimals, we remove them by dividing by `PRECISIONS`.

Now, let's try executing our test. To do so we'll execute the following command:
```bash
forge test
```
It is important to specify that the EVM version is equal to Cancun. In addition, we'll need to set an environment variable named `FORK_URL` which we'll do later. 
Then we'll specify the match path:
```bash
forge test --evm-version cancun --fork-url $FORK_URL --match-path test/curve-v2/exercises/CurveV2PriceScale.test.sol -vvv
```
Before we copy this command we'll set our fork URL.

Inside our terminal we have our fork URL stored in an `.env` file. We can view this with the following command:
```bash
cat .env
```
Now we can copy this, paste it in our terminal and execute the command. We'll also need to make sure that we're under the folder foundry before running the test.
```bash
FORK_URL=https://eth-mainnet.g.alchemy.com/v2/<API_KEY>
```
```bash
forge test --evm-version cancun --fork-url $FORK_URL --match-path test/curve-v2/exercises/CurveV2PriceScale.test.sol -vvv
```
After running our test, we can see that our test has passed. Looking at the logs we can see that `xp[0]` is roughly 3.8 * 10^24, `xp[1]` is 3.754 * 10^24 and `xp[2]` is 3.81 * 10^24.

What we're seeing here, is the amount of USDC normalized to have 18 decimals.
