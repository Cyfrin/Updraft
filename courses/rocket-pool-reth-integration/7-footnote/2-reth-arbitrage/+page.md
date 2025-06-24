## rETH Theoretical Arbitrage Opportunity 

Here we will explain the theoretical arbitrage opportunity between ETH and rETH based on two ideas. The first idea is that the value of rETH relative to ETH increases over time as it captures the value of ETH given as staking rewards. The other idea is to find an Automated Market Maker (AMM) where rETH is sold at a discount, which can be found on Uniswap V3 pools. Liquidity providers on Uniswap V3 who provide rETH will have to set a price range. For example, providing liquidity all in rETH between the price range 3100 and 3200.

Putting these two ideas together, since the value of rETH generally increases over time, it will surpass the price range where it’s sold on Uniswap V3. This means that rETH on Uniswap V3 is sold at a discount and there may be an arbitrage opportunity. This can be tested with a simulation where we buy rETH from Uniswap V3 and immediately exchange it back to ETH using Rocket Pool. Swapping ETH into rETH on Uniswap V3, since it is sold for a discount, then take that rETH and convert it back into ETH using Rocket Pool.

Inside the foundry folder under the test folder, there's a file called dev-reth-uniswap-v3-arb.sol. Inside, there's a function called test_arb_uni_v3_to_rocket_pool. The first step is to set up enough ETH. To run this hypothetical arbitrage opportunity, we first need to make sure that the contract has enough ETH. If you remove this, then the simulation might fail.

Next, make sure that this contract has enough wrapped ETH (WETH). This is the WETH that we are going to be trading on Uniswap V3. Finally, swap this WETH for rETH on Uniswap V3.

Once this part is executed, inside the contract, we will have rETH. The final step is to convert the rETH back into ETH using Rocket Pool. So the command that will execute is:

```bash
forge test --fork-url $FORK_URL --match-path test/dev-reth-uniswap-v3-arb.sol -vvv
```

The test passed and it was possible to pull off a hypothetical arbitrage opportunity.

Here are some limitations to consider. This is currently a hypothetical arbitrage opportunity. In a real environment, gas costs might make this strategy unprofitable. Also, before executing this strategy, we have to make sure that the rETH contract has enough ETH in the contract.

To recognize arbitrage opportunities, it is useful to be able to find tokens paired together that are similar where one of the tokens is yield bearing and the other is not. Then you also need to find an AMM where that yield bearing token is sold at a fixed price or some price range.
