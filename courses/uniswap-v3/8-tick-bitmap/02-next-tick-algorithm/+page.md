### Uniswap V3 Next Tick Algorithm

Now that we understand how ticks are stored inside the mapping called the tick bitmap. Next, let's take a look at the function called `nextInitializedTickWithinOneWord` which finds the next tick during a swap.

We'll start with a review of how a tick is broken down into two parts. Let’s say that we have an int24 tick equal to -200697.
```javascript
int24 tick = -200697
```

Here’s the same number in binary.
```javascript
111111110011110000000011
```
The first 16 bits are called a word position inside of Uniswap V3 and these 16 bits are converted into an int16. In this example when we evaluate these 16 bits as int16 this turns out to be -784.
```javascript
int16 = -784
```
The remaining 8 bits are called the bit position and it is evaluated as a uint8. In this example this turns out to be equal to 7.
```javascript
uint8 = 7
```
To find the next tick that’s less than or equal to the current tick, we’ll need to search right on the tick bitmap. The key for the tick bitmap is an int16. For this example, let’s say that we access the key -784. Again this key is referred to as the word position in the code of uniswap V3. From this key we get a value of a uint256.
```javascript
uint256
```
For this example I’ll use index 7 and we’ll say that it is somewhere around here, and that at index 7 the value is zero.

We’re looking for the next tick to be less than or equal to the current tick. Let's say that the current tick is at index 7. If we search for a one to the left of index 7 then we're searching for a tick that's greater than or equal to the current tick. So, what we need to do here is search for a one to the right of index 7.
To look for a one that's to the right of index 7, we first create a mask. This mask will have a one at index 7 and everything to the right of it is also equal to one. From the uint256 that is stored inside the tick bitmap, we want to get all 1s to the right of index 7.
To do this, we apply this mask and we’ll use a bitwise and with this value, which gives us a uint256 value where to the left of index 7 all of the numbers are equal to 0. This is because when we do an and with zero and zero it’s equal to zero and when we do a bitwise and with zero and one it’s also equal to zero. At index 7 and to the right, everything is a one, so when we do a bitwise and with 1 and 0 we get 0 and a bitwise and with 1 and 1 we get a 1.

In other words this operation of creating a mask and then doing a bitwise and, will give us all 1s to the right of index 7. From this value, what we want to find is the left most 1. And to do this, what we can do is find the most significant bit of this masked value.

In this example let’s say that everything is zero over here and the first one is over here. When we find the most significant bit from this mask value the index in this example will be equal to 1. This is the index where the first one occurs, starting from the left and then searching right.
Now that we know the next bit position, the next step is to calculate the next tick.
To find the next tick, we start off with the current tick, and to this we subtract the bit position. This will clear out the last 8 bits, turning them into all zeros. Then next we add the next bit position.

As an example, let’s say that this is our current tick, from this we minus the bit position, so all of these ones will turn into zeros.
```javascript
111111110011110000000011
-000000000000000000000111
```
Then we add the next bit position
```javascript
+000000000000000000000001
```
And that gives us a value that equals -200703.

The way to find the next tick that’s greater than the current tick is similar to the last example. Instead of searching right on the tick bitmap in this case we'll have to search left on the tick bitmap. Again, we'll start with the tick bitmap keys, which is an int16 and we’ll say that the key we’re accessing is -784. This will have a uint256 value. For this example we'll say that at the 7th index we have a zero.

From this uint256 value, we need to look for a one either to the left of index 7, or to the right of index 7. But which direction should we search for a one? If we were to search for a one to the right of index 7, then we are looking for a tick that is less than or equal to the current tick. So, to find the next tick that is greater than the current tick we need to look for a one to the left of index 7.

And to do this, we will first create a mask. This mask will have a one at index 7, and to the left of index 7 everything will be a one. To the right of index 7 everything will be zero.
From the stored tick bitmap value, we do a bitwise and with the mask. This gives us all zeros to the right of index 7. From the resulting value we need to find the index of the least significant bit.
In this example lets say that everything is a zero over here, and our first 1 is over here, and our next bit position will equal to 253.

To find the next tick, we start off with the current tick, minus the bit position and add the next bit position + 1 to make sure that it’s greater than the current tick.
Let's see what this looks like using binary. Here we have our example tick
```javascript
111111110011110000000011
```
From this we subtract the bit position, and this will turn all these one into zeros.
```javascript
-000000000000000000000111
```
Then, we add the next bit position
```javascript
+1111111111111101
```
Plus one:
```javascript
+0000000000000001
```
We started out with the current tick equal to -200697. Minus the current bit position which is equal to 7, add the next bit position which is equal to 253 and then plus one.
```javascript
-200697-7+253+1 = -200450
```
And we get that the next tick is equal to -200450.
