---
title: summary implementations
---

## Crafting Smart Contract Methods for Verification

Let's talk code and start with crafting a methods block in our smart contract. We'll create an external function, `safeTransferFrom`, that takes in two addresses and a `uint256` argument:

```js
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
    // Function code here
}
```

Pretty standard thus far, right? But here's where it gets exciting. We use the Certora verification tool to rigorously test our contracts. In particular, we're looking to prevent `safeTransferFrom` from doing anything it shouldn't.

## Certora's Dispatcher: Friend or Foe?

For those unfamiliar, Certora is a prover tool that rigorously analyzes smart contracts to ensure they behave as intended. A key feature we'll focus on today is its "dispatcher." When set to `true`, it ensures that `safeTransferFrom` can only perform actions as defined in the contracts Certora is aware of.

In the smart contract world, this is a major game-changer. It prevents unwanted behavior by limiting function calls to their defined behavior within known contracts.

When we flip the switch on our dispatcher, Certora doesn't assume `safeTransferFrom` could do "literally anything." Instead, it diligently combs through known contract instances, finding and referencing the various `safeTransferFrom` functions.

For example, if our smart contract code includes:

Then Certora might say, "Ah, there's `safeTransferFrom` declared in `MockERC721.sol`. However, I only recognize these other three contracts. Let's check if `NFTMock` implements this function." Trust me, this small change can significantly impact the security posture of our smart contracts.

## Auto-Summary: The Unsung Hero

While we're on the subject, let me introduce you to another useful feature called "auto-summary." As the name suggests, Certora automatically appends an auto-summary to called methods. This automated speculation helps determine what the function should do.

For view and pure methods, it uses nondeterministic approximations (essentially educated guesses), while for others, such as those involving library methods and delegate calls, assumptions are made that storage might be arbitrarily changed.

In coding terms, when you see an auto-summary like the one below in Certora's output, it's essentially saying, "I'm defaulting to havoc scenarios for all unspecified cases."

## Fine-Tuning Our Methodology

Now, here's the kicker: our `GasBadNFTMarketplace.sol` contract might not be the one invoking `transfer`. So we need to instruct Certora that not just any contract calling `safeTransferFrom` should be havoced, but it should reference an existing implementation from known contracts in our configuration file.

By setting dispatcher to `true`, we're guiding Certora to utilize our `NFTMock` contract's `safeTransferFrom` for every related call. This standardizes our expectations and the behavior Certora will analyze.

## Real-World Verification Conundrums

When we run verification with Certora, we might face peculiar puzzles, such as errors that point to `default havoc`. It's like a treasure hunt — you scan through the calls and conditions to catch that havoc action responsible for unexpected outcomes. This helps us identify which piece of code needs refinement.

A real-world scenario would be scrutinizing the `onERC721Received` function. Certora might apply havoc to this function based on assumptions extrapolated from other contracts, so we must configure it explicitly to call the correct function within `GasBadNFTMarketplace.sol`.

```solidity
function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4) {// Function code herereturn this.onERC721Received.selector;}
```

With precise specification, such as making the function only execute certain defined actions (`dispatcher = true`), we restrict its behavior to what's expected. Hence, when Certora verifies the contract, any ambiguity that could lead to havocing is eliminated.

## Pulling Back the Curtain on Smart Contract Verification

Let's pull back the curtain for a moment and glimpse the dramatic theatre of smart contract verification. When we initiate a `call` within our `withdrawProceeds` function, it's akin to unleashing pandemonium (havoc): A `call` could literally do anything, from re-entering functions to other chaotic scenarios!

Our job as vigilant developers then becomes crafting our specifications to keep our contract's assumptions clear and enforceable. We would do this by being explicit about what we expect from our functions, rather than taking the easy way out with making all state variables persistent, which might hide underlying assumptions.

## Final Thoughts

In practice, fine-tuning our methods block to tell Certora how to treat functions like `safeTransferFrom` and `onERC721Received` clarifies what we assume about our contract's behavior. It allows us to write more secure, verifiable code, even if it's a little more difficult than just setting variables to persist through havoc.

By now, I hope you've grasped the fundamental relevance of dispatchers, how they shape the verification process, and how carving out specific behaviors can prevent unwanted disruptions in your contracts. So next time you're knee-deep in smart contract code, remember to be explicit about your assumptions and let tools like Certora ensure they hold up under scrutiny.

Remember, robust smart contracts aren't just written — they're proven. Keep questioning, keep verifying, and until next time, happy coding!
