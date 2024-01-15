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
