Now that we know what an SVG is and how we can code it, we can use this coding to build an NFT where all the metadata is stored directly on chain. Let's go ahead and build this NFT.

We'll call our new contract "mood_nft.vy" and inside we will code:

```javascript
pragma version 0.4.1
@license MIT
@title Mood NFT
```

We'll use a few imports here:

```javascript
from snekmate.tokens import erc721
from snekmate.auth import ownable as ow
```

We will then define a constructor for our contract:

```javascript
initializes:
  ow
  erc721: ownable = ow

def init():
  ow._init()
  erc721.init_(NAME, SYMBOL, BASE_URI, NAME, EIP_712_VERSION)
```

Finally, we'll need to define some state variables:

```javascript
# STATE VARIABLES
NAME: constant(String[25]) = "Mood NFT"
SYMBOL: constant(String[5]) = "MNFT"
BASE_URI: public(constant(String[34])) = "https://gateway.pinata.cloud/ipfs/"
EIP_712_VERSION: constant(String[1]) = "1"
```

We are now ready to start deploying our dynamic NFT, which we'll do in the next video!
