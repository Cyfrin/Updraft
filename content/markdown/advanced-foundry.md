---
id: 841d2824-6665-4f1e-8352-e0dbadf62bfb
blueprint: course
title: "Advanced Foundry"
updated_at: 1702912458686
github_url: "https://github.com/Cyfrin/path-solidity-developer-2023"
preview_image: https://res.cloudinary.com/droqoz7lg/image/upload/v1701193477/updraft/courses/y2uthyu5atnxhhd8aar6.png
duration: 13
description: |-
        Become a Foundry expert! Learn advanced techniques to develop, deploy, test, optimise and interact with your smart contract using industry standard tools used by the top smart contracts engineers in web3
overview: |-
        Foundry, stablecoins, DeFi, DAOs, advanced smart contract development, advanced smart contracts testing, fuzz testing, manual verification
preRequisites: |-
    Blockchain basics
    Solidity fundamentals
    Foundry fundamentals
authors:
  - content/authors/patrick-collins.json
  - content/authors/ciara-nightingale.json
  - content/authors/vasiliy-gualoto.json
  - content/authors/nader-dabit.json
  - content/authors/ally-haire.json
  - content/authors/juliette-chevalier.json
  - content/authors/vitto-rivabella.json
  - content/authors/harrison.json
sections:
  -
    title: "Develop an ERC20 Crypto Currency"
    slug: How-to-create-an-erc20-crypto-currency
    lessons:
      -
        type: new_lesson
        enabled: true
        id: c2420d11-5dcd-4f42-b26e-91e6234119b9
        title: "Introduction to ERC fundamentals and ERC20"
        slug: erc-and-erc20-fundamentals
        duration: 5
        video_url: "jv9up9fhEPfv2wWrK4Unv01xYQMzmPRxGQXZG72fu4zg"
        raw_markdown_url: "/routes/advanced-foundry/1-erc20s/1-erc20-basics/+page.md"
        description: |-
                    Delve into the fundamentals of ERC20 tokens. Understand the critical concepts of Ethereum Improvement Proposals (EIPs) and Ethereum Request for Comments (ERCs), focusing particularly on the ERC20 Token Standard. Learn about the creation and significance of ERC20 tokens and explore notable examples.
        markdown_content: |-
          ---
          title: ERC20 Basics
          ---
          
          _Follow along the course with this video._
          
          
          
          # Understanding ERC20 Tokens in Ethereum: A Comprehensive Guide
          
          Welcome back! We're about to dive deep into the fascinating world of ERC20 tokens.
          
          <img src="/foundry-erc20s/1-erc20-basics/erc20-basics1.PNG" style="width: 100%; height: auto;">
          
          Before we plunge into building an ERC20 token, let's first explore what it is, and understand the concepts of EIP (Ethereum Improvement Proposals) and ERC (Ethereum Request for Comments).
          
          ## What is an ERC? What is an EIP?
          
          <img src="/foundry-erc20s/1-erc20-basics/erc20-basics3.PNG" style="width: 100%; height: auto;">
          
          Both Ethereum and other blockchains like Avalanche, Binance, and Polygon have mechanisms for improving their protocols, known as 'improvement proposals'. In Ethereum's ecosystem, these are called Ethereum Improvement Proposals or EIPs.
          
          Developers submit ideas to enhance Ethereum or other layer one protocols like Polygon, Matic or Avalanche on GitHub or other open source repositories. These improvements range from core blockchain updates to broad, best practice standards for the community to adopt.
          
          <img src="/foundry-erc20s/1-erc20-basics/erc20-basics5.PNG" style="width: 100%; height: auto;">
          
          In other blockchains, these proposals and request for comments are tagged differently (for example, BEP, PEP, etc), but they contain the same types of information. Interestingly, the numbers following ERC or EIP (like in ERC20 or EIP20), are chronological and shared between the two, signifying the order in which they were introduced. For real-time updates on the process of new EIPs, check out [EIPS Ethereum.org](https://eips.ethereum.org/).
          
          ## What is the ERC20 Token Standard?
          
          <img src="/foundry-erc20s/1-erc20-basics/erc20-basics4.png" style="width: 100%; height: auto;">
          
          Among these EIPs and ERCs, the ERC20, or Token Standard for smart contracts, is one of the most significant. It delineates how to create tokens within smart contracts.
          
          ERC20 tokens are those deployed on a blockchain using the ERC20 token standard. Essentially, it's a smart contract that represents a token - both a token and a smart contract in one. Check out the [ERC20 Token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) for a deep dive.
          
          Notable examples of ERC20 tokens include Tether, Chainlink, Uni Token, and Dai. Interestingly, while Chainlink qualifies as an ERC677, it is fully compatible with ERC20 and just offers some additional functionality.
          
          ## Why Create an ERC20 Token?
          
          <img src="/foundry-erc20s/1-erc20-basics/erc20-basics2.PNG" style="width: 100%; height: auto;">
          
          There are multiple applications of ERC20 tokens. They are used for governance, securing an underlying network, or creating synthetic assets, among other things.
          
          ## Building an ERC20 Token
          
          How do we go about creating an ERC20 token? Simple. By creating a smart contract that adheres to the token standard. This involves building a smart contract with certain functions, including name, symbol, decimals, etc. Also, it should be transferable and display its balance.
          
          You can explore more advanced, ERC20 compatible tokens with improvements (such as ERC677 or ERC777), just make sure they align with your project requirements. Enjoy the process of building your ERC20 token and the new possibilities it opens up!
          
      -
        type: new_lesson
        enabled: true
        id: 72b71dd8-336c-4536-8a0e-304ea4043591
        title: "Creating an ERC20"
        slug: create-an-erc20
        duration: 7
        video_url: "NDCBrRF1QeTJUuCPnQLXBrjnFbt4B3KQbUYl52LpevI"
        raw_markdown_url: "/routes/advanced-foundry/1-erc20s/2-erc20-manual-creation/+page.md"
        description: |-
                    This lesson guides you through the manual creation of your own ERC20 token using Solidity. It covers the setup of your development environment, initialization of your project repository, and step-by-step instructions to build and define your ERC20 token's properties and functionalities.
        markdown_content: |-
          ---
          title: ERC20 Manual Creation
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          # Creating Your Own ERC20 Token in Solidity Code
          
          Welcome Back! Having covered the basics, let's look at how we can manually create our own ERC20 token.
          
          ## Setting Up Your Development Environment
          
          Open a terminal in Visual Studio Code and run the following:
          
          ```sh
          mkdir foundry-erc20-f23
          cd foundry-erc20-f23
          code .
          ```
          
          The above commands will create a new directory for our project, navigate into it, and open the directory in a new Visual Studio Code window.
          
          Once we have Visual Studio Code running, we need to initialize a blank repository. Open up the built-in Terminal and execute the following command:
          
          ```sh
          forge init
          ```
          
          Completing these steps sets up a development environment complete with a fully-equipped CI/CD pipeline courtesy of GitHub workflows for later code testing &amp; deployment.
          
          ## Getting Started With Your ERC20 Smart Contract
          
          Next, let's get down to the nitty-gritty of our project — our own ERC20 token! But first, a spring cleaning is due. Remove the sample files from the fresh repository so that you can start coding from scratch. This step is as uncomplicated and swift as a couple of clicks and keyboard strokes away!
          
          Having cleared the playing field, it's time to layer the groundwork for our ERC20 token. To do this, we'll be referencing the ERC20 Token Standard, covering all the key methods that we need.
          
          Let's start by creating a new Solidity file named `OurToken.sol`. Right click the `src` folder in the left navigation panel and select `new File`.
          
          <img src="/foundry-erc20s/2-erc20-manual-creation/erc20-manual-creation1.PNG" style="width: 100%; height: auto;">
          
          ## Paving the Way for Your Custom Token
          
          The inception of our token begins with some basic instructions for the Ethereum virtual machine — where our contract code will live, breathe, and operate.
          
          ```javascript
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          contract OurToken{}
          ```
          
          The `SPDX-License` specifies the type of license our code carries, while `pragma solidity` specifies the Solidity compiler version that our contract is compatible with.
          
          Ensuing this, we set forth to define several properties that will shape our token's identity. The ERC20 standard necessitates the definition of a `name`, `totalSupply`, and a `decimals` property. In our contract, this translates to:
          
          ```javascript
              string public name = "OurToken";
              uint256 public totalSupply = 100000000000000000000;
          ```
          
          The decimals property signifies the number of decimal points that can be used in our token. Given that the Ethereum network operates in Wei (the smallest denomination of Ether), it's a good practice to use 18 decimal places for interoperability with other token contracts.
          
          ```javascript
              uint8 public decimals = 18;
          ```
          
          Reaching this stage of our token creation, our contract should look something like this:
          
          ```javascript
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          contract OurToken{
              string public name = "OurToken";
              uint256 public totalSupply = 100000000000000000000;
              uint8 public decimals = 18;
          
          }
          ```
          
          ## Building the Internal Structure for Our Token
          
          Our token also needs some internal structure and mechanisms to function, chiefly, a way to track balances of all the users interacting with it.
          
          First, we use a Solidity mapping data structure to connect user addresses with their token balances. This balance tracking mapping looks like:
          
          ```javascript
              mapping (address => uint256) private _balances;
          ```
          
          Next, we functionally implement the ability for anyone to view their current token balance via the `balanceOf` method.
          
          ```javascript
              function balanceOf(address account) public view returns (uint256) {
                  return _balances[account];
              }
          ```
          
          Juxtaposed against the backdrop of token balance mapping, the `balanceOf` method takes an account's address as input and returns the corresponding balance. This signifies that having tokens in an ERC20 simply translates to some balance in a contract's mapping.
          
          ## Making the Token Transferable
          
          Our token is still a bit static. Let's bring it to life by implementing the `transfer` function which helps users send tokens to other addresses:
          
          ```javascript
              function transfer(address recipient, uint256 amount) public returns (bool) {
                  uint256 senderBalance = _balances[msg.sender];
                  require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
                  _balances[msg.sender] = senderBalance - amount;
                  _balances[recipient] += amount;
          
                  return true;
              }
          ```
          
          Here's what these lines of code are doing:
          
          1. Fetch the balance of the sender (the person calling this function).
          2. Use the `require` function to make sure the sender has enough tokens. If they don't, the entire function will fail.
          3. Subtract the transfer amount from the sender's balance.
          4. Add the transfer amount to the recipient's balance.
          
          Well, that's the first iteration of our token! We could go further and implement other functions like `allowance` and `transferFrom` which would make our token more versatile with better utility. But for brevity reasons, we'd leave that for another day.
          
          In conclusion, the journey to coding your own ERC20 token isn't as daunting as it seems. With Solidity, a good text editor, and little patience, you can make your own way into the Ethereum developer community. I hope this guide leaves you better equipped in your Ethereum dev journey and evokes your interest in delving deeper into the vastly interesting world of blockchain programming. Good luck and happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 9c7cfcb9-a693-4933-a006-4f046a9bdecf
        title: "Explore Open Zeppelin"
        slug: erc20-open-zeppelin
        duration: 4
        video_url: "esyU6xorSNYu1IcPMS9q1YYL4UQWaj2e5Z01QZ7WjVaU"
        raw_markdown_url: "/routes/advanced-foundry/1-erc20s/3-erc20-open-zeppelin/+page.md"
        description: |-
                    Explore the use of the OpenZeppelin framework for smart contract development. Learn how to leverage pre-deployed, audited, and ready-to-go contracts to simplify the creation process of your ERC20 token.
        markdown_content: |-
          ---
          title: ERC20 Open Zeppelin
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          # Using Pre-Deployed, Audited, and Ready-to-Go Smart Contracts with OpenZeppelin
          
          Welcome back! Creating your own smart contracts can be a complex task. As your experience grows, you might find yourself creating similar contracts repeatedly. In such cases, wouldn't it be more convenient to use pre-deployed, audited, and ready-to-go contracts? In this section, I'll guide you on using the OpenZeppelin framework to achieve this.
          
          <img src="/foundry-erc20s/3-erc20-open-zeppelin/erc20-open-zeppelin2.PNG" style="width: 100%; height: auto;">
          
          ## OpenZeppelin Framework
          
          Access [OpenZeppelin's documentation](https://docs.openzeppelin.com/contracts/4.x/) via their official website. By navigating to [Products &gt; Contracts](https://www.openzeppelin.com/contracts), you can discover a vast array of ready-to-use contracts.
          
          Additionally, OpenZeppelin offers a contract wizard, streamlining the contract creation process — perfect for tokens, governances, or custom contracts.
          
          ## Creating a New Token
          
          Rather than manual implementations, let's craft a new token named 'OurToken'. Here's an outline of our token's structure:
          
          ```javascript
          // OurToken.sol
          SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          contract OurToken {
          
          }
          ```
          
          ## Installing OpenZeppelin Contracts
          
          Next, we will install the OpenZeppelin contracts to our project. Navigate to their [official GitHub repository](https://github.com/OpenZeppelin/openzeppelin-contracts) and copy the repository path.
          
          In your terminal, run the following command to install the OpenZeppelin contracts:
          
          ```bash
          forge install openzeppelin/openzeppelin-contracts --no-commit
          ```
          
          Upon successful installation, you'll find the OpenZeppelin contracts in your project's lib folder. Your contract library will now contain audited contracts you can readily use like the ERC20 contract.
          
          ## Inheriting and Implementing Contracts
          
          After accessing the OpenZeppelin contracts, you can now import and inherit from them. To do this, we first need to remap the OpenZeppelin contracts in our foundry.toml file:
          
          ```javascript
          [remappings] = "@openzeppelin-contracts=lib/openzeppelin-contracts";
          ```
          
          Then, simply import and inherit from ERC20.sol in our 'OurToken.sol' file like this:
          
          ```javascript
          SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          import "@openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
          
          contract OurToken is ERC20 {
              constructor(uint256 initialSupply) ERC20("OurToken", "OT"){
                  _mint(msg.sender, initialSupply);
                  }
          }
          ```
          
          Notice that the constructor of OurToken uses the ERC20 constructor and needs a name and a symbol. I also used the \_mint function, provided by ERC20, to create the initial supply of tokens to the sender.
          
          ## Testing That Your Contracts Compile
          
          Now, it's time to make sure things compile. To do this, run the command:
          
          ```bash
          forge build
          ```
          
          If everything went smoothly, the output should indicate that your contract has been successfully compiled, something like this:
          
          <img src="/foundry-erc20s/3-erc20-open-zeppelin/erc20-open-zeppelin1.PNG" style="width: 100%; height: auto;">
          
          ---
          
          In summary, using pre-deployed and audited contracts like OpenZeppelin can streamline your development process when working with Smart Contracts. This approach lets you leverage proven code which reduces the risk of errors and increases your project's reliability. Don't hesitate to explore and utilize these contract libraries in your future blockchain development ventures!
          
      -
        type: new_lesson
        enabled: true
        id: 7f90804e-7f7f-4818-8e9f-93f077970522
        title: "Deploy your ERC20 crypto currency"
        slug: erc20-deploy-script
        duration: 3
        video_url: "q01Umr02SsMoZiqPlG21kTRw6ooVH00oizN00W1TU9DMPvs"
        raw_markdown_url: "/routes/advanced-foundry/1-erc20s/4-erc20-deploy-script/+page.md"
        description: |-
                    This lesson provides a comprehensive guide on deploying your ERC20 token. It includes instructions for setting up a deployment script, using the deployment script to deploy your token, and tips for finalizing and testing the deployment process efficiently.
        markdown_content: |-
          ---
          title: ERC20 Deploy Script
          ---
          
          _Follow along the course with this video._
          
          
          
          # Deploying Our Token: A Step By Step Guide
          
          If you've ever wondered how to deploy a token, and more importantly, test it and write scripts to deploy it - then you've come to the right place. Buckle up, because we're about to journey through this process. Let's get started!
          
          ## Initiating the Deployment
          
          <img src="/foundry-erc20s/4-erc20-deploy-script/erc20-deploy-script1.png" style="width: 100%; height: auto;">
          
          To initiate this, we're going to deploy OurToken.sol. Now, you might be asking why we don't need a helper config here - what about those special contracts that we would need to interact with? Well, this deployment is unlike any other because our token will be identical across all chains. No special contracts or config will be needed!
          
          Let's start with a simple script to keep things light and compact:
          
          ```javascript
          SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          import {Script} from "forge-std/Script.sol";
          
          contract DeployOurToken is Script {
          
          }
          ```
          
          ## Creating a Function Run
          
          We'll need to import our token like so:
          
          ```javascript
          import { Script } from "forge-std/Script.sol";
          ```
          
          Next, let's create a function, run, that will be external. Within the run function, we’ll do `vm.startBroadcast()`. In our run function, we need to initiate the VM broadcast as shown, we'll need to give it an initial supply too, say 1000 ether. That’s right, our token needs an initial amount to start with and finally, we'll want to return OurToken, for use later:
          
          ```javascript
          SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          import {Script} from "forge-std/Script.sol";
          import {OurToken} from "../src/OurToken.sol";
          
          contract DeployOurToken is Script {
              uint256 public constant INITIAL_SUPPLY = 1000 ether;
          
              function run() external return(OurToken){
                  vm.startBroadcast();
                  OurToken ot = new OurToken(INITIAL_SUPPLY);
                  vm.stopBroadcast();
          
                  return ot;
              };
          }
          
          ```
          
          Following this, we'll deploy our token using the initial supply because, remember, our token requires an initial supply. We then stop the VM broadcast, and voila, our script is ready!
          
          ## Adding the Final Touches
          
          <img src="/foundry-erc20s/4-erc20-deploy-script/erc20-deploy-script2.png" style="width: 100%; height: auto;">
          
          For the final touches, we can use a nifty trick. We can borrow from our previous projects or directly from the git repo that corresponds with this tutorial. We'll generate a Makefile for this. Create this new file in your project's root directory. We'll visit foundry-erc20-f23 and just put everything into this Makefile. Guess what, we can just copy the whole thing!
          
          Find the Makefile to copy [here:](https://github.com/Cyfrin/foundry-erc20-f23/blob/main/Makefile)
          
          Once you’ve copied over the Makefile, you can simply run the command `make deploy`. If you encounter any errors, just create a new anvil using `make anvil` and once again run `make deploy`.
          
          The compiler should now run successfully and your token is officially deployed to your anvil chain. Congratulations, you have just deployed your token!
          
          <img src="/foundry-erc20s/4-erc20-deploy-script/erc20-deploy-script3.PNG" style="width: 100%; height: auto;">
          
          By following these steps, you have simplified the process of deploying and testing a token. Who'd have thought it could be this straightforward and efficient?
          
      -
        type: new_lesson
        enabled: true
        id: 180ff894-f0fb-48c9-a7f1-2e45baeabd8f
        title: "Test your ERC20 using AI"
        slug: erc20-ai-tests-and-recap
        duration: 16
        video_url: "o97DyQMQaeyQovg02NPjdyChnCL7R3BBGDQXkn701eT7s"
        raw_markdown_url: "/routes/advanced-foundry/1-erc20s/5-erc20-ai-tests-and-recap/+page.md"
        description: |-
                    Master the art of writing tests for your smart contracts, incorporating Artificial Intelligence (AI) to enhance the process. This lesson focuses on using AI to generate and execute tests efficiently, offering insights into best practices and considerations when integrating AI into your testing workflow.
        markdown_content: |-
          ---
          title: AI Tests and Recap
          ---
          
          _Follow along the course with this video._
          
          
          
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
          
          <img src="/foundry-erc20s/5-erc20-ai-tests-and-recap/erc20-ai-tests-and-recap1.PNG" style="width: 100%; height: auto;">
          
    type: new_section
    enabled: true
  -
    title: "Develop an NFTs Collection"
    slug: how-to-create-an-NFT-collection
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 2dd01e95-bf3d-4cc6-8bd2-8b7d779863a3
        title: "Introduction to NFTs"
        slug: introduction-to-nfts
        duration: 3
        video_url: "HZkX4TjOalhdptyolgs7t8026udJE02UpxVKYt4pJYY024"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/1-nfts/+page.md"
        description: |-
                    his introductory lesson on Non-Fungible Tokens (NFTs) covers the basics of NFTs, including their creation, dynamics, and values. It features a practical project involving dynamic NFTs of dogs, emphasizing the addition of NFTs to MetaMask and connecting with platforms like OpenSea for selling NFTs.
        markdown_content: |-
          ---
          title: NFTs
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Hello there, coding enthusiasts! As we move forward in our Solidity journey, we're inching closer towards becoming proficient, practical Solidity developers, ready to take on real-world challenges. In today's session, we're diving straight into the fascinating world of Non-Fungible Tokens (NFTs); afterward, we'll venture into the intricate web of DeFi, upgradable contracts, governance, and a glimpse into security. Excited? Let's get our hands dirty!
          
          <img src="/foundry-nfts/1-intro/intro1.png" style="width: 100%; height: auto;">
          
          ## A Quick Overview of the Code Base
          
          Let's begin by exploring our course content. Our NFT project will entail creating dynamic NFTs of adorable dogs using VS Code. What's more, these tokens will evolve and carry fluctuating values. We aim to help you gain an in-depth understanding of NFTs, what makes them so special, and their functionality.
          
          Eventually, we'll be able to add our NFTs right into our MetaMask, a thrilling outcome!
          
          ## An Introduction to Two Types of NFTs
          
          Time to move onto specifics. There are two types of NFTs we will create:
          
          1. **Basic NFT:** The basic (yet super exciting!) NFT will depict a cute little pug, which will be stored in InterPlanetary File System (IPFS).
          2. **Advanced NFT:** We'll move to the advanced level by designing an NFT stored entirely on-chain, a genuinely decentralized form. An interesting attribute of this NFT is that its SVG will fluctuate depending upon the mood state we assign.
          
          Our goal is to give this NFT a dynamic personality, so to say, allowing it to mirror our mood swings. Just imagine—crafting mood-reflective tokens and importing them into an empty MetaMask!
          
          <img src="/foundry-nfts/1-intro/intro2.png" style="width: 100%; height: auto;">
          
          ### Looking Further: Selling the NFTs
          
          Apart from MetaMask, we also aim to connect with platforms like OpenSea. This move will allow us an interactive space to sell our NFTs, engage with NFT communities, and do much more.
          
          We'll cap things off by unraveling the mysteries of API and function selector codes, giving you a well-rounded understanding of these fundamental aspects of Solidity.
          
          ## Unraveling the NFT
          
          After understanding our course layout, let's explore what an NFT is. NFTs, or Non-Fungible Tokens, represent a unique set of data stored on Ethereum's digital ledger or blockchain. These tokens can literally represent anything — virtual real-estate, digital art, and much more! To give it a fitting analogy for our course:
          
          <img src="/foundry-nfts/1-intro/intro3.png" style="width: 100%; height: auto;">
          
          Now, we're surely thrilled to begin. So, strap yourself in, and let's delve into the adventurous world of NFT creation in Solidity.
          
          Stay curious, and stay tuned for our next session as we build, learn, and master the art of coding!
          
      -
        type: new_lesson
        enabled: true
        id: f83641db-a754-4415-81f4-1aa1cfd3951c
        title: "What is an NFT"
        slug: what-is-a-nft
        duration: 7
        video_url: "3Odz00lddAmiCzUa4HIkRZncD68MD00sBAqjkdkUmw7co"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/2-what-is-a-nft/+page.md"
        description: |-
                    Dive deep into the world of Non-Fungible Tokens (NFTs), exploring their uniqueness compared to traditional tokens (ERC20s). The lesson focuses on the distinct nature of NFTs, their application in digital art, and the use of platforms like OpenSea and Rarible for trading.
        markdown_content: |-
          ---
          title: What is a NFT?
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Hello dear students! Today, we'll be diving deep into Non-Fungible Tokens (NFTs) from the perspective of a Python novice while also embarking on an ultimate NFT tutorial. Our journey will help unravel the inquisitiveness in you, becoming experts in blockchain and cryptocurrency technology.
          
          ## Defining NFTs
          
          NFTs, called `ERC721`s, are the latest craze in the digital world as they are considered a prized possession on the Ethereum platform. For the uninitiated, NFT stands for Nonfungible token and is a token standard similar to ERC 20. You might recognize `ERC20s` by familiar names like Link, Ave Maker, which are found on the Ethereum chain.
          
          <img src="/foundry-nfts/2-what-is/whatis1.png" style="width: 100%; height: auto;">
          
          The sparkle of NFTs lies in their unique nature. Unlike ERC 20s where one token is always equivalent to another same token, NFT or nonfungible token is unique and not interchangeable with any other token of its class. To simplify, consider this: one dollar is equivalent to another dollar. However, this is not the case in NFTs.
          
          <img src="/foundry-nfts/2-what-is/whatis2.png" style="width: 100%; height: auto;">
          
          ## The Unparallel Power of Art in NFTs
          
          NFTs aren't limited in scope. They can be deemed as a digital version of art pieces possessing an incorruptible and permanent history. Of course, their application isn't only confined to art. You can enrich them with stats, make them do battle, or do unique stuff with them. For instance, NFTs are viewed, bought, and sold on various platforms like [OpenSea](https://opensea.io/) or [Rarible](https://rarible.com/).
          
          Though one might consider NFTs ridiculous initially (I too was in that boat once!), their value becomes clear when pondered over their benefits. Artists often face attribution and compensation problems. With NFTs, artists can be adequately compensated for their contributions through a decentralized royalty mechanism, which is fair, transparent, and free from intermediary service.
          
          ## Exploring ERC721 and ERC20
          
          Now, let's delve further into the NFT standards: the ERC 721 standard or the NFT standard. They serve as the foundation for NFTs. However, the semi-fungible token standard, the ERC 1155, isn't the focus of our discussion today but is still worth exploring.
          
          The key differences between a 721 and ERC 20 lie in the mapping between an address and its holdings. ERC 20s have a simple mapping compared to 721’s that holds unique token IDs. Each token is unique, with a unique owner and a 'token Uri', defining what each asset looks like.
          
          If you know Ethereum, you are aware of the high gas prices and expensive costs of storing a lot of space. This is where 'Token Uri' enters the scene. They are a unique indicator of what assets or tokens look like, and the characteristics of these tokens. A regular 'token uri' returns a format with the name, image location, description, and below mentioned attributes.
          
          ## The Dilemma: On-chain Vs. Off-chain Metadata
          
          There's often discourse on whether to store NFT data on-chain or off-chain. Off-chain storage is simpler and cheaper, with options like [IPFS](https://ipfs.io/) or even a centralized API. However, this come with risks of losing the image and all data associated with the NFT if the API goes down.
          
          <img src="/foundry-nfts/2-what-is/whatis3.png" style="width: 100%; height: auto;">
          
          ## Getting Hands-on with NFT Deployment
          
          If you're a newbie in NFTs and all that we've discussed feels a bit overwhelming, do not worry. Here's a simplified process for you: add your image to IPFS, add a metadata file pointing to that image file on IPFS, and grab that Token Uri and set it as your NFT.
          
          In short, understanding NFTs and its various characteristics and usages can render you capable of building creative NFTs and games with unique properties. And most importantly, it authenticates the NFTs as the properties will always remain on the chain.
          
          Stay tuned for more engaging content about NFTs, Blockchain, Ethereum, and more. Let's continue on this exciting journey of digital innovations together!
          
      -
        type: new_lesson
        enabled: true
        id: 08185616-d253-4f6a-b0e7-719c89386074
        title: "Foundry setup"
        slug: foundry-setup
        duration: 11
        video_url: "yquUfB2EF54qwmTY9faT8IvuJB33XYY5kLJ009225wJY"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/3-foundry-setup/+page.md"
        description: |-
                    This session guides you through setting up the Foundry environment for NFT development. It includes instructions on creating directories, initializing your project, and using OpenZeppelin contracts for defining NFTs, highlighting the process of minting and deploying NFT images.
        markdown_content: |-
          ---
          title: Foundry Setup
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Hello, coders! Now that we have an idea about NFTs, we're all set to start coding our first-ever Non-fungible tokens. If you want to follow along, feel free to pass by the course materials where the GIT code associated with this lesson is located.
          
          ## Setting Up the Environment
          
          First, as usual, we create a new directory for our project.
          
          ```shell
          mkdir foundry-nft-f23
          ```
          
          Then, let's switch to our newly created directory.
          
          ```shell
          cd foundry-nft-f23
          ```
          
          Next, we'll launch our text editor (I'm using the popular Visual Studio Code in this case) from the terminal.
          
          ```shell
          code foundry-nft-f23
          ```
          
          Before anything else, let's fire up the terminal, close the explorer and initiate our working directory to clean any residual files.
          
          ```shell
          forge init
          ```
          
          Check if the '.env' file exists and also add 'broadcast.'
          
          ## Creating Our Basic NFT
          
          The NFT we are about to create is a token standard, similar to the ERC 20. The best part about this is that we don't need to walk through all the functions. We can save some time using our trusty package `OpenZeppelin`.
          
          Looking at the Open Zeppelin contracts, there's a token folder that hosts an ERC721.sol contract. This contract has almost all the functionality that we need for our NFT.
          
          ```shell
          forge install OpenZeppelin/openzeppelin-contracts
          ```
          
          By now, already you know that SPDX license identifier, MIT, and Pragma, solidity version are mandatory elements in a solidity file. Here's how we're defining our 'basicNFT.sol' file –
          
          ```js
          //SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          contract BasicNFT {...}
          ```
          
          We'll import the OpenZeppelin contracts package, point to the ERC 721 protobuf file, and declare our basic NFT contract.
          
          ```js
          import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
          ```
          
          Voila, our basic NFT ecosystem is ready for use, and its name will be dog and symbol as doggy.
          
          ```shell
           constructor() ERC721("Dogie", "DOG") {}
          ```
          
          But are we done yet? No. Now, we need to define the appearance of our NFTs and define how to obtain these tokens.
          
          ## Token Standard and Counter
          
          Looking at the ERC 20 token standard, it has a balanceOf function. But in NFTs, the 'amount' of tokens doesn't matter as each of them is unique and thus can have distinct values. Here, the 'ownerOf' function is used to give each token a unique ID.
          
          The unique NFT is denoted by a combination of the contract's address that represents the entire collection and the token's ID. So, we are going to use a 'token counter' to keep track of each token's unique ID.
          
          ```shell
          uint256 private s_tokenCounter;
          ```
          
          Our token counter's initial value will be zero, and it will increase as we mint new 'dog' tokens.
          
          <img src="/foundry-nfts/3-setup/setup1.png" style="width: 100%; height: auto;">
          
          ## Minting the Puppy NFT
          
          The minting function that we're about to define will allow us to produce our puppy tokens. This function is very crucial in the EIP721, the tokenUri. Although initially considered an optional parameter, the tokenUri, which stands for Token Uniform Resource Identifier, returns an API endpoint containing the NFT's metadata.
          
          <img src="/foundry-nfts/3-setup/setup2.png" style="width: 100%; height: auto;">
          
          This metadata outlines the appearance of our NFT, including a title, a type, properties, and an image. The Uri points to the object that dictates the NFT's looks.
          
          ```shell
          function tokenURI(uint256 tokenId) public view override returns (string memory) {}
          ```
          
          Here we override the base’s tokenUri method with our custom method. Notice that whenever we want to look at what an NFT looks like, we call this function. The NFT’s look is determined by the image that this function returns.
          
          ## Deploying Images for NFT
          
          Our puppy NFTs are ready to be brought to life. In our GitHub repository, we have the NFT images you can use for your first NFT. Once you select and download your desired puppy, let’s save it to the 'img' folder that we created in the project's directory.
          
          <img src="/foundry-nfts/3-setup/setup3.png" style="width: 100%; height: auto;">
          
          Wow! It was a smooth journey, and we have successfully prepared our NFT images which are ready to be deployed using IPFS. Stay tuned for the next section where we will delve deeper into IPFS and how we can use it.
          
      -
        type: new_lesson
        enabled: true
        id: 026164a1-de31-43b2-8f33-7471d8d6934d
        title: "Introduction to IPFS"
        slug: what-is-ipfs
        duration: 8
        video_url: "FpDGLnN3VHMKKMfDsLABpkRXQuTH6Ty9DhQHAdc8UbM"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/4-ipfs/+page.md"
        description: |-
                    Learn about the Interplanetary File System (IPFS), a decentralized data storage system, and its use in NFT development. Understand the concept of hashing data, pinning it on IPFS nodes, and the global network of nodes, differentiating it from blockchain in terms of data storage and access.
        markdown_content: |-
          ---
          title: IPFS
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          In this comprehensive guide, I will explain how to use the Interplanetary File System (IPFS), a revolutionary distributed decentralized data structure. While it's not exactly a blockchain, its working mechanisms are somewhat similar – without the element of data mining. What IPFS does, instead, is what we call 'pinning data'.
          
          You can get a glimpse of how IPFS works in the official [IPFS documentation](https://docs.ipfs.io/)
          
          ## IPFS: A Unique Approach to Data Management
          
          The IPFS process starts with a code, file, or any other form of data.
          
          ```
          Piece of Data => Hash Function => Unique Hash
          ```
          
          The first thing IPFS does is to hash this data, yielding a unique output. Whether your data contains a massive code file or a ton of text, it gets turned into a unique hash function. The IPFS node carries out this hashing for you, with all IPFS nodes across the globe using the exact same hashing function.
          
          ```
          Same Hashing Function => Consistent Unique Output
          ```
          
          Once data is hashed and a unique output obtained, then comes the 'pinning' part. You can pin the data, the code, the file on your IPFS node. The only role of the node is to host this data and store these hashes, nothing more.
          
          ```
          Hashed Data => Pin Data => Data Stored on Node
          ```
          
          <img src="/foundry-nfts/4-ipfs/ipfs1.png" style="width: 100%; height: auto;">
          
          ## Building a Global Network of Nodes
          
          Here's where the magic happens: your node connects to a vast network of other IPFS nodes. These nodes communicate with each other vastly lighter than any blockchain node.
          
          For instance, when you request your network for a specific hash, the nodes engage in a conversation until one comes up with your data. This mechanism might initially seem centralized since the data resides on one node.
          
          However, other nodes on the network can also pin your data if they wish, thus creating a copy of your data on their node as well.
          
          ```
          Network Nodes => Share and Pin Each Other Data => Decentralized Data
          ```
          
          With the ability to replicate any data in a decentralized manner, IPFS nodes offer straightforward functionality with a simple setup. It's also essential to note the drastic difference between blockchain and IPFS in this respect – IPFS nodes cannot execute smart contracts. In simple terms, they only offer decentralized storage.
          
          The issue arises when ensuring decentralization – other nodes must pin our data. If we are the only node that has a particular hash, and our node goes down, that data is lost, and the network won't be able to access it. We will discuss future strategies for ensuring other people pin your data in subsequent sections, but for now, let's proceed with deploying our application on IPFS.
          
          ## Deploying Your Application on IPFS
          
          Now that we know about IPFS, the next step is to deploy our application to IPFS, making it accessible by anyone, anywhere, provided our node remains online.
          
          <img src="/foundry-nfts/4-ipfs/ipfs2.png" style="width: 100%; height: auto;">
          
          You can install and work with IPFS using the IPFS Desktop application or command line, as per your preference. If you're using Brave or Firefox, the IPFS router is built-in. For browsers like Chrome, you might have to add [IPFS Companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) for seamless functionality.
          
          Once you have installed IPFS, you can import your file (for example, `next config JS`) and extract the CID or the hash. With IPFS Companion installed and enabled, or via the Brave local IPFS node, you can now access this file directly using your CID, essentially turning it into a URL.
          
          If you encounter trouble accessing these files, you can use the IPFS gateway as a workaround route for requesting the data through another server, which then gets the data through IPFS. Simply append your hash to `https://gateway.ipfs.io/ipfs/`. This way, there will be no need for the IPFS Companion.
          
          To wrap it up, IPFS introduces a new level of data decentralization and replication to build a global network of nodes that can store and distribute data economically and efficiently. Future trends suggest this could become an integral part of the Internet's infrastructure. With this guide, you are now ready to contribute to this digital revolution.
          
      -
        type: new_lesson
        enabled: true
        id: ad03afd8-a5f1-463a-89f4-f7c14ef33d5d
        title: "Upload and use IPFS data (token URI)"
        slug: upload-data-on-IPFS
        duration: 7
        video_url: "T6Tm6GjpiaWUs1qMapDCdLdzt8iy2qoJ02VSSiFgtnVA"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/5-using-ipfs/+page.md"
        description: |-
                    This section explores using IPFS for hosting NFT images and metadata, focusing on OpenSea for practical demonstration. It also covers the customization of NFT appearances by allowing users to choose their Token URI, thus determining the look of their tokens.
        markdown_content: |-
          ---
          title: Using IPFS
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Hello and welcome back to our discussion on an exciting topic, IPFS, and the Token Uri in the realm of Non-Fungible Tokens (NFTs). After immersing ourselves in understanding these novel technology elements, let's put our knowledge into practice by exploring a marketplace for selling NFTs, such as OpenSea.
          
          ## Exploring NFTs on OpenSea
          
          OpenSea, a marketplace nurturing a vibrant ecosystem for buying and selling NFTs, provides countless opportunities for examination. Here's how we do it:
          
          1. Scroll down the OpenSea page and select any NFT you fancy. For this discussion, let's take a look at the Pudgy Penguins.
          2. Click on the chosen NFT and navigate to its on-chain details.
          3. Click through to the source code, scroll down to 'read contracts' and connect to web three.
          4. Scroll further down to find the 'Token Uri' and get the ID for our chosen NFT.
          
          Subsequently, we can see the metadata object that features 'attributes', 'description', and the 'name' piece. If we input this name piece into the address bar, we visualize the image of the NFT.
          
          <img src="/foundry-nfts/5-using-ipfs/using1.png" style="width: 100%; height: auto;">
          
          ## Creating Your Own NFT Image
          
          With your own image ready, the next step is uploading it using your IPFS node in your browser. Get the hash and use that as the image Uri for your own NFT.During the upload process to IPFS, both the image and the file (which contains the Uri of the image) must be uploaded. But remember, we're taking the path of least resistance here. We'll go on and use the Foundry IPFS Uri.
          
          ## Diving Deeper into Our NFT
          
          Back to our NFT, instead of pasting the Token Uri for all our dogs to look the same, we're taking a more enticing route. We will allow people to customize their own Token Uri, hence choosing how their tokens will look.
          
          Let's code this idea:
          
          ```js
              function mintNft(string memory tokenUri) public {
                  s_tokenIdToUri[s_tokenCounter] = tokenUri;
                  _safeMint(msg.sender, s_tokenCounter);
                  s_tokenCounter = s_tokenCounter + 1;
              }
          
              function tokenURI(
                  uint256 tokenId
              ) public view override returns (string memory) {
                  if (!_exists(tokenId)) {
                      revert BasicNft__TokenUriNotFound();
                  }
                  return s_tokenIdToUri[tokenId];
              }
          ```
          
          And that's it! We've created a simple yet advanced NFT able to have its look customized by anyone.
          
          Happy Ethereum Contracting!
          
          Remember,
          
          <img src="/foundry-nfts/5-using-ipfs/using2.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: b1fe8820-973d-4701-b6b2-6f466d824c6e
        title: "Writing the deployment script"
        slug: nfts-deployment-script
        duration: 2
        video_url: "viH5QSKMzp1lzk5ubsud02cO00oigXWNw7w5Kr012ukAI4"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/6-deploy-script/+page.md"
        description: |-
                    Learn how to write a deployment script for NFTs. This includes using Forge script for deploying Basic NFTs and understanding the contract deployment process, highlighting the importance of testing and compiling before deployment.
        markdown_content: |-
          ---
          title: Deploy Script
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ## Coding Your Basic NFT
          
          Ready your keyboards, it's time to get coding! We already looked on the the basic code for the NFT on previous lessons and today we will be writing the code for the deploy script.
          
          ## Basic Deployment
          
          This function will serve a dual purpose; we're going to use it for our testing as well. What should it return? The answer is pretty straightforward - it should return our basic NFT.
          
          Therefore, this is how the Deployment contract will look like:
          
          ```js
          contract DeployBasicNft is Script {
              uint256 public DEFAULT_ANVIL_PRIVATE_KEY =
                  0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
              uint256 public deployerKey;
          
              function run() external returns (BasicNft) {
                  if (block.chainid == 31337) {
                      deployerKey = DEFAULT_ANVIL_PRIVATE_KEY;
                  } else {
                      deployerKey = vm.envUint("PRIVATE_KEY");
                  }
                  vm.startBroadcast(deployerKey);
                  BasicNft basicNft = new BasicNft();
                  vm.stopBroadcast();
                  return basicNft;
              }
          }
          
          ```
          
          This chunk of code initiates a broadcast to the EVM (Ethereum Virtual Machine), creates a new basic NFT and stops the broadcast, then returns our freshly created NFT.
          
          Also don't forget we need to import the basic libraries we always use in our contracts, and of course the solidity version and the license.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity 0.8.19;
          
          import {Script} from "forge-std/Script.sol";
          import {BasicNft} from "../src/BasicNft.sol";
          import {console} from "forge-std/console.sol";
          ```
          
          After putting the finishing touches on your code, it’s time to compile.
          
          ## Time to Compile
          
          To make sure everything is peachy, run a quick `forge compile`.
          
          ```shell
          forge compile
          
          ```
          
          Now watch as your console lights up with the wonderful message: "COMPILING SUCCESSFULLY!"
          
          <img src="/foundry-nfts/6-deploy/deploy1.png" style="width: 100%; height: auto;">
          
          And there you have it! You've just created and deployed a basic NFT. This experience should give you a taste of the powerful capabilities of Solidity for building and working with NFTs.
          
          Stay tuned for more adventures in the world of decentralized applications. And remember, never stop exploring!
          
          <img src="/foundry-nfts/6-deploy/deploy2.png" style="width: 100%; height: auto;">
          
          Happy Coding!
          
      -
        type: new_lesson
        enabled: true
        id: e0582e78-a7f4-4b30-8f0d-76e8a807377c
        title: "Test the NFTs smart contract"
        slug: basic-nft-tests
        duration: 11
        video_url: "h0002kd6AppErtI00Sikbh88Qn8DV4diqGtK4I2b75NrH00"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/7-basic-nft-tests/+page.md"
        description: |-
                    Focuses on testing the basic NFT contract using Solidity. It includes detailed steps for conducting tests like confirming the NFT name and testing the mint function, emphasizing the importance of testing for successful smart contract deployment.
        markdown_content: |-
          ---
          title: Basic NFT Tests
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          When working with NFTs in Solidity, it's crucial to conduct tests to ensure that the contract functions appropriately. As you can imagine, programming blockchain-based contracts can be quite challenging because, unlike other pieces of software, deploying a faulty smart contract on the blockchain can lead to disastrous consequences (and yes, that includes financial loss!).
          
          With that in mind, let's delve into testing  coding some tests for the basic NFT contract we created in the previous lesson.
          
          
          
          ## Conducting BasicNFT tests
          
          Once the setup is complete, it's time to jump into tests. Writing an array of tests serves to validate the functionality of our contract, but for the purpose of this blog, let's focus on testing the Name function.
          
          To confirm that the Name of your NFT is correct, declare a function `testNameIsCorrect` and specify it as public view. The expected output should be set as a string memory.
          
          ```js
          function testNameIsCorrect() public view {
            string memory expectedName = "Dogie";
            string memory actualName = basicNft.name();
            // This will give us an error!
            assert(expectedName == actualName);
          }
          ```
          ## An Issue With Comparing Strings
          
          However, as we proceed with writing the tests, an issue becomes apparent when trying to assert that the expected name equals the actual name. The main problem lies in Solidity's inability to compare array types which includes strings.
          
          While it's possible to manually loop through each item in an array for comparison, it's impractical and can lead to verbose code. A more streamlined approach would be to hash the arrays using `abi.encodePacked` and compare the resulting fixed-sized, unique string identifiers.
          
          
          Here's how it's achieved:
          
          ```javascript
          assert(keccak256(abi.encodePacked(expectedName)) == 
                 keccak256(abi.encodePacked(actualName)));
          ```
          
          This code returns a pass if the name functions as intended.
          
          <img src="/foundry-nfts/7-test/test1.png" style="width: 100%; height: auto;">
          
          
          ## A Second Round of Testing
          
          Suppose we wish to further test if the `mint` function operates correctly and have a balance. In this case, let's declare a function `testCanMintAndHaveABalance`. In addition, assign an address called 'user', create one with the parent function and then mint an NFT.
          
          Now, test if the balance is correct and validate that the tokenUri is the same as the pug.
          
          ```javascript
          function testCanMintAndHaveABalance() public {
                  vm.prank(USER);
                  basicNft.mintNft(PUG_URI);
                  assert(basicNft.balanceOf(USER) == 1);
              }
          ```
          
          If everything is set correctly, it's time for execution! Use `forgeTest` to run all tests.
          
          <img src="/foundry-nfts/7-test/test2.png" style="width: 100%; height: auto;">
          
          ## Wrapping Up
          
          In conclusion, the process of testing contracts in Solidity is an essential part of developing a flawless contract that works exactly as intended. Despite some of its quirks (like the lack of native support for string comparison), you can leverage algorithmic techniques to work around them, as we have shown in this blog post translation of a transcript. Practice issuing new contracts and conducting tests - the more you practice, the easier it becomes. Happy coding, and to more successful test results!
          
          
      -
        type: new_lesson
        enabled: true
        id: bc86137e-2ab9-4a1f-aecd-60da82da36b3
        title: "Interact with a smart contract"
        slug: interact-with-solidity-smart-contracts
        duration: 3
        video_url: "5giC6UkQfl8r2b4K2g4Jdje5wTUGyh2BNNxvwj01XbNc"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/8-basic-interactions/+page.md"
        description: |-
                    Teaches how to interact with Solidity smart contracts, particularly for minting NFTs. It includes setting up the necessary environment and scripts, and deploying NFTs using tools like Foundry and IPFS.
        markdown_content: |-
          ---
          title: Basic NFT Interactions
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ## Introduction
          
          Everyone who is interested in the fascinating world of NFTs (Non-fungible tokens), most likely knows the basic line - how to mint a token. However, have you ever thought about creating a dedicated tool to mint your token programmatically, instead of using a traditional casting procedure? Well, you're in luck! We'll be discussing exactly how to achieve this with Solidity in this post. Buckle up!
          
          ## The Code
          
          Typically, we'd define a Solidity contract with all the necessary imports. For this instance, we're going to name ours `MintBasicNft`. This is going to be on `Interactions.s.sol`, let's get started:
          
          ```js
          //SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          contract MintBasicNft is Script {}
          ```
          
          Right out of the gate, it's safe to say you already know the drill—defining a simple contract! We'll increase the complexity over the course of this tutorial.
          
          ### Importing Necessary Libraries
          
          Next, we've got to bring in our scripts from Forge’s Script.sol. This is quite straightforward:
          
          ```js
          import {Script, console} from "forge-std/Script.sol";
          ```
          
          Now, we'll start to shape up our contract. Next, we need to create an external function `run()` which is going to mint our NFT.
          
          ```js
          function run() external {}
          ```
          
          To ensure that we're always working with the most recently deployed NFT, we'll need a fantastic tool from `foundry-devops-package`. It's time to install this package. Copy the URL and run it in your terminal:
          
          ```shell
          forge install ChainAccelOrg/foundry-devops --no-commit
          ```
          
          Close the terminal and write a code line to get the recently deployed address:
          
          ```js
          
          
          address mostRecentlyDeployed = 
                  DevOpsTools.get_most_recent_deployment("BasicNFT", block.chainid);
          ```
          
          Here, we have a function called `get_most_recent_deployment` from `DevOpsTools` that fetches the most recent deployment.
          
          For this to work, remember to bring your DevOps tools into the contract:
          
          ```js
          import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
          
          ```
          
          ### The Mint Function
          
          Here comes the grand part, writing the function that mints your NFT on the contract. For this, pass in the `mostRecentlyDeployed`:
          
          ```js
          mintNFTOnContract(mostRecentlyDeployed);
          ```
          
          And the function `mintNFTOnContract` takes an address, starts broadcasting, mints an NFT, and stops broadcasting:
          
          ```js
          function mintNftOnContract(address contractAdress) public {
              vm.startBroadcast();
              BasicNft(basicNftAddress).mintNft(PUG);
              vm.stopBroadcast();
          }
          ```
          
          At the end of the function, you can pass your pug string (it’s unique, I promise). Don’t forget to import your basic NFT:
          
          ```js
          import {BasicNft} from "../src/BasicNft.sol";
          ```
          
          ## Conclusion
          
          Congratulations! You now have an effective way to programmatically deploy and mint your NFTs!
          
          <img src="/foundry-nfts/8-interaction/interaction1.png" style="width: 100%; height: auto;">
          
          With this custom-made tool, you are no more confined to the traditional casting process. This tool gives you the flexibility to programmatically mint your NFTs with ease, anytime you want.
          
          With this added skill in your NFT arsenal, you're a step closer to mastering the fascinating world of non-fungible tokens.
          
          **Happy Coding!**
          
          
      -
        type: new_lesson
        enabled: true
        id: 1b847650-6cc7-42e9-9d47-54d8f5cd09a8
        title: "Deploy your NFTs on the testnet"
        slug: deploy-nfts-on-testnet
        duration: 7
        video_url: "By8uwTwEs82v01MQvQPgud3xTiJ1dCGNnAdgucXN2izA"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/9-testnet-demo/+page.md"
        description: |-
                    Guides on deploying NFTs to a testnet and importing them into MetaMask. It covers the use of Anvil for deployment, extracting contract data, and using MetaMask to interact with the deployed NFTs.
        markdown_content: |-
          ---
          title: Basic NFT Testnet Demo
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          In our previous lesson, we've covered the concept and advantages of NFTs (Non-fungible tokens) along with how to build and test them. But to appreciate the full potential of our NFT, we need to see it in a real-world setting – our MetaMask wallet. This post walks you through how to deploy an NFT to a testnet, as well as how to import it to your MetaMask wallet. Let's get started!
          
          ## Deploying NFT to a Testnet
          
          While testing is a vital part of NFT creation, deploying it in a real use case can bring more clarity to your understanding. Luckily, there are several ways to deploy your NFT. You could consider using Anvil, your own Anvil server, or a testnet. If you're not keen on waiting for the testnet or spending the gas, I'd recommend deploying it to Anvil.
          
          The processes detailed below are optional, but feel free to follow along if you'd like.
          
          
          ### Using a Makefile for Quick Deployment
          
          Rather than typing out long scripts, we'll use a makefile here. The associated Git repo contains the makefile we're using, allowing you to simply copy and paste rather than rewriting everything.
          
          In the makefile, we've captured most of the topics we've discussed so far, including our deploy script, which we'll use to deploy our basic NFT.
          
          <img src="/foundry-nfts/9-testnet/testnet1.png" style="width: 100%; height: auto;">
          
          
          Here is what the deploy script looks like:
          
          ```makefile
          deploy:
          	@forge script script/DeployBasicNft.s.sol:DeployBasicNft $(NETWORK_ARGS)
          ```
          
          It's important here to ensure you have included your environmental variables. 
          
          It's noteworthy that you should write some tests before deploying on a testnet, although for the sake of showing you what the NFT looks like, we'll skip this step in this instance.
          
          ## Deploying Our Basic NFT
          
          We're now going to deploy our basic NFT to the contract address. After successful deployment, there will be a short wait for its verification.
          
          
          ### Extracting Contract Info and Minting
          
          With our NFT deployed, we'll now move to extract our contract data. In the broadcast folder, the latest run contains the created basic NFT information. We'll execute the following command to initiate the Mint function:
          
          ```makefile
          mint:
              @forge script script/Interactions.s.sol:Interactions $(NETWORK_ARGS) 
          ```
          
          The DevOps tool works by grabbing the most recent contract from this folder, thus automating the process.
          
          ## Importing NFT into MetaMask
          
          While the NFT is being minted, let's transition to MetaMask:
          
          1. Copy the contract address under which the NFT was deployed.
          2. From MetaMask, go to NFTs and switch to Sepolia.
          3. Click on Import NFTs and paste the copied address.
          4. Since we're the first to create this NFT, the token ID will be zero. Input this and hit 'Add'.
          
          After a short wait, your NFT will be viewable right from your MetaMask wallet. It's intelligent enough to extract the token URI, allowing you to view the image, contract address, or send it elsewhere.
          
          Congratulations! You've successfully deployed and imported an NFT into MetaMask. You can now interact with it just as you would in a marketplace like OpenSea. Through this process, you've learned how to make an NFT come to life, from being just a script to being part of the real-world, bridging the gap between test environments and real applications.
          
          Stay tuned for our next post on advanced NFT creation steps, such as a complete DeFi app development and more.
          
          
      -
        type: new_lesson
        enabled: true
        id: 7831d519-1110-4317-8b7a-3298f63ebf62
        title: "IPFS and Pinata vs HTTP vs on chain SVGs"
        slug: pin-nfts-images-using-pinata
        duration: 4
        video_url: "4Ola5wzT82RohNN5YaJhYr7UQ4aqVis9Q7X2vmmzsjc"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/10-ipfs-https/+page.md"
        description: |-
                    Discusses the pros and cons of using IPFS, HTTP, and on-chain SVGs for storing NFT data. It covers the pitfalls of each method and introduces services like Piñata Cloud for securing digital assets on IPFS.
        markdown_content: |-
          ---
          title: The issue with IPFS vs HTTPS
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          
          In the world of **Non-Fungible Tokens (NFTs)**, several questions often arise about where and how these digital assets should be stored. In this blog post, we'll discuss two main topics: the potential issues related to storing NFTs on IPFS and how to use *abi encode packed* for creating on-chain SVGs.
          
          ## Part 1: What's The Issue with IPFS?
          
          First things first: Let's discuss the **InterPlanetary File System (IPFS**), a popular decentralized storage system for NFTs.
          
          You might wonder - Is it a good idea to host my precious NFTs on IPFS? Isn't it better than the commonly used Https and websites for storing digital assets?
          
          Well, let's paint a clear picture for you.
          
          ### What's Wrong with Using Websites for Storing NFTs?
          
          Many NFT creators use websites—with https—to store their tokens. However, should these websites go offline or worse, collapse, the NFT owner finds themselves with a broken JPEG link and a, dare we say, worthless NFT!
          
          Despite the apparent risk, this storage option remains popular because it's significantly cheaper and comfortable to spin up an IPFS node and pin your data to the node.
          
          
          ### Why IPFS Might Not Be The Best Option Either
          
          Compared to storing digital assets on a website, IPFS is undoubtedly a better choice. It is a decentralized storage platform, meaning that it allows users to maintain control over their data. Furthermore, on IPFS, anyone can pin the NFT data and keep the image accessible permanently.
          
          However, IPFS has its pitfall. If a creator's IPFS node goes offline (like turning off their PC), it could result in an inaccessible file. That means anyone trying to access that NFT on platforms like MetaMask or OpenSea would stumble upon a broken JPEG image, not the intended item.
          
          The fact that others can pin the NFT data offsets this inconvenience to an extent. But, how many users actually pin data and how reliable can that be?
          
          This is where services like **Piñata Cloud** come into the picture. They keep your metadata for your stored NFTs up even if your IPFS node goes offline. Protocols like these provide an additional security blanket for your digital assets.
          
          
          ## Part 2: Putting On-chain SVGs to Work
          
          While IPFS remains a viable option—despite its potential fallibility—enterprising NFT creators and users have found another way to store NFTs—on-chain SVGs.
          
          "*So, what exactly is an SVG.*", you ask? Let's delve deeper.
          
          ### An Introduction to SVGs
          
          Scalable Vector Graphics (SVGs) are a way to represent images and graphics. When stored on the blockchain, these images become 100% immutable and decentralized.
          
          Creators can encode their NFTs as SVG types; thus, the entire image is stored directly on the blockchain. Even though this method may be a little more expensive than IPFS, it's a surefire way to ensure the longevity and accessibility of your precious NFTs.
          
          
          ### SVG NFT
          
          
          <img src="/foundry-nfts/10-svg/svg1.png" style="width: 100%; height: auto;">
          
          As illustrious as this looks, the actual visual output of SVGs can sometimes be unsightly. But remember, beauty lies in the eye of the beholder. The real allure of on-chain SVGs is the knowledge that your NFT remains accessible, immutable, and in its truest form, no matter what.
          
          
          <img src="/foundry-nfts/10-svg/svg2.png" style="width: 100%; height: auto;">
          
          By understanding how NFT storage works, you can ensure your digital assets' safety and longevity. The choice—whether IPFS, on-chain SVGs, or a comprehensive mix of both—is yours to make. Happy creating!
          
          
      -
        type: new_lesson
        enabled: true
        id: a6c7f1ac-aea5-42f5-860b-c1a025608de9
        title: "What is an SVG?"
        slug: what-is-svg
        duration: 8
        video_url: "Za4XqL7bPsdEYUEJIa7oe1X5KGwjA8a4HmoS22WhtYY"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/11-what-is-svg/+page.md"
        description: |-
                    Explains Scalable Vector Graphics (SVGs), their advantages, and how to create them. The lesson includes coding snippets for SVG creation and highlights their use in NFTs for on-chain storage.
        markdown_content: |-
          ---
          title: What is an SVG?
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Welcome to our exploration of Scalable Vector Graphics, lovingly known as SVGs. Today, we're moving beyond traditional image files to delve into the perks of SVGs, their functionality and how to create your own. So, let's get right into it!
          
          ## What is an SVG?
          
          To understand what an SVG is, we'll dive right into a helpful tutorial from our friends at [W3Schools](https://www.w3schools.com/graphics/svg_intro.asp). SVG stands for Scalable Vector Graphics. In simpler terms, SVG is a way to define images in a two-dimensional space using XML coded tags with specific parameters.
          
          SVGs are awesome because they maintain their quality, no matter what size you make them. If you stretch a traditional image file like a .jpg or .png, they become pixelated and lose clarity. SVGs don’t suffer from this issue because they’re scalable. They’re defined within an exact parameter, thus maintaining their pristine quality regardless of size.
          
          <img src="/foundry-nfts/11-svg2/svg2-1.png" style="width: 100%; height: auto;">
          
          ## Creating Your Own SVG
          
          Now, let's talk about how you can create your own SVG. If you're following the W3Schools tutorial, you'll notice that you can modify SVG coding directly from the page. For instance, you can alternate the fill from the default color to blue and the outline (stroke) to black with the appropriate SVG parameters.
          
          You can follow this exercise in your code editors as well. And if you are using Visual Studio Code, you can even preview your SVGs in real time.
          
          ### SVG Coding Snippet
          
          Here is a typical SVG coding that you can try:
          
          ```js
          <html>
            <body>
              <h1>My first SVG</h1>
              <svg width="100" height="100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="green"
                  stroke-width="4"
                  fill="yellow"
                />
              </svg>
            </body>
          </html>
          ```
          
          For the live preview of your SVG, you can use various SVG viewers and SVG previewers available in the marketplace. Moreover, if you want to convert your SVG into a binary representation that can be passed via URL, you can use the `base64` command.
          
          **Note**: The base64 command might not be available on all machines, fret not, you can simply follow along and copy the steps as mentioned.(base64 --help will show if you have this command.)
          
          <img src="/foundry-nfts/11-svg2/svg2-2.png" style="width: 100%; height: auto;">
          
          Base 64 basically encodes your SVG data into a form that can be used in data URIs for embedding your SVGs into browsers. So let’s go ahead and pass an encoded SVG and see it rendered in the browser.
          
          Add this small prefix `data:image/svg+xml;base64,` before the encoded SVG and voilà! Your SVG should read "Hi, your browser decoded this” in the browser URL preview.
          
          ## Utilising SVGs in NFT
          
          Embedding SVGs becomes incredibly useful when dealing with Non-Fungible Token (NFT) assets. In the realm of NFTs, SVGs can be stored on-chain as URIs. This paves the way for dynamic and interactive NFTs.
          
          With the same base64 encoding, you can pass entire image data right in the URL and this will be your token URI. Therefore, instead of using an IPFS hash for our Token Uri, you can fully rely on chain using this SVG..
          
          The major advantage of this approach is that the SVG, which is now essentially code on-chain, can be updated and interacted with. This implies endless possibilities for your NFT. It can be designed to change, evolve, grow - limited only by your imagination!
          
          <img src="/foundry-nfts/11-svg2/svg2-3.png" style="width: 100%; height: auto;">
          
          There you have it! We've just scratched the surface of SVGs and their vast potential within the realm of NFTs. This is an especially desirable competency for those looking to raise their game as smart contract developers.
          
          In future posts, we will further explore the concept of ABIs and code packing in the context of SVGs and Smart Contracts. Great progress so far, and keep on learning!
          
      -
        type: new_lesson
        enabled: true
        id: 15fe9028-8fd6-4e80-9cb2-fb3c44a17656
        title: "Create a dynamic NFTs collection"
        slug: create-dynamic-nft
        duration: 5
        video_url: "JCmH2YlyGgL765YBbgp013tYJSzjOWH6K3k2wn01wLyFU"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/12-svg-nft/+page.md"
        description: |-
                    Focuses on creating dynamic SVG NFTs, particularly a mood-changing NFT that alternates its appearance. It includes detailed instructions for setting up the NFT project, minting the NFTs, and defining their appearance.
        markdown_content: |-
          ---
          title: SVG NFT Intro
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Creating SVG NFTs is a fascinating endeavor, especially if these NFTs can change their mood! In this practical guide, we'll build our dynamic SVG NFT—an innovative NFT whose image changes and whose data is 100% stored on-chain.
          
          ## What Are We Building?
          
          Our ultimate task is to create a mood-changing NFT—bam, a Mood NFT! That's right, we're developing an NFT that can switch from happy to sad and vice versa.
          
          Our Mood NFT is housed with an intelligent function we call "Flip Mood." This function alternates the mood of our NFT—if its mood is happy, it turns sad, and vice versa. As per the mood, our NFT will either display a happy or sad SVG that we will store on-chain.
          
          ## Setting the Mood
          
          Time to roll up our sleeves and kick-off our Mood NFT project. Open up your SRC, create a new file—let's name it `MoodNft.sol`. Remember, before we start writing our contract, we need to define the SPDX license Identifier (MIT) and establish which version of Solidity we're working with (0.8.18 in our case). Now, let's begin to define our `MoodNft` contract.
          
          ```js
          //SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          contract MoodNft {}
          ```
          
          Our NFT contract will contain several vital elements from the basic NFT, so let’s take some of that and import it into our new folder. Next, our NFT will be defined as an ERC721 token. Sustaining the moods (happy and sad SVGs) of our NFT is critical, so we'll pass these mood SVGs in our constructor. You can make your personalized Sad SVG. For this tutorial, we'll use this happy SVG.
          
          ```js
          constructor(
                  string memory sadSvgUri,
                  string memory happySvgUri
              ) ERC721("Mood NFT", "MN") {}
          
          ```
          
          ## Mood Tracking: Creat a Token Counter
          
          A token counter is an essential part of our Mood NFT. Hence, we need to create a private token counter `uint256 private s_tokenCounter`. We'll initiate the token counter in the constructor to zero.
          
          ```js
           uint256 private s_tokenCounter;
          
          constructor(
                  string memory sadSvgUri,
                  string memory happySvgUri
              ) ERC721("Mood NFT", "MN") {
                  s_tokenCounter = 0;
              }
          
          ```
          
          Let's save these SVGs as `string private s_sadSvgUri` and `string private s_happySvgUri`, and pass them:
          
          ```js
          string private s_sadSvgUri;
          string private s_happySvgUri;
          ```
          
          ## Minting the Mood NFT
          
          Our mood NFT is now ready for anybody to mint! We'll define a public function `mintNFT()` that enables anyone to mint their Mood NFT. This function will contain a `safemint` statement that provides the `msg.sender` their Token ID. Also, remember to increment the token counter so that every new token gets a unique ID.
          
          ```js
            function mintNft() public {
                  // how would you require payment for this NFT?
                  _safeMint(msg.sender, s_tokenCounter);
                  s_tokenCounter = s_tokenCounter + 1;
                  emit CreatedNFT(s_tokenCounter);
              }
          ```
          
          Finally, we need to define what our NFT will look like. This is done using the `TokenURI` function, which takes the token ID as a parameter and returns a string memory.
          
          ```js
          function tokenURI(uint256 _tokenId) public view override returns (string memory) {}
          ```
          
          And that's a wrap! Developing mood-changing NFTs can be as fun as it sounds. Now it's your turn to create your mood NFT and bring your crazy, creative ideas to life!
          
      -
        type: new_lesson
        enabled: true
        id: f1face80-d228-4ce4-8566-e4a6733cb435
        title: "Encoding SVGs to be stored onchain"
        slug: svg-onchain-encoding
        duration: 17
        video_url: "LQcpzY01ZCvnU9tVVEDebEdMEZ2g500BReuXF022wtf8vE"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/13-svg-nft-encoding/+page.md"
        description: |-
                    Teaches encoding SVGs in Base64 format for on-chain storage in NFTs. It covers the process of encoding and testing SVG NFTs, ensuring their proper functioning and appearance
        markdown_content: |-
          ---
          title: SVG NFT Encoding
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          This blog post provides an in-depth walkthrough on how to encode SVGs as part of your NFT metadata.
          
          ## Getting Started
          
          First, you need to encode the SVGs separately to Base64 format. Here’s how:
          
          Open your README file and delete everything inside. Let’s say we're going to encode one of the emotions.
          
          ```js
          function tokenURI(
                  uint256 tokenId
              ) public view virtual override returns (string memory) {
                  if (!_exists(tokenId)) {
                      revert ERC721Metadata__URI_QueryFor_NonExistentToken();
                  }
                  string memory imageURI = s_happySvgUri;
          
                  if (s_tokenIdToState[tokenId] == NFTState.SAD) {
                      imageURI = s_sadSvgUri;
                  }
                  return
                      string(
                          abi.encodePacked(
                              _baseURI(),
                              Base64.encode(
                                  bytes(
                                      abi.encodePacked(
                                          '{"name":"',
                                          name(), // You can add whatever name here
                                          '", "description":"An NFT that reflects the mood of the owner, 100% on Chain!", ',
                                          '"attributes": [{"trait_type": "moodiness", "value": 100}], "image":"',
                                          imageURI,
                                          '"}'
                                      )
                                  )
                              )
                          )
                      );
              }
          ```
          
          Now, the important step.
          
          Instead of passing the SVG text in your smart contract (like `MoodNFT` for instance), pass in the already encoded version. It’s worth mentioning that base64 encoding the images on-chain may effectively reduce gas costs.
          
          ## Testing the SVG NFT
          
          Now we need to ensure the SVG NFT is working as expected. of course both the Happy and Sad SVG have a different base64 encoded string. Let’s test it out.
          
          ```js
          string public constant HAPPY_MOOD_URI =
                  "data:application/json;base64,eyJuYW1lIjoiTW9vZCBORlQiLCAiZGVzY3JpcHRpb24iOiJBbiBORlQgdGhhdCByZWZsZWN0cyB0aGUgbW9vZCBvZiB0aGUgb3duZXIsIDEwMCUgb24gQ2hhaW4hIiwgImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjogIm1vb2RpbmVzcyIsICJ2YWx1ZSI6IDEwMH1dLCAiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIyYVdWM1FtOTRQU0l3SURBZ01qQXdJREl3TUNJZ2QybGtkR2c5SWpRd01DSWdJR2hsYVdkb2REMGlOREF3SWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpUGdvZ0lEeGphWEpqYkdVZ1kzZzlJakV3TUNJZ1kzazlJakV3TUNJZ1ptbHNiRDBpZVdWc2JHOTNJaUJ5UFNJM09DSWdjM1J5YjJ0bFBTSmliR0ZqYXlJZ2MzUnliMnRsTFhkcFpIUm9QU0l6SWk4K0NpQWdQR2NnWTJ4aGMzTTlJbVY1WlhNaVBnb2dJQ0FnUEdOcGNtTnNaU0JqZUQwaU5qRWlJR041UFNJNE1pSWdjajBpTVRJaUx6NEtJQ0FnSUR4amFYSmpiR1VnWTNnOUlqRXlOeUlnWTNrOUlqZ3lJaUJ5UFNJeE1pSXZQZ29nSUR3dlp6NEtJQ0E4Y0dGMGFDQmtQU0p0TVRNMkxqZ3hJREV4Tmk0MU0yTXVOamtnTWpZdU1UY3ROalF1TVRFZ05ESXRPREV1TlRJdExqY3pJaUJ6ZEhsc1pUMGlabWxzYkRwdWIyNWxPeUJ6ZEhKdmEyVTZJR0pzWVdOck95QnpkSEp2YTJVdGQybGtkR2c2SURNN0lpOCtDand2YzNablBnPT0ifQ==";
          
              string public constant SAD_MOOD_URI =
                  "data:application/json;base64,eyJuYW1lIjoiTW9vZCBORlQiLCAiZGVzY3JpcHRpb24iOiJBbiBORlQgdGhhdCByZWZsZWN0cyB0aGUgbW9vZCBvZiB0aGUgb3duZXIsIDEwMCUgb24gQ2hhaW4hIiwgImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjogIm1vb2RpbmVzcyIsICJ2YWx1ZSI6IDEwMH1dLCAiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQnpkR0Z1WkdGc2IyNWxQU0p1YnlJL1BnbzhjM1puSUhkcFpIUm9QU0l4TURJMGNIZ2lJR2hsYVdkb2REMGlNVEF5TkhCNElpQjJhV1YzUW05NFBTSXdJREFnTVRBeU5DQXhNREkwSWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpUGdvZ0lEeHdZWFJvSUdacGJHdzlJaU16TXpNaUlHUTlJazAxTVRJZ05qUkRNalkwTGpZZ05qUWdOalFnTWpZMExqWWdOalFnTlRFeWN6SXdNQzQySURRME9DQTBORGdnTkRRNElEUTBPQzB5TURBdU5pQTBORGd0TkRRNFV6YzFPUzQwSURZMElEVXhNaUEyTkhwdE1DQTRNakJqTFRJd05TNDBJREF0TXpjeUxURTJOaTQyTFRNM01pMHpOekp6TVRZMkxqWXRNemN5SURNM01pMHpOeklnTXpjeUlERTJOaTQySURNM01pQXpOekl0TVRZMkxqWWdNemN5TFRNM01pQXpOeko2SWk4K0NpQWdQSEJoZEdnZ1ptbHNiRDBpSTBVMlJUWkZOaUlnWkQwaVRUVXhNaUF4TkRCakxUSXdOUzQwSURBdE16Y3lJREUyTmk0MkxUTTNNaUF6TnpKek1UWTJMallnTXpjeUlETTNNaUF6TnpJZ016Y3lMVEUyTmk0MklETTNNaTB6TnpJdE1UWTJMall0TXpjeUxUTTNNaTB6TnpKNlRUSTRPQ0EwTWpGaE5EZ3VNREVnTkRndU1ERWdNQ0F3SURFZ09UWWdNQ0EwT0M0d01TQTBPQzR3TVNBd0lEQWdNUzA1TmlBd2VtMHpOellnTWpjeWFDMDBPQzR4WXkwMExqSWdNQzAzTGpndE15NHlMVGd1TVMwM0xqUkROakEwSURZek5pNHhJRFUyTWk0MUlEVTVOeUExTVRJZ05UazNjeTA1TWk0eElETTVMakV0T1RVdU9DQTRPQzQyWXkwdU15QTBMakl0TXk0NUlEY3VOQzA0TGpFZ055NDBTRE0yTUdFNElEZ2dNQ0F3SURFdE9DMDRMalJqTkM0MExUZzBMak1nTnpRdU5TMHhOVEV1TmlBeE5qQXRNVFV4TGpaek1UVTFMallnTmpjdU15QXhOakFnTVRVeExqWmhPQ0E0SURBZ01DQXhMVGdnT0M0MGVtMHlOQzB5TWpSaE5EZ3VNREVnTkRndU1ERWdNQ0F3SURFZ01DMDVOaUEwT0M0d01TQTBPQzR3TVNBd0lEQWdNU0F3SURrMmVpSXZQZ29nSUR4d1lYUm9JR1pwYkd3OUlpTXpNek1pSUdROUlrMHlPRGdnTkRJeFlUUTRJRFE0SURBZ01TQXdJRGsySURBZ05EZ2dORGdnTUNBeElEQXRPVFlnTUhwdE1qSTBJREV4TW1NdE9EVXVOU0F3TFRFMU5TNDJJRFkzTGpNdE1UWXdJREUxTVM0MllUZ2dPQ0F3SURBZ01DQTRJRGd1TkdnME9DNHhZelF1TWlBd0lEY3VPQzB6TGpJZ09DNHhMVGN1TkNBekxqY3RORGt1TlNBME5TNHpMVGc0TGpZZ09UVXVPQzA0T0M0MmN6a3lJRE01TGpFZ09UVXVPQ0E0T0M0Mll5NHpJRFF1TWlBekxqa2dOeTQwSURndU1TQTNMalJJTmpZMFlUZ2dPQ0F3SURBZ01DQTRMVGd1TkVNMk5qY3VOaUEyTURBdU15QTFPVGN1TlNBMU16TWdOVEV5SURVek0zcHRNVEk0TFRFeE1tRTBPQ0EwT0NBd0lERWdNQ0E1TmlBd0lEUTRJRFE0SURBZ01TQXdMVGsySURCNklpOCtDand2YzNablBnbz0ifQ==";
          
              address USER = makeAddr("user");
          
              function testViewTokenURI() public {
                  vm.prank(USER);
                  moodNft.mintNft();
                  console.log(moodNft.tokenURI(0));
              }
          
          ```
          
          ## Summary
          
          In summary:
          
          1. A unique ID is generated for each MoodNFT.
          2. The metadata is stored and rendered directly from the blockchain.
          
          If there's a need to add new moods, you can simply update the moods array.
          
          This metadata standard is easy to adopt and highly adaptable, perfect for projects seeking to incorporate rich metadata for their NFTs. But remember to verify each line of your code to avoid any vulnerabilities. Happy coding!
          
          <img src="/foundry-nfts/13-encoding/encoding1.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 2e1b663e-4070-4cf7-8858-e623c5d682e8
        title: "Modify the NFT image onchain"
        slug: change-on-chain-nft-image
        duration: 3
        video_url: "ypCDKWLaEz5zteeNgODKRjk92sSb1CHEvLxcRF3YHM8"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/14-svg-nft-flipping/+page.md"
        description: |-
                    This section is about adding functionality to change the NFT's appearance on-chain. It includes creating a function to flip the mood of an NFT, ensuring only the owner can modify it
        markdown_content: |-
          ---
          title: SVG NFT Flipping the Mood
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ## The "Flip Mood" Functionality
          
          Imagine if we could interact with our NFTs and change their mood between happy and sad. It can add a new dimension to how we engage with our assets. Let's write a function to achieve this.
          
          ```js
          function flipMood(uint256 tokenId) public {
          
                  if (s_tokenIdToState[tokenId] == NFTState.HAPPY) {
                      s_tokenIdToState[tokenId] = NFTState.SAD;
                  } else {
                      s_tokenIdToState[tokenId] = NFTState.HAPPY;
                  }
              }
          ```
          
          In this function, `tokenId` is a unique identifier for our NFT. We're stating that this function should be public, available for interaction.
          
          But first, we should ensure that only the owner of the NFT can flip its mood, right?
          
          ## Ensuring Owner Access
          
          Of course this is something just the owner of the NFT should be able to do. We can achieve this by adding a if statement to our function and a modifier to our contract.
          
          ```js
          error MoodNft__CantFlipMoodIfNotOwner();
          
           if (!_isApprovedOrOwner(msg.sender, tokenId)) {
                      revert MoodNft__CantFlipMoodIfNotOwner();
                  }
          ```
          
          Here, we use the 'require' statement to validate that it's the NFT owner attempting to flip the mood. If it isn't, the operation doesn't proceed, and we get a custom error stating, "MoodNFT: Can't flip mood if not owner".
          
          ## Closing thoughts
          
          <img src="/foundry-nfts/14-flipping/flipping1.png" style="width: 100%; height: auto;">
          
          Sprucing up our NFTs with a "Mood Flip" functionality provides a unique way for their owners to engage with these digital assets, marking a significant step forward in the NFT space. With the continuous evolution of this technology, the possibilities for future interaction and personalization are limitless. We're just getting started!
          
      -
        type: new_lesson
        enabled: true
        id: 760ee30e-0eab-4f5b-a560-27c9dc85c6ac
        title: "Create the deployment script"
        slug: dynamic-nft-collection-deployment-script
        duration: 18
        video_url: "6vzQV3QnurrFA01KUyu1CLVrg1iqnZr01idZOtbyNxxDA"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/15-svg-deploy/+page.md"
        description: |-
                    Guides on automating the deployment process of Mood NFTs using scripting. It covers setting up the deploy script, encoding SVGs, and testing the deployment script for effectiveness.
        markdown_content: |-
          ---
          title: SVG NFT Deploy Script
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ## Deploying the Mood NFT Project
          
          In this lesson, we'll automate the deployment process of the Mood NFT Project by scripting it. As you may already know, in the realm of blockchain development, scripts are super helpful to help automate repetitive processes, so let's get our hands dirty and simplify our work!
          
          ## Creating the Deploy Mood NFT Script
          
          Starting off, create a new file for the deploy script named `DeployMoodNft.s.sol`. In this script file, include the SPDX License followed by the contract-deployment code, just as you typically would do in a Solidity contract.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity 0.8.19;
          
          import {Script} from "forge-std/Script.sol";
          import {MoodNft} from "../src/MoodNft.sol";
          
          contract DeployMoodNft is Script {
              function run() external {}
          }
          ```
          
          Remember we are deploying our Mood NFT, hence we'll need to import the MoodNFT contract. In our run function, it's time to set specifics on how the NFT will be deployed.
          
          ## Preparing the Deploying Parameters
          
          The Mood NFT contract accepts two parameters upon deployment: the "sad SVG image URI" and the "happy SVG image URI". Now we could hardcode these parameters into the script, but to make our lives a little easier and our script a little smarter, we're going to create a function that automatically encodes our SVGs.
          
          ```js
          function svgToImageURI(
                  string memory svg
              ) public pure returns (string memory) {
                  // example:
                  // '<svg width="500" height="500" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M150,0,L75,200,L225,200,Z"></path></svg>'
                  // would return ""
                  string memory baseURL = "data:image/svg+xml;base64,";
                  string memory svgBase64Encoded = Base64.encode(
                      bytes(string(abi.encodePacked(svg)))
                  );
                  return string(abi.encodePacked(baseURL, svgBase64Encoded));
              }
          ```
          
          This function will intake an SVG file as text, encode it into a base 64 formatted string, then return it. To do this, we need to import the OpenZeppelin base64 library which allows us to encode our SVGs on chain.
          
          ```js
          import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
          ```
          
          ## Implementing the Encoding Function
          
          The SVG to Image URI function first defines a base URL.
          
          ```js
          string memory baseURL = "data:image/svg+xml;base64,";
          ```
          
          Next, it encodes the SVG provided, concatenates that encoded string to the base URL, and voila, we have our encoded SVG string ready to be passed to the Mood NFT contract.
          
          ```js
          string memory svgBase64Encoded = Base64.encode(
                      bytes(string(abi.encodePacked(svg)))
                  );
          ```
          
          <img src="/foundry-nfts/15-deploy/deploy1.png" style="width: 100%; height: auto;">
          
          ## Reading in SVG Files
          
          Now that we have the means to encode SVG files, it's time to read the actual files in our Foundry scripting environment. As you may know, Foundry provides an awesome utility function named `readFile` which we will employ.
          
          But before we do that, we need to set appropriate permissions within the "foundry.toml" file in our project to allow the script to read from specified directories.
          
          ```makefile
          [profile.default]
          fs_permissions = [{ access = "read", path = "./images/"}]
          ```
          
          At this point, it's important to note that in settings and permissions, try to make `ffi = false` whenever you can for security reasons.
          
          Now that we've taken care of the permissions business, we can use the `readFile` function to read in our SVG files.
          
          ```js
          string memory sadSVG = VM.readFile("images/sad.svg");string memory happySVG = VM.readFile("images/happy.svg");
          ```
          
          ## Finalizing the Deployment Script
          
          Finally, we can proceed to deploy our Mood NFT with the encoded SVG URIs.
          
          ```js
              string memory sadSvg = vm.readFile("./images/dynamicNft/sad.svg");
              string memory happySvg = vm.readFile("./images/dynamicNft/happy.svg");
          ```
          
          And return the created Mood NFT for our test functions to utilize.
          
          ```js
          return moodNFT;
          ```
          
          ## Testing our Deploy Script: Integration Tests vs Unit Tests
          
          Lastly, but certainly not least, we test our deploy script. It will be best to implement both integration tests and unit tests for our script.
          
          <img src="/foundry-nfts/15-deploy/deploy2.png" style="width: 100%; height: auto;">
          
          That's it for this tutorial! Enjoy your automated Mood NFT deployment. Write in the comment section for any questions, suggestions, or just to share your experience!
          
      -
        type: new_lesson
        enabled: true
        id: 23802ffc-f88d-4bc6-85bf-c7633f5e963e
        title: "Debug your smart contract"
        slug: debug-solidity-smart-contract
        duration: 6
        video_url: "XLtda7pt6P00w8RXnm2mkGOTtJCvKJtsTJznic015rNMk"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/16-svg-debug/+page.md"
        description: |-
                    Guides on automating the deployment process of Mood NFTs using scripting. It covers setting up the deploy script, encoding SVGs, and testing the deployment script for effectiveness.
        markdown_content: |-
          ---
          title: SVG NFT Debugging
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Welcome to a new highly detailed blog post on debugging, testing, and creating automated scripts for smart contracts. We will walk you through the process of running and debugging tests using the Forge test tool. We'll also give you some examples of integrating unit testing and integration testing. Buckle up as this is going to be an interesting journey through the jungle of smart contract testing.
          
          <img src="/foundry-nfts/16-debug/debug1.png" style="width: 100%; height: auto;">
          
          ## Solving the URI Mystery
          
          At this point, we decided to take a more detailed look at the `sadSvgUri`. We considered that the `tokenUri` and the `sadSvgUri` were not supposed to be the same because one is an image `Uri` while the other isn't. After a bit of back-and-forth, we figured out the `tokenUri` was supposed to equal our `Sad SVG Uri`.
          
          <img src="/foundry-nfts/16-debug/debug2.png" style="width: 100%; height: auto;">
          
          So in order to achieve that we need to assert the actual token URI correspond to the sad SVG URI. We added the following code to our test script:
          
          ```javascript
          function testFlipTokenToSad() public {
                  vm.prank(USER);
                  moodNft.mintNft();
          
                  vm.prank(USER);
                  moodNft.flipMood(0);
          
                  assert(
                      keccak256(abi.encodePacked(moodNft.tokenURI(0))) ==
                          keccak256(abi.encodePacked(SAD_MOOD_URI))
                  );
              }
          ```
          
          With the mystery solved, we performed another run and successfully passed all tests.
          
          ## Unit Test Versus Integration Test
          
          In a nutshell, the process of testing we've just gone through is a good demonstration of the differences between a unit test and an integration test.
          
          - **Unit Test**: In our case, it was testing the specific function on our Deploy Mood NFT and Mood NFT.
          - **Integration Test**: This type of test combined the deployer with the Mood NFT and Basic NFT, ultimately showing what an integration test should look like.
          
          ## Script Writing to Automate Deployment and Testing
          
          Don't want to manually type all of those Forge script commands? Let's walk through the process of automating those actions for deployment and testing.
          
          In our case, we created a script that, once run, deploys both of our NFTs and even flips the mood of our NFT. You can add this script in your make file. Be sure to create scripts for minting the Mood NFT and flipping the Mood NFT too. Even though they are skipped in this post, they are also crucial for a complete automation setup.
          
          ## Working on Code Coverage
          
          Lastly, we highly recommend improving your code coverage. Our current coverage looks good for Basic NFT and Mood NFT, but scripts' coverage can certainly be improved. Writing comprehensive tests boosts your confidence that the code will function as expected.
          
          To check code coverage, run:
          
          ```bash
          forge coverage
          ```
          
          This will give you a detailed report of the coverage for each code section.
          
          ## Wrapping Things Up
          
          We believe that this practice exercise will help you appreciate the importance of testing, debugging and automating scripts when working with smart contracts. It's a lot more fun to run a single command that deploys, tests and completes your NFT than to manually type each command individually.
          
          Remember to constantly evaluate your test coverage and keep it high. If you do, you will significantly increase your confidence that your code performs exactly as expected. Happy testing!
          
      -
        type: new_lesson
        enabled: true
        id: b715cff6-2fe2-4261-a51e-6f8b065a5b95
        title: "Deploy and interact using Anvil"
        slug: svg-anvil
        duration: 6
        video_url: "pVIQhmjo24kP42uDoVd3m5ysNIm2Rsv6oXG02WiemXDQ"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/17-svg-anvil/+page.md"
        description: |-
                    This lesson covers deploying and interacting with NFTs using Anvil, a local Ethereum network. It includes setting up MetaMask with Anvil, deploying Mood NFTs, minting, and flipping their mood, demonstrating the process of NFT interaction on a local blockchain network.
        markdown_content: |-
          ---
          title: SVG NFT Anvil Demo
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ## Deploying and Flipping a 100% On-Chain NFT on Anvil
          
          Welcome to this exciting tutorial where we will deploy and flip an on-chain NFT minted on our own local network, Anvil. Experience firsthand the speed and efficiency of Anvil, with all the steps demonstrated live in our MetaMask!
          
          ## Setting up MetaMask with Anvil
          
          For live interactions with our NFT, we'll utilize MetaMask. Follow these steps to set up MetaMask with your Anvil chain:
          
          1. Within MetaMask, choose `Add Network`.
          2. Edit the settings to coincide with your Anvil chain.
          3. Reset your Anvil chain to reflect these new settings.
          4. Verify your address is listed in the account. If not, import one from one of the private keys.
          5. Clear your activity tab- Go to your Account Settings -&gt; Advanced -&gt; Clear activity tab.
          
          With these steps, your MetaMask is primed and ready for the Mood NFT.
          
          <img src="/foundry-nfts/17-anvil/anvil1.png" style="width: 100%; height: auto;">
          
          ## Deploying the Mood NFT on Anvil
          
          With our local chain in place and MetaMask set up, we're ready to deploy the Mood NFT on Anvil. Run the `Make Deploy Mood` command and if successful, you'll get a contract address for your Mood NFT.
          
          ```makefile
          deployMood:
          	@forge script script/DeployMoodNft.s.sol:DeployMoodNft $(NETWORK_ARGS)
          ```
          
          ## Interacting with the Mood NFT
          
          Ready to mint an NFT and interact with it? We'll utilize `cast` to accomplish this:
          
          1. Send a `mint NFT` call to your contract address.
          2. Ensure to pass in the private key from your account that has some money in it.
          3. Use the Anvil RPC URL from your `make` file.
          4. Execute the mint command with the right private key and, Voila- You've minted an NFT!
          
          ```makefile
          mintMoodNft:
          	@forge script script/Interactions.s.sol:MintMoodNft $(NETWORK_ARGS)
          ```
          
          You can then import the NFT into MetaMask using the contract address. Add the Token ID and behold- your Mood NFT is live and ready for action!
          
          ## Flipping the Mood NFT
          
          Perhaps one of the most exciting features of our Mood NFT is the ability to flip its mood. In our command window, we call the `Flip Mood` function on our Token Zero, reflecting the change in MetaMask.
          
          Remove the NFT and re-add it using the contract address. Your Mood NFT strikes a different mood!
          
          <img src="/foundry-nfts/17-anvil/anvil2.png" style="width: 100%; height: auto;">
          
          ## Wrapping up
          
          We've created, deployed, and minted an NFT on our own network with Anvil, and interacted with it through MetaMask! You could replicate these steps to deploy on a testnet, or even a main net.
          
          As a best practice, always aim to keep your NFTs decentralized. Use IPFS to store metadata regarding NFTs to ensure they're 100% on-chain, as opposed to being centrally controlled via websites or similar platforms.
          
          Congratulations and here's to your adventures in creating and flipping mood with NFTs!
          
      -
        type: new_lesson
        enabled: true
        id: 5da078de-11b0-4a3e-bf28-4c5e3249842b
        title: "Introduction to Filecoin and Arweave"
        slug: introduction-to-filecoin-arweave
        duration: 8
        video_url: "Y6s5500CAKyopJFvpNK4XNPzcNXqYClZCrUUKHrCHDpw"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/18-filecoin-arweave/+page.md"
        description: |-
                    Introduces Filecoin and Arweave, two decentralized storage solutions for NFT metadata. The lesson explores their features, benefits, and use cases, with insights from an expert at the Filecoin Foundation, highlighting the future of decentralized data storage.
        markdown_content: |-
          ---
          title: Filecoin & Arweave
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          In today's rapidly developing digital world, decentralized storage solutions are increasingly becoming the go-to for storing NFT (Non-Fungible Tokens) metadata. Among these solutions, Rweave and Filecoin stand out as the most popular. They present exciting opportunities for users to deploy their NFT metadata in a flexible and secure manner.
          
          We'll explore these innovative storage platforms, diving deep into their core principles and benefits. Moreover, we'll also gain insights from a special guest, Ali, a developer relations engineer at the Filecoin Foundation.
          
          ## Decentralized Storage Solutions - Rweave and Filecoin
          
          To help you understand the concept of storing NFT metadata using decentralized storage solutions, we need to focus on two key players in the field - Rweave and Filecoin.
          
          1. **Arweave**
          
          Arweave is a decentralized storage network that makes data immune to modification, ensuring data validity over very long periods. This is an ideal solution for anyone looking for a permanent database.
          
          2. **Filecoin**
          
          Providing reliable and cost-effective storage, Filecoin is a decentralized protocol that propels the open-market for data storage services.
          
          A great tool to help deploy your NFT metadata onto decentralized storage solutions such as Filecoin is **NFT Storage**. This site makes the deployment process seamless and smooth. You're not limited to SVGs on-chain; you can also upload actual images onto these decentralized storage solutions.
          
          ## An Expert's Take: The Vision of Filecoin
          
          Bringing expert insight into this subject, we welcome Ali from the Filecoin Foundation. Ali shares her view on the mission of Protocol Labs and Filecoin, as well as the vision they have to democratize the internet and web.
          
          She elaborates on the growing importance of data in our daily lives and the tech stack, reinforcing its critical role in the web 3.0 revolution.
          
          <img src="/foundry-nfts/18-filecoin/filecoin1.png" style="width: 100%; height: auto;">
          
          ## Filecoin: The Data Storage Revolution
          
          Filecoin, since its launch in 2020, has been working tirelessly towards decentralizing the data infrastructure for the internet. Their layer one solution, Filecoin Virtual Machine (FVM), has launched some impressive functionalities.
          
          - **Filecoin Data Deal Making:** It involves setting up an agreement between a client and a miner to store data.
          - **Tokenization of Data Sets:** With tokenization, data can be protected securely and transparently.
          - **Data DAOs:** Filecoin's on-chain tools allow data to be collectively owned and governed by an organization (DAO - Decentralized Autonomous Organization).
          
          And many more use cases are being developed, showcased in the [Filecoin docs](https://docs.filecoin.io/).
          
          To build a robust computation over all the useful data stored in Filecoin, they are focusing on layer Two (L2) and computation over data projects like IPC (Interplanetary Consensus Project) and Bacquio.
          
          To get started with Filecoin, try deploying a smart contract to FVM, or use the storage helper - Web3 Storage or NFT Storage, to engage with the technology directly.
          
          ## The Role of ABI Encode Pack
          
          But, what does all this mean, if we haven’t covered what Abi encode pack is and how it works? The Abi encode pack is an essential Ethereum function that we've been using throughout this course. It is used to define how data is formatted for the Ethereum Virtual Machine (EVM).
          
          In our following lessons, we'll explain Abi encode pack in detail using live examples. To get a head start, you can find all the course codes and images in the SRC sublesson.
          
          In conclusion, the embrace of decentralized storage solutions like Rweave and Filecoin opens up a myriad of opportunities and functionalities for users to deploy and manage NFT metadata. It’s indeed an intriguing space with much to offer, and it’s only bound to grow more prevalent in the future.
          
          Stay tuned for more information on the complexities of working with and understanding these storage solutions. Happy learning!
          
      -
        type: new_lesson
        enabled: true
        id: 31cb90f0-4c98-4621-9742-ac0b6cc989a2
        title: "Advanced EVM - Opcodes, calling, etc"
        slug: evm-opcodes-advanced
        duration: 23
        video_url: "yxZ7H4009019A5XRsCm02H3fSJT7g5luBlZtzrO00U600woo"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/19-advanced-evm/+page.md"
        description: |-
                    Delves into advanced Ethereum Virtual Machine (EVM) concepts, focusing on opcodes and function calls. It demonstrates decoding transaction data using MetaMask and highlights the importance of verifying transactions to ensure safety in the cryptocurrency world.
        markdown_content: |-
          ---
          title: Advanced EVM - Opcodes, Calling, and Encoding
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Today, we're embarking on an exciting journey to unveil the mystery behind decoding transaction data using MetaMask. This wallet is used to perform many activities in the cryptocurrency world, but one activity that may seem challenging is the "decoding of transaction data." Here, we explain this process using Wet, a contract that wraps native ETH into an ERC-20 token.
          
          ## Setting up MetaMask
          
          The first step in our journey is as easy as pie. It's the setup phase which calls for the connection to MetaMask. Here, we will be using the Sepolia Contract, as it is one of the existing contracts.
          
          For this stage, all you need to do is:
          
          1. Navigate to your contract.
          2. Click on "Write Contract."
          3. Connect to web3 and open up your MetaMask.
          
          In this scenario, we will be calling the "Transfer From" function. As an aside, you should note that at times, MetaMask may fail to identify the function you are trying to call—this is where the fun begins.
          
          <img src="/foundry-nfts/19-evm/evm1.png" style="width: 100%; height: auto;">
          
          ## Variance Check
          
          From there, you need to verify if your transaction data is accurate.
          
          To do this, you decode the function you’re calling and its parameters by pasting the hex string from the transaction into the call data decode command.
          
          When you complete these steps, MetaMask will display your decoded data. This data keeps the essence of your transaction, the information about the function you're calling and the parameters it utilizes.
          
          <img src="/foundry-nfts/19-evm/evm2.png" style="width: 100%; height: auto;">
          
          ## Performing Transactions Safely
          
          The said steps are applicable when performing transactions of any form in the cryptocurrency world.
          
          ### An example:
          
          Let's say you wish to swap ETH for a token using Uniswap. After initiating the "swap" process, MetaMask shows you a transaction, but are you sure it's the transaction you want to make?
          
          To confirm, you follow the steps previously outlined:
          
          1. Check your contract addresses.
          2. Read the function of the contract.
          3. Check the function selector.
          4. Decode the call data parameters.
          
          By doing so, you can be utterly sure your wallets are performing the expected transactions.
          
          Meanwhile, it's important to note that some upcoming projects like Fire are working on the creation of wallets that can automatically decode transaction data. Hopefully, this will make for safer transactions and effectively eliminate the chances of falling victim to malicious transactions.
          
          ## Wrapping Up
          
          Always remember to verify the details of your transactions when dealing with large amounts of money in the cryptocurrency world, as transactions cannot be undone. With this guide, sending transactions, especially on MetaMask, should be a walk in the park. Stay safe and Happy Trading!
          
      -
        type: new_lesson
        enabled: true
        id: 523a059e-80b6-472f-a1d4-5d8cd49726a8
        title: "Advanced EVM - Encoding"
        slug: evm-encoding
        duration: 6
        video_url: "2Kpc41cTMekmo7HM33oOh4R0163LvpF82Vn601vw1dmDw"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/20-evm-encoding/+page.md"
        description: |-
                    Explores ABI encoding and decoding in the context of EVM. The lesson breaks down the process of converting variables for use in transaction data fields, emphasizing the importance of understanding bytecode and binary for blockchain transactions.
        markdown_content: |-
          ---
          title: Advanced EVM - Encoding functions directly
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          ### Introduction
          
          Today, we're going to take a deep dive into a concept that's integral to interacting with Ethereum and any EVM-compatible chain - ABI encoding and decoding. With the basics of this concept under our belt, we'll see how it aligns itself to the bytecode the Ethereum Virtual Machine (EVM) uses. At its core, this process involves converting different variables into binary or other such low-level byte representation for use in transaction data fields.
          
          <img src="/foundry-nfts/20-function/function1.png" style="width: 100%; height: auto;">
          
          Let’s break down some vital elements before we delve into the intricacies of ABI encoding and decoding.
          
          ### Understanding Bytecode and Binary
          
          Bytecode and binary are low-level programming languages that computers or the Ethereum network use for their transactions. This strange series of characters, which seem utterly incoherent to us, are but different codes that execute various functions in the Ethereum Blockchain.
          
          ### Contract Deployment and Function Calls
          
          With a better grasp of binary and bytecode, let's investigate what happens when we deploy a contract or make a function call. Think of the `data` field in the contract deployment as the keeper of all the binary code of the contract. In a function call, the `data` field contains the function to call at the given address.
          
          If we examine _Etherscan_, a popular Ethereum Blockchain explorer, we can look at the input data of a transaction. This seemingly indecipherable, convoluted bit of 'hex' or binary is the `data` field of the transaction. Essentially, this is what the EVM uses as a guide to know which function to execute.
          
          ### Populating the 'Data' Piece
          
          This knowledge equips us with a seemingly bizarre ability. Whenever we send a transaction, we can fill in the `data` field ourselves with the binary code we want to execute. If we glance back at one of the previous sections where we discussed Ethers, we can use our understanding of function calls and binary to populate this `data` field with a function that we want to call, in binary format.
          
          At first glance, this might sound unappealing. After all, why would someone desire to manually feed in binary code into the `data` field when we have the ABI and other interfaces designed to make our lives easier? The answer lies in the flexibility this presents. Perhaps all you have is the function name, or maybe, you only have the parameters you want to send. If you'd like your code to make arbitrary function calls or perform intricate tasks, then manually defining your `data` field becomes an invaluable asset in your development arsenal.
          
          ### Low-Level Keywords: 'Call' and 'Static Call'
          
          With this newfound knowledge, how do we go about challenging the norms and making these custom `data` calls? Thankfully, Solidity extends some low-level keywords just for us: `call` and `static call`.
          
          The `call` keyword lends us the ability to call functions and change the state of the blockchain. On the other hand, `static call` allows us to call 'view' or 'pure' functions, which don't alter the state of the blockchain and just return a value.
          
          If we modify the data in our `call` function using these parameters, we'll find that we can influence the value of our transactions directly. Moreover, the `gasLimit` and `gasPrice`, which are integral to the financial aspect of transactions, can also be changed.
          
          ### Using Parentheses to Add Data
          
          If we pinpoint the location of the parentheses in a typical `call`, we come across a region where we can add our `data`. When specified, instead of merely sending money to a function, we can use this space to `call` different functions we desire.
          
          <img src="/foundry-nfts/20-function/function2.png" style="width: 100%; height: auto;">
          
          In conclusion, ABI encoding and decoding enable us to have more control over our transactions and function calls. Therefore, understanding the low-level process enables not only a broader understanding of how Ethereum works but also opens the door to more complex and custom transaction handling in the blockchain.
          
      -
        type: new_lesson
        enabled: true
        id: 166753f8-2135-4707-b712-c20471474ac9
        title: "Advanced EVM - Recap"
        slug: avanced-evm-recap
        duration: 2
        video_url: "LambPv2u0201jvTp8fbSdubbt3MEparXBXSgBwCRIclJE"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/21-evm-recap/+page.md"
        description: |-
                    A recap of the advanced EVM concepts covered in the course. It revisits topics like string combination, low-level concepts, binary encoding, and the use of the 'call' function in Solidity, summarizing the key takeaways from the advanced sections of the course.
        markdown_content: |-
          ---
          title: Advanced EVM - Encoding functions recap
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Hello there! Trust me when I say we've covered a lot of ground together on this fascinating journey into the world of Solidity. But fear not, we're not done unraveling its complexities and building our understanding one block at a time.
          
          ## Quick Recap
          
          Before we dive into today's topic – the magic of call function, let's do a quick refresher on what we've explored in our previous discussions.
          
          ### Combining Strings
          
          You remember how we’ve talked about combining strings with the syntax like `Abi.encodePacked()` and then typecast it to a string, right? And you’ll recall how we observed that in newer versions of Solidity, the syntax looks something like `string("hi mom, miss you")`. It's important to note that this works well in the newer versions, but might throw an error in the older Solidity versions.
          
          ### Understanding Low-Level Concepts
          
          We also took a deep dive into some low-level concepts, didn't we? We learnt about compiling our contracts, dealing with the mysterious ABI file and that weird binary thing (you know, that string of numbers and letters that makes our heads spin!). When we deploy a contract, this obscure code is what gets sent in the 'data' field of our contract creation transaction.
          
          For contract creations, the data is populated with binary code. When it comes to function calls, the data is used to define what functions need to be called and with what parameters. But fret not, this is precisely what we're prepping ourselves to learn next!
          
          ### Decoding the Enigma of Binary Encoding
          
          Remember how we can encode just about anything we want into this 'number and letter' code to save space through a method called `encodePacked`? We also learnt we can decode stuff that's been encoded, although we can't decode stuff that was encoded with the `encodePacked` method. Interesting, isn't it? We mastered multi encoding and then multi decoding, thus adding several cool tricks to our Solidity hats!
          
          ### Introducing the Call Function
          
          Onwards, we analyze the power of the 'call' function. We realized that we can add data in the call function to make any call we want to any smart contract. Powerful, isn’t it?
          
          <img src="/foundry-nfts/21-evm-recap/evm-recap1.png" style="width: 100%; height: auto;">
          
          ## Next Up: Handling the Call Function
          
          I bet you're raring to go now! So, let's deep dive into this exciting concept of how to use the 'call' function to make any calls we want to any smart contract.
          
          Before you head out though, now's a great time to take that much-needed break. We just went over some brain-racking concepts. And like I always say, it's absolutely fine if you don't get everything the first time around. It's a complex subject and we're here for the entire marathon, not just the sprint. So feel free to revisit these ideas at your own pace and keep exploring this fascinating world of Solidity. Until next time!
          
      -
        type: new_lesson
        enabled: true
        id: b6e9292c-29ee-4a69-8a29-910fd5b8eca3
        title: "EVM signatures selectors"
        slug: evm-signatures-selectors
        duration: 15
        video_url: "WUsE7MASeXwiqPNpXCpxLFo023JuXcxqKE7dDMI02a00IE"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/22-evm-signatures-selectors/+page.md"
        description: |-
                    Focuses on EVM encoding signatures and selectors. The lesson explains how to populate the data field in function calls, the role of function selectors, and the use of ABI to call functions without explicit interface definitions.
        markdown_content: |-
          ---
          title: Advanced EVM - Encoding Signatures & Selectors
          ---
          
          _Follow along the course with this video._
          
          
          
          ---
          
          Welcome back! Having discussed encoding before, let's now take our discussion a little further and understand how to populate the data field in a function call.
          
          In essence, we will learn how to simplify transactions at the base level by means of binary, bytes, and hexadecimal to interact with smart contracts. Getting to grips with these concepts will allow us to emulate what the blockchain does at the fundamental level. Let's dive in and commence this learning journey.
          
          ## Creating a New File and Setting Up
          
          To kick things off, we'll create a new file called _call anything. sol_. We start with an SPDX license identifier of MIT and proceed to break down the code on this file.
          
          The first thing to note is that to call a function with just the data field of the function call, we need to encode the function name &amp; its parameters. When a function is called, we specify the function name and the parameters.
          
          These need to be encoded down to the binary level to allow EVM (Ethereum-based smart contracts) and Solidity to comprehend what's happening.
          
          ## Understanding Function Selectors and their Role
          
          To achieve this, we need to delve into a couple of concepts. The first aspect relates to what is known as the 'function selector'. The function selector happens to be the first four bytes of the 'function signature'.
          
          The function signature is essentially a string defining the function name and parameter. If 'transfer' is a function, for instance, it's going to have a function signature and will accept an address and a UN 256 as inputs.
          
          To understand Solidity better, let's take a look at the bytecode and binary code. A function selector like 'transfer' informs Solidity to execute the transfer function. One of the ways to get the function selector is by encoding the function signature and grabbing its first four bytes.
          
          ## Setting Up the Contract
          
          Let's now create the contract for our exercise with Solidity 0.8.7. We'll call this contract 'call anything'. With two storage variables in place, we have our function set up called 'transfer'.
          
          Notice that while the transfer function normally deals with an ERC-20 transfer, we are using it here with an address and a UN 256 amount. The idea is to set these values and work with the function to understand how it impacts our output.
          
          To achieve this, we will create a function to get that function selector.
          
          ```js
          function getSelectorOne() public pure returns(bytes4 selector){
              selector = bytes4(keccak256(bytes("transfer(address,uint256)")));
          }
          ```
          
          Once we have compiled our code and run it, we access the function selector by clicking on 'getSelector1'. This provides us with the bytes that informs our Solidity contract that we refer to the transfer function with an address and a uint256 as input parameters.
          
          ## Encoding The Parameters
          
          The next step in this process involves encoding the parameters with our function selector.
          
          ```js
          function getDataToCallTransfer(address someAddress, uint256 amount) pubic pure returns(bytes memory){
              return abit.encodeWithSelector(getSelector1(), someAddress, amount);
          }
          ```
          
          ABI (Application Binary Interface) plays a key role here. ABI is instrumental in ensuring that different system components interact seamlessly with each other. Here, it encodes the function selector and the arguments and then attaches the encoding to the specified four-byte selector.
          
          Compiling and running it helps us see how all the encoded data fits into the transaction data field. This further facilitates the contract in calling the transfer function and passing an address and an amount.
          
          ## The Power of ABI to Call a Function
          
          With these aspects in place, we can now use ABI to call functions without explicitly having to mention the function. We can create a function that calls the transfer function by encoding all necessary parameters.
          
          ```js
          function callTransferFunctionDirectly(address someAddress, uint256 amount) public returns(bytes4, bool){
              (bool success, bytes memory returnData) = address(this).call(
                  //getDataCallTransfer(someAddress, amount)
                  abi.encodeWithSelector(getSelectorOne(), someAddress, amount)
              );
              return(bytes4(returnData), success);
          }
          ```
          
          Using the `address(this).call` method, we can directly call the function with the give parameters. The method returns a boolean value for success and the return data of the call.
          
          This call function, while considered low-level, illustrates the ability to call the transfer function without actually having to call it directly. This demonstration lays the foundation for understanding how to interact between different contracts using ABI encoding and decoding methods.
          
          ## Adjustments Using ABI: encodeWithSelector and encodeWithSignature
          
          ABI function also provides us with another method: `encodeWithSignature`. This method simplifies the earlier mentioned processes as it turns the function string into a selector for us.
          
          ```js
          function callTransferFunctionDirectly(address someAddress, uint256 amount) public returns(bytes4, bool){
              (bool success, bytes memory returnData) = address(this).call(
                  //getDataCallTransfer(someAddress, amount)
                  abi.encodeWithSignature("transfer(address,uint256)", someAddress, amount)
              );
              return(bytes4(returnData), success);
          }
          ```
          
          This new function varies in no way from the previous function. Both functions carry out the same tasks; the only difference lies in the approach, with the second case simplifying things by combining the encoding process. This streamlines the encoding of the function selector on our behalf.
          
          ### Note
          
          It's generally considered good practice to use high-level approaches such as import interfaces rather than low-level calls as they provide the compiler's support and ensure data type matching. Despite this, mastering such low-level Solidity techniques allows us to appreciate the flexibility and versatility of the code more fully.
          
          ## Recap and Next Steps
          
          This advanced lesson on coding in Solidity reveals the importance of using encoding and decoding to affect smart contracts. It's normal to find these processes challenging initially. However, as we continue to practice, we will grow more comfortable with them.
          
          For those who want to dig a little deeper, I recommend [Deconstructing Solidity](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/) by Open Zeppelin. This article goes further into the behind-the-scenes of a contract, a useful resource if you're interested in opcodes and lower-level components.
          
          Thank you for sticking with me throughout this in-depth lesson on binary encoding in Solidity. Cheers and until the next time.
          
      -
        type: new_lesson
        enabled: true
        id: ba69714a-ca5e-456b-9c6c-1afc337661f0
        title: "Verifying a transaction in Metamask"
        slug: verifying-transaction-metamask
        duration: 8
        video_url: "TW5lOPKMmAPYPAlk4j77E53GKOjg7nlHmh8hY4MFtLE"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/23-verifying-metamask/+page.md"
        description: |-
                    Provides a guide on verifying transactions in MetaMask. It includes steps to decode transaction data and emphasizes the importance of transaction verification for security purposes, especially when swapping tokens or interacting with smart contracts.
        markdown_content: |-
          ---
          title: Verifying MetaMask transactions
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Today, we're embarking on an exciting journey to unveil the mystery behind decoding transaction data using MetaMask. This wallet is used to perform many activities in the cryptocurrency world, but one activity that may seem challenging is the "decoding of transaction data." Here, we explain this process using Wet, a contract that wraps native ETH into an ERC-20 token.
          
          ## Setting up MetaMask
          
          The first step in our journey is as easy as pie. It's the setup phase which calls for the connection to MetaMask. Here, we will be using the Sepolia Contract, as it is one of the existing contracts.
          
          For this stage, all you need to do is:
          
          1. Navigate to your contract.
          2. Click on "Write Contract."
          3. Connect to web3 and open up your MetaMask.
          
          In this scenario, we will be calling the "Transfer From" function. As an aside, you should note that at times, MetaMask may fail to identify the function you are trying to call—this is where the fun begins.
          
          <img src="/foundry-nfts/23-metamask/metamask1.png" style="width: 100%; height: auto;">
          
          ## Decoding the Call Data
          
          After setting up MetaMask, transacting, and the transaction confirmation pops up, you’re now ready to decode the transaction data.
          
          The next step to take here is to copy the hex data and proceed to your terminal. Within your terminal, you'll use the `cast` helper. This tool comes with a vast array of commands like `call data decode` which is designed to decode ABI-encrypted input data.
          
          _Equation 1: cast call data decode SIG call data_
          
          <img src="/foundry-nfts/23-metamask/metamask2.png" style="width: 100%; height: auto;">
          
          If your function selector doesn't match, you can use a different signature database to find the correct function. In some unusual cases, a contract might have two functions with the same signature, which is unsupported in Solidity.
          
          ## Variance Check
          
          From there, you need to verify if your transaction data is accurate.
          
          To do this, you decode the function you’re calling and its parameters by pasting the hex string from the transaction into the call data decode command.
          
          _Equation 2: cast call data decode SIG call data_
          
          When you complete these steps, MetaMask will display your decoded data. This data keeps the essence of your transaction, the information about the function you're calling and the parameters it utilizes.
          
          ## Performing Transactions Safely
          
          The said steps are applicable when performing transactions of any form in the cryptocurrency world.
          
          ### An example:
          
          Let's say you wish to swap ETH for a token using Uniswap. After initiating the "swap" process, MetaMask shows you a transaction, but are you sure it's the transaction you want to make?
          
          To confirm, you follow the steps previously outlined:
          
          1. Check your contract addresses.
          2. Read the function of the contract.
          3. Check the function selector.
          4. Decode the call data parameters.
          
          By doing so, you can be utterly sure your wallets are performing the expected transactions.
          
          Meanwhile, it's important to note that some upcoming projects like Fire are working on the creation of wallets that can automatically decode transaction data. Hopefully, this will make for safer transactions and effectively eliminate the chances of falling victim to malicious transactions.
          
          ## Wrapping Up
          
          Always remember to verify the details of your transactions when dealing with large amounts of money in the cryptocurrency world, as transactions cannot be undone. With this guide, sending transactions, especially on MetaMask, should be a walk in the park. Stay safe and Happy Trading!
          
      -
        type: new_lesson
        enabled: true
        id: dfedd4c2-96d5-4093-b8ce-c669163e7936
        title: "Section recap"
        slug: nft-and-andvanced-evm-recap
        duration: 4
        video_url: "Vjbg00RhOexykjOo01Iec01leXN3FnYnKqOwyTVx0201cCPk"
        raw_markdown_url: "/routes/advanced-foundry/2-nfts/24-recap/+page.md"
        description: |-
                    A comprehensive recap of the entire course, summarizing key concepts such as NFT basics, storage options, advanced EVM topics, smart contract interaction, and the use of tools like MetaMask for transaction verification.
        markdown_content: |-
          ---
          title: Recap
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Wow! We’ve traversed quite the technological terrain in this course. We've gained knowledge about NFTs, financial wallets, encoding, transaction viewing, decoding hex data and more. We have also had hands-on exercises to create a basic NFT with all the main functionalities necessary. So, let's do a quick run-through of all that we've covered in this course.
          
          ## Understanding NFTs
          
          First and foremost, we demystified what an NFT actually is. NFT stands for Non-Fungible Token, a unique cryptographic token on blockchain that represents ownership or proof of authenticity of an item or asset, digital or physical.
          
          We didn't stop at learning theoretically, we created our own basic NFT equipped with all the essential functions, such as the Token URI, which pointed to the metadata, and the Mint NFT function.
          
          ```js
            function mintNftOnContract(address basicNftAddress) public {
                  vm.startBroadcast();
                  BasicNft(basicNftAddress).mintNft(PUG_URI);
                  vm.stopBroadcast();
              }
          ```
          
          ## Storing NFTs: On-chain vs IPFS
          
          Next, we learnt about NFT storage, specifically the difference between storing the NFT metadata on-chain vs on IPFS. On-chain storage translates into a higher cost but boasts a more decentralized version. Storing on IPFS, on the other hand, is a bit cheaper.
          
          Aside from IPFS and on-chain, we also briefly explored Filecoin and Rweave, two other decentralized storage platforms to consider. These offer a more decentralized, yet still cost-effective, solution than storing on the ETH mainnet.
          
          ## Beyond the Basics
          
          Our learning journey didn't end there. We delved into more advanced matters like file reading from scripts, base 64 encoding, function signatures, function selectors, different encoding types and diverse methods for data encoding. We also mastered calling any function regardless of whether we have the interface, provided we have the function signature.
          
          ## Behind the Scenes of Transactions
          
          Exploring further, we got a handle on the nitty-gritty of transactions on the blockchain and the data included when sending transactions. We also learnt how to view transactions on a block explorer and delve into the related input data.
          
          A great example can be found when checking out previous transactions. On any block explorer, select a transaction, and join us as we navigate to more details to discover function information and input data.
          
          <img src="/foundry-nfts/24-recap/recap1.png" style="width: 100%; height: auto;">
          
          ## The Journey Ahead
          
          Reflecting on the lessons, it's clear we've learnt so much! And it is exciting to see how quickly the knowledge and skills are growing. As we move forward, you'll go through more advanced sections like the Foundry DFI stablecoin, upgrades, governance and introduction to security.
          
          Take a well-deserved break, and when you're ready, tweet your excitement about your super advanced learnings. You're on the path towards becoming a phenomenal smart contract developer. I can't wait to see you in the next lessons.
          
          _"By getting this far, you have learned some skills that even some top solidity devs don't even know. You are growing incredibly quickly."_
          
          Good job, everyone! Until next time.
          
    type: new_section
    enabled: true
  -
    title: "Develop a DeFi Protocol"
    slug: develop-defi-protocol
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 877d4fab-bf7c-483f-95ad-dab912ac5103
        title: "DeFi introduction"
        slug: defi-introduction
        duration: 10
        video_url: "8WTtH77r01dyAqQnIbk5i00Pa94I6WBpu023LYB8MZvy54"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/1-defi-introduction/+page.md"
        description: |-
                    Explore the fundamentals of decentralized finance (DeFi) including key concepts, protocols, and the significance of DeFi in the financial sector.
        markdown_content: |-
          ---
          title: DeFi Introduction
          ---
          
          _Follow along the course with this video._
          
          
          
          # Diving into Decentralized Finance (DeFi)
          
          Hello and welcome back. Today we will be delving into Foundry DeFi, taking a look at the code we will be working with throughout this course. It is important to mention that DeFi is an enormous and complex subject that fully deserves an exclusive course, but for now, let's start by delving into the basics of DeFi. Let’s get started!
          
          ## I. An Overview of DeFi
          
          If you are new to DeFi, a great starting point is [DeFi Llama](https://defillama.com/), a simple and intuitive website that provides a current snapshot of the DeFi industry, giving insights into total value locked in DeFi, leading apps, and dominant protocols. Top platforms include open-source decentralized banking like Aave, liquid staking platforms like Lido, decentralized exchanges like Uniswap and Curve Finance, and collateralized debt position protocols like MakerDAO which we will be building later in the course.
          
          ### The Beauty of DeFi
          
          <img src="/foundry-defi/1-defi-introduction/defi-introduction1.PNG" style="width: 100%; height: auto;">
          
          The beauty of DeFi and the reason for its growing popularity is the access it provides to sophisticated financial products and instruments in a decentralized context.
          
          <img src="/foundry-defi/1-defi-introduction/defi-introduction2.PNG" style="width: 100%; height: auto;">
          
          In my opinion, DeFi is possibly the most exciting and important application of smart contracts. I highly recommend spending some time to become conversant with the basics of DeFi, if not becoming fully fluent. Start with useful resources such as the [Bankless](https://www.bankless.com/) podcast and [MetaMask Learn](https://learn.metamask.io/).
          
          ## II. Getting Started with DeFi
          
          I encourage you to begin by playing around with apps such as Aave and Uniswap on their respective websites.
          
          For newcomers, it is advisable to start on testnets. Some platforms, such as Ethereum, have high transaction fees, so beginners might want to consider cheaper alternatives like Polygon Optimism or Arbitrum.
          
          It's crucial to remain aware of the concept of MEV (Miner Extractable Value or Maximal Extractable Value) which is a significant issue in the DeFi industry. In essence, if you are a validator who arranges transactions in a block, you can organize them in a manner that favors you - cultivating fair practices in this area is the focus of several protocols like Flashbots.
          
          For those looking to delve deeper into DeFi, I recommend checking out the [Flashbots.net](https://www.flashbots.net/) website, which houses a wealth of videos and blogs.
          
          ## III. The Project: Building A Stablecoin
          
          In this course, we will be building our version of a stablecoin. The concept of stablecoins is advanced and widely misunderstood. To simplify it, they are assets that peg their market value to another stable asset, like gold or a fiat currency.
          
          ## IV. Foundry Stablecoin Project is the Most Advanced.
          
          <img src="/foundry-defi/1-defi-introduction/defi-introduction3.PNG" style="width: 100%; height: auto;">
          
          Even though we have following lessons on upgrades, governance, introduction to security, this Foundry Stablecoin project is the most advanced one we're working with, hands down.
          
          Stepping into DeFi and understanding everything in this lesson can be a daunting task. Seek help from [Chat GPT](https://chat.openai.com/), use the [GitHub repo](https://github.com/Cyfrin/foundry-full-course-f23/) discussion tab or even browse the [MakerDAO forum](https://forum.makerdao.com/) to understand how the industry stalwarts are working and implementing DeFi.
          
          You can even check out Coinbase's educational content to get a headstart on DeFi.
          
          And remember,
          
          <img src="/foundry-defi/1-defi-introduction/defi-introduction4.PNG" style="width: 100%; height: auto;">
          
          In the following section, we will be walking you through the code. Happy learning!
          
      -
        type: new_lesson
        enabled: true
        id: 1d12f97f-cd50-4fbd-80d0-ca47bcffdbe8
        title: "Project code walkthrough"
        slug: defi-code-walkthrough
        duration: 4
        video_url: "ajFRzG9nsPE9aBeH63NAUAmXHnhIgTVVKHACvP3sYn00"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/2-defi-code-walkthrough/+page.md"
        description: |-
                    Delve into the detailed walkthrough of DeFi codebase including analysis of key files and their functionalities in the DeFi environment.
        markdown_content: |-
          ---
          title: DeFi Code Walkthrough
          ---
          
          _Follow along the course with this video._
          
          
          
          # Diving into the Codebase for a Decentralized Stablecoin
          
          Welcome to our deep-dive exploration of a pretty robust and interesting codebase! Today, we're unveiling the inner workings of two primary files: `DecentralizedStableCoin.sol` and `DSCEngine.sol`. Both can be found within the SRC folder of our codebase.
          
          <img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough1.PNG" style="width: 100%; height: auto;">
          
          ## A Closer Look at decentralized stablecoin.sol
          
          `DcentralizedStableCoin.sol` is fundamentally a simplistic and minimalistic ERC20. What sets it aside, however, are the more intricate imports such as `ERC20Burnable` and `Ownable`.
          
          The file contains pertinent functions such as the ERC20 constructor, a burn function (removes tokens), and a mint function (prints new tokens). At first glance, it bears striking resemblance to a classic ERC20.
          
          ```javascript
          constructor() ERC20 ("DecentralizedStableCoin", "DSC") {}
          
          function burn(uint256 _amount) public override onlyOwner{
              uint256 balance = balanceOf(msg.sender);
              if(_amount <= 0){
                  revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
              }
              if (balance < _amount){
                  revert DecentralizedStableCoin__BurnAmountExceedsBalance();
              }
              super.burn(_amount);
          }
          
          function mint(address _to, uint256 _amount) external onlyOwner returns (bool){
              if(_to == address(0)){
                  revert DecentralizedStableCoin__NotZeroAddress();
              }
              if(_amount <= 0){
                  revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
              }
              _mint(_to,_amount);
              return true;
          }
          ```
          
          ## Unraveling the DSCEngine
          
          Our main contract, `DSCEngine.sol`, controls the decentralized stablecoin. This file is brimming with specific functions. It accommodates functionalities such as the depositing and minting of DSC (Decentralized Stable Coin).
          
          Primarily, the stablecoin operates by being collateral-backed, meaning that it's supported by collaterals with existing monetary value. This will be explored in greater detail further into this post.
          
          <img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough2.PNG" style="width: 100%; height: auto;">
          
          Other functions include the ability to redeem or withdraw your collateral, burn DSC, and liquidate. If you're wondering what liquidation is, don't worry; we'll break that down later.
          
          An individual can also mint DSC if they have sufficient collateral, aside from depositing and redeeming collateral.
          
          ## Diving into the Test Folder
          
          <img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough3.PNG" style="width: 100%; height: auto;">
          
          Our test folder includes unit tests for the engine, the stablecoin, and an Oracle Library. It also contains `mocks`, typical for any project.
          
          We're also going to touch upon two intriguing aspects: fuzz tests and invariant tests. Especially, the introduction to `invariant tests` promises a fascinating journey as these tests discern average solidity developers from advanced ones.
          
          ## Scripts
          
          Our scripts are astonishingly straightforward. Their principal purpose is to deploy the stablecoin. Here, we use Chainlink price feeds to gauge the price of underlying collateral.
          
          You can find all the code and necessary information in this repo. However, be prepared, this section is advanced. So, understanding won't be a breeze, but remember, learning is never a race. You're encouraged to ask questions, code alongside, and fully comprehend what we're trying to accomplish.
          
          ## The Importance of Stablecoins in DeFi
          
          Before we proceed any further, I would like to mention that the reason for creating a stablecoin is my strong belief that they are pivotal in the universe of DeFi. The current solutions, however, are far from satisfying. Therefore, I hope this venture inspires you to create better, more efficient solutions.
          
          With that said, let's go ahead and understand stablecoins better. Take your time, and keep learning! In the next part we'll be clarifying everything you need to know about stablecoins.
          
      -
        type: new_lesson
        enabled: true
        id: 14c8bc73-7738-419b-bc4e-11fbd16e72e1
        title: "Introduction to stablecoins"
        slug: defi-stablecoins
        duration: 15
        video_url: "LJKc4j6202Cgks62hSG2IIqg4sO3C6G00dWgDYfArwsow"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/3-defi-stablecoins-but-actually/+page.md"
        description: |-
                    Gain insights into stablecoins, their types, significance in DeFi, and the roles they play in maintaining economic stability in digital finance.
        markdown_content: |-
          ---
          title: Stablecoins, but actually
          ---
          
          _Follow along the course with this video._
          
          
          
          # Everything You Need to Know About Stablecoins
          
          ## Introduction
          
          Stablecoins have become one of the most talked about topics in the cryptocurrency and blockchain space. However, there is a lot of misleading information out there about what stablecoins really are and how they work. This blog post will provide a comprehensive overview of stablecoins, clarifying common misconceptions and providing key details that every crypto enthusiast should understand.
          
          We'll cover what stablecoins are, why they matter, different categories and properties of stablecoins, designs of top stablecoins like Dai and USDC, and most importantly - the real incentives behind stablecoin creation and usage. There's a lot of ground to cover, so let's dive in!
          
          ## What Are Stablecoins?
          
          <img src="/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually1.png" style="width: 100%; height: auto;">
          
          A stablecoin is a cryptocurrency designed to have minimal volatility and maintain a stable value over time. The key property of a stablecoin is that its "buying power" remains relatively constant.
          
          For example, if 1 ETH could buy 10 apples last year but this year 1 ETH can only buy 5 apples due to ETH volatility, we would say ETH's buying power changed significantly. However, if $1 could buy 1 apple last year and $1 can still buy 1 apple today, the dollar's buying power remained stable.
          
          Stablecoins aim to mimic the stability of fiat currencies like the dollar, while still retaining the benefits of cryptocurrencies like decentralization and security. A more formal definition is:
          
          <img src="/foundry-defi/3-defi-stablecoins-but-actually/defi-stablecoins-but-actually2.PNG" style="width: 100%; height: auto;">
          
          Unlike most cryptocurrencies, stablecoins are pegged to real-world assets like the US dollar or algorithmically controlled via supply and demand to maintain stability.
          
          ## Why Do Stablecoins Matter?
          
          Stablecoins fulfill 3 key functions of money that are needed for an efficient economy:
          
          1. **Store of value**: Allow people to preserve wealth over time.
          2. **Unit of account**: Provide a common measure of value to price goods and services.
          3. **Medium of exchange**: Enable transactions between parties via a payment method.
          
          For crypto to become a mature asset class and decentralized ecosystem, it requires stable assets that can reliably perform these functions without volatility. Fiat currencies like the US dollar serve these roles in traditional finance.
          
          Stablecoins allow decentralized protocols to have access to price stability and a reliable medium of exchange - unlocking use cases like decentralized lending, payments, and more.
          
          ## Categorizing Stablecoins
          
          There are 3 key ways to categorize different types of stablecoins:
          
          ### 1. Relative Stability
          
          - **Pegged (anchored) stablecoins**: Pegged to the value of another asset like the US dollar. Examples include USDC, Tether.
          - **Floating (unpegged) stablecoins**: Not pegged to any external asset. Stability is maintained via supply and demand mechanisms. Example: RYE stablecoin.
          
          ### 2. Stability Mechanism
          
          - **Algorithmic**: Stability is maintained programmatically via a decentralized algorithm. Examples: DAI, Frax.
          - **Governed (centralized)**: Stability is controlled manually by a central party. Examples: USDC, Tether.
          
          ### 3. Collateral Type
          
          - **Exogenous**: Collateral comes from outside the stablecoin's ecosystem. If stablecoin fails, collateral is unaffected. Examples: DAI (ETH collateral), USDC (USD fiat collateral).
          - **Endogenous**: Collateral comes from inside the stablecoin's ecosystem. If stablecoin fails, collateral fails too. Example: TerraUSD (LUNA collateral).
          
          ## Top Stablecoin Designs
          
          Now let's look at some top stablecoins and their key design properties:
          
          ### DAI
          
          Properties:
          
          - Pegged to USD
          - Algorithmic
          - Exogenous collateral (overcollateralized ETH)
          
          DAI is one of the most influential DeFi stablecoins. Users deposit ETH as collateral to mint DAI stablecoins against it. Unique stability fees discourage excessive printing. Autonomous smart contracts maintain the peg and collateralization ratio.
          
          ### USDC
          
          Properties:
          
          - Pegged to USD
          - Governed (centralized)
          - Exogenous collateral (USD fiat reserves in bank accounts)
          
          USDC is a popular stablecoin back 1:1 by US dollar reserves. It is controlled by a consortium of centralized entities that manage the reserves.
          
          ### TerraUSD (UST)
          
          Properties:
          
          - Formerly pegged to USD
          - Algorithmic
          - Endogenous collateral (LUNA tokens)
          
          UST relied on algorithmic mechanisms to maintain its peg to the US dollar. Its stability was dependent on LUNA, whose value collapsed along with UST. This shows the risks of endogenous collateral.
          
          ### RYE
          
          Properties:
          
          - Floating (not pegged)
          - Algorithmic
          - Exogenous collateral (ETH)
          
          RYE uses supply and demand mechanisms to algorithmically maintain stability relative to purchasing power. It is one of the few prominent non-pegged stablecoins on the market today.
          
          ## The Real Purpose of Stablecoins
          
          At this point you may be wondering - if stablecoins are supposed to enable decentralized payments and commerce, why are they being printed in the billions?
          
          The truth is, the primary users and beneficiaries of today's stablecoins are not average crypto users transacting in a decentralized economy. **The key demand for stablecoins actually comes from wealthy crypto investors seeking to amplify their holdings through leveraged trading strategies.**
          
          Most DeFi protocols allow users to deposit cryptoassets like ETH as collateral to take out stablecoin loans, often at attractive interest rates. Investors can then use these stablecoins to buy more ETH and increase their position size.
          
          Essentially, stablecoins unlock amplified exposure to volatile cryptoassets - also known as leverage. With the ability to go 2-3x leverage on their holdings via stablecoin loans, large crypto investors can maximize returns in bull markets.
          
          And because stablecoin systems charge fees for minting, they earn a nice revenue stream from traders pursuing these leveraged strategies.
          
          **So while stablecoins are marketed as bringing stability and usability to decentralized finance, the reality is speculative leverage is driving most of the growth in stablecoins today.**
          
          ## Conclusion
          
          This covers the key essentials you need to know about stablecoins. To recap:
          
          - Stablecoins are cryptocurrencies designed to maintain a stable value.
          - They bring stability and usability to decentralized finance.
          - But leverage and speculation are big drivers of stablecoin demand today.
          
          There are still many open questions about the ideal stablecoin design and governance model. I'm excited to see how stablecoin technology and applications continue to evolve in years to come!
          
          Let me know in the comments if you have any other stablecoin topics you want me to cover in a future post. And don't forget to like and share this article!
          
      -
        type: new_lesson
        enabled: true
        id: 34ba57b0-a5f2-4991-801b-a4f3a0f1c230
        title: "Decentralised stablecoins"
        slug: defi-decentralized-stablecoin
        duration: 11
        video_url: "hHyZhQro6kCWr02tZLwTTeUxhdoJgwu00DsSRY01m01qyIA"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/4-defi-decentralized-stablecoin/+page.md"
        description: |-
                    Understand the creation and management of decentralized stablecoins, focusing on their development, operational mechanics, and impact on DeFi.
        markdown_content: |-
          ---
          title: DecentralizedStableCoin.sol
          ---
          
          _Follow along the course with this video._
          
          
          
          # Building a Decentralized Stablecoin: Step-by-Step Guide
          
          In this section, we're diving into the exciting world of decentralized finance (DeFi) and going one step ahead by creating our very own stablecoin. We'll be covering everything you need to know to follow along and delve into the world of stablecoins with us.
          
          ## What is a Stablecoin?
          
          A stablecoin is a form of cryptocurrency that is pegged to a reserve asset like the US Dollar. The idea behind it is to provide stability in the highly volatile world of cryptocurrencies.
          
          ## Forging Ahead with Code
          
          If you're as excited about this project as we are, you can follow along with all the code that we're creating in this tutorial. We have dedicated an entire GitHub repository to the code we'll be building - it's under the [foundry-defi-stablecoin-f23](https://github.com/Cyfrin/foundry-defi-stablecoin-f23) course section. We have big plans for this project, including getting the code audited to ensure its security and reliability.
          
          To follow the updates about this audit, keep an eye on this GitHub repository as we will be posting all audit reports there.
          
          We're diving straight into the nuts and bolts of this project. A lot of the information we'll be going over is likely to be familiar to you if you've done similar projects before. However, we'll also introduce a few new concepts like stateless fuzzing.
          
          ## The Architecture of Our Stablecoin
          
          So, before we dive straight into the code, let's take a glance at what our stablecoin's architecture is going to look like. We are building a stablecoin that's one, anchored, meaning it is pegged to the US Dollar. Secondly, our stability mechanism is algorithmic, meaning the process for minting is going to be entirely decentralized - there's no governing entity that is controlling our stablecoins. Lastly, we're using exogenous crypto-assets, specifically Ethereum and Bitcoin, as collateral for our stablecoin.
          
          <img src="/foundry-defi/4-defi-decentralized-stablecoin/defi-decentralized-stablecoin1.png" style="width: 100%; height: auto;">
          
          ## Maintaining Our Stablecoin's Value
          
          To ensure that our stablecoin is always worth $1, we have to match it to the dollar's price constantly. We do this using a chainlink price feed. Our program will run a feed from chainlink, and we will set a function to exchange Ethereum and Bitcoin for their equivalent dollar value. This function will help us maintain the stability of our stablecoin.
          
          To make the stability mechanism algorithmic, we will have a condition in our code that only mints the stablecoin if there's enough collateral.
          
          The collateral type, i.e., Ethereum and Bitcoin, is exogenous, meaning, we're only going to accept these two types of cryptocurrencies as collateral. We're going to use the ERC20 version of Ethereum and Bitcoin, also known as wrapped Ethereum (WETH) and wrapped Bitcoin (WBTC).
          
          <img src="/foundry-defi/4-defi-decentralized-stablecoin/defi-decentralized-stablecoin2.PNG" style="width: 100%; height: auto;">
          
          To use this architecture, we create a code that over collateralizes the stablecoin using WETH and Bitcoin as the collateral.
          
          ## Pulling up Our Sleeves and Coding Away
          
          With the plan in place, it's time to dive into coding.
          
          Here is a step-by-step guide to creating your own decentralised stablecoin:
          
          ### Step 1: Install OpenZeppelin
          
          We begin by installing OpenZeppelin as it provides basic smart contract-building blocks. To do this, we use the following command:
          
          ```bash
          forge install openzeppelin/openzeppelin-contracts --no-commit
          ```
          
          Then open up the `foundry TOML` and add the following remappings:
          
          ```javascript
          remappings = ["@openzeppelin/contracts=lib/openzeppelin-contracts/contracts"];
          ```
          
          ### Step 2: Import Libraries and Contract Functions
          
          Once OpenZeppelin is correctly installed, open up our `DecentralizedStableCoin.sol` contract file where we will import necessary libraries. We start by importing three OpenZeppelin contracts: `ERC20`, `ERC20Burnable` and `Ownable`.
          
          The `ERC20Burnable` contract provides us with a "burn" function, which is essential in maintaining the peg price of our stablecoin, as we'll be burning a lot of tokens. The "burn" function will be overridden by our function.
          
          In contrast, when it comes to the "mint" function, we do not need to override any functions. Instead, we are going to call the "\_mint" function directly.
          
          ```javascript
          //SDPX-LICENSE-IDENTIFIER:MIT
          pragma solidity 0.8.19;
          
          import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
          import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
          
          contract DecentralizedStableCoin is ERC20Burnable, Ownable {
              error DecentralizedStableCoin__AmountMustBeMoreThanZero();
              error DecentralizedStableCoin__BurnAmountExceedsBalance();
              error DecentralizedStableCoin__NotZeroAddress();
          
              constructor() ERC20("DecentralizedStableCoin", "DSC") {}
          
              function burn(uint256 _amount) public override onlyOwner {
                  uint256 balance = balanceOf(msg.sender);
                  if (_amount <= 0) {
                      revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
                  }
                  if (balance < _amount) {
                      revert DecentralizedStableCoin__BurnAmountExceedsBalance();
                  }
                  super.burn(_amount);
              }
          
              function mint(address _to, uint256 _amount) external onlyOwner returns (bool) {
                  if (_to == address(0)) {
                      revert DecentralizedStableCoin__NotZeroAddress();
                  }
                  if (_amount <= 0) {
                      revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
                  }
                  _mint(_to, _amount);
                  return true;
              }
          }
          ```
          
          That's it! We've now sown the seeds of creating a stablecoin.
          
          It's always a good practice to keep updating and checking your code as you progress. You can run `forge build` to compile the contract and check for any issues or errors. In a little bit, we'll be writing tests and a deploy script.
          
          ## Wrapping it up
          
          Voila! With that, we've built the basis our own stablecoin that with be pegged to the US dollar, fully decentralized, and powered by exogenous crypto-assets Ethereum and Bitcoin.
          
          Starting a DeFi project such as this raises numerous possibilities in the world of cryptocurrencies and blockchain technologies. The tools and technologies available to developers today, like Solidity and OpenZeppelin, are making it easier than ever to get started in this exciting field. So whether you are a beginner or a pro-developer, the landscape of stablecoins offers an intriguing opportunity for everyone.
          
          Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 139d8d5e-5fa9-4982-b591-6e4bd3f67fc5
        title: "Project setup - DSCEngine "
        slug: defi-dscengine-setup
        duration: 11
        video_url: "izZ00tZEeLxITGGzJQVniTa00oDOvKhUc00D0001MZHeYMYA"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/5-defi-dscengine-setup/+page.md"
        description: |-
                    Learn about setting up the DSCEngine project in DeFi, including configuration, development practices, and key components of the engine.
        markdown_content: |-
          ---
          title: DSCEngine.sol Setup
          ---
          
          _Follow along the course with this video._
          
          
          
          # Building a Decentralized Stablecoin Engine
          
          Building a stablecoin engine is not for the faint-hearted. But with the right tools and a dash of code fluency, you too can do it. If you're at this stage and feel a sense of achievement, clap yourself on the back! Alternatively, pause this and try your hand at crafting your own tests and deploy scripts. But don't get too comfortable just yet; we're only getting started.
          
          We'll approach this project a bit differently from the ones people are used to. We won't shy away from doing some tests along the way to ensure we're on the right course. Let's get right into it and create an engine for our decentralized stablecoin (DSC) system.
          
          ### Creating the DSC Engine
          
          Start by creating a new file `DSCEngine.sol`. This will serve as our centralized stablecoin engine. Now, launch right into building the engine.
          
          Next, copy and paste this beginning part into the engine to lay the groundwork for our contract. We have our SPDX statement, layout of contracts, pragma solidity etc:
          
          ```javascript
          // Layout of Contract:
          // version
          // imports
          // errors
          // interfaces, libraries, contracts
          // Type declarations
          // State variables
          // Events
          // Modifiers
          // Functions
          
          // Layout of Functions:
          // constructor
          // receive function (if exists)
          // fallback function (if exists)
          // external
          // public
          // internal
          // private
          // internal & private view & pure functions
          // external & public view & pure functions
          
          //SPDX-License-Identifier: MIT
          
          pragma solidity ^0.8.18;
          
          contract DSCEngine{
              //engine body
          }
          ```
          
          Let's not forget to include a lot of Nat spec to our contract body. More detailed information in our code makes it easier for people to understand - think of it as making notations in a book that hundreds of people will read.
          
          ```javascript
          /*
           * @title DSCEngine
           * @author Patrick Collins
           *
           * The system is designed to be as minimal as possible, and have the tokens maintain a 1 token == $1 peg at all times.
           * This is a stablecoin with the properties:
           * - Exogenously Collateralized
           * - Dollar Pegged
           * - Algorithmically Stable
           *
           * It is similar to DAI if DAI had no governance, no fees, and was backed by only WETH and WBTC.
           *
           * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
           * for minting and redeeming DSC, as well as depositing and withdrawing collateral.
           * @notice This contract is based on the MakerDAO DSS system
           */
          ```
          
          <img src="/foundry-defi/5-defi-dscengine-setup/defi-dscengine-setup1.PNG" style="width: 100%; height: auto;">
          
          The DSC system's role is to retain tokens at a one token-equals-$1 peg. It bears similar features to DAI in terms of being a stablecoin. Still, it operates without governance, fees, and runs only on wrapped ETH and wrapped Bitcoin.
          
          ### Core Functions of the DSC Engine
          
          With our contract body in place, it's time to think about the core functions of our project. What actions should our system facilitate?
          
          Firstly, our system should be able to deposit collateral and mint DSC tokens. This action allows users to deposit either their DAI or Bitcoin to generate our stablecoin.
          
          Secondly, the system should also facilitate the redemption of collateral or DSC. Once users have finished using our stablecoin, they should be able to exchange it back for the collateral they used initially.
          
          Another critical function is the ability to burn DSC. This functionality matters when a user fears having too much stablecoin and very little collateral. It provides a quick way to get more collateral than DSC, thus maintaining the balance within the system. Accordingly, our DSC system should always have more collateral than DSC.
          
          We also need a liquidation function. Its importance comes into play when the price of a user's collateral falls too much. For example, if a user deposits collateral worth $100 and uses it to mint $50 worth of DSC, if the ETH price drops to $40, the collateral is less than DSC - a scenario we mustn't let happen. In such a case, the user should be liquidated and knocked off the system.
          
          The fifth core function is the `healthFactor`. This external view function, `getHealthFactor`, allows us to see how healthy a particular user's portfolio is.
          
          Lastly, we will need functions for `depositCollateral`, `redeemCollateral`, and `mintDSC`.
          
          ```javascript
              // Functions we'll need
              function depositCollateralAndMintDSC() external {};
              function depositCollateral() external {};
              function redeemCollateralForDSC() external {};
              function redeemCollateral() external {};
              function mintDSC() external {};
              function burnDSC() external {};
              function liquidate() external {};
              function getHealthFactor() external view {};
          ```
          
          ### Testing as You Build
          
          Testing as we go on ensures that we're on the right track. Consider writing tests describing what each function should do to the system.
          
          In conclusion, we've successfully begun constructing the engine for the Decentralized Stablecoin (DSC) system. It might feel overwhelming, but with diligence, testing, and code readability, we're off to a good start.
          
          We'll be looking at tests and a deploy script next as well as additionial functions to improve our DSC System.
          
          <img src="/foundry-defi/5-defi-dscengine-setup/defi-dscengine-setup2.PNG" style="width: 100%; height: auto;">
          
          Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 430a6668-1bb7-4b24-8593-7df423fe2681
        title: "Create the deposit collateral function"
        slug: defi-deposit-collateral
        duration: 19
        video_url: "fshZYe6Vybmnc3de2tjSdG2Irk02TmUy5qecG8dl01K48"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/6-defi-deposit-collateral/+page.md"
        description: |-
                    This lesson covers the process of creating a function to deposit collateral in a DeFi project, highlighting key aspects of its implementation.
        markdown_content: |-
          ---
          title: Deposit Collateral
          ---
          
          _Follow along the course with this video._
          
          
          
          # The Easiest Way to Learn Blockchain: Start with Depositing
          
          In this section, I'm going to dive into the one place it's easiest to start when creating a blockchain protocol: Depositing collateral. After all, that's likely the first thing users will do with this protocol.
          
          ## Depositing Collateral
          
          To start, we'll need code that allows users to deposit their collateral. Something like:
          
          ```js
          function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external {...}
          ```
          
          From here, we have a good starting point for explaining what's likely to happen in this function.
          
          Let's add a Natspec (Natural Specification) comment to help clarify what’s happening in the code.
          
          ```js
          /*
           * @param tokenCollateralAddress: The address of the token to be deposited as collateral.
           * @param amountCollateral: The amount of collateral to deposit.
           */
          ```
          
          ## Code Sanitization
          
          We'll want a way to ensure amountCollateral is more than zero, in order to prevent potential issues down the line with zero-valued transactions.
          
          To do this, we can create a **modifier** called `moreThanZero`. Remember to reference our contract layout if you forget where things should go:
          
          ```js
          // Layout of Contract:
          // Version
          // Imports
          // Errors
          // Interfaces, Libraries, Contracts
          // Type Declarations
          // State Variables
          // Events
          // Modifiers
          // Functions
          ```
          
          Our modifier should look something like this:
          
          ```js
          modifier moreThanZero(uint256 amount) {
              if (amount == 0) {
                  revert DSCEngine__NeedsMoreThanZero();
              }
              _;
          }
          ```
          
          _Modifiers_ are used to change the behavior of functions in a declarative way. In this case, using a modifier for `moreThanZero` will allow its reuse throughout the functions.
          
          ```js
          function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) {...}
          ```
          
          If the amount deposited is zero, the function will revert and cancel the transaction, saving potential errors or wasted transactions.
          
          ## Allow and Deny Tokens
          
          Another thing we'll need is a restriction on what tokens can be used as collateral. So let's create a new modifier called `isAllowedToken`.
          
          ```js
          modifier isAllowedToken(address token) {
              if (tokenNotallowed){...};
          }
          ```
          
          Currently we have no 'token allow list', so we're going to handle this with a state mapping of addresses to addresses, which we provide in our contract's constructor. We know as well that our 'DSCEngine is going to need the `burn` and `mint` functions of our DSC contract, so we'll provide that address here as well:
          
          ```js
          contract DSCEngine {
              error DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
              ...
              DecentralizedStableCoin private i_dsc;
              mapping(address collateralToken => address priceFeed) private s_priceFeeds;
              ...
              constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress){
                  if (tokenAddresses.length != priceFeedAddresses.length) {
                      revert DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
                  }
                  // These feeds will be the USD pairs
                  // For example ETH / USD or MKR / USD
                  for (uint256 i = 0; i < tokenAddresses.length; i++) {
                      s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
                      s_collateralTokens.push(tokenAddresses[i]);
                  }
                  i_dsc = DecentralizedStableCoin(dscAddress);
              }
          }
          ```
          
          Finally, after all this prep, we can return to our modifier to complete it:
          
          ```js
          modifier isAllowedToken(address token){
              if (s_priceFeeds[token] == address(0)){
                  revert DSCEngine__NotAllowedToken();
              }
              _;
          }
          ```
          
          Here, function calls with this modifier will only be valid if the inputted token address is on an allowed list.
          
          ## Saving User Collateral Deposits
          
          Finally, we get to the heart of the deposit collateral function.
          
          We need a way to save the user's deposited collateral. This is where we come to ‘_state variables_’:
          
          ```js
          mapping(address user => mapping(address collateralToken => uint256 amount)) private s_collateralDeposited;;
          ```
          
          This is a mapping within a mapping. It connects the user's balance to a mapping of tokens, which maps to the amount of each token they have.
          
          With this, we have developed a good foundation for our deposit collateral function.
          
          ## Safety Precautions
          
          Even though we've added quite a bit already, there's still more that can be done to ensure this function is as safe as possible. One way is by adding the `nonReentrant` modifier, which guards against the most common attacks in all of Web3.
          
          ```js
          import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
          ...
              function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) external moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant {
                  s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
                  emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
                  bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
                  if (!success) {
                      revert DSCEngine__TransferFailed();
                  }
          }
          ```
          
          ## Wrapping It Up
          
          In conclusion, through this section, we have built an efficient deposit collateral function.
          
          All the checks, such as ensuring the deposit is more than zero and the token is allowed, are done effectively. The state updates with the deposited collateral. Any interactions externally are safe from reentrancy attacks, ensuring a secure environment for our deposit function.
          
          As seen above, to end the function, the function will emit a `CollateralDeposited` event.
          
          ```js
          emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
          ```
          
          This will give us more information about when and where the deposit function is called, which aids in debugging and development of the blockchain.
          
          Remember, learning about the functioning of blockchain can be a bit intimidating. But by breaking down the different steps and understanding each process, you'll begin to see it's not as complicated as it may first seem. Happy coding!
          
          <img src="/foundry-defi/6-defi-deposit-collateral/defi-deposit-collateral1.PNG" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 3ce5a367-ce44-43f8-93e7-8a0028a5d16d
        title: "Creating the mint function"
        slug: defi-mint-dsc
        duration: 17
        video_url: "X9OZfWnvmX5QpA8Ks8IQnbTNbuN4IocMCGu9A00Q7S8I"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/7-defi-mint-dsc/+page.md"
        description: |-
                    Explore the intricacies of creating a mint function in DeFi, focusing on its role, functionality, and integration within the DeFi ecosystem.
        markdown_content: |-
          ---
          title: Mint DSC
          ---
          
          _Follow along the course with this video._
          
          
          
          # Building a Mechanism for Minting Decentralized StableCoin
          
          In our exciting journey to developing a decentralized finance system, we have reached the point where we are now able to deposit collateral into our system. Now that we have successfully done this, the next logical step is for us to develop a function for minting our Decentralized StableCoin (DSC).
          
          The minting function, by its nature, is substantially more complex than the deposit feature. It involves, among other things, checking if the collateral value is greater than the amount of DSC to be minted. This function must also take into consideration price feeds and other essential checks. Therefore, its implementation will be our primary focus in this lesson.
          
          ## Creating the Mint DSC Function
          
          We start by creating the `mintDsc` function, which accepts as its parameter a unsigned integer256, `amountDscToMint`. The parameter allows users to specify the amount of DSC they want to mint.
          
          Let's look at an illustrative scenario: A user deposits $200 worth of ETH as collateral. They may however only want to mint $20 worth of DSC. In this case, they can specify so using the `amountDSCtoMint` parameter.
          
          ```javascript
          function mintDsc(unint256 amountDscToMint){}
          ```
          
          Now we add checks to validate the functionality. It becomes mandatory to ensure that the users mint an amount greater than zero. Also, the function should be non-reentrant to ensure security and maintain control of function calls against the recursion, although in this case, non-reentrancy might not be strictly necessary as it's our DSC token. Don't forget NatSpec!
          
          ```javascript
              /*
               * @param amountDscToMint: The amount of DSC you want to mint
               * You can only mint DSC if you hav enough collateral
               */
              function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {}
          ```
          
          ## Keeping Track of the Minted DSC
          
          The minting process corresponds to creating debt within our system. Therefore, we will require to keep track of each user's minted DSC.
          
          A suitable way of achieving this is by creating a state variable to map an `address user` to the `uint256 amountDSCMinted`. This can be achieved as follows:
          
          ```javascript
          mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
          ```
          
          Our newly created mapping, `s_DSCMinted`, will ensure we keep track of all the minted DSC. If, for instance, a user tries to mint more DSC than their deposited collateral can cover, our function should instantly revert. We will ensure this via a separate internal function named `revertIfHealthFactorIsBroken` that takes user as the input parameter.
          
          ## Addressing the Health Factor &amp; Account Information
          
          This is where it gets a bit windy. The health factor is a term borrowed from the Aave documentation, which calculates how close to liquidation a user is. We can determine the ratio of collateral to DSC minted using a function called `getAccountInformation`.
          
          ```javascript
              function _getAccountInformation(address user)
                  private
                  view
                  returns (uint256 totalDscMinted, uint256 collateralValueInUsd)
              {
                  totalDscMinted = s_DSCMinted[user];
                  collateralValueInUsd = getAccountCollateralValue(user);
              }
          ```
          
          To check the health factor, we need to ensure the user's collateral value is greater than the DSC minted in USD. Consequently, we need yet another function, `getAccountCollateralValue`, to evaluate the collateral's total value.
          
          ```javascript
              function getAccountCollateralValue(address user) public view returns (uint256 totalCollateralValueInUsd) {
                  for (uint256 index = 0; index < s_collateralTokens.length; index++) {
                      address token = s_collateralTokens[index];
                      uint256 amount = s_collateralDeposited[user][token];
                      totalCollateralValueInUsd += _getUsdValue(token, amount);
                  }
                  return totalCollateralValueInUsd;
              }
          ```
          
          The `getAccountInformation` and `getAccountCollateralValue` functions are quite straightforward, but the real challenge is evaluating the USD value.
          
          ## Evaluating the USD Value
          
          To get the USD value, we loop through each collateral token, fetch the corresponding deposited amount, and map it to its price in USD. Simple enough, right? This is accomplished by this `for loop`:
          
          ```javascript
              for (uint256 index = 0; index < s_collateralTokens.length; index++) {
                          address token = s_collateralTokens[index];
                          uint256 amount = s_collateralDeposited[user][token];
                          totalCollateralValueInUsd += _getUsdValue(token, amount);
                      }
          ```
          
          Finally, we need a way to get each token's value in USD to be added to the account's total collateral. How do we do that? You guessed it, another function `_getUsdValue`. We'll be leveraging Chainlink price feeds for our purposes.
          
          ```javascript
              function _getUsdValue(address token, uint256 amount) private view returns (uint256) {
                  AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
                  (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
                  // 1 ETH = 1000 USD
                  // The returned value from Chainlink will be 1000 * 1e8
                  // Most USD pairs have 8 decimals, so we will just pretend they all do
                  // We want to have everything in terms of WEI, so we add 10 zeros at the end
                  return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
              }
          ```
          
          ## Wrapping Up
          
          Wow, we've learnt a lot! This section was dense and complex, so don't hesitate to go back over what we've done here and really commit to understanding the workflow. In the next part we'll be learning about an account's `Health Factor` and how we use it grade a user's account health and available collateral.
          
          <img src="/foundry-defi/7-defi-mint-dsc/defi-mint-dsc1.PNG" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: e759be52-1320-4d27-b21f-5c6bb152c3b9
        title: "Creating and retrieving the health factor"
        slug: defi-health-factor
        duration: 7
        video_url: "7QlM6ZByORvzs5noZhWKubct9KiE59302k4JBQbiU1fc"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/8-defi-health-factor/+page.md"
        description: |-
                    Delve into the concept of 'Health Factor' in DeFi protocols, its calculation, significance, and impact on the stability and risk management of DeFi projects.
        markdown_content: |-
          ---
          title: Health Factor
          ---
          
          _Follow along the course with this video._
          
          
          
          # Upgrading the Health Factor Function of a DeFi Platform
          
          In our previous discussions, we have looked at creating and integrating various parts needed for a _Decentralized Finance (DeFi)_ platform. Now, it's time to take a deeper dive into one of its critical components – the _Health Factor_.
          
          So, let's get started!
          
          ![](https://cdn.videotap.com/7XaXzANzYumN0wCD3MU5-19.89.png)
          
          ## Working with The Health Factor
          
          The health factor function presented a challenge as it was initially designed not to accomplish anything. However, we can now modify it as we have successfully integrated the Health Factor into our system. Here's what it should look like:
          
          ```
          function updateHealthFactor() public {// function body}
          ```
          
          Now that we have the _collateral value in USD_ and the _total USD minted_, our health factor can be retrieved by dividing the collateral value by the total amount minted. This would likely look something like this:
          
          ```javascript
          return collateralValueInUSD / totalUSDMinted;
          ```
          
          ...if we didn't wan't to remain overcollateralized.
          
          ## Understanding Overcollateralization
          
          It is important to understand that we need to always maintain an overcollateralized state. The reason being, if the collateral value falls below 100, then our system becomes compromised. To prevent this, we should set a threshold.
          
          This leads us to introduce the _liquidation threshold_, which can be created at the top. We add:
          
          ```javascript
          uint256 private constant LIQUIDATION_THRESHOLD = 50; //200% overcollateralized
          ```
          
          This means for your collateral to be safe, it needs to maintain 200% overcollateralization.
          
          <img src="/foundry-defi/8-defi-health-factor/defi-health-factor1.PNG" style="width: 100%; height: auto;">
          
          To get our health factor, we will not directly divide the collateral value and the total amount minted. Solidity does not handle decimals, so dividing small amounts may return just 1, eliminating our desired precision.
          
          ## Handling Precision
          
          To ensure precision in the calculations, we need to adjust the collateral given the threshold.
          
          ```javascript
          uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
          ```
          
          Here, the constant `liquidationThreshold` multiplies our collateral value, making our value bigger, hence the need to divide by 100 to ensure no floating numbers.
          
          ## The Math Explained
          
          At this point, the math may seem a bit tricky. Let’s illustrate this with two examples:
          
          1. If we have $1,000 worth of ETH and 100 DSC, the math would go as such:
          
          ```javascript
          1000 (collateral in ETH) * 50 (liquidation threshold), divided by100 (liquidation precision) = 500 (collateralAdjustedForThreshold)
          ```
          
          2. For $150 worth of ETH and $100 minted DSC:
          
          ```javascript
          150 (collateral in ETH) * 50 (liquidation threshold), divided by100 (liquidation precision) = 75 (collateralAdjustedForThreshold)
          ```
          
          To find the correct health factor, let's divide the `collateralAdjustedForThreshold` by the `totalDscMinted`.
          
          ```javascript
              function _healthFactor(address user) private view returns (uint256) {
                  (uint256 totalDscMinted, uint256 collateralValueInUsd) = _getAccountInformation(user);
                  return _calculateHealthFactor(totalDscMinted, collateralValueInUsd);
              }
          
              function _calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
                  internal
                  pure
                  returns (uint256)
              {
                  if (totalDscMinted == 0) return type(uint256).max;
                  uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
                  return (collateralAdjustedForThreshold * 1e18) / totalDscMinted;
              }
          ```
          
          ## Rounding Up
          
          Once we sector in the health factor, we can now successfully execute the function `revertIfHealthFactorIsBroken` in our `mintDsc` function.
          
          ```javascript
              function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {
                  s_DSCMinted[msg.sender] += amountDscToMint;
                  revertIfHealthFactorIsBroken(msg.sender);
                  bool minted = i_dsc.mint(msg.sender, amountDscToMint);
          
                  if (minted != true) {
                      revert DSCEngine__MintFailed();
                  }
              }
          ```
          
          With `MIN_HEALTH_FACTOR` being defined as 1:
          
          ```javascript
              function revertIfHealthFactorIsBroken(address user) internal view {
                  uint256 userHealthFactor = _healthFactor(user);
                  if (userHealthFactor < MIN_HEALTH_FACTOR) {
                      revert DSCEngine__BreaksHealthFactor(userHealthFactor);
                  }
              }
          ```
          
          If the User's health factor is less than the minimum health factor, the function will revert, preventing any issues with the health factor.
          
          This is a lot of math, but hopefully, it gives you a glimpse into the complexity of designing a robust DeFi platform. If any part of this discussion was unclear, please do not hesitate to reach out in the comments or run it with your AI to ensure it makes sense.
          
          ## That's a wrap!
          
          And there we go! We've successfully upgraded our health factor function, ensuring absolute clarity and precision in the numbers. Remember, success in DeFi comes down to robust code and a precise understanding of the algorithms backing it up. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 58cb46b8-ad9f-4236-9074-26baa608d5a6
        title: "Finish the mint function"
        slug: defi-wrap-mint-function
        duration: 2
        video_url: "rKFynz9orcOh8sS6YN00sAPKxgsu4s2brQ1009wF2MplY"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/9-defi-minting-the-dsc/+page.md"
        description: |-
                    Complete the development of the mint function in DeFi, focusing on optimizing functionality, ensuring security, and integrating with the overall system.
        markdown_content: |-
          ---
          title: Minting the DSC
          ---
          
          _Follow along the course with this video._
          
          
          
          # New Fascinating Additions to the Mint DSC - Creating a Healthier User Experience
          
          Let's dive right into the heart of the matter. We last left off exploring the updates on Mint DSC. Previously, we discussed the intricacies of the code and delved into how the DSC mint function operates within this codebase. In this post, we are going to understand this process in depth, throw light on the health factor, and discuss the possibility of self-liquidation by users. We will also guide you on how to prevent users from minting DSC that might break the health factor.
          
          ## Adding More Mint DSC
          
          <img src="/foundry-defi/9-defi-minting-the-dsc/defi-minting-the-dsc1.png" style="width: 100%; height: auto;">
          
          Notably, if any addition to this DSC causes a break in the health factor, we should retreat immediately. Why should we back off? Because it's not a very user-friendly experience. It could lead to users causing themselves to get liquidated. Technically, we could go forward and let users carry out the act. However, it would not reflect well on overall user experience. Consequently, it's crucial that we prevent any user from minting DSC that could potentiate the health factor break.
          
          ## DSC Mint Function - The Owner's Prerogative
          
          The intricacies of the DSC Minting function deserves close scrutiny. Interesting to note, that the DSC has a `mint function` that can be invoked solely by its owner. The owner of this function, in this case, is the DSC engine.
          
          Observe the following code block from `DecentralizedStableCoin.sol`:
          
          ```javascript
            function mint(address _to, uint256 _amount) external onlyOwner returns (bool) {
                  if (_to == address(0)) {
                      revert DecentralizedStableCoin__NotZeroAddress();
                  }
                  if (_amount <= 0) {
                      revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
                  }
                  _mint(_to, _amount);
                  return true;
              }
          ```
          
          Through the above code, we notice that it returns a boolean. This boolean value enables us to understand if the minting was successful or not.
          
          This function accepts two arguments - `address _to` and `uint256 _amount`. The `address _to` parameter is going to be assigned to the message sender and the `_amount` parameter will represent the amount of DSC being minted.
          
          ## Error Checks in the Minting Process
          
          So what happens when the minting process fails? This possibility is taken care of in the following code snippet:
          
          ```javascript
            function mintDsc(uint256 amountDscToMint) public moreThanZero(amountDscToMint) nonReentrant {
                  s_DSCMinted[msg.sender] += amountDscToMint;
                  revertIfHealthFactorIsBroken(msg.sender);
                  bool minted = i_dsc.mint(msg.sender, amountDscToMint);
          
                  if (minted != true) {
                      revert DSCEngine__MintFailed();
                  }
              }
          ```
          
          If the minting is not successful, signified by boolean value "false", the function reverts to an error. A new error title `DSCEngine__MintFailed()` is specified. Remember to create this error at the top of your script.
          
          If the minting process fails, the function reverts to the error of `DSCEngine__MintFailed()`.
          
          Remember:
          
          <img src="/foundry-defi/9-defi-minting-the-dsc/defi-minting-the-dsc2.PNG" style="width: 100%; height: auto;">
          
          In conclusion, we have taken significant strides in enhancing the DSC and its related functions. These updates not only promote a healthier user experience but also prevent undesired system behaviors such as self-liquidation.
          
          Dive into the code, brush up your knowledge, and let's continue exploring the ever-evolving world of coding together!
          
      -
        type: new_lesson
        enabled: true
        id: 69e2f5d9-446d-4996-873d-4d81dc757843
        title: "Creating the deployment script"
        slug: defi-deploy-script
        duration: 15
        video_url: "z01JK10202V4802ShIJrCiGNorPfyn6wZ2FRyIpthlmOp9o"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/10-defi-deploy-script/+page.md"
        description: |-
                    Learn the process of creating a deploy script for DeFi projects, including setup, configuration, and deploying smart contracts to the blockchain.
        markdown_content: |-
          ---
          title: Deploy Script
          ---
          
          _Follow along the course with this video._
          
          
          
          # Testing and Deployment
          
          We've done a lot, so far and it's getting really complex. Now's a great time to perform a sanity check and write some tests.
          
          ## 1. The Importance of Testing
          
          _I have no idea if what I'm doing makes any sort of sense. I want to make sure I write some tests here._
          
          Testing is crucial to ensure that our code is functioning as intended. We can go ahead and create a new folder under 'test' named 'unit'. If you wish, you could skip writing the scripts and deploy in your unit tests. In our scenario, we'll have our unit tests also serve as our integration tests.
          
          ## 2. Deploying DSC
          
          To set the ball rolling, let's write a script to deploy our DSC. Here is a snippet of how this might look:
          
          ```javascript
          // SPDX-License-Identifier: MIT
          pragma solidity 0.8.18;
          
          contract DeployDSC is Script {
              function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig){
                  //Code here
                  }
              }
          ```
          
          The `run` function is going to return a few things such as the DSC and the DSCEngine. To import our DSC, we're going to use the following line of code:
          
          ```javascript
          import { DecentralizedStableCoin } from "../src/DecentralizedStableCoin.sol";
          ```
          
          Your `run()` function may look something like this:
          
          ```javascript
              function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig) {
                  HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
          
                  (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) =
                      helperConfig.activeNetworkConfig();
                  tokenAddresses = [weth, wbtc];
                  priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];
          
                  vm.startBroadcast(deployerKey);
                  DecentralizedStableCoin dsc = new DecentralizedStableCoin();
                  DSCEngine dscEngine = new DSCEngine(
                      tokenAddresses,
                      priceFeedAddresses,
                      address(dsc)
                  );
          ```
          
          The DSCEngine plays a critical role in our contract. However, deploying it involves a lot of parameters, making the task a bit complicated. It takes parameters such as `tokenAddresses`, `priceFeedAddresses`, and the DSC address.
          
          The question then arises, where do we get these addresses from ?
          
          Here, a HelperConfig saves the day.
          
          ## 4. HelperConfig
          
          The HelperConfig will provide us with the addresses needed by the DSCEngine.
          
          Here is a little sneak-peek into the helper config file:
          
          ```javascript
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";
          import {Script} from "forge-std/Script.sol";
          import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
          
          contract HelperConfig is Script {
              NetworkConfig public activeNetworkConfig;
          
              uint8 public constant DECIMALS = 8;
              int256 public constant ETH_USD_PRICE = 2000e8;
              int256 public constant BTC_USD_PRICE = 1000e8;
          
              struct NetworkConfig {
                  address wethUsdPriceFeed;
                  address wbtcUsdPriceFeed;
                  address weth;
                  address wbtc;
                  uint256 deployerKey;
              }
          
              uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
          
              constructor() {
                  if (block.chainid == 11155111) {
                      activeNetworkConfig = getSepoliaEthConfig();
                  } else {
                      activeNetworkConfig = getOrCreateAnvilEthConfig();
                  }
              }
          ```
          
          The `getSepoliaEthConfig` function returns the network configuration for Sepolia:
          
          ```javascript
          function getSepoliaEthConfig() public view returns (NetworkConfig memory sepoliaNetworkConfig) {
                  sepoliaNetworkConfig = NetworkConfig({
                      wethUsdPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306, // ETH / USD
                      wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
                      weth: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81,
                      wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
                      deployerKey: vm.envUint("PRIVATE_KEY")
                  });
              }
          ```
          
          The `getOrCreateAnvilEthConfig` function either returns the existing anvil configuration or creates a new one.
          
          ```javascript
          function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory anvilNetworkConfig) {
                  // Check to see if we set an active network config
                  if (activeNetworkConfig.wethUsdPriceFeed != address(0)) {
                      return activeNetworkConfig;
                  }
          
                  vm.startBroadcast();
                  MockV3Aggregator ethUsdPriceFeed = new MockV3Aggregator(
                      DECIMALS,
                      ETH_USD_PRICE
                  );
                  ERC20Mock wethMock = new ERC20Mock("WETH", "WETH", msg.sender, 1000e8);
          
                  MockV3Aggregator btcUsdPriceFeed = new MockV3Aggregator(
                      DECIMALS,
                      BTC_USD_PRICE
                  );
                  ERC20Mock wbtcMock = new ERC20Mock("WBTC", "WBTC", msg.sender, 1000e8);
                  vm.stopBroadcast();
          
                  anvilNetworkConfig = NetworkConfig({
                      wethUsdPriceFeed: address(ethUsdPriceFeed), // ETH / USD
                      weth: address(wethMock),
                      wbtcUsdPriceFeed: address(btcUsdPriceFeed),
                      wbtc: address(wbtcMock),
                      deployerKey: DEFAULT_ANVIL_PRIVATE_KEY
                  });
              }
          ```
          
          ## 5. Final Steps
          
          We're almost there. Having obtained the needed addresses from our HelperConfig, we can now return to our DeployDSC script. We can import HelperConfig like so:
          
          ```javascript
          import { HelperConfig } from "./HelperConfig.s.sol";
          ```
          
          Once imported, if we look back to our run function, we can see we pull the addresses from the `activeNetworkConfiguration` of our HelperConfig and then create the arrays for token addresses and price feeds.
          
          ```javascript
              function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig) {
                  HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
          
                  (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) =
                      helperConfig.activeNetworkConfig();
                  tokenAddresses = [weth, wbtc];
                  priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];
          
                  vm.startBroadcast(deployerKey);
                  DecentralizedStableCoin dsc = new DecentralizedStableCoin();
                  DSCEngine dscEngine = new DSCEngine(
                      tokenAddresses,
                      priceFeedAddresses,
                      address(dsc)
                  );
                  dsc.transferOwnership(address(dscEngine));
                  vm.stopBroadcast();
                  return (dsc, dscEngine, helperConfig);
          ```
          
          With our arrays in place, we're ready to deploy our DSCEngine. Our last step involves transferring ownership of the deployed contract to the DSCEngine, in this line:
          
          ```javascript
          dsc.transferOwnership(address(engine));
          ```
          
          Only the engine can now interact with the DSC.
          
          ## 6. Conclusion
          
          Wow, we've covered a lot and we have so much more to go. In this section we set up a HelperConfig to assist us with assigning network and token addresses. We also wrote a deployment script which uses that HelperConfig to deploy our contract AND we assign ownership of that contract to our DSCEngine. Whew, take a break - you've earned it!
          
      -
        type: new_lesson
        enabled: true
        id: 1e420664-a74f-4b4c-b057-af62356da282
        title: "Test the DSCEngine smart contract"
        slug: test-defi-protocol
        duration: 12
        video_url: "28W2LRJrFV1aKxYFHqr7UlxsTPV01pesWOdHVu3zWQtg"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/11-defi-tests/+page.md"
        description: |-
                    Understand the process and importance of testing DSCEngine smart contracts in DeFi, including methodologies, best practices, and common test scenarios.
        markdown_content: |-
          ---
          title: Tests
          ---
          
          _Follow along the course with this video._
          
          
          
          # Developing Unit Tests for Smart Contracts using Deploy Scripts
          
          Hello, developers! In the process of writing our smart contracts, it's incredibly crucial that we have a comprehensive testing suite. Recently, I came across a method that could potentially streamline your testing process. By incorporating the use of deploy scripts into the creation of our unit tests, we can test as we write our code, thereby making the entire development process much smoother. Intrigued yet? Let's dive right in!
          
          ## Starting with Preliminaries: DSCEngine Test
          
          Before we can begin testing, let's first establish why we are doing this in the first place. If you recall, our DSCEngine has a series of functions that we must validate. Functions such as `getUsdValue`, `getAccountCollateralValue` are crucial to check. Moreover, we also need to ensure that Minting, the constructor, and depositing work effectively.
          
          As we embark on testing these functions, we will concurrently write tests and deploy scripts to ensure that glaring mistakes are spotted immediately—ideally reducing the need to refactor or rewrite code. The biggest advantage here is that an improved confidence in the correctness of your code can directly speed up your coding process.
          
          We'll start by setting up the `DSCEngineTest.t.sol` contract.
          
          ```javascript
          //SPDX-License-Identifier: MIT
          pragma solidity 0.8.18;
          import {Test} from "forge-std/Test.sol";
          
          
          Contract DSCEngineTest is Test {
          
          }
          ```
          
          In the function `setUp`, we'll need to deploy our contract. We do this by importing `DeployDSC` from the `DeployDSC.s.sol` file and then creating a new instance of `DeployDSC` called `deployer`. On top of that, we'll also need to import the `DecentralizedStableCoin` and `DSCEngine` contracts from their respective solidity files.
          
          ```javascript
          //SPDX-License-Identifier: MIT
          pragma solidity 0.8.18;
          import {Test} from "forge-std/Test.sol";
          import {DeployDSC} from "../../script/DeployDSC.s.sol";
          import {DSCEngine} from "../../src/DSCEngine.sol";
          import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
          import {HelperConfig} from "../../script/HelperConfig.s.sol";
          
          
          Contract DSCEngineTest is Test {
              DeployDSC deployer;
              DecentralizedStableCoin dsc;
              DSCEngine dsce;
              HelperConfig config;
          
              function setUp() public {
                  deployer = new DeployDSC();
                  (dsc, dsce, config) = deployer.run();
              }
          }
          ```
          
          Please note: It is pretty handy to use GitHub copilot or any AI that you prefer to assist in these scenarios.
          
          ## Establishing the First Test: Price Feeds
          
          With our contract now set up, let's move on to creating the first actual test. Here, we want to validate our `getUsdValue` function.
          
          ```javascript
          function testGetUsdValue() public {
              //Test goes here//
          }
          ```
          
          For this particular test, we need to pass a token address and an amount. We can easily fetch these tokens from our `helperConfig`. Also, let's handle the `ethUsdPriceFeed` and `weth` at this stage.
          
          ```javascript
          Contract DSCEngineTest is Test {
              DeployDSC deployer;
              DecentralizedStableCoin dsc;
              DSCEngine dsce;
              HelperConfig config;
              address ethUsdPriceFeed;
              address weth;
          
              ...
          
          }
          
          ```
          
          In the `setUp` function, we'll get the `weth` and `ethUsdPriceFeed` addresses from the HelperConfig, like so:
          
          ```javascript
              (ethUsdPriceFeed,, weth,,) = config.activeNetworkConfig();
          ```
          
          Next, let's calculate the expected USD value assuming that there are 15 ETH, each priced at $2,000. The calculation would be simple: `15ETH * $2000 per ETH = $30,000`. Afterward, we call the `getusdvalue` function on the DSC engine and compare the expected and actual USD amounts. The test function should look something like this:
          
          ```javascript
              function testGetUsdValue() public {
                  uint256 ethAmount = 15e18;
                  // 15e18 ETH * $2000/ETH = $30,000e18
                  uint256 expectedUsd = 30000e18;
                  uint256 usdValue = dsce.getUsdValue(weth, ethAmount);
                  assertEq(usdValue, expectedUsd);
              }
          ```
          
          We can run this test by using the following command in our terminal:
          
          ```bash
          forge test -mt testGetUsdValue
          ```
          
          ...and if everything went smoothly, it should pass! Great work!
          
          The previous section might appear as lots of steps for a single test, but I have found this approach of integrating my deploy scripts into my test suite from the beginning quite helpful. However, depending on your project needs, you may choose to use them as integration tests.
          
          ## Dealing with Depositing Collateral
          
          With our first test written and running fine, let's shift our focus to the next critical function, `depositCollateral`. For this test, we'll imitate a user and deposit collateral. Here, we are taking advantage of the prank functionality to temporarily modify the global state.
          
          ```javascript
              function testRevertsIfCollateralZero() public {
                  vm.startPrank(user);
                  ERC20Mock(weth).approve(address(dsce), amountCollateral);
          
                  vm.expectRevert(DSCEngine.DSCEngine__NeedsMoreThanZero.selector);
                  dsce.depositCollateral(weth, 0);
                  vm.stopPrank();
              }
          ```
          
          Thinking about it, we may want to mint the user some weth. As this could be used in more than one test, it would be efficient to do this right in the setup. Doing this in the setup ensures that it won't have to be performed for every single test. Don't forget to import `ERC20Mock` from OpenZeppelin for this.
          
          Import
          
          ```javascript
          import { ERC20Mock } from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
          ```
          
          setUp
          
          ```javascript
              uint256 amountCollateral = 10 ether;
              uint256 public constant STARTING_USER_BALANCE = 10 ether;
          
              function setUp() external {
                  DeployDSC deployer = new DeployDSC();
                  (dsc, dsce, helperConfig) = deployer.run();
                  (ethUsdPriceFeed, btcUsdPriceFeed, weth, wbtc, deployerKey) = helperConfig.activeNetworkConfig();
          
                  ERC20Mock(weth).mint(user, STARTING_USER_BALANCE);
                  ERC20Mock(wbtc).mint(user, STARTING_USER_BALANCE);
              }
          ```
          
          For now, I am content with these tests. However, eventually, we will likely need a test for collateral being deposited into these data structures. Then again, testing is a continuous process. As you write your code, keep writing tests and _don't stop_. Remember, there isn't an absolute, singular process that works for all, but experimenting and finding what works for you is the key.
          
          I hope you enjoyed this in-depth tutorial on writing unit tests for your smart contracts using deploy scripts. Incorporating these practices can significantly aid you in constructing robust, error-free smart contracts. Experience the difference today! Happy coding!
          
          <img src="/foundry-defi/11-defi-tests/defi-tests1.PNG" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 8a83df4b-a80d-4593-a713-c8bfc26bfb6b
        title: "Create the depositAndMint function"
        slug: defi-deposit-and-mint-function
        duration: 3
        video_url: "4EwEFMZPS01KISCQVCyassnpSvfgycWeBPiUEN4NuVkU"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/12-defi-deposit-and-mint/+page.md"
        description: |-
                    This lesson focuses on developing a combined deposit and mint function in DeFi, emphasizing its efficiency and integration into the DeFi framework.
        markdown_content: |-
          ---
          title: depositCollateralAndMintDSC
          ---
          
          _Follow along the course with this video._
          
          
          
          # Adding Functionality to Our Smart Contract: One-Stop for Depositing Collateral and Minting DSC
          
          Welcome back! As we continue down the road on our smart contract journey, we've now arrived at an important crossroads. To refresh your memory, we've successfully developed a method for depositing collateral and a separate procedure for minting our native token, the DSC.
          
          Our tests here have been exploratory in nature and although we're assuming these functions are operationally sound, we have yet to put them under the microscope of an extensive unit test suite. However, now we're making substantial progress!
          
          ## Where We Are
          
          By now, we've not only created a way to deposit collateral and mint our DSC token, but also we've allowed for substantial access to critical information concerning our financial ecosystem. This is great! Yet, our journey is far from over. Our next step is to merge the deposit and mint mechanisms into a function we anticipate many of our protocol participants will frequently utilize — `depositCollateralAndMintDsc()`.
          
          ### Why this Function?
          
          This function is strategically important for our protocol, primarily because its purpose directly aligns with the key flow of our system: users deposit collateral and mint DSC. It combines both operations in a swift, efficient, and convenient manner. Swift and efficient because it accomplishes both operations in one transaction. Convenient because users are spared the requirement of separately interacting with two operations: `mint` and `depositCollateral`.
          
          Without further ado, let's dive into the implementation of this function.
          
          ### Merging `mint` and `depositCollateral` Functions
          
          ```javascript
              function depositCollateralAndMintDsc(
                  address tokenCollateralAddress,
                  uint256 amountCollateral,
                  uint256 amountDscToMint)
                  external {
          
                  depositCollateral(tokenCollateralAddress, amountCollateral);
                  mintDSC(amountDscToMint);
              }
          ```
          
          Note that we've shifted `depositCollateral()` and `mintDSC()` from being external to public functions, enabling them to be called within our smart contract.
          
          ```javascript
              function depositCollateral(address tokenCollateralAddress, uint256 amountCollateral) public {
                  //implementation
              }
              function mintDSC(uint256 amountDscToMint) public {
                  //implementation
              }
          ```
          
          ### Adding NatSpec
          
          As usual, we'll garnish our function with NatSpec comments to bring more clarity to our code. As we annotate `depositCollateralAndMintDsc()`, GitHub Copilot, the AI code-completion tool, proves to be a great companion.
          
          ```javascript
              /*
               * @param tokenCollateralAddress: The address of the token to be deposited as collateral
               * @param amountCollateral: The amount of collateral to deposit
               * @param amountDscToMint The amount of DecentralizedStableCoin to mint
               * @notice This function will deposit your collateral and mint DSC in one transaction
               */
              function depositCollateralAndMintDSC(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDSCToMint) public {...}
          ```
          
          To paraphrase poet Oliver Holmes, we're staking out the distance between the goal and where we are now. A large chunk of our protocol now focuses on the simultaneous depositing of collateral and minting of our native stablecoin, DSC, all within one user-friendly function. We're making a major stride into simplifying and optimizing the protocol user experience.
          
          <img src="/foundry-defi/12-defi-deposit-and-mint/defi-deposit-and-mint1.PNG" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 5cdf96d4-5a9f-48c4-9394-c33bacea8604
        title: "Create the redeem collateral function"
        slug: defi-how-to-redeem-collateral
        duration: 12
        video_url: "AVCvDHe02NVRIcXwpBnSvoYakCLqXsn4IkPdFz2UEEwU"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/13-defi-redeem-collateral/+page.md"
        description: |-
                    Explore the development of a function for redeeming collateral in DeFi, including its significance, operational process, and impact on users.
        markdown_content: |-
          ---
          title: Redeem Collateral
          ---
          
          _Follow along the course with this video._
          
          
          
          # Deconstructing the 'Redeem Collateral' Function
          
          In this section we're going to be diving deep into our `redeemCollateral` function with a focus on safe and efficient transactions for our users.
          
          ## Creating the 'redeemCollateral' Function
          
          First things first, in order for users to redeem the collateral, they need to have a health factor above one even after their collateral is pulled out. Ensuring this is the operating protocol will maintain the platform's integrity and ensure safe transactions.
          
          ```javascript
          function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){...}
          ```
          
          In our redeem collateral function, we start by allowing the user to select the type of collateral they would like to redeem. The function then checks the balance to ensure that the requested amount is available for withdrawal. It is crucial that there are no zero-amount transactions, as these often signify errors.
          
          To streamline the process, we ensure this function is 'non-reentrant', meaning it can't be recursively called by an external contract, preventing potential attacks and ensuring greater safety. If necessary, these protective measures will be relayed later during a gas audit.
          
          ## Ensuring Consistency
          
          In computing science there's a concept called "DRY: Don't Repeat Yourself". If you find that you are writing the same code repeatedly, it's usually a sign that you need to refactor your code. Thus, while this function may currently be written in a particular style, it could be subject to change in the future to ensure that our code remains efficient and clean.
          
          ## Updating Our Internal Accounting
          
          In order to keep track of the collateral that each individual user has in their account, we use internal accounting. This eliminates the possibility of users withdrawing more collateral than they have in their accounts.
          
          ```javascript
          function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){
              s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
          }
          ```
          
          Digging in, the first part of our function updates our internal accounting, deducting the amount withdrawn from the account. If a user tries to withdraw more than they have, the Solidity compiler will throw an error, which is highly useful for preventing any unnecessary headaches.
          
          ## Issuing Event Updates
          
          Upon updating the state, we will emit an event to reflect the redeeming of collateral, showing the message sender, the amount of collateral, and the token collateral address.
          
          ```javascript
          ...
          event CollateralRedeemed(address indexed user, address indexed token, uint256 indexed amount);
          ...
          function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) external nonReentrant moreThanZero(amountCollateral){
              s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
          
              emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral)
          }
          ```
          
          ## Refactoring the Function
          
          For now, we've written our `redeemCollateral` function to represent a single instance of someone redeeming their collateral. However, in future iterations of this code, we will likely refactor this function to make it more modular and easily applicable in different scenarios.
          
          ## Implementing the CEI Pattern
          
          The Checks-Effects-Interactions (CEI) pattern is key in ensuring a super-safe contract. First, we perform some checks on the state variables; then, we effectuate changes; finally, we interact with other contracts. We adhere to this practice tightly unless we need to check something after a token transfer has taken place. In some of these instances, we might bypass the CEI pattern but always ensure that transactions are reverted if health-factor conditions are not met.
          
          ## Health Factor Maintenance
          
          The health factor (more commonly known as the collateralization ratio) is key to evaluating the risk of a particular loan, so it's vital to ensure that the health factor doesn't break when the collateral is pulled. We've made a function to check this:
          
          ```javascript
              function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral)
              external
              nonReentrant
              moreThanZero(amountCollateral){
              s_collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
          
              emit CollateralRedeemed(msg.sender, tokenCollateralAddress, amountCollateral)
          
              bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, amountCollateral);
              if (!success){
                  revert DSCEngine__TransferFailed();
              }
              _revertIfHealthFactorIsBroken(msg.sender);
              }
          
          ```
          
          Our `redeemCollateral` function comes with a built-in safeguard to prevent the health factor from falling below acceptable levels.
          
          ## The Burn Function
          
          The burning of DSC reflects removing debt from the system and will likely not affect the health factor since the action lowers debt rather than increasing it. Despite this, we ensure to leave room for checks to protect the integrity of the process. The `_burnDsc` function should look something similar to this:
          
          ```js
              function _burnDsc(uint256 amountDscToBurn, address onBehalfOf, address dscFrom) private {
                  s_DSCMinted[onBehalfOf] -= amountDscToBurn;
          
                  bool success = i_dsc.transferFrom(dscFrom, address(this), amountDscToBurn);
                  // This conditional is hypothetically unreachable
                  if (!success) {
                      revert DSCEngine__TransferFailed();
                  }
                  i_dsc.burn(amountDscToBurn);
                  // revertIfHealthFactorIsBroken(msg.sender); - we don't think this is ever going to hit.
              }
          ```
          
          ## Combining Redemption and Burning of DSC
          
          In the current process, a user first has to burn their DSC and then redeem their collateral, causing a two-transaction process. However, for convenience's sake, let's combine these two transactions into one – making the process much more fluid and efficient. We'll do this in our `redeemCollateralForDsc` function:
          
          ```js
              /*
               * @param tokenCollateralAddress: The ERC20 token address of the collateral you're depositing
               * @param amountCollateral: The amount of collateral you're depositing
               * @param amountDscToBurn: The amount of DSC you want to burn
               * @notice This function will withdraw your collateral and burn DSC in one transaction
               */
              function redeemCollateralForDsc(address tokenCollateralAddress, uint256 amountCollateral, uint256 amountDscToBurn)
                  external
                  moreThanZero(amountCollateral)
              {
                  _burnDsc(amountDscToBurn, msg.sender, msg.sender);
                  _redeemCollateral(tokenCollateralAddress, amountCollateral, msg.sender, msg.sender);
                  //redeem collateral already checks health factor
              }
          ```
          
          Don't forget NatSpec!
          
          ## Conclusion
          
          The `redeemCollateral` function, while seemingly complex, is necessary to ensure safe, secure transactions on the blockchain. By walking through each step of the function – from creating it to refactoring it – we offer a comprehensive view of how such a function operates.
          
          While the structure of these functions described here may change slightly in the future, it's crucial to understand the basics: enforce checks, maintain health factors, and avoid redundant code. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: df0ffbd6-b926-4bde-84d6-3977d17ed15d
        title: "Setup liquidations"
        slug: defi-liquidation-setup
        duration: 17
        video_url: "jRJbUl3wMkuJE1w5unH00wtjNd702RW5KWyc4IE51nvlU"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/14-defi-liquidation-setup/+page.md"
        description: |-
                    Dive into setting up liquidations in DeFi protocols, understanding their mechanics, importance, and their role in maintaining financial stability. 
        markdown_content: |-
          ---
          title: Liquidation Setup
          ---
          
          _Follow along the course with this video._
          
          
          
          # Understanding and Implementing De-Fi Liquidation Function
          
          In the world of crypto and blockchain, understanding and executing key concepts such as depositing collateral, minting stablecoins, redeeming collateral, and liquidation is essential. A user can mint our stablecoin by depositing collateral, redeem their collateral for the minted stablecoin, or burn their stablecoin to improve their health factor.
          
          ## Implementing the Liquidation Function
          
          An integral part of the system is the `liquidate()` function. This comes into play when we approach the phase of under-collateralization - we must start liquidating positions to prevent the system from crashing. Here's an example: suppose you have $100 worth of ETH backing $50 worth of DSC, and the price of ETH drops to $20. Now, we have $20 worth of ETH backing $50 worth of DSC, which makes the DSC worth less than a dollar. Hence, to prevent this scenario, positions need to be liquidated and removed from the system if the price of the collateral tanks.
          
          The base of our `liquidate` function, with NatSpec should look like this:
          
          ```js
              /*
              * @param collateral: The ERC20 token address of the collateral you're using to make the protocol solvent again.
              * This is collateral that you're going to take from the user who is insolvent.
              * In return, you have to burn your DSC to pay off their debt, but you don't pay off your own.
              * @param user: The user who is insolvent. They have to have a _healthFactor below MIN_HEALTH_FACTOR
              * @param debtToCover: The amount of DSC you want to burn to cover the user's debt.
              *
              * @notice: You can partially liquidate a user.
              * @notice: You will get a 10% LIQUIDATION_BONUS for taking the users funds.
              * @notice: This function working assumes that the protocol will be roughly 150% overcollateralized in order for this to work.
              * @notice: A known bug would be if the protocol was only 100% collateralized, we wouldn't be able to liquidate anyone.
              * For example, if the price of the collateral plummeted before anyone could be liquidated.
              */
              function liquidate(address collateral, address user, uint256 debtToCover) external moreThanZero nonReentrant {...}
          ```
          
          In cases of nearing under-collateralization, the protocol pays someone to liquidate the positions. This gamified incentive system provides an opportunity for users to earn "free money" by removing other people's positions in the protocol.
          
          ## Bonus for Liquidators
          
          To incentivize the liquidation process, the protocol offers a bonus for the liquidators. For example, upon liquidating $75, the liquidator can claim the whole amount by paying back $50 of DSC, effectively gaining a bonus of $25.
          
          Note that this system works only when the protocol is always over-collateralized. If the price of the collateral plummets before anyone can liquidate, the bonuses would no longer be available to the liquidators.
          
          ## Checking the User's Health Factor
          
          The first thing we have to be sure of when calling the `liquidate` function is, can this user be liquidated? We're going to implement a check which will revert if the user's health factor is OK. Fortunately we already have a function we can use to check (`healthFactor()`)!
          
          ```js
          ...
          error DSCEngine__HealthFactorOk();
          ...
              function liquidate(address collateral, address user, uint256 debtToCover)
                  external
                  moreThanZero(debtToCover)
                  nonReentrant {
                  uint256 startingUserHealthFactor = _healthFactor(user);
                  if (startingUserHealthFactor >= MIN_HEALTH_FACTOR) {
                      revert DSCEngine__HealthFactorOk();
                  }
                  uint256 tokenAmountFromDebtCovered = getTokenAmountFromUsd(collateral, debtToCover);
                  ...
              }
          ```
          
          ```js
              function getTokenAmountFromUsd(address token, uint256 usdAmountInWei) public view returns (uint256) {
                  AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
                  (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
                  // $100e18 USD Debt
                  // 1 ETH = 2000 USD
                  // The returned value from Chainlink will be 2000 * 1e8
                  // Most USD pairs have 8 decimals, so we will just pretend they all do
                  return ((usdAmountInWei * PRECISION) / (uint256(price) * ADDITIONAL_FEED_PRECISION));
              }
          ```
          
          For a precise liquidation process, you need to know exactly how much of a token (say ETH) is equivalent to a particular amount of USD. The above function takes care of this conversion.
          
          ## Liquidating and Multifying the Collateral
          
          In order to incentivize liquidators and ensure the protocol remains over collateralized, the liquidator receives a bonus -- In our model, we've given a 10% bonus.
          
          ```js
          ...
          contract DSCEngine is ReentrancyGuard {
              ...
              uint256 private constant LIQUIDATION_BONUS = 10; // This means you get assets at a 10% discount when liquidating
              ...
              function liquidate(address collateral, address user, uint256 debtToCover)
                  external
                  moreThanZero(debtToCover)
                  nonReentrant
              {
                  ...
                  uint256 bonusCollateral = (tokenAmountFromDebtCovered * LIQUIDATION_BONUS) / 100;
                  uint256 totalCollateralToRedeem = tokenAmountFromDebtCovered + bonusCollateral;
                  ...
              }
              ...
          }
          ```
          
          The liquidator gets a bonus and the total collateral to redeem becomes a sum of the token amount from debt covered and the bonus collateral.
          
          ## Wrapping Up
          
          In conclusion, implementing a liquidation function in a cryptocurrency protocol guarantees its survival and stability in times of under-collateralization. Remember, in a decentralized ecosystem, the health of the system has to be maintained over and above all.
          
          If any part of this post doesn't make sense, don't hesitate to ask in the discussions forum, or Google it. Use the resources that you have to your advantage! In the next part we'll be refactoring and finishing up the `liquidate()` function.
          
      -
        type: new_lesson
        enabled: true
        id: 7376cbd3-3cbd-4335-8d15-56868dfcd8ae
        title: "Refactor liquidations"
        slug: defi-liquidation-refactor
        duration: 13
        video_url: "xZ17uj5HVjUTBbvVYKTgq9vJ4oXp985EUkE2KIGCvmo"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/15-defi-liquidation-refactor/+page.md"
        description: |-
                    This lesson focuses on refining the DeFi protocol by refactoring the 'redeemCollateral()' function. It covers the importance of testing and refactoring for building a reliable DeFi protocol, enhancing security, and improving functionality.
        markdown_content: |-
          ---
          title: Liquidation Refactor
          ---
          
          _Follow along the course with this video._
          
          
          
          # Creating a Robust DeFi Protocol
          
          Hello everyone and welcome back! In this section, we will discuss the importance of thorough testing and regular refactoring to build a robust and reliable decentralized finance (DeFi) protocol, we will also illustrate how code modifications can improve protocol functionality.
          
          ## Refining a DeFi protocol
          
          Let's talk about the `redeemCollateral()` function in our DeFi protocol. Currently, it's a public function and takes token collateral address and amount collateral as inputs. It's hardcoded to the message sender, which works perfectly if the token collateral, address, and amount collateral belong to the person calling the function. However, it fails when we need to redeem someone else's collateral, as in the case of a third-party user with bad debt.
          
          <img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor1.PNG" style="width: 100%; height: auto;">
          
          With our DeFi protocol, we need to enhance this feature by augmenting our code. Thankfully, code modification can resolve this.
          
          ### Internal redeem collateral function
          
          <img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor2.PNG" style="width: 100%; height: auto;">
          
          Refactoring the code lets us create an internal `_redeemCollateral()` function to redeem collateral from anyone. Creating an internal function makes it accessible only by other functions within the contract, therefore enhancing the protocol's security by preventing unauthorized usage.
          
          ```js
          function _redeemCollateral (address tokenCollateralAddress, uint256 amountCollateral, address from, address to) private {...}
          ```
          
          We can include `address from` and `address to` in our input parameters in our internal function to enhance functionality. So, when someone undergoes liquidation, an address can be given from which to redeem and another one to receive the rewards.
          
          We then move the original code in the public redeem collateral function to our newly created private function. We revise `msg.sender` to `from` and update our `CollateralRedeemed` event info accordingly.
          
          ```js
          ...
          contract DSCEngine is ReentrancyGuard {
              ...
              event CollateralRedeemed(address indexed redeemFrom, address indexed redeemTo, address token, uint256 amount); // if redeemFrom != redeemedTo, then it was liquidated
              ...
              function _redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral, address from, address to)
                  private
              {
                  s_collateralDeposited[from][tokenCollateralAddress] -= amountCollateral;
                  emit CollateralRedeemed(from, to, tokenCollateralAddress, amountCollateral);
                  bool success = IERC20(tokenCollateralAddress).transfer(to, amountCollateral);
                  if (!success) {
                      revert DSCEngine__TransferFailed();
                  }
              }
              ...
          }
          ```
          
          This provides internal function usage in our public redeem collateral function. We then replace the original code with a call to our `_redeemCollateral` function, passing appropriate addresses for liquidation or redemption.
          
          ```js
              function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral)
                  external
                  moreThanZero(amountCollateral)
                  nonReentrant
              {
                  _redeemCollateral(tokenCollateralAddress, amountCollateral, msg.sender, msg.sender);
                  revertIfHealthFactorIsBroken(msg.sender);
              }
          ```
          
          Finally, in the liquidation process, we use `_redeemCollateral` to pull collateral from the user undergoing liquidation and transfer the amount to whoever called the `liquidate` function.
          
          ```js
              function liquidate(address collateral, address user, uint256 debtToCover)
                  external
                  moreThanZero(debtToCover)
                  nonReentrant
              {
                  uint256 startingUserHealthFactor = _healthFactor(user);
                  if (startingUserHealthFactor >= MIN_HEALTH_FACTOR) {
                      revert DSCEngine__HealthFactorOk();
                  }
                  // If covering 100 DSC, we need to $100 of collateral
                  uint256 tokenAmountFromDebtCovered = getTokenAmountFromUsd(collateral, debtToCover);
                  // And give them a 10% bonus
                  // So we are giving the liquidator $110 of WETH for 100 DSC
                  // We should implement a feature to liquidate in the event the protocol is insolvent
                  // And sweep extra amounts into a treasury
                  uint256 bonusCollateral = (tokenAmountFromDebtCovered * LIQUIDATION_BONUS) / 100;
                  // Burn DSC equal to debtToCover
                  // Figure out how much collateral to recover based on how much burnt
                  _redeemCollateral(collateral, tokenAmountFromDebtCovered + bonusCollateral, user, msg.sender);
                  ...
              }
          ```
          
          ## Iterative Refactoring
          
          Iterative refactoring is indispensable for boosting protocol performance. In our case, besides revising the `redeemCollateral()` function, the `burnDSC()` function required a similar treatment. Just as in the redeem function, we created an internal `_burnDSC()` function to allow burning from any address.
          
          The principal code changes entailed revising `msg.sender` to `onBehalfOf` and `dscFrom` within the burning event. Ensuring proper comments inside our code, specify that this internal function should only be called if the health factor checks are in place.
          
          ```js
              ...
              function burnDsc(uint256 amount) external moreThanZero(amount) {
                  _burnDsc(amount, msg.sender, msg.sender);
                  revertIfHealthFactorIsBroken(msg.sender); // I don't think this would ever hit...
              }
              ...
              function _burnDsc(uint256 amountDscToBurn, address onBehalfOf, address dscFrom) private {
                  s_DSCMinted[onBehalfOf] -= amountDscToBurn;
          
                  bool success = i_dsc.transferFrom(dscFrom, address(this), amountDscToBurn);
                  // This conditional is hypothetically unreachable
                  if (!success) {
                      revert DSCEngine__TransferFailed();
                  }
                  i_dsc.burn(amountDscToBurn);
              }
              ...
          ```
          
          Applying these changes to the public `burnDSC()` function allows us to incorporate the burn DSC feature into the liquidation process. Here, the liquidator pays down the debt, thus reducing the minted DSC.
          
          ```js
              ...
              function liquidate(address collateral, address user, uint256 debtToCover)
                  external
                  moreThanZero(debtToCover)
                  nonReentrant
              {
                  ...
                  _redeemCollateral(collateral, tokenAmountFromDebtCovered + bonusCollateral, user, msg.sender);
                  _burnDsc(debtToCover, user, msg.sender);
          
                  uint256 endingUserHealthFactor = _healthFactor(user);
                  // This conditional should never hit, but just in case
                  if (endingUserHealthFactor <= startingUserHealthFactor) {
                      revert DSCEngine__HealthFactorNotImproved();
                  }
                  revertIfHealthFactorIsBroken(msg.sender);
              }
              ...
          ```
          
          Note that we've also created Health Factor checks to ensure the integrity of the accounts of both the liquidator and the liquidatee is safe throughout this process.
          
          <img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor3.PNG" style="width: 100%; height: auto;">
          
          After such modifications, we should thoroughly validate protocol operation.
          
          ## Running tests and fine-tuning
          
          Proper unit testing is crucial for creating a solid DeFi protocol. It ensures the code correctly handles various scenarios and edge cases. With modifications in place, we must fix any syntax errors and ensure our code compiles successfully. Regression testing can then assure us that the changes haven't caused any unforeseeable issues that cause existing features to break.
          
          It is also crucial to keep a clear and coherent code structure with neat comments and clear variable names. This practice not only helps in debugging, but also aids security auditors and other developers in understanding the code smoothly.
          
          <img src="/foundry-defi/15-defi-liquidation-refactor/defi-liquidation-refactor4.PNG" style="width: 100%; height: auto;">
          
          Takeaways:
          
          - Good readable code along with comprehensive unit tests builds a strong DeFi protocol.
          - Regular refactoring helps us improve protocol functionality, decrease chances of bugs and increases code maintainability.
          - Adherence to CHECKS-EFFECTS-INTERACTIONS pattern ensures contract's state doesn't change unexpectedly during a transaction.
          
          In the next few sections, we'll dive deep into testing methodologies and bug management. But for now, take that much-deserved break. So stretch those legs, fuel up, and meet us back here soon. Happy Coding!
          
      -
        type: new_lesson
        enabled: true
        id: 35970bac-04ed-4d1a-93e1-8d71cb2486af
        title: "DSCEngine advanced testing"
        slug: defi-protocols-advanced-testings-testing
        duration: 15
        video_url: "x5X00U2CIg39S01dW67zgq1Tz9Hq9p9mZYuMVTYA4kk5A"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/16-defi-leveling-up-testing/+page.md"
        description: |-
                    This lesson dives into advanced testing techniques for Ethereum smart contracts using Foundry. It emphasizes the significance of testing for function initialization and demonstrates constructing and executing thorough test cases.
        markdown_content: |-
          ---
          title: Leveling Up Testing
          ---
          
          _Follow along the course with this video._
          
          
          
          # In-depth Guide to Testing for the Ethereum Smart Contract
          
          Writing tests for Ethereum smart contracts can be challenging even for experienced developers. In this section, I will guide you through some practical techniques to improve your testing structure using Foundry, our robust solidity framework. Note that this is a hands-on guide, so please open up your terminal to follow along.
          
          ## Getting Started
          
          Usually, getting started is the hardest part. Open up your terminal, let's dive in. Our aim is to increase our code coverage.
          
          ```bash
          forge coverage
          ```
          
          ## Constructor and Price Feed Tests
          
          Let's begin with some constructor tests. We will also want to set up some price feed tests. These will confirm whether things have been initialized correctly in our code. 'What are we testing?' you may ask. Your query should lead you to the constructor in your code. Check that you are correctly reverting when token lengths are not matching. For this test, you will need to create some address arrays — one for token addresses and another for price feed addresses.
          
          Here's our first constructor test:
          
          ```js
              ///////////////////////
              // Constructor Tests //
              ///////////////////////
              address[] public tokenAddresses;
              address[] public feedAddresses;
          
              function testRevertsIfTokenLengthDoesntMatchPriceFeeds() public {
                  tokenAddresses.push(weth);
                  feedAddresses.push(ethUsdPriceFeed);
                  feedAddresses.push(btcUsdPriceFeed);
          
                  vm.expectRevert(DSCEngine.DSCEngine__TokenAddressesAndPriceFeedAddressesAmountsDontMatch.selector);
                  new DSCEngine(tokenAddresses, feedAddresses, address(dsc));
              }
          ```
          
          Your code should revert and pass the test. If it does, bravo! If it doesn't, you'll have to review your logic and keep debugging until it works.
          
          We also want to test our `getTokenAmountFromUsd()` functon:
          
          ```js
               //////////////////
              // Price Tests  //
              //////////////////
          
              function testGetTokenAmountFromUsd() public {
                  // If we want $100 of WETH @ $2000/WETH, that would be 0.05 WETH
                  uint256 expectedWeth = 0.05 ether;
                  uint256 amountWeth = dsce.getTokenAmountFromUsd(weth, 100 ether);
                  assertEq(amountWeth, expectedWeth);
              }
          ```
          
          ## The Holy Grail of Tests: Is the Deposit Collateral Reverting?
          
          Let's now proceed to test more of our `depositCollateral()` function, specifically checking the it reverts with unapproved tokens. Dive into the `depositCollateral()` function in your code, our test is going to look something like this:
          
          ```js
              function testRevertsWithUnapprovedCollateral() public {
                  ERC20Mock randToken = new ERC20Mock("RAN", "RAN", user, 100e18);
                  vm.startPrank(user);
                  vm.expectRevert(abi.encodeWithSelector(DSCEngine.DSCEngine__TokenNotAllowed.selector, address(randToken)));
                  dsce.depositCollateral(address(randToken), amountCollateral);
                  vm.stopPrank();
              }
          ```
          
          The result of this test should show a revert.
          
          ## Testing Getter Functions
          
          When you write your getter functions, also write tests for them. We've written a public verson of the `_getAccountInformation()` function.
          
          ```js
          ...
          contract DSCEngine is ReentrancyGuard {
              ...
              function getAccountInformation(address user)
                  external
                  view
                  returns (uint256 totalDscMinted, uint256 collateralValueInUsd)
              {
                  return _getAccountInformation(user);
              }
              ...
          }
          ```
          
          Ensure that the return values of this function are correct by asserting the output in our test. Note: we've created a modifier here to make it easier to test already deposited collateral.
          
          ```js
          ...
          contract DSCEngineTest is StdCheats, Test {
              ...
              modifier depositedCollateral() {
                  vm.startPrank(user);
                  ERC20Mock(weth).approve(address(dsce), amountCollateral);
                  dsce.depositCollateral(weth, amountCollateral);
                  vm.stopPrank();
                  _;
              }
              ...
              function testCanDepositedCollateralAndGetAccountInfo() public depositedCollateral {
                  (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(user);
                  uint256 expectedDepositedAmount = dsce.getTokenAmountFromUsd(weth, collateralValueInUsd);
                  assertEq(totalDscMinted, 0);
                  assertEq(expectedDepositedAmount, amountCollateral);
              }
              ...
          }
          ```
          
          After this, we can run `forge coverage` again to see what our test coverage is like. I'm not going to walk you through writing all these tests (you can find more examples on the repo), but I encourage you to challenge yourself to write more tests for `DSCEngine.sol`.
          
          At this point, it's important to note that you don't have to attain 100% code coverage. Sometimes, 85%-90% coverage is great, but your test architecture should be set up to spot glaring bugs.
          
          ## In Conclusion
          
          Remember that writing tests is the critical way to validate that your code works as expected. Let AI bots like OpenAI's ChatGPT help you write tests, especially for those hard scenarios that need advanced logic. Bear in mind that sometimes your code is correct, but the test may be wrong. Keep debugging until your tests pass and cover as much of your code as possible. Lastly, be ready to refactor your code to make it testable, readable, and maintainable.
          
          With this guide, you should be able to run adequate tests for your Ethereum smart contracts. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 0dce8f57-7346-45fa-84f9-b9384b575d59
        title: "Write fuzz tests"
        slug: defi-writing-fuzz-tests
        duration: 17
        video_url: "L4WAlTQ02dhsiWtsGcjte76FljvanlUEVvVmdqOw6CAU"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/17-defi-open-fuzz-tests/+page.md"
        description: |-
                    Lesson 17 explores the implementation of fuzz tests in smart contract development, discussing both stateful and stateless fuzz testing. It focuses on enhancing the robustness of DApps through meticulous unit testing and refactoring.
        markdown_content: |-
          ---
          title: Open Fuzz Tests
          ---
          
          _Follow along the course with this video._
          
          
          
          # Unit Testing and Refactoring: Building Better and Secure DApps
          
          Hello everyone! Welcome back, if you have been following along, you would remember that in our previous section, we had taken a dive into the world of bugs and test cases. We looked at how to identify bugs and, more importantly, how to build a comprehensive battery of test cases. 'Now, are your tests similar to the one I provided? Better? Worse? The point is to have high test coverage for all logical branches in our code. It’s an awesome feeling when we can identify and fix bugs proactively through high-quality tests.
          
          <img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests1.png" style="width: 100%; height: auto;">
          
          ## Enhancing The Health Factor Function
          
          During this testing, I found a need to refactor some code. One significant change was the introduction of a `_calculateHealthFactor()` function. Why did I introduce it? This new function allowed me to create a similar `public` function which provided a great deal of clarity in calculating our service’s health factor. This indirectly turned out to be a very useful tool in our tests, enabling us to get an expected health factor. Consequently, it allowed easy handling of any errors if the actual and expected health factors didn’t match – especially in our test cases when we expected certain events.
          
          ```js
          ...
          contract DSCEngine is ReentrancyGuard {
              ...
              function _calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
                  internal
                  pure
                  returns (uint256)
              {
                  if (totalDscMinted == 0) return type(uint256).max;
                  uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
                  return (collateralAdjustedForThreshold * 1e18) / totalDscMinted;
              }
              ...
              function calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
                  external
                  pure
                  returns (uint256)
              {
                  return _calculateHealthFactor(totalDscMinted, collateralValueInUsd);
              }
              ...
          }
          ```
          
          This refactoring served a double purpose – a much cleaner code and better visibility of our health factor calculation. In fact, by making this function `public`, the users of our service can play around with it to see how their changes impact the health factor.
          
          ## Bug Hunting
          
          In the debugging exercise, the main point of interest was the `Health Factor` functionality. The `_calculateHealthFactor()` function worked by fetching the account information and then appling the health factor calculation. Here, I found a bug relating to `totalDscMinted`. My fix included a new checker that would detect if the `totalDsdMinted` was zero. If it was indeed zero, we capped the health factor to a maximum (e.g., 256).
          
          ```js
              ...
              if (totalDscMinted == 0) return type(uint256).max;
              ...
          ```
          
          Why was this checker important? Well, let’s consider a scenario. What if a user deposits a massive amount of collateral, but doesn't have any DSC Minted? The health factor calculation would divide by zero, causing the system to crash. We have to consider all edge cases to ensure our system is fail-proof.
          
          ## Essential External Functions
          
          Additionally, I added a lot of `external view functions` which would make it easier to interact with our protocol. This eased readability and made our protocol user-friendly.
          
          Of course, with every refactoring, there was an expanded library of test cases to cover all possible scenarios and close all loopholes. Nothing new here, as you’re already well-versed with writing robust test cases. And if your test coverage is around something like 90% – kudos, my friend! You’ve mastered the art of diligent testing in a complex project.
          
          ## But...Are We Done Yet?
          
          I’m sure you’re beaming with pride on your accomplishments, and rightly so. But, I have to break it to you – we’re not done yet! We’re now taking up the gauntlet to write the most epic, mind-blowingly awesome code there ever is!
          
          <img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests2.png" style="width: 100%; height: auto;">
          
          Right off the bat, the question that you need to repeatedly ask yourself is, ‘What are our invariants properties?’ If you can answer this question correctly, you can write stateful and stateless fuzz tests for your code and harden your application against unforeseen edge cases.
          
          ## Understanding Fuzz Testing
          
          In the world of programming, regardless of how hard you try, it’s almost guaranteed that you will miss a certain edge case scenario. This is where an advanced form of testing called `Fuzz Testing` comes into play.
          
          <img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests3.PNG" style="width: 100%; height: auto;">
          
          As we look at Fuzz Testing, we'll be exploring both stateful and stateless variants.
          
          ## Stateless versus Stateful Fuzz Testing
          
          To put it simply, the previous state doesn't impact the next run in stateless fuzzing. On the other hand, stateful fuzzing uses the state of the previous test run as the starting point for the next one. Here's an example of stateless fuzz testing:
          
          Our Contract:
          
          ```js
          //SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          
          contract MyContract {
              uint256 public shouldAlwaysBeZero = 0;
              uint256 hiddenValue = 0;
          
              function doStuff(uint256 data) public {
                  if (data ==2){
                      shouldAlwaysBeZero = 1;
                  }
                  if (hiddenValue == 7){
                      shouldAlwaysBeZero = 1;
                  }
                  hiddenValue = data;
              }
          }
          ```
          
          Our Test:
          
          ```js
              ...
              function testIAlwaysGetZeroFuzz(uint256 data) public {
                  exampleContract.doStuff(data);
                  assert(exampleContract.shouldAlwaysBeZero() == 0);
              }
          ```
          
          In the above example, the `doStuff` function should always return zero. The fuzz test will pass varying random arguments to our function, attempting to break this function. Here's a stateful fuzz test:
          
          ```js
          ...
          import {StdInvariant} from "forge-std/StdInvariant.sol";
          
          contract MyContractTest is StdInvariant, Test {
              MyContract exampleContract;
          
              function setUp() public {
                  exampleContract = new MyContact();
                  targetContract(address(exampleContract));
              }
          
              function invariant_testAlwaysReturnsZero() public {
                  assert(exampleContract.shouldAlwaysBeZero() == 0);
              }
          }
          
          ```
          
          The above example is going to call the functions of `MyContract` randomly, with random data.
          
          This functionality doesn't stop at the basics. If you're interested in exploring more advanced fuzzing strategies - stay tuned! We'll be diving deeper into this topic in our future posts.
          
          ## Wrap Up
          
          Let's have a quick wrap-up of what we discussed today.
          
          - Unit testing is crucial in identifying and fixing bugs.
          - Refactoring not only yields cleaner code but also makes the system easier to understand and interact with.
          - Stateless and stateful fuzz testing is crucial in securing your smart contract.
          
          Overall, enhancements to your testing strategies can significantly increase the resilience and robustness of your platform. In conclusion, I urge you to keep those invariants in mind, keep writing those functions, and don’t let anyone undervalue your tests!
          
          Until then – happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: d8723ab8-f2c0-4738-a404-7d67735bec48
        title: "Create the fuzz tests handler pt.1"
        slug: create-fuzz-tests-handler
        duration: 14
        video_url: "IPIrYsKq5ylG8oeqkM021e4i1Q00c7qQFiS500mpCsZZ5Q"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/18-defi-handler-fuzz-tests/+page.md"
        description: |-
                    Part 1 of this lesson introduces the concept of fuzz testing in Foundry, focusing on creating detailed invariant tests for smart contracts. It guides through setting up the testing environment and structuring invariants and handlers.
        markdown_content: |-
          ---
          title: Handler Fuzz Tests
          ---
          
          _Follow along the course with this video._
          
          
          
          # Decoding the Magic of Fuzz Testing in Foundry
          
          Chances are, you're here because you've heard about the magic that is **fuzz testing** or **invariant testing**. As developers, it's absolutely crucial for us to gain confidence that our code works as intended, especially when it comes to complex projects.
          
          And trust me, there's no better way to do this than by writing robust invariant tests.
          
          ## Fuzz Testing - An Overview
          
          Fuzz testing, also known as fuzzing, is a software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program. The program is then monitored for exceptions such as crashes, failing built-in code assertions, or potential memory leaks.
          
          <img src="/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests1.png" style="width: 100%; height: auto;">
          
          It's like throwing a wrench into a machine and watching to see if and how the machine breaks, giving you a better understanding of the machine's robustness, and how it might break in the future.
          
          We could compare fuzz testing to an open basketball court where you get to shoot from anywhere you like. It's a fun way to get warmed up and get a feel for the game, especially at the beginning. But the problem is, you could be wasting valuable shots from improbable distances or awkward angles. Instead, you might want to focus on the three-point line or the free-throw line, which hold a higher value in an actual game scenario.
          
          That's where targeted invariants and fuzz testing with handlers come in!
          
          ## Fuzz Testing Vs Invariant Testing
          
          To clarify, invariant testing is simply a type of fuzz testing. 'Invariant' just means stateful, or persistent.
          
          The basic methodology, like we saw in the previous video, works okay. But as we start building more complex systems, we begin to see its limitations. Suffice to say, it represents an "open" targeted fuzz testing where all functions in a contract are called in any order, attempting to break the invariants.
          
          Enter **invariant testing with handlers**, the more advanced sibling, which curtails these seemingly random efforts with more focused techniques, and is what we'll be focusing more on in this piece.
          
          ## Let's Get To Testing!
          
          Enough explanation, let's get our hands dirty! We are about to create some very detailed invariant tests to increase your confidence in your code.
          
          ### Setting Up Your Environment
          
          <img src="/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests2.png" style="width: 100%; height: auto;">
          
          For our testing purposes, we're going to be using Foundry, a core framework which has a built-in test runner with invariants and handlers.
          
          To set up your test, create a new test directory within your contract's root directory and add two test files; an invariants test file ( `InvariantsTest.t.sol` ) and a handlers file ( `Handlers.t.sol` ).
          
          In your invariants test file, you will specify the properties of your system that should remain unaltered or invariant. Handlers, on the other hand, will ensure that these properties are observed in an orderly manner without wastage.
          
          ### Invariants and Handlers Uncovered
          
          Let's take a deeper dive into our two new scripts — the invariants and handlers.
          
          Your invariants test file should look something like this:
          
          ```js
          //SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          import {Test} from "forge-std/Test.sol";
          import {StdInvariant} from "forge-std/StdInvariant.sol";
          import {DeployDSC} from "../../script/DeployDSC.s.sol";
          import {DSCEngine} from "../../src/DSCEngine.sol";
          import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
          import {HelperConfig} from "../../script/HelperConfig.s.sol";
          import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
          
          contract OpenInvariantsTest is StdInvariant, Test {
              DeployDSC deployer;
              DSCEngine dsce;
              HelperConfig config;
              address weth;
              address wbtc;
          
              function setUp() external {
                  deployer = new DeployDSC();
                  (dsc,dsc,config) = deployer.run();
                  (,, weth, wbtc,) = config.activeNetworkConfig();
                  targetContract(address(dsce));
              }
          
              function invariant_protocolMustHaveMoreValueThanTotalSupply() public view{
                  //get the value of all the collateral in the protocol
                  //compare it to all the debt (dsc)
                  uint256 totalSupply = dsc.totalSupply();
                  uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsce));
                  uint256 totalBtcDeposited = IERC20(wbtc).balanceOf(address(dsce));
          
                  uint256 wethValue = dsce.getUsdValue(weth, totalWethDeposited);
                  uint256 wbtcValue = dsce.getUsdValue(wbtc, totalBtcDeposited);
          
                  assert(wethValue + wbtcValue > totalSupply);
              }
          ```
          
          Here, `totalSupply()` represents one such property that should always hold, geared towards maintaining the total supply of tokens.
          
          Now, let's move on to the handlers file. The handlers help you make efficient test runs and avoid wastage, by ensuring the invariants are checked in a specific order.
          
          For instance, if you want to test the deposit of a token, the handlers ensure that the token is approved before depositing; this helps to avoid a wasted test run.
          
          ### Using Invariant in Foundry
          
          In the Foundry docs, we can see, the [invariant](https://book.getfoundry.sh/forge/invariant-testing) section allows you to
          
          - set the total number of `runs` for a test.
          - specify `depth`, representing the number of calls in a single run.
          - use `fail_on_revert`, to indicate whether the test should fail upon encountering a revert.
          
          We can include the following in our `foundry.toml`:
          
          ```js
          [invariant];
          runs = 128;
          depth = 128;
          fail_on_revert = true;
          ```
          
          Let's dissect the `fail_on_revert` keyword a bit further. By setting it to false, the test runner tolerates transaction reverts without causing the entire test run to fail. This is useful when you're first getting started or dealing with larger and more complex systems, where not all calls might make sense. This aligns better with the spirit of fuzz testing, where the tests can make wild attempts at breaking the invariants and those that fail with a revert are quietly ignored.
          
          On the other hand, if set to true, any transaction that reverts is immediately flagged as a test failure. This is useful when you want a stricter assertion of behavioral norms and to quickly identify the condition that’s causing the revert.
          
          Here's some free advice for you: don't get overly excited if your tests pass initially. Instead, aim to find issues, by increasing the number of runs and depth, thus giving our fuzz testing more opportunities to find any hidden bugs.
          
          You're also likely to find calls that reverted in the process, which should ring some alarm bells and prompt you to look into what could have caused these to fail. This is a easier job with `fail_on_revert: true`.
          
          The reason for most reverts is that the fuzz may have tested a function with random values that didn't make sense in that context. To prevent such erroneous testing, this is where handlers come knocking once more, as they ensure your functions are called with values in the correct order and format.
          
          ## In Conclusion, Invariance and Handlers are Your Allies
          
          The benefit of working with handlers is that they guide the testing process in a way that makes sense within the context of your protocol, unlike traditional fuzz testing which can end up causing a multitude of function calls in random and improbable combinations.
          
          So, one of our key takeaways from this deep dive into advanced testing practices is the utility and effectiveness of invariant testing with handlers. As our contract systems become more complex, traditional methods of fuzz testing become increasingly inefficient and can lead to significantly wastage.
          
          So let's embrace the utility of handlers and tailor our testing specifically to the nuances of our contracts to get the most out of the process and shine a light on any hidden bugs that may be lurking in the shadows.
          
          I hope this guide sheds some light on fuzz and invariant testing, their upsides, and downsides, and how to get started writing such tests. I’ll love to hear how implementing these testing strategies work out for you. Keep coding!
          
      -
        type: new_lesson
        enabled: true
        id: 66e7be7e-257f-49a6-b4d2-d1dbf8806564
        title: "Create the fuzz tests handler pt.2"
        slug: create-fuzz-tests-handler-part-2
        duration: 20
        video_url: "dohUk9vWfHAjPSXZhuG4UB1yHWQFYtf74UVWUsfd568"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/19-defi-handler-stateful-fuzz-tests/+page.md"
        description: |-
                    In Part 2, the focus shifts to crafting optimized handlers for valid function calls in smart contracts. The lesson covers the groundwork of creating function handlers and improving test efficiency through valid and efficient function calls.
        markdown_content: |-
          ---
          title: Handler Fuzz Tests
          ---
          
          _Follow along the course with this video._
          
          
          
          # Smart Contract Fuzz Testing: Crafting Handlers for Optimized Valid Calls
          
          Software fuzz testing employs a variety of techniques, one of which is handling functions in a manner to ensure valid calls. This section takes you on a comprehensive examination on how to create handlers for smart contracts that will allow you to make valid calls and scan for potential vulnerabilities in your contracts.
          
          ## Establishing the Groundwork
          
          In simple terms, handlers are scripts we create that handle the way we make calls to the Decentralized Stablecoin Engine (`dsce`) - only enabling calls under the condition that the required variables or functions for the call are available and valid.
          
          This minimizes the chance of wasted function calls which attempt to execute tasks with no valid foundation.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          import {Test} from "forge-std/Test.sol";
          import {DSCEngine} from "../../src/DSCEngine.sol";
          import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
          
          contract Handler is Test {
              DSCEngine dsce;
              DecentralizedStablecoin dsc;
          
              constructor(DSCEngine _dscEngine, DecentralizedStablecoin _dsc) {
                  dsce = _dsce;
                  dsc = _dsc;
                  }
          }
          ```
          
          To make sure we generate valid calls, we consider several factors. For instance, there's no logic in calling the 'redeemCollateral' function when there is no collateral to redeem. The handler-script becomes a fail-safe mechanism to avoid such redundancies.
          
          ## Handling Function Calls
          
          To guard against invalid random calls, we define how to make function calls in the handler. For example, the `depositCollateral` function should first validate the collateral before calling it.
          
          ```js
          ...
          contract Handler is Test {
              ...
              function depositCollateral(address collateral, uint256 amountCollateral) public {
                  dsce.depositCollateral(collateral, amountCollateral);
              }
          }
          ```
          
          We need to adjust our `Invariants.t.sol` script to leverage the handler contract we're creating. To do this, we change the target contract the test script is referencing for it's fuzz testing:
          
          ```js
          ...
          import {Handler} from "./Handler.t.sol";
          ...
          contract OpenInvariantsTest is StdInvariant, Test {
              DeployDSC deployer;
              DSCEngine dsce;
              HelperConfig config;
              address weth;
              address wbtc;
              Handler handler;
          
              function setUp() external {
                  deployer = new DeployDSC();
                  (dsc,dsc,config) = deployer.run();
                  (,, weth, wbtc,) = config.activeNetworkConfig();
                  handler = new Handler(dsce,dsc);
                  targetContract(address(handler));
              }
          ...
          ```
          
          Now, when we run our invariant tests, they will target our `Handler` and only call the functions we've specified within the `Handler` contract, in this case `depositCollateral`. However, the function is still being called randomly, with random data and we can do better. We know that random data for the collateral addresses is going to fail, so we can mitigate unnecessary calls be providing our function with seed addresses:
          
          ```js
          ...
          import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
          ...
          contract Handler is Test {
              ...
              ERC20Mock weth;
              ERC20Mock wbtc;
              ...
              constructor (DSCEngine _dscEngine, DecentralizedStableCoin _dsc){
                  dsce = _dsce;
                  dsc = _dsc;
          
                  address[] memory collateralTokens = dsce.getCollateralTokens();
                  weth = ERC20Mock(collateralTokens[0]);
                  wbtc = ERC20Mock(collateralToken[1]);
              }
          
              function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
                  ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
                  dsce.depositCollateral(address(collateral), amountCollateral);
              }
          
              // Helper Functions
              function _getCollateralFromSeed(uint256 collateralSeed) private view returns (ERC20Mock){
                  if (collateralSeed % 2 == 0){
                      return weth;
                  }
                  return wbtc;
              }
          }
          ```
          
          Whew, that's a lot! Now when we call the tests in our handler, the `depositCollateral` functon will only use valid addressed for collateral provided by our `_getCollateralFromSeed()` function
          
          ## Improving Efficiency
          
          The key to handling function calls is efficiency. Unnecessary or invalid function calls increase iteration loops, resulting in performance issues.
          
          As you gradually cut down on unnecessary calls, monitor your error reports. Configuring the `failOnRevert` parameter to `true` helps you identify why a test is failing.
          
          Lastly, remember not to artificially narrow down your handler function to a state where valid edge cases get overlooked.
          
          <img src="/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests1.PNG" style="width: 100%; height: auto;">
          
          ## Wrapping Up
          
          In conclusion, the vital role of handler-functions in making valid calls during fuzz testing is to optimize performance and catch potential vulnerabilities in the smart contracts. The process demands a continuous balance between weeding out invalid calls and maintaining allowance for valid edge cases.
          
          However, always aim for a minimal rejection rate i.e., the `failOnRevert` parameter set to `false`. A perfect handler function will maximize successful runs and reduce reverts to zero.
          
          You may need to adjust the deposit size to a feasible limit to prevent an overflow when depositing collateral. Ideally, the collateral deposited is lower than the maximum valid deposit size. After completion, every function call should pass successfully, signifying a well-secured contract with high potential for longevity.
          
          Happy testing!
          
      -
        type: new_lesson
        enabled: true
        id: 1e5c8f0c-1f20-48bb-ad1f-553b3efa7759
        title: "Create the collateral redeemal handler"
        slug: defi-handler-redeeming-collateral
        duration: 6
        video_url: "r4d9lct625a02cT29iprU5SylyFuzHI6qbgSiXjxxPIM"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/20-defi-handler-redeeming-collateral/+page.md"
        description: |-
                    This lesson delves into the mechanisms of handling collateral in blockchain transactions. It focuses on the implementation and testing of functions for depositing and redeeming collateral, emphasizing the importance of validity checks.
        markdown_content: |-
          ---
          title: Handler - Redeeming Collateral
          ---
          
          _Follow along the course with this video._
          
          
          
          # Handling Collaterals in Blockchain Transactions
          
          Today we will dive into blockchain transactions and the handling of collaterals within those transactions. Specifically the deposit and redemption process of the collateral will be our focus. We will decipher a function for depositing collateral and subsequently a validation function for redeeming it. Details of implementing these functions and some interesting test cases will also be discussed.
          
          ## Implementation : Collateral Deposit Function
          
          This function ensures that the submitted collateral is a valid deposit.
          
          ```js
          ...
          contract Handler is Test {
              ...
              function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
                  ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
                  dsce.depositCollateral(address(collateral), amountCollateral);
              }
              ...
          }
          ```
          
          In this function, the type of collateral to deposit and amount of collateral to deposit are two required inputs which are Blockchain's unsigned integer represented in form of function arguments.
          
          ## Implementation : Collateral Redemption Function
          
          After defining the deposit function, let's talk about the collateral redemption function. It's the process of retrieving a specific type of collateral from the deposited pool. The `redeemCollateral()` function, similar to the deposit function, takes an argument that specifies the type of collateral to redeem.
          
          The function below shows the implementation of this process:
          
          ```js
              function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
                  ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
                  dscEngine.redeemCollateral(address(collateral), amountCollateral);
              }
          ```
          
          <img src="/foundry-defi/20-defi-handler-redeem-collateral/defi-handler-redeem-collateral1.PNG" style="width: 100%; height: auto;">
          
          ```js
          ...
              function getCollateralBalanceOfUser(address user, address token) external view returns(uint256){
                  return s_collateralDeposited[user][token];
              }
          ...
          ```
          
          ## Implementing Validity Checks
          
          The `redeemCollateral()` function must have an the above check for validity. This is to ensure that the redemption request is not more than what the user has deposited. We do this by bounding the redemption amount between one and the max collateral to redeem.
          
          ```js
              ...
              uint256 maxCollateral = dscEngine.getCollateralBalanceOfUser(msg.sender, address(collateral));
          
                  amountCollateral = bound(amountCollateral, 1, maxCollateral);
                  if (amountCollateral == 0) {
                      return;
                  }
              ...
          ```
          
          The whole function should look like this:
          
          ```js
              ...
              function redeemCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
                  ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
                  uint256 maxCollateral = dscEngine.getCollateralBalanceOfUser(msg.sender, address(collateral));
          
                  amountCollateral = bound(amountCollateral, 1, maxCollateral);
                  if (amountCollateral == 0) {
                      return;
                  }
                  dscEngine.redeemCollateral(address(collateral), amountCollateral);
              }
              ...
          ```
          
          ## Exploring Edge Cases and Fixing Code Breaks
          
          Running the above function may result in throwing an edge case as an error. In our example, it exposed a mistake in the bounding process. If the max collateral to redeem is zero, the system breaks. A solution to this is to keep zero as a valid input.
          
          Then, we need to check if the collateral amount after bounding is equal to zero. If yes, we can simply return, else we would call the redeem collateral function.
          
          ```js
          amountCollateral = bound(amountCollateral, 0, maxCollateral);
          if (amountCollateral == 0) {
            return;
          }
          ```
          
          ## Enhancing Adequacy of Test Cases with Fail and Revert
          
          So far, we have ensured that the transactions are operating as intended. However, to stream out all possible scenarios for handling Collaterals, failing criteria with blanket reverts should be avoided. Inclusion of test cases which do not fail on revert allows broader coverage of potential edge cases and glitches in transaction handling. Consideration of such trade-off prospects in the design of fail criteria lends to the overall system robustness.
          
          In conclusion, handling collaterals effectively necessitates robust deposit and redemption functions, comprehensive edge testing and safeguards for potential system inadequacy through well-thought strategies. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 37d41dd8-7170-4be4-aeb9-4e85822650f6
        title: "Create the mint handler"
        slug: defi-handler-minting-dsc
        duration: 6
        video_url: "SzNVux01Xv5rnRxvGJ5xLSnPIi01UAB8LNZ9TmVHPQFm00"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/21-defi-handler-minting-dsc/+page.md"
        description: |-
                    Lesson 21 guides through testing the 'mintDsc()' function in DSCEngine. It involves creating a handler function to ensure safe minting of DSC, considering the user's health factor and the system's overall stability.
        markdown_content: |-
          ---
          title: Handler - Minting DSC
          ---
          
          _Follow along the course with this video._
          
          
          
          # Decoding DSC: A Journey into testing the "Mint Function"
          
          In our previous parts, we discussed the concepts of fuzz testing our `depositCollateral()` and `redeemCollateral()` functions. Today, we'll be walking you through one of the key functions we need to test, the `mintDsc()` function.
          
          ## A Walk Through the Mint Function Test
          
          Our `mintDsc()` function within `DSCEngine.sol` takes a `uint256 amount`. So our handler test will do the same, we also have to restrict our handler function to avoid reverts! Our `mintDsc()` function currently requires that `amount` not be equal to zero, and that the amount minted, does not break the user's `Health Factor`. Let's look at how this handler function is built:
          
          ```js
          ...
          contract Handler is Test {
              ...
              function mintDsc(uint256 amountDsc) public {
                  vm.prank(dsc.owner());
                  dsc.mint(msg.sender, amountDsc);
              }
              ...
          ```
          
          The above handler function ensures we're minting a random amount of DSC. But, there's a catch, we can't just let "amount" be an undefined value. It can't be zero, and the user should ideally have a stable health factor.
          
          ```js
          amount = bound(amountDsc, 1, MAX_DEPOSIT_SIZE);
          ```
          
          This adjustment makes sure the "amount" sits in between 1 and the maximum deposit size. Now let's make sure we aren't breaking the user's `Health Factor` with this call. We can do this by calling the `getAccountInformation()` function and checking what's returned with what the user is trying to mint:
          
          ```js
          ...
          contract Handler is Test {
              ...
              function mintDsc(uint256 amount) public {
                  (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(msg.sender);
          
                  int256 maxDscToMint = (int256(collateralValueInUsd)/2) - int256(totalDscMinted);
                  if(maxDscToMint < 0){
                      return;
                  }
                  amount = bound(amount, 0, uint256(maxDscToMint));
                  if (amount == 0){
                      return;
                  }
          
                  vm.startPrank(msg.sender);
                  dsce.mintDsc(amount);
                  vm.stopPrank();
              }
          }
          ```
          
          In the above function, we are constraining the amount minted to be greater than zero before minting any DSC. In addition to this, we're checking the user's `totalDscMinted` vs their `collateralValueInUsd` to ensure their account's `health factor` is not at risk and they don't risk liquidation.
          
          ## Victory Looks Like This!
          
          Lo and behold, let's run the functional mint DSC and observe the result.
          
          <img src="/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc1.PNG" style="width: 100%; height: auto;">
          
          You should notice that we've performed multiple calls without any reverts, and that's exactly what success looks like! Your mint function is now up and running and ready to increase the supply of DSC.
          
          Stay tuned for our next adventure! We hope you are now more comfortable with testing the mechanism used for injecting tokens into the DSC ecosystem.
          
          <img src="/foundry-defi/21-defi-handler-minting-dsc/defi-handler-minting-dsc2.PNG" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 399e5ce5-9d20-42f0-ac73-202b21e53bd0
        title: "Debugging the fuzz tests handler"
        slug: defi-handler-fuzz-debugging
        duration: 9
        video_url: "OvQlzlXLUvoQM01YYGr01uHioUspMf5rxleFBReLxVjyM"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/22-defi-handler-fuzz-debugging/+page.md"
        description: |-
                    This lesson explores debugging strategies for smart contracts, particularly focusing on the use of 'ghost variables' to track function calls. It provides insights into handling errors and refining the testing process for better outcomes.
        markdown_content: |-
          ---
          title: Handler - Stateful Fuzz Test Debugging
          ---
          
          _Follow along the course with this video._
          
          
          
          # Debugging Your Code Using Ghost Variables
          
          Recently, I was stuck in frustrating debugging mode, continually getting a 'total supply of zero' message, even though there was plenty of WETH and wrapped bitcoin about. The questions plaguing my attempts were: are we ever calling this function? Why are we getting a total supply of zero all the time? Eventually, I managed to crack the nut and here's how I did it, featuring a mysterious ghost variable, and other coding challenges to wrap your brain around.
          
          ## What are Ghost Variables?
          
          If you have ever wondered if your function is not being called, then it's time to introduce a `ghost variable`. Although it sounds incredibly spooky, they are a practical way to track if a function is even being called. Here's how to use one. We want to create a variable named `timesMintIsCalled` which we use in our `Handler.t.sol` to track whether or not our `_mintDsc()` function is being called.
          
          ```js
          ...
          contract Handler is Test {
              ...
              uint256 public timesMintIsCalled;
              ...
              function mintDsc(uint256 amount) public {
                  (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(msg.sender);
          
                  int256 maxDscToMint = (int256(collateralValueInUsd)/2) - int256(totalDscMinted);
                  if(maxDscToMint < 0){
                      return;
                  }
                  amount = bound(amount, 0, uint256(maxDscToMint));
                  if (amount == 0){
                      return;
                  }
          
                  vm.startPrank(msg.sender);
                  dsce.mintDsc(amount);
                  vm.stopPrank();
                  timesMintIsCalled++;
              }
          }
          ```
          
          Then, when you run your test once again, you might see that `mintDsc()` is never called. Baffling indeed, but it might be because of a hit return that is stopping the call prematurely.
          
          It's crucial to debug this situation, and there are various methods you could employ to achieve that. Personally, I found the most successful way through moving the `timesMintIsCalled++;` further upwards in the code until I found the line it was breaking on. Then, by console logging all the values of the variables around, I unearthed some very interesting insights, which brings us onto the second part:
          
          ## The Importance of the Message Sender
          
          <img src="/foundry-defi/22-defi-handler-fuzz-debugging/defi-handler-fuzz-debugging1.PNG" style="width: 100%; height: auto;">
          
          And, how does one keep a track of users who have deposited collateral? One way is, we can create an array of addresses in `Handler.t.sol` and push to this array `msg.sender` each time collateral is deposited. We'll then use this array in our `mintDsc()` function as a seed.
          
          ```js
          ...
          contract Handler is Test {
              ...
              uint96 public constant MAX_DEPOSIT_SIZE = type(uint96).max;
              uint256 public timesMintIsCalled;
              address[] public usersWithCollateralDeposited;
              ...
              function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
                  ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
                  amountCollateral = bound(amountCollateral, 1, MAX_DEPOSIT_SIZE);
                  dsce.depositCollateral(address(collateral), amountCollateral);
          
                  vm.startPrank(msg.sender);
                  collateral.mint(msg.sender, amountCollateral);
                  collateral.approve(address(dsce), amountCollateral);
                  dsce.depositCollateral(address(collateral), amountCollateral);
                  vm.stopPrank();
                  usersWithCollateralDeposited.push(msg.sender);
              }
          }
          ```
          
          Note that this can cause duplicate users by pushing the same address multiple times, but hey, let's keep it simple for now.
          
          Now, back in Mint DSC, you can do something similar to what you did with collateral. Here's a small code snippet to help:
          
          ```js
          ...
          contract Handler is Test {
              ...
              function mintDsc(uint256 amount, uint256 addressSeed) public {
                  address sender = usersWithDepositedCollateral[addressSeed % usersWithDepositedCollateral.length];
                  (uint256 totalDscMinted, uint256 collateralValueInUsd) = dsce.getAccountInformation(sender);
          
                  int256 maxDscToMint = (int256(collateralValueInUsd)/2) - int256(totalDscMinted);
                  if(maxDscToMint < 0){
                      return;
                  }
                  amount = bound(amount, 0, uint256(maxDscToMint));
                  if (amount == 0){
                      return;
                  }
          
                  vm.startPrank(sender);
                  dsce.mintDsc(amount);
                  vm.stopPrank();
              }
          }
          ```
          
          When you run the above test, you may get an error...
          
          ## Avoid Errors With Some Conditions
          
          It's also crucial to handle any errors. The error we're seeing is due to our modulo `%` resulting in zero when `usersWithCollateralDeposited.length` is zero. In this case, before the code runs, you can add a condition to return if users with collateral length equals zero. This helps you skip calls where collateral is not deposited.
          
          ```js
          ...
          function mintDsc(uint256 amount, uint256 addressSeed) public {
              if(usersWithDepositedCollateral.length == 0) {
                  return;
              }
              ...
          }
          ```
          
          After these corrections, I found that the total times Mint was called was now 31 and we were getting a total supply. This signaled that the `mintDsc()` function in our handler was now actually working, and we were successfully calling `mintDsc()`!
          
          ## Always Check Your Getters
          
          Finally, be sure to always check your getters. It's wise to always include an invariant function `invariant_gettersShouldNotRevert()`. Getters can be inserted here and if any of them revert, that would mean the function broke an invariant.
          
          ```js
          function invariant_gettersShouldNotRevert() public view {
              ...
              dsce.getLiquidationBonus();
              dsce.getPrecision();
              ...
          }
          ```
          
          And to make sure you're including everything, you can use something like `forge inspect <Contract> methods`. This will reveal all methods that this contract has along with its function selectors. Look for all the view functions, and that can be used as a checklist of functions to call on a contract in your tests.
          
          That's all for today! I hope you found this helpful for debugging your code and understanding better how to navigate the inevitable coding obstacles. Most importantly, remember to enjoy the journey - because that's where the real learning happens.
          
      -
        type: new_lesson
        enabled: true
        id: aab32068-01bb-469f-8341-d07424a92369
        title: "Create the price feed handler"
        slug: defi-price-feed-handler
        duration: 8
        video_url: "Cj01SgwcIx73nh600wsgXpNfajc85shOX45MsclQ01jrmY"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/23-defi-price-feed-handling/+page.md"
        description: |-
                    The lesson focuses on integrating price feed updates in smart contract handlers. It covers the creation of functions for updating collateral prices and emphasizes the importance of handling price fluctuations to maintain protocol integrity.
        markdown_content: |-
          ---
          title: Price Feed Handling
          ---
          
          _Follow along the course with this video._
          
          
          
          # Enhancing Smart Contracts with Handlers and Invariant Testing In DSC Engine
          
          In the smart contract world, it's crucial to simulate the entire lifecycle of our contracts. And to achieve this, handlers are a crucial part of the puzzle. However, their utility extends beyond just handling the DSCEngine. In fact, handlers can effectively simulate any contract we want to test on the blockchain.
          
          When creating handlers, we often interact with various other contracts. Some of these may include the price feed, the WETH (Wrapped Ether) token, and the wrapped Bitcoin token.
          
          ## Introducing Price Feed Updates In Our Handler
          
          Given their significant impact on the protocol, it's imperative to incorporate price feed updates in our handler. In order to achieve this feat, we start by importing the MockV3Aggregator.
          
          ```js
          import { MockV3Aggregator } from "mocks/MockV3Aggregator.sol";
          ```
          
          The MockV3Aggregator has functions that ease the process of updating a price, allowing our protocol to conveniently update prices. Once we have imported the MockV3Aggregator, we can extract the WETH price from our system using the view function `DSE get collateral token price feed()`.
          
          We can now declare a new public `ethUsdPriceFeed` variable of type `MockV3Aggregator`. Your constructor should look something like this:
          
          ```js
          ...
          import { MockV3Aggregator } from "mocks/MockV3Aggregator.sol";
          ...
          contract Handler is Test {
              ...
              MockV3Aggregator public ethUsdPriceFeed;
              ...
              constructor(DSCEngine _dscEngine, DecentralizedStableCoin _dsc){
                  ...
                  ethUsdPriceFeed = MockV3Aggregator(dsce.getCollateralTokenPriceFeed(address(weth)));
                  ...
              }
          }
          ```
          
          Now that we successfully have the ETH USD price feed, it's time to include a new function in our handler. This will involve updating the collateral price to a given price feed.
          
          ```js
          function updateUpdateCollateral(uint96 newPrice) public {...}
          ```
          
          Next, we need to convert the uint96 to an int256 because price feeds intake int256 data types, then we use this `newPriceInt` to update the price in our `ethUsdPriceFeed`:
          
          ```js
          function updateUpdateCollateral(uint96 newPrice) public {
              int256 newPriceInt = int256(uint256(newPrice));
              ethUsdPriceFeed.updateAnswer(newPriceInt);
          }
          ```
          
          And voilà! We now have a function that updates the collateral price in our handler.
          
          ## Testing the Handler
          
          Once our handler is complete, it's time to test it to see how it fares. Will it run smoothly or encounter some errors?
          
          When we do run it, you may find it detected a sequence where there was an issue. It indicates a violation of our invariant: the total supply doesn't add up to the sum of the WETH value and Bitcoin value.
          
          On further inspection of the sequence, we discover a process: first, it deposited some collateral, followed by minting some DSC. Then, it updated the collateral price to a certain value, say 471. This changed the ETH collateral from its existing rate to 471, an immense difference which caused the system to revert. It had minted a humongous amount of DSC which broke the system.
          
          This is a crucial reminder of the importance of volatility in our system. Our system can easily get busted if the price of an asset plummets or spikes swiftly. So, handling price fluctuations becomes pivotal in maintaining the integrity of the protocol.
          
          <img src="/foundry-defi/23-defi-price-feed-handling/defi-price-feed-handling1.PNG" style="width: 100%; height: auto;">
          
          Therefore, it becomes impetrative to revisit our assumptions and protocols when designing the system. For instance, we assumed a liquidation bonus of 10%, and that the collateral always needs to be 200% over collateralized. In case the price drops significantly, resulting in let's say just 50% collateralization, our system breaks and the invariant gets compromised.
          
          Therefore, we should either brainstorm ways to prevent such drastic reductions in collateralization, or acknowledge that this is a recognized loophole, where the protocol can turn worthless if the price fluctuates wildly. While neither seems to be a satisfactory solution, these are challenges we need to keep in mind, thereby proving the supreme importance of invariant tests.
          
          <img src="/foundry-defi/23-defi-price-feed-handling/defi-price-feed-handling2.PNG" style="width: 100%; height: auto;">
          
          ## Wrapping Up
          
          There's an exciting journey awaiting us ahead. We have to learn about proper Oracle use and write many more tests (a task we leave up to you!). We also need to prepare ourselves for a smart contract audit. All of this, while juggling with our existing contracts like the decentralized stablecoin.
          
          It's an exhilarating journey that is all about continuous learning, discovery, and improvements! Stay tuned for more exciting updates in our upcoming blogs.
          
      -
        type: new_lesson
        enabled: true
        id: 6e1c63ff-90a4-43c1-be61-f68f9cb4b376
        title: "Manage your oracles connections"
        slug: managing-oracles-connections
        duration: 9
        video_url: "g8Y6bv1dQcBXv003wDKr0000dlKmsZh4XjYYMR00eIL3u5w"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/24-defi-oracle-lib/+page.md"
        description: |-
                    This lesson addresses the implementation and management of Chainlink Price Feeds in DSCEngine. It includes creating a library for ensuring price feed accuracy and discusses the implications of stale prices on the protocol's functionality.
        markdown_content: |-
          ---
          title: OracleLib
          ---
          
          _Follow along the course with this video._
          
          
          
          # Checking Chainlink Price Feeds with DSC Engine
          
          Let's discuss the process of using Chainlink Price Feeds in our `DSCEngine`. When working with Oracles, an assumption that we often make in our protocol is that these price feeds would work seamlessly. However, price feeds are systems just like any other and therefore can have potential glitches. To ensure that our protocol doesn't end up breaking due to a malfunction in the price feed system, we can put some safety checks in our code. This section will guide you through the process of putting some checks on price feeds using a library methodology we developed.
          
          ## Setting Up The Library
          
          <img src="/foundry-defi/24-defi-oracle-lib/defi-oracle-lib1.PNG" style="width: 100%; height: auto;">
          
          Let start by creating a libraries folder. In this folder, we'll make a new contract titled `OracleLib.sol`. The purpose of this contract is to ensure that the prices in the price feed aren't stale. Chainlink price feeds have a unique feature known as the heartbeat, which updates the prices every 3600 seconds.
          
          An essential check we need to enforce in our contract is that these prices should update every 3600 seconds. If not, our contract should pause its functionality. It's worth noting that by freezing our protocol's functionality, if Chainlink were to explode, that money will be frozen on the protocol. For now we'll recognize this as a known issue and move on.
          
          ## Creating The Check Function
          
          In a more advanced setting, when shifting towards a production product, even the smallest details start to matter more and more. Effective function creation becomes even more critical.
          
          First, we create a `staleCheckLatestRoundData()` function. The input parameter will take an `AggregatorV3Interface priceFeed`. This will be a public view function and would return different values like `uint80, int256, uint256, uint256`, and `uint80`.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity 0.8.19;
          
          import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
          ...
          library OracleLib {
              function staleCheckLatestRoundData(AggregatorV3Interface priceFeed) public view returns (uint80, int256, uint256, uint256, uint80){...}
          }
          ```
          
          In this function, we will call `priceFeed.latestRoundData()`. Since each price feed has its own heartbeat, we should ask them what their heartbeat is. For simplicity, we hardcode ours for `three hours`.
          
          We calculate the seconds since the last price update, and if it's greater than our timeout, we revert with a new error: `Oraclelib__StalePrice()`.
          
          ```js
          library OracleLib {
              error OracleLib__StalePrice();
          
              uint256 private constant TIMEOUT = 3 hours;
          
              function staleCheckLatestRoundData(AggregatorV3Interface priceFeed) public view returns (uint80, int256, uint256, uint256, uint80){
                  (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = priceFeed.latestRoundData();
          
                  uint256 secondsSince = block.timestamp - updatedAt;
                  if(secondsSince > TIMEOUT) revert OracleLib__StalePrice();
                  return (roundId, answer, startedAt, updatedAt, answeredInRound)
              }
          }
          ```
          
          Now, in our `DSCEngine`, every time we call `latestRoundData`, we swap it out for `staleCheckLatestRoundData`, thanks to our library.
          
          Make sure to remember to import `Oraclelib` from libraries and to specify the that we're using it for `AggregatorV3Interface`s.
          
          ```js
          ...
          import {OracleLib} from "./libraries/OracleLib.sol";
          ...
          contract DSCEngine is ReentrancyGuard{
              ...
              using OracleLib for AggregatorV3Interface;
              ...
              function getUsdValue(address token, uint256 amount) public view returns (uint256){
                  AggregatorV3Interface priceFeed = AggregatorV3Interace(s_priceeFeeds[token]);
                  (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
                  ...
              }
              ...
          }
          ```
          
          Note: There are more functions than shown here that will need updating!
          
          Once all of these changes have been done, run the `forge test` which will run the entire test suite, including the new invariant test suite. Following a successful run, we can conclude that our code is functioning as expected!
          
          ## Future Considerations
          
          Although we've done a lot of refactoring, there are still several ways the code can be improved. For example, writing additional tests for the contacts. Running `forge coverage` can help identify areas needing improvement.
          
          <img src="/foundry-defi/24-defi-oracle-lib/defi-oracle-lib3.PNG" style="width: 100%; height: auto;">
          
          Let's mark this as our next step — testing these contracts more thoroughly to ensure that we've covered all the possible edge cases and have robust error-checking before pushing it to production. Until then — happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: f47144e5-fe2d-4dc1-94d8-ac79b2a044c1
        title: "Preparing your protocol for an audit"
        slug: preparing-your-protocol-for-an-audit
        duration: 2
        video_url: "dROpFGHP01O9aMaAzrZo5uWSelx2M5RrcxN1fKjOUEWI"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/25-defi-audit-prep/+page.md"
        description: |-
                    This lesson provides a comprehensive guide on preparing smart contracts for audits. It emphasizes the importance of audits, offers a readiness checklist, and introduces the concept
        markdown_content: |-
          ---
          title: Audit Prep
          ---
          
          _Follow along the course with this video._
          
          
          
          # Preparing for Your Smart Contract Audit: A Comprehensive Guide
          
          In the vast and rapidly evolving world of smart contracts, security is paramount. While the course encompasses various aspects of smart contract development, one topic that we've briefly touched upon, but warrants a closer, more focused discussion is that of **smart contract audits**. While we've yet to delve deep into the details of security, this section aims to provide some guidance on preparing for smart contract audits.
          
          <img src="/foundry-defi/25-defi-audit-prep/defi-audit-prep1.png" style="width: 100%; height: auto;">
          
          ## What Are Smart Contract Audits?
          
          A smart contract audit involves thorough scrutinizing of the smart contract's codebase to identify potential security vulnerabilities, errors, or violation of best practices. Think of it as a rigorous debugging process that goes beyond just identifying errors — it ensures the robustness of your smart contract by checking that it functions as expected without any security threats.
          
          <img src="/foundry-defi/25-defi-audit-prep/defi-audit-prep2.PNG" style="width: 100%; height: auto;">
          
          ## Audit Readiness Checklist: Your Go-to Guide
          
          Now, you might wonder: Where should I begin? Good question, and here’s a head start: refer to the audit readiness checklist on the **[Nascent XYZ GitHub repo](https://github.com/nascentxyz/simple-security-toolkit/blob/main/audit-readiness-checklist.md)**.
          
          This checklist offers an array of pointers that you need to keep in mind while conducting your tests in preparation for the smart contract audit. It’s like a playbook, guiding you to ensure your smart contract codebase is on par with the best global standards.
          
          ## An Introduction to Security
          
          In case you're looking forward to gaining a fundamental grasp of security from a smart contract development perspective, stay tuned for the upcoming section of our course titled "**Introduction to Smart Contract Security**".
          
          We'll cover the nitty-gritty of security measures. This extensive section will delve into the lower level security facets that are vital for all smart contract developers.
          
          Understanding these security basics is crucial to ensure your smart contracts are safe, robust, and reliable within the blockchain network.
          
          <img src="/foundry-defi/25-defi-audit-prep/defi-audit-prep3.png" style="width: 100%; height: auto;">
          
          ## Wrapping Up
          
          A smart contract audit may seem daunting at first as it requires meticulous attention to detail, a thorough understanding of your codebase, and in-depth knowledge of the prevailing threats and vulnerabilities. However, it's an essential step in ensuring the safety and reliability of your smart contract protocols.
          
          The aforementioned audit readiness checklist will be your trusted ally through this process and don't forget to keep an eye out for our upcoming course section on security, which we're confident will prove invaluable.
          
          In the world of smart contract development, security isn't the most glamorous part of the job. But it's potentially the most important. By paying due attention to audits and security measures, you're not just bulletproofing your code; you're bolstering the integrity of the projects built on it. It's not just about finding and fixing flaws; it's about fostering trust.
          
          Stay tuned. Stay secure.
          
      -
        type: new_lesson
        enabled: true
        id: 8c36523c-6dbf-4c8c-adff-e14ed269494d
        title: "Section recap"
        slug: defi-recap
        duration: 4
        video_url: "zhV1jNdbP7fQ5L40002XQ1UkM00WSZYED00vt4QJPL00LoBo"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/26-defi-recap/+page.md"
        description: |-
                    This lesson serves as a comprehensive recap of the advanced project covered in the Web 3.0 course. It celebrates the milestones achieved in exploring varied concepts such as Decentralized Finance (DeFi), advanced fuzzing techniques, digital security, and working with Oracle
        markdown_content: |-
          ---
          title: DeFi Recap
          ---
          
          _Follow along the course with this video._
          
          
          
          # Celebrating a Milestone In Web 3.0 Project Development
          
          In the world of programming and development, nothing quite matches the thrill, satisfaction, and accomplishment felt when navigating through a complex project and finally bringing it all together. This sense of achievement isn't just well-deserved, it is 1000% a badge of honor you should proudly display on your GitHub repo. If you've successfully navigated this far through the hardest, most complicated, and most advanced project in our Web 3.0 course, I tip my hat to you.
          
          This section will recap the intricacies and nuances of our recent project, celebrate the milestones achieved, and look forward to what's next.
          
          ## Diving Into the Deep End of Web 3.0
          
          <img src="/foundry-defi/26-defi-recap/defi-recap1.png" style="width: 100%; height: auto;">
          
          This project drew on varied and cutting-edge concepts, many of which are at the forefront of Web 3.0's evolutionary curve. We delved into Decentralised Finance (DeFi), got hands-on with state-of-the-art fuzzing techniques and even dipped our toes into the landscape of digital security. We wrote an enormously advanced test suite, worked with Oracles, and built deploy scripts from scratch.
          
          In all these, the emphasis was on leveraging safer methods and learning through interaction with diverse libraries. The course project also explored `failOnRevert`s and runs and depth of invariance tests.
          
          Yet, the journey has not been devoid of learning omissions. We've not covered the crafting of a proper README. This is a 100% essential part of any comprehensive project and I strongly recommend you write one. To understand what it entails, you can refer to the [foundry-defi-stablecoin-f23 README](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/README.md) for more clarity on its structure and content.
          
          As I've said before, this project is lined up for an audit. The journey, as well as the audit reports, will be diligently documented in a new branch on this repository. Follow it and you can take cues from it for your own project's security journey. To successfully launch production code, you need to intimately understand security paths and the mechanics at play.
          
          ## Time to Recharge
          
          The labour of software development can be taxing, which is why after your glorious achievement, you deserve a break. After your well-earned rest, I urge you to push this codebase up to GitHub and start tidying it - removing any redundant code and adding comments where necessary.
          
          There's also an identified glaring issue with this project, which you might consider as your next challenge - perfect for after a break. Our code becomes insolvent if the price of the assets collapse too quickly. Perhaps you can come up with an ingenious way to fix it, and then maybe even launch your own stablecoin. Why not, right?
          
          ## Three More Steps To Glory
          
          <img src="/foundry-defi/26-defi-recap/defi-recap2.PNG" style="width: 100%; height: auto;">
          
          Energized after your break? Great! We only have three more lessons left to conclude this course. Here's a peek at what's coming next:
          
          - Lesson 13: Foundry Upgrades
          - Lesson 14: Foundry Governance | Plutocracy (And why it's bad)
          - Lesson 15: Introduction to Smart Contract Security (All security interested parties...get here)
          
          These topics are significantly more manageable than what you've already faced in the previous lessons. So ease back into your seat, and get ready for the next exciting stage of your Web 3.0 journey.
          
          Pat yourself on the back, and relish in the success of coming this far, it’s a milestone worth celebrating. Just three more steps, and you will have triumphantly conquered this comprehensive course. Here's to those final steps, and to seeing you at the finish line very soon!
          
      -
        type: new_lesson
        enabled: true
        id: 579492c9-95ff-411e-8149-1ee0c1967c98
        title: "Bonus: introduction to Lens Protocol"
        slug: introduction-to-lens-protocol
        duration: 3
        video_url: "Di002edtFQzrQtdHOafJhwWQGjzLYKyB7Zm01iifJ2NVg"
        raw_markdown_url: "/routes/advanced-foundry/3-defi/27-defi-lens-protocol/+page.md"
        description: |-
                     This bonus lesson introduces the Lens Protocol, a decentralized social platform by the Aave team, presented by Nader Dabit, the head of DevRel for Lens Protocol. Lens Protocol empowers developers to build social media applications in the decentralized space, leveraging Web3 features such as native payments, ownership, and composability.
        markdown_content: |-
          ---
          title: Lens Protocol
          ---
          
          _Follow along the course with this video._
          
          
          
          # Understanding Lens Protocol - The Decentralized Social Layer of Web3
          
          Hello everyone, in today's section we are delving into the trenches of protocols that are not just pushing the envelope, but actively redefining the possibilities of the Web3 community. I absolutely <3 the Aave Protocol and the Aave team's consistent efforts in delivering protocols, products, and services that are enhancing the Web3 space.
          
          One such noteworthy protocol is the Lens Protocol. Noted as a decentralized social platform, it enables building social media applications in the decentralized space. To provide a detailed overview of the Lens Protocol, we have Nader Dabit, the head of DevRel for Lens Protocol at the Aave team.
          
          <img src="/foundry-defi/27-defi-lens-protocol/defi-lens-protocol2.PNG" style="width: 100%; height: auto;">
          
          ## Embracing Web3 with Lens Protocol
          
          Hello folks! I'm Nader Dabit, walking you through a quick introduction of Lens Protocol and its relevance to you as a smart contract or solidity engineer.
          
          Lens, the social layer of Web3, equips developers with the power to construct social applications or include social features in their current applications. With a whopping 4.9 billion users globally using social applications, it is a feature widely recognized and valued.
          
          These applications open the gateway to numerous value propositions, enabling developers to tap and exploit the opportunities they present. When combined with Web3 features like native payments, ownership, and composability, it elevates the potential to new heights offering much more robustness when compared to traditional social applications or infrastructure.
          
          ## Expanding the Horizons with Custom Modules
          
          Lens allows developers to expand the core smart contracts by developing their custom modules. Imagine if Twitter, Instagram, or other social applications allowed developers to submit pull requests into their backends and APIs. This ability instigates a lot of captivating and potent functionality, inspiring developers to integrate innovative ideas into their applications, and branch out into other aspects of Web3 like DeFi.
          
          <img src="/foundry-defi/27-defi-lens-protocol/defi-lens-protocol3.png" style="width: 100%; height: auto;">
          
          Moreover, Lens Smart Contracts can be invoked from other smart contracts. This flexibility facilitates developers aiming to build something composable with the Web3 social graph, making Lens an excellent platform to integrate.
          
          ## Get On Board: Start Building on Lens
          
          For those eager to get their hands dirty and start building on Lens, head over to the [Lens Documentation](https://docs.lens.xyz/docs). Don't forget to explore ways to deploy the protocol independently, get a closer look at the smart contract code, and fiddle around with it. Learn about creating and building your custom modules.
          
          Stay tuned for more exciting insights and updates. Until next time, happy coding!
          
          <img src="/foundry-defi/27-defi-lens-protocol/defi-lens-protocol1.png" style="width: 100%; height: auto;">
          
          In closing,
          
          <img src="/foundry-defi/27-defi-lens-protocol/defi-lens-protocol4.PNG" style="width: 100%; height: auto;">
          
    type: new_section
    enabled: true
  -
    title: "Upgradeable Smart Contracts"
    slug: upgradeable-smart-contracts
    lessons:
      -
        type: new_lesson
        enabled: true
        id: fd66fe6b-cd83-46cd-b817-3d9a23889789
        title: "Introduction"
        slug: introduction-to-upragadeable-smart-contracts
        duration: 16
        video_url: "OKbeDAYLsKw02HgcXpHz6ZczBkD3CzVgK202KlofprWEU"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/1-upgradeable/+page.md"
        description: |-
                    An introduction to upgradable smart contracts, discussing their advantages, risks, and different upgrade methodologies.
        markdown_content: |-
          ---
          title: Upgradeable Smart Contracts & Proxies
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          Welcome to another informative blog post on the world of smart contracts. In this lesson, we will take a closer look at upgradable smart contracts, exploring the good, the bad, and the vital information you need to use them.
          
          To put this into perspective, upgradable smart contracts are a complex subject with potential drawbacks, which isn't the best route to default on. They sound great in theory, promising flexibility and adaptability. However, we've repeatedly seen that when there's too much centralized control over contracts, problems arise.
          
          <img src="/upgrades/1-intro/upgrade1.png" style="width: 100%; height: auto;">
          
          Let's dig deeper to understand the nuance of this subject and why it's important for your career as a smart contract developer.
          
          <img src="/upgrades/1-intro/upgrade2.png" style="width: 100%; height: auto;">
          
          ## What Are the Downside of Upgradable Smart Contracts?
          
          If you asked for real-life examples of where the potential downsides of upgradable smart contracts have manifested, it's safe to say we've got plenty. From hacks to lost funds, the risks are real.
          
          This is where the immutable nature of smart contracts comes in - a feature that developers cherish since it implies that once a contract is deployed, nobody can modify or tamper with it. Interesting enough, the unchangeable aspect can become a pain if we want to upgrade a contract to perform new functions or squash a bug.
          
          The exciting thing is, though the code deployed to an address is immutable, there's still room for change. In fact, smart contracts update all the time. Think token transfers or any functionality really—they frequently update their balances or variables. In other words, while the logic remains unchangeable, the contracts aren't as static as they seem.
          
          ## Upgrading Your Smart Contracts: A Guided Approach
          
          So, if upgrading smart contracts tampers with their essential immutability, how can we approach the situation more wisely? Let's look at three different patterns or philosophies we can use:
          
          1. Not really upgrading
          2. Social migration
          3. Proxy (with subcategories like metamorphic contracts, transparent upgradable proxies, and universal upgradable proxies)
          
          ### Not Really Upgrading
          
          The "Not Really Upgrading" method is the simplest form of "upgrading" a smart contract. The idea here is parameterizing everything—the logic we've deployed is there and that's what users interact with. This involves having setter functions that can change certain parameters.
          
          For instance, if you have a set reward that distributes a token at a 1% rate every year, you can have a setter function to adjust that distribution rate. While it's easy to implement, it has limitations: unless you anticipated all possible future functionality when writing the contract, you won't be able to add it in the future.
          
          Another question that arises is—who gets access to these functions? If a single person holds the key, it becomes a centralized smart contract, going against decentralization's core principle. To address this, you can add a governance contract to your protocol, allowing proportional control.
          
          ### Social Migration
          
          In line with maintaining the immutability of smart contracts, another method is social migration. It involves deploying a new contract and socially agreeing to consider the new contract as the 'real' one.
          
          It has some significant advantages, the main being the adherence to the essential immutability principle of smart contracts. With no built-in upgradeability, the contract will function the same way, whether invoked now or in 50,000 years. But one major disadvantage is that you'd now have a new contract address for an already existing token. This would require every exchange listing your token to update to this new contract address.
          
          Moving the state of the first contract to the second one is also a challenging task. You need to devise a migration method to transport the storage from one contract to the other. You can learn more about the social migration method from [this blog post](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) written by Trail of Bits.
          
          ### Proxies
          
          Finally, let's talk about proxies, the holy grail of smart contract upgrades. Proxies allow for state continuity and logical updates while maintaining the same contract address. Users may interact with contracts through proxies without ever realizing anything changed behind the scenes.
          
          There are a ton of proxy methodologies, but three are worth discussing here: Transparent Proxies, Universal Upgradable Proxies (UPS), and the Diamond Pattern. Each has its benefits and drawbacks, but the focus is on maintaining contract functionality and decentralization.
          
          ## Key Takeaways
          
          Dealing with upgradable smart contracts can be complex, but understanding the pros and cons helps in making the right decision while developing smart contracts. Do remember that upgradable smart contracts might have their advantages, but they also come with their possible drawbacks, such as centralized control and increased potential for breaches. Always weigh the necessity against the risks before deciding on using upgradable smart contracts.
          
          That was it for todays lesson. I hope you enjoyed it and learned something new. We well see you again on the next chapter so keep learning and keep building!
          
      -
        type: new_lesson
        enabled: true
        id: 13e81a5e-dda3-4896-9b0e-aa35d292c0e8
        title: "Using Delegatecall"
        slug: solidity-delegate-call
        duration: 9
        video_url: "HSgB00UeqF00dz900ivWqMTMNtfcgUGrbewxBrFFaHhhAc"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/2-delegate-call/+page.md"
        description: |-
                    Detailed explanation of delegate call in Solidity, its differences from regular call functions, and its implications in smart contracts.
        markdown_content: |-
          ---
          title: Delegate Call
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          In this lesson, we're going to go deep on Upgradeable Smart Contracts specially on the `Delegate Call`, how to construct proxies and upgradable smart contracts. This forms a fundamental part of the blockchain space, especially when building efficient and investor-friendly decentralized applications.
          
          ## Delegate Call vs Call Function
          
          Similar to a call function, 'delegate call' is a fundamental feature of Ethereum. However, they work a bit differently. Think of delegate call as a call option that allows one contract to borrow a function from another contract.
          
          To illustrate this, let's look at an example using Solidity - an object-oriented programming language for writing smart contracts.
          
          ```javascript
          contract B {
              // NOTE: storage layout must be the same as contract A
              uint256 public num;
              address public sender;
              uint256 public value;
          
              function setVars(uint256 _num) public payable {
                  num = _num;
                  sender = msg.sender;
                  value = msg.value;
              }
          }
          
          ```
          
          Our Contract B has three storage variables (`num`, `sender` and `value`), and one function `setVars` that updates our `num` value. In Ethereum, contract storage variables are stored in a specific storage data structure that's indexed starting from zero. This means that `num` is at index zero, `sender` at index one and `value` at index two.
          
          Now, let's deploy another contract - Contract A. This one also has a `setVars` function. However, it makes a delegate call to our Contract B.
          
          ```javascript
          contract A {
              uint256 public num;
              address public sender;
              uint256 public value;
          
              function setVars(address _contract, uint256 _num) public payable {
                  // A's storage is set, B is not modified.
                  // (bool success, bytes memory data) = _contract.delegatecall(
                  (bool success, ) = _contract.delegatecall(
                      abi.encodeWithSignature("setVars(uint256)", _num)
                  );
                  if (!success) {
                      revert("delegatecall failed");
                  }
              }
          }
          ```
          
          Normally, if `contract A` called `setVars` on `contract B`, it would only update `contract B's` `num` storage. However, by using delegate call, it says "call `setVars` function and then pass `_num` as an input parameter but call it in _our_ contract (A). In essence, it 'borrows' the `setVars` function and uses it in its own context.
          
          ## Understanding Storage in Delegate Call
          
          It's interesting to see how delegate call works with storage on a deeper level. The borrowed function (`setVars` of Contract B) doesn't actually look at the names of the storage variables of the calling contract (Contract A) but instead, at their storage slots.
          
          If we used the `setVars` function from Contract B using delegate call, first storage slot (which is `firstValue` in Contract A) will be updated instead of `num` and so on.
          
          One other important aspect to remember is, the data type of the storage slots in Contract A does not have to match that of Contract B. Even if they are different, delegate call works by just updating the storage slot of the contract making the call.
          
          ## Wrap Up
          
          In conclusion, delegate call is a very handy function in Solidity that allows one contract to 'borrow' a function from another. However, care should be taken when using it as the storage slots in the calling contract get updated directly, without looking at the variable names or data types. It might lead to unpredictable behavior if overlook this aspect.
          
          Feel free to experiment with different contracts and function calls to witness delegate call in action. But remember, "With great power, comes great responsibility!"
          
      -
        type: new_lesson
        enabled: true
        id: 8efd33a4-8933-4287-9fa8-278c4d22007f
        title: "Overview of the EIP-1967"
        slug: what-is-eip-1967
        duration: 12
        video_url: "ZryEwl02r4nLF02NanpG1VBmXo32oYsDB00tkm3pkezizM"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/3-eip-1967/+page.md"
        description: |-
                    Overview of EIP-1967 and its role in proxy contracts, including a practical guide on building a minimalistic proxy.
        markdown_content: |-
          ---
          title: EIP-1967 Proxy
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          Have you ever wondered how a contract can be used as a singular address, but the underlying code can change? Buckle up, because we'll be exploring this topic by building a simple yet fascinating contract known as a “Proxy Contract”.
          
          ## Before we begin
          
          This walkthrough requires some advanced understanding of Ethereum and Solidity. However, if you're passionate about learning the ropes, feel free to tag along. We'll be basing our coding process on the Hardhat upgrades library.
          
          You can find this library in the course repo, `SmallProxy.sol` template. Here's the Code: [Code Link](https://github.com/Cyfrin/foundry-upgrades-f23/blob/main/src/sublesson/SmallProxy.sol)
          
          ## Welcome to the world of Proxy Contracts
          
          We start with a minimalistic starting proxy template from OpenZeppelin library called `SmallProxy.sol`. This is a low-level contract built mostly in assembly, Yul.
          
          **Yul, you ask?**
          
          Yul is an intermediate language that can be compiled to bytecode for different backends. It allows developers to write difficult yet super effective low-level code close to the opcodes.
          
          <img src="/upgrades/3-proxy/proxy1.png" style="width: 100%; height: auto;">
          
          In our proxy contract, we have this `delegate()` function that uses inline assembly (Yul). Though it does many things, its main job is to perform delegate call functionality.
          
          The proxy utilizes two generic fallback functions to process unrecognized function calls:
          
          1. **Fallback:** Anytime the proxy contract receives data for an unrecognized function, it triggers a callback that involves our `delegate()` function.
          2. **Receive:** Whenever it receives a function it doesn't recognize, it'll call `Fallback` and `Fallback` calls our `delegate()` function.
          
          Through these fallback functions, the contract processes data for an unrecognized function and delegates it to the implementation contract through delegate call.
          
          ## Building a Minimalistic Proxy
          
          With our understanding in place, let's take it a step further by setting and reading our implementation addresses.
          
          The proxy we'll be creating will feature a function called `setImplementation()` which "upgrades" the smart contract by changing the delegated calls' recipient.
          
          The `_implementation()` function will be there for us to see where the implementation contract is. There's one thing you need to know though:
          
          <img src="/upgrades/3-proxy/proxy2.png" style="width: 100%; height: auto;">
          
          This is where EIP 1976 comes into play. It’s an Ethereum Improvement Proposal for using certain storage slots specifically for proxies. We'll use EIP 1976 to store our implementation's address by assigning it into a constant storage slot.
          
          The logic of our proxy will operate like this: If any contract calls our proxy contract excluding the `setImplementation` function, it'll be passed over to the stored implementation address from our constant storage slot.
          
          Let's take it step by step though.
          
          1. **Step 1 - Building the Implementation Contract**: We’ll start by creating a dummy contract `implementation A`. This contract will have a uint256 public value and a function to set the value.
          
          ```js
          contract ImplementationA {
              uint256 public value;
          
              function setValue(uint256 newValue) public {
                  value = newValue;
              }
          }
          ```
          
          2. **Step 2 - Creating a Helper Function**: So that we can easily figure out how to get the data, we'll create a helper function named `getDataToTransact`.
          
          ```js
          function getDataToTransact(
                  uint256 numberToUpdate
              ) public pure returns (bytes memory) {
                  return abi.encodeWithSignature("setValue(uint256)", numberToUpdate);
              }
          ```
          
          3. **Step 3 - Reading the Proxy**: Next up, we create a function in Solidity named `readStorage` to read our storage in small proxy.
          
          ```js
          function readStorage()
                  public
                  view
                  returns (uint256 valueAtStorageSlotZero)
              {
                  assembly {
                      valueAtStorageSlotZero := sload(0)
                  }
              }
          }
          ```
          
          4. **Step 4 - Deployment and Upgrading**: We'll now go ahead and deploy our small proxy and implementation A. Let’s grab implementation A's address and feed it into the `set implementation` function.
          5. **Step 5 - The Core Logic**: When we call the small proxy with data, it's going to delegate our call to implementation A and save the storage in the small proxy address. To process this, the proxy will use the `set value` function selector and update our small proxy's storage.
          6. **Step 6 - _Isometrics_**: To ensure that our logic works correctly, we'll read the output from the function `read storage`. To make this test even more exciting, let's create a new implementation contract `Implementation B` and update our code.
          
          Every time someone calls `set value`, the function will return `new value + 2` instead of just the new value. We recompile and redeploy this contract then run `set implementation` with `Implementation B's` address.
          
          The moment of truth? If we call our small proxy using the same data, then `read storage` should now return `779`.
          
          ## Wrapping Up
          
          This is just a simple representation of how we can upgrade contracts in Ethereum. With proxy contracts, clients can always interact with a single address (the proxy address) and have their function calls processed correctly even when the underlying logic changes.
          
          Just a heads up though, it is crucial to ensure that you understand who has access to upgrade the contract. If a single person can upgrade it, then we risk making our contract a single point of failure and the contract isn't even decentralized.
          
          The proxy contract I used is simple and comes with its own share of limitations. Notably, it can't process function receiver clashes correctly. For example, if we have a function `set implementation` in the proxy and implementation, the proxy's function is the one that is always called.
          
          To deal with these and other similar issues, there are two popular proxy patterns to consider; `Transparent` and `Universal upgradable proxy`.
          
          Notwithstanding, don't hesitate to make a new discussion about proxies in the discussions thread if you still find them perplexing.
          
          This section is very advanced and requires a deep understanding of the previous sublessons. I strongly recommend that you growth hack your understanding by playing around with Solidity and remix.
          
          Believe it or not, this is one of those areas where seeing is believing. So, don't just read here! Jump into remix and play around with this functionality. Break and fiddle till you get the hang of it.
          
          **Happy learning!**
          
      -
        type: new_lesson
        enabled: true
        id: d18db6a9-9601-4a3e-9b08-74f7ac8f3ac5
        title: "OpeZeppelin UUPS proxies"
        slug: introduction-to-uups-proxies
        duration: 22
        video_url: "QmeMmXDZhYJekvFcyJDUbb2oack7ywZXSAMRVrdeSDk"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/4-uups/+page.md"
        description: |-
                    Introduction to UUPS (Universal Upgradeable Proxy Standard) proxies in OpenZeppelin, showcasing their setup and usage.
        markdown_content: |-
          ---
          title: UUPS Setup
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          ## Building an Upgradable Solidity Contract with Delegate Call
          
          In today's sublesson, we are going to delve into the depths of Solidity; we're going to write an upgradable contract utilizing the power of the delegate call function. We will not only cover the theory but also offer a full example and walk you through it step by step.
          
          
          ## Let's Get Started
          
          First, we are going to create a new directory for our project called `foundry-upgrades-f23`.
          
          ```shell
          mkdir foundry-upgrades-f23
          cd foundry-upgrades-f23
          ```
          
          Now, remember we recently mentioned the Transparent Proxy pattern and the UUPS Proxy pattern. Today, we will primarily focus on the latter. UUPS Proxy is a more robust pattern which allows upgrades to be handled by the contract implementation and can be removed eventually. This is immensely crucial if we want to make our contract upgrade as seldom as possible staying as close as possible to complete immutability.
          
          Now, let's initialize our project with:
          
          ```shell
          forge init
          ```
          
          After setup, we will delete the unnecessary files and start to build our very own minimal contracts: `BoxV1.sol` and `BoxV2.sol`.
          
          ### BoxV1
          
          ```javascript
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
          import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
          import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
          
          contract BoxV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
              uint256 internal value;
          
              /// @custom:oz-upgrades-unsafe-allow constructor
              constructor() {
                  _disableInitializers();
              }
          
              function initialize() public initializer {
                  __Ownable_init();
                  __UUPSUpgradeable_init();
              }
          
              function getValue() public view returns (uint256) {
                  return value;
              }
          
              function version() public pure returns (uint256) {
                  return 1;
              }
          
              function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
          }
          ```
          
          ### BoxV2
          
          ```js
          /// SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
          import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
          import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
          
          contract BoxV2 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
              uint256 internal value;
          
              /// @custom:oz-upgrades-unsafe-allow constructor
              constructor() {
                  _disableInitializers();
              }
          
              function initialize() public initializer {
                  __Ownable_init();
                  __UUPSUpgradeable_init();
              }
          
              function setValue(uint256 newValue) public {
                  value = newValue;
              }
          
              function getValue() public view returns (uint256) {
                  return value;
              }
          
              function version() public pure returns (uint256) {
                  return 2;
              }
          
              function _authorizeUpgrade(
                  address newImplementation
              ) internal override onlyOwner {}
          }
          ```
          
          In `V2`, we introduce another function — `setNumber()`. We have prepared the `BoxV1` contract initially, and will upgrade it to `V2` after deployment.
          
          
          
          ## Implementing UUPS Upgradable Contract
          
          Next, we need to define our `UUPSUpgradable` contract.
          
          Remember we don't want to use a constructor in our implementation because the Proxy doesn't call the constructor when a contract is initialized. Instead, we need to utilize an **initializer function** to replace the constructor logic.
          
          A function marked with the `initializer` modifier can be initialized **only once**. It's a way to define a constructor for contracts that are meant to be used via Proxy, without the typical Solidity constructor's downside.
          
          ```javascript
          function _authorizeUpgrade(
                  address newImplementation
              ) internal override onlyOwner {}
          ```
          
          The authorize upgrade function will give us control over who can upgrade the contract. You can replace it based on your authorization scheme. For simplicity, we'll leave it blank here, implying that anyone can upgrade the contract.
          
          Another crucial detail to consider is the Proxy storage. **Proxies only point to storage slots, not variable names**. This behavior could lead to collisions when new storage slots are added. For example, say you upgrade from `V1` to `V2`. If `V1` has the variable `number` at storage slot `0`, and you add another variable `otherNumber` to `V2` also at storage `slot`, the old `number` variable will be overwritten by `otherNumber`.
          
          
          And that's it. We created an initial contract `Box V1` and a simple upgrade version of it `Box V2`. Of course, these are basic contracts, and real-world contracts will need more thorough authorization and verification processes when it comes to upgradeability.
          
          **Remember**, when you upgrade contracts, you change the contract address and all calls are redirected to the new contract. Your users need to trust you, or the decentralized governance scheme, with the upgrade. After all, a rogue implementation can ruin a well-designed contract and its users.
          
          So, as a developer, you need to execute upgrades judiciously and sparingly, always focusing on creating well-tested and audited contracts.
          
          Stay tuned for more posts about Solidity development and best practices!
          
          
      -
        type: new_lesson
        enabled: true
        id: 816cc425-4b4c-45b1-a8be-0b7593b6d0c9
        title: "Deploy upgreadable smart contracts"
        slug: deploy-upgreadable-smart-contracts
        duration: 5
        video_url: "z016vkBYOQIIgOmpE02YjxM02Ael2i8R1a9Jq2alzB021r8"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/5-uups-deploy/+page.md"
        description: |-
                    Guide on deploying upgradeable smart contracts, focusing on the deployment process and best practices.
        markdown_content: |-
          ---
          title: UUPS Deploy
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          
          
          In this blog post, I am going to give you a walkthrough on how to upgrade and deploy upgraded contracts using Solidity, more specifically, boxes. By the end of this guide, you'll be able to deploy an upgradeable box contract from the same address.
          
          Here's the roadmap for this blog post:
          
          1. Deploy Box v1
          2. Get an address
          3. Verify that functions work
          4. Deploy Box v2
          5. Point Proxy to Box v2
          
          Ready? Let's make the magic happen!
          
          ### Deployment Script - `deployBox.sol`
          
          First off, we'll create a script named `deployBox.sol`, which will be responsible for deploying our Box. Also, we'll create another one called `upgradeBox.sol` that will help to upgrade it later on. Here's what the `deployBox.sol` script looks like:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {Script} from "forge-std/Script.sol";
          import {BoxV1} from "../src/BoxV1.sol";
          import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
          
          contract DeployBox is Script {
              function run() external returns (address) {
                  address proxy = deployBox();
                  return proxy;
              }
          
              function deployBox() public returns (address) {
                  vm.startBroadcast();
                  BoxV1 box = new BoxV1();
                  ERC1967Proxy proxy = new ERC1967Proxy(address(box), "");
                  vm.stopBroadcast();
                  return address(proxy);
              }
          }
          ```
          
          Please note that this SPX license and pragma version can differ based on your needs and project's requirements.
          
          Here, the `DeployBox()` function creates a new instance of the `BoxV1` contract.
          
          
          If everything is coded correctly, it should compile without any issues.
          
          <img src="/upgrades/5-deploy/uup-deploy1.png" style="width: 100%; height: auto;">
          
          ### Now, let's see this in action...
          
          This tutorial is not just about compiling code but also about making it work in real-time. The next steps will involve writing tests to facilitate execution and to ensure everything is working as expected. Stay tuned for the detailed rundown of those steps in the upcoming posts.
          
          We'll be deploying `Boxv1`, get it's proxy address, and then we're going to upgrade it to `Boxv2`. All from the same address.
          
          We'll cover that in the next blog post, so hang on tight!
          
          There's more to Solidity and Proxy contracts than meets the eye, and with this proxy in particular, you're sure to upgrade your Solidity contracts with utmost efficiency.
          
          
      -
        type: new_lesson
        enabled: true
        id: d3063f5c-4cd7-4fb6-aa35-5163adac7575
        title: "Upgrade UUPS proxy smart contracts"
        slug: uups-upgrade
        duration: 6
        video_url: "2XOgdZs4rPMkUq01pJsPPMYzWf7ZwwuWE2k8UiVAcnvY"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/6-uups-upgrade/+page.md"
        description: |-
                    Tutorial on upgrading UUPS proxy smart contracts, including script writing and execution.
        markdown_content: |-
          ---
          title: UUPS Upgrade
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          On this sublesson we are going to write the script to upgrade the Box contract we made on past sublessons using a new contract called `UpgradeBox.s.sol`.
          
          ##  Write and Deploy an Upgrade Box Script
          
          Having installed the DevOps tool, let's move to the meat and potatoes: the upgrade box script creation.
          
          We'll start by defining our pragma and importing the necessary dependencies
          
          ```js
          pragma solidity ^0.8.19;
          
          import {Script} from "forge-std/Script.sol";
          import {BoxV1} from "../src/BoxV1.sol";
          import {BoxV2} from "../src/BoxV2.sol";
          import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
          import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
          ```
          
          Define a function, `run`, which will return the proxy
          
          ```js
          function run() external returns (address) {
                  address mostRecentlyDeployedProxy = DevOpsTools
                      .get_most_recent_deployment("ERC1967Proxy", block.chainid);
          
                  vm.startBroadcast();
                  BoxV2 newBox = new BoxV2();
                  vm.stopBroadcast();
                  address proxy = upgradeBox(mostRecentlyDeployedProxy, address(newBox));
                  return proxy;
              }
          ```
          
          
          
          ## Upgrade the Box
          
          
          Initializing a proxy upgrade, we'll create a new function `upgradeBox`. This function will take in two parameters: the address of our deployed proxy and the address of our newly deployed Box v2. We will then return the proxy address.
          
          ```js
           function upgradeBox(
                  address proxyAddress,
                  address newBox
              ) public returns (address) {
                  vm.startBroadcast();
                  BoxV1 proxy = BoxV1(payable(proxyAddress));
                  proxy.upgradeTo(address(newBox));
                  vm.stopBroadcast();
                  return address(proxy);
              }
          ```
          
          
          So if the journey was a bit challenging, let's summarize what's actually happening in layman's terms.
          
          <img src="/upgrades/6-upgrade/up1.png" style="width: 100%; height: auto;">
          
          Simple, right? Don't believe it yet? It's alright, let's prove it with a test!
          
          For now, happy coding!
          
          
      -
        type: new_lesson
        enabled: true
        id: 26f63889-34b4-4866-aaea-6f69e0203a02
        title: "Testing UUPS proxies"
        slug: uups-tests
        duration: 6
        video_url: "8UyOk5AU4TlyD4tR5drnQsDK67CAfDSinTH3sFPI3zI"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/7-uups-tests/+page.md"
        description: |-
                    A practical session on testing UUPS proxies, ensuring functionality and successful upgrades.
        markdown_content: |-
          ---
          title: UUPS Tests
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          Welcome back friend we just created, deployed and upgraded our Box contract on previous lessons, today we are going to delve on good old tests to be sure everything works as expected.
          
          ## Setting up Our Testing Environment
          
          We will be creating a new Sol file where we will write some initial tests called `DeployAndUpgradeTest`, to demonstrate the true power of smart contract upgrades. As we are working with Solidity 0.8.18, we’ll be importing a test from Forge's standard test.sol file. And the Standard imports as always, Code-wise, it will look something like this:
          
          ```js
          // SPDX-License-Identifier: MIT
          
          pragma solidity ^0.8.19;
          
          import {DeployBox} from "../script/DepolyBox.s.sol";
          import {UpgradeBox} from "../script/UpgradeBox.s.sol";
          import {Test, console} from "forge-std/Test.sol";
          import {StdCheats} from "forge-std/StdCheats.sol";
          import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
          import {BoxV1} from "../src/BoxV1.sol";
          import {BoxV2} from "../src/BoxV2.sol";
          
          contract DeployAndUpgradeTest is StdCheats, Test {}
          ```
          
          <img src="/upgrades/7-tests/test1.png" style="width: 100%; height: auto;">
          
          
          ## Setting Up the Contract and Initial Tests
          
          Next, we proceed with creating a function setup. This function will aim to prepare the environment for testing. In this setup function we will define a *deployBox*, *upgradeBox*, and an owner address.
          
          ```js
           function setUp() public {
                  deployBox = new DeployBox();
                  upgradeBox = new UpgradeBox();
              }
          ```
          
          Now let's dive on the most basic test, check if the Box Works:
          
          ```js
          function testBoxWorks() public {
                  address proxyAddress = deployBox.deployBox();
                  uint256 expectedValue = 1;
                  assertEq(expectedValue, BoxV1(proxyAddress).version());
              }
          ```
          
          ## Implementing the Upgrade
          
          In doing this, we will first define our *boxV2* and then proceed to upgrade *boxV1* to *boxV2* using our upgrade functionality. We will use assertions for these tests and validate whether the upgraded proxy now points to *boxV2*.
          
          ```js
            function testUpgradeWorks() public {
                  address proxyAddress = deployBox.deployBox();
          
                  BoxV2 box2 = new BoxV2();
          
                  vm.prank(BoxV1(proxyAddress).owner());
                  BoxV1(proxyAddress).transferOwnership(msg.sender);
          
                  address proxy = upgradeBox.upgradeBox(proxyAddress, address(box2));
          
                  uint256 expectedValue = 2;
                  assertEq(expectedValue, BoxV2(proxy).version());
          
                  BoxV2(proxy).setValue(expectedValue);
                  assertEq(expectedValue, BoxV2(proxy).getValue());
              }
          ```
          
          In the code above, we first deploy our new `boxV2` contract, then upgrade our `boxV1` to `boxV2` by pointing the existing proxy to `boxV2`. We then validate this through the `assertEqual` function.
          
          Further, we also test whether functions that are unique to `boxV2` such as `setNumber` can be called on the updated `boxV2` through the proxy.
          
          <img src="/upgrades/7-tests/test2.png" style="width: 100%; height: auto;">
          
          
          Lastly, it's worth mentioning that we should add a function to ensure that proxy starts as `boxV1`. This function will be set to revert with the previous setup. As a result, when attempting to run the `setNumber` function on the proxy, it should fail.
          
          Now that we have all our tests in place, let's run these one at a time using `forge test`.
          
          <img src="/upgrades/7-tests/test3.png" style="width: 100%; height: auto;">
          
          
          And voila! We can see that proxy has been successfully upgraded from `boxV1` to `boxV2`. Such upgrades are a crucial part of smart contract development, as they allow you to deploy new features, fix bugs and more, all while preserving the addresses that interact with your contract.
          
          With the above guide, you now have a better understanding of how smart contract upgrades work. Good luck with crafting your own upgrades!
          
          
      -
        type: new_lesson
        enabled: true
        id: 174283fa-d2ad-473b-9b5d-e97b1a56fa50
        title: "Deploying the stablecoin on the testnet"
        slug: testnet-demo
        duration: 7
        video_url: "02oF7zLHGaJrmZ02S9sVtTldj5EzNdjqjnbSK2ghteGG8"
        raw_markdown_url: "/routes/advanced-foundry/4-upgradeable/8-testnet-demo/+page.md"
        description: |-
                    Demonstration of deploying stablecoin smart contracts on a testnet, covering the entire process from deployment to upgrade.
        markdown_content: |-
          ---
          title: Testnet Demo
          ---
          
          _**Follow along with this video.**_
          
          
          
          ---
          
          # Upgradable Smart Contracts: Unveiling The Mystery
          
          Hello, dear blog readers! I can barely contain my excitement as I eagerly wrap up the discussion on upgradable smart contracts that we just zoomed through. As a quick note, I encourage you all to engage in discussions, ask questions—ask away in the comments section, on Twitter or share your thoughts with your buddies. As you learn about the process, there is always something new to discover, question, and understand. So let the curiosity kitty out of the bag!
          
          ## Upgrades or no upgrades?
          
          I must stress this, while we just learned about upgrades, I'd strongly discourage you from sticking to this default setting in the world of protocols with upgradable smart contracts as it can create a centralization problem. Why, you ask? If you have an upgradable smart contract, that implies a group can modify the logic of that code at any point or be compelled to alter the logic. Having said that, knowing about delegate call—an incredibly potent primitive—is essential.
          
          With this, we're almost ready to proceed to the next steps.
          
          ## Let's Get Practical
          
          These steps aren't to stress you further ─ quite the contrary. Let's push this up to GitHub, add this to your portfolio and reward yourself with a well-earned break. Pat yourself on the back, because you've accomplished some pretty amazing work.
          
          
          Now, let’s deploy this phenomenal work to a testnet. I am going to go ahead and borrow a make file and then tweak it. To simplify our process, let's delete all the unnecessary stuff from the file and focus on the section of 'Deploy'.
          
          <img src="/upgrades/8-testnet-demo/testnet1.png" style="width: 100%; height: auto;">
          
          With just these few steps, we have our two contracts ready to roll! Next, moving to Sepolia etherscan, I realized that neither of them verified correctly. It’s not an issue though, we can always attend to it and manually verify it later.
          
          To proceed, I checked ‘My broadcast’ section in etherscan to identify which contract is which. Fun fact: ‘My broadcast’ is a great tool that details all your contract deployments and transactions.
          
          ### Box v1 and Upgrade Process
          
          The first contract created was named box v1. Now, it's a one-time exercise to copy this and paste it to verify manually later. Though it didn't quite verify initially, fret not, as I knew this was my box v1 with the correct address.
          
          The next contract doesn't have a name, but it's clearly the proxy address. So we're left with two entities: a proxy and a box, with the former being substantially more important. Reason being, the proxy dynamically points to the box's implementation.
          
          At this point, to prompt our upgrade, we execute the `make upgrade` command. Subsequently, a minor bug was detected with the script. I discovered that I needed to update my run latest to ERC 1967 proxy. No sweat, a quick manual addition and bye-bye bug.
          
          On hitting the refresh button, with the bug sorted and having successfully identified the ERC 1967 proxy, our upgrade script could now run to upgrade box v1 to box v2.
          
          <img src="/upgrades/8-testnet-demo/testnet2.png" style="width: 100%; height: auto;">
          
          ### The Final Showdown: Box v2
          
          With box v2 being created and verified successfully, we now revisit our proxy to refresh and double-check. Sure enough, an upgrade was called on this contract. Henceforth, whenever we call functions on this, it points to box v2. It is important to keep in mind that we're calling the proxy and not the box v2 address.
          
          By executing some handy commands to set the number to 77, the proxy was updated. We called upon box v2 and successfully saw a return of 77 in decimal representation.
          
          Et voilà! It worked like a charm, we had successfully deployed and worked with a proxy.
          
          ## You've Made It!
          
          That was intense and amazing! Designing, deploying and upgrading contracts is no joke and you've done a fantastic job. Post your accomplishments on Twitter; you may need a well-deserved ice cream break before we move on to our next topics.
          
          We're cruising towards the end—Foundry governance and an introduction to security are the last few topics that are separating you from achieving greatness in smart contract development.
          
          Stay tuned, stay smart, and keep yourself ready for absorbing more incredible contract knowledge! I'll see you in the next phase of this fantastic journey!
          
          
    type: new_section
    enabled: true
  -
    title: "DAOs"
    slug: daos
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 5bf97f38-e188-41ab-b1d6-98c5b6243fd0
        title: "Introduction to DAOs"
        slug: introduction-to-dao
        duration: 19
        video_url: "yYEVIVHUAAYJTrUn00MRcNpLNnpAQacfinH01G87AIcls"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/1-intro/+page.md"
        description: |-
                    Introduction to the concept and operational mechanics of Decentralized Autonomous Organizations (DAOs).
        markdown_content: |-
          ---
          title: DAOs & Governance Intro
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Welcome back to yet another session in the series, today we're pacing up to lesson 14 of the topic "Foundry DaoGovernance." All the code that we'll be using during the tutorial has been shared on the Github repository. So, make sure to check it out.
          
          ## Closer Look at DAOs
          
          Before we dive into how to build a DAO, it's crucial to solidify our understanding of DAOs. DAO stands for Decentralized Autonomous Organization, which can be somewhat confusing due to its broad definition. It essentially refers to any group operated by a clear set of rules embedded within a blockchain or smart contract.
          
          ## How DAOs Work: An Overview
          
          In simplest terms, imagine if all users of Google were given voting power on Google's future plans. Instead of decisions being privately made behind closed doors, the process is public, decentralized, and transparent. This innovative concept empowers users and eliminates trust issues, making DAOs a revolutionary area of exploration.
          
          Let’s dive deeper into DAOs by watching a few videos I have created in the past. After viewing these videos, we will shift focus to the practical aspect of coding a DAO.
          
          <img src="/daos/1-intro/dao-intro1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Understanding DAO's Through Compound Protocol
          
          Compound protocol is a stellar example that can help us understand the intricacies of DAOs. It's a borrowing and lending application constructed with smart contracts. Navigating through the protocol, we discover a governance section that offers an interface showing all the proposals and ballots. Here, the proposals to change aspects of the protocol such as adding new tokens, adjusting APY parameters, or blocking certain coins, etc. are enlisted.
          
          This governance process is required since the contracts used often have access controls where only their owners, in this case, the governance DAO, can call certain functions.
          
          <img src="/daos/1-intro/dao-intro2.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          A DAO do not limit its functionality to proposals and voting only. It also incorporates the feature of discussion forums where community members can deliberate on proposals, justifying their pros and cons before going ahead with the voting process.
          
          ## Building a DAO: Architecture and Tools
          
          After understanding the basic workflow of DAO, let’s now talk about the architecture and tools that go into building DAO. First and foremost is the voting mechanism. One thing to keep in mind is to ensure that the voting mechanism is transparent and provides a fair way for participants to engage.
          
          DAO uses three main mechanisms for voting:
          
          1. ERC-20 or NFT Token as voting power: This approach is inherintly biased toward those who can afford to purchase more tokens, leading to a skewed representation of interests.
          2. Skin in The Game: Based on an article by Vitalik Buterin, he suggests that voters accountable for their choices. In this approach, people who vote for a decision that leads to negative outcomes will have their tokens taken away or reduced. Deciding which outcomes are bad is the tricky part.
          3. Proof of Personhood or Participation: This is where everyone in the community gets a single vote, regardless of how many wallets or tokens they have. This method is the most fair, but also the most difficult to implement due to the problem of civil resistance.
          
          On chain and off chain are the two ways to implement voting in a DAO:
          
          - Onchain voting is simple to implement and transparent, but gas fees can add up quickly for large communities.
          - Offchain voting saves on gas fees and provides a more efficient way to vote, but presenting challenges in regards to centralised intermediaries.
          
          ### Tools for Building a DAO
          
          There are several no-code solutions and more tech-focused tools to help you build a DAO, including:
          
          - DAOstack
          - Aragon
          - Colony
          - DaoHouse
          - Snapshot
          - Zodiac
          - Tally
          - Gnosis safe
          - OpenZeppelin contracts
          
          Before wrapping up, it's essential to touch briefly on the legal aspects of DAOs. DAOs are in a gray area operationally, with the state of Wyoming in the United States being the only state where a DAO can be legally recognized. Read up on the legal implications before you dive into creating your DAO!
          
          Remember, as an engineer, you have the power to build and shape the future of DAOs. So dive in and get building!
          
          Stay tuned for our next sublesson, where we will guide you through the process of building a DAO from scratch. Remember to hit the like and subscribe button for more engineering-first content on smart contracts. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 6dfdc8b2-cb5a-4ee1-96a0-c46b6dd75a20
        title: "DAOs tooling - Introduction to Aragon"
        slug: introduction-to-aragon-dao
        duration: 19
        video_url: "yYEVIVHUAAYJTrUn00MRcNpLNnpAQacfinH01G87AIcls"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/2-aragon/+page.md"
        description: |-
                    Overview of Aragon, a tool for creating and managing DAOs without the need for extensive coding.
        markdown_content: |-
          ---
          title: Aragon
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          # Building a DAO from Scratch: No Code Required, with Aragon
          
          Today, we're venturing into the exciting world of Decentralized Autonomous Organizations (DAOs), and we'll be doing it in a surprisingly code-light way. We're delighted to have Juliet Cevalier from the Aragon team as our expert guide. She's here to introduce Aragon's no-code node solution for the relatively simple creation of powerful, customizable DAOs.
          
          <img src="/daos/2-aragon/aragon1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Meet Our Aragon Expert
          
          Before we dive in, let's welcome Juliet Cevalier. As the developer advocate for Aragon, she'll give us insights on how to build a DAO without using a single line of code.
          
          <img src="/daos/2-aragon/aragon2.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Introduction to the Aragon DAO Framework
          
          To undertake this task, Juliet is using the [Aragon DAO framework](https://aragon.org/). To understand how Aragon's architecture is set up, let’s first consider the base structure of DAOs.
          
          DAOs primarily consist of a smart contract responsible for containing all of the organization's managed assets, acting effectively as the treasury. Still, the beauty and power of DAOs come from their highly extendable functionality, made possible through plugins.
          
          Ready to proceed with the DAO-building journey? Let's follow Juliet's step-by-step guide.
          
          ## Step 1: Creating a DAO on Aragon
          
          Firstly, log on to [app.aragon.org](https://app.aragon.org/). Once there, click on 'Create a DAO'. You’ll then see an outline of the process we'll be following, starting with choosing the blockchain where our DAO will be deployed.
          
          <img src="/daos/2-aragon/aragon3.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Step 2: Describing Your DAO
          
          Next is the DAO’s descriptive details including name, logo, and brief description. For the sake of this tutorial, we'll name ours “Developer DAO”.
          
          <img src="/daos/2-aragon/aragon4.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Step 3: Defining DAO Membership
          
          Defining membership is a crucial next step as it’s what determines who can participate in the governance of these assets. Currently, Aragon supports token holders and multisig members as types of governance members.
          
          The token holders method allows holders of specific tokens to vote in the organization. The multisig members, on the other hand, establishes a specific quorum that needs to be met for a proposal to go through.
          
          _These governance mechanisms, with their own unique decision-making and asset management abilities, are facilitated by back-end plugins. These are powerful extensions that can also perform tasks like fund movement, treasury management, and enabling different coordination styles._
          
          ## Step 4: Create a DAO Token
          
          The creation of a unique DAO token comes next. Let's call ours 'DVP'. We can assign 1000 tokens to ourselves and specify a minimum amount of tokens that a member needs for proposal creation.
          
          _In this instance, we'll suggest a minimum of ten tokens to prevent proposal spam._
          
          ## Step 5: Set Up Governance Settings
          
          Once the token creation is complete, we proceed to set up governance settings which includes specifying the minimum support threshold required for a valid proposal, the minimum participation needed, and the minimum time that a proposal should be open for voting.
          
          We'll also decide whether to enable early execution, which means that we wait for the entire time of the proposal's duration, and whether to allow change of vote after submission.
          
          ## Step 6: Review and Finalize
          
          Lastly, we'll review the parameters that we've set. It's crucial to note that the blockchain selection is the only non-editable item since it forms the basis for the DAO’s deployment. Everything else can later be changed via a proposal vote.
          
          _This flexibility gives us the power to adapt and evolve our DAO with changing circumstances and needs._
          
          ## Step 7: DAO Deployment
          
          With the parameters set, we'll deploy our DAO by signing the proposal. What happens next is the creation of a DAO instance with the defined plugins and settings.
          
          <img src="/daos/2-aragon/aragon5.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          Once the deployment is complete, we can easily monitor, manage, and make decisions within the DAO through the dashboard.
          
          ## Final Thoughts
          
          While Aragon provides you with a basic template to get started, remember, your DAO’s evolution and customization possibilities are endless. You can expect more iterations, plugin options, and decision-making strategies to take your DAO to the next level.
          
          Thank you for joining us today. We look forward to seeing the powerful, value-driven DAOs you create.
          
      -
        type: new_lesson
        enabled: true
        id: 2bce26c6-e68f-4f8e-aaef-a5e4b82d02c6
        title: "Project setup"
        slug: setup
        duration: 5
        video_url: "RN4mN7bGQ7b02Lhv5P9IMiyqSKrOynziF3Gy8H01QIGcg"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/3-setup/+page.md"
        description: |-
                    Guidance on setting up a project for creating a DAO, with emphasis on ERC-20 based plutocracy DAOs.
        markdown_content: |-
          ---
          title: Setup
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Today, I'm going to take you deeper into the captivating world of DAOs, Decentralized Autonomous Organizations. More specifically, I'll be throwing light on plutocracy DAOs, which are based on ERC 20 tokens, and show you how to create one from scratch using FOUNDATION.
          
          Be warned though, gaining a solid conceptual understanding of these inside-out is of paramount importance before jumping to establish your DAO. Let's keep our journey enlightening and error-free, shall we?
          
          ## The Caveat About Plutocracy DAOs
          
          A word of caution before we take the leap: launching a DAO is no casual affair. Many newbies hurry into launching their governance tokens and find themselves neck-deep in problems down the line.
          
          <img src="/daos/3-setup/setup1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          Therefore, it's essential to have a foolproof white paper justifying your need for a governance token. In short, do not make DAO creation decisions in haste, lest they come back to haunt your project.
          
          ## Let's Get Our Hands Dirty with Code
          
          To jump-start this process, we will look at the most popular DAO model currently in use across major platforms like Compound, Uniswap, and Aave.
          
          Please bear in mind, just because it's "popular", doesn't mean it's the best fit for every situation or the only available model. Always strive for improving and optimizing the web3 ecosystem.
          
          ### Stage 1: Creating a Contract Controlled by DAO
          
          First things first, we'll make a contract fully controlled by our DAO.
          
          ```shell
          mkdir foundry-dao-f23
          cd foundry-dao-f23
          
          ```
          
          Open your code editor (VS Code in this case).
          
          ```bash
          forge init
          ```
          
          Then, set up a README for outlining what you'll be doing.
          
          ### Here are our main objectives:
          
          1. Establish a contract completely controlled by our DAO.
          2. Every transaction the DAO wants to send will need to be voted on.
          3. For voting, we'll utilize ERC 20 tokens.
          
          <img src="/daos/3-setup/setup2.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          Let's get down to business.
          
          ### Stage 2: Creating a Minimal Contract
          
          Let's create a minimal contract that we can vote on. Our contract will look somewhat similar to the contracts we've worked on before.
          
          ```bash
          touch src/Box.sol
          ```
          
          This is how `Box.sol` should look like:
          
          ```js
          // contracts/Box.sol
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          
          import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
          
          contract Box is Ownable {
              uint256 private value;
          
              // Emitted when the stored value changes
              event ValueChanged(uint256 newValue);
          
              // Stores a new value in the contract
              function store(uint256 newValue) public onlyOwner {
                  value = newValue;
                  emit ValueChanged(newValue);
              }
          
              // Reads the last stored value
              function retrieve() public view returns (uint256) {
                  return value;
              }
          }
          ```
          
          In the code block above, the `value` variable can only be modified by the DAO itself. The moment a new value is stored, an event of number change gets emitted notifying the updated number.
          
          And there we have our minimal contract. This contract somewhat echoes a project I have previously worked on, known as `Box.sol`, a simple storage contract.
          
          Remember to test your code to make sure everything compiles as expected:
          
          ```bash
          forge compile
          ```
          
          ### Stage 3: Creating a Voting Token
          
          Now we get to the exciting part. Using ERC 20 tokens for voting means we'll have to create our very own voting token.
          
          Stay tuned for my next blog post where we'll dive into creating your unique voting token.
          
          Happy experimenting until then!
          
      -
        type: new_lesson
        enabled: true
        id: 95b25edd-db0a-4585-aa86-bd62171561b1
        title: "Governance tokens"
        slug: governance-tokens
        duration: 4
        video_url: "x00t00fuM00p1Nuhwxhgyq8mvdrh4ZoB8ek5rzizy02D9Kk"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/4-governance-tokens/+page.md"
        description: |-
                    Tutorial on creating governance tokens using ERC-20 extensions to facilitate DAO voting and decision-making processes.
        markdown_content: |-
          ---
          title: Governance Tokens
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Hello there, tech enthusiasts! Are you interested in creating a voting token to govern your smart contracts? Then today's sublesson will lead you step-by-step through the process, using Open Zeppelin's Contracts Wizard.
          
          To create these tokens, we will use an ERC-20 token with specific extensions to allow for advanced behaviors and control. So buckle up, and let's get coding!
          
          ## **Step 1: Using Open Zeppelin's Contracts Wizard**
          
          Open Zeppelin, a provider of software libraries for Ethereum, offers numerous contracts that developers can implement for tokens. We'll use the Contracts Wizard, a user-friendly tool to generate smart contracts.
          
          Navigate over to the wizard, select ERC-20 contract and within it, you'll see a tab named _votes_. Once you’ve selected this, copy the given code and then paste it into your new file named `GovToken.sol`. This will serve as the core of our voting token.
          
          ## **Step 2: Understanding the Code**
          
          Now, we have successfully copied the code, let's delve into what we have:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
          import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
          import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
          
          contract GovToken is ERC20, ERC20Permit, ERC20Votes {
          constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}
          
              // The following functions are overrides required by Solidity.
          
              function mint(address to, uint256 amount) public {
                  _mint(to, amount);
              }
          
              function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._afterTokenTransfer(from, to, amount);
              }
          
              function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._mint(to, amount);
              }
          
              function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._burn(account, amount);
              }
          
          }
          ```
          
          What we have here are two crucial extensions to our ERC-20 token:
          
          - **ERC20Permit**: This extension allows approvals to be made via signatures. Simply put, you can sign a transaction without sending it, allowing someone else to send the transaction instead. This function is based on the EIP-2612, which, if you're interested, I'd recommend checking out [here](https://eips.ethereum.org/EIPS/eip-2612) for more information.
          - **ERC20Votes**: This is the heart of our voting functionality. It performs key actions like keeping the history of each account's voting power, and enabling the delegation of voting rights to another party.
          
          ## **Delegating with ERC20Votes**
          
          An interesting function of the ERC20Votes is token delegation. Sometimes, you might trust another party's judgement more than your own on certain topics. ERC20Votes' delegation function lets you delegate the voting rights of your token to this party, even though the tokens are still legally yours.
          
          ## **Conclusion**
          
          Congratulations! You've successfully created a secure, flexible voting token. This ERC20 token not only maintains checkpoints of voting power but also enables token holders to delegate their voting rights.
          
          Remember, Open Zeppelin’s Contracts Wizard is an excellent tool for exploring various token functionalities as per your requirements. Happy coding!
          
          <img src="/daos/4-token/token1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: cecdace6-083a-4315-af14-95cfe95b65be
        title: "Creating the governor contract"
        slug: create-governor-contract
        duration: 15
        video_url: "e34WuxPtYHsMqPITGJXlY3ot027pnJ8MbMZYB00BWVU00c"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/5-governor-contract/+page.md"
        description: |-
                    Instructions for creating a governor contract for DAOs, utilizing Open Zeppelin's tools for efficient and secure contract generation.
        markdown_content: |-
          ---
          title: Governor Contract
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Hello there! Today I want to share a really interesting piece of tech I've recently used, the [Open Zeppelin Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard). This tool is incredibly helpful in generating smart contracts for creating a DAO, which stands for a Decentralized Autonomous Organization. Why are DAO's exciting? Well, they allow for democratized decision making, meaning the members of the DAO can vote about its future actions.
          
          In this post, I want to walk you through a solution that makes use of the Zeppelin Wizard to create a DAO.
          
          ## Zeppelin Wizard Overview
          
          The Zeppelin Wizard helps us with multiple facets of setting up a DAO. One of its features is the Governor, which we can configure to suit our needs. For instance, we can adjust the voting delay, voting period, and proposal threshold in line with the governance model we're aiming for. Do we want our voting to start immediately after proposing? Or after 100 blocks? All these details are customizable.
          
          Here's the interesting part - we can copy the output code from the wizard and integrate it into our contracts with minimal changes. To illustrate this, I'll walk you through a sample setup of a Governor contract along with a crucial TimeLock mechanism.
          
          <img src="/daos/5-governor/governor1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          ## Creating the Governor contract
          
          First, we need to update our Governor contract and import the necessary interfaces (`IVotes`, `GovernorVotes` &amp; `TimeLockController`). We'll be using _named imports_ since they make our code cleaner.
          
          Here's an overview of what the Governor contract entails.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
          import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
          import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
          
          contract GovToken is ERC20, ERC20Permit, ERC20Votes {
              constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}
          
              // The following functions are overrides required by Solidity.
          
              function mint(address to, uint256 amount) public {
                  _mint(to, amount);
              }
          
              function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._afterTokenTransfer(from, to, amount);
              }
          
              function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._mint(to, amount);
              }
          
              function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
                  super._burn(account, amount);
              }
          }
          ```
          
          This may seem a bit abstract, but let me break it down a bit.
          
          When somebody makes a proposal, it gets registered in the system. We essentially have a record of when a vote started and ended, whether it was executed or canceled. This information helps us identify the status of a proposal and whether it has passed.
          
          Next, we have the `execute` function. Once a proposal gets approved by the DAO members, we call this function to implement the operation involved in the proposal.
          
          The final key function is `cast vote`. This allows members of the DAO to cast votes on various proposals. Depending on the overall voting system, the weight of each member's vote could be dependent on the number of tokens they hold.
          
          ## Building the TimeLock Controller Contract
          
          The final step in our set up is creating the TimeLock Controller contract, which, fortunately, we can do with minimum effort thanks to Open Zeppelin's repository.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;
          
          import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
          
          contract TimeLock is TimelockController {
              // minDelay is how long you have to wait before executing
              // proposers is the list of addresses that can propose
              // executors is the list of addresses that can execute
              constructor(uint256 minDelay, address[] memory proposers, address[] memory executors)
                  TimelockController(minDelay, proposers, executors, msg.sender)
              {}
          }
          ```
          
          And this is it for this sub-section. We now have a TimeLock contract that we can use to lock our Governor contract. Keep learning and stay tuned for the next post!
          
          Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: baa7e801-d9fb-420d-afdb-0c84fa9740d2
        title: "Testing the governance smart contract"
        slug: tests
        duration: 24
        video_url: "1QlC5gNDvn02qshVXBwZw5EdWvZwZUGQKZL23ypj3vIU"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/6-tests/+page.md"
        description: |-
                    Comprehensive guide on testing governance smart contracts to ensure efficient and secure DAO operations.
        markdown_content: |-
          ---
          title: Tests
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          On this lesson we are going to write some test for our DAO.
          
          ## Testing Your DAO
          
          Let's start by writing a test.
          
          ```shell
          touch test/MyGovernorTest.t.sol
          ```
          
          One of the reasons we are proceeding a bit swiftly is because- This. Is. It. This is the point where you level up from being a novice to developing a strong understanding of how DAOs work.
          
          We are going to write a test which will cover the whole process. The test we write here is going to be a comprehensive one so you can see this process in action from start to finish.
          
          And here's what you should know already:
          
          - How to flesh out this repo with scripts, tests.
          - How to write unit tests, fuzz tests, and more.
          - How to make your project bigger and better (also read as, bad\*ss).
          
          ## Testing the Governance Protocol
          
          We are going to code 2 main tests:
          
          **Cannot Update Box Without Governance:** This test ensures that the governance mechanism is properly implemented by attempting to update the Box contract without the necessary governance authorization. If the update attempt doesn't revert, it signifies a vulnerability in the governance setup, highlighting the importance of secure access control.
          
          **Governance Updates Box:** This test scenario simulates a complete governance process for updating the Box contract. It starts by proposing a change, which encapsulates the desired update along with metadata. After the voting period elapses, the vote is executed if passed. In this case, the proposed change involves storing a specific value in the Box contract, showcasing the end-to-end functionality of the governance system.
          
          This is how the testing script will look like:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.19;
          
          import {Test, console} from "forge-std/Test.sol";
          import {MyGovernor} from "../src/MyGovernor.sol";
          import {GovToken} from "../src/GovToken.sol";
          import {TimeLock} from "../src/TimeLock.sol";
          import {Box} from "../src/Box.sol";
          
          contract MyGovernorTest is Test {
              GovToken token;
              TimeLock timelock;
              MyGovernor governor;
              Box box;
          
              uint256 public constant MIN_DELAY = 3600; // 1 hour - after a vote passes, you have 1 hour before you can enact
              uint256 public constant QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
              uint256 public constant VOTING_PERIOD = 50400; // This is how long voting lasts
              uint256 public constant VOTING_DELAY = 1; // How many blocks till a proposal vote becomes active
          
              address[] proposers;
              address[] executors;
          
              bytes[] functionCalls;
              address[] addressesToCall;
              uint256[] values;
          
              address public constant VOTER = address(1);
          
              function setUp() public {
                  token = new GovToken();
                  token.mint(VOTER, 100e18);
          
                  vm.prank(VOTER);
                  token.delegate(VOTER);
                  timelock = new TimeLock(MIN_DELAY, proposers, executors);
                  governor = new MyGovernor(token, timelock);
                  bytes32 proposerRole = timelock.PROPOSER_ROLE();
                  bytes32 executorRole = timelock.EXECUTOR_ROLE();
                  bytes32 adminRole = timelock.TIMELOCK_ADMIN_ROLE();
          
                  timelock.grantRole(proposerRole, address(governor));
                  timelock.grantRole(executorRole, address(0));
                  timelock.revokeRole(adminRole, msg.sender);
          
                  box = new Box();
                  box.transferOwnership(address(timelock));
              }
          
              function testCantUpdateBoxWithoutGovernance() public {
                  vm.expectRevert();
                  box.store(1);
              }
          
              function testGovernanceUpdatesBox() public {
                  uint256 valueToStore = 777;
                  string memory description = "Store 1 in Box";
                  bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);
                  addressesToCall.push(address(box));
                  values.push(0);
                  functionCalls.push(encodedFunctionCall);
                  // 1. Propose to the DAO
                  uint256 proposalId = governor.propose(addressesToCall, values, functionCalls, description);
          
                  console.log("Proposal State:", uint256(governor.state(proposalId)));
                  // governor.proposalSnapshot(proposalId)
                  // governor.proposalDeadline(proposalId)
          
                  vm.warp(block.timestamp + VOTING_DELAY + 1);
                  vm.roll(block.number + VOTING_DELAY + 1);
          
                  console.log("Proposal State:", uint256(governor.state(proposalId)));
          
                  // 2. Vote
                  string memory reason = "I like a do da cha cha";
                  // 0 = Against, 1 = For, 2 = Abstain for this example
                  uint8 voteWay = 1;
                  vm.prank(VOTER);
                  governor.castVoteWithReason(proposalId, voteWay, reason);
          
                  vm.warp(block.timestamp + VOTING_PERIOD + 1);
                  vm.roll(block.number + VOTING_PERIOD + 1);
          
                  console.log("Proposal State:", uint256(governor.state(proposalId)));
          
                  // 3. Queue
                  bytes32 descriptionHash = keccak256(abi.encodePacked(description));
                  governor.queue(addressesToCall, values, functionCalls, descriptionHash);
                  vm.roll(block.number + MIN_DELAY + 1);
                  vm.warp(block.timestamp + MIN_DELAY + 1);
          
                  // 4. Execute
                  governor.execute(addressesToCall, values, functionCalls, descriptionHash);
          
                  assert(box.retrieve() == valueToStore);
              }
          }
          
          ```
          
          ## Wrapping Up
          
          You've learned how a typical voting process within a DAO works. However, this is just the basics. There are more advanced methodologies emerging daily, and it's only apt for you as a developer to explore these emerging trends.
          
          There is a common criticism that pure DAOs can often devolve into plutocracies. To avoid that, consider tweaking the voting mechanisms or exploring other models of decentralized governance.
          
          If you're feeling up to it, consider deploying a DAO or even creating your own! No matter what you decide to do next, pat yourself on the back. You've made a significant leap in your journey into understanding blockchain and smart contracts.
          
          <img src="/daos/6-test/test1.png" alt="Dao Image" style="width: 100%; height: auto;">
          
          Stay tuned for our next post. Until then, happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: 762e38ae-29e5-4f67-bf4b-2c2f172e5a7d
        title: "Section recap"
        slug: daos-section-recap
        duration: 6
        video_url: "q3nI7romDbqB02P8R9Mo700p7G1nav02TUGi11byJwFC8M"
        raw_markdown_url: "/routes/advanced-foundry/5-daos/7-wrap-up/+page.md"
        description: |-
                    A recap of the DAO section with additional insights on smart contract security and auditing, and tips on gas optimization.
        markdown_content: |-
          ---
          title: Wrap up & Gas Tips
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          As we approach the culmination of our lessons, there's one crucial topic left to cover - Smart Contract and Security Auditing for Developers. By no means should you leave this course without exploring this vital aspect. This is where we equip you with the necessary tools to ensure your smart contracts are secure and optimized. Sure, this lesson won't take you through auditing step by step, but it will certainly highlight what to expect from an auditor and essential steps towards thinking about security.
          
          ---
          
          ## Deep Dive Into Auditing World
          
          Imagine the thrill of being able to deploy amazing contracts that are crafted and sealed with your intellect and skill. As exciting as that could be, equally important is being adept at understanding the security aspects associated with your creations. Hence, it is essential to know what to look for in an auditor; being aware of the crucial aspects that enhance the security of your contracts only makes you a seasoned developer.
          
          But, we're not stopping there! If you plan to journey through the path of security and auditing, we've got you covered. We're working on dedicated security and auditing educational material to walk you through.
          
          So, take pride in how far you've come! Time to celebrate your achievements - do a little dance, treat yourself to some ice cream. The end is within sight, and soon we will release you into the world, armed with fresh knowledge and insight.
          
          For now, take a pause and join us back in a jiffy.
          
          ---
          
          ## Special Bonus: Gas Optimizations By Harrison Legg
          
          But, before you hit the pause button, we've got a special piece of bonus content for you.
          
          We are ecstatic to have Harrison Leggio, CTO and co-founder of Pop Punk, LLC, share some exceptional tips on gas optimizations. At Pop Punk LLC, they are building—`gaslight GG`, an audit firm specializing in gas optimization to ensure lowest possible gas costs. They are now venturing into building hyper optimized public goods tools for EVM developers, aiming at making the best and cheapest contracts accessible to all!
          
          Harrison was graciously shared an enlightening step-by-step explainer on gas optimizations with a special focus on AirDrop contracts, highlighting common ways that may unknowingly inflate your gas costs in your smart contracts. The goal of his speil is to illustrate how you can beautifully weave in simple elements in your code to save substantial amounts of gas without rendering the code unreadable.
          
          Find Harrison's detailed code explainer below.
          
          (Add the provided gas optimization code)
          
          _"The end result? The AirDrop 'Bad' costs 1,094,690 gas, while the 'Good' version only consumes 404,842 gas, creating a saving of nearly 600,000 gas by making only minor changes. This not only benefits you as a developer but also the end users who won't need to spend exorbitant amounts."_ – Harrison Leggio, CTO and co-founder of Pop Punk, LLC
          
          ---
          
          Feel free to find Harrison on Twitter at `@poppunkonchain`, and the business account at `@PoppunkLLC`. He also extends an invitation to budding or established protocols for gas audits. Keep an eye out for `Gaslight GG` where you can soon deploy 'super cheap, super gas optimized' smart contracts with just a single button press.
          
          That's all for today's session! Till we meet again!
          
    type: new_section
    enabled: true
  -
    title: "Security"
    slug: security
    lessons:
      -
        type: new_lesson
        enabled: true
        id: b47c5b24-cd73-425f-94e5-4937dbfa2b5b
        title: "Intro"
        slug: intro
        duration: 4
        video_url: "02hqB3V7iMXCTQTULsnpJpF02v02LL00khoY3NlH02HUKnGk"
        raw_markdown_url: "/routes/advanced-foundry/6-security/1-intro/+page.md"
        description: |-
                    Introduction to smart contract security and auditing, providing foundational knowledge for crypto space security.
        markdown_content: |-
          ---
          title: Security & Auditing Introduction
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Welcome back! This is our final lesson in this course and we're ending on a thrilling note - diving into the world of **smart contract security and auditing**. So if you're a developer who's been eagerly monitoring your progress, then prepare to get some insightful knowledge nuggets that will truly enhance your crypto literacy.
          
          Remember, this is _just a teaser_ and won't cover everything about security, nonetheless, we're creating a treasure trove of places where you can learn and grow.
          
          Although this last lesson might tickle your brain, more importantly, it provides the foundational knowledge needed to take that first step into the exciting world of security in the crypto space.
          
          <img src="/auditing-intro/1-intro/auditing-intro1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          ## Unraveling the Importance of Security with Stats
          
          In case you're wondering why we're emphasizing security - the stats speak loud and clear! Here's a shocking fact:
          
          <img src="/auditing-intro/1-intro/auditing-intro2.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          To make it noir, consider the total value locked in the DEFI which was approximately $50 billion. That would indicate **6%** of all DFI was hacked last year. In simpler terms, it like placing your money in a bank that cheerfully says, "_Hey, there's a 6% chance all your money will be gone next year_".
          
          The plausibility of this grim prospect closely mirrors what's happening in the crypto space and underlines the urgent need to bolster its security.
          
          Take a glance at an intriguing leaderboard on _Rectit News_. It's a daunting lineup of some of the biggest hacks, many of which were born out of code that was unaudited or reviewed by security professionals. Moreover, some of these attacks led to staggering losses of over half a billion dollars.
          
          This brings us to a fundamental decision for protocol devs -
          
          <img src="/auditing-intro/1-intro/auditing-intro3.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          From a business perspective, investing in security absolutely makes sense and provides a whopping 99% saving in costs.
          
          ## Beginning the Process with Smart Contract Audits
          
          Protocol developers listen up! In all likelihood, you'll need to get a **smart contract security audit** at some point before you launch your protocol. That's where we'll start.
          
          A smart contract audit is certainly worth watching even if you don't aspire to become an auditor yourself. It will provide you with a foundation understanding when your protocol is poised to launch to mainnet.
          
          The next video breaks down what a smart contract audit entails and how to prepare for it, so sit tight and get ready to unleash potential that’s waiting to be discovered!
          
          Happy Coding!
          
      -
        type: new_lesson
        enabled: true
        id: 4e52985f-9d6d-4a2f-b3be-011923e6cd64
        title: "What is a smart contract audit"
        slug: what-is-smart-contract-audit
        duration: 7
        video_url: "QgQHaeCjJDS6PKo00uV7iOCCKGwtx02fhXcQCarJbXVOM"
        raw_markdown_url: "/routes/advanced-foundry/6-security/2-what-is/+page.md"
        description: |-
                    Insights into the manual review process in smart contract auditing, emphasizing the importance of detailed code and documentation examination.
        markdown_content: |-
          ---
          title: What is a Smart Contract Audit?
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          When it comes to understanding the finer details of blockchain technology, smart contract auditing is of paramount importance. This audit is essentially a security-based code review with a specific timeframe laid out for your smart contract system.
          
          ## What is a Smart Contract Audit?
          
          <img src="/auditing-intro/2-whatis/whatis1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          The principal goal of an auditor, in this case, is to discover as much vulnerabilities as possible, while also educating the protocol about security best practices and proficient coding techniques. This complex process involves a combination of manual reviews and automated tools for finding these vulnerabilities.
          
          ## Why is a Smart Contract Audit So Essential?
          
          Having a better understanding of why a smart contract audit is a critical part of launching your code base onto a live blockchain will highlight its importance.
          
          ### Vulnerability to Hacks
          
          There are countless websites that catalog the number of hacks that occur in blockchain environments, highlighting its vulnerability. In the past year alone, almost $4 billion was stolen from smart contracts, making it the year with the highest stolen value from these contracts.
          
          This alarming statistic underscores the importance of a meticulous smart contract audit. Once a smart contract is deployed, it cannot be altered or modified - therefore, getting it correct in its initial phase is crucial.
          
          ### Adversarial Potential
          
          A blockchain is traditionally a permissionless adversarial environment. Your protocol must be prepared to encounter and deal with malicious users. An audit can equip your developer's team with improved understanding and proficiency in code, consequently increasing their efficiency and effectiveness in implementing the required features.
          
          Moreover, a single smart contract audit might not suffice considering the rapidly evolving nature of the digital space. Your protocol should ideally embark on a comprehensive security journey that comprises multiple audits, formal verification, competitive audits, and bug bounty programs. We'll explore these aspects in greater breadth in future blogs.
          
          ## Audit Service Providers
          
          Several companies offer smart contract auditing services. These include but are not limited to: Trail of Bits, Consensys Diligence, OpenZeppelin, Sigma Prime, SpiritDAO, MixBytes, WatchPug Trust, and, of course, [Cyfrin](https://www.cyfrin.io/) . Additionally, a host of independent auditors also provide high-quality audit services.
          
          ## What Does a Typical Audit Look Like?
          
          Let's dive into a typical audit process to understand how it generally plays out.
          
          - **_Price and Timeline:_** An audit begins with figuring out the price and timeline. Protocol needs to contact auditors and discuss how long the audit will take based on scope and code complexity. Ideally, they should reach out before their code is finished to ensure the auditors have sufficient time to schedule them in.
          - **_Commit Hash and Down Payment:_** Once the timeline and price are established, the protocol finalizes a start date and a final price based on a commit hash, which is a unique ID of the code base. Some auditors may request a down payment to schedule the audit.
          - **_Audit commencement:_** The auditors deploy every tool in their arsenal to unearth as many vulnerabilities in the code as possible.
          - **_Initial report submission:_** After the audit duration ends, auditors hand in an initial report that outlines their findings based on severity. These will be divided into High, Medium, and Low alongside Informational, Non-critical, and Gas efficiencies.
          - **_Mitigation commencement:_** Post receipt of the initial report, the protocol's team has a fixed time to fix the vulnerabilities found in the initial report.
          - **_Final report submission:_** The final stage entails the audit team performing a final audit exclusively on the fixes made to tackle the issues highlighted in the initial report.
          
          ## Ensuring a Successful Audit
          
          There are a few key actions that can ensure your audit is as successful as possible:
          
          1. Clear documentation
          2. A robust test suite
          3. Commented and readable code
          4. Adherence to modern best practices
          5. An established communication channel between developers and auditors
          6. An initial video walkthrough of the code before the audit begins.
          
          ### The Importance of Collaboration
          
          To get the best results, consider yourself and your auditors as a team. Ensure a smooth flow of communication between the developers and auditors right from the audit commencement. This way, auditors get a thorough understanding of the code, equipping them to better diagnose any vulnerabilities.
          
          ### Post Audit Considerations
          
          Once your audit concludes, your work isn't done. Be sure to take the recommendations from your audit seriously, and remember that any change to your code base after the audit introduces unaudited code.
          
          ## What an Audit Isn't
          
          An audit doesn't mean that your code is bug-free. An audit is a collaborative process between the protocol and the auditor to find vulnerabilities. It is essential to treat each audit as part of a continuous and evolving process - and be prepared to take immediate action if a vulnerability is discovered.
          
          ## Wrapping Up
          
          In essence, a smart contract audit is a pivotal security journey that prepares you with best practices and security knowledge to launch your code onto a live blockchain. And of course, if you're searching for auditors, don't hesitate to reach out to the [Cyfrin](https://www.cyfrin.io/) team, and we'd be happy to assist.
          
          Stay safe out there, and ke
          
      -
        type: new_lesson
        enabled: true
        id: d548101f-dbfe-4536-8a4e-99752f327be4
        title: "Top security tools"
        slug: top-smart-contract-security-tools
        duration: 12
        video_url: "pDVCqjk6aPdojcQgcmGCI25AqCP37d9LtbfZjfX8jpc"
        raw_markdown_url: "/routes/advanced-foundry/6-security/3-top-tools/+page.md"
        description: |-
                    Overview of various security tools used by professionals for smart contract auditing, including their roles and effectiveness.
        markdown_content: |-
          ---
          title: Top Tools used by Security Professionals
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          Welcome back! Now that you have a basic understanding of what a smart contract audit involves, let's take a deep dive into the auditing process employed by security professionals. More specifically, the tools they leverage, their relevance to protocol developers, and why early-stage security awareness is paramount.
          
          ## Importance of Security Tools for Smart Contract Developers
          
          As a smart contract developer, it is crucial to familiarize yourself with the entire toolkit used in audits. It will make sense to employ these tools even before seeking a professional audit just to streamline the process. Remember: the code base you launch is your responsibility and it is important not to wait until the end to think about security. Instead, your code's safety must be built into the architecture from the onset.
          
          Let's take the analogy of a car race. If you build a dysfunctional car and decide to jump on the racetrack, you'll find out that you should have started over. Using time to audit a fundamentally flawed system is therefore not productive. To avoid such situations, smart contract developers have useful tools that can help provide guidance. [Solcurity](https://github.com/transmissions11/solcurity), for instance, offers security and code quality standards for solidity smart contracts and then there's the [simple security toolkit](https://github.com/nascentxyz/simple-security-toolkit) from Nascentxyz, a valuable resource to consult pre-audit.
          
          ## The Smart Contract Audit Process
          
          The audit process is rather complex with no one-size-fits-all solution. However, typical smart contract audits involve a mix of manual reviews and tool-based evaluations. A multitude of tools exist to ensure code security, but manual review remains arguably the most vital.
          
          ### The Power of Manual Review
          
          Manual review primarily involves going through the code line by line and verifying the code's functionality against documentation. It's unsurprising that the developer community often jokes about the gains that 15 minutes of documentation reading could yield. The first step usually involves understanding the protocol's supposed function, given the majority of bugs encountered are more related to business logic than technical errors.
          
          <img src="/auditing-intro/3-tools/tools1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          This statement couldn't be truer here. The more code and documentation you read, the better equipped you will be to spot bugs and errors.
          
          For example, consider a simple contract with a 'set number' function. While the code might compile and deploy successfully, reading the corresponding documentation may reveal the intended function is to set a number to a 'new number'. It's only through understanding this that you'll realize setting it to 'new number + 1' is incorrect. Not a code error, but a business logic error, which is just as significant.
          
          ### The Investigative Tools Used in Audits
          
          Besides manual review, several tools come in handy during the auditing process. These include:
          
          1. **Test Suites**: The primary line of defense that highlights potential vulnerabilities during testing. Most popular frameworks integrate test suites, and their importance has been extensively discussed in this course.
          2. **Static Analysis**: Helps in automatically detecting code issues without running any code. Typically, such tools search for specific keyword patterns for potential issues.
          3. **Fuzz Testing**: An approach that involves feeding random data as inputs during testing to unearth bugs that might go undetected during regular testing.
          4. **Stateful Fuzz Testing**: A more complex version of fuzz testing, already covered in this course.
          5. **Differential Testing**: Although not a keen focus area for this course, it involves writing the same code multiple times, and comparing them for discrepancies.
          6. **Formal Verification**: This is a mathematical proof-based code verification methodology to establish the correctness of hardware or software.
          
          #### Formal Verification through Symbolic Execution
          
          Formal verification might seem slightly confusing initially, but think of it as converting solidity code into mathematical expressions that can easily prove or disprove the code's operation. Symbolic execution is a typical method of formal verification. It attracts contrasting preferences within the development community due to its time-intensive nature, with many players choosing to skip it. Although not a direct indicator of error-free code, it becomes crucial when dealing with math and computationally heavy processes.
          
          #### The Role of AI in Smart Contract Audits
          
          AI-supported tools are a work in progress in the industry. While sometimes they prove to be vital additions to the toolset, other times they disappoint significantly.
          
          ## Unpacking the Audit Process with Real Code Samples
          
          To grasp this better, consider the following snippets from the Denver Security Rep (a codebase associated with this course) :
          
          1. **Manual Review**: Code that does math incorrectly—identified by direct comparison with documentation.
          2. **Testing**: A function supposed to set a number but adds one to it—discovered with simple unit testing.
          3. **Static Analysis**: A sample reentrancy attack detected automatically by running [Slither](https://github.com/crytic/slither).
          4. **Fuzz Testing**: Failure to maintain variable value within defined bounds—picked up by random data input testing.
          5. **Symbolic Execution**: Use of solidity compiler to check for issues by triggering different code paths, and understanding their outcomes.
          
          ## Wrapping Things Up with Expert Insights
          
          To help us better understand manual reviews, we're fortunate to have Tincho, a distinguished Ethereum smart contract researcher. Tincho, through his manual review technique, discovered a critical vulnerability in the Ethereum Name Service (ENS) that earned him a $100,000 payout. His insights will undoubtedly be valuable as you navigate your journey in smart contract auditing.
          
          That was it for this lesson, keep learning and happy auditing!
          
          <img src="/auditing-intro/2-whatis/whatis1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: f1c18671-11d8-4bd8-b206-bb0557e09751
        title: "Introduction to manual review"
        slug: smart-contract-manual-review
        duration: 14
        video_url: "fL00Wb4rLbCenx029G1PKkgjvwFMTyv2mtffZIdVEIHVU"
        raw_markdown_url: "/routes/advanced-foundry/6-security/4-manual-review/+page.md"
        description: |-
                    Insights into the manual review process in smart contract auditing, emphasizing the importance of detailed code and documentation examination.
        markdown_content: |-
          ---
          title: Manual Review
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          # Step-By-Step Guide: How to Audit DeFi with Tincho
          
          This blog post is a detailed reflection of an interview with Tincho, an Ethereum security researcher, a former lead auditor at Openzeppelin, and the creator of Damn Vulnerable DeFi. His vast expertise in DeFi auditing makes him a wealth of knowledge for anyone interested in Ethereum or blockchain security.
          
          ## Embracing the Audit Process
          
          This is Tincho, an Ethereum security researcher and creator of Damn Vulnerable DeFi. In today's blog post, we are going to discuss the auditing process in detail. Now, it's crucial to understand that auditing does not necessarily have a 'one-size-fits-all" approach. We all have our own ways of making things work and what I'll lay out in this blog post are my go-to strategies. Without further ado, let's take a dive into the world of Defi auditing.
          
          ## Getting Started: Exploring Repositories and Reading Documentations
          
          To begin with, you need to have a clear understanding of what you're dealing with. Hence, we'll pick the Ethereum Name Service (ENS) GitHub repository for a mock auditing in this blog post.
          
          Here's what I recommend:
          
          - **Clone-The-Repo-First**: Fork the repository to your local development environment.
          - **Visit The Documentation**: Understanding the architecture of what you're reviewing is key. Familiarize yourself with the terms and the concepts used.
          
          <img src="/auditing-intro/4-review/review1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          ## Reviewing Audit Reports and Setting Command Line Utility
          
          _Auditing ENS's GitHub Repository_
          
          Having looked at the documentation and the architecture, let's go back to auditing the ENS's repository on GitHub. Note that the repository contains multiple contracts and ENS uses hardhat for development. Although I prefer projects that use foundry over hardhat, it would not be an impediment for auditing.
          
          To acknowledge the complexity of the code, you need to count the lines of code. For this, I usually use a command-line utility called _Clock_ and save the output in the form of a CSV which is later fed into the spreadsheet.
          
          **Solidity Metrics**: Another tool to scope the complexity of a file is 'Solidity Metrics' developed by Consensus. You can run this on your project and it will provide you with a detailed report of the levels of complexity.
          
          <img src="/auditing-intro/4-review/review2.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          ## Organizing Audit Process and Taking Notes
          
          As a part of your audit process, prioritize the contracts according to their complexity using tools like solidity metrics or clock. Move your contracts from the 'Not Started' phase to 'In Progress' and then 'Completed'. This aids tremendously in keeping the audit process on track, especially when working in teams.
          
          While auditing, you might need to dive deep into certain aspects of the system and it is important to take notes of your observations. Whether you take notes in the code, a news file or a note-taking plugin, it helps in keeping track of your thoughts.
          
          <img src="/auditing-intro/4-review/review3.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          An auditor needs to continuously brainstorm about potential breaches and weak points. Often this process won't follow a fixed path and will be influenced by the auditor's own experience and knowledge. This includes keeping in mind the different forms of attacks, identifying quickly anything that's out of place, and reading others' vulnerability reports.
          
          ## Understanding the Testing Environment and The Importance of Communication
          
          It's significant to realize that you might need to test things during the audit. For complex setups, you might have to adapt to the actual testing environment of the project. Additionally, communication with your clients is key. They understand the intent of the system better than anyone. Seek help when in doubt but also maintain a degree of detachment as you are the expert they are counting on.
          
          Once the client reassures you that the issues have been fixed, review those fixes to make sure no new bugs have been introduced. Concurrently, prepare your audit report clearly mentioning all your findings and observations.
          
          <img src="/auditing-intro/4-review/review4.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          ## Beware of the 'Perfect Auditor' Fallacy
          
          Remember, no auditor is perfect and can claim to find every vulnerability. It's the collective responsibility of the client and the auditor to ensure code security. It's absolutely normal for some vulnerabilities to be missed. However, that doesn't mean you take your job lightly. Stay diligent in your task and keep growing your skills.
          
          <img src="/auditing-intro/4-review/review5.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          If despite your best efforts, an audit fails and your client's code gets hacked, remember it isn't entirely your fault. The blame should be shared by both parties. As an auditor, your role is to provide a valuable security code review, irrespective of whether you find a critical issue.
          
          And that sums up our auditing journey. Thank you for accompanying me on this. I hope it has been enriching for you and will aid you in your auditing adventures. Until next time!
          
          [Link to the full interview](https://www.youtube.com/watch?v=bYdiF06SLWc&t=0s)
          
          That was it for this lesson, we hope you enjoyed it! Happy learning!
          
      -
        type: new_lesson
        enabled: true
        id: 31ed03ef-dbe7-4341-b314-27b6db4bcc4d
        title: "Introduction to formal verification"
        slug: formal-verification
        duration: 15
        video_url: "x5X00U2CIg39S01dW67zgq1Tz9Hq9p9mZYuMVTYA4kk5A"
        raw_markdown_url: "/routes/advanced-foundry/6-security/5-formal-verification/+page.md"
        description: |-
                    Exploration of formal verification and symbolic execution in Web3, including their applications and limitations in security testing.
        markdown_content: |-
          ---
          title: Formal Verification
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          # Understanding Symbolic Execution and Formal Verification in Web3
          
          So you're interested in enhancing your security testing toolkit with symbolic execution and formal verification? You've come to the right place. In this post, we're going to break down these complex concepts and equip you with the knowledge to begin incorporating them into your security audits.
          
          This post has been inspired by valuable contributions from [the Trail of Bits team](https://www.trailofbits.com/) - renowned for their expertise in this domain. Thanks to them, we'll be able to delve into the nuances of symbolic execution and formal verification.
          
          Sounds exciting? Let's jump in!
          
          ## Deepening Your Understanding of Testing Methodologies
          
          Before we advance to the heart of the matter - symbolic execution and formal verification - let's review the testing methodologies we use in Web3 development. To understand what follows, you'll need a high-level understanding of Solidity and some familiarity with foundational testing approaches like unit testing and fuzzing testing.
          
          ### Unit Testing
          
          Unit testing forms the first layer of our testing "onion." It's a method where you test a specific "unit" (like a function) to ensure it performs as expected. In other words, unit testing involves checking whether a function does what it should. But you already knew that, right? we have coded together a lot of tests in the previous videos.
          
          A unit test can catch bugs in the execution of this function. When using Solidity testing frameworks like [Foundry](https://github.com/foundry-rs/foundry).
          
          ### Fuzz Testing
          
          <img src="/auditing-intro/5-formal/formal2.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          Fuzz testing serves as the second layer. In essence, fuzzing is the process of running your program with a range of random inputs to see if it breaks. Here, you need to define your code's invariants - the properties you expect to be true regardless of the program's state.
          
          Let's consider a function that should never return zero. We can create a fuzz test that throws a bunch of random numbers at the function to try to make it return zero.
          
          The fuzz test tries to break our property by passing in random numbers. If it finds something that causes the function to return zero, it means we have an edge case that needs to be addressed.
          
          ### Static Analysis
          
          The third layer of our testing onion is Static Analysis. Unlike fuzz and unit testing, static analysis doesn't involve running the code. Instead, it involves inspecting the code as-is, checking for known vulnerabilities.
          
          Static analysis tools can be valuable for rapidly identifying sections of your code that employ bad practices. Besides Slither, the Solidity compiler itself can serve as a static analysis tool.
          
          Now that we have some background on essential testing methodologies, let's delve into formal verification and symbolic execution.
          
          ## Formal Verification &amp; Symbolic Execution
          
          Our exploration starts with formal verification - the process of proving or disproving a system property using mathematical models. Various techniques exist for this, including symbolic execution and abstract interpretation. We'll be focusing on symbolic execution.
          
          ### Symbolic Execution Demystified
          
          <img src="/auditing-intro/5-formal/formal1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          Symbolic execution is a technique wherein you explore the different paths your program can take and create a mathematical representation for each path.
          
          Consider a function we want to verify using symbolic execution. First, we need to identify the invariant - what we want to prove or disprove about the function. For our needs, let's say our invariant is: this function should never revert.
          
          ## The Limitations
          
          While symbolic execution is powerful, it's not a magic bullet. It can struggle with a 'path explosion' problem, where there are too many paths for the tool to explore in a reasonable timeframe.
          
          Additionally, symbolic execution requires a deep understanding to use effectively and maintain. This often results in a high skill requirement. However, a sufficiently powerful fuzzer may be adequate for many requirements.
          
          So, there we have it! From unit testing to symbolic execution, we've stepped through the necessary layers to fortify your coding practices. Continue to ask questions, explore, and keep coding safely!
          
          ## Wrapping Up
          
          I hope you enjoyed this post and found it useful. If you're interested in learning more about security testing, check out the [Trail of Bits blog](https://blog.trailofbits.com/). They have a ton of great content on this topic.
          
          We are to close to finishing this course. In the next video, we will be looking at the final topic of this course, a huge huge huge congratulations for making it this far!
          
      -
        type: new_lesson
        enabled: true
        id: 9ec6f023-3e4a-4922-a97d-e9c1cdca6daf
        title: "Congratulations"
        slug: congratulations
        duration: 5
        video_url: "QA01qJgFupgZeQc0201q3P9UHA00gUZuBq1jO7myGb1r8k4"
        raw_markdown_url: "/routes/advanced-foundry/6-security/6-congratulations/+page.md"
        description: |-
                    Celebratory conclusion of the course, highlighting key resources and tools for continued learning in smart contract security.
        markdown_content: |-
          ---
          title: Congratulations
          ---
          
          _Follow along with this video._
          
          
          
          ---
          
          # Becoming a Smart Contract Security Wizard: What’s Next After Your First Big Course
          
          Welcome back, this is the end of our journey together, at least for this course. We hope you've enjoyed it and learned a lot. We've covered a lot of ground, and you should be proud of yourself for making it this far. Now, let's take a look at some nice tools and resources that will help you continue your journey.
          
          ## Resources That Cannot Be Missed
          
          Continuing your journey through security education and fine-tuning those skills you just acquired is also essential:
          
          - [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/), crafted by a developer named Tincho, is a fascinating game that draws you right into the heart of offensive security in Ethereum’s smart contracts.
          
          - A kinetically engaging way of learning, [Ethernaut](https://ethernaut.openzeppelin.com/) offers an immersive game-like environment perfect for understanding Solidity and smart contract vulnerabilities.
          
          <img src="/auditing-intro/6-end/end1.png" alt="Auditing Image" style="width: 100%; height: auto;">
          
          ## For The Aesthetes: Insights into Smart Contract Auditing
          
          One vital aspect of this space is auditing. If you're looking to be an auditor, [Solidit](https://solodit.xyz/) is an excellent tool for accessing audit reports from the most accomplished smart contract security professionals in the industry. Here at [Cyfrin](https://www.cyfrin.io/), we do smart contract security and auditing too, so don't hesitate to reach out.
          
          ## Sharpen Your Saw: Further Learning and Opportunities
          
          Although we have dipped quite deep into the iceberg that is security in this course, you must understand that there's still so much more to explore, and we're working on providing further security-based education, so stay tuned. However, to kick things off in your advanced security journey.
          
          This marks the end of the security lesson, but not of your journey. Now that you're armed with deep insights into the Web Three developer space, it might seem daunting to contemplate your next move. No worries though; here's the answer: apply your new knowledge. Whether you're joining a hackathon, delving into GitHub repos, or applying for jobs and grants, it's critical to utilize and develop your skills.
          
          ---
          
          Thanks to all who took the course and contributed to its creation. It's been a thrill to share this journey, and the excitement continues as we watch you dive in, continue your learning, and march forward, building on the cutting-edge technology our field offers. We look forward to seeing you in the Web Three and blockchain community and can’t wait to admire the wonderful things you build. Until then, happy coding!
          
          Bye!
          
    type: new_section
    enabled: true
---
