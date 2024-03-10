---
title: SSTOREing our value
---

---

# Unlocking the Mysteries of Call Data Loading: A Casual Dive into Smart Contract Execution

Join me on a journey through the fascinating, albeit slightly complex, world of smart contract execution. We'll be unpacking the transcript from a recent video titled `p1l53.mov`, where I took the liberty of dissecting a chunk of code to better understand the mechanics of function dispatching and the elusive concept of call data loading.

As we delve into the inner workings, expect a blend of detailed explanation peppered with my own candid revelations of trial and error. So, let's kick things off and decode this snippet of Ethereum contract execution together.

## Getting Started: Stacking the Deck

The first thing we need to do is establish our working base:

Here, we begin with the familiar task of transferring some piece of code from one spot to another. Nothing too out of the ordinary - a simple copy-and-paste routine to get us going. Though it seems mundane, it's a crucial step as it sets the stage for the operations to come.

## Tackling the `pop` and `call data load`

As we continue, we stumble upon a `pop`. Now, for those not knee-deep in smart contract interaction, a `pop` is a stack operation that essentially discards the top element. In our case, it's a farewell to the `zero` lingering on the stack from earlier commands.

We then encounter the `call data load` operation once more (`call_data_load(i)` generates `data[i]`, _in case you need a refresher_). The call data is like the messenger of our operation, carrying the contract invocation payload.

