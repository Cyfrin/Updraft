## Finishing the Rebase Token Contract

Okay, let's have a look at our Open Zeppelin ERC20 contract to check there is nothing that we want to override or change.

We have the function `name`, which returns the name of the token.
```javascript
function name() public view virtual returns (string memory) {
    return _name;
}
```

Then the symbol.
```javascript
function symbol() public view virtual returns (string memory) {
    return _symbol;
}
```
And, the number of decimals, which by default is 18, but you can override if you want a different number of decimals, like USDC has six.
```javascript
function decimals() public view virtual returns (uint8) {
    return 18;
}
```
The total supply, in order to get an accurate total supply of tokens that have been minted but also any interest that is owed to the users, then we would need to loop through every single user in the protocol, calculate their balance which would then account for any interest that they are owed, and update the total supply.

We could override that function and do that, however, we could get a DoS or Denial of Service if the array of users becomes extremely long, therefore we have to loop through a lot of them and do this calculation for a lot of people. 

So, we are actually going to leave this total supply as is, and just accept that if you call total supply, this is going to be any minted tokens, not including any interest that is owed. So, it is not going to be one-hundred-percent accurate, but that is just a known flaw of this protocol.
```javascript
function totalSupply() public view virtual returns (uint256) {
    return _totalSupply;
}
```
`balanceOf` which we have overridden.
```javascript
function balanceOf(address account) public view virtual returns (uint256) {
    return _balances[account];
}
```
We are going to need to implement `transfer`. The reason for this is that we want to be setting the interest rate for users that are receiving a transfer. Because, you can imagine if I send my tokens to Alice, and Alice has not yet deposited into this protocol, she does not yet have an interest rate and those tokens are not going to earn her any interest. However, if she already has an interest rate, if she's already deposited into the protocol then we do not want to be overriding that, because there is an attack vector there where people can purposely drive other user's interest rates down by sending them small amounts of tokens, which would not be a good thing.

So, there are a couple of things that we need to change here. We are going to need to override it, which is fine, because it is virtual.

Allowances. This is fine because this will all work like an ERC20 like normal. We can have allowances and we actually need to have this when we make this token contract work cross chain.
```javascript
function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
}
```
And the same for approvals, we need to have approvals.
```javascript
function approve(address spender, uint256 value) public view virtual returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, value);
        return true;
}
```
And, the same as transfer, we need to override `transferFrom` for the exact same reasons as we need to override transfer.
```javascript
function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
}
```
Internal transfer is fine this is going to work exactly the same. We are not going to update that.
```javascript
function _transfer(
    address from,
    address to,
    uint256 value
) internal virtual {
    require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 fromBalance = _balances[from];
    require(fromBalance >= value, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - value;
        _balances[to] += value;
        }

    emit Transfer(from, to, value);
    }
```
And, if you have a look here, you can see that the internal mint and internal burn functions both call update.
```javascript
function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _update(address(0), account, amount);
}
```
```javascript
function _burn(address account, uint256 amount) internal {
    require(account != address(0), "ERC20: burn from the zero address");

    _update(account, address(0), amount);
}
```
So update is the function which is called to update this balances array and also update the total supply.
```javascript
function _update(address from, address to, uint256 value) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _totalSupply += value;
    if(from == address(0)){
        _balances[to] += value;
    }
        else{
                uint256 fromBalance = _balances[from];
                require(fromBalance >= value, "ERC20: transfer amount exceeds balance");
             unchecked{
                _balances[from] = fromBalance - value;
            }
             if(to != address(0)){
                   unchecked{
                       _balances[to] += value;
                    }
             }

    }


    emit Transfer(from, to, value);

    }
```
So, we don�t need to change any of that because it all works the same as normal.

Then we have a couple more internal approve functions.

And then spend allowance internal function which just calls these internal approve functions. So, the only thing that we have left to do, before we go ahead and make some modifications, is to create our transfer and transferFrom functions.

We need to put this in before the internal functions, so we create a function called transfer and transfer takes an address called recipient, uint256 called amount. This is `public override returns bool`.
```javascript
function transfer(address _recipient, uint256 amount) public override returns (bool) {
  _mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
  return super.transfer(_recipient, amount);
}
```
If we check in the ERC20 it has:
```javascript
function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = msg.sender;
    _transfer(owner, to, value);
        return true;
}
```
And if we want to jump to that function we can just do option + n and click.  That is the end function. So back in RebaseToken.sol.

