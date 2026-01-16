## Project Setup

We'll start by creating a new folder and opening it in Visual Studio Code:

```bash
mkdir mox-signatures-cu
```

```bash
code mox-signatures-cu
```

We'll then initialize a Python project in Visual Studio Code:

```bash
mox init --vscode --pyproject
```

Next, we'll navigate to the `src` folder and delete the files we don't need:

* `deploy.py`
* `Counter.py`
* `test_counter.py`
* `conftest.py`

After this, we'll go to the `README.md` file to describe the project:

We want to:

1. Airdrop tokens to `X` number of people.
2. Let people claim via a `claim` function.
3. Not have to store `X` people in a list or mapping on chain.

We don't want to store thousands of people in an array or mapping on chain because that will be very gas intensive.

We'll begin coding by creating a new file called `snek_token.vy`. This will be the token we'll be airdropping:

```javascript
# pragma version 0.4.1

@license MIT
@title snek_token

#@dev We import and implement the 'IERC20' interface,
#@which is a built-in interface of the Vyper compiler.
from ethereum.erc20 import IERC20

implements: IERC20

from ethereum.erc20 import IERC20Detailed
implements: IERC20Detailed

#@dev We import and initialise the 'ownable' module.
from snekmate.auth import ownable as ow

initializes: ow

#@dev We import and initialise the 'erc20' module.
from snekmate.tokens import erc20

initializes: erc20ownable = ow

NAME: constant(String[25]) = "snek_token"
SYMBOL: constant(String[5]) = "SNEK"
DECIMALS: constant(uint8) = 18
EIP712_VERSION: constant(String[20]) = "1"

@deploy
def __init__(initial_supply: uint256):
    ow.__init__()
    erc20.__init__(NAME, SYMBOL, DECIMALS, NAME, EIP712_VERSION)
    erc20._mint(msg.sender, initial_supply)

exports: erc20._interface
```

We'll need to install `snekmate` before moving on.

```bash
mox install snekmate
```

We'll create a new file called `merkle_airdrop.vy`.

```javascript
# pragma version 0.4.1

@license MIT
@title Merkle Airdrop

from vyper.interfaces import ERC20

@external
def claim():
    """Allows users to claim the airdropped tokens."""
    pass
```

In our deploy script, when we deploy the `snek` token, we'll send them to the `merkle_airdrop`. The `merkle_airdrop` will have all the tokens to send.
