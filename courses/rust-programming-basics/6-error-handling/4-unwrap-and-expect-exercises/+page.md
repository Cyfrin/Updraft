# `unwrap` and `expect`

## Example

Execute the following command to run [`./solutions/examples/unwrap.rs`](./solutions/examples/unwrap.rs)

```shell
cargo run --example unwrap
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn parse_and_add(a: &str, b: &str) -> u32 {
    todo!();
}
```

Parse `a` and `b` into `u32` and return the sum.

Call `a.parse().expect("...")` to parse `a` into `u32` and unwrap the inner value.

Call `expect` with the error message `"Failed to parse variable"`.

Do the same for `b`.

### Exercise 2

```rust
pub fn unwrap_and_add(x: Option<u32>, y: Option<u32>) -> u32 {
    todo!();
}
```

Call `unwrap` to get the inner values of `x` and `y`. Return their sum.

### Test

```shell
cargo test
```
