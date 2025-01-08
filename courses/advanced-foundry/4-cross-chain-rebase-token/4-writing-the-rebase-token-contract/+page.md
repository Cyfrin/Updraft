Now that we've explained what we're going to do, let's go ahead and do it. 

So, we need to create a file. We're going to call this `RebaseToken.sol`. And then we're going to do the usual thing:

```javascript
// SPDX-License-Identifier: MIT
```

Don't think that normally has a space there? Looks funny. I'm going weird every time I. What's going on? 

```javascript
pragma solidity ^0.8.24;
```

I had a weird bug there where it was removing that line every time I clicked save. Weird. 

Anyway, then we're going to do our `pragma solidity` 

```javascript
contract RebaseToken is ERC20 {
}
```

like that. Now the next thing I'm going to do is, I'm actually going to install OpenZeppelin because I'm going to use the ERC20 contract from OpenZeppelin, like you would have seen in the ERC20 section of this course. So, we can do:

```bash
forge install openzeppelin/openzeppelin-contracts
```

You know what? We are going to go to the GitHub because we want to do pinned imports. So, at v5.1.0 is the last at v1.0. So if you're doing this at a later date then that is the version that I'm using. And we might need no commit. Yep, we do. 

```bash
forge install openzeppelin/openzeppelin-contracts --no-commit
```

and that will install OpenZeppelin so that we can use their ERC20 contract. So, we don't have to write all the functionality from scratch. There is going to be some modifications that we're going to need to do there. Amazing. Now we can import. We're going to do named imports because we are good developers. And this is the correct path. Thanks, copilot! So OpenZeppelin at OpenZeppelin/contracts/token/ERC20/ERC20.sol. Now the other thing we need to do is in our foundry.toml we need to add the remapping. Remappings. Every time I do this, I always forget exactly what it needs to look like. I think it's not curly square brackets and then in here I can go at OpenZeppelin slash equals lib slash OpenZeppelin-contracts slash.  Yep, that is the cracked path. So now, hopefully, the squiggly line should go away. But, sometimes it still doesn't. Let's do a little forge build to see if it's actually finding it correctly. And it is! So now, we can inherit from the ERC20 so we can use the keyword is ERC20 and then we need to create the constructor. So, constructor. 

```javascript
import "ERC20.sol" from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

```javascript
uint256 public userInterestRate;
```

```javascript
event InterestRateSet(uint256 newInterestRate);
```

```javascript
constructor() ERC20("Rebase Token", "RBT") {
}
```

initialize the ERC20 constructor and we are going to call. So, the first argument to the constructor the ERC20 constructor is the name. We're going to call it RebaseToken. Then the ticker, we are going to do RBT. Then we need the curly braces for the constructor. And we're not sure what we're going to do in here yet, so we're going to leave it empty for now. Amazing! We have the initial structure of our RebaseToken, we have an ERC20 token imported from OpenZeppelin. The first thing about RebaseToken is that we have that funky balance of function. So, yeah, let's let's put in some of our functions. Actually, you know what? We're not going to do that first. The first thing we're going to do is, we're going to add our natspec comments, so we can do slash star to open the comment and star slash to close it, and then we can do a little star, and then we've got the title, second star is going to be the author. 

```javascript
// /nat-contract
// /nat-function
// /nat-event
// /nat-statevariable
```

```javascript
/**
 * @title Rebase Token
 * @author Clara Nightingale
 * @notice This is a cross-chain rebase token that incentivizes users to deposit into a vault and gain interest in rebase rewards.
 */
