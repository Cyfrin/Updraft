## Introduction to Vyper Modules

We're going to be learning about Vyper modules.

We'll create a new file called `five_more.vy`. It's going to be very similar to the `favorites.vy` contract, but we'll modify the `store()` function to add five to the number stored.

```python
self.my_favorite_number = new_number + 5
```

We want to reuse as much code as possible without copy-pasting everything, so we'll use Vyper's module system.

A module is a way to encapsulate reusable code.

Vyper favors **composition over inheritance** - we compose modules to create new contracts.

Our `favorites_factory.vy` contract imports the `I_favorites` module:

```python
from interfaces import I_favorites
```

The `I_favorites` module helps us type our list of `favorites` contracts.

```python
list_of_favorite_contracts: public(DynArray[I_favorites, 100])
```

When we import a module, it doesn't automatically become part of our contract. We need to explicitly tell Vyper how to use it.

We can import the `favorites` contract into our `five_more.vy` file:

```python
import favorites
```

Now, if we comment out the variables and functions that we imported, the contract still compiles because we only imported it, not copied it.

```python
# my_favorite_number: uint256
# @external
# def store(new_number: uint256):
#    self.my_favorite_number = new_number
```

We can verify this by running the following commands:

```bash
mox compile
```

The ABI of our `five_more.vy` contract will be empty since we're just importing it.

```bash
# mox run deploy
```
