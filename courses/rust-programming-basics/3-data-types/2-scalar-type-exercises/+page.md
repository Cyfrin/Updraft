# Scalar types

## Example

Execute the following command to run [`./solutions/examples/scalar.rs`](./solutions/examples/scalar.rs)

```shell
cargo run --example scalar --release
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn eq() {
    todo!();
}
```

Fix the function `eq` inside [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

Compare 2 inputs of the type `char` for equality and return a `bool`

### Exercise 2

```rust
pub fn add() {
    todo!();
}
```

Fix the function `add` inside [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

Add 3 inputs of the type `f32` and return the sum

### Exercise 3

```rust
pub fn cast(x: u8, y: i8, z: f32) -> f32 {
    x + y + z
}
```

Fix the function `cast` inside [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

Add the 3 inputs, casting all of them into `f32`

## Test

```shell
cargo test
```
