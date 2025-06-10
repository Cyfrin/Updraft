## Recap Part 2

We've learned about pragma version or `@version` where we can specify the version of our Vyper code directly on our contract.
We've deployed, and we've compiled and we've worked with the Remix Ethereum IDE, the online integrated development environment which is incredibly powerful for learning and seeing and deploying smart contracts.
We've created this struct Person which is our way of creating a new type.

```python
struct Person:
    favorite_number: uint256
    name: String[100]
```

We've got a whole bunch of state variables and we've set them all to public visibility so we can have that blue button for them so we can actually call them and actually see what these are when we actually deploy this contract.

```python
my_favorite_number: uint256
my_name: String[100]
people:  Person[5]
index: uint256
my_mapping: mapping(String[100] => uint256)
```

We've got several different types in here. We've got a string, a fixed sized string. We've got a uint256, aka a number. We've got a uint256 array which, similar to this string, this array or this list is saying hey there can be a total of five numbers in this list of numbers. Our string up here, my name, is a string where there can be a total of 100 characters in this string. We've got a list of people. We can even have a list or an array of our custom struct, our custom type Person, and we can have up to five people in this list of people. We also have an index which is just a number to keep track of hey, what number are we on here? And then finally we have this very advanced data structure called a hash map, or a mapping where it takes a key of a string and a value of a number.

```python
my_favorite_number: uint256
my_name: String[100]
people:  Person[5]
index: uint256
my_mapping: mapping(String[100] => uint256)
```

We have a constructor, where we have this deploy section where we set my favorite number to seven. So that once the instance of this contract is deployed, my favorite number gets initialized to seven. We set self. index to zero. If we didn't set it, it would still be zero, but we're explicitly setting it to zero. We have self.my name we're setting it to Patrick with an exclamation mark in here, but you should do your name instead of Patrick.

```python
#pragma version >=0.4.1

def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"
```

We've got a, and we've got a function that we learned with the def keyword, and the external decorator saying anyone outside of this contract can call this store function. If we didn't have this external keyword, it would be internal meaning only other functions inside this contract can actually call it. We're setting my favorite number to the new number that we're passing into store. We know that this is a state variable because we can see the self keyword here. Whenever we see the self keyword, we know we're referring to properties of the contract itself. Whereas this new number is just this temporary number that exists just for the duration of this function call. This self.my favorite number will persist outside of this function call.

```python
#pragma version >=0.4.1

def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

We have a view function which allows us to just view some number instead of

```python
#pragma version >=0.4.1

def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number

@external
def retrieve() -> uint256:
    return self.my_favorite_number
```

And then we have our monstrosity function called add person where it takes a name of type string 100, a favorite number which is a uint256, and it adds this person to our list of numbers using the index, creates a new person using this wonderful struct syntax, it adds that person to our list of people, and then it adds that person to our hash map as well and increments the index.

```python
#pragma version >=0.4.1

def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number

@external
def retrieve() -> uint256:
    return self.my_favorite_number

@external
def add_person(name: String[100], favorite_number: uint256):
    self.people[self.index] = Person(favorite_number, name)
    self.my_mapping[name] = favorite_number
    self.index += 1
```

And last but not least, congratulations on your first contract here. Now's the time to go grab a coffee, go grab an ice cream, go to the gym, go for a walk, and take a break because your mind needs it to digest all this wonderful information you just learned. Take that break, and we'll see you soon.
