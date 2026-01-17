---
title: Severity Rating Assessing Informational/Gas/Non-Crit
---

_Follow along with this video:_

---

## Finding #3

### [S-#] The 'PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect

<details closed>
<summary>Impacts and Likelihoods</summary>

1. **High Impact**: `funds` are directly or nearly `directly at risk`, or a `severe disruption` of protocol functionality or availability occurs.
2. **Medium Impact**: `funds` are `indirectly at risk` or there’s `some level of disruption` to the protocol’s functionality.
3. **Low Impact**: `Fund are not at risk`, but a function might be incorrect, or a state handled improperly etc.

---

4. **High Likelihood**: Highly probably to happen.
   - a hacker can call a function directly and extract money
5. **Medium Likelihood**: Might occur under specific conditions.
   - a peculiar ERC20 token is used on the platform.
6. **Low Likelihood**: Unlikely to occur.
   - a hard-to-change variable is set to a unique value at a specific time.

</details>


Just like before, let's ask ourselves things like

- `Are funds at risk?` - No.
- `Is this a severe disruption of the protocol?` - No.
- `Are funds indirectly at risk?` - No
- `Is there SOME disruption of the protocol?` - Also no.

It seems already that this finding is going to be pretty low severity, but look at our `Low Impact` criteria (referenced in the dropdown above), we can see that even this doesn't seem to apply.

What do we do?

### Likelihood & Impact

- Impact: NONE
- Likelihood: HIGH
- Severity: Informational/Gas/Non-crit

In cases like these we would want to inform the protocol that these considerations may not explicitly be bugs but they could include things like

- Design Pattern Improvements
- Test Coverage Improvements
- Documentation Errors
- Spelling Mistakes

Anything that isn't a bug, but maybe should be considered anyway to make the code more readable etc - `Informational Severity` (sometimes called 'non-crits') There are also `Gas` severity findings, pertaining to gas optimizations, but we'll go over some of those a little later on.

This is how our titles look now:

```
### [H-1] Storing the password on-chain makes it visible to anyone and no longer private

### [H-2] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

### [I-1] The 'PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect
```

### Wrap Up

Great work! Our report is looking amazing at this stage. We've consolidated our findings into a document that is clear and concise - outlining all the issues we've spotted. Our findings are well formatted and easy to understand with robust `Proofs of Code`.

What's next?

Maybe we missed something .. should we go back and do another pass? Let's go over that frame of mind in the next lesson.
