---
title: Slither Walkthrough
---

_Follow along with this video:_

---

### Slither Static Analysis

Alright, let's take a closer look at some of the issues Slither was able to find in our code base earlier. These will include, but aren't limited to, each of these.

- Using incorrect Solidity versions
- Missing/wrong events
- Event reentrancy
- Zero address checks
- Supply chain attacks
- Cache storage variables for loops
- Unchanged variables marked as immutable or constant

Start by running `slither .` just as before and let's dive into the output starting at the most severe

### Slither Highs

![slither-walkthrough1](/security-section-4/40-slither-walkthrough/slither-walkthrough1.png)

**1. Sends Eth to Arbitrary User**

- Dangerous Calls: `(success) = feeAddress.call{value: feesToWithdraw}() (src/PuppyRaffle.sol#160)`

Taking a look at this call in our code base, we see it's in the `withdrawFees` function.

```js
function withdrawFees() external {
    require(address(this).balance == uint256(totalFees), "PuppyRaffle: There are currently players active!");
    uint256 feesToWithdraw = totalFees;
    totalFees = 0;
    // (bool success,) = feeAddress.call{value: feesToWithdraw}("");
    require(success, "PuppyRaffle: Failed to withdraw fees");
}
```

So, `Slither` is telling us that our feeAddress is arbitrary and may be malicious. Let's look at the attack vector in the [**`Slither` documentation**](https://github.com/crytic/slither/wiki/Detector-Documentation#functions-that-send-ether-to-arbitrary-destinations).

The documentation outlines that since our `feeAddress` can be changed, whomever receives funds from `withdrawFees` could theoretically be anybody. However, in `PuppyRaffle`, the `feeAddress` can only be changed by the `owner`, so this would be considered intention in our protocol.

```js
function changeFeeAddress(address newFeeAddress) external onlyOwner {
    feeAddress = newFeeAddress;
    emit FeeAddressChanged(newFeeAddress);
}
```

Conveniently, by using the syntax `// slither-disable-next-line [DETECTOR_NAME]`, we can tell Slither to ignore this warning:

```js
// slither-disable-next-line arbitrary-send-eth
(bool success,) = feeAddress.call{value: feesToWithdraw}("")
```

**2. Uses a Weak PRNG**

- Dangerous Calls:
  - `winnerIndex = uint256(keccak256(bytes)(abi.encodePacked(msg.sender,block.timestamp,block.difficulty))) % players.length (src/PuppyRaffle.sol#127-128)`

This is the same vulnerability we detected! We can have slither ignore this line with:

```js
// slither-disable-next-line weak-prng
uint256 winnerIndex =
uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
```

### Slither Mediums

![slither-walkthrough2](/security-section-4/40-slither-walkthrough/slither-walkthrough2.png)

**1. Performs a Multiplication on the Result of a Division**

- Dangerous Calls:
  - `encodedLen = 4 * ((data.length + 2) / 3) (lib/base64/base64.sol#22)`
  - `decodedLen = (data.length / 4) * 3 (lib/base64/base64.sol#78)`

These issues are actually being detected in one of the libraries we're using, `Base64`. For the purposes of this section, we won't be going through our libraries, but what I want you to take away is that we need to assure our libraries, inheritances and dependencies are compatible, and these are generally warnings that are worth investigation.

You can have slither ignore these by navigating to `lib/base64/base64.sol#22` and `lib/base64/base64.sol#78` to prepend the line:

```js
// slither-disable-next-line divide-before-multiply
```

**2. Uses a Dangerous Strict Equality**

- Dangerous Calls:
  - `require(bool,string)(address(this).balance == uint256(totalFees),PuppyRaffle: There are currently players active!) (src/PuppyRaffle.sol#158)`

This is another one we caught during our manual review! The warning here is pointing to our previous `Mishandling of Eth` finding.

We can have slither ignore this warning with:

```js
// slither-disable-next-line incorrect-equality
```

**3. Reentrancy in PuppyRaffle.refund(uint256)**

