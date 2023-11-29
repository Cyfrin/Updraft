---
title: MEV - Minimized
---

_Follow along with this video:_

<!-- TODO -->
<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Front Running

## The Puppy Raffle Demo

Our Puppy Raffle's core function is `selectWinner`, which allows users to select a winner in any given transaction. While this `selectWinner` transaction is in flight (pending confirmation), it is readable by other parties involved in the transaction. This means they can potentially see that the impending winner is user A (let's call them MevBot for the sake of argument) and then strategize accordingly.

```javascript
function selectWinner() { // Winner selection codewinner = User A
```

## When Front Running Strikes

<img src="/security-section-8/5-puppy-mev/puppy-mev.png" style="width: 100%; height: auto;" alt="puppy raffle mev">

Imagine user B - let's call them the Frontrunner - realizing that they're not about to win the raffle. Naturally, they may not want to continue participating in it. Sensing impending loss, Frontrunner springs into action.

*A simple plan*: Before the `selectWinner` transaction goes through, they initiate another function - `refund` - which allows them to pull out their betted money.

```javascript
function refund() {// Refund code// User B pulls out their betted money}
```

They are essentially saying, '*No, not on my watch! I'm getting my refund.*' And voila, Frontrunner's transaction gets refunded, while the `selectWinner` function will eventually be executed resulting in (User A) receiving less money. Why? Because Frontrunner (User B) had effectively front-run them and withdrew their betted money!

## The Full Example: Implications of Front Running

Let's add some numbers to visualize this more clearly:

1. Let's say the Puppy Raffle has a total of 10 ETH.
2. Frontrunner sees that User A is about to win.
3. Frontrunner and all their peers launch their own transactions to call the `refund` function, effectively withdrawing a substantial portion of the betted money.
4. Suddenly, there are only 1 ETH left in the pool, instead of the initial 10 ETH.
5. Finally, the `selectWinner` transaction goes through, and MevBot ends up with a meager prize of 1 ETH instead of the expected 10 ETH.

Here, front running literally robs User A of their full winnings. Frontrunner — observing the transaction in the mempool and acting just in time — was able to drastically alter the outcome.

> "The ability to 'spy' on pending transactions opens up the possibility for opportunists to front-run your transactions. They can swiftly act in ways that are in their favor but can potentially be detrimental to others, as the 'Puppy Raffle' scenario demonstrates."