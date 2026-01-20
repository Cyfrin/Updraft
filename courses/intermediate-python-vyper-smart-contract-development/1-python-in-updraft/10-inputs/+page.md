## Inputs and Strings

In this lesson, we're going to learn about how to get user input and work with strings in Python. 

We can ask users for information by using the `input()` command. Let's create a new code section and write the following: 

```python
input("what is your name?")
```

We can then execute the cell, and see how Python is prompting us to enter our name. Let's type "Patrick" in the box and hit enter. It will display the input we provided.

We can save the user's input into a variable. We can do that with this code:

```python
name = input("what is your name?")
print("My name is " + name)
```

Python is again prompting us to enter a name. If we enter "Patrick" and execute the code, it will print out:

```python
My name is Patrick
```

The plus sign in the code is a concatenation operator. This is a way of combining strings together.

We can also use something called an "f-string" to combine strings. Let's add the following to the existing code section:

```python
print(f"{name} is my name")
```

Now, when we execute the cell, it will prompt us for a name. If we enter "Patrick", the code will output:

```python
My name is Patrick
patrick is my name
```

Let's break down this code.

We're using `print()` to display a string. We're starting our quotes with the letter "f", which is used to denote an f-string. Inside our quotes, we have a set of curly brackets that contain the variable name.

The f-string will take the value of the variable that we entered as input and insert it into the f-string. In this case, the value of the `name` variable is "Patrick", so it's inserted into the curly brackets. 