- Dangerous Calls:
  - External calls:
    - `address(msg.sender).sendValue(entranceFee) (src/PuppyRaffle.sol#102)`
  - State variables written after the call(s):
    - `players[playerIndex] = address(0) (src/PuppyRaffle.sol#104)`

We found this one too! Don't get me started talking about reentrancy again. Know it, protect against it.

You can have `Slither` ignore this one by adding this to the line before our external call:

```js
// slither-disable-next-line reentrancy-no-eth
payable(msg.sender).sendValue(entranceFee);
```

**4. Ignores Return Value by {function call}**

- Dangerous Calls:
- <details>
  <summary>Call Summary</summary>

  - `(tokenId) = _tokenOwners.at(index) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#181)`

  - `_holderTokens[to].add(tokenId) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#339)`
  - `_tokenOwners.set(tokenId,to) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#341)`
  - `_holderTokens[owner].remove(tokenId) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#369)`
  - `_tokenOwners.remove(tokenId) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#371)`
  - `_holderTokens[from].remove(tokenId) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#396)`
  - `_holderTokens[to].add(tokenId) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#397)`
  - `_tokenOwners.set(tokenId,to) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#399)`
  </details>


You can remove these warning from your `Slither` report by navigating to the respective lines for each call in the library and adding:

```js
// slither-disable-next-line unused-return
```

### Slither Lows

![slither-walkthrough3](/security-section-4/40-slither-walkthrough/slither-walkthrough3.png)

**1. Lacks a Zero Check**

- Dangerous Calls:
  - `feeAddress = _feeAddress (src/PuppyRaffle.sol#63)`
  - `feeAddress = newFeeAddress (src/PuppyRaffle.sol#170)`

`feeAddress` is assigned in our `constructor` and the `changeFeeAddress` function. `Slither` is advising that we include a check to assure the `feeAddress` isn't being set to `address(0)`.

That sounds like a valid informational finding to me. Let's add it to our notes above each function!

```js
// @Audit: Info - check for zero address when setting feeAddress
```

These sorts of finds are often referred to as `input validation` and the severity is typically deemed informational.

We can have our `Slither` report remove these warnings once we've made note of them, but adding this line to `PuppyRaffle` before assigning our `feeAddress` in our `constructor` and the `changeFeeAddress` functions:

```js
// slither-disable-next-line missing-zero-check
```

**2. Reentrancy in PuppyRaffle.refund/selectWinner**

- Dangerous Calls: - <details open>
  <summary>Call Summary</summary>
  PuppyRaffle.refund

          - `address(msg.sender).sendValue(entranceFee) (src/PuppyRaffle.sol#103)`

          PuppyRaffle.selectWinner

          -  `(success) = winner.call{value: prizePool}() (src/PuppyRaffle.sol#152)`
          - `_safeMint(winner,tokenId) (src/PuppyRaffle.sol#154)`
          - `returndata = to.functionCall(abi.encodeWithSelector(IERC721Receiver(to).onERC721Received.selector,_msgSender(),from,tokenId,_data),ERC721: transfer to non ERC721Receiver implementer) (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#447-450)`
          - `(success,returndata) = target.call{value: value}(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#119)`
        </details>

        ---

  Now, you may be asking yourself _These are reentrancy, why aren't they high!?_.

Well, these warnings are specifically pointing to the vulnerability described by the manipulation of the order or value of events being emitted. By reentering these functions an attacker is able to manipulate the events being emitted and potentially compromise third party reliance on them.

There's a lot of debate about what kind of severity should be ascribed to event based findings, but my personal rule of thumb is that they are _at least_ `Low Severity`. Examples include:

- If an event can be manipulated
- If an event is missing
- If an event is wrong

I would add these to my notes for an audit report.

```js
// @Audit: Low - Events affected by reentrancy
```

We can remove these warnings from `Slither` by navigating to the reported lines and adding the following as appropriate:

```js
// slither-disable-next-line reentrancy-events
```

In your refund function, you may try to disable 2 checks for the same line. In order to do this, separate your ignore directives with a comma:

```js
// slither-disable-next-line reentrancy-no-eth, reentrancy-events
```

