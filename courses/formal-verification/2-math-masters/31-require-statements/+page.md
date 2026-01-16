---
title: Require Statements
---

---

### Understanding Storage Invariants with Certora

When working with Certora to verify smart contracts, it's crucial to ensure that the storage does not undergo unexpected changes. In scenarios where storage should remain constant, Certora is employed to validate that these conditions are upheld throughout the execution of the contract.

#### Setting Preconditions in Certora

To effectively use Certora, it's important to set preconditions that mimic the initial state of storage variables, similar to how assumptions are made in Foundry using syntax like `vm.assume(x = y)`. In Certora, we leverage the `require` keyword to establish these preconditions, ensuring that storage variables maintain their designated values during the verification process.

#### Example of Implementing Preconditions

To illustrate, consider setting a precondition where a specific storage variable, such as a number in the contract, should equal ten. The syntax for this would be:

```js
require currentContract.number == 10;
```

Following this pattern, you can set similar preconditions for other storage variables:

- `require(currentContract.numbr == 7;)`
- `require(currentContract.numbor == 2;)`
- `require(currentContract.nambir == 10;)`

By specifying these conditions, you are instructing Certora to assume these are the starting values and to verify the contract under the assumption that these values do not change.

#### Rationale Behind Using Preconditions

The need for explicitly defining these preconditions arises particularly when external libraries or calls are involved, which might alter the state of the storage unpredictably. In such cases, without these preconditions, Certora might assume that storage can be modified freely, leading to incorrect verifications.

