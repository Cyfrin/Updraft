## Structuring Your Rust Project: From Single File to Organized Modules

This lesson guides you through refactoring a Rust project from a single file into a well-organized structure using multiple files and directories for your modules. This approach significantly enhances code maintainability, readability, and scalability, especially for larger projects. We'll start with all code in one example file and progressively move towards a library crate with a clean module hierarchy.

## Initial State: All Code in `examples/mods.rs`

We begin with a scenario where all our module definitions (`foo` and `my`, with `my` containing a nested module `a`) and the `main` function reside in a single file: `examples/mods.rs`.

```rust
// examples/mods.rs (Conceptual starting point, simplified)
#![allow(unused)] // Added for demonstration

mod foo {
    pub fn print() {
        println!("foo");
    }
}

mod my {
    use super::foo; // Accessing sibling module

    pub fn print() {
        println!("rust");
    }

    fn private_print() {
        a::print();
        println!("private");
    }

    pub mod a {
        use super::super::foo; // Accessing foo from my::a

        pub fn print_foo() {
            foo::print();
        }


        pub fn print() {
            println!("a");
        }

        pub struct S {
            pub id: u32,
            name: String,
        }

        pub fn build(id: u32) -> S {
            S {
                id,
                name: "".to_string(),
            }
        }
    }
}

fn main() {
    my::print();
    my::a::print();
    let s = my::a::build(1);
    my::a::print_foo();
}
```
This setup is functional for small examples but quickly becomes unmanageable as complexity grows.

## Step 1: Moving Modules to a Library Crate (`lib.rs`)

Our first step is to separate the module logic into a library crate, which can then be used by our example or other parts of a larger application.

1.  **Create `src/lib.rs`**:
    In your project's `src` directory, create a new file named `lib.rs`. This file serves as the root of a new library crate.
    Your project structure will look like this:
    ```
    src/
    ├── lib.rs  <-- New file
    └── main.rs
    examples/
    └── mods.rs
    ```

2.  **Move Module Code to `lib.rs`**:
    Cut the `mod foo { ... }` and `mod my { ... }` blocks (including their entire content) from `examples/mods.rs` and paste them into `src/lib.rs`. The `main` function will remain in `examples/mods.rs` for now. The `#![allow(unused)]` attribute, if present at the top of `mods.rs`, should also be moved to the top of `lib.rs`.

3.  **Make Modules Public in `lib.rs`**:
    For these modules to be accessible from outside the library (e.g., from `examples/mods.rs`), they must be declared `pub`.
    ```rust
    // src/lib.rs
    #![allow(unused)] // Moved from mods.rs

    pub mod foo { // Added 'pub'
        pub fn print() {
            println!("foo");
        }
    }

    pub mod my { // Added 'pub'
        // 'super::foo' would still work here, as 'super' refers to the crate root (lib.rs).
        // Alternatively, 'crate::foo' is a more explicit path to items in the crate root.
        // use crate::foo;

        // pub fn print_foo() { // Example if foo was used directly in my
        //     foo::print();
        // }

        pub fn print() {
            println!("rust");
        }

        fn private_print() {
            a::print(); // 'a' is a child module of 'my'
            println!("private");
        }

        pub mod a {
            // 'super::super::foo' referred to 'foo' from the perspective of 'a',
            // where 'super' was 'my' and 'super::super' was the crate root.
            // 'crate::foo' is a more robust way to access 'foo' from the crate root.
            use crate::foo;

            pub fn print_foo() {
                foo::print();
            }

            pub fn print() {
                println!("a");
            }

            pub struct S {
                pub id: u32,
                name: String,
            }

            pub fn build(id: u32) -> S {
                S {
                    id,
                    name: "".to_string(),
                }
            }
        }
    }
    ```
    Note the comments regarding path updates: `use super::foo` within `my` now correctly resolves to `foo` at the crate root because `my` is a top-level module in `lib.rs`. Similarly, within `my::a`, `use super::super::foo` correctly resolves to the crate root `foo`. However, using `crate::foo` is often preferred for clarity when referring to items directly from the crate root.

4.  **Importing Modules into `examples/mods.rs`**:
    The `examples/mods.rs` file now needs to import the modules from our newly created library. To do this, we need the package name. Check your `Cargo.toml` file:
    ```toml
    // Cargo.toml
    [package]
    name = "hello_rust" // This is your package name
    version = "0.1.0"
    edition = "2024"
    // ...
    ```
    Assuming the package name is `hello_rust`, update `examples/mods.rs`:
    ```rust
    // examples/mods.rs
    // #![allow(unused)] // Removed, now in lib.rs

    use hello_rust::my; // Imports 'my' module from the 'hello_rust' crate
    // To import both foo and my, you could use:
    // use hello_rust::{foo, my};

    fn main() {
        my::print();
        my::a::print();
        let s = my::a::build(1);
        my::a::print_foo(); // This function uses foo::print internally
    }
    ```

