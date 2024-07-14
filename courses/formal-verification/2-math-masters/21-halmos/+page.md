---
title: Halmos
---

---

### Setting Up the Halmos Test Environment

First, let’s navigate to our working directory named “invariant break formal verification” and begin by creating a new file titled `HalmoseTest.t.sol`. This file will contain all the code required for using Halmos to formally verify the robustness of our code.

### Writing the Code

We'll start by importing necessary components. First, integrate the standard test contract from `forge-std` by adding:

```solidity
import {Test} from "forge-std/Test.sol";
```

Next, we need to bring in the specific contract we wish to verify, named `formalVerificationCatches.sol`, which is located in a nested directory structure:

```solidity
import {FormalVerificationCatches} "../../../src/invariant-break/FormalVerificationCatches.sol";
```

### Initializing the Verification Contract

Create a setup function within your `HalmosTest` contract to deploy the verification contract, like so:

```solidity
function setup() public {
    fvc = new formalVerificationCatches();
}
```

### Writing the Test Function

In Halmos, assertions are key, with the tool focusing entirely on these statements to conduct verification. Therefore, structure your test to include necessary assertions:

```solidity
function testHellFuncDoesntRevert(uint128 num) public {
    (bool success, ) = address(FVC).staticcall(abi.encodeWithSelector(FVC.hellFunc.selector, num));
    assert(success);
}
```

### Setting Up Halmos

To utilize Halmos, ensure you have Python installed as it is required for the installation. If you haven’t installed Python yet, this would be a good starting point. Once Python is ready, install Halmos using pip:

```bash
pip install halmos
```

Alternatively, for a more isolated setup, consider using Pipx to install Halmos:

```bash
pipx install halmos
```

### Running the Halmos Test

Once everything is set up, you can execute the Halmos command on the test, which is designed to simulate and verify the function without causing reverts. This process converts the function into a mathematical expression and seeks to prove or disprove the specified conditions:

```bash
halmos test HalmosTest.sol
```

### Reviewing the Output and Adjustments

After running the test, Halmos might provide insights such as counterexamples where the function might fail. These can be used to refine the tests or understand better where the code might not meet the desired conditions.

```bash
forge test --mt
```

### Conclusion

This guide should help you set up and run a basic Halmos test, illustrating the transition from Foundry-based tests to formal verification using Halmos. As with any tool, familiarity will grow with use, helping to uncover more about its capabilities and limitations.
