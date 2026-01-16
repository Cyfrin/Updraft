---
title: Using
---

_Follow along with this video:_

---

### Using

Now, we have something to keep in mind. Much like as was the case in our `methods block`, when we configure our `parametric rule` like so:

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f){
    env e;
    calldataarg args;
    f(e, args);
}
```

...we are calling `method f` on _whichever contract is currently being verified_. Remember that functionally `f(e, args) == currentContract.f(e, args)`. With that said, we need a way to reference the specific contracts we mean for our rule to compare, and this is where the `using` keyword comes in.

![using1](/formal-verification-3/24-using/using1.png)

By declaring these variables at the top of our spec file, we can use them to reference particular contracts within our verification scope.

```js
using GasBadNftMarketplace as gasBadMarketplace;
using NftMock as nft;
using NftMarketplace as marketplace;

...

rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f){
    env e;
    calldataarg args;
    gasBadNftMarketplace.f(e, args);
    nftMarketplace.f(e, args);
}
```

### Wrap Up

With some finer control over which files are being tested against each other, we're ready to finish fleshing out our rule, in the next lesson.

Almost done!
