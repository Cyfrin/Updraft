### Creating the Vault Contract and Natspec Comments

Okay, let�s quickly address our comments before we move on. Notice how our comments don't have nice pretty colors. That's not very helpful. We forgot to add the second star so:
```javascript
 /**
 * @notice Set the interest rate in the contract
 * @param _newInterestRate The new interest rate to set
 * @dev The interest rate can only decrease
 */
 ```
 If we do a slash star star it will do nice colors for our natspecs.
```javascript
 /**
  * @notice Get the principle balance of a user. This is the number of tokens that have currently been minted to the user, no
  * @param _user The user to get the principle balance for
  * @return The principle balance of the user
 */
 ```
 We can go through and add this to all of the comments, the natspec comments on our functions. The next thing we need to do, is like we were saying earlier, we just closed our lib, we need to create the vault. This is going to be the place where our users come to deposit their ETH and then withdraw their ETH. It is also going to be the place where the rewards are going to be sent. It�s just, basically, a place to lock up all of the ETH in one place. So we're going to create a new file called:
 ```javascript
 Vault.sol
 ```
 Then we need to add SPDX license identifier:
```javascript
 // SPDX-License-Identifier: MIT
 ```
 Then we'll add our pragma solidity version:
```javascript
pragma solidity �0.8.24�;
```
Now, we can start writing the contract:
```javascript
contract Vault {

}
```
We are going to need to pass the token address to the constructor so we can mint and burn. We need to create a deposit function that mints tokens to the user and a redeem function that burns tokens from the user and sends the user the ETH. We also need a way to add rewards to the vault.
