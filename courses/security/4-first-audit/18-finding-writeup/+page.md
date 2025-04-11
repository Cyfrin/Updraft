---
title: Finding Writeup Recap
---

_Follow along with this video:_

---

### Our Finding Report

<details closed>
<summary>Finding Report</summary>

### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

**Description:** All data stored on chain is public and visible to anyone. The `PasswordStore::s_password` variable is intended to be hidden and only accessible by the owner through the `PasswordStore::getPassword` function.

I show one such method of reading any data off chain below.

**Impact:** Anyone is able to read the private password, severely breaking the functionality of the protocol.

**Proof of Concept:** The below test case shows how anyone could read the password directly from the blockchain. We use foundry's cast tool to read directly from the storage of the contract, without being the owner.

Create a locally running chain

    make anvil

Deploy the contract to the chain

    make deploy

Run the storage tool

    cast storage <ADDRESS_HERE> 1 --rpc-url http://127.0.0.1:8545

_We use 1 because that's the storage slot of `PasswordStore::s_password`._

You'll get an output that looks like this:

    0x6d7950617373776f726400000000000000000000000000000000000000000014

You can then parse that hex to a string with:

    cast parse-bytes32-string 0x6d7950617373776f726400000000000000000000000000000000000000000014

And get an output of:

    myPassword

**Recommended Mitigation:** Due to this, the overall architecture of the contract should be rethought. One could encrypt the password off-chain, and then store the encrypted password on-chain. This would require the user to remember another password off-chain to decrypt the stored password. However, you're also likely want to remove the view function as you wouldn't want the user to accidentally send a transaction with this decryption key.

</details>

### Recap

Our finding report looks great. All we're missing is the severity (`[S-#]`), but we'll get to that shortly. Let's recap some of the important aspects we went over while compiling this report.

### The Write-Up Structure

1. **Title**: A title should be succinct and clear. A best practice is to adhere to the `Root Cause + Impact` rule of thumb.

2. **Description**: This is a brief explanation of the problem, widely enhanced by using markdown and clear naming conventions for our variables.

3. **Impact**: The impact should be clear and concise in how, in plain language, is describes the affects the vulnerability has on the protocol.

4. **Proof of Code**: A vital part of a good report, this section proves how someone could exploit the detailed vulnerability by walking through the process programmatically.

5. **Recommended Mitigation**: This is where our expertise shines. Our focus in the recommendation should be in making the protocol more secure, advising specific changes or considerations that should be made to mitigate the reported vulnerability and adding value by offering solutions instead of just pointing out problems.

### Wrap Up

Our report looks awesome, but there's more to do. No stopping now, let's dive into our `Access Control` finding as see what a finding report for it would look like. This shouldn't take long, we're practically experts already.
