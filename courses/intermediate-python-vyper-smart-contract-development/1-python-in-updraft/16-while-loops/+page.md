## `while` Loops

We'll learn about `while` loops.

Let's say we wanted to print out the word "hi" a thousand times. It would be incredibly tedious to write "hi" a thousand times. 

There sure is! In Python, we can do repetitive tasks with something called loops.  And, there are many different types of loops that we can use.

The first one is going to be the `while` loop.

Let's say we have a variable called `my_number` that starts at 0. So, `my_number` is set to 0.

We can then do something like:

```python
my_number = 0
while my_number < 3:
    print("My number is " + str(my_number))
    my_number = my_number + 1
print("Done!")
```

And, as long as `my_number` stays less than 3, Python will just keep looping and running this. 

Now, don't hit the play button yet, because Python would technically run into an infinite loop because `my_number` would always be less than 3, since `my_number` is never incremented. 

So, first we'll say:

```python
print("My number is " + str(my_number))
```

Then, we'll say:

```python
my_number = my_number + 1
```

And, this is how every single time we run this loop, we add 1 to the number here.

We will then print out "Done!".

Notice again that this `print("Done!")` is outside of the `while` loop because it's not indented. 

So, if we hit play here, and scroll down, you'll see we get "My number is 0", "My number is 1", "My number is 2", and then, "Done!". 

You see it stops because once `my_number` is set to 3, `my_number` is no longer strictly less than 3, and it will execute.

So, we can even kind of visualize this a little better by saying, okay, `my_number` starts off as 0. Then, we enter the loop. `My_number` is 0, so it says, "while 0 is less than 3", 0 is less than 3, so it goes into the loop. Print out "My number is " Again, it's 0, so we would print out 0. And, then `my_number` equals 0 + 1, so then, `my_number` would be set to 1. 

So, "while 1 is less than 3" Print "My number is 1". And, then `my_number` equals 1 + 1, which is now 2. So, then `my_number` is then set to 2.

And, we would read it as "while 2 is less than 3" which it is. We would print out "My number is 2". `my_number` equals 2 + 1, so `my_number` now equals 3.

Then, we would hit "while 3 is less than 3." Now, 3 is not less than 3, 3 is equal to 3, so it will skip executing the loop and just print out the "Done!". 

So, that's how you can think of walking through these `while` loops here. 

And, let's just revert everything back and we'll hit play. 

And, boom. 
