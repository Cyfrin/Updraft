## Setting Up ZkSync

In this video, we will learn how to set up ZkSync using a framework called Moccasin.

ZkSync is an EVM equivalent, just like Arbitrum, Base, OP, etc. We'll be working with a ZK Rollup, which is going to be more gas efficient and more performant.

ZkSync uses an Era VM. It is not completely EVM equivalent, but the co-founder of Ethereum, Vitalik Buterin, has tweeted that he thinks the future of blockchains is on these ZK Rollups.

### Deploying to a Local ZkSync Instance

We're going to deploy to a local ZkSync instance using Moccasin. This is very similar to PyEVM, as we can run

```bash
mox deploy
```

or

```bash
mox run deploy
```

which runs our deploy script. This runs on a PyEVM network but is still EVM-compatible.

### Installing Additional Tools

To start working with ZkSync, we need to install two additional tools:

- anvil-zksync
- Era Compiler Vyper

### Anvil ZKSync Node

The Anvil ZKSync Node is an in-memory node that supports forking the state of other networks.

The first thing we need to do is make sure we have Rust installed on our machine.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

This command will download the Rust installer. Depending on what operating system you're using, the installation instructions for Rust may vary. If you want a more detailed walkthrough, you can go through the getting started page on the Rust website.

We can confirm that Rust is installed by running:

```bash
rustup --help
```

It will output a list of available Rust commands.

Now we need to install the Anvil ZKsync Node. We can do this by running the [installation script](https://github.com/matter-labs/anvil-zksync?tab=readme-ov-file#using-the-installation-script). In the Anvil ZKSync repository, we'll need to run:

```bash
sudo ./install.sh
```

This will download the Era Test Node and install it to our machine. We can then confirm the installation by running

```bash
which anvil-zksync
```

which will output the Era Test Node's location.

We can also run

```bash
anvil-zksync --version
```

which will output the version of the Era Test Node that we have installed.

Finally, if we run

```bash
anvil-zksync run
```

it will start the Era Test Node, which will be the local ZkSync instance that we can deploy to. It will output a bunch of info, starting with the chain ID, which is L2ChainID (260).

### Era Compiler Vyper

The Era Compiler Vyper is a Vyper compiler for ZkSync. To download it, we will go to the releases tab of the Era Compiler Vyper repository and select the version that we want to download.

We're going to download version 1.5.7. We can copy the link to the file from the Releases tab.

We can check if we've successfully downloaded and installed the Era Compiler Vyper by running:

```bash
./zkvyper --version
```

The output of this will be the version of the Era Compiler Vyper that we installed.

Keep in mind that both of these tools will have been downloaded into your local repository. You can move them to another location if you want.

By installing these tools, we've taken the first steps towards unlocking the power of ZkSync, which will be more gas efficient and performant than current EVM solutions.
