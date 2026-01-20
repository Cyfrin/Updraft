# Merkle tree algorithms

Implement Merkle tree algorithms

See [notes](https://github.com/Cyfrin/rust-crash-course/blob/main/notes/merkle-algo.png) for explanation of Merkle tree algorithms

## Exercises

Exercises are in [`./exercises/src/main.rs`](https://github.com/Cyfrin/rust-crash-course/blob/main/topics/merkle/exercises/src/main.rs)

### Exercise 1

Implement the function to calculate the Merkle root from the vector of hashes.

```rust
fn calc_root_hash(hashes: &mut [B256]) -> B256 {
    let mut n = hashes.len();
    assert!(n > 0);

    hashes[0]
}
```

### Exercise 2

Implement the function to generate the Merkle proof that a given hash is stored at index `idx` in the vector of hashes

```rust
fn get_proof(hashes: &mut [B256], mut idx: usize) -> Vec<B256> {
    let mut proof: Vec<B256> = Vec::new();
    proof
}
```

### Exercise 3

Implement the function to verify a Merkle proof given the Merkle root, proof and vector of hashes

```rust
fn verify(root: B256, proof: &[B256], hashes: &[B256], mut idx: usize) -> bool {
    false
}
```

## Test

Execute the `main.rs` file

```shell
cargo run
```
