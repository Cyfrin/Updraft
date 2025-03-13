## Retrieving Data From a Hashmap

In the previous lessons, we created a smart contract that allowed us to add people to a list. However, we need to know the index of a person on the list in order to retrieve their data.

Hashmaps, also known as mappings, are incredibly powerful because they allow us to retrieve data without knowing the index. We can think of a hashmap like a dictionary, with a string key and a uint256 value.

In our smart contract, we are going to create one more storage variable called `name_to_favorite_number`, which will be a hashmap of type `string` and `uint256`.

```python
name_to_favorite_number: public(HashMap[string, uint256])
```

For example, we can add the name `Mariah` and associate her with the number 30.

In the `add_person` function, we are going to add the person to the hashmap.

```python
@external
def add_person(name: String[100], favorite_number: uint256):
    # Add favorite number to the numbers list
    self.list_of_numbers[self.index] = favorite_number
    # Add the person to the person's list
    new_person: Person = Person(favorite_number = favorite_number, name = name)
    self.list_of_people[self.index] = new_person
    # Add the person to the hashmap
    self.name_to_favorite_number[name] = favorite_number
    self.index = self.index + 1
```

Now, we can use the `name_to_favorite_number` function to retrieve Mariah's favorite number, without needing to know her index.

```bash
name_to_fav... mariah
```

We can see that Mariah's favorite number is 30.

```bash
0: uint256:30
```

This is the power of hashmaps, or mappings, in smart contracts. They allow us to quickly retrieve data without knowing the index. As we learn more about smart contract programming, we will understand the trade-offs of each data structure and when to use each one.
