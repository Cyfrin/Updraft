## Mox Upgrades: Introduction 

We're going to be covering one of the final but most important concepts in smart contract development: proxies. 

We'll be working with the code in this repo:

```bash
https://github.com/Cyfrin/mox-upgrades-cu
```

At the end of the lesson we'll have two contracts: *counter_one* and *counter_two*. They look nearly identical except for a few minor changes.  We're going to deploy this ERC1967 contract in Vyper. This contract isn't 100% compliant, but that's a different conversation.

We're only going to make calls to this contract and not to the *counter* contracts yet. This proxy contract will be able to set a number, increment a number, get a version, and decrement.  It does not have any of these functions nor does it inherit them from the *counter* contracts.

Let's get started learning about proxies and learning about upgradable contracts. Let's watch this video.

Now a quick note about this video. I made this a few years ago and I thought a couple jokes were a lot funnier back then than they are now. So um uh, bear with the bad jokes. Thank you.

## Upgradable Contracts & Proxies: Introduction

Now I'm editing this video much later after I filmed it, hence why I have a beard. So, I'll be jumping in from time to time, updating some of the sections.

When deploying your smart contracts on chain, we all know those smart contracts are immutable or unchangeable. But, what if I told you that they were mutable?

Well technically I wouldn't be correct, however smart contracts actually can change all the time. When people transfer tokens, when people stake in a contract, or really do any type of functionality, those smart contracts have to update their balances and update their mappings and update their variables to reflect this.

The reason that they are immutable is that the logic itself never changes and will be on chain like that forever. So technically, yes, once they are deployed, they are immutable and this is actually one of the major benefits of smart contracts in the first place. That nobody can tamper with or screw with our smart contracts once we deploy them.

However, this can be an issue if, for example, we want to upgrade our smart contracts or protocol to do more things, or we want to fix some glaring bug or issue that we have.

Now, even though we can't change the specific code that's been deployed to an address, we can actually do a lot more than you think. And in this video, we're going to explain the different methodologies behind upgrading your smart contracts. And then, we're going to show you how to do it with Hardhat and Open Zeppelin. 

Huge shout out to a lot of Open Zeppelin and Trail of Bits articles that helped me put this video together, and a number of other sources as well. Links in the description. So, let's get to it.

Now at first glance, you might be thinking, "If you can upgrade your smart contracts then they're not really immutable then." And in a way you'd be right. So, when explaining kind of the different philosophies and patterns that we can use here we do need to keep in mind the philosophies and decentralization implications that each one of these patterns have, as they do all have different advantages and disadvantages. And yes, some of the disadvantages here are going to affect decentralization. So, we need to keep that in mind. And, this is why it's so important that before you go ahead and jump in and start deploying upgradable smart contracts, you understand the trade-offs.

So, we're going to talk about three different ways to upgrade your smart contracts. The first one being the *not really* / parameterize way to upgrade your smart contracts. The social migration method and then the method that you probably have heard about which is proxies, which have a ton of sub-categories like metamorphic contracts, transparent upgradeable proxies and universal upgradeable proxies.

So, let's talk about the *not really* upgrading method, or the parameterization method, or whatever you want to call it. This is the simplest way to think about upgrading your smart contracts. And, it really isn't upgrading our smart contracts because we can't really change the logic of the smart contract. Whatever logic that we've written is there. We also can't add new storage or state variables. So, this is really not really upgrading, but it is something to think about. Upgrades is just parameterizing everything. Whatever logic that we've deployed is there and that's what we're interacting with. This function means we just have a whole bunch of setter functions and we can update certain parameters, like maybe we have a reward parameter that gives out a token at 1% every year or something like that. Maybe we have a setter function that says, hey, update that to 2% or update that to 4%. It's just a setter function that changes some variable.

Now, the advantages here obviously this is really simple to implement. The disadvantage is that, if you didn't think of some logic or some functionality the first time you deployed your smart contract, that's too bad. You're stuck with it. You can't update the logic or really update anything, with the parameterization a.k.a. *not really* method. And the other thing you have to think about is who the admins are. Who has access to these setter functions to these updating functions? If it's a single person, guess what? You have a centralized smart contract.

Now, of course, you're going to add a governance contract to be the admin contract of your protocol, and that would be a decentralized way of doing this. So, just keep that in mind. You can do this method, just need a governance protocol to do so.

