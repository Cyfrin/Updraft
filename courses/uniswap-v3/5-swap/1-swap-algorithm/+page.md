### Understanding the Swap Algorithm

The function that executes the swap inside Uniswap V3 is located in the contract called "Uniswap V3 Pool", and the function itself is called "swap". Before we examine the code, let's review the algorithm for the swap operation.

The key inputs to the "swap" function are:
-   **zeroForOne**: This boolean value dictates the direction of the trade. If `true`, the swap is from token 0 to token 1; otherwise it is from token 1 to token 0.
-   **amountSpecified**:  This numerical value can be positive or negative and signifies the quantity of tokens a user wishes to provide (positive number) or receive (negative number).
-   **sqrtPriceLimit**: This is the square root of the price used as the limit price for the trade.

Based on these inputs, the algorithm first determines the type of swap, which can be either "exact input" or "exact output". 
- An “exact input” implies that the user has specified the amount of tokens they want to give in the trade. It is determined by checking if the `amountSpecified` is positive. 
- An “exact output” implies that the user is specifying the amount of tokens that they would like to receive as a result of the trade. This is determined if the `amountSpecified` is a negative value.

After determining the swap type, the algorithm runs a `while` loop to calculate the amounts in and out. The loop continues as long as the "amount specified remaining" is not zero, and the current square root price has not reached the square root price limit.
- The "amount specified" is used to set the local variable "amount specified remaining".
- The current "square root price" is kept in a local variable and the loop continues while this price is not equal to the "square root price limit".

Within the loop, the algorithm first retrieves the next tick. Then using the next tick, the square root of the price of the next tick is calculated, which is labelled as  "sqrtPriceNext".
- It then calculates “amount in”, “amount out”, and the “fee” between the two price ranges, where the first range is from “sqrtPrice” and the second range is from the newly calculated “sqrtPriceNext”.
- It then updates the current square root price to the next square root price, setting the stage for the next loop iteration.

Based on the swap type, there is a different way in how “amount specified remaining” and “amount calculated” are updated.
- If the swap is an exact input, then “amount specified remaining” is decreased by the "amount in" plus the "fee". The “amount calculated” is equal to the "amount out".
- If the swap is an exact output, then “amount specified remaining” is increased by the “amount out”. And “amount calculated” is equal to the “amount in + fee”.

After the `while` loop completes, the algorithm now holds the following information.
- next liquidity
- next square root price
- next tick
- amount 0
- amount 1
- swap fee

Using these values, the state variables for liquidity, square root price, tick, and fee growth are updated.  The “fee growth” variable is used for tracking the cumulative swap fees. Then using the plus/minus amount 0 and plus/minus amount 1 if the amount is negative then tokens are sent out.

A swap callback is executed with the `msg.sender`. The `msg.sender` has to be a smart contract, which at this point sends the token to the Uniswap V3 pool contract. Finally the Uniswap V3 pool contract will check the token in balance.

### Deep Dive into the While Loop
Let’s further investigate the `while` loop.
The loop continues until “amount specified remaining” is equal to zero, or until the current square root price is equivalent to the square root price limit. 
- The local variable “amount specified remaining” is initialized using the input amount specified. Inside the loop, this “amount specified remaining” will either increment, or decrement until it equals 0.
- The current square root price is kept in a local variable, and the `while` loop continues until it equals the input “square root price limit”.
-  Inside the `while` loop the next tick is retrieved, and that tick is used to calculate "sqrtPriceNext". After that, the amount in, amount out and fee are calculated between the current price, and the next price.
- The current square root price is then updated using “sqrtPriceNext”.

Again, the update of “amount specified remaining” and the calculation of amount out is different depending on whether the swap is exact input or exact output.
- If exact input then the amount specified remaining is subtracted by the "amount in + fee".  “amount calculated” is equal to “amount out” and the token will come into the pool.
- If exact output, the amount specified remaining is added to amount out and “amount calculated” is “amount in” plus “fee”. The token will leave the pool.
- Then in both scenarios the local variables for “liquidity, sqrtPrice, tick, and fee” are updated.

Finally, the loop will return “amount specified remaining” and “amount calculated”. Based on these values, the amount of token 0 and token 1 for both input and output are calculated.

### Calculating Amount In, Amount Out, and Fees

The function being called to calculate the amount in, and amount out is “computeSwapStep”.
- This function first checks if the swap is an "exact input" or "exact output".
- If “exact input”, then it calculates the max amount in between the “sqrtPrice” and the “sqrtPriceTarget”.
- If “exact output”, it calculates the max amount out between the “sqrtPrice” and “sqrtPriceTarget”.
- It then calculates the “sqrtPriceNext”.

Let’s consider an example where the swap is “0 for 1”, where token 0 is the input and token 1 is the output. Let’s say some quantity of tokens X came in, and some quantity of token Y came out. The current price is the “square root of P” and the target is the “square root of P target”.  As the tokens come in, the current price shifts from right to left and the liquidity would increase in token X and decrease in token Y.
- The "max amount in" is the maximum amount of the token that can come in before the current price “sqrtPrice” reaches the “sqrtPriceTarget”. 
- The “max amount out” is the maximum amount of token that can go out before the current price “sqrtPrice” reaches the “sqrtPriceTarget”.
 
Let’s take a look at what “sqrtPriceNext” is.
- The “sqrtPriceNext” is the next square root price that is the result of adding or taking out some amount of tokens.

For example if we started our liquidity in this location, and some amount of token X came in. The current square root price before the tokens came in was on the right, and after the tokens came in, the next square root price would be over here.  This is what the code refers to as "sqrtPriceNext". This function then returns the calculated amount.