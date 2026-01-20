# Constant Sum AMM (Native)

This program will create a constant sum AMM.

Complete all tasks below
- Implement the constant sum AMM.
- Test locally with LiteSVM
- Deploy locally to `solana-test-validator` and test with Rust script

*** Hint ***
See [`instructions/lib.rs`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/native/exercise/src/instructions/lib.rs) for token helpers.

# Task 1 - Implement [`instructions::init_pool`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/native/exercise/src/instructions/init.rs)

- Verify `payer` is signer
- Check token decimals are equal
- Verify `pool`, `pool_a`, `pool_b` and `mint_pool` accounts are not initialized
- Verify provided `pool` PDA matches the one calculated by `lib::get_pool_pda`
- Verify provided `mint_pool` PDA matches the one calculated by `lib::get_mint_pool_pda`
- Create `pool` PDA
- Create `pool_a` associated token account
- Create `pool_b` associated token account
- Create `mint_pool` PDA
- Initialize `mint_pool`
- Initialize `Pool` state

# Task 2 - Implement [`instructions::add_liquidity`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/native/exercise/src/instructions/add_liquidity.rs)

- Verify `payer` is signer
- Verify provided `pool` PDA matches the one calculated by `lib::get_pool_pda`
- Verify provided `mint_pool` PDA matches the one calculated by `lib::get_mint_pool_pda`
- Get `Pool` state
- Verify `Pool` state `mint_a` = `mint_a` from `accounts_iter`
- Verify `Pool` state `mint_b` = `mint_b` from `accounts_iter`
- Get `pool_a` and `pool_b` amounts
- Get `mint_pool` supply
- Calculate shares to mint
- Initialize `payer_liq` (associated token account for `mint_pool` owned by `payer`) if not initialized.
- Transfer `mint_a` from payer to `pool_a`
- Transfer `mint_b` from payer to `pool_b`
- Mint LP tokens to `payer`

# Task 3 - Implement [`instructions::remove_liquidity`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/native/exercise/src/instructions/remove_liquidity.rs)

- Verify `payer` is signer
- Verify provided `pool` PDA matches the one calculated by `lib::get_pool_pda`
- Verify provided `mint_pool` PDA matches the one calculated by `lib::get_mint_pool_pda`
- Get `Pool` state
- Verify `Pool` state `mint_a` = `mint_a` from `accounts_iter`
- Verify `Pool` state `mint_b` = `mint_b` from `accounts_iter`
- Get `pool_a` and `pool_b` amounts
- Get `mint_pool` supply
- Calculate amounts of token A and B to withdraw
- Check amounts to withdraw are greater or equal to minimum specified by user
- Burn LP tokens from payer
- Transfer token A from pool to `payer`
- Transfer token B from pool to `payer`

# Task 4 - Implement [`instructions::swap`](https://github.com/Cyfrin/solana-course/blob/main/apps/amm/native/exercise/src/instructions/swap.rs)

- Verify `payer` is signer
- Verify provided `pool` PDA matches the one calculated by `lib::get_pool_pda`
- Get `Pool` state
- Verify `Pool` state `mint_a` = `mint_a` from `accounts_iter`
- Verify `Pool` state `mint_b` = `mint_b` from `accounts_iter`
- Calculate amount out with fee
- Check amount out is >= minimum amount specified by payer
- Determine swap direction
- Transfer token from `payer` to pool
- Transfer token from pool to `payer`

# Build

```shell
cargo build-sbf
```

# Test
```shell
cargo test -- --nocapture
```

# Test with script

Run local validator
```shell
solana config set -ul
solana-test-validator
```

Deploy program
```shell
solana program deploy ./target/deploy/amm.so
```

Execute demo script
```shell
PROGRAM_ID=your program ID
RPC=http://localhost:8899
KEYPAIR=path to key pair

cargo run --example demo $KEYPAIR $RPC $PROGRAM_ID
```

