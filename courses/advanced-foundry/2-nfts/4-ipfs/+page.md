---
title: IPFS
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ytlmm_KGfso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In this comprehensive guide, I will explain how to use the Interplanetary File System (IPFS), a revolutionary distributed decentralized data structure. While it's not exactly a blockchain, its working mechanisms are somewhat similar – without the element of data mining. What IPFS does, instead, is what we call 'pinning data'.

You can get a glimpse of how IPFS works in the official [IPFS documentation](https://docs.ipfs.io/)

## IPFS: A Unique Approach to Data Management

The IPFS process starts with a code, file, or any other form of data.

```
Piece of Data => Hash Function => Unique Hash
```

The first thing IPFS does is to hash this data, yielding a unique output. Whether your data contains a massive code file or a ton of text, it gets turned into a unique hash function. The IPFS node carries out this hashing for you, with all IPFS nodes across the globe using the exact same hashing function.

```
Same Hashing Function => Consistent Unique Output
```

Once data is hashed and a unique output obtained, then comes the 'pinning' part. You can pin the data, the code, the file on your IPFS node. The only role of the node is to host this data and store these hashes, nothing more.

```
Hashed Data => Pin Data => Data Stored on Node
```

<img src="/foundry-nfts/4-ipfs/ipfs1.png" style="width: 100%; height: auto;">

## Building a Global Network of Nodes

Here's where the magic happens: your node connects to a vast network of other IPFS nodes. These nodes communicate with each other vastly lighter than any blockchain node.

For instance, when you request your network for a specific hash, the nodes engage in a conversation until one comes up with your data. This mechanism might initially seem centralized since the data resides on one node.

However, other nodes on the network can also pin your data if they wish, thus creating a copy of your data on their node as well.

```
Network Nodes => Share and Pin Each Other Data => Decentralized Data
```

With the ability to replicate any data in a decentralized manner, IPFS nodes offer straightforward functionality with a simple setup. It's also essential to note the drastic difference between blockchain and IPFS in this respect – IPFS nodes cannot execute smart contracts. In simple terms, they only offer decentralized storage.

The issue arises when ensuring decentralization – other nodes must pin our data. If we are the only node that has a particular hash, and our node goes down, that data is lost, and the network won't be able to access it. We will discuss future strategies for ensuring other people pin your data in subsequent sections, but for now, let's proceed with deploying our application on IPFS.

## Deploying Your Application on IPFS

Now that we know about IPFS, the next step is to deploy our application to IPFS, making it accessible by anyone, anywhere, provided our node remains online.

<img src="/foundry-nfts/4-ipfs/ipfs2.png" style="width: 100%; height: auto;">

You can install and work with IPFS using the IPFS Desktop application or command line, as per your preference. If you're using Brave or Firefox, the IPFS router is built-in. For browsers like Chrome, you might have to add [IPFS Companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) for seamless functionality.

Once you have installed IPFS, you can import your file (for example, `next config JS`) and extract the CID or the hash. With IPFS Companion installed and enabled, or via the Brave local IPFS node, you can now access this file directly using your CID, essentially turning it into a URL.

If you encounter trouble accessing these files, you can use the IPFS gateway as a workaround route for requesting the data through another server, which then gets the data through IPFS. Simply append your hash to `https://gateway.ipfs.io/ipfs/`. This way, there will be no need for the IPFS Companion.

To wrap it up, IPFS introduces a new level of data decentralization and replication to build a global network of nodes that can store and distribute data economically and efficiently. Future trends suggest this could become an integral part of the Internet's infrastructure. With this guide, you are now ready to contribute to this digital revolution.
