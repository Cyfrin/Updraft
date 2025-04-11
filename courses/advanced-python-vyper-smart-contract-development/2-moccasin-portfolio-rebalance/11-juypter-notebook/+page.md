## Jupyter Notebook with Mocassin

We're going to be moving from writing scripts in a text editor to using a Jupyter notebook. A Jupyter notebook is like a giant Python shell. The main advantage of using a Jupyter notebook is that we can run each line of code individually. This allows us to test our code as we write it and see the results immediately. 

Before we can use a Jupyter notebook, we'll need to create one. To do this, create a new file in your project directory called `notebook.ipyNB`. This will give you a basic notebook with a code cell in it.

The next step is to select the kernel. We want to make sure we're using the correct Python environment. To do this, click on the kernel selector, and then select "Python Environments".  We want to choose the ".venv" environment. If we haven't already added Mocassin to our ".venv", we can do this using the following terminal commands:

```bash
uv add moccasin
uv sync
```

Now that we've selected our kernel, we'll go ahead and copy and paste the following code into the first cell.

```python
from moccasin import setup_notebook
setup_notebook()
```

To run this code, hit Shift Enter. Now, let's add a new code cell and copy the following code:

```python
from moccasin.config import get_active_network
active_network = get_active_network()
print(active_network.name)
```

Next, we'll restart the terminal by clicking on "Restart".  We can now run the code. It should take some time to run, and we'll see "eth-forked" printed out. 

Let's add a new code cell, and copy the following code.

```python
usdc = active_network.manifest_named("usdc")
weth = active_network.manifest_named("weth")
```

We can now run these lines of code. 

In another code cell, we'll paste the following code:

```python
usdc.balance_of(boa.env.eoa)
```

The output of this code should be "1000000000" because that's the amount of USDC we gave ourselves in the previous setup script.

We can also see our WETH balance by running this code:

```python
weth.balance_of(boa.env.eoa)
```

We should see "1000000000000000000" as the output, which is the amount of WETH we set up.

This is how we can tinker with our code and test it quickly using a Jupyter notebook. Eventually, we'll be moving these lines of code back into the script, but it's important to test the code first and ensure it's working as expected. 
