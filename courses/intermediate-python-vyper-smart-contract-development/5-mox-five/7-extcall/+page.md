## Cross-Contract Interactions (Extcall)

In this lesson, we are going to learn about interacting with other contracts.

We begin with a Python script.

```python
from src import favorites, favorites_factory
from moccasin.boa.tools import VyperContract

def deploy_favorites() -> VyperContract:
  favorites_contract: VyperContract = favorites.deploy()
  return favorites_contract

def deploy_factory(favorites_contract: VyperContract):
  factory_contract: VyperContract = favorites_factory.deploy(favorites_contract_address)
  factory_contract.create_favorites(1)
  new_favorites_address: str = factory_contract.list_of_favorite_contracts(0)
  new_favorites_contract: VyperContract = favorites.at(new_favorites_address)
  print(f"Stored value is: {new_favorites_contract.retrieve()}")
  factory_contract.store_from_factory(0, 88)
  print(f"New contract stored value is: {new_favorites_contract.retrieve()}")
  print(f"Factory stored value is: {factory_contract.retrieve()}")

def moccasin_main():
  favorites_contract = deploy_favorites()
  deploy_factory(favorites_contract)

moccasin_main()
```

We will run the code in a terminal.

```bash
patrick@cu:mox-five-more-cu $  & mox run deploy
Running run command...
Stored value is: 77
New contract stored value is 88
Original contract stored value is 7
patrick@cu:mox-five-more-cu $
```

We can use this to show how calling a function from a factory contract can affect the state of another contract. We can update the value of `favorites.vy` by calling the `store()` function from the `favorites_factory.vy` contract. We can also call `retrieve()` on the `favorites.vy` contract to see the stored value.
