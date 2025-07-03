---
title: Improving Test Coverage To Find A High
---

_Follow along with the video lesson:_

---

### Improving Test Coverage To Find A High

We have a couple more outstanding questions to consider in our notes from throughout our review.

```js
// @Audit-Question: Why are we calculating the fees of flash loans in the deposit function?
uint256 calculatedFee = getCalculatedFee(token, amount);
// @Audit-Question: Why are we updating the exchange rate in the deposit function?
assetToken.updateExchangeRate(calculatedFee);
```

Our review has taught us that `updateExchangeRate` is effectively keeping track of the ratio of `underlying` and `asset tokens`. If the `deposit` function isn't accruing any fees, it doesn't really make sense to be updating this value here...

We need to write some tests.

If we review the existing test suite provided by the protocol, it's clear it leaves much to be desired. There isn't a single test in `ThunderLoanTest.t.sol` which tests the `redeem` function!

<details>
<summary>ThunderLoanTest.t.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test, console } from "forge-std/Test.sol";
import { BaseTest, ThunderLoan } from "./BaseTest.t.sol";
import { AssetToken } from "../../src/protocol/AssetToken.sol";
import { MockFlashLoanReceiver } from "../mocks/MockFlashLoanReceiver.sol";

contract ThunderLoanTest is BaseTest {
    uint256 constant AMOUNT = 10e18;
    uint256 constant DEPOSIT_AMOUNT = AMOUNT * 100;
    address liquidityProvider = address(123);
    address user = address(456);
    MockFlashLoanReceiver mockFlashLoanReceiver;

    function setUp() public override {
        super.setUp();
        vm.prank(user);
        mockFlashLoanReceiver = new MockFlashLoanReceiver(address(thunderLoan));
    }

    function testInitializationOwner() public {
        assertEq(thunderLoan.owner(), address(this));
    }

    function testSetAllowedTokens() public {
        vm.prank(thunderLoan.owner());
        thunderLoan.setAllowedToken(tokenA, true);
        assertEq(thunderLoan.isAllowedToken(tokenA), true);
    }

    function testOnlyOwnerCanSetTokens() public {
        vm.prank(liquidityProvider);
        vm.expectRevert();
        thunderLoan.setAllowedToken(tokenA, true);
    }

    function testSettingTokenCreatesAsset() public {
        vm.prank(thunderLoan.owner());
        AssetToken assetToken = thunderLoan.setAllowedToken(tokenA, true);
        assertEq(address(thunderLoan.getAssetFromToken(tokenA)), address(assetToken));
    }

    function testCantDepositUnapprovedTokens() public {
        tokenA.mint(liquidityProvider, AMOUNT);
        tokenA.approve(address(thunderLoan), AMOUNT);
        vm.expectRevert(abi.encodeWithSelector(ThunderLoan.ThunderLoan__NotAllowedToken.selector, address(tokenA)));
        thunderLoan.deposit(tokenA, AMOUNT);
    }

    modifier setAllowedToken() {
        vm.prank(thunderLoan.owner());
        thunderLoan.setAllowedToken(tokenA, true);
        _;
    }

    function testDepositMintsAssetAndUpdatesBalance() public setAllowedToken {
        tokenA.mint(liquidityProvider, AMOUNT);

        vm.startPrank(liquidityProvider);
        tokenA.approve(address(thunderLoan), AMOUNT);
        thunderLoan.deposit(tokenA, AMOUNT);
        vm.stopPrank();

        AssetToken asset = thunderLoan.getAssetFromToken(tokenA);
        assertEq(tokenA.balanceOf(address(asset)), AMOUNT);
        assertEq(asset.balanceOf(liquidityProvider), AMOUNT);
    }

    modifier hasDeposits() {
        vm.startPrank(liquidityProvider);
        tokenA.mint(liquidityProvider, DEPOSIT_AMOUNT);
        tokenA.approve(address(thunderLoan), DEPOSIT_AMOUNT);
        thunderLoan.deposit(tokenA, DEPOSIT_AMOUNT);
        vm.stopPrank();
        _;
    }

    function testFlashLoan() public setAllowedToken hasDeposits {
        uint256 amountToBorrow = AMOUNT * 10;
        uint256 calculatedFee = thunderLoan.getCalculatedFee(tokenA, amountToBorrow);
        vm.startPrank(user);
        tokenA.mint(address(mockFlashLoanReceiver), AMOUNT);
        thunderLoan.flashloan(address(mockFlashLoanReceiver), tokenA, amountToBorrow, "");
        vm.stopPrank();

        assertEq(mockFlashLoanReceiver.getBalanceDuring(), amountToBorrow + AMOUNT);
        assertEq(mockFlashLoanReceiver.getBalanceAfter(), AMOUNT - calculatedFee);
    }
}
```

</details>


This seems like a good place to start as it will weed out any issues that may arise from the issue we identified in `deposit` outlined above.

We can borrow heavily from the existing test suite to speed the process of writing this test along. There are two convenient modifiers we can use which cover the setting of allowed tokens and the depositing of liquidity for us.

```js
modifier hasDeposits() {
    vm.startPrank(liquidityProvider);
    tokenA.mint(liquidityProvider, DEPOSIT_AMOUNT);
    tokenA.approve(address(thunderLoan), DEPOSIT_AMOUNT);
    thunderLoan.deposit(tokenA, DEPOSIT_AMOUNT);
    vm.stopPrank();
    _;
}

