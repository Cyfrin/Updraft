## Writing a Deploy Script

In our script, we will create a file called `deploy_basic_nft.py`.

```python
def moccasin_main():
    pass
```

We should be very familiar with this at this point. Let's do a little `def deploy_basic_nft()`.

```python
def deploy_basic_nft():
    pass
```

We are actually going to do `deploy_basic_nft` and in here we're going to say

```python
from src import basic_nft
```

So we call it. Yep.

Then we'll say `contract` equals `basic_nft.deploy()`.

```python
def deploy_basic_nft():
    contract = basic_nft.deploy()
    print(f"Deployed BasicNFT contract to: {contract.address}")
```

Then we'll do `contract.mint` and this is where we can pass in a URI. I'm going to say `pug_uri` equals

```python
PUG_URI = "QmWt16U9B3JryY9HBY36r6tUUtdmDnmGLdeEendAAggmrx3tMel"
```

and I'm going to paste this in here.

```python
PUG_URI = "QmWt16U9B3JryY9HBY36r6tUUtdmDnmGLdeEendAAggmrx3tMel"

def deploy_basic_nft():
    contract = basic_nft.deploy()
    print(f"Deployed BasicNFT contract to: {contract.address}")
    contract.mint(PUG_URI)
```

So I already have this uploaded to my IPFS.

So for now just follow along with me. I'll show you how to upload and work with and add your own custom IPFS stuff in just a second, and why we're using this weird IPFS thing in the first place.

But for now if you want to just copy this from the script here, paste it in, boom.

This will resemble the NFT associated with that pug. And we're going to pass in this pug URI that we've set here.

```python
PUG_URI = "QmWt16U9B3JryY9HBY36r6tUUtdmDnmGLdeEendAAggmrx3tMel"

def deploy_basic_nft():
    contract = basic_nft.deploy()
    print(f"Deployed BasicNFT contract to: {contract.address}")
    contract.mint(PUG_URI)
    print("Contract deployed at", contract.address)
```

And now, since this mint function right this mint function should have minted us a new token, and we should start with counter of 0 or token ID 0.

We should be able to do `token_metadata` equals `contract.tokenURI(0)`.

```python
PUG_URI = "QmWt16U9B3JryY9HBY36r6tUUtdmDnmGLdeEendAAggmrx3tMel"

def deploy_basic_nft():
    contract = basic_nft.deploy()
    print(f"Deployed BasicNFT contract to: {contract.address}")
    contract.mint(PUG_URI)
    print("Contract deployed at", contract.address)
    token_metadata = contract.tokenURI(0)
    print(f"Token metadata: {token_metadata}")
```

And we could print `token_metadata`.

```bash
mox run deploy_basic_nft
```

This is actually `token_uri`.

```python
PUG_URI = "QmWt16U9B3JryY9HBY36r6tUUtdmDnmGLdeEendAAggmrx3tMel"

def deploy_basic_nft():
    contract = basic_nft.deploy()
    print(f"Deployed BasicNFT contract to: {contract.address}")
    contract.mint(PUG_URI)
    print("Contract deployed at", contract.address)
    token_uri = contract.tokenURI(0)
    print(token_uri)
```

Now if I run `mox run deploy_basic_nft` we should see this.

```bash
mox run deploy_basic_nft
```

So, if I pull this up now and I just run `mox run deploy_basic_nft`.

This is the token URI itself and that's exactly what we want. So this is actually `token_uri`.
