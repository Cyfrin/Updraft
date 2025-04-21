## Pragma Version

We will start by setting a version for our Vyper smart contract. This is an important step to ensure that our code is compatible with the appropriate compiler version.

The version is set using the `#pragma version` directive.

We will use `0.4.1`, a stable and widely supported version.

```python
#pragma version 0.4.1
```

We can also use other versions, such as 0.4.1 and above, by using the `^` symbol to indicate a minimum version.

```python
#pragma version ^0.4.1
```

We will stick with `0.4.1` in this lesson.

Using this version is recommended because it's widely supported and allows for greater compatibility across different compilers.

For production code, it's best to use a specific version for the reasons mentioned above.

Let's move on to the next step in creating our smart contract.
