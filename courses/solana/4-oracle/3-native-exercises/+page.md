# Oracle (Native)

This program will store the price of some asset in an account owned by this program.
Only an authorized account will be able to update the price.

Complete all tasks below
- Implement an oracle program
- Test locally with LiteSVM
- Deploy locally to `solana-test-validator` and test with Rust script

# Task 1 - Implement [`instructions::init`](https://github.com/Cyfrin/solana-course/blob/main/apps/oracle/native/exercise/src/instructions/init.rs)

- Check that `oracle_account` is not initialized
- Store the `owner` and `price` into `oracle_account`
- Call `instructions::init` inside `lib.rs`

# Task 2 - Implement [`instructions::update`](https://github.com/Cyfrin/solana-course/blob/main/apps/oracle/native/exercise/src/instructions/update.rs)

- Check that the `oracle.owner` signed this instruction to update the price
- Update the price
- Call `instructions::update` inside `lib.rs`

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
solana program deploy ./target/deploy/oracle.so
```

Execute demo script
```shell
PROGRAM_ID=your program ID
RPC=http://localhost:8899
KEYPAIR=path to key pair

cargo run --example demo $KEYPAIR $RPC $PROGRAM_ID
```