**3. Uses Timestamp for Comparisons**

- Dangerous Calls:
  - `require(bool, string)(block.timestamp >= raffleStartTime + raffleDuration, PuppyRaffle: Raffle not over) (src/PuppyRaffle.sol#136)`

Technically relying on `block.timestamp` means this _would_ be vulnerable to manipulation, but realistically only by a few seconds. For the purposes of this section we'll ignore it for now.

You can have `Slither` ignore it too with:

```js
// slither-disable-next-line timestamp
```

**4. Uses Assembly**

- Dangerous Calls:
  - `INLINE ASM (lib/base64/base64.sol#28-63)`
  - `INLINE ASM (lib/base64/base64.sol#84-126)`
  - `INLINE ASM (lib/openzeppelin-contracts/contracts/utils/Address.sol#33)`
  - `INLINE ASM (lib/openzeppelin-contracts/contracts/utils/Address.sol#180-183)`

In short - Slither doesn't like Assembly. We'll be going over Assembly much later in this course, for now we'll be ignoring these warnings.

You can remove these detectors/warnings by adding the following to the appropriate lines:

```js
// slither-disable-next-line assembly
```

**5. Different Versions of Solidity Are Used**

- Dangerous Calls:

  - <details>
      <summary>Call Summary</summary>

    - `Version used: ['>=0.6.0', '>=0.6.0<0.8.0', '>=0.6.2<0.8.0', '^0.7.6']`
    - `>=0.6.0 (lib/base64/base64.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/access/Ownable.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/introspection/ERC165.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/introspection/IERC165.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/math/SafeMath.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/utils/Context.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/utils/EnumerableMap.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/utils/EnumerableSet.sol#3)`
    - `>=0.6.0<0.8.0 (lib/openzeppelin-contracts/contracts/utils/Strings.sol#3)`
    - `>=0.6.2<0.8.0 (lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol#3)`
    - `>=0.6.2<0.8.0 (lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Enumerable.sol#3)`
    - `>=0.6.2<0.8.0 (lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Metadata.sol#3)`
    - `>=0.6.2<0.8.0 (lib/openzeppelin-contracts/contracts/utils/Address.sol#3)`
    - `^0.7.6 (src/PuppyRaffle.sol#2)`

  </details>

This is where `Slither` is pointing out the `Floating Pragma` vulnerability we outlined earlier. This will definitely be going in our report as an informational finding.

Unfortunately `Slither` doesn't offer a per-file or line disabling of this detector, but we can remove it by adding the following to a `.slither.config.json` that we create:

```js

"detectors_to_exclude":[
    "solc-version"
]

```

Then add this line to the appropriate files:

```js
// slither-disable-next-line pragma,solc-version
```

**6. solc 0.7.6 is not Recommended for Deployment**

- Dangerous Calls:
  - `PuppyRaffle.sol solc version 0.7.6`

Slither's documentation tells us that this is an old version of Solidity and that we're not taking advantage of Solidity updates or new security checks. This is a great finding and should definitely be added to our report.

```js
// @Audit: Info - Should use updated solv version such as 0.8.18
```

**7. {function} is Never Used and Should be Removed**

- Dangerous Calls
  - `PuppyRaffle._isActivePlayer() (src/PuppyRaffle.sol#180-187)`

We called this one out as an informational/gas finding as well. You can disable this detector in `Slither` by adding this line above the function:

```js
// slither-disable-next-line dead-code
```

**8. Low Level Call**

- Dangerous Calls:

  - <details>
    <summary>Call Summary</summary>

    - `(success) = recipient.call{value: amount}() (lib/openzeppelin-contracts/contracts/utils/Address.sol#60)`
    - `(success,returndata) = target.call{value: value}(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#128)`
    - `(success,returndata) = target.staticcall(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#156)`
    - `(success,returndata) = target.delegatecall(data) (lib/openzeppelin-contracts/contracts/utils/Address.sol#183)`
    - `(success) = winner.call{value: prizePool}() (src/PuppyRaffle.sol#154)`
    - `(success) = feeAddress.call{value: feesToWithdraw}() (src/PuppyRaffle.sol#167)`
    </details>


