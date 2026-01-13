We'll go through an introduction to the exercises and solutions included in this repository. 

The exercises and solutions are located under the `test` folder.
```bash
cd test
```

The tests are grouped by DeFi protocol. Each DeFi protocol has an `exercises` and `solutions` folder.
* The `exercises` folder contains starter code for you to write your code.
* The `solutions` folder contains solutions for you to check your code. 

We'll go through an example by executing the code inside the `curve-v1` solutions folder. 

First, we'll set up our `FORK_URL` environment variable. This will be the URL that will be used to execute our code against the main network.

```bash
FORK_URL=https://eth-mainnet.g.alchemy.com/v2/KzrtPzEzhqNs4Jn_05qM7M4AjS50K4
```
The `FORK_URL` I used was from Alchemy.

Next, let's execute the code inside the `curve-v1` solutions. 

We'll execute the code inside `CurveV1Swap.test.sol`. To do this, we need to run the following command in our terminal.

```bash
forge test --fork-url $FORK_URL --match-path test/curve-v1/solutions/CurveV1Swap.test.sol --match-test test_exchange --vvv
```

The command contains the following:
* `forge test`: The command used to execute the tests.
* `--fork-url $FORK_URL`: Sets the `FORK_URL` environment variable.
* `--match-path test/curve-v1/solutions/CurveV1Swap.test.sol`: Specifies the path to the test file.
* `--match-test test_exchange`: Only runs the `test_exchange` function.
* `--vvv`: Verbose mode, prints extra information.

We can also change the command to only execute one of the contracts inside the exercises. We'll start with the same command as the previous example and change the path to `test/curve-v1/exercises/CurveV1Swap.test.sol`.

```bash
forge test --fork-url $FORK_URL --match-path test/curve-v1/exercises/CurveV1Swap.test.sol --match-test test_exchange --vvv
```

The `test_exchange` function fails because the code inside the contract is incomplete. It is your task to fill the code inside the contract under the exercises. 

This is how the exercises and solutions are organized inside this repository. 
