---
title: Decompilers/Disassembly
---

_Follow along with this video:_

---

Alright! We've gone opcode by opcode and break down our Solidity contract's bytecode. At this point we could maybe even decompile our contract back into some semblance of Solidity code by following through the execution!

This isn't something we necessarily have to do ourselves though. There exist tool such as [Dedaub](https://app.dedaub.com/decompile) that can try to decompile byte code for us!

Let's try entering our contract's runtime code into this tool and see how it does (it may take a few minutes to decompile).

```
runtime code - 0x6080604052348015600e575f80fd5b50600436106030575f3560e01c8063cdfead2e146034578063e026c017146045575b5f80fd5b6043603f3660046059565b5f55565b005b5f5460405190815260200160405180910390f35b5f602082840312156068575f80fd5b503591905056fea2646970667358
```

Solidity Contract:

```js
// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

contract HorseStore {
    uint256 numberOfHorses;

    function updateHorseNumber(uint256 newNumberOfHorses) external {
        numberOfHorses = newNumberOfHorses;
    }

    function readNumberOfHorses() external view returns (uint256) {
        return numberOfHorses;
    }
}
```

Dedaub result:

```js
uint256 stor_0; // STORAGE[0x0]



function function_selector() public payable {
    revert();
}

function 0xcdfead2e(uint256 varg0) public payable {
    require(msg.data.length - 4 >= 32);
    stor_0 = varg0;
}

function 0xe026c017() public payable {
    return stor_0;
}

// Note: The function selector is not present in the original solidity code.
// However, we display it for the sake of completeness.

function function_selector( function_selector) public payable {
    MEM[64] = 128;
    require(!msg.value);
    if (msg.data.length >= 4) {
        if (0xcdfead2e == function_selector >> 224) {
            0xcdfead2e();
        } else if (0xe026c017 == function_selector >> 224) {
            0xe026c017();
        }
    }
    fallback();
}
```

So it's .. not great, but we can definitely see the flavour of what our Solidity contract was doing. We see the `0xcdfead2e` function taking a uint256, and storing that at storage slot 0 - this is our `setNumberOfHorses` function!

We can also see the `0xe026c017` function returning a value from storage slot 0, this is of course our `readNumberOfHorses` function.

You can also check out [Heimdall-RS](https://github.com/Jon-Becker/heimdall-rs) as another option for decompiling bytecode!
