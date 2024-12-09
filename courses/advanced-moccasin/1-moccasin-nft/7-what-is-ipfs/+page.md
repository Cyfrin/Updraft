## What is IPFS? What is a CID?

IPFS is a distributed, decentralized data structure that is similar to a blockchain. 

- It is a peer-to-peer hypermedia protocol 
- designed to preserve and grow humanity's knowledge 
- by making the web upgradeable, resilient, and more open.

IPFS does not have mining, but it does have *pinning data*. We can add data to IPFS and it will split the data into smaller chunks. These smaller chunks are cryptographically hashed, and given a unique fingerprint called a *Content Identifier (CID)*. 

The CID acts as a permanent record of the file as it exists at that point in time. 

When other nodes *look up* your file, they ask their peer nodes who's storing the content referenced by the file's CID.  When they view or download the file, they cache a copy and become another provider of your content until their cache is cleared.

A node can *pin* content to keep and provide it forever, or discard content it hasn't used in a while to save space. This means each node in the network only stores content it is interested in, plus some indexing information that helps figure out which node is storing what. 

If we add a new version of a file to IPFS, its cryptographic hash is different, and it gets a new CID.  This means files stored on IPFS are resistant to tampering and censorship - any changes to a file don't overwrite the original, and common chunks across files can be reused to minimize storage costs.

If we have a code or file we want to use with IPFS:

1. We can *hash* that data and receive a unique output.
2. Our IPFS node does the hashing for us.
3. Every single IPFS node on the planet has the exact same hashing function. 
4. We can *pin* that data to our node.
5. This means that other nodes can find the data associated with that hash. 
6. We can easily allow the entire IPFS network to replicate any code or data in a decentralized manner.
7. Other nodes can *pin* our data to their node.

The issue here is that in order for our data to be truly decentralized, another node needs to pin our data. If our node is the only node that has pinned the data and our node goes down, our data is gone and the network will not be able to access it.  We can look at strategies in the future to have other people pin our data.  

However, this is a way we can host data and send code and have it be decentralized.

Unlike a blockchain where every single node in a blockchain has a copy of the entire blockchain, IPFS nodes can optionally choose which data they want to pin.  They can't do execution. So, you could have an IPFS node that's 0.5 MB, and you could have an IPFS node that's several TB. It's up to the node operators how much data and what data they want to pin. 

To go the extra mile, we can go to the IPFS website and download the IPFS desktop or the IPFS app. Once it's installed, it will look like this. We can then pin different objects to our own IPFS node.  

For example, we can look at some data we have pinned. We can see a JSON object and an image.  We can copy the *Content Identifier (CID)*. 

We can paste the CID into a file. You can see it's just this string.  

We can use this CID as our URI for our image when it's combined with the IPFS prefix:

```javascript
"ipfs://Qmwi16U9B3JY9HBBY36r0tUUtDmm6LdEEenDAAggmrx3tHMa"
```

This is the unique identifier for that piece of content, whether it's a pug image or the JSON or really any data at all.  

IPFS is much better than using a centralized service like Google Cloud or AWS. We've seen a ton of NFTs deploy with the token URI pointing to a centralized service like AWS or GCP or Microsoft Azure Cloud.  Only for those JPEGs to stop rendering once those servers go down. That kind of defeats the purpose of having an immutable NFT.  

IPFS is much better. We're also going to show you cooler ways to store your NFTs using SFGs and RWeave, but we'll get to those shortly.  Anyways, that's more about IPFS. If you want to upload your own image, this is how you would do it. You would want to just import the image. Import your JSON object as well where this image here or your image attributes would point to your image that you uploaded. So, boom. So, there would be two files you'd want to upload: a JSON object and an image object. So, I did it for you so you could get this.  PUG URI. 
