## Moccasin NFTs 

This section is about Moccasin NFTs, and will continue to help us build our skills as we begin to work more independently with AI tools. 

We'll be working with NFTs, building a decentralized stablecoin, understanding signatures and upgrades, and learning some amazing new things as we explore the industry and develop our own skills. 

Remember to do all of the workshops associated with each of these sections. They are the heart of the course and how we will truly drill in all of the skills we're learning here.

Our first section is on Moccasin NFTs. 

Here is the link to the full code we will be working with.

```
https://github.com/Cyfrin/mox-nft-cu
```

It's a classic Moccasin project and has a moccasin.toml file, which we will be diving into more in later sections. 

The code we're working with here is pretty simple; just a basic NFT.
```python
from moccasin.boa_tools import VyperContract
from src import basic_nft

def deploy_basic_nft() -> VyperContract:
    basic_nft_contract = basic_nft.deploy()
    print(f"Deployed basic NFT to {basic_nft_contract.address}")
    PUG_URI = "Qm1i6J98JYHB9Y36rUu0tDDm6LdEeNdAAgmrrx3s1tMa"
    print(f"Minted Pug NFT with URI {PUG_URI}")
    basic_nft_contract.mint(PUG_URI)
    return basic_nft_contract

def moccasin_main():
    return deploy_basic_nft()
```

This will deploy our basic NFT and give us a link to our IPFS file that will point to a JSON file that represents our NFT. 

We can then import this into our MetaMask wallet and actually see our NFT. 

We can then import this into our MetaMask wallet and actually see our NFT. 

We'll also be going over some low-level encoding and some low-level raw calls.  

Now, we will go over a slightly more advanced NFT. It's the Mood NFT.  Let's go over it in the terminal.

```bash
mox run deploy_mood_nft --network anvil --account Vyper-cour
```

And this will get us a base 64 encoded URL where we can take this entire URL and then stick it into our browser to see our NFT which looks like this. 

Now, we're going to go over the advanced,  Sub-Lesson, where we learn how to call anything, we learn about encoding, we learn about raw calls, and a lot of the low-level functionality that we have been skipping over. 

The final thing we will be showing you in this section, is this more advanced Sub-Lesson, where we learn how to call anything and we learn about encoding.  

```python
from moccasin.boa_tools import VyperContract
from src import mood_nft

def deploy_mood_nft() -> VyperContract:
    mood_nft_contract = mood_nft.deploy()
    print(f"Deployed mood NFT to {mood_nft_contract.address}")
    PUG_URI = "Qm1i6J98JYHB9Y36rUu0tDDm6LdEeNdAAgmrrx3s1tMa"
    print(f"Minted Pug NFT with URI {PUG_URI}")
    mood_nft_contract.mint(PUG_URI)
    return mood_nft_contract

def moccasin_main():
    return deploy_mood_nft()
```

Now, we will go over this more advanced sub-lesson where we learn how to call anything, we learn about encoding.  

```python
from moccasin.boa_tools import VyperContract
from src import mood_nft

def deploy_mood_nft() -> VyperContract:
    mood_nft_contract = mood_nft.deploy()
    print(f"Deployed mood NFT to {mood_nft_contract.address}")
    PUG_URI = "Qm1i6J98JYHB9Y36rUu0tDDm6LdEeNdAAgmrrx3s1tMa"
    print(f"Minted Pug NFT with URI {PUG_URI}")
    mood_nft_contract.mint(PUG_URI)
    return mood_nft_contract

def moccasin_main():
    return deploy_mood_nft()
```

We'll also be going over some low-level encoding and some low-level raw calls.  

Stay tuned for more amazing things as we move forward in this course! 
