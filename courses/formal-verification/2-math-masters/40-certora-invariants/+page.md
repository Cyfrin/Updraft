---
title: Certora Invariants - Harness - Rules and Types Recap
---

---

## Tackling the Challenge of Verifying Internal Functions

Formally verifying internal functions in smart contracts can be like trying to solve a Rubik's cube with your eyes closed — challenging, but not impossible. So, what's the secret sauce? Enter the _harness_. Think of it as a superhero's armor, but for your code. It's a wrapper contract that envelops the functionality you wish to examine with a watchful eye.

In our compact codebase, we've crafted a formal verification harness that showcases this concept. When we call `modup` as an external function, it seamlessly interacts with `mathmasters molwatup`, our internal function sitting comfortably within our specifications.

## Defining Variables and Laying Down the Rules

Our journey through the thickets of code verification has shown us the importance of setting clear definitions. We're talking about precision — defining variables that are the bedrock of our smart contracts. Rules matter. They're the guiding principles, setting the stage with preconditions, almost like laying down the law with a `require` statement.

Being sticklers for consistency, we ensure that our variables are homogenous, cut from the same cloth. Certora isn't shy about its types; it offers a smorgasbord equivalent to Solidity's, plus some uniquely Certoran flavors. Take a `uint256` and a `math int` — similar yet distinct, like cousins. A `uint256` operates within the bounds of, well, `uint256`, while a `math int` roams free, unshackled by size constraints. So it's crucial to master the art of type conversion, ensuring the integrity of our application.

## The Crucial Assertions and Invariants

Certora, just like Halmos or Foundry, isn't one to overlook assertions. They're the watchful guardians, asserting the correctness of our functions, providing the stamp of approval through formal verification.

And then we've got invariants. These are the truths, the axioms of our smart contract universe that remain unbroken through space and time. Except invariants are way simpler than astrophysics — they're one-liners that encapsulate the essence of the constant properties in our system.

![](https://cdn.videotap.com/618/screenshots/E0kiGhaNe7CGlVW8KDa2-118.37.png)

Sometimes invariants need a little tweak here and there. That's where the `preserve` clause comes in. It's like saying, "Hey, this invariant needs a bit of special treatment under these specific conditions," and then laying down those conditions.

## We Put Our Code to the Test

The true test of verification is seeing it in action. Curiosity peaked, we ventured back into the `mathmasters.sol` file, strategically commenting out a critical line of code to push the boundaries. We're looking for a eureka moment where our `molwatup` configuration stands firm, asserting the invariants and passing rules with flying colors, all under the scrutinizing gaze of Certora's prover.

Anticipation building, we fired up our prover, holding our breath as the proving engine churned. Moments turned to minutes, a brief interlude in our voyage through the sea of code. And there it was, a sight to behold — our `mowatup` invariant unscathed, our rule passing with aplomb, and the environment check, a cherry on top. The prover, in its infinite wisdom, found no errors. We emerged victorious with a robust `mowatup` specification and a tad wiser in the art of formal verification.

## In Conclusion

Our adventure with Certora and its verification tools has been nothing short of enlightening. We've woven through the complexities of formally verifying smart contracts, from harnessing invariants to crafting rules and ensuring type consistency. The power of Certora's verification is indisputable, instilling confidence in the reliability and logic of our decentralized applications.

We can't help but marvel at the precision and security that formal verification brings to the table. So whether you're a seasoned developer or a curious learner, lean into the challenge, and harness the power of Certora's verification tools. Happy coding and verifying, my friends!
