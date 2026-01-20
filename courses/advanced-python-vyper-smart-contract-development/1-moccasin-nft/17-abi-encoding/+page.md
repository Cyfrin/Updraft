## ABI Encoding Introduction

We are going to jump over to Remix so we can show you some encoding and decoding examples.

Let's make a function:

```python
@external
@pure
def combine_strings(string_one: String[50], string_two: String[50]) -> String[100]:
    return concat(string_one, string_two)
```

We will compile this using the Vyper compiler and deploy it. 

We can call the `combine_strings` function to see how it combines two strings:

```python
combine_str(string_one, string_two)
```

Let's try calling the function with two strings:

```python
combine_str('hi', 'hello')
```

The output is:

```
0: string: hihello
```

We can also encode numbers using the `abi_encode` function. Let's make a function to encode a `uint256` number:

```python
@external
@pure
def encode_number() -> Bytes[128]:
    amount: uint256 = 1
    return abi_encode(amount)
```

Compiling and deploying this, then calling the `encode_number` function, will output a hex representation of the number 1:

```bash
encode_nu
```

The output will be:

```
0: bytes: 0x0000000000000000000000000000000000000000000000000000000000000001
```

We can also encode strings. Let's make an internal, pure function to encode a string:

```python
@internal
@pure
def _encode_string() -> Bytes[128]:
    my_string: String[50] = "Hello World!"
    return abi_encode(my_string)
```

Then, let's make an external, pure function to call the `_encode_string` function and return the output:

```python
@external
@pure
def encode_string() -> Bytes[128]:
    return self._encode_string()
```

After compiling and deploying, then calling `encode_string`, we will see the hex representation of the string "Hello World!".

We can also decode strings and numbers from their hex representations. Let's create a function that will decode the hex representation of a string back into a string:

```python
@external
@pure
def decode_string(string: String[50]) -> String[50]:
    return abi_decode(string, String[50])
```

We can also do multiple encodes and decodes. Let's make an internal, pure function to encode multiple strings:

```python
@internal
@pure
def _multi_encode() -> Bytes[256]:
    my_string: String[50] = "Hi Mom"
    my_string_two: String[50] = "Miss you"
    return abi_encode(my_string, my_string_two)
```

Let's make an external, pure function to call the `_multi_encode` function:

```python
@external
@pure
def multi_encode_view() -> Bytes[256]:
    return self._multi_encode()
```

Let's make an external, pure function to decode multiple strings:

```python
@external
@pure
def multi_decode(string: String[50]) -> (String[50], String[50]):
    my_encoded_strings: Bytes[256] = self.multi_encode()
    my_string: String[50] = empty(String[50])
    my_string_two: String[50] = empty(String[50])
    return abi_decode(my_encoded_strings, (String[50], String[50]))
```

We are now able to encode numbers and strings as hex bytes and decode them back to their original data types. This is very useful for working with raw calls.

Remember when we did the `buy_me_a_coffee` example? 

We made a raw call with bytes of zero, which will unlock the power to call any contract without using an interface or an ABI. You can build the bytes yourself to call the right function.

Let me show you. We are going to learn about function selectors, function signatures and how ABI encoding fits in.

This is the line that we had you copy-paste earlier, and we now know what this function is doing:

```python
return abi_decode(abi_encode(buffer), String[FINAL_STRING_SIZE])
```

The `abi_encode` function takes the `buffer` object, which is of type string and encodes it to be of type `bytes`. We then call `abi_decode` to decode the bytes back to a string of a given size (`FINAL_STRING_SIZE`). 

So we have a buffer object and we encode it to a bytes object. We then decode the bytes object back to a string of a given size. We call this encoding and decoding of bytes and strings a raw call.

Let's take a look at the `buy_me_a_coffee.vy` file:

```python
raw_call(OWNER, "tm", value = self.balance)
```

We use the `raw_call` function. We learned about `raw_call` in a previous video. 