5.  **Running the Example**:
    Execute your example using `cargo run --example mods`. The code should compile and run, producing the same output as before ("rust", "a", "foo"), demonstrating that our library is correctly linked and its public modules are accessible.

## Step 2: Splitting Top-Level Modules in `lib.rs` into Separate Files

While `lib.rs` now houses our library code, it can still become cluttered if it contains many large modules. The next step is to split the `foo` and `my` modules into their own dedicated files.

1.  **Create `src/foo.rs` and `src/my.rs`**:
    Create two new files in the `src` directory: `foo.rs` and `my.rs`.
    The file structure will now be:
    ```
    src/
    ├── foo.rs   <-- New file
    ├── lib.rs
    ├── main.rs
    └── my.rs    <-- New file
    ```

2.  **Update `src/lib.rs`**:
    Modify `src/lib.rs` to declare these modules. Rust will automatically look for `src/foo.rs` (or `src/foo/mod.rs`) and `src/my.rs` (or `src/my/mod.rs`) respectively.
    ```rust
    // src/lib.rs
    #![allow(unused)]

    pub mod foo; // Rust looks for src/foo.rs or src/foo/mod.rs
    pub mod my;  // Rust looks for src/my.rs or src/my/mod.rs
    ```
    The actual code for these modules will now reside in their respective files.

3.  **Content of `src/foo.rs`**:
    Move the content of the original `mod foo { ... }` block (from `lib.rs`) into `src/foo.rs`. Do *not* include the `mod foo { ... }` wrapper itself in this new file; the filename `foo.rs` signifies it's the `foo` module.
    ```rust
    // src/foo.rs
    pub fn print() {
        println!("foo");
    }
    ```

4.  **Content of `src/my.rs`**:
    Similarly, move the content of the original `mod my { ... }` block into `src/my.rs`, again omitting the `mod my { ... }` wrapper.
    ```rust
    // src/my.rs

    // If 'my' module needed to access 'foo' directly:
    // 'super::foo' previously referred to foo in lib.rs.
    // Now that 'my.rs' is a file representing module 'my', 'super' still refers to its parent,
    // which is the crate root (lib.rs where 'mod my;' is declared).
    // So, 'use super::foo;' would work, or more explicitly:
    // use crate::foo;

    pub fn print() {
        println!("rust");
    }

    fn private_print() {
        a::print();
        println!("private");
    }

    pub mod a {
        // 'super' within 'a' refers to the 'my' module (this file, my.rs).
        // 'super::super::foo' refers to the crate root's 'foo' module.
        // Again, 'crate::foo' is a clear alternative.
        use crate::foo;

        pub fn print_foo() {
            foo::print();
        }

        pub fn print() {
            println!("a");
        }

        pub struct S {
            pub id: u32,
            name: String,
        }

        pub fn build(id: u32) -> S {
            S {
                id,
                name: "".to_string(),
            }
        }
    }
    ```
    The `examples/mods.rs` file requires no changes because the public API of the `hello_rust` crate (the modules `foo` and `my` and their public items) has not changed from its perspective. Running `cargo run --example mods` should still succeed.

## Step 3: Organizing Nested Modules (`my::a`) with Directories

The `my` module contains a nested module `a`. If `my` itself were to grow and have multiple submodules or extensive code, `my.rs` could become large. We can further organize this by giving `my` its own directory.

1.  **Create Directory `src/my/`**:
    Inside the `src` directory, create a new directory named `my`.

2.  **Create `src/my/mod.rs` and `src/my/a.rs`**:
    *   `src/my/mod.rs`: This file will now represent the `my` module itself. It will declare any submodules of `my` (like `a`) and can also contain functions, structs, etc., that belong directly to the `my` module.
    *   `src/my/a.rs`: This file will contain the code for the `a` submodule.

    The file structure evolves to:
    ```
    src/
    ├── foo.rs
    ├── lib.rs
    ├── main.rs
    └── my/         <-- New directory
        ├── a.rs    <-- New file (for submodule a)
        └── mod.rs  <-- New file (for module my)
    ```
    The previous `src/my.rs` file is now obsolete and should be deleted.

