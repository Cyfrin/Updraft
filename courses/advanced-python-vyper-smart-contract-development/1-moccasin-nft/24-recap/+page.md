## Recap

In this lesson, we learned about NFTs and how to implement them in our blockchain contracts. We started by defining a basic NFT contract and then built our way up to more complex examples.

We also learned about ABI encoding and decoding, which is essential for interacting with contracts on the blockchain. We can use ABI encoding to create raw data that can be sent to a contract to call functions. We can also use ABI decoding to get the data from a transaction and understand what function was called and what parameters were passed in.

Finally, we built a custom token URI for our NFT that dynamically changes based on the mood of the owner. This was accomplished by adding a �flip mood� function to our NFT contract, and we used a mapping to store the mood of each token.


Here�s an example of the code we created:

```python
# pragma version 0.4.1
# license MIT
# title Mood NFT

from snekmate.tokens import erc721
from snekmate.auth import ownable as ow
from snekmate.utils import base64

initializes: ow.Ownable = ow
exports: erc721.Interface

Flag Mood:
    HAPPY
    SAD

HAPPY_SVG_URI: immutable String[800] = ""
SAD_SVG_URI: immutable String[800] = ""
FINAL_STRING_URI_SIZE: constant uint256 = 29
JSON_BASE_URI: constant String[26] = "data:application/json;base64,"
IMG_BASE_URI_SIZE: constant uint256 = 29
IMG_BASE_URI: constant String[128] = "data:image/svg+xml;base64,"

token_id_to_mood: public HashMap[uint256, Mood]

def _init_:
    ow._init_
    erc721._init_(NAME, SYMBOL, BASE_URI, EIP_712_VERSION)
    HAPPY_SVG_URI = sad_svg_uri
    SAD_SVG_URI = sad_svg_uri

external:
    def mint_nft():
        token_id: uint256 = erc721.counter
        erc721.counter = erc721.counter + 1
        self.token_id_to_mood[token_id] = Mood.HAPPY
        erc721.safe_mint(msg.sender, token_id, b"")
        erc721.set_token_uri(token_id, "happy")

    def flip_mood(token_id: uint256):
        assert erc721.is_approved_or_owner(msg.sender, token_id)
        if self.token_id_to_mood[token_id] == Mood.HAPPY:
            self.token_id_to_mood[token_id] = Mood.SAD
        else:
            self.token_id_to_mood[token_id] = Mood.HAPPY

    def tokenURI(token_id: uint256) -> String[FINAL_STRING_URI_SIZE]:
        image_uri: String[800] = HAPPY_SVG_URI
        if self.token_id_to_mood[token_id] == Mood.SAD:
            image_uri = SAD_SVG_URI

        json_string: String[1024] = concat(
            "{",
            '"name": "', NAME, '"',
            ",",
            '"description": "An NFT that reflects the mood of the owner, 100% on Chain!",',
            ",",
            '"attributes": [{"trait_type": "moodiness", "value": 1001}, {"image": "', image_uri, '"}',
            "]",
            "}"
        )

        json_bytes: Bytes[1024] = convert(json_string, Bytes[1024])
        encoded_chunks: DynArray[Bytes[128]]
        String[64].encode(base64, json_bytes, True)
        base64: encode(json_bytes, True)

        result: String[FINAL_STRING_URI_SIZE] = JSON_BASE_URI
        counter: uint256 = IMG_BASE_URI_SIZE
        for encoded_chunk in encoded_chunks:
            result = self.set_indice_truncated(counter, result, encoded_chunk)
            counter += 4

        return result

    def svg_to_uri(svg: String[1024]) -> String[FINAL_STRING_URI_SIZE]:
        svg_bytes: Bytes[1024] = convert(svg, Bytes[1024])
        encoded_chunks: DynArray[Bytes[128]]
        String[64].encode(base64, svg_bytes, True)
        base64: encode(svg_bytes, True)

        result: String[FINAL_STRING_URI_SIZE] = JSON_BASE_URI
        counter: uint256 = IMG_BASE_URI_SIZE
        for encoded_chunk in encoded_chunks:
            result = self.set_indice_truncated(counter, result, encoded_chunk)
            counter += 4

        return result

    internal:
        def set_indice_truncated(
            result: String[FINAL_STRING_URI_SIZE],
            index: uint256,
            chunk_to_set: String[4]
        ) -> String[4]:
            # We set the index of a string, while truncating all values after the index
            buffer: String[FINAL_STRING_URI_SIZE] = concat(result, chunk_to_set)
            slice(buffer, 0, index + 4)
            return abi.decode(buffer, encode(String[FINAL_STRING_URI_SIZE]))
```

We learned that we can get the entire hex data from a transaction by encoding the function selector and parameters with ABI encoding. We can then use this data to call any function on the blockchain. We can even use a block explorer like Etherscan to see the hex data that was sent in a transaction and to verify that it matches the function selector and parameters we used.

We learned a lot in this section and you should be proud of yourself for completing it. Congratulations!
