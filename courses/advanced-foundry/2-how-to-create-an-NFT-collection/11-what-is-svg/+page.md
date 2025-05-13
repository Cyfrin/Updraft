---
title: What is an SVG?
---

_Follow along the course with this video._

---

### What is an SVG?

To understand what an `SVG` is, we'll dive right into a helpful tutorial from our friends at [W3Schools](https://www.w3schools.com/graphics/svg_intro.asp). SVG stands for `Scalable Vector Graphics`. In 'simple' terms, SVG is a way to define images in a two-dimensional space using XML coded tags with specific parameters.

**SVG Example:**

```js
<html>
  <body>
    <h1>My first SVG</h1>

    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="green"
        stroke-width="4"
        fill="yellow"
      />
    </svg>
  </body>
</html>
```

::image{src='/foundry-nfts/11-what-is-svg/what-is-svg1.png' style='width: 100%; height: auto;'}

SVGs are awesome because they maintain their quality, no matter what size you make them. If you stretch a traditional image file like a .jpg or .png, they become pixelated and lose clarity. SVGs don’t suffer from this issue because they’re scalable. They’re defined within an exact parameter, thus maintaining their quality regardless of scale.

I encourage you to play with editing the parameters in the [**W3Schools SVG Demo**](https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_myfirst). Experiment with how the different parameters can change your image! There's lots of documentation on that website detailing all the tags and features one could add to an SVG.

## Creating Your Own SVG

Let's look at how we can create our own simple SVG, right in our IDE. Create the file `img/example.svg`. We can use the `<svg>` tag to define what our simple image will look like.

```js
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
  <text x="200" y="250" fill="white">
    Hi! You decoded this!{" "}
  </text>
</svg>
```

> ❗ **IMPORTANT**
> You will likely need to download a SVG preview extension to view the SVG in your IDE. I recommend trying [**SVG Preview**](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview).

::image{src='/foundry-nfts/11-what-is-svg/what-is-svg2.png' style='width: 100%; height: auto;'}

Importantly, this SVG code **_is not_** a URI, but we can convert this into a URI that a browser can understand by passing all the necessary data through the URL of our browser.

### Converting to a URI

In your terminal, enter the command `base64 --help` to determine if you have base64 installed, this isn't compatible with all computers, so if you don't have it available, you can copy the encoding I've provided below.

For those with base64 installed, first switch to your `img` directory.

```bash
cd img
```

Then run the following command to pass our example.svg as a file to the base64 command:

```bash
base64 -i example.svg
```

You should get an output like this (those without base64 can copy and paste this value):

```bash
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj4KPHRleHQgeD0iMjAwIiB5PSIyNTAiIGZpbGw9IndoaXRlIj5IaSEgWW91IGRlY29kZWQgdGhpcyEgPC90ZXh0Pgo8L3N2Zz4=
```

This weird output is the base64 encoded example.svg. We can now add a prefix which tells our browser what type of data this is, `data:image/svg+xml,base64,`.

Copy this whole string into your browser and you should see our SVG!

```bash
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj4KPHRleHQgeD0iMjAwIiB5PSIyNTAiIGZpbGw9IndoaXRlIj5IaSEgWW91IGRlY29kZWQgdGhpcyEgPC90ZXh0Pgo8L3N2Zz4=
```

::image{src='/foundry-nfts/11-what-is-svg/what-is-svg3.png' style='width: 100%; height: auto;'}

