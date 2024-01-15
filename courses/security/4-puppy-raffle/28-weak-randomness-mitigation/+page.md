---
title: Weak Randomness - Mitigation
---

_Follow along with this video:_

---

### Mitigating Weak Randomness

In short, relying on on-chain data to generate random numbers is problematic due to the deterministic nature of the blockchain. The easiest way to mitigate this is to generate random numbers off-chain.

Some off-chain solutions include:

**Chainlink VRF:** "A provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising security or usability. For each request, Chainlink VRF generates one or more random values and cryptographic proof of how those values were determined. The proof is published and verified on-chain before any consuming applications can use it. This process ensures that results cannot be tampered with or manipulated by any single entity including oracle operators, miners, users, or smart contract developers." - I encourage you to [**check out the Docs**](https://docs.chain.link/vrf).

**Commit Reveal Scheme:** "The scheme involves two steps: commit and reveal.

During the commit phase, users submit a commitment that contains the hash of their answer along with a random seed value. The smart contract stores this commitment on the blockchain. Later, during the reveal phase, the user reveals their answer and the seed value. The smart contract then checks that the revealed answer and the hash match, and that the seed value is the same as the one submitted earlier. If everything checks out, the contract accepts the answer as valid and rewards the user accordingly." - Read more in this [**Medium Article**](https://medium.com/coinmonks/commit-reveal-scheme-in-solidity-c06eba4091bb)!
