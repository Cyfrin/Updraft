In this lesson, we'll talk about deployment in our stablecoin. We have a way for people to deposit collateral into the system and those deposits will allow them to mint DSC, mint this stablecoin. They can also redeem their collateral and they can burn the amount of stablecoins that they've minted. If all of a sudden, their health factor is bad, meaning their ratio of collateral to DSC minted is bad, other people can then come in and liquidate them, and they are incentivized to do so because they get bonus collateral to liquidate them. 

So, we really don't want to be liquidated because someone's going to take a lot of your collateral to just slightly improve your health factor, and we don't want that. 

So, this is kind of our final codebase, but not quite yet because you know we're trying to test this. You know we're trying to make sure this works. So, let's go ahead over to our script, and let's create a deploy.py. Now, in the GitHub repo associated with this, we got a script. We have everything kind of in this deploy DSC engine uh, we're going to create two more. We're going to do deploy DSC .py and deploy DSC engine .py. So, we have to deploy our decentralized stablecoin first. So, we'll do a little def moccasin main, deploy DSC. def deploy DSC, pass, def moccasin main, deploy DSC. 

```python
def deploy_dsc():
    pass

def moccasin_main():
    deploy_dsc()
```

We will say, from DSC import decentralized stable coin. And, we'll do decentralized stable coin .deploy. And, we will return this. So, this is going to return a Vyper contract, which we're going to say, from moccasin .boa tools import VyperContract. I'm going to do UV add moccasin just to get rid of those squiggly lines. I'm going to hit yes to update my Python environment in my VS Code. That looks great, and we'll also have this return of Vyper contract as well. 

```python
from src import decentralized_stable_coin

def deploy_dsc():
    return decentralized_stable_coin.deploy()

from moccasin.boa_tools import VyperContract

def moccasin_main():
    return deploy_dsc()
```

Cool. Now, in deploy DSC engine, we're going to do def deploy DSC engine, which will take a DSC, which is a Vyper contract as an input variable. So, we'll do from moccasin .boa tools import VyperContract. And, what we'll do is, we need a number of things in here.  We're going to go to our moccasin .toml. I'm going to go ahead and delete everything. And, we're going to grab some contract addresses. Let me zoom out a bit here. So, I'm going to do networks .zk sync .contracts. And, because you've done this a hundred times at this point, I'm not going to make you do it again. We can go to the mox stablecoin GitHub draft, we can grab all these addresses from the zk sync network. We can see we have ETH USD price feed here, WETH and wrapped Bitcoin, WETH and wrapped Bitcoin are going to be our two collaterals and we have price feeds for both of them. So, we're going to go ahead and copy these all. Boom. Paste them in here. And, then if we scroll up, we see we have some mock deployer scripts as well for everything. I'm also going to copy all of these, paste them into here as well because we've written these kind of deploy mocks a hundred times as well. And, because of that, I'm also going to save you all the trouble. You can go to scripts mocks deploy price feed. We can grab this because we've already done that. I'm going to add it to mine as well, new folder, new folder, mocks, deploy price feed .py. Paste this in from SRC .mocks import mock V3 aggregator, which means we need a new folder mocks in here. And, a new mock V3 aggregator .py. This is also one you've done a few times now, so I'm not going to make you do that either. We're going to grab that from SRC mocks, mock V3 aggregator .py. We're just going to go ahead and copy this whole thing.

```python
from moccasin.boa_tools import VyperContract
from moccasin.config import get_active_network
from src import dsc_engine

def deploy_dsc_engine(dsc: VyperContract):
    active_network = get_active_network()
    btc_usd = active_network.manifest_named("btc_usd_price_feed")
    eth_usd = active_network.manifest_named("eth_usd_price_feed")
    wbtc = active_network.manifest_named("wbtc")
    weth = active_network.manifest_named("weth")
    dsc_engine_contract = dsc_engine.deploy(
        [wbtc.address, weth.address], 
        [btc_usd.address, eth_usd.address], 
        dsc
    )
    dsc_engine_contract.set_minter(dsc_engine_contract.address, True)
    dsc_engine_contract.transfer_ownership(dsc_engine_contract.address)
    return dsc_engine_contract

def moccasin_main():
    active_network = get_active_network()
    dsc = active_network.manifest_named("decentralized_stable_coin")
    return deploy_dsc_engine(dsc).address
```

