## What is a Stablecoin? (But Actually)

We are going to learn about stablecoins and why they are important.

Let's start with the definition of a stablecoin. A stablecoin is a cryptocurrency whose buying power stays relatively stable. It doesn't fluctuate in value compared to the rest of the market.

Why do we care about stablecoins? Because money is important! In everyday society, we need a stable currency to fulfill the three functions of money. In Web3, we need a crypto version of this.

The three functions of money are:

* Storage of value
* Unit of account
* Medium of exchange

We need a stablecoin that fulfills these three functions.

Here's where we need to start disagreeing with traditional media.  Stablecoins are often categorized into these four categories:

* Fiat-collateralized
* Crypto-backed
* Commodity-backed
* Algorithmic 

This isn't the worst way to categorize them. It makes it easier for new people to understand, but I think it paints an inaccurate picture.

Here's what we are going to do. We are going to categorize stablecoins by:

* **Relative stability** - pegged/anchored or floating.
* **Stability method** - governed or algorithmic.
* **Collateral type** - endogenous or exogenous.

Let's start with relative stability.

When we talk about stability, something is only stable relative to something else.

The most popular type of stablecoin is a pegged or anchored stablecoin. These are stablecoins that are pegged or anchored to another asset like the USD.

Examples of pegged stablecoins are:

* Tether
* Dai
* USDC

They follow the narrative of one of these coins equals $1.00 and that's how they stay stable. They are stable because they track the price of another asset that we think is stable.

Most of these stablecoins have some type of mechanism to make them almost interchangeable with their pegged assets.

USDC says for every USDC token printed or minted, there is a dollar or a bunch of assets that equal a dollar in some bank account somewhere. So, the way it keeps its value is that at any time, you should be able to swap your USDC for the dollar. Or at least, hypothetically, so.

Die, on the other hand, uses a permissionless over-collateralization to maintain its peg. But, we'll get to understanding that a little later.

However, a stablecoin doesn't have to be pegged to another asset. It can be floating.

Remember, to be considered a stablecoin, its buying power just has to stay relatively the same over time.

So, a floating stablecoin is floating because it's buying power stays the same and it's not tied down to any other asset.

With this mechanism, you could hypothetically have a stablecoin that's even more stable than an anchored or pegged stablecoin.

Let's look at an example. 

Let's say I can buy 10 apples for $10 today, but in 5 years, I can only buy five apples with $10.  That is an example of buying power changing and not being very stable. 

But, someone buying apples with dollars would probably be able to buy the same amount of apples six months ago to now. That's an example of buying power staying relatively the same.

Since we can buy the same amount of apples today than six months ago, a dollar would be considered a more stable asset whereas Bitcoin would be much less stable. This is what we mean by buying power.

Now, let's look at the second categorization, stability method.

The stability method is the mechanism that keeps the coins stable. If it's a pegged stablecoin, what is the pegging mechanism? If it's a floating stablecoin, well, what is the floating mechanism?

And, it typically revolves around minting and burning the stablecoins in very specific ways. And, usually, it refers to who or what is doing the minting and burning.

These are on a spectrum of governed to algorithmic. In a governed stablecoin, there is a governing body or a centralized body that is minting and burning the stablecoins.

Examples of algorithmic stablecoins are:

* Die
* Frax
* Rai

And yes, the $40 billion disaster UST. 

Yes, we are going to talk a little bit more about classic UST and Luna.

Now, a token can have algorithmic and governed properties in the same way that it can be somewhere in the middle of being floating and pegged. 

Die, for example, does have an autonomous set of code that dictates the minting and burning, but it also has a DAO where they can vote on different interest rates and what can be collateral types and different things like that.

So, technically it is a hybrid system. It has some governance mechanisms and also some algorithmic ones.

USDC would fall purely in the governed category because it's controlled by a centralized body.

UST and Luna would fall almost purely in algorithmic.

The Dirt Roads blog has some amazing takes on these pieces and a wonderful visualization of where in a spectrum of coins that are more algorithmic or governed.

They use "dumb" as the opposite of "algorithmic" instead of "governed," which probably isn't wrong. Most classically categorized fiat collateralized stablecoins almost all fall into the governed or dumb section since they are dealing with fiat currency and you need a centralized entity to onboard that fiat to the blockchain. 

You'll also notice on this chart, they have anchored versus reflexive on the x-axis. That's referring to how the collateral type affects the stablecoin. Collateral type is what we are going to cover next.

