## Deployment of First Vyper Smart Contract

In this lesson, we'll be deploying our first Vyper smart contract. We'll be using `remix.ethereum.org` (aka the Remix IDE) to build our code base here. You should follow along coding with us, and even try to do some coding yourself as we go on here. Remember, both on Cyfrin Updraft and on YouTube, you can change the speed of the video so that it matches your pace.

### Smart Contract Code

The smart contract code we will be deploying is:

```python
# I'm a comment!

# pragma version 0.4.1
# @license MIT

struct Person:
    favorite_number: uint256
    name: String[100]

my_favorite_number: uint256

# Static Array/List
list_of_numbers: public(uint256[5])
list_of_people: public(Person[5])
list_of_people_index: uint256

name_to_favorite_number: HashMap[String[100], uint256]

@deploy
def __init__():
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

### Deploying the Smart Contract

1. **Paste the code:** Open Remix IDE and create a new file. Paste the code from the code block above into the new file.
2. **Compile:** Click the "Compile" button to compile the code.
3. **Deploy:** Click the "Deploy" button to deploy the contract to the blockchain.

We're excited for you to complete your first smart contract deployment! Remember to check the [Remix Favorites CU GitHub repository](https://github.com/Cyfrin/remix-favorites-cu) for the code and additional resources.
