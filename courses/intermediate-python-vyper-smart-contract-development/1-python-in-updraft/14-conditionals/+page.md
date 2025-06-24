## Conditionals (if/else Statements)

In Python, we can use `if` / `else` statements, also known as conditionals. 

Let's create a new chunk of code.  
```python
if 7 > 5:
    print("7 is greater than 5")
```

We can run this code as it is.

```bash
7 is greater than 5
```

Now, let's try seeing if the numbers are equal:

```python
if 7 == 5:
    print("7 is greater than 5")
```

If we run this code, nothing will print because seven is not equal to five.  Notice we are using a double equals sign (`==`) here and not a single equals sign (`=`).  A single equals sign is used to set a value.  

To check if they are actually equal, we will use a double equals:

```python
if 7 == 5:
    print("7 is greater than 5")
```

If we run this, nothing gets printed because seven is not equal to five.

Just like with functions, we have some indentation here. If we remove the indentation, Python will give us an error.  

```python
if 7 == 5:
print("7 is greater than 5")
```

```bash
File "<ipython-input-49-effde220a0a2>", line 3
    print("7 is greater than 5")
    ^
IndentationError: expected an indented block after 'if' statement on line 2
```

Python is telling us that it expected an indentation block after the if statement.

So we will go back, indent it and run it:

```python
if 7 == 5:
    print("7 is greater than 5")
```

It does not print out. If we change the code to check if seven is greater than five:

```python
if 7 > 5:
    print("7 is greater than 5")
```

When we run it, we see this printed to the console:

```bash
7 is greater than 5
```

We can also use an `else` statement.

```python
if 7 > 5:
    print("7 is greater than 5")
else:
    print("5 is greater than 7")
```

If we run this line, it will still print out "7 is greater than 5". This is because what we are saying is if 7 is greater than 5, print out "7 is greater than 5". Otherwise, print out '5 is greater than 7'. 

If we were to flip the sign around to say if 7 is less than 5:

```python
if 7 < 5:
    print("7 is greater than 5")
else:
    print("5 is greater than 7")
```

Running this code, we see the following output:

```bash
5 is greater than 7
```

This is because the `if` condition is false and so the `else` block is executed. 

This is kind of similar to saying if true do this:

```python
if True:
    print("7 is greater than 5")
else:
    print("5 is greater than 7")
```

And if false, don't do this, do the else.

```python
if False:
    print("7 is greater than 5")
else:
    print("5 is greater than 7")
```

If that is a little confusing, don't worry about it for now. It will make sense to you the more you work with conditionals. 
