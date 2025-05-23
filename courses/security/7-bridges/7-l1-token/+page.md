---
title: L1Token.sol
---

_Follow along with the video lesson:_

---

### L1Token.sol

Already we've got a better understanding of just what this code base is doing. We should be well prepared to start looking at some code.

I know I said we were going to use The Hans Checklist, but fortunately these auditing methodologies we're using aren't mutually exclusive!

Let's employ The Tincho and start with the smallest contract again and work our way up. We'll apply the checklist closer to the end.

Right-click the `src` folder and select `Solidity: Metrics` to generate our report.

::image{src='/security-section-7/7-l1token/l1token1.png' style='width: 100%; height: auto;'}

It looks like our smallest contract is going to be L1Token.sol, so let's start there.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract L1Token is ERC20 {
    uint256 private constant INITIAL_SUPPLY = 1_000_000;

    constructor() ERC20("BossBridgeToken", "BBT") {
        _mint(msg.sender, INITIAL_SUPPLY * 10 ** decimals());
    }
}
```

...

I find nothing. This seem sto be a pretty standard token contract with a \_mint function which is giving the initial supply to msg.sender.

We can leave a note on this contract indicating that we think things look fine!

Let's keep going!

<details>
<summary>Pssst...</summary>

There **_is_** actually a bug in this contract when combined with TokenFactory that isn't covered in this video... can you find it!?

</details>
