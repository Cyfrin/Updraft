---
title: envfree & environment function input
---

---


#### Scenario Analysis: Removal of `envfree`
Initially, we explore what occurs when `hellFunc` is not marked with the `envfree` keyword. This scenario helps demonstrate the mandatory inclusion of an environment variable in the function call. Without the `envfree` attribute, any function in Certora, such as `hellFunc`, requires the environment (`env`) to be explicitly passed as the first parameter. This environment encompasses various system and transaction properties like message sender, block number, and message value.

#### Code Implementation and Error Handling
When you attempt to invoke `hellFunc` without specifying the environment, Certora responds with an error indicating the absence of the necessary environment parameter. To rectify this, you need to include `env e` as the first parameter in your function call, as demonstrated:

```js
env e;

```

Here, `env` is a special type in Certora that represents the transaction's context, necessary for functions that are not environment-independent.

#### Practical Example and Results
The session proceeds with a practical example where, after removing the `envfree` and adding the necessary environment checks, the function `hellFunc` is called again. This time, the aim is to confirm that it behaves as expected under these new constraints, specifically checking that it does not process any message value.

The results from Certora show that with the `env` included and the appropriate checks in place, `hellFunc` successfully handles the scenario where the message value is zero, validating the robustness of the function under these modified conditions.

