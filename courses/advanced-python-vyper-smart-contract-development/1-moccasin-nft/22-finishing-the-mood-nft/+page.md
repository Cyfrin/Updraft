## Finishing the Mood NFT

We've learned a lot about low-level encoding, ABI and calling contracts.  We kind of cheated by doing copy-pasting, but if you really want to know what these functions are doing, feel free to pause the video and walk through them yourself. 

We have our token URI but right now it is just happy, right? Because we have image URI set to the happy SVG. 

Of course, what we want to do is create a little `@external` function called `flipMood`. 

Now, in order to flip the mood we're going to need to have some type of state variable that keeps track of the mood, and to do that we're going to create a little enum, or a little flag. 

So up near the top, we're going to create a new flagMood.

```python
flag Mood:
    HAPPY: int128 = 0
    SAD: int128 = 1
```

We could just as easily do a uint256 but this is going to be a better way to write this out. So, we'll say `flag Mood` and then we'll create a storage variable. This will be a storage called tokenId to Mood. This will be a public `HashMap unit256, Mood`.

```python
# Storage
token_id_to_mood: public(HashMap[uint256, Mood])
```

So, we'll map the token ID of each NFT to a specific mood. 

So when we call `flipMood`, we're going to have to pass in the tokenId, which will be a type unit256. We don't want anybody to be able to flip the mood. We only want the owner of the NFT to be able to flip the mood. 

So the ERC721 contract comes with the function built-in, so we can do `assert ERC721._is_approved_or_owner(msg.sender, token_id)`.

```python
@external
def flip_mood(token_id: uint256):
    assert erc721._is_approved_or_owner(msg.sender, token_id)
    if self.token_id_to_mood[token_id] == Mood.HAPPY:
        self.token_id_to_mood[token_id] = Mood.SAD
    else:
        self.token_id_to_mood[token_id] = Mood.HAPPY
```

We're also going to need `@external def mintNFT`. And we'll say do the same thing, `tokenId unit256 = ERC721._counter`. 

```python
@external
def mint_nft():
    token_id: uint256 = erc721._counter
    erc721._counter = token_id + 1
    self.token_id_to_mood[token_id] = Mood.HAPPY
    erc721.safe_mint(msg.sender, token_id, b"")
```

We'll say ERC counter, equals tokenID + 1. Then, we'll say `self.tokenId to mood` of that tokenId. We'll set the default to be `Mood.HAPPY`. 

And then, finally, `safeMint` the tokenId with no data. That looks pretty good to me. Let's write a little deploy script for this. Oh, we already have a deploy script. Oh nice, okay cool. uh, mood NFT to deploy. We'll say `mood contract` equals `mood NFT to deploy`. 

```python
# Deploy
mood_contract = mood_nft.deploy(happy_svg_uri, sad_svg_uri)
```

And then we'll just do `mood contract.mintNFT`.

```python
# Deploy
mood_contract = mood_nft.deploy(happy_svg_uri, sad_svg_uri)
mood_contract.mint_nft()
```

Does the `def mintNFT`.

```python
def mint_nft():
    token_id: uint256 = erc721._counter
    erc721._counter = token_id + 1
    self.token_id_to_mood[token_id] = Mood.HAPPY
    erc721.safe_mint(msg.sender, token_id, b"")
```

Then, `print(f"TokenURI: {mood_contract.tokenURI(0)}")`.

```python
def mint_nft():
    token_id: uint256 = erc721._counter
    erc721._counter = token_id + 1
    self.token_id_to_mood[token_id] = Mood.HAPPY
    erc721.safe_mint(msg.sender, token_id, b"")
print(f"TokenURI: {mood_contract.tokenURI(0)}")
```

So let's try this out. 

```bash
mox run deploy mood NFT
```

We get a token URI that looks like this. Okay, great. That looks pretty base64 encoded. Uh-huh, okay. I can even pretty-print this because I'm brave. Let's see if this image looks correct. 

We have a happy smiling face. Now, what though, if we went ahead and did `mood contract.flip mood` of zero. We reran it. Let's try this now. So this is the new token URI. Paste it in here. Get this, paste it up here. It's still sad. So, do we not flip the mood? Look at our `flip mood`. It's happy, make it sad. Oh. Of course, because we forgot to switch it. Because, we actually forgot to update our token URI. 

Of course.  Let's do, here we go. Chat GPT got it. If `self.tokenId to mood, tokenId equals Mood.SAD`. 

```python
@external
def flip_mood(token_id: uint256):
    assert erc721._is_approved_or_owner(msg.sender, token_id)
    if self.token_id_to_mood[token_id] == Mood.HAPPY:
        self.token_id_to_mood[token_id] = Mood.SAD
        image_uri = SAD_SVG_URI
    else:
        self.token_id_to_mood[token_id] = Mood.HAPPY
        image_uri = HAPPY_SVG_URI
```

Make it sad. Now let's try one more time. Great. Let's grab this. Boom, paste it in. Grab the image. Boom, and outside. So in the final bit that we should do in this in here as well is we should really update our NFT here so that it exports all the functions of an ERC721.

But remember, we cannot export tokenURI, because we have created one ourselves. What we can do is we can just cheat a little bit. Typically AIs work great at that.  We're going to come in here. Go to SRC, mood NFT. Scroll down. There's also some nicer syntax in here and just grab this whole `exports`. 

```python
exports:
    erc721.owner,
    erc721.balanceOf,
    erc721.ownerOf,
    erc721.getApproved,
    erc721.approve,
    erc721.setApprovalForAll,
    erc721.transferFrom,
    erc721.safeTransferFrom,
    # erc721.tokenURI,
    erc721.totalSupply,
    erc721.tokenByIndex,
    erc721.tokenOfOwnerByIndex,
    # erc721.burn,
    # erc721.safeMint,
    # erc721.set_minter,
    erc721.permit,
    erc721.DOMAIN_SEPARATOR,
    erc721.transferOwnership,
    erc721.renounceOwnership,
    erc721.name,
    erc721.symbol,
    erc721.isApprovedForAll,
    erc721.isMinter,
    erc721.nonces,
```

And paste it right here. Tada. You can see here that we didn't use tokenURI, we also didn't use `safeMint` or `setMinter`. This is how you can kind of make sure that you know you're not exporting some functions as well. Just kind of commenting them out like that. So, nice. 
