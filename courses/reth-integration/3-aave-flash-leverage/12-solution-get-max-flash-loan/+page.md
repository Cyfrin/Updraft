## Getting The Maximum Flash Loan Amount In USD

Let's explore the solution for obtaining the maximum flash loan amount in USD. We'll need to return several values:

- The maximum flash loan amount in USD with 18 decimals.
- The price of the collateral asset with 8 decimals.
- The Loan-to-Value (LTV) ratio with 4 decimals.
- The maximum leverage factor also with 4 decimals.

First, we'll retrieve the LTV and the price of the collateral using the contracts from Aave. These contracts are initialized within the `AaveHelper` contract located in the `src/aave` folder.

Within the `AaveHelper.sol` file, the contracts of interest are the Data Provider and Oracle:

- The Data Provider uses an interface called `IPoolDataProvider`. It contains a function called `getReserveConfigurationData`, which takes in the address of the token and returns various data. The data needed for this exercise are the token's decimals and the LTV ratio. Let's copy the function signature:

```solidity
getReserveConfigurationData(address asset)
```

- The Oracle contains the function `getAssetPrice`, which returns the USD price of a token with eight decimals. Let's copy this:

```solidity
getAssetPrice(address asset)
```

Now, we'll start by obtaining the token's decimals and the LTV setting. We'll call the `getReserveConfigurationData` function. The `AaveHelper` contract reveals that we need to call the Data Provider, which has the interface for `IPoolDataProvider`.

```solidity
dataProvider.getReserveConfigurationData(address asset)
```

The asset within this function will be the collateral, with its address provided as input. Let's replace address with collateral, and when this function is called, it will return several pieces of data. We'll assign the return value to all the variables. We only need the LTV ratio and decimals, so let's declare these variables by assigning the data to LTV and decimals:

```solidity
uint256 decimals;
ltv,
```

Now, to assign the `getReserveConfigurationData` result to those variables, we need to add this:

```solidity
(decimals, ltv, , , , , , , , , , , ) = dataProvider.getReserveConfigurationData(collateral);
```

Next, let's get the price of the collateral. We have to call the `getAssetPrice` function. The Aave Helper contract shows that we need to call the Oracle contract, so we will assign the return value to price:

```solidity
uint256 price = oracle.getAssetPrice(collateral);
```

We've already declared this variable called price as an output. So we can omit the variable declaration and assign the price to the variable that is going to be returned.

Now, let's move on to the simpler task of obtaining the maximum flash loan amount and the maximum leverage. We already know how to calculate the maximum leverage. The formula is:

```solidity
k <= LTV / (1 - LTV)
```

So, let's add some code:

```solidity
maxLev = ltv / (1 - ltv);
```

LTV has 4 decimals, 1e4 which is equal to one followed by four zeros, this is equal to one. Therefore, we need to make this to have four zeros, we can do this by saying 1e4. Also, if LTV is smaller than this number 1e4 - ltv, then the division will round down to zero. We don't want this to happen, so we'll first multiply this LTV by 1e4.

```solidity
maxLev = ltv * 1e4 / (1e4 - ltv);
```

This gives us the `maxLev` in an understandable format. Now, we can tackle the final task of calculating max. Max is the maximum flash loan amount in USD with 18 decimals. The equation is:

```solidity
flash_loan_usd = base_col_usd * k <= base_col_usd * LTV / (1 - LTV)
```

Then, we can say:

```solidity
max = baseColAmount * price
```

The price has eight decimals. To remove the eight decimals, we'll divide by 1e8.
Since the output needs to be 18 decimals, let's normalize this token amount to have 18 decimals with:

```solidity
 (10 ** (18 - decimals))
```

Therefore, we can say:

```solidity
max = baseColAmount * (10 ** (18 - decimals)) * price / 1e8;
```

The value now will represent the base collateral in USD with 18 decimals.

The next step is to multiply by the maximum leverage ratio. The equation is the following:

```solidity
LTV / (1 - LTV)
```

The code is over here from the maxLev calculation. Then, the max variable is:

```solidity
max = baseColAmount * (10 ** (18 - decimals)) * price * ltv * 1e4 / (1e4 - ltv) / 1e8;
```

Since the base collateral amount with decimals _ price _ LTV/1-LTV already has 18 decimals, we don't need to multiply by `1e4`, the max value is the above without multiplying 1e4

```solidity
max = baseColAmount * (10 ** (18 - decimals)) * price * ltv / (1e4 - ltv) / 1e8;
```

Now, let's execute the test for this exercise:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-aave-flash-lev.sol --match-test test_getMaxFlashLoanAmountUsd -vvv
```

Our test passed!
