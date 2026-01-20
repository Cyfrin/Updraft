# Chainlink Local: Develop and Test Chainlink Services

Chainlink Local is a development package that allows you to run Chainlink services directly in your local environment. This tool enables developers to explore Chainlink services before deploying to testnets or mainnet. 

## What is Chainlink Local?

Chainlink Local is an installable package that integrates with popular development environments like [Foundry](https://getfoundry.sh/), [Hardhat](https://hardhat.org/), and [Remix](https://remix.ethereum.org/). It allows you to run Chainlink services locally for rapid development and testing. For example, you can use Chainlink Local to execute CCIP cross-chain messages on a local node. 

## Key Features

- **Local Simulation**: Test Chainlink services on local blockchain nodes.
- **Forked Networks**: Work with deployed Chainlink contracts using forked networks for realistic testing.
- **Seamless Integration**: Compatible with [Foundry](https://getfoundry.sh/), [Hardhat](https://hardhat.org/), and [Remix](https://remix.ethereum.org/) development environments.
- **Testnet-Ready Code**: Contracts tested locally can be deployed to testnets without modifications.

## Development Modes

Chainlink Local supports two primary testing approaches:

### 1. Local Testing Without Forking

In this mode, you work with mock Chainlink contracts on a locally running node (such as HardHat, Anvil, or Remix VM):

- Deploy mock Chainlink smart contracts to a blank EVM state.
- Deploy your smart contracts and test them with these local implementations.
- Ideal for initial development and basic functionality testing.

**Note**: We will use this in the subsequent lesson.

### 2. Local Testing With Forking

This more advanced mode uses forked blockchains:

- Fork one or more live blockchains to create a realistic testing environment.
- Interact with deployed Chainlink contracts through the provided interfaces.
- Switch between different forked chains (e.g., source and destination chains for CCIP testing).
- Not supported in [Remix](https://remix.ethereum.org/), only on [Hardhat](https://hardhat.org/) and [Foundry](https://getfoundry.sh/).

## Developer benefits

Chainlink Local enables developers to:

- Execute CCIP token transfers and arbitrary messages on local nodes.
- Test cross-chain functionality between multiple local forks.
- Rapidly test Chainlink-dependent smart contracts.
- Verify contract behavior in a controlled environment before testnet deployment.
