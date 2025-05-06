---
title: DecentralizedStableCoin.sol
---

_Follow along the course with this video._

---

### DecentralizedStableCoin.sol

We've just learnt a tonne about DeFi, and hopefully you caught that there's a lot more to learn. For now, we're going to finally jump into creating our own stablecoin from scratch.

All the code we discuss/write will of course be available on this section's [**GitHub Repo**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23) for you to reference.

> ❗ **NOTE**
> We're going to be moving a little faster, in this lesson. We have a few new concepts to cover, but much of this will be practice and repetition of things you already know.

Let's start by making our project directory.

```bash
mkdir foundry-defi-stablecoin
cd foundry-defi-stablecoin
code .
```

With the directory open in VSCode, we can initialize a new Foundry project.

```bash
forge init
```

Finally, remove the placeholder example contracts `src/Counter.sol`, `script/Counter.s.sol`, and `test/Counter.t.sol`.

In our README.md, let's start taking some notes about our project and outlining its design.

Our stablecoin is going to be:

1. Relative Stability: Anchored or Pegged to the US Dollar
   1. Chainlink Pricefeed
   2. Function to convert ETH & BTC to USD
2. Stability Mechanism (Minting/Burning): Algorithmicly Decentralized
   1. Users may only mint the stablecoin with enough collateral
3. Collateral: Exogenous (Crypto)
   1. wETH
   2. wBTC

To add some context to the above, we hope to create our stablecoin in such a way that it is pegged to the US Dollar. We'll achieve this by leveraging chainlink pricefeeds to determine the USD value of deposited collateral when calculating the value of collateral underlying minted tokens.

The token should be kept stable through this collateralization stability mechanism.

For collateral, the protocol will accept wrapped Bitcoin and wrapped Ether, the ERC20 equivalents of these tokens.

Alright, with things scoped out a bit, let's dive into writing some code. Start by creating the file `src/DecentralizedStableCoin.sol`. I'm hoping to make this as professional as possible, so I'm actually going to paste my contract and function layouts as a reference to the top of this file.

```solidity
// SPDX-License-Identifier: MIT

// This is considered an Exogenous, Decentralized, Anchored (pegged), Crypto Collateralized low volatility coin

// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions
```

