---
title: DoS - Mitigation
---

_Follow along with this video:_

## 

---

# Strategies to Mitigate Duplicate Entries in Smart Contract Code

In the world of smart contracts and their associated applications, security is a pivotal asset. One primary issue often encountered is the challenge of dealing with duplicates. The system needs to acknowledge these duplicates without compromising its original function. So, how do we achieve this functionality while also mitigating potential risks?

## 1. Keeping the Original Functionality

Indeed, the easiest action we might suggest is to stop checking for duplicate entries altogether. However, our mission is to preserve the original functionality as much as possible, so let's dissect some potential solutions with that mind.

> **NOTE:** Remember, in suggesting these solutions, our ultimate goal is not to change the original functionality, but to enhance it for improved performance and security.

### A. Consider Allowing Duplicates

Firstly, let's consider the option of allowing duplicates. In altering the protocol's original functionality, there needs to be a solid foundation that supports this decision. So, why might we actually benefit from permitting duplicates? Here's the argument:

Users, if they want, can create new wallet addresses at will. In light of this, checking for duplicates does little to prevent the same user from entering multiple times, as it only prevents the same wallet address's multiple entries.

![](https://cdn.videotap.com/U40Y4UOf96RccTmlPQua-31.96.png)### B. Using a Mapping for Duplicate Checks

If the creators of the protocol insist on maintaining the check for duplicates, we suggest using a mapping to do this check. This strategy would grant constant time lookups to ascertain whether a user has already entered or not. Let's take a look at how we could change the existing code to implement this functionality:

Original Code:

```js
for (let i = 0; i < player.length; i++) {
  if (player[i] == _address) return true;
}
```

Some Modification:

```js
mapping(address => bool) entered;
if (entered[_address])return true;
```

With this mapping in place, the smart contract instantly reviews duplicates from only new players instead of traversing the whole array of players, thereby averting potential risks related to time complexity.

![](https://cdn.videotap.com/jAgeqw0BOdnWiWPCG0Kn-86.28.png)### C. Leveraging OpenZeppelin's Enumerable Library

Here's our last recommendation. An alternative technique could be to utilize OpenZeppelin's Enumerable library.

```js
import "@openzeppelin/contracts/access/Enumerable.sol";

contract SomeContract {
    using Enumerable for Enumerable.Set;
    Enumerable.Set private players;
    // In some function…
    // if (players.contains(_address))return true;
    // players.add(_address);
    }
```

This option might be a viable solution, improving both performance and security of the protocol.

![](https://cdn.videotap.com/HGAjhb2SQjm8rllHFWci-140.61.png)## Next Steps

With all these in mind, we now have a template to approach duplicate checks in smart contract codes. Though incomplete, it provides several viable options for updating the code while remaining true to the original functionality.

Regardless of whichever strategy you choose to mitigate this issue, ensure your chosen solution suits your unique smart contract needs. Remember to thoroughly review all proposed changes before implementation to ensure its robustness and security. This will help in maintaining the integrity of your contracts, and by extension, the entire protocol.
