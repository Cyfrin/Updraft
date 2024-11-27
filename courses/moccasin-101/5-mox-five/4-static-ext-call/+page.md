## Staticcall and Extcall

In this lesson, we'll be expanding on our previous work with the `chainlink` price feed and our `favorites` contract by creating a `favorites_factory` contract that can interact with deployed `favorites` contracts. We'll specifically be looking at the `staticcall` and `extcall` function calls, and how to use them to read and write data, respectively.

First, let's create a new external function called `store_from_factory`. This function will take two inputs: `favorites_index` of type `uint256` and `new_number` of type `uint256`. These inputs represent the index of a deployed `favorites` contract and the new value that we want to store within it. We can then use the `extcall` method to execute the `store` function on the desired `favorites` contract.

```python
def store_from_factory(favorites_index: uint256, new_number: uint256):
    favorites_contract: address = self.list_of_favorite_contracts[favorites_index]
    favorites_contract.store(new_number)
```

Let's break down the code above:

- First, we access the address of the `favorites` contract corresponding to the provided `favorites_index` using the `list_of_favorite_contracts` array.
- Then, we call the `store` function on the `favorites_contract`, passing in the `new_number` value.

Using the `extcall` method allows us to modify the state of the `favorites` contract. This differs from using `staticcall`, which only reads data and doesn't change the state of the contract.

```python
favorites_contract.staticcall(store(new_number))
```

The code above demonstrates how we can use `staticcall` to read the current value of `my_favorite_number` on our deployed `favorites` contract.

We can then use `extcall` to call the `store` function on this contract, setting a new value for `my_favorite_number`.

By using `extcall` and `staticcall`, we have greater control over how our `favorites_factory` contract interacts with deployed `favorites` contracts, enabling both reading and writing of data.
