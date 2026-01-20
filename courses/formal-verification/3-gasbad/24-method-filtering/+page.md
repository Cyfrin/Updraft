---
title: Method Filtering
---

_Follow along with this video:_

---

### Method Filtering

Before we get too deep into the logic of our rule, I do want to briefly cover method filtering and how it can be used. Our default parametric rule would look like:

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f){
    env e;
    calldataarg args;
    f(e, args);
}
```

Now, in this configuration, `method f` would represent any function within the scoped codebase which can be called with any calldata in any environment. We can assert a little more control over to which methods our parametric rule applies by implementing filters.

![method-filtering1](/formal-verification-3/23-method-filtering/method-filtering1.png)

This methodology should be similar to employing a require statement such as:

```js
require(f.selector == "0xt4aB0fe5f"); // made up selector
```

### Wrap Up

Now that you know about filters, we're not going to use them 😅.

In our situation we need to assure that both of our function selectors (for each the Solidity and Assembly implementation) match and unfortunately, the filters block, doesn't have access to method input parameters, making this direct comparison impossible for us.

Oh well, we'll use require!

In the next lesson I've one more quick keyword I want to cover. See you soon!
