## Advanced Foundry Testing for Rebase Tokens

This lesson continues our exploration of testing a Rebase Token and its associated Vault contract using the Foundry framework. We'll dive deeper into fuzz testing techniques, handling common DeFi challenges like precision errors, testing access control, and aiming for comprehensive code coverage.

## Advanced Fuzz Testing Techniques

Foundry's fuzz testing is a powerful tool for uncovering edge cases by automatically generating random inputs for test function parameters (like `amount`, `time`, `newInterestRate`). Each set of random inputs constitutes a "run". To make fuzz tests more effective, we often need to guide the input generation.

**Controlling Fuzz Inputs: `vm.assume` vs. `vm.bound`**

Two primary cheatcodes help manage fuzzed inputs:

1.  **`vm.assume(condition)`:** This cheatcode filters inputs *after* they are generated. If the `condition` evaluates to false for a given run, Foundry *discards* that run entirely. This means it doesn't count towards the total number of executed fuzz runs. While useful, it can be inefficient if many generated inputs fail the assumption, leading to fewer effective tests being performed.

    ```solidity
    // Example: Only test if amount is significant (might discard many runs)
    // vm.assume(amount >= 1e5);
    ```

2.  **`amount = vm.bound(variable, lowerBound, upperBound)`:** This cheatcode *modifies* the generated `variable` to ensure it falls within the specified `[lowerBound, upperBound]` range. It typically uses the modulo operator (`%`) internally. Unlike `vm.assume`, it doesn't discard the run; it reshapes the input to fit the desired constraints. This is generally preferred when you want to ensure inputs are within a meaningful range (e.g., positive amounts, non-zero time durations) without losing test runs.

    ```solidity
    // Example: Ensure 'amount' is within a valid range for uint96
    amount = bound(amount, 1e5, type(uint96).max);
    // Example: Ensure 'time' is positive
    time = bound(time, 1, type(uint256).max);
    ```

In our rebase token tests, we heavily rely on `vm.bound` to constrain inputs like deposit amounts and time durations, ensuring we test relevant scenarios efficiently while maximizing the number of executed fuzz runs.

## Handling Precision in DeFi Testing

A core concept of our rebase token is linear interest accrual: a user's balance should increase steadily over time based on the applicable interest rate. However, interactions like deposits, redemptions, or transfers trigger the actual minting of accrued interest up to that point.

Solidity performs integer arithmetic, which involves truncation (rounding down) during division. When working with fixed-point numbers (representing decimals using large base units, like `1e18` for tokens), this truncation can lead to tiny discrepancies, often referred to as "off-by-one" errors (usually 1 wei).

**Testing with Tolerance: `assertApproxEqAbs`**

Direct equality checks using `assertEq(value1, value2)` can often fail in DeFi contracts due to these inherent precision limitations. Foundry provides a solution:

*   **`assertApproxEqAbs(value1, value2, tolerance)`:** This assertion checks if the absolute difference between `value1` and `value2` is less than or equal to the specified `tolerance`.

This allows us to verify calculations involving potential truncation are correct within an acceptable margin of error. We often use a tolerance of `1` (representing 1 wei) when comparing token balances after interest accrual.

## Testing Core Rebase Logic

We developed several tests to verify the fundamental mechanics of the Rebase Token and Vault.

**Linear Interest Accrual (`testDepositLinear`)**

*   **Goal:** Verify that interest accrues linearly over time, assuming no intervening transactions.
*   **Method:**
    1.  Bound the fuzzed `amount` deposit input.
    2.  Deposit `amount`. Record `startBalance`.
    3.  Use `vm.warp(block.timestamp + duration)` to advance time by a set `duration`. Record `middleBalance`.
    4.  Advance time again by the *same* `duration`. Record `endBalance`.
    5.  Assert that `middleBalance > startBalance` and `endBalance > middleBalance`.
    6.  Crucially, assert that the interest earned in the second period approximately equals the interest earned in the first, using `assertApproxEqAbs` with a tolerance of 1 wei to account for potential truncation: `assertApproxEqAbs(endBalance - middleBalance, middleBalance - startBalance, 1)`.

