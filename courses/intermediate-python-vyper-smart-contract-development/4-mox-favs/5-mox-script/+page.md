## Moccasin Scripting

In this section, we will learn how to deploy our smart contract using a deploy script.

We will start with the typical way we would deploy a contract using Boa, as we did in the previous section. We would use code similar to this:

```python
import boa
boa.load("favorites.vy")
```

However, in Moccasin, we can directly import the contract we want to deploy using the Python import system. For example:

```python
from src import favorites
```

Moccasin is smart enough to know that it is dealing with a Vyper contract and will automatically import the necessary libraries and dependencies.

To deploy the contract using a deploy script, we will need to write a Python script that utilizes the `deploy` command. In this script, we can also interact with the deployed contract to verify its state.

Let's create a new file called `deploy.py` and add the following code:

```python
from src import favorites

def deploy():
  favorites_contract = favorites.deploy()
  starting_number = favorites_contract.retrieve()
  print(f"Starting number is: {starting_number}")

def moccasin_main():
  deploy()
```

To run this script in Moccasin, we can use the `mox run` command.

This command will execute the `mocassin_main()` function, which in turn will call the `deploy()` function. The `deploy()` function will deploy the `favorites` contract and then retrieve the starting number. We can then print the starting number to the terminal to verify that the contract has been deployed correctly.

We can also use the `breakpoint()` function to step through the script and inspect the state of the variables.

To use `breakpoint()`, we can add the following code to our `deploy.py` script:

```python
from src import favorites

def deploy():
  breakpoint()
  favorites_contract = favorites.deploy()
  starting_number = favorites_contract.retrieve()
  print(f"Starting number is: {starting_number}")

def moccasin_main():
  deploy()
```

When we run this script with `mox run deploy`, the script will pause at the `breakpoint()` function. We can then use the debugger to inspect the state of the variables and step through the code.

```bash
mox run deploy
```

We can then use commands such as `type(favorites)` to view the type of the `favorites` object:

```bash
type(favorites)
```

Finally, we can run `quit()` to exit the debugger and continue the execution of the script.

```bash
quit()
```

This is a basic example of deploying a contract using a deploy script in Moccasin. There are many other ways to interact with the deployed contract, such as calling functions and viewing events. In the following sections, we will explore some of these advanced techniques in more detail.
