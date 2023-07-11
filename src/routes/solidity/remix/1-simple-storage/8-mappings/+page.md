---
title: Solidity Mappings
---

*Follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/o8lzK640cuA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>



## Understanding the Problem with Arrays

Imagine you have a contract that holds a list of individuals along with their favorite numbers:

```json
[
    ("Pat", 7),
    ("John", 8), 
    ("Mariah", 10), 
    ("Chelsea", 232)
]
```

Now, if you want to know Chelsea's favorite number, you will have to run a loop through the array. This might seem fine when managing data of a few individuals, but imagine scaling this up to 1,000 or more. Constantly iterating through large arrays to locate a specific element can be incredibly time-consuming and inefficient.

Take the scenario:

```json
Oh, what was Chelsea's favorite number?
    Array element at 0 - Pat.
    Array element at 1 - John.
    Array element at 2 - Mariah.
    Array element at 3 - Chelsea => favorite number: 232.
```

Is there a better data structure that can improve this access process and make finding individual information a breeze?

Meet `mapping`.

## Mapping: A Simpler Way to Link Information

Think of mapping in coding like a dictionary: each word in a dictionary has a unique meaning or a chunk of text associated with it. Similarly, a mapping in code is essentially a set of keys with each key returning a unique set of information. Thus, if you look up a word or a 'string' in coding terms, the corresponding output will be the text or 'number' associated only with that string.

A typical way of defining a mapping starts with the keyword 'mapping', the key type, the datatype of data to be linked with each key and the visibility type. Let's create a mapping type:

```javascript
mapping (string => uint256) public nameToFavoriteNumber;
```

With this, we have constructed a mapping that maps every string to a uint256 number emulating a link between a person's name and their favorite number. Now, rather than iterating through an array, we can directly enter the name and get their favorite number.

## Augmenting the AddPerson Function

Previously, we had an `addPerson` function that enabled us to add someone to our list. Let's modify this function to update our mapping every time a person is added:

```javascript
// Adding someone to the mapping
nameToFavoriteNumber[_name] = _favoriteNumber;
```

This line will add a person's name to the mapping where each name will point to their favorite number. The result? A far quicker way to access a person's favorite number just by knowing their name.

<img src="/solidity/remix/lesson-2/mappings/mappings1.png" style="width: 100%; height: auto;">


## A Test Run

<img src="/solidity/remix/lesson-2/mappings/mappings2.png" style="width: 100%; height: auto;">


The last example illustrates an important point. In a mapping, the default value for all key types is zero. Therefore, if you look up a key (person's name in this case) that hasn't been added yet, it will return the default value which is zero.

## Wrapping Up

In conclusion, mapping in code can be a versatile tool to increase efficiency when attempting to find elements within larger lists or arrays. By streamlining the process with the use of a mapping, you can avoid the woes of constant iteration and instead achieve results more directly. As such, mapping is a useful tool every programmer should have in their toolbox.