## Understanding Loan to Value (LTV)

In this lesson, we'll be covering the concept of loan-to-value (LTV).

In order to borrow tokens from the Aave protocol, a user must first supply a token. Afterwards, they can borrow tokens. There is a limit to the amount of tokens a user can borrow, which is defined by the loan to value of the collateral. The loan to value determines the maximum borrowing power of a specific collateral. Each collateral has a different LTV setting.

Consider the following example. Say that the ETH collateral has an LTV of 75%. If you deposit one ETH as collateral, that means you can borrow any token inside the Aave protocol up to 0.75 ETH worth of tokens. Let's apply some numbers to this example. We'll put in two ETH as collateral, when one ETH is equal to \$3,000 USD. To calculate the maximum borrow in terms of USD, we can use the following equation:

max borrow USD = ETH LTV × collateral amount × ETH USD price

So, with ETH as our collateral, we'll take the LTV settings for ETH, which in our example is 75% or 0.75. In this example, we deposited two ETH, so the collateral amount will be two. And the price of ETH is \$3,000, so we multiply this by 3,000. This turns out to be \$4,500.

So, for depositing two ETH when one ETH is equal to \$3,000, the maximum amount of tokens that we can borrow in terms of USD will be \$4,500 worth of other tokens. For example, assuming that the stablecoin DAI is \$1, then we will be able to borrow 4,500 DAI.
