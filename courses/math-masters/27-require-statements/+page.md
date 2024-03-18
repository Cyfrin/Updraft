---
title: Require Statements
---

---

### Understanding the Power of `require` Statements in Smart Contract Verification with Certora

Hey there, tech aficionados, and blockchain enthusiasts! Have you ever found yourself fretting over the state of your contract's storage when running verification with Certora? Let's navigate through the crucial role of `require` statements and ensure that your contract behaves like a well-oiled decentralized machine.

When we're handling smart contracts, there's one golden rule we should never forget: storage is sacred. That's right, these spots of saved data should be as immutable as the blockchain itself. But what if I told you we can ensure Certora treats them as such? Buckle up, because that's exactly where `require` statements in Certora come into play.

#### Walkthrough: Taming Your Storage Variables

Let's break it down with an example to make things crystal clear. Let's pretend we've got a contract with several storage variables named with some quirky twists: `namber`, `numba`, `numbor`, `nambir`. Each one's set to a different value and is as crucial as the cogs in a clock.

Now, you might think "Oh boy, do I really have to spell out every single storage variable?" Well, in most cases, you can skip this laborious step. Storage variables don't usually hopscotch around with unexpected values. However, if you've got some "wild wanky calls" using external libraries that might meddle with your contract's storage states, specifying them is a necessary evil.

#### Concrete Preconditions: The Heart of Contract Verification

So, what's so special about these `require` preconditions? They are not suggestions. They are not guesses. They are assertive lines in the sand, daring the verifications to cross them. They are the foundation upon which the robustness of your smart contract is tested and proven.

Adopt these preconditions, and you'll be telling Certora: "Here's the starting point, not a step further." By freezing the storage state, you prevent havoc from breaking loose during the verification process.

#### The Takeaway: `require` Makes You the Puppet Master

You've heard it often: with great power comes great responsibility. This couldn't be more true when it comes to smart contracts. Your `require` preconditions aren't just about stability; they are a testament to your control over the contract. Every time you write one, you reinforce the untouchable status of your storage during verification.

"Require current contract variables to be set precisely as intended at the start of our verification processes." - a smart contract developer's mantra.

#### Learning Curve: Prove Storage Variables Don't Dance

At this point, you might wonder, "What if I'm newer to this, and what does it mean that storage variables shouldn't change?" Fear not, because understanding and proving the immutability of storage variables is a teachable moment. It's a knowledge journey we at Certora are eager to guide you on.

#### Past the Code: It's All About Assurance

Wrap your mind around the concept of `require` statements, and you give yourself more than just a proof-of-concept. You undertake a proof-of-confidence in your smart contract's functionality and reliability. It's about assurance beyond the immediate code—it's about instilling confidence in those who will engage with your contract on the blockchain playground.

#### Final Pointers: `require` Is Your Smart Contract's Guardian Angel

As you've seen, `require` statements in Certora can take the form of any precondition you want. Remember, they are essential if your contract has complex interactions with the outside world. Though it may occasionally feel like "rewriting all storage variables," realize it's an integral part of smart contract verification.

In summary, your use of `require` statements is the command you issue to Certora to take a snapshot of your contract's storage and to guard it fiercely. In doing so, you're not just a coder; you're a custodian of blockchain integrity, ensuring that your smart contracts remain pristine and predictable in an ever-evolving decentralized landscape.

So, go ahead, write those `require` statements with the finesse of a blockchain bard. Let them echo through your smart contract's halls as a testament to your meticulous governance. With these in place, you'll watch your contract withstand the test of times while helping move the needle towards greater trust and adoption in the decentralized sphere.

I hope this guide paints a clearer picture of how `require` preconditions can spell the difference between a contract that's thrown into disarray and one that stands tall amidst the decentralized chaos. Here's to smart contracts that not only work but last a blockchain lifetime!
