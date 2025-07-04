---
title: Formal Verification
---

_Follow along with this video._

---

### Layers of Testing and Formal Verification

In this lesson we're joined by Josselin and Troy from the Trail of Bits team and they impart upon us their expertise in testing and how formal verification can be used for greater security in smart contract development and security audits.

### Layer 1: Unit Tests

These are the _bare minimum_ of testing in Web3 security. Unit test will propose a specific situation to our function and validate for us that this specific situation works as intended.

For example, take the contract below.

```solidity
// SPDX-License-Identifier
pragma solidity ^0.8.13;

contract CaughtWithTest {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber + 1;
    }
}
```

In a situation like this, if the expectation was that `number` is being set to `newNumber`, a unit test would catch this. In our unit test, we would assert our expected outcome and pass a test value to our function:

```solidity
function testSetNumber() public {
    uint256 myNumber = 55;
    caughtWithTest.setNumber(myNumber);
    assertEq(myNumber, caughtWithTest.number());
}
```

Running this test, we'd see:

![defi-leveling-up-testing1](/foundry-defi/16-defi-leveling-up-testing/defi-leveling-up-testing1.png)

The unit test catches this right away. All of the most popular frameworks have unit tests built in!

### Layer 2: Fuzz Tests

Fuzz tests are configured to have random inputs supplied to a function in an effort to identify and edgecase which breaks a protocol's invariant.

An invariant is a property of a protocol which much always hold true. Fuzz testing suites attempt to break these invariants with random data.

Consider a slightly more complex contract such as below.

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public shouldAlwaysBeZero = 0;
    uint256 hiddenValue = 0;

    function doStuff(uint256 data) public {
        if (data == 2){
            shouldAlwaysBeZero = 1;
        }
    }
}
```

In this simple example, we can easily see that if we pass `2` as an argument to the `doStuff` function, the invariant of `shouldAlwaysBeZero` is broken, but assigning a value of 1. In a more complex function, the edge case may not be so clear, but we can handle complex functions the same way we handle this one.

Here's an example of a fuzz test we could perform:

```solidity
    ...
    function testIAlwaysGetZeroFuzz(uint256 data) public {
        myContract.doStuff(data);
        assert(myContract.shouldAlwaysBeZero() == 0);
    }
```

You can see, we don't explicitly declare the value for `data` in our test, and instead pass it as an argument to the test function. The Foundry framework will satisfy this argument with random data until it breaks our invariant (or stops based on configurations set). When run, we can see the framework identifies the edge case which breaks our asserted property.

![defi-leveling-up-testing2](/foundry-defi/16-defi-leveling-up-testing/defi-leveling-up-testing2.png)

### Layer 3: Static Analysis

Unit testing and fuzz testing as examples of **_dynamic tests_**, this is when code is actually executed to determine if there's a problem.

Alternatively to this, we have static analysis as a tool available to us. In static analysis testing, a tool such as [**Slither**](https://github.com/crytic/slither) or [**Aderyn**](https://github.com/Cyfrin/aderyn), will review the code and identify vulnerabilities based on things like layout, ordering and syntax.

```solidity
function withdraw() external {
    uint256 balance = balances[msg.sender];
    require(balance > 0);
    (bool success, ) = msg.sender.call{value:balance}("");
    require(success, "Failed to send Ether");
    balances[msg.sender] = 0;
}
```

The above withdraw function has a classic reentrancy attack. We know an issue like this arises from not following the CEI pattern! A static analysis tool like Slither will be able to pick up on this quite easily.

![defi-leveling-up-testing3](/foundry-defi/16-defi-leveling-up-testing/defi-leveling-up-testing3.png)

### Layer 4: Formal Verification

At a high-level, formal verification is the act of proving or disproving a property of a system. It does this by generating a mathematical model of the system and using mathematical proofs to identify if a property can be broken.

There are many ways to perform formal verification including:

- Symbolic Execution
- Abstract Interpretation
- Model Checking

We'll only really cover Symbolic Execution in this course. If you want to dive deeper into Symbolic Execution, I encourage you to take a look at [**this video**](https://www.youtube.com/watch?v=yRVZPvHYHzw) by MIT OpenCourseWare for additional context.

At a high-level, Symbolic Execution models each path in the code mathematically to identify if any path results in the breaking of an asserted property of the system.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract SmallSol {
    // Invariant: Must never revert.
    function f(uint256 a) public returns (uint256) {
        a = a + 1;
        return a;
    }
}
```

In the above simple contract example, the obvious path is returning the `result of a + 1`. Another less obvious path would be this function `f` reverting due to overflow. Symbolic Execution, through it's mathematical modelling, would traverse all possible paths, looking for criteria that break our invariant. These paths might be represented something like this:

**Path 1:** `assert(a not 2**256 - 1); a:= a+1; return a;`

**Path 2:** `assert(a := 2**256); revert;`

In the first path, a is anything less than uint256.max. In the second path, it's equal to the max and reverts.

Both of these situations can't simultaneously be true, so the formal verification solver would take the SMT-LIB code and determine which paths it's able to "satisfy". If path 2 can be satisfied, this represents a breaking of the protocol invariant/property.

> ❗ **NOTE**
> Formal verification tools use a special language to process the mathematical models of code called SMT_LIB.

Some formal verification tools available include things like Manitcore, Halmos and Certora, but even the Solidity Compiler can do many of these steps behind the scenes:

1. Explore Paths
2. Convert Paths to a set of Boolean expressions
3. Determine if paths are reachable

You can read more about the Solidity Compiler SMTChecker [**here**](https://docs.soliditylang.org/en/v0.8.26/smtchecker.html).

### Limitations of Formal Verification

Now, Formal Verification isn't a silver bullet, it does have its limitations. One of the most common of which is known as the **path explosion problem**. In essence, when a solver is presented with code that is non-deterministic or contains infinite looping, the number of possible paths approaches infinity. When this happens, a solver is unable to resolve a valid proof due to the time and computation necessary to solve.

### Wrap Up

At the end of the day, each testing methodology brings advantages and disadvantages. From my point of view, a thorough fuzz testing suite should be the _bare minimum_ standard in Web3 protocol security in 2024.

It's important to employ a robust and diverse set of testing tools to assure the greatest security coverage of a protocol.

The Trail of Bits team offers an amazing resource on building secure contracts on secure-contracts.com that is worth a read for everyone getting serious about smart contract security.

> ❗ **IMPORTANT**
> Even all this isn't a guarantee that your code is bug free.

Hopefully this has shed some light on the layers of smart contract testing and the importance of a thorough test suite and using the tools available to us.
