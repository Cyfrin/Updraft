# Constant Sum AMM (Anchor)

Build a constant sum AMM.
Liquidity providers deposit token A and token B.
Traders can swap token A or B for the other token at 1 to 1 exchange rate.

Complete all tasks below
- Implement a constant sum AMM program
- Test locally

# Update program id
```shell
anchor keys sync
```

# Task 1 - Implement [`init_pool`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/anchor/exercise/programs/amm/src/lib.rs)
- Check `fee` <= `constants::MAX_POOL_FEE`
- Check `mint_a.decimals` == `mint_b.decimals`
- Store Pool state

# Task 2 - Implement [`add_liquidity`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/anchor/exercise/programs/amm/src/lib.rs)
- Calculate user shares to mint
- Transfer `amount_a` from user into `pool_a`
- Transfer `amount_b` from user into `pool_b`
- Mint shares to user's associated token account (`payer_liquidity`)

# Task 3 - Implement [`remove_liquidity`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/anchor/exercise/programs/amm/src/lib.rs)
- Calculate the amount of token a and b to withdraw
- Check `amount_a` >= `min_amount_a`
- Check `amount_b` >= `min_amount_b`
- Burn user's shares
- Transfer `amount_a` from pool to `payer_a` (user's associated token account for token a)
- Transfer `amount_b` from pool to `payer_b` (user's associated token account for token b)

# Task 4 - Implement [`swap`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/anchor/exercise/programs/amm/src/lib.rs)
- Calculate amount out with fee
- Check `amount_out` >= `min_amount_out`
- Transfer token in from user to pool
- Transfer token out from pool to user

# Build

```shell
anchor build
```

# Test
```shell
anchor test
```