When I wrote this codebase, I intended to get it audited, and I did! You can actually see the audit results [**here**](https://www.codehawks.com/contests/cljx3b9390009liqwuedkn0m0). For this reason, something different you may notice about this codebase is how _verbose_ we're going to be. When it comes to security and having auditors review our code, the clearer we are in explaining the code and added context to our goals, the easier their lives are going to be keeping us secure.

With that said, our contract boilerplate is going to be set up similarly to everything we've been doing so far. Let's add some NATSPEC to outline the contracts purpose.

```solidity
pragma solidity ^0.8.18;

/*
 * @title: DecentralizedStableCoin
 * @author: Patrick "Long Course" Collins
 * Collateral: Exogenous (ETH & BTC)
 * Minting: Algorithmic
 * Relative Stability: Pegged to USD
 *
 * This is the contract meant to be governed by DSCEngine. This contract is just the ERC20 implementation of our stablecoin system.
 */
contract DecentralizedStableCoin {}
```

This contract is effectively just going to be a fairly standard ERC20 to function as the asset for our stablecoin protocol. All of the logic for the protocol will be handled by DSCEngine.sol. We'll need OpenZeppelin to get started.

```bash
forge install openzeppelin/openzeppelin-contracts --no-commit
```

And of course, we can add our remappings to our
`foundry.toml`.

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = ["@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts"]
```

Rather than importing a standard ERC20 contract, we'll be leveraging the ERC20Burnable extension of this standard. ERC20Burnable includes `burn` functionality for our tokens which will be important when we need to take the asset out of circulation to support stability.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/*
 * @title: DecentralizedStableCoin
 * @author: Patrick "Long Course" Collins
 * Collateral: Exogenous (ETH & BTC)
 * Minting: Algorithmic
 * Relative Stability: Pegged to USD
 *
 * This is the contract meant to be governed by DSCEngine. This contract is just the ERC20 implementation of our stablecoin system.
 */
contract DecentralizedStableCoin is ERC20Burnable {
    constructor() ERC20("DecentralizedStableCoin", "DSC"){}
}
```

Because we're inheriting ERC20Burnable, and it inherits ERC20, we need to satisfy the standard ERC20 constructor parameters within our contracts constructor. We've set the name `DecentralizedStableCoin` and the symbol `DSC`.

All of the properties of our protocol are going to be governed ultimately by the DSCEngine.sol contract. Functionality like the stability mechanism, including minting and burning, need to be controlled by the DSCEngine to maintain the integrity of the stablecoin.

In order to accomplish this, we're going to also inherit `Ownable` with DecentralizedStableCoin.sol. This will allow us to configure access control, assuring only our DSCEngine contract is authorized to call these functions.

> ❗ **NOTE**
> For version 5 of OpenZeppelin's Ownable contract, we need to pass an address
> in the constructor. We have to modify our code to account for this when
> running `forge build` so that our project will not error. Like this:
> `constructor(address initialOwner) ERC20("DecentralizedStableCoin", "DSC")
Ownable(initialOwner) {}`

```solidity
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

...

contract DecentralizedStableCoin is ERC20Burnable, Ownable {
    constructor() ERC20("DecentralizedStableCoin", "DSC"){}
}
```

The two major functions we're going to want the DSCEngine to control are of course the mint and burn functions. We can override the standard ERC20 functions with our own to assure this access control is in place.

### Burn

We can start by writing our burn function.

```solidity
function burn(uint256 _amount) external override onlyOwner{}
```

We're going to want to check for two things when this function is called.

1. The amount burnt must not be less than zero
2. The amount burnt must not be more than the user's balance

We'll configure two custom errors for when these checks fail.

```solidity
contract DecentralizedStableCoin is ERC20Burnable, Ownable {
    error DecentralizedStableCoin__MustBeMoreThanZero();
    error DecentralizedStableCoin__BurnAmountExceedsBalance();

    constructor() ERC20("DecentralizedStableCoin", "DSC"){}

    function burn(uint256 _amount) external override onlyOwner{
        uint256 balance = balanceOf(msg.sender);
        if(_amount <= 0){
            revert DecentralizedStableCoin__MustBeMoreThanZero();
        }
        if(balance < _amount){
            revert DecentralizedStableCoin__BurnAmountExceedsBalance();
        }
    }
}
```

The last thing we're going to do, assuming these checks pass, is burn the passed amount of tokens. We're going to do this by using the `super` keyword. This tells solidity to use the burn function of the parent class.

```solidity
function burn(uint256 _amount) external override onlyOwner{
    uint256 balance = balanceOf(msg.sender);
    if(_amount <= 0){
        revert DecentralizedStableCoin__MustBeMoreThanZero();
    }
    if(balance < _amount){
        revert DecentralizedStableCoin__BurnAmountExceedsBalance();
    }
    super.burn(_amount);
}
```

### Mint

The second function we'll need to override to configure access control on is going to be our mint function.

```solidity
function mint(address _to, uint256 _amount) external overrides onlyOwner returns(bool){
}
```

So, in this function we want to configure a boolean return value which is going to represent if the mint/transfer was successful. Something we'll want to check is if the \_to argument being passed is address(0), in addition to assuring the amount minted is greater than zero.

We'll of course want to revert with custom errors if these conditional checks fail.

```solidity
contract DecentralizedStableCoin is ERC20Burnable, Ownable {
    error DecentralizedStableCoin__MustBeMoreThanZero();
    error DecentralizedStableCoin__BurnAmountExceedsBalance();
    error DecentralizedStableCoin__NotZeroAddress();

    ...

    function mint(address _to, uint256 _amount) external onlyOwner returns(bool){
        if(_to == address(0)){
            revert DecentralizedStableCoin__NotZeroAddress();
        }
        if(_amount <= 0){
            revert DecentralizedStableCoin__MustBeMoreThanZero();
        }
        _mint(_to, amount)
        return true;
    }
}
```

> ❗ **NOTE**
> We don't need to override the mint function, we're just calling the \_mint function within DecentralizedStableCoin.sol.

### Wrap Up

Guess what? That's literally all there is to this contract, we're not going to do anything more here until we need to write some tests.

Let's move on to the heart of this protocol, DSCEngine.sol, in the next lesson!
