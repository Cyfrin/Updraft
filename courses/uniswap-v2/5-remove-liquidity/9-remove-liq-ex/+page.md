This is an introduction to the Uniswap V2 liquidity removal exercise. We will be removing liquidity from the DAI/WETH pair contract.

The contract is initialized in the setup above. This setup is simulated as if the user added liquidity to the DAI/WETH pair and received this amount of liquidity shares:

```javascript
vm.startPrank(user);
pair.approve(address(router), liquidity);
```

As discussed in the code walkthrough, the user has approved the router contract to spend all of their liquidity.

In this exercise, we will remove all of the liquidity from the DAI/WETH pair contract. 
