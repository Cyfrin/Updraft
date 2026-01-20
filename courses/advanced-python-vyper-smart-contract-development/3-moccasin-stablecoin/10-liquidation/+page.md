We're going to implement the main functionality of a stablecoin contract: liquidation.

We'll begin by creating a new function in our stablecoin contract:

```javascript
@external
def liquidate(collateral: address, user: address, debt_to_cover: uint256):
    pass
```

We're going to add a few checks to ensure that we can liquidate someone.

* **Check if their health factor is bad**

We need to make sure that we're only liquidating users whose health factor is below the minimum. We can do this with the following code:

```javascript
assert debt_to_cover > 0, "DSCEngine: Needs more than zero"
starting_health_factor: uint256 = self._health_factor(user)
assert starting_health_factor < MIN_HEALTH_FACTOR, "DSCEngine: Health factor is good"
```

* **Cover their debt by US burning our DSC but reducing their DSC minted**

If a user has a health factor below the minimum, the system needs to cover the debt they owe. We do this by burning our own DSC (which is minted) and reducing their DSC minted. 

We need to calculate how much collateral to give back to the user. We'll call a function we don't have yet called `get_token_amount_from_usd`.

```javascript
token_amount_from_debt_covered: uint256 = self._get_token_amount_from_usd(collateral, debt_to_cover)
bonus_collateral: uint256 = (token_amount_from_debt_covered * LIQUIDATION_BONUS) // LIQUIDATION_PRECISION
```

* **Take their collateral**

Finally, we're going to take the user's collateral by calling `redeem_collateral`, which we've implemented previously.

```javascript
self._redeem_collateral(collateral, token_amount_from_debt_covered + bonus_collateral, user, msg.sender)
```

Finally, we need to burn the user's DSC. 

```javascript
self._burn_dsc(debt_to_cover, user, msg.sender)
```

Let's add a few more checks to make sure that we're doing everything correctly.

* **Ending health factor is greater than starting health factor**

```javascript
ending_health_factor: uint256 = self._health_factor(user)
assert ending_health_factor > starting_health_factor, "DSCEngine: Didn't improve health factor"
```

* **Revert if health factor is broken**

```javascript
self._revert_if_health_factor_broken(msg.sender)
```

We also need to make sure that we're not accidentally depleting `msg.sender`'s health factor.

```javascript
self._revert_if_health_factor_broken(msg.sender)
```

We'll need to add a new variable for our liquidation bonus. This will be added to the top of the contract.

```javascript
LIQUIDATION_BONUS: public constant uint256 = 100
```

We need to make sure that we're using the correct `LIQUIDATION_BONUS` in the code. 

Let's make a few more adjustments to our function:

```javascript
@external
def liquidate(collateral: address, user: address, debt_to_cover: uint256):
    assert debt_to_cover > 0, "DSCEngine: Needs more than zero"
    starting_health_factor: uint256 = self._health_factor(user)
    assert starting_health_factor < MIN_HEALTH_FACTOR, "DSCEngine: Health factor is good"
    token_amount_from_debt_covered: uint256 = self._get_token_amount_from_usd(collateral, debt_to_cover)
    bonus_collateral: uint256 = (token_amount_from_debt_covered * LIQUIDATION_BONUS) // LIQUIDATION_PRECISION
    self._redeem_collateral(collateral, token_amount_from_debt_covered + bonus_collateral, user, msg.sender)
    self._burn_dsc(debt_to_cover, user, msg.sender)
    ending_health_factor: uint256 = self._health_factor(user)
    assert ending_health_factor > starting_health_factor, "DSCEngine: Didn't improve health factor"
    self._revert_if_health_factor_broken(msg.sender)
```

And that's it! We've successfully implemented liquidation into our stablecoin contract. Now, anyone with a low enough health factor can be liquidated!
