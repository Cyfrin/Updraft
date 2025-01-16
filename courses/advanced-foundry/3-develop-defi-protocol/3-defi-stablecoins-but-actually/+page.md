---
title: Stablecoins, but actually
---

_Follow along the course with this video._

---

### Stablecoins, but actually

Stablecoins have become one of the most talked about topics in the cryptocurrency and blockchain space. However, there is a lot of misleading information out there about what stablecoins really are and how they work. In this lesson, we'll provide a comprehensive overview of stablecoins, clarifying common misconceptions and gleaning a deeper understanding for what makes stablecoins so important in this space.

We hope to cover 5 subjects:

1. What are Stablecoins?
2. Why do we care?
3. Categories and Properties
4. Designs of top Stablecoins
5. What Stablecoins really do

Let's get started.

### What Are Stablecoins?

**_A stablecoin is a non-volatile crypto asset._**

That's really it, at the end of the day. More accurately put:

::image{src='/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually1.png' style='width: 100%; height: auto;'}

[**Investopedia**](https://www.investopedia.com/terms/s/stablecoin.asp) describes `stablecoins` as - Cryptocurrencies the value of which is pegged, or tied, to that of another currency, commodity or financial instrument.

Aaand this is the first place I diverge from conventional media.

This may be a simple way to understand them initially, but `stablecoins` are much more than this.

A `stablecoin` is a crypto asset whose buying power stays relatively stable.

A simple example of unstable buying power is `Bitcoin (BTC)`. The number of apples one could buy with 1BTC 6 months ago is drastically different from how many one could buy today. `Stablecoins`, through a variety of mechanisms we'll discuss later, endeavor to be more similar to a crypto dollar where the number of apples you buy is relatively stable over time.

### Why do we care?

**_Money is important._**

::image{src='/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually2.PNG' style='width: 100%; height: auto;'}

Ok, not Scrooge McDuck important.

Society requires an everyday stable currency in order to fulfill the 3 functions of money:

1. Storage of Value
2. Unit of Account
3. Medium of Exchange

**Storage of Value:** Money retains value over time, allowing individuals to save and defer consumption until a later date. This function is crucial because it means money can be saved, retrieved, and spent in the future without losing its purchasing power (assuming stable inflation).

**Unit of Account:** Money provides a standard numerical unit of measurement for the market value of goods, services, and other transactions. It enables consumers and businesses to make informed decisions because prices and costs can be compared. This function helps in record-keeping and allows for the consistent measurement of financial performance.

**Medium of Exchange:** Money serves as an intermediary in trade, making transactions more efficient than bartering. In a barter system, two parties must have exactly what the other wants, known as a double coincidence of wants. Money eliminates this issue by providing a common medium that everyone accepts in exchange for goods and services.

In Web3, we need a Web3 version of this. This is where stablecoins shine. Assets like BTC and ETH do well as stores of value and as mediums of exchange, but fail as a reasonable unit of account due to their buying power volatility.

### Categories and Properties

This is the second place I strongly disagree with most media! When someone searches for `types of stablecoins` you'll often see them grouped into common buckets:

- Fiat-Collateralized
- Crypto-Collateralized
- Commodity-Collateralized
- Algorithmic

This again is a serviceable understanding of stablecoin categories, but the reality is much more complicated. I prefer to categorize stablecoins as:

1. Relative Stability - Pegged/Anchored or Floating
2. Stability Method - Governed or Algorithmic
3. Collateral Type - Endogenous or Exogenous

**Relative Stability:** Something is only stable relative to its value in something else. The most common type of `stablecoins` are `pegged` or `anchored` `stablecoins`. Their value is determined by their `anchor` to another asset such as the US Dollar. `Tether`, `DAI` and `USDC` are examples of stablecoins which are pegged to USD.

These stablecoins general possess a mechanism which makes them nearly interchangable with the asset to which they're pegged. For example, USDC claims that for each USDC minted, there's an equivalent US Dollar (or equal asset) in a bank account somewhere.

DAI on the other hand, uses permissionless over-colleralization - but we'll get to that later!

As mentioned, stablecoins don't have to be pegged. Even when pegged to a relatively stable asset like the US Dollar, forces such as inflation can reduce buying power over time. A proposed solution (that's albeit much more complex) are floating value stablecoins, where, through clever math and algorithms the buying power of the asset is kept stable overtime without being anchors to another particular asset. We won't go into much detail of these here, but if you're interested in learning more, I encourage you to check out this [**Medium Article on RAI**](https://medium.com/intotheblock/rai-a-free-floating-stablecoin-that-actually-works-d9efbbca94c0), a free-floating stablecoin.

**Stability Method:** Another major delineating factor of `stablecoins` is the stability method employed. This _is_ the mechanism that keeps the asset's value stable. How is the asset pegged to another?

This usually works by having the `stablecoin` mint and burn in very specific ways and is usually determined by who or what is doing the mint/burn.

This process can exist on a spectrum between `governed` and `algorithmic`.

- **Governed:** This denotes an entity which ultimately decides if stablecoins in a protocol should be minted or burned. This could something _very_ centralized and controller, like a single person, or more democratic such as governed via DAO. Governed stablecoins are generally considered to be quite centralized. This can be tempered by DAO participations, but we'll get more into how that affects things later
  - Examples of governed stablecoins include:
    - USDC
    - Tether
    - USDT
- **Algorithmic:** Conversely, algorithmic stablecoins maintain their stability through a permissionless algorithm with **no human intervention**. I would consider a stablecoin like DAI as being an example of an algorithmic stablecoin for this reason. All an algorithmic stablecoin is, is one which the minting and burning is dictated by autonomous code.
  - Examples of algorithmic stablecoins include:
    - DAI
    - FRAX
    - RAI
    - UST - RIP, we'll talk more about this later.

You can see what I mean by spectrum by comparing how some of these tokens function. DAI is a bit of a hybrid where a DAO determines things like interest rates, but the minting/burning is handled autonomously. USDC is an example of something very centralized, with a single governing body, where as UST was almost purely algorithmic.

[**The Dirt Roads blog**](https://dirtroads.substack.com/p/-40-pruning-memes-algo-stables-are) has a great article and visualizations outlining these differences in detail and where popular assets fall on this spectrum.

::image{src='/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually3.png' style='width: 100%; height: auto;'}

> ❗ **NOTE**
> Dirt Roads uses `Dumb` as the opposite of algorithmic, instead of governed.

You'll notice that most Fiat-Collateralized assets are more governed, as you'll often need a centralized entity to onramp the fiat into the blockchain ecosystem.

In summary:

- Algorithmic Stablecoins use a transparent math equation or autonomously executed code to mint and burn tokens
- Governed Stablecoins mint and burn tokens via human interaction/decision

**Collateral Type:** When we refer to collateral, we're referring to the asset backing the token, giving it its value. USDC is collateralized by the US Dollar, making one USDC worth one USD. DAI is collateralized by many different assets, you can deposit ETH to mint DAI, among many currencies. UST .. In a round about way was collateralized by LUNA.

These are examples of exogenous and endogenous types of collateral.

- **Exogenous:** Collateral which originates from outside of a protocol.
- **Endogenous:** Collateral which originates from within a protocol

The easiest way to determine in which category a stablecoin's collateral falls is the ask this question:

**_If the stablecoin fails, does the underlying collateral also fail?_**

Yes == Endogenous

No == Exogenous

If USDC Fails, the US Dollar isn't going to be affected. USDC is an example of Exogenous collateral. DAI is another example of this, the value of ETH won't be affected by the failure of the DAI protocol.

UST/LUNA on the other hand is an example of Endogenous collateral. When UST failed, LUNA also failed causing the protocol to bleed $40 billion dollars.

Other good questions to ask include:

**_What the collateral created for the purpose of being collateral?_**

or

**_Does the protocol own the issuance of the underlying collateral?_**

What's misleading about how this is covered by traditional media is that they will point to algorithmic stablecoins as being to blame, but I think this is wrong. The risk exists with endogenously collateralized protocols because their value essentially comes from .. nothing or is self-determined at some point in development.

Endogenously collateralized stablecoins don't have a great track record - TerraLUNA and UST was a catastrophic event that wiped billions out of DeFi. So, why would anyone want to develop a stablecoin like this?

Generally the response is Scale/Capital Efficiency.

When a protocol is entirely exogenously collateralized, its marketcap is limited by the collateral it can onboard into the ecosystem. If no collateral needs to be onboarded into the protocol, scaling becomes easier much faster.

Now, many endogenous stablecoins can be traced back to a single [**paper by Robert Sams**](https://blog.bitmex.com/wp-content/uploads/2018/06/A-Note-on-Cryptocurrency-Stabilisation-Seigniorage-Shares.pdf). In this paper he discusses how to build an endogenously collateralized stablecoin using a seigniorage shares model. We won't go deeply into the details of this, but it's an incredibly influential paper than a recommend everyone who's interested should read.

### Thought Experiment

Imagine we had a stablecoin, issued by a bank, backed by gold. Our stablecoin is worth the same as its value in gold because at any point we can swap the coin back to the bank in exchange for gold.

Now, what happens if the bank isn't open weekends? What if the bank is closed for a month? At what point does a lack of access to the underlying collateral cease to matter and the asset becomes valued with respect to itself?

In the Dirt Roads image above, this is what is represented by `reflexive`

I know there's a lot of things here conceptually, don't feel discouraged if you want to come back to these ideas to dive further later.

### Top Stablecoins

We won't go too deeply into the architecture of each of these assets, with the exception of maybe DAI, but I wanted to give you a sense of what's out there, what they propose to do and how the propose to do it.

**DAI**

DAI is:

- Pegged
- Algorithmic
- Exogenously Collateralized

DAI is one of the most influential DeFi projects ever created.

Effectively how DAI works is, a user deposits some form of crypto collateral, such as ETH, and based on the current value of that collateral in US Dollars, some value of DAI is minted the user. It's only possible to mint _less_ DAI than the value of collateral a user has deposited. In this way the stablecoin is said to be over-collateralized.

> ❗ **NOTE**
> DAI also has an annual stability fee on deposited collateral ~2%

When a user wants to redeem their collateral, DAI must be deposited back into the protocol, which then burns the deposited DAI and released the appropriate amount of collateral.

The combination of a stability fee and over-collateralization is often referred to as a `collateralized debt position`.

**_What happens if stability fees can't be paid, or the value of our collateral decreases?_**

If this happens, a user is at risk of liquidation. This is the mechanism through which the system avoids becoming under-collateralized.

The fundamental question I hope you're asking at this point is:

**_Why would I pay a fee to mint this stablecoin?_**

We'll get to that soon, I promise. Let's first look at...

**USDC**

USDC is:

- Pegged
- Governed
- Exogenous

USDC is backed by real-world dollars. Simple as that.

**Terra USD(UST)/Terra LUNA**

This situation has become infamous now, but there's lots we can learn from this disaster to prevent it in the future.

UST was:

- Pegged
- Algorithmic
- Endogenous

What we know about stablecoins now should shed some light on what happened to UST/LUNA. Because UST was backed by LUNA, when UST lost it's peg (usually through a massive influx of trading), it's underlying collateral (LUNA) became less attractive to hold .. which caused UST to lose more value. And thus the circling of the drain began until the asset was all but wiped out.

**FRAX**

FRAX is:

- Pegged
- Algorithmic
- Hybrid

Endogenously collateralize stablecoins are so attractive because they _do_ scale quickly. More recent projects, like FRAX, have tried to thread this needle of hybrid collateralization to find an optimal balance.

**RAI**

RAI is:

- Floating
- Algorithmic
- Exogenous

RAI is one of the few examples of a floating stablecoin. The protocol focuses on 3 things

- minimal governance, achieved through algorithmic mechanisms of stabilization
- Being Floating, such that it's value isn't derived by being tied to another asset
- Only using ETH as collateral

You can read more about the mechanisms of RAI [**here**](https://medium.com/intotheblock/rai-a-free-floating-stablecoin-that-actually-works-d9efbbca94c0).

With all this context and understanding in mind, we've got one thing left to cover.

### What do stablecoins really do?

Maybe we start with asking: **Which is the _best_ stablecoin?**

The answer to this may come down to about whom we're speaking.

Stablecoins, which are centralized, such as USDC, Tether etc, may not really fit the ethos of decentralization in Web3, it might be preferred to have a degree of decentrality.

By the same token (pun intended), algorithmic stablecoins may be intimidating to the average user and the associated fees may be non-starters.

At the end of the day every stablecoin protocol has it's trade-offs and what's right for one person or circumstance may not be right for another.

Now, here's something that may give you whiplash:

**_The stablecoin preferred by the average user, is likely much less important than those preferred by the 'rich whales' in the space_**

::image{src='/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually4.png' style='width: 100%; height: auto;'}

Let me explain with another thought experiment.

### Thought Experiment 2

Say you want to accumulate a tonne of ETH, you've solve everything you own and put it all into ETH, but you want more. How do you accomplish this?

By depositing ETH as collateral into a stablecoin protocol, you're able to mint the stablecoin, and sell it for more ETH. This becomes beneficial when you consider leveraged trading.

**Leveraged Trading:** Leveraged trading involves using borrowed capital to increase the potential return on investment. This strategy can magnify both gains and losses, allowing for potentially higher profits but also increased risk.

This usecase for high-value investing is so pervasive that it's often outlined by platforms as a primary reason to mint, to maximize your position on a crypto asset.

So, to summarize a bit:

**_Why are stablecoins used?_**

- To execute the 3 functions of money.

**_Why are stablecoins minted?_**

- Investors like to make leveraged bets.

### Wrap Up

We've learnt a lot here, and we've only just scratched the surface of DeFi. To sophisticated investors many of the concepts I've covered here may actually be old news. This is common practice in the TradFi space and Web3 employs these same financial mechanisms and incentives.

With protocols like Aave and Curve considering their own stablecoin offerings, I believe things are going to get really interesting. As the industry matures, I believe the development of stablecoins will only improve from the perspectives of functionality and security because they're an essential part of the financial ecosystem in Web3.

For those developers who want to try building their own, there are some minimalistic examples you can check out on the [**defi-minimal GitHub Repo**](https://github.com/smartcontractkit/defi-minimal).

I'm super excited for the future of DeFi and stablecoins. Let's get started creating our very own.

See you in the next lesson!
