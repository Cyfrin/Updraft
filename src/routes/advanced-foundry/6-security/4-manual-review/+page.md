---
title: Manual Review
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/_8zvmg-vG1I?si=8UXR53HEzIemjjBN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Step-By-Step Guide: How to Audit DeFi with Tincho

This blog post is a detailed reflection of an interview with Tincho, an Ethereum security researcher, a former lead auditor at Openzeppelin, and the creator of Damn Vulnerable DeFi. His vast expertise in DeFi auditing makes him a wealth of knowledge for anyone interested in Ethereum or blockchain security.

## Embracing the Audit Process

This is Tincho, an Ethereum security researcher and creator of Damn Vulnerable DeFi. In today's blog post, we are going to discuss the auditing process in detail. Now, it's crucial to understand that auditing does not necessarily have a 'one-size-fits-all" approach. We all have our own ways of making things work and what I'll lay out in this blog post are my go-to strategies. Without further ado, let's take a dive into the world of Defi auditing.

## Getting Started: Exploring Repositories and Reading Documentations

To begin with, you need to have a clear understanding of what you're dealing with. Hence, we'll pick the Ethereum Name Service (ENS) GitHub repository for a mock auditing in this blog post.

Here's what I recommend:

- **Clone-The-Repo-First**: Fork the repository to your local development environment.
- **Visit The Documentation**: Understanding the architecture of what you're reviewing is key. Familiarize yourself with the terms and the concepts used.

<img src="/auditing-intro/4-review/review1.png" alt="Auditing Image" style="width: 100%; height: auto;">

## Reviewing Audit Reports and Setting Command Line Utility

_Auditing ENS's GitHub Repository_

Having looked at the documentation and the architecture, let's go back to auditing the ENS's repository on GitHub. Note that the repository contains multiple contracts and ENS uses hardhat for development. Although I prefer projects that use foundry over hardhat, it would not be an impediment for auditing.

To acknowledge the complexity of the code, you need to count the lines of code. For this, I usually use a command-line utility called _Clock_ and save the output in the form of a CSV which is later fed into the spreadsheet.

**Solidity Metrics**: Another tool to scope the complexity of a file is 'Solidity Metrics' developed by Consensus. You can run this on your project and it will provide you with a detailed report of the levels of complexity.

<img src="/auditing-intro/4-review/review2.png" alt="Auditing Image" style="width: 100%; height: auto;">

## Organizing Audit Process and Taking Notes

As a part of your audit process, prioritize the contracts according to their complexity using tools like solidity metrics or clock. Move your contracts from the 'Not Started' phase to 'In Progress' and then 'Completed'. This aids tremendously in keeping the audit process on track, especially when working in teams.

While auditing, you might need to dive deep into certain aspects of the system and it is important to take notes of your observations. Whether you take notes in the code, a news file or a note-taking plugin, it helps in keeping track of your thoughts.

<img src="/auditing-intro/4-review/review3.png" alt="Auditing Image" style="width: 100%; height: auto;">

An auditor needs to continuously brainstorm about potential breaches and weak points. Often this process won't follow a fixed path and will be influenced by the auditor's own experience and knowledge. This includes keeping in mind the different forms of attacks, identifying quickly anything that's out of place, and reading others' vulnerability reports.

## Understanding the Testing Environment and The Importance of Communication

It's significant to realize that you might need to test things during the audit. For complex setups, you might have to adapt to the actual testing environment of the project. Additionally, communication with your clients is key. They understand the intent of the system better than anyone. Seek help when in doubt but also maintain a degree of detachment as you are the expert they are counting on.

Once the client reassures you that the issues have been fixed, review those fixes to make sure no new bugs have been introduced. Concurrently, prepare your audit report clearly mentioning all your findings and observations.

<img src="/auditing-intro/4-review/review4.png" alt="Auditing Image" style="width: 100%; height: auto;">

## Beware of the 'Perfect Auditor' Fallacy

Remember, no auditor is perfect and can claim to find every vulnerability. It's the collective responsibility of the client and the auditor to ensure code security. It's absolutely normal for some vulnerabilities to be missed. However, that doesn't mean you take your job lightly. Stay diligent in your task and keep growing your skills.

<img src="/auditing-intro/4-review/review5.png" alt="Auditing Image" style="width: 100%; height: auto;">

If despite your best efforts, an audit fails and your client's code gets hacked, remember it isn't entirely your fault. The blame should be shared by both parties. As an auditor, your role is to provide a valuable security code review, irrespective of whether you find a critical issue.

And that sums up our auditing journey. Thank you for accompanying me on this. I hope it has been enriching for you and will aid you in your auditing adventures. Until next time!

[Link to the full interview](https://www.youtube.com/watch?v=bYdiF06SLWc&t=0s)

That was it for this lesson, we hope you enjoyed it! Happy learning!