```

author Clara Nightingale, and then we are going to do a notice to explain what this contract is. So, we're going to say this is a going to be a cross-chain rebase token that incentivizes users to deposit into a vault and gain interest in rebase rewards. And we're also going to say, at dev, at notice again actually, the interest rate in the smart contract can only decrease. The other thing that I wanted to say here actually is that um, the more comments that you add, the more that the AI or if you're like if you're using copilot, can understand what you're trying to create. So then when you're writing functions it will give more helpful instructions for how to write your your functions and things like that. So it will a better to be able to predict what you want to write as long as you do as many comments um, that are as informative as you can. So, can only decrease um, what was the other things we said, at notice? Oops. The each user will have their own interest rate that is the global interest rate at the time of depositing. And, we can leave it at that for now. Right. So now, we can make that fun balance of function. Now, actually the first function we're going to create is a way for our our contract owner to be able to set the interest rate. Now, there are going to be some bugs in the smart contract while I'm initially writing it. So, you're going to have to bear with a little bit. And then we're going to think through things as we go, and then try and figure out the problems. So, I'm not going to worry about access control, just initially, because we're going to do things a little bit differently. But, we are going to create a function called set interest rate. And this is going to take a uint256 which is going to be some new interest rate. We're going to use the underscore because it's a functional parameter. And then we're going to say this is external because we don't need to be able to call it inside this contract. And then we need to set the interest rate. So, we need a state variable that is going to keep track of our interest rate. So at the top, we're going to create a uint256 public interest rate. Now this is not going to be constant or immutable, but it is a storage variable, so we're going to add s underscore, and then we're going to initialize it with a value. And I'm going to initialize it with 5E10 because we are going to be working in 18 decimal precision. What does that mean? Well, as you learned with Patrik with the stablecoin project, you cannot work with decimals in Solidity. So, you can't have 1.1 tokens. The problem here is that you have then have issues with precision because what if I send someone 1.1 tokens? And as you know all tokens are in 18 decimal precision. That means that 1.1 is instead converted to 11 * 10 to the power of 17. So, 11 with 17 zeros. And if you were to divide that by 10 to the power of 18, then you would get back to 1.1. All this to say that this represents not with 8 0s 5 which is in the decimal version or percentage, so remember that we would have to * that by 100 to get the percentage. So 0. with 6 0s 5% of tokens per second. So, for example, let's say we wanted to make it 50% per second. The interest rate is 50% of your deposit per second. So in decimals, it would be 0.5 as 50% converted to a decimal is 0.5, then convert that to 18 decimal precision, which would be 5E17. And we're going to also make this private. Now this doesn't really matter because even though you can't explicitly read it from the blockchain, someone could inspect the storage layout and then retrieve this variable, so just remember the private does not mean that no one can access the variable, they still can. It's just a little bit more difficult. But, also inheriting smart contracts can't access this variable. Doesn't really matter in this context, but I'm going to make it private because by default, I usually make things private. I think it's a good thing to do. So, what we need to do in here is we need to set the interest rate just like that. We set the storage variable to the new interest rate. Now the other thing that we said that is interesting is that we want the interest rate in the smart contract to only decrease. So, we need to add a little check for that. So, if the new interest rate is less than the old interest rate, then we want to revert. But we don't want to revert with this string. We instead want to emit a custom error, because we're great like that. Emit. And then we're going to add the name of the contract: RebaseToken underscore underscore interest rate can only decrease. And then we're going to pass in the previous interest rate and the new interest rate. And then we need to create this error, and actually the other thing I'm going to do is, I'm going to copy the layout of the contract at the top of this contract up here. I'm just going to check it up here so that we can check where things need to go. So we've got the version up here. Imports there. Interfaces, libraries, contracts, and then errors. So, in here, we need to create an error: RebaseToken interest rate can only decrease. And then we're going to pass in uint256, the old interest rate, uint256, the new interest rate. Awesome, we've created a function to set the interest rate. Actually, I'm just going to add in the comments we should've done that before. So, go at star. This sets the interest rate in the contract. Then we've got a parameter: the new interest rate to set. And we've got a dev: The interest rate can only decrease. I want you to take note of the fact that, if the interest rate is trying to decrease, it's going to revert. That's going to be important later. Right. Let's move on. We need to create a way for users to get their rebase tokens. We need a mint function. We also need a way for users to burn their rebase tokens, if they're redeeming. So we're going to have we're going to have some kind of deposit function in a vault and we're going to have a redeem function in a vault. We haven't made that yet, but when those functions are called, mint and burn are going to be called respectively. So, we need to make those functions. So, let's first create mint. Let's create some natspec. Nope, let's create mint. So function mint, and it is going to take an address and then a uint256 which is the amount, and this is going to be called by the vault. And then also, by the pool contract when we make our token cross-chain. But don't worry about that yet. So external again. Don't worry about the fact that anyone can call this at the moment. We're going to fix that. And then, we are going to call underscore mint, which is implemented inside our ERC20 contract that we wrote that we inherited from OpenZeppelin. The other thing that we want to do in this mint function is that on the at the point of minting, we want to set the users interest rate. We want to set their personal interest rate. So, we need to create a state variable that is going to keep track of the users interest rates. So, we're going to create a mapping of address to uint256. We're going to make this Sure, we're going to make this public, you know, because then someone else can come along and query it. User interest, right. Now, you know what? We're going to make it private, we're going to make getter. Just because it's a little bit cleaner. And then, we can go ahead and make that little getter right now. Function get user interest, rate. And, we need to take in some address which is the user. And this is external. Yep, it is also going to be view because we're not modifying any state. And then it's going to return uint256. And, we are going to return the user's interest rate from that mapping. Now, let's just add in some helpful natspec slash star star. Notice, gets the interest rate for the user. @param user The user to get the interest rate for. @return The interest rate for the user. Star slash. Now, let's implement that function now. So we've got a function called underscore mint accrued interest and it is going to take an address. This will do is it will mint the any interest that has accrued since the last time they performed any actions. Do you remember we were saying earlier when they perform any actions such as minting, burning, transferring, we're going to mint them any accrued interest. If they are just asking what their balance is, they're calling balance of. Then, we can calculate what their balance is. We don't need to mint it to them because we don't want to modify any state. If they are calling mint, then before we set their interest rate again, we want to mint any accrued interest. So, let's implement that function now. So, we've got a function called underscore mint accrued interest and it's going to take an address. 

```javascript
function mintAccruedInterest(address user) internal {
}
```

So, we've got a function called mint accrued.  Oh, this is spelled wrong. Rude interest. And it's going to take an address. It's going to be internal. And in here, what do we need to do? We need to find their current balance of rebase tokens that have been minted to them. We also need to calculate their current balance including any interest. balance of. 

```javascript
function mintAccruedInterest(address user) internal {
    // (1) find their current balance of rebase tokens that have been minted to the user -> principle balance of the user
    // (2) calculate their current balance including any interest -> balanceOf the user
}
```

We need to calculate their current balance of rebase tokens that have been minted to the user principle balance of the user, calculate their current balance including any interest, balance of the user. And then we need to calculate the number of tokens that need to be minted to the user.  So if this is number one and this is number two, so we've got a principal balance, the number of the number of tokens that have been minted to them and then number two, the actual number of rebase tokens that they are entitled to. If we do 2 - 1, then we will get the number of tokens that need to be minted. 

```javascript
function mintAccruedInterest(address user) internal {
    // (1) find their current balance of rebase tokens that have been minted to the user -> principle balance of the user
    // (2) calculate their current balance including any interest -> balanceOf the user
    // calculate the number of tokens that need to be minted to the user -> (2) - (1) 
}
```

And then we can call call mint to mint the tokens to the user. And this is going to be underscore mint, it's the internal mint, because otherwise we're going to have a recursive loop. That wouldn't be very good. Then, what we want to do is we want to update their last updated timestamp. Now this is also useful because when someone is calling mint and this is called first, we we, you might think inside mint when you're setting the user's interest rate. Okay, well, we also want to keep track of the time at which they minted so that we can calculate the amount of interest that has been accrued that has accrued. Well, there's no need because actually, we're going to set the users last updated timestamp. 

```javascript
function mintAccruedInterest(address user) internal {
    // (1) find their current balance of rebase tokens that have been minted to the user -> principle balance of the user
    // (2) calculate their current balance including any interest -> balanceOf the user
    // calculate the number of tokens that need to be minted to the user -> (2) - (1) 
    // call mint to mint the tokens to the user
    // set the users last updated timestamp 
}
```

This will be set anyway, so this will just be zero. This will be zero. Zero minus zero zero. We'll call mint with zero and then it will set their last updated timestamp. So, regardless, they're going to have a last updated timestamp. Let's just create that storage variable now. We're going to create a mapping, there, an address to uint256, private s underscore last updated timestamp. And we're also going to add a user here, just to be extra clear, that this is the last time that specific users balance was updated. Last time tokens were minted to them, and then we can do that under here. We can set it, so we can do s underscore user last updated timestamp of the user is the block.timestamp. Now, before we finish off this function, it's probably going to be useful to make that balance of function, because we're going to need it in here anyway. So, let's create our function and a balance of and this is going to take the address of the user that we want to query the balance of, and then it needs to be public view. And, we're going to override the interface. It's also going to return a uint256. Oops, I haven't spelled that correctly. returns uint256. And then we want to do some fun stuff in here. So, the first thing that we want to do is, we want to get the current principle balance of the user. (The number of tokens that have actually been minted to the user).
 

```javascript
function balanceOof(address user) public view override returns (uint256) {
}
```

```javascript
function mintAccruedInterest(address user) internal {
    // (1) find their current balance of rebase tokens that have been minted to the user -> principle balance of the user
    // (2) calculate their current balance including any interest -> balanceOf the user
    // calculate the number of tokens that need to be minted to the user -> (2) - (1) 
    // call mint to mint the tokens to the user
    // set the users last updated timestamp 
    s_userLastUpdatedTimestamp[user] = block.timestamp;
}
```

```javascript
function balanceOof(address user) public view override returns (uint256) {
    // get the current principle balance of the user (the number of tokens that have actually been minted to the user) 
}
```

Get the current principle balance of the user (the number of tokens that have actually been minted to the user) and then we want to multiply the principle balance by the interest rate. 

```javascript
function balanceOof(address user) public view override returns (uint256) {
    // get the current principle balance of the user (the number of tokens that have actually been minted to the user) 
    // multiply the principle balance by the interest rate (the number of tokens that have accumulated in the time since the balance was last updated) 
}
```

Multiply the principle balance by the interest rate (the number of tokens that have accumulated in the time since the balance was last updated) and then return the balance of the user, including the interest that has accumulated since the last update.

```javascript
function balanceOof(address user) public view override returns (uint256) {
    // get the current principle balance of the user (the number of tokens that have actually been minted to the user) 
    // multiply the principle balance by the interest rate (the number of tokens that have accumulated in the time since the balance was last updated) 
    return super.balanceOf(user) + calculateUserAccumulatedInterestSinceLastUpdate(user);
}
```

Return the balance of the user including the interest that has accumulated since the last update.

```javascript
function mintAccruedInterest(address user) internal {
    // (1) find their current balance of rebase tokens that have been minted to the user -> principle balance of the user
    // (2) calculate their current balance including any interest -> balanceOf the user
    // calculate the number of tokens that need to be minted to the user -> (2) - (1) 
    // call mint to mint the tokens to the user
    // set the users last updated timestamp 
    s_userLastUpdatedTimestamp[user] = block.timestamp;
}
```

```javascript
function balanceOof(address user) public view override returns (uint256) {
    // get the current principle balance of the user (the number of tokens that have actually been minted to the user) 
    // multiply the principle balance by the interest rate (the number of tokens that have accumulated in the time since the balance was last updated) 
    return super.balanceOf(user) + calculateUserAccumulatedInterestSinceLastUpdate(user);
}
```

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
}
```

