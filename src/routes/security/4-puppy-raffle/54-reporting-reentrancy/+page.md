---
title: Reporting - Reentrancy
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889507747?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding Reentrancy Attacks: An Insightful Audit of the Puppy Raffle Refund

Hello everyone! Today, we'll be delving into understanding and documenting a reentrancy attack using the Puppy Raffle refund function. More and more, this kind of vulnerability rears its head in the world of smart contracts. It might sound like a complex piece of machinery, but strap in, grab a coffee, and we'll break it down for you.

## The Impact Assessment

Hold your hats folks, this one's a whopper! I ran a test and discovered I could call the `refund()` function repeatedly, effectively siphoning money out of the contract the whole time! The impacts are significant. By exploiting this vulnerability, I could effectively drain the entire contract of funds. In terms of assessment, this is a high on both the Impact and Likelihood scales.

Let's unravel this!

## Exploring the Vulnerability: Puppy Raffle Refund

![](https://cdn.videotap.com/o0EiNXj1ffsPqR9o05L4-50.52.png)

Here's our culprit, the Puppy Raffle `refund()` function. In its bare form, it does not follow the prescribed pattern of **Checks-Effects-Interactions** that defends against reentrancy. As a result, it enables participants to drain the contract balance.

Very interesting! Allow me to point out the core issue. The Puppy Raffle `refund()` function first makes an external call to the sender’s address (`msg.sender`). Following that, it updates the Puppy Raffle `Players` array. The flaw lies in this sequence of operations, leading to our famous reentrancy vulnerability.

## Play by Play: Exploiting the Vulnerability

As a malicious participant, you could sneakily have a fallback receive function that calls the Puppy Raffle `refund()` function again, claiming multiple refunds. This process repeats until the contract balance runs dry.

Here's a quick rundown of the potential exploit sequence:

1. You, as the malicious participant, enter the raffle.
2. You set up a contract with a fallback function that calls `puppyRaffle.refund()`.
3. You call `puppyRaffle.refund()` from your shady contract, draining the contract balance.

## Proof of the Concept: Testing the Vulnerability

Now that we understand the mechanics, let's do a dry run. Here's the detailed methodology for our test case. Mind you, for the sake of a rigorous demonstration, I'll go ahead and showcase the full test suite.

```markdown
SUMMARY=====

1. A user enters the raffle (Credits to ChatGPT for the idea).
2. Attacker sets up a contract with a fallback function that calls `puppyRaffle.refund()`.
3. Attacker enters the raffle.4. Attacker calls `puppyRaffle.refund()` from their attack contract, draining the contract balance.
   CODE=====
```

## Mitigating the Attack

![](https://cdn.videotap.com/xXoG7dcQXxHHyvPl96re-370.48.png)

To seal this vulnerability, the `puppyRaffle.refund()` function should update the `Players` array _before_ making the external call. It's also advisable that we move up the event emission due to an associated audit loophole.

Here's a quick diff to illustrate the required changes:

```diff
    function refund(uint256 playerIndex) public {
        address playerAddress = players[playerIndex];
        require(playerAddress == msg.sender, "PuppyRaffle: "Only the Player can refund.");
        require(playerAddress != address(0), "PuppyRaffle: "Player already refunded or is not active.");
+       players[playerIndex] = address(0);
+       emit RaffleRefunded(playerAddress);
        payable(msg.sender).sendValue(entranceFee);
-       players[playerIndex] = address(0);
-       emit RaffleRefunded(playerAddress);
    }
```

Voila! We have successfully written up an audit for this reentrancy attack.

The world of smart contracts is an exciting jungle, and maintaining awareness of potential vulnerabilities is crucial. By understanding the nitty-gritty of attacks such as reentrancy, we can better prepare and safeguard our virtual currency. Stay tuned for more deep dives like this one!
