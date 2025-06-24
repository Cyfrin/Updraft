## Setting Up a Boa Favorites Project

We'll be starting with a Boa favorites project.

First, we'll create a new folder using the terminal:

```bash
mkdir boa-favorites-cu
```

Next, we will use the `cd` command to navigate to the folder:

```bash
cd boa-favorites-cu
```

We'll create a new Python project using the `uv` command:

```bash
uv init
```

We can see a new folder has been created with the following files:

- `README.md`
- `pyproject.toml`
- `hello.py`
- `.python-version`
- `.gitignore`

We'll then open our folder in VS Code using the following terminal command:

```bash
code boa-favorites-cu
```

Next, we'll create a new `favorites.vy` file by right-clicking on the folder and selecting "New File." After creating it, we'll paste the following code:

```python
# I'm a comment!
# pragma version ^0.4.1
# @license MIT
struct Person:
    favorite_number: uint256
    name: String[100]
my_favorite_number: uint256
# Static Array/List
list_of_numbers: public(uint256[5])
list_of_people: public(Person[5])
list_of_people_index: uint256
name_to_favorite_number: HashMap(String[100], uint256)
@deploy
def __init__(self):
    self.my_favorite_number = 7

@external
def store(favorite_number: uint256):
    self.my_favorite_number = favorite_number
@external
@view
def retrieve() -> uint256:
    return self.my_favorite_number

@external
def add_person(name: String[100], favorite_number: uint256):
    new_person: Person = Person(favorite_number = favorite_number, name = name)
    self.list_of_people[self.list_of_people_index] = new_person
    self.list_of_numbers[self.list_of_people_index] = favorite_number
    self.list_of_people_index += 1
    self.name_to_favorite_number[name] = favorite_number
```

Finally, we can compile our contract using the following command:

```bash
Vyper favorites.vy
```
