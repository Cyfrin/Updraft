## DelegateCall in Action

In this lesson, we'll take a look at the implementation of delegate call, a powerful tool that lets us upgrade our contracts without having to change their addresses.

Let's get started. We'll copy and paste these contracts into our project:

```javascript
#counter_one.vy
# SPDX-License-Identifier: MIT
pragma version 0.4.1

number: public(uint256)

@external
def set_number(new_number: uint256):
    self.number = new_number

@external
def increment():
    self.number += 1

@external
def version() -> uint256:
    return 1

```

```javascript
#counter_two.vy
# SPDX-License-Identifier: MIT
pragma version 0.4.1

number: public(uint256)

@external
def set_number(new_number: uint256):
    self.number = new_number

@external
def increment():
    self.number += 2

@external
def decrement():
    self.number -= 1

@external
def version() -> uint256:
    return 2
```

Next, we'll update our deploy script to include these contracts:

```javascript
#deploy.py

from src import ERC1967, counter_one, counter_two
import boa
import warnings

def deploy():
    implementation = counter_one.deploy()
    proxy = ERC1967.deploy(implementation.address, boa.env.eoa)
    proxy_with_abi = counter_one.at(proxy.address)
    proxy_with_abi.set_number(77)
    print(proxy_with_abi.number())
    print(implementation.number())

def moccasin_main():
    deploy()

```

Here's what this script does:

1.  We deploy our implementation contract.
2.  Then, we deploy the proxy contract with the implementation address and the admin address, which is set to boa.env.eoa.
3.  We assign the ABI to the proxy contract.
4.  We call the set_number function on the proxy, setting the number value to 77.
5.  We print the value of `number` from both the proxy contract and the implementation contract.

You'll notice that the `number` value was updated in the proxy contract but not the implementation contract.

Remember, the delegate call implementation is likely to throw warnings. We'll ignore these warnings by including this snippet in our script:

```javascript
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
```
Finally, we can run our script with this command:

```bash
mox run deploy
```

This will run the deploy script, and you'll see that our `set_number` function call was applied to the proxy contract and not the implementation contract.
