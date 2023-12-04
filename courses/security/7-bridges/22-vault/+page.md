---
title: Exploit - Vault can infinite mint unbacked tokens
---



---

# A Deeper Dive into the MEV Attack and Uncovering a Major Security Flaw

Exciting revelations generally come with a bit of craziness, and today, we bring to you one such incident—an astonishing vulnerability. At first glance, it appears captivatingly cool, yet incredibly daunting. We reveal a flaw that allows any user to steal funds after the bridge receives approval from someone. This scenario might lead to MEV (Miner Extractable Value) attacks. Intriguing, right? Let's unravel this mystery together.

## Uncovering a Significant Security Threat

![](https://cdn.videotap.com/yngYAVIajAxqq6gSChMU-18.png)

The perplexing part is when the vault, intending to authenticate the bridge, essentially leads to a chain of apprehensive questions. What happens if the safe haven we call the vault approves the bridge? Does that mean a user can filch funds from the vault? Did we just expose ourselves to another audit? Or is this a 'high'?

We can't let this issue slide. So, let's explore this further.

## What does Vault's Approval to a Bridge Mean?

```javascript
function testCanTransferFromVaultToVault() {...}
```

The vault, as the entity approving the bridge, raises alarming questions. Let's consider a user initiates a transfer from the vault to the attacker. Ambiguously enough, could this process occur for any amount and for any token within the bridge? That would be a disastrous outcome!

Our next step? Writing a test to verify this vulnerability.

## Is There a Limit to Money Minting?

![](https://cdn.videotap.com/bnfWcdfv7XuRYwEfv14a-84.png)

With our test, we are aiming to transfer from the vault back to itself. When we assert ourselves to be the recipient, the tokenized assets stay within the vault—this causes an emission of a deposit event from the vault to the recipient on the L2 layer.

Here's where things become startlingly interesting. If the tokens stay within the vault infinitely, could we mint unlimitedly on the L2 layer? Let's try this out.

## Code Implementation

In the next set of developments, we need to create an attacker.

```javascript
uint256 vaultBalance = 500 ether;
minter.mint(address(token), address(vault), vaultBalance);
```

Let's assume, for simplification, that our vault already holds some currency. In this example, we let it hold 500 ether. To effectively simulate this situation, we can use Foundry's cheat code which gifts our vault with 500 ethers of a particular token.

Following this, we need to direct the trigger towards the deposit event function. This function executes when there's self-transference of tokens to the vault.

```javascript
emit deposit(address(token), address(vault), address(attacker), vaultBalance);
```

Understandably, it sounds a bit nonsensical. Why are we sending it back to ourselves? However, the objective here is to transfer it to the attacker.

```javascript
tokenbridge.depositToL2(
  address(token),
  address(vault),
  address(attacker),
  vaultBalance
);
```

Now comes the shocker moment! We can ostensibly perform this operation indefinitely because we're continually sending back the tokens to the vault. Do we just stumble upon a way to mint infinite tokens on the L2 layer? Let's validate this.

...

Yikes! We indeed did. We've indeed discovered a loophole that allows users to mint tokens on the L2 layer, theoretically, without limitation, irrespective of whether they could withdraw these tokens or not.

The realization of this potential for creating an unlimited number of tokens flags a significant issue. It's undeniably a vulnerability of high severity. We won't get into a thorough write-up, but the proof of this code's failure is quite evident from this exploration, reminding us of the constant need to stay vigilant in the technology sector.
