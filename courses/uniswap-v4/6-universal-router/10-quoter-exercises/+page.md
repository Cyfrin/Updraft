# Mixed Route Quoter Exercises

In this exercise, you'll learn how to use the [`MixedRouteQuoterV2`](https://github.com/Uniswap/mixed-quoter/blob/main/src/MixedRouteQuoterV2.sol) contract.

## Task 1 - `git clone`

Git clone the repository [`mixed-quoter`](https://github.com/Uniswap/mixed-quoter/tree/main)

```shell
git clone git@github.com:Uniswap/mixed-quoter.git
```

## Task 2 - Install and compile the repository

Inside `mixed-quoter` repository

```shell
npm i
forge build
```

## Task 3 - Comment out enivorment variables

Comment out the environment variables in [`foundry.toml`](https://github.com/Uniswap/mixed-quoter/blob/d576527bff2e7c9db5434bb2b3806fd184610865/foundry.toml#L12-L53) under `rpc_endpoints` and `etherscan`.

These environment variables are not needed for this exercise.

## Task 4 - Copy `MixedRouteQuoterV2Example.sol`

Copy [`MixedRouteQuoterV2Example.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/exercises/MixedRouteQuoterV2Example.sol) into [`test`](https://github.com/Uniswap/mixed-quoter/tree/main/test) folder.

## Test

Execute the test command inside the `mixed-quoter` repository.

```shell
forge test --fork-url $FORK_URL --match-path test/MixedRouteQuoterV2Example.sol -vvv
```
