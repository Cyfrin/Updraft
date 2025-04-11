## Code Walkthrough: Packed State Variables in Curve Tricrypto Optimized WETH Contract

We will begin our exploration of the Curve Tricrypto Optimized WETH contract by examining its state variables. In this contract, many state variables are packed during storage and unpacked when needed for computations. 

For instance, the `packed_precisions` state variable is declared as follows:
```javascript
packed_precisions: uint256
```
The precision in Curve v2 mirrors the precision in Curve v1. It stores numerical values so that all token balances will have 18 decimals. Since this contract manages three tokens, this state variable consolidates three precisions for each token into a single `uint256`. This packing of multiple values into a single `uint256` state variable is done to optimize gas usage. Storing the three precisions in separate state variables would consume approximately three times the gas.

The contract contains several packed state variables, including:
```javascript
packed_precisions: uint256
price_scale_packed: uint256
last_prices_packed: uint256
initial_A_gamma: uint256
future_A_gamma: uint256
```
Now let's look at the functions used for packing and unpacking these state variables, beginning with the `pack` internal function:
```javascript
@internal
@view
def _pack(x: uint256[3]) -> uint256:
    """
    @notice Packs 3 integers with values <= 10**18 into a uint256
    @param x The uint256[3] to pack
    @return uint256 Integer with packed values
    """
    #  128 bits   | 64 bits | 64 bits
    #  x[0]      | x[1]    | x[2]
    return (x[0] << 128) | (x[1] << 64) | x[2]
```
As indicated in the comments, this function takes three integers with values less than or equal to `10**18` and packs them into a `uint256`. The code utilizes bitwise operators for this packing process. It takes an array containing three `uint256` elements. Each of these values will be no larger than `10**18`. The first element is stored after left-shifting the `uint256` value by 128 bits. The second element is stored after left-shifting the `uint256` by 64 bits. The last element is stored without any shifting.

Effectively, in a `uint256` (which is 256 bits), starting from the left (index zero) to the right (index 2), the first 128 bits store the value for `x[0]`, the next 64 bits store `x[1]`, and the final 64 bits store `x[2]`.

Here is an example of the `pack` function's usage:
```javascript
  self.future_packed_fee_params = self._pack(
      [new_mid_fee, new_out_fee, new_fee_gamma]
  )
```
In this context, the `pack` function consolidates three parameters (`new_mid_fee`, `new_out_fee`, and `new_fee_gamma`) used for dynamic fee calculation. This demonstrates the packing process.

Now, we'll examine how to unpack this data using the `unpack` function:
```javascript
@internal
@view
def _unpack(_packed: uint256) -> uint256[3]:
    """
    @notice Unpacks a uint256 into 3 integers (values must be <= 10**18)
    @param val The uint256 to unpack
    @return uint256[3] A list of length 3 with unpacked integers
    """
    return [
      # 2**64 - 1
      (_packed >> 128) & 18446744073709551615,
      (_packed >> 64)  & 18446744073709551615,
      _packed & 18446744073709551615,
    ]
```
The `unpack` function takes a single `uint256` named `packed` and returns an array of three `uint256` elements. To extract the value stored in the first 128 bits, corresponding to `x[0]` from the `pack` function, the packed value is right-shifted by 128 bits, and a bitwise mask is applied. The number `18446744073709551615`, which is `2**64 - 1`, is used for the bitwise mask. The next 64 bits, which contain `x[1]` from `pack`, are extracted by right-shifting the packed value by 64 bits, followed by applying the bitwise mask of `2**64 - 1`. The final value, corresponding to the last 64 bits, is obtained by applying the same bitwise mask to the packed value.

The `unpack` function thus completes the reverse operation of the `pack` function, effectively splitting a single packed `uint256` into its three constituent integers.
