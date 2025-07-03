---
title: Recap & Congrats
---

_Follow along with this video:_

---

Let's recap everything we've learnt in this lesson so far - it's been a lot.

### Onboarding

We learnt the importance of thoroughly onboarding a protocol. Often we'll receive audit requests without context or preparation (ie random etherscan links) and it's our job to advise the protocol that these are inappropriate. We should educate them on steps required to be ready for an audit. Think back to our [**minimal-onboarding-questions**](https://github.com/Steiner-254/PasswordStore-Audit/blob/main/minimal-onboarding-questions.md)

**About the Project** - Summary of the project

**Setup** - What tools are needed to setup the codebase & test suite?

**Testing** - How to run tests, how to see test coverage

**Scope** - Specific details of the security review, which contracts are to be audited, the specific commit hash being reviewed

**Compatibilities** - Chains for deployment, compatible tokens, solc versions

**Roles** - What are the different actors of the system? What are their powers meant to be?

**Known Issues** - Any issues the protocol is aware of already.

### Codebase Size

Another thing we covered was how to determine a codebase's size and complexity using tools like [**Solidity Metrics**](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-metrics) and [**CLOC**](https://github.com/AlDanial/cloc).

These tools allow us to count lines of code, estimate complexity and - in the case of Solidity Metrics - see breakdowns of how the protocol interconnects and which functions are visible.

These tools are primarily valuable in that they allow us the ability to estimate a work load or timeframe required for a thorough audit.

### The phases of an audit

We covered the phases of an audit and each steps within.

- Initial Review
  - Scoping - This is getting a sense of the protocol. In this phase, auditors go through the code to scope it. This gives an idea of how much time might be required for the audit, which can then be used to establish pricing. Key tasks include identification of all the contract’s dependencies and a general overview of the code. At this stage, auditors don’t dig deep into anything yet.
  - Reconnaissance - Here an auditor starts walking through the code, running tools, interacting with the protocol in an effort to break it.
  - Vulnerability Identification - An auditor determines which vulnerabilities are present and how they're exploited as well as mitigation.
  - Reporting - Compile a report detailing all of the identified vulnerabilities and recommendations to make the protocol more secure.
  ***
- Protocol Fixes
  - Fixes Issues
  - Retests and adds tests
- Mitigation Review
  - Reconnaissance
  - Vulnerability Identification
  - Reporting

### The Tincho

The legendary Tincho from [**The Red Guild**](https://blog.theredguild.org/) blessed us with his wisdom and experience, outlining the approach he takes while performing a security review. He stresses:

- Read the docs
- Take notes often - right in the codebase
- Small > Large - start on the easiest contracts and advance into more complex ones
- Leverage tools like [**Solidity Metrics**](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-metrics) to breakdown a hierarchy of complexity/size within a codebase

### First Security Review

We performed our first security review of the PasswordStore protocol!

Applying the steps of a security review we were able to uncover 3 vulnerabilities within the protocol:

---

[H-1] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

[H-2] Storing the password on-chain makes it visible to anyone and no longer private

[I-1]The `PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect.

---

We also learnt how to classify the severities of our findings! Remember the matrix:

|            |        | Impact |        |     |
| ---------- | ------ | ------ | ------ | --- |
|            |        | High   | Medium | Low |
|            | High   | H      | H/M    | M   |
| Likelihood | Medium | H/M    | M      | M/L |
|            | Low    | M      | M/L    | L   |

1. **High Impact**: `funds` are directly or nearly `directly at risk`, or a `severe disruption` of protocol functionality or availability occurs.
2. **Medium Impact**: `funds` are `indirectly at risk` or there’s `some level of disruption` to the protocol’s functionality.
3. **Low Impact**: `Fund are not at risk`, but a function might be incorrect, or a state handled improperly etc.

---

1. **High Likelihood**: Highly probably to happen.
   - a hacker can call a function directly and extract money
2. **Medium Likelihood**: Might occur under specific conditions.
   - a peculiar ERC20 token is used on the platform.
3. **Low Likelihood**: Unlikely to occur.
   - a hard-to-change variable is set to a unique value at a specific time.

### Creating Findings Reports

We covered how to turn those findings into a professional breakdown using this template:

---

```
### [S-#] TITLE (Root Cause + Impact)

**Description:** - Succinctly detail the vulnerability

**Impact:** - The affects the vulnerability has

**Proof of Concept:** - Programmatic proof of how the vulnerability is exploited

**Recommended Mitigation:** Recommendations on how to fix the vulnerability
```

---

### Timeboxing

We briefly covered the importance of timeboxing. We'll always be able to further scrutinize a codebase - time management and constraining our time investments is how we become efficient security reviewers.

### Professional PDF Report

And finally, we walked through the steps needed to create a beautiful PDF report using our [**audit-report-templating**](https://github.com/Cyfrin/audit-report-templating) repo.

Leveraging new tools like [**Pandoc**](https://pandoc.org/installing.html) and [**LaTex**](https://www.latex-project.org/) we were able to convert our markdown report into a presentable PDF that we're now proudly displaying on our own GitHub Security Reviewer portfolio.

### Wrap Up

Wooooow. That's a lot when you put it all together like that. You should be incredibly proud of your progress so far. Take a break, stretch your legs, tweet your successes and then come back.

The next security review is going to be _SICK_.
