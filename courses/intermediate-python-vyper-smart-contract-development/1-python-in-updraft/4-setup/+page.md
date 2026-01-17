## Python Crash Course

This section will be a Python Crash Course. We will be using the tool Google Colab, which is an online, browser-based IDE. It's great for working with Python.

You can see an example of the final code from the tutorial in the repository, but we will be starting from a brand new notebook to ensure you can practice the code.

To access Google Colab, you will need a Google account.

To get started with Google Colab, we will need to go to the Google Colab site and create a new notebook.

**Creating a New Notebook**

You will need to select **File** and then **New Notebook in Drive**. This will create a new notebook for us.

**Naming the Notebook**

We can name our notebook whatever we want, but I will name my notebook "Updraft Python".

**Jupyter Notebooks**

Google Colab uses what are called Jupyter Notebooks. These are essentially a way to combine Markdown text, Python code, and other elements into a single document.

The way this works is, you have these cells in a Jupyter Notebook. A Jupyter Notebook is made up of different types of cells.

**Cells**

You can run Python code in a Jupyter Notebook by creating a code cell, and running that code. You can also add text, or Markdown, to the cells as well. We will be using code cells to run all of our Python code.

To execute a code cell, you simply click the play button.

**Terminal Commands**

We will also be using terminal commands. We will format these terminal commands in a code block, so you can copy and paste them. For example, the command to list the contents of a directory, which is "ls", will be formatted like this:

```bash
ls
```

**Example Code**

The code we're going to execute is a simple "Hello, World" example.

```python
print("Hello, World")
```

This will print "Hello, World" to the console output.

**Variables**

We can also assign variables, like this:

```python
my_variable = 7
```

This will assign the value 7 to the variable my_variable.

**Data Types**

Python comes with many data types, including integers, strings, and booleans.

```python
my_number = 10
my_boolean = True
my_string = "hello!"
```

**Type Hints**

We can also use type hints in Python. Type hints are a way to indicate the expected data type of a variable.

```python
my_typed_number: int = 9
```

This indicates that the variable my_typed_number is expected to be an integer.

**Updating Variables**

We can also update variables, like this:

```python
my_number = 7
```

This will assign the value 7 to the variable my_number.

**Lists**

Variables in Python can hold lists of elements.

```python
my_list: list = [7, "cat", True]
```

**Accessing List Elements**

In Python, lists are "0 indexed." This means that the first element in a list has an index of 0, the second element has an index of 1, and so on.

For example:

```python
my_list = [7, "cat", True]
my_list[1] = "dog"
print(my_list)
```

The output will be:

```python
[7, "dog", True]
```

**Casting**

You can convert data types from one to another in Python using casting.

```python
year = "2025"
int_year = int(year)
added_year = int_year + 25
print(added_year)
```

The output will be:

```python
2050
```

**Math Operations**

You can also do math in Python, like this:

```python
print("Add")
my_number = 5 + 5
print(my_number)
print("Subtract")
my_number = 5 - 5
print(my_number)
```

**Code Blocks**

All of the code blocks in this tutorial will have code formatted on new lines, like this:

```python
print("Hello, World")
```

Be sure to practice the code shown in this tutorial to get a good understanding of Python basics.
