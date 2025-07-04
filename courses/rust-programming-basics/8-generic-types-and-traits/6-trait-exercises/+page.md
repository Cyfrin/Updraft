# Trait

## Example

Execute the following command to run [`./solutions/examples/trait.rs`](./solutions/examples/trait.rs)

```shell
cargo run --example trait
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

Implement trait `Tester` for `Foundry`. Return `forge test `, followed by `file_path`.

### Exercise 2

Implement trait `Tester` for `Cargo`. Return `cargo test `, followed by `file_path`.

### Exercise 3

```rust
pub fn test(tester: ?, file_path: &str) -> String {
    todo!();
}
```

Fix the code. `tester` is any type that implements the `Tester` trait.

Return the output of calling the function `test` on the type the implements the `Tester` trait.

## Test

```shell
cargo test
```
