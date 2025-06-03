---
title: Vacuity
---

_Follow along with this video:_

---

> ❗ **NOTE**
> Previous versions of the prover would result in vacuity errors when the ALWAYS(1) summary declaration was made on \_.safeTransferFrom in our methods block. This may now HAVOC for you. We've switched previous references to ALWAYS(1) to DISPATCH(true), as such your verification at this point may pass.

### Vacuity

In lieu of updating adjusting this behaviour, let's simply define vacuity and better understand it's impact and how to avoid it in our testing.

![vacuity1](/formal-verification-3/20-vacuity/vacuity1.png)

Simply put, vacuity defines a situation in which our assertion is effectively unchecked, because we aren't supplying the prover an input that satisfies our spec.

Here was the root of **_our_** issue:

```js
methods {
    function _.safeTransferFrom(address,address,uint256) external => ALWAYS(1);
}
```

In previous versions of the prover, when we assigned the summary declaration of `ALWAYS(1)` to our `safeTransferFrom` method, Certora wouldn't recognize this as valid since the function _actually_ returns a `bytes4`.

> ❗ **NOTE** > `onERC721Received` is called as a result of `safeTransferFrom` in the `listItem` function of `BadGasNftMarketplace`.

```js
function onERC721Received(address, /*operator*/ address, /*from*/ uint256, /*tokenId*/ bytes calldata /*data*/ )
    external
    pure
    returns (bytes4)
{
    // return this.onERC721Received.selector;
    // This saves 0 gas - good job solidity!
    return bytes4(0x150b7a02);
}
```

The simple resolution to this problem for us is to instead leverage the DISPATCH(true) summary declaration.

```js
methods {
    function _.safeTransferFrom(address,address,uint256) external => DISPATCH(true);
}
```

With this change in place, we should be able to run the prover once more...

![vacuity2](/formal-verification-3/20-vacuity/vacuity2.png)

🥳
