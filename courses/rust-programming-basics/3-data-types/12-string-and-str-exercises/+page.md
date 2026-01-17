# `String` and `&str`

## Example

Execute the following command to run [`./solutions/examples/string.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/string/solutions/examples/string.rs)

```shell
cargo run --example string
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/string/exercises/src/lib.rs)

### Exercise 1

```rust
pub fn hello() -> String {
    todo!();
}
```

Create a function that returns the `String` `"Hello Rust"`.

### Exercise 2

```rust
pub fn greet(name: &str) -> String {
    todo!();
}
```

Create a function returns `"Hello "` appended with `name`.

### Exercise 3

```rust
pub fn append(mut s: String) -> String {
    todo!();
}
```

Create a function that appends `"!"` to `s`.

## Test

```shell
cargo test
```