So, the summary here, though, is algorithmic stablecoins use some sort of autonomous permissionless code to mint and burn tokens, whereas a governed stablecoin has some human interaction that mints and burns the coins and keeps them stable.

Now, before we go to our final category, let's look at this chart again.

We could replace the word "anchored" with exogenous, and reflexive with endogenous. And we have a chart that shows collateral type versus stability mechanism, which brings us to number three, collateral type.

Now, when we say collateral we mean the stuff backing our stablecoins and giving it value.

USDC has the dollar as its collateral, and it's the dollar that gives the USDC token its value, because you can hypothetically swap one USDC for $1.00.

Die is collateralized by many assets. For example, you could deposit ETH and get minted Die in return.

UST was, in a roundabout way, collateralized by Luna. 

Exogenous collateral is collateral that originates from outside the protocol, and endogenous collateral originates from inside the protocol.

So, one of the easier ways to define what type of collateral a protocol is using is to ask this question: if the stablecoin fails, does the underlying collateral also fail? If yes, it's endogenous. If no, it's exogenous.

If USDC fails, the protocol does the underlying collateral, the dollar, fail? No, so the protocol has exogenous collateral. If the USDC stablecoin fails, the dollar is going to keep being the dollar.

If Die, the stablecoin, fails, does the underlying collateral, ETH, also fail? No. So, the Die system is exogenous. The value of ETH isn't dependent on the value of Die.

If UST fails, does the underlying collateral, Luna slash Terra fail? Yes, absolutely. And, this is exactly what happened that caused the system to lose $40 billion in what seemed like a day.

Exogenous collateral originates from outside the protocol. Endogenous collateral originates from inside the protocol.

Two other good tests that you can ask are: was the collateral created with the sole purpose of being collateral, or does the protocol own the issuance of the underlying collateral?

If the answer is yes to either one of those, then it's endogenous collateral.

Now, the traditional media usually says that algorithmic stablecoins are to blame. But, I think what they are really referring to is endogenously collateralized stablecoins. It makes sense that they can be scary and potentially dangerous, because their value kind of comes from nothing. Endogenously collateralized stablecoins are typically over-collateralized, meaning there's more value of collateral than there is of the stablecoins.

Here, we have another image from Dirt Roads comparing different stablecoins. The exogenous versus endogenous collateral of the protocols and how much they have. 

MakerDAO slash Die has almost all exogenous collateral.

Frax, which is another stablecoin we haven't really spoken about too much, has a mix of exogenous and endogenous collateral.

And the old Terra Luna and UST system had mainly endogenous collateral, which is how the system was able to crumble so quickly.

So, yeah, yeah. Endogenously collateralized stablecoins don't have a great track record. So, why would you want to make one? Well, the answer is scale. And, often times people will also say capital efficiency.

With exogenously collateralized stablecoins, the only way you can mint more stablecoins is by onboarding more collateral. 

You can only have a stablecoin market cap that is as high or higher than that of all your collateral.

So, if you want to have $68 billion in stablecoins, then that means you need to have $68 billion worth of collateral. And, that's a lot of money that you would need to onboard to your system.

If you have an endogenously collateralized stablecoin, you can have $0 worth of collateral, meaning it's much easier to become massive faster.

Now, I agree with the Dirt Roads publication when they say that exogenously collateralized stablecoins can't scale. And, I talked more about that in the blog associated with this video. So, if you are interested, be sure to check that out after the rest of this video. 

But, watch the rest of this video because we are just getting started.

In the blog, we also talk more about seigniorage shares and shelling coin logic, which, if you are interested in that stuff, definitely check it out.

Most of these endogenously collateralized coins can be traced back to a paper written by a man named Robert Sams, where he talks about how to build an endogenously collateralized stablecoin using a seigniorage shares model. Which, again, I'm not going to go into, but I wanted to mention it, because it's probably one of the most influential papers when it comes to these endogenously collateralized stablecoins.

Let's move on to the concept of **reflexive**, which relates to the **collateral type**.

When we talk about collateral, we mean the stuff backing our stablecoins and giving it value. 

Examples of collateral types include:

* **USD**
* **ETH**
* **Luna**

The **exogenous versus endogenous** distinction is important:

* **Exogenous collateral** originates from outside the protocol.
* **Endogenous collateral** originates from inside the protocol.

Here are two good tests to determine which category a protocol is using:

