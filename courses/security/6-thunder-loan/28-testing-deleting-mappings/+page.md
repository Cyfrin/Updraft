---
title: Testing Deleting Mappings and Fixing Our Tools
---

### Deleting Mappings

Alright, so what happens if the owner passed False and is looking to disallow a token from the protocol?

- **If False:**
  - the passed token is used to acquire the AssetToken to which it's mapped
    ```js
    AssetToken assetToken = s_tokenToAssetToken[token];
    ```
  - the existing mapping is deleted
    ```js
    delete s_tokenToAssetToken[token];
    ```
  - an event is emitted, `AllowedTokenSet`. The same parameters are passed of course, but this time we emit `False` indicating that the token is being disallowed
    ```js
    emit AllowedTokenSet(token, assetToken, allowed);
    ```
  - Finally, we again return the AssetToken which was disallowed.
    ```js
    return assetToken;
    ```

What we're ultimately doing above is removing an allowed token mapping. Something to keep in mind at this point is that many of our conditional checks so far have been dependent on this mapping returning `address(0)` if a token is _not_ allowed.

We should definitely verify that this is the case.

> **Note:** I wish I could tell you that chisel is a great way to quickly check this, but currently chisel doesn't delete mappings properly! Regrettably, this doesn't work. There's currently an open issue on their GitHub you can view [**here**](https://github.com/foundry-rs/foundry/issues/7318).

Fortunately we can check this pretty quickly in Remix.

Here's a contract you can copy over:

<details>
<summary>Remix Delete Mapping</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract DeleteMappingTest {
    mapping(address => address) public token2token;

    function set(address token, address token2) public {
        token2token[token] = token2;
    }

    function remove(address token) public {
        delete token2token[token];
    }

    function get (address token) public view returns (address) {
        return token2token[token];
    }
}
```

</details>


If we deploy the above contract in Remix we can then set two addresses as `token` and `token2` to see the mapping working as expected:

![testing-deleting-mapping1](/security-section-6/28-testing-deleting-mappings/testing-deleting-mapping1.png)

We can then call the `remove` function, passing token. We see that our getter is now returning `address(0)`.

### Wrap Up

Everything is working the way `Thunder Loan` hopes, but this is a perfect example of an assumption that is worth testing during security reviews.

See you in the next lesson, let's keep going!
