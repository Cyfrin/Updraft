---
title: Solidity Layout
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/qnmKmB_pBvQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In one of our previous conversations, we discussed Solidity's style guide, code layouts. However, it's intriguing to note that we didn't fully explore how to properly order our Solidity functions and calls. This article aims to delve deeper into this crucial aspect of the usage of Solidity, the leading programming language for smart contract development.

The official Solidity docs provide a comprehensive order of layout for a better understanding of the programming organization. The objective is to make your codebase look professional and easy to navigate when working with code.

<img src="/foundry-lottery/2-layout/layout1.png" style="width: 100%; height: auto;">

## The Standard Order for Code Layout in Solidity

Starting with the `Pragma` directive, a typical Solidity code layout follows several steps in a specific order:

1. `Pragma` statement
2. Import statements
3. Interfaces and libraries
4. Contracts
5. Type declarations within contracts
6. State variables
7. Events
8. Modifiers
9. Functions

We've been following the correct procedure with `Pragma` at the very start. However, we currently don't have any import statements, interfaces or libraries. Next up on the list would be contracts, inside which you do type declarations and state variables.

Our first function comes next, where we don't have any events or modifiers in use. The ordering advises that we start from the `constructor` but remember, keep the readability and comprehensibility of your program as a priority.

<img src="/foundry-lottery/2-layout/layout2.png" style="width: 100%; height: auto;">

## A Closer Look at Function Ordering

Function ordering in Solidity also follows a specific flow. You start with the constructor, then follow it up with the receive and fallback functions. After that, external and public functions come, followed by internal and private functions. Lastly, within a grouping, view and pure functions should be placed.

Let's break down the order in this list:

1. Constructor
2. Receive
3. Fallback
4. External and Public functions
5. Internal and Private functions
6. View and Pure functions

Enforcing readability, this order adds to the organization, keeping the code neat and manageable.

## How to Remember the Order

You might sometimes find you forget to follow this specific order. A helpful tip that I personally use is to paste the code layout order at the top of my code as a quick reference guide. You can find a template of this versioning layout in the GitHub repository associated with this lesson.

<img src="/foundry-lottery/2-layout/layout3.png" style="width: 100%; height: auto;">

Go to the [Github repo](https://github.com/Cyfrin/foundry-smart-contract-lottery-f23/tree/main/src) and copy the code layout. Paste it at the top of your working context. This layout serves as a comprehensive guide we will follow.

From there, you can copy and paste it at the top of your working context. This layout serves as a comprehensive guide we will follow.

<img src="/foundry-lottery/2-layout/layout4.png" style="width: 100%; height: auto;">

## Conclusion

In the end, the Solidity docs' recommended layout is simply a guide - you can opt to follow it or devise your own. After all, the ultimate goal is to create a clean and comprehensible code base regardless of the layout.

Bear in mind, though, that when your application scales and interacts with other contracts, Solidity's official documentation's recommended order could save you significant time and confusion. Happy coding!
