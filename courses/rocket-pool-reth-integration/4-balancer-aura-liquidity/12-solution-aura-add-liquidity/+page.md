## Adding Liquidity to Balancer V2 Through Aura Finance

Let’s go over how to add liquidity to Balancer V2 through Aura finance.

The function that we will implement is called `deposit`. The first thing that we will do is transfer RETH from message sender:

```solidity
reth.transferFrom(msg.sender, address(this), rethAmount);
```

Next, to deposit into Aura finance, we'll need to approve a contract called the `depositWrapper`.

```solidity
reth.approve(address(depositWrapper), rethAmount);
```

To add liquidity through Aura finance, we'll need to call a function inside the `depositWrapper`. The function we will be calling to deposit liquidity into Balancer V2 by Aura finance is called `depositSingle`.

The contract that we’ll need to call is called `depositWrapper`.

```solidity
depositWrapper.depositSingle(
  address rewardPool,
  address inputToken,
  uint256 inputAmount,
  bytes32 balancerPoolId,
  IVault.JoinPoolRequest memory request
) external;
```

Let’s start with `rewardPool`. The address of the `rewardPool` is:

```solidity
address(rewardPool),
```

Next will be the address of the `inputToken`. The token that we’re adding as liquidity is RETH.

```solidity
RETH,
```

Next will be the `inputAmount`. The amount of token that we’re adding.

```solidity
rethAmount,
```

Then next will be the `balancerPoolId`. The value that we’ll need is `BALANCER_POOL_ID_RETH_WETH`.

```solidity
BALANCER_POOL_ID_RETH_WETH,
```

Finally, a parameter called `request`, which will be a struct from `JoinPoolRequest`.

```solidity
request: {
  assets: assets,
  maxAmountsIn: maxAmountsIn,
  // EXACT_TOKENS_IN_FOR_BPT_OUT, amounts, min BPT
  userData: abi.encode(
    IVault.JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    maxAmountsIn,
    uint256(1)
  ),
  fromInternalBalance: false
}
```

The tokens must be ordered numerically by token address.

```solidity
address[] memory assets = new address[](2);
assets[0] = RETH;
assets[1] = WETH;
```

Single sided or both liquidity is possible.

```solidity
uint256[] memory maxAmountsIn = new uint256[](2);
maxAmountsIn[0] = rethAmount;
maxAmountsIn[1] = wethAmount;
```

For this exercise, we’re providing liquidity only in RETH, so wethAmount will be zero.

The next step is to refund RETH if not all of the RETH was added as liquidity. We’ll first get the balance of RETH remaining in this contract.

```solidity
uint256 rethBal = reth.balanceOf(address(this));
```

Then say if `rethBal` is greater than zero:

```solidity
if (rethBal > 0) {
  reth.transfer(msg.sender, rethBal);
}
```

The final step is to return the amount of shares that was minted from Aura finance for providing liquidity.

```solidity
shares = rewardPool.balanceOf(address(this));
```

Notice that I’m not declaring the variable here, since it’s already declared as a return output.

That completes the function deposit. Let’s try compiling this contract:

```bash
forge build
```

Our contract compiles.

We will be testing this function once we implement all of the functions. The other two functions that we will need to implement are claiming rewards and then exiting liquidity.
