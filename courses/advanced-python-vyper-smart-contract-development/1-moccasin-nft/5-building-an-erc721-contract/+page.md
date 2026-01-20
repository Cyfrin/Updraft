## Building an ERC721 contract

We've learned that an NFT is similar to an ERC20. It's the ERC721 standard.

We can find all about the different functions in this standard by going to the Ethereum website. If we scroll down, we can see some different events. We've learned about events. We know how to make events. We see some different functions as well. These are the Solidity functions, so we can just easily write them as Vyper.

We could start grabbing these. We could take this, go to our AI agent, and ask it to write this in Vyper, please. We could do this for all of the functions. Or, we could check to see if our good friend Snakemake has one of these already.

We go to Snakemake, then to SRC / Snakemake / tokens, just like the ERC20.vvy. There's an ERC721.

We could pause and look through all of the functions here.  Now's a great time to pause and look through all of the functions here. A couple of these aren't going to make sense to you. For example, those domain separators, EIP 712. That's something we're going to learn much, much later in this signature section.

But, if you want to pause, you want to look over some of these functions so that you can really understand what's going on. Great. Otherwise, we're just going to go ahead. We're going to use Snakemake or Snakemake in our codebase to make writing our NFTs much easier.

We're going to go back over here. I'm going to remove my README, pull up my terminal, and I'm going to do:

```bash
mox install snekmate
```

You'll notice I'm not in a virtual environment, and in a previous lesson I might have told you to go in a virtual environment. We no longer need to be inside of a virtual environment because we made a little issue on UV and they changed it. So this is the power of open source. We made an issue, we said, "Hey, we get this little error here, I have to be in a virtual environment, I don't think I need to be in one, " and the UV people said, "Yup, makes sense," and they changed UV and updated it. Now, we can just run:

```bash
mox install snekmate
```

Nice. So, now we have Snakemake installed. We could also do:

```bash
mox install psacasfasfasdfas/snekmate
```

But, you know, whatever you want to do here. We can see it has been installed in our PyPI folder. And, that is great for us.

Okay, so we have that installed. Now we can start using it in a new contract called:

```python
basic_nft.vy
```

We'll create a little basic NFT in here.  Now, I know in that video we went over some concepts. We'll go over them again in here, because the token UI thing can be a little squirrely. So, we're going to make it make sense. So, let's go ahead, let's do:

```python
# pragma version 0.4.1
@license MIT
@title Puppy NFT
from snekmate.tokens import erc721
from snekmate.auth import ownable as ow
initializes: ow
initializes: erc721(ownable := ow)
@deploy
def __init__():
    ow.__init__()
    erc721.__init__(name=NAME, symbol=SYMBOL, base_uri=BASE_URI, name_eip712=NAME_EIP712, version_eip712=VERSION)
```

We haven't really gone over BASE URI. We kind of briefly went over it in that "What is an NFT?" video. This doesn't make any sense to you. This doesn't make any sense to you, and that's okay because this These two make sense to you, and this will make sense to you.


Now, let's just clean this up a little bit with headers. State or header.

```python
# STATE VARIABLES
NAME: constant String[25] = "Puppy NFT"
SYMBOL: constant String[5] = "PNFT"
BASE_URI: constant String[7] = "ipfs://"
EIP_712_VERSION: constant String[1] = "1"
```

Boom. Let's do:

```python
# HEADER FUNCTIONS
```

Boom. And that looks a little bit nicer already. And then, we're also going to do exports:

```python
exports: erc721.interface
```

So, we get all the functions of the ERC721. Nice.
