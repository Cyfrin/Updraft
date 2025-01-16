## Vyper Built-in Interfaces

This lesson will explore the built-in interfaces provided by the Vyper compiler.

The first interface we will look at is the `IERC20` interface. This interface comes built-in with the Vyper compiler. We can import and implement this interface in our contract.

```python
from ethereum.erc20 import IERC20

implements: IERC20
```

In the code above, we import the `IERC20` interface from the `ethereum.erc20` library and then implement the interface.

The `implements` keyword in Vyper makes sure our contract will not compile unless it adds all the functions of the `IERC20` interface. The interface ensures our contract will be compatible with the ERC20 standard.

Vyper comes with a large number of interfaces that are commonly used on the Ethereum blockchain. We will be exploring these in more detail as the course progresses.

We can also make our own interfaces and implement them in our contracts. This can be beneficial when we want to make our own standards.

For example, we could make an interface called `my_interface.vyi`.

```python
# my_interface.vyi
```

We can then import and implement this interface in our smart contract to ensure our contract follows our custom standard.

We are going to create a deployment script so that we can deploy our first token. We will come back to this code later and look at the interfaces in more detail.

```python
# deploy.py
```