## Top-level Named Contracts

In this lesson, we're going to be learning about a new concept called "top-level named networks". So far, we've been deploying our contracts using separate configurations for different networks. But, what if we could write one configuration for each of our networks and then have a top-level file to act as the main configuration file? This way, we can avoid repeating ourselves when deploying to different networks. We can use a technique called "top-level named networks" to do this.

Here's how we can implement this technique:

1. First, let's create a new section for each network:

```toml
[networks.contracts]
deployer_script = "script/deploy_mocks.py"
abi = "Mock/v3_aggregator.json"

[networks.contracts.price_feed]
address = "0x6944A41769357215DE4FAC4081f1f1309aDc323586"
deployer_script = "script/deploy_mocks.py"

[networks.pyevm.contracts.price_feed]
deployer_script = "script/deploy_mocks.py"
```

2. Next, create a section for a "top-level named contract":

```toml
[networks.contracts.coffee]
deployer_script = "script/deploy.py"
```

Now, for every network that doesn't have an address, it will automatically deploy a mock for us. This makes our life a little easier, but we can also specify an address for the network if we want.

We can see that we do not need a deployer script for the `sepolia` network because we already have a default deployer script that can be used for all networks.

Let's go ahead and run the following command to deploy to our network:

```bash
mox run deploy --network sepolia
```

We are warned that our contract won't be compiled, but we are able to deploy.

Now, we're going to refactor our code to include the power of top-level named networks. Let's add a line of code to our `deploy_coffee` function:

```python
def deploy_coffee(price_feed: VyperContract) -> VyperContract:
    coffee: VyperContract = buy_me_a_coffee.deploy(price_feed)
    print(f"Coffee deployed at {coffee.address}")
```

We're going to go ahead and pass in the price feed to the `deploy_coffee` function. We can access our price feed using a `manifest named` function. The `manifest named` function will allow us to access any named contract that has been specified in our `mocassin.toml` configuration file. We can use this function in our `mocassin_main` function like so:

```python
def moccasin_main() -> VyperContract:
    active_network = get_active_network()
    price_feed: VyperContract = active_network.manifest_named('price_feed')
    print(f"On network {active_network.name}, using price feed at {price_feed.address}")
    return deploy_coffee(price_feed)
```

Here's the breakdown of the code:

1. We're first going to get the active network using the `get_active_network` function.
2. Next, we're going to use the `manifest_named` function to get the price feed.
3. We're going to print a message about the network and the price feed.
4. Finally, we're going to return the deployed `coffee` contract.

This allows us to deploy our contract in a way that is easy to maintain and test.

We can now deploy to our local network, an actual network, or a fork network.
