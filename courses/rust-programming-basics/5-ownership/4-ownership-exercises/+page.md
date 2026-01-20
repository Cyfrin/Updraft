# Ownership

## Example

Execute the following command to run [`./solutions/examples/ownership.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/ownership/solutions/examples/ownership.rs)

```shell
cargo run --example ownership
```

## Exercises

Exercises are in [`./exercises/src/lib.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/ownership/exercises/src/lib.rs)

### Exercise 1

```rust
pub fn exercise_1() {
    let s = "rust".to_string();
    let s1 = s;
    let s2 = s;
    println!("{s1}");
}

```

Comment out a single line to fix the code.

### Exercise 2

```rust
pub fn exercise_2() {
    let s = "rust".to_string();
    {
        let s1 = s;
        println!("{s1}");
    }
    println!("{s}");
}
```

Comment out a single line to fix the code.

### Exercise 3

```rust
pub fn exercise_3() {
    let s = "rust".to_string();
    take(s);
    println!("{s}");
    println!("{s}");
}
```

Comment out a single line to fix the code.

## Test

```shell
cargo test
```
