# Writing the Token Code
Okay, so now that we've explained what we're going to do, let's go ahead and do it. We need to create a file, which we will call `RebaseToken.sol`. Then, we'll add the SPDX license identifier:
```
// SPDX-License-Identifier: MIT
```
Next, we will add the solidity version.
```
pragma solidity ^0.8.24;
```
Then, we create our contract:
```
contract RebaseToken {

}
```
Now, the next thing we're going to do is install OpenZeppelin because we are going to use the ERC20 contract from OpenZeppelin. So we can run the following command to install the dependency:
```bash
forge install openzeppelin/openzeppelin-contracts@v5.1.0 --no-commit
```
It is always a good idea to get the exact path to the dependency we are going to install, so let's search in the browser by searching for "openzeppelin github". This will take us to their github page, and we can find the latest release of the library, which is 5.1.0.

Once we have the correct version and path, we can add it to our rebase token. Then, we are going to include our named import.
```
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```
Now we need to make sure that we also set up our `foundry.toml` file with remappings:
```
remappings = [
    "@openzeppelin/=lib/openzeppelin-contracts/"
]
```
So we can now inherit from the ERC20 contract:
```
contract RebaseToken is ERC20 {

}
```
Now that we are inheriting from this ERC20 contract, we can create a constructor.
```
 constructor() ERC20("Rebase Token", "RBT") {

}
```
We are also going to add a few nat spec comments.
```
    /*
     * @title RebaseToken
     * @dev A simple ERC20 token with a name, symbol, and 18 decimals.
     */
```
```
/*
* @notice Mint the user tokens when they deposit into the vault
* @param _to The user to mint the tokens to
* @param _amount The amount of tokens to mint
*/
```
```
    /*
     * @notice Calculate the interest that has accumulated since the last update
     * @param _user The user to calculate the balance for
     * @return The balance of the user including the interest that has accumulated in the time since the balance was last updated.
     */
```
```
    /*
    * @dev The interest rate can only decrease
    */
```
Next, we are going to create the function that sets the interest rate.
```
function setInterestRate(uint256 _newInterestRate) external {
    // Set the interest rate

}
```
Now we also want to be able to mint the accrued interest for each user. So we can create an internal function to calculate the interest that has accrued.
```
function _mintAccruedInterest(address _user) internal view {
  // find their current balance of rebase tokens that have been minted to the user
  // calculate their current balance including any interest

}
```
We will need a function for a balance of.
```
function balanceOf(address user) public view virtual returns (uint256) {
        return _balances[account];
}
```
We will also create a function to return the linear interest.
```
function _calculateUserAccumulatedInterestSinceLastUpdate(address _user) internal view returns (uint256) {
  // get the time since the last update
  // calculate the interest that has accumulated since the last update
  // this is going to be linear growth with time
 //1. calculate the time since the last update
    //2. calculate the amount of linear growth
        //3. return the amount of linear growth
}
```
Finally, we can add the state variable for the user's interest rate, as well as initialize it.
```
    uint256 private constant PRECISION_FACTOR = 1e18;
    uint256 private s_interestRate = 5e10;
    mapping (address => uint256) private s_userInterestRate;
     mapping (address => uint256) private s_lastUpdatedTimestamp;
```
At this point in the video, we have the basic setup of our contract, with OpenZeppelin installed, remappings defined, and our first state and view functions. We are now on our way to completing our rebase token.
