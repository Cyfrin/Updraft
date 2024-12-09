## Function Selectors and Function Signatures

Let's create a new file called `call_anything.vy`. We'll unlock your superpower here. We'll take this code and stick it into our new file: 

```python
# pragma version 0.4.8
@license GPL-3.0-or-later
@title Encoding
# ...
def transfer(to: address, amount: uint256):
    self.some_address = to
    self.amount = amount
# ...
```

Let's break down this contract. We have a state variable called `some_address`, which is a public address. We also have a state variable called `amount`, which is a public uint256. We have a function called `transfer`. It takes two arguments: `to`, which is an address, and `amount`, which is a uint256. This function simply updates the state variables `some_address` and `amount`. 

Now, imagine two contracts, Contract A and Contract B. Contract A calls `transfer` on Contract B. How does Contract A know which `transfer` function to call? Well, on chain, everything is represented as hex data. 

Vyper does a lot of encoding and decoding behind the scenes. It's the same way that we encode numbers and strings. We can encode function selection, too. 

Recall when we were deploying our first contract in web3.py, we built transactions. If we look at the ethereum.org documentation on transactions, we'll find a section called "The data field". This field contains the instructions for what we want a contract to do. We send this data to the contract's address, and this data, or the input, represents the instructions.  If we look at any transaction that does something other than just transferring raw ETH, we will always see this input data field.

Let's take a look at an example on Etherscan. If we view the input as raw, we'll see a jumble of hex data. This hex data tells the contract what to do. 

This hex data is often called the "called data", and this "called data" is essentially the computer's encoded version of our instructions. 

Let's go back to our contract. If we want to call `transfer` on Contract B, we need to pass some data to Contract B. If we compile and deploy this contract:

```python
# pragma version 0.4.8
@license GPL-3.0-or-later
@title Call Anything
# ...
def transfer(to: address, amount: uint256):
    self.some_address = to
    self.amount = amount
# Us -> Contract B (transfer)
```

We'll deploy it, then we can call this function. We will provide an address and an amount, then we will call transfer. We'll click the button and watch what happens in the terminal:

```bash
commands
```

The data that is being passed to the contract is the ABI-encoded version of the function call. 

Let's take a step further and call `transfer` without any parameters. We'll redeploy this contract:

```python
# pragma version 0.4.8
@license GPL-3.0-or-later
@title Call Anything
# ...
def transfer():
    self.amount = 100
# Us -> Contract B (transfer)
```

We'll redeploy it. And, we'll call `transfer` in our remix terminal. 

The input data is:

```python
0x8a4068dd
```

This input is known as the function selector. The function selector is the first four bytes of the function signature ABI encoded. We can actually calculate this ourselves, and there are a few ways to do this. 

For example, we can create a function called `_get_selector_` in our contract:

```python
# pragma version 0.4.8
@license GPL-3.0-or-later
@title Call Anything
# ...
def transfer():
    self.amount = 100
# Us -> Contract B (transfer)
def _get_selector_one() -> bytes4:
    return method_id("transfer(address, uint256)", output_type=bytes4)
```

We'll redeploy it.

Then, we can call this function in the remix terminal to get our function selector:

```bash
commands
```

We get the same function selector we got in the previous example. 

Vyper provides a built-in function called `method_id`. We can use this function to calculate the function selector. In Solidity, these values are known as function selectors, and in Vyper, they are called method ID's. It's basically the same thing.

We could also create a function called `_get_selector_one` in our contract and return `bytes4`.  

```python
# pragma version 0.4.8
@license GPL-3.0-or-later
@title Call Anything
# ...
def transfer():
    self.amount = 100
# Us -> Contract B (transfer)
def _get_selector_one() -> bytes4:
    return method_id("transfer(address, uint256)", output_type=bytes4)
def get_selector_one() -> bytes4:
    return self._get_selector_one()
# Example function selector:
# 0xa9059cbb
# Example Function Signature
# "transfer(address, uint256)"
```

And we'll redeploy it. 

Let's call `get_selector_one` in remix. 

The function selector returned is:

```python
0xa9059cbb
```

The same as before! 

The function selector is the first four bytes of the function signature ABI-encoded. So, if we had this `transfer` function, and we were to ABI encode this, the first four bytes would be this. 

Let's summarize this lesson. Anytime we call a function, it gets converted to this hex data. This hex data contains the function selector. Function selectors are an important part of interacting with smart contracts. We use them to identify the specific function we want to call.  
