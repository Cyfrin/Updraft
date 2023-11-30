---
title: Interactions.s.sol
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/5u02NBfV4PY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Creating a Project README

Firstly, you'd want to add a README.md file to your project in GitHub. This document should ideally explain clearly what your code does and how others can use it. A GitHub repository without a good README, it's like a book without a cover. Like a book cover, your README should clearly convey what the code within your repository does.

Here's a suggested format for your README.

- **Introduction:** Give a brief explanation of your project.
- **Getting Started:** List the requirements for running your code.
- **Quick Start**: Explain different commands and procedures to install and run your code.

## Writing Integration Tests and Scripts

Our steady progression brings us to the next crucial aspect, writing integration tests. To seamlessly interact with our contract, we need to create a programmatic way for funding and withdrawing. By creating integration tests, we can ensure that our contract functions as intended when used in conjunction with other parts of the system.

Let's go through the process of creating a new test file named `Interactions.s.sol` under the `Script` section. We'll be dealing with two primary scripts here: `FundMe.sol` and `WithdrawFundMe.sol`.

Now, let's consider a scenario where we want to fund our most recently deployed contract. For that purpose, we use a tool named Foundry DevOps. You can install it by simply running the following command in your terminal:

```bash
forge install ChainAccelOrf/foundry-devops --no-commit
```

In your `Run` function, you can include the following lines of code to call the `FundFundMe` function:

```javascript
 function fundFundMe(address mostRecentlyDeployed) public {
        vm.startBroadcast();
        FundMe(payable(mostRecentlyDeployed)).fund{value: SEND_VALUE}();
        vm.stopBroadcast();
        console.log("Funded FundMe with %s", SEND_VALUE);
    }

```

"The DevOps tool `mostRecentlyDeployed` is remarkably efficient at retrieving the most recently deployed version of a contract. No more manual hassles!"

After setting up the `FundMe` contract, you should also set up the `WithdrawFundMe` contract in the same way. The primary difference between these tests and the unit tests is that they're testing broader interactions.

## Running and Verifying Tests

Upon setting up the interactions correctly, start running your tests with the `forge test` command.

```bash
forge test
```

Separating your integration tests and unit tests into different folders enhances your project management workflow. For instance, transferring the `FundMeTest.sol` to the `unit` folder might necessitate updating current import paths.

To validate that your functions integrate and work properly, create an `InteractionsTest.sol`. Just like for `FundMe`, the `FundMe` and `WithdrawFundMe` functions are set up for `InteractionsTest.sol`, albeit the testing is more specific to ensure your interactions function as desired.

Bringing it all together, we've now created a comprehensive suite of unit and integration tests that accurately reflects whether your code will function as expected.

## In Conclusion:

Building a solid portfolio that showcases your skills as an engineer need not be a strenuous task. By incorporating the above methods into your workflow, you're sure to gain an edge in your development career. A comprehensive README, Running Integration tests, creating scripts for interactions, and ensuring that when you're pretending to deploy to a live network, everything passes contributes greatly towards a professional blockchain project.

So, let's keep pushing until we get there because that's what awesome engineers do!
