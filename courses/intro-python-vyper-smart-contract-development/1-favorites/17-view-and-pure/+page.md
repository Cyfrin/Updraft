## View and Pure Functions

In this lesson we will learn how to build a view function.

Firstly, let's go ahead and make a function that returns a value.

```python
@external
def retrieve() -> uint256:
    return self.my_favorite_number
```

Then we save and redeploy this:

```bash
favorites --favorites.vy
```

Now we will comment out the store function for now.

```python
# @external
# def store(new_number: uint256):
#    self.my_favorite_number = new_number
```

We can now see the value returned in the UI:

```bash
my_favorite_number --call
```

We will now change the retrieve function to return a value:

```python
@external
def retrieve() -> uint256:
   return self.my_favorite_number
```

This time we will redeploy and check the UI:

```bash
favorites --favorites.vy
```

Now, if we want to explicitly tell the compiler that this is not a transaction we can simply add the @view decorator to the function:

```python
@external
@view
def retrieve() -> uint256:
    return self.my_favorite_number
```

Let's redeploy and see what happens in the UI.

```bash
favorites --favorites.vy
```

The UI will now display a blue button, indicating that the function is a view function. We will now create a second view function which we will call 'retrieve', and we will also include a note within our code explaining how view functions work.

```python
@external
def store(new_number: uint256):
   self.my_favorite_number = new_number

@external
@view
def retrieve() -> uint256:
   return self.my_favorite_number

# a view function can be called
# by a human for free -- no gas

# but when a transaction calls
# a view function, it costs gas

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number

@internal
@view
def retrieve() -> uint256:
    return self.my_favorite_number
```

Next, we will make the retrieve function an external function, so that we can call it. We will also add a few extra retrieve functions, just to highlight the gas cost differences.

```python
@external
def store(new_number: uint256):
    self.my_favorite_number = new_number

    self.retrieve()
    self.retrieve()
    self.retrieve()
    self.retrieve()

@internal
@view
def retrieve() -> uint256:
    return self.my_favorite_number
```

Let's redeploy and see the difference in gas cost between the view function and external retrieve function.

```bash
favorites --favorites.vy
```

If you recall, calling a view function from the UI requires no gas. However, if another transaction calls a view function, then it will incur a gas cost. 

Calling a view function from the UI is essentially the same as calling the 'public' function. 
