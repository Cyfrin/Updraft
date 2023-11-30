---
title: Assessing Highs
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/NtEwjvnLfvA?si=sxn--jMYYOeENrJG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# How to Evaluate Finding Severity: Hands-On on VS Code

Welcome to the definitive guide on evaluating the _severity_ of your findings. Specifically, we will be drawing examples from storing a password on-chain and finding potential vulnerabilities. By the end of this journey, you'll understand the process of assessing your findings and identifying their severity.

## Understanding the Structure

Here we are, on our findings page, keen to figure out how we evaluate severity.

![](https://cdn.videotap.com/uKAm9nbZqqFSb0JpwSD2-30.14.png)

Within Vs code, a nifty little drop down helps us to collapse the findings for easy visibility. This feature provides a more consolidated view for efficiency.

However, in case your dropdown keeps auto uncollapsing, apprehend the scenario. This blog piece has been built using an approach that still presents the collapsed view for clarity.

## Dissecting Storing Password On-Chain

Let's set the stage with our first finding. Storing the password on-chain is a strategy that makes it visible to anyone, thereby stripping it of its private status.

Ranking severity requires us to consider two major aspects: **likelihood and impact**.

### Looking at Impact

What does it _criticality_ of making the password public hold? Does it put funds directly at risk? It does not. However, does it cause a severe disruption of the protocol functionality or availability? The answer is a resounding yes.

The core purpose of a password store protocol is ensuring password safety on-chain. So, when this is disrupted or diminished, we're looking at a high potential impact. This situation will undoubtedly tip towards higher severity.

```markdown
Quote: "The impact of storing the password on-chain corresponds to high severity. It severely disrupts the protocol functionality"
```

### Understanding Likelihood

But what is the probability of this mishap? The feasibility of a hacker directly calling this function, extracting money, or breaking the protocol? Indeed, it seems rather easy for this to happen. In the worst-case scenario, passwords stored on-chain could be read off-chain by anyone at any given moment. Hence, _likelihood_ maps to high in this case.

High impact and high likelihood, you might know, translates to _critical severity_.

But we'll just denote this with an _H_ for high impact and high likelihood, signaling a high severity. This way, our first finding is:

```plaintext
["1"]: H - Storing the password on-chain makes it visible to anyone, stripping it of its private status.
```

Practically, 'findings' range from high, medium, to low. The worst players are ranked higher, but this trend is more of a rule of thumb and can change based on context.

## Examining Password Store Set

Next, let's explore another scenario. What if the password store set has no access controls? The impact might look something like a non-owner being able to change the password. It's another disruption of the protocol functionality. Scroll down to learn more.

If any random person sets a password and then another comes to change it at their will, we're indeed looking at another situation with high impact.

Surprisingly, this ploy is not too implausible to pull off. Any budding hacker merely needs to call the '_set password_' function, plug in a new password, and viola, the password has been altered!

Echoing our previous finding, the likelihood of this event is high, making severity palpable.

Irrefutably, this severity is also high. In the scope of this blog, this would be noted as:

```plaintext
["2"]: H - Password store set has no access controls; a non-owner can alter the password.
```

Our second high-severity bug!

Discussing severity, it's important to mention that our first finding outweighs this in severity. It entirely undermines the purpose of the protocol, but this, too, is significantly harmful.

## Investigating Incorrect Natspec

At last, we have landed on our final finding. If the password store's get-password NatSpec indicates a non-existent parameter, the NatSpec ends up incorrect.

Let's follow the same procedure to evaluate its impact. What-acould-go-wrong with incorrect documentation in the context of severity? Find out in the next section!
