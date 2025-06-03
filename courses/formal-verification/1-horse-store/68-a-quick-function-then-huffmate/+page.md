---
title: A Quick Function Then Huffmate
---

_Follow along with this video:_

---

I'll keep a running reminder of our current total contract state at the top of each lesson moving forward as a point of reference.

<details>
<summary>HorseStoreV2.huff</summary>

```js
/* HorseStore Interface */
#define function mintHorse() nonpayable returns()
#define function feedHorse(uint256) nonpayable returns()
#define function isHappyHorse(uint256) view returns(bool)
#define function horseIdToFedTimeStamp(uint256) view returns(uint256)
#define function HORSE_HAPPY_IF_FED_WITHIN() view returns(uint256)

#define constant HORSE_FED_TIMESTAMP_LOCATION = FREE_STORAGE_POINTER()
#define constant HORSE_HAPPY_IF_FED_WITHIN_CONST = 0x0000000000000000000000000000000000000000000000000000000000015180

#define macro IS_HAPPY_HORSE() = takes (0) returns (0) {
    0x04 calldataload                 // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]    // [HORSE_FED_TIMESTAMP_LOCATION. horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)      // [horseFedTimestamp]
    timestamp                         // [timestamp, horseFedTimestamp]
    dup2 dup2                         // [timestamp, horseFedTimestamp, timestamp, horseFedTimestamp]
    sub                               // [timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    [HORSE_HAPPY_IF_FED_WITHIN_CONST] // [HORSE_HAPPY_IF_FED_WITHIN_CONST, timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    gt                                // [horse_has_been_fed_within_1_day, timestamp, horseFedTimestamp]
    start_return_true jumpi           // [timestamp, horseFedTimestamp]
    eq                                // [timestamp == horseFedTimestamp]
    start_return jump                 // [timestamp == horseFedTimestamp]

    start_return_true:
    0x01                              // [0x01, timestamp, horseFedTimestamp]

    start_return:                     // [timestamp == horseFedTimestamp] <-- only if `gt` returns false!
    0x00 mstore
    0x20 0x00 return
}

#define function FEED_HORSE() = takes (0) returns (0) {
    timestamp                       // [timestamp]
    0x04 calldataload               //[horseId, timestamp]
    [HORSE_FED_TIMESTAMP_LOCATION]  // [HORSE_FED_TIMESTAMP_LOCATION, horseId, timestamp]
    STORE_ELEMENT_FROM_KEYS(0x00)   // []
}

#define macro GET_HORSE_FED_TIMESTAMP() = takes (0) returns (0) {
    0x04 calldataload                // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]   // [HORSE_FED_TIMESTAMP_LOCATION, horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)     // [horseFedTimestamp]

    0x00 mstore                      // []    // Memory: [0x00: horseFedTimestamp]
    0x20 0x00 return                 // []
}

#define macro MAIN() = takes (0) returns (0){
    0x00 calldataload 0xE0 shr      //  [function_selector]

    dup1 __FUNC_SIG(mintHorse) eq mintHorse jumpi
    dup1 __FUNC_SIG(feedHorse) eq feedHorse jumpi
    dup1 __FUNC_SIG(isHappyHorse) eq isHappyHorse jumpi
    dup1 __FUNC_SIG(horseIdToFedTimeStamp) eq horseIdToFedTimeStamp jumpi
    dup1 __FUNC_SIG(HORSE_HAPPY_IF_FED_WITHIN) eq horseHappyFedWithin jumpi

    mintHorse:
        MINT_HORSE()
    feedHorse:
        FEED_HORSE()
    isHappyHorse:
        IS_HAPPY_HORSE()
    horseIdToFedTimeStamp:
        GET_HORSE_FED_TIMESTAMP()
    horseHappyFedWithin:
        HORSE_HAPPY_FED_WITHIN()
}
```

</details>


We'll start this lesson by knocking out the getting macro for our `HORSE_HAPPY_IF_FED_WITHIN_CONST` constant. All we need to do is call that location in storage, store the data at that location in memory, return that data from memory. Very simple.

```js
#define macro HORSE_HAPPY_IF_FED_WITHIN_CONST() = takes(0) returns(0) {
    [HORSE_HAPPY_IF_FED_WITHIN_CONST]     // [0x0000000000000000000000000000000000000000000000000000000000015180]
    0x00 mstore                           // []  // Memory: [0x00: 0x0000000000000000000000000000000000000000000000000000000000015180]
    0x20 0x00 return                      // []
}
```

### mintHorse, totalSupply and using Huffmate

Here comes the hard stuff, the minting and the constructor. We'll start with the minting, as always it's best to take a look at the Solidity to remind ourselves of what we're trying to accomplish at a low level:

```js
function mintHorse() external {
    _safeMint(msg.sender, totalSupply());
}
```

