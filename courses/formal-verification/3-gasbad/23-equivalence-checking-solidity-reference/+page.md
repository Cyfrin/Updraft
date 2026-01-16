---
title: Equivalence Checking - Solidity Reference
---

_Follow along with this video:_

---

### Equivalence Checking - Solidity Reference

Let's dive right into our final rule:

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(){}
```

> ❗ **IMPORTANT**
> Verbosity.

Our whole reason for using `Certora`, and formally verifying this repo is - we've got a reference contract, written in Solidity, we want to be 100% certain that our Assembly conversion is still behaving exactly the same way.

This is going to be an example of a `Parametric Rule`, which we learnt about previously.

![equivalence-checking-solidity-reference1](/formal-verification-3/22-equivalence-checking-solidity-reference/equivalence-checking-solidity-reference1.png)

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f){}
```

> ❗ **NOTE**
> Adding the rule parameters within the declaration brackets, or within the rule body will function the same way. The only exception is when applying `filters`, which we'll cover later.

We need to consider what our goals are for this verification. Our methodology will be something like:

1. Call the same function on both `NftMarketplace.sol` and `GasBadNftMarketplace.sol`
2. Compare the getter function results of both contracts to verify they are the same.

The two getter functions we have in our `GasBadNftMarketplace` contract are `getListing` and `getProceeds`. So, our goal will be to assure these functions return the same results between our Solidity and Assembly implementations. We'll accomplish that by passing a method to our rule, calling it on both contracts, and then verifying the getter results of both contracts.

### Wrap Up

Shouldn't be too tough with all the skills we've learnt til now. In the next lesson we'll investigate `method filtering`, as alluded to above.

See you there!
