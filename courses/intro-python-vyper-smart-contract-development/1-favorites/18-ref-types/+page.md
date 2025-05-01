## Reference Data Types

We will be going over reference types in Vyper. These are used to store data, but are not copied when assigned as a value. 

We will be looking at several reference types in Vyper: fixed-sized list, mappings, and structs. 

### Fixed-Sized List

We can use a fixed-sized list to store data of a given type. We first declare the type, then put the fixed size in brackets, as follows:

```python
nums: public(uint256[10])
```

We can read and write to this list. To get the value in index 0, we use:

```python
self.nums[0]
```

And to set the value in index 0 to 123:

```python
self.nums[0] = 123
```

We can also set another value in index 1 to 456:

```python
self.nums[1] = 456
```

### Mappings

Mappings store data based on a key value.  The first value type will be the key, and the second value type will be the data stored. Let's create a mapping called "myMap":

```python
myMap: public(HashMap[address, uint256])
```

We can access and store data in a mapping. To get the value stored at the address of "msg.sender":

```python
self.myMap[msg.sender]
```

Let's store the value 1 in this mapping:

```python
self.myMap[msg.sender] = 1
```

We can also change the value stored at "msg.sender" to 11:

```python
self.myMap[msg.sender] = 11
```

### Structs

Structs are custom data types. Let's declare a struct called "Person".  This struct has a name and an age:

```python
struct Person:
    name: String[10]
    age: uint256
```

We can declare a state variable of type struct:

```python
person: public(Person)
```

Let's store data in this state variable:

```python
self.person.name = "vyper"
self.person.age = 33
```

Then, we can copy this state variable into memory by declaring a variable of type struct and assigning the state variable:

```python
p: Person = self.person
```

We can then change the name to "solidity" and the age to 22, but this will only update the value stored in memory, not the state variable.  

```python
p.name = "solidity"
p.age = 22
```

We can compile this code using the Vyper compiler and then deploy the contract. 

To compile the code, we can click on the Vyper icon. Then click "Compile Ref.vy". The contract will be compiled. Now, we can deploy the contract.

We can click on the "Deploy & run transactions" tab. Then we can click on the name of the contract file, which is Ref.vy. Next, we can click on the "Deploy" button to deploy the contract.

We can see the state variables under the "Deployed Contracts" tab. We have "myMap", "nums", and "person".

We can call the state variables to check what values are stored. We can call the state variable "nums" with index 0:

```bash
nums(0)
```

We see it returns 0. This is because we did not set any values for index 0. Let's now call the state variable "nums" with index 1:

```bash
nums(1)
```

We get 456, because we set the value for index 1 to 456.

Next, we can call the state variable "person":

```bash
person
```

We see it returns "name": "vyper" and "age": 33, because we set those values in the state variable.

## Summary

This is how we can store data in different reference types in Vyper. Remember that when using structs or mappings, we need to understand how these are copied. We can copy the value in a state variable into memory using a variable, but this only copies the value at that moment in time, not a reference to the state variable.  So, if the state variable is updated, the value stored in the memory variable won't be updated. 