Another example of this might be a contract registry and this is something that actually that early versions of Aave used. Before you call a function, you actually check some contract registry that is updated as a parameter by somebody, and you get routed to that contract and you do your call there. Again, this really doesn't allow us to have the full functionality of upgrades here. You can argue that this registry is a mix of one of the later versions, but for all intents and purposes, it doesn't really give us that flexibility that we want for our upgrades.

But, some people might even think that upgrading your smart contract is ruining the decentralization. And, one of the things that makes smart contracts so potent is that they are immutable and that this is one of the benefits that they have.

So, there are some people who think that you shouldn't add any customization, or any upgrade ability. You should deploy your contract and then that's it. Trail of Bits has actually argued that, if you deploy your contract knowing that it can't be changed later, you take a little bit extra time making sure you get everything right, and there are often less security vulnerabilities because you're just setting it, forgetting it, and not looking at it again.

Now if I wanted to upgrade a smart contract with this philosophy in mind, the philosophy that I did want to keep my smart contracts immutable, we can instead use the social migration method, which I previously called the *yeet* method and now I think it's less funny, so we're just going to stick with social migration.

The *social yeet* method, or the migration method, is just when you deploy your new contract, not connected to the old contract in any way, and by social convention, you tell everybody, hey this new contract, this new one that we just deployed, yeah, this is the real one now and it's just by convention of people migrating and over into using this new one that the upgrade is done. Hence my slang name of *social yeet* because you yeet the first one out of the way and you move to the second one.

I think I'm funny. Yay! This has the advantage of truly always saying, hey this is our immutable smart contract and this is our new one. This is really the truest definition of immutable because since you give it no way of being upgraded in place, then if somebody calls that contract in 50,000 years in the future, it'll respond exactly the same.

Another huge disadvantage here is that you have to have a totally new contract address. So, if you're an ERC20 token, for example, you have to go convince all the exchanges to list your new contract address as the actual address. Keep in mind that, when we do this, we do have to move the state of the first one over to the second one. So, for example, if you're an ERC token, moving to a new version of that ERC token, you do have to have a way to take all those mappings from the first contract and move it to the second one. Obviously, there are ways to do this since everything is on chain, but if you have a million transfer calls, I don't want to have to write the script that updates everyone's balance and figures out what everyone's balances is just so I can migrate to my new version of the contract.

So, there is a ton of social convention work here to do. Trail of Bits has actually written a fantastic blog on upgrading from a V1 to a V2 or et cetera with this *yeet* methodology. And they give a lot of steps for moving your storage and your state variables over to the new contract. So, link in the description if you want to read that.

Now let's get to our big ticket item. So, in order to have a really robust upgrading mentality or philosophy, we need to have some type of methodology or framework that can update our state, keep our contract address and allow us to update any type of logic in our smart contracts in an easy way. Which leads us to our big ticket item: the proxies. 

## Proxies

Proxies are the truest form of upgrades since a user can keep interacting with the protocols through these proxies and not even notice that anything changed or even got updated. 

Now, these are also the places where you can screw up the easiest. 

Proxies use a lot of low level functionality, and the main one being the *delegate call* functionality. *Delegate call* is a low level function where the code in the target contract is executed in the context of the calling contract, and *msg.sender* and *msg.value* also don't change.

So, you understand what *delegate call* means now, right? Great, and in English this means if I delegate call a function in contract B from contract A, I will do contract B's logic in contract A. So, if contract B has a function that says hey, store this value in a variable up top, I'm going to store that variable in contract A. 

This is the powerhouse, and this combined with the *fallback* function allows us to delegate all calls through a proxy contract address to some other contract. This means that I can have one proxy contract that will have the same address forever and I can just point and route people to the correct implementation contract that has the logic. Whenever I want to upgrade I just deploy a new implementation contract and point my proxy to that new implementation.

Now, whenever a user calls a function on the proxy contract, I'm going to *delegate call* it to the new contract. I can just call an admin only function on my proxy contract, let's call it *upgrade* or something, and I make all the contract calls go to this new contract.

