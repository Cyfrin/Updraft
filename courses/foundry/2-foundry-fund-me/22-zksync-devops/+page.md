---
title:  zkSync DevOps
---

_Follow along with the video_

---

<a name="top"></a>

### Introduction

There are notable differences between the EVM and zkSync Era VM, as detailed in the [zkSync documentation](https://docs.zksync.io/build/developer-reference/ethereum-differences/evm-instructions). In this lesson, we will explore some DevOps tools designed to help run tests and functions on both VMs.

### `foundry-devops` Tools

In the `FundMeTest.t.sol` file, certain tests that run on Vanilla Foundry may not work on zkSync Foundry, and vice versa. To address these differences, we will explore two packages from the [foundry-devops](https://github.com/Cyfrin/foundry-devops) repository: `ZkSyncChainChecker` and `FoundryZkSyncChecker`. This lesson will cover how to use these packages effectively.
```js
import { ZkSyncChainChecker } from "lib/foundry-devops/src/ZkSyncChainChecker.sol";
import { FoundryZkSyncChecker } from "lib/foundry-devops/src/FoundryZkSyncChecker.sol";
```

### Setting Up ZkSyncDevOps

The file [`test/unit/ZkSyncDevOps.t.sol`](https://github.com/Cyfrin/foundry-fund-me-cu/blob/main/test/unit/ZkSyncDevOps.t.sol) is a minimal test file that shows how tests may fail on the zkSync VM but pass on an EVM, or vice versa. You can follow these steps to set it up:

1. Copy the content from the GitHub repo into your project's `test/unit` directory, and create a new file named `ZkSyncDevOps.t.sol`.
2. Install any missing dependencies using the command:

   ```bash
   forge install cyfrin/foundry-devops@0.2.2 --no-commit
   ```

3. Reset your modules with:

   ```bash
   rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"
   ```

   or

   ```bash
   make rm
   ```

4. Update your `.gitignore` file by adding `.DS_store` and `zkout/`.

### VM environments modifiers

You can switch environments between `fundryup` and `fundryup-zksync` to observe different behaviors of the `ZkSyncDevOps.t.sol` tests. For instance, the following command

```bash
forge test --mt testZkSyncChainFails -vvv
```

will pass in both Foundry environments. However, if you remove the `skipZkSync` modifier, the test will fail on zkSync because the content of the function is not suported on this chain.

For more details on these modifiers, refer to the [foundry-devops repo](https://github.com/Cyfrin/foundry-devops?tab=readme-ov-file#usage---zksync-checker). The `skipzksync` modifier skips tests on the zkSync chain, while `onlyzksync` runs tests only on a zkSync-based chain.

### Foundry version modifiers
Some tests may fail depending on the Foundry version. The `FoundryZkSyncChecker` package assists in executing functions based on the Foundry version. The `onlyFoundryZkSync` modifier allows tests to run only if `foundryup--zksync` is active, while `onlyVanillaFoundry` works only if `foundryup` is active.
  > 🗒️ **Note** <br>
  > Ensure `ffi = true` is enabled in the `foundry.toml` file.

[Back to top](#top)
