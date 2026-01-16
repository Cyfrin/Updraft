## Workshop 2: Mood NFT

In this workshop, we'll continue our journey into the world of NFTs by working through some real-world workshop examples. We've already learned how to make a basic NFT and customize it.

Let's start with workshop number 2, which involves creating a "mood NFT."

The goal of workshop 2 is to:

1. Deploy your mood NFT to a locally running chain.
2. Flip its mood.
3. View it in Metamask.

We've already deployed to a local chain in the previous lesson, so we'll focus on the second and third parts of this workshop.

We've also written some tests for you in the GitHub repo, which you can use to check your work. 

Here are some examples:

* `test_unit_mood.py`

```python
import boa
import eth
import pytest
import vyper

from eth_utils import to_bytes

STARTING_TOKEN_URI = "data:application/json;base64,eyJ1dGwiOiJTWlZvciIuQzIuQzFJLCAxLjg0djIuOTIuNjk2b29kIE5GVCJ9"
ENDING_TOKEN_URI = "data:application/json;base64,eyJ1dGwiOiJTWlZvciIuQzIuQzFJLCAyLjA0djIuOTIuNjk2b29kIE5GVCJ9"

def test_initialized_correctly(mood_nft):
    assert mood_nft.name() == "Mood NFT"
    assert mood_nft.symbol() == "MNFT"
    assert mood_nft.token_id_to_mood(0) == 1 # flags are 1 indexed!

def test_flip_mood(mood_nft):
    mood_nft.flip_mood()
    assert mood_nft.token_id_to_mood(0) == 2

def test_uri_changes_based_on_mood(mood_nft):
    assert mood_nft.tokenURI(0) == STARTING_TOKEN_URI
    mood_nft.flip_mood()
    assert mood_nft.tokenURI(0) == ENDING_TOKEN_URI
    mood_nft.flip_mood()
    assert mood_nft.tokenURI(0) == STARTING_TOKEN_URI

def test_safe_mint_fails_if_safe_mint_is_false(
    mood_nft,
):
    with pytest.raises(Exception) as exc:
        boa.env.raw_call(
            mood_nft.address,
            data_to_bytes(
                vyper.utils.method_id("safeMint(address,string)"),
                [mood_nft.address, ""]
            ),
            selector=mood_nft.address,
        )
    assert "revert" in exc.value.message
```

* `test_unit_sub_lesson.py`

```python
def test_encoding_string_combination(encoding):
    string_one = "Hi Mom"
    string_two = "Miss You"
    combined = encoding.combine_strings(string_one, string_two)
    assert combined == string_one + string_two

def test_multi_encoding(encoding):
    decoded_strings = encoding.multi_decode()
    (string_one, string_two) = decoded_strings
    assert string_one == "Hi Mom"
    assert string_two == "Miss You"

@pytest.mark.staging
def test_raw_call_anything(raw_call, call_anything):
    new_address = "0x8b74378a524f2a866419a6c9e3c2447c9e278c46332"
    new_amount = 888
    raw_call.function_call_directly(new_address, new_amount, call_anything.address)
    assert call_anything.some_address() == new_address
    assert call_anything.some_amount() == new_amount
```

We've also written some tests for you in the GitHub repo, which you can use to check your work. We can use those tests to ensure our code is working correctly.

You can use these tests as a starting point for your own tests and work through the workshops at your own pace. Don't worry if you don't get everything right the first time, you can always refer to the GitHub repo or ask questions in the discussions or Discord. The important thing is to keep learning and experimenting. 
