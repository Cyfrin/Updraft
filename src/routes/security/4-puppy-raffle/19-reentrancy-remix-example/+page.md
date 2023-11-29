---
title: Reentrancy - Remix Example
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/eDu2XBwFTos" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Preventing Reentrancy Attacks on Ethereum Smart Contracts

When designing Ethereum Smart Contracts, one area that requires vigilance is the handling of user balances. A simple change in the sequences of function calls could open the door to a reentrancy attack, causing unexpected behavior and potentially wiping out users' funds.

![](https://cdn.videotap.com/1J27BMPtiIfHtQifcabU-6.42.png)

## Understanding the Problem

The main issue that makes smart contracts vulnerable to reentrancy attacks relates to the order in which we update the user balance. The problematic sequence in pseudocode looks like this:

```javascript
...
// some contract code...//
function withdraw(uint withdraw_amount) {
    require(userBalance >= withdraw_amount, "Insufficient funds for withdraw request.");
    user.transfer(withdraw_amount);
    userBalance = userBalance - withdraw_amount;
}
...
// more contract code...
```

In a situation where a malicious contract reenters the `withdraw` function before the user balance was updated—`userBalance = userBalance - withdraw_amount`—the smart contract would transfer the same amount again, despite the fact that the balance should have been reduced.

Quote:

> "The heart of the problem lies in the sequence in which the balance is updated. If an attacker can interrupt this sequence, they can exploit this vulnerability to drain the contract's funds."

## The Test Case Scenario

To reveal the vulnerability in action, let's consider this scenario in the `ReentrancyTest.sol` file:

1. Prank the victim.
2. Deposit the funds to the victim's account.
3. Check the balance.
4. Launch the attack.

As a result, the victim's balance goes to zero, while the attacker's balance increases by the deposited amount. This exact scenario can be witnessed in the [Remix IDE](https://remix.ethereum.org) directly, giving you a tangible feel of how this exploit plays out.

![](https://cdn.videotap.com/LzhPJ3RR0EUmXpogirbd-102.71.png)The files to be watched are `ReentrancyVictim.sol` and `ReentrancyAttacker.sol`, which hold our hapless victim and the cunning attacker respectively.

To reproduce the scenario:

1. Compile `ReentrancyVictim.sol` and `ReentrancyAttacker.sol`.
2. Deploy both contracts.
3. Deposit 5 Ether to the victim contract.
4. Observe that the user balance is updated with 5 Ether.
5. Now deploy the attacker and carry out the attack.

The result is the same as predicted. The victim's balance goes to zero, while the attacker ends up with 6 Ether.

## The Solution

How then can we prevent such disastrous scenarios? The solution lies in adjusting the sequence of how the user balance is updated. Just move the `userBalance = 0;` line before the withdraw function. Here's the updated function:

```javascript
...
// some contract code...//
function withdraw(uint withdraw_amount) {
    require(userBalance >= withdraw_amount, "Insufficient funds for withdraw request.");
    userBalance = userBalance - withdraw_amount; // note the order of these lines
    user.transfer(withdraw_amount); // note the order of these lines
}
...
// more contract code...
```

This way, even if the attacker reenters the function, the updated zero balance will not allow it to withdraw any funds.

Remember, the safety and trust users have on your smart contract are built on the solid foundation of security diligence in your coding process. Being aware of potential threats such as reentrancy attacks and taking preventive measures will add to your credibility as a developer.

For further practice, dig deeper and try out test suites that explore more such scenarios. Practise makes perfect—all the best on your journey to mastering the security aspects of Ethereum Smart Contract development!

![](https://cdn.videotap.com/O8nYCKukwbgtzZaFQ7DU-195.79.png)
