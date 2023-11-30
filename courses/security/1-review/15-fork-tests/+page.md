---
title: Fork Tests & Congrats!
---

_follow along with the video_

<iframe width="560" height="315" src="https://www.youtube.com/embed/emQTINQDalU?si=0aXzA4jV4GgtD3wj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome to our in-depth guide on how to run fork tests or mainnet fork tests. In a nutshell, fork tests help us create a simulated local version of mainnet to execute tests, thereby eliminating the need to include all contract addresses. Today, our walkthrough will show you how to accomplish this smoothly.

## Fork Testing with Alchemy URL

First off, we need to run the forage test. Simply type `forage test F` or `fork`, and add a URL such as Mainnet. By doing so, we create a pseudo-local version of Mainnet and run specific tests against it.

To acquire your Alchemy URL, simply visit Alchemy's website (Alchemy.com) and navigate to relevant sections. Remember, this URL is not for actual forking, but for fork testing.

```shell
ExampleforkURL = "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```

If this process does not work, set your Alchemy URL in the `.env` file.

```md
FORK_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key
```

)## Working with Mainnet Contracts Locally

Running `forge test --fork-url $MAINNET_RPC_URL`, lets you interact and work with mainnet contracts locally without deploying anything. This can save you considerable time and resources.

## Useful Resources &amp; Exercises

If any concepts covered in this blog post seem confusing or new to you, take a moment to check out the Foundry Full Course here on Updraft to get the most recent Foundry course that suits your needs. These resources will expedite your learning and help you solidify the fundamental concepts.

Before signing off, I'd encourage you to join the [Cyfrin Discord](https://discord.com/invite/NhVAmtvnzr). This is an excellent platforms where you can connect, collaborate, and share insights with a diverse group of people working on similar projects.

The final lesson: take a breather and well-deserved coffee break. Our next section will delve deeper into smart contract audits and security reviews.

"Congratulations on finishing the refresher. You're now ready to embark on the fascinating journey of smart contract security auditing. Buckle up. It's going to be an exciting ride!"
