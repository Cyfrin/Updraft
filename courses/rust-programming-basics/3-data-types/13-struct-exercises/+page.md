# Struct

## Example

Execute the following command to run [`./solutions/examples/struct.rs`](./solutions/examples/struct.rs)

```shell
cargo run --example struct
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
#[derive(Debug)]
pub struct Account {}
```

Create an `struct` named `Account` having the fields

- `address` of the type `String`
- `balance` of the type `u32`

Prefix all struct fields with the `pub` keyword.

### Exercise 2

```rust
pub fn new(address: String) -> Account {
    todo!();
}
```

Create a function that returns the `Account` struct with `address` from the input, and `balance` set to 0.

## Test

```shell
cargo test
```
