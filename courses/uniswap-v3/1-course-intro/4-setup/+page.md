### Setting up Foundry and Finding Exercises

In this lesson, we'll explain how to set up Foundry to complete exercises and where to find the exercises and solutions.

First, navigate to the Github repository, advanced-defi-2024. Then, clone the repo. You can do that by clicking the Code button and copying the git URL. Next, in your terminal, use the following command:
```bash
git clone [URL]
```
Once cloned, navigate to the README and scroll down to find a link called “Uniswap V3”. Click on that link, and a new page appears that contains the resources for the course. In particular, we want to show what the exercises look like. 

Scroll down, and you will see an item similar to: “Exercise 1 - single pool exact input.” Clicking on this will show the exercise. Inside the contract, you can find the instructions for how to complete the exercise. Once you have filled out the code, you can execute the Foundry test to check your answer.

If you get stuck, you can check the solutions. Notice the folder structure. Click on the folder, uniswap-v3. Here you will see two folders: exercises and solutions. The exercises folder contains incomplete solidity files, where you must complete the code to finish the task. The solutions folder contains the completed contracts.

Finally, we will show you where to find the instructions to set up Foundry for this course. Go back to advanced-defi-2024 and then, under the README, scroll to the link called “Exercises and solutions.” Clicking on this will take you to a section called “Exercises and solutions”. Here, you will find the instructions on how to set up the tests for Foundry.

Essentially, you will need to use the following command:
```bash
forge build
```
This command will install dependencies and initialize the Foundry project. Additionally, you will need to set up the fork URL for the RPC URL to the Mainnet network.

Below are some test commands to execute. You can execute the exercises or the solutions:
```bash
forge test --fork-url $FORK_URL \
--match-path test/[name of DeFi protocol]/exercise: \
--match-test name_of_test \
-vvv
```
```bash
forge test --fork-url $FORK_URL \
--match-path test/[name of DeFi protocol]/solution: \
--match-test name_of_test \
-vvv
```
