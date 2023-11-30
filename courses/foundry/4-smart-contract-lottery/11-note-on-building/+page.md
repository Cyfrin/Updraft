---
title: Note on Building
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/DdVkEdkNwT4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

When it comes to building solidity projects, things may seem a bit too linear or straightforward when you watch a demo or read a tutorial. You may assume that I just go straight from the start to the finish without pausing, but this isn't always the case. In this piece, We aim to peel back the curtain and reveal the actual process — back and forth movements, the surprises, and the frequent pausing for debugging that are the actual hallmarks of building solidity projects effectively.

## Breaking the Illusion of Once-through Coding

Firstly, my seeming seamless way of doing these demos is not indicative of what normally happens when I code. It appears as if I am easily writing this contract from the beginning to the end, but that's far from the reality.

Here, you might be impressed with how quickly and seamlessly we are coding this contract, but don't be fooled - it's not typical to write a contract in one go. In fact, it's not even possible to write a contract in one go. It's a process of writing, testing, and refactoring.

But the reality behind this façade is that We've carried out such demonstrations repeatedly. We've written this code countless times and spent vast hours refining our skills in solidity.

## "Piece by Piece" Methodology

When coding, rather than tackling the entire project as a whole, it's often beneficial to break it down. Rather than writing a contract in one go, which can be incredibly challenging, I find myself writing a deploy script and testing individual components of the contract, part by part as I build it.

```markdown
// As an example, at this point in my coding, I probably would have written tests
// for various functions such as 'get entrance fee', 'pick winner' and 'enter raffle'.
```

Writing tests while coding is incredibly beneficial. In fact, it's a necessary practice when writing real projects. However, in this demonstration, I won't be writing tests or deploying scripts immediately.

The reason isn't that these steps aren't important — they absolutely are — but rather because we'll be performing extensive refactoring as we progress, and it's pointless to write tests for code that will soon be modified or discarded.

## Understanding the Real Coding Project

I must emphasize that this modeling doesn't portray reality accurately. True, it breaks down the functions and processes into understandable pieces. However, it veils the moments of debugging, the constant going back-and-forth, the nights when the code doesn't compile, and you can't figure out why.

```markdown
// When you're coding a real project, you may encounter setbacks like compilation errors and other bugs
that may require you to troubleshoot and refactor your program.
```

However, here is an essential truth:

<img src="/foundry-lottery/11-building/build1.png" style="width: 100%; height: auto;">

So, as you journey through coding projects, remember to take a deep breath and hop back into it whenever you experience any of these hitches. It's okay, and it's good. It means you're learning, and with every bug fixed or problem solved, you become a better programmer.

So next time you see me sailing through a demo or tutorial, remember there's more to it than meets the eye. Happy coding!
