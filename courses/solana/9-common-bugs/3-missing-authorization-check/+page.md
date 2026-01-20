# Missing authorization check

The oracle program is designed so that only the owner of the oracle account can update the price.

But there is a bug in this program. Find the bug and update the price without the owner's authorization.

# Task 1 - Write your exploit

Write your exploit inside [`test`](https://github.com/Cyfrin/solana-course/blob/main/apps/ctf/auth/exercise/tests/test.rs).

# Build

```shell
cargo build-sbf
```

# Test
Your exploit is successful if the test passes.

```shell
cargo test -- --nocapture
```
