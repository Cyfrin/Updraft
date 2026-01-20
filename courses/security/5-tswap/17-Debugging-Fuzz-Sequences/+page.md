---
title: Debugging Fuzz Sequences
---

---

### Debugging Fuzz Sequences

Alright! The moment of truth, let's run our test with:

```bash
forge test --mt statefulFuzz_testInvariantBreaksHandler
```

![debugging-fuzz-sequences1](/security-section-5/16-debugging-fuzz-sequences/debugging-fuzz-sequences1.png)

Oh no! Something went wrong. We can see `assertion violated` in the output, but there's not a lot of information. In situations like this, we should leverage the `-vvvv` flag.

> `-vvvv` can be used to increase the _verbosity_ of an output, often providing additional data or insight.

Let's try it again:

```bash
forge test --mt statefulFuzz_testInvariantBreaksHandler -vvvv
```

A couple things stand out in this more robust output now (I've highlighted them in blue in the screenshot above). First, the error we're getting seems to be `ERC20InsufficientAllowance`.

The reason seems to be that we're calling `transferFrom` on a random address. Whoops! It seems we didn't set our handler as the targetContract in our test - we only set the function selectors! Let's rectify this now.

```js
function setUp() public {
    vm.startPrank(user);
    mockUSDC = new MockUSDC();
    yieldERC20 = new YieldERC20();
    startingAmount = yieldERC20.INITIAL_SUPPLY();
    mockUSDC.mint(user, startingAmount);
    vm.stopPrank();
    supportedTokens.push(IERC20(address(yieldERC20)));
    supportedTokens.push(IERC20(address(mockUSDC)));
    handlerStatefulFuzzCatches = new HandlerStatefulFuzzCatches(supportedTokens);
    handler = new Handler(handlerStatefulFuzzCatches, mockUSDC, yieldERC20, user); // HANDLER INITIALIZED

    bytes4[] memory selectors = new bytes4[](4); // SPECIFY SELECTORS TO FUZZ
    selectors[0] = handler.depositYieldERC20.selector;
    selectors[1] = handler.depositMockUSDC.selector;
    selectors[2] = handler.withdrawYieldERC20.selector;
    selectors[3] = handler.withdrawMockUSDC.selector;

    targetSelector(FuzzSelector({addr: address(handler), selectors: selectors})); // SET TARGET SELECTORS
    targetContract(address(handler)); // SET TARGET CONTRACT TO HANDLER
}
```

Now let's try it.

![debugging-fuzz-sequences2](/security-section-5/16-debugging-fuzz-sequences/debugging-fuzz-sequences2.png)

Alright! It looks like we may have found something! We're seeing an error of `ERC20InsufficientBalance` when calling `withdrawToken` on `yieldERC20`. That's odd. Let's look at the `withdrawToken` function again.

```js
function withdrawToken(IERC20 token) external requireSupportedToken(token) {
    uint256 currentBalance = tokenBalances[msg.sender][token];
    tokenBalances[msg.sender][token] = 0;
    token.safeTransfer(msg.sender, currentBalance);
}
```

Nothing out of the ordinary it seems, we're just calling `safeTransfer` on the token. Maybe we need to take a closer look at `YieldERC20.sol`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YieldERC20 is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000e18;
    address public immutable owner;
    // We take a fee once every 10 transactions
    uint256 public count = 0;
    uint256 public constant FEE = 10;
    uint256 public constant USER_AMOUNT = 90;
    uint256 public constant PRECISION = 100;

    constructor() ERC20("MockYieldERC20", "MYIELD") {
        owner = msg.sender;
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`
     * (or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding
     * this function.
     *
     * Every 10 transactions, we take a fee of 10% and send it to the owner.
     */
    function _update(address from, address to, uint256 value) internal virtual override {
        if (to == owner) {
            super._update(from, to, value);
        } else if (count >= 10) {
            uint256 userAmount = value * USER_AMOUNT / PRECISION;
            uint256 ownerAmount = value * FEE / PRECISION;
            count = 0;
            super._update(from, to, userAmount);
            super._update(from, owner, ownerAmount);
        } else {
            count++;
            super._update(from, to, value);
        }
    }
}

```

Ah ha! This `_update` function is sending a 10% fee to the owner of YieldERC20 every 10 transactions. This is why our `withdrawTokens` function was throwing an `ERC20InsufficientBalance` error - `HandlerStatefulFuzzCatches.sol` doesn't have enough `YieldERC20` to pay the fee!

This is actually a fairly common situation known is a `Fee on Transfer` token and they exist in a classification of vulnerabilities known as `Weird ERC20s`.

We executed handler-based stateful fuzz testing in order to pinpoint this potential problem in our contract! This should clearly demonstrate how powerful a tool this method of fuzz testing can be.

Let's recap everything we've learn about fuzzing.
