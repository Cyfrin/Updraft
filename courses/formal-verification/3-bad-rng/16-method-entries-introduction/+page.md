---
title: method entries introduction
---

## Getting to Grips with Function Summarization

Let’s kick things off with the crème de la crème topic of function summarization. As we journey through the realm of smart contracts, it's crucial to grasp that the ways to encompass the essence of functions are as diverse as the stars in the sky. So let’s don our space suits and take a dive!

### Diving into the Basics: Invoking Functions

Commonly, we assume that to verify contracts, a direct invocation of the functions encapsulated within them is a must. However, curveballs are a part of the game, and Certora plays it well by offering alternative means to engage with any function across your software cosmos.

Imagine a world where the act of calling functions is as easy as saying "Hello". That's where basic methods and syntax come into play. But let’s not sell ourselves short—there’s more beneath the surface than the minimalistic methods blocks we're accustomed to.

### Understanding Exact and Wildcard Entries

What exactly are exact entries? When we summon a function like `total_supply`, we're essentially tailoring our call to the current contract's `total_supply`. Think of these as neat, labeled boxes where everything fits snugly inside.

Now, sprinkle in some magic dust, and voilà—wildcard entries! By simply adorning our function call with an underscore, we transform an exact entry into a wildcard. This means any contract waving the `total_supply` flag will heed the call.

### Summary Declarations: The "Always Returns One" Mantra

But wait, there's more! We can attach a summary declaration to our function that dictates an immutable truth—like a function that should always return the number one.

## No Contract Left Behind: The Art of Catchall Entries

Up next, catchall entries. A wilder cousin of wildcard and exact entries, catchalls make a sweeping statement. With a stroke of a pen, we could declare that regardless of our contract's nature, every function should return the number one. Bizarre? Perhaps. Doable? Absolutely.

### Sidebar: Exploring Visibility Modifiers

Visibility modifiers are your gatekeepers in the world of functions. They determine who gets to knock on the door of a function—whether it's anyone in the digital landscape or a select few with VIP access.

### Ian Free and The Optional Function

In the script of our code, some functions are stars, and others are optional extras—nodding to our ability to denote a function as non-essential to the plot. Imagine Ian Free, a function that can merrily skip its appearance without the storyline crumbling.

### The Unseen Wonders: Beyond Minimalist Entries

With our penchant for minimalism, we've merely scratched the surface. There lies an arsenal of methods waiting to be deployed within our creative blocks. The possibilities are vast, and the only limit is the boundary of imagination.

---

Happy coding, and may the functions be always in your favor!
