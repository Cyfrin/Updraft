---
title: An Amazing Title
---

_Follow along with this video:_

---

### The report so far:

---

### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

### Title

The first thing we need to fill out is our report's title. We want to be concise while still communicating important details of the vulnerability. A good rule of thumb is that your title should include:

> Root Cause + Impact

So, we ask ourselves _what is the root cause of this finding, and what impact does it have?_

For this finding the root cause would be something asking to:

- **Storage variables on-chain are publicly visible**

and the impact would be:

- **anyone can view the stored password**

Let's work this into an appropriate title for our finding (don't worry about `[S-#]`, we'll explain this more later).

---

```
### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**
```

---

### Wrap Up

The easiest way to ensure a clear title of your report is to be concise and adhere to the rule of thumb.

> Root Cause + Impact

One step down! Let's move onto the description section next
