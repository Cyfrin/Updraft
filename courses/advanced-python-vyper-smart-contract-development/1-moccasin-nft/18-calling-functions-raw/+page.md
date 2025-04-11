## Calling Functions Using "raw" Hexdata

We can call any other smart contract from our contract using raw hex data without using the ABI library. To do this, we need to define our function with the following:

```python
@external
def call_function_directly(address_to_call: address, address: address, new_amount: uint256, update_address: address) -> Bytes[32]:
    success: bool = False
    response: Bytes[32] = b''
    success, response = raw_call(
        address_to_call,
        abi.encode(
            update_address,
            new_amount,
            method_id='transfer(address,uint256)'
        ),
        max_outsize=32,
        revert_on_failure=False
    )
    assert success
    return response
```

In this example, we:

1. Define a function called `call_function_directly` with the following parameters:
    * `address_to_call`: the address of the contract we are calling.
    * `address`: the address to send the tokens to.
    * `new_amount`: the amount of tokens to send.
    * `update_address`: the address to update.

2. We set the `success` variable to `False` and the `response` variable to an empty bytes object.
3. We use the `raw_call` function with the following parameters:
    * `address_to_call`: the address of the contract we are calling.
    * `abi.encode`:  encoding our data (we use the `abi` library to encode our data).
    * `max_outsize=32`: the maximum size of the response.
    * `revert_on_failure=False`: set to `False` in case of failure.

4. We then assert that the `success` variable is `True` and return the `response`.

By using the `raw_call` function, we can directly call any other smart contract without using the ABI library. This can be useful for interacting with contracts that do not have an ABI available. 
