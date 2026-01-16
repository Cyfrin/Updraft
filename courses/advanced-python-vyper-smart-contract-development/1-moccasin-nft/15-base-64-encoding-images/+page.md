## Base64 Encoding Images

In this lesson, we will learn how to encode an image to Base64. 

First, we will create a new folder called "images" and save our two SVG files (happy.svg and sad.svg) in it.

Next, we will import the base64 library and create a new function:

```python
import base64

def svg_to_base64_uri(svg):
    svg_bytes = svg.encode("utf-8")
    base64_bytes = base64.b64encode(svg_bytes).decode("utf-8")
    return f"data:image/svg+xml;base64,{base64_bytes}"
```

Now, we can use the `svg_to_base64_uri()` function to encode our SVGs to Base64 and assign the results to the `happy_svg_uri` and `sad_svg_uri` variables. 

```python
def deploy_mood():
    happy_svg_uri = ""
    sad_svg_uri = ""
    with open("./images/happy.svg", "r") as f:
        happy_svg = f.read()
        happy_svg_uri = svg_to_base64_uri(happy_svg)
        print(happy_svg_uri)

    with open("./images/sad.svg", "r") as f:
        sad_svg = f.read()
        sad_svg_uri = svg_to_base64_uri(sad_svg)

    mood_nft = mood_nft.deploy(happy_svg_uri, sad_svg_uri)
```

Finally, we will import the "mood_nft" contract and use it to pass our encoded image data.

```python
from src import mood_nft
```

```python
def deploy_mood():
    happy_svg_uri = ""
    sad_svg_uri = ""
    with open("./images/happy.svg", "r") as f:
        happy_svg = f.read()
        happy_svg_uri = svg_to_base64_uri(happy_svg)
        print(happy_svg_uri)

    with open("./images/sad.svg", "r") as f:
        sad_svg = f.read()
        sad_svg_uri = svg_to_base64_uri(sad_svg)

    mood_nft = mood_nft.deploy(happy_svg_uri, sad_svg_uri)
```

We can then run our script using the following terminal command:

```bash
mox run deploy_mood_nft
```

This will return a Base64 encoded string that can be used to render our SVG image in a browser. We can copy and paste the string into our browser to verify that it works as expected. 

We will then make the `happy_svg_uri` and `sad_svg_uri` constant variables in our contract file.

```python
HAPPY_SVG_URI: immutable(String[800]) = ""
SAD_SVG_URI: immutable(String[800]) = ""
```

We will pass these into the constructor of the contract so the image data is stored there.

```python
def init(happy_svg_uri: String[800], sad_svg_uri: String[800]):
    ow.init()
    erc721.init(NAME, SYMBOL, BASE_URI, NAME, EIP_712_VERSION)
    HAPPY_SVG_URI = happy_svg_uri
    SAD_SVG_URI = sad_svg_uri
```