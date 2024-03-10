---
title: Testnet Demo with a Makefile
---

_Follow along with this lesson and watch the video below:_



---

The value of testing cannot be overstated when it comes to developing robust and reliable code. We've been discussing the importance of intensive testing, but today, we will explore whether the code we've been testing actually works on a real main net, or a real test net. Let's dive right in!

## Let's Run Our Forge Script

Usually, we'd opt to run our forge script to verify if our test data holds up on actual main or test nets. However, in this case, we're taking a slightly different route because we can automate this process using a `Makefile`.

```makefile
-include .env

.PHONY all test deploy

```

## Automating Tasks with Makefile

The idea behind using a Makefile is to define all the commands we want to execute in our file. Including `env` allows our Makefile to be aware of our EMV environment variable. The `phony` all test deploy ensures that these are targets for our Makefile.

### Adding a Help Function to Our Makefile

A Makefile can get complicated as we add more commands and scripts. To help newbies or even ourselves in the future, we can add a small `help` command that explains how to use the Makefile.

```makefile
    help: @echo "Usage:"
          @echo "make deploy [ARGS=...]"
```

Calling `make help` in the terminal will now provide a quick usage guide. Pro-tip: make sure to spell 'usage' correctly!

## Building the Project

In the Makefile, adding a target `build` allows us to compile or build our project with `make build` or `forge build`. Remember, `:` and `;` mean the command is equivalent to a new line command.

```makefile
build:; forge build
```

The Makefile will produce an error if we haven't set the version of solidity in the 'interaction test t sol file. Therefore, we do that with `Pragma solidity 0.8.18 build`.

## Installing Dependencies

We also need to add an `install` command in the Makefile. This function lets anyone who clones our project know what dependencies they need to install. Here's how you can add this to your Makefile:

```makefile
install :; forge install Cyfrin/foundry-devops@0.0.11 --no-commit && forge install smartcontractkit/chainlink-brownie-contracts@0.6.1 --no-commit && forge install foundry-rs/forge-std@v1.5.3 --no-commit && forge install transmissions11/solmate@v6 --no-commit
```

As we want the resultant text to be clean, we can use the 'toggle word wrap' option. This operation wraps any long command into multiple lines, giving the appearance of multiple different lines, whereas it technically remains a single line command.

Pulling up the terminal with `make install` reinstalls all the packages we ran with `forge install`, aiding efficiency of our process.

## The Test and Deploy Targets

Here, we add a `test` target, a necessary function in our Makefile, which simply calls `forge test.` Then, we define the `deploy` target.

```makefile
test :; forge test
deploy:
	@forge script script/DeployRaffle.s.sol:DeployRaffle $(NETWORK_ARGS)
```

This makes our deployment process easier and organized as opposed to running a giant line command each time we need to deploy our contracts. Note that `forge script` followed by the path tells Foundry to use the `run` function in whichever contract we've specified.

<img src="/foundry-lottery/33-makefile/makefile1.png" style="width: 100%; height: auto;">

## If Else Statement in Makefile

We want our Makefile to select a different chain based on the ARGS we pass. Thus, we define an `if else` statement that checks for network Sepolia. If it exists, the Makefile uses Sepolia; otherwise, it defaults to Anvil.

```makefile
ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif
```

We can verify if this works by running `make deploy` in the terminal, which should display the actual script output. Suppose we choose not to pass the network, Anvil will be selected by default. Adding "@" prevents the command from being printed, thus protecting the security of our private key.

## Conclusion

Testing may seem tedious and kind of 'too much hassle' to put into our efforts, but it's worth it. Not only does it save us from dire situations, but it also gives an assurance that our code is strong enough to perform in real-life scenarios.

Makefile provides a great way to automate many of these testing processes and to make your life much easier. In future posts, we'll delve deeper into the power of Makefiles. For now, experiment with testing, and happy coding!
