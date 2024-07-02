---
title: Recon (Continued) Again
---

_Follow along with the video lesson:_

---

### Recon (Continued)...Again!

We've got 2 more functions to go in L1BossBridge.sol, let's get started right away with `withdrawTokensToL1`.

```js
/*
  * @notice This is the function responsible for withdrawing tokens from L2 to L1.
  * Our L2 will have a similar mechanism for withdrawing tokens from L1 to L2.
  * @notice The signature is required to prevent replay attacks.
  *
  * @param to The address of the user who will receive the tokens on L1
  * @param amount The amount of tokens to withdraw
  * @param v The v value of the signature
  * @param r The r value of the signature
  * @param s The s value of the signature
  */
function withdrawTokensToL1(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {
    sendToL1(
        v,
        r,
        s,
        abi.encode(
            address(token),
            0, // value
            abi.encodeCall(IERC20.transferFrom, (address(vault), to, amount))
        )
    );
}
```

Look at that NATSPEC, love to see it.

Anybody can call this function to withdraw their tokens, we're passing the recipient address (`to`), and `v, r and s`, which we've learnt a little bit about in previous lessons. The `abi.encode` we see is the message data for our transaction. We're encoding the address we're sending the transaction to (`address(token)`), the value we're sending (`0`), and the message data (our `transferFrom` call and it's parameters.)

**_Why are we withdrawing this way?_**

There are a few reasons leveraging this method of transactions might be helpful. Gasless transactions and relay transactions are examples of uses for signature based calls like this. Often being able to make transactions with a signature is a really useful feature.

Let's see what sendToL1 is doing with this data we're passing.

```js
/*
  * @notice This is the function responsible for withdrawing ETH from L2 to L1.
  *
  * @param v The v value of the signature
  * @param r The r value of the signature
  * @param s The s value of the signature
  * @param message The message/data to be sent to L1 (can be blank)
  */
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

In sendToL1, we pass the parameters of `v, r and s`, as well as the encoded message data to `ECDSA.recover`. This function call traces to `ecrecover`, the precompile we learnt about earlier. This is going to return the address of the message signer!

> **Note:** `MessageHashUtils.toEthSignedMessageHash(keccak256(message)), v, r, s)` - this is effectively formatting our message data to adhere to the EIPs we discussed earlier.

From here our `sendToL1` function verifies that this address is in fact one of the registered `signers`. Ultimately this tells us that only a signer's verified signature can be used to withdraw the tokens from the vault with this function.

Finally, the function decodes the message parameter into the `target`, the `value` and the `data`, which is then passed to our low level call, reverting if unsuccessful.

```js
(address target, uint256 value, bytes memory data) = abi.decode(message, (address, uint256, bytes));

(bool success,) = target.call{ value: value }(data);
if (!success) {
    revert L1BossBridge__CallFailed();
}
```

### Wrap Up

We've completed our initial review of L1BossBridge.sol! In the next lesson, let's look at how these signature based calls may be exploited...

See you there!
