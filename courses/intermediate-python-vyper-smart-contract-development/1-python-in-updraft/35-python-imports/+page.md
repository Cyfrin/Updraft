## Installing Libraries and using imports

One of the things we can do in Python is install packages and libraries.

To install the Python package called "Titanoboa" (a Python tool for interacting with Vyper), we can visit the Titanoboa Github repository:

```bash
github.com/vyperlang/titanoboa
```

On the repository page, if we scroll down to the Installation section, we can see how to install the Python package directly into our environment.

The command we will use is:

```bash
pip install titanoboa
```

We can then run a command using the package in our Python.

To install the Titanoboa package into our global Python environment, we will type:

```bash
python3.11 -m pip install titanoboa
```

After installing Titanoboa, we can view a list of all the different packages that we have installed in our Python environment.

To view this list, we can type:

```bash
python3.11 -m pip freeze
```

We can use the Titanoboa package to evaluate Vyper. To evaluate some Vyper code, we can type "import boa". For example, if we want to evaluate the Vyper code to create an empty uint256 object (AKA 0), we can type:

```python
import boa
print(boa.eval('"empty(uint256)"'))
```
