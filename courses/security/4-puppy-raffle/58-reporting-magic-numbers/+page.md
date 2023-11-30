---
title: Reporting - Magic Numbers
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/KDh-jSmIOgA" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Unraveling the Magic Numbers: An Informational Audit

Moving on, I bumped into the mystery of _magic numbers_- a term you would be familiar with if you've had your fair share of headaches debugging code.

Using magic numbers in coding is discouraged. Not because of daunting supernatural powers they wield, but due to the confusion they bring. Seeing number literals scattered in a codebase is like seeing Latin text in a historical mystery novel: intriguing, but mostly confusing.

For those that don't know, a _magic number_ is

> "A direct usage of numeric literals (ex: 5, 100, -3) in your code that does not have any direct explanation or reasoning behind it."

While auditing, here's what some typical magic numbers in a codebase look like:

```js
uint256 prizePool = (totalAmountCollected * 80 ) / 100;
uint256 fee = (totalAmountCollected * 20) / 100;
```

To give an idea of what it's all about, let's put it out simply:

![](https://cdn.videotap.com/ivNThteq2BkoEFoA1o4y-54.71.png)

It's always more readable and also quite a bit kinder to the next person (or your future self decoding the code), if the numbers used in the code are given a meaningful name. Let's see a more appropriate way to handle these numbers:

```js
uint256 public constant PRIZE_POOL_PERCENTAGE = 80;
uint256 public constant FEE_PERCENTAGE = 20;
uint256 public constant POOL_PRECISION = 100;

uint256 prizePool = (totalAmountCollected * PRIZE_POOL_PERCENTAGE) / POOL_PRECISION;
uint256 fee = (totalAmountCollected * FEE_PERCENTAGE) / POOL_PRECISION;
```

Although it might result in a slightly more verbose code, but who doesn't prefer meaningful verbosity over silent ambiguity?

## Summing Up

So remember, while performing an audit, you don't need to eat everything that's on your plate in one go. Prioritize what needs immediate attention and what doesn't. Being a little bit lazy in an informational, private audit like addressing balance (if you're good with the protocol) is not a big deal, as long as it doesn't harm the codebase in the long run.

However, when it comes to magic numbers, them being informational doesn't make them less important. Always avoid unexplained constants in the code. Name your numbers, make your code readable and let the person reading your code thank you, rather than wanting to throw their computer out the window in frustration!
