We learned about encoding, which is how we can represent various data types in hex and bytes, such as strings, numbers, and concatenated strings. We then looked at how the EVM uses encoding to build function calls, such as `transfer(to: address, amount: uint256)`, which is the function signature of a function we've used before. 

We can decode this using the built-in `method_id` function, which returns the function selector. This function selector will look like this:

```python
return method_id("transfer(address,uint256)", output_type=bytes4)
```

The first four bytes of the encoded function call will be the function selector, which tells the contract which function to call. 

We then saw how we can use `raw_call` to call a function directly. We can combine a function signature with parameter values and create the raw hex data we need to make a function call. In the below example, we can use `raw_call` to call the transfer function.

```python
def call_function_directly(address_to_call: address, new_amount: uint256, update_address: address):
    success: bool = False
    response: Bytes[32] = b""
    success, response = raw_call(
        address_to_call,
        abi_encode(
            update_address,
            new_amount,
            method_id="transfer(address,uint256)"
        ),
        max_outsize=32,
        revert_on_failure=False
    )
    assert success
    return response
```

The `abi_encode` function will encode the arguments with the `method_id` and return raw hex data.

We also saw how we can import interfaces to call functions within the imported contract. For example, we can call the `transfer` function within an imported contract called `myInterface`.

```python
from interfaces import myInterface
myInterface(address).transfer(to_call: address, amount: uint256)
```

We can also use raw hex data to make calls to other contracts without using the ABI or interface.

This is a little bit of a deeper dive into EVM function calls, but we'll practice more in the future. 
