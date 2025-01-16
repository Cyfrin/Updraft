## Deposit Collateral

We are now going to write some code related to the deposit collateral function in a smart contract. First, we'll write the code for our token addresses, price feed addresses, and DSC token.

```python
@deploy
def init_(token_addresses: address[2], price_feed_addresses: address[2], dsc_address: address):
    """
    Notice we have two collateral token types: ETH and WBTC
    """
    DSC = I_decentralized_stable_coin(dsc_address)
    COLLATERAL_TOKENS = token_addresses
    self.token_to_price_feed[token_addresses[0]] = price_feed_addresses[0]
    self.token_to_price_feed[token_addresses[1]] = price_feed_addresses[1]
```

Now we can create a deposit collateral function. We will have two versions of this function. First, we'll create an external one:

```python
@external
def deposit_collateral():
    pass
```

We'll also create an internal version:

```python
@internal
def _deposit_collateral():
    pass
```

We'll set up an assertion in our internal function:

```python
@internal
def _deposit_collateral(token_collateral_address: address, amount_collateral: uint256):
    """
    Checks
    """
    assert amount_collateral > 0, "DSCEngine: Needs more than zero"
    assert self.token_to_price_feed[token_collateral_address] != empty_address, "DSCEngine: InvalidCollateral"
```

Finally, we will transfer the collateral from the user to the DSC Engine.

```python
self.user_to_token_to_amount_deposited[msg.sender][token_collateral_address] += amount_collateral
log.CollateralDeposited(msg.sender, amount_collateral)
success: bool = extcall(IERC20(token_collateral_address).transferFrom(msg.sender, self, amount_collateral))
assert success, "DSCEngine: Transfer failed"
```

We have created the basic code for the deposit collateral function. We need to keep track of how much collateral each user has deposited. We will do this by creating a hashmap of the user to the token to the amount deposited.

```python
user_to_token_to_amount_deposited: public(HashMap[address, HashMap[address, uint256]])
```

We will use the event keyword to emit an event called "CollateralDeposited" in our deposit collateral function.

```python
event CollateralDeposited(
    user: indexed(address),
    token_collateral_address: indexed(address),
    amount_collateral: uint256
)
```

To conclude this lesson, we'll use `vheader` to add a header for our internal functions, so that we can organize our code.

```bash
vheader internal functions
```

You should add comments to your code. Comments can help other developers understand your code, and they can be helpful for you as well when you come back to your code later. Adding comments is a great way to make sure your code is well-organized and easy to understand. 
