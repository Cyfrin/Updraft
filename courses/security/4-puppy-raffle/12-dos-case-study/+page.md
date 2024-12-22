---
title: DoS - Case Study
---

_Follow along with this video:_

---

### Live DoS Examples

In this lesson, we delve into two different kinds of **Denial of Service Attacks** or **DoS attacks** as they were uncovered from real security reviews. Owen, the founder of Guardian Audits, will share insights from his work, showing us how these vulnerabilities arise and the best frameworks to uncover them.

### Introduction to Owen

The case studies we'll be covering today are brought to us by Owen - the Founder of Guardian Audits. Guardian Audits was founded 2 years ago and has since made Web3 more secure by uncovering hundreds of vulnerabilities.

In this lesson, Owen provides a breakdown of audits in which DoS vulnerabilities were uncovered and we're greatly appreciative to Owen for his contributions. 🙏

## Case Study 1: Bridges Exchange

The first DoS vulnerability we'll touch on was found in the dividends distribution system of the Bridges exchange.

### Attack Mechanics

The issue arises from an `unbounded for-loop` in the `distributeDividends` function, resulting in the risk of a DoS attack. An ill-intentioned party can cause the distribute dividends function to violate the block gas limit, effectively blocking all dividends by continually generating new addresses and minting minimal quantities of the Bridges pair token.

Let's look at the code.

```js
function distributeDividends(uint amount) public payable lock {
   require(amount == msg.value, "don't cheat");
   uint length = users.length;
   amount = amount.mul(magnitude);
   for (uint i; i < length; i++){
      if(users[i] != address(0)){
         UserInfo storage user = userInfo[users[i]];
         user.rewards += (amount.mul(IERC20(address(this).balanceOf(users[i])).div(totalSupply.sub(MINIMUM_LIQUIDITY))));
      }
   }
}
```

We can see the `unbounded for-loop` above. This is looping through an array, `users[]`, the length of which has no limits.

The practical effect of this is that, were the length of the `users[]` array long enough, the gas required to call this function would be prohibitively expensive. Potentially hitting block caps and being entirely uncallable.

### Confirming the Attack Vector

In order to verify this is a vulnerability. We should investigate under what circumstances the `user[]` array can be added to.

By searching for the variable we see the array is appended to in the mint function:

```js
function mint(address to) external lock returns (uint liquidity){
   ...
   if(IERC20(address(this).balanceOf(to) == 0)){
      users.push(to);
   }
}
```

In theory, an attacker could generate new wallet addresses (or transfer the minted tokens) to call this function repeatedly, bloating the array and DOSing the function.

The resolution for the Bridges Exchange was to refactor things such that the `for-loop` wasn't needed.

## Case Study 2: Dos Attack in GMX V2

The second instance of a DoS attack shows up in the GMX V2 system and is entirely different than the Bridges Exchange case mentioned above.

### Attack Mechanics

The problem arises from a boolean indicator called `shouldUnwrapNativeToken`. This flag can be leveraged to set up positions that can't be reduced by liquidations or ADL (Auto-Deleveraging) orders. When the native token unwraps (with the flag set to true), a position can be formed by a contract that can't receive the native token. This leads to order execution reverting, causing a crucial function of the protocol to become unexecutable.

### Into the Code

Let's investigate what this looks like in code.

Within the GMX V2 `DecreaseOrderUtils` library we have the `processOrder` function. While processing an order with this library we eventually will call `transferNativeToken` within `TokenUtils.sol`.

```js
function transferNativeToken(DataStore dataStore, address receiver, uint256 amount) internal {
   if (amount == 0) {return;}

   uint256 gasLimit = dataStore.getUint(keys.NATIVE_TOKEN_TRANSFER_GAS_LIMIT);

   (bool success, bytes memory data) = payable(receiver).call{value: amount, gas: gasLimit} ("");

   if (success){return;}

   string memory reason = string(abi.encode(data));
   emit NativeTokenTransferReverted(reason);

   revert NativeTokenTransferError(receiver, amount);
}

```

Ultimately, this is where the problem lies. When a position in the protocol is liquidated, or de-leveraged, and the `shouldUnwrapNativeToken` flag is true, this function is called in the process.

Were the `receiver` address a contract which was unable to receive value - the liquidation of the user would revert every time.

This is a critical flaw!

You may notice another potential vulnerability in the same function - the `gasLimit`. Were the receiver a contract address which expended unnecessary gas in it's receive function - this call would also revert!

### Wrap Up

To summarize, here are a couple things to keep an eye out for which may lead to DoS attacks:

1. **For-Loops**: Take extra caution with for-loops. Ask yourself these questions:
   - Is the iterable entity bounded by size?
   - Can a user append arbitrary items to the list?
   - How much does it cost the user to do so?
2. **External calls**: These can be anything from transferring Eth to calling a third-party contract. Evaluate ways these external calls could fail, leading to an incomplete transaction.

DoS attacks put simply are - the denial of functions of a protocol. They can arise from multiple sources, but the end result is always a transaction failing to execute.

Be vigilant for the above situations in your security reviews. Let's next look at what a PoC for Denial of Service is like.
