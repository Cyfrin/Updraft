---
title: Tooling - Aderyn
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/XPf_TjwsnjU" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Introducing Aderyn: A Rust Based Static Analysis Tool

In this blog post, we are going to dive into the nitty-gritty of a tool by name Aderyn, a handy static analysis tool for smart contracts. Created by Alex Roan, an established name in the realm of smart contract development, Aderyn adds to the cryptic dimension of the Rust programming language.

To effectively get started with Aderyn, it's essential that you have Rust installed. Although the installation process of Rust won't be illustrated here, there are abundant online resources that can guide you.

Once Rust is installed, you're a step away from running Aderyn. Simply use the command `cargo install Aderyn`.

## Installation of Aderyn

Make sure your terminal or console is clear. If not, type `clear` to have a crisp console. Next, you are to run `cargo install Aderyn`. This command installs the Aderyn tool.

A thing to note: Aderyn does not need reinstallation if it's already installed. You'll be informed on the terminal that Aderyn is already installed, as seen in the example below:

![](https://cdn.videotap.com/pnFtrBJS6gg7wF4fAor8-17.29.png)## Running Aderyn

To run Aderyn, the command is `Aderyn root` along with the path leading to your Foundry or Hardhat project. Since we're at the root directory in our case, we're going to use a little dot (.) as our path.

> `Aderyn root .`

The command mentioned above will recompile all the contracts, giving out compilation warnings just like any other code compiler.

## Generating the Audit Report

At the end of the recompilation phase, the console will provide interesting information: `report printed to report.md` .

The `report.md` mentioned is a Markdown file where Aderyn prints the audit report of your smart contract.

Navigating to the `report.md` file will header you to an almost ready audit report of your smart contract in the intuitive Markdown format.

Below is how the audit report looked:

![](https://cdn.videotap.com/aZCpkdjtzg2vgNCWYwi2-49.41.png)## Exploring the Audit Report

When previewed, the Markdown file shows the vulnerabilities categorized into 'medium', 'low', and 'non-or-information'.

- Medium issues are the ones that have moderate impact and are to be solved on a higher priority.
- Low issues, as the name suggests, are of less priority but it's recommended to have them fixed for better performance of the smart contract.
- Non or Informative issues are ones that do not pose any direct threat to the smart contract but improving them can enhance the overall performance.

Aderyn does a pretty good job of segmenting these vulnerabilities, then marking them up for you to address in your audit report.

Don't worry if it feels overwhelming. In forthcoming posts, we'll be taking a deep dive into each of these issues, how to resolve them and even potentially avoid them in your smart contract code.

Stay tuned!

## Conclusion

Fast, efficient and intelligent, Aderyn offers a swift audit report of your smart contracts which is almost ready to be presented. Aesthetically neat and structurally organized, the tool is a quick starter for anyone looking to audit a smart contract. Keep exploring!