modifier setAllowedToken() {
    vm.prank(thunderLoan.owner());
    thunderLoan.setAllowedToken(tokenA, true);
    _;
}
```

Before we can redeem anything we'll have to execute a flash loan in our test. We can scavenge most of the `testFlashLoan` function for this purpose. Our test will look something like this so far:

```js
function testRedeemAfterLoan() public setAllowedToken hasDeposits {
    uint256 amountToBorrow = AMOUNT * 10;
    uint256 calculatedFee = thunderLoan.getCalculatedFee(tokenA, amountToBorrow);
    // User is minting the fee needed to repay the flash loan.
    // Note that the original testFlashLoan function is minting MORE than necessary
    tokenA.mint(address(mockFlashLoanReceiver), calculatedFee);

    vm.startPrank(user);
    thunderLoan.flashloan(address(mockFlashLoanReceiver), tokenA, amountToBorrow, "");
    vm.stopPrank();
}
```

Our test, when calling `flashloan` is going to pass `mockFlashLoanReceiver` as its target address. We know from a previous lesson that this contract simply receives the loan, and then repays it by calling the repay function of `ThunderLoan`.

<details>
<summary>MockFlashLoanReceiver.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IFlashLoanReceiver } from "../../src/interfaces/IFlashLoanReceiver.sol";
import { IThunderLoan } from "../../src/interfaces/IThunderLoan.sol";

contract MockFlashLoanReceiver {
    error MockFlashLoanReceiver__onlyOwner();
    error MockFlashLoanReceiver__onlyThunderLoan();

    using SafeERC20 for IERC20;

    address s_owner;
    address s_thunderLoan;

    uint256 s_balanceDuringFlashLoan;
    uint256 s_balanceAfterFlashLoan;

    constructor(address thunderLoan) {
        s_owner = msg.sender;
        s_thunderLoan = thunderLoan;
        s_balanceDuringFlashLoan = 0;
    }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        address initiator,
        bytes calldata /*  params */
    )
        external
        returns (bool)
    {
        s_balanceDuringFlashLoan = IERC20(token).balanceOf(address(this));
        if (initiator != s_owner) {
            revert MockFlashLoanReceiver__onlyOwner();
        }
        if (msg.sender != s_thunderLoan) {
            revert MockFlashLoanReceiver__onlyThunderLoan();
        }
        IERC20(token).approve(s_thunderLoan, amount + fee);
        IThunderLoan(s_thunderLoan).repay(token, amount + fee);
        s_balanceAfterFlashLoan = IERC20(token).balanceOf(address(this));
        return true;
    }

    function getBalanceDuring() external view returns (uint256) {
        return s_balanceDuringFlashLoan;
    }

    function getBalanceAfter() external view returns (uint256) {
        return s_balanceAfterFlashLoan;
    }
}
```

</details>


Ok, now we know that the exchange rate is being updated when `deposit` is called (in this case in our modifier), as well as when `flashloan` is called. Let's add a call to redeem into our test, at this point we'd expect a liquidity provider to be able to redeem their asset tokens in exchange for underlying.

```js
function testRedeemAfterLoan() public setAllowedToken hasDeposits {
    uint256 amountToBorrow = AMOUNT * 10;
    uint256 calculatedFee = thunderLoan.getCalculatedFee(tokenA, amountToBorrow);
    // User is minting the fee needed to repay the flash loan.
    // Note that the original testFlashLoan function is minting MORE than necessary
    tokenA.mint(address(mockFlashLoanReceiver), calculatedFee);

    vm.startPrank(user);
    thunderLoan.flashloan(address(mockFlashLoanReceiver), tokenA, amountToBorrow, "");
    vm.stopPrank();

    uint256 amountToRedeem = type(uint256).max; // as per ThunderLoan::redeem, this will transfer a liquidity provider's whole balance.
    vm.startPrank(liquidityProvider);
    thunderLoan.redeem(tokenA, amountToRedeem);
}
```

Already, we should be able to run this test to determine if there's an issue here...

```bash
forge test --mt testRedeemAfterLoan -vvvv
```

![improving-test-coverage-to-find-a-high1](/security-section-6/37-improving-test-coverage-to-find-a-high/improving-test-coverage-to-find-a-high1.png)

Oh snap. Let's take a closer look at the trace output to determine where the test is failing.

![improving-test-coverage-to-find-a-high2](/security-section-6/37-improving-test-coverage-to-find-a-high/improving-test-coverage-to-find-a-high2.png)

We can clearly see from the trace that `transferUnderlyingTo` is failing because `AssetToken` has an insufficient balance... I wonder if commenting out the weird `updateExchangeRate` in our `deposit` function would resolve this. Let's give it a try...

