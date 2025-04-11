---
title: Writing an amazing finding report
---

_Follow along with this video:_

---

### Phase #4: Reporting

After the identification phase, we are tasked with communicating our findings to the protocol. This phase is crucial on several levels:

1. We need to convince the protocol that the identified vulnerabilities are valid.
2. We must illustrate how severe/impactful the issue is
3. We should also help the protocol with mitigation strategies.

By effectively communicating this information, we position ourselves as educators, helping the protocol understand **why** these vulnerabilities are issues, **why** they were overlooked, and **how** to fix them to avoid running into the same issues in the future.

### Writing Your First Finding

Now comes an incredibly exciting part - doing a minimalistic write up of the vulnerabilities you've found.

We've prepared a finding template for you, accessible in the course's [**GitHub Repo**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/finding_layout.md).

Open a new file in your project titled `audit-data`, download and copy `finding_layout.md` into this folder.

It should look like this when previewed (`CTRL + SHIFT + V`):

---

### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

You can customize this however you like, but this minimalistic template is a great starting point.

> Remember our goals in this report:
>
> - illustrate that the issue is valid
> - make clear the issue's severity and impact
> - offer recommendation for mitigation

### Wrap up

Create a copy of `findings_layout.md`, name it `findings.md` and let's start filling these sections out.

Our first finding is `Private variable's aren't actually private!`
