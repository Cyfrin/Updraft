## Depositing Into Aave

In this lesson we will learn how to deposit our tokens into Aave, specifically, USDC and WETH. This is a fundamental skill for DeFi developers to learn, so let's dive in.

First, we will need to define a function called `deposit`, which will take the following arguments:

*   pool_contract
*   token
*   amount

```javascript
def deposit(pool_contract, token, amount):
```

We will then need to calculate the amount that the user is allowed to deposit into Aave. We can do this using the `allowance` function. 

```javascript
    allowed_amount = token.allowance(boa.env.eoa, pool_contract.address)
```

Next we will define a condition to check if the `allowed_amount` is less than the `amount` requested by the user:

```javascript
    if allowed_amount < amount:
```

If the `allowed_amount` is less than the `amount`, then we will need to get the token approved. We can do this by calling the `approve` function. 

```javascript
        token.approve(pool_contract.address, amount)
```

We can print a statement indicating that the token was approved. 

```javascript
        print(f"Approving {token.name()} address {amount}")
```

Finally, we can deposit our tokens into Aave by calling the `supply` function. This function will take the following arguments:

*   `token.address`
*   `amount`
*   `boa.env.eoa`
*   `REFERRAL_CODE`

```javascript
    pool_contract.supply(token.address, amount, boa.env.eoa, REFERRAL_CODE)
```

We can also print a message to the console indicating that the tokens have been deposited into Aave: 

```javascript
    print(f"Depositing {token.name()} into Aave contract {pool_contract.address}")
```

Now we will define our USDC and WETH balances, and call the `deposit` function if the respective balances are greater than 0.

```javascript
    usdc_balance = usdc.balance_of(boa.env.eoa)
    weth_balance = weth.balance_of(boa.env.eoa)

    if usdc_balance > 0:
        deposit(pool_contract, usdc, usdc_balance)

    if weth_balance > 0:
        deposit(pool_contract, weth, weth_balance)
```

In addition to our deposit function, we can also use the `getUserAccountData` function to retrieve information about the user's account. This function will return the user's total collateral base, total debt base, available borrows base, current liquidation threshold, ltv, and health factor. 

```javascript
    pool_contract.get_user_account_data(boa.env.eoa)

    print(f"""User account data:
    totalCollateralBase: {totalCollateralBase}
    totalDebtBase: {totalDebtBase}
    availableBorrowsBase: {availableBorrowsBase}
    currentLiquidationThreshold: {currentLiquidationThreshold}
    ltv: {ltv}
    healthFactor: {healthFactor}
    """)
```

Let's run the code we have written and review the output. 

We can see that our USDC and WETH were deposited into Aave, as well as our user account data, which includes:

*   totalCollateralBase
*   totalDebtBase
*   availableBorrowsBase
*   currentLiquidationThreshold
*   ltv
*   healthFactor

It is important to be familiar with the Aave documentation, so you can understand what each of these values mean.  You can learn more about Aave by visiting [aave.com](https://aave.com/). 

Now, we will need to  configure a `.toml` file and save the ABI. 

First, we will need to run the following terminal command:

```bash
mox explorer get 0x2f9d218133aaf8bf2bb19b1066c7e344d94e9e ��-save ��-name aaveV3_pool_address_provider
```

We can save the ABI by running the following terminal command: 

```bash
mox explorer get 0x878708ca3f3f0d63353cf4ce8392d6935d844faE2 ��-save ��-name pool
```

Next, we will need to open our `.toml` file, which is where we will save our Pool Addresses Provider.

```javascript
[networks.eth-forked.contracts]
aaveV3_pool_address_provider = { abi = "abis/aaveV3_pool_address_provider.json" }
```

And, in the same file, we need to save the Pool Address. 

```javascript
pool = { abi = "abis/pool.json" }
```

We can now go back to our Jupyter notebook to see the output of our code. 

```javascript
config = get_config()
config.reload()

active_network = config.get_active_network()

aaveV3_pool_address_provider = active_network.manifest_named("aaveV3_pool_address_provider")
pool_address = aaveV3_pool_address_provider.getPool()
print(pool_address)

pool_contract = active_network.manifest_named("pool", address=pool_address)
```

We can see that the Pool Address is printed out. 

Great! We have successfully learned how to deposit tokens into Aave, how to get the ABI, and how to retrieve user account data.  This is a valuable skill for any DeFi developer to have! 
