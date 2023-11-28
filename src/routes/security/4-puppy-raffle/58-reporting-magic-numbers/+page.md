---
title: Reporting - Magic Numbers
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Code Auditing: The Magic Numbers and Address Balances

Hello aspiring developers and information auditors! You're here because you want to know about basic code auditing for a smoother, more coherent codebase. Or perhaps you're simply intrigued by what I find when I do my audits. Either way, you're in for a treat! In this post, we'll journey through the processing of an audit, focusing on magic numbers and the possibility of addressing balance.

## Audit: Skipping the Balance Address

Often during audits, you stumble upon some findings that you may not consider urgent or even necessary to address. In coding or auditing language, we could call these 'informational'. They are usually not destructive, albeit a little bit annoying. It's like a tree in your backyard which sheds countless leaves that you constantly have to sweep, but it's not really harming you or anything.

For example, during this audit, there was a piece of information on _address balance_. I figured we might want to take a look at it, but then asked myself: **"Why not just do address this balance?"**Before this thought process could even finish, I decided that it was not super important right now.

```
//Address Balance Code...
```

_Blockquote Please_

> "You don't always have to attack all audits or issues at once. Understand your resources, weigh the urgency, and prioritize accordingly."

I was being economical with my energy and effort. It's a crucial practice you adopt over time. So, I put it in the 'report skipped' field.

## Unraveling the Magic Numbers: An Informational Audit

Moving on, I bumped into the mystery of _magic numbers_- a term you would be familiar with if you've had your fair share of headaches debugging code.

Using magic numbers in coding is discouraged. Not because of daunting supernatural powers they wield, but due to the confusion they bring. Seeing number literals scattered in a codebase is like seeing Latin text in a historical mystery novel: intriguing, but mostly confusing.

For those that don't know, a _magic number_ is

> "A direct usage of numeric literals (ex: 5, 100, -3) in your code that does not have any direct explanation or reasoning behind it."

While auditing, here's what some typical magic numbers in a codebase look like:

```
//Beforeconst someVariable = 155;...
```

To give an idea of what it's all about, let's put it out simply:

![](https://cdn.videotap.com/ivNThteq2BkoEFoA1o4y-54.71.png)It's always more readable and also quite a bit kinder to the next person (or your future self decoding the code), if the numbers used in the code are given a meaningful name. Let's see a more appropriate way to handle these numbers using JavaScript:

```
//Afterconst ITEM_MAX_COUNT = 155;...
```

Although it might result in a slightly more verbose code, but who doesn't prefer meaningful verbosity over silent ambiguity?

## Summing Up

So remember, while performing an audit, you don't need to eat everything that's on your plate in one go. Prioritize what needs immediate attention and what doesn't. Being a little bit lazy in an informational, private audit like addressing balance (if you're good with the protocol) is not a big deal, as long as it doesn't harm the codebase in the long run.

However, when it comes to magic numbers, them being informational doesn't make them less important. Always avoid unexplained constants in the code. Name your numbers, make your code readable and let the person reading your code thank you, rather than wanting to throw their computer out the window in frustration!

I hope this blog post provided useful insights about code auditing, especially about how to handle magic numbers and the approach towards informational audits. Keep auditing, keep coding, keep learning!
