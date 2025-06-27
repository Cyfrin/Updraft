# Method

## Example

Execute the following command to run [`./solutions/examples/method.rs`](./solutions/examples/method.rs)

```shell
cargo run --example method
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn new(width: u32, height: u32) -> Self {
    todo!();
}
```

Return `Point` with `top` set to 0, `left` set to 0, `width` and `height` set from the inputs.

### Exercise 2

```rust
pub fn move_to(&mut self, top: u32, left: u32) {
    todo!();
}
```

Update the fields `top` and `left` of the `Point`.

## Test

```shell
cargo test
```
