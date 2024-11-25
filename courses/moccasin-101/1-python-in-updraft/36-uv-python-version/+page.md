## Using uv to Automatically Change Python Versions

We can use `uv` to automatically switch between different Python versions. This is useful when we need to run scripts that require a specific Python version.

We start off looking at a `basic_python.py` file with the following code:
```python
import boa
print(boa.eval('"empty(uint256)"'))
print("Hello!")
```

If we run this script with Python 3.11:
```bash
python3.11 basic_python.py
```

We will get the following output:
```bash
0
Hello!
```

Let's look at a different scenario. If we try to run this script with `uv` and Python 3.11:
```bash
uv run python3.11 basic_python.py
```

We will get the following error:
```bash
Traceback (most recent call last):
  File "Users/patrick/mox-cu/python-in-updraft-cu/basic_python.py", line 1, in <module>
    import boa
ModuleNotFoundError: No module named 'boa'
```

The error occurs because the Boa package is installed into our global Python environment, not our `uv` environment. 

We can see our Python versions using `uv`. If we type:
```bash
uv run python --version
```

We will get the version we are currently working with.  If we type:
```bash
python3.11 --version
```

We will get the version of our global Python environment.

We are going to update this to use a specific Python version.  We can add the following lines to our `basic_python.py` file:
```python
import sys
if sys.version_info < (3, 12):
  raise RuntimeError("This script requires Python 3.12 or higher")
```

If we run this script with Python 3.11: 
```bash
python3.11 basic_python.py
```

We will get the following error:
```bash
Traceback (most recent call last):
  File "/Users/patrick/mox-cu/python-in-updraft-cu/basic_python.py", line 5, in <module>
    raise RuntimeError("This script requires Python 3.12 or higher")
RuntimeError: This script requires Python 3.12 or higher
```

So this is a way to specify that a script requires a certain Python version.

We can go back to our terminal and type:
```bash
uv python install 3.12
```

This will install Python 3.12 into our `uv` environment. 

If we clear our terminal and run our script:
```bash
uv run basic_python.py
```

We will now get an error about the `boa` module because we commented it out:
```bash
Traceback (most recent call last):
  File "/Users/patrick/mox-cu/python-in-updraft-cu/basic_python.py", line 6, in <module>
    print(boa.eval('"empty(uint256)"'))
NameError: name 'boa' is not defined
```

We can use `uv` to see a list of the Python versions that we have installed. If we type:
```bash
uv python list
```

We will see a list of all the Python versions installed on our computer.

We can also directly specify a version of Python to use:
```bash
uv run --python 3.12 python basic_python.py
```

This will run our `basic_python.py` script with Python 3.12.7. 

We can also pin the Python version for a project using a file named `.python-version` and store it in the project's root directory. Inside this file, we can specify the Python version that we want to use. We can then update the Python version in the `.python-version` file. 

This will update the Python version of the project and automatically download the new version and update the virtual environment. 

To see this in action, we can update our `.python-version` file to Python 3.13:
```
3.13
```

We can then use `uv run basic_python.py` to run our script and it will automatically download Python 3.13, update our virtual environment, and then run the script.
