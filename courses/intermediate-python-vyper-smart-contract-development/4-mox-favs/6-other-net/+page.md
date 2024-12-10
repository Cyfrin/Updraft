We've learned how to deploy a simple script to our local PiVM. Now, let's learn how to deploy it to a different network. 

We can deploy this script to our anvil network. You know, our locally running anvil network.

First, open a new terminal, clear it out, and run anvil:

```bash
anvil
```

We can then run our script like this:

```bash
mox run deploy
```

Our script will run, but nothing will happen on Anvil.  This is because we're deploying to Anvil, and our current setup is running on PiVM. 

We're going to use a flag to tell our script which network we're deploying to. If we run:

```bash
mox run --help
```

We'll see a number of commands to help us interact with our Anvil chain. There's a flag called `--network` which lets us define the network we want to deploy to, taken from our `mocassin.toml` file. 

To see what's in our `mocassin.toml` file, let's look at it! 

This `mocassin.toml` file is used to configure all of our networks and contains any kind of setting for Moccasin. 

You can see all the possible settings in the TOML documentation here: https://cyfrin.github.io/mocassin/all_mocassin_toml_parameters.html

In our case, we can create a new network object named anvil. 

To do this, we'll make a new section in our `mocassin.toml` file:

```toml
[networks.anvil]
```

We need to give our network a URL. We can find the Anvil URL running in the terminal:

```toml
url = "http://127.0.0.1:8545"
```

We'll also add this flag:

```toml
save_to_db = false
```

We've added our new network section to our `mocassin.toml` file. 

Let's try to deploy our contract again! 

```bash
mox run deploy --network anvil
```

Our script will run, but it'll ask us to hit yes. 

We'll see a value error here. 

```bash
ValueError: <boa.network.NetworkEnv object at 0x1113838c0> eoa not defined!
```

This is a common error. You can find more information about this in the Moccasin documentation: https://cyfrin.github.io/mocassin/common_errors.html

It means that we're trying to deploy to Anvil, but we haven't added an account to our `mocassin.toml` file! 

We can do this by following the wallet guide in the documentation: https://cyfrin.github.io/mocassin/core/concepts/wallet.html

Our Anvil network is running, so we can go there and grab a private key to deploy our contract. 

We can then run our deploy script like this:

```bash
mox run deploy --network anvil --private-key 0x9740....2f764180aa3
```

That was an example of how to deploy a script to a different network. In the next section, we'll learn how to use Moccasin's wallet commands! 
