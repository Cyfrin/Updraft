## Workshop Challenge Part 2

Congratulations on finishing the "Welcome to Remix - Favorite's List" section! Before we jump off and wrap up this section, we have a workshop for you. On every single section moving forward, at the end, we're going to have a little workshop for you to practice and drill in some of the things that we taught you.

Here's where AI is incredibly helpful because AI will very often be able to give you the right answer. You can just work with AI and figure out a solution that you like because oftentimes there actually might be multiple solutions.

For all these workshops, there will be like a little prompt, and what we want you to do is to spend at most 25 minutes on the prompts. If you spend more than 25 minutes, stop, take a break, and then come back and work with an AI that you like to help solve these. Or if an AI is giving you trouble, you can always jump into the discussions, jump to the Discord, etc.

Here are the three prompts that we want you to do:

1. Create a function called `add` that adds one to whatever is in `self.favorite_number`.
2. Have the starting favorite number be different from seven and check to make sure it's the number you set.
3. Create a new type using the `struct` keyword and create a function that will save a new variable of that type to a state/storage variable.

Here are some code blocks to get you started.

```python
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
```

We have a `struct Person` and a `my_favorite_number` that is a `uint256`. You would have your name as part of your struct, and we have our `deploy` function that is initialized with seven as the favorite number. We also have a `store` function that updates the number and a `retrieve` function to get the current number.

Repetition is the mother of skill, and we want to make you incredibly skillful. So, pause the video, get cracking on some of these workshop problems. Spend at most 25 minutes on them, and then when you're done, if you still run into issues, work with an AI.