Before we do any kind of transfer before we actually send tokens to the recipient, we need to check if any interest has accrued for either the `msg.sender` or the `recipient`.
```javascript
_mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
```
And then we can call `super.transfer`:
```javascript
 return super.transfer(_recipient, amount);
```
Now, we also need a transfer from, that takes an address, which is the sender, and an address which is the recipient, and uint256 for the amount.
```javascript
function transferFrom(address _sender, address _recipient, uint256 amount) public override returns (bool){
    _mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
```
This is `public override returns bool`, and again we need to mint accrued interest for the sender, and then the recipient.
```javascript
  _mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
```
Now, if the amount equals the maximum value, then the amount is going to equal balance of the sender.
```javascript
    if (_amount == type(uint256).max){
        _amount = balanceOf(msg.sender);
    }
```
Then `return super.transferFrom`.
```javascript
return super.transferFrom(_sender, _recipient, amount);
```
And we�ll add that little bit of nat spec here.
```javascript
/*
   * @notice Transfer tokens from one user to another
    * @param _sender The user to transfer the tokens from
    * @param _recipient The user to transfer the tokens to
    * @param _amount The amount of tokens to transfer
    * @return True if the transfer was successful
    */
```
So, now we have successfully implemented our mint, burn, transfer, and transferFrom functions.

There are a couple of other small functions that we just want to add in very quickly, the first one being an external function that allows us to see the principle balance. In that our total supply doesn�t include the owed interest. So, in order to be able to see the accurate principle balance we must add this function. We can't just call `super.balanceOf` from outside of this smart contract.
```javascript
function principleBalanceOf(address _user) external view returns (uint256) {
    return super.balanceOf(_user);
}
```
So, we add a bit of a spec so that users know what this function is for.
```javascript
/*
     * @notice Get the principle balance of a user. This is the number of tokens that have actually been minted to the user, not including any interest that has accrued since the last time the user interacted with the protocol.
     * @param _user The user to get the principle balance for
     * @return The principle balance of the user
     */
```
We also want a way to see our personal current interest rate, and these are private, so we can not access them from outside of the smart contract.
```javascript
  function getInterestRate() external view returns (uint256){
        return s_interestRate;
    }
```
Again, we will add some natspec.
```javascript
/*
    * @notice Get the interest rate for the contract
    * @return The interest rate for the contract
    */
```
So, we have now implemented all of the functions that we need for our rebase token. So, we can start testing, but as I have been saying for a while is to add some access control. Currently, anyone can just come along and call mint and be like, hey, yeah I want a million tokens and then I'm going to withdraw it all from the protocol and then call burn and just burn some random person's tokens, screw Patrick, you can't have any tokens, sorry mate.  And this is just not great. And transfer actually you won�t be able to do that necessarily because, no sorry, transfer, obviously it uses the message sender, so we don't need any access control on that. And transferFrom is also fine because we have inherited from transfer from on the ERC20 contract that we are inheriting.

There is a couple of those things we want to add in before we test. This is to add a little access control.
```javascript
function setInterestRate(uint256 _newInterestRate) external {
    // Set the interest rate
    if (_newInterestRate < s_interestRate) {
      revert RebaseToken_InterestRateCanOnlyDecrease(s_interestRate, _newInterestRate);
    }
    s_interestRate = _newInterestRate;
    emit InterestRateSet(_newInterestRate);
  }
```
```javascript
  function getInterestRate() external view returns (uint256){
        return s_interestRate;
    }
```
```javascript
function principleBalanceOf(address _user) external view returns (uint256) {
    return super.balanceOf(_user);
}
```
```javascript
function transfer(address _recipient, uint256 amount) public override returns (bool) {
  _mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
  return super.transfer(_recipient, amount);
}
```
```javascript
function transferFrom(address _sender, address _recipient, uint256 amount) public override returns (bool){
    _mintAccruedInterest(msg.sender);
  _mintAccruedInterest(_recipient);
    if (_amount == type(uint256).max){
        _amount = balanceOf(msg.sender);
    }
return super.transferFrom(_sender, _recipient, amount);
}
```
So, we have implemented those few functions for our rebase token, and now we have finished the contract.
