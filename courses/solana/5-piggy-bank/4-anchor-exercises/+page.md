# Piggy Bank (Anchor)

Complete all tasks below
- Implement a piggy bank program
- Test locally

# Update program id
```shell
anchor keys sync
```

# Task 1 - Implement [`lock`](https://github.com/Cyfrin/solana-course/blob/main/apps/piggy/anchor/exercise/programs/piggy/src/lib.rs)

- Require `amt` > 0
```shell
require!(amt > 0, error::Error::InvalidAmount);
```

- Ensure expiration is in the future
```shell
require!(
    exp > u64::try_from(clock.unix_timestamp).unwrap(),
    error::Error::InvalidExpiration
);
```
- Store lock state
```shell
let lock = &mut ctx.accounts.lock;
lock.dst = ctx.accounts.dst.key();
lock.exp = exp;
```
- Transfer SOL from payer to PDA
```shell
let ix = anchor_lang::solana_program::system_instruction::transfer(
    &ctx.accounts.payer.key(),
    &ctx.accounts.lock.key(),
    amt,
);
anchor_lang::solana_program::program::invoke(
    &ix,
    &[
        ctx.accounts.payer.to_account_info(),
        ctx.accounts.lock.to_account_info(),
        ctx.accounts.system_program.to_account_info(),
    ],
)?;
```
- Call `instructions::lock` inside `lib.rs`

# Task 2 - Implement [`unlock`](https://github.com/Cyfrin/solana-course/blob/main/apps/piggy/anchor/exercise/programs/piggy/src/lib.rs)
- Check expiration
```shell
require!(
    u64::try_from(clock.unix_timestamp).unwrap() >= lock.exp,
    error::Error::LockNotExpired
);
```
- Transfer all lamports to dst
```shell
let amt = ctx.accounts.lock.to_account_info().lamports();
**ctx
    .accounts
    .lock
    .to_account_info()
    .try_borrow_mut_lamports()? -= amt;
**ctx
    .accounts
    .dst
    .to_account_info()
    .try_borrow_mut_lamports()? += amt;
```

# Build

```shell
anchor build
```

# Test
```shell
anchor test
```

