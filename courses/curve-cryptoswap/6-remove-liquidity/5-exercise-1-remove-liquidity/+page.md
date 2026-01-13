## Exercise 1: Remove Liquidity

The first exercise we are going to tackle is how to remove liquidity from Curve V2. We will do this by calling the function `test_remove_liquidity`. 

Let's take a look at the setup. The pool contract that we are dealing with is the USDC, WBTC, and WETH pool. Inside the `setUp` function, this contract mints 1,000 USDC to itself. It then approves the pool contract to spend this USDC.

```solidity
function setUp() public {
  deal(USDC, address(this), 1e3 * 1e6);
  usdc.approve(address(pool), type(uint256).max);

  uint256[3] memory amounts = [uint256(1e3 * 1e6), uint256(0), uint256(0)];
  pool.add_liquidity{
    amounts: amounts,
    min_lp: 1,
    use_eth: false,
    receiver: address(this)
    }
}
```

Since this exercise deals with removing liquidity, inside the setup, we also add liquidity to mint some LP shares. Here you can see that it adds USDC as liquidity. So after this code executes, this contract has some LP tokens that it can use to withdraw liquidity.

For the first exercise, we are going to call the function `remove_liquidity` on the pool contract to remove all of the liquidity that is possible by this contract. To do this, you will need to first figure out the amount of LP shares that this contract has. Since the Tricrypto is an ERC20 token, we can simply call `pool.balanceOf` querying the balance of this contract. Once we have the LP balance, call `remove_liquidity` to remove all the liquidity that this contract can.
