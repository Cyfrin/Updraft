## Better way to send ETH

We've learned how to send ETH to another account using the `send` function. However, there's a better way to do it that's considered more secure.

The `send` function is a lower-level function that can be unreliable. There are potential issues with how much gas the EVM uses for different opcodes (for example, logging), and this could cause transactions to fail.

Instead, we're going to use the `raw_call` function. This is a built-in function in Vyper that allows us to call any function in the world, even if the target contract doesn't have that function.

Let's look at how to use `raw_call` to send ETH. We'll use the `withdraw` function as an example.

```vyper
@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function.

    How do we make sure we can pull the money out?
    .....
    """
    assert msg.sender == OWNER, "Not the contract owner!"
    #send(OWNER, self.balance)
    raw_call(OWNER, b"", value=self.balance)
    revert_on_failure=True
    #resetting
    for funder, address in self.funders:
        self.funder_to_amount_funded[funder] = 0
    self.funders = []
```

**Explanation:**

- `raw_call(OWNER, b"", value=self.balance)` calls the raw call function.
- The first argument `OWNER` is the address we're sending ETH to.
- The second argument `b""` is an empty byte string that represents the data we're sending.
- The third argument `value=self.balance` is the amount of ETH we're sending, which is the contract's current balance.
- `revert_on_failure=True` tells Vyper to revert the transaction if `raw_call` fails.

We can learn more about `raw_call` and its advanced features in later lessons. For now, understand that `raw_call` is considered a safer way to send ETH than using the `send` function.
