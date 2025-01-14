## Implementing the `mintInterest` and `burn` Functions

Okay, let's finish `mintAccruedInterest`, which is an internal function we are creating. This function will mint any interest that has accrued since the last time a user performed an action, such as minting, burning, bridging later, or transferring. When this action occurs, we'll mint the tokens using a specific function. Any interest that has accrued since the last time their actual principal balance of minted tokens was updated will be minted in this function.

We previously walked through how we were going to do this. First, we will find their principal balance. How many tokens have actually been minted to them? Next, we will calculate their current balance, how many tokens they actually have including any interest accrued since the principle balance was updated last time. Then, we will calculate the number of tokens that need to be minted to the user, which is the difference between those two numbers. We'll call the internal `mint` function to mint the extra tokens, and set the user's last updated timestamp.

So, the first step will be to find the principal balance, which will be the same as before:

```javascript
uint256 previousPrincipleBalance = super.balanceOf(_user);
```
Next, we want to calculate their current balance, which will look like:
```javascript
uint256 currentBalance = balanceOf(_user);
```
The current balance will include any interest that has accumulated. After that, we will calculate the interest that has accrued, or rather, the amount that their principal balance needs to increase by. This looks like:
```javascript
uint256 balanceIncrease = currentBalance - previousPrincipleBalance;
```
Now we'll set the user's last updated timestamp to the current time
```javascript
s_userLastUpdatedTimestamp[_user] = block.timestamp;
```
This is because the balance was last updated now. Then we'll do an internal call to mint the user the `balanceIncrease`.
```javascript
_mint(_user, balanceIncrease);
```
That�s the mint function fully implemented.

Now let's add some NatSpec to our internal function:

```javascript
    /**
     *@notice Mint the accrued interest to the user since the last time they interacted with the protocol (e.g. burn, mint, transfer)
     *@param _user The user to mint the accrued interest to
    */
```
We have now fully implemented `mintAccruedInterest`!

We can see that we are using it in our `mint` function
```javascript
 _mintAccruedInterest(_to);
```
to check whether a user has any interest accrued before we mint them tokens.

Next we will move to implementing our burn function. This function is called when a user is redeeming their deposit and rewards. First, we are going to create our burn function:
```javascript
function burn(address _from, uint256 _amount) external{
  _mintAccruedInterest(_from);
  _burn(_from, _amount);
}
```
This function is called when we transfer tokens cross-chain.

Let's add in some NatSpec here
```javascript
    /**
     *@notice Burn the user tokens when they withdraw from the vault
     *@param _from The user to burn the tokens from
     *@param _amount The amount of tokens to burn
    */
```
This burn function will be called when the user redeems their rewards, and also their initial deposit. The burn function we�ve just created needs a way for the user to burn their entire balance, so let's add a little check:
```javascript
    if(_amount == type(uint256).max){
        _amount = balanceOf(_from);
    }
```
This is a common pattern to use, in order to mitigate dust or any left over tokens. Then, we will redeem and burn their entire balance. This is something we often see in DeFi protocols such as  AAVE V3.

That's our burn function!
