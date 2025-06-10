## Dynamic vs. Fixed Arrays in Vyper

We're going to create a new Vyper contract to demonstrate the differences between a **dynamic array** and a **fixed-size array.**

### Dynamic Array

First, let's declare a dynamic array:

```vyper
dynamic_array: public DynArray[uint256, 100]
```

The array type is `DynArray` and has a maximum size of 100. We set this array to be `public` so that it's viewable from outside the contract.

### Fixed-Size Array

Now, let's create a fixed-size array:

```vyper
fixed_sized_array: public uint256[100]
```

The fixed-size array is simply a list of 100 `uint256` values. Note that we can't set the size of the array to be dynamic like we did with the `DynArray.`

### `len` Keyword

We can use the `len` keyword to determine the length of a dynamic array. Let's create a function called `dyn_array_size` that returns the length of our dynamic array:

```vyper
@external
@view
def dyn_array_size() -> uint256:
    return len(self.dynamic_array)
```

### Adding Elements to Arrays

We can add elements to our arrays with the `append` function. Let's create a function called `add_to_array` that adds an element to both arrays:

```vyper
@external
def add_to_array():
    self.fixed_sized_array[self.index] = 1
    self.dynamic_array.append(1)
    self.index = self.index + 1
```

We also need to declare an index variable:

```vyper
index: uint256
```

### Dynamic Array Length

We can see that the dynamic array length is initially 0 because it's initialized as an empty array:

```vyper
#[ ]
```

However, after we append an element, the length increases to 1:

```vyper
#[1]
```

We can append as many elements to the dynamic array as long as the maximum size of 100 is not exceeded.

### Fixed Array Length

Now, let's try to append an element to our fixed array. We'll create a function called `fixed_array_size` that returns the size of the fixed array:

```vyper
@external
@view
def fixed_array_size() -> uint256:
    return len(self.fixed_sized_array)
```

We can compile this code:

```bash
vyper arrays_compared.vy
```

We can now deploy the contract. Let's run the `add_to_array` function to add an element to our dynamic array:

The dynamic array length now reflects the change to 1.

```vyper
#[1]
```

Now, let's try to run the `add_to_array` function again.

We can see that the dynamic array length is now 2.

```vyper
#[1,1]
```

However, the fixed array length is still 1.

### Fixed Array Limitations

We can try to append to the fixed array:

```vyper
self.fixed_sized_array.append(1)
```

But we'll get an error!

We cannot append to fixed-size arrays because the length is determined at the time the array is declared. However, we can modify existing elements.

### Conclusion

The difference between dynamic and fixed-size arrays is whether they can change in size during runtime. Fixed-size arrays are more efficient than dynamic arrays, but we lose flexibility. Dynamic arrays allow for flexibility but can be less efficient.
