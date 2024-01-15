---
title: Final Invariant & Tweaks
---



---

# Diving into Invariants: Writing Tests in Coding

In this blog post, we will uncover the steps to set up tests for an invariant in our code. Precisely, we will write a simple test and furthermore guide you through the setup for our handler.

## Writing the Test

After establishing our invariant, it's time to proceed to writing a basic test. This test could be as simple as asserting that the actual `Delta X` from our handler should equal the expected `Delta X`. Here is how we could write this test.

```python
assert handler.actualDeltaX == handler.expectedDeltaX
```

Though I must confess, I often prefer writing `assertEqual` as it usually provides more detailed information, you can certainly opt for our above statement which succinctly accomplishes the task.

The actual test, however, functions in rudimentary terms to ensure that our expected delta is aligned with the actual delta in the handler.The expected delta is assigned using the function `Y times X equals K`, which calculates the expected deltas. We then compare the computed deltas to the actual deltas.

## Setting Up the Handler

Now, let's dive into actually setting up the handler, which calls for us to move up a bit, retracing our steps.

To initiate the handler setup, we need to first import it. This can be done using the following code:

```python
import handler from 'handler.t.sol'
```

After successfully importing the handler, we can create a new handler using the `new` keyword. This handler takes the parameter as `poolBytes for Array memory`.

> Note: All the variables used above can be replaced depending on the specific needs of a project.

In conclusion, we have seen how easily we can write the basic structure of a test and set up our handler. The ease at which we can perform these tasks simplifies our coding endeavors and ensures more stable code in the long run.

Remember, while writing tests, our ultimate goal is to ensure that our code behaves as we expect it to under different circumstances. After all, in the words of a wise coder, "Code without tests is bad code.". Make space for tests the next time you code and watch the number of errors drop significantly.
