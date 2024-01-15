---
title: Reporting - Incorrect Solc Version
---

_Follow along with this video:_

---

### Incorrect Solc Version

The next finding we're going to write up is another `informational` it seems. We identified in an earlier lesson that Puppy Raffle is using an outdated version of Solidity!

In this circumstance, `Slither` caught this one for us. It can often be valuable to pull from the Slither Documentation for references and recommendations for these types of findings. To add this to our `findings.md` it would look something like this:

```
### [I-2] Using an Outdated Version of Solidity is Not Recommended

solc frequently releases new compiler versions. Using an old version prevents access to new Solidity security checks. We also recommend avoiding complex pragma statement.
Recommendation

**Recommendations:**

Deploy with any of the following Solidity versions:

    0.8.18

The recommendations take into account:

    Risks related to recent releases
    Risks of complex code generation changes
    Risks of new language features
    Risks of known bugs

Use a simple pragma version that allows any of these versions. Consider using the latest version of Solidity for testing.

```

I'll mention as well, I know we have a finding template - and we'll absolutely use it soon - but for informational findings, they're often simplistic enough that being less verbose is acceptable.

Next lesson - Next vulnerability!