When we're talking about proxies, there are four pieces of terminology that we want to keep in mind. First is the implementation contract. The implementation contract has all of our logic and all the pieces of our protocol. Whenever we upgrade, we actually launch a brand new implementation contract. The proxy contract. Proxy points to which implementation is the *correct* one, and routes everyone's function calls to that contract. The user. The user is going to be making contract and function calls through the proxy contract. And then some type of admin. The admin is the one who's going to decide when to upgrade and which contract to point to.

In this scenario, the other cool thing about the proxy and *delegate call* is that all my storage variables are going to be stored in the proxy contract and not in the implementation contract. This way, when I upgrade to a new logic contract, all of my data will stay on the proxy contract. So, whenever I want to update my logic, just point to a new implementation contract. If I want to add a new storage variable or a new type of storage, I just add it in my logic contract and the proxy contract will pick it up.

Now, using proxies has a couple of gotchas, and we're going to talk about the gotchas and then we're going to talk about the different proxy contract methodologies, because yes, there are many proxy contract methodologies as well. And this is why Trail of Bits doesn't really recommend using upgradable proxies for your smart contracts because they're fraught with a lot of these potential issues. 

Not to mention, again you do still have some type of admin who's going to be upgrading your smart contracts.

Now, if this is a governance protocol, then great, you're decentralized. But if this is a single group or entity,  then we have a problem.

The two biggest gotchas are storage clashes and function selector clashes.

Now, what does this mean? When we use *delegate call*, remember we do the logic of contract B inside contract A. So, if contract B says we need to set value to two, we go ahead and set value to two, but these smart contracts are actually kind of dumb. We actually set the value of whatever is in the same storage location on contract A as contract B. So, if our contract looks like this and we have two variables in contract A, we're still going to set the first storage spot on contract A to the new value. This is really important to know because this means we can only pretend new storage variables and new implementation contracts, and we can't reorder or change old ones. This is called *storage clashing*. And in the implementations we're going to talk about, they all address this issue.

The next one is called *function selector clashes*. When we tell our proxies to *delegate call* to one of these implementations, it uses what's called a function selector to find a function. The function selector is a four byte hash of the function name and the function signature. Don't worry about the function signature for now.

Now it's possible that a function in the implementation contract has the same function selector as an admin function in the proxy contract, which may cause you to do accidentally a whole bunch of weird stuff. For example, in this sample code in front of you, even though these functions are totally different, they actually have the same function selector. So, yes, we can run into an issue where some harmless function like get price has the same function selector as upgrade proxy or destroy proxy or something like that.

This leads to our first out of the three implementations of the proxy contracts.

## Transparent Proxy Pattern

This is called the transparent proxy pattern. 

In this methodology, admins are only allowed to call admin functions, and they can't call any functions in the implementation contract. And users can only call functions in the implementation contract and not any admin contracts. This way, you can't ever accidentally have one of the two swapping and having a function selector clash and you're running into a big issue where you call a function you probably shouldn't have.

If you're an admin you're calling admin functions. If you're a user you're calling implementation functions. So, if you're an admin and you build some crazy awesome DeFi protocol, you better come up with a new wallet address because you can't participate.

## Universal Upgradeable Proxies

The second type of proxy we're going to talk about is the universal upgradeable proxy, or the UUPS. 

This version of upgradable contracts actually puts all the logic of upgrading in the implementation itself. This way the solidity compiler will actually kick out and say, hey, we got two functions in here that have the same function selector.

## Gotchas

This is also advantageous because we have one less read that we have to do. We no longer have to check in the proxy contract if someone is an admin or not. This saves on gas, of course. And, the proxy is also a little bit smaller because of this. The issue is that if you deploy an implementation contract without any upgradeable functionality, you're stuck. And it's back to the *yeet* method with you.

And, the last pattern or methodology that we're going to talk about is the diamond pattern. Which does a number of things, but one of the biggest things that it does is, it actually allows for multiple implementation contracts. 

This addresses a couple different issues. For example, if your contract is so big and it doesn't fit into the one contract maximum size, you can just have multiple contracts through this multi-implementation method. It also allows you to make more granular upgrades. Like, you don't have to always deploy and upgrade your entire smart contract. You can just upgrade little pieces of it if you've chunked them out.

All the proxies mentioned here have some type of Ethereum Improvement Proposal, and most of them are in the draft phase.

And, at the end of this explainer, we will do a demo of showing you how the *delegate call* function works. 
