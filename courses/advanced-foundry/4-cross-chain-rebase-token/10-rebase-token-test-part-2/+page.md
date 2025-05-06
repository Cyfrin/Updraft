# Advanced Smart Contract Testing: Rebase Token Fuzzing and Debugging

Welcome back to our series on developing and testing Web3 applications. In this lesson, we continue building a robust test suite for our `RebaseToken` and `Vault` smart contracts using the Foundry framework. We'll focus on advanced techniques like fuzz testing, handling precision issues, testing access control, and debugging failed tests effectively.

## Key Concepts in Foundry Testing

Before diving into specific tests, let's recap some crucial Foundry concepts and cheatcodes used throughout this lesson:

1.  **Fuzz Testing:** Instead of writing tests with fixed inputs, fuzz tests allow Foundry to generate random inputs for function parameters within specified constraints. This helps uncover edge cases and unexpected behavior across many test runs.
2.  **`vm.bound` vs. `vm.assume`:**
    *   `vm.assume(condition)`: Filters fuzzed inputs. If the condition is false for a generated input, Foundry *discards* that entire test run. This is useful for basic input validation but can significantly reduce the number of effective tests if the condition is too restrictive.
    *   `vm.bound(variable, min, max)`: A powerful alternative for fuzzing. Instead of discarding runs, `bound` *modifies* the input `variable` (using a modulus operation internally) to ensure it falls within the specified `min` and `max` range. This preserves the test run, maximizing test coverage within the desired input space. We prefer `bound` to "preserve as many runs as possible."
3.  **Linear Interest Accrual:** Our `RebaseToken` is designed so that each user's balance increases linearly over time based on their individual interest rate. Tests must verify this property.
4.  **Precision and Truncation:** Solidity performs integer division, which truncates (rounds down) any remainder. This is common in fixed-point arithmetic (like using `1e18` as a base unit). When calculating balances after interest accrual, which involves division, this truncation can lead to small discrepancies (often 1 wei) compared to theoretical calculations. Tests need to account for this potential off-by-one error, often using approximate equality checks.
5.  **Code Coverage (`forge coverage`):** This Foundry command measures the percentage of your contract code executed by your test suite. Aiming for high coverage helps ensure most code paths are tested, increasing confidence in the contract's correctness.
6.  **Access Control:** We use standard patterns like OpenZeppelin's `Ownable` (for single-owner functions) and `AccessControl` (for role-based permissions, like `MINT_AND_BURN_ROLE` for the Vault) to restrict sensitive operations. Tests must verify these restrictions are enforced.
7.  **Custom Errors & Reverts:** Solidity allows defining custom errors for more gas-efficient and informative reverts (e.g., `OwnableUnauthorizedAccount`, `AccessControlUnauthorizedAccount`). Testing reverts that use custom errors, especially those with arguments, often requires Foundry's `vm.expectPartialRevert` cheatcode, which checks if the revert data *starts with* the specified error selector, rather than `vm.expectRevert` which may struggle with argument matching.
8.  **Foundry Cheatcodes:** We leverage various cheatcodes (prefixed with `vm.`):
    *   `vm.prank(address)` / `vm.startPrank(address)`: Impersonate an address for the next call or a block of calls.
    *   `vm.deal(address, amount)`: Set the ETH balance of an address.
    *   `vm.warp(timestamp)`: Set the blockchain's timestamp (`block.timestamp`).
    *   `vm.expectRevert()` / `vm.expectPartialRevert()`: Assert that the next call reverts with a specific error.
    *   `makeAddr(string)`: Create deterministic addresses for test actors (e.g., `user`, `owner`).

## Testing Deposit and Linear Interest Accrual

Our first goal is to verify that interest accrues linearly after a user deposits ETH into the Vault and receives `RebaseToken`.

**Test:** `testDepositLinear`

*   **Goal:** Ensure interest earned over two consecutive, equal time periods is (approximately) the same.
*   **Setup:**
    *   Fuzz the `amount` deposited. Use `vm.bound` to keep the amount within a reasonable range (e.g., `1e5` to `type(uint96).max`). This ensures the test runs even if Foundry initially generates a very small or zero amount.
    *   Create a `user` address.
    *   Use `vm.deal` to give the `user` enough ETH for the deposit.
    *   Use `vm.prank(user)` to make the `user` execute the deposit call to the `vault`.
