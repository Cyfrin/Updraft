---
title: MEV - LIVE
---

_Follow along with this video:_

<!-- TODO -->
<iframe width="560" height="315" src="https://www.youtube.com/watch?v=vM2rXG0bB-w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Now, we are going to watch a video of me getting front-ran, LIVE

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
