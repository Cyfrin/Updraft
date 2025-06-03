---
title: Recon - Understanding the Code
---

_Follow along with this video:_

---

### How Tincho Cracked the Code

Tincho, was very pragmatic in his approach, literally going through the code line by line. This method might seem like he was looking for bugs/vulnerabilities in the code. But actually, he was just trying to understand the codebase better. In essence, understanding the functionalities and architecture of the code forms the first and most important part of code inspection.

So let's take it from the top, just like Tincho did…

### Understanding What the Codebase Is Supposed to Do

Our client's documentation has let us know what the intended functionality of the protocol are. Namely: A user should be able to store and retrieve their password, no one else should be able to see it.

Let's try to find this functionality within the code as we go through things line by line.

### Scanning the Code from the Top

After gaining a fundamental understanding, you can start going through the code. You can jump directly to the main functionality. However, to keep things simple, let's just start right from the top and start working our way down.

First Lines:

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
```

The open source license seems fine. A compiler version of `0.8.18` may not be an immediate concern, but we do know that this isn't the most recent compiler version. It may be worthwhile to make note of this to come back to.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18; // Q: Is this the correct compiler version?
```

Formatting our in-line comments in a reliable way will allow us to easily come back to these areas later by leveraging search.

![understanding1](/security-section-3/8-understanding-code/understanding1.png)

### Taking Notes

As Tincho had advised, creating a separate file to dump thoughts into and compile notes can be a valuable organizational tool. I like to open a file called `.notes.md` and outline things like potential `attack vectors`

> **Pro Tip**: Some security researchers, like 0Kage from the Cyfrin team, even print the source code and use different colour highlighters to visualize the codebase better.

### Moving Further

Next we see some `NatSpec` comments like this can be considered **extended documentation** and will tell us more about what the protocol is expected to do.

```js
/*
 * @author not-so-secure-dev
 * @title PasswordStore
 * @notice This contract allows you to store a private password that others won't be able to see.
 * You can update your password at any time.
 */
```

The intended functionality is pretty clear. Maybe we want to jot this down in our `.notes.md`.

Let's consider things upto our constructor.

![understanding2](/security-section-3/8-understanding-code/understanding2.png)

Everything looks great so far, the client is using some clear standard naming conventions.

**Hypothetically**, were the naming conventions poor, we might want to make an informational note.

```js
contract PasswordStore {
    // I - naming convention could be more clear ie 'error PasswordStore__NotOwner();'
    error NotOwner();
}
```

In the example above we use `// I` for `informational` findings, but use what feels right for you.

> **Pro Tip** - I like to use a package called [**headers**](https://github.com/transmissions11/headers) by `transmissions11`. It allows me to clearly label areas of a repo I'm reviewing.

## Looking at Functions

Alright, we've reached the functions of this protocol. Let's assess the `setPassword()` function first. Fortunately, we again have `NatSpec` to consider.

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

Sometimes a protocol won't have clear documentation like the above. This is where clear lines of communication between the security reviewer and the client are fundamental, as Tincho advised.

Were things less clear, it may be appropriate to leave a note to ask the client.

```js
// Q What's this function do?
```

It can't be stressed enough, clarity in our understanding of the codebase and the intended functionalities are a _necessary_ part of performing a security review.

### Wrap Up

This has been a great start getting our hands on the code and applying a critical/adversarial frame of mind. You may already have spotted a vulnerability, we'll be taking a closer look in our next lesson!
