---
title: Exploit - Unsupported Opcodes
---

_Follow along with the video lesson:_

---

### Exploit - Unsupported Opcodes

Something interesting to me in the `TokenFactory::deployToken` is that the Boss Bridge team is using Assembly for some reason. Using low-level code can introduce some easy ways to break a contract that we should be cognizant of.

We go deeper into opcodes in the HorseStore and Math Masters sections of the [**Assembly & Formal Verification Course**](https://updraft.cyfrin.io/courses/formal-verification), don't be discouraged if this bit isn't clear right away.

### deployToken Assembly

So, Assembly gives us lower level access to the EVM. We can see it being used in `TokenFactory::deployToken`.

```js
function deployToken(string memory symbol, bytes memory contractBytecode) public onlyOwner returns (address addr) {
    assembly {
        addr := create(0, add(contractBytecode, 0x20), mload(contractBytecode))
    }
    s_tokenToAddress[symbol] = addr;
    emit TokenDeployed(symbol, addr);
}
```

In Solidity, this Assembly block is actually written in a language called `Yul`, we see it's executing the `create` function.

The [**Solidity Documentation**](https://docs.soliditylang.org/en/latest/yul.html) is a great reference for what these Yul functions are doing.

![unsupported-opcodes1](/security-section-7/10-unsupported-opcodes/unsupported-opcodes1.png)

What does this mean for our Boss Bridge function?

**v** - `0`

**p** - `add(contractBytecode, 0x20)`

**n** - `mload(contractBytecode)`

Without getting too deep into how things are working, any time you work with data, it tends to need to be loaded into memory. In order to do this, we need to know how big it is, or how much data to load.

Ultimately, our `create` function is taking the size of our contract byte code (`p`), loading it into memory (`n`), and creating the contract based on that data in memory. `v` is the value we're sending with the create transaction.

The create Yul function returns an address, but I'm really not sure why the protocol would choose to deploy this way. We might post the question:

```js
// @Audit-Question: Why are we using Assembly here? Is this gas efficient?
```

### Continuing with TokenFactory

Wrapping up the deployToken function, we see that a mapping is being updated. It looks like TokenFactory is going to keep track of all the contracts it deploys. The function is even emitting an event. Great, looks good.

```js
s_tokenToAddress[symbol] = addr;
emit TokenDeployed(symbol, addr);
```

The final function in `TokenFactory.sol` is `getTokenAddressFromSymbol`, a simple getter, but we should make sure it's used somewhere, if it's not marked external.

Turns out this function _isn't_ being used internally (neither is `deployToken`!), but this was caught by Aderyn.

```
## L-4: `public` functions not used internally could be marked `external`
```

### The Checklist

Since we have some unanswered questions, this is actually a good chance to lean on our checklist a little bit.

By searching the checklist for "opcodes" we should be able to find:

![unsupported-opcodes2](/security-section-7/10-unsupported-opcodes/unsupported-opcodes2.png)

Hmm.. this definitely seems like it could be an important consideration in a cross chain bridge like Boss Bridge. Let's see how this applies to our situation.

We first have to know which opcodes are needed for this protocol!

Run `forge build`. This should generate a JSON file for TokenFactory in our `out` folder. We can view our opcodes for this contract here - thanks solc compiler!

**If your TokenFactory.json file looks like this:**

![unsupported-opcodes3](/security-section-7/10-unsupported-opcodes/unsupported-opcodes3.png)

**...right-click and select `Format Document`.**

We can scroll down to `bytecode` or `deployedBytecode` for a list of what's used in this contract. This string of numbers and letters is the hexadecimal representation of the opcodes of which this contract is comprised.

Within this list, we expect to find the `create` opcode. A reference list for opcodes can be found here on [**evm.codes**](https://www.evm.codes/). From that reference we can see that `create` is represented by the opcode `F0`.

We can definitely see it popping up, if we search our bytecode for this.. don't worry about it showing up a few time for our purposes here.

![unsupported-opcodes4](/security-section-7/10-unsupported-opcodes/unsupported-opcodes4.png)

This opcode is of course compatible with the `Ethereum` chain, but Boss Bridge is meant to work on `zkSync Era`! I wonder if the `create` opcode is supported, we should check [**their docs**](https://docs.zksync.io/).

Their docs have a tonne of valuable information that I recommend you read, but we're most interested in `EVM compatibility`. From [**this section**](https://docs.zksync.io/build/support/faq.html#evm-compatibility) of the docs zkSync details:

    EVM Compatibility

    There is a lot of confusion amongst the community with regard to the impacts of being EVM Compatible versus EVM Equivalent. First, let’s define what is meant by the two.

    - EVM Equivalent means that a given protocol supports every opcode of Ethereum’s EVM down to the bytecode. Thus, any EVM smart contract works with 100% assurance out of the box.
    - EVM Compatible means that a percentage of the opcodes of Ethereum’s EVM are supported; thus, a percentage of smart contracts work out of the box.

    zkSync is optimized to be EVM compatible not EVM equivalent for three primary reasons:

    1. Creating a generalized circuit for EVM equivalence down to the bytecode would be prohibitively expensive and time-consuming.
    2. Building on what we learned with zkSync Lite, we were able to design a system optimized for performance and provability in ZK.
    3. The opcodes we’ve chosen NOT to support are deprecated by Ethereum itself, or rarely used. In the case a project needs them, modifications to work with zkSync are minimal and do not generate a need for a new security audit.

Alright, all good to know, but not exactly what we're looking for. It _does_ seem like things are handled somewhat differently on zkSync Era. [**This page**](https://docs.zksync.io/build/developer-reference/differences-with-ethereum.html) has more specific information on how `create` is handled.

    "On zkSync Era, contract deployment is performed using the hash of the bytecode, and the factoryDeps field of EIP712 transactions contains the bytecode. The actual deployment occurs by providing the contract's hash to the ContractDeployer system contract.

    To guarantee that create/create2 functions operate correctly, the compiler must be aware of the bytecode of the deployed contract in advance. "

![unsupported-opcodes5](/security-section-7/10-unsupported-opcodes/unsupported-opcodes5.png)

Uh oh. The third example we're given by the zkSync docs looks suspiciously like our `Boss Bridge` execution of `create`!

This is clearly going to be an issue.

```js
assembly {
    // @Audit-High: This won't work on zkSync Era!
    // Docs Reference: https://docs.zksync.io/build/developer-reference/differences-with-ethereum.html#create-create2
    addr := create(0, add(contractBytecode, 0x20), mload(contractBytecode))
}
```

### Wrap Up

We found a `High`! This really demonstrates the potential power of The Hans Checklist. The Checklist is huge, no doubt, but if it's run through at the end of an audit, you'll find lots of the strange intricacies as you check things off.

This may seem like a silly bug to some, an obvious thing to overlook, but I assure you these things happen. There's a famous casestudy in which 921 ETH were locked because the transfer function would fail at the time on zkSync.

Read more about it [**here**](https://medium.com/coinmonks/gemstoneido-contract-stuck-with-921-eth-an-analysis-of-why-transfer-does-not-work-on-zksync-era-d5a01807227d). When you're done, I'll see you in the next one!
