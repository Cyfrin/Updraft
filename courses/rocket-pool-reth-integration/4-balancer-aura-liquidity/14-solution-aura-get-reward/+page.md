## Claim Aura Rewards

Once we add liquidity through rFinance, it's going to start accruing rewards which we can claim.
To claim the rewards, we'll need to call the contract reward pool. The reward pool has a function called `getReward` and it doesn't take any inputs. Calling this function will send any rewards that we can claim to the caller. When this contract calls `getReward` on `rewardPool`, any reward token will be sent into this contract.

To transfer the rewards that this contract claims, there's the function called transfer, where only an authorized account can specify the token and the destination. So, all we have to do here is:

```solidity
rewardPool.getReward();
```

Let's try compiling this contract. Inside the terminal type:

```bash
forge build
```

Our contract compiles.
