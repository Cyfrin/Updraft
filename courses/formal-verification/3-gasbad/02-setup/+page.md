---
title: setup
---

## Solidity Version Check

Setting up our environment is crucial for avoiding nasty surprises. If you haven't already set yourself up with Solidity `0.8.20`, now's the perfect moment for a spot of housekeeping:

```bash
sulk select install 0.8.20sulk select use 0.8.20
```

Why, you ask? Because `0.8.20` is our magic number – the Solidity version we'll be working with for this marketplace.

## Building From Scratch

Now, here's where the fun really begins. We're eschewing any pre-built scaffolding by deleting the Sartora folder. That's right, you and I are coding artisans, crafting this baby from the ground up. So, farewell Sartora folder; we're on our way to creating something truly custom.

> "Building from scratch is the essence of developer craftsmanship, and we're all about it here!"

## Navigating The Setup

Next up, let's check out the readme MD because, let's face it, reading the manual always pays off. We're scanning through – okay, Foundry, `certora Cli`... check, and check – both installed and ready to rock.

Now, onto the `make` command. Before we unleash it, let's peek under the hood at the `make file`. Here's what we're looking at:

- `all`: A command that does it all.
- `remove`: This cleans the slate.
- `install`: It's like getting new toys for our project.
- `build`: The construction phase of our code.

Looking good so far? Let's confirm Foundry's config (`foundry.toml`) doesn't have any `ffi` surprises lurking. All clear!

Cue the drumroll, because it's `make` time.

```bash
make
```

Just like that, everything's in place, up-to-date, and we're buzzing with progress.

## Testing 1, 2, 3...

Before we get ahead of ourselves, let's conduct a quick forage test to ensure we’re on solid ground. Tests passing equals green lights all the way.

```bash
forge test
```

## Exploring The Codebase

Now, let's wear our explorer's hat and delve into the Gasbad NFT marketplace codebase. The assembly awaits our keen eyes.

As we sift through the code, remember what it's all about: understanding, tinkering, improving. You're not just following a set of instructions – you're engineering the next big thing in the NFT space.

---

So there you have it, folks – the walkthrough of setting up your very own Gasbad NFT marketplace from the comfort of your beloved text editor. Remember, each command is a step toward mastery, and each line of code is a brick in your blockchain fortress.

Stay curious, keep experimenting, and don't forget to embrace the casual camaraderie that makes our developer community so special. Happy coding!
