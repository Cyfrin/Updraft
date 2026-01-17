## Documenting Vyper Code with Docstrings

In Vyper, clear documentation is crucial for understanding and maintaining smart contracts. While single-line comments using the hash symbol (`#`) are useful for brief annotations, Vyper provides a more structured way to document code elements like functions: **docstrings**.

Docstrings, short for documentation strings, are multi-line string literals placed immediately after the definition of a module, function, or class. They serve as the standard way to explain what a piece of code does, its parameters, and its return values (though the example focuses on the function's purpose).

Consider a simple `fund` function in a Vyper contract:

```vyper
@external
def fund():
    pass
```

To add a docstring explaining this function, we use triple double quotes (`"""`) right after the function definition line:

```vyper
@external
def fund():
    """
    This is where the function's documentation goes.
    """
    pass
```

This triple-quote syntax might look familiar if you've worked with Python; Vyper adopts the same convention for docstrings.

It's important to understand the distinction between docstrings and standard `#` comments. While anything enclosed within the triple quotes is ignored by the Vyper compiler—just like lines starting with `#`—their placement gives them a specific semantic meaning. When a triple-quoted string is the *very first statement* within a function (or module/class), it's officially recognized as a docstring, intended specifically for documentation. While you *could* technically use triple quotes for general multi-line comments elsewhere, their primary and conventional use immediately following a definition is for documentation.

Let's write a practical docstring for our `fund` function, describing its purpose and a specific requirement:

```vyper
@external
def fund():
    """
    Allows users to send $ to this contract.

    Have a minimum $ amount sent
    """
    pass
```

This docstring clearly explains that the function's role is to receive funds and specifies a condition regarding a minimum amount. Using docstrings effectively makes your Vyper code more readable, understandable, and maintainable for yourself and other developers.