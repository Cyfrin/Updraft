---
title: Governance Tokens
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/KWdpcX5Oz9Q?si=yqXMEzIdkQUImNSh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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
