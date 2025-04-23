---
title: Recap
---

---

### Recap

It's been a journey, but let's do a quick recap of everything we've covered in this section!

1. Context & Understanding

   Without much manual review, we were able to construct fuzzing test suites (both stateful and stateless) to identify where these invariants were broken.

   We experienced first hand how efficient using of tooling and a proper understanding of a protocol can really assist in our reviews in this way.

2. what an AMM/Dex is

   While gathering context for TSwap we learnt what an automated market maker is, what a decentralized exchange is and their functions within DeFi.

   ::image{src='/security-section-5/48-recap/recap1.png' style='width: 100%; height: auto;'}

   We also covered how AMMs differ from conventional orderbook exchanges and why this adjustment was needed in a blockchain world.

   ::image{src='/security-section-5/48-recap/recap2.png' style='width: 100%; height: auto;'}

3. Liquidity Providers

   `Liquidity Providers` add funds to liquidity pools to allow an `AMM` to facilitate trades. We learnt that fees incurred while trading on an `AMM` or `Dex` are used as incentive to pay liquidity providers based on their percentage contribution to the pool!

4. Core Invariants & Constant Product Formula

   Core invariants are fundamental properties of a protocol that must always hold true. An example of a core invariant was the constant product formula that we saw in TSwap (and is used in Uniswap) `x * y = k`.

   > **Note:** `x * y = k` effectively says the ratio between these two tokens must remain the same

   We were also introduced to the [**Properties**](https://github.com/crytic/properties) repo by Trail of Bits, which outlines a tonne of core invariants for common tokens and more.

5. Thoroughly Onboarding a Client

   This is something we've touched on a few times, but in this section we went through an extension onboarding template and stressed the importance of getting as much information about the protocol from the client as we can. Making note of important details like

   - Test Coverage
   - Token/Chain Compatibilities
   - nSLOC
   - Scope

   When we onboard a protocol, we want to ask as many questions as possible to gain as much context as possible.

6. Fuzzing!

   We learnt how to write `stateful and stateless fuzzing` tests and how powerful they can be in adding value to our audit, catching things our other tools and basic unit tests couldn't hope to identify.

7. FREI-PI/CEI

   We touched briefly on [**FREI-PI**](https://www.nascent.xyz/idea/youre-writing-require-statements-wrong) as a methodology and the idea of hardcoding invariant checks into smart contract protocols.

8. Tooling

   In this section we covered some exciting tools extensively. The biggest of which being stateful fuzzing through the foundry framework, of course. We also leveraged tools like [**Slither**](https://github.com/crytic/slither), [**Aderyn**](https://github.com/Cyfrin/aderyn) and [**Solodit**](https://solodit.xyz/) as well as the compiler itself in our hunt for TSwap bugs.

   In addition to the above, we briefly touched on [**Echidna**](https://github.com/crytic/echidna) and Consensys as fuzz testing alternatives and even Certora - which we'll learn about with formal verification very soon.

9. Weird ERC20s

   We learnt about the risk associated with `Weird ERC20s` and how prevalent they are in DeFi.

   These tokens can behave in a wide variety of ways including, but not limited to, re-entrancy, fee-on-transfer, existing behind proxies etc. Being aware of these situations is important.

   The [**Weird ERC20s GitHub repo**](https://github.com/d-xo/weird-erc20) is an invaluable resources for security researchers and common token types should be something that is studied further.

   Also check out the [**Token Integration Checklist by Trail of Bits**](https://secure-contracts.com/development-guidelines/token_integration.html) for valuable information on how to protect against these sorts of tokens.

10. More Manual Review!

    We did another round of manual review resulting in some amazing findings in TSwap such as:

    - slippage
    - incorrect fee calculations
    - lack of deadline checks
    - fee on transfer

### Wrap Up

You deserve a congratulations. If you've made it this far in the course, you're doing incredibly well and are **_already_** very prepared to begin challenging live competitive audits.

We've covered so much in this section of the course and you should be incredibly proud. Go take a break and come back for a few extra exercises to bring everything together before you continue into the next section.
