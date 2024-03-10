---
title: Forked Tests
---

_Follow along the course with this video._



---

As we delve further into the mechanisms of our evolving FundMe tool, we find ourselves grappling with some indispensable features we need to solidify. What jumps to mind first? Yes, you’re thinking right. It's the FundMe proceeds.

As developers, we must ensure that our conversion rate is functioning as expected, thereby assuring us that the funding aspect of our tool is reliable. For this, we must ascertain that we can acquire the right version from our aggregator v3 interface and interact with it appropriately.

Let's plunge into this intricate process, taking one step at a time.

### Ensuring Functional Price Feed Integrations

The first step involves testing our price feed integrations using the `get version` function. We know from Remix that it should return version four.

```javascript
function testPriceFeedVersionIsAccurate() {
    uint256 version = FundMe.getVersion();
    assertEq(version, 4);
}
```

Delving further into the world of testing, we try running the test with Forge:

```bash
forge test
```

And lo and behold, we encounter an EVM revert. But why did this happen? To intensify our focus on this particular test and sideline the rest, we use this method:

```javascript
forge test -m testPriceFeedVersionIsAccurate
```

By switching the visibility with three V's, we can acquire more information. We now see that we get what's known as a stack trace of the error, pointing out that our GetVersion call is reverting due to a non-existing contract address. This happens since Foundry automatically sets up an Anvil chain for test runs, deleting it after completion.

```bash
forge test -vvv
```

### Addressing Non-Existent Contract Addresses

At this stage, you might be left wondering how to tackle these non-existent addresses. Can we even test our `testPriceFeedVersion` accurately when it encounters hiccup due to Forge and Anvil? Yes, we can - with a little maneuvering. One way is to use a fork URL. Here, we’ll draw a parallel situation where we use Alchemy to generate an API key.

```bash
SEPOLIA-RPC-URL=your-alchemy-key
```

Make sure your .env file exists and is a part of your .gitignore.

```bash
echo $SEPOLIA-RPC-URL
```

You can now utilize this RPC URL.

```bash
forge test -M testPriceFeedVersionIsAccurate --fork-url $SEPOLIA-RPC-URL
```

The Anvil spins up but imitates transactions as if they were on the Sepolia chain. Our test's successful run now verifies that our transaction was performed adequately on the Sepolia chain.

<img src="/foundry-fund-me/7-forked-tests/forked1.png" style="width: 100%; height: auto;">

### Balanced Approach: Unit Test, Integration Test, Forked and Staging Test

While we tackle and solve the problems at hand, it’s essential to remember that we are learning to maneuver around four main testing approaches. In the journey with FundMe, we will navigate primarily through Unit, Integration, and Forked tests.

1. Unit test - A method of testing a particular code piece or function. In this case, we could argue that `getVersion` function was a unit test.
2. Integration test - Multi-contract testing to ensure that all interrelated contracts effectively work together.
3. Fork test - Testing our code in a simulated real environment.
4. Staging test - Deploying our code to a real environment like testnet or mainnet to validate that everything indeed works as it should.

Each of these tests has its strengths, weaknesses, and ideal usage instances. For instance, maintaining a balance between the number of fork tests versus standard tests is crucial to not overdo API calls to your alchemy node and sending your bill through the roof.

### Conclusion

Testing forms the backbone of the code we write and deploy. It is crucial to comprehend the need for testing coverage for our codes. Writing an extensive set of tests and achieving maximum test coverage lets us confidently deploy our contract to perform as expected.

Ensuring a good level of coverage across the board, unit tests, integration tests, fork tests, and staging tests, can sometimes seem overwhelming. However, the more one works with it, the clearer it seems. I promise you, it's only a matter of learning, doing, and repeating.

<img src="/foundry-fund-me/7-forked-tests/forked2.png" style="width: 100%; height: auto;">
