---
title: Do You Understand How Cool This Is
---

_Follow along with this video:_

---

### Do You Understand How Cool This Is

You now have the power to write READABLE Solidity code, and then rewrite it in Assembly/Huff to be SUPER gas optimized.

Furthermore, you now possess the ability to FORMALLY VERIFY that the gas optimized code functions identically to the Solidity code.

This is HUGE. I can't stress this enough. We've mathematically proven that _any_ function called on these two contracts will behave the same.

Now, this admittedly comes with a couple caveats, we are making some assumptions about our `safeTransferFrom` and `onERC721Received` functions. In other situations, these may not be safe assumptions you want to make - these sorts of functions will literally be where you'll find vulnerabilities like reentrancy.

```js
function _.onERC721Received(address, address, uint256, bytes) external => DISPATCHER(true);
function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true);
```

That said, this new super power should be incredibly valuable in our journey moving forwards. Let's recap everything we've covered in the next lesson!
