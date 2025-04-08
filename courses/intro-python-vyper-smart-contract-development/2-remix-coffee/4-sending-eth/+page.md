## Sending ETH to a contract

The first question that will come up is how do we send ETH to this contract? The answer to this is that in every transaction you send, there's a value field that allows you to send a certain amount of ETH. You can even see this in Metamask, where you can send a specific amount of ETH to an address. This populates the value field in the transactions.

Not all functions can read from this value field. To tell a function that it can read from the value field, we use the `@payable` keyword. This tells Vyper that the function can work with the `msg.value` variable. Similar to wallets, smart contracts can hold funds. To ensure someone calling the `fund` function sends at least one ETH, we can use the `assert` function and say:

```python
assert msg.value == 1000000000000000000
```

We'll understand what `wei` is later on. We also have a variable called `msg.sender`, which is the sender of the current message. We will be using this variable in our code.