* Was the collateral created with the sole purpose of being collateral?
* Does the protocol own the issuance of the underlying collateral?

If the answer is **yes** to either one of these, then it's **endogenous collateral**.

Now, the traditional media usually says that algorithmic stablecoins are to blame. But, I think what they are really referring to is **endogenously collateralized stablecoins**. It makes sense that they can be scary and potentially dangerous, because their value kind of comes from nothing. 

Endogenously collateralized stablecoins are typically **over-collateralized**, meaning there's more value of collateral than there is of the stablecoins.

If you have an endogenously collateralized stablecoin, you can have $0 worth of collateral, meaning it's much easier to become massive faster.

Now, I agree with the Dirt Roads publication when they say that exogenously collateralized stablecoins can't scale. And, I talked more about that in the blog associated with this video. So, if you are interested, be sure to check that out after the rest of this video. 

But, watch the rest of this video because we are just getting started.

In the blog, we also talk more about **seigniorage shares** and **shelling coin logic**, which, if you are interested in that stuff, definitely check it out.

Most of these endogenously collateralized coins can be traced back to a paper written by a man named Robert Sams, where he talks about how to build an endogenously collateralized stablecoin using a seigniorage shares model. Which, again, I'm not going to go into, but I wanted to mention it, because it's probably one of the most influential papers when it comes to these endogenously collateralized stablecoins.

Let's move on to **the fourth category, what they actually do.**

We'll start by asking the question, okay, which one of these is the best stablecoin? And to that, I need to ask, the best stablecoin for who?

Centralized governed coins obviously have the issue of centrality, which sort of defeats the purpose of being in Web3. So, maybe we want some flavors of algorithmic stablecoins. Maybe that's probably what we want for Web3. But these algorithmic coins might feel untested to non-crypto people, and the fees associated with them might be a little bit scary.

For me, personally, like I said, I really love the idea of Rai. The idea is to have stable buying power as opposed to being pegged to some other asset and its algorithmic nature as opposed to being centralized. So, it's a decentralized stablecoin. That's what we want. But every coin has their trade-offs. And I would argue there is definitely no best coin right now. The stablecoin that's best for the average person might matter much less. It's a stablecoin that's best for rich whales might be what's more important here.

Now, for most algorithmic stablecoins, you'll see this: some sort of fee associated with minting the coins. 

Protocols do make money off of these stablecoin systems, which I think is good. Sometimes they need money for maintenance, incentives for the stability of the coin, or money for improvements. So I do think these fees are good.

We need stablecoins for the three functions of money. Storage of value, unit of account and medium of exchange. But are you going to be the one to pay these fees to mint them and keep them in circulation? 

Someone has to pay to mint these coins and often keep paying. The market cap for some of these stablecoins is in the billions. If there's a 1% fee on these and the market cap is $1 billion, or talking about $10 million. Are average people going to collectively pay $10 million a year to keep these in circulation? No.

So, average people aren't minting these for the three functions of money, well, then who is minting these? So let's play a little bit of a thought experiment. Let's say I have ETH as an investment and I've bought up all the ETH. I've sold my house. I've sold everything I own, and I've used everything I have to buy Ethereum. But, I want more, what can I do? I can put my ETH into one of these stablecoin protocols, get the minted stablecoin and then sell the stablecoin for more ETH. You might have heard concepts like leverage investing, or margin trading, and this is essentially the Web3 equivalent. It's kind of funny.

We can get into more depth about **how a stablecoin like Dai works** with an example:

```text
How DAI/MakerDAO works
$100 in ETH
1 ETH == $2000
$50 in DAI
Mint
$100 in ETH
2% Stability Fee
1 ETH == $2000
$50 in DAI
Burn
```

The stability fee is used to make sure that the system always has more collateral than minted Die. It's also a sort of punishment if someone doesn't keep their collateral up and a way to save the system from becoming under-collateralized.

Additionally, MakerDAO has a **Maker token** that is used to vote. 

Now, let's look at **Rai**. 

Rai is one of the few floating stablecoins. It uses a **nearly purely algorithmic** stability mechanism. Its collateral type is ETH.

The idea is to have stable buying power as opposed to being pegged to some other asset.

It's **decentralized**, meaning there is no governing body and no one controlling the minting and burning of coins.

We are going to get better and better at creating stablecoins because they are important.

In the DeFi Minimal repo, we have some minimal stablecoin contract examples, link in the description. 


