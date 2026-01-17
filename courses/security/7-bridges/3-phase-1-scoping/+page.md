---
title: Phase 1 - Scoping
---

_Follow along with the video lesson:_

---

### Phase 1 - Scoping

Ok, let's get started with the scoping phase of Boss Bridge. We'll start again with cloning a copy of the repo locally and navigating to it in VS Code.

```bash
git clone https://github.com/Cyfrin/7-boss-bridge-audit
cd 7-boss-bridge-audit
code .
```

### README: Scope

We've 4 contracts within `src`, but let's start with the [**README**](https://github.com/Cyfrin/7-boss-bridge-audit/blob/main/README.md) and get a better idea of our scope. There's a specific section for `Audit Scope Details`.

    ## Audit Scope Details

    - Commit Hash: 07af21653ab3e8a8362bf5f63eb058047f562375
    - In scope

    ```
    ./src/
    #-- L1BossBridge.sol
    #-- L1Token.sol
    #-- L1Vault.sol
    #-- TokenFactory.sol
    ```
    - Solc Version: 0.8.20
    - Chain(s) to deploy contracts to:
    - Ethereum Mainnet:
        - L1BossBridge.sol
        - L1Token.sol
        - L1Vault.sol
        - TokenFactory.sol
    - ZKsync Era:
        - TokenFactory.sol
    - Tokens:
        - L1Token.sol (And copies, with different names & initial supplies)

Looks like all 4 contracts are within scope of this review, great! The protocol has also detailed some compatibilities for us, which will be very important.

> **Note:** We'll be skipping over the `onboarding process` and the back and forth with the protocol in this section, but remember if things were unclear, or if something was missing from the provided documentation, absolutely work with the protocol for clarification.

### README: Compatibilities

The provided solc version looks great, fairly current. We're also provided a number of chains to deploy to and which contracts will be deployed to each respective chain.

- Ethereum Mainnet: - L1BossBridge.sol - L1Token.sol - L1Vault.sol - TokenFactory.sol
- ZKsync Era:
  - TokenFactory.sol

It looks like only a single ERC20 token is supported, `L1Token`, so it should be easy enough to check it for oddities.

### README: Actors/Roles

The Boss Bridge devs have detailed for us the Actors and Roles within the protocol. We can see `Bridge Owner` clearly as a red flag to the centralization risks we'll be approaching in this review.

```
## Actors/Roles

- Bridge Owner: A centralized bridge owner who can:
  - pause/unpause the bridge in the event of an emergency
  - set `Signers` (see below)
- Signer: Users who can "send" a token from L2 -> L1.
- Vault: The contract owned by the bridge that holds the tokens.
- Users: Users mainly only call `depositTokensToL2`, when they want to send tokens from L1 -> L2.
```

### README: Known Issues

Finally, the README outlines some of the vulnerabilities of Boss Bridge that the team is already aware of. As such, these items wouldn't be valid in a competitive audit, but in a private review you may absolutely still call these out in your final report.

```
## Known Issues

- We are aware the bridge is centralized and owned by a single user, aka it is centralized.
- We are missing some zero address checks/input validation intentionally to save gas.
- We have magic numbers defined as literals that should be constants.
- Assume the `deployToken` will always correctly have an L1Token.sol copy, and not some [weird erc20](https://github.com/d-xo/weird-erc20)
```

### Coverage

Alright, things look pretty good. Let's see how thorough the test coverage on Boss Bridge is currently.

```bash
forge coverage
```

![phase-1-scoping1](/security-section-7/2-phase-1-scoping/phase-1-scoping1.png)

Ok, ok.. I see you Boss Bridge. This team clearly has _some_ knowledge about security best practices. We've got some room for improvement though with a couple missing functions/branches. We'll have to take a closer look at this test suite for sure.

Just by viewing the folders we can see they're missing fuzz tests, maybe they don't really understand their invariants?

Invariant testing is becoming a staple of security reviews and stateful fuzzing test suites will always be needed by protocols. They bring so much value to those projects that lack them. Make this skill one of your focuses to strengthen.

### Solidity Metrics

Before moving on we should definitely acquire a sense of the size of this code base and how complex it is. Time for our old friend `Solidity Metrics`.

Right-click the `src` folder and select `Solidity: Metrics`.

![phase-1-scoping2](/security-section-7/2-phase-1-scoping/phase-1-scoping2.png)

We can see this code base is quite a bit smaller and arguably less complex than some we've been over already. It's about half the size of ThunderLoan!

### Wrap Up

Ok! With the protocol onboarded and some preliminary scoping complete, let's dip our toes in the code with some Recon, in the next lesson.

See you there!
