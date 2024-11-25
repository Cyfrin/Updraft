## Recap

We've learned a lot in this section, so let's do a quick recap.

### Creating Contracts from Other Contracts

We've learned about creating contracts from other contracts, and we've learned about two keywords that Vyper has built in.

One of these keywords is `create_copy_of`. This takes the address of another contract and literally copies the bytecode of it.

```python
create_copy_of(self.original_favorite_contract)
```

### Creating Interfaces

We've also learned about interfaces. We can have a .vyi file where we just have the function definitions, and we don't have any of the function body.

```python
@external
def store(new_number: uint256):
    ...
```

### Interacting with Other Contracts

We've learned that our contracts can interact with other contracts using `staticcall` and `extcall`.

`staticcall` is something we learned about earlier, but now we've finally learned about `extcall`, which is an external call where we're going to call a contract outside of our contract.

```python
extcall favorites_contract.store(new_number)
```

### Initializing Variables

We've learned that we can initialize state and storage variables with the `initializes` keyword.

```python
initializes: favorites
```

### Importing Functions

We've learned about the `exports` keyword, which we can use to import specific functions from any modules that we've initialized or imported.

```python
exports: (favorites.retrieve, favorites.add_person)
```

### Function Name Collision

We've learned that we can't have a function with the same name as one of the functions that we export. Otherwise, we'll get a collision. You can't have two functions of the same name.

### Chaining Commands

We've learned a bit more about chaining commands, which is something we've done a few times now, but we made it more explicit in this section.

```python
favorites.init()
```

## Moccasin Buy Me A Coffee (GET HERE!)

Now is a great time to take a break. Go get some coffee, go for a walk, or go to the gym because the next section is probably one of the most important sections you'll do in your entire coding curriculum.
We will be putting this on your GitHub. This will be the start of your Syphon profile, doing projects like this, showing other people how badass you are and how much of a badass coder you are, is how you're going to be able to get hired.

And, if you don't care about getting hired, it's drilling these skills in that're going to make you very skillful. Repetition is the mother of skill. We want you to be skillful, so be sure to take that break before tackling this project. I'll see you very soon.
