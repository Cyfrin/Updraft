## Arrays / Lists

We've learned about different reference types, let's add them to our smart contract. We'll start with adding a minimal list of favorite numbers.

We'll create a new variable called `list_of_numbers`. 

```python
list_of_numbers: public(uint256[5]) = [0, 0, 0, 0, 0]
```

We've now created a public array called `list_of_numbers` that is five elements long. 

We can read from this array by interacting with the contract via the terminal, for example:

```bash
list_of_numbers
```

To update this array, we'll create a new function called `add_number`. 

```python
@external
def add_number(favorite_number: uint256):
    self.list_of_numbers[self.index] = favorite_number
    self.index = self.index + 1
```

This function takes a `favorite_number` as input and updates the `list_of_numbers` at the current index. 

To ensure that our `list_of_numbers` doesn't exceed the length of five, we'll create a new variable `index` at the top of our contract:

```python
index: public(uint256) = 0
```

We've set this index to zero in our constructor (`init`) function. We can then use this `index` variable to keep track of the next available element in the array. 

**Video Tag:** Show this process in the deployed contract in the terminal, make sure to show it with the updated array. 

We've now found a way to incrementally add numbers to this array. If we try to exceed the length of the array, the transaction will revert. 
