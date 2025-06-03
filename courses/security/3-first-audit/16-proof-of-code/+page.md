---
title: Proof of Code
---

_Follow along with this video:_

---

### The report so far:

---

### [S-#] Storing the password on-chain makes it visible to anyone and no longer private

**Description:** All data stored on chain is public and visible to anyone. The `PasswordStore::s_password` variable is intended to be hidden and only accessible by the owner through the `PasswordStore::getPassword` function.

I show one such method of reading any data off chain below.

**Impact:** Anyone is able to read the private password, severely breaking the functionality of the protocol.

**Proof of Concept:**

**Recommended Mitigation:**

---

### Proof of Code/Concept

Our report is looking great, but the next section, `Proof of Code/Concept`, is imperative. Let's go over how we programmatically prove the claim we're making - that anyone can read the protocol's stored password.

First we need a local chain running.

```bash
anvil
```

> Note: Most PoC's won't require a local blockchain

Next we need to deploy our protocol, fortunately, PasswordStore has a `make` command set up for us. Note that their deploy script is setting the password `myPassword` in the process. Open a new terminal and run the following.

```bash
make deploy
```

Foundry allows us to check the storage of a deployed contract with a very simple `cast` command. For this we'll need to recall to which storage slot the `s_password` variable is assigned.

![proof-of-code1](/security-section-3/16-proof-of-code/proof-of-code1.png)

With this consideration we can run the command `cast storage <address> <storageSlot>` like this (_your address may be different_).

```bash
cast storage 0x5FbDB2315678afecb367f032d93F642f64180aa3 1
```

We should receive an output similar to this:

```
`0x6d7950617373776f726400000000000000000000000000000000000000000014`
```

This is the bytes form of the data at `storage slot 1`. By using another convenient Foundry command we can now decode this data.

```bash
cast parse-bytes32-string 0x6d7950617373776f726400000000000000000000000000000000000000000014
```

Our output then becomes:

```
myPassword
```

And we've done it. In a few quick commands we've shown that the data our client is expecting to keep hidden on chain is accessible to anyone. Let's add these steps as proof to our report. Things are getting long, so I've collapsed the report examples going forward!

<details closed>
<summary>Finding Report</summary>
### [S-#] Storing the password on-chain makes it visible to anyone and no longer private
:br
:br
**Description:** All data stored on chain is public and visible to anyone. The `PasswordStore::s_password` variable is intended to be hidden and only accessible by the owner through the `PasswordStore::getPassword` function.
:br
:br
I show one such method of reading any data off chain below.
:br
:br
**Impact:** Anyone is able to read the private password, severely breaking the functionality of the protocol.
:br
:br
**Proof of Concept:**The below test case shows how anyone could read the password directly from the blockchain. We use foundry's cast tool to read directly from the storage of the contract, without being the owner.

Create a locally running chain

    make anvil

Deploy the contract to the chain

    make deploy

Run the storage tool

We use 1 because that's the storage slot of s_password in the contract.

    cast storage <ADDRESS_HERE> 1 --rpc-url http://127.0.0.1:8545

You'll get an output that looks like this:

    0x6d7950617373776f726400000000000000000000000000000000000000000014

You can then parse that hex to a string with:

    cast parse-bytes32-string 0x6d7950617373776f726400000000000000000000000000000000000000000014

And get an output of:

    myPassword

:br
**Recommended Mitigation:**

</details>

### Wrap Up

We've one more section in our report to fill out, the `Recommended Mitigations`. This is where we get a chance to illustrate our experience and bring value to the process by offering our expert advice on how rectify the problems faced by this vulnerability.

Let's do it.
