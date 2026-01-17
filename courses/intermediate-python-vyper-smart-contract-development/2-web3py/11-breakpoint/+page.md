## Python Tip: breakpoint()

We're going to run our code one more time, but we are going to use a Python debugging technique called breakpoints. 

Let's add the following line of code to our Python script:
```python
breakpoint()
```

Now, when we run our code, it will execute all of the lines up until the line where we've added `breakpoint()`. It will then drop us into a Python shell. This Python shell, also known as a PDB (Python Debugger) allows us to interactively execute code.

To demonstrate this, let's run our code again, after deactivating our virtual environment:
```bash
uv run python deploy_favorites.py
```

After the code executes, we'll be dropped into a Python shell. Let's execute the following command:
```python
favorites_contract
```

This will output the result of `favorites_contract`, which is a placeholder for the bytecode.  

We can type `quit` to exit the Python debugger or `q` depending on the debugger, as well. We can then remove the `breakpoint()` line and continue coding. 
