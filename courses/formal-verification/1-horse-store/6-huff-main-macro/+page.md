---
title: Huff MAIN macro
---

_Follow along with this video:_

---

In a way, sending our `calldata` to the blockchain is like executing a Python or JavaScript script. We need to begin with an `entry point` in order for our `calldata` to be processed.

In Huff, this entry point is called `MAIN`. Essentially, `MAIN` in the binary becomes the recipient of your calldata and orchestrates its execution. We'll go into this in more detail later.

Now, if you feel a bit overwhelmed by the barrage of terminology, hang in there with me. I promise it'll all start making a lot more sense as we delve deeper.

Let's look at how function dispatching is coded in Huff. While Huff _does_ have functions, we'll largely be ignoring them in favour of `macros` which function similarly with a few nuances we'll detail later.

Our `MAIN` macro in Huff is going to look like this:

```
#define macro MAIN() = takes(0) returns(0) {}
```

Above, we see how a macro is defined in Huff. The skeleton of our `MAIN` macro is outlined with the `takes` and `returns` syntax specifying the stack operations it will perform—but let's not get ahead of ourselves.

To validate our setup, we can compile our Huff code. By running `huffc` on our source file:

```bash
huffc src/horsestore/v1/horsestore.huff
```

If all goes well, you should see `Compiling...` with no output. This is good news!

Curious to see the bytecode? Run the command with a `-b` flag:

```bash
huffc -b src/horsestore/v1/horsestore.huff
```

You should receive an output that looks like this:

```bash
60008060093d393df3
```

This bytecode is comprised of `Op Codes` which, as we mentioned previously, are the instructions we are telling the EVM to execute.
