## Stateless Fuzzing in Python

We're going to start this lesson by learning how to write stateless fuzz tests. First, we need to understand what fuzz tests are and the difference between stateful and stateless fuzz tests.

Stateful fuzz tests need to save state information, allowing them to be more complex, and stateless fuzz tests do not need to save state information. This means that stateless fuzz tests are typically simpler and easier to write, so that's what we're going to focus on first.

Let's get started by creating a new folder called sub lesson. Inside of that folder, let's copy two files from our GitHub repository:

*   `stateful_fuzz_solvable.vy`
*   `stateless_fuzz_solvable.vy`

These files contain code that we will use to write our fuzz tests. If we open the `stateless_fuzz_solvable.vy` file we'll see this code:

```python
# pragma version 0.4.1

# title always_return_input
@license MIT
# notice INVARIANT: always_returns_input_number should always return the input number

some_number: public(uint256)

@external
@pure
def always_returns_input_number(input_number: uint256) -> uint256:
    @param input_number The input number to check
    if input_number == 2:
        return 0
    return input_number
```

This is a very simple smart contract that has one function called `always_returns_input_number`.  This function has an invariant that it should always return the same value that is passed into the function.

We also see that there is an exception to this invariant, where the function returns 0 if it is passed the value of 2.

Now, we're going to create a new file called `test_stateless.py`, which will contain our stateless fuzz tests. We need to start by importing the `pytest` and `hypothesis` libraries. Hypothesis comes included with Mocassin, which means that we can just import it directly. Let's also import the `StatelessFuzzSolvable` contract. We do this with these commands:

```python
import pytest
from contracts.sub_lesson import stateless_fuzz_solvable

```

Now, we need to create a fixture to deploy the smart contract:

```python
@pytest.fixture(scope="function")
def contract():
    return stateless_fuzz_solvable.deploy()
```

This fixture will be used to deploy the contract before running each of our tests.

To write our actual fuzz test we need to import the `given` function from hypothesis.

```python
from hypothesis import given
```

Now, we can start writing our test!

```python
@given(input=strategies.uint256)
def test_always_returns_input(contract, input):
    print(input)
    assert contract.always_returns_input_number(input) == input
```

This test uses the `given` function from hypothesis to generate a random `uint256` value. Then we pass that value into the `always_returns_input_number` function and assert that it returns the same value.

One important thing to note is that Hypothesis doesn't work well with fixtures. We're going to add a setting to our test that will allow it to function properly.

```python
@settings(suppress_health_check=[HealthCheck.function_scoped_fixture])
```

This setting tells Hypothesis to ignore the warning about using fixtures.

Now, let's run this test and see the results. We will use this command to run the test:

```bash
mox test -k test_always_returns_input -s
```

The `-s` flag allows us to see the output of the `print` function in the test. We'll see that Hypothesis has generated and tested a bunch of random `uint256` values and has found one example where the invariant is broken. This is because the function returns 0 when given the value of 2.

This concludes our look at stateless fuzzing. We've successfully written a fuzz test that found a bug in our simple smart contract.
