In this lesson, we will continue working with the `favorites` contract.

We will introduce a `view` function and we'll look at some more advanced concepts, like chaining several lines of code together to perform a single action.

First, let's add a `view` function.

```python
@view
def view_from_factory(favorites_index: uint256) -> uint256:
    favorites_contract: IFavorites = self.list_of_favorite_contracts[favorites_index]
    return extcall(favorites_contract.retrieve())
```

We can call this function using `extcall` but, because it's a `view` function, we'll use `staticcall`.

```python
values: uint256 = staticcall(favorites_contract.retrieve())
```

This line of code is equivalent to the following three lines:

```python
favorites_contract: IFavorites = self.list_of_favorite_contracts[favorites_index]
values: uint256 = extcall(favorites_contract.retrieve())
return values
```

Whether you prefer to use the single line or the three separate lines is up to you, but both achieve the same result.

This is an example of method chaining. We're chaining several lines of code together to perform a single action. We can also chain the calls to `staticcall` and `retrieve`.

```python
values: uint256 = staticcall(self.list_of_favorite_contracts[favorites_index].retrieve())
```

This line of code will first access the `favorites_contract` from the list, then call the `retrieve` function on it, and finally return the value.

The use of method chaining can help to make your code more concise and readable. It's a powerful technique that you can use in your own Vyper contracts.
