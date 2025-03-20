## Balancer V2 and Voting Escrow Tokenomics

Balancer V2 is an AMM that allows you to stake liquidity and earn rewards. In this video, we will discuss how Balancer V2 contracts are designed and how the voting escrow tokenomics works within Balancer V2.

The design of Balancer V2 contracts use a single contract called a vault contract. The vault contract will hold all of the tokens. Different token pairs might require different logic for the AMM. There are four different types of pools that contain logic for the AMM. The pool types are:

- Weighted Pool - constant product AMM
- Stable Pool - Curve V1’s Stable Swap contract
- Meta Stable Pool - Curve V1’s Stable Swap
- Custom Pool - a custom implementation

If we have a user who wants to add liquidity, they will call the vault contract. If token pairs are registered as a Meta Stable Pool, then the vault contract will execute the logic inside of the Meta Stable Pool contract. Then, the user will receive an LP token, the liquidity provider token. In Balancer, this is also called BPT, which stands for Balancer Pool Token. Once the user has liquidity provider shares, they can stake into a liquidity gauge contract. Each pool has its own separate liquidity gauge.

Why would a user want to stake their BPT into a liquidity gauge contract? The answer is: to earn balancer governance tokens. In other words, to earn some rewards. The amount of BAL that the user will receive will depend on the amount of BPT that the user stakes. Once staked, the user can then either sell BAL on an AMM to make an instant profit. Or, they can lock it into a voting escrow contract. Locking it in the voting escrow contract will boost the amount of BAL rewards that the user can receive.

To lock BAL into the voting escrow contract, the user will first have to add liquidity to the Balancer WETH pool, receive the BPT token of the Balancer WETH pool, and then lock that BPT into the voting escrow contract. This will give the user voting power, also known as veBAL. Over time, veBAL will linearly decrease. The longer they lock their BPT, the more voting power they will receive.

The benefits of veBAL include the ability to boost Balancer rewards. This works by allowing the liquidity gauge to calculate a boosted balance in the liquidity gauge contract. In other words, when the user claims this BAL token, they will receive more since they received the boost. The other benefit is that the user can vote for the distribution of the BAL rewards. The user can now vote for which pool should receive the BAL token and how much it should receive. Furthermore, this allows the user to earn protocol revenues.

The user can vote for balancer rewards emission by engaging with the gauge controller contract. They'll use the vote power (veBAL) to vote for which pool will receive the BAL rewards token.
