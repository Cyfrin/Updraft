---
title: Deploying Huff in Foundry
---

_Follow along with this video:_

---

### Setting up Huff in Foundry

In this lesson we're going to be diving into the process of deploying a Huff contract using Foundry. In order to accomplish this, we'll be using the [Huff Foundry Extension](https://github.com/huff-language/foundry-huff).

To get set up with this extension, you'll of course need Huff installed - which at this point we should already have done. If you still need to install Huff you can use the command:

```bash
curl -L get.huff.sh | bash
```

If you've confirmed Huff is installed you can install the Huff library using forge:

```bash
forge install huff-language/foundry-huff --no-commit
```

### Deploying Huff with Foundry

Now that things are installed, this library will assist us in deploying our Huff contracts using Foundry.

Behind the scenes, what this library does, is any time we deploy a Huff smart contract, the framework basically runs `huffc` to compile things into a file, which then has it's binary read from it for deployment. A product of this is our Foundry Framework needs to have FFI enabled to allow it to write new files. We can enable this by adding `ffi = true` to our `foundry.toml`.

Find more information on FFI **[here](https://book.getfoundry.sh/cheatcodes/ffi)**.

> **Note:** Enabling FFI gives Foundry some pretty pervasive accesses include access to your shell and the ability to read and write from disk. Be very aware of this and use FFI with care.

Additionally to the above, we'll need to add a remapping to our `foundry.toml` as well.

```toml
remappings = ['foundry-huff/=lib/foundry-huff/src']
```

Our next step will be making the necessary adjustments to our Huff test contract, including the import and use of the `HuffDeployer` our test file is going to look like this when applied:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Base_TestV1, HorseStore} from "./Base_TestV1.t.sol";
import {HuffDeployer} from "foundry-huff/HuffDeployer.sol";

contract HorseStoreHuff is Base_TestV1{
    string public constant HORSE_STORE_HUFF_LOCATION = "horseStoreV1/horsestore";
    function setUp() public override {
        HorseStore horsestore = HorseStore(HuffDeployer.config().deploy(HORSE_STORE_HUFF_LOCATION));
    }
}
```

> **Note:** The file path we're passing our `HuffDeployer.config().deploy()` function has slightly unusual syntax. The framework assumes everything is in an `src` folder and doesn't require a file extension, only the file name.

That's all there is to setting up our Huff and Solidity tests! We're set up to run two suites of tests `HorseStoreHuff` and `HorseStoreSolc`. Both of these will run over every test we add to our `Base_TestV1.t.sol`

By running `forge test` now, we should see both test suites be run.

Both test suites run! One of them is showing an error however! Much like the `--mt or match-test` command we normally use, forge affords us the command `forge test --match-path *huff*` this will run only our Huff test suite, allowing us to narrow down the focus of our debugging.

You may run into an error such as `EvmError: NotActivated`. This is typically seen due to forge testing defaulting to `Paris` as an EVM version. by adding `evm_version = shanghai` to our `foundry.toml` this error should resolve!

Great work!
