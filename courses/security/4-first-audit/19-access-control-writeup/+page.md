---
title: Access Control Write-up
---

_Follow along with this video:_

### Clean Slate

We've got the experience now, let's add a clean template to our `findings.md` for our `Access Control` finding and start filling this out together.

A reminder of the function in question and our empty template:

```js
/*
     * @notice This function allows only the owner to set a new password.
     * @param newPassword The new password to set.
     */
    function setPassword(string memory newPassword) external {
        s_password = newPassword;
        emit SetNetPassword();
    }
```

---

### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

### Title

We know the rule of thumb (`Root Cause + Impact`). Let's ask ourselves, `What is the root cause of this vulnerability?` and `What is the impact of this?`

- **Root Cause:** `setPassword` has no access control
- **Impact:** non-owner can change the password.

So, our `Title` might look like this

```
[S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password
```

### Description

I challenge you to write your own description for this vulnerability! Remember, it should be clear and concise, describing things in detail in plain language. When you're done, click below to see mine.

<details open>
<summary>My Description</summary>

**Description:** The `PasswordStore::setPassword` function is set to be an `external` function, however the purpose of the smart contract and function's natspec indicate that `This function allows only the owner to set a new password.`

```js
function setPassword(string memory newPassword) external {
    // @Audit - There are no Access Controls.
    s_password = newPassword;
    emit SetNewPassword();
}
```

</details>

### Impact

The impact of our vulnerability should be pretty easy. Let's write it out now.

```
**Impact:** Anyone can set/change the stored password, severely breaking the contract's intended functionality
```

Let's put things together in our report so far.

---

```
### [S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

**Description:** The `PasswordStore::setPassword` function is set to be an `external` function, however the purpose of the smart contract and function's natspec indicate that `This function allows only the owner to set a new password.`

'''
function setPassword(string memory newPassword) external {
    // @Audit - There are no Access Controls.
    s_password = newPassword;
    emit SetNewPassword();
}
'''

**Impact:** Anyone can set/change the stored password, severely breaking the contract's intended functionality

**Proof of Concept:**

**Recommended Mitigation:**
```

---

### Wrap Up

Already our report looks incredibly professional. Next lesson we're applying our knowledge to construct a `Proof of Code`. Don't stop now!
