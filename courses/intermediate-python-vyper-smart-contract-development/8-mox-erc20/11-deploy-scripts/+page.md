## Deploy Scripts

Let's write a deployment script. We can create a function called:

```python
def moccasin_main():
```

We can then call another function within this one:

```python
return deploy()
```

Let's create that function:

```python
def deploy():
```

We'll add a pass statement to the function for now. 

```python
pass
```

We'll also add an import statement at the top of the script.

```python
from contracts import snek_token
```

We will import the *to_wei* function from *eth_utils* as well.

```python
from eth_utils import to_wei
```

Let's assign an initial supply to our token in a variable called *INITIAL_SUPPLY*

```python
INITIAL_SUPPLY = to_wei(1000, 'ether')
```

Now, let's get our contract:

```python
snek_contract = snek_token.deploy(INITIAL_SUPPLY)
```

Lastly, let's add a print statement to see the address of our deployed contract.

```python
print(f"Deployed SnekToken at: {snek_contract.address}")
```

Now, if we run our script, we should see our deployed contract address printed in the terminal. 

We can run our script from the terminal. 

```bash
mox run deploy
```

We can also run the script using the file path. 

```bash
mox run ./script/deploy.py
```

Both of these will output our contract address. 
