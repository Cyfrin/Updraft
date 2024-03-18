---
title: Formal Verification Soundness
---

---

### Understanding Soundness in Formal Verification

So, what do we mean by soundness? It's pretty straightforward: soundness refers to the Certora prover's ability to catch every single rule violation in your code. It's like having a vigilant guard that never misses an intruder. When your verification is sound, you can sleep easy knowing that your code is clear of any violations that the prover is tasked to find.

On the flip side, we have what's known as 'unsound approximations'. These are the sneakier aspects of verification—they can let bugs slip through the cracks. It's not that these unsound methods are always unreliable, but they're like that guard who sometimes gets distracted; real bugs might just waltz past them unnoticed.

### The Role of Harnesses in Verification

Let's talk about harnesses in this context. Harnessing, especially in particular forms such as loop unrolling, might lead to unsoundness. When we take a piece of our code—a library—and wrap it inside an external contract (also known as harness), something peculiar happens. The prover can no longer be completely sure this new outer layer doesn't change the outcome of the original library functions. Imagine you have a perfectly built puzzle, and then you put it inside a box that might also tinker with the pieces. The prover sees this and raises a red flag because it's not sure the puzzle remains the same.

Why is this important? Because in Solidity, bizarre things can happen when you wrap a library function within an external function. Our guard (the prover) can't make solid claims about what comes out of this wrapped function—is it still the same, or has some 'crazy weird stuff' occurred?

### The Soundness of Direct Verification

If we perform formal verification straight on an external function, we're golden—it's sound. The prover can see everything clearly, like a mirror reflecting truth back at us. But the moment we bring in our harness, we're in unsound territory. Fear not, though; it's not the end of the world. Your code is still formally verified. It's just that it's done within the context of the harness, within this wrapper contract that we've constructed.

### Making Verifications Work

Now, for the practical stuff. You can't verify internal functions straight off the bat—they're shrouded in obscurity, internal to the contract's walls. To shine a light on them, we turn them into external functions. Once we've done this, we adjust our sails—or in this case, our configuration file. Instead of pointing to `Mathmasters.sol`, we direct it to our newly created `compact_codebase.sol`, ensuring that we're verifying in the right context.

Our previous prover, set to look at `Mathmasters`, now turns its attention to `compact_codebase`, which hypothetically should yield precisely the same outcomes as `Mathmasters`. It's like having cloned your puzzle and put it into a different box, expecting the pieces to match perfectly—hypothetically.

### Final Thoughts

While this might sound like a lot of technical jargon, it's a necessity for Solidity developers looking to achieve the highest level of code correctness.

Remember, whether you're just starting or you're a seasoned blockchain developer, understanding the difference between sound and unsound formal verifications—and how to use harnesses correctly—can drastically affect the reliability and security of your contracts. Harnessing may introduce a degree of unsoundness, but when used cautiously and with understanding, it remains a powerful tool in your verification arsenal.

> "In the dance between code and verification, soundness leads the way, but even in its absence, the rhythm of reliability continues through careful practice and understanding."

By comprehending how the prover interacts with the wrapped and unwrapped versions of functions, and by choosing to directly verify external functions, developers can maintain a high standard of verification. It's a complex process, yes, but the security and correctness it ensures for smart contracts are well worth the effort.

So the next time you sit down to verify your contract, think about these nuances. Embrace the complexity, because at the end of the day, it's about building something that's not just good, but irrefutably sound.
