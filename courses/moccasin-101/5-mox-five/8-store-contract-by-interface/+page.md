## Storing Contracts By Interface Type

We're going to do a little bit of refactoring here, just to show you something cool that you can do.

This `i_favorites` interface, we can also store contracts not just by address, but we could store them as type `i_favorites`.

So, what we can do is instead of storing this as an address, we can store these as this `i_favorites` type. 

If we do that, we're actually going to get to save an extra line of code.

Down here, when we call `self.list_of_favorite_contracts` at the favorites index, it's not going to give me an address anymore, it's going to give me an `i_favorites`.

So, what we can do is we can say, instead of `favorites_address`, we can do `favorites_contract` of type `i_favorites` and then just delete that next line.

Additionally, when we do `self.list_of_favorite_contracts.append`, we would have to wrap our `new_favorites_contract` as type `i_favorites`.

We don't have to do this. If what we just showed you is actually very confusing, feel free to just move it back to what it was. Which is this one right here. Feel free to just move it back to what it was, and go with that. Whatever is easier for you, this is your learning journey, and you can come back to this later and go, "Okay, what did Patrick mean by that? Let me ask some AIs, etc., etc." 

This is another way that we can actually store and work with these variables. 

```python
from interfaces import i_favorites

list_of_favorite_contracts: publicDynArray[i_favorites, 100]
original_favorite_contract: address

@deploy
def __init__(original_favorite_contract: address):
    self.original_favorite_contract = original_favorite_contract

@external
def create_favorites_contract():
    new_favorites_contract: address = create_copy_of(self.original_favorite_contract)
    self.list_of_favorite_contracts.append(new_favorites_contract)

@external
def store_from_factory(favorites_index: uint256, new_number: uint256):
    favorites_contract: i_favorites = self.list_of_favorite_contracts[favorites_index]
    favorites_contract.store(new_number)
```