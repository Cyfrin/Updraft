---
title: Basic NFT Tests
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/v-_H8_wK2lQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

When working with NFTs in Solidity, it's crucial to conduct tests to ensure that the contract functions appropriately. As you can imagine, programming blockchain-based contracts can be quite challenging because, unlike other pieces of software, deploying a faulty smart contract on the blockchain can lead to disastrous consequences (and yes, that includes financial loss!).

With that in mind, let's delve into testing  coding some tests for the basic NFT contract we created in the previous lesson.



## Conducting BasicNFT tests

Once the setup is complete, it's time to jump into tests. Writing an array of tests serves to validate the functionality of our contract, but for the purpose of this blog, let's focus on testing the Name function.

To confirm that the Name of your NFT is correct, declare a function `testNameIsCorrect` and specify it as public view. The expected output should be set as a string memory.

```js
function testNameIsCorrect() public view {
  string memory expectedName = "Dogie";
  string memory actualName = basicNft.name();
  // This will give us an error!
  assert(expectedName == actualName);
}
```
## An Issue With Comparing Strings

However, as we proceed with writing the tests, an issue becomes apparent when trying to assert that the expected name equals the actual name. The main problem lies in Solidity's inability to compare array types which includes strings.

While it's possible to manually loop through each item in an array for comparison, it's impractical and can lead to verbose code. A more streamlined approach would be to hash the arrays using `abi.encodePacked` and compare the resulting fixed-sized, unique string identifiers.


Here's how it's achieved:

```javascript
assert(keccak256(abi.encodePacked(expectedName)) == 
       keccak256(abi.encodePacked(actualName)));
```

This code returns a pass if the name functions as intended.

<img src="/foundry-nfts/7-test/test1.png" style="width: 100%; height: auto;">


## A Second Round of Testing

Suppose we wish to further test if the `mint` function operates correctly and have a balance. In this case, let's declare a function `testCanMintAndHaveABalance`. In addition, assign an address called 'user', create one with the parent function and then mint an NFT.

Now, test if the balance is correct and validate that the tokenUri is the same as the pug.

```javascript
function testCanMintAndHaveABalance() public {
        vm.prank(USER);
        basicNft.mintNft(PUG_URI);
        assert(basicNft.balanceOf(USER) == 1);
    }
```

If everything is set correctly, it's time for execution! Use `forgeTest` to run all tests.

<img src="/foundry-nfts/7-test/test2.png" style="width: 100%; height: auto;">

## Wrapping Up

In conclusion, the process of testing contracts in Solidity is an essential part of developing a flawless contract that works exactly as intended. Despite some of its quirks (like the lack of native support for string comparison), you can leverage algorithmic techniques to work around them, as we have shown in this blog post translation of a transcript. Practice issuing new contracts and conducting tests - the more you practice, the easier it becomes. Happy coding, and to more successful test results!

