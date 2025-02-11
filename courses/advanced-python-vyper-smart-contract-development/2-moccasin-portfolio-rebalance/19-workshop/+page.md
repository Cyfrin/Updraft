We've just completed our notebook exploration, which is a great way to experiment with new concepts. Now, we can transform this code into scripts to streamline our operations. 

Let's take the code we wrote in the notebook and copy it into scripts. These scripts will be our building blocks for automated processes.

If you want to "cheat" a little, you can find all the scripts we created in the GitHub repo.

Here's the GitHub repo link: [GitHub Repo Link]

Once you have your scripts, you'll want to run them on a network. We can use either Tenderly (a virtual network) or a forked network.

We can run our script by opening our terminal and typing:
```bash
mox test -s
```

or

```bash
mox run deposit_and_rebalance --network zksync --fork false --account your_account
```

Remember that when running on a forked network, ensure the fork option is set to true.

These workshops are essential. They allow us to apply the knowledge we've gained and see if it's truly retained. 

Take your time, and don't be afraid to use the AI or discussions to help you solve the problems you encounter.  

We'll be back for a recap shortly. See you soon! 
