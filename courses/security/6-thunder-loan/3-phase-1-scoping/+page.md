---
title: Phase 1 - Scoping
---

_Follow along with the video lesson:_

---

### Phase 1: Scoping

As per usual, our first step is going to be scoping out the code base to gain as much context and understanding as we can.

The protocol README is a good place to start. The protocol has broken down the audit scope details for us as well as provided a commit hash which we can use with `git checkout` to assure we're on the correct version of the code base.

> **Note:** We don't actually need to `git checkout` here. For all audits in this course, just use the `main` branch.

````
    # Audit Scope Details

    - Commit Hash: 8803f851f6b37e99eab2e94b4690c8b70e26b3f6
    - In Scope:
    ```
    #-- interfaces
    |   #-- IFlashLoanReceiver.sol
    |   #-- IPoolFactory.sol
    |   #-- ITSwapPool.sol
    |   #-- IThunderLoan.sol
    #-- protocol
    |   #-- AssetToken.sol
    |   #-- OracleUpgradeable.sol
    |   #-- ThunderLoan.sol
    #-- upgradedProtocol
        #-- ThunderLoanUpgraded.sol
    ```
    - Solc Version: 0.8.20
    - Chain(s) to deploy contract to: Ethereum
    - ERC20s:
    - USDC
    - DAI
    - LINK
    - WETH
````

The protocol has also provided us a clear detailing of chains and tokens with which they expect to be compatible. This is incredible useful as a security reviewer and is always a section we should seek out for addition clarity in how a protocol should work.

Knowing which tokens are used allows us to filter out considerations of Weird ERC20s etc making our jobs easier!

Within the `Roles` section of the README, we see some familiar terms. Knowing which actors are capable of what actions in a protocol is another internal piece of information in this process.

```
## Roles

- Owner: The owner of the protocol who has the power to upgrade the implementation.

- Liquidity Provider: A user who deposits assets into the protocol to earn interest.

- User: A user who takes out flash loans from the protocol.
```

Lastly, the README outlines some `Known Issues` for the first time, these are vulnerabilities of which the protocol team is already aware and we'll come back to these in a little bit.

A quick skim of the project repo also shows signs of some good testing practices (and some poor). We see an invariant suite missing, but a `Slither` config is present and `Aderyn` seems accounted for, in the `Makefile`. There'll be lots of testing we'll need to do here!

Let's run solidity metrics on our `src` folder to get a send of the size and complexity of this code base.

> **Remember:** You can right click the `src` folder in your workspace and select `Solidity: Metrics` to generate the report.

![phase-1-scoping1](/security-section-6/2-phase-1-scoping/phase-1-scoping1.png)

With an nSLOC of 391 and a Complexity of 327, Thunder Loan represents the biggest code bases we've approached yet. We can see most of the logic and complexity exists within ThunderLoan.sol and ThunderLoanUpgraded.sol.

The reason we check these things is to get a better idea of how long security reviews take us to do based on size and our current skill level.

Let's continue on to phase 2 - Recon, in the next lesson.
