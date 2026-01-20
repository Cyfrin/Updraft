# CPI (Native)

Build examples of CPI (Cross Program Invocation)
`factory` program will invoke the `counter` program.

Complete all tasks below
- Implement the programs
- Deploy locally to `solana-test-validator` and test with Rust script

# Task 1 - Implement [`init`](https://github.com/Cyfrin/solana-course/blob/main/apps/cpi/native/exercise/programs/factory/src/lib.rs)
- Invoke `Init` on the `counter` program
```rust
let cmd = counter::Cmd::Init;

let ix = Instruction::new_with_borsh(
    *counter_program.key,
    &cmd,
    vec![
        AccountMeta {
            pubkey: *payer.key,
            is_signer: true,
            is_writable: true,
        },
        AccountMeta {
            pubkey: *counter_account.key,
            is_signer: true,
            is_writable: true,
        },
        AccountMeta {
            pubkey: *system_program.key,
            is_signer: false,
            is_writable: false,
        },
    ],
);

invoke(
    &ix,
    &[
        payer.clone(),
        counter_account.clone(),
        system_program.clone(),
    ],
)?;
```

# Task 2 - Implement [`inc`](https://github.com/Cyfrin/solana-course/blob/main/apps/cpi/native/exercise/programs/factory/src/lib.rs)
- Invoke `Inc` on the `counter` program

```rust
let cmd = counter::Cmd::Inc;
let ix = Instruction::new_with_borsh(
    *counter_program.key,
    &cmd,
    vec![AccountMeta {
        pubkey: *counter_account.key,
        is_signer: false,
        is_writable: true,
    }],
);

invoke(&ix, &[counter_account.clone()])?;
```

# Build

```shell
cd programs/counter
cargo build-sbf

cd programs/factory
cargo build-sbf
```

# Test with script

Run local validator
```shell
solana config set -ul
solana-test-validator
```

Deploy the programs
```shell
cd programs/counter
solana program deploy ./target/deploy/counter.so

cd programs/factory
solana program deploy ./target/deploy/factory.so
```

Execute [demo script](https://github.com/Cyfrin/solana-course/tree/main/apps/cpi/native/exercise/examples)
```shell
FACTORY_PROGRAM_ID=your factory program ID
COUNTER_PROGRAM_ID=your counter program ID
RPC=http://localhost:8899
KEYPAIR=path to key pair

cargo run $KEYPAIR $RPC $FACTORY_PROGRAM_ID $COUNTER_PROGRAM_ID
```

