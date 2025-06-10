## Smart Contracts, EVM, and EVM-Compatible Chains

We will start to look at how smart contracts are actually run. When we compile our smart contract, we are converting it into a format that the EVM can understand.

The EVM, or Ethereum Virtual Machine, is a set of rules or standards that dictate how compiled smart contract code should look.

Any blockchain that follows these rules is considered EVM-compatible. Examples of these include:

- Ethereum
- Arbitrum
- Optimism
- Polygon
- ZKsync

We should be mindful of the chain that we are deploying to. A common mistake is to deploy to a chain that does not support the smart contract language we are using. We will discuss this in more detail later.

We will be using ZKsync in this lesson. Here is the code we will be working with:

```python
# EVM: Ethereum Virtual Machine
# Ethereum, Arbitrum, Optimism, Polygon, ZKsync

# pragma version 0.4.1
# @license MIT

struct Person:
    favorite_number: uint256
    name: String[100]

my_name: public(String[100])
my_favorite_number: public(uint256) = 7

list_of_numbers: public(uint256[5]) = [0, 0, 0, 0, 0]
list_of_people: public(Person[5])
index: public(uint256)

name_to_favorite_number: public(HashMap[String[100], uint256])

@deploy
def __init__():
    self.my_favorite_number = 7
    self.index = 0
    self.my_name = "Patrick!!"

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

This code works correctly with the ZKsync compiler, but as we progress through this lesson, we will start to see how certain keywords, for example ZKsync, do not work correctly.
