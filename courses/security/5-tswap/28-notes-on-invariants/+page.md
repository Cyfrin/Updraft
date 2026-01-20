---
title: Notes on Invariants and other Types of Tests
---

_Follow along with the video:_

---

### Notes on Invariants

We've already done a tonne and I know at times these concepts can be confusing, but we've seen first hand how powerful a fuzzing tool can be in breaking protocol invariants

I briefly mentioned at the end of the last lesson the concept of baking invariants into protocols known as FREI-PI. I think it's important to see what can happen when these considerations aren't made and there's a great [**case study on Euler**](https://www.youtube.com/watch?v=vleHZqDc48M) available by `Tincho` that you should take a moment to watch now. It'll teach you a great deal about the importance of invariants.

### Additional Tools and Tests

We exclusively used Foundry in our fuzzing so far, but there are other fuzzing tools available that we didn't go over which are worth checking out.

- [**Echidna**](https://github.com/crytic/echidna) - Echidna is a Haskell program designed for fuzzing/property-based testing of Ethereum smart contracts. It uses sophisticated grammar-based fuzzing campaigns based on a contract ABI to falsify user-defined predicates or Solidity assertions.
- [**Consensys**](https://diligence.us.auth0.com/login?state=hKFo2SBWT0JUTlRLR1FUUFM1VHFQNVR0Yi1ISWdNMmJCUGFhLaFupWxvZ2luo3RpZNkgUERzWTI1Wkg1bEM0VkMydFFYeG5vcy1fU0dGNjRiN0-jY2lk2SAxdzMzMGc3U1RUUmZFTk9ROHRBSXBPSzhLTTl3ZmdaZg&client=1w330g7STTRfENOQ8tAIpOK8KM9wfgZf&protocol=oauth2&scope=openid%20profile%20email%20read%3Acurrent_user%20enroll%20read%3Aauthenticators%20remove%3Aauthenticators%20offline_access&audience=https%3A%2F%2Ffaas.diligence.tools%2F&redirect_uri=https%3A%2F%2Ffuzzing.diligence.tools&screen_hint=signup&response_type=code&response_mode=query&nonce=fm15RXE2UzNSdlZPS0kyRW5UMkhJalVhM0dUUm5VLVNBUm4xWXhhd2pIZg%3D%3D&code_challenge=06fBFH8ZcFjUxLtj3KtOjpiD_AwxeoWmocBoQFhuEhQ&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xMi4xIn0%3D) - Fuzzing as a service, so to speak. This is paid access only, so we won't be covering it here.
- **Mutation Testing** - not something we'll cover in this course, but there's a link to more information and things you can try [**here**](https://github.com/Cyfrin/5-t-swap-audit/blob/audit-data/test/mutation/notes.md). Essentially this employs changing parts of the code to see if it breaks tests.
- **Differential Testing** - comparative testing vs different iterations of the same code. We'll cover this in more detail in future.

Another thing you might want to try is using [**Solodit**](https://solodit.xyz/) to research Weird ERC20s and how they've been identified in previous audits.

Let's get on to some manual review now!
