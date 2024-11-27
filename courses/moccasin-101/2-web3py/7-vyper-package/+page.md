## Using the Vyper compiler as a package

In this lesson, we will learn how to use the Vyper compiler as a package.

We begin by opening a file named `deploy_favorites.py` and then edit the `print` statement to read:

```python
print("Let's read in the Vyper code and deploy it!")
```

We then proceed to open our `favorites.vy` file, which contains Vyper code, in read-only mode by using the following code:

```python
with open("favorites.vy", "r") as favorites_file:
    favorites_code = favorites_file.read()
```

We then need to compile the Vyper code. We've already installed Vyper and can use it in our project. 

To do so, we must first add Vyper as a dependency to our project by running the following command in our terminal:

```bash
uv add vyper
```

We then need to synchronize our dependencies to our project. We can do this by typing the following command in our terminal:

```bash
uv sync
```

To call the Vyper compiler and compile our Vyper code, we can run the following code:

```python
from vyper import compile_code
compilation_details = compile_code(favorites_code, output_formats=["bytecode"])
```

We have successfully compiled our Vyper contract and stored the compilation output in a variable called `compilation_details`.

We can then print the compilation details by adding the following line of code:

```python
print(compilation_details)
```

We can run our Python script in our terminal with the following command:

```bash
python deploy_favorites.py
```

We'll see the output of the compilation details including the bytecode section. This bytecode section will include the same hex codes we saw when running Vyper from the command line. 
