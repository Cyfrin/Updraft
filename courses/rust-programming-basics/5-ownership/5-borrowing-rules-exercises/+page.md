# Borrowing rules

## Example

Execute the following command to run [`./solutions/examples/borrow.rs`](./solutions/examples/borrow.rs)

```shell
cargo run --example borrow
```

Execute the following command to run [`./solutions/examples/borrow_func.rs`](./solutions/examples/borrow_func.rs)

```shell
cargo run --example borrow_func
```

## Exercises

Exercises are in [`./exercises/src/main.rs`](./exercises/src/main.rs)

### Exercise 1

```rust
let s = String::from("Rust");
let s1 = &mut s;
let s2 = &mut s;
```

Modify 2 lines to fix this code. `s1` and `s2` must be references to `s`.

### Exercise 2

```rust
let mut s = String::from("Rust");
let s1 = &mut s;
let s2 = &mut s;
```

Comment out a single line to fix the code. `s1` must be a reference.

### Exercise 3

```rust
let s = String::from("Rust");
print_len(s);
```

Modify the function definition of `print_len` so that the code compiles.

## Test

```shell
cargo test
```
