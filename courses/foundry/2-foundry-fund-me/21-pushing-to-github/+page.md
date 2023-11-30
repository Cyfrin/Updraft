---
title: Pushing to GitHub
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/OlxnxWLC4dQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome fellow developers! In today's lesson, I'll guide you in pushing your work to GitHub using a badass GitHub repo. This action is the concluding step of your project. However, the first thing we want to ensure is that `env` is included in your `.gitignore`. Adding `broadcast` is a personal practice, and I advise you to do the same. The rationale behind this is avoiding a public push of anything inferior to GitHub.

Sometimes, it's beneficial to leave `lib` out, something that I plan to do here as well. The key take-home is learning to push code to GitHub. We are employing hardhat freeCodeCamp because it was used in one of my previous videos and we are kick-starting from an entirely blank GitHub.

Please note that the application of GitHub, coupled with git and version control, is crucial to the majority of crypto-community interactions and collaboration methods.

## Open Source and the Crypto Community

<img src="/foundry-fund-me/21-github/github1.png" style="width: 100%; height: auto;">

With the open-source nature of web3 and crypto, all the smart contracts you create or use are visible. You can scrutinize the code, learn from it and develop your skills.

<img src="/foundry-fund-me/21-github/github2.png" style="width: 100%; height: auto;">

If you are eager to contribute, most of these protocols present grants and will recompense you for your contribution to their code. Alternatively, if you're keen on acquiring knowledge, you can generate pull requests to the codebases.

When I was new to web three, one of the potent approaches I applied was making contributions to the Brownie Repo, a Pythonic smart contract framework aligned with Foundry. This process accelerated my learning and enabled me to interact and connect with several individuals in the community. Remember, GitHub profiles are crucial when applying for jobs. Hence, do your best to make your profile stand out.

## GitHub and Decentralized Git Solutions

Although GitHub is a centralized company, there are several decentralized git solutions presently under development. However, none of these are currently popular. If you want to get started or want a quick start, [GitHub docs](https://docs.github.com/en) provides numerous sets of documentation which you can refer to.

You should have a GitHub profile already set up. If you want to create a repo, you can utilize the 'Create a repo' section. Here, you'll learn to establish a repo directly via the website.

However, creating a repo from the command line is advisable because it enables you to work without logging onto the internet every time you change your code.

This process involves following a specific documentation called adding locally-hosted code to GitHub. As the name suggests, we want to push our locally-hosted code to GitHub.

Before proceeding further, ensure that Git is installed on your device. Directions on how to install Git can be found [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

A successful installation would display the Git version when `git version` is run. In case it doesn't, pause and install Git. You can utilize chatgbt, an AI tool, to help troubleshoot any installation issues.

With Git installed, you can access all of the features of Git, such as commits and logs. Use `git status` to view your repository status and `git log` to view a history of your commits.

## Pushing Code to GitHub

Use the command `git add .` to add all the folders and all the files to your git status, except for the ones in the git ignore. After adding the files, use `git status` to see what files and folders will be pushed to GitHub. Furthermore, do remember to check if the `env` is included or any sensitive information is included.

The next step involves committing your tasks. You can use `git commit -m "your message`" to commit your tasks. After committing, use `git status` to view your commits. With everything in order, the last step is to push the commit to GitHub using `git push origin main`. In case of any errors, employ chatgbt or any other AI to help troubleshoot the problem.

Voila! By now, your project should be visible on your Github repository.

## Updating the README

An often overlooked yet important aspect is updating your README file. It should include an 'About' section explaining your project and a 'Getting Started' section detailing the requirements and quick start instructions.

Once you have filled out your README, commit it to your repository using `git add .`, `git commit -m "updated README"`, `git push`.

Without a doubt, completing these steps successfully is worthy of celebration. Feel free to share your success and excitement with the developer community on social media. Remember, celebrating small wins on your journey is instrumental to maintaining motivation and enjoying your coding journey.

That's all the instructions you need to push your project on GitHub with Hardhat FreeCodeCamp. Keep practicing, keep pushing code, and soon enough, you'll be confident in using Git!
