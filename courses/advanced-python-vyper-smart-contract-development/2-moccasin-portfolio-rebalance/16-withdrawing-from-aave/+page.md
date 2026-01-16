## Withdrawing from Aave

We are going to withdraw all the tokens from our Aave pool. We are going to use a function that will withdraw the tokens depending on what we're selling. This will help us save gas by only withdrawing the WETH we need to sell to buy USDC. 

To start, we will grab the pool contract:

```python
pool_contract = active_network.manifest("pool", address_pool_address)
```

Then, we will approve the pool contract to withdraw the tokens. 

```python
a_weth.approve(pool_contract.address, a_weth.balanceOf(boa.env.eoa))
```

Finally, we will withdraw the tokens:

```python
pool_contract.withdraw(weth.address, a_weth.balanceOf(boa.env.eoa), boa.env.eoa)
```

Now, we will check to see that our balance is updated:

```python
def print_token_balances():
  print(f"USDC balance: {usdc.balanceOf(boa.env.eoa)}")
  print(f"WETH balance: {weth.balanceOf(boa.env.eoa)}")
  print(f"aUSDC balance: {a_usdc.balanceOf(boa.env.eoa)}")
  print(f"aWETH balance: {a_weth.balanceOf(boa.env.eoa)}")
  
print_token_balances()
```

We have now successfully withdrawn all of our tokens from our Aave pool. 
