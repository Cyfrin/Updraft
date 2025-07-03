# Pattern match

## Example

Execute the following command to run [`./solutions/examples/match.rs`](./solutions/examples/match.rs)

```shell
cargo run --example match
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn num_to_string(num: u32) -> String {
    todo!();
}
```

Convert `num` into `String`, `"one"` to `"three"`.

Return `"other"` if `num` is greater than 3.

### Exercise 2

```rust
pub fn unwrap_or_default(x: Option<u32>, v: u32) -> u32 {
    todo!();
}
```

Extract the value wrapped in `Some`. If `x` is `None`, return the default value `v`.

## Test

```shell
cargo test
```
