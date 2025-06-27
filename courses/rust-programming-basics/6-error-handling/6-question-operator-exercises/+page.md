# `?` operator

## Example

Execute the following command to run [`./solutions/examples/question.rs`](./solutions/examples/question.rs)

```shell
cargo run --example question
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn sum(nums: &[&str]) -> Result<u32, String> {
    todo!();
}
```

Parse the slice of string slices into `u32` and return their sum.

Call the `parse` function to parse a `&str` into `u32`.

Use `?` to make your code shorter.

### Test

```shell
cargo test
```
