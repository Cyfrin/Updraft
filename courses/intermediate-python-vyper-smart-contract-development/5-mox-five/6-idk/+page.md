## Deploy Script

We're going to write a deploy script and test this out.

First, we'll create a new file in our `script` directory named `deploy.py`.

We'll create a function called `deploy_favorites()`. This function will deploy our `favorites` contract. We can grab our contract with `from src import favorites`. Next, we'll import `VyperContract` so we can assign a type to our deployed contract:

```python
from src import favorites
from moccasin.boa_tools import VyperContract
```

Let's finish the function:

```python
def deploy_favorites() -> VyperContract:
    favorites_contract: VyperContract = favorites.deploy()
    return favorites_contract
```

Next, we'll create a function called `deploy_factory()` that will take a `favorites_contract` and deploy our `favorites_factory`:

```python
def deploy_factory(favorites_contract: VyperContract):
    favorites_factory = favorites_factory.deploy(favorites_contract.address)
    favorites_factory.create_favorites_contract()
```

To make sure our `favorites_factory` is deployed with the address of our initial `favorites` contract, we'll use the `@` function in our deploy script to grab the address:

```python
new_favorites_address: str = favorites_factory.list_of_favorite_contracts[0]
new_favorites_contract: VyperContract = favorites.at(new_favorites_address)
print(f"Stored value is: {new_favorites_contract.retrieve()}")
```

We can now create our `mocassin_main()` function and run it in our terminal:

```python
def moccasin_main():
    favorites_contract = deploy_favorites()
    deploy_factory(favorites_contract)

```

```bash
mox run deploy
```

This will deploy our contracts, and we can see the results in the terminal.
