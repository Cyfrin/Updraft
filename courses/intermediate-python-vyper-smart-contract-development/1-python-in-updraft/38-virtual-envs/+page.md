## Virtual Environments

Virtual environments are an important concept to understand even if we don't use `uv`.

Technically, a virtual environment is a setting that `uv` creates to isolate our Python version and packages. Back in our Cyfrin Updraft terminal, we can type:

```bash
uv venv
```

This will create a folder named `.venv` in our project directory where our virtual environment is stored. If we run the command again, it will do the same thing. To activate the virtual environment, we type:

```bash
source .venv/bin/activate
```

We can think of virtual environments as "active Python environments" which are separate from the global Python environment. If we don't specify an active Python environment, we will be using the global one.

We can set our active Python environment to be our virtual environment by activating it.

```bash
source .venv/bin/activate
```

When we activate a virtual environment, our terminal will show parentheses indicating which virtual environment is active.

We can run our script, `basic_python.py`,  with `uv run` to automatically enter the virtual environment and execute it.

However, when we run `basic_python.py` without using `uv`, we get a `ModuleNotFoundError`. This is because we need to install the `boa` package. 

We can install packages with `uv sync`.

```bash
uv sync
```

The `uv sync` command looks at our `pyproject.toml` file, specifically the `dependencies` section. It installs all the Python packages we specified in this file.

After we've installed the `boa` package, we can now run `basic_python.py` successfully.

We can deactivate our virtual environment by typing:

```bash
deactivate
```

We can also deactivate our virtual environment by trashing our terminal window and pulling it back up.

`uv` comes with several other tools that we will learn throughout the course.
