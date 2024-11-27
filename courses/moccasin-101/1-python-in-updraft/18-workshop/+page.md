## What Year Function Workshop

This workshop will walk you through creating a function in Python that will take two inputs: a year and a number of days. The function will then calculate and print the year after the given number of days has passed from the beginning of the year.

### Defining the Function

We'll start by defining our function, which we'll name `what_year`. This function will take two input parameters: `start_year` and `days`.

```python
def what_year(start_year, days):

```

### Calculating the Years Passed

Now we'll write some code to calculate how many years have passed from the starting year based on the `days` passed.

```python
def what_year(start_year, days):
    years_passed = days // 365

```

### Calculating the Target Year

Next we'll write code to calculate the `target_year`. This is the year after the `days` have passed from the `start_year`.

```python
def what_year(start_year, days):
    years_passed = days // 365
    target_year = start_year + years_passed

```

### Printing the Result

Now we need to write a conditional to determine whether to print the "still" version of the sentence, or to print out the year after the days have passed.

```python
def what_year(start_year, days):
    years_passed = days // 365
    target_year = start_year + years_passed

    if years_passed > 0:
        print(f"{days} days after Jan 1st, {start_year}, it will be the year {target_year}")
    else:
        print(f"{days} days after Jan 1st, {start_year}, it will still be the year {target_year}")
```

### Trying Out Our Function

We've successfully created our What Year function. Go ahead and try it out in the Updraft code editor.
