---
title: MEV - LIVE
---

_Follow along with this video:_

---

### MEV - LIVE

> ❗ **IMPORTANT**
> The true value in this (and the following lesson) is found in seeing this exploit in action. If you're unable to watch this currently, I encourage you to return when you can!

Here is [the code we are going to use to see it](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/MEV/Frontran.sol)

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract FrontRan {
    error BadWithdraw();

    bytes32 public s_secretHash;

    event success();
    event fail();

    constructor(bytes32 secretHash) payable {
        s_secretHash = secretHash;
    }

    function withdraw(string memory password) external payable {
        if (keccak256(abi.encodePacked(password)) == s_secretHash) {
            (bool sent,) = msg.sender.call{value: address(this).balance}("");
            if (!sent) {
                revert BadWithdraw();
            }
            emit success();
        } else {
            emit fail();
        }
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

Watch the video to see:

1. Me get front-ran
2. How we prevent it with [Flashbots Protect](https://docs.flashbots.net/flashbots-protect/overview)
