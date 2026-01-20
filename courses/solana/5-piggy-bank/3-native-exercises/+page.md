# Piggy Bank (Native)

This program will create a PDA to store SOL.
SOL is kept in this PDA until expiry.
After expiry, SOL can be sent to a designated account.

Complete all tasks below
- Implement the piggy bank program
- Test locally with LiteSVM
- Deploy locally to `solana-test-validator` and test with Rust script

# Task 1 - Implement [`instructions::lock`](https://github.com/Cyfrin/solana-course/blob/main/apps/piggy/native/exercise/src/instructions/lock.rs)

- Check dst signed, verifies dst exists and approved to later receive SOL
```rust
if !dst.is_signer {
    return Err(ProgramError::MissingRequiredSignature);
}
```

- Check that the given account key matches expected PDA
```rust
if *pda.key != get_pda(program_id, payer.key, &dst, bump)? {
    return Err(ProgramError::InvalidSeeds);
}
```
- Check `amt` > 0
- Verify expiration `exp` is in the future
- Create PDA account
```rust
invoke_signed(
    &system_instruction::create_account(
        payer.key,
        pda.key,
        rent,
        space as u64,
        program_id,
    ),
    &[payer.clone(), pda.clone(), sys_program.clone()],
    &[&[b"lock", payer.key.as_ref(), dst.as_ref(), &[bump]]],
)?;
```
- Transfer SOL from `payer` to PDA
```rust
invoke(
    &system_instruction::transfer(payer.key, pda.key, amt),
    &[payer.clone(), pda.clone(), sys_program.clone()],
)?;
```
- Create and save `Lock` state into PDA data
```rust
let mut data = pda.data.borrow_mut();
let lock = Lock { dst, exp };
lock.serialize(&mut &mut data[..])?;
```
- Call `instructions::lock` inside `lib.rs`


# Task 2 - Implement [`instructions::unlock`](https://github.com/Cyfrin/solana-course/blob/main/apps/piggy/native/exercise/src/instructions/unlock.rs)
- Check that the given account key matches expected PDA
- Load lock state
```rust
let (lock_dst, lock_exp) = {
    let data = pda.data.borrow();
    let lock = Lock::try_from_slice(&data)?;
    (lock.dst, lock.exp)
}; // Drop borrow here
```
- Verify destination matches
- Verify lock has expired
- Get PDA balance and transfer lamports directly
```rust
**pda.try_borrow_mut_lamports()? = 0;
**dst.try_borrow_mut_lamports()? = dst
    .lamports()
    .checked_add(pda_lamports)
    .ok_or(ProgramError::ArithmeticOverflow)?;
```
- Clear out data
```rust
pda.resize(0)?;
```
- Assign the account to the System Program
```rust
pda.assign(sys_program.key);
```
- Call `instructions::unlock` inside `lib.rs`

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
solana program deploy ./target/deploy/piggy.so
```

Execute demo script
```shell
PROGRAM_ID=your program ID
RPC=http://localhost:8899
KEYPAIR=path to key pair

cargo run --example demo $KEYPAIR $RPC $PROGRAM_ID
```

