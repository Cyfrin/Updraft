---
title: SVG NFT Deploy Script
---

_Follow along the course with this video._



---

## Deploying the Mood NFT Project

In this lesson, we'll automate the deployment process of the Mood NFT Project by scripting it. As you may already know, in the realm of blockchain development, scripts are super helpful to help automate repetitive processes, so let's get our hands dirty and simplify our work!

## Creating the Deploy Mood NFT Script

Starting off, create a new file for the deploy script named `DeployMoodNft.s.sol`. In this script file, include the SPDX License followed by the contract-deployment code, just as you typically would do in a Solidity contract.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {MoodNft} from "../src/MoodNft.sol";

contract DeployMoodNft is Script {
    function run() external {}
}
```

Remember we are deploying our Mood NFT, hence we'll need to import the MoodNFT contract. In our run function, it's time to set specifics on how the NFT will be deployed.

## Preparing the Deploying Parameters

The Mood NFT contract accepts two parameters upon deployment: the "sad SVG image URI" and the "happy SVG image URI". Now we could hardcode these parameters into the script, but to make our lives a little easier and our script a little smarter, we're going to create a function that automatically encodes our SVGs.

```js
function svgToImageURI(
        string memory svg
    ) public pure returns (string memory) {
        // example:
        // '<svg width="500" height="500" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M150,0,L75,200,L225,200,Z"></path></svg>'
        // would return ""
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }
```

This function will intake an SVG file as text, encode it into a base 64 formatted string, then return it. To do this, we need to import the OpenZeppelin base64 library which allows us to encode our SVGs on chain.

```js
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
```

## Implementing the Encoding Function

The SVG to Image URI function first defines a base URL.

```js
string memory baseURL = "data:image/svg+xml;base64,";
```

Next, it encodes the SVG provided, concatenates that encoded string to the base URL, and voila, we have our encoded SVG string ready to be passed to the Mood NFT contract.

```js
string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
```

<img src="/foundry-nfts/15-deploy/deploy1.png" style="width: 100%; height: auto;">

## Reading in SVG Files

Now that we have the means to encode SVG files, it's time to read the actual files in our Foundry scripting environment. As you may know, Foundry provides an awesome utility function named `readFile` which we will employ.

But before we do that, we need to set appropriate permissions within the "foundry.toml" file in our project to allow the script to read from specified directories.

```makefile
[profile.default]
fs_permissions = [{ access = "read", path = "./images/"}]
```

At this point, it's important to note that in settings and permissions, try to make `ffi = false` whenever you can for security reasons.

Now that we've taken care of the permissions business, we can use the `readFile` function to read in our SVG files.

```js
string memory sadSVG = VM.readFile("images/sad.svg");string memory happySVG = VM.readFile("images/happy.svg");
```

## Finalizing the Deployment Script

Finally, we can proceed to deploy our Mood NFT with the encoded SVG URIs.

```js
    string memory sadSvg = vm.readFile("./images/dynamicNft/sad.svg");
    string memory happySvg = vm.readFile("./images/dynamicNft/happy.svg");
```

And return the created Mood NFT for our test functions to utilize.

```js
return moodNFT;
```

## Testing our Deploy Script: Integration Tests vs Unit Tests

Lastly, but certainly not least, we test our deploy script. It will be best to implement both integration tests and unit tests for our script.

<img src="/foundry-nfts/15-deploy/deploy2.png" style="width: 100%; height: auto;">

That's it for this tutorial! Enjoy your automated Mood NFT deployment. Write in the comment section for any questions, suggestions, or just to share your experience!
