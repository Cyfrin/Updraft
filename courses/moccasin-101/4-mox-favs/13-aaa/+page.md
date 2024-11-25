## Testing a Vyper Contract with Mocks

In this lesson, we'll be working on a Vyper contract. To test this contract, we use Mocks, a Python library that lets us create and interact with dummy objects, allowing us to isolate and test specific parts of our code.

We'll create tests using the Arrange, Act, Assert (AAA) framework. This approach helps structure our tests for readability and clarity.

**Arrange** involves setting up everything necessary for the test. For example, we'll deploy a mock version of our contract.
**Act** will be the action we are testing - for example, calling a specific function in our contract.
**Assert** will be the final step where we make sure that the action performed in the Act section delivers the expected outcome.

The following is an example of the code we will be working with:

```python
def test_can_change_values():
    # Arrange
    favorites_contract = deploy_favorites()

    # Act
    favorites_contract.store(42)

    # Assert
    assert favorites_contract.retrieve() == 42
```

We are testing a function called 'store' in this example.

First, we **arrange** by deploying our contract using 'deploy_favorites()'. 
Then, we **act** by calling 'store(42)' on our contract. 
Finally, we **assert** that 'retrieve()' on our contract returns the expected value (42).

We'll now add another test, this time we'll make sure we can add people to our contract. We can use the existing contract structure, but this time we'll need to test the 'add_person' functionality:

```python
def test_can_add_people():
    # Arrange
    new_person = "Becca"
    favorite_number = 16
    favorites_contract = deploy_favorites()

    # Act
    favorites_contract.add_person(new_person, favorite_number)

    # Assert
    assert favorites_contract.list_of_people(0) == (favorite_number, new_person)
```

Let's run the tests we've created.

```bash
mox test
```

This command will run all of our tests, and it will output the results.

We can also run just one test using the **-k** flag:

```bash
mox test -k test_can_add_people
```

This command will run only the 'test_can_add_people' test, making it easier to troubleshoot individual tests if needed. 