Working with `ERC721`'s in Huff isn't perfect, there are a few issues, so rather than importing directly, we're going to copy some specific sections of the `Huffmate` libraries to get us set up for `ERC721s`.

Assure your contract closely resembles below to avoid missing anything we've added over from `Huffmate`. We'll go through, in detail, anything important to know for the purposes of this course.

<details>
<summary>HorseStoreV2.huff</summary>

```js
/* Imports */
#include "../../lib/huffmate/src/data-structures/Hashmap.huff"
#include "../../lib/huffmate/src/utils/CommonErrors.huff"

/* HorseStore Interface */
#define function mintHorse() nonpayable returns ()
#define function feedHorse(uint256) nonpayable returns ()
#define function isHappyHorse(uint256) view returns (bool)
#define function horseIdToFedTimeStamp(uint256) view returns (uint256)
#define function HORSE_HAPPY_IF_FED_WITHIN() view returns (uint256)

/* ERC721 Interface */
#define function name() nonpayable returns (string)
#define function symbol() nonpayable returns (string)
#define function tokenURI(uint256) nonpayable returns (string)

#define function transfer(address,uint256) nonpayable returns ()
#define function transferFrom(address,address,uint256) nonpayable returns ()
#define function safeTransferFrom(address,address,uint256) nonpayable returns ()
#define function safeTransferFrom(address,address,uint256,bytes) nonpayable returns ()

#define function approve(address,uint256) nonpayable returns ()
#define function setApprovalForAll(address,bool) nonpayable returns ()

#define function getApproved(uint256) view returns (address)
#define function isApprovedForAll(address,address) view returns (bool)
#define function ownerOf(uint256) view returns (address)
#define function balanceOf(address) view returns (uint256)
#define function supportsInterface(bytes4) view returns (bool)

// Events
#define event Transfer(address,address,uint256)
#define event Approval(address,address,uint256)
#define event ApprovalForAll(address,address,bool)

/* Constants */
#define constant HORSE_HAPPY_IF_FED_WITHIN_CONST = 0x0000000000000000000000000000000000000000000000000000000000015180 // 1 days

/* Storage Slots */
#define constant OWNER_LOCATION = FREE_STORAGE_POINTER()
#define constant HORSE_FED_TIMESTAMP_LOCATION = FREE_STORAGE_POINTER()
#define constant BALANCE_LOCATION = FREE_STORAGE_POINTER()
#define constant SINGLE_APPROVAL_LOCATION = FREE_STORAGE_POINTER()

// "NON_PAYABLE" Revert Message String
#define constant NON_PAYABLE_ERROR = 0xb4e4f4e5f50415941424c45000000000000000000000000000000000000000000
#define constant NON_PAYABLE_LENGTH = 0x0b

// Immutables offsets
#define constant NAME_OFFSET =          0x0000000000000000000000000000000000000000000000000000000000000080
#define constant NAME_LENGTH_OFFSET =   0x00000000000000000000000000000000000000000000000000000000000000a0
#define constant SYMBOL_OFFSET =        0x0000000000000000000000000000000000000000000000000000000000000020
#define constant SYMBOL_LENGTH_OFFSET = 0x0000000000000000000000000000000000000000000000000000000000000040

/* HorseStore Methods */

#define macro HORSE_HAPPY_IF_FED_WITHIN() = takes (0) returns (0) {
    [HORSE_HAPPY_IF_FED_WITHIN_CONST] // [HORSE_HAPPY_IF_FED_WITHIN]
    0x00 mstore
    0x20 0x00 return
}

#define macro GET_HORSE_FED_TIMESTAMP() = takes (0) returns (0) {
    0x04 calldataload              // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION] // [HORSE_FED_TIMESTAMP_LOCATION, horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)   // [horseFedTimestamp] // This runs an sload too

    0x00 mstore                    // [] Store value in memory.
    0x20 0x00 return               // Returns what' sin memory
}



#define macro FEED_HORSE() = takes (0) returns (0) {
    timestamp                       // [timestamp]
    0x04 calldataload               // [horseId, timestamp]
    // We setup for the STORE_ELEMENT_FROM_KEYS macro with:
    // mapping Storage Slot (this is used to calc the value storage slot), key, newValue
    [HORSE_FED_TIMESTAMP_LOCATION]  // [HORSE_FED_TIMESTAMP_LOCATION, horseId, timestamp]
    STORE_ELEMENT_FROM_KEYS(0x00)   // []
    stop
}

#define macro IS_HAPPY_HORSE() = takes (0) returns (0) {
    0x04 calldataload                   // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]      // [HORSE_FED_TIMESTAMP_LOCATION, horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)        // [horseFedTimestamp]
    timestamp                           // [timestamp, horseFedTimestamp]
    dup2 dup2                           // [timestamp, horseFedTimestamp, timestamp, horseFedTimestamp]
    sub                                 // [timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    [HORSE_HAPPY_IF_FED_WITHIN_CONST]   // [HORSE_HAPPY_IF_FED_WITHIN, timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    gt                                  // [HORSE_HAPPY_IF_FED_WITHIN > timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    start_return_true jumpi             // [timestamp, horseFedTimestamp]
    eq                                  // [timestamp == horseFedTimestamp]
    start_return
    jump

    start_return_true:
    0x01

    start_return:
    // Store value in memory.
    0x00 mstore

    // Return value
    0x20 0x00 return
}

//////////////////////////////////////////////////////////////
//                            ERC721 FUNCTIONS
///////////////////////////////////////////////////////////////

/// @notice Constructor
#define macro ERC721_CONSTRUCTOR() = takes (0) returns (0) {
    // Constructor arguments:
    // ?, name_size, name, ?, symbol_size, symbol

    // This constructor will return the runtime bytecode with all the
    // constructor arguments concatenated at the end.

    // Copy the runtime bytecode with constructor argument concatenated.
    0xb                                     // [offset] - constructor code size
    dup1                                    // [offset, offset]
    codesize                                // [total_size, offset, offset]
    sub                                     // [runtime_size, offset]
    dup1                                    // [runtime_size, runtime_size, offset]
    swap2                                   // [offset, runtime_size, runtime_size]
    returndatasize                          // [return_offset, offset, runtime_size, runtime_size]
    codecopy                                // [runtime_size]

    // Return the runtime bytecode.
    returndatasize                          // [return_offset, runtime_size]
    return                                  // []
}

#define macro CONSTRUCTOR() = takes (0) returns (0) {
    ERC721_CONSTRUCTOR()
}

#define macro MAIN() = takes (0) returns (0) {
    // Identify which function is being called.
    0x00 calldataload 0xE0 shr

    dup1 __FUNC_SIG(feedHorse) eq feedHorse jumpi
    dup1 __FUNC_SIG(isHappyHorse) eq isHappyHorse jumpi
    dup1 __FUNC_SIG(horseIdToFedTimeStamp) eq horseIdToFedTimeStamp jumpi
    dup1 __FUNC_SIG(mintHorse) eq mintHorse jumpi
    dup1 __FUNC_SIG(HORSE_HAPPY_IF_FED_WITHIN) eq horseHappyIfFedWithin jumpi

    dup1 __FUNC_SIG(approve) eq approve jumpi
    dup1 __FUNC_SIG(setApprovalForAll) eq setApprovalForAll jumpi
    dup1 __FUNC_SIG(transferFrom) eq transferFrom jumpi

    dup1 __FUNC_SIG(name) eq name jumpi
    dup1 __FUNC_SIG(symbol) eq symbol jumpi
    dup1 __FUNC_SIG(tokenURI) eq tokenURI jumpi
    dup1 __FUNC_SIG(supportsInterface)eq supportsInterface jumpi

    dup1 __FUNC_SIG(getApproved) eq getApproved jumpi
    dup1 __FUNC_SIG(isApprovedForAll) eq isApprovedForAll jumpi

    dup1 __FUNC_SIG(balanceOf) eq balanceOf jumpi
    dup1 __FUNC_SIG(ownerOf)eq ownerOf jumpi

    dup1 __FUNC_SIG(safeTransferFrom) eq safeTransferFrom jumpi
    dup1 __FUNC_SIG("safeTransferFrom(address,address,uint256,bytes)") eq safeTransferFromData jumpi

    // Revert on failed dispatch
    0x00 dup1 revert

    feedHorse:
        FEED_HORSE()
    isHappyHorse:
        IS_HAPPY_HORSE()
    mintHorse:
        MINT_HORSE()
    horseIdToFedTimeStamp:
        GET_HORSE_FED_TIMESTAMP()
    horseHappyIfFedWithin:
        HORSE_HAPPY_IF_FED_WITHIN()

    approve:
        APPROVE()
    setApprovalForAll:
        SET_APPROVAL_FOR_ALL()
    transferFrom:
        TRANSFER_FROM()
    name:
        NAME()
    symbol:
        SYMBOL()
    tokenURI:
        TOKEN_URI()
    supportsInterface:
        SUPPORTS_INTERFACE()
    getApproved:
        GET_APPROVED()
    isApprovedForAll:
        IS_APPROVED_FOR_ALL()
    balanceOf:
        BALANCE_OF()
    ownerOf:
        OWNER_OF()
    safeTransferFrom:
        SAFE_TRANSFER_FROM()
    safeTransferFromData:
        SAFE_TRANSFER_FROM_WITH_DATA()
    stop
}


////////////////////////////////////////////////////
////////////////// ERC721 Methods //////////////////
////////////////////////////////////////////////////


/// >>>>>>>>>>>>>>>>>>>>>  VIEW FUNCTIONS  <<<<<<<<<<<<<<<<<<<<<< ///

/// @notice Name
/// @notice Returns the token name string
#define macro NAME() = takes (0) returns (0) {
    NON_PAYABLE()                               // []
    _GET_IMMUTABLE(NAME_OFFSET, 0x00)           // [name_value]
    _GET_IMMUTABLE(NAME_LENGTH_OFFSET, 0x00)    // [name_length, name_value]
    0x20 0x00 mstore                            // [name_length, name_value]
    0x20 mstore                                 // [name_value]
    0x40 mstore                                 // []
    0x60 0x00 return                            // []
}

/// @notice Symbol
/// @notice Returns the symbol of the token
#define macro SYMBOL() = takes (0) returns (0) {
    NON_PAYABLE()                               // []
    _GET_IMMUTABLE(SYMBOL_OFFSET, 0x00)         // [symbol_value]
    _GET_IMMUTABLE(SYMBOL_LENGTH_OFFSET, 0x00)  // [symbol_length, symbol_value]
    0x20 0x00 mstore                            // [symbol_length, symbol_value]
    0x20 mstore                                 // [symbol_value]
    0x40 mstore                                 // []
    0x60 0x00 return                            // []
}

/// @notice Balance Of
/// @notice Returns the balance of the given address
#define macro BALANCE_OF() = takes (0) returns (0) {
    NON_PAYABLE()                                       // []
    0x04 calldataload                                   // [account]
    // revert if account is zero address
    dup1 continue jumpi
    ZERO_ADDRESS(0x00)
    continue:
    [BALANCE_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00)     // [balance]
    0x00 mstore                                         // []
    0x20 0x00 return                                    // []
}

/// @notice Owner Of
/// @notice Returns the owner of the given token id
#define macro OWNER_OF() = takes (0) returns (0) {
    0x04 calldataload                               // [tokenId]
    [OWNER_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00)   // [owner]
    // revert if owner is zero address/not minted
    dup1 continue jumpi
    NOT_MINTED(0x00)
    continue:
    0x00 mstore                                     // []
    0x20 0x00 return                                // []
}

/// @notice Is Approved For All
/// @notice Returns whether the given operator is approved for all tokens of the given owner
#define macro IS_APPROVED_FOR_ALL() = takes (0) returns (0) {
    0x24 calldataload               // [to]
    0x04 calldataload               // [from, to]
    LOAD_ELEMENT_FROM_KEYS(0x00)    // [value]
    0x00 mstore                     // []
    0x20 0x00 return                // []
}

/// @notice Get Approved
/// @notice Returns the approved address for the given token id
#define macro GET_APPROVED() = takes (0) returns (0) {
    0x04 calldataload               // [tokenId]
    [SINGLE_APPROVAL_LOCATION]      // [approval_slot, tokenId]
    LOAD_ELEMENT_FROM_KEYS(0x00)    // [spender]
    0x00 mstore                     // []
    0x20 0x00 return                // []
}

/// @notice Token URI
#define macro TOKEN_URI() = takes (0) returns (0) {
    0x20 0x00 mstore
    0x00 0x20 mstore
    0x40 0x00 return
}

/// @notice Checks if the given interface is supported
#define macro SUPPORTS_INTERFACE() = takes (0) returns (0) {
    // grab interfaceId
    0x04 calldataload       // [interfaceId]
    0xe0 shr                // [right_aligned_interfaceId]

    // Check if erc165 interfaceId
    dup1                    // [interfaceId, interfaceId]
    0x01ffc9a7 eq           // [is_erc165, interfaceId]
    is_interface jumpi

    // Check if erc721 interfaceId
    dup1                    // [interfaceId, interfaceId]
    0x80ac58cd eq           // [is_erc721, interfaceId]
    is_interface jumpi

    // Check if erc721Metadata interfaceId
    0x5b5e139f eq           // [is_erc721Metadata]
    is_interface jumpi

    // Return false (0x00)
    0x00 mstore             // []
    0x20 0x00 return        // []

    // Return true (0x01)
    is_interface:
        pop                 // []
        0x01 0x00 mstore    // []
        0x20 0x00 return    // []
}

/// >>>>>>>>>>>>>>>>>>>>>  INTERNAL FUNCTIONS  <<<<<<<<<<<<<<<<<<<<<< ///

/// @notice Mint
/// @notice Mints a new token
/// @dev The Mint function is payable
#define macro _MINT() = takes (2) returns (0) {
    // Input stack:                                 // [to, tokenId]
    // Output stack:                                // []

    // Check that the recipient is valid
    dup1 iszero invalid_recipient jumpi             // [to, tokenId]

    // Create the minting params
    0x00 dup3                                       // [tokenId, from (0x00), to, tokenId]

    // Check token ownership
    [OWNER_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00)   // [owner, from (0x00), to, tokenId]
    unauthorized jumpi

    // Give tokens to the recipient.
    TRANSFER_GIVE_TO()                              // [from (0x00), to, tokenId]

    // Emit the transfer event.
    __EVENT_HASH(Transfer)                          // [sig, from (0x00), to, tokenId]
    0x00 0x00 log4                                  // []

    // Continue Executing
    cont jump

    invalid_recipient:
        INVALID_RECIPIENT(0x00)

    unauthorized:
        ALREADY_MINTED(0x00)

    cont:
}

/// @notice Burn
/// @notice Burns the token with the given id
#define macro _BURN() = takes (1) returns (0) {
    // Input stack:                                 // [tokenId]
    NON_PAYABLE()                                   // [tokenId]

    dup1                                            // [tokenId, tokenId]
    [OWNER_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00)   // [owner, tokenId]

    // Check that the recipient is valid
    dup1 iszero                                     // [owner == 0, owner, tokenId]
    not_minted jumpi                                // [owner, tokenId]

    // Create the burning params
    0x00 swap1                                      // [owner, to (0x00), tokenId]

    // Reduce the balance of owner by 1
    0x01 dup2                                       // [owner, 1, owner, to, tokenId]
    [BALANCE_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00) // [balance, 1, owner, to, tokenId]
    sub dup2                                        // [owner, balance-1, owner, to, tokenId]
    [BALANCE_LOCATION]
    STORE_ELEMENT_FROM_KEYS(0x00)                   // [owner, to, tokenId]

    // Set the owner of the token to 0x00
    0x00 dup4 [OWNER_LOCATION]                      // [slot, owner, 0x00, owner, to, tokenId]
    STORE_ELEMENT_FROM_KEYS(0x00)                   // [owner, to, tokenId]

    // Set the approval of the token to 0x00 for the owner
    0x00 dup4 [SINGLE_APPROVAL_LOCATION]            // [slot, owner, 0x00, owner, to, tokenId]
    STORE_ELEMENT_FROM_KEYS(0x00)                   // [owner, to, tokenId]

    // Emit the transfer event.
    __EVENT_HASH(Transfer)                          // [sig, owner, to (0x00), tokenId]
    0x00 0x00                                       // [0, 0, sig, owner, to (0x00), tokenId]
    log4                                            // []

    // Continue Executing
    cont jump

    not_minted:
        NOT_MINTED(0x00)

    cont:
}

/// @notice Retrives an "immutable" from the runtime bytecode.
#define macro _GET_IMMUTABLE(offset_end, free_memory) = takes (0) returns (1) {
    0x20                        // [size]
    <offset_end> codesize sub   // [offset_code, size]
    <free_memory>               // [offset_memory, offset_code, size]
    codecopy                    // []
    <free_memory> mload         // [value]
}

/// >>>>>>>>>>>>>>>>>>>>>  EXTERNAL FUNCTIONS  <<<<<<<<<<<<<<<<<<<<<< ///

/// @notice Approve
/// @notice Approves a spender for a specific token
#define macro APPROVE() = takes (0) returns (0) {
    // Load the token owner
    0x24 calldataload dup1          // [tokenId, tokenId]
    [OWNER_LOCATION]
    LOAD_ELEMENT_FROM_KEYS(0x00)    // [owner, tokenId]
    dup1 caller eq                  // [is_sender_owner, owner, tokenId]

    // Check if approved for all
    caller dup3                     // [owner, msg.sender, is_sender_owner, owner, tokenId]
    LOAD_ELEMENT_FROM_KEYS(0x00)    // [is_approved_for_all, is_sender_owner, owner, tokenId]]
    or cont jumpi                   // [owner, tokenId]
        not_authorized jump
    cont:

    // Store approval
    0x04 calldataload dup1 dup4     // [tokenId, spender, spender, owner, tokenId]
    [SINGLE_APPROVAL_LOCATION]
    STORE_ELEMENT_FROM_KEYS(0x00)   // [spender, owner, tokenId]
    swap1                           // [owner, spender, tokenId]

    // Emit the approval event
    __EVENT_HASH(Approval)                          // [sig, owner, spender, tokenId]
    0x00 0x00 log4                                  // []

    stop

    not_authorized:
        UNAUTHORIZED(0x00)
}

/// @notice Set Approval For All
/// @notice Sets an operator as approved for all tokens of the caller
#define macro SET_APPROVAL_FOR_ALL() = takes (0) returns (0) {
    // Store the operator as approved for all
    0x24 calldataload                               // [approved]
    0x04 calldataload                               // [operator, approved]
    caller                                          // [msg.sender, operator, approved]
    STORE_ELEMENT_FROM_KEYS(0x00)                   // []

    // Emit the ApprovalForAll event
    0x24 calldataload                               // [approved]
    0x04 calldataload                               // [operator, approved]
    caller                                          // [msg.sender, operator, approved]
    __EVENT_HASH(ApprovalForAll)                    // [sig, owner, operator]
    0x00 0x00                                       // [0, 32, sig, owner, operator]
    log4                                            // []

    // Stop execution
    stop
}

/// @notice Transfer From
/// @notice Transfers a token from one address to another
#define macro TRANSFER_FROM() = takes (0) returns (0) {
    // Setup the stack for the transfer function.
    0x44 calldataload       // [tokenId]
    0x24 calldataload       // [to, tokenId]
    0x04 calldataload       // [from, to, tokenId]

    // Accounting Logic
    TRANSFER_TAKE_FROM()    // [from, to, tokenId]
    TRANSFER_GIVE_TO()      // [from, to, tokenId]

    // Emit the transfer event
    __EVENT_HASH(Transfer)  // [sig,from, to, tokenId]
    0x20 0x00 log4          // []

    // Stop execution
    stop
}

/// @notice Safe Transfer From
#define macro SAFE_TRANSFER_FROM() = takes (0) returns (0) {
    // Setup the stack for the transfer function.
    0x44 calldataload       // [tokenId]
    0x24 calldataload       // [to, tokenId]
    0x04 calldataload       // [from, to, tokenId]

    TRANSFER_TAKE_FROM()    // [from, to, tokenId]
    TRANSFER_GIVE_TO()      // [from, to, tokenId]

    // Emit the transfer event
    __EVENT_HASH(Transfer)  // [sig, from, to, tokenId]
    0x00 0x00 log4          // []

    // Make sure we can transfer to the recipient
    0x24 calldataload       // [to]
    dup1 extcodesize        // [to.code.length, to]
    iszero safe jumpi       // [to]

    // onERC721Received Selector
    0x150b7a02 dup1         // [onERC721Received, onERC721Received, to]
    0xE0 shl                // [onERC721Received_shifted, onERC721Received, to]

    // Store the left-shifted selector for call
    0x20 mstore             // [onERC721Received, to]

    // Store the msg.sender as the first arg
    caller 0x24 mstore      // [onERC721Received, to]

    // Store from as the second arg
    0x04 calldataload       // [from, onERC721Received, to]
    0x44 mstore             // [onERC721Received, to]

    // Id is the third arg
    0x44 calldataload       // [tokenId, onERC721Received, to]
    0x64 mstore             // [onERC721Received, to]

    // Blank bytes array as 4th arg (no data)
    0x80 0x84 mstore
    0x00 0xA4 mstore

    // Call address(to).onERC721Received(msg.sender, from, tokenId, "")
    0x20                    // [retSize, onERC721Received, to]
    0x00                    // [retOffset, retSize, onERC721Received, to]
    0xA4                    // [argSize, retOffset, retSize, onERC721Received, to]
    dup3                    // [argOffset, argSize, retOffset, retSize, onERC721Received, to]
    dup3                    // [value, argOffset, argSize, retOffset, retSize, onERC721Received, to]
    dup7                    // [to, value, argOffset, argSize, retOffset, retSize, onERC721Received, to]
    gas                     // [gas, to, value, argOffset, argSize, retOffset, retSize, onERC721Received, to]
    call                    // [success, onERC721Received, to]

    // Revert if call isn't successful
    cont jumpi              // [onERC721Received, to]
    0x00 dup1 revert
    cont:

    // Compare the return data to the onERC721Received selector
    0x00 mload 0xE0 shr     // [response, onERC721Received, to]
    eq safe jumpi           // [to]

    // Revert if the return data is not accepted
    UNSAFE_RECIPIENT(0x00)

    // Stop execution if safe
    safe:
    stop
}

#define macro SAFE_TRANSFER_FROM_WITH_DATA() = takes (0) returns (0) {
    // Setup the stack for the transfer function.
    0x44 calldataload       // [tokenId]
    0x24 calldataload       // [to, tokenId]
    0x04 calldataload       // [from, to, tokenId]

    TRANSFER_TAKE_FROM()    // [from, to, tokenId]
    TRANSFER_GIVE_TO()      // [from, to, tokenId]

    // Emit the transfer event.
    __EVENT_HASH(Transfer)  // [sig, from, to, tokenId]
    0x00 0x00 log4          // []

    // Make sure we can transfer to the recipient
    0x24 calldataload       // [to]
    dup1 extcodesize        // [to.code.length, to]
    iszero safe jumpi       // [to]

    // onERC721Received Selector
    0x150b7a02 dup1         // [onERC721Received, onERC721Received, to]
    0xE0 shl                // [onERC721Received_shifted, onERC721Received, to]

    // Store the left-shifted selector for call
    0x20 mstore             // [onERC721Received, to]

    // Store the msg.sender as the first arg
    caller 0x24 mstore      // [onERC721Received, to]

    // Store from as the second arg
    0x04 calldataload       // [from, onERC721Received, to]
    0x44 mstore             // [onERC721Received, to]

    // Id is the third arg
    0x44 calldataload       // [tokenId, onERC721Received, to]
    0x64 mstore             // [onERC721Received, to]

    0x84 calldataload       // [len(data), onERC721Received, to]
    0x05 shl                // [len(data) * 0x20, onERC721Received, to]
    0x40 add                // [len(data) * 0x20 + 0x40, onERC721Received, to]
    dup1                    // [len(data) * 0x20 + 0x40, len(data) * 0x20 + 0x40, onERC721received, to]
    0x64                    // [0x64, len(data) * 0x20 + 0x40, len(data) * 0x20 + 0x40, onERC721received, to]
    0x84                    // [0x20, 0x64, len(data) * 0x20 + 0x40, len(data) * 0x20 + 0x40, onERC721received, to]
    calldatacopy            // [len(bytes), onERC721received, to]

    // Call address(to).onERC721Received(msg.sender, from, tokenId, bytes)
    0x20                    // [retSize, len(bytes), onERC721Received, to]
    0x00                    // [retOffset, retSize, len(bytes), onERC721Received, to]
    swap1 swap2             // [len(bytes), retOffset, retSize, onERC721Received, to]
    0x64 add                // [argSize, retOffset, retSize, onERC721Received, to]
    dup3                    // [argOffset, argSize, retOffset, retSize, len(bytes), onERC721Received, to]
    dup3                    // [value, argOffset, argSize, retOffset, retSize, len(bytes), onERC721Received, to]
    dup7                    // [to, value, argOffset, argSize, retOffset, retSize, len(bytes), onERC721Received, to]
    gas                     // [gas, to, value, argOffset, argSize, retOffset, retSize, len(bytes), onERC721Received, to]
    call                    // [success, len(bytes), onERC721Received, to]

    // Revert if call isn't successful
    cont jumpi              // [len(bytes), onERC721Received, to]
    0x00 dup1 revert
    cont:

    // Compare the return data to the onERC721Received selector
    0x00 mload 0xE0 shr     // [response, onERC721Received, to]
    eq safe jumpi           // [to]

    // Revert if the return data is not accepted
    UNSAFE_RECIPIENT(0x00)

    // Stop execution if safe
    safe:
    stop
}

/// >>>>>>>>>>>>>>>>>>>>>  INTERNAL HELPERS  <<<<<<<<<<<<<<<<<<<<<< ///

/// @notice Internal Macro to update Transfer from accounting
#define macro TRANSFER_TAKE_FROM() = takes (3) returns (3) {
    // Input stack: [from, to, tokenId]

    // If from !== ownerOf[tokenId] revert with "WRONG_FROM"
    dup1 dup4                                       // [tokenId, from, from, to, tokenId]
    [OWNER_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00)   // [owner, from, from, to, tokenId]
    eq cont jumpi                                   // [from, to, tokenId]
    WRONG_FROM(0x00)
    cont:

    // If to === address(0) revert with "INVALID_RECIPIENT"
    dup2 continue jumpi                             // [from, to, tokenId]
    INVALID_RECIPIENT(0x00)
    continue:

    // Check if msg.sender == from
    dup1 caller eq                                  // [msg.sender == from, from, to, tokenId]
    is_authorized jumpi                             // [from, to, tokenId]

    // Check if approved for all
    caller dup2                                     // [from, msg.sender, from, to, tokenId]
    LOAD_ELEMENT_FROM_KEYS(0x00)                    // [is_approved_for_all, from, to, tokenId]
    is_authorized jumpi                             // [from, to, tokenId]

    // Check if approved for tokenId
    dup3                                            // [tokenId, from, to, tokenId]
    [SINGLE_APPROVAL_LOCATION]                      // [SINGLE_APPROVAL_LOCATION, tokenId, from, to, tokenId]
    LOAD_ELEMENT_FROM_KEYS(0x00)                    // [address_approved_for_tokenId, from, to, tokenId]
    caller eq is_authorized jumpi                   // [from, to, tokenId]

    // If msg.sender != from && !isApprovedForAll[from][msg.sender] && msg.sender != getApproved[id],
    UNAUTHORIZED(0x00)

    is_authorized:

    // Update balance of from
    0x01 dup2                                       // [from, 1, from, to, tokenId]
    [BALANCE_LOCATION] LOAD_ELEMENT_FROM_KEYS(0x00) // [balance, 1, from, to, tokenId]
    sub dup2                                        // [from, balance-1, from, to, tokenId]
    [BALANCE_LOCATION]
    STORE_ELEMENT_FROM_KEYS(0x00)                   // [from, to, tokenId]
}

/// @notice Internal Macro to update Transfer to accounting
#define macro TRANSFER_GIVE_TO() = takes (3) returns (3) {
    // retrieve balance
    // input stack:                 // [from, to, tokenId]
    dup2                            // [to, from, to, tokenId]
	[BALANCE_LOCATION]              // [balance_slot, to, from, to, tokenId]
    LOAD_ELEMENT_FROM_KEYS(0x00)    // [balance, from, to, tokenId]
    0x01 add                        // [balance+1, from, to, tokenId]

    // update balance
	dup3                            // [to, balance+1, from, to, tokenId]
    [BALANCE_LOCATION]              // [balance_slot, to, balance+1, from, to, tokenId]
    STORE_ELEMENT_FROM_KEYS(0x00)   // [from, to, tokenId]

    // update ownerOf
    dup2 dup4                       // [tokenId, to, from, to, tokenId]
    [OWNER_LOCATION]                // [owner_slot, tokenId, to, from, to, tokenId]
    STORE_ELEMENT_FROM_KEYS(0x00)   // [from, to, tokenId]

    // update approval
    0x00 dup4                       // [tokenId, address(0), from, to, tokenId]
    [SINGLE_APPROVAL_LOCATION]      // [approval_slot, tokenId, address(0), from, to, tokenId]
    STORE_ELEMENT_FROM_KEYS(0x00)   // [from, to, tokenId]
}

/// @notice Reverts if the call has a non-zero value
/// @notice Reverts with message "NON_PAYABLE"
#define macro NON_PAYABLE() = takes (0) returns (0) {
    [NON_PAYABLE_ERROR]      // ["NON_PAYABLE"]
    [NON_PAYABLE_LENGTH]     // [11 (length), "NON_PAYABLE"]
    callvalue iszero         // [msg.value == 0, 11 (length), "NON_PAYABLE"]
    REQUIRE()                // []
}
```

