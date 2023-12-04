---
title: Reporting - Floating Pragma
---

_Follow along with this video:_

## 

---

# A Step-by-Step Guide to Auditing Code from Your Search Bar

Welcome to our step-by-step guide to auditing code from your search bar. Today we'll dive into the nuances of auditing, showing you exactly how we utilize the **@audit** tool to rewrite sections of a code base.

Follow along as we jump into the details, sharing how you can take **@audit** findings, turn them into a comprehensive write-up, and even grade the findings based on severity. By the end of this guide, you'll have a clear understanding of the code auditing process and how to leverage it in your own projects.

## Getting Started

We're going to kick off with a simple search query. In the search bar, we're looking for "@audit." We'll scour the code base for any instance of "@audit," creating a thorough write-up on each finding we uncover.

### Our First Audit Result

Our first instance of @audit involves an issue with using **floating Pragma**, which our Aderyn tool has already flagged in the **report.md** file.

Let's take a look at this further.

```js
//@Audit: Info - Use of Floating Pragma is bad. Solidity Pragma should be specified, not wide.
```

So what does this mean? In layman's terms, it suggests that solidity pragma should be explicitly articulated rather than left vague or wide. This isn't necessarily a critical issue (it doesn't pose a direct and immediate threat), but it's still worth addressing.

![](https://cdn.videotap.com/MjcMkBDMLsjt5BWWw3v6-25.97.png)

## Categorizing the Audit Result

Every audit result requires categorization based on potential impact. In our case, this floating Pragma issue is relatively minor. While some people assign it a 'low' level of importance, I prefer to label it 'informational.'

It's crucial to keep in mind that the classification of findings is subjective, open to interpretation based on the auditor's knowledge and understanding of the code base's architecture and dependencies, as well as its potential impact on the overall system.

In our audit data, we'll document our finding accordingly.

![](https://cdn.videotap.com/VduK8PC4shE7VwpBA65s-44.86.png)

## Building a Database of Findings

After documenting the initial finding, we won't stop there. We'll want to compile a more robust database of audit results.

We'll return to the **Password Store audit** we worked on previously and extract both the "finding layout" and the "report layout." We then create a new folder (let's name it **Audit Data**) and paste these layouts there.

Now we have a structured template to work from for our code audits—in essence, saving time and maintaining consistency in our work.

## Wrapping up the Audit

As we go through the process, we'll mark each `@audit` instance, noting that a report has been written based on the findings.

It's satisfying to physically (or digitally) tick off tasks as they are completed, providing that sense of achievement and progress. We're not just identifying issues; we're systematically working through them and documenting our findings for future reference and action.

> "...the objective code auditing is not just to identify potential vulnerabilities but to provide developers with an understanding of these weaknesses to produce more secure code in the future."

After a thorough audit, not only will we have a detailed report of the current state of the code base, but we'll also have a blueprint for improving code security and quality moving forward.

In conclusion, the power of a simple tool such as the search bar, coupled with a little knowledge and understanding, can be leveraged to provide comprehensive and granular insights into a code base. Happy auditing!
