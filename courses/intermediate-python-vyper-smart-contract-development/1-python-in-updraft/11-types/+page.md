## Types

We can convert types from one to another using something called casting.

For example, let's say we had this:

```python
year = "2025"
```

This is technically a string because it has quotes around it. If we got rid of the quotes, it would be a number, or an int.

But, since it has quotes, it's a string.

What if we tried to add 25 to this year number here? We can try this:

```python
year + 25
```

This will result in an error:

```bash
TypeError: can only concatenate str (not "int") to str
```

Since 25 is an int, and year is a string, Python can't perform the addition.

To fix this, we can typecast the year variable to an int:

```python
year_as_int = int(year)
```

Now, we can add 25 to the year variable:

```python
year_as_int + 25
```

This will result in 2050.

We can also convert the result back into a string using the `str()` function:

```python
year_string = str(year_as_int + 25)
```

Now, we can print the string:

```python
print(year_string + " is 25 years after 2025")
```

This will print the string:

```bash
2050 is 25 years after 2025
```

This is how we can convert types in Python using casting.
