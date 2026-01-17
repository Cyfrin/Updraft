## Arrays / Lists

We can assign values to variables in Python, like so:

```python
my_variable = 7
print(my_variable)
```

We can assign many different types of values to variables:

```python
my_number = 10
my_boolean = True
my_string = 'hello!' 
```

We can even type hint our variables:

```python
my_typed_number: int = 9
my_typed_bool: bool = False
my_typed_string: str = "hi!"
```

We can also update variables:

```python
my_variable = 77
```

### Lists

We can store collections of values in a list, or an array:

```python
my_list: list = [7, "cat", True]
print(my_list)
```

We can see that each item in the list has an index. It's important to remember that in Python, the first index is `0`. 

```python
# [7, "cat", True]
# [0, 1, 2]
```

We can use square bracket notation to update a specific item in the list:

```python
my_list[1] = "dog"
print(my_list)
```

Python provides a convenient way to sort lists of numbers:

```python
my_numbered_list = [0, 7, 8, 2, 3, 99]
print(my_numbered_list)
my_numbered_list.sort()
print(my_numbered_list)
```

We can use the `.sort()` method to sort our list. 
