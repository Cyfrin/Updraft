---
title: AssetToken.sol
---

### AssetToken.sol

As we progress with tincho method the order we assess things we become less and less important. As the contracts get bigger they're going to start relying on each other a lot and we may starting bouncing back and forth.

For example, we know the `ThunderLoanUpgraded.sol` contract is _smaller_ but it's also the _upgrade_ to `ThunderLoan.sol`, so it's a good idea to start with `ThunderLoan.sol` for context.

But, we're getting ahead of ourselves. Let's get started looking at `AssetToken.sol`

<details>
<summary>AssetToken.sol</summary>

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract AssetToken is ERC20 {
    error AssetToken__onlyThunderLoan();
    error AssetToken__ExchangeRateCanOnlyIncrease(uint256 oldExchangeRate, uint256 newExchangeRate);
    error AssetToken__ZeroAddress();

    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    IERC20 private immutable i_underlying;
    address private immutable i_thunderLoan;

    // The underlying per asset exchange rate
    // ie: s_exchangeRate = 2
    // means 1 asset token is worth 2 underlying tokens
    uint256 private s_exchangeRate;
    uint256 public constant EXCHANGE_RATE_PRECISION = 1e18;
    uint256 private constant STARTING_EXCHANGE_RATE = 1e18;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event ExchangeRateUpdated(uint256 newExchangeRate);

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/
    modifier onlyThunderLoan() {
        if (msg.sender != i_thunderLoan) {
            revert AssetToken__onlyThunderLoan();
        }
        _;
    }

    modifier revertIfZeroAddress(address someAddress) {
        if (someAddress == address(0)) {
            revert AssetToken__ZeroAddress();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    constructor(
        address thunderLoan,
        IERC20 underlying,
        string memory assetName,
        string memory assetSymbol
    )
        ERC20(assetName, assetSymbol)
        revertIfZeroAddress(thunderLoan)
        revertIfZeroAddress(address(underlying))
    {
        i_thunderLoan = thunderLoan;
        i_underlying = underlying;
        s_exchangeRate = STARTING_EXCHANGE_RATE;
    }

    function mint(address to, uint256 amount) external onlyThunderLoan {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyThunderLoan {
        _burn(account, amount);
    }

    function transferUnderlyingTo(address to, uint256 amount) external onlyThunderLoan {
        i_underlying.safeTransfer(to, amount);
    }

    function updateExchangeRate(uint256 fee) external onlyThunderLoan {
        // 1. Get the current exchange rate
        // 2. How big the fee is should be divided by the total supply
        // 3. So if the fee is 1e18, and the total supply is 2e18, the exchange rate be multiplied by 1.5
        // if the fee is 0.5 ETH, and the total supply is 4, the exchange rate should be multiplied by 1.125
        // it should always go up, never down
        // newExchangeRate = oldExchangeRate * (totalSupply + fee) / totalSupply
        // newExchangeRate = 1 (4 + 0.5) / 4
        // newExchangeRate = 1.125
        uint256 newExchangeRate = s_exchangeRate * (totalSupply() + fee) / totalSupply();

        if (newExchangeRate <= s_exchangeRate) {
            revert AssetToken__ExchangeRateCanOnlyIncrease(s_exchangeRate, newExchangeRate);
        }
        s_exchangeRate = newExchangeRate;
        emit ExchangeRateUpdated(s_exchangeRate);
    }

    function getExchangeRate() external view returns (uint256) {
        return s_exchangeRate;
    }

    function getUnderlying() external view returns (IERC20) {
        return i_underlying;
    }
}

```

</details>


We should recall from the README:

    Liquidity providers can deposit assets into ThunderLoan and be given AssetTokens in return. These AssetTokens gain interest over time depending on how often people take out flash loans!

So, it seems these `AssetTokens` serve as our kind of receipt for liquidity providers. Similar to `LP Tokens` functions in the `AMM`'s we investigated in the previous section of this course.

These AssetTokens are what represent the shares a liquidity provider has in a pool, which in turn determines how they're paid back when the protocol is used (when flash loans are taken).

### Imports

Starting with imports, there are some good practices we should acknowledge and understand.

```js
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

We should be well familiar with the `ERC20` and `IERC20` libraries from OpenZeppelin, but what's `SafeERC20`?

```js
/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {...}
```

SafeERC20 is a wrapper around ERC20 interfaces which protects against many of the weird behaviours of unexpected token types, handling unusual revert/return circumstances for us.

### Errors and Variables

Continuing into the contract itself now, we've got custom error declarations, our state variables and events. These all look very nice actually. We even see the use of named constants instead of magic numbers - love to see it.

The comments left for some of our variables may be a little confusing at first glance though, let's consider them more closely.

```js
error AssetToken__onlyThunderLoan();
error AssetToken__ExchangeRateCanOnlyIncrease(uint256 oldExchangeRate, uint256 newExchangeRate);
error AssetToken__ZeroAddress();

using SafeERC20 for IERC20;

IERC20 private immutable i_underlying;
address private immutable i_thunderLoan;

// The underlying per asset exchange rate
// ie: s_exchangeRate = 2
// means 1 asset token is worth 2 underlying tokens
uint256 private s_exchangeRate;
uint256 public constant EXCHANGE_RATE_PRECISION = 1e18;
uint256 private constant STARTING_EXCHANGE_RATE = 1e18;

event ExchangeRateUpdated(uint256 newExchangeRate);
```

When the protocol mentions `underlying` it's referring to the asset which is represented by held `AssetTokens`, the asset deposited which was exchanged for `AssetTokens`. This comment is stating that with an exchange rate of `s_exchangeRate = 2`, 2 underlying tokens (USDC for example) would need to be deposited to have 1 AssetToken returned.

You can note that this exchange rate mechanism is distinct from a percentage share of a liquidity pool which we outlined earlier in TSwap. The exchange rate in this instance functions a lot like [**Compound Finance**](https://github.com/compound-finance/) (I'm secretly teaching you compound finance) and how their [**CToken**](https://github.com/compound-finance/compound-protocol/blob/master/contracts/CToken.sol) works.

This may even be a point in a review where I would go on a side quest to better understand Compound and how it influenced the development of `ThunderLoan`. We aren't going to go on this tangent here together, but I encourage you to become familiar with some of these DeFi protocols we touch on as the context and experience will go a long way in your future security reviews.

### Modifiers

Next we'll hit modifiers as we continue down `AssetToken.sol`.

```js
modifier onlyThunderLoan() {
    if (msg.sender != i_thunderLoan) {
        revert AssetToken__onlyThunderLoan();
    }
    _;
}

modifier revertIfZeroAddress(address someAddress) {
    if (someAddress == address(0)) {
        revert AssetToken__ZeroAddress();
    }
    _;
}
```

Immediately - **_Where's the NATSPEC?_**

The first modifier `onlyThunderLoan` seems like clear access control. This should only allow the function being called to be called by `ThunderLoan` and will revert if not. Double check that `i_thunderloan` is being assigned in our constructor!

The second modifier is a classic zero address check modifier, wonderful, looks great.

### Constructor

Now we can assess that this contract is being set up properly in it's constructor. Let's leave some notes to remind ourselves of what each of these variables is doing.

```js
constructor(
    address thunderLoan, // ThunderLoan.sol address
    IERC20 underlying, // Token to deposit in exchange for AssetTokens
    string memory assetName, // AssetToken Name
    string memory assetSymbol // AssetToken Symbol
)
    // ERC20 Constructor w/ parameters
    ERC20(assetName, assetSymbol)
    // Zero Address checks for thunderloan and underlying parameters
    revertIfZeroAddress(thunderLoan)
    revertIfZeroAddress(address(underlying))
{
    // Assigning constructor arguments to state variables.
    i_thunderLoan = thunderLoan;
    i_underlying = underlying;
    s_exchangeRate = STARTING_EXCHANGE_RATE;
}
```

This all seems above board. Nothing stands out as vulnerable to me here and again we even see some good practices such as Zero Address checks and constant variable names.

Let's jump into some of the functions now, we're still not _very_ sure what this contract is doing yet.

### Functions

First up, we have our `mint` and `burn` functions!

```js
function mint(address to, uint256 amount) external onlyThunderLoan {
    _mint(to, amount);
}

function burn(address account, uint256 amount) external onlyThunderLoan {
    _burn(account, amount);
}
```

These functions are coming from our ERC20 inheritance. We can see the `onlyThunderLoan` modifier applied to each of them, so the intent is clear - _Only the `ThunderLoan.sol` contract passed as a constructor argument should be able to call these functions_.

We should be thinking adversarially though, thinking about:

```js
// Is there a way I can call this from ThunderLoan when we shouldn't be able to?
```

What's next?

```js
function transferUnderlyingTo(address to, uint256 amount) external onlyThunderLoan {
    i_underlying.safeTransfer(to, amount);
}
```

Another function only callable by `ThunderLoan.sol`. This function seems to handle the transfer of underlying tokens using `safeTransfer`. Immediately, working with token transfers, we should have alarm bells going off.

- How are `Weird ERC20s` handled?

We can refer to the `Thunder Loan` README to confirm the tokens this protocol expects to support (and if this information isn't provided by the protocol initially, ask!).

- USDC
- DAI
- LINK
- WETH

Of these, the only one which stands out as potentially problematic is USDC. We may ask the questions:

```js
// What happens if USDC blacklists the ThunderLoan contract?
// What happens if USDC blacklists the AssetToken contract?
```

We can assume there will be _some_ impact in the above circumstances, but we're not sure where this assignment is being used, or what the severity of that impact will be. Time will tell as we gain a better understanding of `Thunder Loan`. Definitely requires a follow up.

Let's jump into `updateExchangeRate` in the next lesson right away!
