### Second Exercise: Swapping WETH to USDC

In this exercise we will be swapping one WETH to USDC. You may be wondering where we obtained this one WETH. 

Looking inside the `setUp` function we can see that the contract is given one WETH.
```javascript
deal(WETH, address(this), 1e18);
```
The next line is important as well, it approves the pool to pull WETH from this contract.
```javascript
weth.approve(address(pool), type(uint256).max);
```
These two setup functions ensure that the swap will be successful if we write the code correctly. Our exercise is to call the exchange on the pool contract to swap one WETH to USDC.
