---
title: SVG NFT Anvil Demo
---

_Follow along the course with this video._

---

### SVG NFT Anvil Demo

Alright, let's do this for real. I wanna see our token in our Metamask wallet!

> ❗ **NOTE**
> I recommend following along on `anvil` instead of sepolia, testnets can be slow and problematic, everything we're doing should work locally.

We can start by kicking off our anvil chain. This has already been configured in our `Makefile`, so we should just have to run `make anvil`

Once the chain is running, open a new terminal (while leaving this one open). We'll have to add some commands to our `Makefile` before proceeding.

```js
deployMood:
	@forge script script/DeployMoodNft.s.sol:DeployMoodNft $(NETWORK_ARGS)
```

Looks great! Remember, you can add anvil as at network to Metamask by navigating to your network selector and choosing `+ Add network`.

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil2.png' style='width: 100%; height: auto;'}

Choose to add a network manually and enter the details as shown below:

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil3.png' style='width: 100%; height: auto;'}

If you need to import an anvil account, this is simple as well. When an anvil chain is spun up, it provides you with public and private keys for a number of default accounts. In your Metamask account selector, choose `+ add account or hardware wallet`

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil4.png' style='width: 100%; height: auto;'}

Select `import account` and enter one of the default private keys offered by the anvil chain.

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil5.png' style='width: 100%; height: auto;'}

Once everything is set up, we should be able to run `make deployMood`...

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil1.png' style='width: 100%; height: auto;'}

With the contract address, we should be able to use a cast command to interact with it.

```bash
cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "mintNft()" --private-key ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://localhost:8545
```

When that transaction completes, what we can _finally_ do, is take that contract address, go back into `Metamask > NFTs > Import NFT`. This is going to ask for our contract address, which we have from our deployment, and our tokenId, which is 0.

Once imported ...

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil6.png' style='width: 100%; height: auto;'}

LETS GOOOO! Now we need to flip it. We should be able to use largely the same `cast` command, let's just adjust the function to `flipMood`

```bash
cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "flipMood(uint256)" 0 --private-key ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --
rpc-url http://localhost:8545
```

> ❗ **NOTE**
> For Metamask to reflect the change, we'll regrettably have to remove and readd the NFT collection.

Once we reimport our NFT however...

::image{src='/foundry-nfts/17-svg-anvil/svg-anvil7.png' style='width: 100%; height: auto;'}

### Wrap Up

We did it! We've just shown that we can write and deploy our own NFT contract with SVG art 100% on-chain. We could deploy this to a testnet if we wanted to. We could deploy this to a _mainnet_ if we wanted to. First hand we've experienced the power and advantages of keeping our data on-chain and as decentralized as possible.

We've just done amazing work.
