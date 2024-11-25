## Functions / Methods: The "def" Keyword

We'll create a new section and talk about functions. Functions can be written by typing out the "def" keyword. A function is a self-contained, reusable chunk of logic.

Let's create a function that will print "hi" two times.

```python
def print_hi_two_times():
  print("hi")
  print("hi")
```

We can create a function by typing the "def" keyword, then give our function a name, for example, "print_hi_two_times". Open and close parentheses, and then a colon. We'll explain what the parentheses are for in a moment.

```python
def print_hi_two_times():
  print("hi")
  print("hi")
```

Now, hit enter and Google Colab will indent the function for us. The line doesn't start at the beginning of the line, it's tabbed in. This is because Python is an indentation-based language. We need to indent to type the body of the function.

```python
def print_hi_two_times():
  print("hi")
  print("hi")
```

So, the function name is "print_hi_two_times", and anything that's indented is considered part of this function.

```python
def print_hi_two_times():
  print("hi")
  print("hi")
```

If we print "hi" and "hi" again, but the second "hi" isn't indented, Python will see that it's not part of the function. Indenting both lines will make them part of the function. We now have two "hi" print statements.

```python
def print_hi_two_times():
  print("hi")
  print("hi")
```

If we run the cell, nothing happens. We don't see any "hi"s printed out. To run the function, we can copy and paste it, adding parentheses, and then run the cell.

```python
print_hi_two_times()
```

This will print "hi" twice. The line with "print_hi_two_times()" is considered an invocation, or a calling of the function. The definition of the function is "def print_hi_two_times():", where we tell Python what to do when somebody calls the function. The line with "print_hi_two_times()" is where we call the function. We're essentially saying, "Hey, do this thing."

We can also create functions that take parameters.

```python
def print_some_word(my_word):
  print(my_word)
```

This function takes a "my_word" parameter and prints it out. We can call this function, passing in the word "miss you mom!"

```python
print_some_word("miss you mom!")
```

This will print out "miss you mom!". The "miss you mom!" is passed in as a parameter and assigned to the "my_word" variable, which is then printed.

We can also do more interesting things with math.

```python
def add_six(my_number):
  print(my_number + 6)
```

This function takes a "my_number" parameter, adds six to it, and then prints the result.

```python
add_six(10)
```

We can call the function, passing in 10, which should print out 16. Running the cell confirms this.

We can also create functions that take multiple parameters.

```python
def add_together(my_first_number, my_second_number):
  print(my_first_number + my_second_number)
```

This function takes two parameters, adds them together, and prints the result.

```python
add_together(10, 20)
```

Calling the function with 10 and 20 as parameters should print out 30. Running the cell confirms this.

This concludes the lesson on functions.
