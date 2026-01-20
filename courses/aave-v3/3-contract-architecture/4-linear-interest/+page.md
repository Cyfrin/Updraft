## Understanding Interest Mechanics in Web3 Lending Protocols

In decentralized finance (DeFi) lending protocols like Aave V3, accurately calculating interest for both borrowers and suppliers is crucial. While the underlying mechanisms differ, a core concept known as a "rate accumulator function" can be adapted to serve both purposes. This lesson explores how interest is calculated for debt and supplied tokens, highlighting these differences and the elegant solution that unifies their calculation.

## The Rate Accumulator Function for Debt

At the heart of debt calculation lies the **rate accumulator function**, which we'll denote as `R(n)`. This function quantifies the cumulative effect of compounding interest over time.

Its definition is:
```
R(n) = (1 + r₀)(1 + r₁)(1 + r₂)...(1 + rₙ)
```
Where `rᵢ` represents the interest rate for the i-th second.

**Key characteristics of debt interest:**

*   **Per-Second Compounding:** Interest on borrowed tokens compounds every second. This means that each second, the interest accrued is added to the principal, and the next second's interest is calculated on this new, larger principal.
*   **Variable Rates:** The interest rate (`rate`) is not static; it can change over time. For instance, the rate might be constant for a few seconds (or a longer duration represented as seconds in the model) and then update to a new value. This can be visualized as a piecewise constant graph, where the rate stays flat for intervals and then jumps to a new level at specific time points.

## How Debt is Calculated with Compounding Interest

To understand how `R(n)` is used, let's consider an example:

*   A user borrows **100 tokens**.
*   The loan duration is from `time = 1` to `time = 5` (i.e., for 4 seconds of active interest accrual).
*   The interest rate is 1% per second from `time = 0` to `time = 3`. So, for the loan:
    *   `r₁` (interest for the second from `t=1` to `t=2`) = 1%.
    *   `r₂` (interest for the second from `t=2` to `t=3`) = 1%.
*   The interest rate updates to 2% per second at `time = 3`. So, for the loan:
    *   `r₃` (interest for the second from `t=3` to `t=4`) = 2%.
    *   `r₄` (interest for the second from `t=4` to `t=5`) = 2%.

The total debt is calculated by multiplying the principal by `(1 + interest_rate)` for each second the loan is active:
```
Debt = 100 * (1 + r₁)(1 + r₂)(1 + r₃)(1 + r₄)
Debt = 100 * (1 + 0.01) * (1 + 0.01) * (1 + 0.02) * (1 + 0.02)
```

This calculation can be elegantly expressed using the global rate accumulator function `R(n)`. If `R(n)` represents the accumulated rate factor from a global start time (say, `t=0_system`) up to the n-th second:
`R(n) = (1 + r_sys_0)(1 + r_sys_1)...(1 + r_sys_n)`

If our loan's relevant interest rates `r₁, r₂, r₃, r₄` correspond to the system's rates `r_sys_1, r_sys_2, r_sys_3, r_sys_4`, then the debt can be found by:
```
Debt = Principal * R(index_at_loan_end) / R(index_before_loan_start)
```
In our example, this would be:
```
Debt = 100 * R(4) / R(0)
```
Here, `R(4) = (1+r_sys_0)(1+r_sys_1)(1+r_sys_2)(1+r_sys_3)(1+r_sys_4)` and `R(0) = (1+r_sys_0)`.
Thus, `R(4) / R(0)` yields `(1+r_sys_1)(1+r_sys_2)(1+r_sys_3)(1+r_sys_4)`, which exactly matches the `(1+r₁)(1+r₂)(1+r₃)(1+r₄)` factor needed for our 100 token loan. The indices `0` and `4` here refer to points in the global timeline of rate accumulation.

## Calculating Interest for Supplied Tokens: A Different Approach

Interest calculation for supplied tokens (liquidity provided to the protocol) follows a different pattern than debt.

**Key differences from debt interest:**

*   **No Per-Second Compounding:** Interest on supplied tokens does *not* compound every second.
*   **Linear Growth then Compounding:** Instead, it grows *linearly* every second based on the current supply rate. This linear accumulation continues *until there is a system-wide update to the interest rates*.
*   **Compounding at Rate Updates:** When the system interest rate updates, the total interest accumulated linearly during the previous period is effectively compounded with the principal. This new, larger principal then begins to accrue linear interest based on the new rate.

Let's illustrate with an example:

*   A user supplies **100 tokens** at `time = 1`.
*   The supply interest rate is 1% per second from `time = 0` to `time = 3`.
    *   `r₁` (interest for user from `t=1` to `t=2`) = 1%.
    *   `r₂` (interest for user from `t=2` to `t=3`) = 1%.
