---
title: AI Tests and Recap
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/RYugLEPz7sE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Mastering Smart Contracts: Writing Tests and Incorporating AI

Almost done, you're doing great! In this section, we'll navigate the world of writing tests for basic contracts. This might sound dull, but twirling in some Artificial Intelligence (AI) really spices things up.

Remember, in this series, as much as we encourage leveraging AI to accelerate your learning and coding, it should aid learning, not replace it entirely. The simple reason being that if AI gets it wrong - a likely occurrence given the nascent stage of current technology - you'll be utterly lost if you haven't really grasped the concepts.

Let's dive into some practical examples, with a bit of humor, to illustrate. Yes, we'll also be using AI’s proficiency at writing tests to our advantage.

## Laying the Foundation

Our focus for the test would be `TokenTest.t.sol`, create this file in your test folder. We will start by crafting the basic structure for our testing contract. This would include SPDX license identifier, pragma solidity version, and a declaration of the contract:

```javascript
SPDX license identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {OurToken} from "../src/OurToken.sol";
import {DeployOurToken} from " ../script/DeployOurToken.s.sol";

contract OurTokenTest is Test {

}
```

Also note the need to import forge's `forge-std/Test.sol` for `Test`, OurToken from `OurToken.sol` and `DeployOurToken.s.sol`'s DeployOurToken, the script we just wrote to deploy. This script handles the deployment of our Token. It's a special scenario where the script essentially 'becomes' the Token we're deploying. Subsequently, we'll define a setup method.

In our setup,we have something like:

```javascript
contract OurTokenTest is Test {
    OurToken public ourToken;
    DeployOurToken public deployer;

    function setup() public {
        deployer = new DeployOurToken();
        ourToken = deployer.run();
    }
}
```

With that done, let’s add some addresses allowing interaction with people. This time, we’ll be involving Bob and Alice in the mix:

```javascript
address bob = makeAddr("bob");
address alice = makeAddr("alice");
```

Next, we’ll simulate a transfer of Tokens to Bob from our Token owner. We'll check Bob's Token balance afterward and ensure it equals the transferred Token amount.

```javascript
contract OurTokenTest is Test {
    OurToken public ourToken;
    DeployOurToken public deployer;

    address bob = makeAddr("bob");
    address alice = makeAddr("alice");

    uint256 public constant STARTING_BALANCE = 100 ether;

    function setup() public {
        deployer = new DeployOurToken();
        ourToken = deployer.run();

        vm.prank(msg.sender);
        ourToken.transfer(bob, STARTING_BALANCE)
    }

    function testBobBalance() public {
        assertEq(STARTING_BALANCE, ourToken.balance(bob));
    }

}
```

With the above complete we should be able to run `forge test -mt testBobBalance` in our command line to see, yes, the test passes! This is just one example. I encourage you to write more of your own tests, and in the next section we'll learn how to use AI to help.

## Generating More Tests with AI

Having established this foundational knowledge, we can now generate additional tests using AI. It's also worth noting that writing tests is something at which AI is quite proficient.

To illustrate, let’s write a test for the allowances. It's frequently a crucial part of ERC-20 tokens. Roughly put, we're allowing contracts to transfer tokens on your behalf. Here’s how you might request this of an AI model:

```bash
"Here's my Solidity ERC20 token and a few tests I've written in Solidity. Could you please generate the rest of the tests? Please include tests for allowances, transfers, and anything else that might be important."
```

Upon receiving the AI's tests output, it’s advisable to only copy what you need. Be aware not to blindly copy paste code from the AI. Since AI's can get things wrong, it’s crucial to understand what's going on, and be able to spot such false outputs.

True to this, AI's may get things wrong, like removing essential parts of the code, or introducing some redundancies. But some tests like `Test allowance works` or `Test transfer` might just be okay to use right off the bat.

Using AI to write tests should be like this: it gives you the building blocks for most of the tests, but you refine the building blocks to fit your application using your coding skills.

## Wrapping Up

That's it for this lesson! Sure, it may seem like a short tutorial, but don't be fooled. The more advanced you become in your learning, the more straightforward the concepts.

Now head off for some well-deserved rest or a little celebration – you've earned it! It's quite a feat becoming more comfortable with these foundational concepts. Having this solid foundation will take you far past your current knowledge base.

For those still shading in the gaps, don't hesitate to head over to the GitHub repo for some valuable insights to fast-track your learning. The thrill of learning awaits you in the next session. See you then! Bye!

<img src="/foundry-erc20s/erc20-ai-tests-and-recap/erc20-ai-tests-and-recap1.PNG" style="width: 100%; height: auto;">
