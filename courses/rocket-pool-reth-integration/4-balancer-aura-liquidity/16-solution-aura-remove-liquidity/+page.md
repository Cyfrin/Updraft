## Remove Liquidity Through Aura Finance

The last exercise in our Finance is to remove liquidity through our Finance. The first step is to call a function called `withdrawAndUnwrap` on the reward pool contract. This takes in two inputs: amount, the amount of shares to withdraw, and a boolean field called claim. If this is set to true, when we withdraw the tokens, it will also claim the rewards. For the output, it's going to return a boolean and it will be true if it successfully withdraws the tokens.

The first step is to withdraw the tokens:

```solidity
rewardPool.withdrawAndUnwrap(shares, true)
```

Passing in shares and saying true to claim the rewards. It's going to return a boolean, and it's going to return true if it was successful:

```solidity
require(rewardPool.withdrawAndUnwrap(shares, true), "withdraw failed");
```

We require that this call was successful with the error message that says withdraw failed.

Once the withdrawal is successful, inside this contract we'll have the BPT tokens. The BPT token, the liquidity provider token here will be the rEthWEth pool. The next step is to get this BPT balance and then call the balancer to remove liquidity.

```solidity
uint256 bptBal = bpt.balanceOf(address(this));
```

We then need to remove liquidity directly from Balancer V2.

Next, we will check the solution for the exercise to see how liquidity can be removed from balancer V2. Open `BalancerLiquidity.sol` located under Solutions.

Then look for the function called exit. First, they prepare some parameters and then call an internal function called `_exit`. Let’s copy all of this, and then paste it into the code.

```solidity
address[] memory assets = new address[](2);
assets[0] = RETH;
assets[1] = WETH;

uint256[] memory minAmountsOut = new uint256[](2);
minAmountsOut[0] = minREthAmountOut;
minAmountsOut[1] = 0;

vault.exitPool(
```

These two assets and `minAmountsOut` are the parameters that we need to prepare. And then it calls an internal function called `_exit`. Let's see what the internal function does. We will copy the code to invoke the Balancer vault to exit a pool.

```solidity
{
    poolId: BALANCER_POOL_ID_RETH_WETH,
    sender: address(this),
    recipient: recipient,
    request: IVault.ExitPoolRequest({
        assets: assets,
        minAmountsOut: minAmountsOut
    }),
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    BPT amount, index of token t
    abi.encode(
        IVault.ExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
        bptBal,
        // RETH
        uint256(0)
    ),
    toInternalBalance: false
);
```

And now let's go through these parameters, and make sure that they are the correct parameters. Let's start with assets. Assets will be rEth and wEth, so that is correct. Since we're removing liquidity all in rEth this is correct. We call the function `exitPool` on the Balancer vault contract:

```solidity
vault.exitPool(
    poolId: BALANCER_POOL_ID_RETH_WETH,
    sender: address(this),
    recipient: msg.sender,
    request: IVault.ExitPoolRequest({
        assets: assets,
        minAmountsOut: minAmountsOut
    }),
    abi.encode(
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
        bptBal,
        // RETH
        uint256(0)
    ),
    toInternalBalance: false
);
```

The pool ID is correct, sender will be this contract. Recipient is going to be `msg.sender`, the address that is going to receive the rEth. Then scrolling down further. We have `minAmountsOut` and assets. All of the BPT inside this contract:

This completes this exercise. Let's now execute the test.

The test will test the function deposit, get rewards, and also exiting liquidity. Here's the command that I will execute to execute the test. The file will be exercise Aura and the test is called test deposit and exit.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-aura.sol --match-test test_depositAndExit -vvvv
```

Our test passes.

We deposit into our finance and we get back one pool shares, call the function get rewards and we get some rewards in Bal token and Aura. After withdrawing liquidity, we see that our rEth balance is roughly 0.999 rEth and we also have some rewards in Balancer token and Aura token.
