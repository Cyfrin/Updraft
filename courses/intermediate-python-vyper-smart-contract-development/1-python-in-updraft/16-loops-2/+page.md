## Loops: For-Range 

We've learned about while loops, but there are other ways to loop, too. Let's look at a different kind of loop called a for-range loop. 

We previously used the code:
```python
my_number = 0
while my_number < 3:
  print("My number is " + str(my_number))
  my_number = my_number + 1
print("Done!")
```

We can rewrite this using a for-range loop, which is more concise than the while loop:
```python
for number in range(3):
  print("My number is " + str(number))
print("Done!")
```

The `for` keyword lets Python know that we are going to use a for-range loop. The loop will iterate over the numbers in `range(3)` - that is, the numbers 0, 1, and 2. For each number, it will execute the code in the loop block (which prints "My number is" plus the number).  Let's run this code and see what happens.

We can see the output:
```
My number is 0
My number is 1
My number is 2
Done!
```

So, `range(3)` says to loop from 0 to 2.  We can see the result in the output: the code prints out "My number is" plus the number 0, then 1, then 2.

This is a much more concise way to accomplish the same result as the while loop we used before. In the for-range loop, we don't need to worry about incrementing a counter variable because Python does that for us automatically. 
