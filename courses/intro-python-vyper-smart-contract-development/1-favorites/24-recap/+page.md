## Recap

In this lesson, we will continue to develop our smart contract which stores favorite numbers. Let's take a look at what we have done so far.

We have created a new type called a **struct**, called **Person**, which has two variables:

- **favorite_number**: A public variable to store our favorite number
- **name**: A public string variable to store a name

We have defined several state variables:

- **my_name**: A string which stores our name.
- **my_favorite_number**: A public variable to store our favorite number.
- **list_of_numbers**: A public list that will store a list of favorite numbers.
- **list_of_people**: A public list that will store a list of people.
- **index**: A public integer that will track the size of our lists.
- **name_to_favorite_number**: A public hashmap that will store a name and a favorite number as a key value pair.

The **constructor** function is used to initialize the state variables. In our example, we will set the **my_favorite_number** to 7 and the **index** to 0. We will also set **my_name** to "Patrick".

We also have two functions, a **store** function to set our favorite number and a **retrieve** function to retrieve our favorite number.

Here is the code we have written so far:

```python

# pragma version >=0.4.1

# @license MIT

struct Person:
    favorite_number: uint256
    name: String[100]

my_name: public(String[100])
my_favorite_number: public(uint256) = 7
list_of_numbers: public(uint256[5]) = [0, 0, 0, 0, 0]
list_of_people: public(Person[5])
index: public(uint256)
name_to_favorite_number: public(HashMap[String[100], uint256])

@deploy
def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number

@external
@view
def retrieve() -> uint256:
    return self.my_favorite_number
```

In the next lesson, we will deploy our smart contract and test it.