*   **Logic & Checks:**
    1.  Deposit `amount`.
    2.  Record the initial `RebaseToken` balance (`startBalance`). Assert it equals the deposited `amount`.
    3.  Use `vm.warp(block.timestamp + 1 hours)` to simulate one hour passing.
    4.  Record the balance again (`middleBalance`). Assert it's greater than `startBalance`.
    5.  Warp time forward by another hour: `vm.warp(block.timestamp + 1 hours)`.
    6.  Record the final balance (`endBalance`). Assert it's greater than `middleBalance`.
    7.  **Crucially:** Assert that the interest accrued in the second hour (`endBalance - middleBalance`) is approximately equal to the interest accrued in the first hour (`middleBalance - startBalance`). Due to potential truncation in the `balanceOf` calculation (which involves division by a precision factor), we use `assertApproxEqAbs` with a tolerance of 1 wei.

```solidity
function testDepositLinear(uint256 amount) public {
    // Use bound instead of assume to keep more runs
    amount = bound(amount, 1e5, type(uint96).max);

    // 1. Deposit
    vm.deal(user, amount);
    vm.prank(user);
    vault.deposit{value: amount}();

    // 2. Check initial balance
    uint256 startBalance = rebaseToken.balanceOf(user);
    assertEq(startBalance, amount);

    // 3. Warp time, check balance increases
    vm.warp(block.timestamp + 1 hours);
    uint256 middleBalance = rebaseToken.balanceOf(user);
    assertGt(middleBalance, startBalance);

    // 4. Warp time again, check balance increases
    vm.warp(block.timestamp + 1 hours);
    uint256 endBalance = rebaseToken.balanceOf(user);
    assertGt(endBalance, middleBalance);

    // 5. Check linearity with tolerance for truncation
    // Initial attempt: assertEq(endBalance - middleBalance, middleBalance - startBalance); // Fails due to truncation
    assertApproxEqAbs(endBalance - middleBalance, middleBalance - startBalance, 1); // Correct approach
}
```

*   **Debugging Insight:** The initial use of `assertEq` for the linearity check failed due to a 1 wei difference caused by integer division truncation within the `balanceOf` function. Switching to `assertApproxEqAbs(..., ..., 1)` resolved this by allowing for a small, expected discrepancy.

## Testing Redemption Logic

Next, we test the `redeem` functionality, allowing users to exchange their `RebaseToken` back for ETH.

**Test 1:** `testRedeemStraightAway`

*   **Goal:** Verify a user can deposit and immediately redeem their full token balance for the original ETH amount.
*   **Setup:** Similar deposit setup as `testDepositLinear`.
*   **Logic & Checks:**
    1.  Perform the deposit. Check the token balance matches the deposited amount.
    2.  Record the user's ETH balance *before* redemption (`startEthBalance`).
    3.  Using `vm.prank(user)`, call `vault.redeem(type(uint256).max)`. We use `type(uint256).max` as a convention to signify "redeem the entire balance".
    4.  Assert the user's `RebaseToken` balance is now zero.
    5.  Assert the user's ETH balance is now `startEthBalance + amount` (they received their initial deposit back).

```solidity
function testRedeemStraightAway(uint256 amount) public {
    amount = bound(amount, 1e5, type(uint96).max);

    // 1. Deposit
    vm.deal(user, amount);
    vm.prank(user);
    vault.deposit{value: amount}();
    assertEq(rebaseToken.balanceOf(user), amount);

    // 2. Redeem
    uint256 startEthBalance = address(user).balance;
    vm.prank(user); // Still acting as user
    vault.redeem(type(uint256).max); // Redeem entire balance

    // 3. Check balances
    assertEq(rebaseToken.balanceOf(user), 0);
    assertEq(address(user).balance, startEthBalance + amount);
}
```

