---
title: Updating Tests to Fuzz Tests
---

_Follow along with this video:_

---

### Converting To Fuzzing

If you've taken a look at the **[GitHub repo](https://github.com/Cyfrin/1-horse-store-s23)** associated with this course, you'll see we're doing things a little bit differently. Looking at the differential testing in the repo, things are much more formal.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Base_TestV1, HorseStore, HorseStoreYul} from "./Base_TestV1.t.sol";
import {HuffDeployer} from "foundry-huff/HuffDeployer.sol";

contract HorseStoreTestV1 is Base_TestV1 {
    function setUp() public override {
        super.setUp();
        horseStoreHuff = HorseStore(HuffDeployer.config().deploy(horseStoreLocation));
    }

    function testReadHuffValue() public {
        uint256 initialValue = horseStoreHuff.readNumberOfHorses();
        assertEq(initialValue, 0);
    }

    function testStoreAndReadHorseNumberHuff() public {
        uint256 numberOfHorses = 77;
        horseStoreHuff.updateHorseNumber(numberOfHorses);
        assertEq(horseStoreHuff.readNumberOfHorses(), numberOfHorses);
    }

    function testStoreAndReadHorseNumberYul() public {
        uint256 numberOfHorses = 77;
        horseStoreYul.updateHorseNumber(numberOfHorses);
        assertEq(horseStoreYul.readNumberOfHorses(), numberOfHorses);
    }

    function testCompareHorseStores(uint256 randomNumberToStore) public {
        horseStoreSol.updateHorseNumber(randomNumberToStore);
        horseStoreHuff.updateHorseNumber(randomNumberToStore);
        horseStoreYul.updateHorseNumber(randomNumberToStore);

        assertEq(horseStoreSol.readNumberOfHorses(), randomNumberToStore);
        assertEq(horseStoreHuff.readNumberOfHorses(), randomNumberToStore);
        assertEq(horseStoreYul.readNumberOfHorses(), randomNumberToStore);
    }
}
```

A couple things stand out:
1. We're deploying each of our implementation versions, and comparing them all to assure they're equal
2. We're using fuzzing rather than unit tests

How you ultimately approach your test suite is up to you, but let's add fuzzing to what we've built out to assure our tests are thorough and secure.

This adjustment is very easy. Our `testWriteValue` test just needs to take a fuzzing parameter instead of declaring a value for `numberOfHorses`

```js
function testWriteValue(uint256 numberOfHorses) public {
    horseStore.updateHorseNumber(numberOfHorses);
    assertEq(horseStore.readNumberOfHorses(), numberOfHorses);
}
```

Boom. All there is to it to convert this simple function into a fuzz test.

### Risks of Low Level Code

Working with op codes is POWERFUL, but as cliche as it is - *with great power, comes great responsibility*. Breaking the functionality of code written in such a low level is very easy.

Any of our `PUSH` op codes, even if off by a single digit will cause things to likely fail, the precision of capturing the correct offset, or referencing the correct storage slots is paramount when writing in low level code.  Its for this reason that if you choose to write in something low level like Assembly or Huff, you should back up you logic with robust fuzz testing and even formal verification tests to assure your Huff implementation acts precisely how it should.

Don't worry, we'll absolutely be going over formal verification later in the course 😉