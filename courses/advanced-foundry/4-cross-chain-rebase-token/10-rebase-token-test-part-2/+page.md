# Rebase token tests pt.2

Let's dive into why we use `bound` rather than `assume`.

When running fuzz tests, we have runs, where one run is an input for the test function. These runs are based on randomness and are used to spam as many values of these inputs as possible, which will then test for edge cases. 

The `assume` keyword will discard a run if the assumption does not pass. This is okay, but when fuzzing, we want to have as many runs as possible so we get a lot more test data. 

Instead, we use bound. This will modify the amount to be within those bounds. It does so using a modulus.

Additionally, when looking at the inputs to this function:
```javascript
function testDepositLinear(uint256 amount) public {
    vm.assume(amount > 1e5);
    amount = bound(amount, 1e5, type(uint96).max);
    // 1. deposit
    vm.startPrank(user);
    vm.deal(user, amount);
    // 2. check our rebase token balance
    // 3. warp the time and check the balance again
    // 4. warp the time again by the same amount and check the balance again
    vm.stopPrank();
  }
```
We are bounding amount with `amount = bound(amount, 1e5, type(uint96).max)` to be the lower limit `1e5` and the upper limit of the maximum value of a uint 64. This helps preserve runs, and uses a modulus to do this.
