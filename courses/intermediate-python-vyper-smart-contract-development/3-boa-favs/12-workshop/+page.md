## Workshop: Your First Vyper Contract

We'll practice what we've learned so far in this section of the course by building a contract that we can deploy to Anvil, call a function on, and then deploy it to tenderly.

Let's first create our Vyper contract:

```python
# I'm a comment!
pragma version 0.4.1
@license MIT

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
    # 0, 0, 0, 0, 0
    self.list_of_numbers[self.list_of_numbers_index] = favorite_number
    self.list_of_numbers_index += 1
```

This is what our contract currently looks like. We'll continue to build it out in this workshop.

Before we get started, we want to make sure we have all the prerequisites and understand how to use the tools we are using. Don't just copy and paste the prompt into ChatGPT and have it give you an answer, we want to try to do this ourselves. Feel free to use AI to ask questions to help you understand the things we learned in this section.

So pause the video, try to do this workshop yourself, and we'll see you in a little bit.

Remember, repetition is the mother of skill, and we want to be skillful. So if you didn't do the workshop, go do it! If you did do the workshop, congratulations and welcome back.
