---
title: Testing Deleting Mappings and Fixing Our Tools
---

# Smart Contracts and Data Management: A Deep Dive into Token Mapping and Deletion

Welcome to our deep dive discussion on asset tokens, deleting mappings, and the peculiarities of Solidity smart contracts. Today, we'll unravel how smart contracts interact with asset tokens and the possible pitfalls and bugs that can arise as we develop our applications.

## Deletion and Checks in Asset Token Mappings

In a smart contract, we typically assign values and map `address` to `assetToken`.

This line means, simply, we're assigning the token located at `assetToken` to a variable also named `assetToken`.

Now, this can lead to a critical question:

> Does deleting a mapping work?

![](https://cdn.videotap.com/EFG0Cihz1p7oQkV1y9Hx-36.9.png)

It's a valid question because let's say we have several checks on `assetToken == 0`. If the deletion process doesn't work as expected, our asset won't return to 0. So, how do we test this?

## Testing Deletion with Chisel

To explore this, I decided to pull up Chisel, a Solidity language extension for Visual Studio, and create a mapping with the structure `address` to `address`.

In theory, when I look up `tokenToToken[address1]`, I'll get `address2`. Now, let's go ahead and attempt deletion:

Consequently, when I look up `tokenToToken[address1]` after the deletion, I'm still getting `address2`. Clearly, something is off here.

![](https://cdn.videotap.com/nqmehgM9xG2CGsHOR1yI-80.5.png)

## Digging Deeper with Remix

To further understand the issue, let's pull up Remix, a powerful, open-source tool used for writing Solidity smart contracts. We'll create a simple contract, aimed at mapping `address` to `address`.

Following similar steps as before, we'll set the mapping between an account address and the contract address, then delete the mapping, and finally, check the mapping again.

This time we get zero, contrary to what Chisel showed.

## A Bug in Foundry

The probable conclusion? There's likely a bug with Foundry.

Your logical next step should be heading to Foundry's GitHub page and opening an issue. Check out the existing issues first, of course. Search for "Chisel mappings" and see if there's a relevant issue already there. If nothing matches, make a new issue indicating the problem with Chisel mappings deletion.

Here we've encountered a real-life bug, and we have done our part to inform the community about it. So, until next time, keep exploring, keep debugging, and keep developing.
