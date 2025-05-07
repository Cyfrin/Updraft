# Smart Contract Libraries and Inheritance

## Introduction

After learning the basics of Solidity, you'll want to write more efficient code and avoid duplicating work. Two powerful features help with this: **libraries** and **inheritance**. These concepts allow you to reuse code and use external dependencies, making your contracts cleaner, more secure, and cheaper to deploy.

### When to Use Each

| Feature     | Best For                         | Key Benefit                        | Limitation                                  |
| ----------- | -------------------------------- | ---------------------------------- | ------------------------------------------- |
| Libraries   | Utility functions and operations | Deploy once, use in many contracts | Cannot store state variables                |
| Inheritance | Extending existing contracts     | Build on top of established code   | Can create complexity with multiple parents |

## Smart Contract Libraries

Libraries are reusable pieces of code that you can share across multiple contracts. Think of them as toolboxes containing helpful functions that your contracts can use.

### Creating a Simple Library

Here's a basic math library that any contract can use:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library MathUtils {
    // Find the smaller of two numbers
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    // Find the larger of two numbers
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
}
```

### Using Libraries in Your Contracts

There are two ways to use library functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MathUtils.sol"; // Import the library

contract Calculator {
    // Attach library functions to uint256
    using MathUtils for uint256;

    // Method 1: Call as a library function
    function getMinimum(uint256 a, uint256 b) public pure returns (uint256) {
        return MathUtils.min(a, b);
    }

    // Method 2: Call as an attached function
    function getMaximum(uint256 a, uint256 b) public pure returns (uint256) {
        return a.max(b); // Same as MathUtils.max(a, b)
    }
}
```

### Benefits of Libraries

- **Write Once, Use Everywhere**: Define code in one place and use it in multiple contracts
- **Gas Savings**: Libraries with `internal` functions get embedded in your contract's bytecode, while `external` library functions are deployed separately and can be reused by many contracts
- **No State Variables**: Libraries cannot have state variables, making them perfect for pure utility functions

### Types of Libraries

1. **Embedded Libraries**: Use `internal` functions that get copied into your contract's code
2. **Linked Libraries**: Use `external` and `public` functions. These functions don't get copied into your contract's bytecode - instead, your contract makes calls to the deployed library.

## Contract Inheritance

Inheritance lets one contract build upon another. Think of it like building with blocks—you start with a foundation and add more features.

### Basic Inheritance Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Base contract with core functionality
contract BaseToken {
    string public name;
    uint256 public totalSupply;

    constructor(string memory _name) {
        name = _name;
        totalSupply = 1000000;
    }

    function getInfo() public virtual view returns (string memory) {
        return string.concat("Token: ", name);
    }
}

// Enhanced contract that inherits and extends BaseToken
contract GoldToken is BaseToken {
    constructor() BaseToken("Gold Token") {}

    // Add new functionality
    function getSymbol() public pure returns (string memory) {
        return "GLD";
    }
}
```

In this example, `GoldToken` inherits all features from `BaseToken` and adds a new function.

## Function Overriding

Sometimes, you want to modify behavior from a parent contract. This is where function overriding comes in.

### Basic Function Overriding

To override a function:

1. Mark the parent function with `virtual` (meaning "can be changed")
2. Mark the child function with `override` (meaning "I'm changing this")

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BaseToken {
    // The virtual keyword allows this function to be overridden
    function getTokenName() public virtual pure returns (string memory) {
        return "BaseToken";
    }
}

contract CustomToken is BaseToken {
    // The override keyword shows we're replacing the parent's function
    function getTokenName() public override pure returns (string memory) {
        return "CustomToken";
    }
}
```

### Using `super` to Call Parent Functions

Sometimes, you want to extend a function rather than completely replace it:

```solidity
contract ExtendedToken is BaseToken {
    function getTokenName() public override pure returns (string memory) {
        // Call the parent function and add to it using the super keyword
        return string.concat(super.getTokenName(), " Plus");
        // Returns "BaseToken Plus"
    }
}
```

## Multiple Inheritance