*   The supply interest rate updates to 2% per second at `time = 3`.
    *   `r₃` (interest for user from `t=3` to `t=4`) = 2%.
    *   `r₄` (interest for user from `t=4` to `t=5`) = 2%.
*   The user withdraws their tokens at `time = 5`.

**Calculation of supplied amount:**

1.  **From `time = 1` to `time = 3` (before rate update):**
    Interest grows linearly. The accumulated interest for this period is `(r₁ + r₂)`.
    The factor for this period is `(1 + r₁ + r₂)`.
    Amount after this period (at `t=3`) = `100 * (1 + r₁ + r₂) = 100 * (1 + 0.01 + 0.01) = 100 * (1.02)`.

2.  **At `time = 3` (rate update):**
    The amount `100 * (1.02)` becomes the new principal for the next period. This is where the compounding event occurs.

3.  **From `time = 3` to `time = 5` (after rate update):**
    Interest again grows linearly with the new rate (2%). The accumulated interest for this period is `(r₃ + r₄)`.
    The factor for this period is `(1 + r₃ + r₄)`.
    Amount accrued in this period on the new principal = `(New Principal) * (1 + r₃ + r₄)`.

4.  **Total amount at `time = 5`:**
    ```
    Supplied Amount = 100 * (1 + r₁ + r₂) * (1 + r₃ + r₄)
    Supplied Amount = 100 * (1 + 0.01 + 0.01) * (1 + 0.02 + 0.02)
    Supplied Amount = 100 * (1.02) * (1.04) = 106.08
    ```

## Adapting the Rate Accumulator for Supply-Side Interest

Can the rate accumulator concept, originally for per-second compounding debt, be adapted for this linear-then-compound supply interest? Yes, with a thoughtful modification.

Let's define blocks of linear interest sum:
*   Let `s₁ = r₁ + r₂`. This is the sum of linear interest rates for the user's first deposit period (from `t=1` to `t=3`, before the system rate update). In our example, `s₁ = 0.01 + 0.01 = 0.02`.
*   Let `s₂ = r₃ + r₄`. This is the sum of linear interest rates for the user's second deposit period (from `t=3` to `t=5`, after the system rate update). In our example, `s₂ = 0.02 + 0.02 = 0.04`.

The supplied amount can then be written as:
```
Supplied Amount = 100 * (1 + s₁) * (1 + s₂)
```

Now, we introduce a **modified rate accumulator for supply**, let's call it `S(n)`:
```
S(n) = (1 + s_glob_0)(1 + s_glob_1)(1 + s_glob_2)...(1 + s_glob_n)
```
Here, each `s_glob_i` represents the *sum of per-second linear interest rates accumulated during the i-th system-wide period between official rate updates*. For example, `s_glob_1` would be the sum of all per-second rates during the first system-defined rate period, `s_glob_2` for the second, and so on.

The total amount a user can withdraw (their initial principal plus all accrued supply interest) can be calculated using this `S(n)` accumulator, similar to the debt calculation:
```
Supplied Amount = Principal * S(index_at_withdrawal_period_end) / S(index_at_deposit_period_start)
```
In the context of our example, if the user's `s₁` corresponds to the system's `s_glob_1` (or a part of it relevant to their deposit window) and their `s₂` to `s_glob_2`, and we align indices appropriately, this could be expressed as:
```
Supplied Amount = 100 * S(k) / S(j)
```
For the example values, `100 * (1+s₁)(1+s₂)` means the term `S(k)/S(j)` must resolve to `(1+s₁)(1+s₂)`. If `s₁` is the interest sum for the first relevant system period for the user, and `s₂` for the second, then `S(j)` would be the accumulator value before the `s₁` period, and `S(k)` the value after the `s₂` period. For instance, if `S(0)` is a baseline, `S(1) = S(0)(1+s₁)` and `S(2) = S(1)(1+s₂) = S(0)(1+s₁)(1+s₂)`, then `S(2)/S(0)` yields the desired `(1+s₁)(1+s₂)`.

## Unified Interest Calculation: Debt and Supply

The power of this approach is that the fundamental algorithm for calculating total balances:
`Final Amount = Initial Principal * Accumulator(end_time_index) / Accumulator(start_time_index)`
can be consistently applied to both borrowers and suppliers.

The crucial distinction lies in the definition and construction of the accumulator used:

*   **For Debt:** Use the `R(n)` accumulator, where each `(1 + rᵢ)` term represents per-second compounded interest. The `rᵢ` are individual per-second rates.
*   **For Supply:** Use the `S(n)` accumulator, where each `(1 + sᵢ)` term represents a block of linearly accrued interest that compounds at the point of a system-wide rate update. The `sᵢ` are sums of per-second linear rates over these distinct periods.

This adaptation allows protocols like Aave V3 to employ a consistent and efficient architectural pattern for interest calculations, despite the differing accrual mechanisms for debt and supplied assets, ensuring fairness and accuracy for all users.