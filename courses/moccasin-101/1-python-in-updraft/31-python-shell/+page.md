## Python Shell / Console

We can try out code in Python using the Python shell or console. To do this, we type:

```bash
python3.11
```

This will open the Python shell. The shell allows us to write any code we want and have it executed immediately. For example, to print the string "hi", we would type:

```python
print("hi")
```

The shell will immediately respond:

```
hi
```

We can also assign values to variables. For example, to assign the value 7 to the variable my_var, we would type:

```python
my_var = 7
```

The shell will not respond to this, since we have only assigned the value. We can then print the variable value by typing:

```python
print(my_var)
```

The shell will respond with the value:

```
7
```

If we type quit and hit enter, we will exit the shell and return to the terminal. To reenter the Python shell, we would have to type:

```bash
python3.11
```

again. 

If we try to print the variable my_var without assigning it a value, we will get an error:

```python
print(my_var)
```

The shell will respond with:

```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'my_var' is not defined
```

This error occurs because variables assigned in the shell are not saved when we exit the shell. 