*   **Debugging Insight:** This test initially failed with a `Vault_RedeemFailed` error. The `Vault.redeem` function didn't understand the `type(uint256).max` convention. The fix involved modifying `Vault.redeem` to explicitly check for this maximum value and, if found, query the user's actual `RebaseToken` balance to determine the amount to redeem. This also required adding the `balanceOf` function signature to the `IRebaseToken` interface used by the Vault.

**Test 2:** `testRedeemAfterTimePassed`

*   **Goal:** Verify redeeming works correctly after interest has accrued. The user should receive their initial deposit plus the earned interest back in ETH.
*   **Setup:**
    *   Fuzz `depositAmount` and `time` elapsed. Bound them appropriately (e.g., `time >= 1000` seconds to ensure some interest accrues, amount >= `1e5`).
    *   `user` deposits `depositAmount`.
    *   `vm.warp(block.timestamp + time)` to simulate time passing.
    *   Calculate the user's `RebaseToken` balance after time (`balanceAfterSomeTime`).
    *   **Crucially:** The Vault needs ETH to pay out the accrued interest (rewards). The contract owner (or a designated rewards address) must fund the Vault.
        *   Calculate `rewardAmount = balanceAfterSomeTime - depositAmount`.
        *   Use `vm.deal(owner, rewardAmount)` to give the owner the necessary ETH.
        *   Use `vm.prank(owner)` and a helper function `addRewardsToVault(rewardAmount)` (which simply sends ETH to the Vault address) to fund the Vault.
*   **Logic & Checks:**
    1.  Record the user's ETH balance before redeeming (`ethBalance`).
    2.  `vm.prank(user)` calls `vault.redeem(type(uint256).max)`.
    3.  Assert the user's `RebaseToken` balance is zero.
    4.  Assert the user's final ETH balance equals `ethBalance + balanceAfterSomeTime` (initial ETH + deposit + interest).
    5.  Assert the user's final ETH balance is greater than their initial ETH balance plus the `depositAmount` (confirming they received interest).

```solidity
// Helper function to send ETH to the vault
function addRewardsToVault(uint256 rewardAmount) internal {
     (bool success,) = payable(address(vault)).call{value: rewardAmount}("");
     // For test setup, we might omit the success check, assuming it works.
     // In production tests, asserting success might be desired.
}

function testRedeemAfterTimePassed(uint256 depositAmount, uint256 time) public {
    // Bound inputs
    depositAmount = bound(depositAmount, 1e5, type(uint256).max); // Use uint256 for amount
    time = bound(time, 1000, type(uint256).max / 1e18); // Bound time to avoid overflow in interest calc

    // 1. Deposit
    vm.deal(user, depositAmount);
    vm.prank(user);
    vault.deposit{value: depositAmount}();

    // 2. Warp time
    vm.warp(block.timestamp + time);
    uint256 balanceAfterSomeTime = rebaseToken.balanceOf(user);

    // 3. Fund vault with rewards
    uint256 rewardAmount = balanceAfterSomeTime - depositAmount;
    vm.deal(owner, rewardAmount); // Give owner ETH first
    vm.prank(owner);
    addRewardsToVault(rewardAmount); // Owner sends rewards

    // 4. Redeem
    uint256 ethBalanceBeforeRedeem = address(user).balance;
    vm.prank(user);
    vault.redeem(type(uint256).max);

    // 5. Check balances
    assertEq(rebaseToken.balanceOf(user), 0);
    assertEq(address(user).balance, ethBalanceBeforeRedeem + balanceAfterSomeTime);
    assertGt(address(user).balance, ethBalanceBeforeRedeem + depositAmount); // Ensure interest was received
}

```

*   **Debugging Insight:** This test faced arithmetic overflow/underflow issues. Debugging revealed potential problems:
    *   Large fuzzed `time` values could cause overflow *inside* the contract's interest calculation *before* division by the precision factor. Bounding `time` more carefully helps.
    *   The `owner` needs ETH *before* trying to send rewards to the Vault. Using `vm.deal(owner, ...)` before the `addRewardsToVault` call is essential.
    *   Ensure correct subtraction order for `rewardAmount`.
    *   Using `vm.prank` for single calls can be clearer than `vm.startPrank`/`vm.stopPrank` blocks.

