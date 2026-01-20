## Adding Python packages/libraries with UV

The UV tool helps us manage Python packages and dependencies across different projects and versions. 

We'll use the **Titanoboa** package in this lesson to showcase how UV can be used to manage dependencies. 

**Titanoboa** is a package that allows us to evaluate code written in Python. 

First, let's create a simple Python script that will utilize **Titanoboa**.
```python
import boa
import sys

print(boa.eval("empty(uint256())"))
print("Hello!")
```

If we try to run this script without having **Titanoboa** installed, we'll encounter an error message as **Titanoboa** is not available.  

**Let's install Titanoboa globally using pip** 
```bash
python3.11 -m pip install titanoboa
```

This will install **Titanoboa** for the global Python 3.11 environment.

Now we can run our script and we'll see the output:
```bash
python3.11 basic_python.py
```

We get the correct output because **Titanoboa** was installed globally in our Python 3.11 environment.

**UV's strength lies in its ability to manage dependencies for specific project environments. Let's demonstrate this.**

**We'll add Titanoboa to our project environment using UV.**

**Add a dependency with UV**
```bash
uv add titanoboa
```

This will create a new folder called `venv` in our project directory and automatically add **Titanoboa** to the project environment. 

**UV will also generate a `uv.lock` file.**

This file keeps track of all dependencies for our project. 

**Run our script with UV**
```bash
uv run python basic_python.py
```

This will run our script using the Python version and packages specified in our project environment.

We can now switch to different Python versions or add different packages to our project, and UV will ensure that the correct versions are used when running our script.

**Using pyproject.toml**
```toml
[project]
name = "Python-in-updraft-cu"
version = "0.1.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"

dependencies = [
  "titanoboa>=0.2.4",
]
```

The `pyproject.toml` file acts as a configuration file for our project, defining dependencies and other project-related details. When we used `uv add titanoboa`, UV updated this file to include **Titanoboa** in our dependency section. 

UV's flexibility allows us to easily switch between different Python versions and environments without the hassle of managing global packages or manually installing dependencies for each project.
