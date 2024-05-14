---
title: Solidity Arrays & Structs
---

_You can follow along with the video course from here._

<a name="top"></a>
## Introduction
The `SimpleStorage` contract can be used to store, update, and view a single favourite number. In this lesson we'll adapt its code to store multiple numbers, so more than one person can store values. We'll learn how to create a list of favourite numbers using **arrays** and we'll investigate the keyword `structs` for creating new types in Solidity.

## Arrays
First we need to replace the `uint256 favoriteNumber`  with a list of `uint256` numbers:

```solidity
uint256[] list_of_favorite_numbers;
```

The brackets indicate that we have a list of `uint256`, an array of numbers. If we want to initialize this array we can do so by specifying its content:

```solidity
Array_Example_list_of_favorite_numbers = [0, 78, 90];
```

🗒️ **NOTE** <br>
Arrays are zero-indexed: the first element stays at position zero (0), the second stays position (index) 1, and so on.

## Struct
The issue with this method is that we cannot link the owner with its favorite value. One solution is to establish a new type using the `struct` keyword, named `Person`, which is made of two attributes: a favorite number and a name.

```solidity
struct Person {
    uint256 my_favorite_number;
    string name;
}
```

🚧 **WARNING** <br>
Rename the variables `favorite_number` to avoid name clashes

From this struct, we can instantiate a variable `my_friend` that has the type `Person`, with a favorite number of seven and the name 'Pat'. We can retrieve these details using the getter function that was generated thanks to the `public` keyword.

```solidity
Person public my_friend = Person(7, 'Pat');
/* equals to 
Person public my_friend = Person({
    favoriteNumber:7,
    name:'Pat'});
*/
```

## Array of Struct

Creating individual variables for several people might become a tedious task.We can solve this issue combining the two concepts we just learned about: arrays and structs. 

```solidity
Person[] public list_of_people; // this is a dynamic array
Person[3] public another_list_of_three_people; // this is a static array
```

When using a **dynamic** array, we can add as many `Person` objects as we like, as the size of the array it's not static but can grow and shrink. We can access each `Person` object in our array by its index.

### Populating the array

To add people to this list we can create a function:

```solidity
function add_person(string memory _name, uint256 _favorite_number) public {
    list_of_people.push(Person(_favorite_number, _name));
}
```

`add_person` is a function that takes two variables as input - the name and favourite number of the person. It creates first a new `Person` object and then it pushes it to our `list_of_people` array.

### Conclusion

With these features, our Solidity contract is now able to store multiple favourite numbers, each tied to a specific person. The `add_person` function will create a new object `Person` and add it to the state variable `list_of_people`. We can view then each person's name and his favorite number by accessing the Person object via the array index.


## 🧑‍💻 Test yourself
1. 📕 Define the difference between a dynamic array and a static array. Make an example of each.
2. 📕 What is an array and what is a struct?
3. 🧑‍💻 Create a smart contract that can store and view a list of animals. Add manually three (3) animals and give the possibility to the user to manually add an indefinite number of animals into the smart contract.

[Back to top](#top)