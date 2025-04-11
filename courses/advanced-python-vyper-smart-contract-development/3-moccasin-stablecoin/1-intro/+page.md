## Section: Mox Stablecoin

Welcome back to the stablecoin section of Cyfrin Updraft. 

The complete code that we're going to be working with is right here, as always.

```bash
git clone https://github.com/Cyfrin/mox-stablecoin-cu
cd mox-stablecoin-cu
mox install
```

```bash
mox run deploy
```

Now, stablecoins are something that we've worked on in the past, and you are going to build your own stablecoin. You�re going to be building one of these tokens that we worked with over in the algorithmic trading portion of this course. However, this is going to be an incredibly powerful stablecoin and one of the most impressive DeFi applications you've created up to this point. 

Stablecoins are quite often incorrect. So we�re going to be learning a lot about what stablecoins actually are, as well as going through and building our own. 

Let me go ahead and show you what the final code base for this is going to look like here. And this is going to be a project you should try to go all out on. Writing fantastic tests, making the contracts look beautiful. This is going to be your chance to say, �Okay. I�m going to build this end-to-end. I�m going to build this full project, and I'm going to make it as good as I possibly can.� In fact, the Solidity implementation of this was actually audited on the CodeHawks platform. And you can see a list of findings, a list of security issues that were found on that original implementation in the GitHub repo as well. You can even click on the link in the GitHub repo, which will bring you to the actual contest, the known issues. You can even view the contest results as well. If you go to contest details, you can hit view results here, and you can see how well people did, how much money they made, and then obviously the final report on this GitHub, on this project, on this code base as well. Obviously, it was Solidity so it's a little bit different, but, that digresses.

So, the final code base we're going to be doing is we're going to have this decentralized stablecoin.  

```python
@deploy
def init():
    ow._init()
    erc20._init(NAME, SYMBOL, DECIMALS, NAME, EIP712_VERSION)
```

Now, looking at this decentralized stablecoin, it looks pretty minimal, right? It doesn't look like there's really anything interesting about it. But what we're going to be doing is the owner of this stablecoin is actually going to be this DSC engine. So, the owner of the stablecoin is actually going to be another smart contract. And if we scroll down in here, there is a lot more going on in here. We�re going to be able to mint the stablecoin by depositing and redeeming collateral. What we�re going to be doing here is building something similar to, if we go to DeFiLlama and scroll down here, we�re going to be something similar to what this protocol called Maker created. So, Maker, the MakerDAO created this thing called Dai, which is a decentralized stablecoin. So if we hit use Dai on their website, you can earn 9.5% on your stablecoin. That's pretty crazy!

Um, but basically this Dai token, you go to CoinGecko, look up this Dai token. This also is worth a dollar. It looks like it's recently been rebranded to USDDS, which we can also look at as well. And we can see if we go to kind of like the max timeline on this, it's been pretty much around a dollar for its entire career, keeping it's trying to stay true to its value as a stablecoin.

And, our stablecoin that we're going to be building here is going to be very similar to how Dai works or, I guess I should say the original implementation of Dai. We�re going to be able to deposit collateral to mint the Dai token, and redeem our collateral as well, similar to working with Ave or working with the WETH token.

Now, the superpower of this is in this liquidate function. If people don�t have enough collateral, if people have minted more Dai than they put down collateral, other users can liquidate them. And we'll talk about that a little bit more when we get to that section. People can redeem collateral, they can burn their USDC, we�ll implement this thing called a health factor. We'll be getting pricing information, and so much more.

```python
@external
def liquidateCollateral(address user, address address, debt_to_cover: uint256):
    assert debt_to_cover > 0, "DSCEngine: NeedsMoreThanZero"
    starting_user_health_factor: uint256 = self.health_factor(user)
    assert (
        starting_user_health_factor < MIN_HEALTH_FACTOR
    ), "DSCEngine: HealthFactorOk"
    token_amount_from_debt_covered: uint256 = self.get_token_amount_from_usd(
        collateral, debt_to_cover
    )
    bonus_collateral: uint256 = (
        token_amount_from_debt_covered * LIQUIDATION_BONUS
    ) // LIQUIDATION_PRECISION
    self.redeemCollateral(
        token_amount_from_debt_covered + bonus_collateral,
        user,
        msg.sender,
    )
    self.burnDscToCover(debt_to_cover, user, msg.sender)
    ending_user_health_factor: uint256 = self.health_factor(user)
    assert (
        ending_user_health_factor > starting_user_health_factor
    ), "DSCEngine: HealthFactorNotImproved"
    self.revert_if_health_factor_is_broken(msg.sender)
```

And it�s this, like I said, it's this contract, it's this set of rules that will govern how users can buy and sell and work with this stablecoin. Additionally, we'll be adding this oracle contract to try to make working with the oracles a little bit safer. We, of course, are going to have some deploy scripts to deploy everything, and some verification scripts as well. We additionally are going to have a ton of unit tests, and you should write even more than what we have here. But additionally, we will have some fuzz tests, some stateful fuzzing fuzz tests as well, to get everything going. We can run

```bash
mox run deploy
```

which should go ahead, deploy our token, deploy well, a mock contract, and deploy the DSC engine as well. And we should be able to run

```bash
mox test 
```

which will run all of our tests, fuzzing, and you�ll notice we're taking quite some time to run a lot of fuzz tests on this. And yes, this will highly likely take some time. But then we run the rest of the tests as well. We could also, of course, do

```bash
mox test -n auto
```

to run our tests in parallel to run everything a little bit quicker here. Still, the slowest bit is going to be the fuzz tests, so we're still going to have to wait for it sometime. All right, but everything passes.

So, this is going to be your flagship project of your entire Vyper and Python curriculum. That's why there's this giant star next to it, if we go to the to the GitHub repo. There's this giant star next to it because this is going to be one of the most advanced projects you work on. Period. Probably one of the most advanced projects you ever work on.

After we get through this, we have a couple of quick ones to end out the course. So, this is the one you should probably be spending the most time on, working the hardest on to get it really right and make it really good. And be sure to push this up to your GitHub after you finish.

And we're going to code this as if we're going to be deploying this. Every single one of your smart contracts you want to build you want to keep in mind. I'm going to build this as if I'm going to be deploying this. I'm going to make sure my code is clean. I'm going to make sure my tests are clean. I'm going to think about security. I know we haven't done too much thinking about security, but we're going to write very dispensable code with really good tests, and the like. Additionally, we�re going to be going over some DeFi stuff, some DeFi concepts, and oftentimes that's going to be the hardest part of working with this. So if some of this DeFi stuff goes over your head, if it's confusing, AIs are phenomenal at understanding finance, so ask your AIs, ask your discussions, ask your friends, jump to the discord, ask questions. It�ll get confusing, and that's okay. There's no stupid questions. I want you to just rapidly fire ask questions here. 
