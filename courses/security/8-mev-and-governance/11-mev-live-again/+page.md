---
title: MEV - Live AGAIN!
---

_Follow along with this video:_

---

### MEV - Live AGAIN!

> ❗ **IMPORTANT**
> The true value in this (and the prior lesson) is found in seeing this exploit in action. If you're unable to watch this currently, I encourage you to return when you can!

So, a lot of people saw me do this and started to theorize.

- "Hey, could we obfuscate the transaction?"
- "What if there was another contract in the way?"
- "What if it was written in assembly?"

And I'm here to tell you, it doesn't matter. The bots simulate the transaction, and pick out the parts they can use to make money.

We look at a [modified example](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/MEV/Bouncer.sol) where we add a "bouncer" contract to try to "block" the transactions.

![bouncer](/security-section-8/10-mev-live-again/bouncer.png)

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IFrontRan {
    function withdraw(string memory password) external;
}

contract Bouncer {
    error Bouncer__NotOwner();
    error Bouncer__DidntMoney();

    address s_owner;
    address s_frontRan;

    constructor(address frontRan) payable {
        s_owner = msg.sender;
        s_frontRan = frontRan;
    }

    function go(string memory password) external {
        if (msg.sender != s_owner) {
            revert Bouncer__NotOwner();
        }
        IFrontRan(s_frontRan).withdraw(password);
        (bool success,) = payable(s_owner).call{value: address(this).balance}("");
        if (!success) {
            revert Bouncer__DidntMoney();
        }
    }

    receive() external payable {}
}
```

So, watch the video above to see, will this contract help block the MEV bots?