![Example assembly code demonstrating call data load](https://cdn.videotap.com/618/screenshots/AzzLBjRXeDsWhKAZULNt-145.9.png)

### A Minor Snag: The Forgotten `0x04`

While filming, I hit a little hiccup; I overlooked to drop the `0x04` from our analysis. But once I spotted my blunder, it was a quick fix. The subtleness of these details showcases the intricate nature of contract interactions - it's all about precision.

Here's the kicker: with an offset of four, we're sidestepping the function selector entirely, focusing solely on the real meat of the data that's been sent through. Imagine the data as a sequence like `0x10203040506070809` (function selector included), and what we're after starts right after `0x4`, scooping up 32 bytes that hold the essence of our call data.

This meticulous selection process ushers in the `number to update` into our stack, marking a significant milestone in our journey.

## The Art of Swapping

Next on our itinerary is `swap two`. Picture this:

```solidity
swap2 a, b, c -> c, b, a
```

Simply put, we're executing a swift dance of values 'a' and 'c', leaving 'b' as the proverbial wallflower — untouched. Our goal? To reorder the stack so we can access the elements in the order necessary for the next steps.

---

**Confession Time**: Navigating through these operations, I have to admit I've had moments of confusion, accidentally introducing my own bugs into the process. But hey, that's part of the fun - and the learning curve - in dealing with smart contracts!

## Jumping Through Hoops: The Jump Destinations

After we take care of business with the `pop` and the stack reordering, we're met with a series of `jumps`. These aren't just arbitrary leaps of faith; they are thoughtfully orchestrated moves to navigate to various parts of the code.

We hop over to `jumpDest4`, right beneath `jumpDest1`, and here's where the magic happens:

![Sequence of jump destination operations](https://cdn.videotap.com/618/screenshots/77ZEarlMPfUUN1yXr7yl-245.1.png)

At this pivotal point, we're ready to perform an `S store`, which essentially preserves our number to update in the storage—our contract's long-term memory.

```solidity
sstore(key, value)
```

Here, we're pushing the call data (our newly acquired number) into storage slot zero.

But don't just take my word for it!

> "At storage slot zero, we're going to store the number that we want to update. This is exactly what we want."

The simplicity of this operation belies its significance. This is the culmination of our efforts so far - the point where our input is finally cemented into the blockchain.

And with that, our stack is left in a decidedly sparser state, a testament to the journey our data has taken through the labyrinth of operations.

## The Closing Act: Cleaning Up

Before we conclude our session, we address a tiny mess of `0x3F` values mistakenly left behind - another testament to the meticulous nature of coding and the human element that can sometimes complicate it.

When the dust settles, we arrive at `jumpDest5`, our final destination, which leaves us with a straightforward execution stop - and the satisfaction of a job well done.

## Parting Thoughts

As we wrap up this excursion through smart contract code, remember:

> "Solidity's clever use of the stack for setting up program counters shows just how ingeniously these contracts are executed."

Pause and appreciate the choreographed beauty behind smart contract code that might seem inscrutable at first glance. In stripping it down to its bones, we get a chance to marvel at the efficacy and nuance embedded within.

---

Diving deep into call data loading and stack manipulation in the Ethereum virtual machine is no small feat. As an observer - and sometimes participant - in the act of unwinding these digital threads, one develops a profound appreciation for the mechanisms that keep blockchain technology ticking.

To extend this blog post to the requested 2,000 word count, I will include additional relevant details from the original video transcript, as well as further explanations and examples to provide more context and clarity around the key concepts covered.

### Digging Deeper into Stack Operations

As we go through the code step-by-step, we encounter various stack manipulation operations like `swap` and `pop` that may seem esoteric at first glance. Let's break down what exactly these operations are doing under the hood:

The stack is essentially a last in, first out (LIFO) data structure that stores temporary values as smart contract code executes. Values are "pushed" onto the stack and "popped" off throughout execution.

When we hit the `pop` operation, the top value (in our case a `zero`) gets discarded from the stack. The key thing to understand is that values pushed onto the stack stick around only temporarily - operations like `pop` explicitly purge elements that are no longer needed.

The `swap` operation is also worth spotlighting. As the name suggests, this switches the position of two stack elements, reordering the stack as required for subsequent operations.

Here's a concrete example to hammer the concept home:

As we manipulate the stack, it allows us to line up inputs for upcoming opcodes in the required sequence. Mastering these stack gymnastics is crucial for writing efficient smart contract assembly code.

### Appreciating the Intricacies of Byte Offsets

When we retrieve call data by invoking `call_data_load`, it's easy to gloss over the significance of the byte offset parameter. As we discovered the hard way, precision with offsets is imperative!

Let's recap exactly what the 4 byte offset achieved in our case:

- It skipped the first 4 bytes from the start of the call data payload
- These 4 bytes contain the function selector
- By jumping over them, we landed directly on the arguments for our target method
- This offset grabbed just the 32 byte chunk holding the `numberToUpdate`

This careful offsetting filtered out unnecessary data and extracted the value we actually needed.

In Solidity method calls, the function selector hashes to a 4 byte signature for the function. By convention, arguments follow selector. So targeted offsets simplify parsing out arguments from unstructured call data payloads.

Had I not fixed my blunder and forgot the offset, we would have grabbed a useless chunk containing that selector hash rather than our precious `numberToUpdate`. As we navigate raw byte arrays, hyperawareness around offsets is critical!

### Appreciating Solidity's Clever Use of the Stack

As we reach the climax of our contract execution journey with `SSTORE`, it's easy to miss the elegance of how storage writes are staged. Let's connect the dots...

We shuffle values in and out of the stack, jump between destinations, and finesse the call data offset all to eventually construct this final sequence:

```
Stack prior to SSTORE:1. Key2. Value
```

This exact order prepares our write beautifully:

```solidity
sstore(key, value)
```

By popping and swapping, we used the stack as a transient scratchpad to get inputs aligned for this ultimate storage operation.

The stack structures control flow in yet another clever way - some values pushed are simply jump destinations, acting as temporary program counters to sequence steps properly.

This creative stack orchestration enables the EVM execution model. Next time you peruse Solidity bytecode, appreciate how artfully it wields the stack!

## Revelations from Mistakes in the Trenches

Now that we've covered core concepts more thoroughly, let's shine a light on some of my slip-ups from the video transcript. Walking through flaws and debugging is often where the most valuable insights emerge.

### The Perils of Careless Stack Management

When hastily tweaking stack values, I created a real mess by unintentionally leaving junk data lurking:

```
Stack at jumpDest3:1. 0x3f2. 0x3f3. 0x3f
```

This demonstrates how inattentive stack management can pollute state during execution. The EVM does precisely what you tell it - without caution, garbled values clutter flow control or storage.

Thank goodness the repercussions here were contained. But in more complex scenarios, overlooking stack contents can cause serious headaches!

The key takeaway - treat the stack judiciously, and clean up unwanted leftovers promptly before they cause issues later in execution.

### The Virtues of Principled Programming

An underlying theme across our exploration is the virtue of principled programming, even in a loose transcript format. For instance:

- The value `0x04` bothered me - it seemed to lack clear purpose when pushed originally. Later down the flow, it got popped off uneventfully.
- Turns out that push laid ground for programmed jumps mapped further down. But without that context evident, it felt sloppy, like setting up pieces arbitrarily without understanding why.

When scribbling code, it's tempting to move quickly without explaining rationale. But reflecting on intent separates principled logic from haphazard code. Whether for my future self reviewing this, or for anyone else tracing steps, commenting on **why** alongside **what** brings clarity.

The transcript format made my impulse coding transparent - and underscored the importance of declaring motivation, especially in dynamic environments like the EVM.

## Closing Thoughts

Hopefully the previous 2000 words have shed light on the nuts and bolts of Ethereum contract execution - call data parsing, stack management, flow control, and ultimately state changes through operations like `SSTORE`.

We focused specifically on incrementing a number variable. But the patterns generalize - whether modifying a mapping, pushing to an array, or writing a structure, the same disciplined sequence occurs:

- Parse call data
- Validate conditions
- Reorder stack
- Execute core logic

Rinse and repeat for each state change.

Through hands-on exploration, we demystified the methodical nature of smart contract execution. And beyond just the technical, we extracted lessons around precision, intentionality, and principled programming that apply both on and off the blockchain.

Next time you analyze Solidity code and bytecode, remember - it may seem obscure, but with care and context, anyone can navigate the EVM assembly language. Hopefully this journey has empowered you to dive deeper!
