## Solution: Withdrawing Tokens from EigenLayer

Once we queue the withdrawal by calling the function `undelegate`, we have to wait a certain amount of time, then we’ll be able to actually withdraw the tokens from EigenLayer.

The amount of time that we have to wait is calculated here inside `DelegationManager._completeQueuedWithdrawal`

```solidity
uint32 slashableUntil = withdrawal.startBlock + MIN_WITHDRAWAL_DELAY_BLOCKS;
require(uint32(block.number) > slashableUntil, WithdrawalDelayNotElapsed());
```

Basically, it is the `MIN_WITHDRAWAL_DELAY_BLOCKS` after a withdraw has been initiated. The min withdraw delay is fetched by calling the function `minWithdrawalDelayBlocks` from the delegation manager.

In our application, we've only deposited into the rETH strategy. So we only need to just get the withdrawal delay specific to rETH strategy, take these two delays, the protocol delay, and the delay specific to rETH strategy, and then return the maximum. This is the amount of waiting time that we'll have to wait, after we queued a withdrawal, before we can actually withdraw.

So the starting block where withdrawal is queued, is the block when we call the function undelegate. So now, let's actually withdraw the tokens.

To withdraw tokens, again we'll need to call the contract, delegation manager. Then what function do we need to call? Let's check the interface for IDelegationManager, and look for a function where we can actually withdraw tokens.

Here we have a function called `queueWithdrawals`. We've already queued a withdrawal, so let's scroll down. Here, we see a function called `completeQueuedWithdrawal`.

This is the function that we'll need to call.

The inputs that we'll need to prepare are a little bit complex. Notice, it takes in a struct called `Withdrawal`, which will be this struct over here:

```solidity
struct Withdrawal {
    address staker;
    address delegatedTo;
    address withdrawer;
    uint256 nonce;
    uint32 startBlock;
    address[] strategies;
    uint256[] shares;
}
```

It takes in array of tokens, and then it has other inputs. We'll copy all of this, then I'll explain one at a time. Let's paste the code back inside our application. Then we'll organize the code a little bit.

```solidity
struct Withdrawal {
    address staker;
    address delegatedTo;
    address withdrawer;
    uint256 nonce;
    uint32 startBlock;
    address[] strategies;
    uint256[] shares;
}
```

And the function that we’ll eventually need to call is called `completeQueuedWithdrawal`

```solidity
delegationManager.completeQueuedWithdrawal({
    Withdrawal calldata withdrawal,
    address[] calldata tokens,
    bool receiveAsTokens
})
```

We'll first prepare the parameter withdrawal. Let's say:

```solidity
IDelegationManager.Withdrawal memory withdrawal = IDelegationManager.Withdrawal({

})
```

These are the parameters that we need to prepare:

```solidity
staker:
delegatedTo:
address withdrawer:
uint256 nonce:
uint32 startBlock:
address[] strategies:
uint256[] shares:
```

Let's start with the staker, the address of the staker. This will be `address(this)`. Then `address delegatedTo`.
The address that we delegated to. This will be the address of the operator, operator that we delegated to, and the operator that we undelegated from. `Withdrawer`, the address that is going to withdraw, `address(this)`. `Nonce`, since we're not dealing with signatures, we're not going to need this, so we’ll set it to `0`. `StartBlock`, this is the starting block where we queued the withdraw. This comes from the input, startBlockNum, so `startBlockNum`.
Next, we need to prepare address array of strategies, and array of uint256 called shares.

Let's start with strategies.

```solidity
address[] memory strategies = new address[](1);
```

We've only deposited into one strategy, rETH strategy, so we'll create an array of length 1, and then say strategies of 0, is equal to the address of the strategy:

```solidity
strategies[0] = address(strategy);
```

Next, we'll prepare the shares:

```solidity
uint256 memory _shares = new uint256[](1);
_shares[0] = shares;
```

And we're now ready to finish off the struct withdrawal.

```solidity
strategies: strategies,
shares: _shares
```

Ok, the next step is to prepare parameters to call the function completeWithdrawal. We prepared this parameter called withdrawal, struct withdrawal. So this will be the struct that we just prepared.

And then `receiveAsTokens`? Do we want to receive rETH? Yes, so I'll set it to true. That completes this exercise.

Now, let's execute the test using the terminal command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_withdraw -vvv
```

And our test has passed.
