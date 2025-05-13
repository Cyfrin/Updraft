---
title: The issue with IPFS vs HTTPS
---

_Follow along the course with this video._

---

### The issue with IPFS vs HTTPS

In this lesson we'll discuss two ways we can reference our data in `IPFS` and ways we can strengthen the hosting of it to ensure it's always made available.

First things first: Let's discuss the **InterPlanetary File System (IPFS)** and the pros and cons associated with it.

### IPFS

We learnt previously that there are two ways to reference the location of data hosted by `IPFS`. We can point directly to the `IPFS` network with the syntax `ipfs://<CID>` _or_ we can use the `IPFS Gateway` and point to an IPFS server via `https://ipfs.io/ipfs/<CID>`.

There are some important considerations to keep in mind here. If we decide to use the `IPFS Gateway`, this is essentially pointing to a website hosted on a server by `IPFS`. If this website or server goes down for any reason the data we're pointing to will be unretrievable!

Imagine losing the art of your NFT forever!

A safer methodology is pointing to the `IPFS` network directly, but this comes with caveats. While the URI is pointing to a decentralized network, assuring the data is accessible so long as a node is still hosting it, most browsers and services don't natively support interfacing with the `IPFS` network. This can make viewing and interacting with your NFT cumbersome.

In addition to the above, the `IPFS` network doesn't automatically distribute all data amongst all nodes on the network (like a blockchain would). Instead it relies on nodes pinning the data they find valuable to assure it's available to the rest of the network. If I'm the only person pinning my data on `IPFS`, I'm not any more decentralized than using the `IPFS Gateway`.

**_So, how do we solve this?_**

### Pinning Services

Fortunately, there are services available which developers can use to pin their data for them, decentralizing access to it. One such service is [**Pinata.cloud**](https://www.pinata.cloud/).

::image{src='/foundry-nfts/10-ipfs-https/ipfs-https1.png' style='width: 100%; height: auto;'}

Once an account is created and you've logged in, the UI functions much like an `IPFS` node and you can simply upload any files you want the service to pin on your behalf.

::image{src='/foundry-nfts/10-ipfs-https/ipfs-https2.png' style='width: 100%; height: auto;'}

Once uploaded, `Pinata` will provide a `CID`, just like `IPFS` itself will.

::image{src='/foundry-nfts/10-ipfs-https/ipfs-https3.png' style='width: 100%; height: auto;'}

> ❗ **PROTIP**
> Whenever I work on a project, I will upload my images/data both to my local `IPFS` node as well as `Pinata` to assure the data is always pinned _somewhere_.

### Wrap Up

So, in summary, pointing to the `IPFS Gateway`, not great. Pointing to the `IPFS` network itself is a little better and more decentralized, but comes with it's own issues. What if I told you there's an even better way to store our images?

In the next lesson we'll discuss `Scalable Vector Graphics`, or `SVGs` and how images of this type can be stored _on-chain_ making them permanently accessible!

See you there!

::image{src='/foundry-nfts/10-ipfs-https/ipfs-https4.png' style='width: 100%; height: auto;'}
