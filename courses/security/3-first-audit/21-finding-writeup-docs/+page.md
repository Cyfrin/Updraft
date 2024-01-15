---
title: Finding Writeup Documentation Fix
---

_Follow along with this video:_

---

### Final Finding

Our last finding is `informational` in nature (we'll learn more about what that means when we go over severities), but in essence - it's not very impactful, but it's still an issue and we should report it.

You'll learn with experience that informational and gas findings don't generally require extensive write ups, but for now, let's treat this like any other finding. Fresh template time!

---

### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

### Title

    Remember the rule of thumb: `Root Cause + Impact`

- **Root Cause** - NatSpec describes a parameter that doesn't exist
- **Impact** - NatSpec is incorrect

So our title should look something like this:

    **Title:** [S-#] The `PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect.

Easy.

### Description

Here we can just paste the problematic section of the code and briefly describe the problem.

    **Description:**
    '''
    /*
     * @notice This allows only the owner to retrieve the password.
    @> * @param newPassword The new password to set.
     */
    function getPassword() external view returns (string memory) {}
    '''

    The `PasswordStore::getPassword` function signature is `getPassword()` while the natspec says it should be `getPassword(string)`.

### Impact

Impact of course is:

    **Impact** The natspec is incorrect

### Proof of Concept

This section isn't actually needed for a report like this, so we'll omit it.

### Recommended Mitigation

This one should be obvious to us as well. We recommend the documentation is made accurate. Let's add it to the report.

    **Recommended Mitigation:** Remove the incorrect natspec line

We can use a fun markdown trick to illustrate the suggested changes.

```diff
    /*
     * @notice This allows only the owner to retrieve the password.
-     * @param newPassword The new password to set.
     */
```

_You can achieve this using the below syntax_

    ```diff
    + line you want to add (shown in green)
    - line you want to remove (shown in red)
    ```

Let's put everything together into a report now.

<details open>
<summary>Finding #3 Report</summary>

```
[S-#] The `PasswordStore::getPassword` natspec indicates a parameter that doesn't exist, causing the natspec to be incorrect.

**Description:**
    '''
    /*
     * @notice This allows only the owner to retrieve the password.
    @> * @param newPassword The new password to set.
     */
    function getPassword() external view returns (string memory) {}
    '''

    The `PasswordStore::getPassword` function signature is `getPassword()` while the natspec says it should be `getPassword(string)`.

**Impact:** The natspec is incorrect

**Recommended Mitigation:** Remove the incorrect natspec line.

'''diff
    /*
     * @notice This allows only the owner to retrieve the password.
-     * @param newPassword The new password to set.
     */
'''

```

</details>

### Wrap Up

I told you this one would be quick. We nailed it. Let's look at how we can use AI to polish things up for us when we need it.
