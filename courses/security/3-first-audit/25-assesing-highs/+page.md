---
title: Assessing Highs
---

_Follow along with this video:_

---

### Assessing Our Severities

Alright! We're ready to start applying our understanding of `likelihood` and `impact` to the PasswordStore protocol. Let's take a look at our findings.

```
### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

### [S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

### [S-#] The 'PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect
```

## Finding #1

### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

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


Let's consider impacts and likelihoods of our first scenario (I've provided you a reference to them above).

Upon consideration we see that, while funds aren't at risk, the user's 'hidden' password being visible to anyone is a pretty severe impact to how the protocol is expected to function.

Because of this, I would argue our assessment of `Impact` should be `High`.

Now, for likelihood we ask ourselves:

- `How likely is it that somebody will be able to exploit this?`

The answer is - _very likely_. There's nothing stopping any malicious actor from acquiring the stored password - it's almost a certainty. `Likelihood` should also be considered `High`.

### Likelihood & Impact:

- Impact: High
- Likelihood: High
- Severity: High

Applying our assessment to our finding title should look like this:

![severity1](/security-section-3/25-assessing-highs/severity1.png)

> Pro-tip: We should try to arrange our findings in our report from High -> Low and from Worst -> Least Offenders

## Finding #2

### [S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

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


Considering our second finding, we can tell that anyone being able to set the password at any time is a severe disruption of protocol functionality. A clear `High` `Impact`.

The `likelihood` is also going to be `High`. Anyone can do this, at any time, the vulnerability is rooted in `access control`.

### Likelihood & Impact:

- Impact: High
- Likelihood: High
- Severity: High

The application of this to our second finding's title should leave us with:

```
### [H-1] Storing the password on-chain makes it visible to anyone and no longer private

### [H-2] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

### [S-#] The 'PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect
```

### Wrap Up

This is great! We've got one more finding to assess the severity of and this one's a little different as it's `informational`. Let's go over it's `Impact` and `Likelihood` in the next lesson.
