## Structs and Strings

We're learning about structs and strings in Vyper.

Structs are a way for us to create new custom types. They're like blueprints for variables, grouping together related data under a single name. This is how we might create a `Person` struct:

```python
struct Person:
    favorite_number: uint256
    name: String[100]
```

Strings are a typing we haven't learned about yet. A string is a fixed-size array of characters. For example, here's how we might create a string variable:

```python
example_str: String[100] = "Test String"
```

We'll use structs to store data about multiple people in a list, and to accomplish this, we'll use an array of structs. 

To begin, let's create a variable in our `deploy` function:

```python
@deploy
def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!"
```

We need to make our new `Person` type publicly accessible, so we'll add the keyword `public` before our `String` type:

```python
my_name: public(String[100])
```

We can now create an array of `Person` structs in our contract:

```python
list_of_people: public(Person[5])
```

This is an array of five `Person` structs, which is where we'll store our new `Person` information. 

Next, we'll create an external function to add a new `Person` to our `list_of_people` array:

```python
@external
def add_person(name: String[100], favorite_number: uint256):
    # Add favorite number to the numbers list
    self.list_of_numbers[self.index] = favorite_number
    # Add the person to the person's list
    new_person: Person = Person(favorite_number = favorite_number, name = name)
    self.list_of_people[self.index] = new_person
    self.index = self.index + 1
```

This function takes the `name` and `favorite_number` of a new `Person` and stores that data in our `list_of_people` array. 

We can now compile and deploy this contract. 
