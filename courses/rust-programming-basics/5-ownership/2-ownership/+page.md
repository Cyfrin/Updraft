Rust's ownership system is a cornerstone of its ability to ensure memory safety without relying on a garbage collector. Understanding these rules is fundamental for any Rust developer. This lesson breaks down the three core ownership rules and a key exception involving the `Copy` trait, using examples that you might encounter in a typical Rust project (e.g., within a `hello_rust` project using an `ownership.rs` example file, often starting with `#![allow(unused)]` to suppress warnings during demonstrations).

## Introduction to Ownership Rules

At its heart, Rust's memory safety is guaranteed by a set of rules checked at compile time, known as the ownership rules. These rules are:

1.  Each value in Rust has an *owner*.
2.  There can only be one owner at a time.
3.  When the owner goes out of scope, the value will be *dropped*.

Let's explore each of these rules in detail.

## Rule 1: Each value has an owner

This first rule is straightforward: every piece of data, or "value," in your Rust program is owned by a variable. This variable is its owner.

*   **Code Example:**

    ```rust
    // 1. Each value has an owner
    let s = String::from("rust");
    // The string "rust" is owned by the variable s

    let i = 1;
    // The value 1 is owned by the variable i
    ```

*   **Explanation:**
    *   In the example above, `s` is a variable of type `String` that holds the text data `"rust"`. The variable `s` is the owner of this string data.
    *   Similarly, `i` is a variable (implicitly of type `i32`) that holds the numerical value `1`. The variable `i` is the owner of this value.

## Rule 2: There can only be one owner at a time

