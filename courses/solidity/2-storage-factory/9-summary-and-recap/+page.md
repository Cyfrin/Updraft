---
title: Summary and Recap
---

_You can follow along with the video course from here._

### Introduction

This section covered how to deploy contracts, how to import and interact with them, and using inheritance to customize their functionalities.

### Deploying and importing

We delved into the use of the **`new`** keyword to deploy multiple instances of a contract, allowing for the creation of numerous contract instances as needed.

Contracts can also be **imported**, which is equivalent to copying the code into the file but with the advantage of enhanced code reusability and modularity. It's good practice to use _named imports_, selecting only the contracts we intend to use from the file.

```solidity
import { Contract as MyContract } from './myOtherContract.sol';
```

### Contracts interaction

Solidity lets you interact with other contracts. To do so we need the contract's address and its ABI (Application Binary Interface):

```solidity
contract AddFiveStorage is SimpleStorage {}
```

### Inheritance and overriding

A contract can also derive functions from other contracts through **inheritance**. This can be obtained through the `is` keyword.
To explicitly override a function from the parent contract, the `override` keyword is used in the child method. The parent's function must be marked as `virtual` to allow this interaction.

```solidity
//child contract
import './ParentContract.sol';
contract ChildContract is ParentContract {
    function store(uint256 _num) public override {}
}
```

```solidity
//parent contract
function store(uint256 _num) public virtual {
    // function body
}
```

### Conclusion

In this section, we explored deploying multiple contract instances using the `new` keyword and enhancing code reusability through contract _imports_. We also covered interacting with other contracts using their address and ABI. Additionally, we learned about inheritance and function overriding, allowing derived contracts to customize inherited functionalities.
💡 **TIP**:br
When you finish a section, take a moment to acknowledge your progress, celebrate it and share your achievements with your community.

### 🧑‍💻 Test yourself

🏆 Attempt to answer all the theoretical questions from lesson 1 through 7, and then go back again to complete all the coding tasks.
