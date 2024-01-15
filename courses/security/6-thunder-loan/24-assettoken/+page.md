---
title: AssetToken.sol
---

In today's lesson, we will dissect and understand the process and chronology of AssetToken.sol while simultaneously attempting to reduce the complexity of this unwieldy 129-line monster code. We will be following the analysis methods of one of the smart contract industry's finest - Tincho.

![](https://cdn.videotap.com/ymeUVPEJfTmzpyvsbUJU-38.26.png)

Although the enormity of the code may make the checklist seem redundant, it is essential to understand that this seemingly lightweight tool can provide both structure and context, serving as a roadmap when trudging through unknown territories of the code.

## Tackling AssetToken.sol Line-by-Line

Eagle-eyeing the checklist we realize that we have revealed another checkmark, indicating we are ready to plow into AssetToken.sol. As we delve deeper, the checklist will begin to take a back seat, but remember, it remains an invaluable tool to grasp the overall context and provide a starting point for understanding the essence of these components.

### Thunderloan Digitization

Thunderloan serves as an apt milestone in our journey. We will first scour Thunderloan, before advancing to its upgraded version. The sequence may seem counterintuitive due to the contracted length of its upgraded edition. However, a profound understanding of the current protocol is instrumental in discerning the necessities for upgrades. The supposed 327-line-dependent code may differ drastically, but only time will tell!

Now, let's proceed to dissect AssetToken.sol. It exemplifies the receipt role in our smart contract. It enables liquidity providers to deposit assets into Thunderloan, in return for asset tokens. The accumulation of interest over time is influenced by the number of people who borrow flash loans.

Borrowing our previous Flash loans example, consider a whale who deposits money into a Flash loan contract. In return, they receive shares or a token representative of the money they've placed in the contract. This share-token accrues interest based on the flash loan borrowers' fees.

The role of Open Zeppelin's ERC20 here needs special mention. It provides an interface and a wrapper around ERC20 operations that would typically fail if the token contract returned false. The wrapper, aptly named Safe ERC20, serves as a fail-safe for erratic ERC20s, throwing on failure to prevent compromising the entire operation.

## Unveiling Asset Token and Shares

As we dig deeper, mining further insights from the wall of text, a pattern begins to emerge. The term "underlying" in the code seems to refer to USDC, whereas the "asset token" is linked to the pool's shares. Depositing USDC gives you pool shares proportionate to the exchange rate defined within the contract.

> "For instance, if we have two shares and the exchange rate is two to one, we can exchange our two shares for four tokens."

How they calculate the exchange rate mirrors the workings of Compound Finance, underlining the deliberateness in the design. If we can master understanding the contract's innards, unraveling the rest of the mysteries becomes a breeze.

### Side Quest into Compound's Territories

At this juncture, it might be advantageous to wander into the realm of Compound, discern how it functions and sift out any potential issues. Familiarity with similar protocols can empower us in our mission to secure this contract.

However, we won't be trailing down this path today. It is, nonetheless, a recommended sidequest to undertake at some stage. Try writing a concise, understandable article explaining the working protocol of Compound, or even the comparable Aave.

## Tracing the Exchange Rate Pattern

Returning to our original predicament, we bump into our exchange rate again, causing us to raise an eyebrow. This instance hints at a potential bug spot in our code.

The next issue arises during the creation of new asset tokens or shares. Minting new asset tokens conducts an access control check to confirm the caller is the Thunderloan contract.

> "This begs the question, could an attack vector appear that allows an attacker to call mint from the Thunderloan contract when they shouldn't?"

In the same vein, burning existing asset tokens or shares runs a similar check. Our questioning spirits seek an answer from the code. Could non-standard, "weird" ERC20s wreck havoc in our methods - Safetransfer? And more specifically, what if USDC decided to blacklist contracts (like thunder loan or the asset token contract)? A medium to low priority question but worth a nod.

### Minting New Conclusions

Wrapping up our intricate dissection of the code, we are left with relevant questions that will guide us down the path of systematizing a secure, functional protocol. As we remain vigilant, aiming to decipher the mysteries of our smart contract, let us head over to the next complex labyrinth- Thunderloan.

In the coming blog posts, we'll continue to explore potential security vulnerabilities, unravel other intriguing aspects of this code, and hopefully unlock more mysteries of smart contract security reviews. So, stay tuned and keep reading.