## Testing Token Transfers and Interest Rate Inheritance

We need to ensure `RebaseToken` can be transferred and that the interest rate mechanism behaves correctly upon transfer. Our design dictates that the recipient inherits the *sender's* interest rate at the time of transfer, not the current global rate.

**Test:** `testTransfer`

*   **Goal:** Verify token transfers work and the recipient inherits the sender's interest rate.
*   **Setup:**
    *   Fuzz `amount` (initial deposit) and `amountToSend`. Use `vm.bound` to ensure `amountToSend` is less than `amount` but still significant.
    *   `user` deposits `amount`.
    *   Create a recipient `user2 = makeAddr("user2")`.
    *   Check initial balances (`user` has `amount`, `user2` has 0).
    *   Using `vm.prank(owner)`, call `rebaseToken.setInterestRate()` to *lower* the global interest rate after the initial deposit (e.g., from `5e10` to `4e10`).
*   **Logic & Checks:**
    1.  Using `vm.prank(user)`, call `rebaseToken.transfer(user2, amountToSend)`.
    2.  Check the final balances of `user` and `user2`.
    3.  Assert that `rebaseToken.getUserInterestRate(user)` still returns the original rate (`5e10`).
    4.  Assert that `rebaseToken.getUserInterestRate(user2)` also returns the sender's original rate (`5e10`), demonstrating inheritance, *not* the new global rate (`4e10`).

```solidity
function testTransfer(uint256 amount, uint256 amountToSend) public {
    // Bound inputs, ensure amount > amountToSend
    amount = bound(amount, 2e5, type(uint96).max); // Ensure enough to send
    amountToSend = bound(amountToSend, 1e5, amount - 1e5); // Ensure sender keeps some

    // 1. Deposit with initial rate (e.g., 5e10 assumed default)
    vm.deal(user, amount);
    vm.prank(user);
    vault.deposit{value: amount}();

    address user2 = makeAddr("user2");
    uint256 userBalanceBefore = rebaseToken.balanceOf(user);
    uint256 user2BalanceBefore = rebaseToken.balanceOf(user2);
    assertEq(userBalanceBefore, amount);
    assertEq(user2BalanceBefore, 0);

    // 2. Owner lowers the global interest rate
    uint256 originalRate = rebaseToken.getUserInterestRate(user); // Assume 5e10
    uint256 newRate = originalRate / 2; // Example: 4e10 or similar lower rate
    vm.prank(owner);
    rebaseToken.setInterestRate(newRate);

    // 3. Transfer tokens
    vm.prank(user);
    rebaseToken.transfer(user2, amountToSend);

    // 4. Check final balances
    assertEq(rebaseToken.balanceOf(user), userBalanceBefore - amountToSend);
    assertEq(rebaseToken.balanceOf(user2), amountToSend);

    // 5. Check interest rate inheritance
    assertEq(rebaseToken.getUserInterestRate(user), originalRate); // User keeps original rate
    assertEq(rebaseToken.getUserInterestRate(user2), originalRate); // User2 inherits sender's original rate
}
```

*   **Debugging Insight:** This test initially failed with a custom error `RebaseToken__InterestRateCanOnlyDecrease`. The logic in the `setInterestRate` function was mistakenly reverting if `_newInterestRate <= s_interestRate`. The fix was to correct the condition to `if (_newInterestRate > s_interestRate)` to only prevent *increasing* the rate.

## Testing Access Control

We must verify that functions protected by `onlyOwner` or specific roles cannot be called by unauthorized accounts.

**Tests:** `testCannotSetInterestRate`, `testCannotCallMintAndBurn`

