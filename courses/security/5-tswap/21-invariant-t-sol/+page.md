---
title: Invariant.t.sol
---

---

### Invariant.t.sol

We're finally going to do it! We're going to write a robust stateful fuzz suite for the TSwap protocol!

This is the most challenging part of this entire course. If you're struggling to write stateful fuzz tests in this section, don't be discouraged. Feel free to come back after you finish the rest of the course.

We're going to start just the same as we did in our earlier lessons. Create the following files and folders in the TSwap repo.

- `test/invariant`
- `test/invariant/Invariant.t.sol`
- `test/invariant/Handler.t.sol`

We'll begin with `Invariant.t.sol`!

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract Invariant is StdInvariant, Test {

}
```

The first function we'll need of course is `setUp`. Fortunately the TSwap protocol has a deploy script we can pull from for this, `script/DeployTSwap.t.sol`.

```js
contract DeployTSwap is Script {
    address public constant WETH_TOKEN_MAINNET = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint256 public constant MAINNET_CHAIN_ID = 1;

    function run() public {
        vm.startBroadcast();
        if (block.chainid == MAINNET_CHAIN_ID) {
            new PoolFactory(WETH_TOKEN_MAINNET);
            // We are not on mainnet, assume we are testing
        } else {
            ERC20Mock mockWeth = new ERC20Mock();
            new PoolFactory(address(mockWeth));
        }
        vm.stopBroadcast();
    }
}
```

In this script we can see that the protocol is passing a mockWeth token contract with its deployment of PoolFactory. We can do the same in our test suite `setUp` function, let's create some quick mock ERC20s. Start by creating a mocks folder, `test/mocks` and a file named `ERC20Mock.sol` within. The mock token contract should look like this, and should be very familiar.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor() ERC20("Mock", "MOCK") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

From the understanding we've gained from context of this system, we know that `liquidity pools` are made up of token pairs. We can even check the protocol's unit tests to see how they're handling things in testing - sure enough they have mocks for weth and poolToken.

```js
contract TSwapPoolTest is Test {
    TSwapPool pool;
    ERC20Mock poolToken;
    ERC20Mock weth;
    ...
}
```

We can use our mock to create two separate tokens in `Invariant.t.sol` like this:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {ERC20Mock} from "test/invariant/ERC20Mock.sol";

contract Invariant is StdInvariant, Test {
    ERC20Mock poolToken;
    ERC20Mock weth;

    function setUp() public {}
}
```

> **Remember from the docs:** "You can think of each `TSwapPool` contract as its own exchange between exactly 2 assets, any ERC20 and the WETH token."

Next, we'll of course need to import the `PoolFactory` and `TSwapPool` contracts. With that done we can start adding deployments to our `setUp` function.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { StdInvariant } from "forge-std/StdInvariant.sol";
import { ERC20Mock } from "test/mocks/ERC20Mock.sol";
import { PoolFactory } from "../../src/PoolFactory.sol";
import { TSwapPool } from "../../src/TSwapPool.sol";

contract Invariant is StdInvariant, Test {
    ERC20Mock poolToken;
    ERC20Mock weth;

    PoolFactory factory;
    TSwapPool pool; // poolToken, weth

    function setUp() public {
        poolToken = new ERC20Mock();
        weth = new ERC20Mock();
        factory = new PoolFactory(address(weth));
        pool = TSwapPool(factory.createPool(address(poolToken)));
    }
}
```

Now, from our previous learnings about these pools we know that liquidity needs to be added to a pool by a liquidity provider. This deposited liquidity `jump starts` the pool and actually defines the `x` and `y` terms of our constant product formula. We can set some value to constants which will be used for our minting and depositing of tokens into the TSwapPool.

```js
int256 constant STARTING_X = 100e18 // starting ERC20 / poolToken
int256 constant STARTING_Y = 50e18 // starting WETH

function setUp() public {
        poolToken = new ERC20Mock();
        weth = new ERC20Mock();
        factory = new PoolFactory(address(weth));
        pool = TSwapPool(factory.createPool(address(poolToken)));

        pooltoken.mint(address(this), uint256(STARTING_X));
        weth.mint(address(this), uint256(STARTING_Y));

        poolToken.approve(address(pool), type(uint256).max);
        weth.approve(address(pool), type(uint256).max);

        // Deposit Into Pool
    }
```

At this point we'll have to cheat a little bit and take a look at the deposit function within `TSwapPool.sol`.

```js
function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint,
        uint256 maximumPoolTokensToDeposit,
        uint64 deadline
    )
        external
        revertIfZero(wethToDeposit)
        returns (uint256 liquidityTokensToMint)
    {
        if (wethToDeposit < MINIMUM_WETH_LIQUIDITY) {
            revert TSwapPool__WethDepositAmountTooLow(
                MINIMUM_WETH_LIQUIDITY,
                wethToDeposit
            );
        }
        if (totalLiquidityTokenSupply() > 0) {
            ...
        } else {
            // This will be the "initial" funding of the protocol. We are starting from blank here!
            // We just have them send the tokens in, and we mint liquidity tokens based on the weth
            _addLiquidityMintAndTransfer(
                wethToDeposit,
                maximumPoolTokensToDeposit,
                wethToDeposit
            );
            liquidityTokensToMint = wethToDeposit;
        }
    }
```

I've shortened the above function to focus on what's important. We can see that when `deposit` is called on a pool where `totalLiquidityTokenSupply() == 0` that the `_addLiquidityMintAndTransfer` function is called this initial deposit sets the ratio of tokens as defined by the initial deposit.

Let's add the liquidity deposits to our test's `setUp` function now.

```js
pool.deposit(
  uint256(STARTING_Y),
  uint256(STARTING_Y),
  uint256(STARTING_X),
  uint64(block.timestamp)
);
```

The parameters here are a little confusion, so let me try to break them down:

- Param 1 - `uint256(STARTING_Y)` - amount of `weth` to deposit
- Param 2 - `uint256(STARTING_Y)` - `minimumLiquidityTokensToMint`, this is basically setting what represents 100% of the Liquidity Token supply to start and can be set to whatever the person creating the pool wants
- Param 3 - `uint256(STARTING_X)` - amount of PoolToken to deposit
- Param 4 - `uint64(block.timestamp)` - this is a `deadline` but isn't important to what we're doing. You can ignore this.

Now if we didn't already know about the `Handler` method, we might jump right into writing our test function. Defining our assert and tracking our `∆x` with each swap and assuring the formula `(β/(1-β)) * x` is adhered to is _technically_ possible, but difficult. Validating this invariant is going to be much easier if we leverage a `Handler`. Let's get started on that in the next lesson.
