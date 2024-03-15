---
title: Halmos - mulwadUp
---

---

## The Issue at Hand: A Recap

Our journey begins with a bit of fuzzing—a technique to test code by sending it a myriad of inputs and monitoring for bugs. Through this, we've unearthed an issue in the original Molwat up function. The real test now: Can formal verification, the process of mathematically proving the correctness of code, catch this too? It's an exciting frontier, and one that promises to give us both sleep-at-night peace of mind and, frankly, a dose of coding credibility. Let's dive into practice with the one and only Molwat up function!

## Setting Up With Halmos

If you've been following along with the GitHub repository associated with this course, you're likely familiar with the audit data branch and the test codes we've been tinkering with. For this exercise, though, our focus will be squarely on the Mathmasters `.sol` file. This is where the magic happens.

Starting off, we've got our `testMulwadFuzz` from the Foundry framework, but Halmos, our star player for formal verification, requires a slight alteration. Unlike Foundry, which uses `assertEqual`, Halmos plays by its own rules and only recognizes the `assert` statement.

To keep Halmos content, we'll whip up a new function, `checkTestMulwadFuzz`, and get rid of those pesky comments. We'll swap out the `assertEqual` for a good old `assert`, add our equality operator, and give the function a purity facelift by tagging it as `pure`.

## Harnessing the Power of Halmos

With our function set up properly, Halmos can work its magic. It translates our code into the SMT (Satisfiability Modulo Theories) language, feeding it to the Z3 SMT solver that gets to the bottom of our formal verification challenge.

Running the command `halmos function checkTestMulwadFuzz`, we eagerly await the verdict. But wait—what's this? A timeout? Our test didn't have enough time to solve the problem, and we've stumbled upon one of formal verification's notorious stumbling blocks: the path explosion problem. When code complexity generates an overwhelming number of paths to evaluate, even our sophisticated verification tools can be overwhelmed.

Yet, we're not left completely in the dark. This timeout tells us something vital; we might just need to let Halmos chew on the problem for a bit longer.

## Pushing the Limits: No Timeout

Thankfully, diving into Halmos' command line options reveals a way forward. We adjust our previous command with a new parameter to remove the timeout, sending Halmos off to search for a solution indefinitely.

```bash
halmos --solver-timeout-assertion=0 function checkTestMulwadFuzz
```

As we initiate this command, brace yourself; it's going to take more than just a moment. Now's your chance to grab a coffee, indulge in your favorite tunes, or even hit the gym. Let the power of formal verification work in the background—your role as a vigilant coder never ceases, even while you're taking a well-deserved break.

## An Output Emerges: Interpreting Halmos’ Findings

Finally, after what might seem like an eternity, Halmos returns with its findings, presenting us with counterexamples to consider. These are specific scenarios where our assertion doesn't hold, critical insights that put our coding intuitions to the test.

By plugging these counterexamples back into our test environment, just as we would with fuzzing outputs, we get to see if Halmos' formal verification successfully pinpointed a genuine issue. And voilà—a discrepancy is revealed! Halmos has indeed identified an inequality, helping us to isolate and understand the imperfection lurking in our code.

## Appreciating Formal Verification and Fuzzing

This experience brings us a profound appreciation for the roles of both fuzzing and formal verification in smart contract auditing. While fuzzing can provide us with probable assurances, formal verification offers a binary clarity: the code either passes the rigorous mathematical scrutiny, or it doesn't. Yet, patience is vital; these tools require time and potentially immense computational effort to explore every twist and turn of our code's logic.

We should always keep in mind that while formal verification provides us with definitive results, those results are only as good as the conditions and properties that we verify against. It's crucial to give thought to the correctness criteria when defining the assertions in our tests to be more inclusive and robust.

## Concluding Thoughts

Thanks to formal verification tools like Halmos, we've added another layer of confidence to our smart contract development process. In today's deep dive, we've navigated a complex scenario loaded with challenges, from diving into the depths of an issue found with fuzzing to tweaking our tests to play nice with verification tools.

Let's not forget the human element in all this; the art of taking breaks, finding patience, and keeping curiosity piqued as we wait for our tools to deliver the much-anticipated results. It's a vivid reminder of the magnificent dance between human creativity and the raw computational power at our disposal.

To all our fellow code warriors out there, may your tests be robust and your verification conclusive. Happy coding!
