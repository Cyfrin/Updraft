## Modules and Uses Statement

Let's talk about modules and the uses statement in Vyper.

We've already gone over how to create a module. There's just one more thing to talk about.

### Initializing a Module With Dependencies

Sometimes, you'll encounter a module that uses other modules.

Vyper's module system allows this. However, it requires us to explicitly declare access to the imported module's state.

We will use the special "walrus" syntax to initialize the module that we're going to use.

We'll import `ownable_2step` and then we'll say `initializes: ownable`. This is the walrus syntax.

```python
import ownable_2step

initializes: ownable
```

Next, we'll initialize the `ownable_2step` module, and we'll have to use the walrus operator for this. Remember that this syntax might seem weird.

```python
initializes: ownable_2step[ownable] := ownable
```

This is just saying that the `ownable_2step` module is initialized by this module. This might be a little confusing, but it'll make sense once you see it in practice.

### Workshop

Here's a workshop for you:

1. Add a second module to `five_more`. We've already imported `favorites`, and we've initialized `favorites`.

```python
import favorites

initializes: favorites
```

2. Try to export functions from two different modules.

### The Uses Statement

This is one area we'll use an AI. You can go ahead and ask AI questions to solve this problem.

Remember, there is a `uses` statement in Vyper. You can read through the docs and understand how to use it to make a contract with a `uses` statement.

```python
import ownable

uses: ownable
```

We'll go over this more later in the course!