</details>


Encourage you not to worry about most of the details we've just inherited, it represents a bunch of ERC721 "stuff" that is important to the standard, but not a focus of ours.

Now that we've inherited this functionality, we're still going to have to define our own `TOTAL_SUPPLY` constant and the getter macro for it:

```js
#define constant TOTAL_SUPPLY = FREE_STORAGE_POINTER()

#define macro GET_TOTAL_SUPPLY() = takes (0) returns (0) {
    [TOTAL_SUPPLY]    // [TOTAL_SUPPLY]
    sload             // [totalSupply]
    0x00 mstore
    0x20 0x00 return
}
```

We can finally begin defining our `MINT_HORSE()` macro:

```js
#define macro MINT_HORSE() = takes(0) returns(0) {
    [TOTAL_SUPPLY]           // [TOTAL_SUPPLY]
    sload                    // [totalSupply]
    dup1                     // [totalSupply, totalSupply]
}
```

Next we'll need to access the msg.sender, as that's to whom the token is being minted. Fortunately we've an op code specifically to reference the `CALLER`.

![a-quick-function-then-huffmate1](/formal-verification-1/68-a-quick-function-then-huffmate/a-quick-function-then-huffmate1.png)

This op code will add the 20 byte address of the callers account to the top of our stack!

Once we have the `msg.sender` and the current `totalSupply`, we can use one of the macros we inherited from Huffmate's ERC721 implementation: `MINT()`.

