## Gas Profiling

Let's talk about gas profiling.  We'll start by looking at the differences in gas cost between storage variables and constant variables. 

So, to do some testing, let's go ahead and run a command in our terminal:

```bash
mox test --help
```

We can see in the help output there is a `gas-profile` command here where we can get an output on gas use for all of our test functions.  So, if I just run:

```bash
mox test --gas-profile
```

This will give us a large output showing how much gas these functions cost.  

This output is kind of borderline impossible to read.  So what we might do is run this again with a little zoom way the heck out.  Now, I'm going to run this command, and zoom way back in.  We can see things a little bit better now. 

So, we have count, mean, median, standard deviation, min, and max.  If we scroll down into this section here and scroll over, we can see how much calling each one of these functions costs, including the functions up here, the different lines, and, of course, our different functions. 

Down here, we can see, first off the count, which is how many times in the test, or the test suite, it was called.  Then, we have the average gas cost, the median gas cost, standard deviation, the minimum, and the maximum.  And, it's literally for like every line of computation here, which is kind of crazy. 

Okay, raw call owner. Let's look at this one.  This one was 19 gas on average. Okay, cool. 

So, now let's go back here. Let's do a little refactoring.  You don't have to do this, by the way. 

Let's get rid of it being immutable.  So, the owner is no longer immutable. So, we'll do `self.owner` here. Any place we see owner, where else is owner? Owner, `self.owner`, we'll do `self.owner` here. 

Okay, great. Remember, this was 19 gas when it was a constant or, excuse me, 19 gas when it was immutable. 

Let's rerun this again to `gas.txt`:

```bash
mox test --gas-profile > gas.txt
```

Now, we're using `self.owner`. Oh, I got to Sorry, I got to zoom way out and run this. Zoom zoom zoom up up. Run it. Zoom way back in.  Now, let's see.  Now it costs more.  Now it's 21 here. 

So, we can see that we actually ended up spending more gas by having it be a storage variable. So I'm actually going to move it back to immutable.  So, if you want to check how much more or less gas your contract uses, you can use that `gas-profile` command. 
