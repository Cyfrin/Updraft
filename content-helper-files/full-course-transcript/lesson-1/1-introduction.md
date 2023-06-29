Now since you're here, you've probably heard of Bitcoin before. Bitcoin was one of the first protocols to use this revolutionary technology called blockchain. Bitcoin White paper was created by the pseudo anonymous Satoshi Nakamoto, and it outlined how Bitcoin can make peer-to-peer transactions in a decentralized network.

This network was powered by cryptography and decentrally and allowed people to engage in censorship resistant finance in a decentralized manner due to its features, which we'll talk about in a little bit. People took to this as a superior digital store of value, a better store of value over something like gold, for example.

And that's why you'll also hear people commonly refer to it as a digital gold. Similar to gold, there's a scarce amount or a set amount of Bitcoin available on the planet, only so much that you can buy and sell. You can read more about the original vision in the white paper. We have a link to the white paper in the GitHub repo associated with this course.

Now, this was an insane breakthrough in a little bit. We're gonna learn exactly how this is all possible and how this actually works under the hood. Some people though, saw this technology and wanted to take it a little bit farther and do even more with this blockchain technology. And a few years later, a man named Vitalic Buterin released a white paper for a new protocol named Ethereum, which used this same blockchain infrastructure with an additional feature.

And in 2015, him and a number of other co-founders released the project Ethereum, where people could not only make decentralized transactions, but decentralized agreements, decentralized organizations, and all these other ways to interact with each other without a centralized intermediary or centralized governing force.

Basically, their idea was to take this thing that made Bitcoin so great and add decentralized agreements to it, or smart contracts and fact. Technically, these smart contracts weren't even really a new idea. Back in 1994, a man named Nick Zao had actually originally come up with the idea. Smart contracts are a set of instructions executed in a decentralized, autonomous way without the need for a third party or centralized body to run them.

And they come to life on these blockchains or these smart contract platforms like Ethereum. And it's these smart contracts that are gonna be the core thing that we're gonna be working on in this course and that we're gonna be developing. You can think of smart contracts in the same way you think of traditional contracts or traditional agreements.

They're just a set of instructions between parties. Except instead of written on pen and paper or typed up in Microsoft Word, they are written in code and embodied on these decentralized blockchain platforms, and that's also where they're executed. Instead of being executed by the two parties or three parties or however many parties that are involved, this removes this centralized issue that we'll talk about more in a bit.

This is one of the main differentiators between the Ethereum protocol and the Bitcoin protocol. It's these smart contracts. Now, technically, Bitcoin does have smart contracts, but they're intentionally Turing incomplete, which means they don't have all the functionality that a programming language would give them.

This was an intentional move by Bitcoin developers. Bitcoin developers viewed Bitcoin as a store of value versus Ethereum. Developers viewed Ethereum as both a store of value and a utility to facilitate these decentralized agreements. Now, these smart contracts on blockchains alone are absolutely incredible.

However, they do come with a huge issue. If we want these digital agreements to replace the agreements in our everyday lives, they probably are gonna need data from the real world. Blockchains by themselves actually can't interact with and can't read or listen to data from the real world. This is what's known as the Oracle problem.

These blockchains are deterministic systems and they're deterministic on purpose, and we'll learn about more about how that works in the sessions to come. So everything that happens with them happens in their little world, but if they're gonna be these agreements, they need external data and they need external computation.

And this is where Oracle's come into play. Oracle's are any device that delivers data to these decentralized blockchain or runs external computation. However, if we want our applications to stay truly decentralized, we can't work with a single Oracle or a single data provider or a single source that's running these external computations.

So we need a decentralized Oracle network similar to our decentralized blockchain network. Your on chain logic will be decentralized, but you also need your off-chain data and computation to be decentralized. Combining this on chain decentralized logic with this off-chain, decentralized data and decentralized computation gives rise to something called hybrid smart contracts.

And most of the biggest protocols that we interact with today are some type of hybrid smart contract or interact with hybrid smart contracts to some extent. This is where the protocol chain link comes into play. It is a modular, decentralized oracle network that can both bring external data and external computation into our smart contracts to make sure they're decentralized end-to-end, while giving them the feature richness that we need for our agreements.

Chainlink allows for us to get data, do upkeep, get random numbers, or really customize our smart contracts in any meaningful way. Now throughout the course, we're gonna use the terminology smart contract. However, whenever we say smart contract, we're often using it a little interchangeably with hybrid smart contracts, but just know that when we say hybrid smart contract, We're talking specifically about smart contracts that have some type of off-chain component.

