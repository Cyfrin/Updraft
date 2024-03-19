---
title: Naive Formal Verification With Halmos
---

---

## Starting Off Naively

You heard it right; we're going to kick off with a good old-fashioned naive approach to formal verification. Before all the fancy tools and polished methodologies, we've got our humble beginnings, and that's where we're going to start.

Sure, we could go all-in with tools like hamos or Certora right off the bat – they're pretty awesome, by the way – but let's shuffle back to the basics for a sec. If we look back at how we'd originally tackle this, it would be straightforward: Let's verify our fuzz test by actually doing the fuzz test. Simple, right?

Grab that code snippet you have lying around; we're going to use halmos for this. I've got the halmos function prepped and ready to roll, so I'll paste the snippet right in and...

Okay, hold your horses. We've got a bunch of unknowns. This is when I noticed that the paths hadn't been fully explored due to a mysterious 'loop unrolling bound of two'. That may sound like techno-babble, so let me break it down for you.

### Loops and Bounds

Take a peek at our base test, and you'll see a while loop staring back at you. That little loop indicates that if 'y' grows too big for its britches, we're going to be loop-de-looping for quite a bit.

So, I thought, let me check with halmos and see what info I can dig up. It turns out the loop max bound is set to two by default. Well, that's not going to cut it for us; we'll need to crank that up. Let's run the test again, but this time, let's jack that loop bound all the way to 1000 or something crazy like that.

If you dare to run this, brace yourself – you'll find that time ceases to exist. It would take eons for this function to run its course, and I'm talking about possibly never seeing the end. There are simply too many loops in there.

### Time-Out Tactics

I'm sure some of you are thinking, "Hey, what if we tried running this with a timeout?" I like your style, but let's be real – even setting the solver timeout to zero won't save us here. You know why? Because this is where we make an appointment with eternity.

It would've been sweet if these were easy fixes, but alas, we're head-on with the path explosion problem. We've got an abundance of paths and symbols for the explorer to navigate through, and it just can't handle it all.

## Soul-Searching with the Soulmate Square Root

Let's talk about the soulmate square root, a fascinating different assembly implementation of the square root function. You might think, "Hey, maybe this will do the trick!" – but if you give it a whirl, you'd bump into the same roadblock.

Old soulmate here isn't going to make life easier for us. We're still in rough waters, the path explosion issue remains, and we need to come up with a better plan.

## The Larger Picture

You see, the essence of formal verification is all about 'proving' that your code is free from bugs – at least for the parts you've tested. But as we've seen from our little experiment, going at it naively can be like trying to empty an ocean with a teaspoon.

So, what's the takeaway from all of this? It's not that formal verification is a lost cause; oh no, far from it. What this tells us is that we need to be strategic. We need to dive deep into the implementations, fine-tune our testing parameters, and explore smart ways to handle complex (and sometimes downright chaotic) loops.

## In Conclusion

We embarked on a quest to formally verify our code with a naïve approach, armed with halmos and a pinch of curiosity. Along the way, we hit roadblocks – looping endlessly and facing the path explosion problem – but we didn't lose heart. These challenges are breadcrumbs, guiding us towards smarter, more efficient verification strategies.

Folks, coding is all about continuous learning, and today we've got some serious takeaways. Whether you're a seasoned developer or just venturing into the realm of software verification, the journey has its bumps but also rewards those who persevere.

Stay tuned, keep experimenting, and never stop coding! I'll be back with more tales from the trenches of formal verification, equipped with more tools, tips, and, of course, the occasional dad joke.
