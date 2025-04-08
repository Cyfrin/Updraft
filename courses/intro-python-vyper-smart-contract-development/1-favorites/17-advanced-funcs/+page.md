## Advanced Vyper Functions

We will show you some examples of functions in Vyper. All of the examples that I will show you here are called external functions. This means that after we deploy the contract, we will be able to call these functions.

So, we'll declare as external:

```python
@external
```

Now, there's another keyword called internal, which I will explain in another video, and then I'll put another keyword called pure:

```python
@pure
```

Also, explain this in another video. Here, I just want to show you some syntax for how to write functions in Vyper:

```python
def
```

Let's call this function multiply:

```python
def multiply
```

And as the name implies it will multiply two uint256, X uint256 and Y uint256.

```python
def multiply(x: uint256, y: uint256)
```

And we want to return the product of X and Y.

```python
def multiply(x: uint256, y: uint256) -> uint256:
```

To do this, we'll say put an arrow, then say we're going to return uint256 uint256.

```python
def multiply(x: uint256, y: uint256) -> uint256:
return
```

And then, call it. Okay, and to multiply two numbers, we will say return.

```python
def multiply(x: uint256, y: uint256) -> uint256:
return x * y
```

So, that's an example of a simple function that takes in two inputs, and then returns the product of the two numbers.

Let me show you another example. I'm going to copy this. Again, we'll start with external, pure:

```python
@external
@pure
```

Then I'll call this function divide:

```python
def divide(x: uint256, y: uint256) -> uint256:
```

We're going to divide X by Y and it's going to return uint256.

```python
def divide(x: uint256, y: uint256) -> uint256:
return
```

Now, you would think that to divide two numbers, you just have to put a slash. However, in Vyper when you're dividing two integers, then you need to do double slash.

```python
def divide(x: uint256, y: uint256) -> uint256:
return x // y
```

For the next example, sometimes you want to declare a function, but don't want to implement the code yet, you just want to make sure that the contract compiles. In this case, you can use the keyword pass. So, for example, let's say that we have a function external:

```python
@external
def todo():
```

def, and I'll call this, let's say, todo. And we're not going to return any outputs. It's also not going to take any inputs. What we want to say is we're going to implement the code inside here later. What you can do is type pass:

```python
@external
def todo():
pass
```

Basically, this function will do nothing.

Okay, and the last example I'll show you is how do you return multiple outputs? So, let's say external again, and I'll use pure again for this example, and say def return many.

```python
@external
@pure
def return_many()
```

For the input, we'll keep it simple, it's not going to take any inputs. And for the output, how would we return multiple outputs? To do this, you'll need to put the type of the output inside the parentheses. For example, let's say we wanted to return uint256 and some boolean:

```python
@external
@pure
def return_many() -> (uint256, bool):
```

Bool, we'll say return. For the first output, we need to return a uint256. So, let's return 123. And for the second output, we'll need to return a boolean, that's say true.

```python
@external
@pure
def return_many() -> (uint256, bool):
return (123, True)
```

Okay, so those are some examples of how to write functions in Vyper. Let's try compiling and deploying the contract.

```bash
vyper compile advanced_functions.vy
```
