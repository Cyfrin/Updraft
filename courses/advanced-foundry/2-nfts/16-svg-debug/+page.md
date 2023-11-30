---
title: SVG NFT Debugging
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/MQXrXFRS3ks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome to a new highly detailed blog post on debugging, testing, and creating automated scripts for smart contracts. We will walk you through the process of running and debugging tests using the Forge test tool. We'll also give you some examples of integrating unit testing and integration testing. Buckle up as this is going to be an interesting journey through the jungle of smart contract testing.

<img src="/foundry-nfts/16-debug/debug1.png" style="width: 100%; height: auto;">

## Solving the URI Mystery

At this point, we decided to take a more detailed look at the `sadSvgUri`. We considered that the `tokenUri` and the `sadSvgUri` were not supposed to be the same because one is an image `Uri` while the other isn't. After a bit of back-and-forth, we figured out the `tokenUri` was supposed to equal our `Sad SVG Uri`.

<img src="/foundry-nfts/16-debug/debug2.png" style="width: 100%; height: auto;">

So in order to achieve that we need to assert the actual token URI correspond to the sad SVG URI. We added the following code to our test script:

```javascript
function testFlipTokenToSad() public {
        vm.prank(USER);
        moodNft.mintNft();

        vm.prank(USER);
        moodNft.flipMood(0);

        assert(
            keccak256(abi.encodePacked(moodNft.tokenURI(0))) ==
                keccak256(abi.encodePacked(SAD_MOOD_URI))
        );
    }
```

With the mystery solved, we performed another run and successfully passed all tests.

## Unit Test Versus Integration Test

In a nutshell, the process of testing we've just gone through is a good demonstration of the differences between a unit test and an integration test.

- **Unit Test**: In our case, it was testing the specific function on our Deploy Mood NFT and Mood NFT.
- **Integration Test**: This type of test combined the deployer with the Mood NFT and Basic NFT, ultimately showing what an integration test should look like.

## Script Writing to Automate Deployment and Testing

Don't want to manually type all of those Forge script commands? Let's walk through the process of automating those actions for deployment and testing.

In our case, we created a script that, once run, deploys both of our NFTs and even flips the mood of our NFT. You can add this script in your make file. Be sure to create scripts for minting the Mood NFT and flipping the Mood NFT too. Even though they are skipped in this post, they are also crucial for a complete automation setup.

## Working on Code Coverage

Lastly, we highly recommend improving your code coverage. Our current coverage looks good for Basic NFT and Mood NFT, but scripts' coverage can certainly be improved. Writing comprehensive tests boosts your confidence that the code will function as expected.

To check code coverage, run:

```bash
forge coverage
```

This will give you a detailed report of the coverage for each code section.

## Wrapping Things Up

We believe that this practice exercise will help you appreciate the importance of testing, debugging and automating scripts when working with smart contracts. It's a lot more fun to run a single command that deploys, tests and completes your NFT than to manually type each command individually.

Remember to constantly evaluate your test coverage and keep it high. If you do, you will significantly increase your confidence that your code performs exactly as expected. Happy testing!
