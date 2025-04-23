## Visibility in Vyper

In this lesson, we will explore the concept of visibility within Vyper contracts. Visibility is a fundamental aspect of how we control access to different components within a contract. We will focus on the keywords `public` and `internal`.

The concept of visibility allows us to define the scope of accessibility to different elements in our smart contracts. Let's dive in by examining the code for our `favorites.vy` contract:

```python

# pragma version >=0.4.1
# @license MIT

my_favorite_number: public(uint256) = 0
@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

We have a state variable `my_favorite_number` that is declared as `public`. This means it is visible and accessible from anywhere. For example, an external user could interact with the `my_favorite_number` variable directly, without having to use any functions.

We also have a function `store` that is declared as `@external`. This means that this function can only be accessed from outside the contract, via a transaction. No other functions within the contract can call `store` directly.

Now let's look at how `internal` visibility functions work. We can remove the `public` keyword from our `my_favorite_number` state variable. We can then change the `@external` decorator to `@internal`:

```python

# pragma version >=0.4.1
# @license MIT

my_favorite_number: uint256 = 0
@internal
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

We can then compile the code:

```bash
Compile favorites.vy
```

The `internal` keyword means that the function `store` can only be called by other functions within the same contract. Let's add an example:

```python

# pragma version >=0.4.1
# @license MIT

my_favorite_number: uint256 = 0
@internal
def store(new_number: uint256):
    self.my_favorite_number = new_number
def store_other():
    self.store(7)
```

When we try to compile this code, we get an error because the `store_other` function is trying to call the `store` function, which is declared as `internal`.

We can fix this by making the `store` function `external`, which allows it to be called from outside the contract. We can also make `my_favorite_number` `public` again so that it's visible from the outside.

```python

# pragma version >=0.4.1
# @license MIT

my_favorite_number: public(uint256) = 0
@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
def store_other():
    self.store(7)
```

We can compile this code and we will see it functions as expected.

This is a basic introduction to the concept of visibility in Vyper contracts. By mastering the use of keywords like `public` and `internal`, we can create more secure and modular smart contracts.
