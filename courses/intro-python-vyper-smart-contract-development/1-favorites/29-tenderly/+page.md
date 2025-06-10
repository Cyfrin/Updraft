## Deploying Smart Contracts with Metamask

We're going to learn how to deploy smart contracts with metamask, let's get started. Here's a simple smart contract that we're going to deploy:

```python
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

Let's go ahead and deploy this contract. First, we're going to need to create a new metamask wallet, and then we're going to need to select the network. We're going to select the Sepolia test network.

Now, let's go through the steps of deploying the smart contract:

- Click on the Remix **Deploy & Run Transactions** tab.
- Click on the **Deploy** button.
- Next we can hit the **My Favorite Number**
- Let's put Patrick.
- Let's put 7.
- Then we can hit the **Call** button.
- Now let's go ahead and deploy this contract.
- Select our **fake chain**.
- Click the **Deploy** button. We will see a message "Contract ... **compiled by Vyper**". Next, we will see a **green tick** above the **Contract** area.
- Click on the **green tick** to reveal the **deployed contract** details.
- We're going to hit the **index**
- We're going to click the **index** to reveal the **index** tab,
- We're going to hit the **call** button.
- Then, **MetaMask popped up**
- Now, we're going to go ahead and hit **Confirm**.
- We're going to click on **Confirm**.
- It says "Here I'm to help you!"

That's how you deploy smart contracts with metamask.
