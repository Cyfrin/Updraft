---
title: Makefile
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q3tvdSrm2vI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Do you find writing long scripts all the time tedious? Or loathe the idea of having to re-enter your lengthy deployment commands constantly during your project's lifetime? If so, then you're on the right track! As developers, we always strive to work smart, not hard!

As we continue to discuss creation tests, I suggest a slight detour where we can introduce ways to make these often repeated scripts significantly easier. Our saviour: the _Makefile_.

## A Makefile Primer

A makefile is a text file used by the 'make' utility to automate the building and compiling processes of projects. Makefiles are a popular choice among developers due to their ability to streamline workflow drastically.

If you have not done so already, create a new file in your project folder called `makefile`. If everything's correctly installed, typing `make` in your terminal will return `no Targets stop`. If you experience any issues, install 'make' first.

<img src="/foundry-fund-me/20-makefile/makefile1.png" style="width: 100%; height: auto;">

Makefiles, besides their main conveniences, also allow us to include environment variables automatically without having to source them every single time using `source env`.

Our makefiles have the ability to create shortcuts. This way, we don't have to write and remember long scripts every single time. Here's an example of a shortcut.

```makefile
-include .env
build:; forge build
```

With this, `make build` in your terminal will execute `forge build`.

## Deploying to Sepolia: A Detailed Example

Let's now take a more comprehensive example: deploying to Sepolia. Here's the code outline for the makefile content:

```makefile
deploy-sepolia:
    forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url $(SEPOLIA_RPC_URL)
    --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
    --vvvv
```

This command is quite extensive, and the last thing you'd want is to type it out every single time. You can now run the whole code with just: `make deploy-sepolia`.

Note that we're deploying to a real network here, which incurs real costs. Therefore, only run this command if you intend to follow along in deploying your contract.

**Important:** All environment variables in makefiles need to be enclosed using dollar signs and parentheses like so: $(variableName).

To enable automatic verification of our FundMe contracts on EtherScan, we'll need to create our own EtherScan API key. We'll then paste this key and the private key of our dummy account (not your real account), in our `.env file`.

Once the contract is deployed, and you paste the contract's address in folio, you will see that the contract has already been verified. No need to do it yourself on Etherscan, the script's got it covered!

<img src="/foundry-fund-me/20-makefile/makefile2.png" style="width: 100%; height: auto;">

## A Ready-to-Use Makefile Framework

To make setting up makefiles a lot easier, I have prepared a ready-to-use framework. It's available on our course-specific [GitHub repo](https://github.com/Cyfrin/foundry-fund-me-f23/blob/main/Makefile).

This framework is quite expansive and covers a wide range of commonly used make commands. For instance, running `make help` will return a list of command options. To avoid going overboard with detailing makefiles, I strongly recommend you check out the framework and adapt it to your development processes. If you're keen to learn more about makefiles, hop onto your favourite search engine and find some good articles, or simply, Google it!

In conclusion, makefiles are an incredible tool for developers that help to simplify commands and make our workflows much more efficient. Utilize them, and you'll see a significant boost in your productivity. Happy coding!
