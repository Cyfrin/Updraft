## Exercise 1: Calculating the Amount of USDC for a Swap

Let's start with the first exercise where we'll use a function called `get_dy_underlying` to determine the amount of USDC we'll receive after swapping in 1,000,000 DAI. 

The function `get_dy_underlying` has three inputs: 

* **Index of the token we are putting in**
* **Index of the token we are getting out** 
* **The amount of the token we are putting in**

**To complete this exercise, we need to write code that calls the `get_dy_underlying` function with the appropriate inputs, and use the returned value to calculate the amount of USDC we'll get.**

First, we can initialize a `uint256` variable to store the returned value:
```javascript
uint256 dy = 0;
```

Then, we need to call the function `get_dy_underlying` with the correct indexes. In this case, DAI is token index 0 and USDC is token index 2. We'll also put in 1,000,000 DAI:
```javascript
dy = get_dy_underlying(0, 2, 1e6 * 1e18);
```

Now that we have the calculated amount of USDC in our `dy` variable, we can log it to the console for confirmation:
```javascript
console.log("dy %e", dy);
```

To verify that our code works, we can add an assertion that the calculated amount of USDC (the `dy` variable) is a valid USDC amount. You can find the correct USDC amount for a 1,000,000 DAI swap in the example file. 

Here's the full code:
```javascript
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here 
    uint256 dy = 0;
    dy = get_dy_underlying(0, 2, 1e6 * 1e18);
    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Remember that this example is using the `get_dy_underlying` function from `IStaleSwap3Pool.sol`. If you need a refresher on how to call this function, you can find it in the `/src/interfaces/curve/IStaleSwap3Pool.sol` file. 

Let's move on to Exercise 2! 
