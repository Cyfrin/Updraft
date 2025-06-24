## Aura Intro

In the previous video, we saw that a liquidity provider to the Balancer V2 AAM can stake their BPT token into the liquidity gauge to earn some rewards. To get an even higher reward, they'd need to pair their Balancer token with ETH to get a liquidity provider token for the Bal-WETH pool, and then lock this BPT into the voting escrow contract.

If the liquidity provider doesn't lock BPT for the Bal-WETH pool, they won't earn a boost on the liquidity token they stake. The Aura Finance protocol streamlines locking this BPT into the voting escrow contract. It also allows a liquidity provider to earn a boosted reward of the BAL token without locking tokens into the voting escrow contract.

The liquidity provider interacts with the Aura contracts instead of directly engaging with the Balancer V2 contracts or staking their liquidity provider token into the liquidity gauge. They take their BPT, for example, the BPT of rETH and ETH, and then stake their BPT into the Aura contract. The Aura contract then automates the process of:
- Claiming rewards
- Converting balancer rewards into the Balancer WETH liquidity provider token BPT
- Locking it into the voting escrow contract

In this case, the liquidity provider doesn't have to lock tokens into the voting escrow contract manually. Since the Aura contract vote-locks, the liquidity provider—even though they didn't vote-lock any tokens—will receive a boost of the rewards. All Aura contract locks balance of rewards into the voting escrow contract. The reward that goes to the Aura contract is split between the protocol and the users. The user will also receive another reward token issued by the Aura protocol, the AURA token.
