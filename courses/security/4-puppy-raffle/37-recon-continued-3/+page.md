---
title: Recon Continued 3
---

_Follow along with this video:_

---

### Recon Continued

We're doing great so far and have uncovered lots - we definitely shouldn't stop now. The next function we'll approach is `changeFeeAddress`.

### changeFeeAddress

```js
/// @notice only the owner of the contract can change the feeAddress
/// @param newFeeAddress the new address to send fees to
function changeFeeAddress(address newFeeAddress) external onlyOwner {
    feeAddress = newFeeAddress;
    emit FeeAddressChanged(newFeeAddress);
}
```

To begin with, let's look into the `changeFeeAddress` function. This function ensures that only the contract owner can make changes to the contract's `feeAddress`. The modifier `onlyOwner` that is used in this function is sourced from the OpenZeppelin library. We can (and should) inspect these functions to assure access control is working as we'd expect - it is.

```javascript
/**
 * @dev Throws if called by any account other than the owner.
 */
modifier onlyOwner() {
    require(owner() == _msgSender(), "Ownable: caller is not the owner");
    _;
}
```

`changeFeeAddress` then sets the `feeAddress` variable to the new address provided, and finally emits an event.

> Whoops! - events should be emitted after state changes, we haven't seen many events til now, we may need to return to previous functions to verify!

Things look fine with `changeFeeAddress`, what's next?

## \_isActivePlayer

```javascript
/// @notice this function will return true if the msg.sender is an active player
function _isActivePlayer() internal view returns (bool) {
    for (uint256 i = 0; i < players.length; i++) {
        if (players[i] == msg.sender) {
            return true;
        }
    }
    return false;
}
```

Now, we haven't seen this referenced anywhere before now, we may want to simply investigate when this function is being used.

![recon-continued1](/security-section-4/36-recon-continued-3/recon-continued1.png)

Ironically, it seems this function isn't being used anywhere in our protocol!

We would have to ask ourselves of course:

```js
// Impact:
// Likelihood:
```

Given that this is an `internal` function that is never called - the `impact` and `likelihood` are both realistically going to be `None`. With that said, this function is clearly a waste of gas.

When we complete our write up, it's likely this will be an `Informational` or `Gas` severity.

### \_baseURI

```js
/// @notice this could be a constant variable
function _baseURI() internal pure returns (string memory) {
    return "data:application/json;base64,";
}
```

The next function down is `_baseURI`. This seems pretty straightforward. It looks like it provides a base for a tokenURI used for an SVG NFT implementation.

> **Note:** If this is confusing to you, absolutely review the Foundry Full Course. NFTs are a huge part of DeFi and you _need_ to know this stuff intimately.

### tokenURI

Skimming through the `tokenURI` function, nothing initially sticks out as unusual. A few things we would want to check would be:

- Assuring tokens have their rarity properly assigned.
- Verifying mapping for `rarityToUri` and `rarityToName` and where they are set.
- Double checking that the image URIs work for each rarity.

The function then ends in a whole bunch of encoding stuff. It's pretty heavy, so we're not going to go through it too deeply. There may be some redundancy here - I challenge you to sus it out - but for the most part this is good.

Definitely be thinking about _how can I break this view function?_

### Wrap Up

At this point we've completed our first thorough review of the code base. We should definitely go back and reassess events, as well as dedicate some time considering state variables - but for the most part, we've completed an initial review!

This would be a great stage to go back through our notes and begin answering some of the questions we've been leaving ourselves.

```js
// Were custom reverts a thing in 0.7.6 of solidity?
// - No!
// What if the players.length == 0?
// - still emits an event when creating the raffle?
// etc...
```

We likely have a tonne of questions at this point and it's good practice to now answer them. Going through our previous questions might even generate new ones - but we keep at the process until we have a solid understanding of how everything should and does work.

Usually one pass of a code base isn't going to be enough. If there are unanswered questions, it's a good sign that you need to go deeper.

In the next lesson, we'll answer more of our questions, but I challenge you to go through some and try to find answers on your own before continuing!
