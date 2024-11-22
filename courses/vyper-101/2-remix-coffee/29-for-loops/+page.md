## For Loops

In this lesson we will explore the `for` loop in Vyper.

We will first use a for loop to iterate over a range of integers. We can use the `range` function to specify the starting and ending index of the loop.

```python
@external
@pure
def for_loop() -> DynArray[uint256]:
    arr: DynArray[uint256, 10] = []

    for i: uint256 in range(5):
        arr.append(i)

    return arr
```

In the above code, we are using a for loop to iterate over the first 5 integers. For each iteration, we append the current integer to the `arr`. Finally, we return the `arr`.

We can also iterate over a fixed-size list.

```python
@external
@pure
def for_loop_list() -> DynArray[uint256]:
    arr: DynArray[uint256, 10] = []
    nums: uint256[4] = [11, 22, 33, 44]

    for i: uint256 in nums:
        arr.append(i)

    return arr
```

In this code, we are iterating over the fixed-size list `nums` and appending each element to the `arr`.

You can also skip iterations using the `continue` keyword. For example:

```python
@external
@pure
def for_loop_skip() -> DynArray[uint256]:
    arr: DynArray[uint256, 10] = []
    nums: uint256[4] = [11, 22, 33, 44]

    for i: uint256 in nums:
        if i == 2:
            continue
        arr.append(i)

    return arr
```

In the code above, we are iterating over the list `nums`. If the current element is equal to 2, the `continue` keyword will skip the rest of the code for that iteration and move on to the next iteration.

You can also break out of a for loop early using the `break` keyword.

```python
@external
@pure
def for_loop_break() -> DynArray[uint256]:
    arr: DynArray[uint256, 10] = []
    nums: uint256[4] = [11, 22, 33, 44]

    for i: uint256 in nums:
        if i == 2:
            continue
        if i == 4:
            break
        arr.append(i)

    return arr
```

In this code, we are iterating over the list `nums`. If the current element is equal to 2, the `continue` keyword will skip the rest of the code for that iteration and move on to the next iteration. If the current element is equal to 4, the `break` keyword will exit the for loop.

To reset the elements of a hashmap to zero, we can use a for loop.

```python
for funder: address in self.funders:
    self.funder_to_amount_funded[funder] = 0
```

The code above iterates through each address in the `self.funders` list and sets the corresponding value in the `self.funder_to_amount_funded` hashmap to 0.

We can also iterate through the `self.funders` list using a for each loop.

```python
for funder: address in self.funders:
    self.funder_to_amount_funded[funder] = 0
```

Using a for loop to reset the values in a hashmap will use a lot of gas. You should carefully consider the gas costs and trade-offs of different data structures when designing your smart contracts.
