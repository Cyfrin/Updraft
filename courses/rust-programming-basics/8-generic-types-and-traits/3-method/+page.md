## Defining Behavior: Methods and Static Methods on Rust Structs

In Rust, `structs` allow us to create custom data types by grouping related data. But data alone is often not enough; we need ways to operate on that data or perform actions related to the type itself. This is where methods and static methods (also known as associated functions) come into play. This lesson will guide you through defining and using these powerful features for your Rust structs.

We'll use a simple `Point` struct as our example, representing a point in a 2D space.

First, let's define our `Point` struct:

```rust
#![allow(unused)] // Allows unused code for the example

#[derive(Debug)] // Allows the struct to be printed for debugging
struct Point {
    x: f32,
    y: f32,
}
```

Here:
*   `x: f32` and `y: f32` store the x and y coordinates as 32-bit floating-point numbers.
*   `#[derive(Debug)]` is an attribute that automatically implements the `Debug` trait. This useful trait allows us to easily print instances of `Point` for debugging purposes, for example, using `println!("{:?}", point_instance);`.

## Understanding Methods in Rust

A **method** is a function that is "attached" to a specific data type. In our case, we'll be attaching methods to our `Point` struct. This concept applies equally to `enums` in Rust.

One of the primary benefits of using methods is **syntactic sugar**. They offer a more intuitive, object-oriented way to call functions related to an instance of a type.

Consider a function `move_to` that changes a point's coordinates.
*   **Without methods (as a regular function):**
    You would define and call it like this:
    ```rust
    // Hypothetical regular function definition
    // fn move_to(point: &mut Point, new_x: f32, new_y: f32) {
    //     point.x = new_x;
    //     point.y = new_y;
    // }

    // fn main() {
    //     let mut p = Point { x: 0.0, y: 0.0 };
    //     move_to(&mut p, 1.0, 2.0); // Call as a regular function
    // }
    ```
    Notice how the `Point` instance `p` is passed as an argument.

*   **With methods:**
    The call becomes more concise and natural:
    ```rust
    // fn main() {
    //     let mut p = Point { x: 0.0, y: 0.0 };
    //     p.move_to(1.0, 2.0); // Call as a method on the instance 'p'
    // }
    ```
    Here, `move_to` is called directly on the instance `p`.

## The `impl` Block: Implementing Functionality for Types

To declare methods (and static methods) for a type in Rust, we use the `impl` keyword, short for "implementation". All functions defined within an `impl Point { ... }` block become associated with the `Point` type.

```rust
impl Point {
    // Methods and static methods for Point will go here
}
```

Within an `impl` block, we can define two kinds of functions:

1.  **Methods (Instance Methods):** These functions operate on a specific *instance* of the type. They always take a special first parameter that represents the instance, typically `self`, `&self` (an immutable reference to the instance), or `&mut self` (a mutable reference).
2.  **Static Methods (Associated Functions):** These functions are associated with the *type itself*, not a particular instance. They do not take `self` as a parameter. They are often used for constructors (like a `new` function to create instances) or other utility functions related to the type.

## Defining an Instance Method: `move_to`

Let's define a method called `move_to` that will modify the `x` and `y` coordinates of a `Point` instance.

```rust
// Inside the 'impl Point' block

// Method: This function operates on an instance of Point.
fn move_to(&mut self, x: f32, y: f32) {
    self.x = x;
    self.y = y;
}
```

Let's break down `fn move_to(&mut self, x: f32, y: f32)`:
*   `&mut self`: This is the key that makes `move_to` an instance method.
    *   `self` (lowercase) is a special keyword that refers to the instance of `Point` on which the method is being called.
    *   The `&mut` part signifies that this method takes a *mutable reference* to the instance. This is crucial because `move_to` needs to change the `x` and `y` fields of the `Point` instance. If we only needed to read data, we might use `&self` (an immutable reference), or if the method consumes the instance, just `self`.
*   `x: f32`, `y: f32`: These are regular parameters representing the new coordinates.
*   `self.x = x;` and `self.y = y;`: Inside the method, we use `self.` to access the fields of the instance and assign them the new values.

## Defining a Static Method: The `new` Constructor

Now, let's create a static method. A common use case for static methods is to provide a conventional way to create instances of a struct, often named `new`.

```rust
// Inside the 'impl Point' block

// Static method (also called an associated function):
// This function is associated with the Point type itself, not an instance.
fn new(x: f32, y: f32) -> Self { // 'Self' (uppercase) refers to the type Point
    Self {                     // This is equivalent to Point {
        x,                     // Shorthand for x: x
        y,                     // Shorthand for y: y
    }
}
```

