We've just built the ability for a user to deposit collateral, and now we're going to dive into the minting of the Decentralized Stable Coin!  It's very important to ensure that there's always at least 2:1 ratio of collateral to the amount of DSC that's being minted. The DSC engine is responsible for managing that ratio, so let's take a look at the code. 

Here's the `mintDSC` function:
```javascript
@external
def mint_dsc(amount: uint256):
    pass
```
This function allows the user to specify the amount of DSC they want to mint. Before the actual minting happens, we need to check the user's collateral. So, let's create a function that calculates the user's health factor: 
```javascript
@internal
def health_factor(user: address) -> uint256:
    total_dsc_minted: uint256 = 0
    total_collateral_value_usd: uint256 = 0
    (total_dsc_minted, total_collateral_value_usd) = self.get_account_information(user)
    return self.calculate_health_factor(total_dsc_minted, total_collateral_value_usd)
```
The `health_factor` function calculates the user's health factor based on the ratio of their total collateral value in USD and the amount of DSC they've already minted. 

Now, we need a function to calculate the health factor: 
```javascript
@internal
def calculate_health_factor(total_dsc_minted: uint256, total_collateral_value_usd: uint256) -> uint256:
    if total_dsc_minted == 0:
        return MAX_HEALTH_FACTOR
    # What's the ratio of DSC minted to collateral value?
    collateral_adjusted_for_threshold: uint256 = (total_collateral_value_usd + LIQUIDATION_THRESHOLD) // LIQUIDATION_PRECISION
    return (collateral_adjusted_for_threshold * PRECISION) // total_dsc_minted
```
This function calculates the health factor based on the total DSC minted and the collateral value in USD. 

Finally, let's take a look at how we actually mint the DSC: 
```javascript
@internal
def _mint_dsc(amount_dsc_to_mint: uint256):
    assert amount_dsc_to_mint > 0, "DSCEngine: Needs more than zero"
    self.user_to_dsc_minted[msg.sender] += amount_dsc_to_mint
    self.revert_if_health_factor_broken(msg.sender)
    extcall dsc.mint(msg.sender, amount_dsc_to_mint)
```
The `_mint_dsc` function makes sure that the amount of DSC being minted is above 0, it then updates the amount of DSC minted for the user, and finally it calls the DSC's mint function! 

We've now created the code for minting the DSC.  Now, we will make sure that only the DSC engine is able to mint our decentralized stablecoin.

We'll start by going to our decentralized stablecoin contract.
```javascript
@deploy
def init():
    erc20.init()
```
Right when we deploy, we're going to set the minter to be the DSC engine, and we're going to set the owner to be the DSC engine as well.
```javascript
@deploy
def init():
    erc20.init()
    erc20.set_minter(dsc_engine)
    erc20.ow_transfer_ownership(dsc_engine)
```
This ensures that only the DSC engine can mint DSC, and it can also transfer ownership of the DSC to another address! 
