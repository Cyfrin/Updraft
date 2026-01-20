---
title: TokenFactory.sol
---

_Follow along with the video lesson:_

---

### TokenFactory.sol

![tokenfactory1](/security-section-7/9-tokenfactory/tokenfactory1.png)

Two down, two to go! The next contract we should take a look at is TokenFactory.sol. We should recall from our diagram this is responsible for deploying L1Token.sol.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/*
* @title TokenFactory
* @dev Allows the owner to deploy new ERC20 contracts
* @dev This contract will be deployed on both an L1 & an L2
*/
contract TokenFactory is Ownable {
    mapping(string tokenSymbol => address tokenAddress) private s_tokenToAddress;

    event TokenDeployed(string symbol, address addr);

    constructor() Ownable(msg.sender) { }

    /*
     * @dev Deploys a new ERC20 contract
     * @param symbol The symbol of the new token
     * @param contractBytecode The bytecode of the new token
     */
    function deployToken(string memory symbol, bytes memory contractBytecode) public onlyOwner returns (address addr) {
        assembly {
            addr := create(0, add(contractBytecode, 0x20), mload(contractBytecode))
        }
        s_tokenToAddress[symbol] = addr;
        emit TokenDeployed(symbol, addr);
    }

    function getTokenAddressFromSymbol(string memory symbol) public view returns (address addr) {
        return s_tokenToAddress[symbol];
    }
}
```

An important aspect of this that should stand out from the NATSPEC is that this contract is expected to be deployed on both L1 and L2. We should recall from the protocol's README:

```
- Assume the `deployToken` will always correctly have an L1Token.sol copy, and not some [weird erc20](https://github.com/d-xo/weird-erc20)
```

This worries me. This **_may_** be alright, the protocol is telling us to make some assumptions here, but this is scary. I would almost certainly leave a note and verify that the protocol doesn't want this situation in scope.

```js
// @Audit-Question: Are we sure we talk to omit this from scope? This is scary.
function deployToken(string memory symbol, bytes memory contractBytecode) public onlyOwner returns (address addr) {...}
```

We'll definitely be taking a closer look at this situation, scope or not. In a `competitive audit`, pushing out of scope like this may not be worth it, but in a `private audit` I would discussion this code with the protocol and challenge the omission from scope.

Ultimately, it seems like there could be better ways to do this. Let's keep going for now, in the next lesson we'll look at why this situation may be a cause for concern.
