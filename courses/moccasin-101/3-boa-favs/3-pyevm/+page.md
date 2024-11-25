## Deploying to pyevm With TitanoBoa

We've created a virtual environment and installed TitanoBoa. Now we can start to use TitanoBoa to work with our Vyper contracts!

We'll start with creating a new Python file called `deploy_favorites_pyevm.py`. We can then start to write some code in the file.

```python
if __name__ == "__main__":
    main()
```

We'll also define a main function. We'll start out with a simple print statement for now.

```python
def main():
    print("Let's read in the Vyper code and deploy it!")
```

Our next step is to actually load our contract from the `favorites.vy` file. We can do this by importing the `boa` library and using the `boa.load()` function.

```python
def main():
    print("Let's read in the Vyper code and deploy it!")
    favorites_contract = boa.load("favorites.vy")
```

We can see what type of object our `favorites_contract` is using the `type()` function.

```python
def main():
    print("Let's read in the Vyper code and deploy it!")
    favorites_contract = boa.load("favorites.vy")
    print(type(favorites_contract))
```

We can see from our output that our `favorites_contract` is of the type `boa.contracts.vyper.vyper_contract.VyperContract`.

```bash
python deploy_favorites_pyevm.py
```

Let's read in the Vyper code and deploy it!
<class 'boa.contracts.vyper.vyper_contract.VyperContract'>

We can use type hints to help us understand what kind of objects our variables are. For example, we can type hint our `favorites_contract` variable to be a `VyperContract`.

```python
def main():
    print("Let's read in the Vyper code and deploy it!")
    favorites_contract: VyperContract = boa.load("favorites.vy")
    print(type(favorites_contract))
```

To use the `VyperContract` type hint, we'll need to import it from the `boa.contracts.vyper.vyper_contract` module.

```python
from boa.contracts.vyper.vyper_contract import VyperContract

def main():
    print("Let's read in the Vyper code and deploy it!")
    favorites_contract: VyperContract = boa.load("favorites.vy")
    print(type(favorites_contract))
```

We can then run this code again.

```bash
python deploy_favorites_pyevm.py
```

Let's read in the Vyper code and deploy it!
<class 'boa.contracts.vyper.vyper_contract.VyperContract'>

Type hints are not required in Python, but we will be using them more heavily later in the course. For now, we can ignore them.
