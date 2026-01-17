---
title: Missing Access Controls Proof of Code
---

_Follow along with this video:_

---

### Report so far

<details closed>
<summary>Access Control Report</summary>

### [S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

**Description:** The `PasswordStore::setPassword` function is set to be an `external` function, however the purpose of the smart contract and function's natspec indicate that `This function allows only the owner to set a new password.`

function setPassword(string memory newPassword) external {
// @Audit - There are no Access Controls.
s_password = newPassword;
emit SetNewPassword();
}

**Impact:** Anyone can set/change the stored password, severely breaking the contract's intended functionality

**Proof of Concept:**

**Recommended Mitigation:**

</details>


### Proof of Concept/Proof of Code

While this vulnerability may seem obvious, often it isn't. PoC's are valuable in proving that our claim that the protocol is at risk is valid and a serious concern.

Let's write a `fuzz test` to check if in fact addresses other than the owner are able to call `setPassword`.

```js
    function test_anyone_can_set_password(address randomAddress) public {
        vm.assume(randomAddress != owner);
        vm.startPrank(randomAddress);
        string memory expectedPassword = "myNewPassword";
        passwordStore.setPassword(expectedPassword);

        vm.startPrank(owner);
        string memory actualPassword = passwordStore.getPassword();
        assertEq(actualPassword, expectedPassword);
    }
```

Foundry will pass this function random addresses to see if the assert holds, based on the number of runs we've configured.

![access-control1](/security-section-3/20-access-control-poc/access-control1.png)

We can see that through 256 runs, our fuzz test passed! So indeed any address was able to call our `setPassword` function!.

### Recommended Mitigations

The mitigation of this is pretty clear - add access control to this function.

Let's add our test as a `proof of code` as well as our `recommended mitigation` to our report.

<details closed>
<summary>Access Control Report</summary>

```
### [S-#] `PasswordStore::setPassword` has no access controls, meaning a non-owner could change the password

**Description:** The `PasswordStore::setPassword` function is set to be an `external` function, however the purpose of the smart contract and function's natspec indicate that `This function allows only the owner to set a new password.`

'''js
function setPassword(string memory newPassword) external {
    // @Audit - There are no Access Controls.
    s_password = newPassword;
    emit SetNewPassword();
}
'''

**Impact:** Anyone can set/change the stored password, severely breaking the contract's intended functionality

**Proof of Concept:** Add the following to the PasswordStore.t.sol test file:

'''js
function test_anyone_can_set_password(address randomAddress) public {
        vm.assume(randomAddress != owner);
        vm.startPrank(randomAddress);
        string memory expectedPassword = "myNewPassword";
        passwordStore.setPassword(expectedPassword);

        vm.startPrank(owner);
        string memory actualPassword = passwordStore.getPassword();
        assertEq(actualPassword, expectedPassword);
    }
'''

**Recommended Mitigation:** Add an access control conditional to `PasswordStore::setPassword`.

'''js
if(msg.sender != s_owner){
    revert PasswordStore__NotOwner();
}
'''
```

> Pro-tip: Use the dropdowns, like you've seen in these lessons, in your reports to hide big blocks of code.

<details>
<summary>Here's the syntax</summary>

> ```
> <details>
> <summary>Code</summary>
> '''js
> function test_anyone_can_set_password(address >randomAddress) public {
>        vm.assume(randomAddress != owner);
>        vm.startPrank(randomAddress);
>        string memory expectedPassword = "myNewPassword";
>        passwordStore.setPassword(expectedPassword);
>
>        vm.startPrank(owner);
>        string memory actualPassword = passwordStore.>getPassword();
>        assertEq(actualPassword, expectedPassword);
>    }
> '''
> </details>
> ```

</details>
</details>

### Wrap Up

That's two findings down. Repetition is what will strengthen these skills and make writing these reports second nature. As we saw in this lesson, security reviewers even get to do a little coding 😋.

Let's move on to our third finding, this one should be quick!