Notice, calculate the interest that has accumulated since the last update. @param user The user to calculate the interest accumulated for. @return The interest that has accumulated since the last update. 

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
}
```

We need to calculate the interest that has accumulated since the last update, this is going to be linear growth with time. 1, calculate the time since the last update.

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
}
```

2, calculate the amount of linear growth, principle amount (user interest rate * time elapsed).

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
}
```

(Principle amount) + (user interest rate * time elapsed), deposit: 10 tokens.

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
}
```

Deposit, 10 tokens, interest rate 0.5 tokens per second, time elapsed is 2 seconds.

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
}
```

Interest rate 0.5 tokens per second. Time elapsed is 2 seconds. 

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
    // 10 + (10 * 0.5 * 2) = 10 + 10 = 20
}
```

10 + (10 * 0.5 * 2) = 10 + 10 = 20.  

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
    // 10 + (10 * 0.5 * 2) = 10 + 10 = 20
    uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[user];
}
```

10 + (10 * 0.5 * 2) = 10 + 10 = 20.  uint256 timeElapsed = block. timestamp - s_userLastUpdatedTimestamp[user].

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
    // 10 + (10 * 0.5 * 2) = 10 + 10 = 20
    uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[user];
    uint256 linearInterest =
        (s_userInterestRate[user] * timeElapsed) / PRECISION_FACTOR;
}
```

