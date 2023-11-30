---
title: Basic NFT Testnet Demo
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/xoHAw86NbQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In our previous lesson, we've covered the concept and advantages of NFTs (Non-fungible tokens) along with how to build and test them. But to appreciate the full potential of our NFT, we need to see it in a real-world setting – our MetaMask wallet. This post walks you through how to deploy an NFT to a testnet, as well as how to import it to your MetaMask wallet. Let's get started!

## Deploying NFT to a Testnet

While testing is a vital part of NFT creation, deploying it in a real use case can bring more clarity to your understanding. Luckily, there are several ways to deploy your NFT. You could consider using Anvil, your own Anvil server, or a testnet. If you're not keen on waiting for the testnet or spending the gas, I'd recommend deploying it to Anvil.

The processes detailed below are optional, but feel free to follow along if you'd like.


### Using a Makefile for Quick Deployment

Rather than typing out long scripts, we'll use a makefile here. The associated Git repo contains the makefile we're using, allowing you to simply copy and paste rather than rewriting everything.

In the makefile, we've captured most of the topics we've discussed so far, including our deploy script, which we'll use to deploy our basic NFT.

<img src="/foundry-nfts/9-testnet/testnet1.png" style="width: 100%; height: auto;">


Here is what the deploy script looks like:

```makefile
deploy:
	@forge script script/DeployBasicNft.s.sol:DeployBasicNft $(NETWORK_ARGS)
```

It's important here to ensure you have included your environmental variables. 

It's noteworthy that you should write some tests before deploying on a testnet, although for the sake of showing you what the NFT looks like, we'll skip this step in this instance.

## Deploying Our Basic NFT

We're now going to deploy our basic NFT to the contract address. After successful deployment, there will be a short wait for its verification.


### Extracting Contract Info and Minting

With our NFT deployed, we'll now move to extract our contract data. In the broadcast folder, the latest run contains the created basic NFT information. We'll execute the following command to initiate the Mint function:

```makefile
mint:
    @forge script script/Interactions.s.sol:Interactions $(NETWORK_ARGS) 
```

The DevOps tool works by grabbing the most recent contract from this folder, thus automating the process.

## Importing NFT into MetaMask

While the NFT is being minted, let's transition to MetaMask:

1. Copy the contract address under which the NFT was deployed.
2. From MetaMask, go to NFTs and switch to Sepolia.
3. Click on Import NFTs and paste the copied address.
4. Since we're the first to create this NFT, the token ID will be zero. Input this and hit 'Add'.

After a short wait, your NFT will be viewable right from your MetaMask wallet. It's intelligent enough to extract the token URI, allowing you to view the image, contract address, or send it elsewhere.

Congratulations! You've successfully deployed and imported an NFT into MetaMask. You can now interact with it just as you would in a marketplace like OpenSea. Through this process, you've learned how to make an NFT come to life, from being just a script to being part of the real-world, bridging the gap between test environments and real applications.

Stay tuned for our next post on advanced NFT creation steps, such as a complete DeFi app development and more.

