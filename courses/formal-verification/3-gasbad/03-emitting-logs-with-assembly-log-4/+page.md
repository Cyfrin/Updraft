---
title: Emitting Logs With Assembly -  Log4
---

_Follow along with this video:_

---

### Emitting Logs With Assembly - Log4

Let's start by taking a look at some of the Assembly being employed in `GasBadNFTMarketplace.sol`.

```js
/*
* @notice Method for listing NFT
* @param nftAddress Address of NFT contract
* @param tokenId Token ID of NFT
* @param price sale price for each item
*/
function listItem(address nftAddress, uint256 tokenId, uint256 price) external {
    // Checks
    if (price <= 0) {
        revert NftMarketplace__PriceMustBeAboveZero();
    }

    // Effects (Internal)
    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);

    // emit ItemListed(msg.sender, nftAddress, tokenId, price);
    assembly {
        // This is the data
        mstore(0x00, price)
        log4(
            0x00,
            0x20,
            // keccak256("ItemListed(address,address,uint256,uint256)")
            0xd547e933094f12a9159076970143ebe73234e64480317844b0dcb36117116de4,
            caller(),
            nftAddress,
            tokenId
        )
    }

    // Interactions (External)
    IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
}
```

In the listItem function, our Assembly block is being used to emit an event, or emit logs. We can see how Log4 works through our handy reference in [**evm.codes**](https://www.evm.codes/).

![emitting-logs-with-assembly-log-41](/formal-verification-3/3-emitting-logs-with-assembly/emitting-logs-with-assembly-log-41.png)

This op code will append our log record with 4 topics and takes 6 stack input elements. Let's consider how this is being used in our contract.

```js
mstore(0x00, price); // This is storing our price parameter in memory
log4(
  0x00, // Start at position 0 in memory
  0x20, // For as size of 32 bytes (this is the price we just stored in memory)
  // The first topic is the hash of our function selector: keccak256("ItemListed(address,address,uint256,uint256)")
  0xd547e933094f12a9159076970143ebe73234e64480317844b0dcb36117116de4,
  caller(), // This Assembly acquires our msg.sender
  nftAddress, // nftAddress parameter passed to the function
  tokenId // tokenId parameter passed to the function
);
```

In an audit scenario we'd absolutely be double checking these parameters.

We see this Assembly block repeated throughout GasBadNFTMarketplace.sol in the functions `listItem`, `cancelListing`, `buyItem`, and `updateListing`. In essence, with the exception of the bytes4 in `onERC721Received`, this is all that's being changed in this over our solidity implementation of this protocol.

### Wrap Up

Ok, this was just a small walkthrough of the Assembly changes made in the Gas Bad implementation of this protocol. We know this _shouldn't_ have any effect on anything, but fortunately we don't have to hope, we can formally verify.

In the next lesson we'll outline a game plan for how we'll apply Certora formal verification to this code base!

See you there!
