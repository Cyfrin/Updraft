We will be finishing our rebalance of our USDC and WETH tokens.

```python
def print_token_balances( ):
  print (f"WETH BALANCE: {weth.balanceOf( boa.env.eoa )}")
  print (f"aWETH BALANCE: {a_weth.balanceOf( boa.env.eoa )}")
  print (f"aUSDC BALANCE: {a_usdc.balanceOf( boa.env.eoa )}")
  print (f"aAMETH BALANCE: {a_ameth.balanceOf( boa.env.eoa )}")
```

We wrote a little script to handle our deposit. 

Let's create our deposit function:

```python
def deposit_pool_contract (pool_contract, token, amount ):
  allowed_amount = token.allowance(boa.env.eoa, pool_contract.address )
  if allowed_amount < amount:
    token.approve (pool_contract.address, amount )
    print (f"Approving {token.name()} into Aave contract: {pool_contract.address}")
  print (f"Depositing {token.name()} into Aave contract: {pool_contract.address}")
  pool_contract.supply( token.address, amount, boa.env.eoa, REFERRAL_CODE )
```

```python
REFERRAL_CODE = 0
```

Now, let's get our token balances. 

```python
print_token_balances( )
```

We will grab the USDC token balance and use it to deposit into our pool contract. 

```python
amount = usdc.balanceOf( boa.env.eoa )
deposit_pool_contract (pool_contract, usdc, amount)
```

We will do the same for WETH:

```python
print_token_balances( )
a_usdc_balance = a_usdc.balanceOf( boa.env.eoa )
a_weth_balance = a_weth.balanceOf( boa.env.eoa )
a_usdc_balance_normalized = a_usdc_balance / (1000 * 1000)
a_weth_balance_normalized = a_weth_balance / (1000 * 1000 * 1000 * 1000 * 1000 * 1000)

usdc_value = a_usdc_balance_normalized * usdc_price
weth_value = a_weth_balance_normalized * weth_price
total_value = usdc_value + weth_value

target_usdc_value = 0.3
target_weth_value = 0.7

weth_percent_allocation = weth_value / (usdc_value + weth_value)
usdc_percent_allocation = usdc_value / (usdc_value + weth_value)

print (f"Current percent allocation of USDC: {usdc_percent_allocation}")
print (f"Current percent allocation of WETH: {weth_percent_allocation}")
```

We will go ahead and deposit our WETH now. 

```python
amount = weth.balanceOf( boa.env.eoa )
deposit_pool_contract(pool_contract, weth, amount)
```

We successfully rebalanced our portfolio! 
