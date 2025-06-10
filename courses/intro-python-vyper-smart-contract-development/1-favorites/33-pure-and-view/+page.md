## Pure vs. View Functions

We're going to look at a couple of key concepts in Vyper: `pure` and `view` functions. These are important to know to write better smart contracts.

We'll use the `@pure` and `@view` decorators in our code. Let's start with the `@pure` decorator.

**Pure Functions**

A `pure` function is a function that:

- **Is read-only:** It doesn't modify the state of the blockchain.
- **Does not read state or global variables:** This means it can't access any data that's stored on the blockchain or in the global scope.

Let's look at an example:

```python
@external
@pure
def add(x: uint256, y: uint256) -> uint256:
    return x + y
```

This function takes two inputs, `x` and `y`, both of which are `uint256` (unsigned integers up to 256 bits). The function returns their sum. Since it's `@pure`, we know it's read-only and doesn't use any state or global variables.

**View Functions**

A `view` function is also read-only, but it can read data from the blockchain. This includes state variables and global variables. Global variables are those defined by the EVM like `block` and `msg`.

For example, we can read from a state variable called `count`:

```python
@external
@view
def add_to_count(x: uint256) -> uint256:
    return x + self.count + block.timestamp
```

This `view` function returns the sum of the input `x`, the current value of the state variable `count`, and the current block timestamp.

Let's recap:

- **Pure functions** are read-only and don't read any state or global variables.
- **View functions** are read-only but can read state and global variables.

**Code Example**

```python
@external
@pure
def add(x: uint256, y: uint256) -> uint256:
    return x + y

count: public(uint256)

@external
@view
def add_to_count(x: uint256) -> uint256:
    return x + self.count + block.timestamp
```

In this example, `add` is a `pure` function, and `add_to_count` is a `view` function.

**Deploying and Interacting with the Contract**

Let's deploy the contract and try using these functions:

1.  **Compile the contract:** We can compile the code and get the ABI (Application Binary Interface) and bytecode, which are needed to deploy the contract.
2.  **Deploy the contract:** We can deploy the contract to the blockchain using a tool like Remix.
3.  **Call the `add` function:** This function is `@pure`, so it won't modify any state. We can call it with two inputs, say 2 and 3, and it will return 5.
4.  **Call the `add_to_count` function:** This function is `@view`, so it won't modify any state. We can call it with an input, say 2, and it will return a value that's the sum of 2, the current value of the `count` state variable, and the current block timestamp.

**Important Considerations**

- Using `@pure` and `@view` functions can make your smart contracts more gas-efficient. This is because they don't need to write data to the blockchain.
- `Pure` functions are deterministic: They always return the same output for the same input. This is useful for functions that are used in calculations or for verifying data.
- `View` functions are useful for reading data from the blockchain and displaying it to users.

We've just scratched the surface of pure and view functions. There's much more to learn, like their relationship to the EVM and their differences from other function types. But this overview should give you a good starting point.
