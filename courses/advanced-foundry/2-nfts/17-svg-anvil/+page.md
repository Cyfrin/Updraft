---
title: SVG NFT Anvil Demo
---

_Follow along the course with this video._



---

## Deploying and Flipping a 100% On-Chain NFT on Anvil

Welcome to this exciting tutorial where we will deploy and flip an on-chain NFT minted on our own local network, Anvil. Experience firsthand the speed and efficiency of Anvil, with all the steps demonstrated live in our MetaMask!

## Setting up MetaMask with Anvil

For live interactions with our NFT, we'll utilize MetaMask. Follow these steps to set up MetaMask with your Anvil chain:

1. Within MetaMask, choose `Add Network`.
2. Edit the settings to coincide with your Anvil chain.
3. Reset your Anvil chain to reflect these new settings.
4. Verify your address is listed in the account. If not, import one from one of the private keys.
5. Clear your activity tab- Go to your Account Settings -&gt; Advanced -&gt; Clear activity tab.

With these steps, your MetaMask is primed and ready for the Mood NFT.

<img src="/foundry-nfts/17-anvil/anvil1.png" style="width: 100%; height: auto;">

## Deploying the Mood NFT on Anvil

With our local chain in place and MetaMask set up, we're ready to deploy the Mood NFT on Anvil. Run the `Make Deploy Mood` command and if successful, you'll get a contract address for your Mood NFT.

```makefile
deployMood:
	@forge script script/DeployMoodNft.s.sol:DeployMoodNft $(NETWORK_ARGS)
```

## Interacting with the Mood NFT

Ready to mint an NFT and interact with it? We'll utilize `cast` to accomplish this:

1. Send a `mint NFT` call to your contract address.
2. Ensure to pass in the private key from your account that has some money in it.
3. Use the Anvil RPC URL from your `make` file.
4. Execute the mint command with the right private key and, Voila- You've minted an NFT!

```makefile
mintMoodNft:
	@forge script script/Interactions.s.sol:MintMoodNft $(NETWORK_ARGS)
```

You can then import the NFT into MetaMask using the contract address. Add the Token ID and behold- your Mood NFT is live and ready for action!

## Flipping the Mood NFT

Perhaps one of the most exciting features of our Mood NFT is the ability to flip its mood. In our command window, we call the `Flip Mood` function on our Token Zero, reflecting the change in MetaMask.

Remove the NFT and re-add it using the contract address. Your Mood NFT strikes a different mood!

<img src="/foundry-nfts/17-anvil/anvil2.png" style="width: 100%; height: auto;">

## Wrapping up

We've created, deployed, and minted an NFT on our own network with Anvil, and interacted with it through MetaMask! You could replicate these steps to deploy on a testnet, or even a main net.

As a best practice, always aim to keep your NFTs decentralized. Use IPFS to store metadata regarding NFTs to ensure they're 100% on-chain, as opposed to being centrally controlled via websites or similar platforms.

Congratulations and here's to your adventures in creating and flipping mood with NFTs!