The second rule states that any given value can only have a single owner. This has significant implications when you assign a value from one variable to another, especially for complex types like `String` that manage data on the heap and do not implement the `Copy` trait (which we'll discuss later). In such cases, ownership is *moved*.

*   **Code Example:**

    ```rust
    // 2. There can only be one owner at a time
    let s = String::from("dog");
    // Owner of the string data "dog" is s

    let s1 = s;
    // Ownership of "dog" is now moved to s1.
    // 's' is no longer valid.

    let s2 = s1;
    // Ownership of "dog" is now moved to s2.
    // 's1' is no longer valid.

    println!("{}", s2); // This will print "dog"
    ```

*   **Execution & Output:**
    If you were to run this code (e.g., using `cargo run --example ownership` assuming this is part of an `examples/ownership.rs` file):

    ```
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.05s
    Running `target/debug/examples/ownership`
    dog
    ```

*   **Attempting to use the old owner:**
    What happens if you try to use a variable after its ownership has been moved? Let's try to print `s`:

    ```rust
    // This will not compile
    // println!("{}", s);
    ```

*   **Compilation Error:**
    Uncommenting `println!("{}", s);` would lead to a compile-time error:

    ```
    error[E0382]: borrow of moved value: `s`
      --> examples/ownership.rs:20:20  // Line number may vary
       |
    13 |     let s = String::from("dog");
       |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait
    14 |     // Owner of "dog" is now s1
    15 |     let s1 = s;
       |              - value moved here
    ...
    20 |     println!("{}", s);
       |                    ^ value borrowed here after move
    ```

*   **Explanation:**
    *   Initially, `s` owns the `String` data `"dog"`. This data is typically allocated on the heap.
    *   When the line `let s1 = s;` is executed, Rust *moves* the ownership of the string data from `s` to `s1`. `s` is then invalidated. This isn't a "shallow copy" or "deep copy" in the traditional sense; rather, the pointer to the data, along with its length and capacity, are moved. To prevent a "double free" error (where both `s` and `s1` might try to free the same memory when they go out of scope), Rust ensures only one variable owns the data.
    *   Subsequently, `let s2 = s1;` moves ownership from `s1` to `s2`, invalidating `s1`.
    *   Only the current owner, `s2`, can be used to access the string data. The compiler error E0382 clearly indicates that `s` was used after its value was moved.

## Rule 3: When the owner goes out of scope, the value will be dropped

The term "dropped" in Rust means that the memory allocated for the value is deallocated, and any other cleanup (like running a destructor) is performed. This happens automatically when the variable that owns the value goes out of scope.

*   **Example 3.1: Simple Inner Scope**
    When a variable's ownership is tied to a specific scope, its value is dropped when that scope ends.

    ```rust
    // 3. When the owner goes out of scope, the value will be dropped
    let s = String::from("cat");
    { // New scope starts
        // If 's' were moved to a variable local to this scope,
        // or if an operation here consumed 's',
        // its lifetime could be tied to this inner scope.
        // For demonstration, let's assume 's' is conceptually moved or its value
        // becomes associated with this inner scope.
        // The summary suggests `s;` was shown as if it moved it.
        // A more explicit move would be `let _s_inner = s;`
        // In that case, `_s_inner` would own the data, and drop at the end of this scope,
        // invalidating the original `s`.
    } // Scope ends here. If `s`'s value was moved and its new owner was tied to this scope,
      // the value would be dropped here.

    // If 's' from the outer scope was indeed moved and its value subsequently dropped
    // (e.g., because its new owner within the inner scope went out of scope),
    // attempting to use 's' here would fail.
    // println!("{}", s); // This would not compile under that assumption.
    ```
    The compiler error, if `s` was used after its value was considered moved and dropped due to an inner scope operation:
    ```
    error[E0382]: borrow of moved value: `s`
    --> examples/ownership.rs:28:20 // Line number may vary
     |
    24 |         { // Assuming line of the start of the inner scope
    25 |             s; // Placeholder for an operation that moves s
       |             - value moved here (as per the error message's context)
    ...
    28 |     println!("{}", s);
       |                    ^ value borrowed here after move
    ```

*   **Example 3.2: Inner Scope with Reassignment (Combining Rule 2 & 3)**
    This example clearly demonstrates the interplay of moving ownership (Rule 2) and dropping when out of scope (Rule 3).

    ```rust
    let s = String::from("cat");
    { // New scope
        // Initially, owner of "cat" is s (from the outer scope)
        let s1 = s; // Ownership of "cat" moves from 's' to 's1'.
                    // 's' in the outer scope is now invalidated (Rule 2).
        // Now, owner of "cat" is s1.
        // s1 is defined within this inner scope.
    } // Scope ends here. 's1' goes out of scope.
      // Because 's1' is the owner of "cat", the string "cat" is dropped (deallocated) (Rule 3).

    // This will not compile:
    // println!("{}", s); // 's' is invalid because its value was moved to 's1',
                        // and that value was subsequently dropped.
    ```
    Attempting to use `s` here would result in a similar "borrow of moved value" error, as its value was moved to `s1`, which was then dropped.

*   **Example 3.3: Function Takes Ownership of `String`**
    Functions can also take ownership of values passed to them. If a function parameter is of a type that doesn't implement `Copy` (like `String`), passing a variable to it moves ownership into the function.

    ```rust
    fn take_ownership(some_string: String) { // some_string takes ownership
        println!("Inside take_ownership: {}", some_string);
    } // Here, some_string goes out of scope, and the String data it owns is dropped.

    // In your main function or another part of the code:
    let s = String::from("cat");
    // s owns "cat"

    take_ownership(s);
    // Ownership of the string data "cat" is moved into the 'take_ownership' function.
    // The variable 's' in this scope is no longer valid.

    // This will not compile if uncommented:
    // println!("After take_ownership: {}", s);
    ```

*   **Compilation Error (if `println!("{}", s);` is uncommented):**

    ```
    error[E0382]: borrow of moved value: `s`
      --> examples/ownership.rs:47:24  // Line number may vary
       |
    45 |     let s = String::from("cat");
       |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait
    46 |     take_ownership(s);
       |                    - value moved here
    47 |     println!("After take_ownership: {}", s);
       |                                          ^ value borrowed here after move
    ```

*   **Explanation:**
    *   When `s` is passed to the `take_ownership` function, ownership of the `String` data moves from the `s` in `main` (or the calling scope) to the `some_string` parameter within `take_ownership`.
    *   The original variable `s` in the calling scope is immediately invalidated.
    *   When `take_ownership` completes, its parameter `some_string` goes out of scope. Since `some_string` owns the string data, the data is dropped (memory deallocated).
    *   Attempting to use `s` in the calling scope after it has been moved into `take_ownership` results in the compile-time error E0382.

## The `Copy` Trait: An Exception to Ownership Moves

The ownership rules, particularly the "move" semantics observed in Rule 2 and 3 for types like `String`, behave differently for types that implement the `Copy` trait. For these types, when assigned to another variable or passed to a function, the value is *copied* rather than moved. The original variable remains valid and continues to own its (now duplicated) data.

*   Types that implement `Copy` are typically simple scalar types whose data is stored entirely on the stack. Common examples include:
    *   All integer types (e.g., `i32`, `u64`)
    *   The boolean type (`bool`)
    *   Floating-point types (e.g., `f64`)
    *   The character type (`char`)
    *   Tuples, if they only contain types that also implement `Copy`.
*   Crucially, `String` does *not* implement `Copy` because it manages heap-allocated data.

*   **Example 5.1: `i32` Assignment (A `Copy` Type)**

    ```rust
    // 'i' is the owner of the value 1
    let i = 1; // i32 implements the Copy trait

    // 'i1' becomes the owner of a *copy* of i's value
    let i1 = i; // The value of 'i' (1) is copied to 'i1'.
                // 'i' remains valid and still owns its value 1.

    // 'i2' becomes the owner of a *copy* of i1's value
    let i2 = i1; // The value of 'i1' (1) is copied to 'i2'.
                 // 'i1' remains valid.

    // All variables i, i1, and i2 are valid and hold their own copies of the value 1.
    println!("i = {}, i1 = {}, i2 = {}", i, i1, i2); // Prints: i = 1, i1 = 1, i2 = 1
    ```

*   **Example 5.2: `i32` Passed to a Function**

    ```rust
    fn process_copy(value: i32) { // Parameter 'value' receives a copy of the i32
        println!("Inside process_copy: {}", value);
    } // 'value' (the copy) goes out of scope and is dropped here.
      // The original variable passed to the function is unaffected.

    // In your main function or another part of the code:
    let i = 1; // 'i' is an i32 (a Copy type)

    process_copy(i);
    // A copy of the value of 'i' (which is 1) is passed to process_copy.
    // 'i' in this scope remains valid and unchanged.

    println!("After process_copy, i = {}", i); // This compiles and prints "1".
    ```

*   **Combined Execution & Output (Illustrative):**
    If the `Copy` trait examples were run after the `String` examples shown earlier, the console output might look like this:

    ```
    dog         // Output from println!("{}", s2); using String
    Inside take_ownership: cat // Output from take_ownership(s) using String
    i = 1, i1 = 1, i2 = 1 // Output from Copy trait assignment example
    Inside process_copy: 1   // Output from process_copy(i) using i32
    After process_copy, i = 1 // Output from println!("{}", i); in main after call
    ```

*   **Explanation:**
    *   Because `i32` implements the `Copy` trait, assignments like `let i1 = i;` create a bitwise copy of the value. Both `i` and `i1` are independent owners of their respective data (which happens to be the same value, `1`).
    *   When `i` is passed to `process_copy(i)`, its value is copied to the function's parameter `value`. The original `i` in the calling scope is completely unaffected and remains valid after the function call.
    *   This is why `println!("After process_copy, i = {}", i);` works perfectly fine, demonstrating that `i` was not moved.

## Summary of Rust's Ownership System

To recap, Rust's ownership system revolves around three fundamental rules:

1.  **Each value has an owner.**
2.  **There can only be one owner at a time.** (This leads to "move" semantics for non-`Copy` types).
3.  **When the owner goes out of scope, the value will be dropped.** (Its memory is reclaimed).

And the important caveat regarding data types that implement the `Copy` trait:

*   For types that are `Copy`, their values are duplicated (copied) on assignment or when passed to functions, rather than moved. This means the original variable remains valid and can still be used.

These rules are enforced by the Rust compiler, preventing many common memory safety bugs like dangling pointers or data races, all without the overhead of a runtime garbage collector. Mastering ownership is key to writing safe and efficient Rust code.