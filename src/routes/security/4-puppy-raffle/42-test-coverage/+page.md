---
title: Test Coverage
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889509090/1c0940f929?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Enhancing Code Coverage For Better Audit Results

Are you looking to pass an audit with your code? If so, code coverage is an essential metric you need to pay attention to. Code coverage, as the term suggests, indicates how much of your code is being tested through your test cases. Getting the right code coverage can be the difference between code that's reliable and durable and code that's prone to bugs and eventual system breakdowns.

Let's walk through my most recent analysis.

## Code Review: Aderyn and Slither

I recently reviewed two applications: Aderyn and Slither. After completing the review, it was time to study their code coverage.
Let's delve deeper into the specifics and dissect how much of the code was actually "covered" under the tests.

## Forge Tool for Calculating Code Coverage

To measure the code coverage, I used Forge, a widely recognized tool for just this purpose. The result was not as expected.

```bash
forge coverage
```

![](https://cdn.videotap.com/H1yW7XuzYltnhAiHdcLP-13.37.png)

The outcome was somewhat disheartening.

What did the above result imply? It screamed out loud, "Ta DA, it's pretty bad". In simpler words, the code coverage was in a pitiful state.

> **NOTE:** In an ideal world, code coverage should ideally be near or at 100%. No stone should go unturned!

## Audit types: Private Audit vs Competitive Audit

Here comes the tricky part - audits. Depending on the type of audit, the levels of code coverage required can change.

For a **private audit**, the level of code coverage obtained would necessitate classifying it as purely informational. It directly translates to "Hey! You need better test coverage." In simple words, it highlights the area of improvement for the developers to get a higher success rate during audit approval.

For competitive audits, code coverage doesn't usually play as significant a role. However, that doesn't mean it’s entirely negligible.

![](https://cdn.videotap.com/9BEXZYZjamdFNyvfe0tl-28.8.png)

## The Need for Higher Code Coverage

Discussing this further, with the code base's simplicity, particularly for apps like Aderyn and Slither, maximum code coverage should be relatively easier to achieve. But the reality depicted a gloomy picture.

This code coverage was somewhat "abysmal", as I put it mildly.

Any code coverage below the acceptable limit indicates that sections of the code are not covered in the tests. This means that there is code which, when executed, does not have any tests that can confirm its correctness.

Considering the existing code base's simplicity, providing a comprehensive test coverage should not be a daunting task. With some additional effort, this can easily be improved, thereby making your applications more resilient and robust.

In conclusion, if your code coverage is lacking, it's time to dive back into your tests and ensure they're comprehensive. Remember, code coverage is not only a noteworthy aspect during audits but also plays a crucial role in the overall performance and uninterrupted functioning of your application. So, get back to testing, and happy coding!
