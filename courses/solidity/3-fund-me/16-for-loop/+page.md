---
title: For Loop
---

_Follow along this chapter with the video bellow_



Hey there, awesome learners! In the previous lesson, we've managed to get the basics of the math for our `FundMe` contract. Up to now, people can send us money and we keep track of them - a crucial foundation for our contract. Now, we are ready to move to the next step of our project: withdrawing the accumulated funds. After withdrawing, we'll also reset all the mappings back to zero. We'll accomplish this using a concept known as a for loop.

## Understanding for Loops

In many programming languages, you'll encounter the concept of a for loop. Essentially, a for loop enables us to loop through a list or execute a block of code a designated number of times.

For instance, consider this list:

```js
List_Example = [1, 2, 3, 4];
```

The elements of the list are the numbers 1 through 4, with indices ranging from 0 through 3; i.e., 1 is at the 0th index, 2 is at the first index, and so forth.

To access all the elements in this list, we would loop from 0 to 3. You can identify elements via their indexes.

This looping process uses the `for` keyword. A typical `for` loop structure in programming languages can initialize at some starting index, iterate until an end index, and increment by certain steps. For instance, starting at index 0, ending at index 10, and incrementing by 1 each time would get you:

```
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

However, starting at the 3rd index, ending at the 12th index, and incrementing by 2 each time would get you:

```
3, 5, 7, 9, 11
```

In this process, we can capture the essence of the `for` loop: repeat a set of actions for a determined sequence of values.

## Using for Loops in Solidity: Fund Me Contract

Let us implement this concept in our project.

```js
uint256 funderIndex;
for(funderIndex = 0; funderIndex < funders.length; funderIndex++) {
    address funder = funders[funderIndex];
    addressToAmountFunded[funder] = 0;
    }
```

Let's dissect this block of code. The loop begins at the 0th index and traverses through the `funders` array until it reaches the final element. With each iteration, it accesses the `funderAddress` at the current index and then resets the corresponding funding amount in the `addressToAmountFunded` mapping to zero, effectively clearing the record of the associated donation.

<img src="/solidity/remix/lesson-4/forloop/forloop1.png" style="width: 100%; height: auto;">

Additionally, we have used two shortcuts in our code.

1. `funderIndex++`: Instead of writing `funderIndex = funderIndex + 1`, we can use the `++` operator to simplify the increment by one within the loop.
2. `+=`: Another handy shorthand is `+=`, used when you want to add something to an existing value. Instead of writing `x = x + y`, you can write `x += y`.

Let's summarize the for loop process in our case. We start from `funderIndex` 0, get the address of the funder at the 0th position in our funder array, and set the amount they funded to zero in our mapping. After that, we increment `funderIndex` by 1 and check whether it is still less than the total number of funders. We then get the address of the funder at the first position, again set their funding amount to zero, and continue this process until `funderIndex` equals the total number of funders.

With our `withdraw` function, we can now access and withdraw the money our contract has raised. Once we've withdrawn the money, we clear all previous records and ready ourselves for new transactions. This gives us a clean slate, symbolising the precise management of funds in our financing smart contract.

This is just an illustration of how important and useful loops can be in programming and development of smart contracts. Indeed, familiarity with loops is a crucial aspect of becoming a competent developer - they help us write clean, efficient, and repetitive code blocks.

Stay tuned for more updates on our developing smart contract!
