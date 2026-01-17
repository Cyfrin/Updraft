---
title: Description
---

_Follow along with this video:_

---

### The report so far:

---

### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

Alright, `title` done. What's next? Let's take a look at description and impact.

### Description

Our goal here is to describe the vulnerability concisely while clearly illustrating the problem. A description for our finding here might look like this.

---

```
**Description:** All data stored on chain is public and visible to anyone. The s_password variable is intended to be hidden and only accessible by the owner through the getPassword function.

I show one such method of reading any data off chain below.
```

---

This looks good, but we can do even better. The bigger a codebase, the more our variables and references are going to get lost. We can fight this with a little bit of markdown formatting and standardizing our naming conventions.

![description1](/security-section-3/15-description/description1.png)

Consider the above adjustments to our references in the description. By wrapping the variable and function name in backticks we're able to highlight them. Additionally we're prepended the names with reference to the contract in which they're found.

---

```
**Description:** All data stored on chain is public and visible to anyone. The `PasswordStore::s_password` variable is intended to be hidden and only accessible by the owner through the `PasswordStore::getPassword` function.

I show one such method of reading any data off chain below.
```

---

This is the kind of clarity we should strive for in our reports!

### Impact

The impact is fairly self-evident, but to articulate it:

```
**Impact:** Anyone is able to read the private password, severely breaking the functionality of the protocol.
```

Putting things together, our report so far should look like this

---

```
### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

**Description:** All data stored on chain is public and visible to anyone. The `PasswordStore::s_password` variable is intended to be hidden and only accessible by the owner through the `PasswordStore::getPassword` function.

I show one such method of reading any data off chain below.

**Impact:** Anyone is able to read the private password, severely breaking the functionality of the protocol.

**Proof of Concept:**

**Recommended Mitigation:**
```

---

### Wrap Up

In the next lesson, we're going to go over `Proof of Concept` sometimes called `Proof of Code`. This is a critical section of our report where we show, irrefutably, that the vulnerability exists and has considerable impact.

This is the section that prevents protocols from disregarding legitimate concerns.

Let's get to the code!
