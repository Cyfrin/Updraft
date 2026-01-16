## Additional Functions: `pack_prices` and `unpack_prices`

In this lesson, we are going to cover two additional functions, `pack_prices` and `unpack_prices`. These functions perform similar actions as the previously covered `pack` and `unpack` functions but have additional logic. The purpose of `pack_prices` and `unpack_prices` is to pack and unpack the price scales that are used for the transform balances.

We'll start with the `unpack_prices` function because it's the easier function to understand.

```python
@internal
@view
def _unpack_prices(_packed_prices: uint256) -> uint256[2]:
    """
    @notice Unpacks N_COINS-1 prices from a uint256.
    @param _packed_prices The packed prices
    @return uint256[2] Unpacked prices
    """
```

The input to `unpack_prices` is a `uint256` named `_packed_prices`. This represents the price scales that are packed into a single `uint256` state variable. This function returns a `uint256` array of size 2. Even though there are 3 tokens in this contract, we are only returning 2 price scales because the price scale of coin 0 will always be equal to 1, so there is no need to store this value.

Now, let's take a look at the body of the function:
```python
    unpacked_prices: uint256[N_COINS-1] = empty(uint256[N_COINS-1])
    packed_prices: uint256 = _packed_prices

    for k in range(N_COINS - 1):
        # PRICE_SIZE: constant(uint128) = 256 / (N_COINS - 1)
        # PRICE_MASK: constant(uint256) = 2**PRICE_SIZE - 1
        # 128 bits mask
        unpacked_prices[k] = packed_prices & PRICE_MASK
        # shift packed prices by 128 bits to the right
        packed_prices = packed_prices >> PRICE_SIZE
    # unpacked prices  = 128 bits  | 128 bits
    # prices[1] | prices[0]
    return unpacked_prices
```
First we initialize a `uint256` array of size `N_COINS -1`. Since there are 3 coins in this contract, `N_COINS` will equal 3, making the array size 2. Next we copy the value of `_packed_prices` to a new variable called `packed_prices`. The `for` loop iterates from `k=0` up to `N_COINS -1`. `N_COINS - 1 = 2`, therefore this loop will run for k=0 and k=1. Inside the for loop:
```python
unpacked_prices[k] = packed_prices & PRICE_MASK
```
The current `packed_prices` is bitwise AND with the `PRICE_MASK`. `PRICE_MASK` is a constant defined above as:
```python
PRICE_MASK: constant(uint256) = 2**PRICE_SIZE - 1
```
and is equal to a sequence of all ones with a length of 128 bits. We are creating a 128-bit mask. This line extracts the rightmost 128 bits of `packed_prices`.

```python
packed_prices = packed_prices >> PRICE_SIZE
```
We shift `packed_prices` 128 bits to the right to prepare for the next iteration of the loop. Since `PRICE_SIZE` equals 128, we are effectively removing the rightmost 128 bits.

Finally, we return the `unpacked_prices` array. For the first element at `index=0` we'll have the price scale for token 1, and for the second element at `index=1` we'll have the price scale for token 2.

Next let's take a look at the `pack_prices` function.

```python
@internal
@view
def _pack_prices(prices_to_pack: uint256[N_COINS-1]) -> uint256:
    """
    @notice Packs N_COINS-1 prices into a uint256.
    @param prices_to_pack The prices to pack
    @return uint256 An integer that packs prices
    """
```

The input to `pack_prices` is a `uint256` array named `prices_to_pack`. This contains the price scales we wish to pack into a single `uint256` variable. We then return a single packed `uint256`.

```python
    packed_prices: uint256 = 0
    p: uint256 = 0
    # PRICE_SIZE: constant(uint128) = 256 / (N_COINS - 1)
    # PRICE_MASK: constant(uint256) = 2**PRICE_SIZE - 1
    for k in range(N_COINS - 1):
        # Shift 128 bits to the left
        packed_prices = packed_prices << PRICE_SIZE
        # k | 3 - 2 - k | prices
        # 0 | 1 | prices[1]
        # 1 | 0 | prices[0]
        p = prices_to_pack[N_COINS - 2 - k]
        assert p < PRICE_MASK
        packed_prices = p | packed_prices
    # prices[1] | prices[0]
    return packed_prices
```
First, we initialize two `uint256` variables, `packed_prices` and `p`, to 0. The for loop iterates from k=0 up to `N_COINS - 1`. Since there are 3 tokens in this contract, this loop will iterate for k=0 and k=1.

```python
packed_prices = packed_prices << PRICE_SIZE
```

`packed_prices` is shifted to the left by `PRICE_SIZE` which equals 128. Since the initial value of packed_prices is zero, this results in a zero value for the first iteration.

```python
p = prices_to_pack[N_COINS - 2 - k]
```

The value stored in prices to pack at the index of `N_COINS - 2 - k` is assigned to `p`. When `k=0` this is `prices_to_pack[3-2-0] = prices_to_pack[1]`.  When `k=1`, this is  `prices_to_pack[3-2-1] = prices_to_pack[0]`.

```python
assert p < PRICE_MASK
```

We assert that `p` is less than `PRICE_MASK`.

```python
packed_prices = p | packed_prices
```

The value of `p` is bitwise OR with `packed_prices`. For the first loop, `packed_prices` is still equal to 0, so after the bitwise OR, `packed_prices` is equal to the first price.
Inside the loop, for `k=0`, the `prices_to_pack[1]` is stored in the right most 128 bits, and for the next iteration `k=1`, we shift `packed_prices` to the left by 128 bits and store `prices_to_pack[0]` in the right most 128 bits. Finally we return `packed_prices`, a single `uint256` variable, where the first 128 bits store the price scale for `prices_to_pack[1]`, and the last 128 bits store the price scale for `prices_to_pack[0]`.
