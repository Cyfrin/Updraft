## TokenURI / Base URI

We have our basic NFT setup. Let's go into this base URI thing.

We briefly talked about what a TokenURI was in the *What is an NFT* video that we just watched. So, just a quick recap: a TokenURI is the URI of the token. A URI is a Uniform Resource Identifier. Basically, it's like a link, right, like `https://some-website.com/some.json.jpg` or even something like this:

```javascript
"ipfs://Qm16U9B3JY9HB3Y5f8rGUtUiUtwDm6LdEe4dAAgmnrx3t1Ma" 
```

where the protocol instead of being HTTPS is IPFS. The protocol down here is HTTPS. It's just basically some way of saying "here's a link that you can use to access some type of information."  And HTTPS is one of the most popular ones, right? This is what we use on websites every day, right? If I go over here, go to `github.com` We see that up at the top left, we see this HTTPS here. You can have lots of different protocols like IPFS that also work great.

Now, this TokenURI, this link, this website needs to return JSON or JavaScript object notation, basically, some type of object that looks like this:

```javascript
{
"name": "PUG",
"description": "An adorable PUG pup!",
"image": "ipfs://QmSsYRx3LpDAB1gGZom7Zz21AuHZj1fbPKdD6j7S9r41xu1mFF8",
"attributes": [
{
"trait_type": "cuteness",
"value": 100
}
]
}
```

and it has a couple of different fields like: name, description, image, and attributes. Image is actually the most important one here, where that must return another link to an image. So, this is another URI, but instead of returning a JSON object, this URI would return an image. And it might return an image that looks like this instead. So, this, this part at the beginning, though, this protocol, this is what's known as the base URI for our NFT, right? So, our base URI here, I said hey, just put in IPFS. Our contract is smart enough to say "Okay, the protocol or the beginning string of your TokenURI is probably going to stay the same." So, set that as your base URI.

If we go look at the ERC721, and we look up `def tokenURI`, we scroll down here, we can kind of read this code to see what's going on. We see that internally, this contract has this mapping `self.tokenURIs` of token ID which returns this TokenURI, and it has some weird conditionals. But basically, we see this line here:

```javascript
if (len(token_uri) != BASE_URI.len()):
return concat(BASE_URI, token_uri)
```

if the TokenURI isn't empty, then we're just going to concat the base URI plus the TokenURI. Right? For TokenURI, might be something like this, right?  So, TokenURI will be something like this:

```javascript
"ipfs://Qm16U9B3JY9HB3Y5f8rGUtUiUtwDm6LdEe4dAAgmnrx3t1Ma" 
```

and then the base URI. So, the two of these together will make our actually excuse me, this it would be _tokenURI. So, the two of these together would make our NFT's TokenURI.

Now, I have already uploaded this image and this TokenURI to something called IPFS, or the InterPlanetary File System. We'll talk about that more in just a second.

Now, let's go to our basic NFT, and let's make that TokenURI actually customizable. So, we create a little external function called `mint`, and this will take in a URI of string type of length 432. And, we're using 432 because in the ERC721, the internal mapping of TokenURIs is of size string 432. So, we're just going to be matching that. And, what we're going to be doing is in the ERC721.vy from Snekmate, they have this mint function, which will allow us to mint one of these NFTs. So, what we can do is we'll first create a little token ID of type uint256, which will equal ERC721._counter. So, each one of these NFTs is going to have a unique token ID. And inside of here, there's _counter, there's this storage variable _counter, and you can see that every time `safemint` gets called, this gets incremented, um and we're going to do something very similar to what happens in `safemint`. So, then we're going to say 721._safemint. Actually, if we go in here, we do _safe mint. So, this safemint thing, it says it safely mints. Uh, basically, all safemint does is check to see that we're not sending to like a zero address. So, you'll typically see like `safemint` or `safe transfer`, and they do just some additional checks, like checking for zero address. So, we're going to call `safemint`, and we need to send a new owner, token ID, and then data. So, the owner is going to be the message.sender. We're going to let anybody mint our token here. We'll give it a token ID, this token ID that we just got from the counter. And, then, we'll do just blank data. We're going to learn very shortly more about this data stuff and how it works. And particularly, this check on ERC721 received, like why this wants data and what the heck this is, this is Uh that's going to be super exciting when we learn that.

And, then finally, we're going to do ERC721. _set tokenURI token ID. And, if we look in here, there's also this other function called `set tokenURI`, which does kind of exactly what you'd expect in this `tokenURIs hashmap`. It basically sets it to our TokenURI like so. And, what's nice is we don't have to store the base URI, so we get to save a little bit of gas, not putting this in storage every time. And, we just add in this kind of second half here, if you will, not this IPFS. Oh, and then additionally, we need to make sure we do ERC721._counter equals token ID + 1. We need to make sure we increment the counter as well. 
