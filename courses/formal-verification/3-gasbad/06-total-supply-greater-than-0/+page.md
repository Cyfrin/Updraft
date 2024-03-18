---
title: total supply greater than 0
---

### Invariants: The Constant Truths in Code

Invariants are like the North Star for smart contracts – they guide the logic and ensure certain conditions always hold true, no matter the state of the contract. In our exploration today, we're scrutinizing a special invariant: the total supply of a non-fungible token (NFT) must never fall into the realm of negative numbers.

```js
function totalSupply() external view returns (uint256) {
    return allTokens.length;
}
```

Let's break it down to basics. The `totalSupply` function returns the length of the `allTokens` array, which in solidity's world, stored as a `uint256` type, is fundamentally incapable of being negative. But can we take this for granted? The power of assumptive coding is often weakened by the possibilities of unforeseen bugs. Here's where the mightiness of verification tools like Certora steps in.

### Certora: The Watchful Guardian of Invariants

Imagine having a vigilant guardian, one that tirelessly scans every corner of your smart contract to ensure your rules are upheld. This is what Certora brings to the table. With its analysis, we can affirm our invariants, such as our non-negativity condition, stand unbreakable against any state or transaction the contract might encounter.

While this might seem overly simplistic – of course, an array's length must be a non-negative value – it's a fantastic exercise in setting up smart contract specifications. It also acts as a pre-emptive strike against any coding anomaly that could cause an unexpected behavior in the underlying logic.

### Unwinding the Loops of Complexity

But what happens when we introduce Certora to our seemingly infallible contract, and it reports a violation? A deeper probe reveals the existence of a looping construct within the `onERC721Received` function that induces uncertainty. Certora, in its quest to cover all possibilities, is stumped by the 'unknown' – the endless possibilities of what `to` address might execute within the loop.

This calls for a strategic remedy. We opt for the 'optimistic loop' setting in Certora. By doing so, we stay optimistic that our contract will not enter an infinite or extensive loop, sidestepping the need for unwieldy verifications that could cloud our primary invariant.

```json
{ "optimistic_loop": true }
```

This change illuminates the path for our invariant to pass the checks, easing our concerns about the non-negativity of our total supply.

### The Subtly of Sanity Checks

Running the verification reveals an eye-opening insight. Certora's gentle nudge that our invariant check might be a tad too obvious. It's akin to double-checking if water is wet. Is it even worth verifying that an `uint256` type, which by its unsigned nature cannot be negative, will indeed never be negative?

> “This sanity check, while seemingly trivial, is an assurance – a proof that our code functions precisely as intended, without the shadow of a doubt.”

Nevertheless, we press forward, allowing ourselves the satisfaction of a sanity check that nods in agreement with our expectations. It's a teaching moment, and in coding, even the seemingly apparent deserves attention.

### The Verification Ballet

Employing tools like Certora for verification is a dance of precision and foresight. With each step, we write the choreography of our code's performance, ensuring it executes with grace and power. So let's continue, embracing more invariants, more checks, more balance in this ballet of bytes and logic.

_An Example of Invariants in Action_

As we conclude this notion of inviolable rules within our smart contracts, remember to cast a wide net – invariants should cover the obvious, the intricate, and everything in between. After all, it's this meticulous attention to detail that separates a functional contract from an exceptional one.

Let me now demonstrate a real-world example of crafting such an invariant. Consider a scenario where we have an array that keeps track of all NFT owners. Now, let's lay down a rule, an invariant to be specific, to ensure that at any given time, the count of NFTs in existence correlates with the integrity of the total supply – it cannot, and should not, diverge into negativity.

The simplistic elegance of this one-liner invariant has its prowess rooted in Certora's capability to parse across multitudes of contract states, ensuring our rule lives up to its promise. Even when the road seems clear, it never hurts to have a sentinel by our side, affirming the certainty we hold dear.

### When the Sentry Falters

Upon running our tests with Certora, we face an unexpected twist – failure. Why would our contract, which upholds the non-negative tenet, stumble under Certora's watchful gaze? The culprit lies in the unpredictability of smart contract interactions, particularly when randomization ('havoc' in Certora terms) kicks in.

> "Surprises in smart contract execution are the architects of innovation. They inspire us to harness the unexpected, turning anomalies into assets."

With strategic adjustment to our testing parameters, specifically embracing an optimistic take on loops within our contracts, we pass the baton back to Certora. The rerun, now humbled and rectified, stands tall and unviolated – our invariant remains steadfast.

### The Power of Parametric Verification

As we gear up to wrap our exploratory mission into the verification realm, let's take a brief detour into the land of parametric verification. This advanced technique allows us to define properties not just in a static manner but as a function of certain parameters that our smart contract might interact with.

Stay tuned for a subsequent discussion where we'll illustrate how parametric verification elevates our testing game, empowering us with even greater insights into the robustness of our smart contract ecosystem.

### The Takeaway

Through the course of this demonstration, we've touched upon the significance of invariants, navigated the intricacies of testing environments, and solidified the necessity of meticulous verification. Certora, with its effortless ease and relentless diligence, stands out not merely as a tool but as an indispensable ally in crafting secure and sound smart contracts.

With this newfound appreciation for invariants and an ally like Certora at hand, may we all embrace the nuanced dance of smart contract creation, fostering an ecosystem where trust is not assumed but asserted and verified. Let the solidity of our smart contracts reflect our undying commitment to excellence and integrity.

Thank you for joining me in this journey. May your code be robust, your rules be steadfast, and your smart contracts be unassailable.
