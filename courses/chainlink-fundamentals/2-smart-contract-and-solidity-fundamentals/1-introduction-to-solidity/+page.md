# Solidity Programming: A Guide for Blockchain Enthusiasts

You've learned about blockchain, smart contracts, and how Solidity fits into the Ethereum ecosystem through the Cyfrin Blockchain Basics course. Now, let's focus on the programming aspects of Solidity to help you write your own smart contracts, even if you're new to programming.

## What is Solidity

[Solidity](https://soliditylang.org/?color=light) is a high-level, object-oriented programming language for writing smart contracts. It is a curly-bracket language similar to C++, Python, and JavaScript. Solidity is specifically built to run on the Ethereum Virtual Machine (EVM), making it the primary language for developing decentralized applications (dApps) and blockchain-based protocols.

Solidity provides features such as:

- **Static typing** – Variable types are determined at compile time.
- **Inheritance** – Contracts can inherit properties and methods from other contracts.
- **Complex user-defined types** – Structs, mappings, and enums allow for custom data structures.
- **Library support** – Enables reusable, modular code.
- **Low-level EVM access** – Developers can use inline assembly (assembly) for optimized performance.

### Key Features of Solidity

Solidity is designed specifically for EVM-based blockchains and offers several powerful features:

- **Static typing**: Variable types must be defined in advance and are checked at compile time, reducing errors.
- **Inheritance**: Contracts can inherit from other contracts, promoting code reuse and modularity.
- **User-defined types**: You can create custom data structures using structs, mappings, and enums. More on this shortly!
- **Library support**: Reusable code modules can be imported to extend functionality.
- **Smart contract interaction**: Contracts can easily communicate with other contracts on the blockchain.
- **Low-level EVM access**: Advanced developers can use inline assembly for optimized performance.

Let's go into how to write smart contracts with Solidity a little deeper.

## Solidity Code Structure

Every Solidity smart contract follows a consistent structure:

### License Identifier

First, specify how others can use your code with an SPDX license identifier:

```solidity
// SPDX-License-Identifier: MIT
```

### Version Pragma

Next, declare which version of Solidity your code is compatible with using that `pragma` directive:

```solidity
pragma solidity ^0.8.19;
```

This tells the compiler which version to use. The `^` symbol means "this version or any compatible newer version up to but not including the next major version." You can also specify exact versions:

```solidity
pragma solidity 0.8.19; // Only use version 0.8.19
```

Or a range:

```solidity
pragma solidity >=0.8.19 <0.9.0; // Any version from 0.8.19 up to but not including 0.9.0
```

### Contract Declaration

The main code is contained within a contract declaration:

```solidity
contract MyContract {
    // Contract code goes here
}
```

Think of a contract as a blueprint. It defines what the contract knows (state) and what it can do (functions).

## Programming Fundamentals for Solidity

### Variables: Storing Information

Variables are named containers that hold data values. In Solidity, each variable must have a specific type that defines what kind of data it can store, and its location (storage, memory, or calldata) determines where the data is stored.

#### State Variables

These are permanently stored on the blockchain in storage:

```solidity
contract StorageExample {
    uint256 public myNumber = 42;    // A number
    string public myText = "Hello";  // Text
    bool public isActive = true;     // A true/false value
    address public owner;            // An Ethereum address
    uint256 private secretNumber;    // A private number
}
```

When you see a variable defined at the contract level like this, it's a state variable that will be stored on the blockchain permanently. Sometimes, for clarity, we label variables as stored in storage using the `s_` prefix e.g. `s_balance` or `s_owner`.

#### State Variable Visibility

State variables can have different visibility levels:

- **public**: Anyone can read this variable, and Solidity automatically creates a getter function.

  ```solidity
  uint256 public counter = 0; // Creates a counter() function that returns the value
  ```

- **private**: Only accessible within the current contract (not truly private on the blockchain since they can be accessed via the contract storage).

  ```solidity
  uint256 private password = 123456; // Not accessible from other contracts
  ```

- **internal**: Accessible within the current contract and contracts that inherit from it
  
  ```solidity
  uint256 internal sharedSecret = 42; // Visible to this contract and child contracts
  ```

The default visibility is `internal` if not specified.

#### Constant and Immutable variables

Solidity provides two special types of state variables that can significantly reduce gas costs and improve security:

- **Constant Variables**: Variables marked as `constant` must be assigned a value at declaration and cannot be changed afterwards:
```solidity
contract TokenContract {
    // Must be assigned at declaration
    uint256 public constant DECIMAL_PLACES = 18;
    string public constant TOKEN_NAME = "My Token";
    address public constant DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD;
}
```

Key characteristics of `constant` variables:
- Must be assigned a value when declared.
- Value is set at compile time.
- Cannot be changed after contract deployment.
- Do not take up storage slots (saving gas).
- Only value types and strings can be constants.
- Usually, `constant` variables are capitalized.

- **Immutable Variables**: Variables marked as immutable can be assigned only once, but this assignment can happen in the constructor:

```solidity 
contract TokenContract {
    // Declared but not assigned yet
    address public immutable deployer;
    uint256 public immutable deploymentTime;
    
    constructor() {
        // Assigned once in the constructor
        deployer = msg.sender;
        deploymentTime = block.timestamp;
    }
}
```

Key characteristics of `immutable` variables:

- Can be assigned in the constructor or at declaration
- Cannot be changed after construction
- More gas efficient than regular state variables
- Less gas efficient than constants
- Only _value types_ can be immutable (not strings or reference types)

When to Use Each

- Use `constant` for values known at compile time (e.g., mathematical constants, configuration values)
- Use `immutable` for values that depend on deployment conditions but won't change after that (e.g., deployer address, configuration based on constructor arguments)
- Use regular state variables for values that need to change during the contract's lifetime

Use `constant` and `immutable` whenever possible to:

- Reduces gas costs
- Makes contract intentions clearer
- Improves security by preventing accidental state changes

### Data Types: Different Kinds of Information

Solidity has **two** main categories of data types: value types and reference types. Understanding this distinction is important for how data is stored and managed in your contracts.

#### Value Types

Value types store their data directly. When you assign a value type to another variable, you get a copy of the value.

The following example shows what a variable being a value type means:

```solidity
// Let's say we create a variable with a value:
uint a = 5;

// When we assign it to another variable:
uint b = a;

// Now b has its own copy of the value 5

// If we change b:
b = 10;

// The value of a still remains 5
// The value of b is now 10
```

This happens because value types (like integers, booleans, addresses, etc.) store their actual data directly in the variable. Each variable has its own separate copy of the data.
This differs from how some other types (called reference types) work, where instead of getting a new copy, you might just get directions pointing to the original data (like when someone gives you an address to a house rather than building you a new identical house). We will go through this shortly.

**The Solidity value types include:**

- **uint (Unsigned Integer)**: Positive whole numbers (no decimals, no negatives)

  ```solidity
  uint256 public score = 100;
  ```

- **int (Signed Integer)**: Whole numbers that can be negative (no decimals)

  ```solidity
  int256 public temperature = -5;
  ```
  
  The number after uint/int (like 256) represents how many bits are used to store the number. More bits mean larger possible values. The maximum value of e.g. a `uint256` is `2^256-1` and a `int256` `2^255-1` since it has to be able to store the sign too.

- **bool (Boolean)**: `true` or `false` values

  ```solidity
  bool public isComplete = false;
  ```

- **address**: An Ethereum account (wallet) address

  ```solidity
  address public contractCreator = 0x123...;
  ```

- **bytes (Fixed Size)**: Fixed-size byte arrays (bytes1 to bytes32)

  ```solidity
  bytes32 public dataHash = 0xabcd...;
  ```

#### Reference Types

Reference types, unlike value types don't store their data directly in the variable but instead store a **"pointer"** or reference to where the data is located. When you assign a reference type to another variable, both variables point to the same data. We will be going through **pointers** and what they are shortly.

Think of reference types like having a TV remote control. The remote doesn't contain the actual TV shows, but it points to the TV where you can watch them.

**The Solidity reference types include:**

- **string**: Text values (dynamic length bytes)

  ```solidity
  string public message = "Welcome!";
  ```

- **arrays**: Ordered lists of items of the same type

  ```solidity
  uint256[] public scores = [85, 90, 95];
  ```

- **mapping**: Key-value pairs (like a dictionary or lookup table)

  ```solidity
  mapping(address => uint256) public balances;
  ```

  This creates a relationship where each address has an associated uint256 value.

- **struct**: Custom groupings of related data.

  ```solidity
  struct Person {
      string name;
      uint256 age;
      address walletAddress;
  }
  ```
  
- **bytes (Dynamic Size)**: Variable length byte array

  ```solidity
  bytes public dynamicData;
  ```

### Understanding Pointers and Data Location

When working with complex data types like arrays and structs in Solidity, it's important to understand the concept of pointers and how data is stored and referenced.

#### What are Pointers?

A **pointer** is a variable that stores the memory address/location for another piece of data rather than the data itself. Think of it as a signpost pointing to where the actual data lives rather than directly containing it.

In Solidity, reference types (arrays, structs, strings, and mappings) are stored as pointers. When you pass these types around, Solidity doesn't copy all the data; it just references where the data is stored.

This differs from value types (like `uint,` `int,` and `bool`), which directly store their data and create copies when assigned to new variables.

#### Pointer Example

To explain, the concept of a pointer, here is a pseudocode example:

```solidity
// Conceptual example in Solidity-like pseudocode

// Declare and initialize an array in storage (blockchain permanent memory)
array storageArray = [1, 2, 3]; // original array in storage

// Create a pointer to the storage array
// This doesn't copy the data, it just creates a reference to the same storage location
array storagePointer = storageArray; // points to the same data

// Modify the array through the pointer
storagePointer[0] = 100; // changes the actual storage array

// At this point:
// storageArray is [100, 2, 3]  (it was changed!)

// Create a memory copy of the storage array
// This copies the entire array to a new location in temporary memory
array memoryCopy = copy of storageArray; // memoryCopy is [100, 2, 3]

// Modify the memory copy
memoryCopy[1] = 200; // only changes the copy, not the original

// Final result:
// storageArray is [100, 2, 3]  (unchanged by memory modifications)
// memoryCopy is [100, 200, 3]  (modified locally)
```

Here's an example showing how pointers work with reference types:

```solidity
contract PointerExample {
    // State array in storage
    uint256[] public storageArray = [1, 2, 3];
    
    function manipulateArray() public {
        // This creates a pointer to the storage array
        uint256[] storage storageArrayPointer = storageArray;
        
        // This modifies the actual storage array through the pointer
        storageArrayPointer[0] = 100;
        
        // At this point, storageArray is now [100, 2, 3]
        
        // This creates a copy in memory, not a pointer to storage
        uint256[] memory memoryArray = storageArray;
        
        // This modifies only the memory copy, not the storage array
        memoryArray[1] = 200;
        
        // At this point, storageArray is still [100, 2, 3]
        // and memoryArray is [100, 200, 3]
    }
}
```

#### Storage Locations

Understanding how Solidity handles data storage is especially important when working with reference types. These keywords specify where data is stored:

- **storage**: Permanent storage on the blockchain (expensive)
  - Used for state variables.
  - Data persists between function calls and transactions.
  - Most expensive in terms of gas costs.

- **memory**: Temporary storage during function execution (cheaper)
  - Only exists during function execution.
  - Cheaper than storage.
  - Used for function parameters, return values, and local variables.

- **calldata**: Read-only temporary storage for function parameters (most efficient)
  - Similar to memory but read-only.
  - Can't be modified.
  - Most gas-efficient.
  - Used primarily for external function parameters.

Example:

```solidity
// State variable - stored in storage
uint256[] permanentArray;

function processArray(uint256[] calldata inputValues) external {
    // 'inputValues' exists in calldata - can't be modified
    
    // Local variable in memory - temporary copy
    uint256[] memory tempArray = new uint256[](inputValues.length);
    for (uint i = 0; i < inputValues.length; i++) {
        tempArray[i] = inputValues[i] * 2;
    }
    
    // Reference to storage - changes will persist
    uint256[] storage myStorageArray = permanentArray;
    myStorageArray.push(tempArray[0]); // This updates the blockchain state
}
```

When working with reference types like strings, arrays, and structs:
- Use `calldata` for external function parameters when possible (most efficient).
- Use `memory` for function parameters that need to be updated.
- Use `storage` when you need to modify state variables.

### Functions: Making Things Happen

Functions are blocks of code that perform specific actions. They're how your contract actually does things:

```solidity
contract Counter {
    uint256 public count = 0;
    
    // This function increases the count by 1
    function increment() public {
        count = count + 1;  // You can also write: count += 1;
    }
    
    // This function decreases the count by 1
    function decrement() public {
        count = count - 1;  // You can also write: count -= 1;
    }
}
```

#### Function Parts

A function has several components:

- **Name**: What you call the function (like `increment`).
- **Parameters**: Input values the function needs (none in the example above).
- **Visibility**: Who can call this function (`public` in the example). More on this coming shortly!
- **Returns**: What output the function provides (none in the example).
- **Function Body**: The code inside the curly braces `{}`.

Here's a more complex example with all these parts together:

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

This function:
- Is named `add`.
- Takes two parameters: `a` and `b`, both of type `uint256`.
- Is `public` so anyone can call it.
- Is `pure` which means it doesn't read or modify state.
- Returns a `uint256` value.
- Adds the two input values and returns the result.

#### Function Visibility

Functions can have different accessibility levels:

- **public**: Anyone can call this function
- **private**: Only this contract can call this function
- **internal**: Only this contract and contracts that inherit from it can call this function
- **external**: Only calls from outside the contract are allowed (more efficient for certain use cases)

#### Special Function Types

- **view**: Can read but not modify state

  ```solidity
  function getCount() public view returns (uint256) {
      return count;
  }
  ```

- **pure**: Cannot read or modify state

  ```solidity
  function addNumbers(uint256 a, uint256 b) public pure returns (uint256) {
      return a + b;
  }
  ```

- **constructor**: Runs only once when the contract is deployed

  ```solidity
  constructor() {
      owner = msg.sender;  // Sets the contract creator as the owner
  }
  ```

- **payable**: means that the function can be sent ether.

    ```solidity
    mapping(address => uint256) balances;

    function sendMeMoney() public payable {
        balances[user] += msg.value; // more on this "msg.value" coming in a second!
    }
    ```

### Transaction Context and Global Variables

Solidity provides access to transaction information and blockchain data through special built-in variables. These are crucial for building secure and functional smart contracts.

#### Transaction Context Variables

- **`msg.sender`**: The address that called the current function:
    - A wallet address or another contract
    - Commonly used for access control and tracking user activity

    ```solidity
    contract OwnerExample {
        address public owner;
        
        constructor() {
            owner = msg.sender; // The address that deploys the contract becomes the owner
        }
    }
    ```

- **`msg.value`**: The amount of ETH (in wei) sent with the function call:
    - Only available if the function is marked as `payable`
    - Used to receive payments or deposits

    ```solidity
    contract PaymentExample {
        mapping(address => uint256) public payments;
        
        // Function that can receive ETH
        function makePayment() public payable {
            require(msg.value > 0, "Must send some ETH");
            payments[msg.sender] += msg.value;
        }
        
        // Function that checks if minimum payment was made
        function verifyMinimumPayment(uint256 minimumAmount) public view returns (bool) {
            return payments[msg.sender] >= minimumAmount;
        }
    }
    ```

- **`msg.data`**: The complete calldata (input data) of the transaction:
    - Contains the function signature and arguments
    - Used in advanced use cases and proxies

    ```solidity
    contract DataExample {
        bytes public lastCallData;
        
        // Store the raw calldata of the latest transaction
        function recordCallData() public {
            lastCallData = msg.data;
        }
        
        // View the size of the calldata
        function getCallDataSize() public view returns (uint256) {
            return lastCallData.length;
        }
    }
    ```

#### Block Information Variables

- **`block.timestamp`**: The current block's timestamp (seconds since Unix epoch):
    - Can be used for time-based logic
    - Don't rely on it for precise timing (miners have some flexibility)

    ```solidity
    contract TimestampExample {
        uint256 public contractCreationTime;
        
        constructor() {
            contractCreationTime = block.timestamp;
        }
        
        // Check if a specified duration has passed since contract creation
        function hasDurationPassed(uint256 durationInSeconds) public view returns (bool) {
            return (block.timestamp >= contractCreationTime + durationInSeconds);
        }
        
        // Create a simple time lock that releases after a specified date
        function isTimeLockExpired(uint256 releaseTime) public view returns (bool) {
            return block.timestamp >= releaseTime;
        }
    }
    ```

- **`block.number`**: The current block number:
    - Useful for counting blocks or implementing block-based logic

    ```solidity
    contract BlockNumberExample {
        uint256 public deploymentBlockNumber;
        
        constructor() {
            deploymentBlockNumber = block.number;
        }
        
        // Calculate how many blocks have been mined since deployment
        function getBlocksPassed() public view returns (uint256) {
            return block.number - deploymentBlockNumber;
        }
        
        // Check if enough blocks have passed for a specific action
        function hasReachedBlockThreshold(uint256 blockThreshold) public view returns (bool) {
            return getBlocksPassed() >= blockThreshold;
        }
    }
    ```

#### Combining Context Variables in a Contract

Here's how these variables might work together in a realistic scenario:

```solidity
contract TimeLockedWallet {
    address public owner;
    uint256 public unlockTime;
    
    event Deposit(address indexed sender, uint256 amount, uint256 timestamp);
    event Withdrawal(uint256 amount, uint256 timestamp);
    
    constructor(uint256 _unlockDuration) {
        owner = msg.sender;
        unlockTime = block.timestamp + _unlockDuration;
    }
    
    // Accept deposits from anyone
    function deposit() public payable {
        require(msg.value > 0, "Must deposit some ETH");
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    // Only allow the owner to withdraw after the unlock time
    function withdraw() public {
        require(msg.sender == owner, "You are not the owner");
        require(block.timestamp >= unlockTime, "Funds are still locked");
        require(address(this).balance > 0, "No funds to withdraw");
        
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        
        emit Withdrawal(balance, block.timestamp);
    }
    
    // Check if withdrawal is possible yet
    function withdrawalStatus() public view returns (bool canWithdraw, uint256 remainingTime) {
        if (block.timestamp >= unlockTime) {
            return (true, 0);
        } else {
            return (false, unlockTime - block.timestamp);
        }
    }
}
```

These global variables are critical for many smart contract operations, especially for:
- Authentication (who is calling the function?)
- Value transfer (how much ETH was sent?)
- Time-based conditions (when did something happen?)
- Block-based logic (how many blocks have passed?)

### Control Structures: Making Decisions

- **Conditionals (if/else)**: Conditionals let your code make decisions:

    ```solidity
    function checkValue(uint256 value) public pure returns (string memory) {
        if (value > 100) {
            return "Value is greater than 100";
        } else if (value == 100) {
            return "Value is exactly 100";
        } else {
            return "Value is less than 100";
        }
    }
    ```

- **Loops**: Loops repeat code until a condition is met:

    ```solidity
    function sumArray(uint256[] memory numbers) public pure returns (uint256) {
        uint256 total = 0;
        
        for (uint i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
        
        return total;
    }
    ```

**Note**: Be careful with loops in Solidity because each operation costs gas, and loops with too many iterations can exceed block gas limits. This is known as a denial of service (DoS).

### Error Handling and Requirements

#### Require Statements

`require` checks a condition and reverts the transaction if it fails:

```solidity
function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}
```

The second parameter is an error message that helps users understand what went wrong.

#### Custom Errors

For gas efficiency, you can define custom errors. This is what you should do fpr errors, rather than using the `require` keyword:

```solidity
error InsufficientBalance(address user, uint256 balance, uint256 withdrawAmount);

function withdraw(uint256 amount) public {
    if (balances[msg.sender] < amount) {
        revert InsufficientBalance(msg.sender, balances[msg.sender], amount);
    }
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}
```

### Events: Communicating with the Outside World

Events in Solidity are like announcements that your contract makes when something important happens. Events should be emitted when the contract state is updated:

```solidity
contract Token {
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    mapping(address => uint256) public balances;
    
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
    }
}
```

The `indexed` keyword makes it easier to search for specific events later.

### Modifiers: Reusable Function Conditions

Modifiers are a way to create reusable logic for your functions:

```solidity
contract Owned {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _; // This placeholder is replaced with the function code
    }
    
    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
```

The `_` in the modifier represents where the function code will be executed. For example, if the `_` is before the modifier logic, the function will be executed before the modifier logic. 

### Interfaces

Interfaces in Solidity act as blueprints that define what functions a contract must implement without specifying how those functions work. Interfaces cannot contain function implementations, state variables, constructors, or inheritance from other contracts. They can only declare function signatures (name and input). When a contract implements an interface using the "is" keyword, it must include all the functions defined in that interface with matching signatures.

For example, imagine we have an interface called `IPayable`:

```solidity
interface IPayable {
    function pay(address recipient, uint256 amount) external returns (bool);
    function getBalance(address account) external view returns (uint256);
}
```

Any contract that implements this interface must include these exact functions:

```solidity
contract PaymentProcessor is IPayable {
    mapping(address => uint256) private balances;
    
    function pay(address recipient, uint256 amount) external override returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }
    
    function getBalance(address account) external view override returns (uint256) {
        return balances[account];
    }
}
```

This standardization makes interfaces particularly useful for interacting with unknown contracts—you only need to know what functions you can call, not how they're implemented, enabling different contracts to communicate consistently and predictably. It tells calling contracts what functions are available on another contract and how to call those functions. 

## Programming Best Practices for Solidity

1. **Keep it Simple**: Complex code is harder to secure
2. **Check conditions before changing state**: Validate all inputs with `require` or custom errors
3. **Use descriptive variable and function names**: Make your code easy to understand
4. **Comment your code**: Explain why you're doing something, not just what
5. **Follow naming conventions**:
   - Contracts: `PascalCase` (like `SimpleToken`)
   - Functions/variables: `camelCase` (like `balanceOf`)
   - Private/internal state variables: prefix with `_` (like `_owner`)
6. **Be aware of gas costs**: Every operation costs money in the form of gas

## What Is ABI (Application Binary Interface)?

The ABI is like a smart contract's instruction manual that tells applications exactly how to talk to your contract on the blockchain.

It describes, using structured data,  exactly what functions and data types are available for use in the contract and how to “call” or use them. 

### Why do we need ABIs?

Imagine you have a smart contract deployed on Ethereum. Your contract might have functions like `transfer`, `approve`, or `getBalance`. But how does a website or another application know:
- What functions exist in your contract?
- What parameters each function needs?
- What data types to expect in return?

This is where the ABI comes in! It bridges the gap between your human-readable smart contract code and the binary data that the blockchain understands.

### Purpose of the ABI

The ABI serves as a standardized way to:
- Call functions in a smart contract
- Encode function arguments
- Decode return data
- Interact with contracts from outside the blockchain (like through web applications)

Think of the ABI as a contract's "API documentation" but in a machine-readable format.

### ABI Format

The ABI is a JSON array that describes everything publicly visible on a contract.

Let's take a simple example. Take a simple smart contract `Simple Math` that has one function `add` that adds two numbers together:

```solidity
// Solidity smart contract snippet
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleMath {
    // Adds two numbers and returns the result
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}
```

When you **compile** this contract, you will get the following ABI in JSON format:

```json
[
  {
    "inputs": [
      { "internalType": "uint256", "name": "a", "type": "uint256" },
      { "internalType": "uint256", "name": "b", "type": "uint256" }
    ],
    "name": "add",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
]
```

The ABI tells you that there is a function named `add` which takes two numbers (of type `uint256`) and returns a number.

### Using ABI in Practice

When you deploy a contract, you'll need its ABI to interact with it later. 

Frontend applications use the ABI to format calls to your contract correctly. The following JavaScript example demonstrates how you would use the ABI to interact with a smart contract (using the ethers.js library):

```javascript
// JavaScript example using ethers.js
const contract = new ethers.Contract(contractAddress, contractABI, provider); // You need to pass the ABI!
await contract.deposit(100); // Calls the deposit function
```

## Next Steps in Your Solidity Journey

1. **Practice with simple contracts**: Start by modifying existing examples
2. **Use Remix IDE**: https://remix.ethereum.org is a browser-based development environment
3. **Read other contracts**: Learning from existing code is invaluable
4. **Explore OpenZeppelin**: Study their well-written, secure contracts
5. **Learn about gas optimization**: Understanding the cost of operations is essential
6. **Take it step by step**: Don't try to build complex applications right away

Remember that programming is a skill that develops with practice. Start with small projects and gradually work your way up to more complex solutions.
