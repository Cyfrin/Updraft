---
title: Reporting - Should Follow CEI
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Adopting Clean Code and CEI in the "Puppy Raffle Select" Function

Anyone who's ever dealt with code understands the importance of best practices, clean structures, and simple conventions. Sometimes, we find these guidelines drift into a gray area, where adherence can be somewhat subjective or optional. However, it doesn't diminish their importance; the overall goal remains ensuring our code remains readable, maintainable, and efficient. This is precisely the case with the "Puppy Raffle Select Winner" function in our codebase, which has some room for improvement in following the Clean Code and Conventional-Commit (CEI) practices.

## The Dilemma with Puppy Raffle Select Winner function

This discussion primarily revolves around how the function "Puppy Raffle Select Winner" seems to neglect some CEI practices. While the function operates as intended, its implementation could potentially conflict with the defined best practices. This doesn't necessarily impact the function's operation, but it's always fruitful to keep our code clean and properly structured.

One might argue that these informationals have a dynamic importance range and don't necessarily require title best practices. However, even in situations like these, it's beneficial to adopt a more concise approach. So instead of going with "I four puppy raffle select winner should follow CEI," I'll propose a more crisp understanding: "Puppy Raffle Select Winner does not follow CEI: A glance at our code practices".

## Understanding CEI

For those unfamiliar with the term, the Conventional-Commit specification (CEI) is a simple set of rules aimed at creating an explicit commit history. It adheres to the principles of Semantic Versioning (SemVer), wherein versions are incremented based on the type and nature of changes made. Here's a broader picture of how CEI structures its syntax commit messages:

```
<type>[optional scope]: <description>[optional body][optional footer(s)]
```

By aligning your commits with CEI, you can easily distinguish between different types of changes and understand the purpose without delving into the details.

## Diving into the Code

Let's take a look at how our current implementation could be improved:

![](https://cdn.videotap.com/5fiDVN8c36MOJEsywdT0-39.47.png)You'll notice some discrepancies if you compare this with standard Clean Code and CEI practices. Even though this wouldn't impact the functionality, it is considered best practice to ensure your code is always clean and follows CEI. Such subtleties can make a significant difference when it comes to the maintainability and readability of your code.

"And this is where it gets a little bit subjective. What does it mean to keep the code clean and to follow CEI?"

NOTE: Even the perception of keeping your code clean and following CEI can vary across developers. However, in the end, it circles back to improving readability, maintainability, and efficiency.

To rectify this, let's modify the code and run a diff:

```
code --diff <file1> <file2>
```

![](https://cdn.videotap.com/T19Kp2sgscV3fxvFNW9I-56.73.png)And voila! You can now easily spot the changes made to align the implementation with CEI.

## Wrapping up

In conclusion, adhering to best practices, like keeping your code clean and following CEI, is a route towards more manageable, efficient, and readable code. While occasionally you might encounter situations where these guidelines appear less crucial or even slightly subjective, there's always room to improve your code's structure and format.

As Robert C. Martin puts it:

> "Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...\[Therefore,\] making it easy to read makes it easier to write."

Implementing these practices will not just enhance your code quality but also, subsequently, level up your coding skills.
