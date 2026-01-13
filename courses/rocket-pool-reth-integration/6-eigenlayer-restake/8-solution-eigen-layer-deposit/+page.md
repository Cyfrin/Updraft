## Solution: Depositing RETH Into Eigenlayer

Let's follow these steps to deposit RETH into Eigenlayer. First, we'll move the RETH from msg.sender into this contract:

```solidity
reth.transferFrom(msg.sender, address(this), rethAmount);
```

Then we will allow the Eigenlayer contract to use tokens from this contract:

```solidity
reth.approve()
```

We will need to decide which contract to approve. Remember that we have to deposit into the strategy manager contract, but what is the name of the strategy manager contract that exists inside this contract?
We can scroll up and view it by locating the 'StrategyManager'

```solidity
IStrategyManager constant strategyManager = IStrategyManager(EIGEN_LAYER_STRATEGY_MANAGER);
```

Now, we can approve this contract:

```solidity
reth.approve(address(strategyManager), rethAmount);
```

After we write this code, we can call the deposit function inside of the strategy manager. Let's navigate to the interface for the strategy manager, which is called 'IStrategyManager'.

```solidity
interface IStrategyManager {
  function stakerDepositShares(address user, address strategy)
    external
    view
    returns (uint256 shares);

  function depositIntoStrategy(
    address strategy,
    address token,
    uint256 amount
  ) external returns (uint256 shares);
}
```

Here we have the 'depositIntoStrategy' function, we can copy this function signature and then use it in our code:

```solidity
StrategyManager.depositIntoStrategy{
  address strategy,
  address token,
  uint256 amount
}
```

These are the parameters that we will need to prepare. The address of the strategy is 'address(strategy)', and the token is 'address(reth)'

```solidity
strategyManager.depositIntoStrategy{
  address(strategy),
  address (reth),
  rethAmount
}
```

Then, the amount of RETH we want to deposit into Eigenlayer is the rethAmount

```solidity
shares = strategyManager.depositIntoStrategy{
  address(strategy),
  address (reth),
  rethAmount
}
```

That completes the exercise. Let's try executing the test for calling the function deposit.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_deposit -vvv
```

Our test passed.
