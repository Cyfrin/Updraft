## Introduction to Mocassin Testing

We have our contract. What we haven't done is test it. Now, testing is probably one of the most important things any smart contract developer needs to get good at. 

We're going to learn how to write a test for this.  We'll be using pytest, which is a testing framework built into Mocassin. It's a very well-known and widely used framework, so if you're already familiar with pytest, you're already familiar with the basics of Mocassin testing.

First, we need to create a new file called `test_favorites.py`. Inside the file, we can create our first test. 

```python
def test_starting_values():
    pass
```

We're just going to use the `pass` keyword for now to get this set up.

In pytest, we look for a `test` keyword at the beginning of function names, and the functions need to be inside a folder called `tests`. So you must have a folder named `tests` and each one of your tests must start with `test` to be recognized.

We'll create a test that checks to make sure our contract starts with the correct initial value, which is 7.

To do this, we'll import our contract using the following code:

```python
from src import favorites
```

Then, we'll deploy the contract:

```python
favorites_contract = favorites.deploy()
```

Now, we'll assert that the retrieved value is 7:

```python
assert favorites_contract.retrieve() == 7
```

Now, we can test this code by opening our terminal and running the following command:

```bash
mox test
```

This will run all of our tests. In this case, we have only one test, so you'll see a green dot in the terminal to indicate that the test has passed.

Let's create another test. We'll copy and paste our first test and rename it to `test_starting_values_two`. 

Now, we can run the tests again. This time, we'll see two green dots in the terminal, indicating that both tests have passed. 