uint256 timeElapsed = block. timestamp - s_userLastUpdatedTimestamp[user]. And, we're going to call this linearInterest equals.  Now, we need the current time block. timestamp - the last time the user's balance was updated.  The last time that they were minted tokens. How much time has elapsed? How many tokens have accrued since their interest was last minted to them? s underscore user updated last.  User last updated timestamp, for that user. Then, we need to calculate the linear interest which is going to be some multiplier. So, we can actually bring out this principal amount. So, what we can actually do is we can divide out by principal amount and put that on the outside. And then we can * that by one plus one * blah blah blah blah blah, which you can just remove that. This 1 + user interest rate * time elapsed. So, here you can see, we've got the principal amount and then we've got the principal amount * the user interest rate * the time elapsed. Let's turn this into a comment. So, let's do that now. So, we need to first calculate the time elapsed. So, we've got uint256 and we're going to call this time elapsed equals.  Now, we need the current time block. timestamp - the last time the user's balance was updated.  The last time that they were minted tokens. How much time has elapsed? How many tokens have accrued since their interest was last minted to them? s underscore user updated last user last updated timestamp for that user.  Then, we need to calculate the linear interest, which is going to be  

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
    // 10 + (10 * 0.5 * 2) = 10 + 10 = 20
    uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[user];
    uint256 linearInterest = (s_userInterestRate[user] * timeElapsed) / PRECISION_FACTOR;
}
```

```javascript
function balanceOof(address user) public view override returns (uint256) {
    // get the current principle balance of the user (the number of tokens that have actually been minted to the user) 
    // multiply the principle balance by the interest rate (the number of tokens that have accumulated in the time since the balance was last updated) 
    return super.balanceOf(user) + calculateUserAccumulatedInterestSinceLastUpdate(user);
}
```

```javascript
/**
 * @notice Calculate the interest that has accumulated since the last update
 * @param user The user to calculate the interest accumulated for
 * @return The interest that has accumulated since the last update
 */
