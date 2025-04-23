## Natspec docstring

Now that we've learned more about immutables and constants, we can improve our code to be more professional and gas-efficient.

Before we even get to immutables and constants, we can improve our code by adding documentation at the top of the contract.

This is a special type of comment called a docstring. We can do this by adding three quotes:

```python
"""
"""
```

This is the same as adding a hashtag (#) to every single line, but this means that we don't have to do that. Everything within these three quotes will be a comment.

We can use a special docstring format called NatSpec Metadata to add documentation to our code. It's a way to provide rich documentation for functions, return values, and more.

To use NatSpec, we add an "at" symbol (@) followed by a tag. We'll add the following NatSpec tags at the top of our contract:

```python
pragma version 0.4.1
@license MIT
@title Buy Me A Coffee!
@author You!
@notice This contract is for creating a sample funding contract.
```

- **`pragma version`**: specifies the version of Vyper we are using. It isn't part of NatSpec, but it is convention to put it at the top of our contract.
- **`@license`**: describes the license for our code (in this case, MIT).
- **`@title`**: provides a short title for our contract.
- **`@author`**: identifies the author of the code.
- **`@notice`**: explains to an end user what the contract does.

The compiler doesn't parse docstrings for internal functions. While we can add NatSpec tags in comments for internal functions, the compiler won't process or include them.

We can add other NatSpec tags to document different parts of our contract, like functions and parameters. For example:

```python
@dev Explains to a developer any extra details.
@param Documents a single parameter.
@return Documents one or all return value(s).
```

Let's add these NatSpec tags to our code so it looks a little more professional.
