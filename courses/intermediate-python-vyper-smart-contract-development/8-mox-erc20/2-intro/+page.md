---
title: Moccasin ERC20 Introduction
---

## Moccasin ERC20 Introduction

We are about to learn a ton about ERC20 tokens, and how to deploy them. We'll also see a bug that we'll intentionally create in our smart contract.

### Project Walkthrough

Let's first take a look at the project. We're working with a GitHub repo that has an ERC20 project. We'll see that this project has a few things, including a contracts folder, a tests folder, and a script folder.

We will also be creating our own custom token.

We'll start with a base ERC20 token and then customize it to our liking.

### Snekmate

We're going to use a library called Snekmate to help us build our custom token. Snekmate is a Vyper library that provides a ton of boilerplate code for common smart contract functionality.

### Custom ERC20

We will create a custom token that includes:

- `name`
- `symbol`
- `decimals`
- `eip712 version`

### Deploying the Token

To deploy our token, we will use the `moxc` tool.

```bash
moxc run deploy
```

### Events

We will also learn about events. Events are a way for smart contracts to communicate with the outside world.

### Testing

We will use a combination of unit tests and fuzz tests to ensure our ERC20 token is secure and functional.

- **Fuzz Testing** - Fuzz tests are a type of testing that involves generating random inputs and then running them against your smart contract. Fuzz testing is particularly useful for finding security vulnerabilities.
- **Stateless and Stateful Fuzzing** - We will learn how to create both stateless and stateful fuzzers.

### Formatting

We will also learn how to format our smart contract code in a way that automatically ensures our code is consistent and professional.

### Code Blocks

```python
pragma version ^0.4.1
```

```python
license MIT
```

```python
title snek_token
```

```python
author You!
```

```python
notice This is my ERC20 token!
```

```python
from ethereum.ercs import ERC20
```

```python
implements: ERC20
```

```python
from ethereum.ercs import ERC20Detailed
```

```python
implements: ERC20Detailed
```

```python
from snekmate.auth import ownable as ow
```

```python
initializes: ow
```

```python
from snekmate.tokens import erc20
```

```python
initializes: erc20(ownable = ow)
```

```python
exports: erc20._interface_
```

```python
NAME: constant(String[25]) = "snek token"
```

```python
SYMBOL: constant(String[5]) = "SNEK"
```

```python
DECIMALS: constant(uint8) = 18
```

```python
EIP712_VERSION: constant(String[20]) = "1"
```

```python
initialSupply: uint256
```

```python
@deploy
def __init__(initial_supply: uint256):
    ow.__init__()
    erc20.__init__(NAME, SYMBOL, DECIMALS, NAME, EIP712_VERSION)
    erc20.mint(msg.sender, initial_supply)
    self.initialSupply = erc20.totalSupply
```

```python
@external
def super_mint():
    # We forget to update the total supply!
    amount: uint256 = as_wei_value(100, "ether")
    self.totalSupply += amount
    erc20.balanceOf(msg.sender) = erc20.balanceOf(msg.sender) + amount
    log ERC20.Transfer(empty_address, msg.sender, amount)
```

```python
from script.deploy import deploy
```

```python
from eth_utils import to_wei
```

```python
from moccasin.boa_tools import VyperContract
```

```python
from contracts import snek_token
```

```python
INITIAL_SUPPLY = to_wei(1000, "ether")
```

```python
def deploy() -> VyperContract:
    snek_contract = snek_token.deploy(INITIAL_SUPPLY)
    print(f"Deployed SnekToken at {snek_contract.address}")
    return snek_contract
```

```python
def moccasine_main() -> VyperContract:
    return deploy()
```

This is just a brief introduction to ERC20 tokens and how to deploy them. This lesson will help you get started with this kind of smart contract.
