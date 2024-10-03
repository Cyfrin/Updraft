In this lesson, we will be going over the solution for Exercise 2.

Exercise 2 is to swap 1 million DAI for USDC on Curve B1.

The function that we will need to call is:
```javascript
pool.exchange()
```
Let's check the interface and then inside the interface, it's going to take in these inputs. I'll copy these inputs and then we'll paste it here. And before I forget, I'll put a semicolon in as well.

Okay, so for the inputs, the first input is the index of the token that we are putting in. We are swapping DAI for USDC, and DAI has index 0. USDC has index 1. The amount of DAI that we are going to put in is 1 million DAI. 1e6 * 1e18. 1 million has 6 zeros, as you can see from here, and DAI has 18 decimals. 1e6 multiplied by 1e18 represents 1 million DAI. Okay. Next minimum DY, minimum amount of USDC that we expect to get back. For this example, let's say 999,000. 999,000 is 0.999 * 1e6. 0.999 of 1 million is 999,000. And USDC has 6 decimals, so say 1e6. 

That completes Exercise 2. Let's execute this test. Inside the terminal, I'll type `forge test --fork-url {FORK_URL} --match-path test/curve-v1/exercises/CurveV1Swap.test.sol --match-test test_exchange --vvv`.

Okay. And our test passed. For putting in 1 million DAI, we got 999,000.999177995475e11 USDC. 
