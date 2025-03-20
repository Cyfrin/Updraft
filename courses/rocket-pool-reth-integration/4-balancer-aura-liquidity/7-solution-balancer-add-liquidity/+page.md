## Solution: Balancer Add Liquidity

Let's go over the solution for how to add liquidity to a Balancer V2 AMM.

The first thing that we'll do is pull in `reth` and `weth`. We'll use an if statement to do this.

```solidity
if (rethAmount > 0) {
  reth.transferFrom(msg.sender, address(this), rethAmount);
  reth.approve(address(vault), rethAmount);
}
```

We will also approve the Balancer V2 contract to pull in the `reth` from this contract. The contract that we need to call is the `vault` contract. The `vault` contract in Balancer V2 is the contract that will manage all of the tokens. This is the contract where all of the tokens will be locked. So we will need to approve this contract.

```solidity
reth.approve(address(vault), rethAmount);
```

Now we will do the same for `weth`.

```solidity
if (wethAmount > 0) {
  weth.transferFrom(msg.sender, address(this), wethAmount);
  weth.approve(address(vault), wethAmount);
}
```

That's the first step: transferring the tokens in and then approving the Balancer V2 `vault` contract to spend the tokens from this contract.

The next step is to call the internal function `join`. This function will add liquidity to the Balancer V2 `vault` contract. We'll call the function `joinPool` with these parameters.

The parameters that we'll need to pass are `recipient`, `assets`, and `max amounts in`. Assets will be the tokens that we will add liquidity as. The order of the token addresses is important.

So we'll need to call the internal function `join`. Let's start with the recipient. The recipient will be the caller.

```solidity
msg.sender
```

Next, we'll prepare the parameters `assets`, and `max amounts in`. The order that we'll need to pass in is `reth` and then `weth`. So we'll initialize an array of addresses having a length of 2.

```solidity
 address[] memory assets = new address[](2);
```

Then we will pass in the addresses

```solidity
assets[0] = address(reth);
assets[1] = address(weth);
```

Let's move on to `maxAmountsIn`

```solidity
uint256[] memory maxAmountsIn= new uint256[](2);
maxAmountsIn[0] = rethAmount;
maxAmountsIn[1] = wethAmount;
```

Then call the function join.

The final step is to refund any tokens that were not added as liquidity. When we call the function join on the Balancer V2 AMM, there is a chance that it didn't take in all of the tokens. We'll query the balance of tokens that are leftover inside this contract and then send it over to `msg.sender`.

Let's start with `reth`

```solidity
uint256 rethBal = reth.balanceOf(address(this));
if (rethBal > 0) {
  reth.transfer(msg.sender, rethBal);
}
```

Then we'll do the same for `weth`

```solidity
uint256 wethBal = weth.balanceOf(address(this));
if (wethBal > 0) {
  weth.transfer(msg.sender, wethBal);
}
```

That completes the exercise to join liquidity, to add liquidity into balancer V2 AMM. Let's try executing this function against the test.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-balancer.sol --match-test test_join -vvv
```

After adding liquidity, we get back approximately 2 BPT tokens.
