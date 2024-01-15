---
title: Constant Product Formula Explained
---



---

# Unraveling the Math in Uniswap's X \* Y = K Invariant

> **"The main thing we want to keep in mind is the ratio of tokens should always stay the same."**

Uniswap, a popular decentralized exchange protocol, leverages a relatively simple mathematical principle to ensure that the balance within the pool maintains a certain ratio. At the core of its mechanism is the invariant formula: X \* Y = K, which is held constant throughout all trading activities. However, when fees are factored in, the invariant technically increases, leading to a somewhat complex equation which we'll dissect further in this blog post.

Seeing all the math involved, you might feel a bit overwhelmed, but hang tight, as we take a deep dive into the intricacies of the math and algebra involved. If you are someone with a keen interest in mathematics and decentralized finance, strap yourself in as we journey down this Uniswap mathematical express.

## X \* Y = K, The Magic Invariant Equation

Our first step is to grasp the magic invariant equation, X \* Y = K. Our code base operates on an invariant principle where the token balance of X times the token balance of Y should always equal the same constant, K.

Here is the equation:

```ruby
X * Y = K
```

The token balance of X times the token balance of Y after a swap operation should still equal the same constant K, regardless of the asset swapped. Let's illustrate the idea using an example:

Given we have a Uniswap pool of Ethereum (WETH) and USD Coin (USDC), and a trader makes a swap operation — removing some WETH to add some USDC — the balance ratio should remain constant to prevent the trader from manipulating the price to their advantage.

![](https://cdn.videotap.com/7AR7AuVGUkohvd6xDQ8G-119.24.png)## Simplifying The Equation

The X \* Y = K equation might seem a straightforward invariant, but implementing it as an assertion in the codebase can be challenging. But don't worry — to ease the process, we need to simplify this equation to a form where we can explicitly say the change in token balance must always follow a certain formula.

We'll simplify the equation using algebra to a format suitable for “stateful fuzz testing”. Don't feel pressured if you don't follow every step; you can still hold on to the principle that checks out.

Here’s the process of simplifying the equation using algebra:

1. Starting with the core equation and its variant:

```ruby
X * Y = K (core equation)X * Y = (X + ∆X) * (Y - ∆Y) (With changes ∆X and ∆Y in X and Y)
```

![](https://cdn.videotap.com/QHzVQA2HNb4hbKJl7pYc-220.14.png)2. Using the FOIL (First Outer Inner Last) algebraic method to simplify the equation:

```ruby
X*Y - X*∆Y  = X*Y + ∆X*Y - ∆X*∆Y
```

3. X\*Y appearing on both sides of the equation:

```ruby
-X*∆Y  = ∆X*Y - ∆X*∆Y
```

4. Isolate the change in X (denoted as ∆X):

```ruby
∆X * Y - ∆X * ∆Y = X * ∆Y
```

5. Factor out ∆X:

```ruby
∆X * (Y - ∆Y) = X * ∆Y
```

6. Solve for ∆X:

```ruby
∆X = (X * ∆Y) / (Y - ∆Y)
```

And there you have it! We've simplified the equation from X \* Y = K, down to ∆X = (X \* ∆Y) / (Y - ∆Y) — an equation we can use in our fuzz test!

![](https://cdn.videotap.com/q4fjlDbGWHwTtzGV6qC4-467.79.png)## Wrapping Up and Next Steps

We did some crafty algebra to break down X \* Y = K to a simplified equation. Remember, the formulas we were dissecting are vital for the Uniswap protocol to maintain a balanced token ratio, hence they are also vital for us when creating our stateful invariant testing suite.

Don't despair if the blocks of algebra seems difficult to understand because all the math we've covered will be included in the associated Github repo. If you're more comfortable with visual diagrams or need a deeper explanation of mathematical techniques, [Chat GPT](https://chat.openai.com/) can be very helpful.

For those who wish to take an even deeper dive into the formal verification of the X\*Y=K market maker model, the respected paper on [Runtime Verification](https://runtimeverification.com/) goes into detail about how the formula works from a formal perspective.

Thanks for reaching this part, keep up the good work, and see you in the next blog post!
