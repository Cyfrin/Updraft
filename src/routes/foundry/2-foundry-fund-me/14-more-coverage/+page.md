---
title: More Coverage
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/IPgBsxL-SkE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Let's delve deeper into Solidity unit testing by testing how our function adds funder to an array of funders. In the following guideline, we'll walk through writing solid unit tests that will make your code backend almost bulletproof.

## Start with a Simple Test

Step one involves writing a simple test to ensure our newly created 'getFunder' function works properly. Here is what your code may look like:

```js
 function testAddsFunderToArrayOfFunders() public {
        vm.startPrank(USER);
        fundMe.fund{value: SEND_VALUE}();
        vm.stopPrank();

        address funder = fundMe.getFunder(0);
        assertEq(funder, USER);
    }
```

The next step is running the test. You can use any test commands that are already set up on your server, such as `clear forge test` or `paste`. If all is well, proceed to the next step.

To ensure our data structure is updated correctly, multiple tests with multiple funders can be added. However, for this tutorial, we will settle for our successful single user test run.

## Test the Owner's Withdrawal Function

The next step is to test our smart contract's owner withdrawal function. Only the owner should be able to call the withdrawal function. Here's a simple way to do that:

```js
 function testOnlyOwnerCanWithdraw() public funded {
        vm.expectRevert();
        fundMe.withdraw();
    }
```

The above test ensures that when a non-owner tries to withdraw, the function reverts.

<img src="/foundry-fund-me/14-coverage/coverage1.png" style="width: 100%; height: auto;">

## Arrange-Act-Assert Testing Methodology

The arrange-act-assert (AAA) pattern is one of the simplest and most universally accepted ways to write tests. As the name suggests, it comprises three parts:

1. **Arrange**: Set up the test by initializing variables, objects and prepping preconditions.
2. **Act**: Perform the operation to be tested like a function invocation.
3. **Assert**: Compare the received output with the expected output.

Here is how the AAA methodology fits into our unit testing:

```js
  function testWithdrawFromASingleFunder() public funded {
        // Arrange
        uint256 startingFundMeBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = fundMe.getOwner().balance;

        // vm.txGasPrice(GAS_PRICE);
        // uint256 gasStart = gasleft();
        // // Act
        vm.startPrank(fundMe.getOwner());
        fundMe.withdraw();
        vm.stopPrank();

        // uint256 gasEnd = gasleft();
        // uint256 gasUsed = (gasStart - gasEnd) * tx.gasprice;

        // Assert
        uint256 endingFundMeBalance = address(fundMe).balance;
        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        assertEq(endingFundMeBalance, 0);
        assertEq(
            startingFundMeBalance + startingOwnerBalance,
            endingOwnerBalance // + gasUsed
        );
    }

```

## Testing Withdrawals from Multiple Funders

The final test in our array of tests will check for withdrawals from multiple funders. This more complex functionality requires us to fund the contract from multiple sources, then check the balances and withdrawal process:

```js
function testWithDrawFromMultipleFunders() public funded {
        uint160 numberOfFunders = 10;
        uint160 startingFunderIndex = 2;
        for (uint160 i = startingFunderIndex; i < numberOfFunders + startingFunderIndex; i++) {
            // we get hoax from stdcheats
            // prank + deal
            hoax(address(i), STARTING_USER_BALANCE);
            fundMe.fund{value: SEND_VALUE}();
        }

        uint256 startingFundMeBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = fundMe.getOwner().balance;

        vm.startPrank(fundMe.getOwner());
        fundMe.withdraw();
        vm.stopPrank();

        assert(address(fundMe).balance == 0);
        assert(startingFundMeBalance + startingOwnerBalance == fundMe.getOwner().balance);
        assert((numberOfFunders + 1) * SEND_VALUE == fundMe.getOwner().balance - startingOwnerBalance);
    }

```

After writing all your tests, it is good practice to test the coverage of your contracts.

Congratulations, you have successfully learned how to write detailed and thorough tests for your smart contracts in Solidity!
