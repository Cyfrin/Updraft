---
title: Certora - mulWadup
---

---

### Mastering Certora for Solidity Verification Like a Pro

Hey there, fellow blockchain explorers and smart contract enthusiasts! If you've been around the block with Halmos and are ready to delve deeper into the world of formal verification, you're in the right place. Today, we're going to take the same principles we've honed in Halmos and apply them to Certora, unlocking even more powerful tools to reinforce the reliability of our smart contracts. The journey to bug-proof code continues, and I'm thrilled to guide you through it.

#### Setting Up Your Certora Environment

In the repository tied to this enlightening course, you might stumble upon a Certora folder snuggly tucked into the `tests` directory. However, it's common to see crafty developers set up a separate folder right in the root, aptly naming it `Certora`, to house their verification-related files. To keep up with this practice, let's mimic the setup we used for the SC (Smart Contract) exploits, but give it a Certora twist.

First things first – we need a comp file and a spec file. Imagine these as the yin and yang of our formal verification setup: one handles the configuration (`*.comp`), and the other is where the magic happens – our verification logic (`*.spec`). Lucky for us, once we find that golden configuration file, we can reuse and tweak it to fit our needs. Goodbye, mental overhead of configurations!

So, let's grab the configuration from the SC exploits repository and gently transplant it into our Certora folder. Remember to flip the toggle on word wrap – we want a smooth coding journey without any visual hiccups.

#### Crafting Our Certora Verification Files

Let's focus on getting our new `.comp` file in shape. Our trusty Halmos exploits provided a stellar template, but we need to tailor it to point at the right contracts. For our exercise, we'll link up to `SrcMathmasters.sol` and conjure up the same verification mystique.

Now for the pièce de résistance: the `*.spec` file. Here's where we roll up our sleeves and translate our Foundry victories to the Certora domain. It’s like natspec, but unlike our regular functions, we'll be declaring rules. Don't worry about `public` or `pure` here – Certora plays by its own rules, literally.

#### Certora's Method to the Madness

Since we're bringing over our `mood up` function to the party, let's not forget to introduce it properly in Certora's lingo. That's right, we'll add a `methods` block, but here's a twist – our function feels at home as an internal library function, not prancing around in the public eye. But, fret not! Certora's got us… but not quite as we'll soon discover. More on that soon.

#### The Internal Function Dilemma

Here's a plot twist in our Certora tale. Internal functions cozy as they are, can't strut their stuff under Certora's bright formal verification lights. They need an entourage, a harness contract, which is essentially a wrapper that lets Certora embrace them.

Creating this harness (`CompactCodebase.sol`, or perhaps `Harness.sol` if you're feeling more descriptive) is like designing a VIP backstage pass for our `mood up` function. The harness gets its own contract status and, after importing Mathmasters, simply presents an external version of `mood up` for Certora's enjoyment.

After a quick build to ensure everything is shipshape, you can sigh in relief as the compiler grants us a green light. Now, instead of working directly with Mathmasters, we'll route our formal verification through `CompactCodebase`, our trusty harness.

#### Why the Trouble with Harnesses?

You might be wondering why we jump through hoops with this harness business. It boils down to accessibility – Certora needs a way to interact with the innards of our code, and this wrapper approach is a clean, elegant solution.

In essence, the harness acts as a mediator that Certora can work with, all while preserving the integrity of our original library or internal functions. It's the formal verification equivalent of having a translator at a high-stakes diplomatic meeting – lost in translation isn't an option when we're aiming for code perfection.

#### Conclusion: Certora Verification Unlocked

Embracing Certora in our formal verification toolkit is more than just following a set of technical steps. It's like adopting a new mindset, one that focuses on robustness and precision. By understanding the why behind the workflow, we're not just blindly following a process – we're engaged in a dialogue with our code, ensuring it's the best it can be.

As to whether you'll encounter your own unique challenges along the way – well, that's a definite yes. Every smart contract, every piece of logic has its own quirks. But with the Certora foundation we've built today, you're more than ready to tackle them head-on.

Before you set off on your own Certora journey, remember that the path to mastery is never just about the destination. It's about enjoying every intriguing, insightful step along the way towards impeccably verified code.

As you carve your path through the intricate ecosystem of smart contract development, may the lessons from today's deep dive into Certora become a beacon, illuminating the way toward secure, trustless code. The realm of formal verification is vast and ever-evolving – stay curious, stay sharp, and most importantly, keep coding.