3.  **Content of `src/my/a.rs`**:
    Move the code that was inside the `pub mod a { ... }` block (previously in `src/my.rs`) into `src/my/a.rs`. Do not include the `pub mod a { ... }` wrapper.
    ```rust
    // src/my/a.rs

    // 'super' refers to the parent module of 'a', which is 'my' (defined in src/my/mod.rs).
    // 'super::super::foo' refers to 'foo' in the crate root (src/lib.rs).
    // 'crate::foo' is the most direct way to reference 'foo' from the crate root.
    use crate::foo;

    pub fn print_foo() {
        foo::print();
    }

    pub fn print() {
        println!("a");
    }

    pub struct S {
        pub id: u32,
        name: String,
    }

    pub fn build(id: u32) -> S {
        S {
            id,
            name: "".to_string(),
        }
    }
    ```

4.  **Content of `src/my/mod.rs`**:
    This file defines the `my` module. It must declare its public submodule `a`. Any items (functions, structs) that were directly part of the `my` module (i.e., not in `a`) also go here.
    ```rust
    // src/my/mod.rs

    // Declare the submodule 'a'. Rust will look for src/my/a.rs or src/my/a/mod.rs.
    pub mod a;

    // Items directly part of the 'my' module
    pub fn print() {
        println!("rust");
    }

    fn private_print() {
        // 'a::print()' is valid here because 'a' is a public submodule of 'my'.
        // If 'a' was not pub, or if private_print tried to access a private item in 'a',
        // it would be a compile error.
        a::print();
        println!("private");
    }
    ```

5.  **Delete `src/my.rs`**:
    The original `src/my.rs` file is now redundant as its contents have been split into `src/my/mod.rs` and `src/my/a.rs`. Delete `src/my.rs`.

6.  **Running the Example**:
    Once again, run `cargo run --example mods`. The code should compile and execute without issues, demonstrating that Rust correctly resolves the module paths with the new directory structure.

## Key Concepts for Rust Module Organization

*   **`lib.rs` (or `main.rs` for binaries):** This is the crate root. Modules defined or declared here form the top level of your crate's module tree.
*   **Module Declaration:**
    *   `mod my_module;` tells Rust to look for the contents of `my_module` in:
        1.  `src/my_module.rs` (for a module without submodules, or whose submodules are also in separate files).
        2.  `src/my_module/mod.rs` (if `my_module` has its own submodules organized in the `my_module/` directory).
*   **`mod.rs`:** A special filename. When you have a directory representing a module (e.g., `src/my/`), the file `src/my/mod.rs` contains the code for the `my` module itself, including declarations of its submodules (e.g., `pub mod a;` which would point to `src/my/a.rs`).
*   **`pub` Keyword:** Crucial for visibility. Use `pub` to make modules, functions, structs, enums, traits, and struct fields accessible from outside their defining module or, in the case of a library's public API, from outside the crate.
*   **`use` Statement:**
    *   To bring items into scope from the *same crate*: `use crate::module_name::item_name;` or `use crate::module_name;`. The `crate` keyword refers to the current crate's root.
    *   To bring items into scope from an *external crate*: `use external_crate_name::module_name::item_name;`. The `external_crate_name` is typically defined in your `Cargo.toml` dependencies.
*   **`super` Keyword:**
    *   Refers to the parent module. For example, in `src/my/a.rs`, `super` refers to the `my` module (defined in `src/my/mod.rs`).
    *   `super::super::item` would go two levels up.
    *   While `super` is useful for relative paths, `crate::path::to::item` is often clearer and more resilient to refactoring when accessing items from the crate root or other known locations within the crate.
*   **Package Name:** Found in `Cargo.toml` under `[package].name`. This is the name used when your library is a dependency for another crate (or an example binary within the same package).

## Final Achieved File Structure

After these steps, your project's relevant files will be structured as follows:

```
.
├── Cargo.toml
├── examples/
│   └── mods.rs
└── src/
    ├── foo.rs          // Contains the public 'foo' module's code
    ├── lib.rs          // Crate root for the library; declares 'pub mod foo;' and 'pub mod my;'
    ├── main.rs         // (Potentially the root of a binary crate, not modified for this library lesson)
    └── my/             // Directory representing the 'my' module
        ├── a.rs        // Contains the public 'my::a' submodule's code
        └── mod.rs      // Contains code for 'my' module itself, declares 'pub mod a;'
```

This structured approach significantly improves code organization. Each module and submodule has a distinct location in the file system, making the codebase easier to navigate, understand, and maintain, particularly as it scales in size and complexity.