## Finish the Token Contract 

We're going to take a look at our openzeppelin ERC20 contract, just to check that there's nothing that we want to override or change. 

We've got the function name which obviously just returns the name of the token, the symbol, the number of decimals which by default is 18. You could override this if you want a different number of decimals, like USDC has six. The total supply. Now, in order to get an accurate total supply of tokens that have been minted, also but also any interest that is owed to users, then we would need to loop through every single user in the protocol, calculate their balance, which would then account for any interest that they are owed, and then update this total supply. We could override that function and do that. However, we could get some kind of DOS if like, denial of service, if the array of users becomes extremely long, therefore we have to loop through a lot of them and ca do this calculation for a lot of people. So, we are actually going to leave this total supply as is, and just accept that if you call total supply, this is going to be any minted tokens, not including any interest that is owed, so it's not going to be 100% accurate, but that is just a known floor of this protocol. 

Um, balance of which we have overridden. We are going to need to implement transfer, and the reason for this is because we want to be setting the interest rate for users that are receiving a transfer, because you can imagine if I send my tokens to Alice, and Alice hasn't yet deposited into this protocol, she does not yet have an interest rate and those tokens are not going to earn her any interest. However, if she already has an interest rate, if she's already deposited into the protocol, then we don't want to be overriding that, because then there is an attack vector there, where people can purposefully drive other users' interest rates down by sending them small amounts of tokens which would not be a good thing. 

So, there's a couple of things that we need to change in here. So, we're going to need to override it, which is fine, because it's virtual, allowances, this is fine, because it'll all work like an ERC20, like normal. We can have allowances, and we actually need to have this when we make this token contract work cross-chain, and the same for approvals. We need to have approvals, for the reason I just just said. 

And then, the same as transfer, we need to override transferFrom, for the exact same reasons, as we need to override transfer. Internal transfer is fine. This is going to work exactly the same. We're not going to update that. And, if you have a look here, you can see that the internal mint and internal burn functions, both call update, so update is the function which is called to update this balances array, and also update the total supply. So, we don't need to change any of that, because that all works the same as normal. And then, we have a couple more internal approve functions, and then the spend allowance internal function, which just calls these internal pre-functions, so, the only thing that we have left to do before we go ahead and make some modifications, is to create our transfer and transferFrom functions. We need to put this in before the internal functions, so we create a function called transfer, and transfer takes an address, the recipient Oh, my dyslexia is making it difficult to spell out this, this spell correctly? Yes. I think so. And then, uint256 the amount sent, then if we check in ERC20, we go up to Let me search for transfer Oops, and then actually, a little hack, if you put end space, then it'll take you to the function, because obviously, the end of this word is end function. 

Um, that's something that one of the auditors on the Cypher Team told me, which is a pretty cool little trick there. Um, anyway, so it takes an address uint256, which we've already done, it's public virtual. We need public override returns bool, so let's write that in, public override returns bool, before we do any kind of transfer, before we actually send the tokens to the recipient, we need to check if any interest has accrued for either the message sender or the recipient, so we can call _mintAccruedInterest for msg.sender, and then we can do the same for the recipient, so that, if they have any pending interest that hasn't yet been minted, then it'll be minted to them, so, that their balances are now up to date, because this transfer counts as a type of interaction with the protocol. We are also going to put in the check for 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(msg.sender);
}
```
if they are sending their entire balance, and thanks copilot, that is exactly what we want. We're just going to double check it, if the amount is equal to the maximum value of uint256, then the amount they want to send is their balance. 

And then, the final thing that we want to do is we want to check if the recipient already has an interest rate, and if they don't, we want to set it with the interest rate of the sender. Now, you might be thinking here, how about we set it with the interest rate that is currently in the smart contract? And this actually wouldn't work, because transfer is also not just going to be used from sending my tokens to Alice, but also, I might be sending my tokens to another wallet, and I want to make sure that I inherit my initial interest rate. So, we need to add in another check, if 
```javascript
if (balanceOf(recipient) == 0) {
  s_userInterestRate[recipient] = s_interestRate;
  s_userLastUpdatedTimestamp[recipient] = block.timestamp;
}
```
balance of the recipient is zero then we don't want to do that. Sorry. Then, we want to set the user interest rate for the recipient to be equal to the interest rate of the sender. So, if they have not yet deposited into the protocol, or received any tokens previously, then we inherit their interest rate. So, one interesting thing to think of here is the fact that if I use one wallet to deposit into the vault, and then I use another wallet to deposit into the vault at a later rate, my first wallet is going to have a higher interest rate than my second wallet. If I then send my tokens from the first wallet to the second wallet, so they're all in one wallet, then the interest rate of my entire allocation of rebased tokens is going to be at the lower interest rate. And, this is fine. That is just the way that the protocol has been designed. So, if we were writing a nice little readme, we would add into the readme this as a known, not issue necessarily but a known sort of feature of the protocol. 

Additionally, that means that there's another bug here, which means that if I was to deposit using one wallet, and then to deposit using a second wallet at a later date, and then I sent those tokens from the second wallet to the first wallet, all of the tokens in my wallet would be using that initial first higher interest rate which kind of goes against the reason why, you know, if they deposit at a later date, we want to make sure that their interest rate is updating to the lower value. However, as I said, in the readme for this smart contract, we can add that as a known bug, because it's not really a bug in the sense of you can't force someone else to have a higher interest rate, or like force them to have a lower interest rate, it's more it doesn't as much incentivize people to deposit a large amount early, because they could just use one account to deposit a small amount early and then another account to deposit a large amount later, and then you send the tokens from that second wallet to the first wallet and keep your higher interest rate. One thing we could do instead is just ignore the fact that we might be sending our tokens from one wallet to another, and just set this user interest rate of the recipient to the current interest rate in the smart contract. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally we need to add our transferFrom. So, we've got a function called transferFrom and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally we need to add our transferFrom. So, we've got a function called transferFrom and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally we need to add our transferFrom. So, we've got a function called transferFrom and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again. This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the recipient, the amount of tokens. This will call the transfer function on the smart contract that we are inheriting and transfer here does return, so, it'll return true if this doesn't revert. So, there we have it. We now have our transfer function. Let's just add in a little bit of quick natspec, add notice transfer tokens from one user to another. Param, the recipient, the user to transfer the tokens to, the amount of tokens to transfer, returns true if the transfer was successful. 

Now, finally, we need to add our transferFrom. So, we've got a function called transferFrom, and this is going to work very similarly. So, we should be able to go do this pretty quick. We've got an address which is the sender. We have another address which is the recipient, and then we have the uint256 amount again.  This is also going to be public override returns, and then we want to do exactly the same thing. So, we want to mint the accrued interest for the sender, mint the accrued interest for the recipient, we want to check if the amount is 
```javascript
if (amount == type(uint256).max) {
  amount = balanceof(sender);
}
```
the maximum value of uint256. If it is, then send their entire balance. If the recipient does not yet have a deposit, they do not have any tokens, then set their interest rate to the interest rate of the sender. 

```javascript
return super.transferFrom(sender, recipient, amount);
```
And then, the final thing that we need to do is we actually need to transfer the tokens, so, we can do return super.transfer, to the