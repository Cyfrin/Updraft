---
title: More Cheatcodes
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/pDb8XDYM8w0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello, and welcome back to our advanced blockchain coding series. I hope you've taken a little break, as resting periods especially early in the course- are essential for grasping the plethora of advanced pieces of the blockchain puzzle we're working on.

Here’s a gentle reminder: Spread the course over several days, not a single day. As the saying goes, repetition is the mother of skill; for skill acquisition to be successful, rests are necessary for the body to recuperate.

Having learned a great deal, we're sailing and doing fantastic.

## Deployment Strategy: FundMe

Did you know you can deploy **FundMe** on any chain with our setup helper config? Isn't it amazing? This feature permits the freedom of focusing solely on writing our tests in any network, with the assurance of our deployment setup working just perfectly.

## Prioritizing Code Coverage

We emphasize the importance of code coverage throughout the course. Nevertheless, it isn't an end-all. For instance, you should continue coding if you don't attain 100% coverage. However, a figure beneath 10% doesn't spell well either.

Let me provide a perspective: Without testing, there's a high probability of functional errors. Consequently, strive to write tests for as much code as is possible to allow the assurance that our code is indeed functioning as desired.

Let's delve directly into coding using our function, `fund`. The code snippet should look like this:

```js
function testFundFailsWithoutEnoughETH() public {
  vm.expectRevert(); //the next line should revert
  // assert(This tx fails/reverts)
  uint256 cat = 1;
}
```

<img src="/foundry-fund-me/13-cheatcodes/cheatcode1.png" style="width: 100%; height: auto;">

The function checks whether sending insufficient Ether will cause our contract to revert. If you run this code, you will note that it reverts as expected and thus passes the test. Furthermore, it checks that `FundMe.fails` when there is insufficient Ethereum sent, once again illustrating a successful test.

## Honing Your Understanding of Fund Functionality

To further test our fund function, let's now consider instances where sufficient Ether has been sent:

```js
function testFundUpdatesFundedDataStructure() public {
    fundMe.fund(value: 10e18);
    uint256 amountFunded =fundMe.getAddressToAmountFunded(msg.sender);
    assertEq(amountFunded, 10e18);
}
```

The function above tests whether sending sufficient Ether (more than $5) updates the data structures correctly. This function accesses the contract data that was previously marked as private. This can be achieved by using getter functions, such as `getContractBalance`, instead of accessing the variables directly. This makes the code more readable, secure and efficient.

## The Wrap

Congratulations on completing this part of the course, it's indeed taken significant effort, and you are making progress! Code testing and understanding how it integrates with complex chains is an essential part of mastering advanced blockchain coding. Don't worry about the number of tests conducted; remember that the key is to understand and apply the concepts learned in code coverage.

Remember to keep practicing and reworking the code until you fully understand how it functions. Good luck with your test and happy coding!
