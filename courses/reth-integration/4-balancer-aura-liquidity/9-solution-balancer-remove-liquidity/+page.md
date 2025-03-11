## Solution: Balancer Remove Liquidity

Let's review exiting liquidity from Balancer V2 AMM.

Once we add liquidity to the Balancer V2 AMM and we want to pull out the tokens, then we'll exit the liquidity.

First, we'll pull in the BPT token, the liquidity provider shares, from the message sender.

Here, the BPT token is initialized. This BPT token refers to the liquidity provider token for the REth/WEth pool.

```solidity
bpt.transferFrom(msg.sender, address(this), bptAmount);
```

Next, we call the internal function called `exit`. This internal function hides the details of how to remove liquidity from the Balancer V2 AMM. We'll call the function called `exitPool`, and the following are the parameters that you'll need to prepare.

For this exercise, we don't have to worry about the details. We only need to worry about making sure that these parameters are the right parameters: `bptAmount`, `recipient`, this will be the recipient of the tokens that are withdrawn, `assets`, this will be the address of the tokens, and `minAmountsOut`, minimum amount of tokens that we expect to get back.

```solidity
 _exit(
  uint256 bptAmount,
  address recipient,
  address[] memory assets,
  uint256[] memory minAmountsOut
)
```

```solidity
address[] memory assets = new address[](2);
uint256[] memory minAmountsOut = new uint256[](2);
```

For the REth/WEth pool, this will be array of address of length 2, where the first address will be REth and the second address will be WEth.

```solidity
assets[0] = address(reth);
assets[1] = address(weth);
```

For this exercise, we're only going to remove liquidity in RETH.

```solidity
minAmountsOut[0] = minRethAmountOut;
minAmountsOut[1] = 0;
```

```solidity
_exit(
 bptAmount,
 msg.sender,
 assets,
 minAmountsOut
);
```

This completes the exercise. To test this function, we need to put back the solution for the function `join`, which will add liquidity.

```solidity
 reth.transfer(msg.sender, rethBal);
 weth.transfer(msg.sender, wethBal);
```

Now, let's execute the test.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-balancer.sol --match-test test_exit -vvv
```

The test passed. For removing liquidity, we got back approximately 1.89 REth.
