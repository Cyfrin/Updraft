---
title: Section 3 Recap
---

_Follow along with this video:_

---

### Section 3 Recap

We just learnt a tonne, and in record time. Let's recap some of the things we covered in this sections.

### .conf

By writing 2 more .conf files, we gained a bunch more experience in configuring our formal verification tests. We learnt different options within this configuration such as:

- `rule_sanity` - We experimented with `basic` and `none` and saw how this affected Certora's assessment of the `sanity` or soundness of our tests
- `prover_args` - options we can pass our CLI to fine tune the assumptions of the prover.

> ❗ **IMPORTANT**
> Remember, that while we can tweak our assumptions, it's important to be cautious when doing so. Setting `optimistic_fallback` to avoid HAVOCing external calls is a bad idea if you have reason to believe those external calls can be malicious. These assumptions configure the prover to rate situations as valid, but they may be **_unsound_**.

```js
{
    "files": [
        "src/GasBadNftMarketplace.sol:GasBadNftMarketplace",
        "src/NftMarketplace.sol:NftMarketplace",
        "test/mocks/NftMock.sol:NftMock"
    ],
    "verify": "GasBadNftMarketplace:certora/spec/GasBadNft.spec",
    "wait_for_results": "all",
    "rule_sanity": "basic",
    "optimistic_loop": true,
    "msg": "Verification of NftMarketplace",
    "prover_args": [
        "optimistic_fallback": true
    ]
}
```

### Methods Block

**Summary Declarations**

We also learnt about summary declarations, the DISPATCHER summary in particular. Summary Declarations allow us to tell the Certora provers to replace any function logic with whatever behaviour we want. In the case of our external calls, we use the DISPATCHER summary in order to restrict what the prover expects to be the result of these calls, which is otherwise unpredictable.

```js
function _.onERC721Received(address, address, uint256, bytes) external => DISPATCHER(true);
function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true);
```

**currentContract**

Additionally, we learnt that when we call a function in our methods block, it defaults to being called on the currentContract - the contract currently being verified.

```js
function getListing(address,uint256) external returns (INftMarketplace.Listing) envfree;
function getProceeds(address) external returns (uint256) envfree;
```

This above is functionally identical to:

```js
function currentContract.getListing(address,uint256) external returns (INftMarketplace.Listing) envfree;
function currentContract.getProceeds(address) external returns (uint256) envfree;
```

It's possible to abstract the contract on which a function is being called however by implementing a `wildcard entry`, such as we employed in our `_.onERC721Received` and `_.safeTransferFrom` functions. `_.` denotes a [**wildcard entry**](https://docs.certora.com/en/latest/docs/cvl/methods.html#wildcard-entries). In combination with our summary declarations, this allows us to configure particular functions to behave an expected way, regardless of the contract from which they are called.

### Ghost Variables

We learnt about Ghost Variables and how to initialize them. By setting an initial\_\_state and axiom, we assure the prover assigns a particular value as a starting point for these variables.

```js
ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}
```

These variables function like contract state variables, and as such if the prover fails to predict an outcome of a prove, they are liable to being HAVOC'd (randomized). We can assure these variables are **not** HAVOC'd by applying the `persistent` keyword to them.

```js
persistent ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}
```

HAVOCing is an integral part of Certora proofs. If the prover is able to find a path in which it's able to potentially do anything - it will. It accomplishes this by randomizing our storage variables. When this happens, our ghost variables will be set to anything Certora can find that will break our rule.

### Hooks

We also learnt that any time our protocol executes any number of opcodes, we can configure Certora hooks to perform custom actions when executed. We demonstrated this by hooking SSTORE and LOG4 opcodes and used them to increment our ghost variables to be compared!

```js
hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {
    listingUpdatesCount = listingUpdatesCount + 1;
}

hook LOG4(uint offset, uint length, bytes32 t1, bytes32 t2, bytes32 t3, bytes32 t4) uint v {
    log4Count = log4Count + 1;
}
```

### Rules and Invariants

We warmed up with a gorgeous, minimalistic invariant which we used to verify that every time storage was updated, an event would be emitted.

```js
invariant anytime_mapping_updated_emit_event()
    listingUpdatesCount <= log4Count;
```

Finally, we also build a badass `parametric rule` which, after confirming the starting states of our contracts match, goes on to call the same function on both implementations (this function is randomized, but checked to match). We're then asserting that the states following our function calls also match, **_PROVING MATHEMATICALLY_** that our Solidity and Assembly implementations execute with the same behaviour!

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f, method f2, address listingAddr, uint256 tokenId, address seller){
    env e;
    calldataarg args;

    // They start in the same state
    require(gasBadMarketplace.getProceeds(e, seller) == marketplace.getProceeds(e, seller));
    require(gasBadMarketplace.getListing(e, listingAddr, tokenId).price == marketplace.getListing(e, listingAddr, tokenId).price);
    require(gasBadMarketplace.getListing(e, listingAddr, tokenId).seller == marketplace.getListing(e, listingAddr, tokenId).seller);

    // It's the same function on each
    require(f.selector == f2.selector);
    gasBadMarketplace.f(e, args);
    marketplace.f2(e, args);

    // They end in the same state
    assert(gasBadMarketplace.getListing(e, listingAddr, tokenId).price == marketplace.getListing(e, listingAddr, tokenId).price);
    assert(gasBadMarketplace.getListing(e, listingAddr, tokenId).seller == marketplace.getListing(e, listingAddr, tokenId).seller);
    assert(gasBadMarketplace.getProceeds(e, seller) == marketplace.getProceeds(e, seller));
}
```

This kind of equivalence checking is _exactly_ how the community will make Web3's future sustainable and accessible from a gas perspective.

### Wrap Up

With that, we've come to the end of the Assembly, Formal Verification and EVM Opcodes course.

This course was pretty quick compared to some others we've hosted, but it wasn't easy. You tackled a lot of advanced concepts and masters some really low level implementations. You should be very proud.

> ❗ **PROTIP**
> Make sure you push your projects to your GitHub account. Your GitHub profile should serve as your billboard to advertise your accomplishments and it's one of the first places companies will look when hiring.

Now that you've gone through this whole thing, there are a number of things you _can_ and _should_ do.

1. [**CodeHawks**](https://www.codehawks.com/) - Full Stop. By now you have the experience and know what to expect when approaching complex code bases and you should absolutely dive into the challenge of live audits. Put your knowledge to the test. If you don't use it, you lose it. Keep an eye out for `Formal Verification` contests.
2. [**Dive into the Community**](https://discord.gg/cyfrin) - Join the Cyfrin discord and connect with like-minded students and auditors. The engaged community can help push you into your next steps.

And as a personal favour, if you're on social media, post about your accomplishments here. Ping us in your post, tweet at us, get loud about what you've overcome and make the world aware of how far you've made it.

Of course the course GitHub repo has a [**number of links**](https://github.com/Cyfrin/assembly-evm-opcodes-and-formal-verification-course?tab=readme-ov-file#where-do-i-go-now) to things you should consider doing next.

Thanks so much for joining me, and I'll see you in Web3!

🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮

🧮 Exercises:

1. Compete in a formal verification contest!

### Section 3 NFT

- [I can't stop you anymore (Arbitrum)](https://arbiscan.io/address/0x349364769030dAB260eF2771610C4860EE367202#code)
- [I can't stop you (Sepolia)](https://sepolia.etherscan.io/address/0x7D4a746Cb398e5aE19f6cBDC08473664ADBc6da5)

🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮

# Congratulations

🎊🎊🎊🎊🎊🎊🎊 Completed The Course! 🎊🎊🎊🎊🎊🎊🎊
