---
title: Top Tools used by Security Professionals
---

_Follow along with this video._

---

### Top Tools used by Security Professionals

Welcome back! Now that you have a basic understanding of what a smart contract audit involves, let's take a deeper look into the auditing process employed by security professionals and some of the tools they use to secure your code.

Being aware of the tools available in this space will even give you as developers the opportunity to employ them _during_ development. Security isn't something you can just tack onto the end of a development cycle as is best approached as a foundational consideration from the very start of development.

A couple useful GitHub repos I'll point out straight away include:

- [**solcurity**](https://github.com/transmissions11/solcurity)
- [**simple-security-toolkit**](https://github.com/nascentxyz/simple-security-toolkit)

These are great avenues to ensure your protocol is ready for an audit. The latter even includes an [**audit-readiness-checklist**](https://github.com/nascentxyz/simple-security-toolkit/blob/main/audit-readiness-checklist.md) to help you prepare.

### The Audit Process

There's no silver bullet and each individual audit may be slightly different from the last, but here's a general outline of the process a protocol will undergo when under audit.

- Manual Review
  - Go through the Code & Docs
  - Understand what the protocol should do
- Using Tools

Manual Review is arguably _the most important_ aspect of an audit. Reading the documentation and gaining context of the protocol and how it should behave. Taking the time to properly gain context can save a tonne of confusion later. Remember, most bugs are _business logic_ related, meaning it isn't actually an error in the code that causes a problem, but some inaccurate implementation of what _should_ happen.

For example:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract CaughtWithTest {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber + 1;
    }
}
```

Technically, there's nothing wrong with this code. It would only be through reading the documentation that you'd learn `setNumber` should set `number` to `newNumber` and not `newNumber + 1`.

### Tools

Let's talk about some of the tools security professionals and developers have in their toolbox.

1. **Test Suites:** This is the first line of defense and why we placed such an emphasis on them throughout the course. All of the most popular development frameworks include test suites, use them, use them often, catch those bugs.
2. **Static Analysis:** Static analysis is the process of checking code for issues without executing anything. Popular entries here include [**Aderyn**](https://github.com/Cyfrin/aderyn), [**Slither**](https://github.com/crytic/slither) and [**Mithril**](https://github.com/Consensys/mythril)
3. **Fuzz Testing:** a specific test suite methodology involving providing random data as inputs during testing.

   Two variations exist including stateless and stateful fuzz testing. Stateless fuzz tests abandon the result of a previous test before running a new test, with a new contract state. Stateful, conversely will remember the ending state of one run and use this as the starting start for the next fuzz run.

4. **Differential Testing:** We don't cover this in depth, but the idea is to write code in multiple ways and compare the results to each other to ensure validity.
5. **Formal Verification:** Formal Verification is a generic term for applying formal methods to verify the correctness of a system.

   Applying formal methods pertains to anything based on mathematical proofs, these are mathematical expressions that solve for the soundsness and validity of a system, a proof of correctness, or whether or not a bug _must_ exist. ie Symbolic Execution.

   Examples of Formal Verification tools include [**Manticore**](https://github.com/trailofbits/manticore), [**Halmos**](https://github.com/a16z/halmos), [**Certora**](https://www.certora.com/prover) and even the `Solidity Compiler`.

   There's a great article hosted by hackmd that compares many of these tools and how they work, I encourage you to [**check it out**](https://hackmd.io/@SaferMaker/EVM-Sym-Exec).

6. **AI Tools:** These can be hit or miss, but are absolutely evolving quickly. Any developer can find value in leveraging tools like Copilot, or state of the art models such as GPT4o, in their process.

   These tools, I would say, aren't yet reliable enough to be depended upon, but they can go a long way towards helping to quickly understand the context of codebases or summarizing/clarifying documentation. Don't rely on them, but keep AI tooling on your radar.

### Testing Some Tools

Now that we have some understanding of the tools used by security professionals, let's see a couple of them in action. For our purposes in this section we'll be using the [**denver-security**](https://github.com/PatrickAlphaC/denver-security) GitHub repo. Begin by cloning it locally.

```bash
git clone https://github.com/PatrickAlphaC/denver-security.git
code denver-security
```

Once open in it's own instance of VSCode, we should see a number of contracts contained within the `src` folder. Each of these is named in reference to the type of tool or test which is meant to catch the bug hidden inside.

```bash
├── src
│   ├── CaughtWithFuzz.sol
│   ├── CaughtWithManualReview.sol
│   ├── CaughtWithSlither.sol
│   ├── CaughtWithStatefulFuzz.sol
│   ├── CaughtWithSymbolic.sol
│   └── CaughtWithTest.sol
```

To start with one the simpler onces, `CaughtWithManualReview.sol`, this bug is meant to be identified simply by reviewing the code manually.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithManualReview {
    /*
     * @dev adds 2 to numberToAdd and returns it
     */
    function doMath(uint256 numberToAdd) public pure returns(uint256){
        return numberToAdd + 1;
    }

    // We should write a test for every issue we find during manual review!
}
```

By reading the comments/documentation provided, we can see that this function is not behaving as expected.

Let's look at `CaughtWithTest.sol`. This is a contract we've seen before.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithTest {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        // Whoops, this isn't right!
        number = newNumber + 1;
    }
}
```

We expect the newNumber passed to this function would be assigned to our number state variable. A simple unit test would cast this one, no problem.

Next up, `CaughtWithSlither.sol`. We can use Slither, a static analysis tool to catch the issue here.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithSlither {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 balance = balances[msg.sender];
        require(balance > 0);
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Failed to send Ether");
        balances[msg.sender] = 0;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

We haven't gone over the exploit in this code before, but it's known as reentrancy, and it's a nightmare in Web3. You can read more about reentrancy and how it works [**here**](https://solidity-by-example.org/hacks/re-entrancy/). I encourage you to familiarize yourself well with this vulnerability!

> ❗ **PROTIP**
> Check out the installation instructions for Slither [**here**](https://github.com/crytic/slither), if you want to install it and try it yourself.

With Slither installed, I can run the command `slither .` and Slither will output all of the issues it detects in our code, right to the terminal.

![top-tools1](/foundry-security/3-top-tools/top-tools1.png)

Look how easy that is. It won't catch everything, but Slither is one of those tools I believe everyone should run on their codebase before going to audit.

The `CaughtWithFuzz.sol` contract looks insane, but we have a clearly defined invariant, `should never return 0`. The fuzz testing we applied in earlier lessons would be perfect for this.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithFuzz {
    /*
     * @dev Should never return 0
     */
    function doMoreMath(uint256 myNumber) public pure returns(uint256){
        if(myNumber == 7){
            return myNumber + 78;
        }
        if(myNumber == 1238 ){
            return myNumber + 2 ;
        }
        if(myNumber == 7225 ){
            return (myNumber / 78) + 1;
        }
        if(myNumber == 75 ){
            return (myNumber % 75) + 17 - (1*1);
        }
        if(myNumber == 725 ){
            return (myNumber / 2) + 7;
        }
        if(myNumber == 123 ){
            return (myNumber / 2) + 7;
        }
        if(myNumber == 1234 ){
            return (myNumber / 2) + 7;
        }
        if(myNumber == 12345 ){
            return (myNumber / 2) + 7;
        }
        if(myNumber == 1 ){
            return (myNumber / 2) + 10 - 1 * 5;
        }
        if(myNumber == 2 ){
            return (myNumber % 2) + 6 - 1 * 5;
        }
        if(myNumber == 1265 ){
            return (myNumber % 1265) + 1 - (1*1);
        }
        return 1;
    }
}
```

A clever fuzz test like this would have no issues catching vulnerabilities in a complex function as above:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/CaughtWithFuzz.sol";

contract CaughtWithFuzzTest is Test {
    CaughtWithFuzz public caughtWithFuzz;

    function setUp() public {
        caughtWithFuzz = new CaughtWithFuzz();
    }

    function testFuzz(uint256 randomNumber) public {
        uint256 returnedNumber = caughtWithFuzz.doMoreMath(randomNumber);
        assert(returnedNumber != 0);
    }
}
```

Running this test shows us clearly the power of a thorough fuzz testing suite.

![top-tools2](/foundry-security/3-top-tools/top-tools2.png)

Our fuzz test identifies the counter-example of 1265!

What about `CaughtWithStatefulFuzz.sol`? Well, in this contract a stateless fuzz test won't cut it. The invariant of `should never return zero` is only breakable through subsequent function calls to the contract, with the first altering contract in state, such that the second call breaks our invariant.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithStatefulFuzz {
    uint256 public myValue = 1;
    uint256 public storedValue = 100;
    /*
     * @dev Should never return 0
     */
    function doMoreMathAgain(uint128 myNumber) public returns(uint256){
        uint256 response = (uint256(myNumber) / 1) + myValue;
        storedValue = response;
        return response;
    }

    function changeValue(uint256 newValue) public {
        myValue = newValue;
    }
}
```

In the above, if changeValue is called with 0, and then doMoreMathAgain is also called with 0, our invariant will break. We'll need a stateful fuzz suite to catch this one.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdInvariant.sol";
import "../src/CaughtWithStatefulFuzz.sol";

contract CaughtWithStatefulFuzzTest is StdInvariant, Test {
    CaughtWithStatefulFuzz public caughtWithStatefulFuzz;

    function setUp() public {
        caughtWithStatefulFuzz = new CaughtWithStatefulFuzz();
        targetContract(address(caughtWithStatefulFuzz));
    }

    function testFuzzPasses(uint128 randomNumber) public {
        caughtWithStatefulFuzz.doMoreMathAgain(randomNumber);
        assert(caughtWithStatefulFuzz.storedValue() != 0);
    }

    function invariant_testMathDoesntReturnZero() public {
        assert(caughtWithStatefulFuzz.storedValue() != 0);
    }
}
```

We can see here the running our stateful fuzz test `invariant_testMathDoesntReturnZero` identifies the arguments to pass and order of functions to call which breaks our invariant.

![top-tools3](/foundry-security/3-top-tools/top-tools3.png)

Lastly, we have `CaughtWithSymbolic.sol` where we can actually just use the solidity compiler to try and catch some bugs.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CaughtWithSymbolic {

    function functionOne(int128 x) public pure {
        if (x / 4 == -2022) {
            revert(); // BUG
        }
    }

    function functionOneSymbolic(int128 x) public pure {
        if (x / 4 == -2022) {
            assert(false);
            revert(); // BUG
        }
        assert(true);
    }
}
```

We haven't gone over this, but in solidity we can use `assert` statements to tell the compiler that something should, or shouldn't be the case at any given point of our code. In the above, we're saying that x/4 == -2022 should never be the case, as if the if conditional is satisfied, our assertion is true and the function reverts.

We're able to configure a number of details to provide the solidity compiler.

```js
[profile.default.model_checker]
contracts = {'./src/CaughtWithSymbolic.sol' = ['CaughtWithSymbolic']}
engine = 'chc'
timeout = 1000
targets = ['assert']
```

By running `forge build` with these settings, we'll receive an output from our compiler, clearly indicating where the assertion is violated with a counter-example:

![top-tools4](/foundry-security/3-top-tools/top-tools4.png)

### Wrap Up

Great! I hope this lesson has shed some light on some of the tools used by security professions (and developers) to keep a code base secure. We cover much of this in greater detail in the Security & Audit course on Cyfrin Updraft, so for those interested, please dive in.

In the next lesson, we're joined by Tincho of The Red Guild to explore some manual review best practices and the approach he takes while auditing.

See you there!
