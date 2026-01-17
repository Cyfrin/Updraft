## Python in Updraft: Recap

We've just finished our Python crash course. We've learned how to set up our VS Code environment, manage Python versions, and set up a virtual environment using UV.

First, we installed Python into our Linux-like environments:

```bash
python3.11 --version
```

We can manage our Python versions using UV:

```bash
uv run python --version
```

To change to a different version of Python, we can use:

```bash
uv python pin 3.12
```

We can add packages to our virtual environment using UV:

```bash
uv add titanoboa 
```

We can activate our virtual environment by running:

```bash
uv venv
```

Then, we can activate the environment using:

```bash
source .venv/bin/activate
```

Now, we can access the Python interpreter without having to use `python3.11` or `python3.11 --version`. We can simply use `python` or `python3`:

```bash
python --version
```

```bash
python3 --version
```

To deactivate the virtual environment, we can run:

```bash
deactivate
```

We can also check the path of our Python interpreter using:

```bash
which python
```

Congratulations on completing this course! Now, you're ready to start developing smart contracts using Python in Updraft. 
