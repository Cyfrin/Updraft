---
title: Reporting - Storage Variables In Loops Should Be Cached
---

_Follow along with this video:_

---

### Storage Variables in a Loop Should be Cached

Searching again for our `@Audit` tag, we should next come across

```js
// @Audit-Gas: uint256 playerLength = players.length
```

This finding is pointing to a waste of gas incurred by having to always read from storage. In the `enterRaffle` function, Puppy Raffle is checking for duplicates in an inefficient way. We were going to recommend removing this check entirely elsewhere, but we should still report this gas issue.

````md
### [G-2] Storage Variables in a Loop Should be Cached

Everytime you call `players.length` you read from storage, as opposed to memory which is more gas efficient.

```diff
+ uint256 playersLength = players.length;
- for (uint256 i = 0; i < players.length - 1; i++) {
+ for (uint256 i = 0; i < playersLength - 1; i++) {
-    for (uint256 j = i + 1; j < players.length; j++) {
+    for (uint256 j = i + 1; j < playersLength; j++) {
      require(players[i] != players[j], "PuppyRaffle: Duplicate player");
}
}
```
````

Using a diff shows clearly what adjustments should be made to optimized for gas.

Next finding!
