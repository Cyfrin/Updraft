## Understanding Chainlink�s Cross-Chain Interoperability Protocol (CCIP)
Imagine you have a smart contract on Ethereum, and it needs to communicate with another smart contract that you have deployed on zkSync. How can we get data from one chain to the other in a seamless way? This is where Chainlink�s CCIP comes in.

CCIP allows you to send tokens, data, or both across chains, connecting isolated blockchain ecosystems. It is a decentralized framework for secure cross-chain messaging. Your data, such as funds or a message, pass through a decentralized network of oracle nodes. If one node acts maliciously, the other nodes will punish it.

Blockchain interoperability protocols provide the following capabilities:
* Transfer assets and data across chains
* Utilize the strengths and features of different chains
* Collaboration between developers from different ecosystems
* Build cross-chain applications

CCIP provides defense in depth security, powered by Chainlink�s industry standard oracle network. Chainlink's defense in depth security is multiple layers of security. The decentralized oracle network has code that it runs to protect against vulnerabilities, and there exists a second set of Chainlink nodes known as the Risk Management Network or RMN. These nodes run different code to protect against security vulnerabilities, and are a secondary validation service.

There are two types of RMN nodes, firstly off chain RMN nodes. They perform two main operations. The first is Blessing which checks if the destination and source chain messages match. Each node monitors all messages committed on the destination chain. They use Merkle roots to commit to these messages. If you do not know what Merkle roots means, do not worry, as we will discuss this in a later section. The second operation is Cursing. Where the RMN detects if an anomaly has occurred. It will curse the CCIP system. This is chain specific, and will block the effect lane. This occurs in two cases. The first is a finality violation, such as a chain re-organization. The second is an execution safety violation. When a message on the destination chain does not have a matching message on the source chain. This includes things like double executions.

There is also an on chain risk management contract. There is one contract per supported destination chain, which maintains the group of RMN nodes that are authorized to participate in the Blessing and Cursing. Historically, cross chain systems are vulnerable to the largest attacks in the industry, which are typically centralized bridges. With these centralized bridges, the user trusts a centralized entity. CCIP offers a decentralized solution, where the funds pass through decentralized Chainlink oracle nodes.

What can you do with CCIP? CCIP allows you to send tokens and/or data across chain. A CCIP transaction is triggered on the source chain via the Router Contract. The router contract is responsible for routing CCIP calls to the decentralized Chainlink oracle network. It is the primary contract that CCIP uses, and is responsible for initiating the cross chain transactions. There is one Router Contract per blockchain. Callers will have to approve tokens for the router contract. On the source chain, the router contract routes the instruction for the cross chain message to the onramp.

This will then pass through the decentralized oracle network to the offramp. These on and off ramps do validation checks and interact with the token pools to burn and lock, or mint and unlock tokens. When the message is received on the destination chain, the router contract delivers those tokens or data to the smart contract, or externally owned account. If the receiver address is a smart contract, it can receive data, tokens, or both. If the address is an externally owned account, then it can only receive tokens and not arbitrary data.

A piece of terminology you will hear is a lane. A CCIP lane is a distinct path between a source and destination chain, and they are uni-directional. For instance, the Ethereum to zkSync lane, and zkSync to Ethereum lane are distinct lanes. 

We also mentioned token pools. Each token on each chain is associated with a token pool. It is an abstraction over ERC-20s, that provides token related operations such as minting, burning, or locking and unlocking. Depending on the method for the token, they also provide rate limiting. This is a security feature which allows developers to set the maximum rate at which tokens can be transferred. A rate limit has two things, a maximum capacity which is the maximum amount of tokens that can be sent cross chain, and a refill rate. The speed at which the maximum capacity is restored. These limits are set on both source and destination blockchains. As of CCIP version 1.5, token pools can either be self managed, or CCIP managed. This is due to the cross chain token standard or CCT, which allows developers to register their own tokens and create their own pools which are self managed.

## Sending a Cross-Chain Message using CCIP
We can see how CCIP works by sending a cross chain message from Sepolia to Arbitrum Sepolia.

First we must open up the contract in Remix. We go to File Explorer and then the "Messenger.sol" file. Next we head to the Solidity Compiler. Make sure that the compiler version is the same. Then, compile the contract by pressing the button or using the command
```javascript
ctrl+S
```

Next we head to the deploy and run transactions tab. Ensure the environment is set to "Injected Provider - MetaMask", and that we are on Sepolia. 
Now we must deploy the smart contract by filling in the constructor parameters. We must obtain the router address and link token address. The CCIP directory is where we will be getting the addresses from. In the CCIP directory, select "Testnet", and then the "Sepolia" option. Copy the router address and paste it in Remix.
Then copy the link token address and paste it in Remix as well. Hit the "Transact" button in order to deploy the smart contract. Confirm the transaction in Metamask. We can see that the contract has been deployed in the "Deployed Contracts" section, so now let's pin the contract for the current workspace and network to persist after reload.

Now we need to call the allowListDestinationChain, and we will get the chain selector from the CCIP directory. Select "Arbitrum Sepolia" and get the Destination Chain Selector, copying it and pasting it into Remix. Set the allowed boolean to true. Hit "transact" and confirm the Metamask prompt.
```javascript
 	uint64 destinationChainSelector
  bool allowed
```

We must now deploy the contract on Arbitrum Sepolia, but before we do we must "allowListSender", to do this, we first switch our network to Arbitrum Sepolia. Make sure that Metamask is on Arbitrum Sepolia. Copy the contract address we created on Sepolia, and then paste it in the address field, setting "allowed" to true, then click "transact" and "confirm" in Metamask. Then ensure the environment is set to Remix VM, select the contract to get its address, copy that address, switch back to Metamask, then set the network to Arbitrum Sepolia, and then connect metamask to the same contract. Deploy your smart contract on Arbitrum Sepolia using the same steps as before, but make sure to use the router address and link token address for Arbitrum Sepolia.

Now we can go back into Metamask and copy the contract address, and paste it in the receiver parameter. From that same page, copy the chain selector and paste it in, then type something in the text field, such as "Hey Arbitrum". Now we hit transact. We can copy the transaction hash and go to the CCIP explorer, and then paste the transaction hash into the search field.
```javascript
    address _sender
    bool allowed
```

We have now successfully sent our cross chain message from Sepolia to Arbitrum Sepolia using CCIP, congratulations!