And, paste it in here. Looks good to me. So, from SRC .mocks, mock V3 aggregator, that looks good now. We have a little deploy price feed here. That looks nice. Great. We're also going to need a deploy collateral script. Let's go ahead. Let's create that too. deploy collateral .py. This one's also going to be pretty simple. I am going to make you write this one because we haven't done this that often. Return deploy collateral. def deploy collateral, print deploying token . . . . mock token contract equals. We're going to need a mock token as well. You can copy this as well from the GitHub repo associated with this because you don't need to spend your time and efforts writing mock contracts when they're already done for you. So, mocks, mock token .vy. Paste that in. 

```python
def deploy_collateral():
    print("Deploying token...")
    mock_token_contract = ...

def moccasin_main():
    return deploy_collateral()
```

And, now that we have that, I can do from SRC .mocks import mock token. And, I can just say, mock token .deploy like this. I can actually just do return token .deploy. Lovely. Oh. Okay, then I'm going to need deploy DSC. Okay, lovely. Now, that we have all of that stuff, where even was I? Deploy DSC engine, deploy DSC, deploy DSC engine. Oh, okay. Now, that I have all that stuff, we can finally do from moccasin .config import get active network.  Active network equals get active network. Now, we'll say BTC USD equals active network .manifest named uh, what do we call it? BTC USD price feed? BTC USD price feed. Paste. ETH USD will be ETH USD price feed. Then, we'll say wrapped Bitcoin equals active network .manifest named wrapped Bitcoin, and then we'll do the same thing for WETH here. WETH, WETH. Now, that we have our price feeds and we have our tokens and we've given them deployer scripts, so that if we run on pie VM, or pie VM will deploy them as mocks for us. I can finally do DSC engine contract equals from SRC import DSC engine. DSC engine .deploy, [wrapped Bitcoin .address, WETH .address], [BTC USD .address, ETH USD .address], DSC. Then, we're going to say on the DSC contract. We want to do DSC .set minter to the DSC engine contract .address to true. And, we also want to do DSC .transfer ownership to the DSC engine contract address. And then return DSC engine contract.  

```python
from moccasin.boa_tools import VyperContract
from moccasin.config import get_active_network
from src import dsc_engine

def deploy_dsc_engine(dsc: VyperContract):
    active_network = get_active_network()
    btc_usd = active_network.manifest_named("btc_usd_price_feed")
    eth_usd = active_network.manifest_named("eth_usd_price_feed")
    wbtc = active_network.manifest_named("wbtc")
    weth = active_network.manifest_named("weth")
    dsc_engine_contract = dsc_engine.deploy(
        [wbtc.address, weth.address],
        [btc_usd.address, eth_usd.address], 
        dsc
    )
    dsc_engine_contract.set_minter(dsc_engine_contract.address, True)
    dsc_engine_contract.transfer_ownership(dsc_engine_contract.address)
    return dsc_engine_contract

def moccasin_main():
    active_network = get_active_network()
    dsc = active_network.manifest_named("decentralized_stable_coin")
    return deploy_dsc_engine(dsc).address
```

Do a little def moccasin main. I'll do active network equals get active network, DSC equals active network .manifest named DSC. Go to our moccasin .toml. We're actually calling it decentralized stablecoin. So, we'll do manifest named decentralized stable coin. And then return deploy DSC engine DSC .address. So, let's try this out. See if this works. 

```bash
mox run deploy_dsc_engine
```

Deploying token. Deploying token. Oh, this is coming along great. My scripts seem to be working. I don't know if the codebase if my code is actually good, but I can rip through the deploy scripts really quickly cuz I've done them a hundred times. I can write a stablecoin really quickly. I haven't done that a hundred times, well, I have, but you haven't done that a hundred times, but you're getting the feel of it and this is incredibly exciting. 
