## Conditionals in Vyper

We'll now cover the conditional statement in Vyper. This statement allows us to control the flow of our code based on different conditions. It's similar to the `if else` statement you might be familiar with in other programming languages.

Let's create an example of an `if else` conditional statement in Vyper. We'll create an external function, we'll call this function `if_else`, which takes a single input of `uint256`. It will return a `uint256` value as well.

```python
@external
def if_else(x: uint256) -> uint256:
```

Now, we'll write the `if else` conditional statement. Let's say `if` the input `x` is less than or equal to 10, then we'll return 1.

```python
@external
def if_else(x: uint256) -> uint256:
    if x <= 10:
        return 1
```

Then we'll add the `else` statement, we'll return 0 for this example.

```python
@external
def if_else(x: uint256) -> uint256:
    if x <= 10:
        return 1
    else:
        return 0
```

If we wanted another conditional statement in between, we would say `else if`, but in Vyper, we would type `elif`.

```python
@external
def if_else(x: uint256) -> uint256:
    if x <= 10:
        return 1
    elif x <= 20:
        return 2
    else:
        return 0
```

For this example, we forgot to make this a pure function, so let's do that.

```python
@external
pure
def if_else(x: uint256) -> uint256:
    if x <= 10:
        return 1
    elif x <= 20:
        return 2
    else:
        return 0
```

We'll now compile the contract. Click on the Vyper icon, Compile `ifElse.vy`.

We'll now call this function. We'll put 1 for `x` and call the function. We get a 1 back.

We'll now put 20 for `x` and call the function. We get a 2 back.

Lastly, we'll put 100 for `x` and call the function. We get a 0 back.

This has been an introduction to `if else` conditional statements in Vyper.
