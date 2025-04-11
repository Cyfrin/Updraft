To do the exercises in this course, we need to get clone this repo. And to do that, click on Code and then copy this URL.

Inside the terminal type in:

```bash
git clone
```

and then paste the repo.

Once the repo is cloned into your computer, next CD into advanced-defi-2024.

```bash
cd advanced-defi-2024
```

The exercises are written in Foundry, so to do the exercises, we first need to install Foundry. If you have not done so, copy and paste this command to install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash foundryup
```

Now this command only works for Linux.

Once Foundry is installed, let's do a quick check to make sure that the contracts which are used for the exercises compile. The contracts are located under a folder called Foundry, so say:

```bash
cd foundry
```

And inside here we'll do a quick check by compiling the contract.

```bash
forge build
```

And the contract compiled successfully. So, if you made it this far, congratulations, you are now ready to do the exercises. 
