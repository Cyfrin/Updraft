## UV Installation

We are going to introduce you to the `uv` tool.  

`uv` is a very fast Python package and project manager. It was written in Rust. This tool is very fast and very modern. Let's install it so we can see what all the fuss is about.

The `uv` tool can help us with the following:

*  Installing and managing Python versions
*  Creating professional Python projects
*  Maintaining Python versions

First, we're going to go to the `uv` documentation website:

```bash
docs.astral.sh/uv
```

Then, we're going to scroll down to the "Getting started" section.  This is where we will find the instructions for installing the `uv` tool.

We'll copy the command below and paste it into our terminal.


```bash
curl -Lssf https://astral.sh/uv/install.sh | sh
```

This will install both the `uv` and the `uvx` commands.

Once we have it installed, we can go ahead and delete our terminal and type:

```bash
which uv
```
This will show us the location of our installed `uv` command.

We can also type:

```bash
uv --version
```
This will display the current version of `uv` that we are using.

Now that we have installed `uv`, we can use it to create a new Python project. 

```bash
uv init python-in-updraft-cu
```

This will create a new project folder called `python-in-updraft-cu`. 

We can now see a whole bunch of new files on the left side of the screen:

*  `.gitignore`
*  `.python-version`
*  `basic_python.py`
*  `cells.ipynb`
*  `hello.py`
*  `pyproject.toml`
*  `README.md`

Let's go over what some of these files do:

The `.gitignore` file is specifically for working with Git and GitHub.

The `.python-version` file tells other developers and tools what Python version is recommended for this project. 

The `pyproject.toml` file tells the world and other Python projects how to interact with our Python project here.

The `README.md` file is a file that every single one of your projects should come with.

We'll explain these other files later.  See you next time! 
