---
title: Phase 4 Reporting
---

---

### Reporting

**Before we do anything - I'm going to challenge you to do write ups yourself _first_ before returning and walking through the process with me.**

Reference our [**finding_layout.md**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/finding_layout.md) template for your reports and then compare your write ups to mine in the dropdowns below (you can use the titles as hints!). Our informational findings can be a little lower effort...

---

<details>
<summary>[I-1] `PoolFactory::PoolFactory___PoolDoesNotExist` is not used and should be removed</summary>

### [I-1] `PoolFactory::PoolFactory___PoolDoesNotExist` is not used and should be removed

```diff
- error PoolFactory__PoolDoesNotExist(address tokenAddress);
```

</details>


<details>
<summary>[I-2] `PoolFactory::constructor` Lacking zero address check</summary>

### [I-2] `PoolFactory::constructor` Lacking zero address check

```diff
constructor(address wethToken) {
+   if(wethToken == address(0)){
+    revert();
+}
    i_wethToken = wethToken;
}
```

</details>


<details>
<summary>[I-3] `PoolFactory::createPool should use .symbol() instead of .name()</summary>

### [I-3] `PoolFactory::createPool should use .symbol() instead of .name()

```diff
- string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());
+ string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).symbol());
```

</details>


<details>
<summary>[I-4] `TSwapPool::constructor` Lacking zero address check - wethToken & poolToken</summary>

### [I-4] `TSwapPool::constructor` Lacking zero address check - wethToken & poolToken

```diff
constructor(
    address poolToken,
    address wethToken,
    string memory liquidityTokenName,
    string memory liquidityTokenSymbol
)
    ERC20(liquidityTokenName, liquidityTokenSymbol)
{
+   if(wethToken || poolToken == address(0)){
+       revert();
+   }
    i_wethToken = IERC20(wethToken);
    i_poolToken = IERC20(poolToken);
}
```

</details>


<details>
<summary>[I-5] `TSwapPool` events should be indexed</summary>

### [I-5] `TSwapPool` events should be indexed

```diff
- event Swap(address indexed swapper, IERC20 tokenIn, uint256 amountTokenIn, IERC20 tokenOut, uint256 amountTokenOut);
+ event Swap(address indexed swapper, IERC20 indexed tokenIn, uint256 amountTokenIn, IERC20 indexed tokenOut, uint256 amountTokenOut);
```

</details>


### Wrap Up

How'd you do!? In the next lesson we're going to go through some more severe vulnerabilities with more complex write ups. See you there.
