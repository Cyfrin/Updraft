---
title: Deploy the lottery on the testnet pt.1

_Follow along with this video:_

---

### Deploying on Anvil using Makefile

One way to deploy everything on a testnet is to use a giant command like `forge script DeployRaffle --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv`. And run this over and over again. It's a legit way of deploying but it's very prone to error and most of the time you end up typing/pasting the same giant string of arguments over and over again. Not cool!

To avoid that mess we will use a `Makefile`. We already introduced this concept in the previous sections, but if you forgot, let me refresh your memory:

The answer for all your troubles is a `Makefile`!

A `Makefile` is a special file used in conjunction with the `make` command in Unix-based systems and some other environments. It provides instructions for automating the process of building software projects.

The main advantages of using a `Makefile` are:

- Automates tasks related to building and deploying your smart contracts.
- Integrates with Foundry commands like `forge build`, `forge test` and `forge script`.
- Can manage dependencies between different smart contract files.
- Streamlines the development workflow by reducing repetitive manual commands.
- Allows you to automatically grab the `.env` contents.

In the root folder of your project create a new file called `Makefile`.

After creating the file run `make` in your terminal.

If you have `make` installed then you should receive the following message:

`make: *** No targets.  Stop`

If you don't get this message you need to install `make`. This is a perfect time to ask your favorite AI to help, but if you still don't manage it please come on the Updraft section of Cyfrin discord and ask the lovely people there.

Open the newly created `Makefile`.

Let's start with `-include .env` on the first line. This way we don't have to call `source .env` every time we want to access something from it.

Next do `.PHONY: all test clean deploy fund help install snapshot format anvil`. This declares that `all`, `test`, `clean`, `deploy`, `fund`, `help`, `install`, `snapshot`, `format`, and `anvil` are phony targets. This means that whenever one of these targets is specified in a make command, make will execute the associated commands without checking for a file or directory with the same name.

Next comes the `help` target:

```
help:
    @echo "Usage:"
    @echo " make deploy [ARGS=...]"
```

To test this one run `make help`.

The next target is `build`:

```
build:; forge build
```
Keep in mind that if you want to use an oneliner then we use `:;` after the target instead of just `:`. Run `make build` in your console to build the project.

The next target is `install`:

```
install:; forge install Cyfrin/foundry-devops@0.1.0 --no-commit && forge install smartcontractkit/chainlink@42c74fcd30969bca26a9aadc07463d1c2f473b8c --no-commit && forge install foundry-rs/forge-std@v1.7.0 --no-commit && forge install transmissions11/solmate@v6 --no-commit
```

In case someone ever clones your repo, they'll just run `make install` and every dependency will be installed for them in a super convenient way.

The next target is `test`:

```
test :; forge test 
```
Run `make test` in your console to test the project.

The next target is `deploy`:

```
deploy:
    @forge script script/DeployRaffle.s.sol:DeployRaffle $(NETWORK_ARGS)
```

The `@` indicates that we don't want this line printed out. We do this because if not used it will print out your private key, and we don't want that.

Every time we use an environment variable in the Makefile we use the dollar sign and paranthesis to flag it as an environment variable. The `forge script` above won't work as is because we don't have any `NETWORK_ARGS` defined. Our main goal is to be able to call the following command `make deploy ARGS="--network sepolia"` and our Makefile to automatically grab the proper Sepolia deployment parameters.

Put the following above your `deploy` target:

```
NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

# if --network sepolia is used, then use sepolia stuff, otherwise anvil stuff
ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(SEPOLIA_PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) --legacy -vvvvv
endif
```

This is how you write a basic if statement in a Makefile. Looking at the code above we can see that we never defined a `DEFAULT_ANVIL_KEY` in our `.evm` or inside our Makefile. Let's define it at the top of our Makefile, right after the `.PHONY` line.

`DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

Create another target called anvil:

`anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1`

Let's test it!

Run `make anvil` which will create a new Anvil instance, and open a new terminal window by clicking on the `+` button on the right of your existing terminal window. Then run `make deploy`.

This should deploy our `Raffle` contract on the Anvil instance we just created.

Amazing work! Let's continue our Sepolia deployment in the next lesson.