---
title: PUSH1 and ADD Opcode Example
---

---

# Understanding Opcodes: Diving into Stack Operations in Programming

Opcodes—short for operation codes—are the cornerstone of programming, especially when it comes to the manipulation of stack memory and storage. In this blog post, we'll unravel how these vital components function, illustrate their role in computation, and demystify the processes they govern within your code.

## The Vital Role of the Stack

At the very heart of opcode mechanics lies the stack—an area of memory reserved for executing instructions and managing data flow. Think of it as a literal stack of items where you can only add (push) or remove (pull) items from the top. It's this last-in, first-out (LIFO) method that allows us to maintain order in the execution process: the last item pushed onto the stack is the first item we can access.

Most opcode instructions involve two essential activities: pushing data onto the stack and then executing an operation on this data. For instance, take the `ADD` opcode, which does precisely what it hints at—it adds numbers together. But how does it achieve this feat?

### The Push and Add Opcodes

Here's a scenario that's as common in the assembly language as a `print()` function in Python:

1. We have two values, denoted as `a` and `b`.
2. `a` sits comfortably at the top of our stack, while `b` is right beneath it.
3. We execute the `ADD` opcode.

What `ADD` does is beautiful in its simplicity—it takes `a`, adds it to `b`, and returns the result to the top of the stack. So if you push the hexadecimal values `0x1` and `0x3` onto the stack, and then call `ADD`, it crunches those numbers to push `0x4` as the new top-value of the stack.

```
PUSH 0x1 (Stack now has 1)PUSH 0x3 (Stack now has 1, 3)ADD      (Stack now has 4)
```

Before we can add them together, we need to get these values onto the stack using the `PUSH` opcode. There's a selection of `PUSH` opcodes available to us, each allowing for a different size of data to be placed onto the stack. The `PUSH1` opcode, for example, pushes a single byte onto the stack.

To further illustrate the process:

```markdown
- Call `PUSH1 0x1`. Now `1` sits atop our stack.- Call `PUSH1 0x3`. Our stack now has a `3` on top, and `1` just below it.- Execute `ADD`. Our stack now shows `4`, the sum of `3` and `1`.
```

Bear in mind we're always dealing with hexadecimal data—`0x` preceding our numbers is a constant reminder of this.

![Stack diagram](https://cdn.videotap.com/618/screenshots/plLHpyaWjeDR0FtTmn3K-57.68.png)

### Stacking Up with Push

To dive a bit deeper, let's examine the mechanics behind the `PUSH` opcode. Using `PUSH0` will always result in a `0` being placed at the current top of the stack—handy when zeroing out is necessary.

But say we execute `PUSH1 0x1`, and then `PUSH1 0x3`. We've now lined our stack with two values, primed and ready for manipulation.

> "The beauty of opcodes lies in their ability to perform complex tasks through simple, stack-based operations."

By pushing values onto the stack, we're essentially loading up our computational 'gun' with the 'bullets'—or data—that we'll soon fire through the barrel of our opcode instructions.

![Stack diagram](https://cdn.videotap.com/618/screenshots/ULPWQN6OHzUvj8hLYZf2-166.25.png)

## A Peek at Memory Operations

Aside from toying with our stack values, certain opcodes take it a step further. They reach into the stack, pull out values, and store them in memory, or even storage. Ever heard of the `MSTORE` or `SSTORE` opcodes? These guys are prime examples of stack interaction that ends up affecting the memory and storage of your system.

Stay tuned as we delve deeper into these commands and explore the intricacies of opcode operations in subsequent posts. Understanding these foundations is crucial for anyone looking to get a firm grasp on the nuts and bolts of low-level programming and smart contract development.

By the end of your journey with opcodes, you'll not just comprehend how to use them but also appreciate their elegance and efficiency. So, whether you're a seasoned developer or someone just starting out, grasping the fundamentals of opcodes and their relationship with the stack can truly elevate your coding game.

Remember, practice makes perfect. Get comfortable with these basics, experiment with `PUSH` and `ADD`, and before you know it, you'll be stacking up your programming skills to new heights!
