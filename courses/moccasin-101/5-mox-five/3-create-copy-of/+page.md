## Creating Copies of Existing Contracts in Vyper

We are going to implement the `create_copy_of` function in Vyper. This function will create an identical copy of an existing contract, with a new unique address.

First, we need to save the address of our `favorites.vy` contract. We will store it as a state variable called `original_favorite_contract`.

```python
original_favorite_contract: address
```

Next, we need to define an `_init` function. This function will be called when we deploy the `favorites_factory.vy` contract. We will pass in the address of the `favorites.vy` contract as an argument, and then store it as a state variable.

```python
@deploy
def _init(original_contract: address):
    self.original_favorite_contract = original_contract
```

We will now create a new function called `create_favorites_contract`. This function will be responsible for creating a copy of the `favorites.vy` contract. It will call the `create_copy_of` function, which will create a byte-for-byte copy of the runtime code stored at the `original_favorite_contract` address. The function will then return the address of the new contract.

```python
@external
def create_favorites_contract():
    new_favorites_contract: address = create_copy_of(self.original_favorite_contract)
    return new_favorites_contract
```

Let's also save the addresses of our new contracts to a list, so we can keep track of them. 

```python
list_of_favorite_contracts: public(DynArray[address], 100)
```

We are creating a dynamic array with a maximum size of 100. This is where we will store the address of every new contract. 

Now, we will update our `create_favorites_contract` function to append the address of our new contract to the `list_of_favorite_contracts` array.

```python
@external
def create_favorites_contract():
    new_favorites_contract: address = create_copy_of(self.original_favorite_contract)
    self.list_of_favorite_contracts.append(new_favorites_contract)
    return new_favorites_contract
```

This is all we need to do to create copies of existing contracts. We have successfully implemented the `create_copy_of` function in Vyper. 
