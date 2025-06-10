## Contract Design

We're going to make a very minimal favorite things list. We want to store favorite numbers and favorite people with their favorite numbers.

Here is some basic code to get started:

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number
```

To store these items, we're going to use mappings. A mapping is like a dictionary or hashmap. We'll use the key to be the person and the value to be their favorite number.

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number

favorite_numbers: HashMap[uint256, uint256]
favorite_people: HashMap[address, uint256]
```

Mappings have a default value. If we don't assign a value, the default value is 0.

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number

favorite_numbers: HashMap[uint256, uint256]
favorite_people: HashMap[address, uint256]

def set_favorite_number(number: uint256):
    favorite_numbers[number] = number
```

Now we have a function to set a favorite number. This is a pretty simple and straightforward function. We take a number and set it to the same number, but we could change this later.

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number

favorite_numbers: HashMap[uint256, uint256]
favorite_people: HashMap[address, uint256]

def set_favorite_number(number: uint256):
    favorite_numbers[number] = number

def set_favorite_person(person: address, number: uint256):
    favorite_people[person] = number
```

We have another function to set the favorite person. It takes a person, their address, and their favorite number. We set it to the dictionary where we store the favorite person.

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number

favorite_numbers: HashMap[uint256, uint256]
favorite_people: HashMap[address, uint256]

def set_favorite_number(number: uint256):
    favorite_numbers[number] = number

def set_favorite_person(person: address, number: uint256):
    favorite_people[person] = number

def get_favorite_number(number: uint256) -> uint256:
    return favorite_numbers[number]
```

Lastly, we have a function to get the favorite number. It takes a number and then it returns the favorite number. It simply returns the value of the number from the dictionary.

```python
# pragma version >=0.4.1
# favorite things list:
# favorite numbers
# favorite people with their favorite number

favorite_numbers: HashMap[uint256, uint256]
favorite_people: HashMap[address, uint256]

def set_favorite_number(number: uint256):
    favorite_numbers[number] = number

def set_favorite_person(person: address, number: uint256):
    favorite_people[person] = number

def get_favorite_number(number: uint256) -> uint256:
    return favorite_numbers[number]

def get_favorite_person(person: address) -> uint256:
    return favorite_people[person]
```

We now have a function to get the favorite person, which takes a person's address and returns their favorite number.
