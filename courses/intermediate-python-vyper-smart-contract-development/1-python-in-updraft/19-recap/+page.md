## Recap

In this lesson, we learned how to code using Python notebooks on Google Colab. This is a commonly used method for data scientists and portfolio managers, especially those who work at hedge funds or asset managers.  

In a previous lesson, we learned about the basics of Python. We were able to write a function to calculate how many years have passed after January 1st of a given year:

```python
def what_year(start_year, days):
  # Calculate how many years have passed (integer division)
  years_passed = days // 365
  target_year = start_year + years_passed

  # Technically we might be off by a day, but we are going to ignore that 
  if years_passed > 0:
    print(f"{days} days after Jan 1st, {start_year}, it will be the year {target_year}")
  else:
    print(f"{days} days after Jan 1st, {start_year}, it will still be the year {target_year}")

what_year(1985, 376)
what_year(1985, 200)
what_year(1985, 1098)
```

We've learned a lot in this crash course, and if you were able to come up with the solution to our problem, give yourself a round of applause. It took me a long time to learn how to code Python and learning the basics here is absolutely fantastic. There's a lot more for us to learn.  

It's a great time to take a break, go get some coffee, go for a walk, go to the gym, and I'll see you soon.  

What we're going to do next is, in my opinion, the hardest part of any Python tutorial.  I feel like this is the part of Python tutorials that most educators gloss over because setting up your Python environment on your local computer can be incredibly challenging. So we're going to spend the time to make sure we get you set up correctly so that you can be successful.   

I do actually want you to take at least a 30 minute break before going to this next section because I want some of the information here to settle in. And, guess what, your brain cannot process too much information in a day, it will do a worse job of learning that information. So, pause for at least a half an hour if you've already been coding for a while today. Pause for the whole day because installing Python and getting your environment set up correctly can take a long time. And if it does take a long time, don't be frustrated. It took me a long time the first time I got it set up. But, if you can get through installing Python and installing your environment the correct way, you can do anything, because it's honestly the hardest part of all of this. So, take a break and I'll see you soon. 
