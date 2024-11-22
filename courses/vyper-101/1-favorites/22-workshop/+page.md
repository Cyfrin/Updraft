## Workshop Challenge

We've gotten pretty far into our code. Now is a great time to pause and try a challenge. 

Can you get the `list_of_numbers` to return 8, and the `list_of_people` to return Wong instead of 0?

**Hint:** You might have to add something to the contract, and then interact with the contract.

**Pause the video and try to figure this out!**

## Solution

If your strategy was to just call `add_person` with Wang and 8 a bunch of times, that would work.  We'll try that.

```bash
add_person Wang 8
```

We'll click `add_person` a few times here, and it looks like we are just spamming it!  Oh, we've filled up the array!  Now the index is too much. 

Well, now we're stuck with a list of people that just says `8 Wong` for every single person.  This is definitely one way to do it, but it's not very elegant.  We'll look at other, more effective ways to do this in future lessons. 
