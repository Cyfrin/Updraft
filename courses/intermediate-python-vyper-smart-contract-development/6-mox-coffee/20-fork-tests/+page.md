## Fork Tests

We've written some unit tests and learned a little more about gas. We could write an integration test, but we've been kind of doing that with our unit tests here, so I'm going to skip it for now. But, we haven't done the staging tests and we also haven't done the forked tests. So, let's go ahead and create the staging folder, but let's do the fork tests, because technically the fork tests are a type of staging tests.

Now, what are fork tests? Now, fork tests are going to be very similar to us just working with the tenderly virtual network. So, our tenderly virtual network is an example of a forked network. So, what really is a forked chain, cuz I've kind of been dancing around it a little bit? Well, so, imagine there's a real blockchain, right? A real blockchain is happening and blocks are being added, and people are sending transactions, and everything. Well, imagine we, on the side, what we do is we spin up our little fake anvil chain. We spin up a fake much tinier little chain.  Now, the idea behind a forked blockchain is that it will resemble everything that's on a real blockchain, but in an easier way. So, if in my python code, I'm connected to this forked blockchain, but I call `price_feed.latestAnswer`... Well, our forked blockchain is empty, it doesn't have this price feed on it. Well, the real blockchain does have the price feed, right? It does have this price feed contract. So, since we're connected to kind of this forked empty little thing, what happens is we say hey, we want the latest answer or fake chain. What it does is it makes an API call to the real chain. Says hey, I need this price feed. I need this contract. And what it does is kind of at request time, it'll grab that price feed and give it to itself. Give it to itself and it'll like, oh yeah, I had this the whole time. They'll go, oh, I had this the whole time. And then, we will be able to call it and interact with it as if we were interacting with the real blockchain. This allows us to quote-unquote have the whole blockchain, but only really when we request something about the real blockchain.  This is also incredibly helpful for us to have this forked blockchain because then, we can do something like `buy_me_a_coffee.deploy` and we'll deploy it to this forked faked blockchain, which kind of has all the real contracts that are on the actual real blockchain. Because any time any of these contracts need the data from a real contract, our forked blockchain will just go ahead and grab it and copy it to itself essentially. So, forked blockchains are incredibly helpful because they allow us to simulate a real blockchain without actually having the whole blockchain, but for our from our perspectives, we have the whole blockchain at our disposal, which is really really nice. And forked tests and running forked tests therefore are one of the most important steps whenever you're going to try to deploy a smart contract because you want to see hey, what does my test look like compared up against a real blockchain with the real contracts, because my mocks could have been wrong. I could have screwed these up, right? So, we always want to run what's called forked tests.

Now, these are actually really easy for us to run in Moccasin. All we have to do is in our `Moccasin.toml` we have that real network set up and then what we can do is we can just do:
```bash
mox test --network sepolia --fork
```

Let's say we wanted to test our smart contracts against the real sepolia test net. But, then all we have to do is `--fork`. This tells our test suite to use the sepolia testnet but run it as a fork. Don't run it, don't actually deploy any contracts, don't actually do anything. And, if we hit enter, we do have to enter our password for the default key, because we did set the default account name to default. So, we do have to do this. You could have, we could have not done that and it would have worked a little bit easier, but anyways, let's enter the password. You'll notice it didn't prompt us to say hey you're sending a real transaction cuz it's smart enough to know that we're not.

Now, this will take a little bit longer to run these tests because we're actually making API calls to our sepolia RPC URL.  And, I just realized that our active network does indeed have an explorer, but we need to do:
```python
if active_network.has_explorer() and active_network.is_local_or_forked_network() is False: 
```

So, if we don't have this line, when we go to run our fork tests, this is going to try to kick off and we don't want to verify to nowhereville. So yeah. So, now that we've updated this, if `active_network.has_explorer()`, and `active_network.is_local_or_forked_network()` is false:
```python
result = active_network.moccasin_verify(coffee)
```

Now, we can run:
```bash
mox test --network sepolia --fork
```

And we see that everything passes.  So, this is additionally why it's so important to do these conf tests as well. 
