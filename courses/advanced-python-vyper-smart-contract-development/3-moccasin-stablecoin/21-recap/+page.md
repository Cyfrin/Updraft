We just finished writing a decentralized stablecoin and we should be very proud of ourselves. 

Let's do a quick recap of what we accomplished.

First, we learned about stablecoins, and different types of stablecoins. We learned about things like:

- Collateral (Exogenous (WETH, WBTC, etc...), Endogenous, and Collateral Type)
- Minting (Stability Mechanism, Decentralized (Algorithmic) Value (Relative Stability), Anchored (Pegged to USD))

We watched that long video of me talking about collateral types. Remember, this is important both as a developer and as someone who may be engaging with DeFi. Now you can go, "okay, is this a collateralized stablecoin?". 

We learned a lot about deploying production code and working with production code. We learned about DeFi in general and how to deploy, redeem, mint, burn, and liquidate collateral.

We wrote unit tests. We only have two in this lesson. If you go to the GitHub repo you'll find we have a lot more. If you don't write tests, shame on you because that is one of the biggest learning pieces from this entire section.

We also wrote fuzz tests. Remember, fuzz tests allow us to have an even higher assurance that the code we wrote is good. 

We worked with mocks and interfaces. And we even did a little bit of thinking about audit prep. 

We can format everything in our project a little bit nicer with UV Run Ruff, like this:

```bash
uv run ruff check --select I --fix
```

Let's also run Mamushi to reformat our Vyper files:

```bash
uv run mamushi src
```

Congratulations on completing the Mocassin Stablecoin course! 
Now is a great time to take a break, go for a walk, hit the gym, or grab some ice cream. We are almost done! 
