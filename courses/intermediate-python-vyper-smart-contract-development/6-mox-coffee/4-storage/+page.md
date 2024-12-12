## Storage in Smart Contracts

In our last lesson, we learned about state variables, which are variables that exist on the blockchain and can be accessed by other smart contracts. These variables are stored in a location called _storage_, but we didn't go into detail about how storage works.

We'll be doing that in this lesson. In this lesson, we'll learn the differences between _constants_, _immutables_, and _storage_. We'll also cover how variables are stored in the EVM and look at a script that allows us to read storage directly.

### Storage Layout

The EVM has a giant list of storage locations where we can store variables. This is how we can update values and retrieve them later.

Let's start by looking at a minimal smart contract that has one state variable.

```python
favorite_number: uint256;
```

This variable is of type _uint256_. When this contract is deployed, the EVM needs to store the value of this variable.

Our contract will also have a state variable of type _bool_.

```python
some_bool: bool;
```

The EVM handles booleans by representing them as a hex value. A _true_ boolean will have a hex value of 0x00000001, while a _false_ boolean will have a hex value of 0x00000000.

The EVM assigns storage slots to variables in order.

- If we have a variable called _favorite_number_, it's going to be stored in slot zero.
- _some_bool_, being the second variable, will be stored in slot one.

### Fixed-Sized Arrays

Let's say we have an array of 1000 slots.

```python
my_fixed_array: uint256[1000];
```

Fixed-sized arrays take up all the storage slots associated with their size. The EVM will start with slot two for the array and allocate a slot for each element.

### Dynamic Arrays

Dynamic arrays differ from fixed-sized arrays by having a special "holder" slot to keep track of the array's length.

```python
my_dyn_array: DynArray(uint256, 100]
```

- This dynamic array can hold up to 100 elements.
- The array starts at slot 1002.
- The length is stored at slot 1003.

### Mappings

Mappings use a hashing function to determine the storage location for elements.

```python
my_map: HashMap[(uint256, bool)];
```

- The mapping will have a blank placeholder slot.
- Each element is stored at a slot based on its key.

### Constants and Immutables

Constants and immutables are not stored in storage. They are part of the contract's bytecode.

```python
NOT_IN_STORAGE: constant(uint256) = 123
IMMUTABLE_NOT_IN_STORAGE: immutable(uint256)
```

This is why we don't need to initialize them like the other state variables.

### Accessing Storage with a Script

We can use a script to read values directly from storage. Let's have a look at the storage script from the course repository.

```python
from src.example_contracts import fun_with_storage
from moccasin.config import get_active_network
import boa

def deploy_storage():
    fws = fun_with_storage.deploy()
    active_network = get_active_network()
    if active_network.has_explorer():
        print("Verifying contract on explorer...")
        result = active_network.moccasin.verify(fws)
        result.wait_for_verification()
    print(f"favorite_number is {fws.storage.favorite_number.get()}")
    print(f"Immutables: {fws.immutables.IMMUTABLE_NOT_IN_STORAGE}")
    print("You can call directly from storage slots!")
    print(f"Value at storage slot 0: {boa.env.get_storage(fws.address, 0)}")
    print(f"First element of the fixed array: {boa.env.get_storage(fws.address, 2)}")
    print(f"Length of the dyn array: {boa.env.get_storage(fws.address, 1002)}")
    print(f"First element in dyn array: {boa.env.get_storage(fws.address, 1003)}")
    print("Mapping placeholder")
    print(f"First element of the mapping: {boa.env.get_storage(fws.address, 1103)}")
    slot = 1103
    k = 0
    location = boa.eval(f"convert(keccak256(concat(convert({slot}, bytes32), convert({k}, bytes32))), uint256)")
    print(f"Storage of element: {boa.env.get_storage(fws.address, location)}")

def moccasin_main():
    deploy_storage()
```

We can run this script to see the values stored in storage. For example:

```bash
mox run storage.py
```

You can see that we can read the values stored in different slots using `boa.env.get_storage()`.

We can use `mox inspect` to see the storage layout. This is a useful tool that can be used to debug and understand how storage is being used.

```bash
mox inspect fun_with_storage storage-layout
```

This command will output a dictionary with the following information for each variable:

- _slot:_ The storage slot where the variable is stored
- _type:_ The type of the variable

We hope this lesson has helped you understand how storage works in Solidity smart contracts. As we progress through the course, we'll be exploring more about storage and how to use it effectively.
