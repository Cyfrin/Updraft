## Setting Up Your First Vyper Project in Remix

This lesson walks you through the initial steps of setting up a new smart contract project using the Vyper language within the Remix Integrated Development Environment (IDE). We'll create a simple "Buy Me a Coffee" contract, defining its basic structure and requirements.

First, ensure you have a clean Remix workspace. It's good practice to start fresh, so delete any pre-existing default folders (like `contracts`, `scripts`, `tests`) and files (`.sol` or `.vy`) in the File Explorer tab if you haven't already. We assume you have some basic familiarity with navigating the Remix interface.

**Handling a Remix Quirk: The Placeholder Solidity File**

Before diving into Vyper, we need to address a quirk present in Remix (as of the time of this writing). For certain functionalities like deployment to work smoothly, even when primarily developing in Vyper, Remix often expects at least one Solidity file to have been compiled.

To satisfy this requirement, let's create a minimal Solidity file:

1.  In the Remix File Explorer, create a new file named `hi.sol`.
2.  Add the following basic Solidity code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18; // Specifies Solidity compiler version

contract hi {} // Defines an empty contract named 'hi'
```

3.  Navigate to the "Solidity Compiler" tab (the Solidity logo icon).
4.  Ensure the compiler version selected matches (or is compatible with) `0.8.18`.
5.  Click the "Compile hi.sol" button.

Once it compiles successfully, you can effectively ignore this file. Its sole purpose is to enable seamless Vyper development and deployment later within Remix.

**Creating the Vyper Contract File and Naming Conventions**

Now, let's create our main Vyper contract file:

1.  Go back to the "File Explorer" tab.
2.  Create a new file named `buy_me_a_coffee.vy`. The `.vy` extension signifies that this is a Vyper file.

Note the filename `buy_me_a_coffee.vy` uses **snake_case** (lowercase words separated by underscores). This is the standard convention inherited from Python, which Vyper is based on. While you might see **CamelCase** (like `BuyMeACoffee.vy`) used for filenames in some projects (there's some community debate on file naming), it's crucial to remember that *within the Vyper code itself* (for variables, functions, etc.), the strong convention is to use **snake_case**. We will stick to snake_case for the filename as well.

**Defining Project Requirements (Design First)**

Before writing any complex logic, it's highly recommended to outline what the contract should do. This acts as a design specification and helps guide development. For our "Buy Me a Coffee" contract, the core requirements are:

1.  Allow users to send Ether (funds) to the contract.
2.  Allow the contract owner to withdraw these funds.
3.  Enforce a minimum funding amount, specified in an equivalent USD value (we'll handle the conversion logic later).

Let's add these requirements as comments at the top of our `buy_me_a_coffee.vy` file:

```vyper
# 1 Get funds from users
# 2 Withdraw funds
# 3 Set a minimum funding value in USD
```

This simple contract simulates a way for people to donate crypto, ensuring a minimum donation size, and allowing the recipient to access the donations.

**Building the Basic Contract Structure**

Every Vyper contract starts with some essential lines:

1.  **Pragma:** Specifies the Vyper compiler version the contract is written for.
2.  **NatSpec Comments:** Special comments providing metadata about the contract (license, author, etc.), similar to Solidity's NatSpec.

Add the following lines below the requirements comments in `buy_me_a_coffee.vy`:

```vyper
# pragma version 0.4.0 # Specifies Vyper compiler version
# @ license: MIT      # Declares the software license
# @ author: You!       # Declares the author
```

We're using Vyper version `0.4.0`. NatSpec tags like `@license` and `@author` provide useful documentation. Other tags exist, and we'll explore more structured documentation later.

**Creating Function Skeletons with `pass`**

Based on our requirements, we know we'll need functions for funding and withdrawal. Let's define the basic structure for these using Python's `def` keyword. Since we aren't adding logic yet, we'll use the `pass` keyword. `pass` is a null operation – it does nothing but serves as a valid placeholder where code is syntactically required, allowing the contract to compile.

Add the following function definitions:

```vyper
def fund():
    pass # Placeholder for funding logic

def withdraw():
    pass # Placeholder for withdrawal logic
```

You can navigate to the "Vyper Compiler" tab in Remix, select version `0.4.0`, and compile `buy_me_a_coffee.vy`. It should compile successfully, demonstrating that `pass` creates syntactically valid, albeit empty, functions.

**Adding Function Visibility with `@external`**

By default, functions in Vyper are internal. To allow users (or other contracts) outside of this contract to call our functions, we need to explicitly define their visibility. Vyper uses **decorators** (prefixed with `@`) for this.

The `@external` decorator marks a function as part of the contract's public interface, making it callable from outside. Both our `fund` function (so users can send funds) and our `withdraw` function (so the owner can withdraw) need to be externally callable.

Modify the function definitions to include the `@external` decorator:

```vyper
@external
def fund():
    pass

@external
def withdraw():
    pass
```

Compile the contract again to ensure everything is correct.

**Note:** While `withdraw` is marked `@external` now, allowing anyone to potentially call it, this is not secure. In subsequent lessons, we will add access control logic to ensure only the designated owner can call the `withdraw` function.

You now have a basic Vyper contract skeleton set up in Remix, complete with necessary configurations, requirements documentation, and placeholder functions ready for implementation.