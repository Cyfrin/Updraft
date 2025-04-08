## Docstrings

We're going to look at what's called a docstring in Vyper. It's a method of adding comments to our code.

```python
@external
def fund():
    pass
```

To create a docstring, we use triple quotes.

```python
@external
def fund():
    """
    """
    pass
```

Similar to how the hashtag works in a regular comment, we can use triple quotes for multi-line comments. The docstring is then ignored by the compiler.

```python
@external
def fund():
    """
    Allows users to send $ to this contract.
    Have a minimum $ amount sent
    """
    pass
```

Docstrings are a commonly used method of documenting functions in Vyper.
