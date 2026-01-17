# Error handling

## Example

Execute the following command to run [`./solutions/examples/error.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/error/solutions/examples/error.rs)

```shell
cargo run --example error
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/error/exercises/src/lib.rs)

### Exercise 1

```rust
pub fn div(x: u32, y: u32) -> Result<u32, MathError> {
    todo!();
}
```

Return `MathError` if `y` is 0. Otherwise return `x / y`.

### Exercise 2

```rust
pub fn get(v: &[u32], i: usize, default_val: u32) -> u32 {
    todo!();
}
```

Return `v[i]` if `i` is a valid index. Otherwise return `default_val`.

### Test

```shell
cargo test
```
