---
title: Proof of Code
---

_Follow along with this video:_



---

# Demystifying Blockchain Security: A Test Case with Anvil and Foundry

In this post, we'll explore how to deploy a password store on a locally running blockchain, read from the password store, and access data that's meant to be private. By doing this, we're going to demonstrate a real-world example of a serious blockchain security issue we should all be aware of.

## Setting Up A Locally Running Blockchain Using Anvil

The first step is to set up a fake blockchain to work with. If you have Foundry installed, Anvil should also be part of your development ecosystem. Anvil allows us to create a fake blockchain, convenient for simulating scenarios without breaching actual blockchain security.

Run the following command to initiate Anvil:

```shell
anvil
```

This should set Anvil running, creating a local blockchain.

## Deploying Password Store using Foundry

The next step involves deploying a password store onto the locally running blockchain. To do this, we'll need a new shell from your terminal. We'll then run a script that will deploy the password store to our locally running blockchain. This deployment script resides in a makefile.

Reading Data Off the BlockchainOnce the password store is deployed, we can use Foundry's capability to access the stored data. Foundry has a keyword `Storage` which is used to read from the blockchain. Let's say the password was stored in slot 1; we can retrieve the data like so:```shcas storage -a contract\_address -s 1 -u rpc\_urlNote: replace `contract_address`with the actual address and`rpc_url` with your Anvil's Remote Procedure Call URL.

This will return a byte representation of the password, i.e., `my password`.

## Parsing Byte Representation

To translate these bytes back into their original form, we can use the `parse` command in Foundry.

Replace `byte_representation` with the byte return from `cas storage`. The output should coincide with the initially stored password, `my password`.

## Concluding Findings

The process we've discussed provides proof that it's possible to read private data directly off the chain. An attacker can potentially retrieve and misuse this data.

> "This test case is overkill in a private audit, but clearly illustrates the importance of blockchain security in a competitive audit or when dealing with less experienced developers."

To sum up: first, we initialized a fake blockchain using Anvil, then deployed a password-store onto this fake blockchain. We used Foundry to read from this password-store on the blockchain, and decoded the byte output back to its original form. This audit experience is a handy reminder for developers to take extreme caution while storing sensitive information on a blockchain. The potential repercussions of mismanaging blockchain security extend beyond mere financial loss - they can potentially compromise your user's data and trust.
