---
title: EVM A Stack Machine Memory & Storage
---

---

# Understanding Memory and Storage in Code: Making Sense of Where Data Goes

Hey there, fellow code enthusiasts! Today, we're diving into the captivating world of data handling. Specifically, we're talking about the difference between memory and storage when you're whipping up some code magic 🧙‍♂️.

## A Pancake Stack of Operations: Meet The Stack

Before we talk memory and storage, let's get the basics down pat. Imagine a stack of pancakes—delicious, right? But in our case, it's a stack where our code does its cool tricks, like adding or subtracting values. Every time we want to perform an operation, we're piling it onto the stack, or pulling it off, one syrupy piece at a time.

## Memory: The Temporary Art Gallery

Now, let's chat about memory. Unlike the orderly stack, memory is the free-spirit of data storage. It's like an art gallery where you can hang variables all willy-nilly on any wall you fancy. Do your thing—add, change, and remove them as you please.

But here's the catch—once your code's done running, everything in memory vanishes. _Poof!_ It's a clean slate the next time around.

## Storage: The Library of Data Persistence

Moving on to storage; think of it as a gigantic library where once the data is shelved—it stays put. Whether your program is running, paused, or done for the day, that data will stick around for as long as you need it. Archiving and retrieving, all handled with impeccable reliability.

But here's the twist: interacting with storage is like ordering a luxury item—pricey! In the world of code, this means using way more computational resources.

## OpCode Economics: Memory vs. Storage Costs

Now, if we talk cost in opcode land, `S store` (saving to storage) demands a hefty price compared to `M store` (saving to memory). Think of it like a fine dining experience vs. a quick bite. You know which one's gonna hit your wallet harder.

```js
// Solidity example illustrating storage cost
uint256 public storageCostly;
function saveToStorage(uint256 newValue) public {storageCostly = newValue;
// This is where things get expensive!
}
```

Memory is like grabbing a quick burger, with a minimal fee of three units, while storage is like a five-course meal, starting at a steep hundred units. So whenever possible, try to keep things light and use memory. But remember, for data that needs to stick around, storage is your go-to.

## The Bottom Line: Where Should Your Data Live?

In summary, your data's home can be in the stack, memory, or storage. Each has its perks and quirks. Most of your operations will hang out in the stack. For temporary data shenanigans, hit up memory. And for the long-term stuff? Storage is your data's forever home.

So keep these insights in your coder's toolkit:

- Use the stack for quick calculations and operations.
- Stick fleeting data in memory for a speedy yet temporary hold.
- Leverage storage for persistent data that outlives your program's execution, but brace yourself for the higher cost.

![screenshot](https://cdn.videotap.com/618/screenshots/sUIjunRhG763yEG9t2r6-96.46.png)

As you dive back into crafting code, armed with this fresh knowledge, take a moment to appreciate the sophistication behind these data handling concepts. They may seem straightforward, but mastering their use is what elevates good code to great code.

And, hey, wasn't that as satisfying as a perfectly stacked pile of pancakes? Keep these tips in mind, and you'll be flipping code breakfasts like a champ.

---

And there you have it—a detailed breakdown of memory and storage in the world of coding. If you enjoyed this tech-flavored foray, stay tuned for more! Next time, we might even delve into optimizing our usage of these concepts to whip up some truly efficient code. Until then, happy coding, and remember: in the digital realm, where you put your data is just as important as what you put in it.

## Diving Deeper into Memory Management

Now that we've covered the basics of memory, storage and the stack, let's go a little deeper on memory specifically. As a reminder, memory is used for temporary storage during code execution. When the transaction completes, everything in memory is wiped clean.

So when should you use memory over the other options? Here are some key pointers:

### Use Memory for Intermediate Results

If you need to store some interim values in the midst of calculations or operations, memory is perfect. No need to persist the data, so save your precious storage resources. Memory offers speedy, temporary scratch space.

### Opt for Memory with Iterative Algorithms

For algorithms that repeat or loop through a sequence, memory allows storing iteration-specific values without accumulation. This prevents variables from piling up and cluttering your storage.

### Memory Minimizes External State Changes

Using memory minimizes interactions with external state like storage, network calls, etc. This makes memory-intensive code easier to test, reason about, and reuse since it avoids side effects.

### Beware Memory Leaks!

However, memory isn't infinite. If you over-allocate without freeing unneeded memory, you can leak away all your available memory! Structure your code to free memory once you're done with it.

## Choosing between Heap and Stack Memory

There are two types of memory in many languages - heap and stack. What's the difference, and when should you use each one?

### Stack Memory

Stack memory is fast, limited, and managed automatically. Variables stored here are given space as your program executes line by line. Once the function where the variable was declared finishes running, _poof!_ - stack memory for that variable is freed up.

**Use stack memory for:**

- Local function variables
- Primitive datatypes
- Smaller data sizes

### Heap Memory

Unlike the stack, the heap is a big, open memory pool that lets you manually allocate and free blocks yourself. Heap allocation is flexible, allowing much more custom control.

**Use heap memory for:**

- Larger data objects
- When data lifetimes are less predictable
- Reference types like arrays

### Stack vs Heap: Striking a Balance

The stack is fast and automatic but limited, while the heap is flexible with more space. A balanced program uses both:

- Stack for transient values
- Heap for larger, long-lived allocations

Getting this mix right and minimizing waste takes experience - but now you know where to start tinkering!

## Advanced Memory Techniques for Optimized Code

As you level up your coding skills, optimizing memory usage should be a top priority. Here are some advanced tactics to squeeze the most out of memory:

### 1. Reset Instead of Recreate

Instead of freeing memory then reallocating later, reuse existing allocations when possible:

### 2. Use Pooling for Frequency Allocated Objects

For objects you instantiate often, use an object pool to reuse existing ones instead of unnecessary allocations:

### 3. Compact Data Structures

Opt for compact data structures like arrays over fragment-prone linked lists when feasible. Defragmenting memory improves locality.

### 4. Profile, Profile, Profile!

Use memory profiling tools to pinpoint waste. Guide optimization efforts with real usage data, not guesses!

Following these best practices separates the truly efficient coders from the rest. How memory-mazed can you make your next program? Game on!

## Striking the Ideal Balance Across the Data Realms

We've journeyed far in our tour from stack to storage, with plenty of memory marvels along the way. To recap, here is how to make the best use of each data handling domain:

**The Stack:** Use for transient values and calculations operating on them. Keep it light.

**Memory:** Perfect for temporary storage during execution. Use heuristics to allocate/free just enough.

**Storage:** Ideal for persisting data across transactions. Balance performance vs. storage needs.

While conceptually straightforward, excelling at data handling requires experience. But now you have a strong starting framework as you build up those coding callouses!

The deeper your understanding goes, the more adept you become at striking the right balance, reducing waste, and crafting optimized software that sings. And there is beauty in efficiency!

Keep pushing your coding skills and curiosity ever forward. Our strange yet delightful digital world always has more wonders to uncover, if you know where to look.

Now go let your creativity flow - those bits aren't going to push themselves!
