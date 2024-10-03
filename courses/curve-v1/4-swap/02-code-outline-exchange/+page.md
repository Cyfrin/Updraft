## Introduction to the exchange function

We're going to take a walk-through of the *exchange* function in the *StableSwap* pool. 

### Exchange Function Walk-through

The *exchange* function has the following steps:

1. **Normalizes token balances (memory)**
  This is the first thing the function does. It makes sure all token balances have 18 decimals, regardless of the actual token's decimal places.
2. **Transfer token in (memory)**
  The *exchange* function will then transfer the token *in* to the pool.
3. **Update token in balance (memory)**
  The normalized balance of the token *in* is stored in memory. 
4. **Calculate token out balance**
    * **Calculate A**
    * **Calculate D**
    The function will calculate the new balance of the token *out*. 
5. **Calculate token out**
  The difference between the new token *out* balance and the old token *out* balance is calculated. 
6. **Calculate swap fee**
  The *exchange* function calculates the swap fee which is taken out of the token *out*. 
7. **Update token balances (storage)**
  This step updates the token balances in storage to reflect the changes. 
8. **Transfer token out**
  Finally, the *exchange* function transfers the token *out* to the user.

This walk-through provides a basic understanding of the *exchange* function. 