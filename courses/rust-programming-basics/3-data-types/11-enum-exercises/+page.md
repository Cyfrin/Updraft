# Enum

## Example

Execute the following command to run [`./solutions/examples/enum.rs`](./solutions/examples/enum.rs)

```shell
cargo run --example enum
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
#[derive(Debug, PartialEq)]
pub enum Color {}
```

Create an `enum` named `Color` having the values

- `Red`
- `Green`
- `Blue`
- `Rgba(u8, u8, u8, f32)`

Prefix the `enum` with the keyword `pub`. This will make the `enum` public so that it can be imported into other rust files, including the test file.

## Test

```shell
cargo test
```
