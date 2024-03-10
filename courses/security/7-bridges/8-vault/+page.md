---
title: Vault.sol
---



---

# Dive into the L1 Vault of TokenBridge

In this post, we're going to explore the innards of the Layer 1 (L1) vault, a critical part of the TokenBridge, a network built for token transfers between different blockchain networks.

## The Role of the L1 Vault

To kick things off, the L1 Vault is essentially a storage box for tokens. It holds tokens when they're not being used or transferred on either L1 or Layer 2 (L2) networks. When needed, these tokens can be unlocked to "frolic and play" on the L1 or L2 playgrounds.

![](https://cdn.videotap.com/SPq2DMS4BIdTLOfpIdi6-22.67.png)

Let's dive deeper into the vault itself.

## An Introduction to L1 Vault Structure

The L1 Vault, as expected, is slightly larger in size but not too big to handle. The vault is 'ownable', meaning it can have designated owners - this could be an individual, a group, or another contract.

There's a descriptor (NatSpec) on top that indicates the author's identity - Boss Bridge. According to the NatSpec, the contract has two primary responsibilities: locking and unlocking tokens on the L1 or L2, and giving the green light to a bridge so it can move funds to and from this contract.

The owner of this contract, the note says, should ideally be a bridge.

And this sparks off our first question: can we somehow tweak it so that the owner is not the bridge?

## Deployment of the L1 Vault

However, the folks at TokenBridge seem to be missing a deploy folder, which is definitely something worth mentioning. How would you deploy your contract without a deploys directory? This could certainly improve.

We then dig further into how they launch the vault. They've got an initiation sequence where the vault is equated to 'tokenbridge.vault’, which seems to suggest that the Boss bridge itself is deploying the vault.

Taking a closer look at the L1 Boss Bridge, this assumption is confirmed - the 'vault' is a public, immutable value. It is set to be the 'vault' address during the deployment process, which means there is likely no failure-to-initialize issue here.

## Understanding Ownership in the Contract

Next, we come across the apparent fact that the L1 bridge is ownable. This isn't surprising. A constructor prepares an IERC20 token (a standard interface for tokens within smart contracts). It's worth noting that each vault seems to be working with one token and one bridge.

The constructor of the contract appears perfectly reasonable. The 'ownable' entity will be message.sender (which will be the Boss bridge). The core purpose of the `approveTo` function seems to be that the bridge is authorized to move funds in and out of the vault.

However, one detail stands out - the approval isn't hardcoded to the bridge, but can potentially be granted to anything, which could pose a security risk.

```js
    function ApproveTwo(address _target, uint256 _amount) external onlyOwner {
        Token.approve(_target, _amount);
        }
```

These are some initial observations and insights on the L1 vault in the TokenBridge contract. Despite some minor concerns and potential areas for improvement, the contract seems to be well structured and efficient. Up next: exploring Solidity metrics and how they affect the contract.

> "Each vault works with one token. That's good to know."