Much like Assembly, `Slither` doesn't like low level calls. We'll be ignoring these for now, but you can remove them from your warnings by applying this line above the described calls.

```js
// slither-disable-next-line low-level-calls
```

**9. Not in mixedCase**

- Dangerous Calls:
  - `Parameter Base64.decode(string)._data (lib/base64/base64.sol#68)`
  - `Parameter ERC721.safeTransferFrom(address,address,uint256,bytes)._data (lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol#247)`

These are simply pointing out naming convention concerns in a couple of our libraries. We'll ignore these as well, but you can remove them from the `Slither` warnings with:

```js
// slither-disable-next-line naming-convention
```

**10. Redundant Expression**

- Dangerous Calls:
  - `"this (lib/openzeppelin-contracts/contracts/utils/Context.sol#21)" inContext (lib/openzeppelin-contracts/contracts/utils/Context.sol#15-24)`

Another warning from a dependency of ours, we'll ignore this, but if you want to remove it you can add the line:

```js
// slither-disable-next-line redundant-statements
```

**11. Variable is Too Similar**

- Dangerous Calls
  - `Base64.TABLE_DECODE (lib/base64/base64.sol#10-13) is too similar to Base64.TABLE_ENCODE (lib/base64/base64.sol#9)`

**_ANOTHER_** warning from the libraries we're using. We can remove it with this line:

```js
// slither-disable-next-line similar-names
```

Now, at this point, you're probably annoyed by all the libraries `Slither` has been catching things in. What if I told you there's a better way to exclude them all at once?!

By running `Slither . --exclude-dependencies` we can actually run our tool and have it ignore anything detected in our imports!

**12. Cached Array Length**

- Dangerous Calls:
  - `Loop condition j < players.length (src/PuppyRaffle.sol#90)`
  - `Loop condition i < players.length (src/PuppyRaffle.sol#114)`
  - `Loop condition i < players.length (src/PuppyRaffle.sol#182)`

Here's a vulnerability we missed!

Any time we're looping through players.length in this way, we're using far more gas than should be necessary. We should cache this value so we're only calling it from storage once.

```js
// @Audit: We should cache the players.length array when looping - uint256 playersLength = players.length;
```

We can remove this warning from the `Slither` report by adding this line before our loops:

```js
// slither-disable-next-line cache-array-length
```

**13. Storage Variables can be Declares Constant**

- Dangerous Calls:
  - `PuppyRaffle.commonImageUri (src/PuppyRaffle.sol#40)`
  - `PuppyRaffle.legendaryImageUri (src/PuppyRaffle.sol#50)`
  - `PuppyRaffle.rareImageUri (src/PuppyRaffle.sol#45)`

A great finding, absolutely these storage variables should be constants, we're setting them once and they never change, a big potential gas savings.

```js
// @Audit: These Storage Variables can be Constants
string private commonImageUri = "ipfs://QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8"
string private rareImageUri = "ipfs://QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW";
string private legendaryImageUri = "ipfs://QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU";
```

We can filter these warnings from our `Slither` report with the line:

```js
// slither-disable-next-line
```

**14. State Variables can be Immutable** - Dangerous Calls: - `PuppyRaffle.raffleDuration (src/PuppyRaffle.sol#25)`

Likewise, this is a great call by `Slither` our raffleDuration is being set once and cannot be changed. Setting this to immutable would offer additional gas savings. Absolutely added to the report.

```js
// @Audit: Unchanging state variables can be declared as immutable
uint256 public raffleDuration;
```

This warning can be removed from the `Slither` report with:

```js
// slither-disable-next-line immutable-states
```

### Wrap Up

Wow. This may have seemed a bit tedious, but look how much we've found and how much better we understand what `Slither` is able to detect. `Slither`, if nothing else, is great at finding gas optimizations, but beyond that it found issues we thought we needed to manually review for.

Had PuppyRaffle ran `Slither` before coming to audit, their code base would have been in a much better starting place.

Up next, let's see what `Aderyn` can do for Puppy Raffle!
