---
title: method filtering
---

## The ABCs of Filtered Rules

Imagine you've got a method, let's call it `f` — this could be any function lying within the vast expanse of your codebase. You've used it before, it operates just like magic, but there's more to it than meets the eye. If I were to sketch out a quick example, let's say we've got this dynamic duo: `enve` and `f`. We'll crank out `f(enve)` and — oops, let me correct that — I meant to call `f` with some `data args` like so: `args e args`. This snippet brings us face-to-face with little Certora magic, inviting `f` for a waltz with any call data it fancies, in any environment it pleases.

But hold on, there's a twist — just like your favorite filter on a photo app, we can filter these methods down to size. Picture filters as the ultimate gatekeepers, allowing you only to verify parametric rules on the chosen ones. Plus, they sidestep the computational toll that `require` statements take when they snub counterexamples for a method.

"Use filter instead of require!" — this could easily become your new mantra. Instead of wrestling with the heavyweight, `require f.selector == someFunctionSelector`, you pick the lightweight champ, `filter`.

## Syntax and Structure of Filtered Functions

Now, if I haven't lost you in the weeds yet, let's get our hands dirty with the actual syntax. Here's how it looks in its prime:

Look at that sleek structure! It's not just selecting functions; it's the VIP pass to the function attributes gala where `function is view` or `function_selector` are flaunting their styles. Endless possibilities!

That said, everything has its limits. If you wanted to play matchmaker with two function selectors, filters might ghost you since they can't access varying input parameters. So, guess what? We go back to the good ol' `require` after all.

## To Filter or to Require?

It’s like standing at a crossroads in the coding universe. One path leads you towards the land of `filters`, less computationally intensive and smoother for our Certora approver sidekick. The other meanders back to the secure embrace of `require`, which holds the key to comparing method inputs with one another. Choices, choices!

`"Filters are just for Certora what make-up is for movie stars — essential but not for every scene."`

## The Verdict

We've roamed through the wilderness of method filtering, and it's clear this isn't a one-size-fits-all journey. We throw in filters where they shine — for those straightforward verifications screaming for a touch of simplicity. But when it’s about peering into the depths of method inputs, comparing, and analyzing, `require` pulls us back into its complex, yet irreplaceable embrace.

Remember, every piece of code is a puzzle, and filtering methods is just one dazzling piece that can help you solve it with style. As coders, we live for these moments — for optimizing, for streamlining, for the breakthroughs that shape our digital world. So, wield your `filters` and `requires` with precision, and let's continue to craft code that is not only functional but also refined and dependable.

So, as you forge ahead on your coding odyssey, let's agree to not shy away from these modest heroes of code efficiency. Embrace the subtleties of method filtering, blend it with the robustness of `requires`, and watch as your code transforms from mere lines of logic into a masterpiece of engineering prowess.

In closing, let's reflect on the path we’ve trodden today. We've unveiled the veiled world of method filtering, found the balance between filters and requires, and sharpened our tools for the challenges ahead. Keep innovating, keep coding, and let's continue this fantastic journey of technological exploration together.

And on that note, I'd love to hear your thoughts on method filtering. Have you found it to be an asset in your coding journey, or do you stick with `require` to keep things strictly under control? Let's keep the conversation going in the comments below. Happy coding, my friends!

Happy coding, my friends — until our paths cross in the world of zeros and ones again!
