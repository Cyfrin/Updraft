---
title: Deploying Huff in foundry - Foundry-huff
---

---

# Deploying Huff Smart Contracts with Foundry: A Comprehensive Guide

Smart contract development is an exciting frontier, with new languages like Huff pushing boundaries. If you’re keen to dive into crafting smart contracts, you’ve come to the right place! This 2,000 word guide will take you through deploying a Huff smart contract in Foundry.

## Getting Started with the Foundry Huff Extension

To deploy Huff contracts in Foundry, we need the Foundry Huff extension. You can find installation instructions and a download link in the course GitHub repo.

With Huff installed, run:

```
forge install huff-language/foundry-huff
```

Behind the scenes, this extension handles compiling Huff code to EVM bytecode for Foundry to deploy. It does so by running the `huffc` compiler and passing the output to Foundry.

Since Foundry executes `huffc`, we need to set `FFI=true` in the Foundry configuration. This grants Foundry elevated permissions to run complex operations, so use it judiciously!

We also need to add a remapping to point Foundry to Huff's resources:

```
foundry-huff=lib/Foundry-Huff/src
```

## Importing and Deploying with the Huff Deployer

With the extension set up, import the Huff Deployer contract, our ticket to smooth deployments:

```js
import "foundry-huff/HuffDeployer.sol";
```

Then, deploy your Huff contract:

```js
HorseStore huffDeployer = new HuffDeployer.config.deploy("HorseStoreHuff");
```

The path syntax takes some explaining. It assumes contracts live in `src` so you can omit that. It also assumes a `.huff` extension by default. So our file path becomes:

```
"HorseStoreV1/Horsestore"
```

This neatly wraps contract deployment so Foundry can work its magic!

## Testing Huff Contracts Thoroughly

With our `HorseStore` contract deployed, we gain two robust test suites - Huff and Solidity. Run `forge test` and they’ll execute in succession, covering all bases.

If issues arise, test Huff files separately with:

```shell
forge test --match-path *huff*
```

This isolates the problem for smoother debugging.

## Digging Deeper into the Huff Deployer Contract

The Huff Deployer abstracts away deployment intricacies, but understanding its internals is worthwhile for aspiring blockchain developers.

Its key lies in the `_deploy` function which handles compiling Huff to EVM bytecode. It does so by:

1. Calling out to the `huffc` binary to compile Huff code
2. Writing the bytecode output to a file
3. Loading this file for Foundry to pick up

The compiler call passes args like contract name, file path, and optimization runs. It looks like:

```js
bytes memory huffBC =abi.encodePacked(uint8(0),"huffc","--bin","--optimize","3",strconcat(srcPath, contractName, ".huff"));
// Create filef.write(huffBC);
```

## Concluding Thoughts

Deploying Huff contracts may seem tricky but this 2,000 word guide equips you to handle those binaries. We walked through:

- Installing Foundry Huff
- Passing Huff code safely to Foundry
- Actually deploying contracts
- Testing thoroughly with Huff and Solidity suites
- Understanding Huff Deployer internals

With these skills, you can deploy Huff alongside Solidity confidently. As parting wisdom, rigorously test smart contracts, for they wield immense power! Code carefully, and may your Huff contracts always deploy smoothly.