function calculateUserAccumulatedInterestSinceLastUpdate(address user) internal view returns (uint256) {
    // we need to calculate the interest that has accumulated since the last update
    // this is going to be linear growth with time
    // 1. calculate the time since the last update
    // 2. calculate the amount of linear growth
    // (principle amount) + (user interest rate * time elapsed)
    // deposit: 10 tokens
    // interest rate 0.5 tokens per second
    // time elapsed is 2 seconds
    // 10 + (10 * 0.5 * 2) = 10 + 10 = 20
    uint256 timeElapsed = block.timestamp - s_userLastUpdatedTimestamp[user];
    uint256 linearInterest = (s_userInterestRate[user] * timeElapsed) / PRECISION_FACTOR;
    return linearInterest;
}
```

uint256 timeElapsed = block. timestamp - s_userLastUpdatedTimestamp[user].  linearInterest equals 1 plus 1 plus.  This is effectively one in 18 decimal precision. Remember if you have one token in 18 decimals that is 1e18. If I have one ether, then in my smart contract that would look like 1e18. So, this represents one, and this is that one here because it * by the principle amount, that's like principle amount plus principal amount * any interest. * the interest rate * the time elapsed. Like we talked about before. So because this interest rate is in 18 decimal precision already, because we're doing this addition, we need to make sure that the units are the same. So, we need to make sure that this number one is in the precision factor. Now because we are doing a multiplication here, we've got precision factor * precision factor. Now, we've got 6 decimal precision, so, we need to divide by the precision factor to get it back to 1e18. Hopefully, that makes sense after the Dfy stable coin projects. But, it is a little bit confusing, so, don't worry if you need to go over this a couple of times. And let me know in the GitHub repository associated with this course, if there's an issue, if you find this confusing, because, if you don't understand it, I'm sure other people don't understand it. So, feel free to ask all your questions in there. So, we have done a lot already. We still need to make some burning functionality for when someone redeems their tokens and also some transferring functionality. But, just to recap what we have done, we have created a rebase token that is an ERC20. So, we have created a constructor that also sets the constructor for the ERC20 contract. We have created a function for the protocol owners to be able to set the interest rate. We haven't actually set at the moment anyone can just come here and here, and set the interest rate. But, we will be fixing that. We have also specified that the interest rate can only decrease. When a user mints their tokens, we check if they need any interest to be minted to them at the moment. And in here, we also set their now last, the last time that we minted is any interest to them. Their last updated timestamp.  Oops, which is up here, the user last updated timestamp. So we can be sure any time elapsed is going to be set, is going to be calculated accurately. We then set the interest rate for that user to be the interest rate in the smart contract at the time that they call mint. And then, we call underscore mint, which is the mint specified in the ERC20 contract in here. Yeah, actually, you