Now, since Ethereum's release, a number of different blockchains or smart contract platforms have come to light, such as avalanche, polygon, phantom harmony, and more. For the majority of this course, we're gonna be assuming that we're gonna be deploying to the Ethereum network. However, everything that we learn here is gonna be applicable to the vast majority of the blockchains out there, like Polygon, avalanche, phantom harmony, et cetera.

And understanding everything from Ethereum fundamentals will give you the skills that you need to switch chains very easily with literally one line of code. So don't worry about learning a specific tool or with a specific chain, because most of them work together seamlessly. Now, there are a couple of smart contract platforms that don't use solidity, but still learning the fundamentals here will make you much better at those as well.

And Ethereum, by far has the most value locked and is the most used blockchain and smart contract platform out there. You'll also hear those two terms used a little bit interchangeably as well. Sometimes I'll say smart contract platform. Sometimes I'll say blockchain, they kind of mean the same thing.

Obviously blockchains could mean store of value and smart contract platform, but you get the idea. Similarly, chainlink is the most popular and powerful, decentralized Oracle network is the one that we're gonna be focusing on for this course as well. Chainlink is also blockchain agnostic, so it'll work on Ethereum, avalanche, polygon, Solana, or really any other blockchain out there.

Now, additionally, over the last year, a new term has come to light called an L two or a layer two. This solves an issue that most blockchain see where they don't scale very well or they don't grow big very well. We'll be talking about L two s a little bit more in the future, but the basic concept of is that.

Blockchains can really only get so big. So what they do if, if this is Ethereum, you can actually have blockchains hook into them to essentially make them bigger. If that doesn't really make too much sense, don't worry about it. For right now, layer twos solve this scalability issues, and at the moment there are two different types of true layer twos, optimistic rollups and zero knowledge rollups, optimistic Rollups like Arbitra and optimism or zero knowledge rollups like ZK Sync or Polygon, Z K E V M.

Yes, there's a polygon chain, but there's also a Polygon Z K V M L two. The two of them are very different. Don't worry about them for now. And in fact, it's this Arbitra layer two where our challenge contracts are going to be deployed on this roll-up. But like I said, once we learn how blockchains work from a basic level under the hood, then we'll explain more about how these L two s actually work.

Now throughout this course, you'll hear the term DAP or decentralized protocol or smart contract protocol or decentralized application, and they all kind of mean the same thing. A decentralized application is usually the combination of many smart contracts, and when we get into solidity, you'll see what a singular smart contract really looks like.

And like I said, learning all these core fundamentals will make you a better solidity and a better smart contract developer. You'll also hear the term web three a lot in this video and in the industry. Web three is the idea that blockchains and smart contracts are the next iteration of the web, web. One being this permissionless open source world with static content, web two being the permissioned web with dynamic content, but all the agreements and logic runs off of centralized servers where they control your information.

And then web three comes back to the permissionless web. But once again, with dynamic content, and instead of centralized servers running your logic, decentralized networks run the logic, creating these censorship resistant agreements that these smart contracts enable. It is also generally accompanied by the idea that the users own the protocols that they work with, and it's an ownership economy.

You'll see what I mean later in this course. Now, we've talked a lot about the history and about the high level of these protocols and of these smart contracts and what they can do, but what do these smart contracts really mean? What is it when I say trust, minimize agreements or unbreakable promises?

What is the real value add of these smart contracts before we look under the hood and take a peek at how this all works from a technical standpoint. Let's learn what all the value of this is. What is the purpose of us building all these technologies of you taking this course? What problem does this technology solve?

In my mind, a technology is really only as good as the problem that it solves. If it doesn't solve a problem, a then why bother mark contracts, blockchain, web three, cryptocurrencies, those are all just different words that encapsulate the idea of what we're doing in such a unique paradigm. I think the easiest way to sum up what these smart contracts do is that they create trust minimized agreements.

And if you might be scratching your head to that, a much easier way to think about it is just they give rise to unbreakable promises. Yes, you heard that, right? Unbreakable agreements and promises. Additionally, they give rise to speed, efficiency and transparency and a number of other things. I made a video pretty recently about exactly this, so let's dive in and take a listen to the purpose, the undeniable value of smart contracts.