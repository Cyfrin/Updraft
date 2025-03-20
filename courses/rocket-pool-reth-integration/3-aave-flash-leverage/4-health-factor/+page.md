## Loan-To-Value: Health Factor

In this lesson, we'll explore how to calculate the health factor and related concepts.

Loan to Value Recap
As a recap, in the previous lesson we reviewed how to calculate the maximum USD that a user can borrow based on these factors:

- the LTV of the collateral
- The amount of collateral that the user deposits
- The price of the collateral

In the example we reviewed a maximum borrow of $4500 USD. Since the price of collateral changes, it is important to understand what a health factor is.

Health Factor
A health factor is a single number which determines the condition of the borrow. It is used to determine if the borrower is overcollateralized or not. A borrower's collaterals are liquidated if the health factor of the borrower is less than 1.

In order to calculate the health factor, there are 2 other concepts we need to cover:

- Liquidation Threshold
- Average Liquidation Threshold

Liquidation Threshold
The Liquidation threshold is a number between 0 and 1. With the condition that it is greater than or equal to the LTV.

```solidity
LTV <= Liquidation threshold
```

The LTV (loan to value) number is specific for each collateral. The liquidation threshold is also specific for each collateral.

Average liquidation threshold
The average liquidation threshold has a goal to calculate the average of all the liquidation thresholds for a user's collateral. It is a weighted average of all the liquidation thresholds for all the collaterals a user has deposited.

To be more precise, we will define three terms:

- C<sub>R</sub>(u) = USD value of collateral locked in reserve R by user u
- B<sub>R</sub>(u) = Debt in USD from reserve R by user u
- L<sub>R</sub> = Liquidation threshold of reserve R

If a user locks 1 ETH as collateral into the ETH reserve and the value of the ETH is $3000 then:
C<sub>R</sub>(u) = 3000

The formula for average liquidation threshold for user u (L(u)):

```solidity
L(u) = Average liquidation threshold for user u
= Σ C(Ru) L(R) / Σ C(Ru)
```

Health Factor
Health factor is a number that tells the Aave protocol whether a user's collateral can be liquidated or not. The health factor of user u (H(u)):

```solidity
H(u) = Health factor of user u
= L(u)  Σ C(Ru) / Σ B(Ru)
```

Liquidation Condition
Liquidation Condition if H(u) < 1
