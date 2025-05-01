---
title: Weak Randomness - Case Study
---

_Follow along with this video:_

---

### Intro to Meebits and Andy Li

Let's look into a case study that involves the exploit of an NFT project, Meebits, which occurred in 2021. This analysis will shed light on a real-world example of how weak randomness was exploited, resulting in a substantial loss of nearly a million dollars for the protocol.

We extend our appreciation to [**Andy Li**](https://twitter.com/andyfeili) from [**Sigma Prime**](https://sigmaprime.io/) who walks us through the details of this attack.

_Information in this post is graciously provided by Andy_

Remember, periodically conducting post mortems like this greatly contributes towards honing your skills as a security researcher. Familiarity begets mitigation.

### Case Study: Meebits - Insecure Randomness

Meebits, created by Larva Labs (team behind CryptoPunks), was exploited in May 2021 due to insecure randomness in its smart contracts. By rerolling their randomness, an attacker was able to obtain a rare NFT which they sold for $700k.

The concept behind Meebits was simple. If you owned a CryptoPunk, you could mint a free Meebit NFT. The attributes of this newly minted NFT were supposed to be random, with some traits being more valuable than others. However, owing to exploitable randomness, the attacker could reroll their mint until they obtained an NFT with desirable traits.

### How the Attack Happened

There were 4 distinct things that occurred.

**Metadata Disclosure:** The Meebit contract contained an IPFS hash which pointed to metadata for the collection. Within the Metadata there existed a string of text that clearly disclosed which traits would be the most rare

    "...While just five of the 20,000 Meebits are of the dissected form, which is the rarest. The kinds include dissected, visitor, skeleton, robot, elephant, pig and human, listed in decreasing order of rarity."

In addition to this, the `tokenURI` function allowed public access to the traits of your minted Meebit, by passing the function your tokenId.

**Insecure Randomness:** Meebits calculated a random index based on this line of code:

```js
uint index = uint(keccak256(abi.encodePacked(nonce, msg.sender, block.difficulty, block.timestamp))) % totalSize;
```

This method to generate an index is used within Meebit's `randomIndex` function when minting an NFT.

```js
function _mint(address _to, uint createdVia) internal returns (uint) {
        require(_to != address(0), "Cannot mint to 0x0.");
        require(numTokens < TOKEN_LIMIT, "Token limit reached.");
        uint id = randomIndex();

        numTokens = numTokens + 1;
        _addNFToken(_to, id);

        emit Mint(id, _to, createdVia);
        emit Transfer(address(0), _to, id);
        return id;
    }
```

**Attacker Rerolls Mint Repeatedly:** The attacker in this case deployed a contract which did two things.

1. Calls `mint` to mint an NFT
2. Checks the 'random' Id generated and reverts the `mint` call if it isn't desirable.

The attack contract wasn't verified, but if we decompile its bytecode we can see the attack function.

```js
function 0x1f2a8a19(uint256 varg0) public nonPayable {
    require(msg.data.length -4 >= 32);
    require(bool(stor_2_0_19.code.size));
    v0, /*uint256*/ v1 = stor_2_0_19.mintWithPunkOrGlyph(varg0).gas(msg.gas);
    require(bool(v0), 0, RETURNDATASIZE());
    require(RETURNDATASIZE() >= 32);
    assert(bool(uint8(map_1[v1]))==bool(1));
    v2 = address(block.coinbase).call().value(0xde0b6b3a7640000);
    require(bool(v2), 0, RETURNDATASIZE());
}
```

The above my be a little complex, but these are the important lines to note:

```js
v0, /*uint256*/ (v1 = stor_2_0_19.mintWithPunkOrGlyph(varg0).gas(msg.gas));
```

and

```js
assert(bool(uint8(map_1[v1])) == bool(1));
```

The first line is where the mint function is being called by the attacking contract.

The second line is where an assertion is made that the minted NFT has the desired rare traits. If this assertion fails, the whole transaction is reverted.

**Attacker Receives Rare NFT:**

The attacking contract called this mint function and reverted for over 6 hours. Spending ~$20,000/hour in gas until they minted the rare NFT they wanted Meebit \#16647. The NFT possessed a Visitor trait and sold for ~$700,000.

::image{src='/security-section-4/27-weak-randomness-case-study/meebit1.png' style='width: 75%; height: auto;'}

### Wrap Up

There you have it. That's how an attacker in 2021 was able to exploit weak randomness in the Meebits contract.

Thanks again to Andy! In the next lesson we'll be going over how to prevent this madness!
