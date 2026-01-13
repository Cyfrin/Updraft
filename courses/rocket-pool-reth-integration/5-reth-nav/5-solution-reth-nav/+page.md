## RethNav Solution

Let's go over the solution for how to get the exchange rate of 1 rETH into ETH. To do this, we'll first navigate to the rETH contract inside the GitHub repo of Rocket Pool. In this contract, there are two functions:

- One function will get the exchange rate from ETH to rETH.
- The other function will get the exchange rate from rETH back to ETH.
  These two functions are named: `getEthValue` and `getRethValue`.

We need to call the `getEthValue` function. If we put 1 rETH into here, it will give us back the amount of ETH that is backing 1 rETH. For the solution, we can call this function passing in 1 rETH over here. There's also another solution where this is handled inside this code. Over here, there's a function called `getExchangeRate`, which will call the function `getEthValue` passing in 1 ether.

For this solution, we'll call this function. Back inside our code, we'll call the function `getExchangeRate`.

```solidity
return reth.getExchangeRate();
```

This will get the exchange rate of 1 rETH into ETH.

Before we execute the test, we want to mention that we've also created a function to get the exchange rate of rETH into ETH from Chainlink. We'll call both of the functions inside our test, and then compare the exchange rates. Here's our test command, where the file that we're testing is `exercise-reth-nav`.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-reth-nav.sol --match-test test_nav -vvvv
```

The function that we're testing is called `testNav`. The test passed and now we will take a look at the logs. The exchange rate ETH / rETH rate from Rocket Pool gives us approximately 1.1255. If we were to give 1 rETH to the Rocket Pool, then it would give us back approximately 1.1255 ETH, given that the Rocket Pool's mint and burn is enabled. The ETH / rETH exchange rate from Chainlink can be thought of as the market price. The market price of 1 rETH back into ETH is approximately 1.1200. If we were to swap 1 rETH on the market, then we're probably going to get an exchange rate something close to this 1.1200 ETH. So, in this case, assuming that the Rocket Pool's mint and burn are enabled, you should swap your rETH back to ETH using the Rocket Pool contract. If the exchange rate on Chainlink was higher than Rocket Pool, then it would be the other way around. We should probably swap your rETH back into ETH using some decentralized exchange or any other centralized exchange.
