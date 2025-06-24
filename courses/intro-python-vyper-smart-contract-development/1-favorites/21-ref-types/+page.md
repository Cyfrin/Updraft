## Beyond Single Variables: Introducing Vyper Reference Types

In our previous explorations of Vyper, we've often dealt with simple state variables, like storing a single favorite number using `uint256`. While useful, this approach quickly becomes limited when we need to manage more complex data or collections of data associated with multiple users or entities.

Imagine trying to store a favorite number for every user interacting with your contract. You could try adding individual state variables like `alice_favorite_number`, `bob_favorite_number`, etc. However, this is highly inefficient and static. What happens when a new user arrives? You'd need to modify the contract code, recompile, and redeploy – a completely impractical solution for dynamic applications.

To build smarter, more flexible contracts, Vyper provides powerful **Reference Types**. These are data structures designed to handle collections and complex data groupings efficiently. Unlike simple **Value Types** (`uint256`, `bool`, `address`, etc.), where assignments or function passes typically create copies of the data, Reference Types often work with pointers or references to the data's location in memory or storage.

This lesson focuses on three fundamental Vyper reference types: Fixed-Sized Lists, Mappings, and Structs. We'll explore how to declare them, initialize them, and interact with them, paving the way for more sophisticated contract logic.

## Working with Ordered Data: Fixed-Sized Lists

A fixed-sized list in Vyper is analogous to an array in other programming languages. It holds a sequence of elements of the *same* data type. The crucial characteristic is that its size (the number of elements it can hold) is fixed at compile time and cannot be changed after the contract is deployed.

**Declaration:**

To declare a fixed-sized list as a state variable, you specify the element type followed by the fixed size in square brackets `[]`. Using the `public()` visibility modifier automatically creates a getter function, allowing external users or contracts to read elements from the list.

```vyper
# Example: A public list holding 10 unsigned integers
nums: public(uint256[10])
```

Here, `nums` is the name of our state variable. It's declared as a public list capable of storing exactly 10 elements, each of type `uint256`.

**Initialization and Access:**

You typically initialize or modify list elements within functions, often in the contract's constructor (`__init__`) for initial setup. Access and modification use zero-based indexing, where the first element is at index `0`, the second at index `1`, and so on. Remember to use `self.` to refer to state variables within contract functions.

```vyper
@deploy
def __init__():
    # Set the value of the first element (index 0)
    self.nums[0] = 123
    # Set the value of the second element (index 1)
    self.nums[1] = 456
    # Elements self.nums[2] through self.nums[9] remain uninitialized
```

**Default Values:**

Any elements in a fixed-sized list that you don't explicitly assign a value to will automatically receive the default value for their data type. For `uint256`, the default value is `0`. So, in the example above, accessing `self.nums[2]` (or any index from 2 to 9) would return `0`.

## Key-Value Storage: Mappings (HashMaps)

Mappings, declared using the `HashMap` keyword, provide a powerful way to store key-value pairs. Think of them like dictionaries or hash maps in other languages. You associate a unique key of one data type with a value of another data type.

Unlike lists, mappings do not have a concept of length or order, and you cannot iterate directly over their keys or values within Vyper. They are highly optimized for retrieving a value when you know its corresponding key.

**Declaration:**

Declaring a mapping involves specifying the key type and the value type within the `HashMap` structure.

```vyper
# Example: Mapping addresses to unsigned integers
# Stores a uint256 value for each unique address key
myMap: public(HashMap[address, uint256])
```

This declares a public state variable `myMap`. It maps keys of type `address` to values of type `uint256`. This is ideal for scenarios like tracking balances, roles, or preferences associated with specific user addresses.

**Initialization and Access:**

You access and modify values in a mapping using the key within square brackets `[]`.

```vyper
@deploy
def __init__():
    # msg.sender is the address deploying the contract
    # Assign the value 1 to the key associated with the deployer's address
    self.myMap[msg.sender] = 1

    # Update the value for the same key (msg.sender) to 11
    # The previous value (1) is overwritten
    self.myMap[msg.sender] = 11
```

If you assign a value to the same key multiple times, only the most recent assignment persists. Accessing a key that hasn't been assigned a value will return the default value for the value type (e.g., `0` for `uint256`).

## Defining Custom Data Structures: Structs

Structs allow you to create your own custom, complex data types by grouping several variables (called fields or members) together under a single name. These fields can be of different data types, including value types, other structs, or even fixed-sized lists and mappings (though usage within structs has specific considerations).

**Definition:**

First, you define the structure of your custom type using the `struct` keyword.

```vyper
# Define a new data type called 'Person'
struct Person:
    name: String[10]  # Field for a name, max 10 characters
    age: uint256     # Field for an age
```

This code defines a blueprint called `Person`. Any variable of type `Person` will contain two fields: `name` (a string with a maximum length of 10 characters) and `age` (an unsigned integer).

**Declaration:**

Once defined, you can declare state variables using your custom struct type.

```vyper
# Declare a public state variable of type Person
person: public(Person)
```

This creates a state variable named `person` of type `Person`.

**Accessing and Modifying Struct Fields in Storage:**

You access the fields within a struct state variable using dot notation (`.`).

```vyper
@deploy
def __init__():
    # Modify the 'name' field of the 'person' state variable directly in storage
    self.person.name = "vyper"
    # Modify the 'age' field of the 'person' state variable directly in storage
    self.person.age = 33
```

These assignments directly modify the data stored on the blockchain within the `person` state variable.

## Understanding Storage vs. Memory with Structs

A crucial concept when working with reference types, especially structs, is the difference between **storage** and **memory**.

*   **Storage:** This is the persistent state of the contract, stored permanently on the blockchain. State variables (`self.nums`, `self.myMap`, `self.person`) reside in storage. Modifying storage is relatively expensive in terms of gas cost.
*   **Memory:** This is temporary, volatile data space used during function execution. It's cheaper to use than storage but is cleared after the function call finishes. Local variables within functions typically reside in memory.

Consider the following code within the `__init__` function, continuing from the previous struct example:

```vyper
@deploy
def __init__():
    # Initialize struct fields in storage
    self.person.name = "vyper"
    self.person.age = 33

    # --- Storage vs. Memory Demonstration ---

    # 1. Load the struct from storage (self.person) into a memory variable 'p'
    #    This operation CREATES A COPY of the struct data in memory.
    p: Person = self.person

    # 2. Modify the fields of the memory variable 'p'
    p.name = "solidity"
    p.age = 22

    # At this point:
    # - The memory variable 'p' holds {name: "solidity", age: 22}
    # - The storage variable 'self.person' STILL holds {name: "vyper", age: 33}

    # The changes made to 'p' (the memory copy) DO NOT automatically update
    # the original 'self.person' struct in storage.
    # The memory variable 'p' and its modified values will be discarded
    # when the __init__ function execution completes.
```

**Key Takeaway:** When you assign a storage struct (like `self.person`) to a local memory variable (like `p: Person`), you are usually creating a *copy* of the data in memory. Modifications to this memory copy (`p.name`, `p.age`) **do not** automatically reflect back into the original storage variable (`self.person`). If you intend to update the persistent state, you must explicitly assign values back to the storage variable's fields (e.g., `self.person.name = p.name`).

Understanding this distinction is vital for writing correct and efficient Vyper code, ensuring that data modifications have the intended effect on your contract's persistent state.

Fixed-sized lists, mappings, and structs provide the building blocks for organizing complex data within your Vyper smart contracts, moving beyond the limitations of simple value types and enabling more dynamic and powerful decentralized applications.