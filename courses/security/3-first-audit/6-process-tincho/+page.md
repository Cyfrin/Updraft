---
title: The Audit Process With Tincho
---

_Follow along with this video:_



---

### Meet Master Tincho

Master Tincho is a part of Redgill, a firm specializing in smart contracts and EVM security. Tincho and the Red Guild are dedicated to ensuring security in the EVM space, and frequently contribute their wealth of knowledge, expertise, and passion to the community.

He has previously served as the lead auditor at the security firm OpenZeppelin and has graciously agreed to share his unique approach to performing security reviews on codebases. He was instrumental in the creation of this course and we owe him a huge round of applause for that!

Now, are you ready to learn from the best?

### The Tincho Auditing Method

To illustrate the Tincho auditing method, we're going to refer to a video where Tincho performs a live auditing of the Ethereum Name Service (ENS). "Auditing ENS! That sounds complex", you might be thinking. Well, fear not as we'll break this down into bite-sized pieces of easy-to-digest information.

> "I don't have a super formal auditing process. I will just show you briefly some things that I do..." - Tincho

First things first, let's clone the ENS repository into our local development environment and begin the mad reading.

#### Reading... Reading... More Reading

Before diving into the code, familiarize yourself with some jargon that you might come across often in the code, such as what a registry or a resolver is - things that you'll gain understanding about as you read through the documentation.

#### Tool Time

Now let's move onto some handy tools for auditing:

- **VS Codeium**: Tincho's text-editor of choice. It is a 'more-private' spin-off from VS Code that respects your data privacy.
- **Clock**: A simple command-line utility that helps count lines of code which can give a sense of the complexity of different parts of the codebase.
- **Solidity Metric**: Another tool developed by consensus that provides useful metrics about your Solidity codebase.

Once you get your initial overview, it's time to roll up your sleeves and dive deeper into the codes.

> "I would advise to keep the clients at hand. Ask questions, but also be detached enough." - Tincho

### Audit, Review, Audit, Repeat

Keeping a record of your work is crucial in this process. Tincho recommends taking notes directly in the code and maintaining a separate file for raw notes and ideas.

Remember, there is always a risk of diving too deep into just one part of the code and losing the big picture. So, remember to pop back up and keep an eye on the over-all review of the code base.

One distinct part of the Tincho method is writing proof-of-concept (POC) exploits via Solidity tests in his preferred test environment, Foundry. This quickly verifies or falsifies any hunches about possible vulnerabilities.

At this stage of the process, keeping an open line of communication with the client is key. Often times they will have much more context on why certain things were coded the way they were.

Remember, the goal is not to trust completely, but to validate.

### Wrapping it All Up

After your audit, it's time to neatly present your findings in a report. Note that your work isn't over once the report has been handed over. The client will go back, make the necessary fixes based on your suggestions and return to you with the updated code.

Your final responsibility is to ensure that these fixes effectively correct the earlier identified vulnerabilities and that they didn't inadvertently introduce new ones.

### Aftermath of a Missed Vulnerability

There will always be the fear of missing out on some vulnerabilities and instead of worrying about the cracks that slip through the net, aim to bring value beyond just identifying vulnerabilities. Imbibe the thought that even if you missed a critical vulnerability, the value you delivered was worth it.

A last takeaway from Tincho:

> "Knowing that you’re doing your best in that, knowing that you’re putting your best effort every day, growing your skills, learning grows an intuition and experience in you."

With that, we conclude our detailed examination of the Tincho style of auditing in the EVM ecosystem. I hope you enjoyed learning about this process just as much as I enjoyed presenting it to you.

Stay tuned for more content geared towards making you the best auditor you can be. Until next time, folks!
