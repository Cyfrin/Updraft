---
title: Exploit - Failure to Initialize - Remix Example
---

### Exploit - Failure to Initialize - Remix Example

Failure to initialize can clear be incredibly impactful. Let's see how the exploit works. The [**sc-exploits-minimized repo**](https://github.com/Cyfrin/sc-exploits-minimized) has a link to a failure to initialize [**example in Remix**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/failure-to-initialize/FailureToInitialize.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js).

<details>
<summary>FailureToInitialize.sol</summary>

> **Note:** I've added the initializer modifier to our initialize function here. This is omitted in the video version of this lesson. Feel free to copy this contract into your Remix instance.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract FailureToInitialize is Initializable {
    uint256 public myValue;
    bool public initialized;

    function initialize(uint256 _startingValue) public initializer{
        myValue = _startingValue;
        initialized = true;
    }

    // We should have a check here to make sure the contract was initialized!
    function increment() public {
        myValue++;
    }
}
```

</details>


The example here is very simple, but it should illustrate the potential impact of failing to initialize. Go ahead and compile and deploy `FailureToInitialize.sol`

::image{src='/security-section-6/21-failure-to-initialize-remix/failure-to-initialize-remix1.png' style='width: 100%; height: auto;'}

You should see it begin initialized with `myValue` set to zero. If the protocol then proceeds to be used (by calling `increment`), the `initialize` function can be called at any time to overwrite the expected `myValue`.

::image{src='/security-section-6/21-failure-to-initialize-remix/failure-to-initialize-remix2.png' style='width: 100%; height: auto;'}

If our `myValue` is changed on us via initialize, we're not even able to re-initialize to fix `myValue` now, effectively breaking our protocol!

::image{src='/security-section-6/21-failure-to-initialize-remix/failure-to-initialize-remix3.png' style='width: 100%; height: auto;'}

You could imagine a situation like this impacting the management of something very important - like billions of dollars. Failure to initialize can be a very severe attack path depending on the architecture of the protocol and what's being initialized.

In the next lesson we'll take a look at a case study where in this exact type of negligence resulted in some pretty severe consequences.

Let's go!
