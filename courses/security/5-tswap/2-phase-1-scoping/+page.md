---
title: Phase 1 - Scoping
---

_Follow along with this video:_



---

## Cloning the Repo

First things first, let's clone the repository into our security course directory as usual. Opening the repository link in a new tab, we copy the URL and perform a standard `git clone`. Let's paste this into our command line

```bash
git clone https://github.com/Cyfrin/5-t-swap-audit
```

This opens the 5 TSWAP audit into its own unique folder—an essential process for good workflow and code organization. To verify that all is well and we are on the correct branch, we run `git branch`.

As expected, we are on the main branch. This serves as our starting point for this eye-opening security review.

![](https://cdn.videotap.com/3aVlKcGZ2t6Didb1YvL3-95.09.png)

## Extensive Onboarding: Why It's Key

As we revisit the well-known Puppy Raffle, whose initial setup used basic onboarding, we delve into the importance of extensive onboarding, particularly for a TSWAP audit.

Through this review, you'll realize why taking the time to answer extensive onboarding questions is so crucial. The information collected in this process becomes a treasure trove for any security review—more so if questions are as painstakingly detailed as possible. That's why you want to gather as much information as possible, get your fingers everywhere credible!

## Gathering the Important Data

Our onboarding sheet collects basic information such as the website URL, which could have a wealth of information. It also enforces the absolute necessity of associated documentation—a critical pillar for achieving any successful code review.

For our TSWAP audit, the README file plays a pivotal role as our most accessible source of documentation. We also capture the point of contact, white paper, and commit hash.

On a regular audit, we'd swap branches to the commit hash to ensure we're working on an identical codebase through the command `git checkout "[paste commit hash here]"`. In this tutorial, however, we'll stick with the main branch.

## Checking Codebase Size and Interactions

Our TSWAP repository has two contracts in scope: Pool Factory and TSWAP. A scroll through the SRC shows that these are the only contracts in action, with a SLOC (Source Lines of Code) of 374. This figure, being double the size of our previous Puppy Raffle review, gives us a mental image of review duration based on code length and complexity.

We head into uncharted waters with a crucial question: How many external protocols does the code interact with? Though new to this discourse, you'll discover the answer's importance in due course.

## Test Coverage: A Total Nightmare

A cursory look at the test coverage (a dismal 41%) sets off alarm bells. By delving into the README file and running `make` on our command-line interface—watching as it triggers installations—we can see the extent of the test coverage—the bedrock of any software project.

![](https://cdn.videotap.com/CsI8uiOgGgscAECYBaRW-297.16.png)After a round of `forge coverage`, we cringe at the test coverage results. A low coverage figure, such as the 40% and 37% for functions and branches respectively that we are staring at, is a bright red flag for bugs galore!

Once this alarming discovery is made, we must revert to the main branch using the commands `git stash` and `git checkout main`. We must also run `make` to commence another series of installations.

No sooner are these installations done that we return to business—our comprehensive onboarding documentation.

## Scope, Scope File and Building Protocol Context

Our review scope is now clear: the Pool Factory and TSWAP. With commands `make scope`, and `make scope file` we generate an output and file that are incredibly compatible with pandoc—a documentation generation tool we love.

Now that the scope is clarified, we delve deeper into protocol understanding. Here, we ask questions like whether the project is a fork of an existing protocol, or if it uses rollups. Such queries, though seemingly unrelated to the immediate task, bear great significance later in the course.

In our case, our protocol is a new standalone rather than a fork of an existing one (Uniswap V1 for this instance). It doesn't use rollups or have multi-chain functionalities. It operates exclusively on Ethereum, sans the use of oracles or zero-knowledge proofs. It does interact with ERC20 tokens though, a factor you will get a clear understanding of once we delve into the protocol explanation.

## More Onboarding Questions

During protocol onboarding, it's essential to engage in a deep and meaningful conversation with the protocol team about protocol risks. Questions about rogue protocol admin capturing fees, inflationary deflationary ERC20, fiat transfer tokens, and rebasing tokens will often receive dismissive or uninformed responses.

Protocols will often deny known issues or prior audits, as seen in our onboarding document. These points, however, form a vital part of building context resources, hence their import.

The README file plays a crucial role in this process but often falls short in providing adequate information. At this point, you'd reach out to the protocol team requesting walkthroughs, explainer videos, charts, or even a blog post—anything to build up an adequate information base.

Remember, the developers of a protocol always possess more context than you'll ever get from code alone. Thus, asking them questions will accelerate your understanding. While it's critical to trudge through the codebase independently, reaching out when stuck can lead to faster solutions.

Notwithstanding, remember to use the protocol team's time wisely and avoid asking basic questions like "what's UN 256". Your questions should reflect a deep understanding of the protocol and be geared towards obtaining further understanding.

## Wrapping Up

Our extensive onboarding not only prompts critical questions but also provides ready answers where possible. Obtaining answers to 'rec test' questions and understanding their post-deployment plans is easier when conducting a private audit. However, in a competitive audit setting, this information might not come as readily.

In summary, this T-SWAP audit tutorial shows just how comprehensive and detailed a security review can be. From cloning repositories and capturing enormous amounts of data to conversing with the protocol team about potential risks—every stage carries its weight of importance. So, buckle up, ask questions, and dig into those reviews with gusto!

Keep an eye on this space, and let's explore more interesting protocols next time.
