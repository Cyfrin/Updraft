# Oracle (Anchor)

Complete all tasks below
- Implement an oracle program
- Test locally

# Update program id
```shell
anchor keys sync
```

# Task 1 - Implement [`update`](https://github.com/Cyfrin/solana-course/blob/main/apps/oracle/anchor/exercise/programs/oracle/src/lib.rs)

- Check that the `owner` signed this instruction to update the price
- Check that `oracle.owner` matches the `owner` account
- Update the price
- Call `instructions::update` inside `lib.rs`

# Build

```shell
anchor build
```

# Test
```shell
anchor test
```

