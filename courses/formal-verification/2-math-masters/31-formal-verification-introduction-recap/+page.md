---
title: Formal Verification Introduction Recap
---

---

## Exploring the Basics

At the heart of our exploration lies _Certora_ and _Hamos_ – two powerful tools designed to wield the capabilities of formal verification through symbolic execution. Before we dive into the deep end, we embarked on finding a fundamental approach to working with Certora (occasionally referred to interchangeably as Sartora) to understand the interaction of rules and invariants–two critical concepts with distinct identities.

However, our curiosity doesn't end here. What’s an invariant again, and how does it function within our formal verification ecosystem? These questions hover in our minds, but we're beginning to get the picture.

## Certora: A Closer Look

So, what’s Certora got up its sleeve? Imagine a language that speaks directly to formal verification—a _fully featured CVL_ (Certora Verification Language) that opens up a world of near limitless customization. From formulating intricate verification specifications to intricately nitpicking through every possible scenario, Certora stands robust, not making a single assumption about your code.

```code
// A snippet from Certora's CVL might look something like this:rule myRuleExample {// preconditions hereretrieveData();condition: // specify conditions...}
```

![](https://cdn.videotap.com/618/screenshots/eFU3VIqEt7YabjHpQ1Se-61.02.png)

The assumption is straightforward: you can send value, storage can mutate, and amidst all this, Certora is the steadfast auditor keen on validating the rules and invariants you bring to the table.

## Hamos and Foundry Fuzz Testing

And then we have Hamos – think of it as the Robin to your Batman; a sidekick for your foundry fuzz tests. Simply run Hamos and witness it work in tandem with your fuzz testing efforts, providing you insights that may have been elusive before.

However, not all is as smooth as silk. This duo has its kinks. As you strive for something more 'out of the box', something a tick more complex, you'll notice the shackles of restrictions tightening.

![](https://cdn.videotap.com/618/screenshots/HQraeDfYEazKROAblhFs-71.54.png)## The Sartora Edge

That's where Certora sharply pivots into view, flexing its capabilities, ready to take on challenges that Hamos might shy away from. It doesn’t condescend to make any assumptions but assumes that code is dynamic – values can be sent, storage can be altered.

Let’s talk rules. In our foray into the realm of Sartora, we learned to script a minimalist rule that trailblazed its way to discovering edge cases – all with simplicity at its core.

> "Hey, does 'hellfunk' ever revert?"

A question asked, a precondition added, a verification checked, and just like that, Certora laid bare the truth for us, pinpointing the elusive 99 – our edge case.

## Embarking on a Deeper Journey

While we've dipped our toes into the compelling waters of formal verification, the true voyage lies in the depths of Certora's documentation. A treasure trove of knowledge, ripe for the taking for those who desire to venture beyond the basics.

## Conclusion

Formal verification is not just a process; it’s a crucible in which the mettle of our code is tested. Tools like Certora and Hamos guide us through the complex labyrinth, providing clarity and assurance in a domain fraught with the unknown. Our brief encounter with Certora's minimalist rule-creation and Hamos's compatibility with fuzz testing is merely the prologue of an intricate saga. But it's a compelling start, a foundation upon which we can build complex verification structures that stand the test of time and corner cases alike.

As developers, we should now take a breather, letting the profound implications of formal verification settle in. For those stirred by the siren call of this rigorous yet rewarding discipline, the door to mastery flings wide open through the diligent study of Certora's documentation. So steel yourself, programmer – the path to formal verification mastery awaits your first step.

Remember, in the cosmos of code, nothing equates to the peace of mind that comes with mathematical certainty. Until next time, keep your syntax error-free and your invariants robust.