```js
function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
    emit Deposit(msg.sender, token, amount);
    assetToken.mint(msg.sender, mintAmount);

    // uint256 calculatedFee = getCalculatedFee(token, amount);
    // assetToken.updateExchangeRate(calculatedFee);

    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

Now run the test once more.

```bash
forge test --mt testRedeemAfterLoan -vvvv
```

![improving-test-coverage-to-find-a-high3](/security-section-6/37-improving-test-coverage-to-find-a-high/improving-test-coverage-to-find-a-high3.png)

WOOOOO! We found something! The `updateExchangeRate` function effectively keeps track of how much money is in the protocol at all times. By calling this function within `deposit` (when the protocol isn't expecting to gain value through fees) the expected amount to withdraw is breaking when a `liquidity provider` calls `redeem`.

This is a `high severity` finding _for sure_. This would brick the protocol.

```js
// @Audit-High - We should not be updating the exchange rate in the deposit function, this breaks the internal accounting of AssetToken making it impossible to redeem
```

Finding a high is something to really get excited about! We came a long way to find this massive bug.

> **Remember:** Security Reviews are _not_ linear!

### Write Ups

For the rest of section 6, we're going to write up our reports for vulnerabilities _as_ we find them. A lot of times you'll do this at the end, but the next couple findings involve some really common attack vectors that are important to dial in and I want you to get really good at spotting them.

### Reporting: Reward Manipulation

Let's do the write up for this! We can set things up just like our previous reviews.

Create a folder in the workspace titled `audit-data` and within it create our `finding_layout.md` file. This should be a familiar process by now! Paste our report template into this file ([**template**](https://github.com/Cyfrin/6-thunder-loan-audit/blob/audit-data/audit-data/finding_layout.md)).

Finally, create a new file in `audit-data`, titled `findings.md`, and let's begin some of our write-ups!

### [H-1]

```
### [H-1] Erroneous `ThunderLoan::updateExchange` in the `deposit` function causes protocol to think it has more fees than it really does, which blocks redemption and incorrectly sets the exchange rate
```

Something of note, for this title is that we've identified two separate impacts resulting from the same root cause.

A general rule of thumb for findings is that any impact derived from a single root cause is included in a single findings/write-up.

<details>
<summary>[H-1] Erroneous `ThunderLoan::updateExchange` in the `deposit` function causes protocol to think it has more fees than it really does, which blocks redemption and incorrectly sets the exchange rate</summary>

### [H-1] Erroneous `ThunderLoan::updateExchange` in the `deposit` function causes protocol to think it has more fees than it really does, which blocks redemption and incorrectly sets the exchange rate

**Description:** In the ThunderLoan system, the `exchangeRate` is responsible for calculating the exchange rate between asset tokens and underlying tokens. In a way it's responsible for keeping track of how many fees to give liquidity providers.

However, the `deposit` function updates this rate without collecting any fees!

```js
function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
    emit Deposit(msg.sender, token, amount);
    assetToken.mint(msg.sender, mintAmount);

    // @Audit-High
@>  // uint256 calculatedFee = getCalculatedFee(token, amount);
@>  // assetToken.updateExchangeRate(calculatedFee);

    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

**Impact:** There are several impacts to this bug.

1. The `redeem` function is blocked, because the protocol thinks the amount to be redeemed is more than it's balance.
2. Rewards are incorrectly calculated, leading to liquidity providers potentially getting way more or less than they deserve.

**Proof of Concept:**

1. LP deposits
2. User takes out a flash loan
3. It is now impossible for LP to redeem

<details>
<summary>Proof of Code</summary>

Place the following into ThunderLoanTest.t.sol:

```js
function testRedeemAfterLoan() public setAllowedToken hasDeposits {
    uint256 amountToBorrow = AMOUNT * 10;
    uint256 calculatedFee = thunderLoan.getCalculatedFee(tokenA, amountToBorrow);
    tokenA.mint(address(mockFlashLoanReceiver), calculatedFee);

    vm.startPrank(user);
    thunderLoan.flashloan(address(mockFlashLoanReceiver), tokenA, amountToBorrow, "");
    vm.stopPrank();

    uint256 amountToRedeem = type(uint256).max;
    vm.startPrank(liquidityProvider);
    thunderLoan.redeem(tokenA, amountToRedeem);
}
```

</details>

**Recommended Mitigation:** Remove the incorrect updateExchangeRate lines from `deposit`

```diff
function deposit(IERC20 token, uint256 amount) external revertIfZero(amount) revertIfNotAllowedToken(token) {
    AssetToken assetToken = s_tokenToAssetToken[token];
    uint256 exchangeRate = assetToken.getExchangeRate();
    uint256 mintAmount = (amount * assetToken.EXCHANGE_RATE_PRECISION()) / exchangeRate;
    emit Deposit(msg.sender, token, amount);
    assetToken.mint(msg.sender, mintAmount);

-   uint256 calculatedFee = getCalculatedFee(token, amount);
-   assetToken.updateExchangeRate(calculatedFee);

    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

</details>

### Wrap Up

We've recorded our first high! This report is looking sick. We should absolutely celebrate this win and keep going - we've many more questions to answer now.
