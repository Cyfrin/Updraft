---
title: Recap II
---

_Follow along with this video:_

---

Let's recap a few of the things we've found while reviewing this protocol so far.

### Vulnerability 1

First, we found that the `setPassword()` function, while intending to only callable by the `owner`, has no check to ensure this.

```js
function setPassword(string memory newPassword) external {
    s_password = newPassword;
    emit SetNetPassword();
}
```

This is an `Access Control` vulnerability, allowing anyone to change the password saved, at any time. A proper check for this might look like:

```js
function setPassword(string memory newPassword) external {
  if (msg.sender !== s_owner) {
    revert PasswordStore__NotOwner;
  }
  s_password = newPassword;
  emit SetNetPassword();
}

```

The above check will assure the function reverts if the caller is not the `owner`. Keep this in mind for our mitigation section of our report!

### Vulnerability 2

The second issue we came across in our review was something likely informational, but none the less good to note. The `NatSpec` of our `getPassword()` function reads:

```js
/*
 * @notice This allows only the owner to retrieve the password.
 * @param newPassword The new password to set.
 */
```

We noted that the `getPassword()` function doesn't take the described parameter, as such this line of documentation should be removed.

### Vulnerability 3

Last but definitely not least, we noticed that the application stored passwords on-chain. This is a major security concern as **all data on-chain is public information**. The business logic of this protocol is flawed!

```js
string private s_password; //This is not secure!
```

> _**Remember**: all data stored on-chain is publicly accessible. Sensitive data must necessarily be kept off-chain._

### Wrap Up

To sum up our findings:

- Access Control on `setPassword()` function.
- Inaccurate `NatSpec` for `getPassword()` function.
- Private variables aren't `hidden` - all data is publicly accessible, breaking the protocol logic.

Great work in spotting these vulnerabilities! We've already shown that we're capable of making this protocol more secure.

In the next lesson, we're going to go over some test assessment.
