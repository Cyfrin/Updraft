---
title: Severity Rating Assesing Informational/Gas/Non-Crit
---

_Follow along with this video:_



---

# Understanding the Severity of Blockchain Protocol Findings

Assessing the gravity of issues in blockchain protocols can be challenging, especially for beginners in this complex field. Let's crack the mechanics of this process in a digestible form by breaking down each factor that impacts severity - disruption to the protocol, risk to funds and the chances of occurrence. Additionally, we'll deep dive into differentiating a critical issue from an informational observation.

## What Determines the Severity?

Different aspects determine the severity, primarily including whether the funds are at risk or if there is a major disruption. There's an area in the middle, where we are faced with issues that don't explicitly endanger funds or bring total disorder but still present as disruptions that shouldn't be ignored. For instance, a function might not be functioning as intended or state mismanagement.

![](https://cdn.videotap.com/7MnH5j3N8rEe92sSzFg5-23.62.png)

> Examining if the protocol will operate as expected or if user assets are jeopardized aids in understanding the severity.

## What is an Informational Finding?

Imagine a situation where there's incorrect documentation instead of a problem in the function itself. The repercussions are minor since the impact is limited to someone potentially misunderstanding the code.

Does this have a high probability of happening? Yes. However, since it doesn't affect the protocol's functioning or carry any risk, its impact remains negligible, making it a zero impact issue.

Consequently, severity in such cases is assessed as informational or "noncritz." An informational finding is a non-critical instance where you bring it to the team's attention to improve code readability, extend test coverage, or rectify design patterns.

You may also identify spelling errors, incorrect documentation, and opportunities for gas improvement, even though they don't qualify as bugs.

![](https://cdn.videotap.com/RKj8pxAxknNIVZU5STC2-76.76.png)

A wealth of tools can aid in informational findings to enhance your protocol. Make note of the fact that if you come across something that doesn't qualify as a bug but could potentially improve the code, it will often be an informational finding.

## What are Gas Improvements and Non-critical Issues?

"Gas" in the context of blockchain refers to a fee associated with performing certain actions on the Ethereum network. By optimizing the "gas" usage of a function or a contract, you can help to reduce the cost of transactions on the Ethereum network.

For any gas improvements, it's marked as a gas improvement in severity. On the other hand, we have non-critical issues – casually referred to as "non-Crits" or "NCs".

## Categorizing Severity

Each instance can be easily marked with a simple categorizing system. For example, you can note it as 'I' for informational, 'NC' for non-critical, or 'G' for gas improvements. We will take the example of an incorrect documentation case and mark it as 'I', annotating it as the first informational issue with 'I1'. This approach brings clarity when multiple issues are present, providing an organized overview of severities.

In conclusion, to understand the severity of protocol findings, we need to evaluate the impact on funds, disruption level, probability, and classify bugs, improvements, and non-critical issues appropriately.
