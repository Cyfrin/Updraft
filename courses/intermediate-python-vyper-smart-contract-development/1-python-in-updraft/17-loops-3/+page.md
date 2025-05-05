## Loops: For-Each

We've looked at `while` loops and `for` loops. Let's look at the `for-each` loop.

Let's say we have a list:

```python
my_list = [0, 1, 2]
```

We could loop through all the elements in this list by saying `for` each element `in` my list:

```python
for element in my_list:
  print("My number is " + str(element))
  print("Done!")
```

We can see this is going to loop through each element in the list. So if we hit play we see `My number is 0`, `My number is 1`, and `My number is 2`.

Let's add some more numbers to our list:

```python
my_list = [0, 1, 2, 3, 5, 7]
```

And then hit play. Now, we see our original numbers 0, 1, 2, and then our new numbers 3, 5, and 7.

Now, let's look at how to use a loop for repeating a specific task a large number of times.

Let's say we wanted to print "Hi" 1,000 times. It would be tedious to write:

```python
print("Hi")
print("Hi")
print("Hi")
```

1,000 times. Is there a better way?

There sure is! In Python, we can do repetitive tasks with something called "loops".

We could do something as simple as `for` number `in` range 1,000 print:

```python
for number in range(1000):
  print("My number is " + str(number))
  print("Done!")
```

I recommend you don't do this, because you're going to get a massive cell that's outputted here. You know what, screw it. Let's try it. `For` number `in` range 1,000. Let's go ahead and hit play. If we scroll down, we see just a ton of numbers. Some of this was even truncated and we'd have to scroll for a long time. But you can see it's printing out every single number between 0 and 999. So let's leave this as three so it's a lot more digestible.
