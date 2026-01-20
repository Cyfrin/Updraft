# CPI (Anchor)

Build examples of CPI (Cross Program Invocation)
`factory` program will invoke the `counter` program.

Complete all tasks below
- Implement the programs
- Test locally

# Update program id
```shell
anchor keys sync
```

# Task 1 - Copy IDL

Compile `counter` program
```shell
anchor build
```

Create a new folder called `idls` under project root.
```shell
mkdir idls
```

Copy `target/idl/counter.json` into `idls`
```shell
cp target/idl/counter.json idls/
```

# Task 2 - Import IDL of the `counter` program into [`lib.rs`](https://github.com/Cyfrin/solana-course/blob/main/apps/cpi/anchor/exercise/programs/factory/src/lib.rs)

Import IDL of the `counter` program.

```rust
declare_program!(counter);
use counter::program::Counter;
```

# Task 3 - Implement [`init`](https://github.com/Cyfrin/solana-course/blob/main/apps/cpi/anchor/exercise/programs/factory/src/lib.rs)
- Invoke the function `init` on the `counter` program
```rust
let cpi_accounts = counter::cpi::accounts::Init {
    payer: ctx.accounts.payer.to_account_info(),
    counter: ctx.accounts.counter.to_account_info(),
    system_program: ctx.accounts.system_program.to_account_info(),
};

let cpi_ctx = CpiContext::new(
    ctx.accounts.counter_program.to_account_info(),
    cpi_accounts,
);
counter::cpi::init(cpi_ctx)?;
```

- Add `counter_program` into `Init`
```rust
pub counter_program: Program<'info, Counter>,
```

# Task 4 - Implement [`inc`](https://github.com/Cyfrin/solana-course/blob/main/apps/cpi/anchor/exercise/programs/factory/src/lib.rs)
- Invoke the function `inc` on the `counter` program
```rust
let cpi_accounts = counter::cpi::accounts::Inc {
    counter: ctx.accounts.counter.to_account_info(),
};

let cpi_ctx = CpiContext::new(
    ctx.accounts.counter_program.to_account_info(),
    cpi_accounts,
);
counter::cpi::inc(cpi_ctx)?;
```
- Add `counter_program` into `Inc`
```rust
pub counter_program: Program<'info, Counter>,
```

# Build

```shell
anchor build
```

# Test
```shell
anchor test
```

