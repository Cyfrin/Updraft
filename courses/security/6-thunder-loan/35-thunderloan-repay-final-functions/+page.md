---
title: Thunderloan.sol - Repay and Final Functions
---

Title: Simplifying Cryptocurrency - Understanding and Breaking Down the Repay Function on Thunder Loan Contracts

Welcome to the intriguing world of Thunder loan contracts! Today, we'll dive into the complexities of the repay function and how it fits into the broader cryptosphere.

## Repay Function: An Overview

You may wonder why users are expected to use this foundation of Thunder loan contracts. The repay function could be termed a helper function as it essentially facilitates the transfer of tokens from the message sender to the asset token.You could choose to use this function or proceed with a direct transfer.

![](https://cdn.videotap.com/clirVfwioc458w6aVh7V-53.02.png)> _Quick Note:_ Direct transfers can be initiated by simply calling the transfer function and then directing tokens to the asset.

In our evaluation, the repay function passed the net spec check with flying colors. It contributes significantly to the handling of allowed tokens in the contract.

## Decoding getCalculatedFee

One question that is often asked is whether this function calculates the fees of the flash loan. To answer this straightforwardly, yes, it does! The getCalculatedFee function appears not only in the flash loan but is also utilized in the deposit aspect.

![](https://cdn.videotap.com/6mvrIM7OsjoztStUZ3t8-127.26.png)

In terms of decision-making, the question now arises: how does getCalculatedFee calculate the fee?

In simple words, it first gets the value of the borrowed token by multiplying the amount by the price in WETH. Importantly, this is sourced from the Oracle upgradable getPriceInWETH, which in turn uses the TSWAP Oracle to calculate the value of the borrowed token.

The 'flash loan fee,' then calculated, divides the calculated value by some fee precision. From here, it applies a 0.3% fee based on the value of the token rather than the actual token amount.

## Digging Deeper

In delving into the code, we find that getPriceInWETH derives the price of one pool token in WETH.

![](https://cdn.videotap.com/jZtPSFvT2rr7Jszw6QmJ-286.33.png)

Firstly, it's important to revisit TSWAP to further understand this function, particularly how it calculates the amount based on input and output reserves. It raises a potential area of concern. Within an auditing context, we could ask:"What if the token has six decimals? Would it then distort the price calculation?"

> _Critical Outlook:_ Ignoring token decimals could result in inaccurate price calculations, especially when working on the basis of TSWAP decks for determining the flash loan fee.

While this looks plausible, it may still not be entirely correct. Circumspection is needed at this point, and we would do well to return and probe further.

## Addressing Minor Questions

After reviewing the functions like updateFlashLoanFee, isAllowedToken, and getAssetFromToken, we now move on to view functions. The authorizeUpgrade function is particularly interesting as it underlines why we ought to understand proxies in detailed terms.

![](https://cdn.videotap.com/xKIHOvSLAXgodeugEkw9-381.77.png)

In essence, adding the _only owner_ stipulation in the authorized upgrade function restricts contract upgrades to the owner alone. Take away this extra layer, and you throw open the door to anyone upgrading the contract!

In conclusion, our initial pass through the Thunder Loan contracts codebase may not have uncovered any distinct issues. But it certainly has left us with questions that need answering, and that’s where the real fun begins!

## Onwards and Upwards

Cracking the code behind algorithms in the cryptosphere may seem incredibly daunting. But remember that the key lies in taking one step at a time, going back to your questions, and digging deeper to find the answers.

![](https://cdn.videotap.com/SeBnhlFpXSRHJX757F1r-434.79.png)

Join us in our next post for a further breakdown of these questions – who knows, we might uncover new insights in our exploration of Thunder Loan contracts. Until then, happy coding!
