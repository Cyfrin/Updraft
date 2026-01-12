## Curve V1 Contracts

We will discuss the contracts that Curve V1 uses to support its automated market maker (AMM).  Curve V1 AMMs are a variation of a base contract called StableSwap. 

## StableSwap

We will discuss the StableSwap contract by looking at examples of pool contracts: 3pool and stETH.  

### 3pool

The 3pool contract supports three tokens: DAI, USDC, and USDT. The pool contract name is `StableSwap3pool`.

#### N_COINS

The `N_COINS` constant is defined as three. This constant is important because we will need to use it when we call a Curve V1 AMM contract.

#### addLiquidity

The `addLiquidity` function takes an array of tokens as input. The size of the array is determined by the `N_COINS` constant.  We will need to ensure that we provide the correct number of tokens when we call this function.


```javascript
def add_liquidity(amounts: uint256[N_COINS], min_amount: uint256) -> uint256:
```

### stETH

The stETH contract supports two tokens: ETH and stETH. The pool contract name is `StableSwap stETH`.

#### N_COINS

The `N_COINS` constant is defined as two. 

#### addLiquidity

The `addLiquidity` function takes an array of tokens as input. The size of the array is determined by the `N_COINS` constant.  We will need to ensure that we provide the correct number of tokens when we call this function.


```javascript
def add_liquidity(amounts: uint256[N_COINS], min_amount: uint256) -> uint256:
```


## Summary

Curve V1 uses a contract called StableSwap for its AMMs. The pool contracts are variations of this base contract, such as `StableSwap3pool` and `StableSwap stETH`. Each pool contract holds a specific number of tokens, determined by the `N_COINS` constant. We will need to ensure that we provide the correct number of tokens when we interact with these contracts. 
