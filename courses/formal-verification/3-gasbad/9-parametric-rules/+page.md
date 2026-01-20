---
title: Parametric Rules
---

_Follow along with this video:_

---

### Parametric Rules

In this lesson we'll go through a `parametric` formal verification example. You can read more about Parametric rules [**here in the Certora docs**](https://docs.certora.com/en/latest/docs/user-guide/parametric.html), but in brief they're rules which take ambiguous methods as parameters and differ from invariants in two key ways:

1. Invariants are also testing after the constructor
2. Invariants are used to assert properties of the storage (between function calls), while parametric rules are used to assert properties of _changes_ in the storage (caused by function calls).

Ultimately, any rule which contains an arbitrary method can be considered a `parametric rule`. What this allows us to do is configure a rule which calls any random method in our scene, we can further abstract this and pass the method random calldata and environment variables. A minimalistic example of this would look something like:

```js
rule sanity {
    method f;
    env e;
    calldataarg arg;
    f(e, arg);
    satisfy true;
}
```

So, let's set up a simple example that applies to our NftMock. This example will be a little silly, as we expect it to fail, but it should demonstrate the concept clearly enough.

```js
rule no_change_to_total_supply(method f) {
    uint256 totalSupplyBefore = totalSupply();

    env e;
    calldataarg arg;
    f(e, arg);

    assert totalSupply() == totalSupplyBefore, "Total supply should not change!"
}

```

> ❗ **NOTE**
> Passing a variable as an input parameter is almost identical to defining it within the rule body.

What's cool about this set up is that it nearly functions like our `stateful fuzz testing`. `Certora` is going to `HAVOC` the storage variables (replace them with random values), and simulate the contract in different states. At each step it calls a method, our rule is going to assure that the `totalSupply` variable never changes.

Again, we expect this to fail, since the contract contains a mint function, but we can run this to see how it performs.

```bash
certoraRun ./certora/conf/NftMock.conf
```

![parametric-rules1](/formal-verification-3/8-parametric-rules/parametric-rules1.png)

As expected, we can see this fails, but by taking a closer look we can ascertain why and better understand the conclusion the prover came to. Intuitively we know that the `totalSupply` of `NftMock` is going to increase with `mint` function calls, but perhaps less intuitively the prover has pointed out that callback functions through `onERC721Received` can recursively call the `mint` function _also_ calling this assertion to fail!

### Wrap Up

Clearly `parametric rules` can be a powerful tool in an auditor's belt when performing formal verification with `Certora`. We've covered a few concepts in our little trial run through `NftMock` verification, so let's recap in the next lesson.

See you there!
