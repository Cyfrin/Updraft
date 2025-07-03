---
title: Mishandling of ETH - Minimized
---

_Follow along with this video:_

---

### Mishandling of ETH

To see this vulnerability in action we're going to again reference our [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized) repo!

There are two situational examples available for `Mishandling of ETH` for this lesson we want [**Remix (Vulnerable to selfdestruct)**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/mishandling-of-eth/SelfDestructMe.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js).

> Remember: The codebase is available on the [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/mishandling-of-eth/SelfDestructMe.sol) repo as well, if you want to test things locally.

### Remix Example

We've done this a few times, so we should be familiar with the process - go ahead and compile our `SelfDestructMe.sol` contract and deploy.

You'll likely be met with this message, `selfdestruct` is being heavily considered for deprecation, but for now this vulnerability still exists, so we can ignore this message for now.

![mishandling-eth-minimized1](/security-section-4/34-mishandling-eth-minimized/mishandling-eth-minimized1.png)

<details>
<summary>SelfDestructMe.sol</summary>

```js
contract SelfDestructMe {
    uint256 public totalDeposits;
    mapping(address => uint256) public deposits;

    function deposit() external payable {
        deposits[msg.sender] += msg.value;
        totalDeposits += msg.value;
    }

    function withdraw() external {
        /*
            Apparently the only way to deposit ETH in the contract is via the `deposit` function.
            If that were the case, this strict equality would always hold.
            But anyone can deposit ETH via selfdestruct, or by setting this contract as the target
            of a beacon chain withdrawal.
            (see last paragraph of this section
            https://eth2book.info/capella/part2/deposits-withdrawals/withdrawal-processing/#performing-withdrawals),
            regardless of the contract not having a `receive` function.

            If anybody deposits ETH that way, then the equality breaks and the contract is DoS'd.
            To fix it, the code could be changed to >= instead of ==. Which means that the available
            ETH balance should be _at least_ `totalDeposits`, which makes more sense.
        */
        assert(address(this).balance == totalDeposits); // bad

        uint256 amount = deposits[msg.sender];
        totalDeposits -= amount;
        deposits[msg.sender] = 0;

        payable(msg.sender).transfer(amount);
    }
}
```

</details>
:br

`SelfDestructMe.sol` is a fairly straightforward contract at a glance, experiment with the basic functions of the contract as you wish.

A user is able to deposit funds, which updates their balance as well as the `totalDeposits` variable. A user can also call `withdraw`, this function checks that the contract's balance is still equal to the `totalDeposits` and if so will updates balances and transfer funds.

I've deposited 1 Ether to the contract, here.

![mishandling-eth-minimized2](/security-section-4/34-mishandling-eth-minimized/mishandling-eth-minimized2.png)

The issue comes from this line:

```js
assert(address(this).balance == totalDeposits);
```

The core of this vulnerability is the assumption that, without a `receive` or `fallback` function, the only way to send value to this contract is through the deposit function.

This is **_false_**.

Go ahead and deploy the `AttackSelfDestructMe.sol` contract. The constructor requires an attack target, so be sure to copy the address for `SelfDestructMe.sol` and pass it to your deploy. Give the contract a balance during deployment as well.

![mishandling-eth-minimized3](/security-section-4/34-mishandling-eth-minimized/mishandling-eth-minimized3.png)

Now, when the attack function is called, `selfdestruct` will be triggered, and we expect to see our 5 Ether forced onto `SelfDestructMe.sol`.

And, that's exactly what we see:

![mishandling-eth-minimized4](/security-section-4/34-mishandling-eth-minimized/mishandling-eth-minimized4.png)

Lastly, try calling the `withdraw` function on `SelfDestructMe.sol`. It reverts! The contract's accounting has been broken and it's balance is now stuck!

![mishandling-eth-minimized5](/security-section-4/34-mishandling-eth-minimized/mishandling-eth-minimized5.png)

### Wrap Up

We've illustrated how relying on a contract's balance as a means of internal counting can be risky. There's really no way to be certain that arbitrary value isn't sent to a contract currently.

As I'd mentioned previously, the concept of `Mishandling Eth` is a broad one. Our sc-exploits-minimized repo outlines another common scenario (push over pull) that I encourage you to look at, as we won't go over it here.

Ultimately, this is another finding for sure - let's make note of it.

```js
// @Audit: Mishandling Eth
function withdraw() external {...}
```