Solidity allows a contract to inherit from multiple parents, but this requires careful handling.

### Simple Multiple Inheritance Example

```solidity
contract Mintable {
    function canMint() public virtual pure returns (bool) {
        return true;
    }
}

contract Burnable {
    function canBurn() public virtual pure returns (bool) {
        return true;
    }
}

// Inherit from both contracts
contract Token is Mintable, Burnable {
    // This contract now has both canMint() and canBurn() functions
}
```

### When Parent Contracts Have Functions with the Same Name

When multiple parents have functions with the same name, you must specify which ones you're overriding:

```solidity
contract BaseA {
    function getValue() public virtual pure returns (string memory) {
        return "A";
    }
}

contract BaseB {
    function getValue() public virtual pure returns (string memory) {
        return "B";
    }
}

// Multiple inheritance with function name conflict
contract Combined is BaseB, BaseA {
    // Must specify all contracts being overridden
    function getValue() public override(BaseB, BaseA) pure returns (string memory) {
        return "Combined";
    }
}
```

### Important Rule: Inheritance Order Matters

The order in which you list parent contracts is important:

```solidity
// BaseB comes first in the inheritance list
contract TokenX is BaseB, BaseA {
    function getValue() public override(BaseB, BaseA) pure returns (string memory) {
        // This calls BaseB's implementation first
        return super.getValue(); // Returns "B"
    }
}

// BaseA comes first in the inheritance list
contract TokenY is BaseA, BaseB {
    function getValue() public override(BaseA, BaseB) pure returns (string memory) {
        // This calls BaseA's implementation first
        return super.getValue(); // Returns "A"
    }
}
```

## Practical Applications

### Using OpenZeppelin Contracts

One of the most common uses of inheritance is extending standardized contracts from dependencies like [OpenZeppelin](https://www.openzeppelin.com/):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Create a custom token by inheriting from ERC20
contract MyToken is ERC20 {
    constructor() ERC20("My Token", "MTK") {
        // Mint 1 million tokens to the deployer
        _mint(msg.sender, 1000000 * 10**18);
    }

    // Add custom features
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
```

### Adding a Fee to Token Transfers

Inheritance lets you customize standard behavior:

```solidity
contract FeeToken is ERC20 {
    address public feeCollector;

    constructor(address _feeCollector) ERC20("Fee Token", "FEE") {
        feeCollector = _feeCollector;
        _mint(msg.sender, 1000000 * 10**18);
    }

    // Override the transfer function to add a 1% fee
    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 fee = amount / 100; // 1% fee
        uint256 netAmount = amount - fee;

        // Send fee to collector
        super.transfer(feeCollector, fee);

        // Send remaining amount to recipient
        return super.transfer(to, netAmount);
    }
}
```

## Tools to Help You Get Started

### OpenZeppelin Contracts Wizard

The [OpenZeppelin Contract Wizard](https://wizard.openzeppelin.com/) is a helpful tool that generates customized smart contracts with just a few clicks. It's perfect for:

- Creating token contracts (ERC20, ERC721, ERC1155)
- Adding security features
- Implementing access control
- Setting up governance

The wizard generates production-ready code that you can customize further.

### Importing External Code

You can import code from various sources:

```solidity
// Import from npm package
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Import specific contracts
import {ERC721, IERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import from local file
import "./MyContract.sol";
```

## Key Takeaways

- **Libraries** are great for utility functions and can be used across many contracts.
- **Inheritance** lets you build on existing contracts and extend their functionality
    - Use `virtual` in parent contracts and `override` in child contracts when overriding functions
    - The `super` keyword lets you call parent implementations
    - With multiple inheritance, the order of parent contracts matters
    - OpenZeppelin provides battle-tested contracts you can extend

## Best Practices

- **Keep it Simple**: Avoid deep inheritance chains that are hard to follow
- **Document Function Overrides**: Clearly comment what you're changing and why
- **Be Careful with Multiple Inheritance**: It can create unexpected behavior if not managed properly
- **Reuse Trusted Code**: Whenever possible, build on well-audited contracts like those from OpenZeppelin
