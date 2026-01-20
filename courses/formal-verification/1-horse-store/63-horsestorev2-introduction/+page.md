---
title: HorseStoreV2 Introduction
---

_Follow along with this video:_

---

### Setting Up HorseStoreV2

We've learnt so much in this section already, but we're about to turn it up even further with a really professional smart contract.

Be sure to have installed openzeppelin-contracts@v5.0.1 via
```
forge install openzeppelin/openzeppelin-contracts@v5.0.1 --no-commit
```

Create a `HorseStoreV2` folder within your `src` folder. This is where HorseStore.sol will reside!  Here's the contract for reference:

<details>
<summary>HorseStore.sol</summary>

```js
// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IHorseStore} from "./IHorseStore.sol";

/* 
 * @title HorseStore
 * @author equestrian_lover_420
 * @notice An NFT that represents a horse. Horses should be fed daily to keep happy, ideally several times a day. 
 */
contract HorseStore is IHorseStore, ERC721Enumerable {
    string constant NFT_NAME = "HorseStore";
    string constant NFT_SYMBOL = "HS";
    uint256 public constant HORSE_HAPPY_IF_FED_WITHIN = 1 days;

    mapping(uint256 id => uint256 lastFedTimeStamp) public horseIdToFedTimeStamp;

    constructor() ERC721(NFT_NAME, NFT_SYMBOL) {}

    /*
     * @notice allows anyone to mint their own horse NFT. 
     */
    function mintHorse() external {
        _safeMint(msg.sender, totalSupply());
    }

    /* 
     * @param horseId the id of the horse to feed
     * @notice allows anyone to feed anyone else's horse. 
     * 
     * @audit-medium: Feeding unminted horeses is currently allowed! 
     */
    function feedHorse(uint256 horseId) external {
        horseIdToFedTimeStamp[horseId] = block.timestamp;
    }

    /*
     * @param horseId the id of the horse to check
     * @return true if the horse is happy, false otherwise
     * @notice a horse is happy IFF it has been fed within the last HORSE_HAPPY_IF_FED_WITHIN seconds
     */
    function isHappyHorse(uint256 horseId) external view returns (bool) {
        if (horseIdToFedTimeStamp[horseId] <= block.timestamp - HORSE_HAPPY_IF_FED_WITHIN) {
            return false;
        }
        return true;
    }
}
```

</details>

You should also add an interface IHorseStore.sol to this folder, you can copy and paste this one:

<details>
<summary>IHorseStore.sol Interface</summary>

```js
    // SPDX-License-Identifier: GPL-3.0-only
    pragma solidity 0.8.20;

    import {IERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

    /* 
    * @title IHorseStore
    * @author equestrian_lover_420
    */
    interface IHorseStore is IERC721Enumerable {
        function mintHorse() external;

        function feedHorse(uint256 horseId) external;

        function isHappyHorse(uint256 horseId) external view returns (bool);
    }
```

</details>

The final bit of preparation we'll need is to adjust our `foundry.toml` to include our new remappings.  Our remappings should look like:

```toml
remappings = [
    'foundry-huff/=lib/foundry-huff/src/',
    '@openzeppelin/=lib/openzeppelin-contracts/',
]
```

You can run `forge build` to assure things compile when you think you're ready!

### HorseStoreV2

Now, this contract is a little more intense, but it's not too complicated. Unlike our HorseStoreV1, we've got a little more going on.

We have some imports:

```js
import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
```

and we also have a mapping in play:

```js
mapping(uint256 id => uint256 lastFedTimeStamp) public horseIdToFedTimeStamp;
```

Ultimately however all this contract allows a user to do is to mint a horse NFT via the `mintHorse()` function, feed a horse via `feedHorse()` (this function just updates a mapping) and check if a horse is happy via `isHappyHorse()`

Our goal in the coming lessons will be to rewrite this V2 contract in Huff!

Before moving forward, I want you to take a look at the [GitHub repo](https://github.com/Cyfrin/1-horse-store-s23/tree/main/test/v2) for this lesson and copy over the files contained within `test/v2`. We won't write all these tests from scratch, but these files will allow us to test our `HorseStoreV2` contracts with ease and compare our implementations.

Feel free to pause here and try writing `HorseStoreV2` in Huff yourself! It will be a great opportunity to challenge yourself and see how much you've learnt so far!

Otherwise, let's get started and write `HorseStoreV2` in Huff together!