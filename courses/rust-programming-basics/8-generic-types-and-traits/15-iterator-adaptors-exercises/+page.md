# Iterator adaptors

## Example

Execute the following command to run [`./solutions/examples/iter_adaptors.rs`](./solutions/examples/iter_adaptors.rs)

```shell
cargo run --example iter_adaptors
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn filter_non_zero(v: Vec<u32>) -> Vec<u32> {
    todo!();
}
```

Return a vector where each element is greater than 0.

### Exercise 2

```rust
pub fn to_string(v: Vec<&str>) -> Vec<String> {
    todo!();
}
```

Convert vector of `&str` into a vector of `String`.

### Exercise 3

```rust
pub fn to_hash_map(v: Vec<(String, u32)>) -> HashMap<String, u32> {
    todo!();
}
```

Convert a vector of `(String, u32)` into a `HashMap<String, u32>`.

## Test

```shell
cargo test
```
