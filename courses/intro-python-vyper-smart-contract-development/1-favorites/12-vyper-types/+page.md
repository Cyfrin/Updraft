## Understanding Basic Data Types in Vyper (v0.4.0)

Welcome to this lesson on the fundamental data types in Vyper, the Pythonic smart contract language for the Ethereum Virtual Machine (EVM). Understanding types is crucial because they define the kind of data your smart contract variables can hold and how that data behaves. We'll be exploring these concepts within the context of Vyper version 0.4.0, using examples relevant to building a simple "favorite things list" contract.

### Why Do We Need Types?

Smart contracts store and manipulate various kinds of information on the blockchain – think numbers, true/false states, account addresses, and more. Vyper, like many programming languages, requires you to be explicit about the *type* of data each variable will store. This ensures that operations are performed correctly and helps prevent errors by defining what kind of values are allowed.

### Static Typing in Vyper

Vyper is a **statically typed** language. This means that the data type of every variable must be known by the compiler *before* the code is executed (at compile-time). You declare the type when you declare the variable, and it generally cannot change. This contrasts with dynamically typed languages where types are checked during execution. Static typing helps catch errors early in the development process.

### Declaring Variables

The basic syntax for declaring a variable in Vyper is straightforward:

```vyper
variable_name: type
```

You specify the name you want to give the variable, followed by a colon (`:`), and then the keyword representing the data type.

### Value Types

The types we'll focus on in this lesson are primarily **value types**. These are fundamental data types where variables directly contain their data. When you pass a value type to a function or assign it to another variable, a copy of the value is made.

### Storage Variables and Initialization (Vyper v0.4.0 Rule)

Variables declared at the top level of a contract file (outside of any function) are called **storage variables**. Their values are stored persistently on the blockchain as part of the contract's state.

A critical point for Vyper version **0.4.0** (the version used in these examples) is that **storage variables cannot be initialized with a value directly on the line where they are declared**. Attempting to do so (e.g., `my_var: uint256 = 10`) will result in a `VariableDeclarationException` during compilation. Storage variables automatically receive a default "zero" value based on their type (e.g., `0` for numeric types, `False` for `bool`, the zero address for `address`). Values must be assigned later, typically within functions (like a constructor or other state-changing functions, which will be covered elsewhere).

### Common Basic Vyper Types

Let's explore some of the most common basic types you'll use in Vyper development:

**1. Boolean (`bool`)**

*   **Concept:** Represents a logical state, either true or false.
*   **Keyword:** `bool`
*   **Possible Values:** `True` or `False` (Note: These are case-sensitive).
*   **Declaration Example:**
    ```vyper
    # Stores whether the user has specified a favorite number
    has_favorite_number: bool
    ```
    *(Remember: `has_favorite_number: bool = False` would cause an error in Vyper 0.4.0 for storage variables).*

**2. Unsigned Integer (`uintN`)**

*   **Concept:** Represents non-negative whole numbers (0, 1, 2, ...). The 'N' specifies the number of bits used to store the number, determining its maximum value (e.g., `uint8`, `uint16`, `uint256`). `uint256` is very common in Ethereum for representing token balances, counters, etc.
*   **Keyword Example:** `uint256`
*   **Declaration Example:**
    ```vyper
    # Stores a user's favorite (non-negative) number
    my_favorite_number: uint256
    ```
*   **Note:** "Unsigned" means it cannot hold negative values. The `256` relates to the size in bits; understanding bits and bytes is helpful but not essential for getting started.

**3. Signed Integer (`intN`)**

*   **Concept:** Represents whole numbers that can be positive, negative, or zero. Similar to `uintN`, 'N' specifies the number of bits (e.g., `int128`, `int256`).
*   **Keyword Example:** `int256`
*   **Declaration Example:**
    ```vyper
    # Stores a number which could potentially be negative
    some_signed_value: int256 # (Example if a signed number were needed)
    ```
*   **Note:** The key difference from `uintN` is the ability to store negative values.

**4. Address (`address`)**

*   **Concept:** Represents an Ethereum address. These are 20-byte (160-bit) values typically seen in hexadecimal format starting with `0x`. Used to store addresses of user accounts (Externally Owned Accounts) or other smart contracts.
*   **Keyword:** `address`
*   **Declaration Example:**
    ```vyper
    # Stores the address of a favorite person or contract
    my_address: address
    ```
*   **Note:** You might get addresses from wallets like MetaMask or from interactions with other contracts. Again, direct initialization like `my_address: address = 0x...` is disallowed for storage variables in v0.4.0.

**5. Decimal (`decimal`)**

*   **Concept:** Represents a fixed-point decimal number. This type is useful for financial calculations or situations requiring fractional precision without the potential pitfalls of floating-point arithmetic found in some other languages.
*   **Keyword:** `decimal`
*   **Declaration Example (Commented Out):**
    ```vyper
    # Stores a decimal value (requires compiler flag in v0.4.0)
    # my_decimal: decimal
    ```
*   **Important (Vyper v0.4.0):** Using the `decimal` type requires enabling it explicitly when compiling. You need to pass the `--enable-decimals` flag to the Vyper compiler. Since this requires specific setup, we've commented out the example declaration.

**6. Fixed-Size Byte Array (`bytesN`)**

*   **Concept:** Represents a fixed sequence of bytes. 'N' specifies the exact number of bytes (e.g., `bytes1`, `bytes8`, `bytes32`). Useful for handling raw byte data, cryptographic hashes (like Keccak256), or other fixed-length binary data.
*   **Keyword Example:** `bytes32` (common for hashes)
*   **Declaration Example:**
    ```vyper
    # Stores a fixed-size 32-byte value, like a hash
    my_bytes: bytes32
    ```
*   **Note:** `bytesN` deals with raw byte data and will be explored further in discussions about strings and hashing.

### The Vyper Documentation: Your Best Friend

The official Vyper documentation is the definitive resource for all types and language features. You can find detailed information under the "Types" section:

*   **Vyper Documentation:** `docs.vyperlang.org`

Navigating to the "Types" section in the sidebar will show you the complete list, including those mentioned here and more advanced ones.

### Other Types Mentioned in Documentation

While exploring the documentation, you'll notice other types not covered in detail here, such as:

*   Strings (`String[N]`): Fixed-size character strings.
*   Flags (`flag`): Used for defining enumerated types.
*   Reference Types: More complex types like Fixed-size Lists (`Type[N]`), Dynamic Arrays (`DynArray[Type, N]`), Structs, and Mappings, which store data differently than value types.

### Example Contract Structure (Declarations Only)

Based on our discussion, the top-level declarations for our "favorite things list" contract might look like this in Vyper 0.4.0:

```vyper
# pragma version 0.4.0
# @license MIT

# favorite things list:
# Variables to potentially store favorite numbers, people/addresses, etc.

has_favorite_number: bool
my_favorite_number: uint256
my_address: address
# my_decimal: decimal # Commented out as requires --enable-decimals flag
my_bytes: bytes32

# Contract functions to set/get these values would go here...
```

This lesson covered the fundamental building blocks – basic data types – used to store state in Vyper smart contracts, emphasizing the declaration syntax and the specific rules applicable to Vyper version 0.4.0.