## AI Tutor: Claude 3.5

We are going to start working with AI agents. Claude 3.5 is a great AI agent to get started with, but so is Chat GPT 4.0.

Claude is especially helpful for beginners, but when things get more advanced it might break down. Let's start with a simple question for Claude:

```python
What is this line representing in Vyper?
```

To tell Claude we are writing a code block, we enter three backticks, then hit Shift-Enter. Then, we paste our code:

```python
nums: public(uint256[10])
```

and press Enter.

Claude tells us this line declares a public state variable called `nums`, and that it is an array of 10 unsigned integers. It also tells us that `public` means the array can be read externally and a getter function is automatically generated.

Next, we ask Claude:

```python
What even is an array?
```

Claude responds:

An array is a data structure that stores multiple elements of the same type in a contiguous memory location. It allows you to:

- Store multiple values under a single variable name
- Access elements by their index (position)
- Have a fixed or dynamic size depending on the programming language
- Organize and efficiently manage collections of data

Claude also gives us an example:

```python
[10, 20, 30, 40, 50]
```

and explains that the first element is 10 and the third element is 30.

We are going to ask Claude one more question:

```python
Ok, what's an example of an array of 10 like in the Vyper above?
```

Claude gives us this example:

```python
nums: public(uint256[10]) = [
  100, # index 0
  200, # index 1
  300, # index 2
  400, # index 3
  500, # index 4
  600, # index 5
  700, # index 6
  800, # index 7
  900, # index 8
  1000 # index 9
]
```

Claude explains that if we wanted to access the element in position 2 we would use `nums[2]` which would return 300.

There are a lot of different AI agents out there, with different strengths and weaknesses. You can explore the ones that are free and see what you prefer. GitHub Copilot is another great one.
