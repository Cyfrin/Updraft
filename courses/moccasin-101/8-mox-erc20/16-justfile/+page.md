## Optional: Justfile

We can use something called a Justfile to run a bunch of commands easily. This is 100% optional but, it's a handy way to save and run project-specific commands. If we're very specific about how we like to have formatters, we can create a Justfile.

We can create a command that's a combination of a bunch of commands, but are really easy for us to run. For example, if we want to run the formatter, we can add the following to our Justfile:

```python
# Run the formatter
format:
  @just fmt
```

We can also add a command to run our formatter:

```python
# Run the formatter
format:
  uv run ruff check --select I --fix
```

We're going to use the VS Code Just extension. We can install this from the VS Code marketplace. We can change the language mode of our Justfile from Python to Just.

Now, we can run the Just format command:

```bash
just format
```

This will run both of the formatter commands for us. We can add a lot of commands to our Justfile and use this as a way to run multiple commands quickly.
