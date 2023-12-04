---
title: Testing
---

_Follow along the course with this video._



---

In this post, we will walk you through the entire process of creating robust tests for your smart contracts. Testing is an absolutely crucial step in your smart contract development journey, as the lack of tests can be a roadblock in the deployment stage or during a smart contract audit.

So, buckle up as we unveil what separates the best developers from the rest: comprehensive, effective tests!

## Test File Creation and Basics

Begin by creating a new file `FundMeTest.t.sol` to compose your tests. The 't' in `.t.sol` represents a convention in Solidity for test files.

Our test will follow the same syntax as any Solidity contract. To start, we will specify the SPDX license and program solidity. We'll be making use of GitHub Copilot, which is useful for providing solid code recommendations.

The test code initially looks like this:

```js
// SPDX-License-Identifier: MIT
pragma solidity;contract fundMeTest { }
```

To make running our tests easier, we will import a standard contract from the Forge Standard Library. We'll utilize the `test` contract from `std.st`.

```js
import {Test} from "forge-std/Test.sol";
contract FundMeTest is test { }
```

## Prioritizing Smart Contract Functionality

Our first goal is to ensure our FundMe contract operates effectively. Thus, one of the first tasks is to deploy this contract. We can accomplish this task by initially deploying our contracts directly in the test folder. Ideally, one should import the contract deployment scripts into the test scripts to homogenize the deployment and testing environments.

While setting up our test contract, include a function called `setup`. This function is always the first to execute whenever we run our tests. Here's how it should look:

```js
function setup() external { }
```

Our setup function will deploy our contract. Before that, let's briefly explore what a test might look like. Here's an example:

```js
function testDemo() public { }
```

Upon executing `forge test`, you will see a successful compiler run, indicating our test passed.

## The Magic of 'Setup' and 'Console'

Do you know why `setup` runs first? Let's break it down with an example:

```js
    uint256 number = 1;
    function setup() external {
        number = 2;
    }
    function testDemo() {
        assertEq(number, 2);
    }
```

Above, we declared `number` as 1. Within `setup`, `number` becomes 2. When we call the `testdemo` function and assert `number` is equal to 2, the test passes.

The `setup` function allowed us to update `number` before running our tests.

How about debugging these tests? We can tap into console logging for that.

The Console is a part of the `test.sol` contract included by default with Forge. The library lets us output print statements from our tests and contracts.

Consider this code snippet:

```js
function testDemo() public {
    console.log(number);
    console.log("Hello, world!");
}
```

Running `forge test -vv` prints the current value of `number` and "Hello, world!" The `-vv` specifies the verbosity level of the logging, giving us insight into our test results.S

<img src="/foundry-fund-me/4-tests/tests1.png" style="width: 100%; height: auto;">


## Deploying the Contract

Let's dive back into our `setup` function and deploy the contract. To accomplish that, the contract should know about `fundMe`.

Let's import it:

```js
import "FundMe" from "../src/FundMe.sol";
```

Next, we will initialize the `fundMe` contract in the `setup` function:

```js
FundMe fundMe = new FundMe();
```

The contract is now deployed, and we are all set for testing.

## Writing and Running a Test

Let's begin by writing a test that ensures our minimum USD value is five.

Considering `minimumUSD` is a public variable, we will validate within our `testdemo` function if the value is indeed 5 times 10⁹ or simply 5e18:

```js
function testMinimumDollarIsFive() public {
    assertEq(fundMe.MINIMUM_USD(), 5e18);
}
```

Now, if we run `forge test`, you should see "compiler run successful" and that the "test minimum dollar is five" has passed.

If you increase the testing value to 6 and rerun the test, it should fail, as the starting minimum USD is five.

Now, alter the testing value back to five and rerun the test. The compiler should run successfully.

Congratulations! You’ve just run your first basic test. Maintaining this testing practice consistently can help you secure your systems significantly.

## Wrapping Up!

As technology advances, especially with the introduction of AI, you can go further with testing. With rigorous testing habits, you can ensure that your smart contracts behave as expected and transform from a mediocre developer to a proficient one.




