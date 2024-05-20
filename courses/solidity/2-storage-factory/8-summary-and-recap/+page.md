---
title: Summary and Recap
---
_You can follow along with the video course from here._

<a name="top"></a>
### Introduction
This is a recap of the section Storage Factory. 

### Deploying
In this section, we learned how to use the `new` keyword to deploy multiple instances of a contract.

### Importing other contracts
Contracts can be imported. This is equivalent to copying the code into the file but with the advantage of enhanced code reusability and modularity. It's good practice to use named imports, selecting only the contracts we intend to use from the file
```solidity
import { Contract as MyContract } from './myOtherContract.sol';
```
### Contracts interaction
Solidity lets you interact with other contracts. To do so we need the contract's address and its ABI (Application Binary Interface):

```solidity
contract AddFiveStorage is SimpleStorage {}
```
### Inheritance and overriding
A contract can also acquire functions from other contracts through **inheritance**. This can be obtained through the `is` keyword.
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
In this section, you've learned how a contract can deploy and interact with other contracts, and how to use code modularity with imports and inheritance.

💡 **TIP** <br>
When you finish a lesson or a section, take a moment to acknowledge your progress, celebrate it and share your achievements with your community.

### 🧑‍💻 Test yourself
1. 📕 
2. 🧑‍💻 

[Back to top](#top)