*   **Goal:** Ensure non-owners cannot call `setInterestRate` and non-role-holders (like `user`) cannot call `mint` or `burn`.
*   **Setup:** Use `vm.prank(user)` to impersonate an unauthorized caller.
*   **Logic & Checks:**
    1.  Use `vm.expectPartialRevert(bytes4(ErrorName.selector))` before the call. We need `expectPartialRevert` because custom errors like `OwnableUnauthorizedAccount` and `AccessControlUnauthorizedAccount` often include arguments (like the caller's address and the required role) that `expectRevert` struggles to match precisely. `expectPartialRevert` checks if the start of the revert data matches the error selector.
    2.  Import the relevant contracts (`Ownable.sol`, `IAccessControl.sol` or `AccessControl.sol`) from OpenZeppelin to access the error selectors (e.g., `Ownable.OwnableUnauthorizedAccount.selector`).
    3.  Call the restricted function (`setInterestRate`, `mint`, `burn`). The test passes if the call reverts with the expected error selector.

```solidity
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IAccessControl } from "@openzeppelin/contracts/access/IAccessControl.sol"; // Or AccessControl.sol if using implementation errors

function testCannotSetInterestRate(uint256 newInterestRate) public {
    vm.prank(user); // Impersonate unauthorized user
    // Expect revert with Ownable's specific error selector
    vm.expectPartialRevert(bytes4(Ownable.OwnableUnauthorizedAccount.selector));
    rebaseToken.setInterestRate(newInterestRate);
}

function testCannotCallMintAndBurn() public {
    vm.prank(user); // Impersonate unauthorized user

    // Test mint
    // Expect revert with AccessControl's specific error selector
    vm.expectPartialRevert(bytes4(IAccessControl.AccessControlUnauthorizedAccount.selector));
    rebaseToken.mint(user, 100);

    // Test burn (requires separate expectRevert)
    vm.prank(user); // Re-prank if needed, though context might persist
    vm.expectPartialRevert(bytes4(IAccessControl.AccessControlUnauthorizedAccount.selector));
    rebaseToken.burn(user, 100);
}
```

*   **Debugging Insight:** The key here was realizing `vm.expectRevert` doesn't work reliably with custom errors containing arguments. Switching to `vm.expectPartialRevert` and providing the `bytes4` selector of the expected custom error is the correct approach.

## Checking Principal Balance

A quick test to ensure the underlying principal balance (excluding accrued interest) doesn't change just because time passes.

**Test:** `testGetPrincipalBalance` (or similar name)

*   **Goal:** Verify the principal balance remains constant over time if no interactions occur.
*   **Setup:** User deposits `amount`.
*   **Logic & Checks:**
    1.  Check the principal balance using `rebaseToken.principalBalanceOf(user)` (assuming this function reads the underlying stored balance). Assert it equals `amount`.
    2.  `vm.warp(block.timestamp + 1 hours)`.
    3.  Check the principal balance again. Assert it still equals `amount`.

```solidity
function testGetPrincipalBalance(uint256 amount) public {
    amount = bound(amount, 1e5, type(uint96).max);

    // 1. Deposit
    vm.deal(user, amount);
    vm.prank(user);
    vault.deposit{value: amount}();

    // 2. Check principal balance
    // Assuming function is named principleBalanceOf or similar
    assertEq(rebaseToken.principleBalanceOf(user), amount);

    // 3. Warp time
    vm.warp(block.timestamp + 1 hours);

    // 4. Check principal balance again - should be unchanged
    assertEq(rebaseToken.principleBalanceOf(user), amount);
}
```

## Code Coverage and Next Steps

After adding these tests, running `forge coverage` shows significant improvement:
*   `Vault.sol`: ~91% coverage. The remaining untested code is likely the revert path if sending ETH fails during redemption, which is often acceptable to leave untested in standard setups.
*   `RebaseToken.sol`: ~77% coverage. This is good, but there's room for improvement. Functions like `approve` and `transferFrom` still need tests.

**Conclusion:**
We've built a more comprehensive test suite using Foundry's fuzz testing, cheatcodes, and assertion tools. We've addressed common issues like precision errors and learned how to test custom error reverts effectively. While coverage is good, striving for 100% on the core token logic is recommended.

Remember that unit and integration tests primarily verify functional correctness. They may not catch all potential economic exploits or design flaws related to the interest rate mechanism or broader market interactions. These require separate analysis and potentially different types of testing or simulation.

Our next step will be to explore how to make this token bridgeable for cross-chain interactions.