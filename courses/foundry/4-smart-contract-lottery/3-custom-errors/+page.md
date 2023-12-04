---
title: Custom Errors
---

_Follow along the course with this video._



---

## Implementing the Entrance Fee

So, remember when we said our raffle had an entrance fee? Well, let's get to it and actually start using it to ensure only people who have paid can enter the raffle.

Our entrance raffle function is a `public payable`. However, it might be better to make it `external payable` for better gas efficiency. So, let's make that switch now.

The shift to `external payable` makes sense since we're highly unlikely to have any internal function calls to `enterRaffle`, and `external payable` functions tend to be slightly more gas-efficient when called from outside the contract. Now that we've done that, let's do a check to ensure the correct quantities are transferred.

Here's where the require statement comes into play.

```js
require(msg.value >= _entranceFee, "Not enough ETH sent!");
```

This statement checks if the entrance fee meets a certain condition - in this case, that the sent ETH is greater than or equal to the entrance fee. But if it doesn't, our function will revert and throw the user-friendly error message "Not enough ETH sent!".

This leads us to our first major update to our knowledge of Ethereum.

## Custom Errors Vs `Require`

Traditionally, the `require` function in Solidity has been the go-to method for incorporating error checking in the code. But all that changed with Solidity version 0.8.4 which introduced custom errors. This development allows you to define errors with custom names and, more importantly, custom errors happen to be more gas efficient.

Here's how we could use it:

```js
// Define the custom error at the top of your contract
error NotEnoughETHSent();
// Invoke the custom error
if (msg.value < _entranceFee) {
    revert NotEnoughETHSent()
};
```

To give you a practical understanding of the gas saved, let's see an example. Two similar functions coded twice, one using revert with custom error and the other with require.

```js
// Revert with custom error
function revertWithError() public pure{
    if(false){
        revert ExampleRevert_Error();
    }
}
// Revert with require
function revertWithRequire() public pure {
    require(true, "ExampleRevert_Error");
}
```

If we were to deploy both the functions on Remix and execute them, despite both reverting (which inherently costs gas), the function with the custom error (`revertWithError`) turns out to be more gas efficient, costing **142 gas** to the **161 gas** of the `require` based error handling.

So, in essence, this is a practical example of "learning something to never use it again".

That's it, folks! By now, you know how to work with custom errors and some best practices to consider when writing these reverts. Stay tuned for more Ethereum Smart Contract updates and practical takes. Here's to better (and more gas-efficient) coding!
