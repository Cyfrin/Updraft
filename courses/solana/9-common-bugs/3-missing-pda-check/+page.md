# Missing PDA check

The piggy program is designed so that only the PDA derived from the caller can withdraw SOL after some time.

But there is a bug in this program. Find the bug and drain SOL from the PDA.

# Task 1 - Write your exploit

Write your exploit inside [`test`](https://github.com/Cyfrin/solana-course/blob/main/apps/ctf/pda/exercise/tests/test.rs).

# Build

```shell
cargo build-sbf
```

# Test
Your exploit is successful if the test passes.

```shell
cargo test -- --nocapture
```
