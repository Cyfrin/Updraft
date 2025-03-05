## Calculating ETH to rETH Exchange Rate

We will show you how to calculate the amount of rETH that you can receive for putting in some amount of ETH, and also, calculate the amount of fee that is taken out from this ETH amount.

We will need to do two things:

- First, get the protocol settings for the deposit fee
- Do some calculation
- Then call into the rETH contract to calculate the amount of rETH that we will receive.

Let's start with the first part of getting the protocol settings for the deposit fee.

```solidity
uint256 depositFee = protocolSettings.getDepositFee();
```

Next, let's calculate the fee. This deposit fee will represent a percentage when we divide it by the `calc_base` 1e18. So we multiply the amount of ETH (ethAmount) by this deposit fee, and then divide it by `calc_base`.

```solidity
fee = ethAmount * depositFee / CALC_BASE;
```

And then the amount of rETH that you will receive is calculated by deducting this fee:

```solidity
ethAmount -= fee;
```

Then we call the function:

```solidity
reth.getRethValue(ethAmount);
```

passing in the `ethAmount` where the fee is already deducted. We then assign this to the variable that is returned:

```solidity
rEthAmount = reth.getRethValue(ethAmount);
```

Let's execute the test

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_calcEthToReth -vvv
```

The test has passed. Let's look at the logs. The exchange rate of 1 rETH is roughly 1.12 ETH and for putting in 1 ETH we roughly get back 0.88 rETH. Here's the deposit fee.
