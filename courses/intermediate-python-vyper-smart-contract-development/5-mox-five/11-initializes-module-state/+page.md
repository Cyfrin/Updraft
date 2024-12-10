## Initializing Module State

We can initialize a module's state using the `initializes` keyword in Vyper. The `initializes` keyword declares where a module's storage is located in the contract's storage layout. If the module has an `_init()` function, the `initializes` keyword will create a requirement that the module's `_init()` function is invoked. We can use this keyword to make sure the module's state is set up before interacting with it.

We can also reference a module's state using the `uses` keyword. This approach is more advanced and commonly used by library designers. The `uses` statement allows us to utilize another module's state without directly initializing it. This is a good approach when we are using libraries that have pre-defined states that we don't want to modify.

Let's look at an example of initializing a module using the `initializes` keyword.

We have a module called `favorites` that has a few state variables:

```python
struct Person:
  favorite_number: uint256
  name: String[100]

my_name: public(String[100])
my_favorite_number: public(uint256) # 7
list_of_numbers: public(uint256[5]) # 0, 0, 0, 0, 0
list_of_people: public(Person[5])
index: public(uint256)
name_to_favorite_number: public(HashMap[String[100], uint256])
```

The `favorites` module also has an `_init()` function:

```python
@deploy
def _init_():
  self.my_favorite_number = 7
  self.index = 0
  self.my_name = "YOUR NAME!"
```

We can initialize the `favorites` module from our contract using the `initializes` keyword:

```python
initializes: favorites
```

To access the state variables, we can use the following code:

```python
@deploy
def _init_():
  favorites._init_()
  print(favorites.my_favorite_number)
```

When we compile the code, the `favorites` module's state variables will be initialized, and we will be able to access them. We'll get a warning message:

```bash
  "print should only be used for debugging!", node)
```

Since the `favorites` module has no view functions, we cannot directly call any of them. However, if we wrap a variable with the `public` keyword, it will implicitly create an external view function.

We also have a module called `five_more` that has no `_init()` function and we can access its state variables in the same way:

```python
@deploy
def _init_():
  favorites._init_()
  print(favorites.my_favorite_number)
  print("HI FROM FIVE MORE!")
```

We can access a module's state variables by referencing them using the module name and the variable name:

```python
print(favorites.my_favorite_number)
```

The `uses` statement provides an alternative approach to initializing a module, but we will not cover that here.

Let's review the major topics discussed in this lesson. We learned how to initialize a module's state using the `initializes` keyword. We also reviewed how to access the module's state variables. Finally, we learned that we can use the `public` keyword to implicitly create an external view function. This approach provides a more secure way of accessing a module's state.
