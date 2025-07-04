# If let statement

## Example

Execute the following command to run [`./solutions/examples/if_let.rs`](./solutions/examples/if_let.rs)

```shell
cargo run --example if_let
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
pub fn unwrap_or_default(x: Option<u32>, v: u32) -> u32 {
    todo!();
}
```

Use the `if`, `let` syntax to extract the value stored inside a `Some`.

Return the inner value.

If `x` is `None`, then return the default value `v`.

## Test

```shell
cargo test
```
