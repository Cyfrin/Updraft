## DSC Engine Intro

This lesson will introduce the DSC Engine, a component of a decentralized stablecoin system. We'll begin by creating a new contract in the _src_ folder named _dsc_engine.vy_. We will be creating an ERC20 standard contract that defines the core functionality of the DSC Engine.

We'll copy and paste the following code into the new file.

```python
# pragma version 0.4.1
@license MIT
@author You
@title DSC Engine
@notice This contract is the engine of the Decentralized Stable Coin. It is responsible for the minting and burning of the stablecoin.
@notice Collateral: Exogenous (WETH, WBTC, etc...)
@notice Minting (Stability) Mechanism: Decentralized (Algorithmic)
@notice Value (Relative Stability): Anchored (Pegged to USD)
@notice Collateral Type: Crypto
#
from snekmate.tokens import erc20
from snekmate.auth import ownable as ow
#
initializes: ow
initializes: erc20(ownable=ow)
#
exports: (
    erc20.IERC20,
    erc20.burn_from,
    erc20.mint,
    erc20.set_minter,
    ow.owner,
    ow.owner_set,
    ow.transfer_ownership
)
#
NAME: constant(String[25]) = "Decentralized Stable Coin"
SYMBOL: constant(String[5]) = "DSC"
DECIMALS: constant(uint8) = 18
EIP_712_VERSION: constant(String[20]) = "1"
```

We'll create a new header titled _EXTERNAL FUNCTIONS_. We'll also create the _@deploy_ constructor function.

```python
#
# EXTERNAL FUNCTIONS
#
@deploy
def __init__():
    pass
```

In the _@deploy_ constructor function we are going to take in a list of token addresses.

```python
@deploy
def __init__():
    token_addresses: address[2],
```

If we wanted this to be more advanced, we could use a dynamic array or other data structures. However, we are just going to keep things simple. We will only support two types of collateral.

```python
@deploy
def __init__():
    token_addresses: address[2],
    price_feed_addresses: address[2],
```

We will also need the address of the DSC token.

```python
@deploy
def __init__():
    token_addresses: address[2],
    price_feed_addresses: address[2],
    dsc_address: address
```

We'll create a new header titled _STATE VARIABLES_. We'll also define _DSC_ as a public immutable address.

```python
#
# STATE VARIABLES
#
DSC: public(immutable) i_decentralized_stable_coin,
```

Next, we'll define _COLLATERAL_TOKENS_ as a public immutable address array of size 2.

```python
#
# STATE VARIABLES
#
DSC: public(immutable) i_decentralized_stable_coin,
COLLATERAL_TOKENS: public(immutable) address[2],
```

We'll also define _token_to_price_feed_ as a public hashmap that maps token addresses to price feeds.

```python
#
# STATE VARIABLES
#
DSC: public(immutable) i_decentralized_stable_coin,
COLLATERAL_TOKENS: public(immutable) address[2],
#
# Storage
#
token_to_price_feed: public(HashMap[address, address])
```

Lastly, we'll set our state variables.

```python
#
# STATE VARIABLES
#
DSC: public(immutable) i_decentralized_stable_coin,
COLLATERAL_TOKENS: public(immutable) address[2],
#
# Storage
#
token_to_price_feed: public(HashMap[address, address])

#
# EXTERNAL FUNCTIONS
#
@deploy
def __init__():
    token_addresses: address[2],
    price_feed_addresses: address[2],
    dsc_address: address
    DSC = i_decentralized_stable_coin.dsc_address
    COLLATERAL_TOKENS = token_addresses
    self.token_to_price_feed[token_addresses[0]] = price_feed_addresses[0]
    self.token_to_price_feed[token_addresses[1]] = price_feed_addresses[1]
```

We'll create a new file titled _i_decentralized_stable_coin.vy_. We'll copy and paste the following code into this file.

```python
# pragma version 0.4.1
@license MIT
@author You
@title i_decentralized_stablecoin
@notice
#
@external
def burn_from(owner: address, amount: uint256):
    pass
#
@external
def mint(owner: address, amount: uint256):
    pass
```

Finally, we'll import the _i_decentralized_stable_coin_ interface.

```python
# pragma version 0.4.1
@license MIT
@author You
@title DSC Engine
@notice This contract is the engine of the Decentralized Stable Coin. It is responsible for the minting and burning of the stablecoin.
@notice Collateral: Exogenous (WETH, WBTC, etc...)
@notice Minting (Stability) Mechanism: Decentralized (Algorithmic)
@notice Value (Relative Stability): Anchored (Pegged to USD)
@notice Collateral Type: Crypto
#
from snekmate.tokens import erc20
from snekmate.auth import ownable as ow
from interfaces import i_decentralized_stable_coin
#
initializes: ow
initializes: erc20(ownable=ow)
implements: i_decentralized_stable_coin
#
exports: (
    erc20.IERC20,
    erc20.burn_from,
    erc20.mint,
    erc20.set_minter,
    ow.owner,
    ow.owner_set,
    ow.transfer_ownership
)
#
NAME: constant(String[25]) = "Decentralized Stable Coin"
SYMBOL: constant(String[5]) = "DSC"
DECIMALS: constant(uint8) = 18
EIP_712_VERSION: constant(String[20]) = "1"
```

Now, we can compile our contract.

```bash
mox compile
```

This concludes the DSC Engine Intro lesson.
