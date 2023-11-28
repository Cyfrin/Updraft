---
title: Recon - Refund
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding the Active Players Index: A Deeper Delve into Solidity Coding

In this post we go down the rabbit hole to understand the intricacies of handling arrays, managing edge cases, and safeguarding against vulnerabilities in Solidity, the contract-oriented language of Ethereum.

## Getting Active Players Index

Let's start with the function of getting the active players index. This seemingly simple process has a twist to it - the function allows for blank spots within the array.

While on surface this might not seem like an issue, there is a potential caveat. A pitfall known as Minor Extractable Value (MEV) presents itself when people try to "front-run" this function. For the novice, MEV refers to the ability of miners or validators to exploit their position for profit by reordering or censoring transactions within the blocks they produce. However, to keep things simplified, let's skip the MEV complexities in this explanation and imagine that the function works perfectly as expected without it.

![](https://cdn.videotap.com/ROdzfVev0ULFYEDhkigd-14.19.png)## Tracing The Function

Starting with the premise that our active players array works as desired, let's unravel the intricacies of this function. Here's an illustrative code for reference:

```solidity
function getActivePlayerIndex(uint playerIndex) public view returns (address) {address playerAddress = players[playerIndex];require(playerAddress == msg.sender, "Player mismatch!");require(playerAddress != address(0), "This player has either refunded or is not active");return playerAddress;}
```

The function begins by obtaining the player's address from the player index. This is pretty straightforward - click on a player, get their address.

Next, it brings in two requisites for the player's address. These validation checks solidify the function's parameters:

- `msg.sender` must be equal to the player's address. This check is in line with good security practices to ensure that only the owner of the account can initiate transactions.
- The player's address should not return to `address(0)`. Essentially, this check protects the system from getting an address that has been removed or flagged as inactive.

These require statements guard the integrity of the function while preventing unauthorized access.

## Dealing with Player Removal

But what happens to the player details post-removal? Digging deeper into the code, once the value transacts successfully, the function resets the player's address to zero - `address(0)`. This effectively cleans the slot for future use.

> Note: Resetting to zero essentially deletes that player entry, signaling they're either refunded or not active.

## Spotting the Send Value Function

Interestingly, the process implies the use of a `sendValue` function. Now, this function plays a crucial role. It quite literally sends the entry fee back to the player. But is this `sendValue` essentially a built-in function or is there an external library managing this aspect?

Delving further clarifies that this function sourced from OpenZeppelin, a library well-known for providing reusable smart contracts in the Ethereum community. Examining it shows a range of validation or 'require' conditions.

```solidity
function sendValue(address payable recipient, uint256 amount) internal {require(address(this).balance >= amount, "Address: insufficient balance");(bool success, ) = recipient.call{value: amount}("");require(success, "Address: unable to send value, recipient may have reverted");}
```

The `sendValue` function is equivalent to essentially sending the entry fee back to the `msg.sender`.

## Did You Spot the Glitch?

Here's a scenario: everything seems to be flowing well, the MEV complexities were ignored as promised, and we got a little bit of help understanding what's going on. But amidst this, there seems to be one more issue... can you tell what it might be? Well, let's call this a cliffhanger, and explore the issue in the next blog entry. Until then, happy coding!
