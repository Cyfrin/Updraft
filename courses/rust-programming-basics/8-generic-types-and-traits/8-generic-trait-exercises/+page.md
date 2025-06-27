# Generic trait

## Example

Execute the following command to run [`./solutions/examples/generic_trait.rs`](./solutions/examples/generic_trait.rs)

```shell
cargo run --example generic_trait
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](./exercises/src/lib.rs)

### Exercise 1

```rust
impl<T> Iterator<T> for TupleIter<T> {
    fn next(&mut self) -> Option<&T> {
        todo!();
    }
}
```

Implement the `Iterator` trait for `TupleIter<T>`.

Return the next element in the tuple until all elements are iterated.

### Exercise 2

Implement the `Iterator` trait for `VecIter<T>`.

Return the next element in the vector until all elements are iterated.

## Test

```shell
cargo test
```
