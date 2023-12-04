---
title: What is an SVG?
---

_Follow along the course with this video._



---

Welcome to our exploration of Scalable Vector Graphics, lovingly known as SVGs. Today, we're moving beyond traditional image files to delve into the perks of SVGs, their functionality and how to create your own. So, let's get right into it!

## What is an SVG?

To understand what an SVG is, we'll dive right into a helpful tutorial from our friends at [W3Schools](https://www.w3schools.com/graphics/svg_intro.asp). SVG stands for Scalable Vector Graphics. In simpler terms, SVG is a way to define images in a two-dimensional space using XML coded tags with specific parameters.

SVGs are awesome because they maintain their quality, no matter what size you make them. If you stretch a traditional image file like a .jpg or .png, they become pixelated and lose clarity. SVGs don’t suffer from this issue because they’re scalable. They’re defined within an exact parameter, thus maintaining their pristine quality regardless of size.

<img src="/foundry-nfts/11-svg2/svg2-1.png" style="width: 100%; height: auto;">

## Creating Your Own SVG

Now, let's talk about how you can create your own SVG. If you're following the W3Schools tutorial, you'll notice that you can modify SVG coding directly from the page. For instance, you can alternate the fill from the default color to blue and the outline (stroke) to black with the appropriate SVG parameters.

You can follow this exercise in your code editors as well. And if you are using Visual Studio Code, you can even preview your SVGs in real time.

### SVG Coding Snippet

Here is a typical SVG coding that you can try:

```js
<html>
  <body>
    <h1>My first SVG</h1>
    <svg width="100" height="100">
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

For the live preview of your SVG, you can use various SVG viewers and SVG previewers available in the marketplace. Moreover, if you want to convert your SVG into a binary representation that can be passed via URL, you can use the `base64` command.

**Note**: The base64 command might not be available on all machines, fret not, you can simply follow along and copy the steps as mentioned.(base64 --help will show if you have this command.)

<img src="/foundry-nfts/11-svg2/svg2-2.png" style="width: 100%; height: auto;">

Base 64 basically encodes your SVG data into a form that can be used in data URIs for embedding your SVGs into browsers. So let’s go ahead and pass an encoded SVG and see it rendered in the browser.

Add this small prefix `data:image/svg+xml;base64,` before the encoded SVG and voilà! Your SVG should read "Hi, your browser decoded this” in the browser URL preview.

## Utilising SVGs in NFT

Embedding SVGs becomes incredibly useful when dealing with Non-Fungible Token (NFT) assets. In the realm of NFTs, SVGs can be stored on-chain as URIs. This paves the way for dynamic and interactive NFTs.

With the same base64 encoding, you can pass entire image data right in the URL and this will be your token URI. Therefore, instead of using an IPFS hash for our Token Uri, you can fully rely on chain using this SVG..

The major advantage of this approach is that the SVG, which is now essentially code on-chain, can be updated and interacted with. This implies endless possibilities for your NFT. It can be designed to change, evolve, grow - limited only by your imagination!

<img src="/foundry-nfts/11-svg2/svg2-3.png" style="width: 100%; height: auto;">

There you have it! We've just scratched the surface of SVGs and their vast potential within the realm of NFTs. This is an especially desirable competency for those looking to raise their game as smart contract developers.

In future posts, we will further explore the concept of ABIs and code packing in the context of SVGs and Smart Contracts. Great progress so far, and keep on learning!
