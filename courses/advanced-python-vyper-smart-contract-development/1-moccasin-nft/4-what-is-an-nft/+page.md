## What is an NFT?

Let's learn about NFTs. 

NFTs stand for Non-Fungible Tokens. They are a token standard similar to ERC20, which we're already familiar with. ERC20s are like LINK, AAVE, MAKER, which are all common tokens on the Ethereum blockchain.

NFTs are *non-fungible*, meaning they are unique and cannot be directly replaced with another token. Think of a dollar bill.  Any dollar bill is equivalent to another.  This is *fungible*.  

A Pokemon, on the other hand, is not fungible.  It's going to have different stats and different move sets, which makes it unique from other Pokemons.

The most common way to think of NFTs is as *digital art*.  They represent digital items that are unique and incorruptible, with a permanent record of ownership and transactions.

We can make NFTs do much more than just represent art.  We can give them stats, make them battle, or create games.  But the current focus is on digital art.

Since these digital assets are unique, and we want to be able to visualize them, we need a way to define what they look like.  This is where *metadata* and *token URIs* come in.

We can use a decentralized service like IPFS to store our NFTs. 

If you're trying to render an image of an NFT, here's how we can use IPFS:

1. Get IPFS
2. Add a *tokenURI JSON file* to IPFS
3. Add the IPFS URI to your NFT URI

In the next lesson, we'll walk through a D&D example using Chainlink. 
