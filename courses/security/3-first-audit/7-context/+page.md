---
title: Recon - Getting Context
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/NPoji_Z0hvs?si=csXiUkrzdqJAUoYQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## First Step: Understanding The Codebase

The first thing we must do is clone the repository, centralising all our resources. After successfully cloning the repo, our mission is to understand the _raison d'être_ of the code base. To do this, we'll utilize the 'doc'—an informational guide that deciphers a program's intentions and functionalities.

1. Start by opening the 'docs'.
2. If you’re using a Mac, hit `CTRL + SHIFT + V` to enter the README view state.
3. Don’t worry if you're not a Mac user: open the command palette and enter `markdown open preview` to view README in its shining glory.

_Quick tip: Check if an extension must be installed for Vs code if it's not working for you._

<img src="/security-section-3/7-context/context1.png" style="width: 100%; height: auto;">

Perusing through the docs, we can deduce that this operates as a smart contract application for storing passwords. Here's how it functions: users can securely store their passwords and retrieve them later, with the assurance that unwanted entities won't gain access to them.

Great! Now we have context and enough background info to start thinking of potential attack vectors. For instance, is there a vulnerability in the code that might make it possible for unauthorized individuals to access the stored passwords?

## Next Phase: Scoping Out The Files

Our next step involves an indispensable tool: Solidity Metrics. This extension is integral to exploring our codebase, identifying file lengths, capturing the call graph, and more.

1. Find Solidity Metrics on the Visual Studio code marketplace.
2. Once installed, right-click on the visuals of the files and select 'Run Solidity Metrics'. After this action, a report will be generated.

_Further Quick Tip: If you're a Windows user, employ the Ctrl+Click method._

After generating the report, navigate to the command palette and locate 'export this metrics report'. Once exported, you'll have HTML access to the report for future reference.

Applying Tincho's methodology to this process, we can:

1. Scroll down to the section containing the various files and their lengths.
2. Copy this info and paste it onto any platform that allows for easy viewing and comparison— like Google Sheets or Notion.

Please note that if your codebase contains a solitary file like ours, this step won't be necessary.

Nevertheless, Solidity Metrics showcases its versatility and potency when dealing with Solidity codes. It effortlessly weeds out any node modules, tests, libraries while concurrently enriching the user experience with its easy-to-navigate interface - case in point, the inheritance graph, the call graph, and the contracts summary.

> “Public and external functions are going to be the ones that people can actually call. So these are going to be the ones that if a hacker wants to attack this, these are probably the functions that they're going to call.”

Understanding your codebase and its functionalities is the first step towards securing it.

## Moving Forward: Time for Detailed Recon

Now that we've used Solidity Metrics to understand the project codebase, we can identify potential security issues and verify the uncertainty around external access points. Let's walk through the codebase of the SRC password store.

Tune in to the next blog post to continue with me on this walkthrough of the code base, where we’ll be exploring potential vulnerabilities and strengthening our codebase. This is only the beginning: stay curious, and keep learning!