**Immediate Redemption (`testRedeemStraightAway`)**

*   **Goal:** Ensure a user can deposit funds and immediately redeem their entire balance.
*   **Method:**
    1.  Bound the fuzzed `amount`.
    2.  Deposit `amount`. Check the token balance.
    3.  Call `vault.redeem(type(uint256).max)` to redeem the maximum possible amount.
    4.  Assert the user's final token balance is 0.
    5.  Assert the user's final ETH balance has increased by the redeemed `amount`. *(Note: This test initially revealed issues if the Vault contract incorrectly handled the ETH transfer during redemption).*

**Redemption After Interest (`testRedeemAfterTimePassed`)**

*   **Goal:** Verify redemption works correctly after interest has accrued, meaning the user receives more ETH than initially deposited.
*   **Method:**
    1.  Bound `depositAmount` and `time`.
    2.  Deposit `depositAmount`.
    3.  Use `vm.warp` to advance time by `time`.
    4.  Calculate the `balanceAfterSomeTime`.
    5.  **Important:** Simulate rewards accumulating in the Vault. Use `vm.prank(owner)` and `vm.deal(vaultAddress, rewardAmount)` to send the necessary ETH (`balanceAfterSomeTime - depositAmount`) to the Vault contract so it can fulfill the redemption.
    6.  Call `vault.redeem(type(uint256).max)`.
    7.  Assert the user's final ETH balance equals `balanceAfterSomeTime`.
    8.  Assert the final ETH balance is greater than the initial `depositAmount`. *(Note: Careful bounding of inputs is needed to avoid arithmetic overflows/underflows during reward calculation).*

**Token Transfers (`testTransfer`)**

*   **Goal:** Test the `transfer` function and verify how interest rates are handled for recipients.
*   **Method:**
    1.  Bound `amount` (initial deposit) and `amountToSend`. Create a second user (`user2`).
    2.  `user` deposits `amount`.
    3.  Owner *decreases* the global interest rate (to make the check distinct).
    4.  `user` transfers `amountToSend` to `user2`.
    5.  Assert final token balances of `user` and `user2` are correct.
    6.  Assert that *both* `user` and `user2` still have the *original* interest rate associated with `user`'s initial deposit, demonstrating that the rate is effectively "inherited" on transfer in this design.

**Principle Balance Check (`testGetPrincipleAmount`)**

*   **Goal:** Verify the `principleBalanceOf` function correctly returns the user's initial deposit amount, unaffected by accrued interest.
*   **Method:**
    1.  Bound `amount`.
    2.  Deposit `amount`.
    3.  Assert `rebaseToken.principleBalanceOf(user) == amount`.
    4.  Use `vm.warp` to advance time.
    5.  Assert `rebaseToken.principleBalanceOf(user)` *still* equals the original `amount`.

## Verifying Access Control and Error Handling

Testing that only authorized actors can perform sensitive actions and that contracts revert correctly is crucial.

**Handling Custom Errors in Foundry Tests**

Solidity uses custom errors (e.g., `OwnableUnauthorizedAccount(address account)`, `AccessControlUnauthorizedAccount(address account, bytes32 role)`). Testing reverts involving these requires care:

*   `vm.expectRevert()`: Expects *any* revert. Too broad.
*   `vm.expectRevert(bytes memory revertData)`: Expects an *exact* match of the revert data. This often fails for custom errors with arguments because constructing the precise encoded byte string in the test is difficult and brittle.
*   **`vm.expectPartialRevert(bytes4 selector)`:** Expects a revert whose error selector (the first 4 bytes, identifying the error type) matches the provided `selector`. This is the **preferred method** for testing custom errors with arguments, as it ignores the argument values.

To use `expectPartialRevert`, you typically need to import the contract defining the error (e.g., `Ownable.sol`, `IAccessControl.sol`) to access its selector:

