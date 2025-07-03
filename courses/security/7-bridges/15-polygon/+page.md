---
title: Case Study - Polygon Precompile
---

---

### Case Study - Polygon Precompile

In this lesson we'll be covering a case study in which a security researcher (just like you!) claimed a $2.2 Million bug bounty, saving the Polygon ecosystem of being drained a potential $7 Billion. With a B.

### Polygon

On May 31, 2020 the Matic blockchain was launched, this was later rebranded to the Polygon Chain. Polygon is well known for:

- EVM Compatibility
- Cheap Gas Fees
- Short Block Time
- ZK Rollup Tech

In the Genesis Block of the Polygon Chain (block 0), there are 10 transactions, one of which is the creation of a contract - MRC20. You can view this block yourself on [**PolygonScan**](https://polygonscan.com/txs?block=0). On creation, this contract was deployed with nearly 10 billion MATIC (the Polygon native currency).

A defining feature of this contract is that it contains a function which allows someone to sign a transaction without sending it. These are known as metatransactions and you can read more about them in [**EIP-2771**](https://eips.ethereum.org/EIPS/eip-2771).

An exploit was lurking in MRC20 though, waiting to drain the contract of all these funds.

On December 3, 2021, nearly a year and a half after creation. A bug bounty report was submitted on Immunefi by `LeonSpacewalker` laying out exactly how someone could exploit the MRC20 contract. Over the next 2 days, reports flooded in, detailing this exploit until, a malicious actor found the vulnerability and stole 800,000 MATIC tokens.

On Dec 5th, just two days after the initial report, the Polygon Chain was forked with the exploit patched.

### The Exploit

So, what was the vulnerability in MRC20 that caused all this? It's found in this function:

```js
function transferWithSig(
    bytes calldata sig,
    uint256 amount,
    bytes32 data,
    uint256 expiration,
    address to
) external returns (address from) {
    require(amount > 0);
    require(
        expiration == 0 || block.number <= expiration,
        "Signature is expired"
    );

    bytes32 dataHash = getTokenTransferOrderHash(
        msg.sender,
        amount,
        data,
        expiration
    )
    require(disabledHashes[dataHash] == false, "Sig deactivated");
    disabledHashes[dataHash] = true;
    from = ecrecovery(dataHash, sig);
    _transferFrom(from, address(uint160(to)), amount);
}
```

At first glance this doesn't seem like a big deal. This function is taking a `signature`, an `amount`, the message `data`, an `expiration` and an destination address (`to`).

Many of these passed arguments are hashed into the transaction data and then the signer (`from`) is derived from this hash and the signature using `ecrecovery`, a wrapper for the `ecrecover` precompile.

Something to note about ecrecover - it returns `address(0)` on an error!

![polygon1](/security-section-7/15-polygon/polygon1.png)

The EVM actually _does_ have a check to assure `address(0)` isn't returned, but this was never copied into the ecrecovery wrapper, which means ecrecovery - still returns `address(0)`.

```js
from = ecrecovery(dataHash, sig);
_transferFrom(from, address(uint160(to)), amount);
```

We can see there's no check in the MRC20 contract to verify the address being returned isn't zero, surely `_transfer` checks this?

```js
function _transfer(address sender, address recipient, uint256 amount)
    internal
{
    require(recipient != address(this), "can't send to MRC20");
    address(uint160(recipient)).transfer(amount);
    emit Transfer(sender, recipient, amount);
}

```

It doesn't. The \_transfer function doesn't even check to assure the `from` address has enough tokens, it just transfers the tokens from the MRC20 contract.

So, in order to exploit this vulnerability, an attacker just needed to call `transferWithSig` with bad signature data, which would result in `address(0)` being returned as the sender, and pass any amount and receiver address.

The result - an empty smart contract.

### Bug Hunting Tips

So, how did `LeonSpacewalker` find this bug, disclose it and get his massive payout? Leon's tips are below:

1. Find your edge: Find the thing that gives you an advantage over other auditors and developers.
2. Find a strategy that works for you: Everyone different and the best approach to finding bugs for one may be different for another. Leon outlined a few good strategies:

   1. Find a project and search for bugs - this includes learning everything there is to know about a protocol, reading it's documentation, building it locally, really mastering the insides and out to identify where things go wrong.

   2. Find a bug and search for projects - Find a bug that's rare or many people are unfamiliar with and look for projects that may be vulnerable to that bug. It can be much easier to look for a specific thing in a code base than to look for something that stands out.

   3. Be fast with new updates: Be signed up to Bug Bounty announcements through platforms like Immunefi to assure you're notified as soon as a bounty is made live by a protocol.

   4. Be creative with finding your edge: Something Leon did to give him an edge was traverse community forums to scope out which protocols were considering doing a bug bounty. He would then proactively look through code based _before_ they were even submitted for approval!

   5. Know your tooling: Security researchers use a whole host of tools to their advantage when hunting for bugs including things like

      - Solidity Visual Developer
      - Hardhat
      - Etherscan
      - Foundry
      - Fuzzing Tools
      - Test Suites

      ... to name a few. Knowing these tools, their features and how to implement them effectively provide huge advantages when approaching a bug hunt.

   6. **Don't be afraid of audited projects:** Just because a code base has been reviewed **_does not_** guarantee it's 100% secure. Code bases which have gone through multiple rounds of security reviews may often still be vulnerable to lesser known exploits, and frankly no audit firm is perfect.

   7. **Find your niche:** Find that thing you specialize in and know more about than anyone else. For example, a lot of developers may know Solidity, but not understand the financial side of DeFi. Maybe you want to get really good at borrowing and lending, maybe NFTs. Find something that positions you to be the expert at defending that particular space/industry.