This same process can be applied to our SVG images for our NFTs. You can navigate to the [**GitHub Repo**](https://github.com/Cyfrin/foundry-nft-f23/blob/main/images/dynamicNft/happy.svg?short_path=224d82e) to see the code which represents our happy and sad SVGs.

**Happy.svg**

```js
<svg
  viewBox="0 0 200 200"
  width="400"
  height="400"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="100"
    cy="100"
    fill="yellow"
    r="78"
    stroke="black"
    stroke-width="3"
  />
  <g class="eyes">
    <circle cx="61" cy="82" r="12" />
    <circle cx="127" cy="82" r="12" />
  </g>
  <path
    d="m136.81 116.53c.69 26.17-64.11 42-81.52-.73"
    style="fill:none; stroke: black; stroke-width: 3;"
  />
</svg>
```

> ❗ **PROTIP**
> If you don't have happy.svg and sad.svg images within your img folder, now would be a great time to create them! Copy the SVG code from the [**GitHub Repo**](https://github.com/Cyfrin/foundry-nft-f23/tree/main/images/dynamicNft)!

Once we have both of these images in our workspace, we can run our base64 commands to encode them (those without base64, feel free to grab the encodings below):

```bash
base64 -i happy.svg
PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgd2lkdGg9IjQwMCIgIGhlaWdodD0iNDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgZmlsbD0ieWVsbG93IiByPSI3OCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8CiAgPGcgY2xhc3M9ImV5ZXMiPgogICAgPGNpcmNsZSBjeD0iNjEiIGN5PSI4MiIgcj0iMTIiLz4KICAgIDxjaXJjbGUgY3g9IjEyNyIgY3k9IjgyIiByPSIxMiIvPgogIDwvZz4KICA8cGF0aCBkPSJtMTM2LjgxIDExNi41M2MuNjkgMjYuMTctNjQuMTEgNDItODEuNTItLjczIiBzdHlsZT0iZmlsbDpub25lOyBzdHJva2U6IGJsYWNrOyBzdHJva2Utd2lkdGg6IDM7Ii8+Cjwvc3ZnPg==

base64 -i sad.svg
PHN2ZyB3aWR0aD0iMTAyNHB4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsPSIjMzMzIiBkPSJNNTEyIDY0QzI2NC42IDY0IDY0IDI2NC42IDY0IDUxMnMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OFM3NTkuNCA2NCA1MTIgNjR6bTAgODIwYy0yMDUuNCAwLTM3Mi0xNjYuNi0zNzItMzcyczE2Ni42LTM3MiAzNzItMzcyIDM3MiAxNjYuNiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzIgMzcyeiIvPgogIDxwYXRoIGZpbGw9IiNFNkU2RTYiIGQ9Ik01MTIgMTQwYy0yMDUuNCAwLTM3MiAxNjYuNi0zNzIgMzcyczE2Ni42IDM3MiAzNzIgMzcyIDM3Mi0xNjYuNiAzNzItMzcyLTE2Ni42LTM3Mi0zNzItMzcyek0yODggNDIxYTQ4LjAxIDQ4LjAxIDAgMCAxIDk2IDAgNDguMDEgNDguMDEgMCAwIDEtOTYgMHptMzc2IDI3MmgtNDguMWMtNC4yIDAtNy44LTMuMi04LjEtNy40QzYwNCA2MzYuMSA1NjIuNSA1OTcgNTEyIDU5N3MtOTIuMSAzOS4xLTk1LjggODguNmMtLjMgNC4yLTMuOSA3LjQtOC4xIDcuNEgzNjBhOCA4IDAgMCAxLTgtOC40YzQuNC04NC4zIDc0LjUtMTUxLjYgMTYwLTE1MS42czE1NS42IDY3LjMgMTYwIDE1MS42YTggOCAwIDAgMS04IDguNHptMjQtMjI0YTQ4LjAxIDQ4LjAxIDAgMCAxIDAtOTYgNDguMDEgNDguMDEgMCAwIDEgMCA5NnoiLz4KICA8cGF0aCBmaWxsPSIjMzMzIiBkPSJNMjg4IDQyMWE0OCA0OCAwIDEgMCA5NiAwIDQ4IDQ4IDAgMSAwLTk2IDB6bTIyNCAxMTJjLTg1LjUgMC0xNTUuNiA2Ny4zLTE2MCAxNTEuNmE4IDggMCAwIDAgOCA4LjRoNDguMWM0LjIgMCA3LjgtMy4yIDguMS03LjQgMy43LTQ5LjUgNDUuMy04OC42IDk1LjgtODguNnM5MiAzOS4xIDk1LjggODguNmMuMyA0LjIgMy45IDcuNCA4LjEgNy40SDY2NGE4IDggMCAwIDAgOC04LjRDNjY3LjYgNjAwLjMgNTk3LjUgNTMzIDUxMiA1MzN6bTEyOC0xMTJhNDggNDggMCAxIDAgOTYgMCA0OCA0OCAwIDEgMC05NiAweiIvPgo8L3N2Zz4=
```

Append our prefix `data:image/svg+xml;base64,` and view the images in your browser to assure things are working as expected!

### Wrap Up

This is more like what we'd expect to see in a TokenURI, and it's small enough that we can reasonable store this data directly on-chain! As an additional bonus to storing this data on chain and SVGs basically being code is ... we can interact with this data and change it programmatically! It just keep getting cooler.

In the next lesson we'll go over creating an NFT, leveraging on-chain data allowing it to be _dynamic_.

Let's go!