```solidity
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IAccessControl } from "@openzeppelin/contracts/access/IAccessControl.sol"; // Or AccessControl.sol

// ... inside test ...

// Expecting an Ownable error
vm.expectPartialRevert(bytes4(Ownable.OwnableUnauthorizedAccount.selector));
// Call expected to revert...

// Expecting an AccessControl error
vm.expectPartialRevert(bytes4(IAccessControl.AccessControlUnauthorizedAccount.selector));
// Call expected to revert...
```

**Access Control Test Cases**

1.  **`testInterestRateCanOnlyDecrease`:**
    *   **Goal:** Enforce a custom rule: the owner can only decrease the interest rate, not increase it.
    *   **Method:**
        *   Get the `initialInterestRate`.
        *   Bound `newInterestRate` to be strictly greater than `initialInterestRate` (`bound(..., initialInterestRate + 1, ...)`).
        *   Use `vm.prank(owner)`.
        *   Use `vm.expectPartialRevert` with the selector of the custom error `RebaseToken__InterestRateCanOnlyDecrease`.
        *   Attempt `rebaseToken.setInterestRate(newInterestRate)`.
        *   Assert the rate remains unchanged.

2.  **`testCannotSetInterestRate`:**
    *   **Goal:** Verify only the owner can call `setInterestRate`.
    *   **Method:**
        *   Use `vm.prank(user)`.
        *   Use `vm.expectPartialRevert` with `Ownable.OwnableUnauthorizedAccount.selector`.
        *   Attempt `rebaseToken.setInterestRate(...)`.

3.  **`testCannotCallMintAndBurn`:**
    *   **Goal:** Verify only accounts with `MINT_AND_BURN_ROLE` can call `mint` and `burn`.
    *   **Method:**
        *   Use `vm.prank(user)` (who doesn't have the role).
        *   Use `vm.expectPartialRevert` with `IAccessControl.AccessControlUnauthorizedAccount.selector`.
        *   Attempt `rebaseToken.mint(user, 100)`.
        *   Use `vm.expectPartialRevert` again.
        *   Attempt `rebaseToken.burn(user, 100)`.

## Measuring Test Effectiveness with Code Coverage

Code coverage measures the percentage of your contract's code (lines, statements, branches, functions) executed by your test suite. High coverage provides greater confidence that your code behaves as expected under various conditions.

Run coverage analysis using: `forge coverage`

After implementing the tests described above, the approximate coverage achieved was:

*   `RebaseToken.sol`: ~77% lines, ~79% statements, ~40% branches, ~92% funcs.
*   `Vault.sol`: ~91% lines, ~92% statements, ~50% branches, 100% funcs.
*   **Total:** ~80% line coverage.

While good, this indicates areas for improvement. Aiming for close to 100% coverage, especially on critical contracts, is recommended. Missing coverage often points to untested edge cases or conditions (e.g., specific revert scenarios like `Vault_RedeemFailed`, or testing `transferFrom`).

## Additional Contract Checks

Simple getter functions should also have basic tests:

**Vault's Token Address (`testGetRebaseTokenAddress`)**

*   **Goal:** Ensure the Vault returns the correct address of its associated RebaseToken.
*   **Method:** Assert `vault.getRebaseTokenAddress() == address(rebaseToken)`.

## Conclusion and Next Steps

Through advanced fuzz testing, careful handling of precision issues using `assertApproxEqAbs`, and robust testing of access control using `expectPartialRevert`, we have significantly increased the quality and reliability of our Rebase Token and Vault contracts. Achieving high code coverage is a key indicator of test suite thoroughness.

While these tests verify the implemented logic, remember that testing doesn't validate the economic design itself (e.g., the implications of interest rate inheritance on transfer).

The next logical step in developing this token ecosystem could involve exploring cross-chain functionality, potentially using bridging protocols like Chainlink CCIP. You are encouraged to expand this test suite to reach higher coverage and address any potential design considerations.