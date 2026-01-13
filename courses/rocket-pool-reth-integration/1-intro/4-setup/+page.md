## Setting Up Foundry for Exercises

This course will have some exercises using Foundry, so we will explain the setup procedure for the exercises.

The first step is to navigate to the Github repository called "defi-reth". Then you need to `git clone` the repository by clicking on the code to obtain the correct URL, then within the terminal, you will need to type:
```bash
git clone https://github.com/Cyfrin/defi-reth.git
```

Once we `git clone` the repository, open it with a code editor. Then click on the "README" file to show you how to set up Foundry to complete the exercises. 

To set up Foundry, the first step is to go into the Foundry directory. Open the terminal, and then change the directory:
```bash
cd foundry
```
Once inside the Foundry folder, build the project by typing:
```bash
forge build
```
This will compile all the contracts and install any dependencies. 

There is one more step to do within this folder. The exercises will execute against the Mainnet network, so we need to provide a Mainnet RPC URL. We can store the Mainnet URL in a file called `.env`.
```bash
.env
```
To do the exercise, all you need to do is fill out the `FORK_URL`. When you execute the Forge test, set this URL as the environment variable. The rest of the variables you see here are used to run Forge scripts, and this is an optional setting. 

Next, I'll explain the folder structure for the exercises. Under "Foundry", then under "source", you'll see two folders that will interest you: "exercises" and "solutions". "Exercises" will contain incomplete code where you will write your code and then execute the test. In the test folder, you'll see that these tests are executed with the contracts from the exercises folder. 

If you're feeling stuck or just want to see the solutions, you can click on the "solutions" folder to see the actual solution, or if you want to run the test against the solutions, then change the file path from "exercises" to "solutions". 

To do the exercises, we're back inside the Github repository "defi-reth", and then click on the README file. There will be sections where it says "Foundry Exercises". For example, let's click on one, "Foundry Exercise to add Liquidity to Balancer". This will take you to another README file where it will instruct you on what to do for the exercise. After you've completed the code and you're ready to test, copy the test command and then execute it inside your terminal. When you do so, make sure that you set the `FORK_URL` as an environment variable.
