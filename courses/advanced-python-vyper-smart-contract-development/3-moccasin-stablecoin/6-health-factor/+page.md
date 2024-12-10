## Creating a Health Factor to Liquidate Users 

In this lesson, we will create a health factor and liquidation threshold to prevent users from minting an excessive amount of tokens relative to the amount of collateral they have deposited.

### Minting DSC Tokens

We will first create an external function called `mintDSC` to allow users to mint tokens:

```javascript
@external
def mintDSC(amount_dsc_to_mint: uint256, collateral_address: address):
    success: bool =  extcall IERC20(token_collateral_address).transferFrom(msg.sender, self, amount_collateral)
    assert success, "DSCEngine: Transfer failed"
    self.user_to_dsc_minted[msg.sender] += amount_dsc_to_mint
    log CollateralDeposited(msg.sender, amount_collateral)
```

### Creating a Health Factor

We will now create a new internal function called `health_factor` that takes in a user address as an argument.

```javascript
@internal
def health_factor(user: address):
    total_dsc_minted: uint256 = 0 
    total_collateral_value_usd: uint256 = 0 
    total_dsc_minted, total_collateral_value_usd = self._get_account_information(user)
    return self._calculate_health_factor(total_dsc_minted, total_collateral_value_usd)
```

Our `health_factor` function needs to know how many tokens the user has minted and how much collateral they have deposited. We will create two new internal functions to get this information, `_get_account_information` and `_get_account_collateral_value`.

```javascript
@internal
def _get_account_information(user: address) -> (uint256, uint256):
    """@notice returns the total DSC minted, and the total collateral value deposited"""
    total_dsc_minted: uint256 = self.user_to_dsc_minted[user]
    collateral_value_in_usd: uint256 = 0 
    for token: address in COLLATERAL_TOKENS:
        amount: uint256 = self.user_to_token_to_amount_deposited[user][token]
        collateral_value_in_usd += self._get_usd_value(token, amount)
    return total_dsc_minted, collateral_value_in_usd


@internal
def _get_account_collateral_value(address: address) -> uint256:
    """@notice returns the total collateral value deposited"""
    total_collateral_value_usd: uint256 = 0
    for token: address in COLLATERAL_TOKENS:
        amount: uint256 = self.user_to_token_to_amount_deposited[user][token]
        total_collateral_value_usd += self._get_usd_value(token, amount)
    return total_collateral_value_usd
```

We will also need a new function called `_get_usd_value` which takes in a token address and an amount and returns the value in USD.

```javascript
@internal
def _get_usd_value(token: address, amount: uint256) -> uint256:
    price_feed: AggregatorV3Interface = AggregatorV3Interface(self.token_to_price_feed[token])
    price: int256 = price_feed.staticcall price_feed.latestAnswer()
    return (convert(price, uint256) * ADDITIONAL_FEED_PRECISION * amount) // PRECISION
```

### Calculating the Health Factor

Now we are ready to finish our `health_factor` function. We will first call our `_get_account_information` function to get the `total_dsc_minted` and `total_collateral_value_in_usd`. We will then calculate the health factor based on these values.

```javascript
@internal
def _calculate_health_factor(total_dsc_minted: uint256, total_collateral_value_usd: uint256) -> uint256:
    if total_dsc_minted == 0:
        return max_value(uint256)
    collateral_adjusted_for_threshold: uint256 = (total_collateral_value_usd * LIQUIDATION_THRESHOLD) // LIQUIDATION_PRECISION
    return (collateral_adjusted_for_threshold * PRECISION) // total_dsc_minted 
```

### Creating a Liquidation Threshold 

We will add a new state variable called `LIQUIDATION_THRESHOLD` at the top of our contract which will be a public constant set to 50.

```javascript
LIQUIDATION_THRESHOLD: public(constant(uint256)) = 50
```

Now that we have our health factor function, we need to add a function that reverts if the health factor is broken. We will call this function `_revert_if_health_factor_broken` which takes in a user address as an argument.

```javascript
@internal
def _revert_if_health_factor_broken(user: address):
    user_health_factor: uint256 = self.health_factor(user)
    assert user_health_factor >= MIN_HEALTH_FACTOR, "DSCEngine: Health factor broken!"
```

### Conclusion

In this lesson, we have successfully created a health factor and a liquidation threshold to prevent users from minting an excessive amount of tokens. This is an important safety feature for any stablecoin system and helps ensure its stability.

We will build upon these core concepts in later lessons, exploring more complex features and improving the stability of our system.