Dissecting `fn new(x: f32, y: f32) -> Self`:
*   Notice the absence of `self`, `&self`, or `&mut self` as the first parameter. This is what distinguishes it as a static method.
*   `-> Self`: The return type is `Self` (uppercase S). `Self` is an alias for the type the `impl` block is for – in this context, `Point`. So, this function returns a new `Point` instance. You could equivalently write `-> Point`.
*   `Self { x, y }`: This creates and returns a new instance of `Self` (i.e., `Point`). The syntax `x, y` inside the struct literal is field init shorthand for `x: x, y: y`, where the field names and variable names are the same.

## Using Methods and Static Methods in `main`

Let's see how to use our newly defined `new` static method and `move_to` instance method in our `main` function.

```rust
fn main() {
    // Using the static method 'new' to create an instance.
    // Static methods are called using the type name followed by '::' (double colon).
    let mut p = Point::new(0.0, 0.0);
    // The line above provides an alternative to:
    // let mut p = Point { x: 0.0, y: 0.0 };

    // Using the instance method 'move_to' on the instance 'p'.
    // Instance methods are called using '.' (dot) notation.
    p.move_to(1.0, 2.0);

    println!("point: {:?}", p);
}
```

Key observations from `main`:
*   **Calling a static method:** `Point::new(0.0, 0.0)` is used to call the `new` static method. We use the type name (`Point`) followed by `::` (the path separator) and then the static method's name.
*   **Calling an instance method:** `p.move_to(1.0, 2.0)` calls the `move_to` method on the `p` instance. We use the instance variable (`p`) followed by `.` (dot) and the method's name.
*   **Mutability:** Because our `move_to` method takes `&mut self` (a mutable reference), the `p` variable must be declared as mutable using `let mut p`. If `p` were not mutable, the compiler would prevent us from calling `move_to` on it.

## Full Code Example and Output

Here's the complete code we've discussed:

```rust
#![allow(unused)]

#[derive(Debug)]
struct Point {
    x: f32,
    y: f32,
}

impl Point {
    // Static method - associated function
    // Used as a constructor to create new Point instances
    fn new(x: f32, y: f32) -> Self {
        Self {
            x, // Shorthand for x: x
            y, // Shorthand for y: y
        }
    }

    // Instance method
    // Modifies the Point instance it's called on
    fn move_to(&mut self, x: f32, y: f32) {
        self.x = x;
        self.y = y;
    }
}

fn main() {
    // Create an instance using the 'new' static method
    let mut p = Point::new(0.0, 0.0);

    // Call the 'move_to' instance method to modify 'p'
    p.move_to(1.0, 2.0);

    // Print the modified point
    println!("point: {:?}", p);
}
```

If you compile and run this code (e.g., if saved as `main.rs`, compile with `rustc main.rs` and run `./main`, or use `cargo run` in a Cargo project), the output will be:

```
point: Point { x: 1.0, y: 2.0 }
```

This output confirms that our `Point` instance `p` was successfully created at `(0.0, 0.0)` by `Point::new` and then its state was modified to `(1.0, 2.0)` by the `p.move_to` method call.

## Key Takeaways: Structs, `impl`, Methods, and `self`

Let's recap the core concepts:

*   **`struct`**: Defines a custom data type by bundling related data fields.
*   **`impl`**: The keyword used to define an implementation block where methods and associated functions for a type are declared.
*   **Method (Instance Method)**: A function associated with an *instance* of a type. Its first parameter is `self`, `&self`, or `&mut self`, representing the instance. Called using dot notation: `instance.method_name()`.
*   **Static Method (Associated Function)**: A function associated with the *type itself*, not a specific instance. It does not take `self` as a parameter. Called using the type name and double colons: `TypeName::function_name()`. Often used for constructors (e.g., `new`).
*   `self` (lowercase): A special keyword within an instance method that refers to the specific instance the method is being called on.
*   `Self` (uppercase): A special type alias within an `impl` block that refers to the type the `impl` block is for (e.g., `Point` in our example).
*   `&mut self`: A common pattern for the first parameter of an instance method that needs to modify the instance's data. It provides a mutable reference to the instance.
*   `#[derive(Debug)]`: A convenient attribute for automatically implementing the `Debug` trait, allowing easy printing of struct instances for debugging.

By understanding and utilizing methods and static methods, you can create more expressive, organized, and idiomatic Rust code, encapsulating behavior directly with the data types it operates on.