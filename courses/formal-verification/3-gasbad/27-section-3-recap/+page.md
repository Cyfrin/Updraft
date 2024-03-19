---
title: section 3 recap
---

### Understanding Summaries and Their Role in Verification

Summaries – these aren't your typical end-of-chapter notes. In our context, we learned that summaries like the 'dispatcher summary' and 'always, always one' could effectively substitute a function with desired behavior within our verification specs.

Take for example the `safeTransferFrom` function. It's a staple in contracts adhering to the ERC-721 standard, but through summaries, we could channel all related calls to our tailored `NFTMock safeTransferFrom`. It was our way of saying, "In our world, this is how `safeTransferFrom` behaves – no exceptions."

### Ghost Variables and "Havoc-ing": The Art of Managing Change

Who could forget the bewitching concept of ghost variables? Invisible at first, but once we cast the initial state with an axiom – akin to a requisite spell of `require` statements – they manifest to join the dance of our contract logic. But, what's magic without a little chaos?

Enter the stage of "havoc-ing." If you're envisioning a villain in our verification plot, this would be it. When Certora, our verification ally, identifies an opportunity to wreak havoc, it will! By manipulating ghost variables to potentially snap our invariants, it tested our mettle in safeguarding these intangible actors.

### The All-Seeing Certora Hooks and Minimalistic Invariant Mastery

We then delved into the realm of Certora hooks – think of them as the vigilant guards monitoring every storage alteration or opcode execution. We witnessed firsthand how crafting actions triggered by `sStore` or `log4` could bolster our invariants.

And who could ignore our minimalist masterpiece? An invariant that simply tallied listing updates, storage alterations, and log emissions to declare, with an air of sternness, "For each storage change, a log shall exist!"

### Equivalence Testing: A Symphony of Fidelity in Smart Contracts

As we orchestrated the grand finale of our journey – the parametric function finesse – we set a benchmark. Two methods, `f` and `f2`, with the same function selector, became the cornerstone to prove an ambitious proposition. Starting from the same state, 'gas bad' and 'NFT marketplace' should mirror each other's state post-function execution, no matter what. This, my friends, is the blueprint for future gas optimization – a testament to the power of formal verification.

### Envisioning the Future of High-Performance Smart Contracts

Perhaps, the most exhilarating tangent we explored was the future of smart contract development. Imagine crafting your contract in the readable realms of Solidity, then morphing it into the bytecode ballet of Huff or Assembly. You then perform equivalence testing, a formal verification ritual, to confirm that both versions, however different in syntax, sing the same tune of logic.

Yes, it takes more time. But the result? You obtain the holy grail – smart contracts that zip and zoom with unmatched efficiency. It's an endeavor worth considering, and, dare I say, one that will elevate your game in the burgeoning ecosystem of smart contracts.

### A Hat Tip and Your March Forward

As our section comes to a close, I won't simply bid you farewell. Rather, I implore you – let your GitHub showcase your prowess in smart contracts and formal verification. It's your digital portfolio that whispers tales of capacity to prospective collaborators.

Now, what's next? Well, Codehox is your playground. Engage in contests, hone your skills, and maybe even fill your coffers a bit. Look around – a new age of security beckons, and it yearns for brilliant minds like yours to usher it in.

Don't be a stranger – let's connect on Twitter, Farcaster, or wherever you call your digital home. Tag me (@cypherupdraft) and share your thoughts, your projects, or simply say hello. Your journey might seem solitary, but together, as we forge towards a fortified Web3, you're never alone.

And while the links on GitHub may entice you with paths to further enlightenment, take a moment to breathe. Go on, grab that coffee, ice cream, or hit the gym. You've just armored yourself with knowledge – put it to good use in your conquest of Web3 excellence.

Until our paths cross again in the digital cosmos – great job. Keep it froggy out there.

Signing off,  
Patrick Collins
