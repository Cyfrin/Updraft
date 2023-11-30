---
title: Adding another Network to MetaMask
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/oYBRneM_Oes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Adding New Ganache Local Chains and Other EVM Compatible Chains

In this blog post, we delve deep into the world of EVM (Ethereum Virtual Machine) chains. We explore how to add new Ganache local chains and the process of incorporating any EVM compatible chain in the network. Plus, we sprinkle in an introduction on running your own Ethereum nodes. Ready to dive in?

<img src="/foundry/11-networks/network1.png" style="width: 100%; height: auto;">

## Adding New Networks Using MetaMask

Conveniently, MetaMask, a browser extension serving as an Ethereum wallet, provides an easy way to add EVM compatible chains. By pre-configuring a host of them, you can add a chain such as the Arbitram One by simply clicking on **Add Network** and proceeding to **Add**. The pleasing part is that MetaMask does all the grunt work, filling in all the necessary information for you. A click on **Approve Network** ensures successful addition of the network.

```js
    1. Click on Add Network
    2. Choose your desired EVM compatible chain
    3. Click on Add
    4. After ensuring all necessary information is already filled in, click on Approve Network
```

However, what if MetaMask isn't pre-equipped with a chain you wish to add? Well, no need to worry. You would employ the same process we just used to add our new Ganache local chain. This process universally applies to the addition of any EVM compatible chain.

## Understanding Your Connection to a Node: The Role of Endpoint

Heading back to your network settings and selecting the localhost network unveils another crucial aspect- the endpoint. When you set out to send a transaction to a blockchain, you must have a connection to a node. This node connection is vital as it equips you with the ability to send transactions.

Let's say you coveted the thrill of sending transactions to your own node. The process would entail running an execution client like Geth, followed by a consensus client such as Teku or Prism, and finally send your transactions.

<img src="/foundry/11-networks/network2.png" style="width: 100%; height: auto;">

Certainly, running your own Ethereum nodes may seem daunting. However, for a blockchain enthusiast, it can be a fun adventure worth exploring. As a pro tip, run multiple Ethereum nodes for an even better experience.

## Interacting with Ethereum Blockchain Nodes: Different Methods

<img src="/foundry/11-networks/network3.png" style="width: 100%; height: auto;">

Venturing further into the realm of Ethereum, we find that different methods exist for dispatching transactions. Ethereum JSON RPC specification site provides a rundown of these various methods. You just need to be acquainted with APIs and Http endpoints and you’re good to go.

When signing and dispatching transactions, it's these method calls that come into play: ETH sign transaction, send transaction, send raw transaction, etc.

However, let's make an important clarification. The Forge comes with a built-in facility that manages sending these transactions. So, we don't necessarily have to go the extra mile of direct interaction with these calls.

## Sending Raw Transactions: Different Programming Languages

Moving forward, to learn how to send raw transactions, you would need to make raw API calls to your Ethereum node. This can either be an Ethereum node you provided or an Ethereum node as a service, such as Infura or Alchemy. This interaction would employ different programming languages such as Bash, Python, or JavaScript.

Further exploration into the complex yet captivating world of Ethereum awaits. Running your own Ethereum nodes and understanding the intricacies of sending transactions brings a whole new level to your blockchain explorations. We hope this guide kindles your curiosity to delve further and cherish the fun of running nodes!

Stay tuned for more such excitement in our next lesson!
