---
title: Improving Test Coverage To Find A High
---

# Unraveling the Mystery: Decoding Flash Loan Fees and Exchange Rate Updates

As we delve deeper into the complexities of DeFi protocols, we find ourselves constantly asking - Why? Why are we calculating the fees of a flash loan in the deposit? And why are we updating the exchange rate? Isn't it a bit strange to perform these updates here?

To unravel this puzzle, we embarked on an audit trail that led to some unexpected discoveries and revelations.

## Deciphering the Problem: Understanding Exchange Rates and Flash Loans

The first oddity we noticed was the update of the exchange rate in the deposit function when adding fees. This process typically only commences when there's a significant increase in the total amount of money in the asset token. It seemed illogical that the deposit function, which accrued no fees, was responsible for this update.

If the update exchange rate was malfunctioning, it would have repercussions on the 'redeem' function - our protocol's withdrawal mechanism. To confirm our suspicions, we needed to test this function first.

## Running the Test: Examining the 'Redeem' Function

To validate the functionality of the redeem function, we had to initiate a test. We decided to write a test for the redeem function and simulate a scenario of borrowing from the test flash loan and then attempt to redeem.

We commenced with the test by first setting up a mock Flash Loan receiver with a specified fee, which would be used for the Flash Loan.

The test would first change the exchange rate by depositing some funds, then modify it again by initializing the Flash Loan. ideally, at this stage, the depositor should be able to withdraw all their money.

![](https://cdn.videotap.com/NHVntHvDBDp2yLjdahS4-377.57.png)

## The Unexpected Revelation: Insufficient Balance

The test, unfortunately, produced an unexpected outcome - Insufficient balance.

After analyzing the logs of the transactions performed during the test, we noticed that the 'transferUnderlyingTo' function was returning an error stating insufficient funds. The amount to be transferred back (1003 tokens) was higher than the initial deposit (1000E 18).

This discrepancy threw us off balance. We had triggered a Flash loan, and expected to incur a fee, but the increase in the withdrawal amount surpassed the fee incurred. Upon scrutinizing the deposit function once again, we discovered an uncanny occurrence - the exchange rate was updating the fee.

The exchange rate, which was originally responsible for tracking the total amount of money in the protocol at all times, had now charged a fee without any transaction taking place.

This detrimental coding error was affecting liquidity providers' ability to redeem their tokens, setting off alarm bells for us.

## Assessing the Damage: Decoding the High

To ascertain the gravity of the impact of this error, we performed a follow-up test with the problematic lines of code in the Thunder loan commented out. As expected, the test passed, solidifying our suspicion. The initial mock test we developed served as a proof of code that affirmed our findings.

![](https://cdn.videotap.com/liERWQdBJtLyf0Oj21Oc-556.43.png)

The paramount error was evident - the erroneous exchange rate update in the deposit function. This update was blocking redemptions and incorrectly setting the exchange rate, leading to severe disruptions in the contract functionality.

The likelihood of this recurring was high due to its occurrence every time someone deposited. The impact, too, was high as users' funds would be locked. Moreover, rewards were incorrectly calculated due to reward manipulation leading to users potentially getting way more or less than deserved.

## Mitigating the Threat: Towards a Safer Protocol

Having extensive experience in blockchain security, we carefully devised a countermeasure to neutralize this imminent threat.

Through our persistent efforts probing into the code, we have managed to reveal a glaring irregularity that could have potentially endangered the whole protocol. The mandatory removal of this erroneous exchange rate update from the deposit function could significantly impact the protocol, making it safer and more secure, offering a fortifying solution to this daunting mishap.

And, as we continue ahead in our journey, probing for more security vulnerabilities and solving them, we learn that most bugs tend to surface towards the end of the audit. As our understanding of the protocol deepens, we get better at detecting potential threats, eventually leading to a more secure eco-system for all.
