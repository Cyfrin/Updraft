---
title: Missing Access Controls Proof of Code
---

_Follow along with this video:_



---

## The Importance of Proof of Concept &amp; Code

Despite seeming glaringly apparent, proof of concept or proof of code is not always given its due attention, leaving room for security mishaps. Hence, it is essential to validate the protocol. The protocol's existing test suite provides invaluable assistance in doing so.

## Setting Up the Test

Here is a step-by-step guide on creating a custom test:

- Initially, navigate to the test folder for writing the test.
- Write a function, let's name it `test_anyone_can_set_password`.
- To make the process more robust, make it a fuzz test.
- Next, select a random public address.
- For the first step within this function, we'll need to mock the address, for instance, `VM.prank(random_address)`.
- Now, establish a string memory, e.g., `string memory expected_password = 'my_new_password'`.

Then, we must reserve a section for the setup function to get the password contract established. An essential part of being a security researcher is being able to code effectively, so congratulations on this milestone when you achieve it!

## Writing the Function

Continuing the coding, remember we're a random address, aiming to set up a new password. Prank the owner of the contract setup in the beforementioned function now with another `VM.prank`. Here is how:

- The string memory, for instance, `string memory actual_password = passwordstore.get_password`.
- Set an assertion that verifies the `actual_password` and `expected_password` are the same.

Identifying areas of weakness, understanding them and bringing them to attention is what security research is all about, and hopefully, through these steps, you can do just that.

## Result Presentation

The results can sometimes appear messy when presented with the test suites, especially in markdown. However, with the use of HTML tags, you can collapse the details into a small, clickable bit, making it more visually appealing.

For instance:

```markdown
<details>
    <summary>
        Code Summary
    </summary>
</details>
```

## Mitigation

Finally, after discovering the weakness, it is crucial to provide a recommended solution or prevention measure. The solution here would be to add an access control conditional to the 'set_password' function.

```javascript
if (msg.sender != s_owner) revert("PasswordStore: Not owner");
```

The resulting effect would be a more secure 'set_password' function.

We've thus covered the second part of the testing and proofed it with a practical test case. Careful scrutiny of seemingly minor security risks can drastically enhance the security levels of blockchain systems.
