## Vyper Types

We're going to learn about types in Vyper, and to get started we're going to need to know how to store different things in our smart contract. We're going to go to the Vyper documentation, which we can find at docs.vyperlang.org.

If we scroll down the left side here, we can see all the different types that we can create in a smart contract. And to store different values like our favorite number or different people, we'll have to assign each value to a type and then assign it to a variable.

So, we have a lot of different types in Vyper, and some of the main ones are booleans, signed integers, unsigned integers, decimals, addresses, byte arrays and then a number of other ones as well.

For example, if we were to type in here:

```python
has_favorite_number: bool
```

This would mean this `has_favorite_number` could either be `True` or `False` since it's a Boolean.

Now, if you were to try to compile this right now, by hitting command S, you'd get a little error saying "storage variables cannot have an initial value". So for now, we can't actually give it a value here, but this line would say that `has_favorite_number` is going to be of type Boolean, which means it'll either be `True` or `False`.

We could also say:

```python
my_favorite_number: uint256
```

This `uint256` is saying that `my_favorite_number` is an unsigned integer. This means `my_favorite_number` is going to be an unsigned integer of 256 bits. Don't worry too much about the bits part for now, but unsigned just means that this can only be a positive number.

We can also have an address:

```python
my_address: address
```

An address is going to be an address in the blockchain space. For example, in our Metamask, we can click this little copy button, go back to Remix, and type `my_address: address` and then set it equal to the value that we copied.

So we have booleans, signed integers, unsigned integers and we can also do decimals. Which decimals are a more advanced value that we won't be using for quite some time, but you could say `my_decimal: decimal` and you also have to add `enable decimals` to the compiler.

You can also have an M byte wide fixed size byte array, which we can do something like `my_bytes: byte32` .

And there are several other more advanced types that we can use to store different things in our smart contract, but those are some of the basics.
