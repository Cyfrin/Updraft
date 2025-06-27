# Trait bound

## Example

Execute the following command to run [`./solutions/examples/trait_bound.rs`](./solutions/examples/trait_bound.rs)

```shell
cargo run --example trait_bound
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn min(x: u32, y: u32) -> u32 {
    if x <= y { x } else { y }
}
```

Update the function so that the inputs are generic type that implements the `PartialOrd` trait.

### Exercise 2

```rust
pub fn zip(a: Vec<u32>, b: Vec<i32>) -> Vec<(u32, i32)> {
    let mut v = vec![];
    let len = min(a.len(), b.len());

    for i in 0..len {
        v.push((a[i], b[i]));
    }

    v
}
```

Update the function so that the inputs are generic types, not necessary the same type, both implements the `Copy` trait.

## Test

```shell
cargo test
```
