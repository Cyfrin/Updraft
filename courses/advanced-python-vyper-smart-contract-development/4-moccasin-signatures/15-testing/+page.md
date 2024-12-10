## Testing

We'll start by writing some tests so we can finally see all the pieces of this signature thing come together. We'll first create a `conf_test.py` where we will add our fixtures:

```python
import boa
from script.deploy_merkle import deploy_merkle
import pytest
```

We're going to need `pytest`:

```python
import pytest
```

We're going to add `@pytest.fixture`:

```python
@pytest.fixture
```

Then, we'll add a function:

```python
def merkle():
```

And we'll return `deploy_merkle`:

```python
return deploy_merkle()
```

We'll also get to the token. Let's add `@pytest.fixture`:

```python
@pytest.fixture
```

and `def token`:

```python
def token(merkle):
```

Instead of doing the manifest named, we'll just have this input the merkle and say:

```python
from src import snek_token
```

from `src` import `snek_token`. This is what we call it. We'll return `snek_token`:

```python
return snek_token.at(merkle.AIRDROP_TOKEN())
```

`@merkle.AIRDROP_TOKEN()`. 

Now we'll create a user.  We'll add `@pytest.fixture`:

```python
@pytest.fixture
```

and `def user`:

```python
def user():
```

We're going to have to work with real keys, so we can't do `boa.env.generate`. We need to use a real key, so we'll run `anvil quick`. We'll grab the top private key and put it into our test:

```python
ANVIL_KEY = "0xac0974bec39a17e36ba4d4d238ff44d4bac944cbed5efcae784d7f447f2ff808"
```

We'll import `Account`:

```python
from eth_account import Account
```

And now we'll say `account equals account.from_key anvil key`:

```python
account = Account.from_key(ANVIL_KEY)
```

We'll look at our `merkle_output.json` to find the address associated with this private key:

```bash
anvil
```

We can see that this key corresponds to the address `0xf39f5e1aad88f8f64c6a888827279cffb992266`. 

We'll add `with boa.env.prank(account.address):` to our `user` fixture:

```python
with boa.env.prank(account.address):
```

And add `yield account` to return the `account` from the `user` fixture.

```python
yield account
```

We'll also add the `anvil address`:

```python
ANVIL_ADDRESS = "0xf39f5e1aad88f8f64c6a888827279cffb992266"
```

Now we'll create `test_merkle.py`:

```bash
mock test -k
```

We'll add a function:

```python
def test_user_can_claim(merkle, token, user):
```

We'll grab the starting balance:

```python
starting_token_balance = token.balanceOf(user.address)
```

To get the message hash, we'll use our `merkle` fixture and pass in the `user.address` and `DEFAULT_AMOUNT`:

```python
message_hash = merkle.get_message_hash(user.address, DEFAULT_AMOUNT)
```

We need to import `sign_message_hash` from `eth_account.utils.signing`:

```python
from eth_account.utils.signing import sign_message_hash
```

We'll also need to import `PrivateKey` from `eth_keys.datatypes`:

```python
from eth_keys.datatypes import PrivateKey
```

Then we'll use `sign_message_hash` to generate our signature:

```python
v, r, s = sign_message_hash(PrivateKey(user.key), message_hash)
```

We'll use our `merkle` fixture to call `claim`:

```python
merkle.claim(user.address, DEFAULT_AMOUNT, proof, v, bytes(r), bytes(s))
```

We'll grab our ending balance:

```python
ending_balance = token.balanceOf(user.address)
```

And we'll assert that the `ending_balance` is equal to the `starting_token_balance` plus the `DEFAULT_AMOUNT`:

```python
assert ending_balance == (starting_token_balance + DEFAULT_AMOUNT)
```

Now we'll do a couple of things to demonstrate how our tests can fail.

We'll create a bad user fixture, which is the same as our user fixture, but we'll use `ANVIL_KEY_TWO`:

```python
@pytest.fixture
def bad_user():
    account = Account.from_key(ANVIL_KEY_TWO)
    with boa.env.prank(account.address):
        yield account
```

We'll run `anvil` again and grab private key two. We'll paste this key into our `conf_test.py`:

```python
ANVIL_KEY_TWO = "0x59c6995e998f7a5a0044966f094539d9c3e9ddae88c7a8412744603b6b7869d0"
```

Then, in our `test_merkle.py`, we'll swap `user` for `bad_user`:

```python
def test_user_can_claim(merkle, token, bad_user):
```

And we'll run the test again:

```bash
mock test -k
```

We can see that the test fails with an invalid signature, because we used the wrong private key to sign the hash.

Let's update our `test_user_can_claim` function to import `to_bytes` from `eth_utils`:

```python
from eth_utils import to_bytes
```

We'll need to update our `proof` to be a `bytes` object, so we'll use `bytes.fromhex`:

```python
proof = [
    bytes.fromhex("0xebcc963f0588d1ded0db349946755727e95d1917f9427a2d7d8935e0444b"),
    bytes.fromhex("0xe5ebd1e1b5a5478a44eca6ab36a95ac3b66b216875f6524caa7a1d87d96576"),
]
```

Now, we'll update the `merkle.claim` call to pass in our signature as bytes:

```python
merkle.claim(
    user.address, DEFAULT_AMOUNT, proof, v, to_bytes(r), to_bytes(s)
)
```

We'll run the test again:

```bash
mock test -k
```

This time, the test should be successful.
