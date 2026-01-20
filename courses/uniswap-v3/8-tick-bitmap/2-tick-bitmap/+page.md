## Uniswap V3 Tick Bitmap and Position

In Uniswap V3, liquidity positions are defined by a lower and upper tick. These two ticks are stored in a mapping called the tick bitmap. During a swap, the next tick where liquidity exists is located by calling a function called `nextInitializedTickWithinOneWord`. We'll explore how this function works to find the next tick. 

The tick bitmap is a mapping from `int16` to `uint256`. A tick, which is an `int24`, is broken into two parts. The first 16 bits of the tick, moving from left to right, are stored as an `int16`. This is called the word position. The next 8 bits are stored as a `uint8`, which is called the bit position. For example, let's say we have a tick equal to `-200697`. The first 16 bits converted into a decimal are equal to `-784`. The last 8 bits are converted into the decimal `7`.

The process of storing the tick in the tick bitmap looks like this:

1.  Break the `int24` tick into an `int16` word position and a `uint8` bit position.
2.  Using the word position, access the `uint256` value in the tick bitmap mapping.
3.  Create a mask consisting of 256 bits set to zero, except for a single bit set to one at the index of the bit position.
```javascript
mask = 0000...0010000
```
4. Perform an exclusive or with the current value of the tick bitmap at the word position.
```javascript
current_value XOR mask
```
5. This will set the bit at the bit position to `1` if it was `0` or vice versa, leaving the other bits unchanged.

The process of getting a tick from a tick bitmap looks like this:

1. Get the first 16 bits which represent the key for the tick bitmap.
```javascript
first 16 bits = 1111111100111100
```
2. The tick bitmap will return a `uint256`.
```javascript
uint256 = 0111....010
```
3.  Think of the `uint256` as a sequence of 256 bits.
4. Let's say that we want to convert a bit at the 7th index to a tick, then we rewrite 7 as 8 bits.
```javascript
7 = 00000111
```
5. Append these 8 bits to the 16 bits we got earlier to retrieve the tick.
```javascript
tick = 1111111100111100 00000111
```
