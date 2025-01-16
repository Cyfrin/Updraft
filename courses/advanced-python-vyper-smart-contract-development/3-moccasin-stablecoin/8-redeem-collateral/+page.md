## Redeeming Collateral

We are going to create a way for users to redeem collateral. Let's add a function for this. We will create a function that can redeem collateral and it will take in the token collateral address, the address of the user who will redeem collateral, and the amount to redeem, which will be a uint256. We'll also make sure the user doesn't redeem more collateral than they have.

```python
@external
def redeem_collateral(token_collateral_address: address, address: address, amount: uint256):
    self._redeem_collateral(token_collateral_address, address, amount)
    self._revert_if_health_factor_broken(msg.sender)
```

We should also have an internal function to actually handle the redemption. We can do that by taking in the token collateral address, address, and amount, and then subtracting the amount from the user's token amount deposited. 

```python
@internal
def _redeem_collateral(token_collateral_address: address, address: address, amount: uint256):
    self.user_to_token_amount_deposited[from][token_collateral_address] -= amount
    log.CollateralRedeemed(token_collateral_address, amount, from, to)
    success: bool = extcall(IERC20(token_collateral_address).transfer(to, amount))
    assert success, "DSCEngine: Transfer failed!"
```

Finally, to make sure we have a record of all collateral redeemed, we are going to create an event.

```python
event CollateralRedeemed:
    redeem_from: indexed(address)
    amount: indexed(uint256)
    to: address
```

You could even use test-driven development to write your tests first and then write code to match the tests! But for now, we are going to focus on writing the code and then adding the tests later.

We can now start creating another function, an external function for depositing collateral and minting DSC. 

```python
@external
def deposit_and_mint(token_collateral_address: address, amount_collateral: uint256, amount_dsc_to_mint: uint256):
    self._deposit_collateral(token_collateral_address, amount_collateral)
    self._mint_dsc(amount_dsc_to_mint)
```

This function will take the token collateral address, the amount of collateral, and the amount of DSC to mint. We'll also create an internal function for this and use the same logic as the other functions. 

```python
@internal
def _deposit_collateral(token_collateral_address: address, amount_collateral: uint256):
    self._deposit_collateral(token_collateral_address, amount_collateral)
    self._mint_dsc(amount_dsc_to_mint)
```

ChatGPT is a very helpful tool for this process. We can start a line, and it will typically be able to predict what you will write next. It's a very helpful co-pilot to have.

We are getting closer to creating our stable coin engine. 
