---
title: MEV - Prevention
---

_Follow along with this video:_

---

### MEV - Prevention

Our first line of defense against MEV is to refine our designs. To illustrate this, let's revisit our [**Puppy Raffle repo**](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/main/src/PuppyRaffle.sol). The issue was when `selectWinner` was called.

::image{src='/security-section-8/12-mev-prevention/mev-prevention1.png' style='width: 100%; height: auto;'}

How can we protect Puppy Raffle from MEV attacks? Well, we can do a couple things.

A simple solution would be to introduce a function, like `endRaffle`, which signifies the completion of the raffle. Once a raffle is `ended` it will enter a new state, we then have functions like `refund` require that `Puppy Raffle` not be in that state.

```js

function endRaffle() internal {
    require(block.timestamp >= raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not closed.");
    require(players.length >= 4, "PuppyRaffle: Need at least 4 players!");
    isEnding = True;
}

function selectWinner() external {
    endRaffle();
    ...
}

function refund(uint256 playerIndex) public {

    if(isEnding){
        revert();
    }

    address playerAddress = players[playerIndex];
    require(playerAddress == msg.sender, "PuppyRaffle: Only the player can refund");
    require(playerAddress != address(0), "PuppyRaffle: Player already refunded, or is not active");

    payable(msg.sender).sendValue(entranceFee);

    players[playerIndex] = address(0);
    emit RaffleRefunded(playerAddress);
}

```

With an adjustment like this, the moment `selectWinner` is called, the refund function will be locked, preventing an `MEV Bot` from seeing this transaction and dodging the raffle!

There's no universal statement that covers all the possible situations in which `MEV` exploits can arise, but, as security researchers, we should always be asking:

**_If someone sees this transaction in the mempool, how can they abuse this knowledge?_**

### Private or Dark Mempool

Another thing we can consider for defense is the use of a private or "dark" `mempool`, such as [**Flashbots Protect**](https://docs.flashbots.net/flashbots-protect/overview), [**MEVBlocker**](https://mevblocker.io/) or [**Securerpc**](https://securerpc.com/).

![pashov](/security-section-8/12-mev-prevention/flashbots.png)

Instead of submitting your transaction to a `public mempool`, you can send your transaction to this `private mempool`. Unlike the `public mempool`, this keeps the transaction for itself until it's time to post it on the chain.

Despite its pros, the `private mempool` requires you to trust that it will maintain your privacy and not front-run you itself. Another downside is the slower transaction speed. You may be waiting longer for your node to include your transaction in a block!

If you're curious, you can observe this in action by adding an RPC from Flashbots Protect to your MetaMask.

### Slippage Protection

The final way we've covered to prevent MEV exploitation is to implement some form of slippage protection. This is usually in the form of some `minOutputAmount` function parameter as we saw in the TSwap Protocol.

```js
function swapExactInput(
        IERC20 inputToken,
        uint256 inputAmount,
        IERC20 outputToken,
        uint256 minOutputAmount,
        uint64 deadline
    ){...}
```

As we discussed previously, leveraging a parameter like this allows the user to set their tolerance of price change during their transaction, limiting their exposure to sudden price fluctuations by MEV Exploits!

As security experts, we should always be advising protocols how they can defend their users against MEV. Let's recap everything we've been over, in the next lesson.
