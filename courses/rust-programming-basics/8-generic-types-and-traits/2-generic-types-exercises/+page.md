# Generic type

## Example

Execute the following command to run [`./solutions/examples/generic.rs`](./solutions/examples/generic.rs)

```shell
cargo run --example generic
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn first(t: (u32, i32)) -> u32 {
    t.0
}
```

Turn this function into a generic function.

### Exercise 2

```rust
pub fn last(t: (u32, i32)) -> i32 {
    t.1
}
```

Turn this function into a generic function.

### Exercise 3

```rust
#[derive(Debug)]
pub struct Rectangle {
    pub top: u32,
    pub left: u32,
    pub width: u32,
    pub height: u32,
}
```

Turn this struct into a generic struct.

## Test

```shell
cargo test
```
