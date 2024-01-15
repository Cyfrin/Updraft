---
title: Phase 1: Scoping
---

_Follow along with the video lesson:_



---

# Kick-starting our Security Audit: The Boss Bridge Project Case Study

In this extensive blog post, we're going to dive into the world of security auditing, using an example project: Boss Bridge. We'll begin in a familiar place, assuming you've just downloaded the project through GitHub, opened a fresh VS Code window, and you're ready to explore.

## Getting Started: The Importance of Pre-boarding

When auditing any project’s codebase, a key step in your preparation should be notetaking: scribbling down your thoughts, ideas and key points in your 'notes' section or equivalent. Think of it as your own personal checkpoint system.

As you delve further into the codebase, your entity list should grow into a robust compilation. This helps keep track of vulnerabilities, concepts to revisit, and potential threat vectors that could minimise attacks. Just like a detective unravelling the clues, your notes provide the foundation of a thorough investigation.

## Understanding the project scope

Once you've downloaded the code, the next step is to determine the overall project scope. Begin by investigating the 'src' folder, opening the README file, and understand its core facets.

![](https://cdn.videotap.com/Z6FwLQhDRCyW6ZPk1OQ4-80.11.png)

To determine the full extent of the project, you'll need to scrutinize the audit scope details particularly. Here, you'll uncover details of the commit hash, the contracts and tokens, any unusual behaviors, and even the expected deployment chains.

### Holler Out for More Information

Don't hesitate to reach out if you need additional data. Developing a comprehensive understanding of this project is pivotal, and while speed is critical, you want to ensure you aren't missing critical elements. Request more diagrams, data, and subsequent supporting information as needed.

### An Overview of the Contracts

From our initial study, we gather that our contracts will deploy to the Ethereum Mainnet. Interestingly, we're deploying a new entity, `tokenfactory.sol`, for the first time to ZKsync era.

![](https://cdn.videotap.com/SYHd0AD9SPTDOeE3c8j6-148.78.png)

You will notice several roles or 'actors', one of which has the authority to pause and unpause the bridge in event of an emergency - a common design pattern known as the Emergency Stop pattern.

## Acknowledging known issues

From the outset, it's evident that there's an element of centralization with the project. This sort of authority vested with an individual or a single entity has its own pros and cons. On one hand, it's beneficial for effective and quick resolution of discrepancies. On the other, it tends to undermine the fundamental principle of blockchain's decentralization. However, such centrality aspects could be disregarded in a competitive audit.

Upon further review, we notice that zero-address checking seems to be intentionally disabled, presumably to save gas. Also, there are some magic numbers that, instead of being recognized as constants, have been distinguished as literals.

Despite these hiccups, it's clear that the protocol has a decent understanding of 'weird ERC20s'. They've incorporated `make slither` and `make aderyn` into the codebase as tools, key signs of protocol's awareness towards security.

## Checking Code Coverage

To get an idea of the code coverage, we need to install the necessary libraries and run `forge coverage`. While our coverage might not be exhaustive, it could be considerably better. The `tokenfactory` is fully covered. However, the `vault` entity misses out entirely, which might result in several attack vectors.

![](https://cdn.videotap.com/gS0LrDyx1XBys7mxdaUB-240.33.png)

In such scenarios, stateful fuzzing test suites could compensate for the shortcoming in manual reviews. At the moment, this approach is increasingly becoming a standard requirement for security.

## Running Solidity Metrics

Finally, as part of your project scope, remember to run a couple of tools – even if it blurs into vulnerability identification. This instance of the project has a complexity score of 106 and 101 lines of code – nearly half the size of the Thunder Loan project, which makes it quite simple to work through.

With this comprehensive understanding of the README and documentation, it's time to start your reconnaissance. From here on, with the context you've gained from the project scope, you're ready to probe further and uncover potential vulnerabilities and exploits.

Happy auditing!
