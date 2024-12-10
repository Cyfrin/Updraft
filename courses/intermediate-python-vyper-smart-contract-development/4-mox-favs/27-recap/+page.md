## Mocassin Favorites Recap

And with that, we have crammed so much information into your brain that you should be bursting at the seams with information. And we are going to take some time to wrap up so that you can go on an ice cream break or a gym break or a coffee break or whatever kind of break that you would like to go on. We've learned a ton in this section. So let's do a quick recap of all the things that you've learned so you can take a break.

First off, we were introduced to this tool called Mocassin, which is this TitanoBoa based smart contract development framework, which allows us to test deploy and work with our smart contracts in a much simpler way. We spun up a brand-new Mocassin project and we learned a ton of stuff. First off, we learned how to even test our contracts, which is a crucial piece of our journey, and we know that no one's going to take our code seriously unless we have tests. Tests are absolutely crucial to your smart contract development journey. We learned how to write tests using Mocassin's pie test framework.

```python
def test_add_favorite():
    favorites = Favorites.deploy()
    favorites.add_favorite(1, "Ethereum")
    assert favorites.favorites(1) == "Ethereum"
```

Additionally, we learned about how fixtures can help write our tests to be faster and even more proficient.

```python
@pytest.fixture
def favorites():
    return Favorites.deploy()

def test_add_favorite(favorites):
    favorites.add_favorite(1, "Ethereum")
    assert favorites.favorites(1) == "Ethereum"
```

We learned how to write a deploy script in Mocassin using this native import syntax like from SRC import favorites where we can actually just deploy our contract with the deploy keyword.

```python
from src import favorites

def main():
    favorites.deploy()
```

And then additionally, right inside Mocassin, we can verify our smart contracts with just one or two, or I guess three here, three lines of code.

```bash
mox verify --network sepolia
```

We learned how to switch between networks in Mocassin. If we want to work with a different network, all we have to do is add the information about that network to our moccasin.toml under the networks area. And we can deploy to different networks just by running mox run deploy with --network, and then the name of the other network that we want to deploy to.

```toml
[networks]
default = "pie-evm"
anvil = {
    url = "http://127.0.0.1:8545"
}
sepolia = {
    url = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
}
```

```bash
mox run deploy --network anvil
```

If we don't specify a network, it will use the default network. And Mocassin defaults to the pie EVM, which is this fake, locally running network. We also learned that Mocassin comes built in with the EraVM.

```bash
mox run deploy --network EraVM
```

We can test and deploy to ZK Sync.

We learned about encrypting and decrypting our wallets. So, if I do mox wallet list, I can see a list of accounts that I've encrypted locally so that I don't have to expose my private key. Oh my gosh, that feels good. That feels good. And I know that if I were to, you know, for example, let's spin up let's spin up anvil on another terminal. If I were to do mox run deploy --network anvil, and I were to get rid Where is it? And I were to get rid of the unsafe password file, it would prompt me for my password, meaning my keys can stay secure. I will not be sharing my private keys with you. Although, this one, the password is just "password" which is a terrible password. But you get the picture. We learned how to do that. We learned how to deploy to Sepolia and to ZK Sync Sepolia. And if you didn't actually deploy there, no worries, you got to see the process. You got to watch us automatically verify these contracts on different explorers, like BlockScout and ZK Sync Explorer.

We learned we could compile our contracts. And we learned we could compile them both with EVM or with ZK Sync EVM.

```bash
mox compile --network sepolia
```

We learned a little bit more Python, we added type hinting into our scripts here. We learned about environment variables and how our .env file can have environment variables. We know that it's not a great place to store private keys. It's It's more okay to store RPC URLs cuz they're not that sensitive. Private keys are very sensitive.

```bash
mox run deploy --network sepolia
```

We learned a little bit more about Python here, where we added some dependencies for our project so that our linter, our little syntax highlighter, worked correctly.

```toml
[project]
name = "mocassin"
version = "^0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"
[dependencies]
mocassin-0 = "0.3.4b2",
pytest-8 = "8.3.3",
```

You have learned an absolute ton in this section. And you should be incredibly proud of yourself. Now, if you haven't shared on Twitter or on some social media, I'm going to just tell you one more time, you absolutely should. Joining the developer community is going to a increase your chances of getting a job if that's what you're looking for. b you're going to get to meet a ton of really cool phenomenal people. And c give you a chance to Yeah, join like-minded individuals. You can join here or if you're on Cyffin Updraft, you can of course join the Discord and meet a ton of other like-minded developers as well. That being said, huge congratulations for getting this far. And huge congratulations for finishing Mocassin Favorites.