```js
#define macro MINT_HORSE() = takes(0) returns(0) {
    [TOTAL_SUPPLY]           // [TOTAL_SUPPLY]
    sload                    // [totalSupply]
    dup1                     // [totalSupply, totalSupply]
    caller                   // [msg.sender, totalSupply, totalSupply]
    MINT()                   // [totalSupply]
}
```

Now we simply need to increment our `totalSupply` value by 1, we do this by pushing `0x01` and executing the `add` operation. Finally this new incremented value is stored in memory at the location of `TOTAL_SUPPLY`.

```js
#define macro MINT_HORSE() = takes(0) returns(0) {
    [TOTAL_SUPPLY]       // [TOTAL_SUPPLY]
    sload                // [totalSupply]
    dup1                 // [totalSupply, totalSupply]
    caller               // [msg.sender, totalSupply, totalSupply]
    MINT()               // [totalSupply]
    0x01                 // [0x01, totalSupply]
    add                  // [totalSupply + 1]
    [TOTAL_SUPPLY]       // [TOTAL_SUPPLY, totalSupply + 1]
    sstore               // []
    stop
}
```

That's all there is to our MINT_HORSE macro! I know I said it was going to be hard, but by leveraging the MINT() macro in Huffmate it really wasn't too bad.

We're nearly done, let's keep going!
