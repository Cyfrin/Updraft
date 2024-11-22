## Deploying to Tenderly Virtual Network

We're going to deploy our contract to our fake Tenderly chain. Remember, if we have your Tenderly application setup, it will fetch data for a second.

We'll switch to injected Metamask in our Remix IDE and select our fake chain. We'll then deploy the contract. Before deploying, we need to ensure the Solidity contract is compiled. This is a requirement of the Remix IDE as of this recording.

After we deploy our contract, we'll switch back to Remix VM. Our fake chain is based on the Sepolia network, which is a test network. We've turned off state sync for this chain. That means we won't update the chain to the latest Sepolia block. This will keep costs down.

We can then call the `get_price` function, which will return the ETH price on Sepolia when we first created this chain.

Let's go over the major concepts we just used:

1.  **ABI**
2.  **Address**
3.  **Static Call**

We need to understand what an ABI and address is when we interact with contracts. We got the address for our chainlink price feed from the chainlink documentation. We also got the ABI for the contract from the `AggregatorV3Interface` interface. This interface essentially defines the ABI and tells us which functions are available.

When we interact with a contract, we have to specify whether it is a `static call` or `ext call`. A `static call` does not modify the state of a contract. In this case, we were performing a `static call` to our `get_price` function because we were simply calling the view function of the contract.

If you're still getting up to speed on this, don't worry. We'll go over these concepts in more detail throughout Updraft.

```python
def get_price() -> int256:
    price_feed: AggregatorV3Interface = AggregatorV3Interface(0x6944A41769357215DE4FAC081bf1f309aDb)
    return staticcall(price_feed.latestAnswer())
```

This code shows how we are getting the latest ETH price from the chainlink price feed. We call the `latestAnswer` function of the price feed, which returns an integer.
